import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.scss']
})
export class ThirdPageComponent implements OnInit {

  constructor(private modalService: NgxSmartModalService) { }

  ngOnInit(): void {
  }

  openModal() {
    this.modalService.open('modal-example');
  }

}
