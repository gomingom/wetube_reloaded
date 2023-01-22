const video = document.querySelector("video");
const playBtn = document.getElementById("playBtn");
const playIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("muteBtn");
const muteIcon = muteBtn.querySelector("i");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let contorlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const formatTime = (second) =>
  new Date(second * 1000).toISOString().substring(11, 19);

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playIcon.classList = video.paused ? "fa-solid fa-play" : "fa-solid fa-pause";
};
const handleMuteClick = () => {
  video.mute();
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteIcon.classList = video.muted
    ? "fa-solid fa-volume-xmark"
    : "fa-solid fa-volume-high";
  if (volumeValue === "0") {
    volumeValue = "0.1";
  }
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteIcon.classList = "fa-solid fa-volume-high";
  }
  if (value === "0") {
    video.muted = true;
    muteIcon.classList = "fa-solid fa-volume-xmark";
  } else {
    video.muted = false;
    muteIcon.classList = "fa-solid fa-volume-high";
  }
  volumeValue = value;
  video.volume = value;
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fa-solid fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fa-solid fa-expand";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (contorlsTimeout) {
    clearTimeout(contorlsTimeout);
    contorlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  controlsMovementTimeout = setTimeout(hideControls, 3000);
  videoControls.classList.add("showing");
};

const handleMouseLeave = () => {
  contorlsTimeout = setTimeout(hideControls, 3000);
};

const handleSpacePress = (event) => {
  const { code } = event;
  if (code === "Space") {
    handlePlayClick();
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/views`, { method: "POST" });
};

window.onkeydown = function (e) {
  return e.keyCode !== 32;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
timeLine.addEventListener("input", handleTimeLineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("mousedown", handlePlayClick);
window.addEventListener("keydown", handleSpacePress);
