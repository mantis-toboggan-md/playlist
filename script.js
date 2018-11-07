//generate 3 random numbers between 0 and 5 to decide which albums to display
var randomIndexArr = [];
var randomIndex = (Math.floor(Math.random() * 5))
randomIndexArr.push(randomIndex)
while(randomIndex == randomIndexArr[0]){
  randomIndex = (Math.floor(Math.random() * 5))
}
randomIndexArr.push(randomIndex)
while(randomIndex == randomIndexArr[0]||randomIndex == randomIndexArr[1]){
  randomIndex = (Math.floor(Math.random() * 5))
}
randomIndexArr.push(randomIndex)

//get array of album objects
fetch("https://lit-fortress-6467.herokuapp.com/object")
  .then((resource)=>resource.json())
  .then(function(data){
      var albumArr = data.results
      var albumPreviewsEl = document.querySelector("#albumPreviews")
      //run for loop 3 times to get 3 image elements
      for(var i = 0; i < 4; i++){
        var imgEl = document.createElement("img")
        //pick album using indexes from randomIndexArr
        imgEl.setAttribute("src", `images/${albumArr[randomIndexArr[i]].cover_art}`)
        imgEl.setAttribute("id", albumArr[randomIndexArr[i]].artist)
        imgEl.classList.add("albumArt")
        albumPreviewsEl.appendChild(imgEl)
      }







  })
