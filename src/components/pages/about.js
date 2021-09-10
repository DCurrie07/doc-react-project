import { convertToRaw } from "draft-js";
import React from "react";
import profilePicture from "../../../static/assets/images/bio/headshot.jpg";

export default function() {
  return (
    <div className="content-page-wrapper">
      <div 
      className="left-column" 
      style={{
        background: "url(" + profilePicture + ") no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      />
      <div className="right-column">
        Bio info 
      </div>
    </div>
  );
}