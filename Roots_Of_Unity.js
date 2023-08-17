//Add zooming, and scrolling
const canvas = document.getElementById("canvas");
const graphics = canvas.getContext("2d");
const text = document.getElementById("text");
const num = document.getElementById("num");
const graph = document.getElementById("button");
const width = canvas.width;
const height = canvas.height;
const pi = Math.PI;
const m = 225;
const shift = width/2;
let fontSize = 50;
const r = 10

let mouseDown = false;
let onRoot = false;

let rootsOfUnity = [];

canvas.addEventListener("mousemove", function(mouse) {
	for (let i = 0; i < rootsOfUnity.length; i++) {
		rootsOfUnity[i].mouseOver(mouse.offsetX, mouse.offsetY);
	}
});

button.onclick = () => {
	draw(num.value)
};

//Distance between 2 point
function dist(x1, y1, x2, y2) {
	return Math.sqrt((x1-x2)**2+(y1-y2)**2);
}

function Point(x, y, posX, posY, r, index, n) {
	this.x = x;
	this.y = y;
	this.posX = posX;
	this.posY = posY;
	this.r = r;

	this.mouseOver = function(mouseX, mouseY) {
		if (dist(this.posX, this.posY, mouseX, mouseY) < this.r) {
			text.innerHTML = `Coordinate of the Root of Unity: (${this.x.toFixed(5)}, ${this.y.toFixed(5)}), Exact Value: (Math.cos(<sup>${index*2}pi</sup>&frasl;<sub>${n}</sub>-<sup>2pi</sup>&frasl;<sub>${n}</sub>), Math.sin(<sup>${index*2}pi</sup>&frasl;<sub>${n}</sub>-<sup>2pi</sup>&frasl;<sub>${n}</sub>))`;
		}
	}
}

//Drawing a regular polygon with n sides
function drawPolygon(n) {
	const s = 2*pi/n;

	rootsOfUnity = [];

	for (let i = 1; i <= n; i++) {
		graphics.lineWidth = 4;
		graphics.strokeStyle = "green";
		graphics.beginPath();
		graphics.moveTo(m*Math.cos(i*s-s)+shift, -1*m*Math.sin(i*s-s)+shift);
		graphics.lineTo(m*Math.cos((i+1)*s-s)+shift, -1*m*Math.sin((i+1)*s-s)+shift);
		graphics.stroke();
	}

	for (let i = 1; i <= n; i++) {
		graphics.fillStyle = "red";
		graphics.beginPath();
		graphics.arc(m*Math.cos(i*s-s)+shift, -1*m*Math.sin(i*s-s)+shift, r, 0, pi*2);
		graphics.closePath();
		graphics.fill();

		rootsOfUnity.push(new Point(Math.cos(i*s-s), -1*Math.sin(i*s-s), m*Math.cos(i*s-s)+shift, -1*m*Math.sin(i*s-s)+shift, r, i, n));
	}
}

function draw(n) {
	graphics.clearRect(0, 0, width, height);

	//Drawing the unit circle
	graphics.strokeStyle = "blue";
	graphics.lineWidth = 5;
	graphics.beginPath();
	graphics.arc(width/2, height/2, 225, 0, pi*2);
	graphics.closePath();
	graphics.stroke();

	//drawing the lines on the axis
	//Vertical axis
	graphics.strokeStyle = "white";
	graphics.beginPath();
	graphics.moveTo(width/2, 0);
	graphics.lineTo(width/2, height);
	graphics.stroke();

	//Horizontal axis
	graphics.beginPath();
	graphics.moveTo(0, height/2);
	graphics.lineTo(width, height/2);
	graphics.stroke();

	drawPolygon(n);

	//The numbers on the axis
	graphics.fillStyle = "purple";
	graphics.textAlign = "center"
	graphics.font = `${fontSize}px sans-serif`;
	graphics.fillText("-1", 3*fontSize/4, height/2+fontSize);
	graphics.fillText("1", width-3*fontSize/4, height/2+fontSize);
	graphics.fillText("-i", width/2+3*fontSize/4, height-fontSize/2);
	graphics.fillText("i", width/2+3*fontSize/4, fontSize);
}

draw(num.value);