"use client";

import Image from "next/image";
import Link from "next/link";

import MaxWidthWrapper from "./MaxWidthWrapper";
import DropDown from "./ui/Dropdown";
import Nav from "./Nav";
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const { scrollY } = useScroll();

  const [bgColor, setBgColor] = useState("");

  function update() {
    if (scrollY?.get() > 5) {
      setBgColor("header-scroll");
    } else {
      setBgColor("");
    }
  }

  useEffect(() => {
    return scrollY.on("change", () => update());
  }, []);

  return (
    <header className={cn("sticky py-2 inset-x-0 top-0 z-30", bgColor)}>
      <MaxWidthWrapper>
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image alt="PopRating" src="/logo.svg" width={200} height={60} />
          </Link>

          <div className="lg:hidden">
            <DropDown />
          </div>
          <div className="max-lg:hidden">
            <Nav />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
