import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) {  }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json', 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST'
  });

  register(datos):Observable<any>{
    return this.http.post('http://localhost:3000/register',datos,)
  }


  listUser(){
    return this.http.get('http://localhost:3000/register')
  }

  deleteuser(id:number){
    return this.http.delete('http://localhost:3000/register/'+id)
  }

  sendEmail(email){
    console.log(email)
    return this.http.post('http://localhost:3000/email/',email)

  }

}
