function login() {
  var selectedRole = document.getElementById("userRole").value;
  console.log("Selected Role:", selectedRole); // Log the selected role to debug

  switch (selectedRole) {
    case "Incharge":
      alert("Incharge login clicked");
      window.location.href = "./UserRoleLogin.html";
      break;
    // Redirect or perform actions for incharge
    case "Faculty":
      alert("Faculty login clicked");
      window.location.href = "./UserRoleLogin.html";
      break;

    default:
      alert("Invalid role selected");
      break;
  }
}


async function AdminLogin() {
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
    const response = await fetch("http://localhost:3000/adminLogin", {
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
    window.location.href = "../adminheader/admin-common-header.html";
  } catch (error) {
    console.error("Error logging in:", error);
  }
  return false;

}

