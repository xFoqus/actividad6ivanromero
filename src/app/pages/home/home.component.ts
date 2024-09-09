import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, UserListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



}
