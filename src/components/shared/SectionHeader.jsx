import { motion } from "framer-motion";
import PropTypes from "prop-types";

const SectionHeader = ({ title, desc }) => {
  const motionSettings = {
    initial: { y: 50, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: {
      type: "spring",
      stiffness: 60,
      opacity: { duration: 1 },
      ease: "easeIn",
      duration: 1,
    },
  };

  return (
    <div className="flex flex-col items-center w-full gap-6">
      <motion.h1
        {...motionSettings}
        transition={{ ...motionSettings.transition, delay: 0.2 }}
        className="text-5xl font-semibold text-center"
      >
        {title}
      </motion.h1>
      {desc && (
        <motion.p
          {...motionSettings}
          transition={{ ...motionSettings.transition, delay: 0.3 }}
          className="text-xl leading-8 text-center w-[70%]"
        >
          {desc}
        </motion.p>
      )}
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired, // Ensure title is passed as a string and is required
  desc: PropTypes.string, // Ensure desc is passed as a string
};

export default SectionHeader;
