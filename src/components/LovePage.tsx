import React, { useState,useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/router";

const LoveCalculator = () => {
  const timestamp = Date.now();
  const loveinfo = {
    name: "",
    partner: "",
    message: "",
    createdAt: timestamp.toString(),
  };
  const router = useRouter();
  const { slug } = router.query;

  const resetData = () => {
    setLove(loveinfo);
  };

  

 


  const [love, setLove] = useState(loveinfo);
  const [showNameWarning, setshowNameWarning] = useState(false);
  const [showPartnerWarning, setShowPartnerWarning] = useState(false);
  const [showMessageWarning, setShowMessageWarning] = useState(false);

  const {addLove,resultPrank} = useContext(AuthContext);

  const handleNameFocus = () => {
    setshowNameWarning(true);
  };

  const handleNameBlur = () => {
    setshowNameWarning(false);
  };

  const handlePartnerFocus = () => {
    setShowPartnerWarning(true);
  };

  const handlePartnerBlur = () => {
    setShowPartnerWarning(false);
  };

  const handleMessageFocus = () => {
    setShowMessageWarning(true);
  };

  const handleMessageBlur = () => {
    setShowMessageWarning(false);
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setLove({ ...love, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //validate
    if (love.name.length < 3) {
        setshowNameWarning(true);
        return;
    }
    if (love.partner.length < 3) {
        setShowPartnerWarning(true);
        return;
    }
    if (love.message.length < 3) {
        setShowMessageWarning(true);
        return;
    }
    console.log(love);
    addLove(love,slug as string);
    resultPrank();
    resetData();
  };

  const isInputInvalid = (inputName: keyof typeof love) => {
    const inputValue = love[inputName];
  
    if (typeof inputValue === "string") {
      return inputValue.length < 3;
    }
  
    // Handle the case when `inputValue` is of type `Timestamp`
    return false; // Or any other appropriate logic for handling `Timestamp`
  };
  
  return (
    <>
      <div
        className="wrapper w-screen h-screen bg-cover"
        style={{ backgroundImage: "url(love.jpg)" }}
      >
        <div className="flex justify-center">
          <div className="text-center mt-14">
            <h1 className="text-4xl font-bold text-white">Love Calculator</h1>
            <p className="text-white">
              Find out how much your partner loves you
            </p>
            <form className="mt-10">
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <label className="text-white">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={love.name}
                      placeholder="Enter your name"
                      onChange={handleInput}
                      onFocus={handleNameFocus}
                      onBlur={handleNameBlur}
                      className={`border-2 border-white rounded-md p-2 ${
                        isInputInvalid("name") ? "border-red-500" : ""
                      }`}
                    />
                    {showNameWarning && isInputInvalid("name") && (
                      <p className="text-red-500">
                        Minimum length should be 3 characters
                      </p>
                    )}

                    <label className="text-white">Your Partner&apos;s Name</label>
                    <input
                      type="text"
                      value={love.partner}
                      onChange={handleInput}
                      name="partner"
                      placeholder="Enter your partner's name"
                      onFocus={handlePartnerFocus}
                      onBlur={handlePartnerBlur}
                      className={`border-2 border-white rounded-md p-2 ${
                        isInputInvalid("partner") ? "border-red-500" : ""
                      }`}
                    />
                    {showPartnerWarning && isInputInvalid("partner") && (
                      <p className="text-red-500">
                        Minimum length should be 3 characters
                      </p>
                    )}

                    <div className="flex justify-center items-center mt-5">
                      <div className="flex flex-col">
                        <label className="text-white">Message</label>
                        <textarea
                          name="message"
                          value={love.message}
                          onChange={handleInput}
                          placeholder="What do you like about your partner"
                          onFocus={handleMessageFocus}
                          onBlur={handleMessageBlur}
                          className={`border-2 border-white rounded-md p-2 ${
                            isInputInvalid("message") ? "border-red-500" : ""
                          }`}
                          rows={5}
                          cols={25}
                        />
                        {showMessageWarning && isInputInvalid("message") && (
                          <p className="text-red-500">
                            Minimum length should be 3 characters
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="bg-white text-black rounded-md p-2 mt-5"
                    >
                      Calculate Love Percentage
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoveCalculator;
