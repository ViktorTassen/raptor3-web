"use client";

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Chrome, BadgeCheck, Shield } from "lucide-react";
import Header from "./components/Header";
import { firebaseApp } from './firebase';
import Image from 'next/image';

const auth = getAuth(firebaseApp);

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in:', {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary Shapes */}
        {/* Google Blue Shapes */}
        <div className="absolute right-[15%] top-[10%] w-40 h-40 rounded-[40px] rotate-12 bg-[#4285F4] opacity-[0.15]" />
        <div className="absolute left-[20%] top-[60%] w-24 h-24 rounded-[24px] -rotate-12 bg-[#4285F4] opacity-[0.12]" />
        
        {/* Google Red Shapes */}
        <div className="absolute left-[25%] top-[20%]">
          <div className="w-32 h-32 transform rotate-45 bg-[#EA4335] opacity-[0.12]" />
        </div>
        <div className="absolute right-[30%] bottom-[15%]">
          <div className="w-24 h-24 transform -rotate-12 bg-[#EA4335] opacity-[0.1]" />
        </div>
        
        {/* Google Yellow Shapes */}
        <div className="absolute right-[25%] top-[40%] w-28 h-28 rounded-full bg-[#FBBC05] opacity-[0.15]" />
        <div className="absolute left-[35%] bottom-[25%] w-20 h-20 rounded-full bg-[#FBBC05] opacity-[0.12]" />
        
        {/* Google Green Shapes */}
        <div className="absolute right-[35%] top-[70%] w-20 h-16 rounded-xl bg-[#34A853] opacity-[0.1] -rotate-6" />

        {/* Secondary Small Shapes */}
        <div className="absolute left-[15%] top-[40%] w-8 h-8 rounded-lg bg-[#4285F4] opacity-[0.1] rotate-12" />
        <div className="absolute right-[40%] top-[25%] w-6 h-6 rounded-full bg-[#FBBC05] opacity-[0.1]" />
        <div className="absolute left-[45%] bottom-[20%] w-10 h-10 rounded-lg bg-[#EA4335] opacity-[0.08] rotate-45" />
        <div className="absolute right-[20%] bottom-[35%] w-12 h-8 rounded-xl bg-[#34A853] opacity-[0.1] -rotate-12" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative">
        <Header />

        {/* Hero Section */}
        <main className="py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-[#e8f0fe] text-[#1967d2] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Chrome className="w-4 h-4 mr-2" />
              Chrome Extension
            </div>
            <h1 className="text-[#202124] text-4xl md:text-5xl font-medium mb-6">
              Car analytics for Turo
            </h1>
           
            <p className="text-[#5f6368] text-lg mb-2">
              Get listings analytics with one click.
            </p>
            <p className="text-[#5f6368] text-lg mb-8">
              Find out most profitable cars on Turo.
            </p>

            {user && (
              <div className="mb-8 p-4 bg-[#e8f0fe] rounded-lg">
                <p className="text-[#1967d2]">
                  Welcome, {user.displayName}!
                </p>
              </div>
            )}

            <div>
              <a
                href="https://chromewebstore.google.com/detail/browserfax-%E2%80%93-send-fax-onl/cjegchjffhcimphmkcpalmcdphhcnjha" target='_blank'
                className="inline-flex items-center px-6 py-3 bg-[#1a73e8] text-white font-medium rounded-lg hover:bg-[#1557b0] transition duration-150 gap-2"
              >
                <Chrome className="w-5 h-5" />
                Add to Chrome
              </a>
            </div>
          </div>

          {/* Image Section with Hover Effect */}
          <div className="flex justify-center mb-16">
            <a href="https://chromewebstore.google.com/detail/browserfax-%E2%80%93-send-fax-onl/cjegchjffhcimphmkcpalmcdphhcnjha" target='_blank' className="block max-w-xs relative group cursor-pointer">
              <Image
                src="/browserfax-screenshot-send-short.jpg"
                alt="Browserfax Chrome Extension Interface"
                width={800}
                height={600}
                className="rounded-lg ring-1 ring-gray-200"
                priority
                draggable="false"
              />
              <div className="absolute inset-0 bg-[#1a73e8]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg">
                <div className="text-white flex flex-col items-center gap-2">
                  <Chrome className="w-8 h-8" />
                  <span className="font-medium">Open Chrome Web Store</span>
                </div>
              </div>
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center px-4">
              <div className="flex justify-center mb-3">
                <BadgeCheck className="w-8 h-8 text-[#1a73e8]" />
              </div>
              <h3 className="text-[#202124] text-lg font-medium mb-2">Free fax pages</h3>
              <p className="text-[#5f6368] text-sm">Sign in with Google to fax instantly</p>
            </div>
            <div className="text-center px-4">
              <div className="flex justify-center mb-3">
                <Shield className="w-8 h-8 text-[#1a73e8]" />
              </div>
              <h3 className="text-[#202124] text-lg font-medium mb-2">HIPAA Compliant</h3>
              <p className="text-[#5f6368] text-sm">Secure transmission of sensitive information</p>
            </div>
            <div className="text-center px-4">
              <div className="flex justify-center mb-3">
                <Chrome className="w-8 h-8 text-[#1a73e8]" />
              </div>
              <h3 className="text-[#202124] text-lg font-medium mb-2">Simple & Clean</h3>
              <p className="text-[#5f6368] text-sm">Minimalist design for easy faxing</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}