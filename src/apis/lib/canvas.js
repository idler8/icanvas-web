/**
 * 获得一个canvas对象
 *
 * @param {String} key 特殊模版标识
 *
 * 打包模式为web时
 * key取main则该canvas将上屏
 */
export default function Canvas(key) {
	if (key && Canvas[key]) return Canvas[key];
	let canvas = document.createElement('canvas');
	if (key == 'main') document.body.appendChild(canvas);
	return key ? (Canvas[key] = canvas) : canvas;
}
