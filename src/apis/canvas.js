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
	if (width == 'canvas') return Canvas.main;
	let canvas = document.createElement('canvas');
	if (width > 0) canvas.width = width;
	if (height > 0) canvas.height = height;
	return canvas;
}
