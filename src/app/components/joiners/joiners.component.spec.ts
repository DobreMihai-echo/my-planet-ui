import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinersComponent } from './joiners.component';

describe('JoinersComponent', () => {
  let component: JoinersComponent;
  let fixture: ComponentFixture<JoinersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinersComponent]
    });
    fixture = TestBed.createComponent(JoinersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
