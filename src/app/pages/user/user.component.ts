import { Component, inject, OnInit } from '@angular/core';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserListComponent, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
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