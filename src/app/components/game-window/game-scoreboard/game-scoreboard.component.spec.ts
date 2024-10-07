import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameScoreboardComponent } from './game-scoreboard.component';

describe('GameScoreboardComponent', () => {
  let component: GameScoreboardComponent;
  let fixture: ComponentFixture<GameScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameScoreboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GameScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize playerScore and computerScore to 0', () => {
    expect(component.playerScore).toBe(0);
    expect(component.computerScore).toBe(0);
  });

  it('should increment playerScore when incrementPlayerScore is called', () => {
    component.incrementPlayerScore();
    expect(component.playerScore).toBe(1);
  });

  it('should increment computerScore when incrementComputerScore is called', () => {
    component.incrementComputerScore();
    expect(component.computerScore).toBe(1);
  });

  it('should increment playerScore correctly multiple times', () => {
    component.incrementPlayerScore();
    component.incrementPlayerScore();
    expect(component.playerScore).toBe(2);
  });

  it('should increment computerScore correctly multiple times', () => {
    component.incrementComputerScore();
    component.incrementComputerScore();
    expect(component.computerScore).toBe(2);
  });
});
