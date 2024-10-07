import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GameFieldComponent } from './game-field.component';

describe('GameFieldComponent', () => {
  let component: GameFieldComponent;
  let fixture: ComponentFixture<GameFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameFieldComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GameFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the game board', () => {
    component.board = [
      [{ isActive: false, state: 'default' }, { isActive: false, state: 'default' }],
      [{ isActive: false, state: 'default' }, { isActive: false, state: 'default' }]
    ];
    fixture.detectChanges();
    
    const squares: HTMLElement[] = fixture.debugElement.queryAll(By.css('.board__square')).map(de => de.nativeElement);
    expect(squares.length).toBe(4);
  });

  it('should emit cellClicked event when a cell is clicked', () => {
    spyOn(component.cellClicked, 'emit');

    component.board = [
      [{ isActive: false, state: 'default' }, { isActive: false, state: 'default' }],
      [{ isActive: false, state: 'default' }, { isActive: false, state: 'default' }]
    ];
    fixture.detectChanges();

    const cellElement: HTMLElement = fixture.debugElement.queryAll(By.css('.board__square'))[0].nativeElement;
    cellElement.click();

    expect(component.cellClicked.emit).toHaveBeenCalledWith({ row: 0, col: 0 });
  });
});
