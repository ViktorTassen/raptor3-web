"use client";

import { Chrome, BarChart2, Car, Zap, Crown, DollarSign, TrendingUp, Search, Shield, CreditCard, CheckCircle, BookOpen } from "lucide-react";
import Header from "./components/Header";
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Header />

        {/* Hero Section */}
        <main className="py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center bg-[#593CFB]/10 text-[#593CFB] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Chrome className="w-4 h-4 mr-2" />
              Analytics Tool for Turo Hosts
            </div>
            <h1 className="text-[#202124] text-4xl md:text-6xl font-medium mb-6">
            Discover the best cars for Turo
              
            </h1>
           
            <p className="text-[#5f6368] text-xl mb-8 max-w-2xl mx-auto">
            Make your Turo business more profitable.  Maximize your earnings with real-time analytics and ROI insights.
            </p>

            <div className="flex items-center justify-center gap-4">
              <a
                href="https://chromewebstore.google.com/detail/raptor-explorer-car-renta/kcekmgedcdnjjfcklokfidemgjdanjpp"
                target="_blank"
                className="inline-flex items-center px-6 py-3 bg-[#593CFB] text-white font-medium rounded-lg hover:bg-[#593CFB]/90 transition duration-150 gap-2"
              >
                <Chrome className="w-5 h-5" />
                Add to Chrome
              </a>
              <Link
                href="/instructions"
                className="inline-flex items-center px-6 py-3 bg-white text-[#593CFB] font-medium rounded-lg hover:bg-[#593CFB]/5 transition duration-150 border border-[#593CFB]/20 gap-2"
              >
                <BookOpen className="w-5 h-5" />
                View Docs
              </Link>
            </div>
          </div>

          {/* Main Screenshot */}
          <div className="flex justify-center mb-24">
            <div className="relative w-full max-w-4xl">
              <div className="aspect-[16/9] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                <Image
                  src="/main-screen.png"
                  alt="Raptor Explorer Analytics Dashboard"
                  fill
                  priority
                />
              </div>
              
              {/* Stats cards - Made responsive */}
              <div className="absolute -right-4 md:-right-8 -bottom-4 md:-bottom-8 bg-white rounded-lg shadow-lg p-4 border border-gray-200 max-w-[200px] transform translate-x-0">
                <div className="flex items-center gap-3">
                  <BarChart2 className="w-5 h-5 text-[#593CFB]" />
                  <div className="text-left">
                    <p className="text-sm text-gray-600">Average Monthly Revenue</p>
                    <p className="text-lg font-semibold">$3,240</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-4 md:-left-8 top-1/2 bg-white rounded-lg shadow-lg p-4 border border-gray-200 max-w-[140px] transform -translate-x-0">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-[#593CFB]" />
                  <div className="text-left">
                    <p className="text-sm text-gray-600">ROI</p>
                    <p className="text-lg font-semibold">32%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Value Props */}
          <div className="text-center mb-24">
            <h2 className="text-3xl font-medium text-[#202124] mb-12">
              Everything You Need to Succeed on Turo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <DollarSign className="w-8 h-8 text-[#593CFB] mx-auto mb-4" />
                <h3 className="font-medium text-[#202124] mb-2">Revenue Tracking</h3>
                <p className="text-[#5f6368] text-sm">See how much you can make with different vehicles on Turo</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <Search className="w-8 h-8 text-[#593CFB] mx-auto mb-4" />
                <h3 className="font-medium text-[#202124] mb-2">Market Research</h3>
                <p className="text-[#5f6368] text-sm">Find the most rented cars in your market</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <TrendingUp className="w-8 h-8 text-[#593CFB] mx-auto mb-4" />
                <h3 className="font-medium text-[#202124] mb-2">ROI Analysis</h3>
                <p className="text-[#5f6368] text-sm">Calculate potential returns before investing</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <BarChart2 className="w-8 h-8 text-[#593CFB] mx-auto mb-4" />
                <h3 className="font-medium text-[#202124] mb-2">Host Tools</h3>
                <p className="text-[#5f6368] text-sm">Essential analytics for Turo business growth</p>
              </div>
            </div>
          </div>

          {/* Data Collection Steps */}
          <div className="mb-24">
            <h2 className="text-center text-3xl font-medium text-[#202124] mb-12">
              How to Get Started
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src="/cws.svg"
                    alt="Chrome Web Store Installation"
                    fill
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-[#202124] mb-2">1. Install Extension</h3>
                  <p className="text-[#5f6368] text-sm mb-4">Add Raptor Explorer to Chrome from the Web Store to get started.</p>
                  <a
                    href="https://chromewebstore.google.com/detail/raptor-explorer-car-renta/kcekmgedcdnjjfcklokfidemgjdanjpp"
                    target="_blank"
                    className="inline-flex items-center text-[#593CFB] hover:text-[#593CFB]/90 transition-colors gap-1 text-sm"
                  >
                    <Chrome className="w-4 h-4" />
                    Add to Chrome
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src="/turo-map.png"
                    alt="Turo Search Interface"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-[#202124] mb-2">2. Search Vehicles</h3>
                  <p className="text-[#5f6368] text-sm mb-4">Browse Turo to data from your area. Raptor automatically captures listings</p>
                  <a
                    href="/instructions"
                    target="_blank"
                    className="inline-flex items-center text-[#593CFB] hover:text-[#593CFB]/90 transition-colors gap-1 text-sm"
                  >
                    Open instructions
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src="/enriched.png"
                    alt="Data Enrichment Process"
                    fill
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-[#202124] mb-2">3. Enrich Data</h3>
                  <p className="text-[#5f6368] text-sm mb-4">Gather metrics including revenue history, utilization rates, and market values.</p>
                  <a
                    href="/instructions"
                    target="_blank"
                    className="inline-flex items-center text-[#593CFB] hover:text-[#593CFB]/90 transition-colors gap-1 text-sm"
                  >
                    Open instructions
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src="/csv.png"
                    alt="Analytics Dashboard"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-[#202124] mb-2">4. Analyze & Export</h3>
                  <p className="text-[#5f6368] text-sm mb-4">Review insights in table or export to CSV for deeper analysis and planning.</p>
                  <a
                    href="/instructions"
                    target="_blank"
                    className="inline-flex items-center text-[#593CFB] hover:text-[#593CFB]/90 transition-colors gap-1 text-sm"
                  >
                    Open instructions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Table Information */}
          <div className="mb-24">
            <h2 className="text-center text-3xl font-medium text-[#202124] mb-12">
              Comprehensive Vehicle Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-medium text-[#202124] mb-4">Revenue Metrics</h3>
                <ul className="space-y-2 text-[#5f6368] text-sm mb-6">
                  <li>• Monthly revenue trends</li>
                  <li>• Average daily rates</li>
                  <li>• Previous year's earnings</li>
                  <li>• ROI calculations</li>
                  <li>• Utilization rates</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-medium text-[#202124] mb-4">Vehicle Details</h3>
                <ul className="space-y-2 text-[#5f6368] text-sm mb-6">
                  <li>• Make, model, and trim</li>
                  <li>• Market value estimates</li>
                  <li>• Days listed on Turo</li>
                  <li>• Completed trips</li>
                  <li>• Ratings and reviews</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-medium text-[#202124] mb-4">Host Insights</h3>
                <ul className="space-y-2 text-[#5f6368] text-sm mb-6">
                  <li>• Host metrics</li>
                  <li>• Protection plan rates</li>
                  <li>• Instant book locations</li>
                  <li>• Weekly/monthly discounts</li>
                  <li>• Distance allowances</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <a
                href="https://chromewebstore.google.com/detail/raptor-explorer-car-renta/kcekmgedcdnjjfcklokfidemgjdanjpp"
                target="_blank"
                className="inline-flex items-center px-6 py-3 bg-[#593CFB] text-white font-medium rounded-lg hover:bg-[#593CFB]/90 transition duration-150 gap-2"
              >
                <Chrome className="w-5 h-5" />
                Add to Chrome
              </a>
              <Link
                href="/instructions"
                className="inline-flex items-center px-6 py-3 bg-white text-[#593CFB] font-medium rounded-lg hover:bg-[#593CFB]/5 transition duration-150 border border-[#593CFB]/20 gap-2"
              >
                <BookOpen className="w-5 h-5" />
                View Docs
              </Link>
            </div>
          </div>

          {/* Pricing Section */}
          <div id="pricing" className="text-center mb-24">
            <h2 className="text-3xl font-medium text-[#202124] mb-12">Simple, Transparent Pricing</h2>
            <div className="max-w-sm mx-auto bg-white rounded-2xl border border-[#593CFB]/20 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <div className="p-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-[#593CFB] font-medium">Pro Plan</span>
                  {/* <span className="px-3 py-1 bg-[#593CFB]/10 text-[#593CFB] text-sm rounded-full">Most Popular</span> */}
                </div>
                
                <div className="flex items-baseline justify-center gap-0.5 mb-6">
                  <span className="text-xl font-medium text-gray-600">$</span>
                  <span className="text-5xl font-bold text-[#202124]">14</span>
                  <span className="text-2xl font-medium text-gray-600">.99</span>
                  <span className="text-gray-500 ml-1">/mo</span>
                </div>

                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center gap-2 text-[15px] text-gray-600">
                    <CheckCircle className="w-5 h-5 text-[#593CFB]" />
                    <span>Unlimited search results</span>
                  </li>
                  <li className="flex items-center gap-2 text-[15px] text-gray-600">
                    <CheckCircle className="w-5 h-5 text-[#593CFB]" />
                    <span>Revenue analytics & ROI tracking</span>
                  </li>
                  <li className="flex items-center gap-2 text-[15px] text-gray-600">
                    <CheckCircle className="w-5 h-5 text-[#593CFB]" />
                    <span>Market research tools</span>
                  </li>
                  <li className="flex items-center gap-2 text-[15px] text-gray-600">
                    <CheckCircle className="w-5 h-5 text-[#593CFB]" />
                    <span>Export data to CSV</span>
                  </li>
                </ul>

                <a
                  href="/instructions"
                  target="_blank"
                  className="block w-full bg-[#593CFB] text-white font-medium rounded-xl py-3 hover:bg-[#593CFB]/90 transition duration-150"
                >
                  Get Started
                </a>
                <p className="mt-4 text-sm text-gray-500">
                  Cancel anytime • 30-day money-back guarantee
                </p>
              </div>
              <div className="px-8 py-4 bg-[#593CFB]/5 border-t border-[#593CFB]/10">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-sm text-gray-500">Secure payments by Stripe</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-24">
            <h2 className="text-center text-3xl font-medium text-[#202124] mb-12">Common Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-medium text-[#202124] mb-2">Can you make money on Turo?</h3>
                <p className="text-[#5f6368]">Yes! Our data shows successful hosts earning $500-$4,000 monthly per vehicle with the right strategy and market research.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-medium text-[#202124] mb-2">What are the best cars for Turo?</h3>
                <p className="text-[#5f6368]">The most profitable cars vary by market. Our analytics help you identify top-performing vehicles in your area.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-medium text-[#202124] mb-2">How much can you make with Turo?</h3>
                <p className="text-[#5f6368]">Earnings vary based on vehicle, location, and strategy. Our tools help you forecast potential revenue and ROI.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-medium text-[#202124] mb-2">Is a Turo business profitable?</h3>
                <p className="text-[#5f6368]">With proper research and strategy, many hosts build successful businesses. Our analytics help optimize your operations.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-[#593CFB]/5 rounded-2xl p-12">
            <h2 className="text-3xl font-medium text-[#202124] mb-4">
              Start Your Turo Success Story
            </h2>
            <p className="text-[#5f6368] mb-8 max-w-2xl mx-auto">
              Join successful Turo hosts using data-driven insights to build profitable car-sharing businesses
            </p>
            <div className="flex flex-col items-center gap-4">
              <a
                href="https://chromewebstore.google.com/detail/raptor-explorer-car-renta/kcekmgedcdnjjfcklokfidemgjdanjpp"
                target="_blank"
                className="inline-flex items-center px-8 py-4 bg-[#593CFB] text-white font-medium rounded-lg hover:bg-[#593CFB]/90 transition duration-150 gap-2"
              >
                <Chrome className="w-5 h-5" />
                Add to Chrome
              </a>
              <p className="text-sm text-gray-600">
                $14.99/month • Cancel anytime • 30-day money-back guarantee
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center text-sm text-gray-500 mt-12 mb-12 max-w-3xl mx-auto">
            <p>
              Raptor Explorer is not affiliated with Turo Inc. The name "Turo" is a registered trademark of Turo Inc. 
              Use of this registered trademark is only used as necessary to identify the products and services referenced 
              and does not imply or suggest, nor is it intended to imply or suggest, any affiliation, endorsement, 
              partnership, or business relationship with Turo Inc.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}