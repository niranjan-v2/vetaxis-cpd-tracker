import React from "react";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Avatar,
  Chip,
} from "@heroui/react";
import { Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { RiSparkling2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { GoQuestion } from "react-icons/go";
import { LuPencilLine } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { persistor } from "../redux/store";
import CpdBadge from "./CpdBadge";

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

  const isPro = currentUser?.isPro ?? false;
  const initials = getInitials(currentUser?.profile?.fullName);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } catch (_) {}
    dispatch(signOut());
    await persistor.purge();
    navigate("/sign-in");
  };

  const handleDropdownAction = (key) => {
    if (key === "signout") handleSignOut();
    else if (key === "settings") navigate("/profile");
    else if (key === "upgrade") navigate("/pricing");
    else if (key === "help") navigate("/help");
    else if (key === "feedback") navigate("/feedback");
  };

  return (
    <Navbar className="border-b border-gray-100 px-6 py-3">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src="/axisvet.svg" alt="AxisVet" className="h-7 sm:h-8" />
      </Link>

      {currentUser?.cpd && (
        <div className="border border-transparent hover:border-gray-200 hover:bg-gray-50 rounded-full px-3 py-1.5 transition-colors">
          <CpdBadge points={currentUser.cpd.earnedPoints} />
        </div>
      )}

      {/* Nav links — public only */}
      {!currentUser && (
        <div className="hidden md:flex flex-row gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-[#010143] transition-colors">
            Features
          </Link>
          <Link to="/" className="hover:text-[#010143] transition-colors">
            Topics
          </Link>
          <Link to="/" className="hover:text-[#010143] transition-colors">
            Pricing
          </Link>
        </div>
      )}

      {/* Right side */}
      <div className="flex flex-row gap-3 items-center">
        {currentUser ? (
          <>
            {/* Upgrade button */}
            {!isPro && (
              <Link to="/pricing">
                <Button
                  size="sm"
                  radius="full"
                  className="bg-[rgb(5,38,125)] text-white font-semibold gap-1.5"
                  startContent={<RiSparkling2Line className="text-sm" />}
                >
                  Upgrade to AxisVet™ Pro
                </Button>
              </Link>
            )}

            {/* Avatar + Dropdown */}
            <Dropdown
              placement="bottom-end"
              radius="lg"
              shadow="lg"
              classNames={{
                content: "p-0 w-72 overflow-hidden border border-gray-100",
              }}
            >
              <DropdownTrigger>
                <Avatar
                  as="button"
                  name={initials}
                  size="sm"
                  classNames={{
                    base: "w-9 h-9 bg-[#2e8e61] hover:opacity-80 transition-opacity cursor-pointer",
                    name: "text-sm font-bold text-white",
                  }}
                />
              </DropdownTrigger>

              <DropdownMenu
                aria-label="User menu"
                onAction={handleDropdownAction}
                itemClasses={{
                  base: [
                    "rounded-none",
                    "px-5 py-3.5",
                    "gap-3",
                    "data-[hover=true]:bg-gray-50",
                  ],
                  title: "text-sm font-medium",
                  startContent: "text-gray-500 text-xl flex-shrink-0",
                }}
              >
                {/* User info */}
                <DropdownSection showDivider classNames={{ divider: "my-0" }}>
                  <DropdownItem
                    key="user-info"
                    isReadOnly
                    textValue="user info"
                    className="cursor-default opacity-100 data-[hover=true]:bg-white"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Avatar
                        name={initials}
                        classNames={{
                          base: "w-16 h-16 bg-[#2e8e61]",
                          name: "text-xl font-bold text-white",
                        }}
                      />
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-base font-bold text-[#010143]">
                            {currentUser.profile?.title +
                              " " +
                              currentUser.profile?.fullName}
                          </p>
                          {isPro && (
                            <Chip
                              size="sm"
                              variant="flat"
                              classNames={{
                                base: "bg-amber-50 border border-amber-200",
                                content:
                                  "text-xs font-semibold text-amber-600 px-1",
                              }}
                            >
                              Pro
                            </Chip>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {"@" +
                            currentUser.username +
                            " | " +
                            currentUser.email}
                        </p>
                      </div>
                    </div>
                  </DropdownItem>
                </DropdownSection>

                {/* Upgrade CTA — only if not Pro */}
                {!isPro && (
                  <DropdownSection showDivider classNames={{ divider: "my-2" }}>
                    <DropdownItem
                      key="upgrade"
                      textValue="upgrade"
                      startContent={
                        <RiSparkling2Line className="text-[rgb(5,38,125)] text-xl flex-shrink-0" />
                      }
                      classNames={{
                        base: "bg-slate-50 data-[hover=true]:bg-slate-100 px-5",
                        title: "text-sm font-bold text-[rgb(5,38,125)]",
                      }}
                    >
                      Upgrade to AxisVet™ Pro
                    </DropdownItem>
                  </DropdownSection>
                )}

                {/* Main actions */}
                <DropdownSection showDivider classNames={{ divider: "my-0" }}>
                  <DropdownItem
                    key="settings"
                    startContent={<IoSettingsOutline />}
                  >
                    Account settings
                  </DropdownItem>
                  <DropdownItem key="help" startContent={<GoQuestion />}>
                    Help
                  </DropdownItem>
                  {/* CHANGED: removed classNames override, color="danger" handles red styling */}
                  <DropdownItem
                    key="signout"
                    startContent={
                      <PiSignOutBold className="text-red-500 text-xl flex-shrink-0" />
                    }
                    classNames={{
                      title: "text-sm font-medium text-red-500",
                    }}
                  >
                    Sign out
                  </DropdownItem>
                </DropdownSection>

                {/* Feedback */}
                <DropdownSection showDivider classNames={{ divider: "my-0" }}>
                  <DropdownItem key="feedback" startContent={<LuPencilLine />}>
                    Share feedback
                  </DropdownItem>
                </DropdownSection>

                {/* Footer */}
                <DropdownSection>
                  <DropdownItem
                    key="footer"
                    isReadOnly
                    textValue="footer"
                    className="cursor-default opacity-100 py-2 data-[hover=true]:bg-white"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex gap-5 text-xs text-gray-400">
                        <Link
                          to="/terms"
                          className="hover:text-gray-600 hover:underline transition-colors"
                        >
                          Terms and Conditions
                        </Link>
                        <Link
                          to="/privacy"
                          className="hover:text-gray-600 hover:underline transition-colors"
                        >
                          Privacy Policy
                        </Link>
                      </div>
                      <p className="text-xs text-gray-300">
                        © 2025 AxisVet Pty Ltd
                      </p>
                    </div>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <Button
                variant="flat"
                radius="full"
                className="bg-gray-100 text-[#010143] font-semibold hover:bg-gray-200 transition-colors"
              >
                Log in
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button
                radius="full"
                className="bg-[#2e8e61] text-white font-semibold gap-1.5 hover:bg-[#267a53] transition-colors"
                startContent={<RiSparkling2Line />}
              >
                Get started
              </Button>
            </Link>
          </>
        )}
      </div>
    </Navbar>
  );
}
