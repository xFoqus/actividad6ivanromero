import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-model',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-model.component.html',
  styleUrl: './form-model.component.css'
})
export class FormModelComponent {
  modelForm: FormGroup;
  activateRoute = inject(ActivatedRoute)
  miUsuario!: IUser;
  userId: string | null = null;

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

  getDataForm() {
    console.log(this.modelForm.value)
    this.modelForm.reset()
    //redirigir a otra seccion y cuando se vuelva a acargar estaria limpio
  }


  checkControl(formControlName: string, validador: string) {
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
  }

  async ngOnInit() {
    //pido a la base de datos usuarios de este tipo, entrada de datos desde base de datos:

    this.activateRoute.params.subscribe(async (params) => {
      this.userId = params['id']; // Asegúrate de que el parámetro en la ruta es 'id'

      if (this.userId) {
        try {
          // Espera a que la promesa se resuelva
          this.miUsuario = await this.usuarioService.getById(this.userId);
          this.modelForm = new FormGroup({
            first_name: new FormControl(this.miUsuario.first_name, []),
            last_name: new FormControl(this.miUsuario.last_name, []),
            username: new FormControl(this.miUsuario.username, []),
            image: new FormControl(this.miUsuario.image, []),
            email: new FormControl(this.miUsuario.email, []),
            password: new FormControl(null, []),
            repitepassword: new FormControl(null, [])
          }, [])
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      }
    });
  }

}
