/**
 * 获得一个canvas对象
 *
 * @param {String} key 特殊模版标识
 *
 * 打包模式为web时
 * key取main则该canvas将上屏
 */
export default function Canvas(width, height) {
	if (!Canvas.main) document.body.appendChild((Canvas.main = document.createElement('canvas')));
	let canvas = document.createElement('canvas');
	if (width) canvas.width = width;
	if (height) canvas.height = height;
	return canvas;
}
