//import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
 
@Injectable()
export class ShowDataService {

      
  private showState = new BehaviorSubject<boolean>(false);
  currentShow = this.showState.asObservable();

  constructor() { }
  
  
  public showIt() {
    this.showState.next(true);
  }
  public hideIt() {
    this.showState.next(false);
  }

/*
  public isShown(): boolean {
    return this.showState.getValue();
  } */

}
