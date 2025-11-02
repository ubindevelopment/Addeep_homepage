"use client";
import Image from "next/image";
import React, { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useResponsive } from "../../../../lib/useResponsive";
import { values } from "../../../../constants/core-values";
import { NEXT_PUBLIC_CDN_BASE } from "../../../../lib/env";

gsap.registerPlugin(ScrollTrigger);

interface GsapPanelProps {
  image: string | Element;
}

const MainGsapPanelMolecule = ({ image }: GsapPanelProps) => {
  const { isMobile } = useResponsive();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!panelRef.current || isMobile) return;

    const panel = panelRef.current;

    const animation = gsap.fromTo(
      panel,
      {
        opacity: 1,
        scale: 1,
      },
      {
        opacity: 1,
        scale: 1,
        ease: "power2.inOut",
        duration: 20,
        scrollTrigger: {
          trigger: panel,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: 2,
        },
      }
    );
    return () => {
      animation.scrollTrigger?.kill();
    };
  }, [image]);

  if (isMobile) {
    return <div className="w-full h-full">{image as unknown as ReactNode}</div>;
  }
  return (
    <div ref={panelRef} className="bg-white relative overflow-hidden w-screen">
      <div className="w-full h-full">{image as unknown as ReactNode}</div>
    </div>
  );
};

