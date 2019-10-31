'use strict';

/*
**
** you need to create a button with id="color-picker-btn" and data-close-text="{Close text}"
**
*/

var colorPickerWidth = 230;
var colorPickerHeight = 131;
var colorPickerHueHeight = 20;
var colorPickerHuePointerWidth = 8;
var colorPickerHuePointerBorderWidth = 2;
var colorPickerPointerBorderWidth = 2;
var colorPickerPointerSize = 15;
var colorPickerSampleSize = 30;
var colorPickerDefaultBorder = '1px solid #aaa';
var colorHue = 0;
var colorPickerInputMargin = '0 2px 5px 5px';
var colorPickerInputWidth = '30px';
var pointerX = 0;
var pointerY = 0;
var huePointerX = 0;
var colorPickerWindowMargin = 10;
var colorPickerFontFamily = 'monospace';

var colorPickerStartX = 0;
var colorPickerStartY = 0;
var colorPickerEndX = 0;
var colorPickerEndY = 0;
var colorPickerBoxWidth = 0;
var colorPickerBoxHeight = 0;


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
	colorPickerDivNode.style.setProperty('font-family', colorPickerFontFamily);
	colorPickerDivNode.style.setProperty('user-select', 'none');
	body.appendChild(colorPickerDivNode);

	var colorPickerCanvasNode = document.createElement('canvas');
	colorPickerCanvasNode.id = 'color-picker';
	colorPickerCanvasNode.style.setProperty('cursor', 'pointer');
	// colorPickerCanvasNode.style.setProperty('border', colorPickerDefaultBorder);
	colorPickerDivNode.appendChild(colorPickerCanvasNode);

	var colorPickerHueDivNode = document.createElement('div');
	colorPickerHueDivNode.id = 'color-picker-hue-box';
	colorPickerHueDivNode.style.setProperty('position', 'relative');
	colorPickerDivNode.appendChild(colorPickerHueDivNode);

	var colorPickerHueCanvasNode = document.createElement('canvas');
	colorPickerHueCanvasNode.id = 'color-picker-hue';
	colorPickerHueCanvasNode.style.setProperty('display', 'block');
	colorPickerHueCanvasNode.style.setProperty('cursor', 'pointer');
	colorPickerHueCanvasNode.style.setProperty('margin', '5px 0');
	colorPickerHueDivNode.appendChild(colorPickerHueCanvasNode);

	var huePointerNode = document.createElement('div');
	huePointerNode.id = 'color-picker-hue-pointer';
	huePointerNode.style.setProperty('position', 'absolute');
	huePointerNode.style.setProperty('top', '0');
	huePointerNode.style.setProperty('width', colorPickerHuePointerWidth + 'px');
	huePointerNode.style.setProperty('height', colorPickerHueHeight + 'px');
	huePointerNode.style.setProperty('border', colorPickerHuePointerBorderWidth + 'px solid #fff');
	huePointerNode.style.setProperty('box-shadow', '#000 0 0 1px');
	huePointerNode.style.setProperty('pointer-events', 'none');
	colorPickerHueDivNode.appendChild(huePointerNode);

	var colorPickerDataDivNode = document.createElement('div');
	colorPickerDataDivNode.id = 'color-picker-data';
	colorPickerDivNode.appendChild(colorPickerDataDivNode);

	var colorPickerDataInnerDivNode = document.createElement('div');
	colorPickerDataInnerDivNode.id = 'color-picker-inner-data';
	colorPickerDataInnerDivNode.style.setProperty('display', 'flex');
	colorPickerDataInnerDivNode.style.setProperty('align-items', 'center');
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
	colorPickerHexSpanNode.style.setProperty('margin-bottom', '0');
	colorPickerDataInnerDivNode.appendChild(colorPickerHexSpanNode);

	var colorPickerHexSpanInput = document.createElement('input');
	colorPickerHexSpanInput.id = 'color-picker-hex-input';
	colorPickerHexSpanInput.style.setProperty('width', '70px');
	colorPickerHexSpanInput.style.setProperty('text-transform', 'uppercase');
	colorPickerHexSpanInput.style.setProperty('margin', colorPickerInputMargin);
	colorPickerHexSpanInput.style.setProperty('margin-bottom', '0');
	colorPickerHexSpanInput.style.setProperty('font-family', colorPickerFontFamily);
	colorPickerDataInnerDivNode.appendChild(colorPickerHexSpanInput);

	// var brNode = document.createElement('br');
	// colorPickerDataDivNode.appendChild(brNode);

	var rgbArray = ['r', 'g', 'b'];
	var rgbInputNodeArray = [];
	var rgbSpanNodeArray = [];
	rgbArray.forEach(function (value, id) {

		rgbSpanNodeArray[value] = document.createElement('span');
		rgbSpanNodeArray[value].id = 'color-picker-' + value + '-span';
		rgbSpanNodeArray[value].innerText = value.toUpperCase();
		rgbSpanNodeArray[value].style.setProperty('margin', colorPickerInputMargin);
		colorPickerDataDivNode.appendChild(rgbSpanNodeArray[value]);

		rgbInputNodeArray[value] = document.createElement('input');
		rgbInputNodeArray[value].id = 'color-picker-' + value + '-input';
		rgbInputNodeArray[value].classList.add('color-picker-input');
		rgbInputNodeArray[value].style.setProperty('width', colorPickerInputWidth);
		rgbInputNodeArray[value].style.setProperty('margin', colorPickerInputMargin);
		rgbInputNodeArray[value].style.setProperty('font-family', colorPickerFontFamily);
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


function setBoxSizingToBorderBox() {
	
	var styleNode = document.createElement('style');
	styleNode.innerHTML = '#color-picker-box, #color-picker-box * {box-sizing: border-box;}';

	var head = document.getElementsByTagName('head')[0];
	head.appendChild(styleNode);
}
setBoxSizingToBorderBox();


var colorPickerPointer = document.getElementById('color-picker-pointer');
var colorPickerSample = document.getElementById('color-picker-sample');
var colorPickerBtn = document.getElementById('color-picker-btn');
colorPickerBtn.openText = colorPickerBtn.innerText;

var colorPickerDiv = document.getElementById('color-picker-box');
var colorPickerHuePointer = document.getElementById('color-picker-hue-pointer');

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

var colorPickerOpen = false;

colorPickerBtn.addEventListener('click', function () {
	
	if (!colorPickerOpen) {
		colorPickerOpen = true;
		initColorPicker(true);
		showColorPicker();
		this.innerText = this.getAttribute('data-close-text');
	}
	else {
		colorPickerOpen = false;
		colorPickerDiv.style.display = 'none';
		this.innerText = this.openText;
	}
});



function getHsvFromRgb(r, g, b) {

	r = r / 255;
	g = g / 255;
	b = b / 255;

	var max = Math.max(Math.max(r,g),b);
	var min = Math.min(Math.min(r,g),b);

	var h = 0;
	var v = +max.toFixed(3);

	var delta = max - min;

	var s = max === 0 ? 0 : delta / max;
	s = +s.toFixed(3);

	if (max != min) {

		switch(max) {

			case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
			case g: h = (b - r) / delta + 2; break;
			case b: h = (r - g) / delta + 4; break;
		}
		h = Math.round(h * 60);
	}

	var result = { 
		h: h, // 0 - 360
		s: s, // 0 - 1
		v: v  // 0 - 1
	};

	return result;
}

function getHexFromRgb(r, g, b) {

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

	colorPickerDiv.style.display = 'block';

	colorPickerBoxWidth = colorPickerDiv.offsetWidth;
	colorPickerBoxHeight = colorPickerDiv.offsetHeight;

	colorPickerDivLeft = colorPickerBtnX + colorPickerBtnWidth / 2 - colorPickerBoxWidth / 2;
	colorPickerDivTop = colorPickerBtnY + colorPickerBtnHeight + topAddSpace;

	var maxColorPickerDivLeft = window.innerWidth - colorPickerBoxWidth - colorPickerWindowMargin;

	if (colorPickerDivLeft < colorPickerWindowMargin) {
		colorPickerDivLeft = colorPickerWindowMargin;
	}
	else if (colorPickerDivLeft > maxColorPickerDivLeft) {
		colorPickerDivLeft = maxColorPickerDivLeft;
	}

	var maxColorPickerDivTop = window.innerHeight - colorPickerBoxHeight
							 - colorPickerBtnHeight - colorPickerWindowMargin;

	if (colorPickerDivTop > maxColorPickerDivTop) {
		colorPickerDivTop = maxColorPickerDivTop;
	}

	colorPickerDiv.style.left = colorPickerDivLeft + 'px';
	colorPickerDiv.style.top = colorPickerDivTop + 'px';


	var pickerBoxOffset = colorPickerDiv.getBoundingClientRect();
	colorPickerStartX = pickerBoxOffset.x;
	colorPickerStartY = pickerBoxOffset.y;
	colorPickerEndX = colorPickerStartX + colorPicker.offsetWidth; 
	colorPickerEndY = colorPickerStartY + colorPicker.offsetHeight;
	// console.log('colorPicker start xy', colorPickerStartX, colorPickerStartY);
	// console.log('colorPicker end xy', colorPickerEndX, colorPickerEndY);
}


function initColorPicker(initHuePalette=false) {

	if (initHuePalette) {
		
		var paletteHue = 0;
		for (var j = 0; j < colorPickerWidth; j++) {

			paletteHue = 360 - Math.round(j / colorPickerWidth * 360);
			colorPickerHueCanvas.fillStyle = 'hsl('+ paletteHue +',100%,50%)';
			colorPickerHueCanvas.fillRect(j, 0, 1, colorPickerHueHeight);
		}
	}

	var colorGradient = colorPickerCanvas.createLinearGradient(0, 0, colorPickerWidth, 0);
	colorGradient.addColorStop(0, 'hsla(' + colorHue + ', 100%, 100%, 1)');
	colorGradient.addColorStop(0.01, 'hsla(' + colorHue + ', 100%, 100%, 1)');
	colorGradient.addColorStop(0.99, 'hsla(' + colorHue + ', 100%, 50%, 1)');
	colorGradient.addColorStop(1, 'hsla(' + colorHue + ', 100%, 50%, 1)');
	colorPickerCanvas.fillStyle = colorGradient;
	colorPickerCanvas.fillRect(0, 0, colorPickerWidth, colorPickerHeight);

	var blackGradient = colorPickerCanvas.createLinearGradient(0, 0, 0, colorPickerHeight);
	blackGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
	blackGradient.addColorStop(0.01, 'rgba(0, 0, 0, 0)');
	blackGradient.addColorStop(0.99, 'rgba(0, 0, 0, 1)');
	blackGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
	colorPickerCanvas.fillStyle = blackGradient;
	colorPickerCanvas.fillRect(0, 0, colorPickerWidth, colorPickerHeight);
	
	// console.log('colorPicker created');
}

function appendRgbToInputs(r, g, b) {
	
	colorPickerRedInput.value = r;
	colorPickerGreenInput.value = g;
	colorPickerBlueInput.value = b;
	colorPickerHexInput.value = getHexFromRgb(r, g, b);
}

function setPointerCoordinates(x, y) {
	
	pointerX = x;
	pointerY = y;
	var pickerX = x - colorPickerPointerSize / 2;
	var pickerY = y - colorPickerPointerSize / 2;
	colorPickerPointer.style.left = pickerX + 'px';
	colorPickerPointer.style.top = pickerY + 'px';
}

function setPickerSampleColor(r, g, b) {

	var rgb = 'rgb('+ r +','+ g +','+ b +')';
	colorPickerSample.style.backgroundColor = rgb;
}

function setSampleColorAndInputsValues(x, y, setCoordinatesBool=false) {

	var colorData = colorPickerCanvas.getImageData(x, y, 1, 1).data;
	var r = colorData[0];
	var g = colorData[1];
	var b = colorData[2];

	appendRgbToInputs(r, g, b);

	if (setCoordinatesBool) {
		
		setPointerCoordinates(x, y);
	}

	setPickerSampleColor(r, g, b);
}

var mouseDown = 0;
var mousedownElement = null;
document.onmousedown = function(e) { 
	mousedownElement = e.srcElement;
	// console.log(mousedownElement);
	mouseDown = 1;
	// console.log('mouseDown: ' + mouseDown);
}
document.onmouseup = function() {
	mousedownElement = null;
	mouseDown = 0;
	// console.log('mouseDown: ' + mouseDown);
}


function onMouseMoveOrClickOnColorPicker(e) {

	var mouseX = e.x;
	var mouseY = e.y;

	if (mouseX < colorPickerStartX) mouseX = colorPickerStartX;
	else if (mouseX >= colorPickerEndX) mouseX = colorPickerEndX - 1; // last getImageData pixel

	if (mouseY < colorPickerStartY) mouseY = colorPickerStartY;
	else if (mouseY > colorPickerEndY) mouseY = colorPickerEndY;

	var relativeMouseX = mouseX - colorPickerStartX;
	var relativeMouseY = mouseY - colorPickerStartY;
	// console.log('relativeMouseXY:', relativeMouseX, relativeMouseY);

	setSampleColorAndInputsValues(relativeMouseX, relativeMouseY, true);
}

function onMouseMoveOrClickOnHuePicker(e) {

	var mouseX = e.x;

	if (mouseX < colorPickerStartX) mouseX = colorPickerStartX;
	else if (mouseX >= colorPickerEndX) mouseX = colorPickerEndX - 1; // last getImageData pixel
	
	var relativeMouseX = mouseX - colorPickerStartX;
	// console.log('relativeMouseX:', relativeMouseX);

	var colorData = colorPickerHueCanvas.getImageData(relativeMouseX, 1, 1, 1).data;

	var r = colorData[0];
	var g = colorData[1];
	var b = colorData[2];
	colorHue = getHsvFromRgb(r, g, b).h;
	// console.log('colorHue: ' + colorHue);

	setColorPickerHuePointer(relativeMouseX);
	// console.log('pointer: ', pointerX, pointerY);

	initColorPicker();
	setSampleColorAndInputsValues(pointerX, pointerY);
}

colorPicker.onmousedown = function (e) {

	onMouseMoveOrClickOnColorPicker(e);
}

colorPickerHue.onmousedown = function (e) {

	onMouseMoveOrClickOnHuePicker(e);
}

document.onmousemove = function (e) {
	// console.log(e.x, e.y);
	if (mouseDown && mousedownElement == colorPicker) {
		onMouseMoveOrClickOnColorPicker(e);
	}

	else if (mouseDown && mousedownElement == colorPickerHue) {
		onMouseMoveOrClickOnHuePicker(e);
	}
}


function setColorPickerHuePointer(relativeMouseX) {

	huePointerX = relativeMouseX - colorPickerHuePointerWidth / 2;
	// console.log('huePointerX::' + huePointerX);
	colorPickerHuePointer.style.left = huePointerX + 'px';
}

function updateColorFromInputsValues(updateHexInput=true) {
	
	var r = +colorPickerRedInput.value;
	var g = +colorPickerGreenInput.value;
	var b = +colorPickerBlueInput.value;

	// console.log('rgb: ', r, g, b);

	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		return false;
	}
	if (r < 0) r = 0;
	if (r > 255) r = 255;
	if (g < 0) g = 0;
	if (g > 255) g = 255;
	if (b < 0) b = 0;
	if (b > 255) b = 255;

	if (updateHexInput) {

		colorPickerHexInput.value = getHexFromRgb(r, g, b);
	}

	var hsv = getHsvFromRgb(r, g, b);	
	var h = hsv.h;
	var s = hsv.s;
	var v = hsv.v;

	colorHue = h;
	initColorPicker();

	var calcHueX = (1 - colorHue / 360) * colorPickerWidth;
	calcHueX = Math.round(calcHueX);
	// console.log('calcHueX:' + calcHueX);
	setColorPickerHuePointer(calcHueX);

	setPickerSampleColor(r, g, b);

	var calcX = s * colorPickerWidth;
	calcX = Math.round(calcX);
	var calcY = (1 - v) * colorPickerHeight;
	calcY = Math.round(calcY);
	setPointerCoordinates(calcX, calcY);
}

var colorPickerRgbInputs = document.getElementsByClassName('color-picker-input');

Array.prototype.forEach.call(colorPickerRgbInputs, function (element, id) {
	
	element.addEventListener('keydown', function (e) {

		// console.log(e.key);
		if (e.key == 'ArrowUp') {
			element.value++;
			updateColorFromInputsValues();
		}
		else if (e.key == 'ArrowDown') {
			element.value--;
			updateColorFromInputsValues();
		}
	});

	element.addEventListener('input', function (e) {

		updateColorFromInputsValues();
	});
});


var hexInputControlDown = false;
var hexInputShiftDown = false;

function colorHexToDecNumber(fullHex) {

	var hex = fullHex.replace('#','');
	var decNumber = parseInt(hex, 16);
	return decNumber;
}

function decNumberToHexColor(decNumber) {

	var hexString = decNumber.toString(16);
	while (hexString.length < 6) {
		hexString = '0' + hexString;
	}
	return '#' + hexString.toUpperCase();
}

function decimalColorNumberToRgb(decNumber) {
	
	var r = Math.floor(decNumber / (256 * 256));
	var b = decNumber % 256;
	var g = ((decNumber - b) % (256 * 256)) / 256;

	return { r: r, g: g, b: b }
}

function setRgbInputsFromDecimalColorNumber(decNumber) {
	
	var rgb = decimalColorNumberToRgb(decNumber);

	// console.log(r + ' ' + g + ' ' + b);
	
	colorPickerRedInput.value = rgb.r;
	colorPickerGreenInput.value = rgb.g;
	colorPickerBlueInput.value = rgb.b;
}

function getRgbFromHex(hexColor) {
	
	var decNumber = colorHexToDecNumber(hexColor);
	var rgb = decimalColorNumberToRgb(decNumber);
	return rgb;
}

function setRgbInputsFromHexColor(hexColor) {

	var rgb = getRgbFromHex(hexColor);

	colorPickerRedInput.value = rgb.r;
	colorPickerGreenInput.value = rgb.g;
	colorPickerBlueInput.value = rgb.b;
}

function modifyInputsAndColorByHexInputKeydown(modifyNumber) {
		
	var decNumber = colorHexToDecNumber(colorPickerHexInput.value);
	
	if (hexInputControlDown) {
		decNumber += (256 * 256 * modifyNumber);
	}
	else if (hexInputShiftDown) {
		decNumber += (256 * modifyNumber);
	}
	else {
		decNumber += (1 * modifyNumber);
	}

	if (decNumber < 0) decNumber = 0;
	else if (decNumber > 256 * 256 * 256 - 1) decNumber = 256 * 256 * 256 - 1;

	var hexColor = decNumberToHexColor(decNumber);

	colorPickerHexInput.value = hexColor;

	setRgbInputsFromDecimalColorNumber(decNumber);

	updateColorFromInputsValues(false);
}

colorPickerHexInput.addEventListener('keydown', function (e) {

	if (e.key == 'Control') hexInputControlDown = true;
	else if (e.key == 'Shift') hexInputShiftDown = true;
});

colorPickerHexInput.addEventListener('keyup', function (e) {

	if (e.key == 'Control') hexInputControlDown = false;
	else if (e.key == 'Shift') hexInputShiftDown = false;
});


colorPickerHexInput.addEventListener('keydown', function (e) {

	if (e.key == 'ArrowUp') modifyInputsAndColorByHexInputKeydown(1);
	else if (e.key == 'ArrowDown') modifyInputsAndColorByHexInputKeydown(-1);
});

colorPickerHexInput.addEventListener('input', function (e) {

	setRgbInputsFromHexColor(colorPickerHexInput.value);
	updateColorFromInputsValues(false);
});