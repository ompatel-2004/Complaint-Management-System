// Function to send data to the server when a new category is added
async function addCategory() {
  try {
    // Get input values
    var categoryNumber = document.getElementById("categoryNumber").value;
    var categoryName = document.querySelector(".CategorySelect").value;

    // Check if categoryNumber or categoryName is empty
    if (!categoryNumber || categoryName === "Choose Category") {
      alert("Please enter category number and select a category name.");
      return;
    }

    // Make POST request to server
    const response = await fetch("http://localhost:3000/addCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryNumber, categoryName }),
    });

    if (!response.ok) {
      // Handle error responses
      const errorMsg = await response.text();
      alert(errorMsg); // Display the error message returned from the server
      throw new Error(`Failed to add category: ${response.statusText}`);
    }

    alert("Category added successfully");
    displayCategories();
    // Clear input fields
    document.getElementById("categoryNumber").value = "";
    document.querySelector(".CategorySelect").value = "Choose Category"; // Reset the dropdown to its default value
  } catch (error) {
    console.error("Error adding category:", error);
  }
}

// Function to fetch and display all Categories
async function displayCategories() {
  try {
    // Make GET request to server to fetch Categories
    const response = await fetch("http://localhost:3000/showAllCategories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Categories: ${response.statusText}`);
    }

    const categories = await response.json();

    // Get table body
    var tableBody = document.getElementById("CategoryTableBody");

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Loop through each Category and create table rows
    categories.forEach((category) => {
      // Create a new row
      var newRow = tableBody.insertRow();
      // Insert cells into the row
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      // Set cell values
      cell1.textContent = category.categoryNumber;
      cell2.textContent = category.categoryName;
      cell3.textContent = category.Actions; // Placeholder for actions, you can customize this

      // Create edit button
      var editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = function () {
        editCategory(
          newRow,
          category._id,
          category.categoryNumber,
          category.categoryName
        );
      };
      // Append edit button to actions cell
      cell3.appendChild(editButton);

      // Create remove button
      var removeButton = document.createElement("button");
      removeButton.setAttribute("class", "removeBtn");
      removeButton.textContent = "Remove";
      removeButton.onclick = function () {
        removeCategory(category._id); // Pass the floor ID to the remove function
      };
      cell3.appendChild(removeButton);
    });
  } catch (error) {
    console.error("Error fetching Categories:", error);
  }
}

async function editCategory(
  row,
  categoryId,
  currentCategoryNumber,
  currentCategoryName
) {
  // Replace text content with input fields for editing
  row.cells[0].innerHTML = `<input type="number" value="${currentCategoryNumber}">`;
  row.cells[1].innerHTML = `<input type="text" value="${currentCategoryName}">`;

  // Create save button
  var saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.onclick = async function () {
    try {
      var updatedCategoryNumber = row.cells[0].querySelector("input").value;
      var updatedCategoryName = row.cells[1].querySelector("input").value;

      const response = await fetch(
        `http://localhost:3000/updateCategory/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryNumber: updatedCategoryNumber,
            categoryName: updatedCategoryName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update Category: ${response.statusText}`);
      }

      alert("Category updated successfully");

      // Refresh the Category list
      displayCategories();
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  };
  // Replace edit button with save button
  row.cells[2].innerHTML = "";
  row.cells[2].appendChild(saveButton);
}

async function removeCategory(categoryId) {
  try {
    const response = await fetch(
      `http://localhost:3000/removeCategory/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to remove Category: ${response.statusText}`);
    }

    alert("Category removed successfully");
    displayCategories();
    // Remove the row from the table
    const tableBody = document.getElementById("CategoryTableBody");
    const rowToRemove = document.getElementById(categoryId);
    tableBody.removeChild(rowToRemove); // Remove the row from the DOM
  } catch (error) {
    console.error("Error removing Category:", error);
  }
}

// Call the displayCategories() function when the window loads
window.onload = displayCategories();
