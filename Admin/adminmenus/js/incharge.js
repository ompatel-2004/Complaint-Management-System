async function populateFloorDropdown(event) {
  try {
    const response = await fetch("http://localhost:3000/showAllFloors");
    const showAllFloors = await response.json();
    const FloorSelect = document.getElementById("FloorSelect");

    if (!FloorSelect) {
      console.error("Error: FloorSelect element not found.");
      return;
    }
    // Populate dropdown with Floor numbers
    showAllFloors.forEach((floor) => {
      const option = document.createElement("option");
      option.value = floor.floorNumber;
      option.textContent = `${floor.floorNumber} - ${floor.floorName}`;
      FloorSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching Floors:", error);
  }
}

async function populateUserDropdown(event) {
  try {
    const response = await fetch("http://localhost:3000/showAllUsers");
    const showAllUsers = await response.json();
    const InchargeSelect = document.getElementById("InchargeSelect");

    if (!InchargeSelect) {
      console.error("Error: InchargeSelect element not found.");
      return;
    }
    // Populate dropdown with username
    showAllUsers.forEach((users) => {
      const option = document.createElement("option");
      option.value = users.username;
      option.textContent = `${users.username}`;
      InchargeSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching Users:", error);
  }
}

async function addIncharge() {
  const inchargeNumber = document.getElementById("inchargeNumber").value;
  const FloorSelect = document.getElementById("FloorSelect");
  const InchargeSelect = document.getElementById("InchargeSelect");
  const floorNumber = FloorSelect.value;
  const username = InchargeSelect.value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/addIncharge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inchargeNumber, floorNumber, username, password }), // Corrected parameter here
    });

    if (!response.ok) {
      // Handle error responses
      const errorMsg = await response.text();
      alert(errorMsg); // Display the error message returned from the server
      throw new Error(`Failed to add incharge: ${response.statusText}`);
    }
    if (response.ok) {
      alert("Incharge added successfully");
      document.getElementById("inchargeNumber").value = "";
      FloorSelect.selectedIndex = 0;
      InchargeSelect.selectedIndex = 0;
      document.getElementById("password").value = "";
    } else {
      const errorData = await response.json();
      alert(`${errorData.msg}`);
    }
    
    displayIncharges()
  } catch (error) {
    console.error("Error adding Incharge:", error);
    alert("An error occurred while adding the Incharge. Please try again.");
  }
}

// Function to fetch and display all floors
async function displayIncharges() {
  try {
    // Make GET request to server to fetch floors
    const response = await fetch("http://localhost:3000/showAllIncharges", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Incharges: ${response.statusText}`);
    }

    const Incharges = await response.json();

    // Get table body
    var tableBody = document.getElementById("InchargeTableBody");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Loop through each floor and create table rows
    Incharges.forEach((Incharge) => {
      // Create a new row
      var newRow = tableBody.insertRow();
      // Insert cells into the row
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      // var cell5 = newRow.insertCell(4);
      // Set cell values
      cell1.textContent = Incharge.inchargeNumber;
      cell2.textContent = Incharge.floorNumber;
      cell3.textContent = Incharge.username;
      // cell4.textContent = Incharge.password;
      cell4.textContent = Incharge.Actions;

      // Create edit button
      var editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = function () {
        editIncharge(newRow, Incharge._id, Incharge.inchargeNumber, Incharge.floorNumber, Incharge.username );
      };
      // Append edit button to actions cell
      cell4.appendChild(editButton);

      // Create remove button
      var removeButton = document.createElement("button");
      removeButton.setAttribute("class", "removeBtn");
      removeButton.textContent = "Remove";
      removeButton.onclick = function () {
        removeIncharge(Incharge._id); // Pass the incharge ID to the remove function
      };
      cell4.appendChild(removeButton);
      // displayIncharges()
    });
  } catch (error) {
    console.error("Error fetching incharges:", error);
  }
}

async function editIncharge(row, inchargeId, currentInchargeNumber,currentFloorNumber, currentUsername, currentPassword) {
  // Replace text content with input fields for editing
  row.cells[0].innerHTML = `<input type="number" value="${currentInchargeNumber}">`;
  row.cells[1].innerHTML = `<input type="number" value="${currentFloorNumber}">`;
  row.cells[2].innerHTML = `<input type="text" value="${currentUsername}">`;
  // row.cells[3].innerHTML = `<input type="text" value="${currentPassword}">`;

  // Create save button
  var saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.onclick = async function () {
    try {
      var updatedInchargeNumber = row.cells[0].querySelector("input").value;
      var updatedFloorNumber = row.cells[1].querySelector("input").value;
      var updatedUsername = row.cells[2].querySelector("input").value;
      // var updatedPassword = row.cells[3].querySelector("input").value;

      const response = await fetch(
        `http://localhost:3000/updateIncharge/${inchargeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inchargeNumber: updatedInchargeNumber,
            floorNumber: updatedFloorNumber,
            username: updatedUsername,
            // password: updatedPassword
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update incharge: ${response.statusText}`);
      }

      alert("Incharge updated successfully");

      // Refresh the floor list
      displayIncharges();
    } catch (error) {
      console.error("Error updating incharges:", error);
    }
  };

  // Replace edit button with save button
  row.cells[3].innerHTML = "";
  row.cells[3].appendChild(saveButton);
}

async function removeIncharge(inchargeId) {
  try {
    const response = await fetch(
      `http://localhost:3000/removeIncharge/${inchargeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to remove Incharge: ${response.statusText}`);
    }

    alert("Incharge removed successfully");
    displayIncharges();
    // Remove the row from the table
    const tableBody = document.getElementById("InchargeTableBody");
    const rowToRemove = document.getElementById(inchargeId);
    tableBody.removeChild(rowToRemove); // Remove the row from the DOM
  } catch (error) {
    console.error("Error removing incharge:", error);
  }
}

window.onload = populateFloorDropdown();
window.onload = populateUserDropdown();
