'use strict';

/*
**
** you need to create a button with id="color-picker-btn"
**
*/

var colorPickerWidth = 200;
var colorPickerHeight = 200;
var colorPickerHueHeight = 20;
var colorPickerPointerSize = 15;
var colorPickerSampleSize = 30;
var colorPickerDefaultBorder = '1px solid #aaa';
var colorHue = 0;


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
	// colorPickerCanvasNode.style.setProperty('width', colorPickerWidth + 'px');
	// colorPickerCanvasNode.style.setProperty('height', colorPickerHeight + 'px');
	colorPickerCanvasNode.style.setProperty('cursor', 'pointer');
	colorPickerCanvasNode.style.setProperty('border', colorPickerDefaultBorder);
	colorPickerDiv.appendChild(colorPickerCanvasNode);

	var colorPickerHueCanvasNode = document.createElement('canvas');
	colorPickerHueCanvasNode.id = 'color-picker-hue';
	colorPickerHueCanvasNode.style.setProperty('display', 'block');
	colorPickerHueCanvasNode.style.setProperty('cursor', 'pointer');
	colorPickerHueCanvasNode.style.setProperty('margin', '5px 0');
	colorPickerHueCanvasNode.style.setProperty('background-color', '#f3f');
	colorPickerHueCanvasNode.style.setProperty('border', colorPickerDefaultBorder);
	colorPickerDiv.appendChild(colorPickerHueCanvasNode);

	var colorPickerDataDivNode = document.createElement('div');
	colorPickerDataDivNode.id = 'color-picker-data';
	// colorPickerDataDivNode.style.setProperty('width', '100%');
	// colorPickerDataDivNode.style.setProperty('height', 30 + 'px');
	colorPickerDataDivNode.style.setProperty('background-color', '#fff');
	colorPickerDataDivNode.style.setProperty('border', colorPickerDefaultBorder);
	colorPickerDiv.appendChild(colorPickerDataDivNode);

	var colorSampleNode = document.createElement('div');
	colorSampleNode.id = 'color-picker-sample';
	colorSampleNode.style.setProperty('width', colorPickerSampleSize + 'px');
	colorSampleNode.style.setProperty('height', colorPickerSampleSize + 'px');
	colorSampleNode.style.setProperty('border', colorPickerDefaultBorder);
	colorSampleNode.style.setProperty('border-radius', (colorPickerSampleSize / 2) + 'px');
	colorSampleNode.style.setProperty('margin', '5px');
	colorPickerDataDivNode.appendChild(colorSampleNode);

	var colorPointerNode = document.createElement('div');
	colorPointerNode.id = 'color-picker-pointer';
	colorPointerNode.style.setProperty('position', 'absolute');
	colorPointerNode.style.setProperty('width', colorPickerPointerSize + 'px');
	colorPointerNode.style.setProperty('height', colorPickerPointerSize + 'px');
	colorPointerNode.style.setProperty('border', '2px solid #fff');
	colorPointerNode.style.setProperty('border-radius', (colorPickerPointerSize / 2) + 'px');
	colorPointerNode.style.setProperty('box-shadow', '#000 0 0 1px');
	colorPointerNode.style.setProperty('visibility', 'hidden');
	colorPointerNode.style.setProperty('pointer-events', 'none');
	colorPickerDiv.appendChild(colorPointerNode);
}

appendColorPickerHtml();



var colorPickerPointer = document.getElementById('color-picker-pointer');
var colorPickerSample = document.getElementById('color-picker-sample');
var colorPickerBtn = document.getElementById('color-picker-btn');
var colorPickerDiv = document.getElementById('color-picker-box');

var colorPicker = document.getElementById('color-picker');
colorPicker.width = colorPickerWidth;
colorPicker.height = colorPickerHeight;
var colorPickerCanvas = colorPicker.getContext('2d');

var colorPickerHue = document.getElementById('color-picker-hue');
colorPickerHue.width = colorPickerWidth;
colorPickerHue.height = colorPickerHueHeight;
var colorPickerHueCanvas = colorPickerHue.getContext('2d');


// var redValueInput = document.getElementById('red-value');
// var redValueBtn = document.getElementById('apply-red-value');

var colorPickerDivLeft = 0;
var colorPickerDivTop = 0;

