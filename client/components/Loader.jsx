import React from "react";

import "../public/styles/loader.scss";

export default function Loader() {
  return (
    <>
      <svg
        height="0px"
        width="0px"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
            />
          </filter>
        </defs>
      </svg>
      <div className="gooey-loader">
        <div className="dot-1"></div>
        <div className="dot-2"></div>
        <div className="dot-3"></div>
      </div>
    </>
  );
}
