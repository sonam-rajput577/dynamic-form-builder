import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormFieldService {
  private form: FormGroup;
  private fields: Array<{ 
    name: string; 
    type: string; 
    label: string; 
    placeholder: string; 
    validations?: any; 
  }> = [];

  private formSubject = new BehaviorSubject<FormGroup>(this.fb.group({}));
  private fieldsSubject = new BehaviorSubject<Array<any>>([]);

  form$ = this.formSubject.asObservable();
  fields$ = this.fieldsSubject.asObservable();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  // Get the current form group
  getFormGroup(): FormGroup {
    return this.form;
  }

  // Add a new field with customization options
  addField(field: { name: string; type: string; label: string; placeholder: string; validations?: any }): void {
    this.fields.push(field);

    const validators = [];
    if (field.validations?.required) {
      validators.push(Validators.required);
    }

    this.form.addControl(field.name, new FormControl('', validators));

    // Notify subscribers about the changes
    this.formSubject.next(this.form);
    this.fieldsSubject.next([...this.fields]);
  }

  // Remove a field dynamically
  removeField(fieldName: string): void {
    this.fields = this.fields.filter(field => field.name !== fieldName);
    this.form.removeControl(fieldName);

    // Notify subscribers about the changes
    this.formSubject.next(this.form);
    this.fieldsSubject.next([...this.fields]);
  }

  // Submit the form and reset if valid
  submitForm(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.form.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
