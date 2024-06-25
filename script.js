//Intialization the variable
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('myprogressBar');
let gif =document.getElementById('gif');
let mastersongName = document.getElementById('mastersongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  {songName: "Arjan vailly ne", filePath: "song/1.mp3", coverPath: "cover/1.jpg"},
  {songName: "Sooraj hi chhaon banke ", filePath: "song/2.mp3", coverPath: "cover/2.jpg"},
  {songName: "Ishq jaisa kuch", filePath: "song/3.mp3", coverPath: "cover/3.jpg"},
  {songName: "Lutt putt gya", filePath: "song/4.mp3", coverPath: "cover/4.jpg"},
  {songName: "Crakk Dil Jhoom ", filePath: "song/5.mp3", coverPath: "cover/5.jpg"},
  {songName: "Jeena Haraam", filePath: "song/6.mp3", coverPath: "cover/6.jpg"}
]

songItems.forEach((element , i)=>{
  
   element.getElementsByTagName("img")[0].src = songs[i].coverPath;
   element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play();
//handle play/pause click
masterPlay.addEventListener('click',()=>{
  if(audioElement.paused||audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  }
  else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
})

//Listen to event 
audioElement.addEventListener('timeupdate',()=>{
  // console.log('timeupdate')
  //update seekbar 
    progress =parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myprogressBar.value = progress;
})

myprogressBar.addEventListener('change',()=>{
  audioElement.currentTime =myprogressBar.value*audioElement.duration/100;  
})

const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src= `song/${songIndex +1}.mp3`;
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  })
})

document.getElementById('next').addEventListener('click',()=>{
  if(songIndex>=5){
    songIndex = 0;
  }
  else{
    songIndex +=1;
  }
    audioElement.src= `song/${songIndex+1}.mp3`;
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  
})


document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex<=0){
    songIndex = 5;
  }
  else{
    songIndex -=1;
  }
    audioElement.src= `song/${songIndex+1}.mp3`;  
    mastersongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  
})