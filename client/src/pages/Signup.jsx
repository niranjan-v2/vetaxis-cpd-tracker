import React, { useState } from "react";
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

export const EyeSlashFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function Signup() {
  const [formData, setFormData] = useState({ title: "Dr" });
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.id]: e.target.value };
    setFormData(updated);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    } catch(error) {

    }
    
  };

  const titles = [
    { key: "Dr", label: "Dr" },
    { key: "Mr", label: "Mr" },
    { key: "Prof", label: "Prof" },
    { key: "Mrs", label: "Mrs" },
    { key: "Miss", label: "Miss" },
    { key: "Mstr", label: "Mstr" },
    { key: "Mx", label: "Mx" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 w-full bg-gradient-to-r from-rose-200 via-sky-200 to-violet-200" />
      <div className="mx-auto grid min-h-[calc(100vh-4px)] grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Form */}
        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <img src="/axisvet.svg" alt="AxisVet" className="h-9 w-auto" />
              </div>
              <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Discover learning, track CPD and keep your compliance tidy.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <Card className="rounded-3xl border border-slate-200 shadow-sm">
                <CardBody className="gap-5 p-6">
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
                    id="email"
                    onChange={handleChange}
                  />

                  <div className="flex flex-row gap-2">
                    <Select
                      className="w-28"
                      defaultSelectedKeys={["Dr"]}
                      label="Title"
                      onSelectionChange={(keys) =>
                        setFormData({ ...formData, title: Array.from(keys)[0] })
                      }
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
                      id="fullName"
                      onChange={handleChange}
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
                    id="username"
                    onChange={handleChange}
                  />

                  <Input
                    isRequired
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-solid outline-transparent"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    label="Password"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    classNames={{
                      inputWrapper:
                        "rounded-2xl border-slate-200 bg-white hover:border-slate-300",
                    }}
                    id="password"
                    onChange={handleChange}
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

                  <div className="space-y-3">
                    <Checkbox className="items-start" isRequired>
                      <span className="text-sm text-slate-700">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-slate-900 underline"
                        >
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

                  <Button
                    type="submit"
                    color="primary"
                    className="h-12 rounded-2xl font-semibold"
                  >
                    Continue
                  </Button>

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
            </form>

            <p className="mt-6 text-xs text-slate-500">
              AxisVet helps veterinary professionals keep learning records in
              one place.
            </p>
          </div>
        </div>

        {/* RIGHT: Veterinary-themed image panel */}
        <div className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-y-0 left-0 w-px bg-slate-200" />
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1700665537650-1bf37979aae0?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Modern veterinary clinic examination room"
              className="h-full w-full object-cover opacity-60"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
          <div className="relative flex h-full flex-col justify-center p-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-white mb-4">
                Advance Your Career
              </h2>
              <p className="text-lg text-white/90 leading-relaxed mb-10">
                Join thousands of veterinary professionals using AI-powered
                learning to maintain and grow their expertise.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">5,000+</div>
                  <div className="text-sm text-white/70">Active Learners</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">50,000+</div>
                  <div className="text-sm text-white/70">CPD Hours Earned</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-white/70">Satisfaction</div>
                </div>
              </div>
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
            <div className="absolute bottom-8 left-12 right-12">
              <div className="text-sm text-white/60">
                Tip: Keep your username simple—easy to remember during busy
                shifts.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
