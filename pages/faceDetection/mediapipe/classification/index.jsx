// import { useEffect, useState, useRef } from "react";
// import { Camera } from "@mediapipe/camera_utils";

export default function FaceDetection() {
//     const videoRef = useRef()
//     const [imageClassifier, setImageClassifier] = useState();
//     const [faceDetector, setFaceDetector] = useState();
//     const [results, setResults] = useState()
//     // exemplo
//     //https://codepen.io/mediapipe-preview/pen/BaVZejK?editors=0010
//     const createImageClassifier = async () => {
//         const {
//             ImageClassifier,
//             FilesetResolver
//         } = require("@mediapipe/tasks-vision");

//         const vision = await FilesetResolver.forVisionTasks(
//             "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/wasm"
//         );
        
//         const imageClassifier = await ImageClassifier.createFromOptions(vision, {
//             baseOptions: {
//               modelAssetPath: `https://storage.googleapis.com/mediapipe-models/image_classifier/efficientnet_lite0/float32/1/efficientnet_lite0.tflite`,
//               // NOTE: For this demo, we keep the default CPU delegate.
//               delegate: "GPU"
//             },
//             maxResults: 1,
//             runningMode: "VIDEO"
//         });

//         console.log('imageClassifier 1', imageClassifier);

//         setImageClassifier(imageClassifier)
//     }

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

//     useEffect( () => {
//         start()

//         const { 
//             FaceMesh, 
//             FACEMESH_TESSELATION,
//             FACEMESH_FACE_OVAL
//         } = require("@mediapipe/face_mesh");
        
//         const faceMesh = new FaceMesh({
//             locateFile: (file) => {
//                 return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
//             },
//         });

//         faceMesh.setOptions({
//             maxNumFaces: 1,
//             refineLandmarks: true,
//             enableFaceGeometry: false,
//             enableSegmentation: true,
//             smoothSegmentation: true,
//             minDetectionConfidence: 0.5,
//             minTrackingConfidence: 0.5,
//         });
    
//         faceMesh.onResults((results) => {
//             onResults(
//                 results, 
//                 FACEMESH_TESSELATION, 
//                 FACEMESH_FACE_OVAL,
//                 document.getElementById("canvas3")
//             );
//         });

//         if (typeof videoRef.current !== undefined && videoRef.current !== null) {
//             const cam = new Camera(videoRef.current, {
//                 onFrame: async () => {
//                     await faceMesh.send({ image: videoRef.current });
//                 },
//                 width: 720,
//                 height: 560,
//             });
//             cam.start();
//             //setCameraObject(cam);
//         }

//         if (!imageClassifier)
//             createImageClassifier()

//         if (!faceDetector)
//             createFaceDetection()
        
//     }, [])

//     const getClassification = () => {
//         if (imageClassifier) {

//             const classificationResult = imageClassifier?.classifyForVideo(
//               videoRef.current,
//               performance.now()
//             );
      
//             const classifications = classificationResult?.classifications
      
//             if (classifications) {
//                 // console.log(
//                 //     "Classification: " + classifications[0].categories[0].categoryName +
//                 //     "\n Confidence: " +
//                 //     Math.round(parseFloat(classifications[0].categories[0].score) * 100) +
//                 //     "%"
//                 // );

//                 setResults(`${classifications[0].categories[0].categoryName} - ${Math.round(parseFloat(classifications[0].categories[0].score) * 100)}`)
//             }

//             window.requestAnimationFrame(getClassification);
//         }
//     }
    
//     const start = () => {
//         navigator.mediaDevices.getUserMedia({ video: {} })
//             .then(stream => video.srcObject = stream)
//             .catch(err => { console.error(err) })
//     }

//     const onResults = (
//         results, 
//         FACEMESH_TESSELATION, 
//         FACEMESH_FACE_OVAL, 
//         cavas
//     ) => {
//         debugger

//         if (results.multiFaceLandmarks) {
//             const ctx = cavas.getContext("2d");
//             ctx.drawImage(
//                 results.image,
//                 0,
//                 0,
//                 cavas.width,
//                 cavas.height
//             );

//             let coordinates = {};

//             for (const landmarks of results.multiFaceLandmarks) {
//                 coordinates = {
//                     topLimit: landmarks[2],
//                     bottomLimit: landmarks[152],

//                     rightLimit: landmarks[323],
//                     leftLimit: landmarks[93],
//                 }
//             }
//         }
//     }

//     function captureVideo(video) {
//         debugger
        
//         var canvas = document.getElementById("currentFrame");
        
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         var canvasContext = canvas.getContext("2d");

//         canvasContext.drawImage(video, 0, 0);

//         var imageData = canvasContext.getImageData(200, 280, 200, 100)
//         console.log('imageData', imageData);
//         let relevantGrayCount = 0
//         for (let i = 0; i < imageData.data.length; i += 4) {
//             //console.log('rgba', `${imageData.data[i]}, ${imageData.data[i+1]}, ${imageData.data[i+2]}`);
//             //imageData.data[i+3] alpha

//             imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = (
//                 (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3
//             )

//             relevantGrayCount += (imageData.data[i] < 102) && 1 
//         }
        
//         let percent = (relevantGrayCount * 100) / imageData.data.length

//         var canvasCopy = document.getElementById("copyFrame");
//         var canvasCopyContext = canvasCopy.getContext("2d")

//         var newImageData = canvasCopyContext.createImageData(canvas.width, canvas.height)
//         //canvasCopyContext.putImageData(imageData, 0, 0, 100, 100, 100, 100)
//         canvasCopyContext.putImageData(imageData, 0, 0)

//         alert('percent: ' + percent)
//         //return canvas.toDataURL('image/png');
//     }

//     return (
//         <div>
//             face detection mediapipe

//             <video id="video" width={720} height={560} autoPlay muted 
//                 ref={videoRef} onLoadedData={getClassification}></video>

//             <div>
//                 {results}
//             </div>

//             <button onClick={() => captureVideo(video)}>capture</button>
//             <canvas id="currentFrame"></canvas>
//             <br /><br />

//             <canvas id="copyFrame" width="720" height="560"></canvas>

//             <br /><br />
//             <canvas id="canvas3" width="720" height="560"></canvas>
//         </div>
//     )
}