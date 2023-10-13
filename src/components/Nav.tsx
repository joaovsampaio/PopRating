"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="header-nav">
      <ul className="max-md:flex-col">
        <li>
          <Link
            href="/form/post-article"
            className={pathname === "/form/post-article" ? "active" : ""}
          >
            Postar
          </Link>
        </li>
        <li>
          <Link
            href="/form/post-article"
            className={pathname === "/form/post-article" ? "active" : ""}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/posts/reviews"
            className={pathname === "/posts/reviews" ? "active" : ""}
          >
            Críticas
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
