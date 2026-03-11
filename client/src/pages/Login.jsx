import { useState } from "react";
import { Input, Button, Link } from "@heroui/react";

export const EyeSlashFilledIcon = (props) => (
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

export const EyeFilledIcon = (props) => (
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

// Paw print SVG — main pad + 4 toe beans
const PawPrint = ({
  size = 40,
  color = "#c8b89a",
  opacity = 0.18,
  rotate = 0,
  style = {},
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    style={{
      position: "absolute",
      opacity,
      transform: `rotate(${rotate}deg)`,
      pointerEvents: "none",
      ...style,
    }}
  >
    {/* Toe beans */}
    <ellipse cx="28" cy="22" rx="10" ry="13" fill={color} />
    <ellipse cx="50" cy="14" rx="10" ry="13" fill={color} />
    <ellipse cx="72" cy="22" rx="10" ry="13" fill={color} />
    <ellipse cx="10" cy="40" rx="9" ry="12" fill={color} />
    {/* Main pad */}
    <path
      d="M50 38 C28 38 18 55 22 70 C26 84 38 90 50 90 C62 90 74 84 78 70 C82 55 72 38 50 38Z"
      fill={color}
    />
  </svg>
);

export default function Login() {
  const [formData, setFormData] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }
      // TODO: store token, redirect to dashboard
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`

       .login-root {
         min-height: 100vh;
         background-color: #faf7f2;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         position: relative;
         overflow: hidden;
         padding: 2rem 1rem;
       }

       .blob-tl {
         position: absolute;
         top: -80px;
         left: -80px;
         width: 340px;
         height: 340px;
         background: radial-gradient(circle at 40% 40%, #f9c784, #f4845f);
         border-radius: 62% 38% 70% 30% / 45% 55% 45% 55%;
         opacity: 0.55;
         animation: morphBlob1 9s ease-in-out infinite;
       }

       .blob-br {
         position: absolute;
         bottom: -60px;
         right: -60px;
         width: 260px;
         height: 260px;
         background: radial-gradient(circle at 60% 60%, #a8d8b9, #5fb4a2);
         border-radius: 38% 62% 30% 70% / 55% 45% 55% 45%;
         opacity: 0.45;
         animation: morphBlob2 11s ease-in-out infinite;
       }

       .blob-mid {
         position: absolute;
         top: 55%;
         left: 8%;
         width: 130px;
         height: 130px;
         background: radial-gradient(circle, #fde68a, #f9a875);
         border-radius: 50% 60% 40% 70% / 60% 40% 60% 40%;
         opacity: 0.5;
         animation: morphBlob3 13s ease-in-out infinite;
       }

       @keyframes morphBlob1 {
         0%, 100% { border-radius: 62% 38% 70% 30% / 45% 55% 45% 55%; }
         50%       { border-radius: 38% 62% 45% 55% / 60% 40% 60% 40%; }
       }
       @keyframes morphBlob2 {
         0%, 100% { border-radius: 38% 62% 30% 70% / 55% 45% 55% 45%; }
         50%       { border-radius: 62% 38% 55% 45% / 40% 60% 40% 60%; }
       }
       @keyframes morphBlob3 {
         0%, 100% { border-radius: 50% 60% 40% 70% / 60% 40% 60% 40%; }
         50%       { border-radius: 70% 40% 60% 50% / 40% 60% 40% 60%; }
       }

       .login-card {
         position: relative;
         z-index: 10;
         background: #ffffff;
         border-radius: 28px;
         box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 20px 60px -10px rgba(0,0,0,0.10);
         padding: 2.75rem 2.5rem;
         width: 100%;
         max-width: 440px;
         animation: fadeUp 0.5s ease both;
       }

       @keyframes fadeUp {
         from { opacity: 0; transform: translateY(18px); }
         to   { opacity: 1; transform: translateY(0); }
       }

       .login-logo {
         display: flex;
         justify-content: center;
         margin-bottom: 1.75rem;
         animation: fadeUp 0.5s ease 0.05s both;
       }

       .login-logo img {
         height: 38px;
         width: auto;
       }

       .login-heading {

         font-size: 2rem;
         font-weight: 700;
         color: #1a1a2e;
         text-align: center;
         margin: 0 0 0.5rem 0;
         animation: fadeUp 0.5s ease 0.1s both;
         letter-spacing: -0.02em;
         line-height: 1.2;
       }

       .login-subheading {
         text-align: center;
         color: #6b7280;
         font-size: 0.9rem;
         margin: 0 0 2rem 0;
         animation: fadeUp 0.5s ease 0.15s both;
       }

       .login-fields {
         display: flex;
         flex-direction: column;
         gap: 1rem;
         animation: fadeUp 0.5s ease 0.2s both;
       }

       .field-label {
         font-size: 0.8rem;
         font-weight: 500;
         color: #374151;
         margin-bottom: 0.35rem;
         display: block;
         letter-spacing: 0.01em;
       }

       .error-banner {
         background: #fef2f2;
         border: 1px solid #fecaca;
         border-radius: 14px;
         padding: 0.75rem 1rem;
         font-size: 0.85rem;
         color: #dc2626;
         animation: fadeUp 0.3s ease both;
       }

       .forgot-link {
         display: block;
         text-align: right;
         font-size: 0.8rem;
         color: #6b7280;
         text-decoration: none;
         margin-top: 0.25rem;
         transition: color 0.2s;
       }
       .forgot-link:hover { color: #1a1a2e; }

       .signin-btn {
         width: 100%;
         height: 52px !important;
         border-radius: 14px !important;
         font-size: 0.95rem !important;
         font-weight: 600 !important;
         font-family: 'DM Sans', sans-serif !important;
         background: linear-gradient(135deg, #2d6a4f, #40916c) !important;
         color: #fff !important;
         border: none !important;
         margin-top: 0.5rem;
         transition: opacity 0.2s, transform 0.15s !important;
         letter-spacing: 0.01em;
       }
       .signin-btn:hover:not(:disabled) {
         opacity: 0.92;
         transform: translateY(-1px);
       }
       .signin-btn:active:not(:disabled) {
         transform: translateY(0);
       }

       .login-footer {
         display: flex;
         justify-content: space-between;
         align-items: center;
         margin-top: 1.5rem;
         padding-top: 1.25rem;
         border-top: 1px solid #f3f4f6;
         animation: fadeUp 0.5s ease 0.3s both;
       }

       .footer-text {
         font-size: 0.82rem;
         color: #9ca3af;
       }

       .trust-row {
         position: relative;
         z-index: 10;
         display: flex;
         gap: 1.25rem;
         align-items: center;
         margin-top: 2.5rem;
         flex-wrap: wrap;
         justify-content: center;
         animation: fadeUp 0.5s ease 0.4s both;
       }

       .trust-badge {
         display: flex;
         align-items: center;
         gap: 0.5rem;
         background: #fff;
         border: 1px solid #e5e7eb;
         border-radius: 50px;
         padding: 0.4rem 0.9rem;
         font-size: 0.78rem;
         font-weight: 500;
         color: #374151;
         box-shadow: 0 1px 4px rgba(0,0,0,0.06);
       }

       .trust-dot {
         width: 8px;
         height: 8px;
         border-radius: 50%;
         flex-shrink: 0;
       }

       @keyframes pawFloat {
         0%, 100% { transform: translateY(0px) rotate(var(--r)); }
         50%       { transform: translateY(-8px) rotate(var(--r)); }
       }

       .paw {
         position: absolute;
         pointer-events: none;
         z-index: 1;
         animation: pawFloat var(--dur, 6s) ease-in-out infinite;
         animation-delay: var(--delay, 0s);
       }
     `}</style>

      <div className="login-root">
        {/* Decorative blobs */}
        <div className="blob-tl" />
        <div className="blob-br" />
        <div className="blob-mid" />

        {/* Scattered paw prints */}
        <div
          className="paw"
          style={{
            top: "6%",
            left: "5%",
            "--r": "−15deg",
            "--dur": "7s",
            "--delay": "0s",
          }}
        >
          <PawPrint size={44} color="#c8956c" opacity={0.18} rotate={-15} />
        </div>
        <div
          className="paw"
          style={{
            top: "12%",
            right: "7%",
            "--r": "20deg",
            "--dur": "8s",
            "--delay": "1s",
          }}
        >
          <PawPrint size={34} color="#5fb4a2" opacity={0.2} rotate={20} />
        </div>
        <div
          className="paw"
          style={{
            top: "28%",
            left: "2%",
            "--r": "−30deg",
            "--dur": "9s",
            "--delay": "0.5s",
          }}
        >
          <PawPrint size={28} color="#c8956c" opacity={0.14} rotate={-30} />
        </div>
        <div
          className="paw"
          style={{
            top: "42%",
            right: "3%",
            "--r": "10deg",
            "--dur": "7s",
            "--delay": "2s",
          }}
        >
          <PawPrint size={50} color="#40916c" opacity={0.13} rotate={10} />
        </div>
        <div
          className="paw"
          style={{
            top: "65%",
            left: "18%",
            "--r": "−20deg",
            "--dur": "10s",
            "--delay": "1.5s",
          }}
        >
          <PawPrint size={32} color="#f4845f" opacity={0.16} rotate={-20} />
        </div>
        <div
          className="paw"
          style={{
            top: "72%",
            right: "14%",
            "--r": "35deg",
            "--dur": "8s",
            "--delay": "0.8s",
          }}
        >
          <PawPrint size={42} color="#5fb4a2" opacity={0.15} rotate={35} />
        </div>
        <div
          className="paw"
          style={{
            top: "82%",
            left: "4%",
            "--r": "−10deg",
            "--dur": "9s",
            "--delay": "2.5s",
          }}
        >
          <PawPrint size={26} color="#40916c" opacity={0.12} rotate={-10} />
        </div>
        <div
          className="paw"
          style={{
            top: "88%",
            right: "5%",
            "--r": "−25deg",
            "--dur": "6s",
            "--delay": "1.2s",
          }}
        >
          <PawPrint size={36} color="#c8956c" opacity={0.16} rotate={-25} />
        </div>
        <div
          className="paw"
          style={{
            top: "20%",
            left: "22%",
            "--r": "45deg",
            "--dur": "11s",
            "--delay": "3s",
          }}
        >
          <PawPrint size={22} color="#f9c784" opacity={0.2} rotate={45} />
        </div>
        <div
          className="paw"
          style={{
            top: "55%",
            right: "22%",
            "--r": "−40deg",
            "--dur": "7s",
            "--delay": "0.3s",
          }}
        >
          <PawPrint size={30} color="#f4845f" opacity={0.14} rotate={-40} />
        </div>

        {/* Card */}
        <div className="login-card">
          <div className="login-logo">
            <img src="/axisvet.svg" alt="AxisVet" />
          </div>

          <h1 className="login-heading">Welcome back</h1>
          <p className="login-subheading">
            Sign in to continue your CPD journey
          </p>

          <form onSubmit={handleSubmit}>
            <div className="login-fields">
              <div>
                <label className="field-label" htmlFor="email">
                  Username or Email 
                </label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Your username"
                  variant="bordered"
                  onChange={handleChange}
                  classNames={{
                    inputWrapper:
                      "rounded-2xl border-slate-200 bg-white hover:border-slate-300 h-12",
                    input: "text-sm",
                  }}
                />
              </div>

              <div>
                <label className="field-label" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="Your password"
                  variant="bordered"
                  onChange={handleChange}
                  endContent={
                    <button
                      type="button"
                      aria-label="toggle password visibility"
                      onClick={toggleVisibility}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400" />
                      )}
                    </button>
                  }
                  classNames={{
                    inputWrapper:
                      "rounded-2xl border-slate-200 bg-white hover:border-slate-300 h-12",
                    input: "text-sm",
                  }}
                />
                <a href="/forgot-password" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              {error && <div className="error-banner">{error}</div>}

              <Button
                type="submit"
                className="signin-btn"
                isLoading={loading}
                isDisabled={loading}
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="login-footer">
            <span className="footer-text">Don't have an account?</span>
            <Link
              href="/sign-up"
              className="text-sm font-semibold text-slate-800"
            >
              Create one →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
