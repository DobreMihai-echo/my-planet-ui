import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-scheduler',
  template: '<ejs-schedule [eventSettings]="eventObject"></ejs-schedule>',
  //templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent {
 
  public eventObject: EventSettingsModel = {
    dataSource:[{
      Subject: 'Planting Trees',
      StartTime: new Date(2023,5,5,9),
      EndTime: new Date(2023,5,5,10)
    },
    {
      Subject: 'Cleaning Area',
      StartTime: new Date(2023,5,6,4),
      EndTime: new Date(2023,5,6,5)
    },
    {
      Subject: 'Planting Trees',
      StartTime: new Date(2023,5,7,9),
      EndTime: new Date(2023,5,7,10)
    },
    {
      Subject: 'Planting Trees',
      StartTime: new Date(2023,5,7,7),
      EndTime: new Date(2023,5,7,8)
    }
  ]
  }
}
