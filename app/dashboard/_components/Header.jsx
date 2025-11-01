
"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function Header({onHowItWorksClick}) {
  
  //usePathname is used to get url
  const path = usePathname();

  //isSingedIn from clerk
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <div
      className={`px-3 py-2 text-white fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-10/12 rounded-full transition-all duration-300 
        ${isScrolled 
          ? "bg-neutral-900 bg-opacity-95 shadow-[0px_-2px_0px_0px_var(--neutral-800),0px_2px_0px_0px_var(--neutral-800)]" 
          : "bg-neutral-950 boder border-gray-400 "
        }`}
      

    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href={'/'}>
        <Image
        src="/logo.svg"
        layout="intrinsic"
        width={70}
        height={50}
        alt="Logo"
      />

        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8">
          <li
          
            className={`${
              path === "/dashboard" && `bg-slate-700 border border-transparent`
            } rounded-full px-3 py-2 flex items-center justify-center hover:bg-gray-600 border border-transparent cursor-pointer`}
          >
            <Link href={'/dashboard'}>
              Dashboard
            </Link>
          </li>
          <li
            className={`${
              path === "/dashboard/quations" && `text-primary font-bold`
            } rounded-full px-3 py-2 flex items-center justify-center hover:bg-gray-600 border border-transparent`}
          >
            Question
          </li>
          <li 
            className={`${
              path === "/dashboard/price" && `text-primary font-bold`
            } rounded-full px-4 py-1 flex items-center justify-center hover:bg-gray-600 border border-transparent cursor-pointer`}
          >
            <Link href={'/price'}>
               Price
            </Link>
          </li>
          <li 
          onClick={ onHowItWorksClick}
            className={`${
              path === "/dashboard/how" && `text-primary font-bold`
            } rounded-full px-3 py-2 flex items-center justify-center hover:bg-gray-600 border border-transparent cursor-pointer`}
          >
            How it work?
          </li>
        </ul>

        {/* User Buttons */}
        <div className="flex gap-2">
          {isSignedIn ? (
            <div>
              <UserButton />
            </div>
          ) : (
            <div className="flex gap-3">
              <SignInButton
              className="  relative z-10 bg-transparent hover:bg-gray-600 border border-transparent text-white text-sm md:text-sm transition font-medium duration-200 rounded-full px-4 py-2 flex items-center justify-center dark:text-white dark:hover:bg-neutral-800 dark:hover:shadow-xl "
              >
                Login
              </SignInButton>

              <SignUpButton
              className="relative z-10 bg-transparent hover:bg-slate-800 border border-gray-600 text-white text-sm md:text-sm transition font-medium duration-200 rounded-full px-4 py-2 flex items-center justify-center dark:text-white dark:hover:bg-neutral-800 dark:hover:shadow-xl"
              >
                SingUp
              </SignUpButton>

              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
