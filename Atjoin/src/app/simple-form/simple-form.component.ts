import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent {

    form: FormGroup;
    submitted = false;
    photoURL: string | ArrayBuffer | null = '';
  
    constructor(private fb: FormBuilder) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        photo: [null, Validators.required],
        rank: ['', Validators.required],
        idNumber: ['', [Validators.required, Validators.pattern(/^#\d{6}$/)]],
      });
    }
  
    onFileChange(event: any) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.photoURL = reader.result;
          this.form.patchValue({
            photo: reader.result,
          });
        };
      }
    }
  
    onSubmit() {
      this.submitted = true;
    }
  }

