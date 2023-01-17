let canvas = document.getElementById('drawArea')
let canvasHeight = document.getElementById('canvasHeight')
let canvasWidth = document.getElementById('canvasWidth')
let brushWidth = document.getElementById('brushWidth')
let brushColor = document.getElementById('brushColor')
let clean = document.getElementById('clean')
let save = document.getElementById('save')
ctx = canvas.getContext('2d')

let noticeValue = 0

let prevX = null
let prevY = null
let draw = false

canvas.height = canvas.clientHeight
canvas.width  = canvas.clientWidth

brushWidth.addEventListener('input',function (){
    if(brushWidth.value < 1){
        brushWidth.value = 1
    }

    if(brushWidth.value > 100){
        brushWidth.value = 100
    }
    ctx.lineWidth = brushWidth.value
    console.log(brushWidth.value)
})

brushColor.addEventListener('input',function (){
    ctx.fillStyle = brushColor.value
    ctx.strokeStyle = brushColor.value
})

clean.addEventListener('click',function (){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

save.addEventListener('click',function (){
    let dataUrl = canvas.toDataURL("image/png")
    let link = document.createElement("a")
    link.href = dataUrl
    link.download = "canvas.png"
    link.click()
})

canvasWidth.addEventListener('input',function (){
    notice();
    canvas.width = canvasWidth.value
    ctx.lineWidth = brushWidth.value

    if (canvasWidth.value < 100){
        canvasWidth.value = 100
    }

    if (canvasWidth.value > 1280){
        canvasWidth.value = 2000
    }
    canvas.style.width = `${canvasWidth.value}px`
})

canvasHeight.addEventListener('input',function (){
    notice();
    canvas.height = canvasHeight.value
    ctx.lineWidth = brushWidth.value
    
    if (canvasHeight.value < 100){
        canvasHeight.value = 100
    }

    if (canvasHeight.value > 1280){
        canvasHeight.value = 2000
    }
    canvas.style.height = `${canvasHeight.value}px`
})

function notice() {
    if (noticeValue == 0){
        let checkNotice = confirm("Attention! When you change the canvas size, the drawing will be deleted.")
        if (checkNotice){
            console.log(noticeValue)
            noticeValue = 1
        }
        else{
            canvasHeight.value = 400
            canvasWidth.value = 800
            die();
        }
    }
}

canvas.addEventListener("mousedown", (e) => draw = true)
canvas.addEventListener("mouseup", (e) => draw = false)

canvas.addEventListener('mousemove',(e) => {

    if (prevX == null || prevY == null || !draw){
        prevX = e.offsetX
        prevY = e.offsetY
        return
    }

    let currentX = e.offsetX
    let currentY = e.offsetY

    ctx.beginPath()

    ctx.lineCap = "round"
    ctx.moveTo(prevX,prevY)
    ctx.lineTo(currentX,currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})
