console.log("music.js called");
let sortOption = "time";
// Get all music data and display
async function loadmusic() {
  // const index = {};

  // Create musicDiv in HTML
  const musicDiv = document.querySelector("div#allMusic");

  // Get all music from DB and call renderMusic
  async function getMusic() {
    console.log(sortOption);
    let url = "/getMusic/:" + sortOption;
    console.log(url);
    // const res = await fetch("/getMusic/:sortOption");
    const res = await fetch(url);

    // Parses the response raw data (as JSON) and returns the users
    // array wrapped in JavaScript object.
    // const resData = await resRawData.json();

    const music = await res.json();
    // console.log("render music", music);
    renderMusic(music);
  }

  // Display all music fetched from getMusic
  async function renderMusic(music) {
    musicDiv.innerHTML = "";
    // console.log("render music", music);
    // const list = await fetch("/getList");

    for (let m of music) {
      // create image in HTML
      const addToList = document.createElement("button");
      addToList.style.marginBottom = "0.5%";
      addToList.title = m.title;
      addToList.musician = m.musician;
      addToList.genre = m.genre;
      addToList.album = m.album;
      addToList.bool = true;
      const plusSign = document.createElement("img");
      plusSign.src = "./images/plusSign.png";
      plusSign.width = 30;
      addToList.appendChild(plusSign);

      // addToList button behavior
      addToList.addEventListener("click", async (evt) => {
        const song = evt.currentTarget;
        const newList = await fetch("/updateList", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: song.title,
            musician: song.musician,
            genre: song.genre,
            album: song.genre,
          }),
        });
        console.log("music added to user's db", newList);
        loadlist();
      });

      // console.log("render m", m);
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
      const deleteBtn = document.createElement("button");
      commentBtn.className = "btn btn-primary btn-sm";
      commentBtn.textContent = "comment";
      commentBtn.style.marginLeft = "1%";
      commentBtn.style.marginBottom = "0.3%";
      deleteBtn.className = "btn btn-danger btn-sm float-end";
      deleteBtn.textContent = "Delete Music";
      if (m.comments !== undefined) {
        for (let i of m.comments) {
          const cDiv = document.createElement("div");
          cDiv.innerHTML = `
          <div>
            <label><output>${i.username}</output></label>
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
        if (text === "") {
          alert("comment is empty");
          return;
        }
        commentForm.reset();
        const resRaw = await fetch("/musicComment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            musicID: m._id,
            comment: text,
          }),
        });
        if (!resRaw.ok) {
          alert("comment can not be added");
        } else {
          location.reload();
        }
      });

      deleteBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const resRaw = await fetch("/deleteMusic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            musicID: m._id,
          }),
        });
        if (!resRaw.ok) {
          alert("Music post can not be deleted");
        } else {
          location.reload();
        }
      });
      mDiv.appendChild(addToList);
      commentForm.appendChild(commentText);
      commentForm.appendChild(commentBtn);
      commentForm.appendChild(deleteBtn);
      mDiv.append(commentDiv);
      mDiv.append(commentForm);
      musicDiv.appendChild(mDiv);
    }
  }
  // index.getMusic = getMusic();
  // index.orderGetMusic = orderGetMusic();

  getMusic();
}

// Get playlist
async function loadlist() {
  // Create musicDiv in HTML
  const listDiv = document.querySelector("div#userlist");

  // Get all music from DB and call renderMusic
  async function getList() {
    const res = await fetch("/getList");
    const list = await res.json();
    if (list[0].songlist) {
      renderList(list);
    }
  }

  // Display all music fetched from getMusic
  function renderList(list) {
    listDiv.innerHTML = "";
    console.log("render list", list);
    console.log("render songlist", list[0].songlist);
    for (let l of list[0].songlist) {
      // create image in HTML
      console.log("render l", l);
      const lDiv = document.createElement("div");

      // lDiv.className = "col-xs-6 col-sm-4 card";
      lDiv.className = "card";
      lDiv.style.width = "70%";
      lDiv.style.marginTop = "1%";
      lDiv.style.marginLeft = "10%";
      // mDiv.style.marginRight = "10%";
      lDiv.innerHTML = `
        <div class="card-header">
            <label>Title: <output>${l.title}</output></label>
        </div>
        <div>
            <label>Genre: <output>${l.genre}</output></label>
            <br>
            <label>Musician: <output>${l.musician}</output></label>
            <br>
            <label>Album: <output>${l.album}</output></label>

        </div> 
        </div>
        `;
      listDiv.appendChild(lDiv);
    }
  }
  getList();
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
      musician: musicData.get("musician"),
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
  };
}

loadlist();
loadmusic();
// const index = loadmusic();
// index.getMusic();

const sortDropDown = document.getElementById("sortSelectId");
sortDropDown.addEventListener("change", async (event) => {
  event.preventDefault();
  console.log("event.target.value", event.target.value);

  sortOption = event.target.value;
  console.log("sortOption", sortOption);
  loadmusic();
});

// function getOrderMusic(value){
//   const index = loadmusic();
//   index.orderGetMusic(value);
// }
