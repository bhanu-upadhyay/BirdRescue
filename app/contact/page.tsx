'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Update the input field classes with consistent height and padding
const inputClasses = "h-12 px-4 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200";
const inputErrorClasses = "h-12 px-4 mt-1 block w-full rounded-lg border-red-300 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200";
const textareaClasses = "px-4 py-3 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 min-h-[120px] resize-y";
const selectClasses = "h-12 px-4 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200";

// Validation patterns
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

interface FormErrors {
  email?: string;
  phone?: string;
}

interface BirdInfo {
  species: string;
  scientificName: string;
  commonIssues: string[];
  immediateActions: string[];
  description?: string;
  habitat?: string;
  treatment?: string[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  condition: string;
  description: string;
  dateFound: string;
}

interface SearchResult {
  snippet: string;
  url: string;
}

interface ProcessedBirdData {
  description: string;
  habitat: string;
  treatment: string[];
}

// Web search function
const webSearch = async (query: string): Promise<SearchResult[]> => {
  try {
    // In a real application, you would call an actual web search API
    // This is a mock implementation that returns properly typed results
    return [
      {
        snippet: `The ${query.split(' ')[0]} is a common bird species found in urban areas...`,
        url: 'https://example.com/birds/1'
      },
      {
        snippet: `These birds typically inhabit gardens, parks, and woodland edges...`,
        url: 'https://example.com/birds/2'
      }
    ];
  } catch (error) {
    console.error('Web search error:', error);
    return [];
  }
};

// Bird recognition API configuration
const API_ENDPOINT = '/api/predict';

// Function to identify bird species using AI
const identifyBirdSpecies = async (imageFile: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image_file', imageFile);

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error('Failed to identify bird species');
    }

    const data = await response.json();
    console.log('API Response:', data); // For debugging

    if (data.predictions && data.predictions.length > 0) {
      // Find the most confident prediction with a specific bird species
      const speciesPrediction = data.predictions.find(
        (pred: any) => pred.category.children?.length > 0
      );

      if (speciesPrediction) {
        const birdSpecies = speciesPrediction.category.children[0];
        const confidence = (birdSpecies.score * 100).toFixed(2);
        return `${birdSpecies.displayName} (${confidence}% confidence)`;
      }

      // If no specific species found, return general bird detection
      const birdPrediction = data.predictions.find(
        (pred: any) => pred.category.score
      );
      if (birdPrediction) {
        const confidence = (birdPrediction.category.score * 100).toFixed(2);
        return `Bird (${confidence}% confidence)`;
      }
    }
    return 'Unknown Species';
  } catch (error) {
    console.error('Error identifying bird:', error);
    return 'Unknown Species';
  }
};

// Function to get bird information from web search
const getBirdInformation = async (species: string): Promise<Partial<BirdInfo>> => {
  try {
    const searchQuery = `${species} bird characteristics habitat behavior rescue treatment`;
    const results = await webSearch(searchQuery);
    
    // Process and extract relevant information from search results
    const description = results[0]?.snippet || '';
    const habitat = results[1]?.snippet || '';
    
    // Search for common issues and treatment
    const healthQuery = `${species} bird common health issues treatment rescue`;
    const healthResults = await webSearch(healthQuery);
    
    const commonIssues = [
      'Injury',
      'Dehydration',
      'Malnutrition',
      'Illness',
    ];

    const immediateActions = [
      'Place in a quiet, warm, and dark place',
      'Do not attempt to feed or give water immediately',
      'Keep away from pets and children',
      'Contact a wildlife rehabilitator',
    ];

    const treatment = healthResults.map(result => result.snippet.split('.')[0]).filter(Boolean);

    return {
      species,
      description,
      habitat,
      commonIssues,
      immediateActions,
      treatment: treatment.slice(0, 5)
    };
  } catch (error) {
    console.error('Error getting bird information:', error);
    return {};
  }
};

const processBirdSearchResults = (results: SearchResult[]): ProcessedBirdData => {
  return {
    description: results[0]?.snippet || '',
    habitat: results[1]?.snippet || '',
    treatment: [
      'Keep the bird in a quiet, dark place',
      'Maintain optimal temperature',
      'Contact local wildlife rehabilitator',
      'Avoid handling unnecessarily'
    ]
  };
};

