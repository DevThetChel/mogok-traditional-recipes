import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <footer className="h-[70px] flex flex:col  md:flex-row justify-between items-center px-4 sm:px-13 md:px-20 lg:px-30 xl:px-60">
      <span>Copyright ©2025 | Made with love ❤️</span>
      <div className="flex gap-3 sm:gap-5 md:gap-10 lg:gap-15 items-center">
        <a
          href="https://www.facebook.com/ngelittlekitchen?mibextid=ZbWKwL"
          target="_blank"
        >
          <FontAwesomeIcon icon={faFacebook} className="text-xl lg:text-2xl" />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faEnvelope} className="text-xl lg:text-2xl" />
        </a>
      </div>
    </footer>
  );
};
