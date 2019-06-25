import { ShowDataService } from './../../../services/show-data.service';


import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../utils/notification.service";

import { AuthService } from './../../../services/auth/auth.service';


declare var $:any;

@Component({
  selector: 'sa-logout',
  template: `
<div id="logout" (click)="showPopup()" class="btn-header transparent pull-right">
        <span> <a routerlink="/auth/login" title="Log Out" data-action="userLogout"
                  data-logout-msg="You can improve your security further after logging out by closing this opened browser"><i
          class="fa fa-sign-out"></i></a> </span>
    </div>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private notificationService: NotificationService, private auth: AuthService, private showData: ShowDataService) { }
 //txt-color-green
  showPopup(){
    this.notificationService.smartMessageBox({
      title : "<i class='fa fa-sign-out' style='color: #7cb300'></i> Logout <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
      content : "Are you sure ?",
      buttons : '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Yes") {
        this.auth.logout();        
      }
    });
  }

  logout(){
     // this.showData.show = false; 
      this.router.navigate(['/auth/login'])
  }

  ngOnInit() {

  }



}
