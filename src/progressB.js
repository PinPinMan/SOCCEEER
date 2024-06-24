import React from "react";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import './progressB.css' // Import the custom CSS


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Payment from './Pages/Payment';
// import Login from './Pages/LoginPage';
// import MainMenu from './Pages/MainMenu'
// import History from './Pages/History';
// import Landing from './Pages/LandingPage';
import CarTypes from './Pages/CarType';
import CarInfo from './Pages/CarInfo';
import Payment from "./Pages/Payment";
import CancelButton from "./cancelButton";
// const AppRoutes = () => (
//   <Router>
//     <Routes>
//     <Route path="/" element={<Landing />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/payment/:c" element={<Payment />} />
//     <Route path="/main" element={<MainMenu />} />
//     <Route path="/History" element={<History />} />
//     <Route path="/CarTypes" element={<CarTypes />} />
//     </Routes>
//   </Router>
// );


export const ProgressB = () => {
  const step1Content = <div class='vh-65'><CancelButton/><CarTypes /></div>;
  const step2Content = <div class='vh-65'><CancelButton/><CarInfo/></div>;
  const step3Content = <div class='vh-65'><CancelButton/><Payment/></div>; 
  function step1Validator() {
    if (sessionStorage.getItem('carType') == null) {
        return false;
    } else {
        return true;
    }
  }

  function step2Validator() {
    if (sessionStorage.getItem('carplate') == null) {
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
          label: "Car Plate",
          name: "step 2",
          content: step2Content,
          validator: step2Validator
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
