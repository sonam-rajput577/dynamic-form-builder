import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
})
export class FormFieldComponent {
  @Input() fieldType: string = 'text';
  @Input() formGroup!: FormGroup; // Using non-null assertion operator (!) to handle initialization
  @Input() fieldName!: string; // Using non-null assertion operator

  @Output() removeField = new EventEmitter<string>();

  onRemove() {
    this.removeField.emit(this.fieldName);
  }

  get formControl(): FormControl {
    return this.formGroup.get(this.fieldName) as FormControl; // Explicitly casting to FormControl
  }
}