// Header Component
const CoreValueHeader = () => {
  const { isMobile, isTablet } = useResponsive();
  if (isMobile || isTablet) {
    return (
      <div className="w-full h-48 text-center">
        <div className="w-full h-48 rounded-lg flex flex-col items-center justify-center gap-4">
          <img
            src={`${NEXT_PUBLIC_CDN_BASE}/images/AddeepLogo.png`}
            alt="logo"
            className="h-14 w-16"
          />
          <h1 className="text-2xl font-bold font-montserrat mb-4">
            We <span className="text-[#B641E9]">Bridge</span> Values
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-center">
      <div className="w-full rounded-lg flex flex-col gap-4 items-center justify-center">
        <img
          src={`${NEXT_PUBLIC_CDN_BASE}/images/AddeepLogo.png`}
          alt="logo"
          className="h-24 w-24"
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          We <span className="text-[#B641E9]">Bridge</span> Values
        </h1>
      </div>
    </div>
  );
};

function CoreValues() {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return (
      <div className="mx-auto p-3 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 text-center">
          {values.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-6">
              {/* 아이콘 */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full text-white border-2 border-gray-300 text-3xl">
                {item.icon}
              </div>

              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#833AB4] to-[#818CF8] text-white text-xl font-bold shadow-md">
                {i + 1}
              </div>

              {/* 텍스트 */}
              <p className="text-lg text-gray-600 leading-relaxed font-semibold font-poppins">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 text-center">
        {values.map((item, i) => (
          <div key={i} className="flex flex-col items-center space-y-4">
            {/* 아이콘 */}
            <div className="w-28 h-28 flex items-center justify-center rounded-full text-white border-2 border-gray-300 text-3xl">
              {item.icon}
            </div>

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#833AB4] to-[#818CF8] text-white text-xl font-bold shadow-md">
              {i + 1}
            </div>

            {/* 텍스트 */}
            <p className="text-xl font-semibold text-gray-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hero Component
const CoreValueHero = () => {
  const { isMobile, isTablet } = useResponsive();
  if (isMobile || isTablet) {
    return (
      <div className="w-full p-6 text-center flex flex-col bg-white mt-8">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-black font-montserrat mb-4">
            Core Values
          </h1>
          <p className="text-xl mt-2 font-normal text-[#4B5563] leading-relaxed font-poppins">
            Our core values are
          </p>
          <CoreValues />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-12 text-center flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-black mb-4">Core Values</h1>
        <p className="text-2xl mt-2 font-normal text-[#4B5563] leading-relaxed">
          Our core values are
        </p>
        <div className="h-1 mt-4 w-24 bg-gradient-to-r from-[#6366F1] to-[#818CF8]" />
        <CoreValues />
      </div>
    </div>
  );
};

const FirstContainer = () => {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return (
      <div className="w-full flex flex-col justify-center p-4 text-center bg-[#F9FAFB]">
        <div className="p-4">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold text-black font-montserrat mb-4">
                Vision
              </h2>

              <ul className="text-lg text-gray-700 font-normal font-poppins space-y-1">
                <li>The one and only Addeep, aiming</li>
                <li>for a clean and desirable digital content world</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center h-96 p-8 bg-[#F9FAFB]">
      <div className="p-48">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col items-center lg:items-start lg:w-1/2">
            <h2 className="text-4xl font-bold text-black mb-4">Vision</h2>

            <ul className="text-xl text-gray-700 font-normal font-sans space-y-1">
              <li>The one and only Addeep, aiming</li>
              <li>for a clean and desirable digital content world</li>
            </ul>
          </div>
          <img
            src={`${NEXT_PUBLIC_CDN_BASE}/images/AddeepBanner.png`}
            alt="logo"
            style={{ width: "480px", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

const SecondContainer = () => {
  const { isMobile, isTablet } = useResponsive();
  if (isMobile || isTablet) {
    return (
      <div className="w-full flex flex-col justify-center text-center p-8 bg-white">
        <div className="p-4">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold text-black font-montserrat mb-4">
                Motto
              </h2>

              <p className="text-xl font-bold text-[#833AB4] leading-relaxed mb-6 font-poppins">
                Aspiration, Empathy, Agility
              </p>

              <ul className="text-lg text-gray-700 font-normal font-poppins space-y-1">
                <li>Let's collaborate with</li>
                <li>aspiration, empathy, and agility</li>
                <li>to make the most of our precious time.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center h-96 p-8 bg-white">
      <div className="p-48">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 space-y-6">
            <img
              src={`${NEXT_PUBLIC_CDN_BASE}/images/MottoBanner.png`}
              alt="logo"
              style={{ width: "480px", height: "auto" }}
            />
          </div>
          <div className="flex flex-col items-center lg:items-start lg:w-1/2">
            <h2 className="text-4xl font-bold text-black mb-4">Motto</h2>

            <p className="text-2xl font-bold text-[#833AB4] leading-relaxed mb-6">
              Aspiration, Empathy, Agility
            </p>

            <ul className="text-xl text-gray-700 font-normal font-sans space-y-1">
              <li>Let's collaborate with</li>
              <li>aspiration, empathy, and agility</li>
              <li>to make the most of our precious time.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThirdContainer = () => {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return (
      <div className="w-full flex flex-col justify-center text-center p-8 bg-[#F9FAFB]">
        <div className="p-4">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold text-black font-montserrat mb-4">
                Mission
              </h2>

              <ul className="text-lg text-gray-700 font-normal font-poppins flex flex-col items-center justify-center space-y-4">
                <li className="flex flex-row items-center gap-4">
                  Let's strive for small successes.
                </li>
                <li className="flex flex-row items-center gap-4">
                  Let's enjoy challenges and adventures together with the power
                  of unity.
                </li>
                <li className="flex flex-row items-center gap-4">
                  Let's think smart and act appropriately.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center h-96 p-8 bg-[#F9FAFB]">
      <div className="p-48">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-4xl font-bold text-black mb-4">Mission</h2>

            <ul className="text-xl text-gray-700 font-normal font-sans space-y-4">
              <li className="flex flex-row items-center">
                <span className="text-[#833AB4] font-bold w-28">
                  Let's strive
                </span>
                for small successes.
              </li>
              <li className="flex flex-row items-center">
                <span className="text-[#833AB4] font-bold w-28">
                  Let's enjoy
                </span>
                challenges and adventures together with the power of unity.
              </li>
              <li className="flex flex-row items-center">
                <span className="text-[#833AB4] font-bold w-28">
                  Let's think
                </span>
                smart and act appropriately.
              </li>
            </ul>
          </div>
          <img
            src={`${NEXT_PUBLIC_CDN_BASE}/images/MissionBanner.png`}
            alt="logo"
            style={{ width: "480px", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

const sectionGroup = [
  <FirstContainer />,
  <SecondContainer />,
  <ThirdContainer />,
];

export default function LandingPage() {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <div className="min-h-screen bg-white">
        <CoreValueHeader />
        <CoreValueHero />
        <FirstContainer />
        <SecondContainer />
        <ThirdContainer />
        <div className="mt-24 hidden">
          {sectionGroup.map((image, idx) => (
            <MainGsapPanelMolecule
              key={`section-${idx}`}
              image={image as unknown as string | Element}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CoreValueHeader />
      <CoreValueHero />
      <div className="mt-24">
        {sectionGroup.map((image, idx) => (
          <MainGsapPanelMolecule
            key={`section-${idx}`}
            image={image as unknown as string | Element}
          />
        ))}
      </div>
    </div>
  );
}
