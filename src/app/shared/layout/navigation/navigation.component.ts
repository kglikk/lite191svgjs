import { AuthService } from './../../../services/auth/auth.service';
import {Component } from '@angular/core';
import {LoginInfoComponent} from "../../user/login-info/login-info.component";


declare const $:any;

@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent  {

  constructor(private auth: AuthService) {
  }


  // rozpoczęcie przenoszenia danego elementu do szarego obszaru 'svgArea' 
  dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.effectsAllowed = 'copy'

    // przenoś tylko svg, który jest dzieckiem div-a. Drag nie działa w HTML5 jeśli chciałbym przenosić bezpośrednio obiekt svg.
    ev.dataTransfer.setData('text/plain', $(ev.target).children().attr('id'))
  }


}



