import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { timer, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GameFieldComponent } from './game-field/game-field.component';
import { GameScoreboardComponent } from './game-scoreboard/game-scoreboard.component';
import { GameControlsComponent } from './game-controls/game-controls.component';
import { GameCell, GameCellState } from '../../utils/interfaces/game-cell.interface';
import { ResultModalComponent } from '../result-modal/result-modal.component';

@Component({
  selector: 'app-game-window',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GameFieldComponent,
    GameScoreboardComponent,
    GameControlsComponent
  ],
  templateUrl: './game-window.component.html',
  styleUrl: './game-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameWindowComponent {
  board: GameCell[][] = [];
  playerScore: number = 0;
  computerScore: number = 0;
  intervalTime: number = 1000;

  gameActive: boolean = false;
  activeCell: { row: number; col: number } | null = null;
  private gameTimer: Subscription | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.initializeBoard();
  }

  initializeBoard() {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({ isActive: false, state: 'default' as GameCellState }))
    );
  }

  onStartGame() {
    this.resetBoard();
    this.playerScore = 0;
    this.computerScore = 0;
    this.gameActive = true;
    this.startRound();
  }

  startRound() {
    if (this.playerScore >= 10 || this.computerScore >= 10) {
      this.endGame();
      return;
    }

    if (this.activeCell) {
      const { row, col } = this.activeCell;
      this.updateBoardCell(row, col, this.board[row][col].state === 'active' ? 'missed' : 'default');
    }

    const randomRow = Math.floor(Math.random() * 10);
    const randomCol = Math.floor(Math.random() * 10);
    this.activeCell = { row: randomRow, col: randomCol };

    this.updateBoardCell(randomRow, randomCol, 'active');

    this.gameTimer = timer(this.intervalTime).subscribe(() => {
      if (this.board[randomRow][randomCol].state === 'active') {
        this.updateBoardCell(randomRow, randomCol, 'missed');
        this.computerScore += 1;
        this.activeCell = null;
        this.startRound();
      }
    });
  }

  onCellClicked(cellIndex: { row: number; col: number }) {
    if (!this.gameActive || !this.activeCell) return;

    const { row, col } = cellIndex;

    if (row === this.activeCell.row && col === this.activeCell.col) {
      this.updateBoardCell(row, col, 'success');

      if (this.gameTimer) {
        this.gameTimer.unsubscribe();
      }

      this.playerScore += 1;

      setTimeout(() => {
        this.activeCell = null;
        this.startRound();
      }, 300);
    }
  }

  endGame() {
    this.gameActive = false;

    if (this.activeCell) {
      const { row, col } = this.activeCell;
      if (this.board[row][col].state === 'active') {
        this.updateBoardCell(row, col, 'missed');
      }
      this.activeCell = null;
    }

    if (this.gameTimer) {
      this.gameTimer.unsubscribe();
      this.gameTimer = null;
    }

    const winner = this.playerScore >= 10 ? 'Гравець' : 'Комп’ютер';
    this.dialog.open(ResultModalComponent, {
      data: { message: `Гра закінчена! Переможець: ${winner}` },
      disableClose: true,
    });
    this.resetBoard();
  }

  resetBoard() {
    this.board = this.board.map(row => 
      row.map(cell => ({ ...cell, state: 'default', isActive: false }))
    );
    this.cdr.markForCheck();
  }

  updateBoardCell(row: number, col: number, state: GameCellState) {
    if (this.board[row][col].state !== state) {
      this.board = this.board.map((boardRow, rowIndex) =>
        boardRow.map((cell, colIndex) =>
          rowIndex === row && colIndex === col
            ? { ...cell, state }
            : cell
        )
      );
      this.cdr.markForCheck();
    }
  }

  onTimeChange(newInterval: number) {
    this.intervalTime = newInterval;
  }
}
