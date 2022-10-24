console.log("usersClient.js called");

/// Frontend functionalities for user login and registration ///
const registerForm = document.getElementById("registerForm");
const registerError = document.getElementsByClassName("registerError")[0];

console.log(registerForm);
console.log(registerError);

if (registerForm !== null && registerError !== null) {
  // Handles registration submission
  registerForm.onsubmit = async (event) => {
    event.preventDefault();

    // Get data from user submission
    const registerFormData = new FormData(registerForm);
    const userData = {
      userName: registerFormData.get("userName"),
      password: registerFormData.get("password"),
    };

    // Get data from registerUser API
    const resRawData = await fetch("/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // If response is not returned successfully
    if (!resRawData.ok) {
      console.log("Response status ", resRawData.status);
    }

    // Parses the response raw data (as JSON) and returns the users
    // array wrapped in JavaScript object.
    const resData = await resRawData.json();
    console.log("Got registered user(s) ", resData);

    // If users array does contain an existing user
    // we show register error message (user name already exists incorrect)
    if (resData.users.length) {
      registerError.style.display = "block";
    }

    // Otherwise, we don't display error error message
    // and navigate to login page
    else {
      registerError.style.display = "none";
      window.location.href = "/index.html";
    }
  };
}