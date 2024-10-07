import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResultModalComponent } from './result-modal.component';

describe('ResultModalComponent', () => {
  let component: ResultModalComponent;
  let fixture: ComponentFixture<ResultModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ResultModalComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ResultModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { message: 'Test message' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive the message from the data', () => {
    expect(component.data.message).toBe('Test message');
  });

  it('should close the dialog when onClose is called', () => {
    component.onClose();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});