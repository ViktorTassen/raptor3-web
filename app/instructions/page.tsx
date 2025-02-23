
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import Header from '../components/Header';

const sections = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'installation', title: 'Installation' },
  { id: 'get-vehicle-data', title: 'Get Vehicle Data' },
  { id: 'step1', title: '1. Open Search page', parent: 'get-vehicle-data' },
  { id: 'step2', title: '2. Sign in with Google', parent: 'get-vehicle-data' },
  { id: 'step3', title: '3. Start recording', parent: 'get-vehicle-data' },
  { id: 'step4', title: '4. Update search', parent: 'get-vehicle-data' },
  { id: 'step5', title: '5. Enrich data', parent: 'get-vehicle-data' },
  { id: 'step6', title: '6. Upgrade to Pro', parent: 'get-vehicle-data' },
  { id: 'table-columns', title: 'Table Columns & Data Points' },
  { id: 'manage-subscription', title: 'Manage Your Subscription' },
  { id: 'support', title: 'Support' },
];

export default function Instructions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-24 right-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-md"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 relative">
          <nav className={`
            ${isMenuOpen ? 'fixed inset-0 bg-white z-40 overflow-y-auto' : 'hidden'}
            md:sticky md:block md:top-24 md:h-[calc(100vh-6rem)] md:w-64 md:flex-shrink-0 md:overflow-y-auto
            p-4 md:bg-transparent
          `}>
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    block w-full text-left px-3 py-2 rounded-lg transition-colors
                    ${section.parent ? 'ml-4 text-sm' : 'font-medium'}
                    ${activeSection === section.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </nav>

          <main className="flex-grow py-12">
            <article className="prose max-w-none">
              <section id="welcome">
                <h1 className="text-4xl font-bold mb-4">Raptor Explorer - Guide</h1>
                <p className="text-sm text-gray-500 mb-6">Last updated: 2025-02-22</p>
                
                <p className="mb-8">
                  Raptor Explorer is a Chrome extension for analyzing Turo vehicle listings and performance metrics. 
                  This guide explains all features, data points, and calculations available in the extension.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 text-sm">
                  <p className="text-gray-600">
                    Raptor Explorer is not affiliated with Turo Inc. The name "Turo" is a registered trademark of Turo Inc. 
                    Use of this registered trademark is only used as necessary to identify the products and services referenced 
                    and does not imply or suggest, nor is it intended to imply or suggest, any affiliation, endorsement, 
                    partnership, or business relationship with Turo Inc.
                  </p>
                </div>
              </section>

              <section id="get-vehicle-data" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">How to Use</h2>

                <div className="space-y-8">
                  <div id="step1">
                    <h3 className="text-xl font-semibold mb-3">1. Open Search Page</h3>
                    <p className="mb-4">
                      Start by searching for a vehicle on Turo in the desired location. Set a rental duration of 2-3 days, 
                      ideally a few months ahead, for broader results. Look for the "Raptor Explorer" button at the top-left 
                      above the search results. Click this button to open the extension's data table.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 italic">Screenshot 1: Finding the Raptor Explorer button</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 italic">Screenshot 2: Empty data table view</p>
                      </div>
                    </div>
                  </div>

                  <div id="step2">
                    <h3 className="text-xl font-semibold mb-3">2. Sign in with Google</h3>
                    <p className="mb-4">
                      Click on "Sign in with Google" and select your Google account. Raptor Explorer only accesses your 
                      email for communication purposes and does not collect personal information.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-500 italic">Screenshot: Google sign-in process</p>
                    </div>
                  </div>

                  <div id="step3">
                    <h3 className="text-xl font-semibold mb-3">3. Start Recording</h3>
                    <p className="mb-4">
                      Press the "Start recording" button to allow the extension to begin adding vehicles to the list when 
                      data is retrieved from Turo.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 italic">Screenshot 1: Recording button location</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 italic">Screenshot 2: Recording active state</p>
                      </div>
                    </div>
                  </div>

                  <div id="step4">
                    <h3 className="text-xl font-semibold mb-3">4. Update Search</h3>
                    <p className="mb-4">
                      Move the map slightly until the "Search this area" button appears and click it. A notification will 
                      show how many vehicles have been added to the Raptor table. Each request captures a maximum of 200 
                      vehicles, so zoom and pan the map to collect all vehicles in the area.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 italic">Screenshot 1: Map movement and search button</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 italic">Screenshot 2: Vehicles added notification</p>
                      </div>
                    </div>
                  </div>

                  <div id="step5">
                    <h3 className="text-xl font-semibold mb-3">5. Enrich Data</h3>
                    <p className="mb-4">
                      Click "Enrich vehicle data" to gather additional details for all listed vehicles. Each vehicle takes 
                      approximately 4 seconds to process because the extension pulls data from multiple sources.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 italic">Screenshot 1: Enrichment process start</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 italic">Screenshot 2: Enriched data view</p>
                      </div>
                    </div>
                  </div>

                  <div id="step6">
                    <h3 className="text-xl font-semibold mb-3">6. Upgrade to Pro</h3>
                    <p className="mb-4">
                      Once you've tested the extension, consider upgrading to Pro to unlock its full potential. The free 
                      version allows you to enrich data for up to 5 vehicles, giving you a preview of the insights available.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 italic">Screenshot 1: Free vs Pro comparison</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 italic">Screenshot 2: Upgrade prompt</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-500 italic">Screenshot 3: Pro features unlocked</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="table-columns" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Table Columns & Data Points</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Basic Vehicle Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Image: Vehicle's primary photo displayed in the Turo listing</li>
                      <li>Type: Vehicle category (Cars, SUVs, Minivans, Trucks, Vans, etc.)</li>
                      <li>Make: Manufacturer of the vehicle</li>
                      <li>Model: Specific model name</li>
                      <li>Trim: Specific trim level indicating the variant of the model</li>
                      <li>Year: Manufacturing year of the vehicle</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Revenue Metrics</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Est. Monthly Revenue: Interactive chart displaying revenue trends</li>
                      <li>Avg Daily Price: The average daily rate charged for booked days</li>
                      <li>Avg Monthly Revenue: Average monthly earnings based on active rental months</li>
                      <li>Prev Year Revenue: Total revenue generated in the previous calendar year</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Performance Metrics</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>ROI: (Annualized Revenue / Market Value) × 100</li>
                      <li>Utilization Rate: Percentage of available days the vehicle was booked</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Market & History</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Avg Market Value: Estimated resale value of the vehicle</li>
                      <li>Days on Turo: Number of days since first listing</li>
                      <li>Trips: Total number of completed rentals</li>
                      <li>Rating: Average rating given by renters</li>
                      <li>Reviews: Total number of guest reviews received</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="manage-subscription" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Manage Your Subscription</h2>
                <p className="mb-4">
                  Click on the extension icon in your browser's extensions bar, then select "Manage Subscription." This will 
                  open the Stripe customer portal, where you can update your billing details, download invoices, or cancel 
                  your subscription.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-500 italic">Screenshot 1: Extension menu location</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-500 italic">Screenshot 2: Stripe customer portal</p>
                  </div>
                </div>
              </section>

              <section id="support" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Support</h2>
                <p>
                  For any questions or feature requests, contact{' '}
                  <a href="mailto:support@raptorexplorer.com" className="text-blue-600 hover:underline">
                    support@raptorexplorer.com
                  </a>
                </p>
              </section>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}