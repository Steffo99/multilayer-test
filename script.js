const audioContext = new AudioContext();

let audio1 = null;
let audio2 = null;

let track1 = null;
let track2 = null;

let volumeNode1 = null;
let volumeNode2 = null;

window.onload = () => {
    audio1 = document.getElementById("audio1")
    audio2 = document.getElementById("audio2")

    track1 = audioContext.createMediaElementSource(audio1);
    track2 = audioContext.createMediaElementSource(audio2);

    volumeNode1 = audioContext.createGain();
    volumeNode2 = audioContext.createGain();

    track1.connect(volumeNode1);
    track2.connect(volumeNode2);

    volumeNode1.connect(audioContext.destination);
    volumeNode2.connect(audioContext.destination);
}

function syncAudio() {
    console.debug("Syncing audio...");

    audio1.play();
    audio2.play();

    if(audioContext.state === "suspended") {
        audioContext.resume();
        console.debug("Resuming audioContext...");
    }

}

function click1() {
    syncAudio();

    console.debug("Setting gain for 1...");
    volumeNode1.gain.value = 1;
    volumeNode2.gain.value = 0;
}

function click2() {
    syncAudio();

    console.debug("Setting gain for 2...");
    volumeNode1.gain.value = 0;
    volumeNode2.gain.value = 1;
}

function clickB() {
    syncAudio();

    console.debug("Setting gain for both...");
    volumeNode1.gain.value = 0.75;
    volumeNode2.gain.value = 0.75;
}