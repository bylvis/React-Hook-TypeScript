import { ACTION_TYPE, IAction, IState, ITodo } from "./typings";

function todoReducer (state:IState,action:IAction){
    const{type,payload} = action;
    switch(type){
        case ACTION_TYPE.INIT_TODOLIST:
            return{
                ...state,
                todoList:payload as ITodo[]
            }
        // 添加事项
        case ACTION_TYPE.ADD_TODO:
            // 返回一个对象
            return {
                // 把老的state放进来 再修改他的todoList
                ...state,
                // 把payload追加到todoList里面 断言 明确告诉payload类型是ITodo
                todoList:[...state.todoList,payload as ITodo]
            }
        // 删除事项
        case ACTION_TYPE.REMOVE_TODO:
            return {
                ...state,
                // 把payload里面
                todoList:[...state.todoList.filter(todo => todo.id !== payload)]
            }
        // 选择事项
        case ACTION_TYPE.TOGGLE_TODO:
            return {
                ...state,
                todoList:state.todoList.map(todo => {
                    return todo.id === payload ?
                    {
                        ...todo,
                        completed:!todo.completed
                    }:
                    {
                        ...todo
                    }
                })
            }
        default:
            return state;
    }
}
export {
    todoReducer
}