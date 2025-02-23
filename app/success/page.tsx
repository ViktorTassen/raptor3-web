"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import Header from "../components/Header";

export default function Success() {
    const [countdown, setCountdown] = useState(10);
    const [loading, setLoading] = useState(true);
    const [purchaseType, setPurchaseType] = useState<'subscription' | 'one-time' | null>(null);

    useEffect(() => {
        async function verifyPurchase() {
            const sessionId = new URLSearchParams(window.location.search).get('session_id');
            
            if (!sessionId) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/verify-purchase?session_id=${sessionId}`);
                const data = await response.json();

                if (response.ok) {
                    setPurchaseType(data.mode);
                }
            } catch (err) {
                console.error('Error verifying purchase:', err);
            } finally {
                setLoading(false);
            }
        }

        verifyPurchase();
    }, []);

    useEffect(() => {
        if (loading) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    window.close();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [loading]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
            <Header />

            <div className="flex-grow flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#e6f4ea] mb-4">
                            <CheckCircle className="w-6 h-6 text-[#137333]" />
                        </div>
                        
                        <h1 className="text-[#202124] text-xl font-medium mb-2">
                            {purchaseType === 'subscription' ? 'Subscription Active' : 'Purchase Complete'}
                        </h1>
                        
                        <p className="text-[#5f6368] mb-6">
                            {purchaseType === 'subscription'
                                ? 'Your subscription has been activated and is ready to use.'
                                : 'Your purchase has been completed successfully.'}
                        </p>

                        <div className="text-sm text-[#5f6368]">
                            This window will close in {countdown} seconds
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 text-center">
                <p className="text-[#5f6368] text-sm">
                    Need help? Contact <a href="mailto:support@raptorexplorer.com" className="text-[#1a73e8] hover:text-[#1557b0]">support@raptorexplorer.com</a>
                </p>
            </div>
        </div>
    );
}