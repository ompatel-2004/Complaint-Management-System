async function populateFloorDropdown(event) {
  try {
    const response = await fetch("http://localhost:3000/showAllFloors");
    const showAllFloors = await response.json();
    const FloorSelect = document.getElementById("FloorSelect");

    if (!FloorSelect) {
      console.error("Error: FloorSelect element not found.");
      return;
    }
    // Populate dropdown with floor numbers
    showAllFloors.forEach((floor) => {
      const option = document.createElement("option");
      option.value = floor.floorNumber;
      option.textContent = `${floor.floorNumber} - ${floor.floorName}`;
      FloorSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching floors:", error);
  }
}

async function populateClassDropdown(event) {
  try {
    const FloorSelect = document.getElementById("FloorSelect");
    const ClassSelect = document.getElementById("ClassSelect");
    // Clear existing options in ClassSelect dropdown
    ClassSelect.innerHTML = "<option value='' selected>Select Class Number</option>";
    ClassSelect.value = "";
    console.log(FloorSelect.value);
    const response = await fetch("http://localhost:3000/showAllClasses1/"+ FloorSelect.value);
    const showAllClasses = await response.json();

    if (!ClassSelect) {
      console.error("Error: ClassSelect element not found.");
      return;
    }
    
    // Populate dropdown with Category numbers
    showAllClasses.forEach((Class) => {
      const option = document.createElement("option");
      option.value = Class.classNumber;
      option.textContent = `${Class.classNumber} - ${Class.className}`;
      ClassSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching Classes:", error);
  }
}

async function populateCategoryDropdown(event) {
  try {
    const response = await fetch("http://localhost:3000/showAllCategories");
    const showAllCategories = await response.json();
    const CategorySelect = document.getElementById("CategorySelect");

    if (!CategorySelect) {
      console.error("Error: CategorySelect element not found.");
      return;
    }
    // Populate dropdown with Category numbers
    showAllCategories.forEach((Category) => {
      const option = document.createElement("option");
      option.value = Category.categoryNumber;
      option.textContent = `${Category.categoryNumber} - ${Category.categoryName}`;
      CategorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching Categories:", error);
  }
}
async function populateFacilityDropdown(event) {
  try {
    const CategorySelect = document.getElementById("CategorySelect");
    const FacilitySelect = document.getElementById("FacilitySelect");
    // Clear existing options in FacilitySelect dropdown
    FacilitySelect.innerHTML = "<option value='' selected>Select Facility Number</option>";
    FacilitySelect.value = "";
    console.log(CategorySelect.value);
    const response = await fetch("http://localhost:3000/showAllFacilities1/"+ CategorySelect.value);
    const showAllFacilities = await response.json();

    if (!FacilitySelect) {
      console.error("Error: FacilitySelect element not found.");
      return;
    }
    
    // Populate dropdown with Category numbers
    showAllFacilities.forEach((Facility) => {
      const option = document.createElement("option");
      option.value = Facility.facilityNumber;
      option.textContent = `${Facility.facilityNumber} - ${Facility.facilityName}`;
      FacilitySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching Facilities:", error);
  }
}

async function userAddComplaint() {
  const addComplaintNumber = document.getElementById("addComplaintNumber").value;
  const email = document.getElementById("email").value;
    const FloorSelect = document.getElementById("FloorSelect");
    const ClassSelect = document.getElementById("ClassSelect");
    const CategorySelect = document.getElementById("CategorySelect");
    const FacilitySelect = document.getElementById("FacilitySelect");
  const floorNumber = FloorSelect.value;
  const classNumber = ClassSelect.value;
  const categoryNumber = CategorySelect.value;
  const facilityNumber = FacilitySelect.value;
  const addComplaintDescription = document.getElementById("addComplaintDescription").value;
  const note = document.getElementById("note").value;
  // const report = document.getElementById("report").value;

  try {
    const response = await fetch("http://localhost:3000/UserAddComplaint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addComplaintNumber,
        email,
        floorNumber,
        classNumber,
        categoryNumber,
        facilityNumber,
        addComplaintDescription,
        note,
        // report,
      }), // Corrected parameter here
    });

    if (!response.ok) {
      // Handle error responses
      const errorMsg = await response.text();
      alert(errorMsg); // Display the error message returned from the server
      throw new Error(`Failed to add complaint: ${response.statusText}`);
    }
    if (!response.ok) {
      //   const responseData = await response.json();
      //   alert(responseData.msg); // Alert success message
      // Clear input fields after successful addition
      alert("complaint added successfully");
      document.getElementById("addComplaintNumber").value = "";
      FloorSelect.selectedIndex = 0; // Reset dropdown to default option
      ClassSelect.selectedIndex = 0; // Reset dropdown to default option
      CategorySelect.selectedIndex = 0; // Reset dropdown to default option
      FacilitySelect.selectedIndex = 0; // Reset dropdown to default option
    } else {
      const errorData = await response.json();
      alert(`${errorData.msg}`);
    }
    displayComplaints()
  } catch (error) {
    console.error("Error adding Complaint:", error);
    alert("An error occurred while adding the Complaint. Please try again.");
  }
}

// async function editComplaint(
//   row,
//   AddComplaintId,
//   currentEmail,
//   currentAddComplaintNumber,
//   currentFloorNumber,
//   currentClassNumber,
//   currentFacilityNumber,
//   currentCategoryNumber,
//   currentAddComplaintDescription,
//   currentNote,
//   currentReport,
// ){
//   let originalData = {
//     row,
//     AddComplaintId,
//     addComplaintNumber: currentAddComplaintNumber,
//     email: currentEmail,
//     floorNumber: currentFloorNumber,
//     classNumber: currentClassNumber,
//     categoryNumber: currentCategoryNumber,
//     facilityNumber: currentFacilityNumber,
//     addComplaintDescription: currentAddComplaintDescription,
//     note: currentNote,
//     report: currentReport,
//   }

//   row.cells[0].innerHTML = `<input type="number" value="${currentAddComplaintNumber}">`
//   row.cells[1].innerHTML = `<input type="number" value="${currentEmail}">`
//   row.cells[2].innerHTML = `<input type="text" value="${currentFloorNumber}">`;
//   row.cells[3].innerHTML = `<input type="text" value="${currentClassNumber}">`;
//   row.cells[4].innerHTML = `<input type="text" value="${currentCategoryNumber}">`;  
//   row.cells[5].innerHTML = `<input type="text" value="${currentFacilityNumber}">`;
//   row.cells[6].innerHTML = `<input type="text" value="${currentAddComplaintDescription}">`;
//   row.cells[7].innerHTML = `<input type="text" value="${currentNote}">`;
//   row.cells[8].innerHTML = `<input type="text" value="${currentReport}">`;

//   var saveButton = document.createElement("button");
//   saveButton.textContent = "Save";
//   saveButton.onclick = async function () {
//     try {
//       var updatedAddComplaintNumber = row.cells[0].querySelector("input").value;
//       var updatedEmail = row.cells[1].querySelector("input").value;
//       var updatedFloorNumber = row.cells[2].querySelector("input").value;
//       var updatedClassNumber = row.cells[3].querySelector("input").value;
//       var updatedCategoryNumber = row.cells[4].querySelector("input").value;
//       var updatedFacilityNumber = row.cells[5].querySelector("input").value;
//       var updatedAddComplaintDescription = row.cells[6].querySelector("input").value;
//       var updatedNote = row.cells[7].querySelector("input").value;
//       var updatedReport = row.cells[8].querySelector("input").value;

//       const response = await fetch(
//         `http://localhost:3000/updateComplaint/${AddComplaintId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             addComplaintNumber: updatedAddComplaintNumber,
//             email: updatedEmail,
//             floorNumber: updatedFloorNumber,
//             classNumber: updatedClassNumber,
//             categoryNumber: updatedCategoryNumber,
//             facilityNumber: updatedFacilityNumber,
//             addComplaintDescription: updatedAddComplaintDescription,
//             note: updatedNote,
//             report: updatedReport,
//           }),
//         }
//       )

//       if(!response.ok){ 
//         throw new Error(`Faailed to update Complaint: ${response.statusText}`)
//       }

//       alert("Complaint updated  successfully")
//       displayComplaints();

//       originalData.row.cells[0].textContent = originalData.addComplaintNumber;
//       originalData.row.cells[1].textContent = originalData.email;
//       originalData.row.cells[2].textContent = originalData.floorNumber;
//       originalData.row.cells[3].textContent = originalData.classNumber;
//       originalData.row.cells[4].textContent = originalData.categoryNumber;
//       originalData.row.cells[5].textContent = originalData.facilityNumber;
//       originalData.row.cells[6].textContent = originalData.addComplaintDescription;
//       originalData.row.cells[7].textContent = originalData.note;
//       originalData.row.cells[8].textContent = originalData.report;
//     }catch (error){
//       console.error("Error updating Complaint:", error);
//     }
//   };
//   row.cells[9].innerHTML = "";
//   row.cells[9].appendChild(saveButton);
// }

// async function removeComplaint(AddComplaintID) {
//   try{
//     const response = await fetch(
//       `http://localhost:3000/removeComplaint/${AddComplaintID}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
    
//     if (!response.ok) {
//       throw new Error(`Failed to remove Complaint: ${response.statusText}`);
//     }

//     alert("Complaint removed Successfully!");
//     displayComplaints();

//     const tableBody = document.getElementById("ComplaintTableBody");
//     const rowToRemove = document.getElementById(AddComplaintID);
//     tableBody.removeChild(rowToRemove);
//   } catch (error) {
//     console.error("Error removing Complaint:", error);
//   }
// }

// Function to fetch and display all Facilities
async function displayComplaints() {
  try {
    const response = await fetch(
      "http://localhost:3000/showAllUserAddComplaints",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Complaints: ${response.statusText}`);
    }

    const userAddComplaint = await response.json();

    var tableBody = document.getElementById("ComplaintTableBody");

    tableBody.innerHTML = "";

    userAddComplaint.forEach((useraddcomplaint) => {
      var newRow = tableBody.insertRow();
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      var cell5 = newRow.insertCell(4);
      var cell6 = newRow.insertCell(5);
      var cell7 = newRow.insertCell(6);
      var cell8 = newRow.insertCell(7);
      // var cell9 = newRow.insertCell(8);
      // var cell10 = newRow.insertCell(9);
      cell1.textContent = useraddcomplaint.addComplaintNumber;
      cell2.textContent = useraddcomplaint.email;
      cell3.textContent = useraddcomplaint.floorNumber;
      cell4.textContent = useraddcomplaint.classNumber;
      cell5.textContent = useraddcomplaint.categoryNumber;
      cell6.textContent = useraddcomplaint.facilityNumber,
      cell7.textContent = useraddcomplaint.addComplaintDescription;
      cell8.textContent = useraddcomplaint.note;
      // cell9.textContent = useraddcomplaint.report;
      // cell10.textContent = useraddcomplaint.Actions;

      // var editButton = document.createElement('button');
      // editButton.textContent = "Edit";
      // editButton.onclick = function () {
      //   editComplaint(
      //     newRow,
      //     useraddcomplaint._id,
      //     useraddcomplaint.email,
      //     useraddcomplaint.addComplaintNumber,
      //     useraddcomplaint.floorNumber,
      //     useraddcomplaint.classNumber,
      //     useraddcomplaint.categoryNumber,
      //     useraddcomplaint.facilityNumber,
      //     useraddcomplaint.addComplaintDescription,
      //     useraddcomplaint.note,
      //     useraddcomplaint.report
      //   );
      // };
      // cell10.appendChild(editButton);

      // var removeButton = document.createElement('button');
      // removeButton.setAttribute('class', 'removeBtn');
      // removeButton.textContent = "Remove";
      // removeButton.onclick = function () {
      //   removeComplaint(useraddcomplaint._id);
      // };
      // cell10.appendChild(removeButton);
    });
  } catch (error) {
    console.error("Error fetching Complaints:", error);
  }
}


window.onload = displayComplaints();
// window.onload = populateFloorDropdown();
window.onload = populateClassDropdown();
window.onload = populateCategoryDropdown();
window.onload = populateFacilityDropdown();
