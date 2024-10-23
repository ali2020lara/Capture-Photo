let elementVideo = document.querySelector("#video");
let elementCanvas = document.querySelector("#canvas");
let btnStartScan = document.querySelector("#btnStartScan");
let photoFlash = document.querySelector("#photoFlash");
let photoNoFlash = document.querySelector("#photoNoFlash");
let stream = null;

async function startScan() {
    console.log("btnStartScan");
    await initCamera();
    capturePhoto(true);
    setTimeout(() => {
        capturePhoto(false);
    }, 100);
}
async function initCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 2048 },
                height: { ideal: 1536 },
                aspectRatio: 4 / 3,
            },
        });
        elementVideo.srcObject = stream;
    } catch (error) {
        console.error("Error accessing camera: ", error);
    }
}
function capturePhoto(withFlash) {
    const canvas = elementCanvas;
    const video = elementVideo;
    canvas.width = 2048;
    canvas.height = 1536;
    const context = canvas.getContext("2d");
    if (withFlash) {
        context.filter = "brightness(1.5)";
    } else {
        context.filter = "brightness(1)";
    }
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (withFlash) {
                photoFlash.src = reader.result;
            } else {
                photoNoFlash.src = reader.result;
            }
        };
        reader.readAsDataURL(blob);
    }, "image/jpeg");
}
btnStartScan.addEventListener("click", startScan);
