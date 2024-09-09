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

  getByPage(id: number): Promise<IUser> {
    return firstValueFrom(this.http.get<IUser>(`${this.baseUrl}${id}`))
  }

  getById(id: string): Promise<IUser> {
    return firstValueFrom(this.http.get<IUser>(`${this.baseUrl}${id}`))
  }

  delete(id: string): Promise<IUser> {
    return firstValueFrom(this.http.delete<IUser>(`${this.baseUrl}${id}`))
  }
  insert(body: IUser): Promise<IUser> {
    return firstValueFrom(this.http.post<IUser>(this.baseUrl, body))
  }
  update(body: IUser): Promise<IUser> {
    return firstValueFrom(this.http.put<IUser>(`${this.baseUrl}${body._id}`, body))
  }

}
