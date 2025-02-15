import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-6 bg-[#f8f9fa]">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-500 text-center md:text-left">
                            <div className="mb-2 md:mb-0">
                                &copy; {new Date().getFullYear()} Browserfax 🇺🇸 🇺🇦
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                                <a 
                                    href="mailto:support@browserfax.com"
                                    className="text-gray-500 hover:text-gray-900"
                                >
                                    support@browserfax.com
                                </a>
                                <span className="hidden md:inline mx-2">•</span>
                                <span>Kirkland, WA, United States</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            <Link 
                                href="/privacy" 
                                className="text-sm text-gray-500 hover:text-gray-900 inline-flex items-center"
                            >
                                Privacy <ArrowUpRight className="w-4 h-4 ml-0.5" />
                            </Link>
                            <Link 
                                href="/terms" 
                                className="text-sm text-gray-500 hover:text-gray-900 inline-flex items-center"
                            >
                                Terms <ArrowUpRight className="w-4 h-4 ml-0.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}