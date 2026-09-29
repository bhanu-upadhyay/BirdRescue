'use client';

export default function Help() {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Emergency Banner */}
      <div className="bg-red-500 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-semibold">Emergency Bird Rescue Hotline: +1 (555) 123-4567</span>
          </div>
          <button className="bg-white text-red-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-50 transition-colors duration-200">
            Call Now
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Emergency Bird Help</h1>
          <p className="text-xl text-gray-600">Quick guide to helping injured or distressed birds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What to Do First</h2>
              <ul className="space-y-4">
                {[
                  'Keep the bird warm and quiet',
                  'Do not give food or water',
                  'Place in a well-ventilated box',
                  'Keep away from children and pets',
                  'Call our emergency hotline immediately'
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-500 font-semibold mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">When to Call Us</h2>
              <ul className="space-y-4">
                {[
                  'Bird is visibly injured or bleeding',
                  'Bird appears sick or disoriented',
                  'Young bird found on the ground',
                  'Bird collided with window',
                  'Bird caught by cat or dog'
                ].map((situation, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{situation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Download Our Emergency Guide</h2>
          <p className="text-gray-600 mb-6">
            Get our comprehensive guide on bird rescue and first aid. Available in multiple languages.
          </p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-200">
            Download PDF Guide
          </button>
        </div>
      </div>
    </div>
  );
} 