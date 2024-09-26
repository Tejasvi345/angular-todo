import { Component, Input, OnInit } from '@angular/core';

interface Task {
  id:number;
  assignedTo: string;
  status: string;
  dueDate: Date;
  priority: string;
  description: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() task: any = {
    id:'',
    assignedTo: '',
    status: '',
    priority: '',
    dueDate: '',
    description: ''
  };
  tasks: Task[] = [];

  searchText: string = '';
  selectedTask: any = null;
  router: any;
  isDeleteModalOpen: boolean = false; 
  taskToDelete: Task | null = null;  
  isModalOpen = false; 
  modalMode: 'edit' | 'new' = 'edit';

  constructor() {}

  ngOnInit(): void {
    this.tasks  = [
      {id:1, assignedTo: 'User 1', status: 'Completed', dueDate: new Date('2024-10-12'), priority: 'Low', description: 'This task is good' },
      {id:2, assignedTo: 'User 2', status: 'In Progress', dueDate: new Date('2024-09-14'), priority: 'High', description: 'This task is important' },
      {id:3, assignedTo: 'User 3', status: 'Not Started', dueDate: new Date('2024-08-18'), priority: 'Low', description: 'This task needs attention' },
      {id:4, assignedTo: 'User 4', status: 'In Progress', dueDate: new Date('2024-06-12'), priority: 'Normal', description: 'This task is ongoing' }
    ];
  }

  users = ['User 1', 'User 2', 'User 3'];

  
  refreshTasks() {
    console.log('Task list refreshed');
  }


  
  openDeleteModal(task: Task) {
    this.taskToDelete = task;
    this.isDeleteModalOpen = true;
  }

  // Close the modal without deleting
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.taskToDelete = null;
  }

  // Confirm task deletion
  confirmDeleteTask() {
    if (this.taskToDelete) {
      this.tasks = this.tasks.filter(t => t !== this.taskToDelete);
    }
    this.closeDeleteModal();
  }

  
  deleteTask(task: Task) {
    this.openDeleteModal(task);
  }

  
  filteredTasks(): Task[] {
    if (!this.searchText) return this.tasks;
    return this.tasks.filter(task =>
      task.assignedTo.toLowerCase().includes(this.searchText.toLowerCase()) ||
      task.status.toLowerCase().includes(this.searchText.toLowerCase()) ||
      task.priority.toLowerCase().includes(this.searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  

  openEditModal(task: any): void {
    this.selectedTask = { ...task };
    this.modalMode = 'edit'; 
    this.isModalOpen = true; 
  }

  openNewTaskModal(): void {
    this.selectedTask = { title: '', description: '' }; // Initialize an empty task for the form
    this.modalMode = 'new'; // Set mode to 'new'
    this.isModalOpen = true; // Open the modal
  }

  // Closes the modal (e.g., called after clicking "Cancel")
  closeModal(): void {
    this.isModalOpen = false; // Set modal state to hidden
  }

  // Handles saving the edited task
  saveTask(task: any): void {
    if (this.modalMode === 'new') {
      // Add new task to tasks array
      this.tasks.push({ ...task, id: this.tasks.length + 1 });
    } else if (this.modalMode === 'edit') {
      // Update an existing task in tasks array
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index > -1) {
        this.tasks[index] = task;
      }
    }
    this.closeModal(); // Close the modal after saving
  }

}


  