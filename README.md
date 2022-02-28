# 建立react-TypeScript项目
npx create-react-app react-hooks-ts --template typescript
# 构建组件结构
index.tsx
    --App.tsx
        --TodoList.tsx
            --TdInput
            --TdList
# useReducer存在的意义
有很多的方法去操作一个状态的变化
方法内部有很多复杂的逻辑
# 函数组件Ts建议写法
## 最好是创建一个接口的公共文件typings.tsx 把接口导出
### 参数都是一般变量的接口定义
export interface ITodo {
    id:number;
    content:string;
    completed:boolean;
}
### 参数都是方法类型的接口定义
interface IProps{
    num1:(num:number) => void,
    func1:(str:string) => void
}
### 接口嵌套
interface inf1{
    todoList:ITodo[]
}
### 枚举类型的接口
使用枚举我们可以定义一些带名字的常量，当枚举作为类型时，表示该属性只能为枚举中的某一个成员。方便归类
export enum ACTION_TYPE {
    ADD_TODO = 'addTodo',
    REMOVE_TODO = 'removeTodo',
    TOGGLE_TODO = 'toggleTodo',
    INIT_TODOLIST = 'initTodoList'
}
<!-- 这个接口表示接收到的type必须要是ACTION_TYPE接口里面的某一个成员 -->
export interface IAction {
    type:ACTION_TYPE,
    payload:ITodo | number | ITodo[]
}
# 函数组件建议写法
1.首先定义该组件接收的参数类型
interface IProps{
    id:number;
    content:string;
    completed:boolean;
}
2.声名函数组件
const func:FC<IProps> = ({
        id,
        content,
        completed
    }):ReactElement =>{
        return(
        <div></div>
        )
    }