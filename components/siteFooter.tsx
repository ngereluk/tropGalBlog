import React from "react";
import Link from "next/link";

interface siteFooterProps {}
const SiteFooter = (props: siteFooterProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        paddingTop: "30px",
        paddingBottom: "20px",
        alignItems: "left",
        paddingLeft: "10%",
        paddingRight: "10%",
        boxShadow: "0px 2px 10px grey",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          id="footerTopHalf"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "10px",
            paddingTop: "10px",
          }}
        >
          <div
            id="doomerAndRestStop"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img
              src="/doomer.png"
              alt="SVG as an image"
              style={{ height: "8vh", paddingRight: "12px" }}
            />{" "}
            <div
              id="restStop"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontWeight: "600",
                  fontSize: "1.5em",
                }}
              >
                Galactic Rest Stop
              </div>{" "}
            </div>
          </div>
          <div
            id="footerMenu"
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                paddingRight: "15px",
                color: "#737373",
              }}
            >
              <Link href={`/about`}>About </Link>
            </div>
          </div>
        </div>
        <hr style={{ display: "flex", width: "100%" }} />
        <div
          id="footerBottomHalf"
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "5px",
            paddingBottom: "15px",
          }}
        >
          <img
            src="/planet.svg"
            alt="SVG as an image"
            style={{ height: "2vh", paddingRight: "12px" }}
          />{" "}
          <div style={{ display: "flex", color: "#757575" }}>
            {" "}
            Tropical Galaxy Inc. © 2022
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default SiteFooter;
