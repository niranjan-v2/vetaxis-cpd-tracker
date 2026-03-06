import React from "react";
import { Button } from "@heroui/button";
import { Navbar, NavbarLink, NavbarCollapse } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { RiSparkling2Line } from "react-icons/ri";

export default function Header() {
  return (
    <Navbar className="border-b border-b-mist-300 flex flex-row items-center">
      <div>
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <div className="flex flex-row items-center">
            <img src="/axisvet.svg" alt="Axisvet Logo" className="h-7 sm:h-8" />
          </div>
        </Link>
      </div>
      <div className="flex flex-row gap-10 text-sm font-semibold text-gray-600">
        <Link to="/">Features</Link>
        <Link to="/">Topics</Link>
        <Link to="/">Pricing</Link>
      </div>
      <div className="flex flex-row gap-2">
        <Link to="/sign-in">
          <Button
            className="bg-gray-100 text-black hover:text-black hover:bg-gray-200 hover:cursor-pointer font-semibold"
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
      </div>
    </Navbar>
  );
}
