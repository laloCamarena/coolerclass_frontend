import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import asd from './asd.png';

const WatchStream = () => {
    const [img, setImg] = useState(asd);

    useEffect(() => {
        const socket = io('http://localhost:5000/');
        socket.on('get-stream', (image) => {
            setImg(image);
        });
    }, []);

    return (
        <img  src={img} alt="something"/>
    );
}

export default WatchStream;