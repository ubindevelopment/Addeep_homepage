"use client";

import { NEXT_PUBLIC_CDN_BASE } from "../../../../lib/env";
import { useResponsive } from "../../../../lib/useResponsive";

const PlatformToEarn = () => {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return (
      <div className="flex flex-col flex-1">
        <div className="w-full text-center">
          <div className="absolute h-[600px] inset-0 bg-black bg-opacity-60 mt-20 mx-1 rounded-lg" />
          <div
            className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center gap-2"
            style={{
              background: `url(${NEXT_PUBLIC_CDN_BASE}/images/AIP2ENewlyBanner.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              border: "1px solid #E5E7EB",
            }}
          >
            <div className="flex flex-col items-center justify-center z-10">
              <div className="flex flex-col gap-2 p-2">
                <h1 className="text-2xl font-bold font-montserrat text-white mb-4">
                  Addeep: A Platform to Earn
                </h1>
                <h3 className="text-md font-normal font-poppins text-white">
                  Addeep has innovated its reward service
                </h3>
                <h3 className="text-md font-normal font-poppins text-white">
                  by providing reward cash to all users.
                </h3>
                <h3 className="text-md font-normal font-poppins text-white">
                  enabling them to realize profits.
                </h3>
                <h3 className="text-md font-normal font-poppins text-white">
                  This model is designed for faster service expansion
                </h3>
                <h3 className="text-md font-normal font-poppins text-white">
                  and higher user satisfaction.
                </h3>
              </div>

              <div className="mt-6 flex flex-col gap-2 p-2">
                <h3 className="text-md font-poppins font-normal text-white">
                  By securing flexible users, Addeep offers targeted advertising
                  and
                </h3>
                <h3 className="text-md font-poppins font-normal text-white">
                  data-driven CRM, growing as a global, collaborative platform.
                </h3>
              </div>
            </div>
          </div>
        </div>
        <section className="flex flex-col flex-1 p-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="font-bold text-2xl font-montserrat">
              <span className="text-[#B641E9]">For Advertisers:</span> Precision
              & Performance
            </h2>
            <h4 className="text-xl text-[#4B5563] font-normal font-poppins">
              Addeep helps advertisers increase their target advertising rates
            </h4>
            <h4 className="text-xl text-[#4B5563] font-normal font-poppins">
              and secure customer acquisition through user-specific settings.
            </h4>
          </div>
          <div className="mt-8 mb-8 grid grid-cols-1 gap-4">
            <div className="max-w-[500px] border border-gray-200 shadow-md rounded-lg p-8 flex flex-col gap-4">
              <h4 className="text-2xl text-[#4B5563] font-normal font-poppins">
                Data-Driven Insights
              </h4>
              <p className="text-xl text-[#4B5563] font-normal font-poppins">
                By analyzing big data patterns, Addeep provides customized AI
                advertising services that drive repeat visits and increased
                sales.
              </p>
            </div>
            <div className="max-w-[500px] border border-gray-200 shadow-md rounded-lg p-8 flex flex-col gap-4">
              <h4 className="text-2xl text-[#4B5563] font-normal">
                Strategic Growth
              </h4>
              <p className="text-xl text-[#4B5563] font-normal font-poppins">
                Addeep assists advertisers in precise analysis of product stages
                -from production to sales- to facilitate new product launches
                and development.
              </p>
            </div>
            <div className="max-w-[500px] border border-gray-200 shadow-md rounded-lg p-8 flex flex-col gap-4">
              <h4 className="text-2xl text-[#4B5563] font-normal font-poppins">
                Integrated Efficiency
              </h4>
              <p className="text-xl text-[#4B5563] font-normal font-poppins">
                The platform seamlessly integrates advertising efficiency with
                crucial customer management through Addeep Ads.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="font-bold text-2xl font-montserrat">
              <span className="text-[#B641E9]">For Users:</span> From Engagement
              to Income
            </h2>
            <h4 className="text-xl text-[#4B5563] font-normal font-poppins">
              Many social media users are dependent on platforms
            </h4>
            <h4 className="text-xl text-[#4B5563] font-normal font-poppins">
              that offer no consistent rewards. Addeep changes that reality.
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-8 mb-8">
            <div className="max-w-[500px] flex flex-col gap-3 mt-4">
              <h4 className="text-xl text-[#B641E9] font-bold font-poppins">
                Sustainable Profit Models
              </h4>
              <p className="text-lg text-[#4B5563] font-normal font-poppins">
                Based on valuable information and targeted ads, creating
                consistent income streams.
              </p>
            </div>
            <div className="max-w-[500px] flex flex-col gap-3 mt-4 mb-4">
              <h4 className="text-xl text-[#B641E9] font-bold font-poppins">
                Collaborative Environment
              </h4>
              <p className="text-lg text-[#4B5563] font-normal font-poppins">
                An innovative platform ecosystem that connects all participants
                to diverse profit channels.
              </p>
            </div>
          </div>
          <img
            src={`${NEXT_PUBLIC_CDN_BASE}/images/PlatformToEarnUserBanner.png`}
            className="h-32"
            alt="Platform to Earn"
          />

          <div className="flex flex-col items-center justify-center mt-12 gap-4">
            <h2 className="font-bold text-2xl font-montserrat">
              <span className="text-[#B641E9]">For Creators:</span> Monetize
              Your Creativity
            </h2>
            <h4 className="text-xl font-poppins text-[#4B5563] font-normal">
              By involving creators and influencers, Addeep develops creative
              and engaging content
            </h4>
            <h4 className="text-xl font-poppins text-[#4B5563] font-normal">
              like short videos, memes, and images, which serve as diverse
              advertising services.
            </h4>
          </div>
          <div className="flex flex-col gap-4 mt-8 mb-8">
            <div className="max-w-[500px] flex flex-col gap-4 mt-4">
              <h4 className="text-xl text-[#B641E9] font-bold font-poppins">
                Sustainable Rewards
              </h4>
              <p className="text-lg text-[#4B5563] font-normal">
                Creators are guaranteed steady incomes and sustainable rewards
                through the continous creation of diverse content. Addeep
                provides more benefits to foster a harmonious platform
                ecosystem.
              </p>
              <p className="text-lg font-normal mt-4">
                Guaranteed steady income
              </p>
            </div>

            <div className="max-w-[500px] flex flex-col gap-4 mt-4">
              <h4 className="text-xl text-[#B641E9] font-bold font-poppins">
                IP Protection
              </h4>
              <p className="text-lg text-[#4B5563] font-normal">
                ACI content protection technology uses Addeep's AI and
                blockchain to safeguard content ownership and rights, providing
                assistance with IP management.
              </p>
              <p className="text-lg font-normal mt-4">
                Blockchain-secured rights
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-8 gap-4">
            <h2 className="font-bold font-montserrat text-3xl">
              The Content That Connects Us
            </h2>
            <h4 className="text-xl text-[#4B5563] font-normal font-poppins">
              Digital content like Shorts, memes, and emoticons play a crucial
              role in modern communication,
            </h4>
            <h4 className="text-xl text-[#4B5563] font-normal font-poppins">
              especially among Millennials and Gen Z.
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12">
            <div className="text-center">
              <img
                src={`${NEXT_PUBLIC_CDN_BASE}/images/SNSShort.png`}
                alt="Platform to Earn"
              />
              <h4 className="text-2xl text-[#4B5563] font-poppins font-semibold mt-8">
                Short Videos
              </h4>
              <p className="text-lg text-[#4B5563] font-poppins font-normal">
                Engaging visual stories
              </p>
            </div>
            <div className="text-center">
              <img
                src={`${NEXT_PUBLIC_CDN_BASE}/images/AIP2ESNSMeme.png`}
                alt="Platform to Earn"
              />
              <h4 className="text-2xl text-[#4B5563] font-poppins font-semibold mt-8">
                Memes & Art
              </h4>
              <p className="text-lg text-[#4B5563] font-poppins font-normal">
                Creative expression
              </p>
            </div>
            <div className="text-center">
              <img
                src={`${NEXT_PUBLIC_CDN_BASE}/images/SNSDigital.png`}
                alt="Platform to Earn"
              />
              <h4 className="text-2xl text-[#4B5563] font-poppins font-semibold mt-8">
                Digital Communication
              </h4>
              <p className="text-lg text-[#4B5563] font-poppins font-normal">
                Modern connection
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-24 gap-4">
            <div
              className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center"
              style={{
                background: `url(${NEXT_PUBLIC_CDN_BASE}/images/SNSFreedomBanner.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                border: "1px solid #E5E7EB",
                opacity: 0.7,
              }}
            >
              <div className="flex flex-col gap-4 items-center justify-center z-10 p-4">
                <h2 className="font-bold text-3xl font-montserrat text-gray-100">
                  Your Bridge to Freedom
                </h2>
                <h4 className="text-xl text-white font-normal font-poppins">
                  Addeep is the bridge that connects users and allows them to
                  freely
                </h4>
                <h4 className="text-xl text-white font-normal font-poppins">
                  communicate and achieve sustained incomes. Users can freely
                  engage
                </h4>
                <h4 className="text-xl text-white font-normal font-poppins">
                  as creators, not just consumers, fostering open communication
                  and a
                </h4>
                <h4 className="text-xl text-white font-normal font-poppins">
                  diverse digital content ecosystem.
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mb-20 flex flex-col flex-1">
      <div className="w-full text-center">
        <div className="absolute h-[600px] inset-0 bg-black bg-opacity-60 mt-32 mx-1 rounded-lg" />
        <div
          className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center"
          style={{
            background: `url(${NEXT_PUBLIC_CDN_BASE}/images/AIP2ENewlyBanner.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "1px solid #E5E7EB",
          }}
        >
          <div className="flex flex-col gap-4 items-center justify-center z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-4">
              Addeep: A Platform to Earn
            </h1>
            <div>
              <h3 className="text-xl font-poppins font-normal text-white">
                Addeep has innovated its reward service
              </h3>
              <h3 className="text-xl font-poppins font-normal text-white">
                by providing reward cash to all users.
              </h3>
              <h3 className="text-xl font-poppins font-normal text-white">
                enabling them to realize profits.
              </h3>
              <h3 className="text-xl font-poppins font-normal text-white">
                This model is designed for faster service expansion
              </h3>
              <h3 className="text-xl font-poppins font-normal text-white">
                and higher user satisfaction.
              </h3>
            </div>

            <div>
              <h3 className="text-xl font-poppins font-normal text-white">
                By securing flexible users, Addeep offers targeted advertising
                and
              </h3>
              <h3 className="text-xl font-poppins font-normal text-white">
                data-driven CRM, growing as a global, collaborative platform.
              </h3>
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col flex-1 p-28">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold font-montserrat text-5xl mb-8">
            <span className="text-[#B641E9]">For Advertisers:</span> Precision &
            Performance
          </h2>
          <h4 className="text-xl text-[#4B5563] font-poppins font-normal">
            Addeep helps advertisers increase their target advertising rates
          </h4>
          <h4 className="text-xl text-[#4B5563] font-poppins font-normal">
            and secure customer acquisition through user-specific settings.
          </h4>
        </div>

        <div className="mt-12 mb-8 grid grid-cols-3 gap-4">
          <div className="max-w-[500px] border border-gray-200 shadow-md rounded-lg p-8">
            <h4 className="text-[28px] text-[#4B5563] font-poppins font-normal">
              Data-Driven Insights
            </h4>
            <p className="text-xl text-[#4B5563] font-poppins font-normal">
              By analyzing big data patterns, Addeep provides customized AI
              advertising services that drive repeat visits and increased sales.
            </p>
          </div>
          <div className="max-w-[500px] border border-gray-200 shadow-md rounded-lg p-8">
            <h4 className="text-[28px] text-[#4B5563] font-poppins font-normal">
              Strategic Growth
            </h4>
            <p className="text-xl text-[#4B5563] font-poppins font-normal">
              Addeep assists advertisers in precise analysis of product stages
              -from production to sales- to facilitate new product launches and
              development.
            </p>
          </div>
          <div className="max-w-[500px] border border-gray-200 shadow-md rounded-lg p-8">
            <h4 className="text-[28px] text-[#4B5563] font-poppins font-normal">
              Integrated Efficiency
            </h4>
            <p className="text-xl text-[#4B5563] font-poppins font-normal">
              The platform seamlessly integrates advertising efficiency with
              crucial customer management through Addeep Ads.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-12">
          <h2 className="font-bold font-montserrat text-5xl mb-8">
            <span className="text-[#B641E9]">For Users:</span> From Engagement
            to Income
          </h2>
          <h4 className="text-xl text-[#4B5563] font-poppins font-normal">
            Many social media users are dependent on platforms
          </h4>
          <h4 className="text-xl text-[#4B5563] font-poppins font-normal">
            that offer no consistent rewards. Addeep changes that reality.
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="max-w-[500px] p-8">
            <h4 className="text-[28px] text-[#4B5563] font-poppins font-normal">
              Sustainable Profit Models
            </h4>
            <p className="text-xl text-[#4B5563] font-poppins font-normal">
              Based on valuable information and targeted ads, creating
              consistent income streams.
            </p>
          </div>
          <div className="max-w-[500px] p-8">
            <h4 className="text-[28px] text-[#4B5563] font-poppins font-normal">
              Collaborative Environment
            </h4>
            <p className="text-xl text-[#4B5563] font-poppins font-normal">
              An innovative platform ecosystem that connects all participants to
              diverse profit channels.
            </p>
          </div>
        </div>
        <img
          src={`${NEXT_PUBLIC_CDN_BASE}/images/PlatformToEarnUserBanner.png`}
          alt="Platform to Earn"
        />

        <div className="flex flex-col items-center justify-center mt-28">
          <h2 className="font-bold font-montserrat text-5xl mb-8">
            <span className="text-[#B641E9]">For Creators:</span> Monetize Your
            Creativity
          </h2>
          <h4 className="text-xl text-[#4B5563] font-poppins font-normal">
            By involving creators and influencers, Addeep develops creative and
            engaging content
          </h4>
          <h4 className="text-xl text-[#4B5563] font-poppins font-normal">
            like short videos, memes, and images, which serve as diverse
            advertising services.
          </h4>
        </div>

        <div className="grid gap-4 items-center mt-8 mb-8 justify-center">
          <div className="flex flex-row justify-between">
            <div className="max-w-[500px] p-8">
              <h4 className="text-[28px] text-[#B641E9] font-bold font-poppins">
                Sustainable Rewards
              </h4>
              <p className="text-xl text-[#4B5563] font-poppins font-normal">
                Creators are guaranteed steady incomes and sustainable rewards
                through the continous creation of diverse content. Addeep
                provides more benefits to foster a harmonious platform
                ecosystem.
              </p>
              <p className="text-xl font-normal mt-4 font-poppins">
                Guaranteed steady income
              </p>
            </div>
            <img
              src={`${NEXT_PUBLIC_CDN_BASE}/images/AIP2ESustain.png`}
              alt="Platform to Earn Sustain"
              width={450}
            />
          </div>

          <div className="flex flex-row justify-between">
            <img
              src={`${NEXT_PUBLIC_CDN_BASE}/images/AIP2EIP.png`}
              alt="Platform to Earn IP"
              width={450}
            />
            <div className="max-w-[500px] p-8">
              <h4 className="text-[28px] text-[#B641E9] font-bold font-poppins">
                IP Protection
              </h4>
              <p className="text-xl text-[#4B5563] font-poppins font-normal">
                ACI content protection technology uses Addeep's AI and
                blockchain to safeguard content ownership and rights, providing
                assistance with IP management.
              </p>
              <p className="text-xl font-normal font-poppins mt-4">
                Blockchain-secured rights
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-12">
          <h2 className="font-bold text-5xl font-montserrat mb-8">
            The Content That Connects Us
          </h2>
          <h4 className="text-xl text-[#4B5563] font-poppins font-normal">
            Digital content like Shorts, memes, and emoticons play a crucial
            role in modern communication,
          </h4>
          <h4 className="text-xl text-[#4B5563] font-poppins font-normal">
            especially among Millennials and Gen Z.
          </h4>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <img
              src={`${NEXT_PUBLIC_CDN_BASE}/images/SNSShort.png`}
              alt="Platform to Earn"
            />
            <h4 className="text-3xl text-[#4B5563] font-poppins font-normal mt-8 mb-4">
              Short Videos
            </h4>
            <p className="text-lg text-[#4B5563] font-normal font-poppins">
              Engaging visual stories
            </p>
          </div>

          <div className="text-center">
            <img
              src={`${NEXT_PUBLIC_CDN_BASE}/images/AIP2ESNSMeme.png`}
              alt="Platform to Earn"
            />
            <h4 className="text-3xl text-[#4B5563] font-poppins font-normal mt-8 mb-4">
              Memes & Art
            </h4>
            <p className="text-lg text-[#4B5563] font-normal font-poppins">
              Creative expression
            </p>
          </div>

          <div className="text-center">
            <img
              src={`${NEXT_PUBLIC_CDN_BASE}/images/SNSDigital.png`}
              alt="Platform to Earn"
            />
            <h4 className="text-3xl text-[#4B5563] font-poppins font-normal mt-8 mb-4">
              Digital Communication
            </h4>
            <p className="text-lg text-[#4B5563] font-normal font-poppins">
              Modern connection
            </p>
          </div>
        </div>
      </section>
      <div className="w-full text-center">
        <div
          className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center"
          style={{
            background: `url(${NEXT_PUBLIC_CDN_BASE}/images/SNSFreedomBanner.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "1px solid #E5E7EB",
            opacity: 0.7,
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat text-white mb-4">
              Your Bridge to Freedom
            </h1>
            <h3 className="text-2xl font-bold font-poppins text-white mb-4">
              Addeep is the bridge that connects users and allows them to freely
            </h3>
            <h3 className="text-2xl font-bold font-poppins text-white">
              communicate and achieve sustained incomes. Users can freely engage
            </h3>
            <h3 className="text-2xl font-bold font-poppins text-white">
              as creators, not just consumers, fostering open communication and
              a
            </h3>
            <h3 className="text-2xl font-bold font-poppins text-white">
              diverse digital content ecosystem.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformToEarn;
