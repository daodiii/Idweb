"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface DeviceFrameProps {
  imageSrc: string;
  imageAlt: string;
  paused?: boolean;
  priority?: boolean;
  className?: string;
}

// -- Laptop frame with browser chrome --
export function LaptopFrame({ imageSrc, imageAlt, paused, priority, className }: DeviceFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useScrollAnimation(imageRef, containerRef, { paused });

  return (
    <div className={className} style={{ perspective: "1200px" }}>
      <div style={{ transform: "rotateY(18deg)" }}>
        <div
          className="rounded-t-xl bg-[#1a1a1a] p-1"
          style={{
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(37,99,235,0.08)",
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 rounded-t-lg bg-[#111] px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
            <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
            <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
            <div className="ml-3 h-2 flex-1 rounded bg-white/5" />
          </div>
          {/* Screen */}
          <div
            ref={containerRef}
            className="relative h-[180px] overflow-hidden rounded-b bg-black"
          >
            <Image
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              width={1440}
              height={3600}
              className="absolute left-0 top-0 w-full"
              style={{ height: "auto" }}
              sizes="300px"
              priority={priority ?? false}
            />
          </div>
        </div>
        {/* Base */}
        <div className="mx-auto h-2.5 w-[320px] rounded-b bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
        <div className="mx-auto h-1.5 w-24 rounded-b-lg bg-[#222]" />
      </div>
    </div>
  );
}

// -- Tablet frame with camera dot --
export function TabletFrame({ imageSrc, imageAlt, paused, priority, className }: DeviceFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useScrollAnimation(imageRef, containerRef, { paused });

  return (
    <div className={className} style={{ perspective: "1200px" }}>
      <div style={{ transform: "rotateY(-12deg)" }}>
        <div
          className="rounded-2xl bg-[#1a1a1a] p-1.5"
          style={{
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(37,99,235,0.06)",
          }}
        >
          {/* Camera */}
          <div className="mx-auto mb-1 h-1.5 w-1.5 rounded-full bg-[#111]" />
          {/* Screen */}
          <div
            ref={containerRef}
            className="relative h-[230px] overflow-hidden rounded-xl bg-black"
          >
            <Image
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              width={768}
              height={3200}
              className="absolute left-0 top-0 w-full"
              style={{ height: "auto" }}
              sizes="180px"
              priority={priority ?? false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// -- Phone frame with notch --
export function PhoneFrame({ imageSrc, imageAlt, paused, priority, className }: DeviceFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useScrollAnimation(imageRef, containerRef, { paused });

  return (
    <div className={className} style={{ perspective: "1200px" }}>
      <div style={{ transform: "rotateY(-15deg)" }}>
        <div
          className="rounded-[18px] bg-[#1a1a1a] p-1"
          style={{
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(37,99,235,0.06)",
          }}
        >
          {/* Notch */}
          <div className="mx-auto mb-1 h-1.5 w-10 rounded-b-md bg-[#111]" />
          {/* Screen */}
          <div
            ref={containerRef}
            className="relative h-[200px] overflow-hidden rounded-xl bg-black"
          >
            <Image
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              width={375}
              height={3400}
              className="absolute left-0 top-0 w-full"
              style={{ height: "auto" }}
              sizes="100px"
              priority={priority ?? false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
