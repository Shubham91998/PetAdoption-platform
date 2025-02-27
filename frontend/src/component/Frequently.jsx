import React, { useState } from 'react'

const Frequently = () => {
    const faq = [
        {
            question: "Why Should You Adopt a Dog or Cat?",
            answer: `Did you know that over 2000 people per hour in India run a search right here looking to adopt a pet? 
              Pet adoption is becoming the preferred way to find a new pet. Adoption will always be more convenient than buying a 
              puppy for sale from a pet shop or finding a kitten for sale from a litter. Pet adoption brings less stress and 
              more savings! So what are you waiting for? Go find that perfect pet for home!`,
          },
          {
            question: "What is the fee to adopt a pet?",
            answer: `No, there is no fee for pet adoption on <a href="/" target="_blank">ThePetNest</a>. However, if you adopt from a different city, the pet owner/rescuer 
              can ask for travel charges. In case you find someone asking for charges, you can write to us at 
              <a href="mailto:support@thepetnest.com">support@thepetnest.com</a>.`,
          },
          {
            question: "How old do I need to be to adopt a pet?",
            answer: "You need to be at least 18+ years old to adopt.",
          },
          {
            question: "Can you return an adopted pet?",
            answer: `We understand it can be hard to get an adjusted pet in the new home and vice versa. As long as your reason for 
              returning is reasonable, you’ll be welcome to put it up for adoption again.`,
          },
    ]
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Pet Adoption FAQs</h1>
        <div className="space-y-4">
          {faq.map((item, index) => (
            <div key={index} className="border rounded-lg shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-4 py-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none"
              >
                {item.question}
              </button>
              {activeIndex === index && (
                <div className="px-4 py-3 bg-gray-100 text-gray-800">
                  <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Frequently
