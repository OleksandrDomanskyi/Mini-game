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
  @Input() public board: GameCell[][] = [];
  @Output() public cellClicked: EventEmitter<{ row: number; col: number }> = new EventEmitter();

  public onCellClick(rowIndex: number, colIndex: number): void {
    this.cellClicked.emit({ row: rowIndex, col: colIndex });
  }
}
