import React, { useState } from "react";
import Image from "next/image";
import { type } from "os";

const LoveCalculator = () => {
  const loveinfo = {
    name: "",
    partner: "",
    message: "",
  };

  const [love, setLove] = useState(loveinfo);
  const [showNameWarning, setshowNameWarning] = useState(false);
  const [showPartnerWarning, setShowPartnerWarning] = useState(false);
  const [showMessageWarning, setShowMessageWarning] = useState(false);

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
  };

  const isInputInvalid = (inputName: keyof typeof love) => {
    return love[inputName].length < 3;
  };

  return (
    <>
      <div
        className="wrapper w-screen h-screen bg-cover"
        style={{ backgroundImage: "url(love.jpg)" }}
      >
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
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
                      className="bg-white text-blue-500 rounded-md p-2 mt-5"
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
