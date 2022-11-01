console.log("usersClient.js called");


function login(){
  /// Frontend functionalities for user login and registration ///
  const registerForm = document.getElementById("registerForm");
  const registerError = document.getElementsByClassName("registrationError")[0];
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementsByClassName("loginError")[0];


  // Send registeration info to route.js then database
  // Stores the info if the username is not taken
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


  if (loginForm !== null && loginError !== null) {
    // Handles login submission
    loginForm.onsubmit = async (event) => {
      event.preventDefault();

      const loginFormData = new FormData(loginForm);

      const userData = {
        userName: loginFormData.get("userName"),
        password: loginFormData.get("password"),
      };

      const resRawData = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      //If response is not returned successfully
      if (!resRawData.ok) {
        console.log("Response status ", resRawData.status);
      }

      // warrped response with json 

      const resData = await resRawData.json();
      console.log("Got logged in user(s) ", resData);

      //if pw is incorrect give an error

      if (!resData.users.length) {
        loginError.style.display = "block";
      }
      // debugger;

      // if (!resRawData.users.length) {
      //   loginError.style.display = "block";
      // }    


      //redirect to the music list page
      else {
        loginError.style.display = "none";
        window.location.href = "/musicList.html";
      }
    };
  }
}

login();