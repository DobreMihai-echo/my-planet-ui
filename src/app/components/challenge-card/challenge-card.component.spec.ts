import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeCardComponent } from './challenge-card.component';

describe('ChallengeCardComponent', () => {
  let component: ChallengeCardComponent;
  let fixture: ComponentFixture<ChallengeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengeCardComponent]
    });
    fixture = TestBed.createComponent(ChallengeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
