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

    });
  } catch (error) {
    console.error("Error fetching Complaints:", error);
  }
}

window.onload = displayComplaints();
