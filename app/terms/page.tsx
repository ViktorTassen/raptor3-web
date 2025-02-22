import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Header from '../components/Header';

export default function Terms() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Header />
                
                <div className="py-16">
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    
                    <div className="prose max-w-none">
                        <p className="text-gray-600 mb-6">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                            <p className="mb-4">
                                By installing and using the Raptor Explorer Chrome extension, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of these terms, you may not use our service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                            <p className="mb-4">
                                Raptor Explorer is a Chrome extension that provides analytics and data collection tools for Turo vehicle listings. The service includes:
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Data collection from Turo listings</li>
                                <li>Analytics and reporting tools</li>
                                <li>Revenue and ROI calculations</li>
                                <li>Market research capabilities</li>
                                <li>Data export functionality</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">3. Subscription and Payment Terms</h2>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Subscription fee: $14.99 per month</li>
                                <li>Automatic renewal unless cancelled</li>
                                <li>30-day money-back guarantee</li>
                                <li>Payments processed securely through Stripe</li>
                                <li>Price changes will be notified in advance</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
                            <p className="mb-4">You agree to:</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Use the service in compliance with all applicable laws</li>
                                <li>Maintain the security of your account</li>
                                <li>Not attempt to reverse engineer the extension</li>
                                <li>Not use the service for any illegal purposes</li>
                                <li>Not interfere with the service's operation</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">5. Data Usage and Privacy</h2>
                            <p className="mb-4">
                                We collect and process data in accordance with our Privacy Policy. By using Raptor Explorer, you agree to our data collection and processing practices.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
                            <p className="mb-4">
                                Raptor Explorer and its original content, features, and functionality are owned by West Wanted LLC and are protected by international copyright, trademark, and other intellectual property laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">7. Disclaimer</h2>
                            <p className="mb-4">
                                Raptor Explorer is not affiliated with Turo Inc. The name "Turo" is a registered trademark of Turo Inc. Use of this registered trademark is only used as necessary to identify the products and services referenced and does not imply or suggest any affiliation, endorsement, partnership, or business relationship with Turo Inc.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                            <p className="mb-4">
                                Raptor Explorer and West Wanted LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
                            <p className="mb-4">
                                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the extension.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
                            <p className="mb-4">
                                For questions about these Terms of Service, please contact:
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