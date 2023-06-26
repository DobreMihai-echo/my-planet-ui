import { Component, Input } from '@angular/core';
import { Tag } from './tag.interface';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.css']
})
export class ChallengeCardComponent {

  @Input() mycolor:string="";
  @Input() title:string="This is my title";
  @Input() description:string="This is my description";
  @Input() points:number=0;
  @Input() postTags: any[];

  removeTag(tagName: string): void {
		const tagIndex = this.postTags.findIndex(tN => tN === tagName);
		if (this.postTags[tagIndex].action === 'saved') {
			this.postTags[tagIndex].action = 'remove';
		} else {
			this.postTags.splice(tagIndex, 1);
		}
		console.log(this.postTags)
	}
}
