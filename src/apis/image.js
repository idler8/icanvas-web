export default class Image {
	load(url) {
		return new Promise((resolve, reject) => {
			let image = new window.Image();
			image.onload = function() {
				resolve(image);
			};
			image.onerror = function(e) {
				reject(e);
			};
			image.key = image.src = url;
		});
	}
}
