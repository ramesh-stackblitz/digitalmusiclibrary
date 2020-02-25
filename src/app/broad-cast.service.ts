import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadCastService {

  public currentUser = new Subject<any>();
  constructor() { }

  getUser() {
    return this.currentUser.asObservable();
  }

}
