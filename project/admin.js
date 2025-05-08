// // Dummy data for current parked cars
// let parkedCars = [
//   { carNumber: "MH12AB1234", slot: 1, entryTime: "2025-04-22 10:30 AM" },
//   { carNumber: "KA01A1234", slot: 2, entryTime: "2025-04-22 11:00 AM" },
//   // You can dynamically load data from local storage or server here
// ];

// // Load parked cars on page load
// window.onload = function () {
//   displayParkedCars();
// };

// // Function to display parked cars in the table
// function displayParkedCars() {
//   let tableBody = document.querySelector("#parkingTable tbody");
//   tableBody.innerHTML = ""; // Clear previous data

//   parkedCars.forEach((car, index) => {
//     let row = document.createElement("tr");
//     row.innerHTML = `
//             <td>${car.carNumber}</td>
//             <td>${car.slot}</td>
//             <td>${car.entryTime}</td>
//             <td><button onclick="exitCar(${index})">Exit</button></td>
//         `;
//     tableBody.appendChild(row);
//   });
// }

// // Function to mark a car as exited and free the parking slot
// function exitCar(index) {
//   let car = parkedCars[index];
//   alert(`Car ${car.carNumber} has exited the parking lot.`);

//   // Remove car from parkedCars array
//   parkedCars.splice(index, 1);

//   // Re-display the updated parking lot
//   displayParkedCars();

//   // Optionally, save the updated parking data (e.g., in local storage or server)
// }
