import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = "https://peticiones.online/api/users/"
  private http = inject(HttpClient)
  constructor() { }

  getAll(): Promise<IUser[]> {
    return firstValueFrom(this.http.get<IUser[]>(this.baseUrl))
  }

  getByPage(user: number): Promise<IUser> {
    return firstValueFrom(this.http.get<IUser>(`${this.baseUrl}${user}`))
  }
}
