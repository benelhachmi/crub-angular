import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { Subscriber } from 'rxjs';
import { Task } from 'src/app/interface/task';

import { TaskService } from 'src/services/task.service';

@Component( {
       selector : 'tasks-app',
       templateUrl :`./tasks.component.html`
    })


 export class tasksComponent implements OnInit {
   SerchText = '';

editForm =false;
showForm =false;
   myTask :Task ={
      label:'',
      completed:false
   }
tasks: Task[] = [];
resultTasks: Task[] = [];


   constructor(private taskservice :TaskService){}

ngOnInit(){
   this.getTsks();
}
getTsks(){
   this.taskservice.findAll()
   .subscribe(task => this.resultTasks = this.tasks = task)
}
//supprimer de back-end et revoui les valeur qui ont différent de id
deletetask(id){
   this.taskservice.delete(id)
   .subscribe(()=>{
      this.tasks =this.tasks.filter(e=>e !=id)
   })
}
//spred oper reader pour ajouter
persisteTask(){
   this.taskservice.persist(this.myTask)
   .subscribe((test) =>{
      this.tasks =[test,...this.tasks];
      this.resetTask();
      this.showForm=false;
   })
}
//pour rendre les input vide apré l'execution de fonction
resetTask(){
   this.myTask = {
label:'',
completed:false
   }
}
//pour inverser staut de completed
completedTask(task){
this.taskservice.completed(task.id,task.completed)
.subscribe(()=>{
   task.completed =! task.completed
})
}
//auto rempli chenger localement
editTask(task){
this.myTask = task;
this.editForm =true
}

//changer 
updateTask(){
   this.taskservice.update(this.myTask)
.subscribe(e => {
this.resetTask();
this.editForm =false;
   })
    }
//cherche dans data qui est locale
    serachTask(){
this.resultTasks =this.tasks.filter((e) =>e.label.toLowerCase().includes(this.SerchText.toLowerCase()))
    }

   }
