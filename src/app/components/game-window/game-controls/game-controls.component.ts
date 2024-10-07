import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameControlsComponent {
  @Output() public start: EventEmitter<void> = new EventEmitter();
  @Output() public timeChange: EventEmitter<number> = new EventEmitter();

  public intervalTime: number = 1000;

  public onStartClick(): void {
    this.start.emit();
  }

  public onTimeChange(): void {
    this.timeChange.emit(this.intervalTime);
  }
}
