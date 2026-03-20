"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface DeviceFrameProps {
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  className?: string;
  maxScrollPercent?: number;
}

// -- Laptop frame — MacBook-style with aluminum body & glass screen --
export function LaptopFrame({ imageSrc, imageAlt, priority, className, maxScrollPercent }: DeviceFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useScrollAnimation(imageRef, containerRef, { maxScrollPercent });

  return (
    <div className={className} style={{ perspective: "1200px" }}>
      <div style={{ transform: "rotateY(18deg)" }}>
        {/* Screen lid */}
        <div
          className="relative rounded-t-xl border border-[#2a2a2a]"
          style={{
            background: "linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 50%, #2c2c2e 100%)",
            padding: "6px 6px 4px",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Camera */}
          <div className="mx-auto mb-1.5 flex items-center justify-center">
            <div
              className="h-[5px] w-[5px] rounded-full"
              style={{
                background: "radial-gradient(circle, #1a3a1a 30%, #0a0a0a 70%)",
                boxShadow: "0 0 3px rgba(0,200,0,0.15), inset 0 0 2px rgba(255,255,255,0.05)",
              }}
            />
          </div>

          {/* Screen with glass reflection */}
          <div
            ref={containerRef}
            className="relative h-[180px] overflow-hidden rounded-sm bg-black"
          >
            <Image
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              width={1440}
              height={3997}
              className="absolute left-0 top-0 w-full"
              style={{ height: "auto" }}
              sizes="360px"
              priority={priority ?? false}
            />
            {/* Glass reflection */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
              }}
            />
          </div>
        </div>

        {/* Hinge */}
        <div
          className="mx-auto h-[3px]"
          style={{
            width: "102%",
            marginLeft: "-1%",
            background: "linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 50%, #1c1c1e 100%)",
            borderRadius: "0 0 2px 2px",
          }}
        />

        {/* Base / keyboard deck */}
        <div
          className="mx-auto"
          style={{
            width: "110%",
            marginLeft: "-5%",
            height: "10px",
            background: "linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 40%, #1c1c1e 100%)",
            borderRadius: "0 0 8px 8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Trackpad indent */}
          <div
            className="mx-auto"
            style={{
              width: "30%",
              height: "2px",
              marginTop: "3px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "1px",
            }}
          />
        </div>

        {/* Bottom lip */}
        <div
          className="mx-auto"
          style={{
            width: "108%",
            marginLeft: "-4%",
            height: "3px",
            background: "linear-gradient(180deg, #1c1c1e 0%, #0a0a0a 100%)",
            borderRadius: "0 0 4px 4px",
          }}
        />
      </div>
    </div>
  );
}

// -- Tablet frame — iPad-style with thin bezels & metallic edge --
export function TabletFrame({ imageSrc, imageAlt, priority, className, maxScrollPercent, flat }: DeviceFrameProps & { flat?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useScrollAnimation(imageRef, containerRef, { maxScrollPercent });

  return (
    <div className={className} style={flat ? undefined : { perspective: "1200px" }}>
      <div style={flat ? undefined : { transform: "rotateY(-12deg)" }}>
        <div
          className="relative rounded-[16px]"
          style={{
            background: "linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 50%, #2c2c2e 100%)",
            padding: "10px 8px",
            border: "1px solid #3a3a3c",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Camera */}
          <div className="mx-auto mb-1.5 flex items-center justify-center">
            <div
              className="h-[4px] w-[4px] rounded-full"
              style={{
                background: "radial-gradient(circle, #1a1a2a 30%, #0a0a0a 70%)",
                boxShadow: "inset 0 0 2px rgba(255,255,255,0.05)",
              }}
            />
          </div>

          {/* Screen */}
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-md bg-black"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Image
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              width={384}
              height={1439}
              className="absolute left-0 top-0 w-full"
              style={{ height: "auto" }}
              sizes="216px"
              priority={priority ?? false}
            />
            {/* Glass reflection */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.05) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.02) 100%)",
              }}
            />
          </div>
        </div>

        {/* Side button hint (right edge) */}
        <div
          className="absolute right-0 top-[25%]"
          style={{
            width: "2px",
            height: "20px",
            background: "linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 100%)",
            borderRadius: "0 2px 2px 0",
            transform: "translateX(1px)",
          }}
        />
      </div>
    </div>
  );
}

// -- Phone frame — iPhone-style with Dynamic Island & titanium frame --
export function PhoneFrame({ imageSrc, imageAlt, priority, className, maxScrollPercent, flat }: DeviceFrameProps & { flat?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useScrollAnimation(imageRef, containerRef, { maxScrollPercent });

  return (
    <div className={className} style={flat ? undefined : { perspective: "1200px" }}>
      <div style={flat ? undefined : { transform: "rotateY(-15deg)" }}>
        <div
          className="relative rounded-[22px]"
          style={{
            background: "linear-gradient(145deg, #3a3a3c 0%, #1c1c1e 30%, #2c2c2e 70%, #3a3a3c 100%)",
            padding: "8px 5px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.02)",
          }}
        >
          {/* Screen */}
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-[16px] bg-black"
            style={{ aspectRatio: "9 / 14" }}
          >
            {/* Dynamic Island */}
            <div
              className="absolute left-1/2 top-[6px] z-10 -translate-x-1/2"
              style={{
                width: "28%",
                height: "10px",
                background: "#000",
                borderRadius: "20px",
                boxShadow: "0 0 4px rgba(0,0,0,0.8)",
              }}
            />

            <Image
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              width={215}
              height={1564}
              className="absolute left-0 top-0 w-full"
              style={{ height: "auto" }}
              sizes="120px"
              priority={priority ?? false}
            />

            {/* Glass reflection */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(125deg, rgba(255,255,255,0.07) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.03) 100%)",
              }}
            />
          </div>
        </div>

        {/* Side buttons */}
        <div
          className="absolute right-0 top-[20%]"
          style={{
            width: "2px",
            height: "24px",
            background: "linear-gradient(180deg, #4a4a4c 0%, #2c2c2e 100%)",
            borderRadius: "0 2px 2px 0",
            transform: "translateX(1px)",
          }}
        />
        <div
          className="absolute left-0 top-[18%]"
          style={{
            width: "2px",
            height: "14px",
            background: "linear-gradient(180deg, #4a4a4c 0%, #2c2c2e 100%)",
            borderRadius: "2px 0 0 2px",
            transform: "translateX(-1px)",
          }}
        />
        <div
          className="absolute left-0 top-[28%]"
          style={{
            width: "2px",
            height: "14px",
            background: "linear-gradient(180deg, #4a4a4c 0%, #2c2c2e 100%)",
            borderRadius: "2px 0 0 2px",
            transform: "translateX(-1px)",
          }}
        />
      </div>
    </div>
  );
}
