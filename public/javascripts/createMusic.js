console.log("usersClient.js called");

/// Frontend functionalities for user login and registration ///
const musicForm = document.getElementById("createMusic");
// const musicError = document.getElementsByClassName("registerError")[0];



// Send music info to route.js then database
// Stores the music if it is not there yet
// if (registerForm !== null && registerError !== null) {

if (musicForm !== null) {
  // Handles registration submission
  musicForm.onsubmit = async (event) => {
    event.preventDefault();

    // Get data from user submission
    const registerFormData = new FormData(musicForm);
    const musicData = {
      userName: registerFormData.get("userName"),
      password: registerFormData.get("password"),
    };
    
    // Get data from registerUser API
    const resRawData = await fetch("/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(musicData),
    });
    



  };
}




