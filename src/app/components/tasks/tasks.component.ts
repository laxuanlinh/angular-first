import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'
import {Task} from '../../Task'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []

  constructor(private taskService: TaskService){

  }
  ngOnInit(): void {
    this.taskService
        .getTasks()
        .subscribe((tasks) => this.tasks = tasks )
  }
  deleteTask(task: Task){
    this.taskService.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter((t)=>t.id!=task.id))
    console.log(this.tasks)
  }
  switchTask(task: Task){
    const clone = this.copyTask(task)
    this.taskService.switchTask(clone).subscribe(() => {
      task.reminder = !task.reminder
    })
  }
  private copyTask(task: Task):Task{
    return JSON.parse(JSON.stringify(task))
  }
}
