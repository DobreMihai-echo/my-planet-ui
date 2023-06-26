import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-joiners',
  templateUrl: './joiners.component.html',
  styleUrls: ['./joiners.component.css']
})
export class JoinersComponent implements OnInit {
  safeSvgUrl: SafeResourceUrl;
  constructor(private sanitizer:DomSanitizer){}
  ngOnInit(): void {
    this.safeSvgUrl = this.sanitizer.bypassSecurityTrustResourceUrl('../../images/woman-user.svg');
  }

}
