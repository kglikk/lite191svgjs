import { AuthService } from 'app/services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {LayoutService} from "../../layout/layout.service";



@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  user:any;
  profile:any;  

  constructor(
    private userService: UserService,
              private layoutService: LayoutService, private auth: AuthService) {
                this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    /*
    this.userService.getLoginInfo().subscribe(user => {
      this.user = user
    })*/

  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
