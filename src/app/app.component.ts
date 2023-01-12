import { Component, OnDestroy } from '@angular/core';
import { WalletConnectorService } from './services/contract-service.service';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  
  constructor(
    public wallet_: WalletConnectorService,
    private apollo: Apollo,
  ){ }

  accountAddress = "";
  async connectWallet(){
    this.accountAddress = await this.wallet_.connectAccount();
  }

  s: any;
  get(){
    this.s = this.apollo.watchQuery({
      query: gql `
        query get($account: String) {
          todos(where: { from: $account })
          { id done content }
        }
      `,
      variables: {
        account: this.accountAddress
      }
    }).valueChanges.subscribe({
      next: (val: any) => {
        this.todos = [];
        val.data.todos.map(
          (todo: { done: boolean; content: any; }) =>
          this.todos.push({
            done: todo.done,
            action: todo.content
          })
        );
      }
    }
    )
  }

  ngOnDestroy(): void {
    this.s?.unsubscribe();
  }

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