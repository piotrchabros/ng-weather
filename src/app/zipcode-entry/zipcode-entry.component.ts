import { Component } from '@angular/core';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  zipcode: string;

  constructor() { }

  updateZipcode(zipcode: string) {
    this.zipcode = zipcode;
  }
}
