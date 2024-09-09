import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() miUser!: IUser;
  usuariosService = inject(UsersService)


  deleteUser(id: string) {
    let borrado = confirm('Deseas borrar el empleado cuyo id es: ' + id)
    if (borrado) {
      try {
        const response = this.usuariosService.delete(id);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

}
