'use client';
import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: 'What should I do if I find an injured bird?',
      answer: 'First, ensure your safety and the bird\'s safety. Place the bird in a well-ventilated box lined with a soft cloth. Keep it warm and quiet, and contact our emergency hotline immediately. Do not attempt to feed or give water to the bird.'
    },
    {
      question: 'How do I know if a baby bird needs help?',
      answer: 'Not all baby birds found on the ground need rescue. If the bird is feathered, it\'s likely a fledgling learning to fly. If it\'s naked or has few feathers, it\'s a nestling and should be returned to its nest if possible. Contact us if you\'re unsure or if the bird appears injured.'
    },
    {
      question: 'Do you charge for bird rescue services?',
      answer: 'Our rescue services are provided free of charge as we are a non-profit organization. However, we welcome donations to help us continue our work and provide the best possible care for injured birds.'
    },
    {
      question: 'Can I volunteer with your organization?',
      answer: 'Yes! We welcome volunteers who are passionate about bird conservation. We provide training and various opportunities to help, from rescue operations to administrative support. Contact us to learn about current volunteer opportunities.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'We primarily serve the greater metropolitan area and surrounding counties. For areas outside our service region, we can refer you to other wildlife rehabilitation centers or provide guidance over the phone.'
    },
    {
      question: 'How long does rehabilitation usually take?',
      answer: 'The rehabilitation period varies greatly depending on the type of injury or illness and the species of bird. It can range from a few days to several months. Our goal is to ensure the bird is fully recovered before release.'
    },
    {
      question: 'Can I keep a wild bird as a pet?',
      answer: 'No, it is illegal to keep wild birds as pets without proper permits. Wild birds are protected by federal law and should remain in their natural habitat. Our goal is always to rehabilitate and release birds back to the wild.'
    },
    {
      question: 'How can I prevent birds from hitting my windows?',
      answer: 'You can make windows safer for birds by: applying window decals, installing external screens, using UV reflective tape, or placing bird feeders either very close to or far from windows. Contact us for more detailed prevention strategies.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about bird rescue and care</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Can&apos;t find the answer you&apos;re looking for? Please reach out to our team.
          </p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-200">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
} 