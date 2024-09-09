import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-model-new-user',
  standalone: true,
  imports: [RouterLink],
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
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      second_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      image: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.minLength(8)
      ]),
      repitepassword: new FormControl(null, [
        Validators.minLength(8)
      ], [])
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

}
