import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { tasksComponent } from './tasks.component';


@NgModule({
    declarations:[
        tasksComponent ,
    ],
    imports :[
        BrowserModule,
        CommonModule,
        FormsModule,
    ],
    exports :[
        tasksComponent
    ]

})
export class TasksModule {}