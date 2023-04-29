import { BlockList } from "net";
import React from "react";
import IconInput from "../components/Inputs/IconInput/IconInput";
import { MdOutlineAlternateEmail } from "react-icons/md";

const About = () => {
  return (
    <div>
      <div
        style={{
          height: "100vh",
          display: "flex",
          width: "500px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconInput width="400px">
          <MdOutlineAlternateEmail />
        </IconInput>
      </div>
    </div>
  );
};

export default About;
