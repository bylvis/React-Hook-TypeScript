import React, { useRef, FC, ReactElement } from "react";
import TodoList from "..";
import { ITodo } from "../typings";

interface IProps {
    addTodo: (todo: ITodo) => void;
    todoList:ITodo[];
}

// 函数组件尽量这么写 接收的参数是父组件上面传下来的方法和元素
const TdInput: FC<IProps> = ({ 
    addTodo,
    todoList
}): ReactElement => {
    // 定义函数、接口、类的时候没有指定具体类型 调用时再传递具体类型
    // 为了极大程度复用代码
    // 在定义时函数不明确的参数 在创建时指定
    // 泛型 基本上都要写
    const inputRef = useRef<HTMLInputElement>(null)
    // 添加事项
    const addItem = (): void => {
        // 拿到input当前的值
        const val: string = inputRef.current!.value.trim()
        if(val.length){
            // 从父组件传下来的todoList里面寻找是否和有当前input里的值相同的值 否则报错
            const isExist = todoList.find(todo => todo.content === val)
            if(isExist) {
                alert('已存在该项');
                return;
            }
            // 如果存在就调用addTodo方法 这个是从父组件上面传下来的
            addTodo({
                id:new Date().getTime(),
                content:val,
                completed:false
            })
            // 感叹号代表可能为空 清空input
            inputRef.current!.value = ''
        }
    }
    return (
        <div className="todo-input">
            <input type="text" placeholder="请输入待办事项" ref={inputRef} />
            <button onClick={ addItem }>增加</button>
        </div>
    )
}
export default TdInput