import { NgxSmartModalComponent } from 'ngx-smart-modal';
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ModalNavigationService } from '../services/modal-navigation.service';

@Directive({
  selector: '[modalNavigation]'
})
export class ModalNavigationDirective implements OnInit, OnDestroy {

  constructor(
    private host: NgxSmartModalComponent,
    private modalNavigationService: ModalNavigationService) {
  }

  ngOnInit() {
    this.modalNavigationService.registerModal(this.host);
  }

  ngOnDestroy() {
    this.modalNavigationService.unregisterModal(this.host);
  }
}
