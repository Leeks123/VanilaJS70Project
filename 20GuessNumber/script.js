const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function getRandomNumber() {
    return Math.floor(Math.random() * 100)+1;
}

function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said: </div>
        <span class="box">${msg}</span>
    `;
}
function checkNumber(msg) {
    const num = +msg;

    if(Number.isNaN(num)){
        msgEl.innerHTML += `
            <div>That is not a vaild number</div>
        `;
        return;
    }

    if(num > 100 || num < 1) {
        msgEl.innerHTML = `<div>Number must be between 1 and 100</div>`;
        return;
    }

    if(num === randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number! 
            <br/><br/>It was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>    
        `;
    } else if(num > randomNum) {
        msgEl.innerHTML = `
            <div>GO Lower</div>
        `;
    } else {
        msgEl.innerHTML = `
            <div>Go Higher</div>
        `;
    }
}
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    console.log(e.results[0]);
    
    writeMessage(msg);
    checkNumber(msg);
}

recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', () => {
    if(e.target.id === 'play-again') {
        window.location.reload();
    }
})