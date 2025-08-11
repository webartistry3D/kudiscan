import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scan, PieChart, Receipt, Shield, Users, Smartphone, ArrowRight, Star, Car, Camera, TrendingUp, FileText, Building } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Hero Section */}
      <section className="px-4 py-16 w-full bg-primary-light">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 font-display">
            Snap. Scan. Track. Report.
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
            <p className="text-lg text-muted-foreground text-center mb-6">
              Your automated finance assistant.
            </p>
            
            {/* Process Flow */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
              {/* Step 1: Snap */}
              <div className="flex flex-col items-center text-center p-4 w-48 h-36">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <Camera className="w-6 h-6 text-white process-icon-1" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-sm">Snap</h3>
                <p className="text-xs leading-tight text-white">Snap / Upload a receipt to scan your expenses</p>
              </div>
              
              {/* Arrow 1 */}
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <div className="md:hidden">
                <div className="w-6 h-6 rotate-90">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              {/* Step 2: Track */}
              <div className="flex flex-col items-center text-center p-4 w-48 h-36">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-white process-icon-2" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-sm">Track</h3>
                <p className="text-xs leading-tight text-white">Track spending across categories with intelligent insights</p>
              </div>
              
              {/* Arrow 2 */}
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <div className="md:hidden">
                <div className="w-6 h-6 rotate-90">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              {/* Step 3: Report */}
              <div className="flex flex-col items-center text-center p-4 w-48 h-36">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-white process-icon-3" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-sm">Report</h3>
                <p className="text-xs leading-tight text-white">Generate professional expense reports for business use</p>
              </div>
              
              {/* Arrow 3 */}
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <div className="md:hidden">
                <div className="w-6 h-6 rotate-90">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              {/* Step 4: Scale */}
              <div className="flex flex-col items-center text-center p-4 w-48 h-36">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                  <Building className="w-6 h-6 text-white process-icon-4" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-sm">Scale</h3>
                <p className="text-xs leading-tight text-white">Secure loans from banks and investors to scale your business</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-card/60 border border-border rounded-2xl p-6 md:p-8 mb-8 w-full max-w-lg mx-auto">
            <h3 className="text-lg font-semibold mb-4 font-display text-foreground text-center">I want to:</h3>
            
            <div className="flex flex-col gap-3 w-full mx-auto">
              <Link href="/register" className="w-full">
                <Button size="lg" className="w-full justify-center text-center px-4" data-testid="button-personal">
                  Track my personal expenses
                </Button>
              </Link>
              
              <Link href="/register" className="w-full">
                <Button variant="outline" size="lg" className="w-full justify-center text-center px-4" data-testid="button-small-business">
                  Manage expenses for my small business
                </Button>
              </Link>
              

            </div>
          </div>
        </div>
      </section>



      {/* Company Logos */}
      <section className="px-4 py-8 bg-secondary/30 w-full">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h3 className="text-lg font-semibold mb-8 font-display text-foreground">Join 100,000+ users who trust KudiScan</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 opacity-60 w-full">
            <div className="flex items-center justify-center h-12 bg-card border border-border rounded text-sm font-semibold text-foreground">
              Konga
            </div>
            <div className="flex items-center justify-center h-12 bg-card border border-border rounded text-sm font-semibold text-foreground">
              Jumia
            </div>
            <div className="flex items-center justify-center h-12 bg-card border border-border rounded text-sm font-semibold text-foreground">
              GTBank
            </div>
            <div className="flex items-center justify-center h-12 bg-card border border-border rounded text-sm font-semibold text-foreground">
              Flutterwave
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 w-full" style={{backgroundColor: '#29A378'}}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-4 font-display" style={{color: '#082118'}}>Features</h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 w-full">
            {/* Receipt Scanning */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Scan className="w-12 h-12" style={{color: '#082118'}} />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display" style={{color: '#082118'}}>Receipt Scanning</h3>
              <p className="text-sm" style={{color: '#082118'}}>
                Snap to Scan, Save & Track receipts.
              </p>
              <Button variant="link" className="text-sm mt-2 p-0" style={{color: '#082118'}}>Learn More</Button>
            </div>

            {/* AI + OCR Integration */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl" style={{color: '#082118'}}>🧠</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display" style={{color: '#082118'}}>AI + OCR Integration</h3>
              <p className="text-sm" style={{color: '#082118'}}>
                AI powered OCR technology automatically extracts and categorizes all data on receipts.
              </p>
              <Button variant="link" className="text-sm mt-2 p-0" style={{color: '#082118'}}>Learn More</Button>
            </div>

            {/* Financial Reporting */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-12 h-12" style={{color: '#082118'}} />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display" style={{color: '#082118'}}>Financial Reporting</h3>
              <p className="text-sm" style={{color: '#082118'}}>
                Generate tailored reports to analyze spend, identify trends, make smarter decisions, secure bank loans.
              </p>
              <Button variant="link" className="text-sm mt-2 p-0" style={{color: '#082118'}}>Learn More</Button>
            </div>

            {/* Mobile-First Approach */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-12 h-12" style={{color: '#082118'}} />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display" style={{color: '#082118'}}>Mobile-First Approach</h3>
              <p className="text-sm" style={{color: '#082118'}}>
                Manage expenses and scan receipts on-the-go.
              </p>
              <Button variant="link" className="text-sm mt-2 p-0" style={{color: '#082118'}}>Learn More</Button>
            </div>

            {/* Bank-level Security */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-12 h-12" style={{color: '#082118'}} />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display" style={{color: '#082118'}}>Bank-level Security</h3>
              <p className="text-sm" style={{color: '#082118'}}>
                Your financial data is protected with enterprise-grade encryption and security.
              </p>
              <Button variant="link" className="text-sm mt-2 p-0" style={{color: '#082118'}}>Learn More</Button>
            </div>

            {/* Naira Currency */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl" style={{color: '#082118'}}>₦</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display" style={{color: '#082118'}}>Naira Currency</h3>
              <p className="text-sm" style={{color: '#082118'}}>
                Built for Nigerian users with native Naira support and local preferences.
              </p>
              <Button variant="link" className="text-sm mt-2 p-0" style={{color: '#082118'}}>Learn More</Button>
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
                Generate expense reports for tracking, reimbursements, investors and bank loan applications.
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
      <section className="px-4 py-16 w-full" style={{backgroundColor: '#0C3124'}}>
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-12 font-display" style={{color: '#E1E7EF'}}>
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#2D3339'}}>
              <h3 className="text-lg font-semibold mb-3" style={{color: '#29A378'}}>
                Is KudiScan free?
              </h3>
              <p style={{color: '#E1E7EF'}}>
                Yes, we offer a free plan for personal use, plus affordable plans for SMEs.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#2D3339'}}>
              <h3 className="text-lg font-semibold mb-3" style={{color: '#29A378'}}>
                Will it work with Nigerian banks?
              </h3>
              <p style={{color: '#E1E7EF'}}>
                Yes — we're built with Nigerian financial data in mind.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl" style={{backgroundColor: '#2D3339'}}>
              <h3 className="text-lg font-semibold mb-3" style={{color: '#29A378'}}>
                Is my data secure?
              </h3>
              <p style={{color: '#E1E7EF'}}>
                100%. We use bank-grade encryption to protect your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 w-full overflow-hidden" style={{backgroundColor: '#22262A'}}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center mb-12 font-display" style={{color: '#E1E7EF'}}>
            What Our Users Say
          </h2>
          
          <div className="relative">
            <div className="flex gap-6 animate-scroll">
              <div className="min-w-80 p-6 rounded-2xl" style={{backgroundColor: '#292E33'}}>
                <p className="text-lg mb-4" style={{color: '#E1E7EF'}}>
                  "KudiScan has saved me hours every week. No more manual tracking — my expenses just flow in."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div>
                    <p className="font-semibold" style={{color: '#29A378'}}>Chidinma</p>
                    <p className="text-sm" style={{color: '#959AA0'}}>Lagos entrepreneur</p>
                  </div>
                </div>
              </div>
              
              <div className="min-w-80 p-6 rounded-2xl" style={{backgroundColor: '#292E33'}}>
                <p className="text-lg mb-4" style={{color: '#E1E7EF'}}>
                  "Before KudiScan, I lost track of small expenses. Now, I know exactly where my Naira goes."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                  </div>
                  <div>
                    <p className="font-semibold" style={{color: '#29A378'}}>Tunde</p>
                    <p className="text-sm" style={{color: '#959AA0'}}>Freelancer</p>
                  </div>
                </div>
              </div>
              
              {/* Duplicate cards for seamless loop */}
              <div className="min-w-80 p-6 rounded-2xl" style={{backgroundColor: '#292E33'}}>
                <p className="text-lg mb-4" style={{color: '#E1E7EF'}}>
                  "KudiScan has saved me hours every week. No more manual tracking — my expenses just flow in."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div>
                    <p className="font-semibold" style={{color: '#29A378'}}>Chidinma</p>
                    <p className="text-sm" style={{color: '#959AA0'}}>Lagos entrepreneur</p>
                  </div>
                </div>
              </div>
              
              <div className="min-w-80 p-6 rounded-2xl" style={{backgroundColor: '#292E33'}}>
                <p className="text-lg mb-4" style={{color: '#E1E7EF'}}>
                  "Before KudiScan, I lost track of small expenses. Now, I know exactly where my Naira goes."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                  </div>
                  <div>
                    <p className="font-semibold" style={{color: '#29A378'}}>Tunde</p>
                    <p className="text-sm" style={{color: '#959AA0'}}>Freelancer</p>
                  </div>
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
            Choose Your Plan
          </h2>
          <p className="text-center mb-12" style={{color: '#959AA0'}}>
            Start free and upgrade when you're ready to scale your financial management
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
              
              <Button size="lg" className="w-full" variant="outline" style={{borderColor: '#29A378', color: '#29A378'}}>
                Get Started Free
              </Button>
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
                <p style={{color: '#959AA0'}}>Complete financial management for individuals and businesses</p>
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
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span style={{color: '#E1E7EF'}}>Multi-user access (up to 3 users)</span>
                </div>
              </div>
              
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                Start Premium Trial
              </Button>
              <p className="text-center mt-2 text-sm" style={{color: '#959AA0'}}>
                14-day free trial, then ₦3,000/month
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="mb-4" style={{color: '#959AA0'}}>
              Need enterprise features? Custom pricing available for teams of 10+ users.
            </p>
            <Button variant="link" style={{color: '#29A378'}}>
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 w-full bg-primary-medium">
        <div className="max-w-4xl mx-auto w-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
            {/* First Testimonial */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-3 font-display text-foreground">"Makes expense tracking easy!"</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  "KudiScan has a really easy interface for uploading receipts and getting expense reports submitted. The OCR is incredibly accurate and saves me so much time every month."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Adebayo M.</p>
                    <div className="flex items-center space-x-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Second Testimonial */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-3 font-display text-foreground">"Perfect for small business"</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  "KudiScan helps our company ensure compliance and accountability. The automated report process really works and my finance team can easily track budget vs actual spending."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Kemi O.</p>
                    <div className="flex items-center space-x-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
    </div>
  );
}