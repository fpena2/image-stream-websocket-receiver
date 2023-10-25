import './style.css'
import Peer from 'peerjs';

const clientPeer = new Peer();

clientPeer.on('open', (id) => {
  console.log('Client Peer ID is: ' + id);

  const serverConn = clientPeer.connect('server-peer-id');
});

clientPeer.on('call', (call) => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((localStream) => {
      call.answer(localStream);
      call.on('stream', (remoteStream) => {
        const videoElement = document.createElement('video');
        document.body.appendChild(videoElement);
        videoElement.srcObject = remoteStream;
      });
    })
    .catch((error) => {
      console.error('Error accessing the webcam:', error);
    });
});
