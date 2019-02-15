import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SharedService {

  private changeSource = new BehaviorSubject<boolean>(false);
  currentData = this.changeSource.asObservable();

  constructor() { }

  changeData(data: boolean) {
    this.changeSource.next(data)
  }
}