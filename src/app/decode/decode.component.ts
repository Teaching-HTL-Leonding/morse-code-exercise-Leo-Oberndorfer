import {Component, computed, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-decode',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './decode.component.html',
  styleUrl: './decode.component.css'
})
export class DecodeComponent {
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
  readonly regex = '^[.\\- ]+(?: / [.\\- ]+)*$';
  readonly morseInput = signal("");
  readonly isValid = computed(() => this.isValidMorseCode());
  readonly status = computed(() => this.isValidMorseCode() ? "" : "Invalid morse code.");
  readonly output = signal("");

  decode(){
    if(this.isValidMorseCode()){
      this.output.set(this.morseInput().split(" / ").map(word => word.split(" ").map(c => String.fromCharCode(this.morseCode.indexOf(c) + 65)).join("")).join(" "));
    }
  }

  isValidMorseCode(){
    return this.morseInput().match(this.regex);
  }
}
