let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = window.screen.width;
let lineColor;
let height = 900;
let position = {
    x: undefined,
    y: undefined
}
let lineWidth
let flag = false;
let eraseFlag = false;

let pen = document.getElementById("pen");
let erase = document.getElementById("erase");
let download = document.getElementById("download");
let color = document.getElementsByTagName("li");
let clear = document.getElementById("clear");

canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
canvas.style.cssText = "top:" + (document.documentElement.clientHeight - height) + "px";
canvas.onmousedown = function (e) {
    flag = true;
    position.x = e.pageX;
    position.y = e.pageY - (document.documentElement.clientHeight - height);
}
canvas.onmousemove = function (e) {
    let newPosition = {
        x: e.pageX,
        y: e.pageY - (document.documentElement.clientHeight - height)
    }

    if (flag) {
        if (eraseFlag) {
            ctx.clearRect(newPosition.x - (lineWidth / 2), newPosition.y - (lineWidth / 2), lineWidth,
                lineWidth);
        } else {
            lineWidth = 15;
            drawLine(position.x, position.y, newPosition.x, newPosition.y, lineWidth)
        }
    }
    position = newPosition;

}

canvas.onmouseup = function (e) {
    flag = false
}



function drawLine(x1, y1, x2, y2, lineWidth) {
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
pen.onclick = function () {
    eraseFlag = false
    pen.classList.add("active");
    erase.classList.remove("active")
}
erase.onclick = function (e) {
    eraseFlag = true;
    erase.classList.add("active");
    pen.classList.remove("active")
}
download.onclick = function () {
    let url = canvas.toDataURL("image/png");
    //    console.log(url);
    let a = document.createElement("a");
    document.body.appendChild(a);
    //    a.setAttribute("url",url);
    //    a.setAttribute("download","我的图画")
    a.href = url;
    a.download = "xxxx"
    a.click()
}
clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

for (let i = 0; i < color.length; i++) {
    color[i].onclick = function (e) {
        lineColor = e.target.dataset.color;
        for (let i = 0; i < color.length; i++) {
            color[i].classList.remove("active");
        }
        color[i].classList.add("active")
    }
}