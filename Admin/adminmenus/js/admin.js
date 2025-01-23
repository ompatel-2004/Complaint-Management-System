// Function to send data to the server when a new value is input into the input field
async function addAdmin() {
    // Get input values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    try {
      // Make POST request to server
      const response = await fetch("http://localhost:3000/addadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        // Handle error responses
        alert("admin already exists!");
        throw new Error(`Failed to add admin: ${response.statusText}`);
      }
  
      alert("Admin added successfully");
  
      console.log(response);
      // Clear input fields
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  }
  