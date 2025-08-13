import Tesseract from 'tesseract.js';

export interface OCRResult {
  merchant: string;
  amount: number;
  date: string;
  items: string[];
  confidence: number;
  rawText: string;
}

// Enhanced image preprocessing for better OCR accuracy
async function preprocessImage(imageFile: File): Promise<HTMLCanvasElement> {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    img.onload = () => {
      // Set canvas size to image dimensions
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw original image
      ctx.drawImage(img, 0, 0);
      
      // Get image data for processing
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Apply image enhancement techniques
      for (let i = 0; i < data.length; i += 4) {
        // Convert to grayscale using luminance formula
        const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
        
        // Apply contrast enhancement and thresholding
        const enhanced = gray > 128 ? 255 : 0; // Binary threshold
        
        data[i] = enhanced;     // Red
        data[i + 1] = enhanced; // Green
        data[i + 2] = enhanced; // Blue
        // Alpha stays the same
      }
      
      // Put processed image data back
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas);
    };
    
    img.src = URL.createObjectURL(imageFile);
  });
}

export async function processReceipt(imageFile: File): Promise<OCRResult> {
  try {
    console.log('Starting enhanced OCR processing...');
    
    // Preprocess image for better accuracy
    const processedCanvas = await preprocessImage(imageFile);
    
    // Convert canvas to blob for Tesseract
    const processedBlob = await new Promise<Blob>((resolve) => {
      processedCanvas.toBlob((blob) => resolve(blob!), 'image/png');
    });
    
    // Advanced Tesseract configuration for Nigerian receipts
    const ocrOptions: any = {
      logger: (m: any) => console.log(`OCR Progress: ${m.status} (${Math.round(m.progress * 100)}%)`),
      tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,!@#$%^&*()_+-=[]{}|;:\'",<.>?/₦ ',
      preserve_interword_spaces: '1',
      tessedit_create_hocr: '1',
      tessedit_create_tsv: '1',
    };
    
    // Multi-pass OCR with different PSM modes for maximum accuracy
    console.log('Running multi-pass OCR recognition...');
    
    const results = await Promise.all([
      // Pass 1: Single block mode (best for receipts)
      Tesseract.recognize(processedBlob, 'eng', {
        ...ocrOptions,
        tessedit_pageseg_mode: 6, // PSM.SINGLE_BLOCK
      }),
      // Pass 2: Single column mode
      Tesseract.recognize(processedBlob, 'eng', {
        ...ocrOptions,
        tessedit_pageseg_mode: 4, // PSM.SINGLE_COLUMN
      }),
      // Pass 3: Auto mode with original image
      Tesseract.recognize(imageFile, 'eng', {
        ...ocrOptions,
        tessedit_pageseg_mode: 3, // PSM.AUTO
      }),
    ]);
    
    // Select best result based on confidence
    const bestResult = results.reduce((best, current) => 
      current.data.confidence > best.data.confidence ? current : best
    );
    
    console.log(`Best OCR confidence: ${bestResult.data.confidence}%`);
    
    const text = bestResult.data.text;
    const parsedResult = parseReceiptText(text, bestResult.data.confidence);
    
    return {
      ...parsedResult,
      rawText: text,
    };
  } catch (error) {
    console.error('Enhanced OCR processing failed:', error);
    throw new Error('Failed to process receipt image with enhanced OCR');
  }
}

