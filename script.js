let timer = null;
let startTime = 0;
let elapsed = 0;
let running = false;
let lapNo = 1;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function format(ms) {
  let sec = Math.floor(ms / 1000);
  let min = Math.floor(sec / 60);
  let hr = Math.floor(min / 60);

  sec = sec % 60;
  min = min % 60;
  let milli = Math.floor((ms % 1000) / 10);

  return `${hr.toString().padStart(2,"0")}:${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}:${milli.toString().padStart(2,"0")}`;
}

function start() {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsed;

    timer = setInterval(() => {
      elapsed = Date.now() - startTime;
      display.innerText = format(elapsed);
    }, 10);
  }
}

function pause() {
  running = false;
  clearInterval(timer);
}

function reset() {
  running = false;
  clearInterval(timer);
  elapsed = 0;
  display.innerText = "00:00:00:00";
  laps.innerHTML = "";
  lapNo = 1;
}

function lap() {
  if (running) {
    let div = document.createElement("div");
    div.innerText = `Lap ${lapNo}: ${format(elapsed)}`;
    laps.appendChild(div);
    lapNo++;
  }
}

document.getElementById("start").onclick = start;
document.getElementById("stop").onclick = pause;
document.getElementById("reset").onclick = reset;
document.getElementById("lap").onclick = lap;
