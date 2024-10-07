import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCell } from '../../../utils/interfaces/game-cell.interface';

@Component({
  selector: 'app-game-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameFieldComponent {
  @Input() board: GameCell[][] = [];
  @Output() cellClicked = new EventEmitter<{ row: number; col: number }>();

  onCellClick(rowIndex: number, colIndex: number) {
    this.cellClicked.emit({ row: rowIndex, col: colIndex });
  }
}
