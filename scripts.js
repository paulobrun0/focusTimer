const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");

const playBtn = document.querySelector("#play");
const resumeBtn = document.querySelector("#resume");
const pauseBtn = document.querySelector("#pause");
const stopBtn = document.querySelector("#stop");
const plusFiveBtn = document.querySelector("#plusFive");
const minusFiveBtn = document.querySelector("#minusFive");

const audioEl = document.querySelectorAll(".sounds .ph");

let interval;
let isPlaying = false;
let minutes = 0;
let seconds = 0;

playBtn.addEventListener("click", playTimer);

pauseBtn.addEventListener("click", pauseTimer);

resumeBtn.addEventListener("click", resumeTimer);

stopBtn.addEventListener("click", stopTimer);

let currentAudio = null;

function play(sound) {
  if (currentAudio && currentAudio !== sound) {
    const previousAudio = document.getElementById(currentAudio);
    previousAudio.style.background = "#e1e1e6";
    previousAudio.style.color = "#000000";
    pause();
  }
  currentAudio = sound;
  audio = new Audio(`audios/${sound}.wav`);
  audio.loop = true;
  audio.play();
  audio.style.background = "#e1e1e6";
}

function pause() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

audioEl.forEach((audio) => {
  audio.addEventListener("click", () => {
    if (!audio.classList.contains("active")) {
      audioEl.forEach((el) => el.classList.remove("active"));
      let idAudio = audio.id;
      audio.classList.add("active");
      audio.style.background = "#02799d";
      audio.style.color = "#fff";

      play(idAudio);
    } else {
      pause();
      audio.classList.remove("active");
      audio.style.background = "#e1e1e6";
      audio.style.color = "#000000";
      currentAudio = null;
    }
  });
});

function playTimer() {
  if (minutes === 0) return;

  interval = setInterval(() => {
    if (!isPlaying) {
      seconds -= 1;
      if (seconds === -1) {
        seconds = 59;
        minutes--;
      }

      if (minutes === 0 && seconds === 0) {
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
        clearInterval(interval);
        isPlaying = false;
      }

      minutesEl.textContent = formatTime(minutes);
      secondsEl.textContent = formatTime(seconds);
      console.log(seconds);
    }
  }, 1000);

  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
  resumeBtn.style.display = "none";
}

function pauseTimer() {
  isPlaying = true;
  playBtn.style.display = "none";
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "block";
}

function resumeTimer() {
  isPlaying = false;
  pauseBtn.style.display = "block";
  resumeBtn.style.display = "none";
}

function stopTimer() {
  clearInterval(interval);
  isPlaying = false;
  minutes = 0;
  seconds = 0;
  minutesEl.textContent = formatTime(0);
  secondsEl.textContent = formatTime(0);
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

plusFiveBtn.addEventListener("click", () => {
  minutesEl.textContent = formatTime((minutes += 5));
  console.log(minutes);
  if (minutes >= 60) {
    minutes = 60;
    minutesEl.textContent = formatTime(60);
  }
});

minusFiveBtn.addEventListener("click", () => {
  minutesEl.textContent = formatTime((minutes -= 5));
  if (minutes <= 0) {
    minutes = 0;
    minutesEl.textContent = formatTime(0);
  }
});

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
