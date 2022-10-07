import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CountryItemComponent {

  @Input()
  fullText: string;

  @Input()
  textPart: string;

  constructor() {

  }
}
