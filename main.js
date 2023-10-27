const canvas = document.getElementById('video-canvas');
const ctx = canvas.getContext('2d');
const ws = new WebSocket('ws://localhost:8000', "demo-chat");

ws.binaryType = 'arraybuffer';

ws.onopen = function () {
  console.log('WebSocket connection opened.');
};

ws.onmessage = function (event) {
  const imageData = new Uint8ClampedArray(event.data);
  const blob = new Blob([imageData], { type: 'image/png' });

  const imageElement = document.createElement('img');
  imageElement.src = URL.createObjectURL(blob);

  imageElement.onload = function () {
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
  };
};

ws.onclose = function (event) {
  if (event.wasClean) {
    console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
  } else {
    console.error('WebSocket connection died');
  }
};

ws.onerror = function (error) {
  console.error(`WebSocket error: ${error.message}`);
};
