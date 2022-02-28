import React, { FC, ReactElement } from "react";
import { ITodo } from '../typings'
// 定义接口
interface IProps {
    todo: ITodo;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}
// 规定是函数类型 并且参数是IProps接口规定的参数
const TdItem: FC<IProps> = ({ todo, toggleTodo, removeTodo }): ReactElement => {
    const { id, content, completed } = todo;
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleTodo(id)}
            />
            <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{content}</span>
            <button onClick={() => removeTodo(id)}>删除</button>
        </div>
    )
}
export default TdItem