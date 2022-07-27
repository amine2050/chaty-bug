import { Injectable } from '@angular/core';
import { NgxSmartModalComponent } from 'ngx-smart-modal';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalNavigationService {
  private registeredModals: {[id: string]: NgxSmartModalComponent} = {};
  private registeredModalSubscriptions: {[id: string]: Subscription[]} = {};

  constructor(private browserLocation: Location) {
    this.browserLocation.subscribe(() => this.onBrowserBack(), () => {}, () => {});
  }

  public registerModal(modal: NgxSmartModalComponent) {
    if (!modal.identifier) {
      throw new Error('Modal must have identifier');
    }

    modal.setData({}).getData()['closingByNavigation'] = false;

    this.registeredModals[modal.identifier] = modal;
    this.registeredModalSubscriptions[modal.identifier] = [
      modal.onAnyCloseEventFinished.subscribe(() => this.onModalClosed(modal)),
      modal.onOpenFinished.subscribe(() => this.onModalOpened())
    ];
  }

  public unregisterModal(modal: NgxSmartModalComponent) {
    if (!(modal.identifier in this.registeredModals)) {
      return;
    }

    for (let subscription of this.registeredModalSubscriptions[modal.identifier]) {
      subscription.unsubscribe();
    }

    delete this.registeredModals[modal.identifier];
    delete this.registeredModalSubscriptions[modal.identifier];
  }

  private onModalOpened() {
    // The following Location.go() call pushes a history item with the same URL to the browser navigation stack.
    // Pushing this history item allows using navigator (or android) back button to close the modal.
    // When Chaty JS is loaded this call works ONLY THE FIRST TIME, the second time will be 'swallowed' by chaty code.
    // If the history item is not pushed, the back navigation will cause an unwanted navigation to the previous page.
    this.browserLocation.go(this.browserLocation.path());
  }

  private onBrowserBack(): void {
    let activeModal = this.getActiveModal();

    if (!activeModal) {
      return;
    }
    
    activeModal.setData({}).getData()['closingByNavigation'] = true;
    activeModal.close();
  }

  private getActiveModal() {
    for (let modal of Object.values(this.registeredModals)) {
      if (modal.isVisible()) {
        return modal;
      }
    }

    return null;
  }

  private onModalClosed(modal: NgxSmartModalComponent) {
    if (!modal.setData({}).getData().closingByNavigation) {
      this.browserLocation.back();
    }

    modal.setData({}).getData()['closingByNavigation'] = false;
  }
}
