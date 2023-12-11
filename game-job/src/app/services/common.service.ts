import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private showOverlayChangedSubject = new Subject<boolean>();
    public showOverlayChanged = this.showOverlayChangedSubject.asObservable();
    

  constructor(private messageService: MessageService) {}

  showNotImplement() {
    this.messageService.add({
      severity: 'info',
      summary: 'Thank for your interest',
      detail: 'This function is under development!',
    });
  }

  showLoading() {
    this.showOverlayChangedSubject.next(true);
  }

  hideLoading() {
    this.showOverlayChangedSubject.next(false);
  }

}
