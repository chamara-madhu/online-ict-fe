import React from "react";
import Gold from "../../assets/icons/medals/gold.png";
import Silver from "../../assets/icons/medals/silver.png";
import Bronze from "../../assets/icons/medals/bronze.png";
import { MEDALS } from "../../constants/base";

const Medal = ({ medal, className }) => {
  return (
    <img
      className={className}
      src={
        medal === MEDALS.GOLD ? Gold : medal === MEDALS.SILVER ? Silver : Bronze
      }
      alt="medal"
    />
  );
};

export default Medal;
