const imageElement = document.getElementById("live-image");
const ws = new WebSocket('ws://localhost:8000', "demo-chat");
ws.binaryType = 'arraybuffer';

ws.onopen = function () {
  console.log('WebSocket connection opened.');
};

ws.onmessage = function (event) {
  const blob = new Blob([event.data], { type: 'image/png' });
  const imageUrl = URL.createObjectURL(blob);
  imageElement.src = imageUrl;
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