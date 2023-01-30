import React from "react";
import Button from "./button";
import Link from "next/link";

interface mainPageRHMenuProps {}
const MainageRHMenu = (props: mainPageRHMenuProps) => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", color: "black" }}>
        <div
          style={{
            padding: "10px 0px 10px 0px",
            fontWeight: "bold",
            fontSize: "0.8rem",
          }}
        >
          START EXPLORING THE GALAXY{" "}
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {" "}
          <div style={{ padding: "10px 2.5px 15px 2.5px" }}>
            <Button
              border="none"
              backgroundColor="white"
              color="#757575"
              borderColor="#dbd9d9"
              height="32px"
              onClick={() =>
                window.open(
                  "https://www.tropicalgalaxy.io/u/web3cookies",
                  "_blank"
                )
              }
              radius="2px"
              width="120px"
              children="Web3 Cookies"
              fontSize=""
              fontFamily=""
            />{" "}
          </div>{" "}
          <div style={{ padding: "10px 2.5px 15px 2.5px" }}>
            <Button
              border="none"
              backgroundColor="white"
              color="#757575"
              borderColor="#dbd9d9"
              height="32px"
              onClick={() =>
                window.open("https://www.tropicalgalaxy.io/", "_blank")
              }
              radius="2px"
              width="120px"
              children="Tropical Galaxy"
              fontSize=""
              fontFamily=""
            />{" "}
          </div>{" "}
          <div style={{ padding: "10px 2.5px 15px 2.5px" }}>
            <Button
              border="block"
              backgroundColor="white"
              color="#757575"
              height="32px"
              borderColor="#dbd9d9"
              onClick={() =>
                window.open("https://pluto.tropicalgalaxy.io/login", "_blank")
              }
              radius="2px"
              width="120px"
              children="Pluto"
              fontSize=""
              fontFamily=""
            />
          </div>
        </div>
        <div style={{ width: "70%" }}>
          <hr style={{ width: "100%", color: "black" }}></hr>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {" "}
          <div style={{ display: "flex", paddingRight: "2.5px" }}>
            {" "}
            <Link href={`/about`}>
              <Button
                border="none"
                backgroundColor="white"
                color="#757575"
                height="32px"
                borderColor="white"
                radius="2px"
                width="120px"
                children="About"
                fontSize=""
                fontFamily=""
              />{" "}
            </Link>
            <div style={{ display: "flex", paddingLeft: "2.5px" }}>
              <Button
                border="none"
                backgroundColor="white"
                color="#757575"
                height="32px"
                borderColor="white"
                radius="2px"
                width="120px"
                children="Get free stuff 😎"
                fontSize=""
                fontFamily=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainageRHMenu;
