// import { TypeAnimation } from "react-type-animation";
import Cta from "../../shared/Cta";
// import DM from "../../../assets/images/hero.png";
// import { motion } from "framer-motion";
import { REGISTER_PATH } from "../../../constants/routes";

const Hero = () => {
  const motionSettings = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 60,
      opacity: { duration: 1 },
      ease: "easeIn",
      duration: 1,
    },
  };

  return (
    <div className="flex p-20 bg-blue-100">
      <div className="flex flex-col max-w-screen-xl gap-16 mx-auto">
        <div className="flex w-full gap-10">
          <div className="flex items-center justify-center flex-1 w-full">
            {/* <img
              initial={{ x: -100, opacity: 0 }}
              animate={{ ...motionSettings.animate }}
              transition={{
                ...motionSettings.transition,
              }}
              src={DM}
              alt="digital media"
            /> */}
          </div>
          <div className="flex flex-col justify-center flex-1 w-full">
            <h1
              {...motionSettings}
              className="mb-8 text-5xl font-extrabold leading-tight text-roboto"
            >
              Welcome to
            </h1>
            <h1
              {...motionSettings}
              className="mb-8 text-6xl font-extrabold leading-tight text-roboto"
            >
              Online <span className="text-purple-500">ICT</span>
            </h1>
            <p {...motionSettings} className="text-2xl mb-7">
              Your ultimate resource for excelling in A/L ICT exams. Explore our
              comprehensive study materials, practice exams, and interactive
              tutorials to boost your knowledge and confidence.
            </p>
            {/* <TypeAnimation
              sequence={[
                "Facebook",
                1000,
                "Instagram",
                1000,
                "LinkedIn",
                1000,
                "YouTube",
                1000,
                "Twitter",
                1000,
                "TikTok",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{
                fontSize: "3em",
                fontWeight: 700,
                color: "#04d9ff",
                display: "inline-block",
                marginBottom: 40,
              }}
              repeat={Infinity}
            /> */}
            <Cta
              label="Start Your Free MCQ paper"
              url={REGISTER_PATH}
              size="large"
              animation="move"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
