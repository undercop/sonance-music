async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    console.log(as)
}

async function main(){
    let songs = await getSongs()
    console.log(songs)

}

main()

//     let songs = [];
//     for (let i = 0; i < as.length; i++) {
//         const element = as[i];
//         // Check if the link ends with ".mp3" and contains a folder
//         if (element.href.endsWith(".mp3") && element.href.includes("/songs/")) {
//             const songPath = element.href.split("/songs/")[1];

//             // Fetch additional information (artist and cover image)
//             const artist = await fetchArtistInfo(songPath);
//             const coverImage = await fetchCoverImage(songPath);

//             // Create an object with song information
//             const songInfo = {
//                 name: songPath.split("/")[0].replaceAll("%20", " "),
//                 artist: artist,
//                 coverImage: coverImage
//             };

//             songs.push(songInfo);
//         }
//     }
//     return songs;
// }

// // Function to fetch artist information from artist.txt
// async function fetchArtistInfo(songPath) {
//     try {
//         let artistFile = await fetch(`http://127.0.0.1:3000/songs/${songPath}/artist.txt`);
//         let artist = await artistFile.text();
//         return artist.trim();  // Trim to remove leading/trailing spaces
//     } catch (error) {
//         console.error(error);
//         return "Unknown Artist";
//     }
// }

// // Function to fetch cover image
// async function fetchCoverImage(songPath) {
//     try {
//         // Assuming cover.jpg is the name of the cover image file
//         return `http://127.0.0.1:3000/songs/${songPath}/cover.jpg`;
//     } catch (error) {
//         console.error(error);
//         return ""; // Provide a default image or leave it empty
//     }
// }

// async function main() {
//     let songs = await getSongs();
//     console.log(songs);

//     // Select the ul element by its class name
//     let songUL = document.querySelector(".songlists").getElementsByTagName("ul")[0];

//     // Loop through the songs and create list items
//     for (const song of songs) {
//         // Create li element
//         let liElement = document.createElement('li');

//         // Create image element
//         let imgElement = document.createElement('img');
//         imgElement.src = song.coverImage;
//         imgElement.alt = `${song.name} cover`;

//         // Create text node with song name and artist
//         let textNode = document.createTextNode(`${song.name} - ${song.artist}`);

//         // Append image and text to li
//         liElement.appendChild(imgElement);
//         liElement.appendChild(textNode);

//         // Append li to ul
//         songUL.appendChild(liElement);
//     }

    // Uncomment the following lines if you want to play the first song automatically
    // var audio = new Audio(songs[0].name);
    // audio.play();
