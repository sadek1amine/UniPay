
import React from 'react';



const HeaderBox: React.FC<HeaderBoxProps> = ({ type, title, user, subtext }) => {
  return (
    <div className="header-box">
      <h1 className = "header-box-title">
        {title}
        {type == 'greeting'&& (
           <span className="text-violet-700">&nbsp;{user}</span>

        )}</h1>
      <p className = "header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
