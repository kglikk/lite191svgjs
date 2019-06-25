import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: '[activitiesMessage]',
  templateUrl: './activities-message.component.html',
})
export class ActivitiesMessageComponent implements OnInit {
  profile:any; 
  @Input()  item: any;
  constructor()
  {
    this.profile = JSON.parse(localStorage.getItem('profile'));

  }

  ngOnInit() {
  }

}
