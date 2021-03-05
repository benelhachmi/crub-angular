import {Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/interface/task';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskService{
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            return of(result as T);
        };
      }
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    apiUrl="http://localhost:3000/tasks"
    constructor(private http: HttpClient) { }
////////////////////////////////////////////////////////////////////////
                     //communique avec backend et récupere data sous forme observable//
findAll(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl)
    .pipe(   
        catchError(this.handleError<Task[]>('findAll', []))
    )
    ;
}
///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
                     /////////suprimer de la base de donné 
delete(id) :Observable<any |void>{
    return this.http.delete(`${this.apiUrl}/${id}`)
}  //////////////////////////////////////////////////////
//ajouter dans json 
persist(task) :Observable<Task>{
    return this.http.post<Task>(this.apiUrl,task, this.httpOptions)
    .pipe(
        catchError(this.handleError<Task>('addtask'))
    )
    ;
}
//editer
completed(id,completed){
    return this.http.patch(`${this.apiUrl}/${id}`,{completed: !completed})
} //////////////////////////////////////////////////////////////////////////////////////////


update(task) :Observable<Task>{
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`,task)
}
}
    