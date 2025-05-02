const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const recordedVideo = document.getElementById('recordedVideo');

let mediaRecorded;
let recordedChunks = []

async function startRecording () {
    try{
        const stream = await navigator.mediaDevices.getDisplayMedia({video:true})
        mediaRecorded = new MediaRecorder(stream)
        mediaRecorded.ondataavailable = event =>{
            if(event.data.size > 0){
                recordedChunks.push(event.data)
            }
        }

        mediaRecorded.onstop = () =>{
            const blob = new Blob (recordedChunks, {type: "video/webm"})
            recordedVideo.src = URL.createObjectURL(blob)
        }

        startButton.disabled = true;
        stopButton.disabled = false
        mediaRecorded.start()
    }
    catch(error){
        console.log('error is');
    }
}

function stopRecording(){
    if(mediaRecorded.state === 'recording'){
        mediaRecorded.stop()
        startButton.disabled = false
        stopButton.disabled = true
        recordedChunks = []
    }
}

startButton.addEventListener('click', startRecording)
stopButton.addEventListener('click', stopRecording)