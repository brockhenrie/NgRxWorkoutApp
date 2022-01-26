import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {

loadingStateChanged = new BehaviorSubject<boolean>(false);
  constructor() { }
}
