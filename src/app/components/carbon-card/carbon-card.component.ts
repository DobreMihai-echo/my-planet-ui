import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carbon-card',
  templateUrl: './carbon-card.component.html',
  styleUrls: ['./carbon-card.component.css']
})
export class CarbonCardComponent {

  @Input() title: string;
}
