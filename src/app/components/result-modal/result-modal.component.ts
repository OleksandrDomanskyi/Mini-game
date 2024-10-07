import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-result-modal',
  standalone: true,
  imports: [],
  templateUrl: './result-modal.component.html',
  styleUrl: './result-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ResultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  public onClose(): void {
    this.dialogRef.close();
  }
}
