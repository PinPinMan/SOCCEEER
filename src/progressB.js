import React from "react";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import './progressB.css' // Import the custom CSS


import CarTypes from './Pages/CarType';
import CarInfo from './Pages/CarInfo';
import Payment from "./Pages/Payment";
import CancelButton from "./cancelButton";
import Camera from "./Pages/camera";

export const ProgressB = () => {
  const step1Content = <div class='vh-65'><CancelButton/><CarTypes /></div>;
  const step2Content = <div class='vh-65'><CancelButton/><CarInfo/></div>;
  const step3Content = <div class='vh-65'><CancelButton/><Payment/></div>;
  const stepCamera = <div class='vh-65'><CancelButton/><Camera/></div>;

  function step1Validator() {
    if (localStorage.getItem('carType') == null) {
        return false;
    } else {
        return true;
    }
  }

  function step2Validator() {
    if (localStorage.getItem('carplate_AI') == null) {
        return false;
    } else {
        return true;
    }
  }
  

  function stepCameraValidator() {
    if (localStorage.getItem('carplate_AI') == null) {
        return false;
    } else {
        return true;
    }
  }


  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }
//   If current window is main dont show the progress bar
    if (window.location.pathname === '/') {
        return null;
    }
  return (
    <StepProgressBar 
      startingStep={0}
      onSubmit={onFormSubmit}
      steps={[
        {
          label: "Select Car Type",
          name: "step 1",
          content: step1Content,
          validator: step1Validator
        },
        {
          label: "Camera",
          name: "step 2",
          content: stepCamera,
          validator: stepCameraValidator
        },
        {
          label: "Car Plate",
          name: "step 3",
          content: step2Content,
        },
        {
          label: "Payment",
          name: "step 3",
          content: step3Content,
        }
      ]}
    />
  );
};
