import { Component } from '@angular/core';
import { ZipCodeService } from '../../services/zip-code.service';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.scss']
})
export class ZipcodeEntryComponent {

  zipcode: string;

  constructor(private zipCodeService: ZipCodeService) { }

  updateZipcode(zipcode: string) {
    this.zipCodeService.updateZipcode(zipcode);
  }
}
