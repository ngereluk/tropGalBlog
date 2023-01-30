import React from "react";
import Link from "next/link";
import { useDetectIsMobile } from "../hooks/useDetectIsMobile";

const Header = () => {
  const isMobile = useDetectIsMobile();
  console.log("isMobile ", isMobile);
  return (
    <div
      style={{
        padding: isMobile ? "1% 3% 1% 0%" : "5px 10px 5px 0px",
        display: "flex",
        flexDirection: "row",
        height: "20%",
        backgroundColor: "white",
        minHeight: "9vh",
        boxShadow: "0px 2px 5px grey",
      }}
    >
      <div style={{ paddingLeft: isMobile ? "6%" : "180px" }}>
        <Link href={`/`}>
          <img src={"/doomer.png"} alt="tmp" style={{ maxHeight: "7vh" }} />{" "}
        </Link>
      </div>
      <div style={{ display: "flex", flexGrow: "1" }}></div>
    </div>
  );
};

export default Header;
