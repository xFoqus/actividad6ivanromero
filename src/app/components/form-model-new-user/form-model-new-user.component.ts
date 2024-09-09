import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interfaces/iuser.interface';

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
  activateRoute = inject(ActivatedRoute)
  userService = inject(UsersService)
  router = inject(Router)
  error: any[] = [];




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
  async ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        const user: IUser = await this.userService.getById(params.id)
        this.modelForm.setValue(user)

        this.modelForm = new FormGroup({
          first_name: new FormControl(user.first_name, [Validators.required, Validators.minLength(3)]),
          last_name: new FormControl(user.last_name, [Validators.required, Validators.minLength(3)]),
          username: new FormControl(user.username, [Validators.required, Validators.minLength(3)]),
          image: new FormControl(user.image, [Validators.required, Validators.minLength(3)]),
          email: new FormControl(user.email, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
          password: new FormControl(user.password, [Validators.minLength(8), Validators.required]),
          repitepassword: new FormControl(user.password, [Validators.minLength(8), Validators.required])
        }, [this.checkPassword]);



      }
    })

  }

  async getDataForm() {
    if (this.modelForm.valid) {
      console.log(this.modelForm.value);
      this.modelForm.reset();
    }

  }

  async insert() {
    try {
      const response: IUser = await this.userService.insert(this.modelForm.value)
      if (response._id) {
        console.log("SIIIIII")
      }
    } catch ({ error }: any) {
      this.error = error
      console.log(error)
    }

  }

  checkControl(formControlName: string, validador: string) {
    const control = this.modelForm.get(formControlName);
    return control?.hasError(validador) && control.touched;
  }

}
