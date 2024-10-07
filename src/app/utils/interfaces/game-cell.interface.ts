export type GameCellState = 'default' | 'active' | 'success' | 'missed';

export interface GameCell {
  isActive: boolean;
  state: GameCellState;
}