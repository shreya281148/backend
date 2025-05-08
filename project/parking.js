document.addEventListener("DOMContentLoaded", function () {
  let carNumber = localStorage.getItem("carPlateNumber");
  document.getElementById("carNumber").textContent = carNumber;

  let parkingLot = document.getElementById("parkingLot");
  let totalSpaces = 30;
  let occupiedSpaces = JSON.parse(localStorage.getItem("occupiedSpaces")) || {};

  for (let i = 1; i <= totalSpaces; i++) {
    let space = document.createElement("button");
    space.textContent = i;
    space.classList.add("parking-space");

    if (occupiedSpaces[i]) {
      space.classList.add("occupied");
      space.disabled = true;
    }

    space.addEventListener("click", function () {
      if (!occupiedSpaces[i]) {
        occupiedSpaces[i] = carNumber;
        localStorage.setItem("occupiedSpaces", JSON.stringify(occupiedSpaces));
        space.classList.add("occupied");
        space.disabled = true;
        alert(`Parking Space ${i} allocated to ${carNumber}`);
      }
    });

    parkingLot.appendChild(space);
  }
});
