import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormModelComponent } from "../../components/form-model/form-model.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { FormModelNewUserComponent } from "../../components/form-model-new-user/form-model-new-user.component";
@Component({
  selector: 'app-newuser',
  standalone: true,
  imports: [CommonModule, FormModelNewUserComponent],
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.css'
})
export class NewuserComponent {
  activateRoute = inject(ActivatedRoute)
  miUsuario!: IUser;
  userId: string | null = null;
}
