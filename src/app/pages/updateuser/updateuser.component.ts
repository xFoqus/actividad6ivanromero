import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormModelComponent } from '../../components/form-model/form-model.component';

@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [CommonModule, FormModelComponent],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css'
})
export class UpdateuserComponent {
  activateRoute = inject(ActivatedRoute)
  miUsuario!: IUser;
  userId: string | null = null;


  constructor(private usuarioService: UsersService) {

  }

  async ngOnInit() {
    // Suscríbete a los parámetros de la ruta
    this.activateRoute.params.subscribe(async (params) => {
      this.userId = params['id'];

      if (this.userId) {
        try {
          this.miUsuario = await this.usuarioService.getById(this.userId);
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      }
    });
  }
}
