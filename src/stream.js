import React, {useEffect, useRef} from 'react';
import io from 'socket.io-client';
import Webcam from 'webcam-easy';

const Stream = () => {
    let webcamElement = useRef(null);
    let canvasElement = useRef(null);
    let snapSoundElement = useRef(null);
    let webcam = useRef(null);
    let context = useRef(null);

    useEffect(() => {
        webcamElement.current = document.getElementById('webcam');
        canvasElement.current = document.getElementById('canvas');
        snapSoundElement.current = document.getElementById('snapSound');
        webcam.current = new Webcam(webcamElement.current, 'user', canvasElement.current, snapSoundElement.current);

        context.current = canvasElement.current.getContext('2d');
        canvasElement.current.width = 512;
        canvasElement.current.height = 384;
        context.current.width = 512;
        context.current.height = 384;

        let interval = null;
        let streaming = false;
        const socket = io('http://localhost:5000/');
        document.getElementById('btn').addEventListener('click', () => {
            if(!streaming) {
                webcam.current.start()
                .then(result =>{
                    console.log('webcam started');
                })
                .catch(err => {
                    console.log(err);
                });
                interval = setInterval(() => {
                    context.current.drawImage(webcamElement.current, 0, 0, context.current.width, context.current.height);
                    socket.emit('stream', canvasElement.current.toDataURL('image/webp'));
                }, 1000/10);
            } else {
                clearInterval(interval);
                webcam.current.stop();
            }
            streaming = !streaming;
        });

        return function cleanup() {
            webcam.current.stop();
        }
    }, [])

    // const stream = () => {
    //     if(!streaming) {
    //         webcam.current.start()
    //         .then(result =>{
    //             console.log('webcam started');
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //         interval = setInterval(() => {
    //             console.log('transmiting');
    //             context.current.drawImage(webcamElement.current, 0, 0, context.current.width, context.current.height);
    //             socket.emit('stream', canvasElement.current.toDataURL('image/webp'));
    //         }, 1000/10);
    //     } else {
    //         clearInterval(interval);
    //         webcam.current.stop();
    //     }
    //     setStreaming(streaming => !streaming);
    // }

    return(
        <div>
            <h1>Video stream</h1>
            <button id="btn">Start stream</button>
            <video id="webcam" autoPlay playsInline width="640" height="480" ref={webcamElement}></video>
            <canvas id="canvas" className="d-none" width="640" height="480" ref={canvasElement}></canvas>
            <audio id="snapSound" src="audio/snap.wav" preload = "auto" ref={snapSoundElement}></audio>
            <div className="status"></div>
        </div>
    );
}

export default Stream;