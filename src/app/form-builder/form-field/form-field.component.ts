import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
})
export class FormFieldComponent {
  @Input() field!: { name: string; type: string; label: string; placeholder: string };
  @Input() formGroup!: FormGroup; 

  @Output() removeField = new EventEmitter<string>();

  onRemove() {
    this.removeField.emit(this.field.name);
  }

  get formControl(): FormControl {
    return this.formGroup.get(this.field.name) as FormControl;
  }
}
