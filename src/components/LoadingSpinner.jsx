import React from "react";
import Spinner from "../assets/loading-spinner.svg?react"
import { motion } from "motion/react";

const LoadingSpinner = ({ size }) => {
  if (size == null || size == '') {
    size = 10;
  }
  
  return (
    <div>
      <motion.div
        className={`flex items-center`}
        style={{ height: size, width: size}}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Spinner />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
