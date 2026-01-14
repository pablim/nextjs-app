// import { useEffect, useState, useRef } from "react";
// import { Camera } from "@mediapipe/camera_utils";

// import styles from './styles.module.scss'

// // exemplo
// // https://codepen.io/mediapipe-preview/pen/OJByWQr?editors=0010
export default function FaceDetection() {
//     const videoRef = useRef()
    
//     const [faceDetector, setFaceDetector] = useState();
//     const [results, setResults] = useState()
//     let lastVideoTime = -1

//     // Keep a reference of all the child elements we create
//     // so we can remove them easilly on each render.
//     var children = [];

//     useEffect( () => {
//         start()

//         if (!faceDetector)
//             createFaceDetection()
        
//     }, [])

//     const createFaceDetection = async () => {
//         const {
//             FaceDetector,
//             FilesetResolver
//         } = require("@mediapipe/tasks-vision");

//         const vision = await FilesetResolver.forVisionTasks(
//             "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//         );

//         const faceDetector = await FaceDetector.createFromOptions(vision, {
//             baseOptions: {
//               modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
//               delegate: "GPU"
//             },
//             runningMode: 'VIDEO'
//           }
//         );
        
//         setFaceDetector(faceDetector)
//     }

//     const predictWebcam = () => {
//         let startTimeMs = performance.now();

//         // Detect faces using detectForVideo
//         if (videoRef.current.currentTime !== lastVideoTime) {
//             lastVideoTime = videoRef.current.currentTime;
//             const detections = faceDetector?.detectForVideo(
//                 videoRef.current, 
//                 startTimeMs
//             ).detections;

//             displayVideoDetections(detections, videoRef.current);
//         }
      
//         // Call this function again to keep predicting when the browser is ready
//         window.requestAnimationFrame(predictWebcam);
//     }

//     function displayVideoDetections(detections, video) {
//         debugger
//         console.log(detections);

//         var ctx = canvas.getContext("2d");
//         ctx.drawImage(video, 0, 0);        

//         for (let child of children) {
//             liveView.removeChild(child);
//         }
//         children.splice(0);

//         for (let detection of detections) {

//             var imageData = ctx.getImageData(
//                 // detection.boundingBox.originX, 
//                 // detection.boundingBox.originY, 
//                 // detection.boundingBox.width, 
//                 // detection.boundingBox.height
//                 detection.boundingBox.originX, 
//                 (detection.keypoints[2].y * videoRef.current.offsetHeight) + 10, 
//                 detection.boundingBox.width, 
//                 detection.boundingBox.height
//             )
//             ctx.putImageData(imageData, 0, 0)

//             const highlighter = document.createElement("div");
//             highlighter.setAttribute("class", styles.highlighter);
//             highlighter.style =
//             "left: " + (videoRef.current.offsetWidth -
//                 detection.boundingBox.width -
//                 detection.boundingBox.originX) + "px;" +
//             "top: " + detection.boundingBox.originY + "px;" +
//             "width: " + (detection.boundingBox.width - 10) + "px;" +
//             "height: " + detection.boundingBox.height + "px;" +
//             "";

//             liveView.appendChild(highlighter);

//             // Store drawn objects in memory so they are queued to delete at next call
//             children.push(highlighter);

//             for (let keypoint of detection.keypoints) {
//                 const keypointEl = document.createElement("spam");
//                 keypointEl.className = styles.keypoint;
//                 keypointEl.style.top = `${keypoint.y * videoRef.current.offsetHeight - 3}px`;
//                 keypointEl.style.left = `${
//                     videoRef.current.offsetWidth - keypoint.x * videoRef.current.offsetWidth - 3
//                 }px`;
//                 liveView.appendChild(keypointEl);
//                 children.push(keypointEl);
//             }
//         }
//     }

//     const start = () => {
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then(stream => {
//                 video.srcObject = stream
//             })
//             .catch(err => { console.error(err) })
//     }

//     return (
//         <div >
//             face detection mediapipe

//             <div className={styles.videoView} id="liveView">
//                 <video id="video" className={styles.video} width={640} height={480} autoPlay muted playsinline
//                     ref={videoRef} onLoadedData={predictWebcam}></video>
//             </div>
//             <br /><br />
//             <canvas className={styles.canvas} id="canvas" width="640" height="480"></canvas>
//         </div>
//     )
}