// CreateAccount.jsx
// HeroUI (React JSX) — front-end only
// Assumes HeroUI components are available from: @heroui/react
// Logo path: /axisvet.svg

import React from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Checkbox,
  Link,
  Select,
  SelectItem,
} from "@heroui/react";

export default function Signup() {
  const titles = [
    { key: "Dr", label: "Dr" },
    { key: "Mr", label: "Mr" },
    { key: "Prof", label: "Prof" },
    { key: "Mrs", label: "Mrs" },
    { key: "Miss", label: "Miss" },
    { key: "Master", label: "Master" },
    { key: "Mx", label: "Mx" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle top border to mimic modern SaaS layout */}
      <div className="h-1 w-full bg-gradient-to-r from-rose-200 via-sky-200 to-violet-200" />
      <div className="mx-auto grid min-h-[calc(100vh-4px)] grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Form */}
        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <img src="/axisvet.svg" alt="AxisVet" className="h-9 w-auto" />
              </div>

              <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Track CPD, discover learning, and keep your compliance tidy.
              </p>
            </div>

            <Card className="rounded-3xl border border-slate-200 shadow-sm">
              <CardBody className="gap-5 p-6">
                {/* Inputs */}
                <Input
                  isRequired
                  isClearable
                  label="Email"
                  type="email"
                  variant="bordered"
                  classNames={{
                    inputWrapper:
                      "rounded-2xl border-slate-200 bg-white hover:border-slate-300",
                  }}
                />
                <div className="flex flex-row gap-2">
                  <Select
                    className="w-20"
                    defaultSelectedKeys={["Dr"]}
                    label="Title"
                  >
                    {titles.map((title) => (
                      <SelectItem key={title.key}>{title.label}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    isRequired
                    isClearable
                    label="Full name"
                    type="text"
                    variant="bordered"
                    classNames={{
                      inputWrapper:
                        "rounded-2xl border-slate-200 bg-white hover:border-slate-300",
                    }}
                  />
                </div>

                <Input
                  isRequired
                  isClearable
                  label="Username"
                  type="text"
                  variant="bordered"
                  classNames={{
                    inputWrapper:
                      "rounded-2xl border-slate-200 bg-white hover:border-slate-300",
                  }}
                />

                <Input
                  isRequired
                  label="Password"
                  type="password"
                  variant="bordered"
                  classNames={{
                    inputWrapper:
                      "rounded-2xl border-slate-200 bg-white hover:border-slate-300",
                  }}
                />

                <Input
                  isRequired
                  label="Retype Password"
                  type="password"
                  variant="bordered"
                  classNames={{
                    inputWrapper:
                      "rounded-2xl border-slate-200 bg-white hover:border-slate-300",
                  }}
                />

                {/* Checkboxes */}
                <div className="space-y-3">
                  <Checkbox className="items-start" isRequired>
                    <span className="text-sm text-slate-700">
                      I agree to the{" "}
                      <Link href="/terms" className="text-slate-900 underline">
                        Terms
                      </Link>
                      ,{" "}
                      <Link
                        href="/privacy"
                        className="text-slate-900 underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/cookies"
                        className="text-slate-900 underline"
                      >
                        Cookies
                      </Link>
                      .
                    </span>
                  </Checkbox>

                  <Checkbox className="items-start">
                    <span className="text-sm text-slate-700">
                      Send me updates and CPD recommendations (optional).
                    </span>
                  </Checkbox>
                </div>

                {/* CTA */}
                <Button
                  color="primary"
                  className="h-12 rounded-2xl font-semibold"
                >
                  Continue
                </Button>

                {/* Secondary */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm text-slate-600">
                    Already have an account?
                  </span>
                  <Link href="/login" className="text-sm font-semibold">
                    Log in
                  </Link>
                </div>
              </CardBody>
            </Card>

            {/* Footer */}
            <p className="mt-6 text-xs text-slate-500">
              AxisVet helps veterinary professionals keep learning records in
              one place.
            </p>
          </div>
        </div>

        {/* RIGHT: Veterinary-themed image panel */}
        <div className="relative hidden overflow-hidden lg:block">
          {/* Soft border between panels */}
          <div className="absolute inset-y-0 left-0 w-px bg-slate-200" />

          {/* Veterinary image with reduced opacity */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1700665537650-1bf37979aae0?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Modern veterinary clinic examination room"
              className="h-full w-full object-cover opacity-60" /* Reduced opacity from 100% to 60% */
            />
          </div>

          {/* Darker gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />

          {/* Overlay content */}
          <div className="relative flex h-full flex-col justify-center p-12">
            {/* Main heading */}
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-white mb-4">
                Advance Your Career
              </h2>
              <p className="text-lg text-white/90 leading-relaxed mb-10">
                Join thousands of veterinary professionals using AI-powered learning 
                to maintain and grow their expertise.
              </p>
              
              {/* Stats cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {/* Active Learners */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">5,000+</div>
                  <div className="text-sm text-white/70">Active Learners</div>
                </div>
                
                {/* CPD Hours */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">50,000+</div>
                  <div className="text-sm text-white/70">CPD Hours Earned</div>
                </div>
                
                {/* Satisfaction */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-white/70">Satisfaction</div>
                </div>
              </div>
              
              {/* Feature tags */}
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/30">
                  CPD tracking
                </span>
                <span className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/30">
                  Quizzes & flashcards
                </span>
                <span className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/30">
                  Certificates
                </span>
              </div>
            </div>
            
            {/* Bottom tip */}
            <div className="absolute bottom-8 left-12 right-12">
              <div className="text-sm text-white/60">
                Tip: Keep your username simple—easy to remember during busy shifts.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
Mr. – For men, regardless of marital status.
Mrs. – For married women, though this is becoming less commonly used as "Ms." is more neutral.
Miss – For unmarried women, but it is less frequently used now.
Ms. – For women, regardless of marital status (neutral and widely used).
Dr. – For individuals who have earned a doctoral degree (Ph.D., M.D., etc.).
Prof. – For professors or academic professionals.
*/