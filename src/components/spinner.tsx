import { useState, CSSProperties } from "react";
import { BarLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  height: "100vh",
    width: "100vw",
    
};

function Spinner() {


  return (
    <div className="w-screen h-screen ">
    
      <BarLoader
        color={"#37baa8"}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    
  );
}

export default Spinner;