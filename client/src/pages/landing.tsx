import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scan, PieChart, Receipt, Shield, Users, Smartphone, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10">
      {/* Hero Section */}
      <section className="px-4 pt-8 pb-12">
        <div className="max-w-md mx-auto text-center">
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">K</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-display">
            Kudi<span className="text-primary">Scan</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            The smart way to track expenses in Nigeria. Scan receipts, track spending, and manage your finances effortlessly.
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-3 mb-8">
            <Link href="/register">
              <Button size="lg" className="w-full text-lg py-6" data-testid="button-get-started">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full text-lg py-6" data-testid="button-sign-in">
                Sign In
              </Button>
            </Link>
          </div>

          <Badge variant="secondary" className="px-4 py-2 text-sm">
            🇳🇬 Built for Nigerian users • Naira currency support
          </Badge>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 pb-12">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8 font-display">
            Everything you need to manage expenses
          </h2>
          
          <div className="grid gap-4">
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Scan className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">Smart Receipt Scanning</h3>
                    <p className="text-gray-600 text-sm">
                      Snap photos of receipts and let AI extract merchant, amount, and date automatically.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PieChart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">Detailed Analytics</h3>
                    <p className="text-gray-600 text-sm">
                      View spending patterns by category, track monthly budgets, and get insights into your habits.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Receipt className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">Expense Categories</h3>
                    <p className="text-gray-600 text-sm">
                      Organize expenses with smart categories including food, transport, utilities, and more.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">Mobile-First Design</h3>
                    <p className="text-gray-600 text-sm">
                      Optimized for smartphones with intuitive navigation and offline receipt storage.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 pb-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0 bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center items-center space-x-8 mb-6">
                <div>
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Receipts Scanned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">₦2M+</div>
                  <div className="text-sm text-gray-600">Tracked</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">
                "KudiScan has revolutionized how I track my business expenses. The OCR is incredibly accurate!"
              </p>
              <p className="text-gray-500 text-xs mt-2">- Adebayo O., Lagos</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 pb-8">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <Shield className="w-5 h-5 text-gray-400" />
            <Users className="w-5 h-5 text-gray-400" />
            <Receipt className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500">
            Secure • Private • Made in Nigeria
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © 2025 KudiScan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}