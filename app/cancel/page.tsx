"use client";

import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import Header from "../components/Header";

export default function Cancel() {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
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
    }, []);

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
            <Header />

            <div className="flex-grow flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#fce8e6] mb-4">
                            <XCircle className="w-6 h-6 text-[#c5221f]" />
                        </div>
                        
                        <h1 className="text-[#202124] text-xl font-medium mb-2">
                            Purchase Cancelled
                        </h1>
                        
                        <p className="text-[#5f6368] mb-6">
                            Your purchase was not completed. You can try again by selecting a different payment method or plan.
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