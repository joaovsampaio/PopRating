"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Dialog from "./ui/Dialog";

const Nav = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="header-nav">
      <ul className="flex-col lg:flex-row">
        <li>
          {session ? (
            <Link
              href="/protected/form"
              className={pathname === "/form" ? "active" : ""}
            >
              Postar
            </Link>
          ) : (
            <Dialog
              title="Conta Necessária!"
              description="É necessário uma conta para fazer uma postagem."
              action={() => signIn("google")}
              actionText="Fazer Login"
              actionButtonStyle="bg-primary-500 text-neutral-100 hover:bg-primary-700"
            >
              <a href="#">Postar</a>
            </Dialog>
          )}
        </li>
        <li>
          {session ? (
            <Link
              href="/protected/profile"
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
