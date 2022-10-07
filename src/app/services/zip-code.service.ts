import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  private zipcode = new Subject<string>();
  public readonly zipcode$ = this.zipcode.asObservable();

  updateZipcode(zipcode: string) {
    this.zipcode.next(zipcode);
  }
}
