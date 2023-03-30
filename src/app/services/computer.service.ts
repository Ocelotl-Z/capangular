import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Computer } from '../model/computer.model';

@Injectable({
  providedIn: 'root',
})
export class ComputerService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getComputers() {
    return this.http.get<Computer[]>(this.baseUrl + '/computers');
  }

  saveComputer(req: Computer) {
    return this.http.post(this.baseUrl + '/computers', req);
  }

  deleteComputer(id: number) {
    return this.http.delete(this.baseUrl + '/computers/' + id);
  }
}
