import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-scoreboard.component.html',
  styleUrl: './game-scoreboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameScoreboardComponent {
  @Input() public playerScore: number = 0;
  @Input() public computerScore: number = 0;

  public incrementPlayerScore(): void {
    this.playerScore += 1;
  }

  public incrementComputerScore(): void {
    this.computerScore += 1;
  }
}
