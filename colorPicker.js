'use strict';

/*
**
** you need to create a button with id="color-picker-btn"
**
*/

function appendColorPickerHtml() {

	var body = document.getElementsByTagName('body')[0];

	var colorPickerDivNode = document.createElement('div');
	colorPickerDivNode.id = 'color-picker-box';
	colorPickerDivNode.style.setProperty('display', 'none');
	colorPickerDivNode.style.setProperty('position', 'fixed');
	colorPickerDivNode.style.setProperty('top', '0');
	colorPickerDivNode.style.setProperty('left', '0');
	body.appendChild(colorPickerDivNode);

	var colorPickerDiv = document.getElementById('color-picker-box');

	var colorPickerCanvasNode = document.createElement('canvas');
	colorPickerCanvasNode.id = 'color-picker';
	colorPickerCanvasNode.style.setProperty('cursor', 'crosshair');
	colorPickerCanvasNode.style.setProperty('border', '1px solid #bbb');
	colorPickerDiv.appendChild(colorPickerCanvasNode);

	var colorSampleNode = document.createElement('div');
	colorSampleNode.id = 'color-picker-sample';
	colorSampleNode.style.setProperty('position', 'absolute');
	colorSampleNode.style.setProperty('width', '15px');
	colorSampleNode.style.setProperty('height', '15px');
	colorSampleNode.style.setProperty('border', '1px solid #fff');
	colorSampleNode.style.setProperty('box-shadow', '#000 0 0 1px');
	colorSampleNode.style.setProperty('visibility', 'hidden');
	colorPickerDiv.appendChild(colorSampleNode);
}

appendColorPickerHtml();



var colorPickerSample = document.getElementById('color-picker-sample');
var colorPickerBtn = document.getElementById('color-picker-btn');
var colorPickerDiv = document.getElementById('color-picker-box');
var colorPicker = document.getElementById('color-picker');
colorPicker.width = 256;
colorPicker.height = 256;
var colorPickerCanvas = colorPicker.getContext('2d');
// var redValueInput = document.getElementById('red-value');
// var redValueBtn = document.getElementById('apply-red-value');

var colorPickerDivLeft = 0;
var colorPickerDivTop = 0;

colorPickerBtn.addEventListener('click', function () {
	initColorPicker();
	showColorPicker();
});


// var redVal = 128;

// redValueBtn.addEventListener('click', function () {
// 	redVal = redValueInput.value;
// 	initColorPicker();
// });

function getElementOffset(element) {
	return element.getBoundingClientRect(); // ????????????????????
}

function showColorPicker() {
	var colorPickerBtnOffset = colorPickerBtn.getBoundingClientRect();
	var colorPickerBtnX = colorPickerBtnOffset.x;
	var colorPickerBtnY = colorPickerBtnOffset.y;
	var colorPickerBtnWidth = colorPickerBtnOffset.width;
	var colorPickerBtnHeight = colorPickerBtnOffset.height;
	var topAddSpace = 10;

	colorPickerDivLeft = colorPickerBtnX + colorPickerBtnWidth / 2 - colorPicker.width / 2;
	colorPickerDivTop = colorPickerBtnY + colorPickerBtnHeight + topAddSpace;

	if (colorPickerDivLeft < 0) {
		colorPickerDivLeft = 0;
	}

	if (colorPickerDivLeft > window.innerWidth - colorPicker.width) {
		colorPickerDivLeft = window.innerWidth - colorPicker.width;
	}

	colorPickerDiv.style.left = colorPickerDivLeft + 'px';
	colorPickerDiv.style.top = colorPickerDivTop + 'px';
	colorPickerDiv.style.display = 'block';
}


function initColorPicker() {

	// var rgb = '';
	// for (var i = 0; i < 256; i++) {

	// 	for (var j = 0; j < 256; j++) {
		
	// 		rgb = redVal + ',' + i + ',' + j;
	// 		// console.log(rgb);
	// 		colorPickerCanvas.fillStyle = 'rgb('+ rgb +')';
	// 		colorPickerCanvas.fillRect(i, j, 1, 1);
	// 	}
	// }


	var hsl = '';
	var h = 0; // temp
	var s = 0;
	var l = 0;
	for (var i = 0; i < 256; i++) {
		s = (i / 256 * 100).toFixed(2);
		for (var j = 0; j < 256; j++) {
			l = (j / 256 * 100).toFixed(2);
			hsl = h + ',' + s + '%,' + l + '%';
			// hsl = h + ',' + s + '%,' + (l - s / 2) + '%';
			// console.log(hsl);
			colorPickerCanvas.fillStyle = 'hsl('+ hsl +')';
			colorPickerCanvas.fillRect(i, j, 1, 1);
		}
	}
	
	console.log('colorPickerCanvas loaded');
}


var mouseDown = 0;
document.body.onmousedown = function() { 
	mouseDown = 1;
}
document.body.onmouseup = function() {
	mouseDown = 0;
}

function onMouseMoveOrClick(e) {
	
	var mouseX, mouseY;

	if(e.offsetX) {
	    mouseX = e.offsetX;
	    mouseY = e.offsetY;
	}
	else if(e.layerX) {
	    mouseX = e.layerX;
	    mouseY = e.layerY;
	}
	// if (mouseX === undefined) mouseX = 0;
	// if (mouseY === undefined) mouseY = 0;
	// console.log(':', mouseX, mouseY);

	// // // problem with e.offsetX = 0 => mouseX = undefined !!!!!!!!!!!!!!!!!!!!!!!!!!!

	var colorData = colorPickerCanvas.getImageData(mouseX, mouseY, 1, 1).data;
	var rgb = 'rgb('+ colorData[0] +','+ colorData[1] +','+ colorData[2] +')';
	// console.log(rgb);


	colorPickerSample.style.visibility = 'visible';
	colorPickerSample.style.backgroundColor = rgb;
	colorPickerSample.style.top = mouseY + 15 + 'px';
	colorPickerSample.style.left = mouseX + 15 + 'px';
}

colorPicker.onmousemove = function (e) {

	if (mouseDown) {
		onMouseMoveOrClick(e);
	}
}

colorPicker.onmousedown = function (e) {

	onMouseMoveOrClick(e);
}