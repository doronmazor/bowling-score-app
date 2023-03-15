import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBoardContainerComponent } from './score-board-container.component';

describe('ScoreBoardContainerComponent', () => {
  let component: ScoreBoardContainerComponent;
  let fixture: ComponentFixture<ScoreBoardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreBoardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreBoardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
