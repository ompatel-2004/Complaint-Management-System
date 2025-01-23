async function populateCategoryDropdown(event) {
  try {
    const response = await fetch("http://localhost:3000/showAllCategories");
    const data = await response.json();
    const CategorySelect = document.getElementById("CategorySelect");

    if (!CategorySelect) {
      console.error("Error: CategorySelect element not found.");
      return;
    }
    // Populate dropdown with Category numbers
    data.forEach((Category) => {
      const option = document.createElement("option");
      option.value = Category.categoryNumber;
      option.textContent = `${Category.categoryNumber} - ${Category.categoryName}`;
      CategorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching Categories:", error);
  }
}

async function addFacility() {
  const facilityNumber = document.getElementById("facilityNumber").value;
  const facilityName = document.querySelector(".FacilitySelect").value;
  const CategorySelect = document.getElementById("CategorySelect");
  const categoryNumber = CategorySelect.value;

  try {
    const response = await fetch("http://localhost:3000/addFacility", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ facilityNumber, facilityName, categoryNumber }), // Corrected parameter here
    });

    if (!response.ok) {
      // Handle error responses
      const errorMsg = await response.text();
      alert(errorMsg); // Display the error message returned from the server
      throw new Error(`Failed to add category: ${response.statusText}`);
    }
    if (!response.ok) {
      //   const responseData = await response.json();
      //   alert(responseData.msg); // Alert success message
      // Clear input fields after successful addition
      alert("Facility added successfully");
      displayFacilities();
      document.getElementById("facilityNumber").value = "";
      document.querySelector(".FacilitySelect").value = "Choose Facility"; // Reset the dropdown to its default value
      CategorySelect.selectedIndex = 0; // Reset dropdown to default option
    } else {
      const errorData = await response.json();
      alert(`${errorData.msg}`);
    }
  } catch (error) {
    console.error("Error adding Facility:", error);
    alert("An error occurred while adding the Facility. Please try again.");
  }
}

// Function to fetch and display all Facilities
async function displayFacilities() {
  try {
    const response = await fetch("http://localhost:3000/showAllFacilities", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Facilities: ${response.statusText}`);
    }

    const Facilities = await response.json();

    var tableBody = document.getElementById("FacilityTableBody");

    tableBody.innerHTML = "";

    Facilities.forEach((Facilities) => {
      var newRow = tableBody.insertRow();
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      cell1.textContent = Facilities.facilityNumber;
      cell2.textContent = Facilities.facilityName;
      cell3.textContent = Facilities.categoryNumber;
      cell4.textContent = Facilities.Actions;

      var editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = function () {
        editFacility(
          newRow,
          Facilities._id,
          Facilities.facilityNumber,
          Facilities.facilityName,
          Facilities.categoryNumber
        );
      };
      cell4.appendChild(editButton);

      var removeButton = document.createElement("button");
      removeButton.setAttribute("class", "removeBtn");
      removeButton.textContent = "Remove";
      removeButton.onclick = function () {
        removeFacility(Facilities._id);
      };
      cell4.appendChild(removeButton);
    });
  } catch (error) {
    console.error("Error fetching Facilities:", error);
  }
}
let originalData; // Define a variable to store original class data

async function editFacility(
  row,
  FacilityId,
  currentFacilityNumber,
  currentFacilityName,
  currentCategoryNumber
) {
  // Store original Facility data
  originalData = {
    row,
    FacilityId,
    facilityNumber: currentFacilityNumber,
    facilityName: currentFacilityName,
    categoryNumber: currentCategoryNumber,
  };

  row.cells[0].innerHTML = `<input type="number" value="${currentFacilityNumber}">`;
  row.cells[1].innerHTML = `<input type="text" value="${currentFacilityName}">`;
  row.cells[2].innerHTML = `<input type="text" value="${currentCategoryNumber}">`;

  var saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.onclick = async function () {
    try {
      var updatedFacilityNumber = row.cells[0].querySelector("input").value;
      var updatedFacilityName = row.cells[1].querySelector("input").value;
      var updatedCategoryNumber = row.cells[2].querySelector("input").value;

      const response = await fetch(
        `http://localhost:3000/updateFacility/${FacilityId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            facilityNumber: updatedFacilityNumber,
            facilityName: updatedFacilityName,
            categoryNumber: updatedCategoryNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update Facility: ${response.statusText}`);
      }

      alert("Facility updated successfully");

      displayFacilities(); // Corrected function name

      // Restore original data
      originalData.row.cells[0].textContent = originalData.facilityNumber;
      originalData.row.cells[1].textContent = originalData.facilityName;
      originalData.row.cells[2].textContent = originalData.categoryNumber;
    } catch (error) {
      console.error("Error updating Facility:", error);
    }
  };
  row.cells[3].innerHTML = "";
  row.cells[3].appendChild(saveButton);
}

async function removeFacility(FacilityId) {
  try {
    const response = await fetch(
      `http://localhost:3000/removeFacility/${FacilityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to remove Facility: ${response.statusText}`);
    }

    alert("Facility removed successfully");
    displayFacilities(); // Corrected function name

    // Remove the row from the table
    const tableBody = document.getElementById("FacilityTableBody");
    const rowToRemove = document.getElementById(FacilityId);
    tableBody.removeChild(rowToRemove); // Remove the row from the DOM
  } catch (error) {
    console.error("Error removing Facility:", error);
  }
}

window.onload = displayFacilities();
window.onload = populateCategoryDropdown();
