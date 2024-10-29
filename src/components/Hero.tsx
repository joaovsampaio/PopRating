"use client";

import Image from "next/image";
import musicianHero from "../../public/musician_hero.webp";
import actressHero from "../../public/actress_hero.webp";
import writerHero from "../../public/writer_hero.webp";
import HeroText from "../../public/svg-hero-anim.svg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import SidePosts from "./SidePosts";

const variants = {
  hidden: {
    display: "none",
    x: "-100vw",
  },
  visible: {
    display: "flex",
    x: 0,
    transition: { type: "linear", delay: 0.1 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "linear" },
  },
};

const variants2 = {
  hidden: {
    display: "none",
    x: "100vw",
  },
  visible: {
    display: "flex",
    x: 0,
    transition: { type: "linear", delay: 0.1 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "linear" },
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
        className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-0"
      >
        <div className="flex flex-col items-center justify-between gap-8 lg:gap-0 lg:w-full">
          <p className="text-2xl lg:text-3xl xl:text-5xl xl:leading-tight text-center lg:text-left uppercase font-extrabold tracking-wider">
            Sempre <span className="text-primary-500">ouvindo</span>,{" "}
            <span className="text-primary-500">assistindo</span> e{" "}
            <span className="text-primary-500">lendo</span>
            <span className="flex justify-center lg:justify-start">
              <Image
                className="w-36 lg:w-48 xl:w-72"
                alt="Para Você"
                src={HeroText}
                quality={100}
              />
            </span>
          </p>

          <p className="text-center font-extralight lg:text-lg xl:text-2xl">
            Plataforma Profissional de Críticas
          </p>

          <div className="w-fit relative z-20">
            <div className="bg-primary-500 w-full h-full absolute -z-10 top-2 left-2" />
            <motion.button
              whileHover={{
                y: -5,
                x: -5,
                transition: { ease: "easeOut", bounce: 0, duration: 0.3 },
              }}
              className="w-fit p-2 bg-accent-500/90 text-neutral-900 xl:text-2xl"
              onClick={() => {
                localStorage.setItem("heroOrPosts", "posts");
                setAnimStart(!animStart);
              }}
            >
              Veja Mais <ChevronRightIcon className="inline" />
            </motion.button>
          </div>
        </div>

        <div className="flex lg:w-full">
          <Image
            className="w-1/3 border-4 border-secondary-500"
            alt="Musician"
            src={musicianHero}
            quality={100}
          />
          <Image
            className="w-1/3 border-y-4 border-secondary-500"
            alt="Actress"
            src={actressHero}
            quality={100}
          />
          <Image
            className="w-1/3 border-4 border-secondary-500"
            alt="Writer"
            src={writerHero}
            quality={100}
          />
        </div>
      </motion.div>

      <motion.div
        variants={variants2}
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
