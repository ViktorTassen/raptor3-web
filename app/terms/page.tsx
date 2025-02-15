import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Header from '../components/Header';

export default function Terms() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Header />
                
                <div className="py-16">
                    <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
                    
                    <div className="prose max-w-none">
                        <p className="text-gray-600 mb-6">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                            <p className="mb-4">
                                By accessing and using Browserfax, you accept and agree to be bound by these Terms of Use and our Privacy Policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                            <p className="mb-4">
                                Browserfax provides online faxing services through a web browser interface. The service allows users to send faxes electronically.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">3. Payment Terms</h2>
                            <p className="mb-4">
                                We use Stripe for payment processing. By making a purchase, you agree to Stripe&#39;s terms of service:
                            </p>
                            <p className="mb-4">
                                <a 
                                    href="https://stripe.com/legal" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline inline-flex items-center"
                                >
                                    Stripe Terms of Service <ArrowUpRight className="w-4 h-4 ml-1" />
                                </a>
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
                            <p className="mb-4">You agree to:</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Provide accurate account information</li>
                                <li>Maintain the security of your account</li>
                                <li>Use the service in compliance with all applicable laws</li>
                                <li>Not use the service for any illegal or unauthorized purpose</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">5. Contact Information</h2>
                            <p className="mb-4">
                                For any questions regarding these terms, please contact:
                            </p>
                            <address className="not-italic">
                                West Wanted LLC<br />
                                522 W RIVERSIDE AVE STE N<br />
                                Spokane, WA 99201<br />
                                United States<br />
                                <a href="mailto:support@browserfax.com" className="text-blue-600 hover:underline">
                                    support@browserfax.com
                                </a>
                            </address>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}