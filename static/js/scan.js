function sendData(data){
    fetch('/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        displayData(result.prediction);
    })
    .catch(error => console.error('Error:', error));
}

function displayData(type){
    plasticType = ["Plastic Type 1", "Plastic Type 2", "Plastic Type 3", 
                   "Plastic Type 4", "Plastic Type 5", "Plastic Type 6",
                   "Plastic Type 7", "Plastic Type 8"]
    howToRecycle = ["h", "e", "l", "l", "l", "l", "l", "o"]

    document.getElementById("type").innerHTML = "Plastic Type: " + plasticType[type - 1];
    document.getElementById("recycle").innerHTML = "How to Recycle: " + howToRecycle[type - 1];
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
