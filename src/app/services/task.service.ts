import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {TASKS} from '../mock-tasks'
import {Task} from '../Task'
import {Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl: string = "http://localhost:5000/tasks"

  constructor(private http : HttpClient){
    
  }

  getTasks(): Observable<Task[]>{
    const tasks = this.http.get<Task[]>(this.apiUrl)
    return tasks
  }

  deleteTask(task: Task): Observable<Task>{
    const deleteUrl = `${this.apiUrl}/${task.id}`
    return this.http.delete<Task>(deleteUrl)
  }
  switchTask(task: Task): Observable<Task>{
    const editUrl = `${this.apiUrl}/${task.id}`
    if(typeof task.reminder==="boolean"){
      task.reminder = !task.reminder
    }
    return this.http.patch<Task>(editUrl, task)
  }
}
