import { Injectable } from '@angular/core';
import { BehaviorSubject, timestamp } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HandelServiceService {

    private showTourView = new BehaviorSubject(<boolean>(false));
    public handelOpenAndCloseTour$ = this.showTourView.asObservable();

  constructor() { }



closeTourView() {



this.showTourView.next(false)
}


openTourView() {



this.showTourView.next(true)
}

}
