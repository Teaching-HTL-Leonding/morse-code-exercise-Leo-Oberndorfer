import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  note_context: AudioContext = new AudioContext();
  note_node: OscillatorNode = this.note_context.createOscillator();
  gain_node: GainNode = this.note_context.createGain();

  constructor() {
    this.note_node.frequency.value = 440;
    this.gain_node.gain.value = 0;
    this.note_node.connect(this.gain_node);
    this.gain_node.connect(this.note_context.destination);
    this.note_node.start();
  }

  startNotePlaying() {
    // Pass a start time of 0 so it starts ramping up immediately.
    this.gain_node.gain.setTargetAtTime(0.1, 0, 0.001)
  }

  stopNotePlaying() {
    // Pass a start time of 0 so it starts ramping down immediately.
    this.gain_node.gain.setTargetAtTime(0, 0, 0.001)
  }

  /** Duration of a dot sound */
  DOT_TIME = 50;

  /** Duration of a dash sound */
  DASH_TIME = this.DOT_TIME * 3;

  /** Waiting time between dashes and dots */
  SYMBOL_BREAK = this.DOT_TIME;

  /** Waiting time between dashes and dots */
  LETTER_BREAK = this.DOT_TIME * 3;

  /** Waiting time between words */
  WORD_BREAK = this.DOT_TIME * 7;

  /** Sleep for a given amount of miliseconds */
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /** Play a dash sound */
  async playDash() {
    this.startNotePlaying();
    await this.sleep(this.DASH_TIME);
    this.stopNotePlaying();
  }

  /** Play a dot sound */
  async playDot() {
    this.startNotePlaying();
    await this.sleep(this.DOT_TIME);
    this.stopNotePlaying();
  }

}
