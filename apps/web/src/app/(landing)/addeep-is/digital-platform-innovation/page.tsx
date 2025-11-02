"use client";

import { useResponsive } from "../../../../lib/useResponsive";
import { YoutubePlayer } from "../../../../components/YoutubePlayer";

const DigitalPlatformInnovation = () => {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return (
      <div className="stage relative mb-20">
        <div className="mx-auto w-full p-6">
          <div className="space-y-20">
            <section className="copy">
              <h2 className="mb-4 text-2xl font-montserrat font-semibold text-pink-500">
                Addeep is
              </h2>
              <h2 className="mb-10 text-2xl font-montserrat font-semibold text-pink-500">
                GPR Innovation
              </h2>
              <YoutubePlayer videoId="xUG4jmCCZWU" />
              <p className="text-lg md:text-xl leading-loose md:leading-loose mt-12 font-poppins font-normal">
                we aspire to create an integrated platform that smartly connects
                the mutual needs of all members within the social media platform
                and media content industry, within the digital platform
                ecosystem. We innovate in a user-centeric market to make the
                value of human connections even more enjoyable.
              </p>
              <p className="text-lg md:text-xl leading-loose md:leading-loose mt-8 font-poppins font-normal">
                We efficiently accumulate vast amounts of structured and
                unstructured data by using big data and AI technologies.
              </p>
              <p className="text-lg md:text-xl leading-loose md:leading-loose mt-8 font-poppins font-normal">
                Through multidimensional analysis, reinterpretation, and
                reprocessing, we effectively connect and reallocate all human
                and material resources surrounding the content market.
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stage relative mb-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-28 px-6 py-24 md:grid-cols-2 md:py-32">
        <div className="space-y-[60vh]">
          <section className="copy">
            <h2 className="mb-8 text-6xl font-montserrat font-bold">
              Addeep Is
            </h2>
            <h2 className="mb-8 text-3xl font-poppins font-bold text-[#B641E9]">
              GPR Innovation
            </h2>
            <p className="text-xl font-poppins font-normal leading-relaxed mb-6">
              we aspire to create an integrated platform that smartly connects
              the mutual needs of all members within the social media platform
              and media content industry, within the digital platform ecosystem.
            </p>
            <p className="text-xl font-poppins font-normal leading-relaxed mb-6">
              We innovate in a user-centeric market to make the value of human
              connections even more enjoyable.
            </p>
            <p className="text-xl font-poppins font-normal leading-relaxed mb-6">
              We efficiently accumulate vast amounts of structured and
              unstructured data by using big data and AI technologies.
            </p>
            <p className="text-xl font-poppins font-normal leading-relaxed">
              Through multidimensional analysis, reinterpretation, and
              reprocessing, we effectively connect and reallocate all human and
              material resources surrounding the content market.
            </p>
          </section>
        </div>
        <div className="flex flex-1 mt-24">
          <YoutubePlayer videoId="xUG4jmCCZWU" />
        </div>
      </div>
    </div>
  );
};

export default DigitalPlatformInnovation;
