import Tesseract from 'tesseract.js';

export interface OCRResult {
  merchant: string;
  amount: number;
  date: string;
  items: string[];
}

export async function processReceipt(imageFile: File): Promise<OCRResult> {
  try {
    const result = await Tesseract.recognize(imageFile, 'eng', {
      logger: m => console.log(m)
    });

    const text = result.data.text;
    return parseReceiptText(text);
  } catch (error) {
    console.error('OCR processing failed:', error);
    throw new Error('Failed to process receipt image');
  }
}

function parseReceiptText(text: string): OCRResult {
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  // Extract merchant (usually first meaningful line)
  const merchant = extractMerchant(lines);
  
  // Extract total amount
  const amount = extractAmount(text);
  
  // Extract date
  const date = extractDate(text);
  
  // Extract items
  const items = extractItems(lines);
  
  return {
    merchant: merchant || 'Unknown Merchant',
    amount: amount || 0,
    date: date || new Date().toISOString().split('T')[0],
    items: items
  };
}

function extractMerchant(lines: string[]): string {
  // Look for common Nigerian store names or the first substantial line
  const nigerianStores = [
    'shoprite', 'spar', 'game', 'next cash', 'justrite', 'hubmart',
    'ebeano', 'addide', 'prince ebeano', 'park n shop'
  ];
  
  for (const line of lines.slice(0, 5)) {
    const cleanLine = line.toLowerCase().trim();
    for (const store of nigerianStores) {
      if (cleanLine.includes(store)) {
        return line.trim();
      }
    }
    // If it looks like a business name (has letters and is substantial)
    if (cleanLine.length > 3 && /[a-zA-Z]/.test(cleanLine)) {
      return line.trim();
    }
  }
  
  return lines[0]?.trim() || 'Unknown Merchant';
}

function extractAmount(text: string): number {
  // Look for patterns like "TOTAL", "Amount", etc. followed by numbers
  const totalPatterns = [
    /total[:\s]*₦?(\d+(?:,\d{3})*(?:\.\d{2})?)/i,
    /amount[:\s]*₦?(\d+(?:,\d{3})*(?:\.\d{2})?)/i,
    /₦(\d+(?:,\d{3})*(?:\.\d{2})?)/g
  ];
  
  let maxAmount = 0;
  
  for (const pattern of totalPatterns) {
    const matches = text.match(pattern);
    if (matches) {
      for (const match of matches) {
        const numberMatch = match.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
        if (numberMatch) {
          const amount = parseFloat(numberMatch[1].replace(/,/g, ''));
          if (amount > maxAmount) {
            maxAmount = amount;
          }
        }
      }
    }
  }
  
  return maxAmount;
}

function extractDate(text: string): string {
  // Look for date patterns
  const datePatterns = [
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/,
    /(\d{1,2})[\s\-\/]([a-zA-Z]{3,9})[\s\-\/](\d{2,4})/,
    /(\d{2,4})[\/\-](\d{1,2})[\/\-](\d{1,2})/
  ];
  
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      // Try to parse and format the date
      try {
        const dateStr = match[0];
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      } catch (e) {
        // Continue to next pattern
      }
    }
  }
  
  return new Date().toISOString().split('T')[0];
}

function extractItems(lines: string[]): string[] {
  const items: string[] = [];
  
  for (const line of lines) {
    const cleanLine = line.trim();
    
    // Skip lines that look like headers, totals, or merchant info
    if (
      cleanLine.toLowerCase().includes('total') ||
      cleanLine.toLowerCase().includes('subtotal') ||
      cleanLine.toLowerCase().includes('tax') ||
      cleanLine.toLowerCase().includes('change') ||
      cleanLine.toLowerCase().includes('payment') ||
      cleanLine.length < 3 ||
      /^\d+$/.test(cleanLine) ||
      /^₦?\d+[.,]\d{2}$/.test(cleanLine)
    ) {
      continue;
    }
    
    // If line contains both text and a price, it's likely an item
    if (/[a-zA-Z]/.test(cleanLine) && /₦?\d+(?:[.,]\d{2})?/.test(cleanLine)) {
      items.push(cleanLine);
    }
  }
  
  return items.slice(0, 10); // Limit to 10 items
}
