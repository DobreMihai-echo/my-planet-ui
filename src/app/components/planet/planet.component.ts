import { Component, ElementRef, HostListener, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';



@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent {
  @ViewChildren('land') elements: QueryList<ElementRef>;
  constructor(private renderer: Renderer2, private el: ElementRef) {}


  onMouseOver() {
    this.el.nativeElement.querySelector('#path3740').style.fill='#323ad3'
    this.elements.forEach(element=>{
      element.nativeElement.style.fill='#bf8122';
    })
  }

  onMouseOut() {
    this.el.nativeElement.querySelector('#path3740').style.fill='#fff'
    this.elements.forEach(element=>{
      element.nativeElement.style.fill='#299d3d';
    })
  }

  
  

  @HostListener('window:mousemove',['$event'])
  onMouseMove(e: MouseEvent) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const anchor = this.el.nativeElement.querySelector('#anchor');
    const rekt = anchor.getBoundingClientRect();
    const anchorX = rekt.left + rekt.width / 2;
    const anchorY = rekt.top + rekt.height / 2;

    const angleDeg = this.angle(mouseX,mouseY, anchorX, anchorY);

    const eyes = this.el.nativeElement.querySelectorAll('.eye');
    eyes.forEach(eye => {
      this.renderer.setStyle(eye, 'transform', `rotate(${90 + angleDeg}deg)`);
    });
  }

  angle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = rad * 180 / Math.PI;
    return deg;
  }
 
}
