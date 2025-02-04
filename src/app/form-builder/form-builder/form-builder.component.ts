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
  fields: Array<{ type: string; name: string }> = [];
  fieldCount: number = 0;

  constructor(private fbService: FormFieldService) {}

  ngOnInit(): void {
    // Initialize with default fields
    this.addField('text');
    this.addField('textarea');
    this.addField('dropdown');
    this.addField('checkbox');
    this.addField('radio');

    this.fbService.form$.subscribe((form) => {
      this.form = form;
    });
  }

  // Add a new field
  addField(fieldType: string): void {
    const fieldName = `field${this.fieldCount++}`;
    this.fields.push({ type: fieldType, name: fieldName });
    this.fbService.addField(fieldName, fieldType);
  }

  // Remove a field
  removeField(fieldName: string): void {
    this.fields = this.fields.filter((field) => field.name !== fieldName);
    this.fbService.removeField(fieldName);
  }

  // Submit the form
  onSubmit(): void {
    this.fbService.submitForm();
  }
}
