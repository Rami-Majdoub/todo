import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(){ }

  currentTodo: string = '';

  clearCurrentTodo = () => {
    this.currentTodo = '';
  }

  todos: Todo[] = [];

  initTodo = () => {
    const todos: string[] = [
      'Get to work',
      'Pick up groceries',
      'Go home'
    ]
    todos.forEach(this.addTodo);
  }

  addCurrentTodo = () => {
    this.addTodo(this.currentTodo);
    this.clearCurrentTodo();
  }

  addTodo = (action: string) => {
    if(!action.trim()) return;

    this.todos.push({
      action,
      done: false
    });
  }

  reverseDone = (index: number) => {
    const todo = this.todos[index];
    todo.done = !todo.done;
  }

  deleteTodo = (index: number) => {
    this.todos.splice(index, 1);
  }
}

interface Todo {
  action: string;
  done: boolean;
}