function parseReceiptText(text: string, confidence: number): Omit<OCRResult, 'rawText'> {
  console.log('Parsing receipt text with enhanced algorithms...');
  
  // Clean and normalize text
  const normalizedText = text
    .replace(/[^\w\s₦.,\-\/:()\[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
    
  const lines = normalizedText.split('\n').filter(line => line.trim().length > 0);
  
  // Extract merchant with improved algorithm
  const merchant = extractMerchantAdvanced(lines, normalizedText);
  
  // Extract total amount with multiple methods
  const amount = extractAmountAdvanced(normalizedText, lines);
  
  // Extract date with better patterns
  const date = extractDateAdvanced(normalizedText);
  
  // Extract items with enhanced filtering
  const items = extractItemsAdvanced(lines);
  
  console.log(`Extracted: Merchant="${merchant}", Amount=${amount}, Date="${date}", Items=${items.length}`);
  
  return {
    merchant: merchant || 'Unknown Merchant',
    amount: amount || 0,
    date: date || new Date().toISOString().split('T')[0],
    items: items,
    confidence: Math.round(confidence)
  };
}

function extractMerchantAdvanced(lines: string[], fullText: string): string {
  // Comprehensive Nigerian store and business patterns
  const nigerianStores = [
    'shoprite', 'spar', 'game stores', 'next cash', 'justrite', 'hubmart',
    'ebeano', 'addide', 'prince ebeano', 'park n shop', 'konga', 'jumia',
    'slot systems', 'computer village', 'ikeja city mall', 'palms shopping',
    'silverbird galleria', 'cedar mall', 'jabi lake mall', 'shoprite lagos',
    'circle mall', 'adeniran ogunsanya', 'maryland mall', 'ikota shopping',
    'gtbank', 'access bank', 'first bank', 'zenith bank', 'uba', 'fidelity bank',
    'dominos pizza', 'kfc', 'mr biggs', 'chicken republic', 'sweet sensation',
    'tantalizers', 'genesis deluxe', 'film house', 'oando', 'mobil', 'total',
    'conoil', 'forte oil', 'rainoil', 'nipco'
  ];
  
  const businessPatterns = [
    /^[A-Z][A-Z\s&]+(?:ltd|limited|plc|inc|corp)/i,
    /^[A-Z]+\s+(?:stores?|shop|mart|mall|plaza|centre|center)/i,
    /^[A-Z]{2,}\s+[A-Z]{2,}/,
    /^.{3,25}(?:\s+(?:nigeria|lagos|abuja|port\s+harcourt|kano|ibadan))?$/i
  ];
  
  // First, check for exact Nigerian store matches
  for (const line of lines.slice(0, 8)) {
    const cleanLine = line.toLowerCase().trim();
    for (const store of nigerianStores) {
      if (cleanLine.includes(store)) {
        return line.trim();
      }
    }
  }
  
  // Then check for business name patterns
  for (const line of lines.slice(0, 6)) {
    const cleanLine = line.trim();
    if (cleanLine.length < 3 || cleanLine.length > 50) continue;
    
    for (const pattern of businessPatterns) {
      if (pattern.test(cleanLine)) {
        return cleanLine;
      }
    }
  }
  
  // Look for lines with mostly capital letters (common in business names)
  for (const line of lines.slice(0, 5)) {
    const cleanLine = line.trim();
    if (cleanLine.length >= 3 && cleanLine.length <= 35) {
      const capitalRatio = (cleanLine.match(/[A-Z]/g) || []).length / cleanLine.replace(/\s/g, '').length;
      if (capitalRatio > 0.6) {
        return cleanLine;
      }
    }
  }
  
  // Fallback to first meaningful line
  for (const line of lines.slice(0, 3)) {
    const cleanLine = line.trim();
    if (cleanLine.length > 3 && /[a-zA-Z]/.test(cleanLine) && !/^\d+$/.test(cleanLine)) {
      return cleanLine;
    }
  }
  
  return lines[0]?.trim() || 'Unknown Merchant';
}

function extractAmountAdvanced(text: string, lines: string[]): number {
  console.log('Extracting amount with advanced patterns...');
  
  // Enhanced patterns for Nigerian receipts
  const totalPatterns = [
    /(?:total|grand\s+total|amount\s+due|net\s+total)[:\s]*₦?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i,
    /(?:amount|sum|balance)[:\s]*₦?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i,
    /₦\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/g,
    /(\d+(?:,\d{3})*(?:\.\d{2})?)[\s]*₦/g,
    /total[\s:]*(\d+(?:,\d{3})*(?:\.\d{2})?)/i,
    /(?:pay|payment)[\s:]*₦?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i
  ];
  
  const amounts: number[] = [];
  
  // Method 1: Pattern matching on full text
  for (const pattern of totalPatterns) {
    const matches = Array.from(text.matchAll(new RegExp(pattern.source, pattern.flags + 'g')));
    for (const match of matches) {
      const numberStr = match[1];
      if (numberStr) {
        const amount = parseFloat(numberStr.replace(/,/g, ''));
        if (!isNaN(amount) && amount > 0 && amount < 1000000) { // Reasonable range
          amounts.push(amount);
        }
      }
    }
  }
  
  // Method 2: Look for "TOTAL" lines specifically
  for (const line of lines) {
    const cleanLine = line.toLowerCase().trim();
    if (cleanLine.includes('total') && !cleanLine.includes('subtotal')) {
      const numberMatch = line.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
      if (numberMatch) {
        const amount = parseFloat(numberMatch[1].replace(/,/g, ''));
        if (!isNaN(amount) && amount > 0) {
          amounts.push(amount);
        }
      }
    }
  }
  
  // Method 3: Look for last significant amount (often the total)
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    const numberMatch = line.match(/₦?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/);
    if (numberMatch) {
      const amount = parseFloat(numberMatch[1].replace(/,/g, ''));
      if (!isNaN(amount) && amount >= 100) { // Minimum reasonable receipt amount
        amounts.push(amount);
        break;
      }
    }
  }
  
  // Return the most likely total (usually the largest amount)
  if (amounts.length === 0) return 0;
  
  // If we have multiple amounts, prefer ones that appear with "total" keywords
  const sortedAmounts = amounts.sort((a, b) => b - a);
  console.log(`Found amounts: [${sortedAmounts.join(', ')}]`);
  
  return sortedAmounts[0];
}

function extractDateAdvanced(text: string): string {
  console.log('Extracting date with enhanced patterns...');
  
  // Enhanced date patterns for Nigerian receipts
  const datePatterns = [
    // DD/MM/YYYY or DD-MM-YYYY
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/g,
    // DD/MM/YY or DD-MM-YY  
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/g,
    // Month name patterns: DD MMM YYYY or DD MMMM YYYY
    /(\d{1,2})[\s\-\/](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s\-\/](\d{2,4})/gi,
    // Time stamps with dates: DD/MM/YYYY HH:MM
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})\s+\d{1,2}:\d{2}/g,
    // YYYY/MM/DD format
    /(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/g,
    // Date: DD/MM/YYYY pattern
    /date[:\s]+(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/gi,
  ];
  
  const currentYear = new Date().getFullYear();
  
  for (const pattern of datePatterns) {
    const matches = Array.from(text.matchAll(pattern));
    for (const match of matches) {
      try {
        let dateStr = match[0];
        
        // Clean up the date string
        dateStr = dateStr.replace(/^date[:\s]+/i, '');
        
        // Handle different date formats
        let parsedDate: Date;
        
        if (match[2] && isNaN(parseInt(match[2]))) {
          // Month name format
          parsedDate = new Date(dateStr);
        } else {
          // Numeric format - assume DD/MM/YYYY for Nigerian context
          const day = parseInt(match[1]);
          const month = parseInt(match[2]);
          let year = parseInt(match[3]);
          
          // Handle 2-digit years
          if (year < 100) {
            year += year < 50 ? 2000 : 1900;
          }
          
          // Validate ranges
          if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && 
              year >= currentYear - 5 && year <= currentYear + 1) {
            parsedDate = new Date(year, month - 1, day);
          } else {
            continue;
          }
        }
        
        // Validate the parsed date
        if (!isNaN(parsedDate.getTime()) && parsedDate.getFullYear() >= currentYear - 5) {
          const formattedDate = parsedDate.toISOString().split('T')[0];
          console.log(`Extracted date: ${formattedDate}`);
          return formattedDate;
        }
      } catch (e) {
        console.log(`Failed to parse date: ${match[0]}`);
        continue;
      }
    }
  }
  
  console.log('No valid date found, using current date');
  return new Date().toISOString().split('T')[0];
}

function extractItemsAdvanced(lines: string[]): string[] {
  console.log('Extracting items with enhanced filtering...');
  
  const items: string[] = [];
  const skipPatterns = [
    /^(total|subtotal|tax|vat|discount|change|payment|cash|card|balance|amount)/i,
    /^(receipt|invoice|bill|store|shop|mall|address|phone|email|website)/i,
    /^(date|time|cashier|server|thank\s+you|visit\s+again)/i,
    /^(ref|reference|transaction|trans|receipt\s*#)/i,
    /^\d{1,3}$/, // Single numbers (likely quantity)
    /^₦?\s*\d+[.,]\d{2}\s*$/, // Just prices
    /^[^\w]*$/, // Only symbols/spaces
    /^\s*[-=*_]{3,}\s*$/, // Separator lines
  ];
  
  const itemPatterns = [
    // Item with quantity and price: "2 x Coca Cola 500ml ₦200"
    /^(\d+\s*x?\s*)?([a-zA-Z][a-zA-Z0-9\s\-_&\/]{2,30})\s+₦?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i,
    // Item with price: "Bread ₦150.00"
    /^([a-zA-Z][a-zA-Z0-9\s\-_&\/]{2,30})\s+₦?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i,
    // Simple item with price at end: "Coca Cola 200.00"
    /^([a-zA-Z][a-zA-Z0-9\s\-_&\/]{2,30})\s+(\d+(?:,\d{3})*(?:\.\d{2})?)\s*$/i,
    // Price at start: "₦200 Bread"
    /^₦?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)\s+([a-zA-Z][a-zA-Z0-9\s\-_&\/]{2,30})/i
  ];
  
  for (const line of lines) {
    const cleanLine = line.trim();
    
    // Skip if line is too short or too long
    if (cleanLine.length < 3 || cleanLine.length > 80) continue;
    
    // Skip lines matching exclusion patterns
    let shouldSkip = false;
    for (const skipPattern of skipPatterns) {
      if (skipPattern.test(cleanLine)) {
        shouldSkip = true;
        break;
      }
    }
    if (shouldSkip) continue;
    
    // Check if line matches item patterns
    let matchedItem = '';
    for (const itemPattern of itemPatterns) {
      const match = cleanLine.match(itemPattern);
      if (match) {
        // Extract the item name (not the price part)
        if (match[2]) {
          matchedItem = match[2].trim();
        } else if (match[1] && /[a-zA-Z]/.test(match[1])) {
          matchedItem = match[1].trim();
        }
        break;
      }
    }
    
    if (matchedItem && matchedItem.length >= 3) {
      items.push(cleanLine); // Store the full line for context
    } else {
      // Fallback: if line has letters and reasonable length, might be an item
      if (/[a-zA-Z]{3,}/.test(cleanLine) && 
          !(/^\d+$/.test(cleanLine)) && 
          cleanLine.split(' ').length <= 8) {
        // Additional validation: check if it's not obviously metadata
        const lowerLine = cleanLine.toLowerCase();
        if (!lowerLine.includes('customer') && 
            !lowerLine.includes('service') &&
            !lowerLine.includes('welcome') &&
            !lowerLine.includes('location')) {
          items.push(cleanLine);
        }
      }
    }
  }
  
  console.log(`Extracted ${items.length} items`);
  
  // Remove duplicates and limit to reasonable number
  const uniqueItems = Array.from(new Set(items));
  return uniqueItems.slice(0, 15); // Increased limit for better item capture
}
