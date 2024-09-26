import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


interface Task {
  assignedTo: string;
  status: string;
  dueDate: Date;
  priority: string;
  description: string;
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() task: any = {
    assignedTo: '',
    status: '',
    priority: '',
    dueDate: '',
    description: ''
  };
  @Input() mode: 'edit' | 'new' = 'edit';
  @Output() close = new EventEmitter<void>(); // Output event for closing the modal
  @Output() save = new EventEmitter<any>(); 
  tasks: Task[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.tasks  = [
      { assignedTo: 'User 1', status: 'Completed', dueDate: new Date('2024-10-12'), priority: 'Low', description: 'This task is good' },
      { assignedTo: 'User 2', status: 'In Progress', dueDate: new Date('2024-09-14'), priority: 'High', description: 'This task is important' },
      { assignedTo: 'User 3', status: 'Not Started', dueDate: new Date('2024-08-18'), priority: 'Low', description: 'This task needs attention' },
      { assignedTo: 'User 4', status: 'In Progress', dueDate: new Date('2024-06-12'), priority: 'Normal', description: 'This task is ongoing' }
    ];
  }

  taskForm!: FormGroup;
  users = ['User 1', 'User 2', 'User 3', 'User4'];
  statuses = ['Not Started', 'In Progress', 'Completed'];
  priorities = ['Low', 'Normal', 'High'];


  closeModal(): void {
    this.close.emit(); 
  }

  onSave(): void {
    this.save.emit(this.task); 
    this.closeModal();
  }

}
