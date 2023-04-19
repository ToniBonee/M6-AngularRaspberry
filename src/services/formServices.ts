import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  catchError, tap, throwError } from "rxjs";
import { FormsI } from "src/interfaces/form";
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { FormGroup } from "@angular/forms";
@Injectable()
export class FormsService{
    
   forms:Form[] = [ ];
   
private urlLocal  = "http://172.16.33.32:8080/usuario";
httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':'application/json'
    })}
    constructor(private http:HttpClient){};

    GetLocalData():Observable<any>{
        return this.http.get<any>(this.urlLocal)
    }
    createForm(form:FormGroup):Observable<any>{
        return this.http.post<Form>(this.urlLocal, JSON.stringify(form), this.httpOptions).pipe(
            catchError((err) => {
                console.log('error')
                console.error(err);
                return throwError(err);
            })
        )
        
    }
    /** GET heroes from the server */
    getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.urlLocal)
      .pipe(
        catchError((err) => {
            console.log('error')
            console.error(err);
            return throwError(err);
        })
      );
  }
  
updateForm(form: Form, id: number): Observable<any> {
    console.log(form);
    const url = this.urlLocal+ "/" + id;
    return this.http.put(url , form, this.httpOptions).pipe(
        catchError((err) => {
            console.log(form)
            console.log('error')
            console.error(err);
            return throwError(err);
        })
    );
  }
    getForm(id: number): Observable<any>{
        
        const url = this.urlLocal+ "/" +{id};
        return this.http.get<Form>(url).pipe(
        catchError((err) => {
            console.log('error')
            console.error(err);
            return throwError(err);
        })
      );
    }
     deleteForm(form:Form | number):Observable<Form>{
        const id = typeof form === 'number' ? form : form.id;
        const url = `${this.urlLocal}/${id}`;
      
        return this.http.delete<Form>(url, this.httpOptions).pipe(
            catchError((err) => {
                console.log('error')
                console.error(err);
                return throwError(err);
            })
        );
        
    }
    sendForms(id: number, modelo: number  ,nombre: string,  fecha: string,  informacion: boolean,  email: string,  personalizar: boolean, matricula: string, matriculaText: string  ,color: string, politicas: boolean):Observable<Form[]>{
    if(  politicas != false){
        this.forms.push({ id: id, modelo: modelo  ,nombre: nombre,  fecha: fecha,  informacion: informacion,  email: email,  personalizar: personalizar, matricula: matricula, matriculaText: matriculaText  ,color: color, politicas: politicas});
    }
    return of(this.forms);

   }
}
export interface Form{id: number, modelo: number  ;nombre: string;  fecha: string;  informacion: boolean;  email: string;  personalizar: boolean; matricula: string; matriculaText: string  ;color: string; politicas: boolean; }