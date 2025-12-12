import React from "react";
import { Input } from "antd";
import UseScreenSize from "./UseScreenSize";

const FloatingInput = ({
  label,
  value,
  onChange,
  error,
  type = "text",
  disable = Boolean 
}) => {
  const [focused, setFocused] = React.useState(false);
  const {isMobile} = UseScreenSize();
  

  return (
    <div >
      <div
        style={{
          position: "relative",
          borderRadius: 10,
          border: error
            ? "2px solid #e74c3c"
            : focused
            ? "2px solid #0770e4"
            : "1.5px solid #c9c9c9",
          height: 50,
          display: "flex",
          alignItems: "center",
          paddingLeft: 12,
          paddingRight: 12,
          background: "#fff",
          transition: "0.2s ease",
          width:isMobile?"80%":"100%"
        }}
      >
        <input
          type={type}
          value={value}
          // disabled={disable}
          onFocus={() => setFocused(true)} 
          onBlur={() => setFocused(false)}
          onChange={onChange}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            fontSize: 16,
            fontWeight: 500,
            background: "transparent",
          }}
        />

        {/* Floating Label */}
        <label
          style={{
            position: "absolute",
            top: focused || value ? "-10px" : "14px",
            left: focused || value ? "12px" : "12px",
            fontSize: focused || value ? 12 : 16,
            color: error
              ? "#e74c3c"
              : focused
              ? "#0770e4"
              : "#7f8c8d",
            background: focused || value ? "#fff" : "transparent",
            padding: "0 4px" ,
            transition: "0.2s ease",
            pointerEvents: "none", 
          }}
        >
          {label}
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <p
          style={{
            color: "#e74c3c",
            fontSize: 12,
            marginTop: 4,
            marginLeft: 4,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
export default FloatingInput;