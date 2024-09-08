import { Component, inject, Input, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../user-card/user-card.component';
import { PagesService } from '../../services/pages.service';
import { IPage } from '../../interfaces/ipage.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  pagesServices = inject(PagesService);
  arrUsers: IUser[] = [];

  async ngOnInit() {
    try {
      // Obtener una única página de usuarios
      const page: IPage = await this.pagesServices.getAll();

      // Verifica que la propiedad `results` sea un array de usuarios
      if (page && Array.isArray(page.results)) {
        this.arrUsers = page.results; // Asigna los resultados a arrUsers
        console.log('Usuarios:', this.arrUsers);
      } else {
        console.warn('La propiedad `results` no es un array:', page.results);
      }

    } catch (error) {
      console.error('Error al obtener la página:', error);
    }
  }
}


