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
  { id: 'step6', title: '6. Select Date Range', parent: 'get-vehicle-data' },
  { id: 'step7', title: '7. Export', parent: 'get-vehicle-data' },
];

export default function Instructions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX

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
      const offset = 80; // Height of the sticky header
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
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-24 right-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-md"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Navigation Menu */}
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

          {/* Main Content */}
          <main className="flex-grow py-12">
            <article className="prose max-w-none">
              {/* Welcome Section */}
              <section id="welcome">
                <h1 className="text-4xl font-bold mb-4">Welcome to Raptor Explorer!</h1>
                <p className="text-sm text-gray-500 mb-6">Last updated: 2024-06-11</p>
                
                <p className="mb-8">
                  Welcome to Raptor Explorer tutorial and docs! Raptor is the Chrome extension for Car Sharing analytics, 
                  you can find all cars stats in your area. Please read the instructions and follow them to make your 
                  experience easy and end enjoyable!
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 text-sm">
                  <p className="text-gray-600">
                    Tasiev LLC d/b/a Raptor Explorer is not affiliated with Turo Inc. The name "Turo" is a registered 
                    trademark of Turo Inc. Use of this registered trademark is only used as necessary to identify the 
                    products and services referenced and does not imply or suggest, nor is it intended to imply or suggest, 
                    any affiliation, endorsement, partnership, or business relationship with Turo Inc.
                  </p>
                </div>
              </section>

              {/* Installation Section */}
              <section id="installation" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">How to install</h2>
                <p>Open Chrome Web Store extension page and click "Add to Chrome".</p>
                
                <div className="my-6 bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-500 italic">Screenshot: Chrome Web Store installation page</p>
                </div>
              </section>

              {/* Get Vehicle Data Section */}
              <section id="get-vehicle-data" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Get vehicle data</h2>
                <p className="mb-4">
                  This section of our guide will walk you through the process of acquiring detailed information on all 
                  available vehicles listed on Turo within your selected area. By following the steps outlined, you can 
                  utilize Raptor Explorer to gather data efficiently. This data is essential for understanding the market, 
                  planning your rental strategy, or conducting comprehensive analysis for your car-sharing business or 
                  research project.
                </p>

                <div className="space-y-8">
                  {/* Step 1 */}
                  <div id="step1">
                    <h3 className="text-xl font-semibold mb-3">1. Open Search page</h3>
                    <p className="mb-4">
                      Begin by searching for a car on Turo in the city of your choice. Specify a rental duration of 2-3 
                      days, preferably a couple of months from today, to see the most options (choosing dates too soon may 
                      exclude some cars that are already rented). Above the search results, you will notice the "Raptor 
                      Explorer" button at the top left. Click this button to display the extension's table in a popup 
                      window. If this is your first time using it or if you have previously cleared the results, the table 
                      will initially be empty, showing only the column headers.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-sm text-gray-500 italic">Screenshot: Opening search page</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div id="step2">
                    <h3 className="text-xl font-semibold mb-3">2. Sign in with Google</h3>
                    <p className="mb-4">
                      Sign in using your Google account by clicking on "Sign in with Google." A window will appear asking 
                      you to select your Google account. Raptor Explorer only uses your email address for communication 
                      purposes and does not gather any other personal information.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-sm text-gray-500 italic">Screenshot: Google sign-in process</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div id="step3">
                    <h3 className="text-xl font-semibold mb-3">3. Start recording</h3>
                    <p className="mb-4">
                      Click on the "Start recording" button. No vehicles will be added just yet; this step simply permits 
                      the extension to add vehicles to your list next time it retrieves information from Turo server. 
                      Ensure that the recording feature is turned on before you proceed.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-sm text-gray-500 italic">Screenshot: Start recording button</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div id="step4">
                    <h3 className="text-xl font-semibold mb-3">4. Update search</h3>
                    <p className="mb-4">
                      Slightly move the map to trigger Turo to show the "Search this area" button at the map's top, and 
                      click it. (On some versions of the Turo website, you might see an option that says "Search as I move 
                      the map." If so, tick this box and then move the map to refresh the car results from Turo). A 
                      notification will display in the website's top-right corner indicating how many vehicles have been 
                      added to your Raptor table. Each request has maximum of 200 vehicles, so try moving and zooming the 
                      map to capture all vehicles in the area. Raptor Explorer only adds unique vehicles, ensuring no 
                      duplicates.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-sm text-gray-500 italic">Screenshot: Updating search area</p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div id="step5">
                    <h3 className="text-xl font-semibold mb-3">5. Enrich data</h3>
                    <p className="mb-4">
                      Click on the "Enrich vehicle data" button to initiate the process of gathering detailed data for each 
                      listed vehicle, filling in the missing information for each row and column. This process typically 
                      takes around one second per vehicle, so take this time to sit back and enjoy your tea or coffee. Keep 
                      the Raptor popup window open to maintain active data enrichment.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-sm text-gray-500 italic">Screenshot: Data enrichment process</p>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div id="step6">
                    <h3 className="text-xl font-semibold mb-3">6. Select Date Range</h3>
                    <p className="mb-4">
                      After the data enrichment is done, you can select different Date Ranges for two columns in the 
                      interface (check the screenshot). Choose dates within a span of up to one year before the current day 
                      and one month into the future. Looking ahead by 30 days can provide insights into early bookings for 
                      each car. Choose from last 30, 90, 180, or 365 days, this calendar year, or set a custom range -- 
                      perhaps you're interested in seeing revenue during summer months. Each column includes subcolumns for 
                      "BusyDays" and "Income," whose data will update whenever you change the Date Ranges.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-sm text-gray-500 italic">Screenshot: Date range selection</p>
                    </div>
                  </div>

                  {/* Step 7 */}
                  <div id="step7">
                    <h3 className="text-xl font-semibold mb-3">7. Export</h3>
                    <p className="mb-4">
                      Export the data from Raptor to a spreadsheet file (xlsx). When doing so, the file will retain the 
                      selected date ranges, and only the vehicles you've chosen to display (if you've applied filters to 
                      the Raptor columns) will be included.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-sm text-gray-500 italic">Screenshot: Exporting data</p>
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}