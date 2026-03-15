import { useState } from "react";
import { Link } from "react-router-dom";
import { RiSparkling2Line } from "react-icons/ri";
import { HiCheckCircle } from "react-icons/hi2";

const plans = [
  {
    key: "free",
    name: "Free",
    namePrefix: null,
    tagline: "Get started with basic features",
    price: "$0",
    period: "/month",
    badge: null,
    cta: "Get Started",
    ctaLink: "/sign-up",
    ctaVariant: "secondary",
    featured: false,
    bonus: null,
    features: [
      "3 Quizzes per day",
      "Basic flashcard decks",
      "Progress tracking",
      "Topic exploration",
    ],
  },
  {
    key: "monthly",
    name: "Monthly",
    namePrefix: "AxisVet Pro",
    tagline: "Full access, billed monthly",
    price: "$29.99",
    period: "/month",
    badge: null,
    cta: "Start Monthly Plan",
    ctaLink: "/sign-up?plan=monthly",
    ctaVariant: "navy",
    featured: false,
    bonus: null,
    features: [
      "Structured CPD Courses",
      "Unlimited Quizzes",
      "All flashcard features",
      "Interactive Case Studies",
      "CPD Certificates",
      "Advanced analytics",
      "Downloadable content",
      "Priority support",
    ],
  },
  {
    key: "annual",
    name: "Annual",
    namePrefix: "AxisVet Pro",
    tagline: "Best value, billed yearly",
    price: "$249.99",
    period: "/year",
    badge: "Save 30%",
    cta: "Start Annual Plan",
    ctaLink: "/sign-up?plan=annual",
    ctaVariant: "green",
    featured: true,
    bonus: "2 Months Free",
    features: [
      "Structured CPD Courses",
      "Unlimited Quizzes",
      "All flashcard features",
      "Interactive Case Studies",
      "CPD Certificates",
      "Advanced analytics",
      "Downloadable content",
      "Priority support",
    ],
  },
];

export default function Pricing() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
        .font-lora { font-family: 'Lora', serif; }
        .font-source { font-family: 'Source Sans 3', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s ease both;
        }
        .animate-delay-100 { animation-delay: 0.1s; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
        .animate-delay-500 { animation-delay: 0.5s; }

        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-gentle-bounce {
          animation: gentle-bounce 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="font-source min-h-screen bg-[#f8f7f4] px-6 pt-8 pb-24 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute -top-[120px] -right-[120px] w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(46,142,97,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[80px] -left-[80px] w-[360px] h-[360px] bg-[radial-gradient(circle,rgba(5,38,125,0.05)_0%,transparent_70%)] pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-4 animate-fade-up">
          <h1 className="font-lora text-[clamp(2.2rem,5vw,3.25rem)] font-bold text-[#010143] leading-[1.15] mb-5 tracking-tight">
            Invest in your{" "}
            <span className="text-[#2e8e61] italic">expertise</span>
          </h1>
          <p className="text-[1.05rem] text-gray-500 max-w-[460px] mx-auto leading-relaxed">
            Choose the plan that fits your practice. Upgrade, downgrade, or
            cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto items-start">
          {plans.map((plan, idx) => (
            <div
              key={plan.key}
              className={`
                bg-white rounded-[20px] p-8 border-[1.5px] relative flex flex-col
                transition-all duration-300 ease-out overflow-hidden
                hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)]
                animate-fade-up
                ${idx === 0 ? "animate-delay-100" : ""}
                ${idx === 1 ? "animate-delay-200" : ""}
                ${idx === 2 ? "animate-delay-300" : ""}
                ${
                  plan.featured
                    ? "border-[#2e8e61] shadow-[0_8px_40px_-8px_rgba(46,142,97,0.18)]"
                    : "border-gray-200"
                }
              `}
            >
              {/* Most Popular ribbon */}
              {plan.featured && (
                <div className="font-source absolute -top-px left-1/2 -translate-x-1/2 bg-[#2e8e61] text-white text-[0.7rem] font-semibold tracking-wider uppercase px-5 py-1.5 rounded-b-xl whitespace-nowrap z-10">
                  Most Popular
                </div>
              )}

              {/* Corner bonus ribbon — "2 Months Free" */}
              {plan.bonus && (
                <div className="absolute -right-[3.25rem] top-[1.85rem] rotate-45 z-10">
                  <div className="bg-[rgb(5,38,125)] text-white text-[0.6rem] font-bold tracking-wider uppercase text-center py-1.5 px-12 shadow-md animate-gentle-bounce">
                    {plan.bonus}
                  </div>
                </div>
              )}

              {/* Badge row — fixed height for alignment */}
              <div className="h-[1.6rem] flex items-center mb-2">
                {plan.badge && (
                  <span className="font-source inline-block bg-green-100 text-green-800 text-[0.68rem] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full border border-green-200 whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}
              </div>

              {/* Plan name */}
              <p className="font-lora text-[1.45rem] font-semibold text-[#010143] mb-1 tracking-[0.01em]">
                {plan.namePrefix && (
                  <span className="font-normal text-[#46484d]">
                    {plan.namePrefix}{" "}
                  </span>
                )}
                {plan.name}
              </p>

              <p className="text-[0.88rem] text-gray-400 mb-6 leading-snug">
                {plan.tagline}
              </p>

              {/* Price */}
              <div className="flex items-end gap-0.5 mb-7 pb-7 border-b border-gray-100">
                <span className="font-lora text-[2.75rem] font-bold text-[#010143] leading-none tracking-tight">
                  {plan.price}
                </span>
                <span className="text-[0.88rem] text-gray-400 pb-1.5">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-[0.7rem] mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-[0.9rem] text-gray-700 leading-snug"
                  >
                    <HiCheckCircle className="shrink-0 text-[1.1rem] text-[#2e8e61]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to={plan.ctaLink}>
                {plan.ctaVariant === "secondary" && (
                  <button className="font-source w-full h-12 rounded-full bg-gray-100 text-[#010143] text-[0.9rem] font-semibold tracking-[0.02em] border-none cursor-pointer transition-colors duration-200 hover:bg-gray-200">
                    {plan.cta}
                  </button>
                )}
                {plan.ctaVariant === "navy" && (
                  <button className="font-source w-full h-12 rounded-full bg-[rgb(5,38,125)] text-white text-[0.9rem] font-semibold tracking-[0.02em] border-none cursor-pointer transition-all duration-200 hover:opacity-[0.92] hover:-translate-y-px">
                    {plan.cta}
                  </button>
                )}
                {plan.ctaVariant === "green" && (
                  <button className="font-source w-full h-12 rounded-full bg-[#2e8e61] text-white text-[0.9rem] font-semibold tracking-[0.02em] border-none cursor-pointer transition-all duration-200 hover:opacity-[0.92] hover:-translate-y-px flex items-center justify-center gap-1.5">
                    <RiSparkling2Line />
                    {plan.cta}
                  </button>
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-[0.85rem] text-gray-400 animate-fade-up animate-delay-500">
          <p>
            All plans include a 7-day free trial. No credit card required for
            Free plan.{" "}
            <a
              href="/terms"
              className="text-[#2e8e61] underline underline-offset-2"
            >
              Terms apply.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}