function GetTouchEvent(MouseEvent) {
	return { identifier: 0, changedTouches: [{ clientX: MouseEvent.clientX, clientY: MouseEvent.clientY }] };
}
function MouseListen() {
	return function(event) {
		let DownState = false;
		window.document.body.addEventListener('mousedown', e => ((DownState = true), event.start(GetTouchEvent(e))), { passive: true });
		window.document.body.addEventListener('mousemove', e => DownState && event.move(GetTouchEvent(e)), { passive: true });
		window.document.body.addEventListener('mouseup', e => DownState && ((DownState = false), event.end(GetTouchEvent(e))), { passive: true });
		window.document.body.addEventListener('mouseout', e => DownState && ((DownState = false), event.end(GetTouchEvent(e))), { passive: true });
	};
}
/**
 * 将dom元素触摸事件和Touch类进行关联
 * @param {HTMLElement} dom
 * @param {ICanvas.UtilTouch} Touch
 */
export default function TouchListen(useMouse) {
	if (useMouse) return MouseListen();
	return function(event) {
		window.document.body.addEventListener('touchstart', e => event.start(e), { passive: true });
		window.document.body.addEventListener('touchmove', e => event.move(e), { passive: true });
		window.document.body.addEventListener('touchend', e => event.end(e), { passive: true });
		window.document.body.addEventListener('touchcancel', e => event.end(e), { passive: true });
	};
}
