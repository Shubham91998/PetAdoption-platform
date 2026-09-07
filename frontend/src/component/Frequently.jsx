import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Mail, Phone, MessageCircle, Heart, PawPrint } from 'lucide-react';

const Frequently = () => {
    const faq = [
        {
            question: "Why Should You Adopt a Dog or Cat?",
            answer: `Did you know that over 2000 people per hour in India run a search right here looking to adopt a pet? 
              Pet adoption is becoming the preferred way to find a new pet. Adoption will always be more convenient than buying a 
              puppy for sale from a pet shop or finding a kitten for sale from a litter. Pet adoption brings less stress and 
              more savings! So what are you waiting for? Go find that perfect pet for home!`,
            icon: '🐾',
        },
        {
            question: "What is the fee to adopt a pet?",
            answer: `No, there is no fee for pet adoption on <a href="/" target="_blank" class="text-blue-600 hover:underline font-medium">ThePetNest</a>. However, if you adopt from a different city, the pet owner/rescuer 
              can ask for travel charges. In case you find someone asking for charges, you can write to us at 
              <a href="mailto:support@thepetnest.com" class="text-blue-600 hover:underline font-medium">support@thepetnest.com</a>.`,
            icon: '💰',
        },
        {
            question: "How old do I need to be to adopt a pet?",
            answer: "You need to be at least 18+ years old to adopt. If you're under 18, we recommend discussing it with your parents or guardians first.",
            icon: '🎂',
        },
        {
            question: "Can you return an adopted pet?",
            answer: `We understand it can be hard to get an adjusted pet in the new home and vice versa. As long as your reason for 
              returning is reasonable, you'll be welcome to put it up for adoption again. We're here to support you through the entire journey.`,
            icon: '🔄',
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100/10 rounded-full blur-3xl"></div>
                
                <div className="absolute top-10 right-10 opacity-5 rotate-12">
                    <PawPrint size={60} className="text-blue-600" />
                </div>
                <div className="absolute bottom-10 left-10 opacity-5 -rotate-12">
                    <PawPrint size={40} className="text-indigo-600" />
                </div>
            </div>

            <div className="relative max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-sm border border-white/50 mb-4">
                        <HelpCircle className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-700">Got Questions?</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">
                        Pet Adoption <br className="sm:hidden" />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            FAQs
                        </span>
                    </h1>
                    <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
                        Everything you need to know about adopting a furry friend. Find answers to the most common questions below.
                    </p>
                    
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm border border-green-200">
                            <Heart className="w-4 h-4 fill-green-500" />
                            Trusted by #adopters
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
                            <MessageCircle className="w-4 h-4" />
                            24/7 Support
                        </span>
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-3">
                    {faq.map((item, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl shadow-md border transition-all duration-300 overflow-hidden
                                    ${isOpen 
                                        ? 'border-blue-300 shadow-xl ring-1 ring-blue-200' 
                                        : 'border-white/50 hover:shadow-lg hover:border-blue-200'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className={`w-full text-left px-6 py-4 flex items-center justify-between gap-4 
                                        transition-all duration-300 group
                                        ${isOpen ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'hover:bg-slate-50'}`}
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                        <span className={`text-base sm:text-lg font-semibold transition-colors duration-300
                                            ${isOpen ? 'text-blue-700' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                            {item.question}
                                        </span>
                                    </div>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
                                        transition-all duration-300
                                        ${isOpen 
                                            ? 'bg-blue-600 text-white rotate-180' 
                                            : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                                        }`}>
                                        <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out
                                        ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="px-6 py-5 bg-gradient-to-br from-slate-50 to-white border-t border-slate-100">
                                        <div className="prose prose-sm sm:prose-base max-w-none text-slate-700 leading-relaxed">
                                            <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                                        </div>
                                        
                                        {index === 1 && (
                                            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Mail className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-slate-600">
                                                            <span className="font-medium text-blue-700">Need more help?</span> Our support team is here for you.
                                                        </p>
                                                        <a 
                                                            href="mailto:support@thepetnest.com" 
                                                            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline mt-1"
                                                        >
                                                            support@thepetnest.com
                                                            <ChevronDown className="w-3 h-3 -rotate-90" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm flex-shrink-0">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Still have questions?</h3>
                                <p className="text-blue-100 text-sm">We're here to help you every step of the way.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <a 
                                href="mailto:support@thepetnest.com" 
                                className="px-6 py-2.5 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Email Us
                            </a>
                            <a 
                                href="/contact" 
                                className="px-6 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30 flex items-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Live Chat
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Frequently;