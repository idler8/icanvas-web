export { default as AudioControlFactory } from './resources/audio.js';
export { default as ImageControlFactory } from './resources/image.js';
export { default as Canvas } from './apis/canvas.js';
export { default as Font } from './apis/font.js';
export { default as System } from './apis/system.js';
export { default as Touch } from './apis/touch.js';

export function GetMainCanvasOffset(canvas, realWidth, realHeight) {
	let offsetWidth = realWidth;
	let offsetLeft = 0;
	let offsetHeight = realHeight;
	let offsetTop = 0;
	let ratio = realWidth / realHeight;
	if (ratio < 0.4) {
		offsetHeight = (realWidth / 750) * 1334;
		offsetTop = (realHeight - offsetHeight) / 2;
		ratio = 750 / 1334;
	} else if (ratio > 0.8) {
		offsetWidth = (realHeight / 1334) * 750;
		offsetLeft = (realWidth - offsetWidth) / 2;
		ratio = 750 / 1334;
	}
	canvas.style.position = 'absolute';
	canvas.style.top = offsetTop + 'px';
	canvas.style.left = offsetLeft + 'px';
	canvas.style.width = offsetWidth + 'px';
	canvas.style.height = offsetHeight + 'px';
	return { x: offsetLeft, y: offsetTop, width: offsetWidth, height: offsetHeight, ratio };
}
