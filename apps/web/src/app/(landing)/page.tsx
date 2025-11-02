"use client";
import React, { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useResponsive } from "../../lib/useResponsive";
import { collageData, splitScreenData } from "../../constants";
import {
  LandingBottomArrowIcon,
  MobileLandingBottomArrowIcon,
} from "../../icons";
import { NEXT_PUBLIC_CDN_BASE } from "../../lib/env";

// hello

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface AnimatedSectionProps {
  children: ReactNode;
  index: number;
}

const AnimatedSection = ({ children, index }: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const textElements = section.querySelectorAll(".animate-text");
    const imageElements = section.querySelectorAll(".animate-image");

    // 초기 상태 설정
    gsap.set(textElements, { y: 100, opacity: 0 });
    gsap.set(imageElements, { y: 100, opacity: 0 });

    // 페이지 로드 시 첫 번째 섹션만 즉시 애니메이션
    if (index === 0) {
      const tl = gsap.timeline();
      timelineRef.current = tl;

      textElements.forEach((element, i) => {
        tl.to(
          element,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          i * 0.1
        );
      });

      imageElements.forEach((element, i) => {
        tl.to(
          element,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          textElements.length * 0.1 + i * 0.1
        );
      });
    }

    // 스크롤 트리거 설정 - 스크롤 기반 애니메이션
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
        markers: false,
        onRefresh: (self) => {
          // Samsung Internet 호환성: 스크롤 위치 재계산
          self.refresh();
        },
      },
    });

    // ScrollTrigger 인스턴스 저장
    if (tl.scrollTrigger) {
      scrollTriggerRef.current = tl.scrollTrigger;
    }

    // 텍스트 요소들을 순차적으로 애니메이션
    textElements.forEach((element, i) => {
      tl.to(
        element,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        i * 0.08
      );
    });

    // 이미지 애니메이션
    imageElements.forEach((element, i) => {
      tl.to(
        element,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        textElements.length * 0.08 + i * 0.08
      );
    });

    // 메모리 누수 방지를 위한 정리 함수
    return () => {
      // 모든 타임라인 kill
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      if (tl) {
        tl.kill();
      }

      // ScrollTrigger 명시적으로 kill
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      // 애니메이션 상태 초기화
      gsap.set([...textElements, ...imageElements], { clearProps: "all" });
    };
  }, [index]);

  return (
    <div ref={sectionRef} className="min-h-screen flex items-center">
      {children}
    </div>
  );
};

