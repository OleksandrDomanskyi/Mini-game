import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GameWindowComponent } from '../../components/game-window/game-window.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [GameWindowComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {

}
