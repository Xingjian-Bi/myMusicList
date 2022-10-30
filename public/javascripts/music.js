console.log("music.js called");

// Get all music data and display
async function loadmusic (){
  // const index = {};

  // Create musicDiv in HTML
  const musicDiv = document.querySelector("showMusic");

  // Get all music from DB and call renderMusic
  async function getMusic() {
    const res = await fetch("/getMusic");
    const music = await res.json();
    console.log("render music", music);
    renderMusic(music);
  }

  // Display all music fetched from getMusic
  function renderMusic(music) {
    musicDiv.innerHTML = "";
    console.log("render music", music);
    for (let m of music) {
      const mDiv = document.createElement("div");
      mDiv

      //   qDiv.className = "col-xs-6 col-sm-4 card";
      //   qDiv.innerHTML = `
      //     <div class="card-body">
      //       <div class="card-title"><label>Location: <output>${q.location}</output></label></div>
      //       <div><label>Scale: <output>${q.scale}</output></label></div>
      //       <div><label>Date: <output>${q.date}</output></label></div>      
      //     </div>
      //   `;
      musicDiv.appendChild(mDiv);
    }
  }
  getMusic();
  // return index;
}



/// Frontend functionalities for user login and registration ///
const musicForm = document.getElementById("createMusic");
const musicError = document.getElementsByClassName("registerError")[0];

// Stores the music if it is not there yet
if (musicForm !== null && musicError !== null) {
  
  console.log("Trying to create a music");
  
  // Handles registration submission
  musicForm.onsubmit = async (event) => {
    event.preventDefault();

    // Get data from user submission
    const musicData = new FormData(musicForm);
    const music = {
      title: musicData.get("title"),
      genre: musicData.get("genre"),
      musician:musicData.get("musician"),
      album: musicData.get("album"),
    };
      
    // Get data from searchMusic API
    const resRawData = await fetch("/recordMusic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(music),
    });

    //If response is not returned successfully
    if (!resRawData.ok) {
      console.log("Response status ", resRawData.status);
    }
    // Parses the response raw data (as JSON)
    // returns the music array wrapped in JavaScript object.
    const resData = await resRawData.json();
    console.log("Got recorded music(s) ", resData);

    // If music is already recorded
    // Needs to do something
    if (resData.users.length) {
      musicError.style.display = "block";
    }
    // Otherwise, we don't display error error message
    // and navigate to login page
    else {
      musicError.style.display = "none";
    }
  };
}



loadmusic();

