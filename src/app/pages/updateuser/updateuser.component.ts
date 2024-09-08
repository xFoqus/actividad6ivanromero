import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [CommonModule],
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
      this.userId = params['id']; // Asegúrate de que el parámetro en la ruta es 'id'

      if (this.userId) {
        try {
          // Espera a que la promesa se resuelva
          this.miUsuario = await this.usuarioService.getById(this.userId);
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      }
    });
  }
}
