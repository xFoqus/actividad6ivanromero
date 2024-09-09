import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-model',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './form-model.component.html',
  styleUrls: ['./form-model.component.css']
})
export class FormModelComponent implements OnInit {
  modelForm: FormGroup;
  activateRoute = inject(ActivatedRoute);
  miUsuario!: IUser;
  userId: string | null = null;
  tipo: string = 'Guardar';

  constructor(private usuarioService: UsersService) {
    this.modelForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      second_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      image: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
      password: new FormControl('', [Validators.minLength(8), Validators.required]),
      repitepassword: new FormControl('', [Validators.minLength(8), Validators.required])
    }, [this.checkPassword]);
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(async (params) => {
      this.userId = params['id']; // Asegúrate de que el parámetro en la ruta es 'id'

      if (this.userId) {
        try {
          this.miUsuario = await this.usuarioService.getById(this.userId);

          this.modelForm.patchValue({
            first_name: this.miUsuario.first_name,
            second_name: this.miUsuario.last_name,
            username: this.miUsuario.username,
            image: this.miUsuario.image,
            email: this.miUsuario.email,
            password: this.miUsuario.password,
            repitepassword: this.miUsuario.password
          });
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      }
    });
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