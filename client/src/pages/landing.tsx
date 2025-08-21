import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Scan, PieChart, Receipt, Shield, Users, Smartphone, ArrowRight, Star, Car, Camera, TrendingUp, FileText, Building, Eye, Moon, Sun, ChevronUp, StarIcon, BarChart3, FileBarChart, Plus, Bot, MessageCircle, Calendar } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";
import { FeedbackModal } from "@/components/feedback-modal";
import { WhatsAppBusiness } from "@/components/whatsapp-business";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Mail, Phone, MapPin } from "lucide-react";

// Add CSS animations for seamless sliding carousel
const slideAnimationCSS = `
  @keyframes slideInOut {
    0% {
      transform: translateX(120%);
      opacity: 1;
    }
    8% {
      transform: translateX(0%);
      opacity: 1;
    }
    92% {
      transform: translateX(0%);
      opacity: 1;
    }
    100% {
      transform: translateX(-120%);
      opacity: 1;
    }
  }
  
  .slide-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: transparent;
  }
  
  .slide-content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    top: 0;
    left: 0;
  }
`;

export default function Landing() {
  const { settings, toggleDarkMode } = useSettings();
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Scan. Track. Report. Secure Business Loans.";
  
  // Carousel state for features
  const [currentFeature, setCurrentFeature] = useState(-1); // Start with -1 to hide first slide initially
  const [isCarouselLoaded, setIsCarouselLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showSlides, setShowSlides] = useState(false);
  const [isFirstSlideShown, setIsFirstSlideShown] = useState(false);
  
  const features = [
    {
      icon: TrendingUp,
      title: "85% Higher Loan Approval Rate",
      type: "benefit",
      description: "Professional expense reports increase your loan approval chances by 85%.",
      detail: "Banks and investors approve 85% more loan applications when backed by organized financial records. KudiScan's professional reports demonstrate financial discipline and provide the documentation lenders require for business expansion funding.",
      color: "#166534" // Dark green
    },
    {
      icon: Scan,
      title: "Receipt Scanning",
      type: "feature",
      description: "Snap to Scan, Save & Track receipts.",
      detail: "Advanced OCR technology instantly captures and stores your receipts. Simply snap a photo and our AI automatically extracts merchant data, amounts, dates, and itemized purchases.",
      color: "#1e3a8a" // Dark blue
    },
    {
      icon: TrendingUp,
      title: "Save 10+ Hours of Work, Weekly",
      type: "benefit",
      description: "Eliminate manual data entry and receipt organization completely.",
      detail: "No more typing expense amounts or hunting for lost receipts. KudiScan automates everything, giving you back hours each week to focus on growing your business instead of paperwork.",
      color: "#581c87" // Dark purple
    },
    {
      icon: Eye,
      title: "AI + OCR Integration", 
      type: "feature",
      description: "AI powered OCR technology automatically extracts and categorizes all data on receipts.",
      detail: "Our AI combines Machine Learning with optical character recognition to understand your receipts like a human would. It recognizes local context and learns from your patterns.",
      color: "#b44a11ff" // Orange
    },
    {
      icon: FileText,
      title: "Get Bank Loans Faster",
      type: "benefit",
      description: "Professional financial reports that banks and investors trust.",
      detail: "Access to business credit becomes simple when you have organized financial records. Our reports meet banking standards and help you secure loans, investments, or government grants for business growth.",
      color: "#134e4a" // Dark teal
    },
    {
      icon: BarChart3,
      title: "Financial Reporting",
      type: "feature",
      description: "Generate tailored reports to analyze spend, identify trends, make smarter decisions and secure bank loans.",
      detail: "Create professional reports for business loans, investor presentations, or tax filing. Export to PDF or Excel formats that banks and investors expect.",
      color: "#a16207" // Dark yellow
    },
    {
      icon: Building,
      title: "Scale Your Business",
      type: "benefit",
      description: "Make data-driven decisions with real-time spending insights.",
      detail: "Know exactly where your money goes and identify cost-saving opportunities. Track profitability by category, spot trends early, and make smarter financial decisions that help your business grow sustainably.",
      color: "#3730a3" // Dark indigo
    },
    {
      icon: Smartphone,
      title: "Mobile-First Approach",
      type: "feature",
      description: "Manage expenses and scan receipts on-the-go.",
      detail: "KudiScan was designed for the mobile-first Nigerian market. Capture receipts instantly, work offline when needed, and sync across all devices.",
      color: "#334155" // Dark slate
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      type: "benefit",
      description: "Your financial data stays private and completely secure.",
      detail: "Sleep peacefully knowing your sensitive business data is protected with the same 256-bit encryption used by major Nigerian banks. Your information never leaves secure Nigerian data centers.",
      color: "#166534" // Dark green
    },
    {
      icon: () => <span className="text-4xl">₦</span>,
      title: "Naira Currency Support",
      type: "feature",
      description: "Built for Nigerian users with native Naira support and local preferences.",
      detail: "Every feature is built with Nigerian Naira as the primary currency. Automatic kobo calculations, proper number formatting, and integration with Nigerian payment systems.",
      color: "#5b21b6" // Dark violet
    },
    {
      icon: Star,
      title: "Start Free Today",
      type: "benefit",
      description: "Begin tracking expenses immediately with no upfront costs.",
      detail: "Get started with 10 free receipt scans monthly. Experience the full KudiScan advantage risk-free, then upgrade when you're ready to unlock unlimited scanning and advanced features.",
      color: "#a855f7" // Lilac
    }
  ];
  
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
  
  // Carousel effect with proper initialization to prevent loading bugs
  useEffect(() => {
    let carouselTimer: NodeJS.Timeout;
    
    // Set initial load state
    const loadingDelay = setTimeout(() => {
      setIsCarouselLoaded(true);
    }, 500);
    
    // Show first slide after a delay (3 seconds after page load)
    const firstSlideDelay = setTimeout(() => {
      setShowSlides(true);
      setCurrentFeature(0); // Show first slide
      setIsFirstSlideShown(true);
    }, 3000);
    
    // Initialize carousel after first slide is shown (start with slide 1, not cycling back to 0)
    const initializationDelay = setTimeout(() => {
      setHasAnimated(true); // Enable animations for subsequent slides
      setCurrentFeature(1); // Move to second slide immediately
      
      let slideIndex = 1; // Start from second slide
      carouselTimer = setInterval(() => {
        slideIndex = slideIndex + 1;
        // Skip slide 0 (first slide) in the cycle to prevent reappearance
        if (slideIndex >= features.length) {
          slideIndex = 1; // Skip back to slide 1, not slide 0
        }
        setCurrentFeature(slideIndex);
      }, 6000); // Change feature/benefit every 6 seconds for slow, captivating viewing
    }, 9000); // Start carousel after first slide has been displayed for 6 seconds
    
    return () => {
      clearTimeout(loadingDelay);
      clearTimeout(firstSlideDelay);
      clearTimeout(initializationDelay);
      if (carouselTimer) clearInterval(carouselTimer);
    };
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: slideAnimationCSS}} />
      {/* Navbar */}
      {/* <nav className="px-4 py-4 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="w-10 h-10 text-primary mr-2" />
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
      </nav> */}

      {/* Hero Section */}
      <section id="home" className="px-4 py-8 w-full pt-24 md:pt-28 lg:pt-32" style={{backgroundColor: '#29A378'}}>
        <div className="max-w-4xl mx-auto text-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 font-display h-[3rem] sm:h-[4rem] md:h-[5rem] lg:h-[6rem] xl:h-[7rem] flex items-center justify-center">
            <span className="typing-text inline-block text-center">
              {displayText}
              {isTyping && <span className="animate-pulse">|</span>}
            </span>
          </h1>
        
          
      {/* Trust Badge */}

          
          {/* Feature Carousel Display */}
          <div className="relative flex items-center justify-center gap-6 max-w-4xl mx-auto mb-1 -mt-2">
            {/* Samsung Tablet with Feature Carousel */}
            <div className="hidden md:block relative">
              <svg width="600" height="420" viewBox="0 0 720 480" className="drop-shadow-2xl">
                {/* Tablet Frame - Horizontal Samsung Style (1.5x larger) */}
                <rect x="15" y="30" width="690" height="420" rx="30" fill="#1f2937" stroke="#374151" strokeWidth="3"/>
                <rect x="30" y="45" width="660" height="390" rx="22" fill="#111827"/>
                
                {/* Front Camera */}
                <circle cx="600" cy="70" r="4" fill="#374151"/>
                <circle cx="600" cy="70" r="2" fill="#1f2937"/>
                

                
                {/* Screen Content - Feature Display (1.5x larger) */}
                <rect x="60" y="60" width="600" height="360" fill="#111827"/>
                
                {/* Centered KudiBot Logo (1.5x larger) */}
                <foreignObject x="300" y="195" width="120" height="120">
                  <div className="w-full h-full flex items-center justify-center">
                    <Bot className="w-24 h-24 text-white" />
                  </div>
                </foreignObject>
                
                {/* Feature Content (1.5x larger) */}
                <foreignObject x="60" y="60" width="600" height="360">
                  <div className="slide-container">
                    {showSlides && currentFeature >= 0 && (
                    <div 
                      className="slide-content p-9"
                      style={{
                        animation: hasAnimated && currentFeature > 0 ? `slideInOut 6s ease-in-out` : currentFeature === 0 ? `slideInOut 6s ease-in-out` : 'none',
                        background: features[currentFeature].color || '#111827'
                      }}
                      key={currentFeature}
                    >
                      {/* Icon - Larger container to reach closer to margins */}
                      <div className="w-32 h-32 bg-white/10 flex items-center justify-center mb-6 rounded-xl">
                        {features[currentFeature].icon === Scan && <Scan className="w-28 h-28 text-white" />}
                        {features[currentFeature].icon === TrendingUp && <TrendingUp className="w-28 h-28 text-white" />}
                        {features[currentFeature].icon === Eye && <Eye className="w-28 h-28 text-white" />}
                        {features[currentFeature].icon === FileText && <FileText className="w-28 h-28 text-white" />}
                        {features[currentFeature].icon === BarChart3 && <BarChart3 className="w-28 h-28 text-white" />}
                        {features[currentFeature].icon === Building && <Building className="w-28 h-28 text-white" />}
                        {features[currentFeature].icon === Smartphone && <Smartphone className="w-28 h-28 text-white" />}
                        {features[currentFeature].icon === Shield && <Shield className="w-28 h-28 text-white" />}
                        {features[currentFeature].icon === Star && <Star className="w-28 h-28 text-white" />}
                        {typeof features[currentFeature].icon === 'function' && features[currentFeature].icon !== Scan && features[currentFeature].icon !== TrendingUp && features[currentFeature].icon !== Eye && features[currentFeature].icon !== FileText && features[currentFeature].icon !== BarChart3 && features[currentFeature].icon !== Building && features[currentFeature].icon !== Smartphone && features[currentFeature].icon !== Shield && features[currentFeature].icon !== Star && <span className="text-7xl text-white">₦</span>}
                      </div>
                      
                      {/* Title (1.5x larger) */}
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {features[currentFeature].title}
                      </h3>
                      
                      {/* Description (1.5x larger) */}
                      <p className="text-white/90 text-base leading-relaxed">
                        {features[currentFeature].description}
                      </p>
                    </div>
                    )}
                  </div>
                </foreignObject>
              </svg>
            </div>

            {/* iPhone with Feature Carousel */}
            <div className="relative">
              <svg width="160" height="320" viewBox="0 0 200 400" className="drop-shadow-2xl md:scale-90 lg:scale-100 xl:scale-110">
                {/* iPhone Frame */}
                <rect x="10" y="10" width="180" height="380" rx="45" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
                <rect x="20" y="25" width="160" height="350" rx="35" fill="#111827"/>
                
                {/* iPhone Notch */}
                <rect x="75" y="10" width="50" height="25" rx="12" fill="#1f2937"/>
                
                {/* Front Camera in notch */}
                <circle cx="100" cy="22" r="3" fill="#374151"/>
                <circle cx="100" cy="22" r="1.5" fill="#1f2937"/>
                

                
                {/* Mobile Feature Display */}
                <rect x="35" y="60" width="130" height="290" fill="#111827"/>
                
                {/* iPhone Centered KudiBot Logo */}
                <foreignObject x="80" y="180" width="40" height="40">
                  <div className="w-full h-full flex items-center justify-center">
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                </foreignObject>
                
                <foreignObject x="35" y="60" width="130" height="290">
                  <div className="slide-container">
                    {showSlides && currentFeature >= 0 && (
                    <div 
                      className="slide-content p-4"
                      style={{
                        animation: hasAnimated && currentFeature > 0 ? `slideInOut 6s ease-in-out` : currentFeature === 0 ? `slideInOut 6s ease-in-out` : 'none',
                        background: features[currentFeature].color || '#111827'
                      }}
                      key={currentFeature}
                    >
                      {/* Mobile Icon - Larger container */}
                      <div className="w-16 h-16 bg-white/10 flex items-center justify-center mb-3 rounded-lg">
                        {features[currentFeature].icon === Scan && <Scan className="w-10 h-10 text-white" />}
                        {features[currentFeature].icon === TrendingUp && <TrendingUp className="w-10 h-10 text-white" />}
                        {features[currentFeature].icon === Eye && <Eye className="w-10 h-10 text-white" />}
                        {features[currentFeature].icon === FileText && <FileText className="w-10 h-10 text-white" />}
                        {features[currentFeature].icon === BarChart3 && <BarChart3 className="w-10 h-10 text-white" />}
                        {features[currentFeature].icon === Building && <Building className="w-10 h-10 text-white" />}
                        {features[currentFeature].icon === Smartphone && <Smartphone className="w-10 h-10 text-white" />}
                        {features[currentFeature].icon === Shield && <Shield className="w-10 h-10 text-white" />}
                        {features[currentFeature].icon === Star && <Star className="w-10 h-10 text-white" />}
                        {typeof features[currentFeature].icon === 'function' && features[currentFeature].icon !== Scan && features[currentFeature].icon !== TrendingUp && features[currentFeature].icon !== Eye && features[currentFeature].icon !== FileText && features[currentFeature].icon !== BarChart3 && features[currentFeature].icon !== Building && features[currentFeature].icon !== Smartphone && features[currentFeature].icon !== Shield && features[currentFeature].icon !== Star && <span className="text-4xl text-white">₦</span>}
                      </div>
                      
                      {/* Mobile Title */}
                      <h4 className="text-sm font-bold text-white mb-2 leading-tight">
                        {features[currentFeature].title}
                      </h4>
                      
                      {/* Mobile Description */}
                      <p className="text-white/90 text-xs leading-relaxed">
                        {features[currentFeature].description}
                      </p>
                    </div>
                    )}
                  </div>
                </foreignObject>
                
                {/* iPhone Home Indicator */}
                <rect x="85" y="385" width="30" height="4" rx="2" fill="#4b5563"/>
              </svg>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-2">
            <p className="text-xl md:text-2xl lg:text-3xl text-white text-center mb-2 opacity-90 px-4 font-medium leading-relaxed">
              Your <Bot className="inline-block w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 mx-2 text-white animate-bot-pulse" /> automated expense tracker.
            </p>
            
            {/* Process Flow 
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
              {/* Step 1: Snap
              <div className="flex flex-col items-center text-center p-4 w-48 min-h-[140px]">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-3">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-base md:text-lg">Snap</h3>
                <p className="text-sm md:text-base leading-tight text-white">Snap / Upload a receipt to scan your expenses</p>
              </div>
              
              {/* Arrow 1 
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6 text-white animate-arrow-pulse" />
              </div>
              <div className="md:hidden">
                <div className="w-6 h-6 rotate-90">
                  <ArrowRight className="w-6 h-6 text-white animate-arrow-pulse" />
                </div>
              </div>
              
              {/* Step 2: Track
              <div className="flex flex-col items-center text-center p-4 w-48 min-h-[140px]">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-3">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-base md:text-lg">Track</h3>
                <p className="text-sm md:text-base leading-tight text-white">Track spending across categories with intelligent insights</p>
              </div>
              
              {/* Arrow 2 
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6 text-white animate-arrow-pulse" />
              </div>
              <div className="md:hidden">
                <div className="w-6 h-6 rotate-90">
                  <ArrowRight className="w-6 h-6 text-white animate-arrow-pulse" />
                </div>
              </div>
              
              {/* Step 3: Report 
              <div className="flex flex-col items-center text-center p-4 w-48 min-h-[140px]">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-3">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-base md:text-lg">Report</h3>
                <p className="text-sm md:text-base leading-tight text-white">Generate professional expense reports for business use</p>
              </div>
              
              {/* Arrow 3 
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6 text-white animate-arrow-pulse" />
              </div>
              <div className="md:hidden">
                <div className="w-6 h-6 rotate-90">
                  <ArrowRight className="w-6 h-6 text-white animate-arrow-pulse" />
                </div>
              </div>
              
              {/* Step 4: Scale 
              <div className="flex flex-col items-center text-center p-4 w-48 min-h-[140px]">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-3">
                  <Building className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-base md:text-lg">Scale</h3>
                <p className="text-sm md:text-base leading-tight text-white">Secure loans from banks and investors to scale your business</p>
              </div>
            </div> */}
          </div>

          {/* CTA Section */}
          <div className="border border-border rounded-2xl p-6 md:p-8 mb-8 w-full max-w-lg mx-auto" style={{backgroundColor: '#082118'}}>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 font-display text-white text-center">I want to:</h3>
            
            <div className="flex flex-col gap-3 w-full mx-auto">
              <a href="#trust" className="w-full">
                <Button variant="outline" size="lg" className="w-full justify-center text-center px-4 text-base md:text-lg" data-testid="button-small-business">
                  Learn More
                </Button>
              </a>
              <Link href="/register" className="w-full">
                <Button size="lg" className="w-full justify-center text-center px-4 text-base md:text-lg" data-testid="button-personal">
                  Track my personal expenses
                </Button>
              </Link>
              <Link href="/register" className="w-full">
                <Button variant="outline" size="lg" className="w-full justify-center text-center px-4 text-base md:text-lg" data-testid="button-small-business">
                  Manage my business expenses
                </Button>
              </Link>
              

            </div>
          </div>
        </div>
      </section>



      {/* Company Logos */}
      <section id="trust" className="px-4 py-12 md:py-14 lg:py-16 w-full overflow-hidden relative min-h-[250px] md:min-h-[300px] lg:min-h-[350px]" style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                     url("https://images.pexels.com/photos/955395/pexels-photo-955395.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="max-w-4xl mx-auto text-center w-full flex flex-col justify-center h-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 lg:mb-20 font-display text-white">
            Brands Who Trust Us
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center h-12 bg-white/10 border border-white/20 rounded text-sm font-semibold text-white hover:scale-105 hover:bg-white/15 transition-all duration-200">
              Konga
            </div>
            <div className="flex items-center justify-center h-12 bg-white/10 border border-white/20 rounded text-sm font-semibold text-white hover:scale-105 hover:bg-white/15 transition-all duration-200">
              Jumia
            </div>
            <div className="flex items-center justify-center h-12 bg-white/10 border border-white/20 rounded text-sm font-semibold text-white hover:scale-105 hover:bg-white/15 transition-all duration-200">
              GTBank
            </div>
            <div className="flex items-center justify-center h-12 bg-white/10 border border-white/20 rounded text-sm font-semibold text-white hover:scale-105 hover:bg-white/15 transition-all duration-200">
              Flutterwave
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-16 md:py-20 lg:py-24 w-full bg-background">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md  :text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-6 font-display text-foreground">Features</h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-12 md:mt-16 lg:mt-20 w-full">
            {/* Receipt Scanning */}
            <div className="text-center w-full max-w-sm lg:max-w-md mx-auto p-6 md:p-8 lg:p-10 rounded-2xl" style={{backgroundColor: '#1e3a8a'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Scan className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 lg:mb-4 font-display text-white">Receipt Scanning</h3>
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
                      <br/>Our advanced OCR technology instantly captures and stores your receipts. Simply snap a photo and our AI automatically extracts data such as name, item description, amount, date, and itemized purchases. <br/><br/>No more manual data entry or lost receipts - everything is stored securely in the cloud and categorized for easy tracking.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* AI + OCR Integration */}
            <div className="text-center w-full max-w-sm lg:max-w-md mx-auto p-6 md:p-8 lg:p-10 rounded-2xl" style={{backgroundColor: '#b44a11ff'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 font-display text-white">AI + OCR Integration</h3>
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
                      <br/>Our AI combines Machine Learning with optical character recognition to understand your receipts like a human would. <br/><br/>It recognizes and understands local context, handles poor image quality, and learns from your patterns to improve accuracy over time. The system automatically categorizes expenses and even detects potential duplicates.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Financial Reporting */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#134E4A'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 font-display text-white">Financial Reporting</h3>
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
                      <br/>Create professional reports for business loans, investor presentations, or tax filing. Our reports include spending trends, category breakdowns, cash flow analysis, and projections. <br/><br/>Export to PDF or Excel formats that banks and investors expect. Track profitability, identify cost-saving opportunities, and make data-driven financial decisions.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile-First Approach */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#334155'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 font-display text-white">Mobile-First Approach</h3>
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
                      <br/>KudiScan was designed for the mobile-first Nigerian market. Capture receipts instantly, work offline when needed, and sync across all devices. <br/><br/>The interface is optimized for touch, works on slow networks, and consumes minimal data. Perfect for busy entrepreneurs who need to track expenses while moving between meetings, markets, or client visits.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Bank-level Security */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#581C87'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 font-display text-white">Bank-level Security</h3>
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
                      <br/>Your data is protected with 256-bit AES encryption, the same standard used by major banks. We use secure data centers in Nigeria, comply with international privacy standards, and never store sensitive banking credentials. <br/><br/>Two-factor authentication, regular security audits, and encrypted data transmission ensure your financial information stays private and secure.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Naira Currency */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#082118'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-white">₦</span>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 font-display text-white">Naira Currency</h3>
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
                      <br/>Every feature is built with Nigerian Naira as the primary currency. Automatic kobo calculations, proper number formatting, local tax considerations, and support for cash-heavy business models. <br/><br/>Integration with Nigerian payment systems, understanding of local business practices, and support for both formal and informal sector expense tracking needs.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="howitworks" className="px-4 py-16 md:py-20 lg:py-24 w-full" style={{backgroundColor: '#2D3339'}}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 lg:mb-20 font-display" style={{color: '#E1E7EF'}}>
            How <span style={{color: '#29A378'}}>Kudi</span><span style={{color: '#E1E7EF'}}>Scan</span> Works
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 w-full">
            <div className="text-center w-full max-w-sm lg:max-w-md mx-auto">
              <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plus className="w-20 h-20" style={{color: '#29A378'}} />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 lg:mb-4 font-display" style={{color: '#E1E7EF'}}>Add Expense</h3>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed" style={{color: '#959AA0'}}>
                You have 3 options to add a receipt record. Press Scan, Upload or Type button to add receipt.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:block">
              <ArrowRight className="w-8 h-8 animate-arrow-pulse" style={{color: '#29A378'}} />
            </div>
            <div className="md:hidden">
              <div className="w-8 h-8 rotate-90">
                <ArrowRight className="w-8 h-8 animate-arrow-pulse" style={{color: '#29A378'}} />
              </div>
            </div>

            <div className="text-center w-full max-w-sm lg:max-w-md mx-auto">
              <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-20 h-20" style={{color: '#29A378'}} />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 lg:mb-4 font-display" style={{color: '#E1E7EF'}}>Track & Analyze</h3>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed" style={{color: '#959AA0'}}>
                OCR extracts relevant expense data from receipts and stores them in an organized format.
                {/*View spending analytics, category breakdowns, and budget tracking to understand your spending patterns.*/}
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:block">
              <ArrowRight className="w-8 h-8 animate-arrow-pulse" style={{color: '#29A378'}} />
            </div>
            <div className="md:hidden">
              <div className="w-8 h-8 rotate-90">
                <ArrowRight className="w-8 h-8 animate-arrow-pulse" style={{color: '#29A378'}} />
              </div>
            </div>

            <div className="text-center w-full max-w-sm lg:max-w-md mx-auto">
              <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileBarChart className="w-20 h-20" style={{color: '#29A378'}} />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 lg:mb-4 font-display" style={{color: '#E1E7EF'}}>Generate Reports</h3>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed" style={{color: '#959AA0'}}>
                View records and generate professional expense reports for tracking and bank loan applications.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/register">
              <Button size="lg" className="px-8 text-lg md:text-xl font-semibold" data-testid="button-get-started-main">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="px-4 py-16 md:py-20 lg:py-24 w-full" style={{backgroundColor: '#082118'}}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-6 font-display text-white">
            Why Nigerian Businesses Choose <span style={{color: '#29A378'}}>Kudi</span><span className="text-white">Scan</span>
          </h2>

          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-12 md:mt-16 lg:mt-20 w-full">
            {/* Save Time & Reduce Errors */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#0f2a1e'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-14 h-14 text-white" />
              </div>
              {/*<h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 lg:mb-4 font-display text-white">Save 10+ Hours Weekly</h3>*/}
              <h3 className="text-lg font-semibold mb-2 font-display text-white">Save 10+ Hours Weekly</h3>
              <p className="text-sm text-white mb-4">
                Eliminate manual data entry and receipt organization. Our AI does the work for you.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Save 10+ Hours Weekly</DialogTitle>
                    <DialogDescription>
                      Stop wasting time on manual expense tracking. KudiScan's AI-powered OCR technology captures receipt data in seconds, automatically categorizes expenses, and generates reports instantly. Nigerian business owners report saving 10+ hours weekly on financial admin tasks, allowing them to focus on growing their business instead of paperwork.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Unlock Business Credit */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#0f2a1e'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-white">₦</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-white">Unlock Business Loans</h3>
              <p className="text-sm text-white mb-4">
                Generate bank-ready financial reports that meet CBN lending requirements.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Unlock Business Loans</DialogTitle>
                    <DialogDescription>
                      Access business credit and government intervention funds with professional financial reports. Our reports meet Central Bank of Nigeria (CBN) requirements for SME lending, helping you secure loans from banks like GTBank, UBA, Zenith Bank, and access programs like BOI, NIRSAL, and AGSMEIS funding opportunities.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Tax Compliance Made Easy */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#0f2a1e'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-white">Tax & Audit</h3>
              <p className="text-sm text-white mb-4">
                Stay FIRS compliant with automated VAT and income tax documentation.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tax Compliance Made Easy</DialogTitle>
                    <DialogDescription>
                      Never worry about FIRS audits again. KudiScan automatically organizes all expense receipts with proper categorization for VAT filing, company income tax returns, and withholding tax documentation. Built-in compliance features ensure all records meet Federal Inland Revenue Service (FIRS) digital documentation standards.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Real-Time Financial Insights */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#0f2a1e'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-white">Smart Financial Insights</h3>
              <p className="text-sm text-white mb-4">
                Get real-time spending analytics and budget alerts to make better business decisions.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Smart Financial Insights</DialogTitle>
                    <DialogDescription>
                      Make data-driven decisions with real-time financial analytics. Track spending patterns, identify cost-saving opportunities, monitor budget performance, and receive alerts before overspending. Our Nigerian market-specific insights help you optimize cash flow and identify profitable growth areas for your business.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile-First Nigerian Design */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#0f2a1e'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-white">Mobile-First</h3>
              <p className="text-sm text-white mb-4">
                Mobile-first design with native Naira support and offline capabilities.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Built for Nigeria</DialogTitle>
                    <DialogDescription>
                      Designed specifically for the Nigerian market with mobile-first functionality, native Naira currency support, offline capabilities for unreliable network areas, and integration with local payment systems like Paystack. Works seamlessly across Nigerian banks and supports both formal and informal business expense tracking needs.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Bank-Level Security */}
            <div className="text-center w-full max-w-sm mx-auto p-6 rounded-2xl" style={{backgroundColor: '#0f2a1e'}}>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-display text-white">Trusted by 10,000+ Users</h3>
              <p className="text-sm text-white mb-4">
                Join Nigerian entrepreneurs and SMEs who trust KudiScan with their financial data.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 text-white hover:text-white/80">Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Trusted by 10,000+ Nigerian Users</DialogTitle>
                    <DialogDescription>
                      Protected with 256-bit encryption used by major Nigerian banks. Your sensitive business data never leaves secure Nigerian data centers. Trusted by over 10,000 Nigerian SMEs, freelancers, and entrepreneurs from Lagos to Abuja, Kano to Port Harcourt. GDPR compliant with local Nigerian data protection standards.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="text-center mt-12 md:mt-16 lg:mt-20">
            <Link href="/register">
              <Button size="lg" className="px-8 text-lg md:text-xl font-semibold" data-testid="button-benefits-cta">
                Start Free
              </Button>
            </Link>
            <p className="text-white/60 text-sm mt-4">
              10 free receipt scans monthly • No credit card required • Upgrade anytime
            </p>
          </div>
        </div>
      </section>

      {/* Nigerian Federal Government Compliance Section */}
      <section id="nergp" className="px-4 py-16 md:py-20 lg:py-24 w-full bg-background">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-6 font-display text-foreground">
            Supporting Nigerian Business Growth
          </h2>
          <p className="text-center mb-12 md:mb-16 lg:mb-20 text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            KudiScan aligns with Federal Government initiatives to drive economic development by providing businesses with the financial transparency and documentation needed for growth opportunities.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
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
      <section id="integration" className="px-4 py-12 md:py-14 lg:py-16 w-full relative min-h-[250px] md:min-h-[300px] lg:min-h-[350px]" style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), 
                     url("https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="max-w-6xl mx-auto w-full flex flex-col justify-center h-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 md:mb-4 font-display text-white">
            KudiScan Integration Ecosystem
          </h2>
          <p className="text-center mb-8 md:mb-10 text-base md:text-lg text-white/90 max-w-3xl mx-auto">
            We connect with leading Nigerian and global platforms
          </p>
          
          {/* Payment, Financial & Banking Platforms */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white text-center">Payment, Financial & Banking Platforms</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-lg">₦</span>
                </div>
                <p className="text-sm text-white font-medium">Paystack</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">GTB</span>
                </div>
                <p className="text-sm text-white font-medium">GTBank</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">UBA</span>
                </div>
                <p className="text-sm text-white font-medium">UBA</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">ZEN</span>
                </div>
                <p className="text-sm text-white font-medium">Zenith Bank</p>
              </div>
            </div>
          </div>

          {/* Business & Productivity Tools */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white text-center">Business & Productivity Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">MS</span>
                </div>
                <p className="text-sm text-white font-medium">Microsoft 365</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">XL</span>
                </div>
                <p className="text-sm text-white font-medium">Excel</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">PDF</span>
                </div>
                <p className="text-sm text-white font-medium">Adobe PDF</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">QB</span>
                </div>
                <p className="text-sm text-white font-medium">QuickBooks</p>
              </div>
            </div>
          </div>

          {/* Data Processing & Storage */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white text-center">Data Processing & Storage</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">AWS</span>
                </div>
                <p className="text-sm text-white font-medium">Amazon Web Services</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">AZ</span>
                </div>
                <p className="text-sm text-white font-medium">Microsoft Azure</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">GC</span>
                </div>
                <p className="text-sm text-white font-medium">Google Cloud</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">DB</span>
                </div>
                <p className="text-sm text-white font-medium">Database Systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="px-4 py-16 w-full" style={{backgroundColor: '#29A378'}}>
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 lg:mb-20 font-display" style={{color: '#E1E7EF'}}>
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
      <section id="testimonials" className="px-4 py-16 w-full" style={{backgroundColor: '#2D3339'}}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 lg:mb-20 font-display text-white">
            What <span style={{color: '#29A378'}}>Kudi</span><span className="text-white">Scan</span> Users Are Saying
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
      <section id="pricing" className="px-4 py-16 w-full" style={{backgroundColor: '#22262A'}}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-6 font-display" style={{color: '#E1E7EF'}}>
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
                <Link href="/register">
                  <Button size="lg" variant="outline" className="px-8" style={{borderColor: '#29A378', color: '#29A378'}} data-testid="button-freemium-plan">
                    Get Started Free
                  </Button>
                </Link>
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
                <Link href="/register">
                  <Button size="lg" className="px-8 bg-primary hover:bg-primary/90" data-testid="button-premium-plan">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* Footer CTA */}
      <section className="px-4 py-16 bg-primary text-white w-full">
        <div className="max-w-2xl mx-auto text-center w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-display text-primary-foreground">Start managing your expenses today</h2>
          <p className="text-primary-foreground/80 mb-8">
            Join thousands of Nigerian users who trust <span className="text-primary-foreground">Kudi</span><span className="text-primary-foreground">Scan</span> for their expense tracking needs.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="px-8" data-testid="button-footer-cta">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section id="contact" className="px-4 py-20 bg-muted text-muted-foreground w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-display text-foreground">
            Get in Touch
          </h2>
          <p className="text-muted-foreground/80 mb-12">
            Have questions, feedback, or partnership inquiries?  
            Our team is ready to support you.
          </p>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="flex flex-col items-center md:items-start">
              <Mail className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-foreground">Email</h3>
              <p className="text-sm">support@kudiscan.com</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <Phone className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-foreground">Phone</h3>
              <p className="text-sm">+234 812 345 6789</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <MapPin className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-foreground">Office</h3>
              <p className="text-sm">Lagos, Nigeria</p>
            </div>
          </div>

          {/* Call-to-action */}
          <div className="mt-12">
            <a
              href="mailto:support@kudiscan.com"
              className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 md:py-16 w-full bg-background border-t border-border">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Company Info */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <Bot className="w-12 h-12 text-primary mr-3" />
                <h3 className="text-lg font-bold font-display">
                  <span style={{color: '#29A378'}}>Kudi</span>
                  <span className="text-white">Scan</span>
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Your automated finance assistant for Nigerian businesses. Scan, track, and scale with confidence.
              </p>
              
              {/* WhatsApp Support for visitors */}
              <div className="mb-4">
                <WhatsAppBusiness 
                  trigger={
                    <Button 
                      size="sm" 
                      className="gap-2 w-fit px-3" 
                      style={{ backgroundColor: '#25D366' }}
                      data-testid="whatsapp-footer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </Button>
                  }
                />
              </div>

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
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border relative">
            {/* 2-color KudiScan background - full width */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
              <span className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold whitespace-nowrap">
                <span style={{color: '#29A378'}}>Kudi</span><span className="text-muted-foreground">Scan</span>
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  © 2025 <span style={{color: '#29A378'}}>Kudi</span><span className="text-muted-foreground">Scan</span>. © Powered by WebArtistry. All rights reserved.
                </p>
              </div>
              
              {/* Scroll to Top Arrow */}
              <div className="flex items-center">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                  aria-label="Scroll to top"
                >
                  <ChevronUp className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}