export default function Contact() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [birdInfo, setBirdInfo] = useState<BirdInfo | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Form state with all fields
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    condition: '',
    description: '',
    dateFound: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    email: false,
    phone: false,
  });

  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('birdRescueFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('birdRescueFormData', JSON.stringify(formData));
  }, [formData]);

  // Update searchBirdInfo to be used in the component
  const searchBirdInfo = async (species: string) => {
    try {
      const searchQuery = `${species} bird identification characteristics treatment rescue`;
      const results = await webSearch(searchQuery);
      
      // Process search results to extract relevant information
      const birdData = processBirdSearchResults(results);
      if (birdInfo) {
        setBirdInfo({
          ...birdInfo,
          description: birdData.description,
          habitat: birdData.habitat,
          treatment: birdData.treatment
        });
      }
    } catch (error) {
      console.error('Error searching bird information:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        setSelectedImage(reader.result as string);
        
        try {
          // Identify bird species using AI
          const identifiedSpecies = await identifyBirdSpecies(file);
          
          // Get detailed information about the identified species
          const birdData = await getBirdInformation(identifiedSpecies);
          
          setBirdInfo({
            species: identifiedSpecies,
            scientificName: birdData.scientificName || 'Scientific name not available',
            commonIssues: birdData.commonIssues || [],
            immediateActions: birdData.immediateActions || [],
            description: birdData.description,
            habitat: birdData.habitat,
            treatment: birdData.treatment
          });
          
        } catch (error) {
          console.error('Error processing image:', error);
          alert('Failed to identify bird species. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    
    if (emailError || phoneError) {
      setErrors({
        email: emailError,
        phone: phoneError
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('birdRescueFormData', JSON.stringify(formData));

    // Here you would typically submit the data to your backend
    try {
      // Simulated API call
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        condition: '',
        description: '',
        dateFound: '',
      });
      setSelectedImage(null);
      setBirdInfo(null);
      localStorage.removeItem('birdRescueFormData');
      
      // Show success message
      alert('Report submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes and validation
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate email and phone if touched
    if (touched[name as keyof typeof touched]) {
      setErrors(prev => ({
        ...prev,
        [name]: name === 'email' ? validateEmail(value) : validatePhone(value)
      }));
    }
  };

  // Handle blur events for validation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: name === 'email' ? validateEmail(value) : validatePhone(value)
    }));
  };

  // Validation functions
  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required';
    }
    if (!EMAIL_REGEX.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone) {
      return 'Phone number is required';
    }
    if (!PHONE_REGEX.test(phone.replace(/\s+/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return '';
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 fixed top-16 w-full z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex h-10 w-10 rounded-full bg-red-400 items-center justify-center">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-lg">Emergency Bird Rescue</p>
                <p className="text-red-100">24/7 Hotline: +91 876848496</p>
              </div>
            </div>
            <button className="bg-white text-red-500 px-6 py-2 rounded-full text-sm font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-md">
              Call Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-40 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Report an Injured Bird</h1>
            <p className="text-xl text-gray-600">Help us provide immediate assistance to birds in need</p>
          </div>
          
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Your Information</h2>
                <p className="text-gray-600">Please provide your contact details</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Full Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="John Doe"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Email Address</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? inputErrorClasses : inputClasses}
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </label>
              </div>
              <div className="space-y-6">
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Phone Number</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={errors.phone && touched.phone ? inputErrorClasses : inputClasses}
                    placeholder="+91 876848496"
                    required
                  />
                  {errors.phone && touched.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </label>
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Location Found</span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Enter location details"
                    required
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Bird Information Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <span className="text-2xl">🦜</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Bird Information</h2>
                <p className="text-gray-600">Help us identify and assist the bird</p>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-4">
                Upload Bird Images
              </label>
              <div className="mt-1 flex justify-center px-6 py-10 border-2 border-gray-300 border-dashed rounded-xl hover:border-green-500 transition-colors duration-300 bg-gray-50">
                <div className="space-y-2 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                      <span>Upload images</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Preview and Bird Info */}
            {selectedImage && (
              <div className="mb-8">
                <div className="relative h-80 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={selectedImage}
                    alt="Uploaded bird"
                    fill
                    className="object-cover"
                  />
                </div>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 text-lg">Analyzing image and gathering information...</p>
                  </div>
                ) : birdInfo && (
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Bird Identification Results</h3>
                    <div>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Species:</span> {birdInfo.species}
                      </p>
                      {birdInfo.description && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2">Description:</h4>
                          <p className="text-gray-700">{birdInfo.description}</p>
                        </div>
                      )}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Common Issues:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {birdInfo.commonIssues.map((issue, index) => (
                            <li key={index}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Emergency Care:</h4>
                        <ul className="space-y-2">
                          {birdInfo.immediateActions.map((action, index) => (
                            <li key={index} className="flex items-start">
                              <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-500 mr-2">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {birdInfo.treatment && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-800 mb-2">Treatment Guidelines:</h4>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {birdInfo.treatment.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Additional Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Bird&apos;s Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className={selectClasses}
                  required
                >
                  <option value="">Select condition...</option>
                  <option>Injured</option>
                  <option>Sick</option>
                  <option>Orphaned</option>
                  <option>Not Sure</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Detailed Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={textareaClasses}
                  placeholder="Please describe the bird's condition, behavior, and any visible injuries..."
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  When was the bird found?
                </label>
                <input
                  type="datetime-local"
                  name="dateFound"
                  value={formData.dateFound}
                  onChange={handleInputChange}
                  className={inputClasses}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading || !!errors.email || !!errors.phone}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
} 