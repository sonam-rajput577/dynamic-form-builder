import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormFieldService { 
  private formSubject = new BehaviorSubject<FormGroup>(this.fb.group({}));
  public form$ = this.formSubject.asObservable();

  constructor(private fb: FormBuilder) {}

  // Get the current form group
  getFormGroup(): FormGroup {
    return this.formSubject.value;
  }

  // Add a new field to the form group
  addField(fieldName: string, fieldType: string): void {
    const form = this.getFormGroup();
    const formControl = new FormControl('', Validators.required);

    // Add the form control dynamically to the form group
    form.addControl(fieldName, formControl);

    // Update the BehaviorSubject
    this.formSubject.next(form);
  }

  // Remove a field from the form group
  removeField(fieldName: string): void {
    const form = this.getFormGroup();
    form.removeControl(fieldName);

    // Update the BehaviorSubject
    this.formSubject.next(form);
  }

  // Submit the form data
  submitForm(): void {
    const form = this.getFormGroup();
    if (form.valid) {
      console.log('Form submitted:', form.value); // Log form data to the console
      form.reset(); // Reset the form after submission
    } else {
      console.log('Form is invalid');
    }
  }
}
