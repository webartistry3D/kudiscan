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
          <div className="flex items-center justify-center space-x-2 mb-8 p-4 bg-primary-medium rounded-lg max-w-md mx-auto">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground px-3 py-1">
              Trustpilot
            </Badge>
            <div className="flex items-center space-x-1">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">4.5 (1,200+ reviews)</span>
          </div>
          
          <div className="max-w-5xl mx-auto mb-8">
            <p className="text-lg text-muted-foreground text-center mb-8">
              KudiScan is your AI-powered finance assistant.
            </p>
            
            {/* Process Flow */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Step 1: Snap */}
              <div className="flex flex-col items-center text-center bg-card/60 border border-border rounded-xl p-6 max-w-xs">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-3">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Snap</h3>
                <p className="text-sm text-muted-foreground">Simply snap a receipt and scan your expenses automatically</p>
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
              <div className="flex flex-col items-center text-center bg-card/60 border border-border rounded-xl p-6 max-w-xs">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Track</h3>
                <p className="text-sm text-muted-foreground">Track spending across categories with intelligent insights</p>
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
              <div className="flex flex-col items-center text-center bg-card/60 border border-border rounded-xl p-6 max-w-xs">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Report</h3>
                <p className="text-sm text-muted-foreground">Generate professional expense reports for business use</p>
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
              <div className="flex flex-col items-center text-center bg-card/60 border border-border rounded-xl p-6 max-w-xs">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-3">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Scale</h3>
                <p className="text-sm text-muted-foreground">Secure loans from banks and investors to scale your business</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-card/60 border border-border rounded-2xl p-6 md:p-8 mb-8 w-full max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 font-display text-foreground text-center">I want to:</h3>
            
            <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto">
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
              
              <Link href="/register" className="w-full">
                <Button variant="outline" size="lg" className="w-full justify-center text-center px-4" data-testid="button-enterprise">
                  Enterprise expense management
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Or get started with</p>
              <Button variant="outline" className="bg-background mx-auto">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjcxIDkuMjA0NTVDMTcuNzEgOC41NjY0IDE3LjY1NDUgNy45NzI3MyAxNy41NTQ1IDcuNDA5MDlIMTBWMTAuNzVIMTQuMzI3M0MxNC4xNTQ1IDExLjUzNjQgMTMuNjcyNyAxMi4yMDQ1IDEyLjk0NTUgMTIuNjE4MlYxNC42MzY0SDE1LjQwOTFDMTYuNzU0NSAxMy4zODY0IDE3LjcxIDEwLjkxIDEzLjcxIDkuMjA0NTVaIiBmaWxsPSIjNDA4MUVEIi8+CjxwYXRoIGQ9Ik0xMCA0SDEuNUMxLjIyMzg2IDEgMSAxLjIyMzg2IDEgMS41VjE2LjVDMSAxNi43NzYxIDEuMjIzODYgMTcgMS41IDE3SDE2LjVDMTYuNzc2MSAxNyAxNyAxNi43NzYxIDE3IDE2LjVWOC41IiBzdHJva2U9IiMzNDc0MkQiIHN0cm9rZS13aWR0aD0iLjUiLz4KPC9zdmc+" alt="Google" className="w-4 h-4 mr-2" />
                Google
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="px-4 py-12 bg-secondary/30 w-full">
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
      <section className="px-4 py-16 w-full bg-primary-light">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4 font-display">Features</h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 w-full">
            {/* Receipt Scanning */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Scan className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">Receipt scanning</h3>
              <p className="text-muted-foreground text-sm">
                Snap a photo, forward to receipts@kudiscan.com, or upload a file – we'll scan the details!
              </p>
              <Button variant="link" className="text-primary text-sm mt-2 p-0">Learn More</Button>
            </div>

            {/* Expense Management */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">Expense management</h3>
              <p className="text-muted-foreground text-sm">
                Automatically create, submit, approve, and track expenses. Reports sync automatically.
              </p>
              <Button variant="link" className="text-primary text-sm mt-2 p-0">Learn More</Button>
            </div>

            {/* Analytics */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">Financial reporting</h3>
              <p className="text-muted-foreground text-sm">
                Build tailored reports to analyze spend, identify trends, and support smarter decisions.
              </p>
              <Button variant="link" className="text-primary text-sm mt-2 p-0">Learn More</Button>
            </div>

            {/* Mobile App */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">Mobile app</h3>
              <p className="text-muted-foreground text-sm">
                Manage expenses and scan receipts on the go. All functionality included.
              </p>
              <Button variant="link" className="text-primary text-sm mt-2 p-0">Learn More</Button>
            </div>

            {/* Security */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">Bank-level security</h3>
              <p className="text-muted-foreground text-sm">
                Your financial data is protected with enterprise-grade encryption and security.
              </p>
              <Button variant="link" className="text-primary text-sm mt-2 p-0">Learn More</Button>
            </div>

            {/* Local Currency */}
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary">₦</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">Naira currency</h3>
              <p className="text-muted-foreground text-sm">
                Built specifically for Nigerian users with native Naira support and local preferences.
              </p>
              <Button variant="link" className="text-primary text-sm mt-2 p-0">Learn More</Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">See All Features</Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 bg-secondary/30 w-full">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12 font-display">
            How KudiScan's free trial works
          </h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Scan className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">1. Add Expense</h3>
              <p className="text-muted-foreground text-sm">
                Upload your first receipt with the mobile app, drag-and-drop on the web, or forward it to receipts@kudiscan.com.
              </p>
            </div>

            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">2. Create Report</h3>
              <p className="text-muted-foreground text-sm">
                Automatically generate expense reports for tracking or reimbursement. Add categories, tags, and comments, then submit.
              </p>
            </div>

            <div className="text-center w-full max-w-sm mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-foreground">3. Track & Analyze</h3>
              <p className="text-muted-foreground text-sm">
                View detailed spending analytics, category breakdowns, and budget tracking to understand your financial patterns.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="px-8" data-testid="button-get-started-main">
              Get Started
            </Button>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground px-3 py-1">
                Trustpilot
              </Badge>
              <div className="flex items-center space-x-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">4.5 (1,200+ reviews)</span>
            </div>
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