import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, Subject} from 'rxjs';
import { GameCell, GameCellState } from '../../utils/interfaces/game-cell.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private boardSubject = new BehaviorSubject<GameCell[][]>(this.initializeBoard());
  private playerScoreSubject = new BehaviorSubject<number>(0);
  private computerScoreSubject = new BehaviorSubject<number>(0);
  private gameActiveSubject = new BehaviorSubject<boolean>(false);
  private gameEndedSubject = new Subject<string>();

  board$ = this.boardSubject.asObservable();
  playerScore$ = this.playerScoreSubject.asObservable();
  computerScore$ = this.computerScoreSubject.asObservable();
  gameActive$ = this.gameActiveSubject.asObservable();
  gameEnded$ = this.gameEndedSubject.asObservable();

  private activeCell: { row: number; col: number } | null = null;
  private intervalTime: number = 1000;
  private gameTimer: any = null;
  private activeCellsThisRound: Set<string> = new Set();

  initializeBoard(): GameCell[][] {
    return Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({ isActive: false, state: 'default' as GameCellState }))
    );
  }

  startGame() {
    this.resetGame();
    this.startRound();
  }

  startRound() {
    if (this.playerScoreSubject.value === 10 || this.computerScoreSubject.value === 10) {
      this.endGame();
      return;
    }

    if (this.activeCell) {
      const { row, col } = this.activeCell;
      this.updateBoardCell(row, col, this.boardSubject.value[row][col].state === 'active' ? 'missed' : 'default');
    }

    const randomRow = Math.floor(Math.random() * 10);
    const randomCol = Math.floor(Math.random() * 10);
    this.activeCell = { row: randomRow, col: randomCol };
    this.activeCellsThisRound.add(`${randomRow}-${randomCol}`);

    this.updateBoardCell(randomRow, randomCol, 'active');

    this.gameTimer = timer(this.intervalTime).subscribe(() => {
      if (this.boardSubject.value[randomRow][randomCol].state === 'active') {
        this.updateBoardCell(randomRow, randomCol, 'missed');

        setTimeout(() => {
          this.computerScoreSubject.next(this.computerScoreSubject.value + 1);
          this.activeCell = null;
          this.startRound();
        }, 300);
      }
    });
  }

  onCellClicked(row: number, col: number) {
    if (!this.gameActiveSubject.value || !this.activeCell) return;

    if (row === this.activeCell.row && col === this.activeCell.col) {
        this.updateBoardCell(row, col, 'success'); // Меняем состояние клетки на 'success'

        if (this.gameTimer) {
            this.gameTimer.unsubscribe();
        }

        setTimeout(() => {
            this.playerScoreSubject.next(this.playerScoreSubject.value + 1);
            this.activeCell = null; // Сбрасываем активную клетку
            this.startRound(); // Начинаем новый раунд
        }, 300);
    } else {
        console.log('Clicked on inactive cell');
    }
}

  endGame() {
    this.gameActiveSubject.next(false);

    if (this.activeCell) {
      const { row, col } = this.activeCell;
      if (this.boardSubject.value[row][col].state === 'active') {
        this.updateBoardCell(row, col, 'missed');
      }
      this.activeCell = null;
    }

    if (this.gameTimer) {
      this.gameTimer.unsubscribe();
      this.gameTimer = null;
    }

    const winner = this.playerScoreSubject.value >= 10 ? 'Гравець' : 'Комп’ютер';
    this.gameEndedSubject.next(winner);
    this.resetGame();
  }

  resetGame() {
    this.boardSubject.next(this.initializeBoard());
    this.playerScoreSubject.next(0);
    this.computerScoreSubject.next(0);
    this.activeCellsThisRound.clear();
  }

  updateBoardCell(row: number, col: number, state: GameCellState) {
    const updatedBoard = this.boardSubject.value.map((boardRow, rowIndex) =>
        boardRow.map((cell, colIndex) =>
            rowIndex === row && colIndex === col
                ? { ...cell, state } // Обновляем состояние клетки
                : cell
        )
    );
    this.boardSubject.next(updatedBoard); // Обновляем состояние доски
}

  setIntervalTime(newInterval: number) {
    this.intervalTime = newInterval;
  }
}
