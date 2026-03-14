import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { RiSparkling2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { persistor } from "../redux/store";

function getInitials(fullName) {
  if (!fullName) return "?";
  const parts = fullName.trim().split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : parts[0][0].toUpperCase();
}

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } catch (_) {}
    dispatch(signOut());
    await persistor.purge();
    navigate("/sign-in");
  };

  const initials = getInitials(currentUser?.profile?.fullName);

  return (
    <Navbar className="border-b border-b-mist-300 flex flex-row items-center">
      {/* Logo */}
      <div>
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold">
          <div className="flex flex-row items-center">
            <img src="/axisvet.svg" alt="Axisvet Logo" className="h-7 sm:h-8" />
          </div>
        </Link>
      </div>

      {/* Nav links — hidden when signed in */}
      {!currentUser && (
        <div className="flex flex-row gap-10 text-sm font-semibold text-gray-600">
          <Link to="/">Features</Link>
          <Link to="/">Topics</Link>
          <Link to="/">Pricing</Link>
        </div>
      )}

      {/* Right side */}
      <div className="flex flex-row gap-2 items-center">
        {currentUser ? (
          // Profile avatar + dropdown
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-9 h-9 rounded-full bg-[#2e8261] text-white text-sm font-bold flex items-center justify-center hover:bg-[#297355] transition-colors focus:outline-none"
            >
              {initials}
            </button>

            {dropdownOpen && (
              <>
                {/* Backdrop to close on outside click */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 z-20 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {currentUser.profile?.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          // Auth buttons — hidden when signed in
          <>
            <Link to="/sign-in">
              <Button
                className="bg-gray-100 text-black hover:bg-gray-200 hover:cursor-pointer font-semibold"
                pill
              >
                Log In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button
                className="text-white hover:cursor-pointer bg-[#2e8261] hover:bg-[#297355] gap-1"
                pill
              >
                <RiSparkling2Line />
                Get started
              </Button>
            </Link>
          </>
        )}
      </div>
    </Navbar>
  );
}