import React, { FC, useCallback, ReactElement, useState, useEffect, useReducer } from "react";
import TdInput from "./Input";
import TdList from "./List";
import { todoReducer } from "./reducer";
import { ACTION_TYPE, IState, ITodo } from "./typings";
// 给useReducer的初始数组
// const initialState:IState = {
//     todoList: []
// }
// 惰性初始化 当useReducer执行的时候才会创建出一个State
// 可以将用于计算state的逻辑提取到reducer外部，这也对将来充值state的action做处理提供了便利
function init(initTodoList:ITodo[]):IState{
    return {
        todoList:initTodoList
    }
}
// 不传值 所以不用<IProps>
const TodoList: FC = (): ReactElement => {
    // 创建一个state 类型是ITodo接口类型的数组 初始值给一个空数组
    // const [todoList,setTodoList] = useState<ITodo[]>([]);
    // 操作函数todoReducer 把[]给到了init 相当于第二个参数作为第三个函数参数的参数
    const [state, dispatch] = useReducer(todoReducer,[],init)
    // 当待办事项列表更新时候进行的操作
    useEffect(() => {
        const todoList = JSON.parse(localStorage.getItem('todoList')||'[]')
        console.log(todoList);
        dispatch({
            type:ACTION_TYPE.INIT_TODOLIST,
            payload:todoList
        })
    }, []);
    useEffect(()=>{
        localStorage.setItem('todoList',JSON.stringify(state.todoList))
    },[state.todoList])
    // 添加待办事项 接收的参数todo 类型ITodo 在typing里规定的接口
    const addTodo = useCallback((todo: ITodo) => {
        // 把当前的todo追加到todoList里面
        // setTodoList(todoList => [...todoList,todo]);
        // 第一个参数是操作类型 第二个参数是接收的值
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    }, [])

    const removeTodo = useCallback((id: number) => {
        dispatch({
            type: ACTION_TYPE.REMOVE_TODO,
            payload: id
        })
    }, [])
    
    const toggleTodo = useCallback((id: number) => {
        dispatch({
            type: ACTION_TYPE.TOGGLE_TODO,
            payload: id
        })
    }, [])
    
        return (
            <div className="todo-list">
                <TdInput
                    addTodo={addTodo}
                    todoList={state.todoList} />
                <TdList
                    todoList={state.todoList}
                    removeTodo={removeTodo}
                    toggleTodo={toggleTodo}
                ></TdList>
            </div>
        )
    }
export default TodoList
// 如果子组件的函数是父组件传过来的 最好用useCallback包一下