import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/interface/task';

@Injectable({
    providedIn: 'root'
})
export class TaskService{

    apiUrl="http://localhost:3000/tasks"
    constructor(private http: HttpClient) { }
//communique avec backend et récupere data sous forme observable//
findAll(){
    return this.http.get<Task[]>(this.apiUrl);
}
delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`)
}
//ajouter dans json 
persist(task){
    return this.http.post<Task>(this.apiUrl,task);
}
//editer
completed(id,completed){
    return this.http.patch(`${this.apiUrl}/${id}`,{completed: !completed})
}
update(task){
    return this.http.put(`${this.apiUrl}/${task.id}`,task)
}
}
    