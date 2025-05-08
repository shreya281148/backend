let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Start the camera
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => console.error("Error accessing camera:", err));

function capturePhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Enhance image for OCR
  ctx.filter = "grayscale(100%) contrast(250%) brightness(150%)";
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  let imageData = canvas.toDataURL("image/png");
  localStorage.setItem("carPlatePhoto", imageData);

  alert("Photo captured! Processing number plate...");
  recognizeTextOffline(imageData);
}

function recognizeTextOffline(imageData) {
  const image = new Image();
  image.src = imageData;

  image.onload = function () {
    Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        console.log("Raw OCR Text:", text);
        let cleanedText = formatNumberPlate(text);
        document.getElementById("numberPlate").value = cleanedText;
        document.getElementById("detectedNumber").textContent =
          cleanedText || "No number detected";
      })
      .catch((err) => {
        console.error("OCR Error:", err);
        alert("Failed to recognize number. Try again.");
        document.getElementById("detectedNumber").textContent = "OCR failed";
      });
  };
}

function formatNumberPlate(text) {
  let cleanedText = text.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  console.log("Cleaned OCR Text:", cleanedText);

  const platePatterns = [
    /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/, // MH12AB1234
    /^[A-Z]{2}\d{2}[A-Z]\d{4}$/, // KA01A1234
    /^[A-Z]{3}\d{4}$/, // DLX1234
  ];

  let isValid = platePatterns.some((regex) => regex.test(cleanedText));
  return isValid ? cleanedText : "Invalid Plate";
}

function verifyCar() {
  let number = document.getElementById("numberPlate").value.trim();

  if (!number || number === "Invalid Plate") {
    alert("Please enter a valid number plate!");
    return;
  }

  // Load previous parking data
  let parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];

  // Define possible slots (expand as needed)
  let availableSlots = ["A1", "A2", "A3", "B1", "B2"];
  let usedSlots = parkingData
    .filter((entry) => entry.status === "Occupied")
    .map((entry) => entry.slotNumber);

  // Find first available slot
  let slot = availableSlots.find((s) => !usedSlots.includes(s));

  if (!slot) {
    alert("All parking slots are full!");
    return;
  }

  // Save this entry temporarily
  parkingData.push({
    carNumber: number,
    slotNumber: slot,
    status: "Occupied",
    isResident: null,
  });
  localStorage.setItem("parkingData", JSON.stringify(parkingData));
  localStorage.setItem("lastEntryCar", number);

  // Show modal popup
  document.getElementById("popupCarNumber").textContent =
    number + " (Slot: " + slot + ")";
  document.getElementById("popupModal").style.display = "block";
}

// User confirms it's a resident
function grantAccess() {
  document.getElementById("popupModal").style.display = "none";

  let number = localStorage.getItem("lastEntryCar");
  let parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];

  // Mark the car as a resident
  for (let entry of parkingData) {
    if (entry.carNumber === number && entry.isResident === null) {
      entry.isResident = true;
      break;
    }
  }

  localStorage.setItem("parkingData", JSON.stringify(parkingData));
  alert("Access Granted! Welcome, resident.");
}

// User confirms it's a visitor
function redirectToParking() {
  document.getElementById("popupModal").style.display = "none";

  let number = localStorage.getItem("lastEntryCar");
  let parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];

  // Mark the car as a visitor
  for (let entry of parkingData) {
    if (entry.carNumber === number && entry.isResident === null) {
      entry.isResident = false;
      break;
    }
  }

  localStorage.setItem("parkingData", JSON.stringify(parkingData));
  window.location.href = "parking.html";
}
