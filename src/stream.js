import React, {useEffect} from 'react';
import io from 'socket.io-client';

const Stream = () => {
    useEffect(() => {
        let webcamElement = document.getElementById('webcam');
        let canvasElement = document.getElementById('canvas');
        canvasElement.style.display = 'none';
        let context = canvasElement.getContext('2d');
        canvasElement.width = 512;
        canvasElement.height = 384;
        context.width = 512;
        context.height = 384;

        let interval = null;
        let streaming = false;
        const socket = io('http://localhost:5000/');
        document.getElementById('btn').addEventListener('click', () => {
            if(!streaming) {
                navigator.getUserMedia = (
                    navigator.getUserMedia ||
                    navigator.webkitUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msgGetUserMedia);
                if(navigator.getUserMedia) {
                    navigator.getUserMedia({video: true, audio: true},
                        (stream) => {
                            webcamElement.srcObject = stream;
                            console.log('Camera loaded');
                        },
                        () => {'Could not load the camera'});
                }
                interval = setInterval(() => {
                    context.drawImage(webcamElement, 0, 0, context.width, context.height);
                    socket.emit('stream', canvasElement.toDataURL('image/webp'));
                }, 1000/10);
            } else {
                clearInterval(interval);
                webcamElement.srcObject.getTracks().forEach(track => {
                    track.stop();
                });
            }
            streaming = !streaming;
        });

        return function cleanup() {
            webcamElement.srcObject.getTracks().forEach(track => {
                track.stop();
            });
        }
    }, [])

    return(
        <div>
            <h1>Video stream</h1>
            <button id="btn">Start stream</button>
            <video id="webcam" autoPlay={true} width="640" height="480"></video>
            <canvas id="canvas" className="d-none" width="640" height="480"></canvas>
            {/* <audio id="snapSound" src="audio/snap.wav" preload = "auto"></audio> */}
            <div className="status"></div>
        </div>
    );
}

export default Stream;