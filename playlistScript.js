var albumShelfEl = document.querySelector("#albumShelf")
var allTracksEl = document.querySelector("#allTracks")
var allTracksListEl = document.querySelector("#allTracksList")
var chosenTracksListEl = document.querySelector("#chosenTrackList")

var adeleTracks = [
  {name: "Rolling in the Deep",
  length: "3:49",},
  {name: "Rumour Has It",
  length: "3:44",},
  {name: "Turning Tables",
  length: "4:11",},
  {name: "Dont You Remember",
  length: "4:04",},
  {name: "Set Fire to the Rain",
  length: "4:02",},
  {name: "He Wont Go",
  length: "4:38",},
  {name: "Take it All",
  length: "3:49",},
  {name: "I'll Be Waiting",
  length: "4:02",},
  {name: "One and Only",
  length: "5:39",},
  {name: "Lovesong",
  length: "5:17",},
  {name: "Someone Like You",
  length: "4:44",},
  {name: "I found a Boy",
  length: "3:37",}
]
var policeTracks = [
  {name: "Spirits in the Material World",
  length: "2:59",},
  {name: "Every Little Thing She Does is Magic",
  length: "4:22",},
  {name: "Invisible Sun",
  length: "3:44",},
  {name: "Hungry for You",
  length: "2:53",},
  {name: "Demolition Man",
  length: "5:57",},
  {name: "Too Much Information",
  length: "3:43",},
  {name: "Rehumanize Yourself",
  length: "3:10",},
  {name: "One World (Not Three)",
  length: "4:47",},
  {name: "Omega Man",
  length: "2:48",},
  {name: "Secret Journey",
  length: "3:34",},
  {name: "Darkness",
  length: "3:14",}
]
var pinkFloydTracks = [
  {name: "Cluster One",
  length: "5:56"},
  {name: 'What Do You Want from Me',
  length: "4:21"},
  {name: "Poles Apart",
  length: "7:03"},
  {name: "Marooned",
  length: "5:29"},
  {name: "A Great Day for Freedom",
  length: "4:17"},
  {name: "Wearing the Inside Out",
  length: "6:49"},
  {name: "Take it Back",
  length: "6:12"},
  {name: "Coming Back to Life",
  length: "6:19"},
  {name: "Keep Talking",
  length: "6:10"},
  {name: "Lost for Words",
  length: "5:13"},
  {name: "High Hopes",
  length: "8:34"}
]
var blackUhuruTracks = [
  {name: "Youth of Eglington",
  length: "5:00"},
  {name: "Sponji Reggae",
  length: "4:56"},
  {name: "Sistren",
  length: "4:34"},
  {name: "Journey",
  length: "5:21"},
  {name: "Utterance",
  length: "3:42"},
  {name: "Puff She Puff",
  length: "5:08"},
  {name: "Rockstone",
  length: "4:38"},
  {name: "Carbine",
  length: "6:05"},
]
var mjTracks = [
  {name: "Wanna Be Startin' Somethin'",
  length: "6:03"},
  {name: "Baby Be Mine",
  length: "4:20"},
  {name: "The Girl is Mine",
  length: "3:42"},
  {name: "Thriller",
  length: "5:57"},
  {name: "Beat It",
  length: "4:18"},
  {name: "Billie Jean",
  length: "4:54"},
  {name: "Human Nature",
  length: "4:06"},
  {name: "P.Y.T.(Pretty Young Thing)",
  length: "3:59"},
  {name: "The Lady in My Life",
  length: "5:00"},
]

/* format of playlist willbe:
[
  {album:
  track:
  length:},
  {album:
  track:
  length:
  }
  ..etc
]
*/
var playlist = []
//runtime in seconds
var totalRuntime = 0;

//get array of album objects
fetch("https://lit-fortress-6467.herokuapp.com/object")
  .then((resource)=>resource.json())
  .then(function(data){
    var albumArr = data.results
    for(var i = 0; i < albumArr.length; i++){
      //add appropriate tracks for each album
      switch(albumArr[i].title){
        case "Ghost in the Machine":
              albumArr[i].tracks = policeTracks;
              break;
        case "Red":
              albumArr[i].tracks = blackUhuruTracks;
              break;
        case "The Division Bell":
              albumArr[i].tracks = pinkFloydTracks
              break;
        case "Thriller":
              albumArr[i].tracks = mjTracks
              break;
        case "21":
              albumArr[i].tracks = adeleTracks
      }
      //make elements for each album cover
      var albumEl = document.createElement("img")
      albumEl.setAttribute("src", `images/${albumArr[i].cover_art}`)
      albumEl.setAttribute("alt", `album art for ${albumArr[i].title}`)
      albumEl.setAttribute("id", albumArr[i].title)
      albumShelfEl.appendChild(albumEl)

      //add event listeners for each album cover
      albumEl.addEventListener("click", function(){
        //if there's already something in the bin, remove it
        while(allTracksListEl.childNodes[0]){
          allTracksListEl.removeChild(allTracksListEl.childNodes[0])
        }
        //get associated object
        var albumName = this.id
        var albumObj =  albumArr.find(function(obj){
           return obj.title == albumName
        })

        //change left-hand album info area and update runtime
        document.querySelector("#selectedAlbumInfo").innerHTML = `
          ${albumObj.title}<br>
          ${albumObj.artist}<br>
          <img src = "images/${albumObj.cover_art}" class = "selectedAlbumCover">
        `
          //make a list element to store tracks in album bin
          allTrackListEl = document.createElement("ol")
          for(var i = 0; i < albumObj.tracks.length; i++){
            //makeli's of tracks and runtime
            var indivTrackEl = document.createElement("li")
            //attach the length of song as class to use for  total runtime later
            indivTrackEl.classList.add(`${albumObj.tracks[i].length}`)
            indivTrackEl.innerHTML = `${albumObj.tracks[i].name}: ${albumObj.tracks[i].length}`

            //add individual li's to ol of album tracks
            allTracksListEl.appendChild(indivTrackEl)

            //add event listener for each track to add it to other bin when user selects it
            indivTrackEl.addEventListener("click", function(){
              var chosenIndivTrackEl = this .cloneNode(true)
              chosenTracksListEl.appendChild(chosenIndivTrackEl)
              //get runtime of track from class, convert to seconds, add to total runtime
              var runtime = this.classList[0]
              //runtime is in format mm:ss convert to seconds and add to totalRuntime
              var mins = runtime.slice(0, runtime.indexOf(":"))
              var secs = runtime.slice(runtime.indexOf(":")+1, runtime.length)
              totalRuntime += parseInt(mins*60)+parseInt(secs)

              //convert total to mm:ss and change totalruntime in html to match
              var totalRuntimeMin = `${Math.floor(totalRuntime/60)}:${(totalRuntime%60)}`
              document.querySelector("#runtimeSpan").innerHTML = `runtime: ${totalRuntimeMin}`

            })






          }
      })
    }
  })
