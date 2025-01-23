
  async function InchargeLogin() {
    // Get input values from form fields and add them to an object with username and password keys
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    try {
          // Check if any of the fields are empty
          if (!username || !password) {
            alert("Please fill in all fields!");
            return;
          }
      // Make POST request to server and send username and password to server 
      const response = await fetch("http://localhost:3000/inchargeLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password}),
      });
  
      if (!response.ok) {
        // Handle error responses 
        alert("Invalid username or password!");
        throw new Error(`Failed to login: ${response.statusText}`);
      }
  
      // If response is ok, redirect to home page
      window.location.href = "../inchargeheader/incharge-common-header.html";
    } catch (error) {
      console.error("Error logging in:", error);
    }
    return false;
  
  }
  

  async function UserLogin() {
    // Get input values from form fields and add them to an object with username and password keys
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    try {
          // Check if any of the fields are empty
          if (!username || !password) {
            alert("Please fill in all fields!");
            return;
          }
      // Make POST request to server and send username and password to server 
      const response = await fetch("http://localhost:3000/UserLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password}),
      });
  
      if (!response.ok) {
        // Handle error responses 
        alert("Invalid username or password!");
        throw new Error(`Failed to login: ${response.statusText}`);
      }
  
      // If response is ok, redirect to home page
      window.location.href = "../userheader/user-common-header.html";
    } catch (error) {
      console.error("Error logging in:", error);
    }
    return false;
  }
  