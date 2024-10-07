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
  @Output() start = new EventEmitter<void>();
  @Output() timeChange = new EventEmitter<number>();

  intervalTime: number = 1000;

  onStartClick() {
    this.start.emit();
  }

  onTimeChange() {
    this.timeChange.emit(this.intervalTime);
  }
}
