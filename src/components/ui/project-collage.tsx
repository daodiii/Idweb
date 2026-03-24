"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { CollageImage, CollagePosition } from "@/types";

const DEFAULT_BG = "/images/backgrounds/collage-bg.jpg";

interface PositionConfig {
  className: string;
  rotation: string;
  zIndex: number;
  animDelay: number;
  hideOnMobile: boolean;
}

const POSITION_CONFIG: Record<CollagePosition, PositionConfig> = {
  center: {
    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    rotation: "rotate-0",
    zIndex: 5,
    animDelay: 0,
    hideOnMobile: false,
  },
  "top-left": {
    className: "absolute top-[6%] left-[4%]",
    rotation: "-rotate-[4deg]",
    zIndex: 2,
    animDelay: 0.1,
    hideOnMobile: false,
  },
  "top-right": {
    className: "absolute top-[8%] right-[4%]",
    rotation: "rotate-[3deg]",
    zIndex: 2,
    animDelay: 0.2,
    hideOnMobile: true,
  },
  "bottom-left": {
    className: "absolute bottom-[8%] left-[6%]",
    rotation: "-rotate-[2deg]",
    zIndex: 3,
    animDelay: 0.3,
    hideOnMobile: false,
  },
  "bottom-right": {
    className: "absolute bottom-[6%] right-[5%]",
    rotation: "rotate-[2deg]",
    zIndex: 3,
    animDelay: 0.4,
    hideOnMobile: true,
  },
};

const ASPECT_CLASSES: Record<string, string> = {
  desktop: "aspect-[16/10]",
  tablet: "aspect-[3/4]",
  mobile: "aspect-[9/19]",
};

/** Width per position, adapted by aspect ratio so images fit well inside the collage */
const WIDTH_MAP: Record<CollagePosition, Record<string, string>> = {
  center: {
    mobile: "w-[18%]",
    tablet: "w-[22%]",
    desktop: "w-[30%]",
  },
  "top-left": {
    mobile: "w-[15%]",
    tablet: "w-[22%]",
    desktop: "w-[32%]",
  },
  "top-right": {
    mobile: "w-[14%]",
    tablet: "w-[22%]",
    desktop: "w-[30%]",
  },
  "bottom-left": {
    mobile: "w-[14%]",
    tablet: "w-[22%]",
    desktop: "w-[30%]",
  },
  "bottom-right": {
    mobile: "w-[14%]",
    tablet: "w-[22%]",
    desktop: "w-[30%]",
  },
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
          background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {images.map((img) => {
        const config = POSITION_CONFIG[img.position];
        if (!config) return null;
        const widthClass = WIDTH_MAP[img.position]?.[img.aspectRatio] ?? "w-[28%]";
        return (
          <motion.div
            key={img.position}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: config.animDelay }}
            className={`${config.className} ${widthClass} ${config.rotation}${config.hideOnMobile ? " hidden md:block" : ""}`}
            style={{ zIndex: config.zIndex }}
          >
            <div
              className={`relative overflow-hidden rounded-xl border border-white/10 ${ASPECT_CLASSES[img.aspectRatio] ?? "aspect-[16/10]"}`}
              style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.7), 0 10px 20px rgba(0,0,0,0.5)" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top"
                sizes={img.position === "center" ? "30vw" : "22vw"}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
