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

async function smoothTowards(gainNode, target, transitionTime) {
    let change = target - gainNode.gain.value;

    for(let i = 0; i <= 1; i += 0.01) {
        gainNode.gain.value += change / 100;
        await new Promise(r => setTimeout(r, transitionTime / 100));
    }
}

function click1() {
    syncAudio();

    smoothTowards(volumeNode1, 1, 1);
    smoothTowards(volumeNode2, 0, 1);
}

function click2() {
    syncAudio();

    smoothTowards(volumeNode1, 0, 1);
    smoothTowards(volumeNode2, 1, 1);
}

function clickB() {
    syncAudio();

    smoothTowards(volumeNode1, 0.75, 1);
    smoothTowards(volumeNode2, 0.75, 1);
}
