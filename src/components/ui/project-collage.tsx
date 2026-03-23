"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { CollageImage, CollagePosition } from "@/types";

const DEFAULT_BG = "/images/backgrounds/collage-bg.jpg";

const POSITION_CONFIG: Record<CollagePosition, {
  className: string;
  width: string;
  rotation: string;
  zIndex: number;
  animDelay: number;
  hideOnMobile: boolean;
}> = {
  center: {
    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    width: "w-[45%]",
    rotation: "rotate-0",
    zIndex: 5,
    animDelay: 0,
    hideOnMobile: false,
  },
  "top-left": {
    className: "absolute top-[6%] left-[4%]",
    width: "w-[32%]",
    rotation: "-rotate-[4deg]",
    zIndex: 2,
    animDelay: 0.1,
    hideOnMobile: false,
  },
  "top-right": {
    className: "absolute top-[8%] right-[4%]",
    width: "w-[30%]",
    rotation: "rotate-[3deg]",
    zIndex: 2,
    animDelay: 0.2,
    hideOnMobile: true,
  },
  "bottom-left": {
    className: "absolute bottom-[8%] left-[6%]",
    width: "w-[13%]",
    rotation: "-rotate-[2deg]",
    zIndex: 3,
    animDelay: 0.3,
    hideOnMobile: false,
  },
  "bottom-right": {
    className: "absolute bottom-[6%] right-[5%]",
    width: "w-[30%]",
    rotation: "rotate-[2deg]",
    zIndex: 3,
    animDelay: 0.4,
    hideOnMobile: true,
  },
};

const ASPECT_CLASSES: Record<string, string> = {
  desktop: "aspect-[16/10]",
  mobile: "aspect-[9/19]",
};

interface ProjectCollageProps {
  images: CollageImage[];
  projectName: string;
  backgroundImage?: string;
}

export function ProjectCollage({
  images,
  projectName,
  backgroundImage = DEFAULT_BG,
}: ProjectCollageProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[16/9]"
      aria-label={`Skjermbilder fra ${projectName}`}
      role="img"
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 1152px"
        priority={false}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {images.map((img) => {
        const config = POSITION_CONFIG[img.position];
        if (!config) return null;
        return (
          <motion.div
            key={img.position}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: config.animDelay }}
            className={`${config.className} ${config.width} ${config.rotation}${config.hideOnMobile ? " hidden md:block" : ""}`}
            style={{ zIndex: config.zIndex }}
          >
            <div
              className={`relative overflow-hidden rounded-xl border border-white/10 shadow-2xl ${ASPECT_CLASSES[img.aspectRatio] ?? "aspect-[16/10]"}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top"
                sizes={img.position === "center" ? "45vw" : img.position === "bottom-left" ? "13vw" : "30vw"}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
