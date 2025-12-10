import { RightOutlined } from '@ant-design/icons';
import React from 'react';

const ContinueButton = ({ onClick, text }) => {
  return (
    <button
      type="button"
      style={{
        background: "#ff7a00",
        border: "none",
        borderRadius: 10,
        width: "145px",
        height: "40px",
        fontSize: "17px",
        color: "white",
        cursor: "pointer",
        
      }}
      onClick={onClick}
    >
      {text}
      <RightOutlined style={{ fontSize: 13,position:"relative",left:3 }} />
    </button>
  );
};

export default ContinueButton;
