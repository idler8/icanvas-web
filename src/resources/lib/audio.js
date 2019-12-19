import { Howl, Howler } from 'howler';
export default function AudioControlFactory(Loader) {
	return class AudioControl extends Loader {
		//获取音频
		get(key) {
			return this.resources[key] || AudioControl.Error || (AudioControl.Error = new Howl({}));
		}
		//静音
		_mute = false;
		get mute() {
			return this._mute;
		}
		set mute(mute) {
			this._mute = mute;
			Howler.mute(mute);
		}
		//设置音量
		set volume(v = 0) {
			Howler.volume(v);
		}
		get volume() {
			return Howler.volume();
		}
		//加载文件
		Set(url) {
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
	};
}
