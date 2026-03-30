import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

export default function FaceDetection() {

    const videoRef = useRef()

    const start = () => {
        debugger
        navigator.mediaDevices.getUserMedia({ video: {} })
            .then(stream => video.srcObject = stream)
            .catch(err => { console.error(err) })
    }

    useEffect(() => {
        console.log('video ref', videoRef);
        console.log('faceapi', faceapi);
        start()
    }, [])

    return (
        <div>
            face detection

            <video id="video" width={720} height={560} autoPlay muted ref={videoRef}></video>
        </div>
    )
}