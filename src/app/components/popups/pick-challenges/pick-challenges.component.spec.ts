import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickChallengesComponent } from './pick-challenges.component';

describe('PickChallengesComponent', () => {
  let component: PickChallengesComponent;
  let fixture: ComponentFixture<PickChallengesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickChallengesComponent]
    });
    fixture = TestBed.createComponent(PickChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
