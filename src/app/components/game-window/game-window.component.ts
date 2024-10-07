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
  public board: GameCell[][] = [];
  public playerScore: number = 0;
  public computerScore: number = 0;
  public intervalTime: number = 1000;
  public gameActive: boolean = false;
  public activeCell: { row: number; col: number } | null = null;

  private gameTimer: Subscription | null = null;
  private usedCells: Set<string> = new Set();

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.initializeBoard();
  }

  public onStartGame(): void {
    this.resetBoard();
    this.playerScore = 0;
    this.computerScore = 0;
    this.gameActive = true;
    this.usedCells.clear();
    this.startRound();
  }

  public onCellClicked(cellIndex: { row: number; col: number }): void {
    if (!this.gameActive || !this.activeCell) { 
      return;
    }

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

  public onTimeChange(newInterval: number): void {
    this.intervalTime = newInterval;
  }

  private initializeBoard(): void {
    this.board = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({ isActive: false, state: 'default' as GameCellState }))
    );
  }

  private startRound(): void {
    if (this.playerScore >= 10 || this.computerScore >= 10) {
      this.endGame();
      return;
    }

    if (this.activeCell) {
      const { row, col } = this.activeCell;
      this.updateBoardCell(row, col, this.board[row][col].state === 'active' ? 'missed' : 'default');
    }

    let randomRow: number;
    let randomCol: number;

    do {
      randomRow = Math.floor(Math.random() * 10);
      randomCol = Math.floor(Math.random() * 10);
    } while (this.usedCells.has(`${randomRow}-${randomCol}`));

    this.activeCell = { row: randomRow, col: randomCol };
    this.usedCells.add(`${randomRow}-${randomCol}`);
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

  private endGame(): void {
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

    const winner = this.playerScore >= 10 ? 'Player' : 'Computer';

    this.dialog.open(ResultModalComponent, {
      data: { message: `The game is over! The winner: ${winner}` },
      disableClose: true,
    });

    this.resetBoard();
  }

  private resetBoard(): void {
    this.board = this.board.map(row => 
      row.map(cell => ({ ...cell, state: 'default', isActive: false }))
    );

    this.cdr.markForCheck();
  }

  private updateBoardCell(row: number, col: number, state: GameCellState): void {
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
}
