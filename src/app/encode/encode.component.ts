import {Component, computed, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {PlayerService} from "../player.service";

@Component({
  selector: 'app-encode',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './encode.component.html',
  styleUrl: './encode.component.css'
})
export class EncodeComponent {
  morseCode = [
    /* A */ '.-',
    /* B */ '-...',
    /* C */ '-.-.',
    /* D */ '-..',
    /* E */ '.',
    /* F */ '..-.',
    /* G */ '--.',
    /* H */ '....',
    /* I */ '..',
    /* J */ '.---',
    /* K */ '-.-',
    /* L */ '.-..',
    /* M */ '--',
    /* N */ '-.',
    /* O */ '---',
    /* P */ '.--.',
    /* Q */ '--.-',
    /* R */ '.-.',
    /* S */ '...',
    /* T */ '-',
    /* U */ '..-',
    /* V */ '...-',
    /* W */ '.--',
    /* X */ '-..-',
    /* Y */ '-.--',
    /* Z */ '--..',
  ];
  readonly regex = '^[A-Z]+(?: [A-Z]+)*$';
  readonly textInput = signal("");
  readonly status = computed(() => this.isValidText() ? "" : "Please only use capital letters and spaces between words.");
  readonly output = signal("");

  constructor(private playerService: PlayerService) {}

  encode(){
    if(this.isValidText()){
      this.output.set(this.textInput().split(" ").map(word => word.split("").map(c => this.morseCode[c.charCodeAt(0) - 65]).join(" ")).join(" / "));
    }
  }

  isValidText(){
    return this.textInput().match(this.regex) || this.textInput() === "";
  }

  async playMorseCode(){
    for (const word of this.output().split(" / ")) {
      for (const letter of word.split(" ")) {
        for (const symbol of letter.split("")) {
          if(symbol === "."){
            await this.playerService.playDot();
          } else if(symbol === "-"){
            await this.playerService.playDash();
          }
          await this.playerService.sleep(this.playerService.SYMBOL_BREAK);
        }
        await this.playerService.sleep(this.playerService.LETTER_BREAK);
      }
      await this.playerService.sleep(this.playerService.WORD_BREAK);
    }
  }
}
