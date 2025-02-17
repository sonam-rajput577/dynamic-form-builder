import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldService } from '../form-field.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  form: FormGroup = this.fbService.getFormGroup();
  fields: Array<{ type: string; name: string; label: string; placeholder: string; validations?: any }> = [];
  fieldCount: number = 0;

  constructor(private fbService: FormFieldService) {}

  ngOnInit(): void {
    this.fbService.form$.subscribe((form) => {
      this.form = form;
    });

    this.fbService.fields$.subscribe((fields) => {
      this.fields = fields;
    });
  }

  // Add a new field with validation rules
  addField(fieldType: string): void {
    const fieldName = `field${this.fieldCount++}`;
    const newField = { 
      name: fieldName, 
      type: fieldType, 
      label: `Enter ${fieldType}`, 
      placeholder: `Type here...`, 
      validations: { required: true }  // Applying required validation
    };
    this.fbService.addField(newField);
  }

  // Remove a field
  removeField(fieldName: string): void {
    this.fbService.removeField(fieldName);
  }

  // Submit the form
  onSubmit(): void {
    this.fbService.submitForm();
  }
}
