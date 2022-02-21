import { volumeRange, timerRange } from './index.js';
import { FULL_VOLUME } from './constants.js';

class Settings {
  constructor() {
    this.audio = new Audio();
    this.isVolume = null;
    this.timer = null;
    this.isTimer = null;
    this.getLocalData();
  }

  getLocalData() {
    //'false' if nothing and a digit if 'true'
    if (localStorage.getItem(`settingsVolume`)) {
      if (localStorage.getItem(`settingsVolume`) !== "false") {
        this.audio.volume = localStorage.getItem(`settingsVolume`) / FULL_VOLUME;
        volumeRange.value = this.audio.volume * FULL_VOLUME;
      } else {
        if (volumeRange.value > 0) {
          this.isVolume = true;
          this.audio.muted = false;
        } else {
          this.isVolume = false;
          this.audio.muted = true;
        }
        this.audio.volume = volumeRange.value / FULL_VOLUME;
      }
    }

    if (localStorage.getItem(`settingsTimer`)) {
      if (localStorage.getItem(`settingsTimer`) !== "false") {
        this.timer = localStorage.getItem(`settingsTimer`);
        timerRange.value = this.timer;
      } else {
        this.isTimer = false;
        this.timer = timerRange.value;
      }
    }
  }

  setLocalData() {
    if (this.isVolume !== "false") {
      localStorage.setItem(`settingsVolume`, this.audio.volume * FULL_VOLUME);
    } else {
      localStorage.setItem(`settingsVolume`, "false");
    }

    if (this.isTimer !== "false") {
      localStorage.setItem(`settingsTimer`, this.timer);
    } else {
      localStorage.setItem(`settingsTimer`, "false");
    }
  }

  saveSettings() {
    this.audio.volume = volumeRange.value / FULL_VOLUME;
    if (volumeRange.value > 0) {
      this.isVolume = true;
      this.audio.muted = false;
    } else {
      this.isVolume = false;
      this.audio.muted = true;
    }

    this.timer = timerRange.value;

    this.setLocalData();
  }

  playAudio(type) {
    if (type === 'correct') {
      this.audio.src = `./assets/mp3/${type}.mp3`;
    } else {
      this.audio.src = `./assets/mp3/${type}.wav`;
    }
    this.audio.play();
  }

  toggleTimer() {
    return 0;
  }
}

export default Settings;
