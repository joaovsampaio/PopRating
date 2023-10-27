"use client";

import Image from "next/image";
import musician from "../../public/musician.jpg";
import actress from "../../public/actress.jpg";
import writer from "../../public/writer.jpg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import SidePosts from "./SidePosts";
const variants = {
  hidden: {
    display: "none",
    x: "100vw",
  },
  visible: {
    display: "flex",
    x: 0,
    transition: { type: "spring", delay: 0.1 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

const Hero = () => {
  const [animStart, setAnimStart] = useState(false);

  useEffect(() => {
    if (!localStorage.heroOrPosts || localStorage.heroOrPosts === "hero") {
      setAnimStart(false);
    } else {
      setAnimStart(true);
    }
  }, []);

  return (
    <>
      <motion.div
        variants={variants}
        initial={!animStart ? "visible" : "hidden"}
        animate={animStart ? "hidden" : "visible"}
        exit="exit"
        className="flex max-sm:items-center max-sm:flex-col max-sm:gap-5"
      >
        <div className="flex flex-col justify-between w-1/2 max-sm:gap-5 lg:pr-3 max-sm:w-full">
          <p className=" text-9xl max-lg:text-2xl max-[2500px]:text-5xl max-sm:text-center uppercase font-extrabold">
            Estamos sempre <span className="text-primary">ouvindo</span>,{" "}
            <span className="text-primary">vendo</span> e{" "}
            <span className="text-primary">lendo</span> tudo da cultura pop para{" "}
            <span className="text-primary">você</span>
          </p>

          <motion.button
            initial={{ x: 0 }}
            animate={{ x: 10 }}
            transition={{
              repeat: Infinity,
              type: "tween",
              repeatType: "mirror",
              duration: 2,
            }}
            className="w-fit max-sm:self-center p-2 max-sm:text-base text-2xl bg-secondary rounded-sm hover:bg-darkPurple duration-500 border-light border-2"
            onClick={() => {
              localStorage.setItem("heroOrPosts", "posts");
              setAnimStart(!animStart);
            }}
          >
            Ver Mais <ChevronRight className="inline" />
          </motion.button>
        </div>

        <div className="w-2/4 max-sm:w-full flex">
          <Image
            className="w-1/3 border-8 max-sm:border-4 border-accent"
            alt="Musician"
            src={musician}
            quality={100}
          />
          <Image
            className="w-1/3 border-y-8 max-sm:border-y-4 border-accent"
            alt="Actress"
            src={actress}
            quality={100}
          />
          <Image
            className="w-1/3 border-8 max-sm:border-4 border-accent"
            alt="Writer"
            src={writer}
            quality={100}
          />
        </div>
      </motion.div>

      <motion.div
        variants={variants}
        initial={animStart ? "visible" : "hidden"}
        animate={animStart ? "visible" : "hidden"}
        exit="exit"
        className="flex flex-col"
      >
        <button
          className="w-fit mb-3 underline"
          onClick={() => {
            localStorage.setItem("heroOrPosts", "hero");
            setAnimStart(!animStart);
          }}
        >
          Voltar
        </button>

        <SidePosts />
      </motion.div>
    </>
  );
};

export default Hero;
