import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-state-button',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StateButtonComponent {

  @Input()
  template: TemplateRef<any>;

  @Output()
  buttonClicked = new EventEmitter();

  constructor() {
  }

  click() {
    this.buttonClicked.emit();
  }
}
