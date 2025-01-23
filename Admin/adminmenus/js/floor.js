// Function to send data to the server when a new value is input into the input field
async function addFloor() {
  // Get input values
  var floorNumber = document.getElementById("floorNumber").value;
  var floorName = document.getElementById("floorName").value;

  try {
    // Make POST request to server
    const response = await fetch("http://localhost:3000/addfloor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ floorNumber, floorName }),
    });

    if (!response.ok) {
      // Handle error responses
      alert("floor already exists!");
      throw new Error(`Failed to add floor: ${response.statusText}`);
    }

    alert("Floor added successfully");
    displayFloors();
    // console.log("Floor added successfully");

    console.log(response);
    // Clear input fields
    document.getElementById("floorNumber").value = "";
    document.getElementById("floorName").value = "";
  } catch (error) {
    console.error("Error adding floor:", error);
  }
}

// Function to fetch and display all floors
async function displayFloors() {
  try {
    // Make GET request to server to fetch floors
    const response = await fetch("http://localhost:3000/showAllFloors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch floors: ${response.statusText}`);
    }

    const floors = await response.json();

    // Get table body
    var tableBody = document.getElementById("floorTableBody");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Loop through each floor and create table rows
    floors.forEach((floor) => {
      // Create a new row
      var newRow = tableBody.insertRow();
      // Insert cells into the row
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      // Set cell values
      cell1.textContent = floor.floorNumber;
      cell2.textContent = floor.floorName;
      cell3.textContent = floor.Actions;

      // Create edit button
      var editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = function () {
        editFloor(newRow, floor._id, floor.floorNumber, floor.floorName);
      };
      // Append edit button to actions cell
      cell3.appendChild(editButton);

      // Create remove button
      var removeButton = document.createElement("button");
      removeButton.setAttribute("class", "removeBtn");
      removeButton.textContent = "Remove";
      removeButton.onclick = function () {
        removeFloor(floor._id); // Pass the floor ID to the remove function
      };
      cell3.appendChild(removeButton);
      displayFloors()
    });
  } catch (error) {
    console.error("Error fetching floors:", error);
  }
}

async function editFloor(row, floorId, currentFloorNumber, currentFloorName) {
  // Replace text content with input fields for editing
  row.cells[0].innerHTML = `<input type="number" value="${currentFloorNumber}">`;
  row.cells[1].innerHTML = `<input type="text" value="${currentFloorName}">`;

  // Create save button
  var saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.onclick = async function () {
    try {
      var updatedFloorNumber = row.cells[0].querySelector("input").value;
      var updatedFloorName = row.cells[1].querySelector("input").value;

      const response = await fetch(
        `http://localhost:3000/updateFloor/${floorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            floorNumber: updatedFloorNumber,
            floorName: updatedFloorName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update floor: ${response.statusText}`);
      }

      alert("Floor updated successfully");

      // Refresh the floor list
      displayFloors();
    } catch (error) {
      console.error("Error updating floor:", error);
    }
  };

  // Replace edit button with save button
  row.cells[2].innerHTML = "";
  row.cells[2].appendChild(saveButton);
}
async function removeFloor(floorId) {
  try {
    const response = await fetch(
      `http://localhost:3000/removeFloor/${floorId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to remove floor: ${response.statusText}`);
    }

    alert("Floor removed successfully");
    displayFloors();
    // Remove the row from the table
    const tableBody = document.getElementById("floorTableBody");
    const rowToRemove = document.getElementById(floorId);
    tableBody.removeChild(rowToRemove); // Remove the row from the DOM
  } catch (error) {
    console.error("Error removing floor:", error);
  }
}

// Call the displayFloors function to initially display all floors when the page loads
window.onload = displayFloors();
