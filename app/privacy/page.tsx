import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Header from '../components/Header';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Header />
                
                <div className="py-16">
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    
                    <div className="prose max-w-none">
                        <p className="text-gray-600 mb-6">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                            <p className="mb-4">
                                Browserfax (operated by West Wanted LLC) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                            <p className="mb-4">We collect minimal personal information necessary to provide our services:</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Email address (through Google Sign-In)</li>
                                <li>Name (through Google Sign-In)</li>
                                <li>Payment information (processed by Stripe)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                            <p className="mb-4">We use your information solely for:</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Account creation and management</li>
                                <li>Processing payments through Stripe</li>
                                <li>Communication regarding your service</li>
                                <li>Customer support</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                            <p className="mb-4">We use the following third-party services:</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>
                                    Stripe for payment processing - 
                                    <a 
                                        href="https://stripe.com/privacy" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline inline-flex items-center"
                                    >
                                        Stripe Privacy Policy <ArrowUpRight className="w-4 h-4 ml-1" />
                                    </a>
                                </li>
                                <li>Google Sign-In for authentication</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                            <p className="mb-4">
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <address className="not-italic">
                                West Wanted LLC<br />
                                522 W RIVERSIDE AVE STE N<br />
                                Spokane, WA 99201<br />
                                United States<br />
                                <a href="mailto:support@raptorexplorer.com" className="text-blue-600 hover:underline">
                                support@raptorexplorer.com
                                </a>
                            </address>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}