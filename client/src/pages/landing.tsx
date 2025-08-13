import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Scan, PieChart, Receipt, Shield, Users, Smartphone, ArrowRight, Star, Car, Camera, TrendingUp, FileText, Building, Eye, Moon, Sun, ChevronUp, StarIcon } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { useState, useEffect } from "react";

export default function Landing() {
  const { settings, toggleDarkMode } = useSettings();
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Scan. Track. Report.";
  
  useEffect(() => {
    let currentIndex = 0;
    setDisplayText("");
    setIsTyping(true);
    
    const typeTimer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeTimer);
        setIsTyping(false);
      }
    }, 150);
    
    return () => clearInterval(typeTimer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="px-4 py-4 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span style={{color: '#29A378'}}>Kudi</span>
              <span className="text-white">Scan</span>
            </span>
          </Link>
          <div className="flex items-center space-x-4">

            <Link href="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-16 w-full" style={{backgroundColor: '#29A378'}}>
        <div className="max-w-4xl mx-auto text-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display h-[3rem] sm:h-[3.5rem] md:h-[4rem] lg:h-[5rem] flex items-center justify-center">
            <span className="typing-text inline-block text-center">
              {displayText}
              {isTyping && <span className="animate-pulse">|</span>}
            </span>
          </h1>
          
          {/* Trust Badge */}

          
          {/* Dashboard and Mobile Preview */}
          <div className="relative flex items-center justify-center gap-6 max-w-4xl mx-auto mb-6">
            {/* Desktop Dashboard */}
            <div className="hidden md:block relative">
              <svg width="480" height="320" viewBox="0 0 600 400" className="drop-shadow-2xl">
                {/* Monitor Frame */}
                <rect x="20" y="30" width="560" height="320" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
                <rect x="30" y="40" width="540" height="300" rx="4" fill="#111827"/>
                
                {/* Screen Content - Dashboard */}
                <rect x="40" y="50" width="520" height="60" rx="6" fill="#29A378"/>
                <text x="60" y="75" fill="white" fontSize="16" fontWeight="bold">KudiScan Dashboard</text>
                <text x="60" y="95" fill="white" fontSize="12" opacity="0.8">Welcome back, User</text>
                
                {/* Cards */}
                <rect x="50" y="130" width="150" height="80" rx="8" fill="#374151"/>
                <text x="60" y="150" fill="#9ca3af" fontSize="10">Total Expenses</text>
                <text x="60" y="170" fill="white" fontSize="16" fontWeight="bold">₦125,450</text>
                <text x="60" y="190" fill="#22c55e" fontSize="10">↗ 12% this month</text>
                
                <rect x="220" y="130" width="150" height="80" rx="8" fill="#374151"/>
                <text x="230" y="150" fill="#9ca3af" fontSize="10">Categories</text>
                <text x="230" y="170" fill="white" fontSize="16" fontWeight="bold">8 Active</text>
                <text x="230" y="190" fill="#29A378" fontSize="10">Food • Transport • Bills</text>
                
                <rect x="390" y="130" width="150" height="80" rx="8" fill="#374151"/>
                <text x="400" y="150" fill="#9ca3af" fontSize="10">Recent Scans</text>
                <text x="400" y="170" fill="white" fontSize="16" fontWeight="bold">23 Receipts</text>
                <text x="400" y="190" fill="#29A378" fontSize="10">✓ All processed</text>
                
                {/* Chart Area */}
                <rect x="50" y="230" width="490" height="100" rx="8" fill="#374151"/>
                <text x="60" y="250" fill="white" fontSize="12" fontWeight="bold">Spending Trends</text>
                
                {/* Simple Chart Lines */}
                <polyline points="70,310 120,290 170,280 220,295 270,275 320,285 370,270 420,280 470,265 520,270" 
                          stroke="#29A378" strokeWidth="3" fill="none"/>
                <polyline points="70,320 120,315 170,305 220,310 270,300 320,308 370,295 420,305 470,290 520,295" 
                          stroke="#60a5fa" strokeWidth="2" fill="none"/>
                
                {/* Monitor Stand */}
                <rect x="280" y="350" width="40" height="20" rx="4" fill="#374151"/>
                <rect x="250" y="370" width="100" height="8" rx="4" fill="#4b5563"/>
              </svg>
            </div>

            {/* Mobile Phone */}
            <div className="relative">
              <svg width="160" height="320" viewBox="0 0 200 400" className="drop-shadow-2xl">
                {/* Phone Frame */}
                <rect x="10" y="10" width="180" height="380" rx="25" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
                <rect x="20" y="40" width="160" height="320" rx="15" fill="#111827"/>
                
                {/* Status Bar */}
                <rect x="25" y="45" width="150" height="20" fill="#111827"/>
                <text x="30" y="57" fill="white" fontSize="8">9:41</text>
                <text x="150" y="57" fill="white" fontSize="8">100%</text>
                
                {/* Header */}
                <rect x="25" y="70" width="150" height="40" rx="6" fill="#29A378"/>
                <text x="35" y="85" fill="white" fontSize="10" fontWeight="bold">KudiScan</text>
                <text x="35" y="100" fill="white" fontSize="8" opacity="0.8">Tap to scan receipt</text>
                
                {/* Camera Button */}
                <circle cx="100" cy="160" r="30" fill="#29A378"/>
                <circle cx="100" cy="160" r="20" fill="white" fillOpacity="0.2"/>
                <text x="95" y="165" fill="white" fontSize="12">📷</text>
                
                {/* Recent Transactions */}
                <rect x="30" y="220" width="140" height="30" rx="4" fill="#374151"/>
                <text x="35" y="235" fill="white" fontSize="8">Shoprite - ₦3,450</text>
                <text x="35" y="245" fill="#9ca3af" fontSize="6">Food & Groceries</text>
                
                <rect x="30" y="260" width="140" height="30" rx="4" fill="#374151"/>
                <text x="35" y="275" fill="white" fontSize="8">Uber - ₦1,200</text>
                <text x="35" y="285" fill="#9ca3af" fontSize="6">Transportation</text>
                
                <rect x="30" y="300" width="140" height="30" rx="4" fill="#374151"/>
                <text x="35" y="315" fill="white" fontSize="8">NEPA Bill - ₦8,500</text>
                <text x="35" y="325" fill="#9ca3af" fontSize="6">Utilities</text>
                
                {/* Home Indicator */}
                <rect x="85" y="375" width="30" height="4" rx="2" fill="#4b5563"/>
              </svg>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-6">
            <p className="text-lg text-white text-center mb-6 opacity-90">
              Your automated finance assistant.
            </p>
            
            {/* Process Flow */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
              {/* Step 1: Snap */}
              <div className="flex flex-col items-center text-center p-4 w-48 h-36">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-3">
                  <Camera className="w-10 h-10 text-white process-icon-1" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-sm">Snap</h3>
                <p className="text-xs leading-tight text-white">Snap / Upload a receipt to scan your expenses</p>
              </div>
              
              {/* Arrow 1 */}
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6" style={{color: '#082118'}} />
              </div>
              <div className="md:hidden">
                <div className="w-6 h-6 rotate-90">
                  <ArrowRight className="w-6 h-6" style={{color: '#082118'}} />
                </div>
              </div>
              
              {/* Step 2: Track */}
              <div className="flex flex-col items-center text-center p-4 w-48 h-36">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-3">
                  <TrendingUp className="w-10 h-10 text-white process-icon-2" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-sm">Track</h3>
                <p className="text-xs leading-tight text-white">Track spending across categories with intelligent insights</p>
              </div>
              
              {/* Arrow 2 */}
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6" style={{color: '#082118'}} />
              </div>
              <div className="md:hidden">
                <div className="w-6 h-6 rotate-90">
                  <ArrowRight className="w-6 h-6" style={{color: '#082118'}} />
                </div>
              </div>
              
              {/* Step 3: Report */}
              <div className="flex flex-col items-center text-center p-4 w-48 h-36">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-3">
                  <FileText className="w-10 h-10 text-white process-icon-3" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-sm">Report</h3>
                <p className="text-xs leading-tight text-white">Generate professional expense reports for business use</p>
              </div>
              
              {/* Arrow 3 */}
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6" style={{color: '#082118'}} />
              </div>
              <div className="md:hidden">
                <div className="w-6 h-6 rotate-90">
                  <ArrowRight className="w-6 h-6" style={{color: '#082118'}} />
                </div>
              </div>
              
              {/* Step 4: Scale */}
              <div className="flex flex-col items-center text-center p-4 w-48 h-36">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-3">
                  <Building className="w-10 h-10 text-white process-icon-4" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-sm">Scale</h3>
                <p className="text-xs leading-tight text-white">Secure loans from banks and investors to scale your business</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="border border-border rounded-2xl p-6 md:p-8 mb-8 w-full max-w-lg mx-auto" style={{backgroundColor: '#082118'}}>
            <h3 className="text-lg font-semibold mb-4 font-display text-white text-center">I want to:</h3>
            
            <div className="flex flex-col gap-3 w-full mx-auto">
              <Link href="/register" className="w-full">
                <Button size="lg" className="w-full justify-center text-center px-4" data-testid="button-personal">
                  Track my personal expenses
                </Button>
              </Link>
              
              <Link href="/register" className="w-full">
                <Button variant="outline" size="lg" className="w-full justify-center text-center px-4" data-testid="button-small-business">
                  Manage expenses for my business
                </Button>
              </Link>
              

            </div>
          </div>
        </div>
      </section>



      {/* Company Logos */}
      <section className="px-4 py-8 w-full overflow-hidden bg-muted/30">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h3 className="text-lg font-semibold mb-8 font-display text-foreground">Join 100,000+ users who trust KudiScan</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center h-12 bg-card border border-border rounded text-sm font-semibold text-foreground hover:scale-105 transition-transform duration-200">
              Konga
            </div>
            <div className="flex items-center justify-center h-12 bg-card border border-border rounded text-sm font-semibold text-foreground hover:scale-105 transition-transform duration-200">
              Jumia
            </div>
            <div className="flex items-center justify-center h-12 bg-card border border-border rounded text-sm font-semibold text-foreground hover:scale-105 transition-transform duration-200">
              GTBank
            </div>
            <div className="flex items-center justify-center h-12 bg-card border border-border rounded text-sm font-semibold text-foreground hover:scale-105 transition-transform duration-200">
              Flutterwave
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 w-full bg-background">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-4 font-display text-foreground">Features</h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 w-full">
            {/* Receipt Scanning */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#082118'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Scan className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-white">Receipt Scanning</h3>
              <p className="text-sm text-white mb-4">
                Snap to Scan, Save & Track receipts.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Receipt Scanning</DialogTitle>
                    <DialogDescription>
                      Our advanced OCR technology instantly captures and stores your receipts. Simply snap a photo and our AI automatically extracts data such as name, item description, amount, date, and itemized purchases. No more manual data entry or lost receipts - everything is stored securely in the cloud and categorized for easy tracking.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* AI + OCR Integration */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#082118'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-white">AI + OCR Integration</h3>
              <p className="text-sm text-white mb-4">
                AI powered OCR technology automatically extracts and categorizes all data on receipts.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>AI + OCR Integration</DialogTitle>
                    <DialogDescription>
                      Our AI combines Machine Learning with optical character recognition to understand your receipts like a human would. It recognizes and understands local context, handles poor image quality, and learns from your patterns to improve accuracy over time. The system automatically categorizes expenses and even detects potential duplicates.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Financial Reporting */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#082118'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-white">Financial Reporting</h3>
              <p className="text-sm text-white mb-4">
                Generate tailored reports to analyze spend, identify trends, make smarter decisions and secure bank loans.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Financial Reporting</DialogTitle>
                    <DialogDescription>
                      Create professional reports for business loans, investor presentations, or tax filing. Our reports include spending trends, category breakdowns, cash flow analysis, and projections. Export to PDF or Excel formats that banks and investors expect. Track profitability, identify cost-saving opportunities, and make data-driven financial decisions.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile-First Approach */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#082118'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-white">Mobile-First Approach</h3>
              <p className="text-sm text-white mb-4">
                Manage expenses and scan receipts on-the-go.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Mobile-First Approach</DialogTitle>
                    <DialogDescription>
                      KudiScan was designed for the mobile-first Nigerian market. Capture receipts instantly, work offline when needed, and sync across all devices. The interface is optimized for touch, works on slow networks, and consumes minimal data. Perfect for busy entrepreneurs who need to track expenses while moving between meetings, markets, or client visits.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Bank-level Security */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#082118'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-white">Bank-level Security</h3>
              <p className="text-sm text-white mb-4">
                Your financial data is protected with enterprise-grade encryption and security.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Bank-level Security</DialogTitle>
                    <DialogDescription>
                      Your data is protected with 256-bit AES encryption, the same standard used by major banks. We use secure data centers in Nigeria, comply with international privacy standards, and never store sensitive banking credentials. Two-factor authentication, regular security audits, and encrypted data transmission ensure your financial information stays private and secure.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Naira Currency */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#082118'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-white">₦</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-white">Naira Currency</h3>
              <p className="text-sm text-white mb-4">
                Built for Nigerian users with native Naira support and local preferences.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Naira Currency Support</DialogTitle>
                    <DialogDescription>
                      Every feature is built with Nigerian Naira as the primary currency. Automatic kobo calculations, proper number formatting, local tax considerations, and support for cash-heavy business models. Integration with Nigerian payment systems, understanding of local business practices, and support for both formal and informal sector expense tracking needs.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 w-full" style={{backgroundColor: '#2D3339'}}>
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-12 font-display" style={{color: '#E1E7EF'}}>
            How KudiScan works
          </h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Scan className="w-16 h-16" style={{color: '#29A378'}} />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display" style={{color: '#E1E7EF'}}>Add Expense</h3>
              <p className="text-sm" style={{color: '#959AA0'}}>
                Press the Scan or Upload button to add receipt
              </p>
            </div>

            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-16 h-16" style={{color: '#29A378'}} />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display" style={{color: '#E1E7EF'}}>Track & Analyze</h3>
              <p className="text-sm" style={{color: '#959AA0'}}>
                View spending analytics, category breakdowns, and budget tracking to understand your spending patterns.
              </p>
            </div>

            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl" style={{color: '#29A378'}}>₦</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display" style={{color: '#E1E7EF'}}>Generate Reports</h3>
              <p className="text-sm" style={{color: '#959AA0'}}>
                Generate expense reports for tracking, reimbursements, business investors and bank loan applications.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="px-8" data-testid="button-get-started-main">
              Get Started
            </Button>

          </div>
        </div>
      </section>

      {/* Nigerian Federal Government Compliance Section */}
      <section className="px-4 py-16 w-full bg-background">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-4 font-display text-foreground">
            Supporting Nigerian Business Growth
          </h2>
          <p className="text-center mb-12 text-muted-foreground max-w-3xl mx-auto">
            KudiScan aligns with Federal Government initiatives to drive economic development by providing businesses with the financial transparency and documentation needed for growth opportunities.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-card border border-border">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#29A378'}}>
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">Business Credit Readiness</h3>
              <p className="text-sm text-muted-foreground">
                Generate comprehensive financial reports that meet Central Bank of Nigeria (CBN) lending requirements and help establish creditworthiness for SME development programs.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-card border border-border">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#29A378'}}>
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">Tax Compliance</h3>
              <p className="text-sm text-muted-foreground">
                Maintain accurate expense records that support VAT filing, company income tax returns, and comply with Federal Inland Revenue Service (FIRS) digital documentation standards.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-card border border-border">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#29A378'}}>
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">Economic Growth Support</h3>
              <p className="text-sm text-muted-foreground">
                Support the National Economic Recovery and Growth Plan (ERGP) by providing transparent financial management tools that help Nigerian businesses scale and contribute to economic diversification.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="max-w-2xl mx-auto p-6 rounded-2xl" style={{backgroundColor: '#29A378'}}>
              <h4 className="text-xl font-semibold mb-3 text-white">Empowering Nigerian Businesses for the Future</h4>
              <p className="text-white/90 text-sm leading-relaxed">
                KudiScan helps businesses build the financial foundation needed to access government intervention funds, participate in economic development programs, and meet regulatory requirements that drive sustainable growth across Nigeria's emerging sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="px-4 py-16 w-full" style={{backgroundColor: '#22262A'}}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-4 font-display" style={{color: '#E1E7EF'}}>
            Seamless Integration
          </h2>
          <p className="text-center mb-12" style={{color: '#959AA0'}}>
            KudiScan works with your favorite tools and platforms
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-2xl" style={{backgroundColor: '#292E33'}}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{color: '#E1E7EF'}}>Email Integration</h3>
              <p className="text-sm" style={{color: '#959AA0'}}>
                Forward receipts to receipts@kudiscan.com for automatic processing
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl" style={{backgroundColor: '#292E33'}}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏦</span>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{color: '#E1E7EF'}}>Bank Integration</h3>
              <p className="text-sm" style={{color: '#959AA0'}}>
                Connect with major Nigerian banks for complete financial oversight
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl" style={{backgroundColor: '#292E33'}}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{color: '#E1E7EF'}}>Export Options</h3>
              <p className="text-sm" style={{color: '#959AA0'}}>
                Export data to Excel, PDF, or your accounting software
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 w-full" style={{backgroundColor: '#29A378'}}>
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-12 font-display" style={{color: '#E1E7EF'}}>
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="rounded-2xl" style={{backgroundColor: '#2D3339'}}>
              <AccordionTrigger className="px-6 py-4 text-left" style={{color: '#29A378'}}>
                <span className="text-lg font-semibold">Is KudiScan free?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4" style={{color: '#E1E7EF'}}>
                Yes, we offer a free plan for personal use with up to 10 receipt scans per month. For businesses and power users, our Premium plan starts at ₦3,000/month with unlimited scans, advanced reporting, and priority support.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="rounded-2xl" style={{backgroundColor: '#2D3339'}}>
              <AccordionTrigger className="px-6 py-4 text-left" style={{color: '#29A378'}}>
                <span className="text-lg font-semibold">Will it work with Nigerian banks?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4" style={{color: '#E1E7EF'}}>
                Absolutely! KudiScan is specifically built for the Nigerian market. We integrate with major Nigerian banks including GTBank, First Bank, UBA, Zenith, and others. Our system understands Nigerian transaction formats, supports Naira currency natively, and handles local payment methods including mobile money and POS transactions.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="rounded-2xl" style={{backgroundColor: '#2D3339'}}>
              <AccordionTrigger className="px-6 py-4 text-left" style={{color: '#29A378'}}>
                <span className="text-lg font-semibold">Is my data secure?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4" style={{color: '#E1E7EF'}}>
                Your security is our top priority. We use bank-grade 256-bit AES encryption, secure Nigerian data centers, and comply with international privacy standards. We never store your banking credentials - only transaction data that you explicitly choose to share. All data transmission is encrypted and we undergo regular security audits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 w-full" style={{backgroundColor: '#2D3339'}}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-12 font-display text-white">
            What KudiScan Users Are Saying
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl hover:scale-105 transition-transform duration-300" style={{backgroundColor: '#0C3124'}}>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg mb-4 text-white break-words">
                "KudiScan has saved me hours every week. No more manual tracking — my expenses just flow in."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Chidinma</p>
                  <p className="text-sm text-white/70">Lagos entrepreneur</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl hover:scale-105 transition-transform duration-300" style={{backgroundColor: '#0C3124'}}>
              <div className="flex items-center mb-3">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-4 h-4 text-gray-300" />
              </div>
              <p className="text-lg mb-4 text-white break-words">
                "Before KudiScan, I lost track of small expenses. Now, I know exactly where my Naira goes."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Tunde</p>
                  <p className="text-sm text-white/70">Freelancer</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl hover:scale-105 transition-transform duration-300" style={{backgroundColor: '#0C3124'}}>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg mb-4 text-white break-words">
                "KudiScan makes expense tracking incredibly easy! The interface is intuitive and the OCR accuracy is outstanding."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Adebayo M.</p>
                  <p className="text-sm text-white/70">Small business owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-16 w-full" style={{backgroundColor: '#22262A'}}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-4 font-display" style={{color: '#E1E7EF'}}>
            Choose Plan
          </h2>
          <p className="text-center mb-12" style={{color: '#959AA0'}}>
            Start free and upgrade when you're ready to scale your finance management.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Freemium Plan */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 relative">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 font-display" style={{color: '#E1E7EF'}}>Freemium</h3>
                <div className="text-4xl font-bold mb-2" style={{color: '#E1E7EF'}}>
                  ₦0<span className="text-lg font-normal" style={{color: '#959AA0'}}>/month</span>
                </div>
                <p style={{color: '#959AA0'}}>Perfect for getting started with expense tracking</p>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Up to 10 receipt scans per month</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Basic expense categorization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Simple spending reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Mobile app access</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Naira currency support</span>
                </div>
              </div>
              
              <div className="text-center">
                <Button size="lg" variant="outline" className="px-8" style={{borderColor: '#29A378', color: '#29A378'}}>
                  Get Started Free
                </Button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-card border-2 border-primary rounded-2xl p-6 md:p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 font-display" style={{color: '#E1E7EF'}}>Premium</h3>
                <div className="text-4xl font-bold mb-2" style={{color: '#E1E7EF'}}>
                  ₦3,000<span className="text-lg font-normal" style={{color: '#959AA0'}}>/month</span>
                </div>
                <p className="text-sm mb-2" style={{color: '#959AA0'}}>₦28,800/year - Save 20%</p>
                <p style={{color: '#959AA0'}}>Complete finance management for individuals and businesses.</p>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Unlimited receipt scans</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Advanced AI-powered categorization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Professional expense reports & analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Budget tracking & alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Tax-ready financial reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Business loan application support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Priority email support</span>
                </div>

              </div>
              
              <div className="text-center">
                <Button size="lg" className="px-8 bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* Footer CTA */}
      <section className="px-4 py-16 bg-primary text-white w-full">
        <div className="max-w-2xl mx-auto text-center w-full">
          <h2 className="text-3xl font-bold mb-4 font-display text-primary-foreground">Start managing your expenses today</h2>
          <p className="text-primary-foreground/80 mb-8">
            Join thousands of Nigerian users who trust KudiScan for their expense tracking needs.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="px-8" data-testid="button-footer-cta">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 md:py-16 w-full bg-background border-t border-border">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Company Info */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-bold mb-4 font-display">
                <span style={{color: '#29A378'}}>Kudi</span>
                <span className="text-white">Scan</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your automated finance assistant for Nigerian businesses. Scan, track, and scale with confidence.
              </p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-foreground">Product</h4>
              <div className="space-y-2">
                <Link href="/features" className="block text-sm text-muted-foreground hover:text-primary">Features</Link>
                <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-primary">Pricing</Link>
                <Link href="/security" className="block text-sm text-muted-foreground hover:text-primary">Security</Link>
                <Link href="/mobile" className="block text-sm text-muted-foreground hover:text-primary">Mobile App</Link>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-foreground">Resources</h4>
              <div className="space-y-2">
                <Link href="/help" className="block text-sm text-muted-foreground hover:text-primary">Help Center</Link>
                <Link href="/blog" className="block text-sm text-muted-foreground hover:text-primary">Blog</Link>
                <Link href="/api" className="block text-sm text-muted-foreground hover:text-primary">API Docs</Link>
                <Link href="/status" className="block text-sm text-muted-foreground hover:text-primary">System Status</Link>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-foreground">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary">About Us</Link>
                <Link href="/careers" className="block text-sm text-muted-foreground hover:text-primary">Careers</Link>
                <Link href="/contact" className="block text-sm text-muted-foreground hover:text-primary">Contact</Link>
                <Link href="/press" className="block text-sm text-muted-foreground hover:text-primary">Press Kit</Link>
              </div>
            </div>
          </div>

          {/* Bottom Section with Stylized Logo and Scroll to Top */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © 2025 KudiScan. © Powered by WebArtistry. All rights reserved. Built for Nigeria 🇳🇬
              </p>
            </div>
            
            {/* Scroll to Top Arrow */}
            <div className="flex items-center">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                aria-label="Scroll to top"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}