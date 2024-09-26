"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

const Nav = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="header-nav">
      <ul className="flex-col lg:flex-row">
        <li>
          <Link href="/form" className={pathname === "/form" ? "active" : ""}>
            Postar
          </Link>
        </li>
        <li>
          {session ? (
            <Link
              href="/profile"
              className={pathname === "/profile" ? "active" : ""}
            >
              Perfil
            </Link>
          ) : (
            <a onClick={() => signIn("google")}>Login</a>
          )}
        </li>
        <li>
          <Link href="/posts" className={pathname === "/posts" ? "active" : ""}>
            Críticas
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
