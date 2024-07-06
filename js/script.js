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
  currFolder = folder
  let a = await fetch(`http://127.0.0.1:3000/${currFolder}`);
  let response = await a.text();

  let div = document.createElement("div")
  div.innerHTML = response;
  let as = div.getElementsByTagName("a")

  songs = []
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3"))
      songs.push(element.href.split(`${currFolder}`)[1])

  }

  let songUL = document.querySelector(".songlists").getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + ` <li>
                            <img src="music.svg" alt="" srcset="" class="invert">
                            <div>
                                <div class="info">
                                    ${song.replaceAll("%20", " ")}
                                </div>
                                <div>song artist</div>
                            </div>
                            <div class="playnow flex">
                                <span>play now</span>
                              <img src="play.svg" alt="" srcset="" class="invert">
                            </div>
                            
                        </li>`



  }


}
const playMusic = (track, pause = false) => {
  //let audio = new Audio("/songs/" + track)

  currentSong.src = (`${currFolder}` + track);

  if (!pause) {
    currentSong.play()
    play.src = "pause.svg";
  }

  songInfoElement.textContent = track.replace(/%20/g, " ");
  songTimeElement.textContent = " 00:00/00:00"

}
async function main() {

  await getSongs("songs/anuvjain")
  playMusic(songs[1], true)
  console.log(songs)
  // play the first song;

  let songUL = document.querySelector(".songlists").getElementsByTagName("ul")[0];
  songUL.innerHTML = ""
  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + ` <li>
                            <img src="music.svg" alt="" srcset="" class="invert">
                            <div>
                                <div class="info">
                                    ${song.replaceAll("%20", " ")}
                                </div>
                                <div>song artist</div>
                            </div>
                            <div class="playnow flex">
                                <span>play now</span>
                              <img src="play.svg" alt="" srcset="" class="invert">
                            </div>
                            
                        </li>`



  }




  // event listner attached to each song
  Array.from(document.querySelector(".songlists").getElementsByTagName("li")).forEach(li => {
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


  // attach event listner for play , pause and next button ;
  function togglePlayPause() {
    console.log("Button clicked");
    if (currentSong.paused) {
      console.log("Audio is paused, playing now");
      currentSong.play();
      play.src = "pause.svg";
    } else {
      console.log("Audio is playing, pausing now");
      currentSong.pause();
      play.src = "play1.svg";
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

  // event listenr for time
  currentSong.addEventListener("timeupdate", () => {
    // console.log(currentSong.duration , currentSong.currentTime)
    document.querySelector(".timevol").innerHTML = `${secondsToMinutesAndSeconds(currentSong.currentTime)} , ${secondsToMinutesAndSeconds(currentSong.duration)}`
    document.querySelector(".seekbarcircle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
  })

  document.querySelector(".seekbar").addEventListener("click", (e) => {
    console.log(e);
    let percent = (e.offsetX / e.target.getBoundingClientRect().width)
    document.querySelector(".seekbarcircle").style.left = (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%"
    currentSong.currentTime = ((currentSong.duration) * percent)
  });
  // adding event listner to my hamburger

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0"
  })

  document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-140vw"

  })
  document.querySelector(".home").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-140vw"
  })

  // writting an event listner for previous and next 
  previous.addEventListener("click", (e) => {
    console.log("previous was clicked");
    console.log(currentSong.src.slice(currentSong.src.lastIndexOf("/") + 1));


  });

  next.addEventListener("click", (e) => {
    console.log("next was clicked");
    console.log(e);
  });
  //

  //event lister for when the playlist is clicked;

  Array.from(document.getElementsByClassName("card")).forEach(e => {

    console.log(e)
    e.addEventListener("click", async item => {
      console.log(item.currentTarget)
      let songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
    })
  })



}
main()