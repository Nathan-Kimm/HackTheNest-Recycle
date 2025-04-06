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
    plasticType = ["#1 PETE (Polyethylene Terephthalate)", "#2 HDPE (High-Density Polyethylene)", "#3 PVC (Polyvinyl Chloride)", 
                   "#4 LDPE (Low-Density Polyethylene)", "#5 PP (Polypropylene)", "#6 PS (Polystyrene)",
                   "#7 PS (Polystyrene)", "#8 ABA (Acrylonitrile-butadiene-acrylate)"]
    howToRecycle = ["RECYCLABLE - Widely recycled into new products like clothing, insulation, and containers.", "RECYCLABLE - Easily recycled into products like plastic lumber, recycling bins, and containers.", "NOT RECYCLABLE - Due to toxic chemicals, PVC is difficult to recycle, but it can sometimes be repurposed for things like tiles or flooring.", "RECYCLABLE - Less commonly recycled, but can be processed into new bags, floor tiles, or trash can liners.", "RECYCLABLE - Recycled into products like automotive parts, containers, and brooms.", "NOT RECYCLABLE - Polystyrene is often not recycled due to its fragility and difficulty in processing, though it can sometimes be turned into insulation or other items.", "NOT RECYCLABLE - This category includes a mix of plastics, some of which are difficult to recycle due to the variety of materials involved. However, some can be turned into plastic lumber or other custom products.", "NOT RECYCLABLE - Rigid plastic containers that are made with multiple types of plastics or materials that are difficult to recycle"]

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
