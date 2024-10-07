import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GameControlsComponent } from './game-controls.component';

describe('GameControlsComponent', () => {
  let component: GameControlsComponent;
  let fixture: ComponentFixture<GameControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit start event when onStartClick is called', () => {
    spyOn(component.start, 'emit');

    component.onStartClick();

    expect(component.start.emit).toHaveBeenCalled();
  });

  it('should emit timeChange event when onTimeChange is called', () => {
    spyOn(component.timeChange, 'emit');

    component.onTimeChange();

    expect(component.timeChange.emit).toHaveBeenCalledWith(component.intervalTime);
  });

  it('should update intervalTime correctly', () => {
    component.intervalTime = 2000;

    component.onTimeChange();

    expect(component.intervalTime).toBe(2000);
  });

  it('should have initial intervalTime set to 1000', () => {
    expect(component.intervalTime).toBe(1000);
  });

  it('should have a button for starting the game', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
  });

  it('should call onStartClick when the button is clicked', () => {
    spyOn(component, 'onStartClick');
    const button = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();

    expect(component.onStartClick).toHaveBeenCalled();
  });
});
