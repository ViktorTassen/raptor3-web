"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Chrome, LogOut } from 'lucide-react';
import Header from '../components/Header';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
  { id: 'settings-panel', title: 'Settings Panel' },
  { id: 'manage-subscription', title: 'Manage Your Subscription' },
  { id: 'common-issues', title: 'Common Issues' },
  { id: 'support', title: 'Support' },
];

export default function Instructions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('welcome');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const screenshots = [
    { src: "/s1.png", alt: "Finding the Raptor Explorer button" },
    { src: "/s2.png", alt: "Empty data table view" },
    { src: "/s3.png", alt: "Google sign-in process" },
    { src: "/s4.png", alt: "Recording button location" },
    { src: "/s5.png", alt: "Recording active state" },
    { src: "/s6.png", alt: "Map movement and search button" },
    { src: "/s7.png", alt: "Vehicles added notification" },
    { src: "/s8.png", alt: "Enrichment process start" },
    { src: "/s9.png", alt: "Enriched data view" },
    { src: "/s10.png", alt: "Free vs Pro comparison" },
    { src: "/s11.png", alt: "Upgrade prompt" },
    { src: "/s12.png", alt: "Pro features unlocked" },
    { src: "/s13.png", alt: "Table columns and data points" },
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

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

  const ScreenshotImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => (
    <div 
      className="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      style={{ paddingTop: 'calc(100% / 2.07)' }}
      onClick={() => openLightbox(index)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-24 right-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-md"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={screenshots}
      />

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

              <section id="installation" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Installation</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Add to Chrome</h3>
                    <p className="mb-4">
                      To install Raptor Explorer, follow these steps:
                    </p>
                    <ol className="list-decimal pl-6 space-y-4">
                      <li>
                        Visit the
                        <a 
                          href="https://chromewebstore.google.com/detail/raptor-explorer-car-renta/kcekmgedcdnjjfcklokfidemgjdanjpp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#593CFB] gap-2"
                        > Chrome Web Store page for Raptor Explorer
                        </a>
                      </li>
                      <li>Click the "Add to Chrome" button on the Chrome Web Store page</li>
                      <li>Review the permissions and click "Add extension" in the confirmation dialog</li>
                      <li>Wait for the installation to complete</li>
                      <li>
                        Once installed, you'll see the Raptor Explorer icon in your Chrome toolbar
                        <div className="mt-2 flex items-center gap-2">
                          <Image
                            src="/icon-cropped.png"
                            alt="Raptor Explorer Icon"
                            width={24}
                            height={24}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-600">← Look for this icon in your toolbar</span>
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-6">
                    <h4 className="font-medium mb-2">Important Notes</h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Tested in Chrome browser only</li>
                      <li>All data collection is limited to Turo.com domain</li>
                      <li>We do not collect any personal information, including any details associated with your Turo account</li>
                    </ul>
                  </div>
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
                      <ScreenshotImage src="/s1.png" alt="Finding the Raptor Explorer button" index={0} />
                      <ScreenshotImage src="/s2.png" alt="Empty data table view" index={1} />
                    </div>
                  </div>

                  <div id="step2">
                    <h3 className="text-xl font-semibold mb-3">2. Sign in with Google</h3>
                    <p className="mb-4">
                      Click on "Sign in with Google" and select your Google account. Raptor Explorer only accesses your 
                      email for communication purposes and does not collect personal information.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <ScreenshotImage src="/s3.png" alt="Google sign-in process" index={2} />
                      <ScreenshotImage src="/s4.png" alt="Google sign-in select" index={3} />
                    </div>
                  </div>

                  <div id="step3">
                    <h3 className="text-xl font-semibold mb-3">3. Start Recording</h3>
                    <p className="mb-4">
                      Press the "Start recording" button to allow the extension to begin adding vehicles to the list when 
                      data is retrieved from Turo.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <ScreenshotImage src="/s5.png" alt="Recording location" index={4} />
                      <ScreenshotImage src="/s6.png" alt="Recording active state" index={5} />
                    </div>
                  </div>

                  <div id="step4">
                    <h3 className="text-xl font-semibold mb-3">4. Update Search</h3>
                    <p >
                      Move the map slightly until the "Search this area" button appears and click it. A notification will 
                      show how many vehicles have been added to the Raptor table. Each request captures a maximum of 200 
                      vehicles, so zoom and pan the map to collect all vehicles in the area.
                    </p>
                    <p className="mb-4">If no notification appears, refresh the page or close and reopen it to restart the script that collects vehicle data.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <ScreenshotImage src="/s7.png" alt="Search map" index={6} />
                      <ScreenshotImage src="/s8.png" alt="Vehicles added notification" index={7} />
                    </div>
                  </div>

                  <div id="step5">
                    <h3 className="text-xl font-semibold mb-3">5. Enrich Data</h3>
                    <p className="mb-4">
                      Click "Enrich vehicle data" to gather additional details for all listed vehicles. Each vehicle takes 
                      approximately 4 seconds to process because the extension pulls data from multiple sources.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <ScreenshotImage src="/s9.png" alt="Enriched data button" index={8} />
                      <ScreenshotImage src="/s10.png" alt="Enriched data view" index={9} />
                    </div>
                  </div>

                  <div id="step6">
                    <h3 className="text-xl font-semibold mb-3">6. Upgrade to Pro</h3>
                    <p className="mb-4">
                      Once you've tested the extension, consider upgrading to Pro to unlock its full potential. The free 
                      version allows you to enrich data for up to 5 vehicles, giving you a preview of the insights available.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <ScreenshotImage src="/s11.png" alt="Upgrade to Pro 1" index={10} />
                      <ScreenshotImage src="/s12.png" alt="Upgrade to Pro 2" index={11} />
                      <ScreenshotImage src="/s13.png" alt="Upgrade to Pro Stripe" index={12} />
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
                      <li>Favs: How many times the car has been added to users' favorites</li>
                      <li>Rating: Average rating given by renters</li>
                      <li>Reviews: Total number of guest reviews received</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Host Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Instant Book: Icons indicating where instant booking is enabled: Airport locations, Custom locations, Home location, Points of interest</li>
                      <li>Host: Host name with profile picture</li>
                      <li>Host Status: Indicates if host is All-Star and/or Pro</li>
                      <li>P Plan: Protection plan rate percentage chosen by host</li>
                      <li>Host ID: Unique identifier for the host</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Location & Vehicle Details</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>City, State: Vehicle's listed location</li>
                      <li>Transmission: Auto or Manual</li>
                      <li>Color: Vehicle color with visual indicator</li>
                      <li>Daily Distance: Allowed daily mileage</li>
                      <li>Weekly Distance: Allowed weekly mileage</li>
                      <li>Monthly Distance: Allowed monthly mileage</li>
                      <li>Excess Fee: Per mile/km charge for exceeding distance limits</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Pricing & Discounts</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Weekly Discount: Percentage discount for weekly rentals</li>
                      <li>Monthly Discount: Percentage discount for monthly rentals</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Listing Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Listed: Date when the vehicle was first listed on Turo</li>
                      <li>Vehicle ID: Unique identifier for the vehicle</li>
                      <li>Listing URL: Direct link to the vehicle's Turo listing</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="settings-panel" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Settings Panel</h2>
                <p className="mb-6">
                  The settings panel allows you to customize how revenue calculations are performed. These settings affect all 
                  revenue-related metrics in the table and exports.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">1. Include Weekly/Monthly Discounts</h3>
                    <div className="bg-gray-50 rounded-lg p-6 mb-4">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="font-medium">Enabled (Default)</span>
                        </div>
                        <p className="text-gray-600 ml-5">
                          Revenue calculations include any applicable weekly (7+ days) or monthly (31+ days) discounts 
                          offered by the host
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="font-medium">Disabled</span>
                        </div>
                        <p className="text-gray-600 ml-5">
                          Revenue is calculated using the base daily rate without any discounts
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="font-medium mb-2">Calculation Method:</h4>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>For bookings ≥ 31 days: Applies monthly discount percentage</li>
                        <li>For bookings ≥ 7 days: Applies weekly discount percentage (if no monthly discount applies)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">2. Apply Protection Plan Rate</h3>
                    <div className="bg-gray-50 rounded-lg p-6 mb-4">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="font-medium">Disabled (Default)</span>
                        </div>
                        <p className="text-gray-600 ml-5">
                          Shows full revenue before protection plan fees
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="font-medium">Enabled</span>
                        </div>
                        <p className="text-gray-600 ml-5">
                          Revenue is adjusted based on the host's chosen protection plan rate
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Impact on Revenue Metrics</h3>
                    <p className="mb-4">These settings affect the following columns:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Est. Monthly Revenue</li>
                      <li>Avg Monthly Revenue</li>
                      <li>Prev Year Revenue</li>
                      <li>ROI (due to changes in revenue calculations)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Export Considerations</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>When exporting to CSV, the current settings state is included in the export</li>
                      <li>A "Revenue Settings" column indicates which adjustments were applied to the calculations</li>
                      <li>Settings are preserved between sessions</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="manage-subscription" className="mb-24">
                <h2 className="text-2xl font-bold mb-4">Manage Your Subscription</h2>
                <p className="mb-4">
                  Click on the extension icon in your browser's extensions bar, then select "Manage Subscription." This will 
                  open the Stripe customer portal, where you can update your billing details, download invoices, or cancel 
                  your subscription.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <ScreenshotImage src="/s14.png" alt="Manage subscription" index={13} />
                </div>
              </section>

              <section id="common-issues" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Common Issues</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Vehicle Data Not Enriching (Pro Members)</h3>
                    <p className="mb-4">
                      If you're a Pro member and experiencing issues with vehicle data enrichment, follow these steps:
                    </p>
                    <ol className="list-decimal pl-6 space-y-4">
                      <li>
                        <strong>Sign out of your account:</strong>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                          <li>Click the Raptor Explorer icon in your Chrome toolbar (cif extension is not pinned click puzzle icon in top right corner first)</li>
                          <li>Click "Sign Out"</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Sign back in:</strong>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                          <li>Return to Turo and click the Raptor Explorer button</li>
                          <li>Click "Sign in with Google"</li>
                          <li>Select your account</li>
                        </ul>
                      </li>
                    </ol>
                    
                    <div className="bg-yellow-50 rounded-lg p-6 mt-6">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <LogOut className="w-5 h-5" />
                        Having issues?
                      </h4>
                      <p className="text-gray-600">
                       Please contact our support team at{' '}
                        <a href="mailto:support@raptorexplorer.com" className="text-blue-600 hover:underline">
                          support@raptorexplorer.com
                        </a>
                        . This could indicate a temporary service disruption affecting all users.
                      </p>
                    </div>
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