import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  userService = inject(UsersService)
  error: any[] = [];
  router = inject(Router)



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

          this.modelForm = new FormGroup({
            first_name: new FormControl(this.miUsuario.first_name, [Validators.required, Validators.minLength(3)]),
            last_name: new FormControl(this.miUsuario.last_name, [Validators.required, Validators.minLength(3)]),
            username: new FormControl(this.miUsuario.username, [Validators.required, Validators.minLength(3)]),
            image: new FormControl(this.miUsuario.image, [Validators.required, Validators.minLength(3)]),
            email: new FormControl(this.miUsuario.email, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
            password: new FormControl(this.miUsuario.password, [Validators.minLength(8), Validators.required]),
            repitepassword: new FormControl(this.miUsuario.password, [Validators.minLength(8), Validators.required])
          }, [this.checkPassword]);


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


  async update() {
    try {
      const response: IUser = await this.userService.update(this.modelForm.value)
      if (response._id) {
        this.router.navigate(['/home'])
      }
    } catch ({ error }: any) {
      this.error = error
      console.log(error)
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