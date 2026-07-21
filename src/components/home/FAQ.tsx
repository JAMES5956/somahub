"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "Do I need an account to access resources?",
      answer:
        "Yes. You must create a free SomaHub account before browsing or purchasing learning resources.",
    },
    {
      question: "Which grades are supported?",
      answer:
        "SomaHub supports all CBC grades from Grade 1 to Grade 12, including Senior School pathways.",
    },
    {
      question: "How do I pay?",
      answer:
        "You can securely pay using M-Pesa. More payment methods will be added in the future.",
    },
    {
      question: "When do I receive my files?",
      answer:
        "Immediately after a successful payment. Your purchases will also remain available in your account.",
    },
    {
      question: "Can teachers upload resources?",
      answer:
        "Only administrators can upload and manage resources to ensure quality and consistency.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            FAQ
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Everything you need to know about SomaHub.
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>

                <span className="text-2xl text-blue-600">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="border-t border-gray-200 px-6 pb-6 pt-4 text-gray-600 leading-7">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}