import { Howl, Howler } from 'howler';
export default class Audio {
	load(url) {
		return new Promise((resolve, reject) => {
			let audio = new Howl({
				src: url,
				loop: false,
				autoplay: false,
			});
			audio.once('load', function() {
				audio.key = url;
				resolve(audio);
			});
		});
	}
	mute(mute) {
		return Howler.mute(mute);
	}
	volume(v) {
		return Howler.volume(v);
	}
}
