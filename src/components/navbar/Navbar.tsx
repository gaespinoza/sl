"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

const Navbar = () => {
  return (
    <div className="z-40 sticky inset-x-0 top-0 w-full transition-all border-b border-gray-200 bg-white/75 backdrop-blur-lg bg-white bg-gradient-to-l from-[#002349]">
      <div className="flex h-[47px] items-center justify-between px-4 z-40">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center"
          >
            <Image
              src="/stackline_logo.svg"
              alt="Stackline"
              className=" p-1 bg-[#002349] backdrop-opacity-60"
              width={100}
              height={24}
              priority
            />
            <span className="font-bold text-xl flex "></span>
          </Link>
          <Link href="/">
            <span>Home</span>
          </Link>
          <Link href="/add">
            <span>Add Product</span>
          </Link>
          <Link href="/">
            <span>Retailers</span>
          </Link>
          <Link href="/">
            <span>Brands</span>
          </Link>
          <Link href="/products">
            <span>Products</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <Icon icon="lucide:smile" width="24" height="24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