colorPickerBtn.addEventListener('click', function () {
	initColorPicker(true);
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

function getHueFromRGB(r,g,b) {
	
	var min = Math.min(Math.min(r,g),b);
	var max = Math.max(Math.max(r,g),b);

	if (min == max) 
		return 0;

    var hue = 0;
    if (max == r) {
        hue = (g - b) / (max - min);

    } else if (max == g) {
        hue = 2 + (b - r) / (max - min);

    } else {
        hue = 4 + (r - g) / (max - min);
    }

    hue = hue * 60;
    if (hue < 0) hue = hue + 360;

    return Math.round(hue);
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
	else if (colorPickerDivLeft > window.innerWidth - colorPicker.width) {
		colorPickerDivLeft = window.innerWidth - colorPicker.width;
	}

	if (colorPickerDivTop > window.innerHeight - colorPicker.height) {
		colorPickerDivTop = window.innerHeight - colorPicker.height;
	}

	colorPickerDiv.style.left = colorPickerDivLeft + 'px';
	colorPickerDiv.style.top = colorPickerDivTop + 'px';
	colorPickerDiv.style.display = 'block';
}


function initColorPicker(initHuePalette=false) {

	var hsl = '';
	var h = colorHue;
	var s = 0;
	var l = 0;
	var hue = 0;

	for (var j = 0; j < colorPickerWidth; j++) {
		s = (j / colorPickerWidth * 100).toFixed(2);
		for (var i = 0; i < colorPickerHeight; i++) {
			l = (100 - i / colorPickerHeight * 100).toFixed(2);
			hsl = h + ',' + s + '%,' + l + '%';
			// hsl = h + ',' + s + '%,' + (l - s / 2) + '%';
			// console.log(hsl);
			colorPickerCanvas.fillStyle = 'hsl('+ hsl +')';
			colorPickerCanvas.fillRect(j, i, 1, 1);
		}

		if (initHuePalette) {
			hue = 360 - Math.round(j / colorPickerWidth * 360);
			colorPickerHueCanvas.fillStyle = 'hsl('+ hue +',100%,50%)';
			colorPickerHueCanvas.fillRect(j, 0, 1, colorPickerHueHeight);
		}
	}
	
	console.log('colorPicker created');
}


var mouseDown = 0;
document.body.onmousedown = function() { 
	mouseDown = 1;
}
document.body.onmouseup = function() {
	mouseDown = 0;
}

function onMouseMoveOrClickOnColorPicker(e) {
	
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
	console.log(colorData);
	var rgb = 'rgb('+ colorData[0] +','+ colorData[1] +','+ colorData[2] +')';
	// console.log(rgb);


	colorPickerPointer.style.visibility = 'visible';
	// colorPickerPointer.style.backgroundColor = rgb;
	// colorPickerPointer.style.top = mouseY + 15 + 'px';
	// colorPickerPointer.style.left = mouseX + 15 + 'px';

	colorPickerPointer.style.top = mouseY - colorPickerPointerSize / 2 + 'px';
	colorPickerPointer.style.left = mouseX - colorPickerPointerSize / 2 + 'px';

	colorPickerSample.style.backgroundColor = rgb;
}

function onMouseMoveOrClickOnColorPickerHue(e) {
	
	// var mouseX;

	// if(e.offsetX) {
	//     mouseX = e.offsetX;
	// }
	// else if(e.layerX) {
	//     mouseX = e.layerX;
	// }

	// var colorData = colorPickerHueCanvas.getImageData(mouseX, 1, 1, 1).data;
	// var rgb = 'rgb('+ colorData[0] +','+ colorData[1] +','+ colorData[2] +')';
	// // console.log(rgb);


	// colorPickerPointer.style.visibility = 'visible';
	// // colorPickerPointer.style.backgroundColor = rgb;
	// // colorPickerPointer.style.top = mouseY + 15 + 'px';
	// // colorPickerPointer.style.left = mouseX + 15 + 'px';

	// colorPickerPointer.style.top = mouseY - colorPickerPointerSize / 2 + 'px';
	// colorPickerPointer.style.left = mouseX - colorPickerPointerSize / 2 + 'px';

	// colorPickerSample.style.backgroundColor = rgb;
}

colorPicker.onmousemove = function (e) {

	if (mouseDown) {
		onMouseMoveOrClickOnColorPicker(e);
	}
}

colorPicker.onmousedown = function (e) {

	onMouseMoveOrClickOnColorPicker(e);
}

colorPickerHue.onmousemove = function (e) {

	if (mouseDown) {
		onMouseMoveOrClickOnColorPickerHue(e);
	}
}

colorPickerHue.onmousedown = function (e) {

	onMouseMoveOrClickOnColorPickerHue(e);
}