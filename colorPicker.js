'use strict';

/*
**
** you need to create a button with id="color-picker-btn"
**
*/

var colorPickerWidth = 200;
var colorPickerHeight = 201;
var colorPickerHueHeight = 20;
var colorPickerPointerSize = 15;
var colorPickerSampleSize = 30;
var colorPickerDefaultBorder = '1px solid #aaa';
var colorHue = 0;
var colorPickerInputMargin = '0 5px 5px 5px';
var colorPickerInputWidth = '30px';
var pointerX = 0;
var pointerY = 0;


function appendColorPickerHtml() {

	var body = document.getElementsByTagName('body')[0];

	var colorPickerDivNode = document.createElement('div');
	colorPickerDivNode.id = 'color-picker-box';
	colorPickerDivNode.style.setProperty('display', 'none');
	colorPickerDivNode.style.setProperty('position', 'fixed');
	colorPickerDivNode.style.setProperty('top', '0');
	colorPickerDivNode.style.setProperty('left', '0');
	colorPickerDivNode.style.setProperty('background-color', '#fff');
	colorPickerDivNode.style.setProperty('border', colorPickerDefaultBorder);
	body.appendChild(colorPickerDivNode);

	// var colorPickerDivNode = document.getElementById('color-picker-box');

	var colorPickerCanvasNode = document.createElement('canvas');
	colorPickerCanvasNode.id = 'color-picker';
	colorPickerCanvasNode.style.setProperty('cursor', 'pointer');
	// colorPickerCanvasNode.style.setProperty('border', colorPickerDefaultBorder);
	colorPickerDivNode.appendChild(colorPickerCanvasNode);

	var colorPickerHueCanvasNode = document.createElement('canvas');
	colorPickerHueCanvasNode.id = 'color-picker-hue';
	colorPickerHueCanvasNode.style.setProperty('display', 'block');
	colorPickerHueCanvasNode.style.setProperty('cursor', 'pointer');
	colorPickerHueCanvasNode.style.setProperty('margin', '5px 0');
	// colorPickerHueCanvasNode.style.setProperty('border', colorPickerDefaultBorder);
	colorPickerDivNode.appendChild(colorPickerHueCanvasNode);

	var colorPickerDataDivNode = document.createElement('div');
	colorPickerDataDivNode.id = 'color-picker-data';
	colorPickerDivNode.appendChild(colorPickerDataDivNode);

	var colorPickerDataInnerDivNode = document.createElement('div');
	// colorPickerDataInnerDivNode.id = 'color-picker-inner-data';
	colorPickerDataDivNode.appendChild(colorPickerDataInnerDivNode);

	var colorSampleNode = document.createElement('div');
	colorSampleNode.id = 'color-picker-sample';
	colorSampleNode.style.setProperty('display', 'inline-block');
	colorSampleNode.style.setProperty('width', colorPickerSampleSize + 'px');
	colorSampleNode.style.setProperty('height', colorPickerSampleSize + 'px');
	colorSampleNode.style.setProperty('border', colorPickerDefaultBorder);
	colorSampleNode.style.setProperty('border-radius', (colorPickerSampleSize / 2) + 'px');
	colorSampleNode.style.setProperty('margin', '5px');
	colorPickerDataInnerDivNode.appendChild(colorSampleNode);

	var colorPickerHexSpanNode = document.createElement('span');
	colorPickerHexSpanNode.id = 'color-picker-hex-span';
	colorPickerHexSpanNode.innerText = 'HEX';
	colorPickerHexSpanNode.style.setProperty('margin', colorPickerInputMargin);
	colorPickerDataInnerDivNode.appendChild(colorPickerHexSpanNode);

	var colorPickerHexSpanInput = document.createElement('input');
	colorPickerHexSpanInput.id = 'color-picker-hex-input';
	colorPickerHexSpanInput.style.setProperty('width', '70px');
	colorPickerHexSpanInput.style.setProperty('margin', colorPickerInputMargin);
	colorPickerDataInnerDivNode.appendChild(colorPickerHexSpanInput);

	// var brNode = document.createElement('br');
	// colorPickerDataDivNode.appendChild(brNode);

	var rgbArray = ['r', 'g', 'b'];
	var rgbInputNodeArray = [];
	var rgbSpanNodeArray = [];
	rgbArray.forEach(function (value, id) {

		rgbSpanNodeArray[value] = document.createElement('span');
		rgbSpanNodeArray[value].id = 'color-picker-' + value + '-span';
		rgbSpanNodeArray[value].innerText = value;
		rgbSpanNodeArray[value].style.setProperty('margin', colorPickerInputMargin);
		colorPickerDataDivNode.appendChild(rgbSpanNodeArray[value]);

		rgbInputNodeArray[value] = document.createElement('input');
		rgbInputNodeArray[value].id = 'color-picker-' + value + '-input';
		rgbInputNodeArray[value].style.setProperty('width', colorPickerInputWidth);
		rgbInputNodeArray[value].style.setProperty('margin', colorPickerInputMargin);
		// rgbInputNodeArray[value].setAttribute('type', 'number');
		colorPickerDataDivNode.appendChild(rgbInputNodeArray[value]);		
	});

	var colorPointerNode = document.createElement('div');
	colorPointerNode.id = 'color-picker-pointer';
	colorPointerNode.style.setProperty('position', 'absolute');
	colorPointerNode.style.setProperty('top', '0');
	colorPointerNode.style.setProperty('width', colorPickerPointerSize + 'px');
	colorPointerNode.style.setProperty('height', colorPickerPointerSize + 'px');
	colorPointerNode.style.setProperty('border', '2px solid #fff');
	colorPointerNode.style.setProperty('border-radius', (colorPickerPointerSize / 2) + 'px');
	colorPointerNode.style.setProperty('box-shadow', '#000 0 0 1px');
	colorPointerNode.style.setProperty('pointer-events', 'none');
	colorPickerDivNode.appendChild(colorPointerNode);
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

var colorPickerRedInput = document.getElementById('color-picker-r-input');
var colorPickerGreenInput = document.getElementById('color-picker-g-input');
var colorPickerBlueInput = document.getElementById('color-picker-b-input');
var colorPickerHexInput = document.getElementById('color-picker-hex-input');


var colorPickerDivLeft = 0;
var colorPickerDivTop = 0;

colorPickerBtn.addEventListener('click', function () {
	initColorPicker(true);
	showColorPicker();
});



function getHueFromRgb(r,g,b) {

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

function getHexFromRgb(r,g,b) {

	var hexR = r.toString(16);
	if (hexR.length == 1) hexR = '0' + hexR;
	var hexG = g.toString(16);
	if (hexG.length == 1) hexG = '0' + hexG;
	var hexB = b.toString(16);
	if (hexB.length == 1) hexB = '0' + hexB;

	var hex = '#' + hexR + hexG + hexB;

    return hex.toUpperCase();
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
			l = (100 - i / (colorPickerHeight - 1) * 100).toFixed(2);
			// console.log(l);
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
	
	// console.log('colorPicker created');
}

function appendRgbToInputs(r, g, b) {
	
	colorPickerRedInput.value = r;
	colorPickerGreenInput.value = g;
	colorPickerBlueInput.value = b;
	colorPickerHexInput.value = getHexFromRgb(r, g, b);
}

function setSampleColorAndInputsValues(x, y, setCoordinates=false) {

	var colorData = colorPickerCanvas.getImageData(x, y, 1, 1).data;
	var r = colorData[0];
	var g = colorData[1];
	var b = colorData[2];
	var rgb = 'rgb('+ r +','+ g +','+ b +')';

	appendRgbToInputs(r, g, b);

	if (setCoordinates) {
		
		pointerX = x - colorPickerPointerSize / 2;
		pointerY = y - colorPickerPointerSize / 2;
		colorPickerPointer.style.top = pointerY + 'px';
		colorPickerPointer.style.left = pointerX + 'px';
	}

	colorPickerSample.style.backgroundColor = rgb;
}

var mouseDown = 0;
var mousedownElement = null;
document.body.onmousedown = function(e) { 
	mousedownElement = e.srcElement;
	// console.log(mousedownElement);
	mouseDown = 1;

}
document.body.onmouseup = function() {
	mousedownElement = null;
	mouseDown = 0;
}

var lastMouseX = 0;
var lastMouseY = 0;
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

	if (mouseX === undefined || mouseX < 0) mouseX = lastMouseX;
	else mouseX--; // 1px difference in getImageData
	
	if (mouseY === undefined || mouseY < 0) mouseY = lastMouseY;
	
	// console.log(':', mouseX, mouseY);

	lastMouseX = mouseX;
	lastMouseY = mouseY;

	setSampleColorAndInputsValues(mouseX, mouseY, true);
}

function onMouseMoveOrClickOnHuePicker(e) {
	
	var mouseX;

	if(e.offsetX) {
	    mouseX = e.offsetX;
	}
	else if(e.layerX) {
	    mouseX = e.layerX;
	}

	var colorData = colorPickerHueCanvas.getImageData(mouseX, 1, 1, 1).data;
	colorHue = getHueFromRgb(colorData[0], colorData[1], colorData[2]);
	// console.log(colorHue);

	initColorPicker();
	setSampleColorAndInputsValues(pointerX, pointerY);
}

colorPicker.onmousemove = function (e) {

	if (mouseDown && mousedownElement == colorPicker) {
		onMouseMoveOrClickOnColorPicker(e);
	}
}

colorPicker.onmousedown = function (e) {

	onMouseMoveOrClickOnColorPicker(e);
}

colorPickerHue.onmousemove = function (e) {

	if (mouseDown && mousedownElement == colorPickerHue) {
		onMouseMoveOrClickOnHuePicker(e);
	}
}

colorPickerHue.onmousedown = function (e) {

	onMouseMoveOrClickOnHuePicker(e);
}

// // // !!!!!!! loose element coordinates when outside the element
// document.onmousemove = function (e) {
// 	// console.log(e);
// 	if (mouseDown && mousedownElement == colorPicker) {
// 		onMouseMoveOrClickOnColorPicker(e);
// 	}

// 	else if (mouseDown && mousedownElement == colorPickerHue) {
// 		onMouseMoveOrClickOnHuePicker(e);
// 	}
// }