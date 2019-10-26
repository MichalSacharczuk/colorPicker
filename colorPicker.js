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
	colorPickerDivNode.style.setProperty('position', 'fixed');
	colorPickerDivNode.style.setProperty('top', '0');
	colorPickerDivNode.style.setProperty('left', '0');
	body.appendChild(colorPickerDivNode);

	var colorPickerDiv = document.getElementById('color-picker-box');

	var colorPickerCanvasNode = document.createElement('canvas');
	colorPickerCanvasNode.id = 'color-picker';
	colorPickerCanvasNode.style.setProperty('cursor', 'crosshair');
	colorPickerDiv.appendChild(colorPickerCanvasNode);

	var colorSampleNode = document.createElement('div');
	colorSampleNode.id = 'color-picker-sample';
	colorSampleNode.style.setProperty('position', 'fixed');
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
// var redValueInput = document.getElementById('red-value');
// var redValueBtn = document.getElementById('apply-red-value');
var colorPicker = document.getElementById('color-picker');
colorPicker.width = 256;
colorPicker.height = 256;
var canvasColorPicker = colorPicker.getContext('2d');

colorPickerBtn.addEventListener('click', function () {
	initColorPicker();
});


// var redVal = 128;

// redValueBtn.addEventListener('click', function () {
// 	redVal = redValueInput.value;
// 	initColorPicker();
// });



function initColorPicker() {

	// var rgb = '';
	// for (var i = 0; i < 256; i++) {

	// 	for (var j = 0; j < 256; j++) {
		
	// 		rgb = redVal + ',' + i + ',' + j;
	// 		// console.log(rgb);
	// 		canvasColorPicker.fillStyle = 'rgb('+ rgb +')';
	// 		canvasColorPicker.fillRect(i, j, 1, 1);
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
			canvasColorPicker.fillStyle = 'hsl('+ hsl +')';
			canvasColorPicker.fillRect(i, j, 1, 1);
		}
	}
	
	console.log('canvasColorPicker loaded');
}




colorPicker.onmousemove = function (e) {

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

    var colorData = canvasColorPicker.getImageData(mouseX, mouseY, 1, 1).data;
    var rgb = 'rgb('+ colorData[0] +','+ colorData[1] +','+ colorData[2] +')';
    // console.log(rgb);


    colorPickerSample.style.visibility = 'visible';
    colorPickerSample.style.backgroundColor = rgb;
    colorPickerSample.style.top = mouseY + 15 + 'px';
    colorPickerSample.style.left = mouseX + 15 + 'px';
}