export default function LandingPage() {
  const { isMobile, isTablet } = useResponsive();
  const secondSectionRef = useRef<HTMLDivElement>(null);

  const handleArrowClick = () => {
    if (secondSectionRef.current) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: secondSectionRef.current,
          offsetY: 0,
        },
        ease: "power2.inOut",
      });
    }
  };

  if (isMobile || isTablet) {
    return (
      <div className="min-h-screen bg-white">
        {/* First Section - Collage Layout */}
        <div className="p-6">
          <div className="items-center flex flex-col">
            <AnimatedSection index={0}>
              <div className="min-h-screen grid grid-cols-1 gap-12">
                {/* Top Left Text Block */}
                <div className="animate-text">
                  <p className="font-sans font-normal text-3xl text-gray-800 leading-[56px] tracking-normal">
                    {collageData[0].text.map((line, index) => (
                      <span key={index} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Top Right Image - Fisheye Effect */}
                <div className="animate-image">
                  <div className="relative max-w-96 h-72 overflow-hidden">
                    <img
                      src={`${NEXT_PUBLIC_CDN_BASE}/images/jessica.png`}
                      alt="Person with fisheye lens effect"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Middle Left Image - Social Woman */}
                <div className="animate-image mt-8">
                  <div className="relative max-w-96 h-72 md:w-80 md:h-[400px] overflow-hidden">
                    <img
                      src={`${NEXT_PUBLIC_CDN_BASE}/images/social.png`}
                      alt="Smiling man with hands on cheeks"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Middle Right Text Block - Purple Gradient */}
                <div className="animate-text mt-16 md:row-start-2 md:col-start-2 md:justify-self-end">
                  <p className="font-sans font-normal text-[28px] leading-[42px] md:text-[40px] md:leading-[70px] bg-gradient-to-r from-[#FF0169] via-[#D300C5] to-[#7638FA] bg-clip-text text-transparent tracking-normal text-right">
                    {collageData[1].text.map((line, index) => (
                      <span key={index} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Bottom Right Image - Three People */}
                <div className="animate-image md:row-start-3 md:col-start-2 md:justify-self-end mt-16">
                  <div className="relative max-w-96 h-72 md:w-[500px] md:h-80 overflow-hidden">
                    <img
                      src={`${NEXT_PUBLIC_CDN_BASE}/images/good-face.png`}
                      alt="Three people looking down"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Bottom Arrow */}
                <button
                  type="button"
                  onClick={handleArrowClick}
                  className="animate-text justify-self-start self-end -mt-12 md:row-start-4 md:col-start-1 hover:scale-110 transition-transform duration-200"
                  aria-label="Scroll Down"
                >
                  {isMobile ? (
                    <MobileLandingBottomArrowIcon />
                  ) : (
                    <LandingBottomArrowIcon />
                  )}
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>

        <div ref={secondSectionRef} className="min-h-screen bg-black">
          <AnimatedSection index={1}>
            <div className="relative w-full h-screen">
              <div className="flex w-full h-full">
                <div className="flex-1 relative animate-image">
                  <img
                    src={`${NEXT_PUBLIC_CDN_BASE}/images/Background.png`}
                    alt="Person with hands over eyes peeking through fingers"
                    className="object-cover max-w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
              </div>

              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center animate-text">
                <div className="text-left px-8">
                  <p className="text-2xl font-montserrat font-semibold text-white leading-loose tracking-normal">
                    {splitScreenData.text.map((line, index) => (
                      <span key={index} className="block mt-4 mb-4">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* First Section - Collage Layout */}
      <div className="p-16">
        <div className="max-w-full items-center flex flex-col">
          <AnimatedSection index={0}>
            <div className="min-h-screen grid grid-cols-1 gap-8 md:grid-cols-2 md:grid-rows-[auto_auto_auto]">
              {/* Top Left Text Block */}
              <div className="animate-text">
                <p className="font-arial font-normal text-[80px] text-gray-800 leading-tight md:text-[64px] md:leading-[90px] tracking-normal">
                  {collageData[0].text.map((line, index) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              {/* Top Right Image - Fisheye Effect */}
              <div className="animate-image justify-self-end md:row-start-1 md:col-start-2">
                <div className="relative w-64 h-64 md:w-[450px] md:h-[400px] overflow-hidden">
                  <img
                    src={`${NEXT_PUBLIC_CDN_BASE}/images/jessica.png`}
                    alt="Person with fisheye lens effect"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Middle Left Image - Social Woman */}
              <div className="animate-image md:row-start-2 md:col-start-1 mt-24">
                <div className="relative w-full md:w-[450px] md:h-[700px] rounded-lg overflow-hidden">
                  <img
                    src={`${NEXT_PUBLIC_CDN_BASE}/images/social.png`}
                    alt="Smiling man with hands on cheeks"
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Middle Right Text Block - Purple Gradient */}
              <div className="animate-text mt-32 md:row-start-2 md:col-start-2 md:justify-self-end">
                <p className="font-arial font-normal text-[28px] leading-tight md:text-[64px] md:leading-[90px] tracking-normal bg-gradient-to-r from-[#FF0169] via-[#D300C5] to-[#7638FA] bg-clip-text text-transparent text-right">
                  {collageData[1].text.map((line, index) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              {/* Bottom Right Image - Good Face Man */}
              <div className="animate-image md:row-start-5 md:col-start-2 md:justify-self-end">
                <div className="relative w-full h-56 md:w-[450px] md:h-[400px] rounded-lg overflow-hidden">
                  <img
                    src={`${NEXT_PUBLIC_CDN_BASE}/images/good-face.png`}
                    alt="Three people looking down"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Bottom Arrow */}
              <button
                type="button"
                onClick={handleArrowClick}
                className="animate-text justify-self-start self-end mt-72 md:row-start-5 md:col-start-1 hover:scale-110 transition-transform duration-200"
                aria-label="Scroll Down"
              >
                <LandingBottomArrowIcon />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div ref={secondSectionRef} className="mt-56 bg-black/50">
        <AnimatedSection index={1}>
          <div className="relative w-full h-1/2">
            <div className="flex w-full h-full">
              <div className="flex-1 relative animate-image">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={`${NEXT_PUBLIC_CDN_BASE}/images/Background.png`}
                    alt="Person with hands over eyes peeking through fingers"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
              </div>
            </div>

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center animate-text">
              <div className="text-left px-8">
                <p className="text-5xl font-montserrat font-semibold text-white leading-normal">
                  {splitScreenData.text.map((line, index) => (
                    <span key={index} className="block mt-2 mb-2">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
