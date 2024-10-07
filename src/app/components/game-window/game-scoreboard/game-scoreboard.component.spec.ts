import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreboardComponent } from './game-scoreboard.component';

describe('GameInterfaceComponent', () => {
  let component: GameScoreboardComponent;
  let fixture: ComponentFixture<GameScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameScoreboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
