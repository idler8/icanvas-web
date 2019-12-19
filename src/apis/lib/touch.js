function GetTouchEvent(dom, MouseEvent) {
	return { identifier: 0, changedTouches: [{ clientX: MouseEvent.clientX - dom.offsetLeft, clientY: MouseEvent.clientY - dom.offsetTop }] };
}
function MouseListen(dom, Touch) {
	let DownState = false;
	dom.addEventListener('mousedown', e => ((DownState = true), Touch.onTouchStart(GetTouchEvent(dom, e))), { passive: true });
	dom.addEventListener('mousemove', e => DownState && Touch.onTouchMove(GetTouchEvent(dom, e)), { passive: true });
	dom.addEventListener('mouseup', e => DownState && ((DownState = false), Touch.onTouchEnd(GetTouchEvent(dom, e))), { passive: true });
	dom.addEventListener('mouseout', e => DownState && ((DownState = false), Touch.onTouchEnd(GetTouchEvent(dom, e))), { passive: true });
}
/**
 * 将dom元素触摸事件和Touch类进行关联
 * @param {HTMLElement} dom
 * @param {ICanvas.UtilTouch} Touch
 */
export default function TouchListen(dom, Touch) {
	if (!('ontouchstart' in window)) return MouseListen(dom, Touch);
	dom.addEventListener('touchstart', e => Touch.onTouchStart(e), { passive: true });
	dom.addEventListener('touchmove', e => Touch.onTouchMove(e), { passive: true });
	dom.addEventListener('touchend', e => Touch.onTouchEnd(e), { passive: true });
	dom.addEventListener('touchcancel', e => Touch.onTouchEnd(e), { passive: true });
}
