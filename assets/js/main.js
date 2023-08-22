"use strict"

const encryptBtn = document.body.querySelector(".encryptBtn");
const soundBtn = document.body.querySelector(".soundBtn");
const inputField = document.body.querySelector(".message");
const outputContainer = document.body.querySelector(".output");

const morseAlphabet = [
  { letter: "1", morseCode: ".----" },
  { letter: "2", morseCode: "..---" },
  { letter: "3", morseCode: "...--" },
  { letter: "4", morseCode: "....-" },
  { letter: "5", morseCode: "....." },
  { letter: "6", morseCode: "-...." },
  { letter: "7", morseCode: "--..." },
  { letter: "8", morseCode: "---.." },
  { letter: "9", morseCode: "----." },
  { letter: "0", morseCode: "-----" },
  { letter: " ", morseCode: "    " },
  { letter: "A", morseCode: ".-" },
  { letter: "B", morseCode: "-..." },
  { letter: "C", morseCode: "-.-." },
  { letter: "D", morseCode: "-.." },
  { letter: "E", morseCode: "." },
  { letter: "F", morseCode: "..-." },
  { letter: "G", morseCode: "--." },
  { letter: "H", morseCode: "...." },
  { letter: "I", morseCode: ".." },
  { letter: "J", morseCode: ".---" },
  { letter: "K", morseCode: "-.-" },
  { letter: "L", morseCode: ".-.." },
  { letter: "M", morseCode: "--" },
  { letter: "N", morseCode: "-." },
  { letter: "O", morseCode: "---" },
  { letter: "P", morseCode: ".--." },
  { letter: "Q", morseCode: "--.-" },
  { letter: "R", morseCode: ".-." },
  { letter: "S", morseCode: "..." },
  { letter: "T", morseCode: "-" },
  { letter: "U", morseCode: "..-" },
  { letter: "V", morseCode: "...-" },
  { letter: "W", morseCode: ".--" },
  { letter: "X", morseCode: "-..-" },
  { letter: "Y", morseCode: "-.--" },
  { letter: "Z", morseCode: "--.." }
];

const morseSounds = [
  { letter: "1", morseCode: "./assets/sounds/1.wav" },
  { letter: "2", morseCode: "./assets/sounds/2.wav" },
  { letter: "3", morseCode: "./assets/sounds/3.wav" },
  { letter: "4", morseCode: "./assets/sounds/4.wav" },
  { letter: "5", morseCode: "./assets/sounds/5.wav" },
  { letter: "6", morseCode: "./assets/sounds/6.wav" },
  { letter: "7", morseCode: "./assets/sounds/7.wav" },
  { letter: "8", morseCode: "./assets/sounds/8.wav" },
  { letter: "9", morseCode: "./assets/sounds/9.wav" },
  { letter: "0", morseCode: "./assets/sounds/0.wav" },
  { letter: " ", morseCode: "    " },
  { letter: "A", morseCode: "./assets/sounds/A.wav" },
  { letter: "B", morseCode: "./assets/sounds/B.wav" },
  { letter: "C", morseCode: "./assets/sounds/C.wav" },
  { letter: "D", morseCode: "./assets/sounds/D.wav" },
  { letter: "E", morseCode: "./assets/sounds/E.wav" },
  { letter: "F", morseCode: "./assets/sounds/F.wav" },
  { letter: "G", morseCode: "./assets/sounds/G.wav" },
  { letter: "H", morseCode: "./assets/sounds/H.wav" },
  { letter: "I", morseCode: "./assets/sounds/I.wav" },
  { letter: "J", morseCode: "./assets/sounds/J.wav" },
  { letter: "K", morseCode: "./assets/sounds/K.wav" },
  { letter: "L", morseCode: "./assets/sounds/L.wav" },
  { letter: "M", morseCode: "./assets/sounds/M.wav" },
  { letter: "N", morseCode: "./assets/sounds/N.wav" },
  { letter: "O", morseCode: "./assets/sounds/O.wav" },
  { letter: "P", morseCode: "./assets/sounds/P.wav" },
  { letter: "Q", morseCode: "./assets/sounds/Q.wav" },
  { letter: "R", morseCode: "./assets/sounds/R.wav" },
  { letter: "S", morseCode: "./assets/sounds/S.wav" },
  { letter: "T", morseCode: "./assets/sounds/T.wav" },
  { letter: "U", morseCode: "./assets/sounds/U.wav" },
  { letter: "V", morseCode: "./assets/sounds/V.wav" },
  { letter: "W", morseCode: "./assets/sounds/W.wav" },
  { letter: "X", morseCode: "./assets/sounds/X.wav" },
  { letter: "Y", morseCode: "./assets/sounds/Y.wav" },
  { letter: "Z", morseCode: "./assets/sounds/Z.wav" }
]

let outputSound = [];
let i = 0;

/* ===== UTILITY FUNCTIONS ===== */
// Start Encryption also on Enter key
const handleKey = (event) => {
  event.keyCode === 13
  ? (()=> inputCheck())()
  : null; 
}

const inputCheck = () => {
  const regexStr = /^[a-zA-Z0-9 ]+$/;
  const inputStr = inputField.value.trim();

  console.log(inputStr.length);
  console.log(regexStr.test(inputStr));

  if(inputStr.length === 0 || inputStr.length > 100) {
    outputContainer.innerHTML = `<p style="color:red">Please enter at least one up to 100 letters or numbers at a time...</p>`;
  } else if (!regexStr.test(inputStr)) {   
    outputContainer.innerHTML = `<p style="color:red">Only lower- and uppercase letters A-Z and numbers 0-9 allowed</p>`;
  } else {
    encrypt(inputStr.toLocaleUpperCase().split(""));
  }
}


const printCode = (container, arr) => {
  for(let i = 0; i < arr.length ; i++){
    setTimeout(() => {
      container.textContent += arr[i];
    }, 200 * i)
  }
}


const blendInSoundBtn = () => {
  setTimeout(() => {
    soundBtn.style.opacity = 1;
  }, 3000)
}


const playSound = () => {
  if (i < outputSound.length) {
    const audio = new Audio(outputSound[i]);
    audio.addEventListener('ended', () => {
      i++;
      audio.playbackRate = 0.1;
      playSound();
    });
    audio.play();
  } else {
    i = 0;
  }
}

/* ===== MAIN ENCRYPTION FUNCTION ===== */
const encrypt = (inputMsg) => {
  // Create vars (+ Reset / re-create at n+1 execution)
  let outputMsg = [];
  let outputCode = [];
  outputSound = [];
  outputContainer.textContent = "";
  soundBtn.style.opacity = 0;


  // Create Morse code string
  inputMsg.forEach((char) => {
    morseAlphabet.forEach((code) => {
      if(char === code["letter"]) {
        outputCode.push(code["morseCode"]);
      }
    })
  })
  outputMsg = outputCode.join(" ");

  // Create Morse code sound
  // Filter out empty values which stops the playSound()
  inputMsg.forEach((char) => {
    morseSounds.forEach((sound) => {
      if(char === sound["letter"] && char !== " ") {
        outputSound.push(sound["morseCode"]);
      }
    })
  })

  printCode(outputContainer, outputMsg);
  blendInSoundBtn();
}

/* ===== STARTUP - ASSIGN EVENT LISTENERS ===== */
window.addEventListener("keypress", handleKey);
encryptBtn.addEventListener("click", inputCheck);
soundBtn.addEventListener("click", playSound);
