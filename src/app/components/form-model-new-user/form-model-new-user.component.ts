import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-model-new-user',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './form-model-new-user.component.html',
  styleUrl: './form-model-new-user.component.css'
})
export class FormModelNewUserComponent {
  modelForm: FormGroup;
  tipo: string = 'Añadir';
  defultImage: string = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp'
  imageAltDefault: string = 'default'
  https: any;



  constructor(private usuarioService: UsersService) {
    this.modelForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      image: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
      password: new FormControl('', [Validators.minLength(8), Validators.required]),
      repitepassword: new FormControl('', [Validators.minLength(8), Validators.required])
    }, [this.checkPassword]);
  }

  checkPassword(formValue: AbstractControl): any {
    const password = formValue.get('password')?.value;
    const repitepassword = formValue.get('repitepassword')?.value;
    if (password !== repitepassword) {
      return { 'checkpassword': true }
    } else {
      return null
    }
  }
  ngOnInit() {
    this.modelForm.patchValue({
      first_name: "",
      second_name: "",
      username: "",
      image: "",
      email: "",
      password: "",
      repitepassword: ""
    });

  }

  getDataForm() {
    if (this.modelForm.valid) {
      console.log(this.modelForm.value);
      this.modelForm.reset();
    }
  }

  checkControl(formControlName: string, validador: string) {
    const control = this.modelForm.get(formControlName);
    return control?.hasError(validador) && control.touched;
  }

}
