async function populateFloorDropdown(event) {
  try {
    const response = await fetch("http://localhost:3000/showAllFloors");
    const data = await response.json();
    const FloorSelect = document.getElementById("FloorSelect");

    if (!FloorSelect) {
      console.error("Error: FloorSelect element not found.");
      return;
    }
    // Populate dropdown with floor numbers
    data.forEach((floor) => {
      const option = document.createElement("option");
      option.value = floor.floorNumber;
      option.textContent = `${floor.floorNumber} - ${floor.floorName}`;
      FloorSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching floors:", error);
  }
}

async function addClass() {
  const classNumber = document.getElementById("ClassNumber").value;
  const className = document.getElementById("ClassName").value;
  const FloorSelect = document.getElementById("FloorSelect");
  const floorNumber = FloorSelect.value;

  const requestBody = {
    classNumber,
    className,
    floorNumber,
  };

  try {
    const response = await fetch("http://localhost:3000/addclass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Corrected parameter here
    });

    if (response.ok) {
      const responseData = await response.json();
      alert(responseData.msg); // Alert success message
      // Clear input fields after successful addition
      document.getElementById("ClassNumber").value = "";
      document.getElementById("ClassName").value = "";
      FloorSelect.selectedIndex = 0; // Reset dropdown to default option
    } else {
      const errorData = await response.json();
      alert(`${errorData.msg}`);
    }
    displayclasses()
  } catch (error) {
    console.error("Error adding class:", error);
    alert("An error occurred while adding the class. Please try again.");
  }
}

// Function to fetch and display all classes
async function displayclasses() {
  try {
    const response = await fetch("http://localhost:3000/showAllClasses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch classes: ${response.statusText}`);
    }

    const classes = await response.json();

    var tableBody = document.getElementById("ClassTableBody");

    tableBody.innerHTML = "";

    classes.forEach((classes) => {
      var newRow = tableBody.insertRow();
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      cell1.textContent = classes.classNumber;
      cell2.textContent = classes.className;
      cell3.textContent = classes.floorNumber;
      cell4.textContent = classes.Actions;

      var editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = function () {
        editclass(
          newRow,
          classes._id,
          classes.classNumber,
          classes.className,
          classes.floorNumber
        );
      };
      cell4.appendChild(editButton);

      var removeButton = document.createElement("button");
      removeButton.setAttribute("class", "removeBtn");
      removeButton.textContent = "Remove";
      removeButton.onclick = function () {
        removeclass(classes._id);
      };
      cell4.appendChild(removeButton);
    });
  } catch (error) {
    console.error("Error fetching classes:", error);
  }
}
let originalData; // Define a variable to store original class data

async function editclass(
  row,
  classId,
  currentClassNumber,
  currentClassName,
  currentFloorNumber
) {
  // Store original class data
  originalData = {
    row,
    classId,
    classNumber: currentClassNumber,
    className: currentClassName,
    floorNumber: currentFloorNumber,
  };

  row.cells[0].innerHTML = `<input type="number" value="${currentClassNumber}">`;
  row.cells[1].innerHTML = `<input type="text" value="${currentClassName}">`;
  row.cells[2].innerHTML = `<input type="text" value="${currentFloorNumber}">`;

  var saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.onclick = async function () {
    try {
      var updatedClassNumber = row.cells[0].querySelector("input").value;
      var updatedClassName = row.cells[1].querySelector("input").value;
      var updatedFloorNumber = row.cells[2].querySelector("input").value;

      const response = await fetch(
        `http://localhost:3000/updateClass/${classId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classNumber: updatedClassNumber,
            className: updatedClassName,
            floorNumber: updatedFloorNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update class: ${response.statusText}`);
      }

      alert("Class updated successfully");

      displayclasses(); // Corrected function name

      // Restore original data
      originalData.row.cells[0].textContent = originalData.classNumber;
      originalData.row.cells[1].textContent = originalData.className;
      originalData.row.cells[2].textContent = originalData.floorNumber;
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };
  row.cells[3].innerHTML = "";
  row.cells[3].appendChild(saveButton);
}

async function removeclass(classId) {
  try {
    const response = await fetch(
      `http://localhost:3000/removeClass/${classId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to remove class: ${response.statusText}`);
    }

    alert("Class removed successfully");
    displayclasses(); // Corrected function name

    // Remove the row from the table
    const tableBody = document.getElementById("ClassTableBody");
    const rowToRemove = document.getElementById(classId);
    tableBody.removeChild(rowToRemove); // Remove the row from the DOM
  } catch (error) {
    console.error("Error removing class:", error);
  }
}

window.onload = displayclasses();
window.onload = populateFloorDropdown();
