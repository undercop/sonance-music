console.log('Let\'s go JavaScript Time');

let songs;
let currFolder;

let currentSong = new Audio();
const play = document.getElementById("play")
let songInfoElement = document.querySelector(".songinfo");
let songTimeElement = document.querySelector(".timevol");

function secondsToMinutesAndSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0'); // Ensure two digits for minutes
    const formattedSeconds = String(remainingSeconds).padStart(2, '0'); // Ensure two digits for seconds

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`${currFolder}`);
    let response = await a.text();
// console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
// console.log(as)
    songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3"))
            songs.push(element.href.split(`${currFolder}`)[1])
    }
// console.log(songs)
    let songUL = document.querySelector(".songlists").getElementsByTagName("ul")[0];
    songUL.innerHTML = ""; // Clear the existing list items

    

    for (const song of songs) {
        songUL.innerHTML += `<li>
      <img src="img/music.svg" alt="" srcset="" class="invert">
      <div>
        <div class="info">
          ${song.replaceAll("%20", " ")}
         
        </div>
        <div>song artist</div>
      </div>
      <div class="playnow flex">
        <span>play now</span>
        <img src="img/play.svg" alt="" srcset="" class="invert">
      </div>
    </li>`;

    
    }


    // Add event listeners to the new list items
    Array.from(songUL.getElementsByTagName("li")).forEach(li => {
        li.addEventListener("click", event => {
            const infoElement = li.querySelector(".info");
            if (infoElement) {
                const trackName = infoElement.innerHTML.trim();
                console.log(trackName);
                playMusic(trackName);
            } else {
                console.error("No element with class .info found");
            }
        });
    });
    return songs;
}
let currentSongIndex = 0;  

currentSong.addEventListener("ended", async () => {
    let nextIndex = (currentSongIndex + 1) % songs.length; // Loop back to the first song if at the end

    // Play the next song
    playMusic(songs[nextIndex]);

    // Update the currentSongIndex
    currentSongIndex = nextIndex;
});

const playMusic = (track, pause = false) => {
    currentSong.src = (`${currFolder}` + track);
    if (!pause) {
        currentSong.play()
        play.src = "img/pause.svg";
    }
    songInfoElement.textContent = track.replace(/%20/g, " ");
    songTimeElement.textContent = " 00:00/00:00";


    //autoplauuuyyyyyy
   
    };



async function displayfolders() {
    let a = await fetch(`songs`);
    let response = await a.text();
  
    let div = document.createElement("div");
    div.innerHTML = response;
  
    let anchor = div.getElementsByTagName("a");
    let innerPlaylist = document.querySelector(".innerplaylist");
  
    // Create the card container if it doesn't exist
    if (!innerPlaylist) {
      console.error("Inner playlist div not found!");
      return;
    }
  
    Array.from(anchor).forEach(async (e) => {
      if (e.href.includes("/songs")&& !e.href.includes(".htaccess")) {
        let folder = e.href.split("/").slice(-1)[0];
        console.log("hii");
        console.log(folder);
        // fetching info in each playlist---
        let a = await fetch(`songs/${folder}/info.json`);
        let response = await a.json();
       
  
        let cardContainer = document.createElement("div");
        cardContainer.dataset.folder = folder;
        cardContainer.className = "cardContainer";
  
        cardContainer.innerHTML = `<div data-folder="${folder}" class="card img">
            <div class="play">
              <div class="circle-container">
                <img alt="Free Play Player Arrow Icon" loading="lazy" src="https://cdn.iconscout.com/icon/free/png-256/free-play-player-arrow-stop-sound-30544.png?f=webp&amp;w=128" srcset="https://cdn.iconscout.com/icon/free/png-256/free-play-player-arrow-stop-sound-30544.png?f=webp&amp;w=128 1x, https://cdn.iconscout.com/icon/free/png-256/free-play-player-arrow-stop-sound-30544.png?f=webp&amp;w=256 2x" class="thumb_p6OvR">
              </div>
            </div>
            <img src="/songs/${folder}/cover.jpg" alt="happy hits">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
          </div>`;
  
        innerPlaylist.appendChild(cardContainer);
      }
    });
  }
  
  
  





async function main() {

    displayfolders()


    await getSongs("songs/anuvjain")
    playMusic(songs[1], true)


    // ... (existing code)

    // attach event listener for play, pause, and next button
    function togglePlayPause() {
        console.log("Button clicked");
        if (currentSong.paused) {
            console.log("Audio is paused, playing now");
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            console.log("Audio is playing, pausing now");
            currentSong.pause();
            play.src = "img/play1.svg";
        }
    }

    // Add click event listener
    play.addEventListener("click", togglePlayPause);

    // Add space bar press event listener
    document.addEventListener("keydown", (event) => {
        // Check if the pressed key is the space bar (keyCode 32)
        if (event.keyCode === 32) {
            // Prevent the default space bar action (scrolling the page)
            event.preventDefault();

            // Toggle play/pause
            togglePlayPause();
        }
    });

    // event listener for time
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".timevol").innerHTML = `${secondsToMinutesAndSeconds(currentSong.currentTime)} , ${secondsToMinutesAndSeconds(currentSong.duration)}`
        document.querySelector(".seekbarcircle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    });

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        console.log(e);
        let percent = (e.offsetX / e.target.getBoundingClientRect().width)
        document.querySelector(".seekbarcircle").style.left = (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%"
        currentSong.currentTime = ((currentSong.duration) * percent)
    });

    // adding event listener to my hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    });

    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-140vw"
    });

    document.querySelector(".home").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-140vw"
    });

    // writing an event listener for previous and next
    let currentIndex = 0; // Initialize the current index

    previous.addEventListener("click", () => {
      console.log("previous was clicked");
      currentIndex = (currentIndex - 1 + songs.length) % songs.length; // Calculate the previous index
      playMusic(songs[currentIndex]);
    });
    
    next.addEventListener("click", () => {
      console.log("next was clicked");
      currentIndex = (currentIndex + 1) % songs.length; // Calculate the next index
      playMusic(songs[currentIndex]);
    });
    // event listener for when the playlist is clicked;
    document.addEventListener("click", async (event) => {
        // Check if the clicked element or its ancestor has the class "card"
        const card = event.target.closest(".card");
        if (card) {
            // Get the dataset from the closest ancestor with class "card"
            const folder = card.dataset.folder;
            
    
            // Fetch songs based on the folder
            let songs = await getSongs(`songs/${folder}`);
           playMusic(songs[0])
        }
    });
    
}

main();



