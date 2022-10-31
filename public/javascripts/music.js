console.log("music.js called");

// Get all music data and display
async function loadmusic (){
  // const index = {};

  // Create musicDiv in HTML
  const musicDiv = document.querySelector("div#allMusic");

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
    // create image in HTML
      const button = document.createElement("button");
      button.style.marginBottom = "0.5%";
      button.addEventListener("click", addedToList, false);
      button.music = m.title;
      button.bool = true;
      const like = document.createElement("img");
      like.src = "./images/like.png";
      like.width = 30;
      button.appendChild(like); 

      console.log("render m", m);
      const mDiv = document.createElement("div");

      // mDiv.className = "col-xs-6 col-sm-4 card";
      mDiv.className = "card";
      mDiv.style.width = "75%";
      mDiv.style.marginTop = "1%";
      mDiv.style.marginLeft = "10%";
      // mDiv.style.marginRight = "10%";
      mDiv.innerHTML = `
        <div class="card-header">
            <label>Title: <output>${m.title}</output></label>
        </div>
        <div>
            <label>Genre: <output>${m.genre}</output></label>
            <br>
            <label>Musician: <output>${m.musician}</output></label>
            <br>
            <label>Album: <output>${m.album}</output></label>

        </div> 
        </div>
        `;
      const commentDiv = document.createElement("div");
      const commentForm = document.createElement("form");
      const commentText = document.createElement("input");
      const commentBtn = document.createElement("button");
      commentBtn.className = "btn btn-primary btn-sm";
      commentBtn.textContent = "comment";
      commentBtn.style.marginLeft = "1%";
      commentBtn.style.marginBottom = "0.3%";
      if (m.comments !== undefined){
        for (let i of m.comments){
          const cDiv = document.createElement("div");
          cDiv.innerHTML = `
          <div>
            <label>Username: <output>${i.username}</output></label>
            <label>    : <output>${i.comment}</output></label>
          </div>

          `;
          commentDiv.appendChild(cDiv);
        }
      }

      commentForm.addEventListener("submit", async (event) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
        event.preventDefault();
        const text = commentText.value;
        if (text === ""){
          alert("comment is empty");
          return;
        }
        commentForm.reset();
        const resRaw = await fetch("/musicComment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              musicID: m._id,
              comment: text,
            }),
        });

        if(!resRaw.ok){
          alert("comment can not be added");
        }else{
          location.reload();
        }

      });


      mDiv.appendChild(button);
      commentForm.appendChild(commentText);
      commentForm.appendChild(commentBtn);
      mDiv.append(commentDiv);
      mDiv.append(commentForm);

      musicDiv.appendChild(mDiv);

      
    }
  }
  getMusic();
  // return index;
}



// Create a new piece of music
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
    loadmusic();
    // If music is already recorded
    // Needs to do something
    if (resData.existedMusic.length) {
      musicError.style.display = "block";
    }
    // Otherwise, we don't display error error message
    // and navigate to login page
    else {
      musicError.style.display = "none";
      // loadmusic();
    }
  };
}

// like button behavior
const list = [];
function addedToList(evt){
  const button = evt.currentTarget;
  const like = document.createElement("img");
  like.src = "./images/like.png";
  like.width = 30;
  const unlike = document.createElement("img");
  unlike.src = "./images/unlike.png";
  unlike.width = 30;
      
  if (evt.currentTarget.bool){
    console.log(evt.currentTarget.music);
    list.push(button.music);
    button.bool = false;
    // button.children.replaceWith(unlike);
    button.replaceChild(unlike, button.firstChild);
    console.log(list);
  }

  
}


loadmusic();

