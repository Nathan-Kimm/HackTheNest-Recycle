function sendData(data){
    fetch('/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
}

const current = location.pathname
document.querySelectorAll('.bottom-nav a').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });

const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureButton = document.getElementById('captureButton');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'environment' 
            }
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing the camera", err);
        alert("Error accessing the camera: " + err.message);
    }
}

captureButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    sendData({ image: imageDataUrl });
});

window.addEventListener('load', startCamera);
