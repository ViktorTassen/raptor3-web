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