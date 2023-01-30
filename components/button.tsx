import React from "react";

interface Props {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string;
  width: string;
  backgroundColor: string;
  borderColor: string;
  fontSize: string;
  fontFamily: string;
}

const Button: React.FC<Props> = ({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
  backgroundColor,
  borderColor,
  fontSize,
  fontFamily,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor,
        color: color,
        border,
        borderRadius: radius,
        height,
        width,
        borderColor: borderColor,
        fontSize: fontSize,
        fontFamily: fontFamily,
        borderStyle: "solid",
        borderWidth: "1px",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
