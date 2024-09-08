import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPage } from '../interfaces/ipage.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private baseUrl: string = "https://peticiones.online/api/users/"
  private http = inject(HttpClient)


  getAll(): Promise<IPage[]> {
    return firstValueFrom(this.http.get<IPage[]>(this.baseUrl))
  }

  getByPage(page: number): Promise<IPage> {
    return firstValueFrom(this.http.get<IPage>(`${this.baseUrl}${page}`))
  }
}
