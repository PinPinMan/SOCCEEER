import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyCP3MjsS3HMbCgC0zBRy212ZNTPYjOeBfs');

function Camera() {
  const videoRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  useEffect(() => {
    let video = videoRef.current;
  
    const startVideoStream = (constraints) => {
      navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Something went wrong!", error);
          if (!isFrontCamera && error.name === 'OverconstrainedError') {
            // Fall back to the front camera if back camera is not available
            navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
              .then(function (stream) {
                video.srcObject = stream;
              })
              .catch(function (fallbackError) {
                console.log("Fallback to front camera also failed!", fallbackError);
              });
          }
        });
    };
  
    if (navigator.mediaDevices.getUserMedia && showCamera) {
      let constraints
      if (isFrontCamera){
        constraints = { video: { facingMode: "user" } };
      } else {
        constraints = { video: { facingMode: "environment" } };
      }
      startVideoStream(constraints);
    } else if (!navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia not supported!");
    }
  }, [showCamera, isFrontCamera]);
  

  const toggleContainer = () => {
    setShowCamera(!showCamera);
  };

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  async function uploadImage() {
    let video = videoRef.current;
    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let imageDataURL = canvas.toDataURL("image/png");
    let base64Image = imageDataURL.split(',')[1];

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = "Read the car plate of this image and return the car plate only and if you are unable to detect it return with the statement 'Unable to find the car Plate'";
      const image = {
        inlineData: {
          data: base64Image,
          mimeType: "image/png",
        },
      };

      const result = await model.generateContent([prompt, image]);
      console.log(result.response.text());
    } catch (error) {
      console.error("Error sending image to Gemini API:", error);
    }
  }

  return (
    <div className="Camera" style={{ margin: '50px' }}>
      <h1 style={{ fontFamily: 'sans-serif', color: '#333' }}>Display Webcam Stream</h1>

      <div id="container" style={{ margin: '0px auto', width: '500px', height: '375px', border: '10px #333 solid', display: showCamera ? 'block' : 'none' }}>
        <video ref={videoRef} autoPlay={true} id="videoElement" style={{ width: '500px', height: '375px', backgroundColor: '#666' }}></video>
      </div>
      <button id="button" onClick={toggleContainer}>
        {showCamera ? 'Unshow Camera' : 'Show Camera'}
      </button>
      <button id="toggleCameraButton" onClick={toggleCamera} style={{ display: showCamera ? 'block' : 'none' }}>
        {isFrontCamera ? 'Switch to Back Camera' : 'Switch to Front Camera'}
      </button>
      <button id="ScanButton" onClick={uploadImage} style={{ display: showCamera ? 'block' : 'none' }}>
        Scan
      </button>
    </div>
  );
}

export default Camera;