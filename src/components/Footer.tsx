import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

function Footer() {
  return (
    <footer className="text-2xl max-sm:text-lg mt-auto">
      <MaxWidthWrapper>
        <span>Criado por:</span>
        <Link
          className="text-accent hover:underline hover:text-accent/50 ml-1"
          href="https://github.com/joaovsampaio"
          target="_blank"
        >
          @joaovsampaio
        </Link>
      </MaxWidthWrapper>
    </footer>
  );
}

export default Footer;
