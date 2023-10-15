import React, { useEffect, useState } from 'react';

const OtpInput = ({ numInputs, setOtp }) => {

  const [tempOtp, setTempOtp] = useState(new Array(numInputs).fill(''));

  useEffect(() => {
    setTempOtp(new Array(numInputs).fill(''))
  }, [numInputs])

  const handleInputChange = (e, index) => {
    const updatedOtp = [...tempOtp];
    updatedOtp[index] = e.target.value;
    setTempOtp(updatedOtp);
    // pass otp to parent
    setOtp(String(updatedOtp.join('')))

    // focus to the next input
    if (e.target.value && index < numInputs - 1) {
      document.getElementById(`tempOtp-input-${index + 1}`).focus();
    }
  };

  const handleInputKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !tempOtp[index]) {
      // If Backspace is pressed, it's not the first input, and the current input is empty, focus on the previous input
      document.getElementById(`tempOtp-input-${index - 1}`).focus();
    }
  }

  return (
    <div className="otpComponent form-group input-group d-flex justify-content-evenly ">
      {tempOtp.map((digit, index) => (
        <input
          key={index}
          id={`tempOtp-input-${index}`}
          type="text"
          className="optInput"
          value={digit}
          autoComplete='off'
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleInputKeyDown(e, index)}
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default OtpInput;
