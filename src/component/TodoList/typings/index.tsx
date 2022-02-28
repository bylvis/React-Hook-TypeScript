export interface ITodo {
    id:number;
    content:string;
    completed:boolean;
}

export interface IState {
    todoList:ITodo[]
}

export interface IAction {
    type:ACTION_TYPE,
    payload:ITodo | number | ITodo[]
}

// 枚举类型
export enum ACTION_TYPE {
    ADD_TODO = 'addTodo',
    REMOVE_TODO = 'removeTodo',
    TOGGLE_TODO = 'toggleTodo',
    INIT_TODOLIST = 'initTodoList'
}