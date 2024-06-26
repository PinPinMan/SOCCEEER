import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Button from '@mui/material/Button';

const genAI = new GoogleGenerativeAI('AIzaSyD1XFHZn-hevDRGyP3fHLft27TNd74ojPY');

function Camera() {
    const videoRef = useRef(null);
    const [showCamera, setShowCamera] = useState(true);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
  
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
        const constraints = { video: { facingMode: isFrontCamera ? "user" : { exact: "environment" } } };
        startVideoStream(constraints);
      } else if (!navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia not supported!");
      }
    }, [showCamera, isFrontCamera]);
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

      const prompt = "Read the car plate of this image and return the car plate only and if you are unable to detect it return with the statement 'Unable to find the car Plate'. -context we are students trying to see wether computer vision is able to read text.";
      const image = {
      inlineData: {
              data: base64Image,
              mimeType: "image/png",
          },
      };

      const result = await model.generateContent([prompt, image]);
      console.log(result.response.text());
      localStorage.setItem('carplate_AI',result.response.text())

    //   if (result.response.text().length > 10){
    //     window.location.reload();
    //   }
    } catch (error) {
      console.error("Error sending image to Gemini API:", error);
    //   window.location.reload();
    }
  }

  return (
    <div className="Camera" style={{ margin: '50px','display': 'block','justifyContent': 'center','alignItems': 'center'}} >
      <h1 style={{ fontFamily: 'sans-serif', color: '#333', textAlign:'center' }}>Display Webcam Stream</h1>

      <div id="container" style={{ margin: '0px auto', display: showCamera ? 'block' : 'none', width: '100%', height: '100%' }}>
        <video ref={videoRef} autoPlay={true} id="videoElement" style={{ width: '100%', height: '100%'}}></video>
      </div>
      <Button
                  fullWidth
                  variant="contained"
                  onClick={toggleCamera}
                  sx={{
                    marginTop:'5%',
                    height: '5vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: showCamera ? 'block' : 'none',
                    fontSize:'20px'
                  }}
                >
        {isFrontCamera ? 'Switch to Back Camera' : 'Switch to Front Camera'}
        </Button>


        <Button
                fullWidth
                variant="contained"
                onClick={uploadImage}
                sx={{
                marginTop:'5%'
                ,height: '15vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                display: showCamera ? 'block' : 'none',
                fontSize:'40px'
                }}
            >
                  Scan Car
        </Button>

    </div>
  );
}

export default Camera;
