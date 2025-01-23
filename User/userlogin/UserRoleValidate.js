function login() {
  var selectedRole = document.getElementById("userRole").value;
  console.log("Selected Role:", selectedRole); // Log the selected role to debug

  switch (selectedRole) {
    case "Incharge":
      alert("Incharge login clicked");
      window.location.href = "/User/inchargelogin/inchargeLogin.html";
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

function demo() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var form = document.getElementById("LoginForm");
  var passwordError = document.getElementById("password-error");

  var isValid = true;

  var errorElements = form.getElementsByClassName("error");

  for (var i = 0; i < errorElements.length; i++) {
    errorElements[i].remove();
  }

  if (email.trim() === "") {
    displayError("* email is required.", "email");
    isValid = false;
  } else if (!isValidEmail(email)) {
    displayError("Invalid email format.", "email");
    isValid = false;
  }

  if (password.trim() === "") {
    displayError("* Password is required.", "password");
    isValid = false;
  } else if (password.length < 6) {
    displayError("* Password must be at least 6 characters...", "password");
    isValid = false;
  } else if (password.length > 15) {
    displayError(
      "* Password is Too Long Make it short between 8 to 15 alphanumerics...",
      "password"
    );
    isValid = false;
  }

  if (isValid) {
    alert("ID & password is correct.");
    // window.location.href = "/User/userheader/user-common-header.html";
  }
  return false;
}


function displayError(message, fieldId) {
  var errorElement = document.createElement("div");
  errorElement.textContent = message;
  errorElement.className = "error";
  document.getElementById(fieldId).parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
  var EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EmailRegex.test(email);
}

// Function to send data to the server when a new value is input into the input field
async function addUser() {
  // Get input values
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  // var gender = document.getElementById("male").value;
  // var gender = document.getElementById("female").value;
  var gender = document.querySelector('input[name="gender"]:checked').value; // Retrieve selected gender value
  var password = document.getElementById("password").value;
  
  try {

    // Check if any of the fields are empty
    if (!username || !email || !phone || !gender || !password) {
      alert("Please fill in all fields!");
      return;
    }

    // Check if email is in a valid format
    if (!isValidEmail(email)) {
      displayError("Invalid email format.", "email");
      return;
    }

    // Make POST request to server
    const response = await fetch("http://localhost:3000/userRegister1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, phone, gender, password}),
    });

    if (!response.ok) {
      // Handle error responses
      alert("user already exists! Enter unique name! ");
      throw new Error(`Failed to add user: ${response.statusText}`);
    }

    alert("user added successfully");
    // Clear input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("password").value = "";
  } catch (error) {
    console.error("Error adding user:", error);
  }
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
