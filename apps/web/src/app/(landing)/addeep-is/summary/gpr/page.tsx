"use client";

import { useState, useEffect } from "react";
import { NEXT_PUBLIC_CDN_BASE } from "../../../../../lib/env";

export default function GPRPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      hero: {
        name: "The Future of AI: Predict, Generate, and Augment",
        description:
          "Addeep GPR-1 is a 'Non-conversational, Fully Automated Generative AI' that anticipates user intent to automatically create optimal experiences. It goes beyond simple responses to predict and augment the user's next move.",
      },
      summary: {
        title: "Addeep GPR-1: The Dawn of Augmented Intelligence",
        description:
          "Addeep GPR (Generative Pre-trained Recommender) transcends traditional recommendation systems. It's an Augmented AI that deeply 'mines' a user's 'Mindset' to 'generate' new content, ads, and commerce experiences, acting as the core engine for the WEB 3.0-based S2E (SNS to Earn) social media ecosystem.",
      },
    },
  };

  const currentContent = content[language as keyof typeof content];

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "summary",
        "technologies",
        "gpr1",
        "projects",
        "journey",
        "accolades",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-['Inter','Noto_Sans_KR',sans-serif]">
      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-2">
              {currentContent.hero.name.split(":")[0] + ":"}
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat bg-gradient-to-r from-[#FF0169] via-[#D300C5] to-[#7638FA] text-transparent bg-clip-text mb-4">
              {currentContent.hero.name.split(":")[1]}
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-poppins font-normal leading-relaxed mt-12">
              {currentContent.hero.description}
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium bg-purple-600 text-white border border-purple-600 rounded-full hover:bg-purple-600  transition-colors duration-200 w-64 h-10">
            <h4 className="font-poppins font-medium">
              Explore Core Technology
            </h4>
          </button>
        </div>
      </section>

      {/* Summary Section */}
      <section id="summary" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-montserrat text-gray-900 mb-8">
              {currentContent.summary.title}
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl font-poppins font-normal mx-auto leading-relaxed">
              {currentContent.summary.description}
            </p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section
        id="technologies"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-montserrat text-gray-900 text-center mb-12">
            Core Technology Deep Dive
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold font-poppins text-cyan-600 mb-4">
                LMM: Large Mind-mining Model
              </h3>
              <p className="text-gray-700 font-poppins font-normal">
                While LLMs understand language, LMMs mine user 'intent'. It
                models a user's complex mindset probabilistically using three
                core data types to predict what they want and why.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold font-poppins text-cyan-600 mb-4">
                ACT & Deep Blend
              </h3>
              <p className="text-gray-700 font-poppins font-normal">
                Automatic Content convergence Technology(ACT), based on LMM
                inference, automatically generates optimal content through a
                Diffusion model-based 'Deep Blend' process.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold font-poppins text-cyan-600 mb-4">
                Generation-Confirmation & RL
              </h3>
              <p className="text-gray-700 font-poppins font-normal">
                "Addeep's AI continuously evolves and grows with users through a
                \'Generation-Confirmation\' model and Reinforcement
                Learning(RL)."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GPR-1 Model Section */}
      <section id="gpr1" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <h2 className="text-3xl font-bold font-montserrat text-gray-900 text-center mb-8">
            Key Services & AIaaS Scalability
          </h2>
          <h2 className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-poppins font-normal">
            Addeep GPR-1 automates four core services within the SNS platform,
            and its technology can be infinitely expanded to all industries
            through the AIaaS (Service-based AI) model.
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold font-poppins text-purple-600 mb-4">
                Automated Content Creation
              </h3>
              <p className="text-gray-700 font-poppins font-normal">
                It automatically generates and proposes user-personalized
                content such as images, memes, and emoticons.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold font-poppins text-purple-600 mb-4">
                Automated Ad Generation
              </h3>
              <p className="text-gray-700 font-poppins font-normal">
                Optimally matches content and ads to create seamless native
                advertising automatically.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold font-poppins text-purple-600 mb-4">
                Automated Transactions
              </h3>
              <p className="text-gray-700 font-poppins font-normal">
                Maximizes purchase conversion by automatically generating
                sale/purchase transactions for content and products.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold font-poppins text-purple-600 mb-4">
                Automated SNS Posting
              </h3>
              <p className="text-gray-700 font-poppins font-normal">
                Automatically posts optimized SNS content with just user
                approval.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg w-full">
            <h3 className="text-xl font-semibold font-poppins text-purple-600 mb-4">
              AIaaS (Artificial Intelligence-as-a-Service)
            </h3>
            <p className="text-gray-700 font-poppins font-normal">
              Addeep's powerful GPR engine is offered as APIs and solutions,
              possessing infinite scalability for custom application across all
              industrial domains, including finance, healthcare, and education.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <h2 className="text-3xl font-bold font-montserrat text-gray-900 text-center mb-12">
            Expected Effects & Future Value
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold font-poppins text-cyan-600 mb-4">
                Innovative User Experience
              </h3>
              <p className="text-gray-700 font-poppins font-normal">
                Users no longer need to search for what they want. Addeep AI
                proactively understands the user's mind to suggest optimal
                content and services, providing unprecedented convenience and
                satisfaction.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold font-poppins text-cyan-600 mb-4">
                Maximized Business Efficiency
              </h3>
              <p className="text-gray-700 font-poppins font-normal">
                By automating the entire process from content production to ad
                campaigns and sales, we reduce corporate costs and maximize
                marketing efficiency and conversion rates, securing a
                competitive advantage.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg w-full text-center">
            <h3 className="text-xl font-semibold font-poppins text-cyan-600 mb-4">
              Leading the WEB 3.0/4.0 Era
            </h3>
            <p className="text-gray-700 font-poppins font-normal">
              Beyond the era of decentralized personalized content, Addeep's
              augmented AI technology will lead the WEB 4.0 era, where humans
              and AI interact and grow together without boundaries.
            </p>
          </div>
        </div>
      </section>

      <section id="journey" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* <h2 className="text-3xl font-bold font-montserrat text-gray-900 text-center mb-12">
            GPR vs LLM: Paradigm Shift
          </h2>

          <img
            src={`${NEXT_PUBLIC_CDN_BASE}/images/AddeepTableImage.png`}
            alt="GPR vs LLM"
            className="w-full h-auto"
          /> */}

          {/* TODO: Table to be implemented */}
          <div className="overflow-x-auto card rounded-lg shadow hidden">
            {/* grid header */}
            <div className="flex flex-row items-center bg-gray-200 text-gray-700 text-lg font-semibold border-b p-6">
              <div className="text-left flex flex-col gap-24 w-1/5">
                <div className="font-bold">
                  <span className="lang-en">Core Philosophy</span>
                </div>
                <div className="font-bold">
                  <span className="lang-en">Inference Model</span>
                </div>
                <div className="font-bold">
                  <span className="lang-en">Interaction Method</span>
                </div>
                <div className="font-bold">
                  <span className="lang-en">Business Application</span>
                </div>
              </div>

              <div className="flex flex-col gap-16 w-2/5">
                Addeep GPR-1
                <div>
                  <strong className="lang-en">Augmented Intelligence: </strong>
                  <span className="lang-en">
                    AI predicts and enhances human intent
                  </span>
                </div>
                <div className="font-semibold text-gray-800">
                  LMM (Large Mind-mining Model)
                </div>
                <div>
                  <strong className="lang-en">
                    Non-conversational (Proactive):{" "}
                  </strong>
                  <span className="lang-en">
                    Proactively generates without explicit input
                  </span>
                </div>
                <div>
                  <strong className="lang-en">
                    Direct S2E Ecosystem Drive:{" "}
                  </strong>
                  <span className="lang-en">
                    Revenue model directly linked with ads and commerce
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-16 w-2/5">
                <span className="lang-en">
                  Conversational LLM (e.g., ChatGPT)
                </span>
                <div>
                  <strong className="lang-en">Artificial Intelligence: </strong>
                  <span className="lang-en">
                    AI understands and executes human commands
                  </span>
                </div>
                <div>LLM (Large Language Model)</div>
                <div>
                  <strong className="lang-en">
                    Conversational (Reactive):{" "}
                  </strong>
                  <span className="lang-en">
                    Reacts based on user prompts (input)
                  </span>
                </div>
                <div>
                  <strong className="lang-en">General-Purpose API: </strong>
                  <span className="lang-en">
                    Foundational tech applicable to various services
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .nav-link {
          transition:
            color 0.3s,
            border-bottom-color 0.3s;
          border-bottom: 2px solid transparent;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #8b5cf6;
          border-bottom-color: #8b5cf6;
        }
      `}</style>
    </div>
  );
}
