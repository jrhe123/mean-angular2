import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// ngModel
import { FormsModule } from '@angular/forms';
// http
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
  imports : [ BrowserModule, FormsModule , HttpModule ],
  declarations : [AppComponent, TasksComponent],
  bootstrap : [AppComponent]
})
export class AppModule { }