/*
 * @Author: Duanyt
 * @Date: 2026-09-21 00:00:00
 * @Description: TypeScript 练习组件 —— 补全所有 TODO 处的类型标注后，运行 `npm run build` 应无类型错误
 */

import { useState, useRef, useEffect, type ChangeEvent } from "react";

/* ============================================================
 * 练习 1：定义接口（interface）
 * 要求：定义 TodoItem 接口，包含以下字段：
 *   - id: 数字
 *   - text: 字符串
 *   - done: 布尔值
 *   - deadline?: 可选的截止日期（Date 类型）—— 注意可选属性的写法
 * ============================================================ */
// TODO 1: 在这里定义 TodoItem 接口
interface TodoItem {
    id: number,
    text: string,
    done: boolean,
    deadline?: Date
}
/* ============================================================
 * 练习 2：联合类型（union type）与字面量类型
 * 要求：定义 FilterStatus 类型，它只能是 'all' | 'active' | 'completed' 三种字符串之一
 * ============================================================ */
// TODO 2: 在这里定义 FilterStatus 类型
type FilterStatus = 'all' | 'active' | 'completed'
/* ============================================================
 * 练习 3：函数类型（function type）
 * 要求：定义 TodoHandler 类型，它表示一个"接收 TodoItem、无返回值"的函数
 * 提示：等价于 (todo: TodoItem) => void
 * ============================================================ */
// TODO 3: 在这里定义 TodoHandler 类型
type TodoHandler = (todo: TodoItem) => void
/* ============================================================
 * 练习 4：组件 Props 接口
 * 要求：定义 TodoListProps 接口，包含：
 *   - title: 字符串，且用 readonly 修饰（试试去掉 readonly 会不会报错）
 *   - initialTodos: TodoItem 数组
 *   - onTodoChange?: 可选的回调函数，类型为 TodoHandler
 * ============================================================ */
// TODO 4: 在这里定义 TodoListProps 接口
interface TodoListProps {
    readonly title: string,
    initialTodos: TodoItem[],
    onTodoChange?: TodoHandler
}
/* ============================================================
 * 练习 5：泛型工具函数
 * 要求：实现 getById，从任意类型的数组中按 id 找到第一个匹配的元素，找不到返回 undefined
 *   - 泛型参数 T 需要约束为"必须有 id: number 属性"
 * 提示：function getById<T extends { id: number }>(...)
 * ============================================================ */
// TODO 5: 实现这个泛型函数
function getById<T extends { id: number}>(items: T[], id: number): T | undefined {
  // 补全实现
  return items.find(item => item.id === id)
}

/* ============================================================
 * 练习 6：utility type（Pick / Omit / Partial）
 * 要求：基于 TodoItem 派生出新类型：
 *   - TodoDraft：新建待办时用户填写的内容，即 TodoItem 去掉 id 和 done（用 Omit）
 *   - TodoPatch：部分更新时用的类型，所有字段都可选（基于 TodoDraft，用 Partial）
 * ============================================================ */
// TODO 6: 在这里定义 TodoDraft 和 TodoPatch
type TodoDraft = Omit<TodoItem, 'id' | 'done'>
type TodoPatch = Partial<TodoDraft>
/* ============================================================
 * 练习 7：处理 unknown / 类型收窄（narrowing）
 * 要求：从 localStorage 读取数据时结果可能是任意内容。
 *   实现 loadTodos：参数为 string | null，返回 TodoItem[]。
 *   需要：判断 null → 返回默认值；JSON.parse 结果是 unknown → 用类型守卫逐项校验后再返回
 * 提示：类型守卫形如 function isTodo(value: unknown): value is TodoItem { ... }
 * ============================================================ */
// TODO 7: 先写类型守卫 isTodo，再实现 loadTodos
function isTodo(value: unknown): value is TodoItem{
    if(typeof value !== "object" || value === null) return false
    const v = value as Record<string, unknown>
    return (
        typeof v.id === "number" &&
        typeof v.text === "string" &&
        typeof v.done === "boolean" &&
        (v.deadline === undefined || v.deadline instanceof Date)
    );
}
function loadTodos(raw: string | null): TodoItem[] {
  if (raw === null) {
    return defaultTodos;
  }
  // 补全：JSON.parse、校验并返回 TodoItem[]
  let parsed;
  try{
    parsed = JSON.parse(raw)
  }catch{
    return defaultTodos
  }
  if(Array.isArray(parsed)) return defaultTodos
  return parsed.filter(isTodo);
}

const defaultTodos: TodoItem[] = [
  { id: 1, text: "学习 interface", done: true },
  { id: 2, text: "学习泛型", done: false, deadline: new Date("2026-10-01") },
  { id: 3, text: "学习 utility type", done: false },
];

export default function TodoList(props: TodoListProps) {
  /* ============================================================
   * 练习 8：useState 的类型标注
   * 要求：思考下面三个 state 分别需要显式标注类型吗？为什么？
   *   - 对于 filter，请显式标注为 FilterStatus
   *   - 对于 todos 和 input，判断是否能自动推断
   * ============================================================ */
  // TODO 8: 补全 useState 的泛型标注
  const [todos, setTodos] = useState<TodoItem[]>(props.initialTodos);
  const [input, setInput] = useState("");   //不需要显式标注类型，因为有初始值，ts会进行类型推断
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("practice-todos");
    setTodos(loadTodos(saved));
  }, []);

  /* ============================================================
   * 练习 9：事件类型（React 的事件处理）
   * 要求：给下面的参数 event 标注正确的类型，使其能访问 event.target.value
   * 提示：import type { ChangeEvent } from "react"，输入框用 ChangeEvent<HTMLInputElement>
   * ============================================================ */
  // TODO 9: 补全 event 的类型
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  /* ============================================================
   * 练习 10：交叉使用前面练习的类型
   * 要求：addTodo 的参数类型应为 TodoDraft（练习 6）；
   *   内部需要构造一个完整的 TodoItem（思考缺的 id、done 从哪来）；
   *   props.onTodoChange 是可选的，调用前需要判空
   * ============================================================ */
  // TODO 10: 补全参数类型与实现
  function addTodo(draft: TodoDraft) {
    // 补全实现：生成新 id、合并为 TodoItem、更新 state、调用回调
    let id = Date.now()    // id使用时间搓
    let todoItem: TodoItem = {
        ...draft,
        id: id,
        done: false,
    }
    const todoItems: TodoItem[] = todos.concat(todoItem)
    setTodos(todoItems)
    props?.onTodoChange?.(todoItem)
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
    const target = getById(todos, id); // 练习 5 的使用处
    if (target && props.onTodoChange) {
      props.onTodoChange(target);
    }
  }

  /* ============================================================
   * 练习 11：数组方法与类型收窄
   * 要求：补全 getVisibleTodos 的返回类型。
   *   filter 为 'completed' 时返回已完成的；'active' 返回未完成的；'all' 全部返回
   * ============================================================ */
  // TODO 11: 补全函数返回类型
  function getVisibleTodos(): TodoItem[] {
    switch (filter) {
      case "completed":
        return todos.filter((t) => t.done);
      case "active":
        return todos.filter((t) => !t.done);
      default:
        return todos;
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ maxWidth: 480, margin: "24px auto", fontFamily: "sans-serif" }}>
      <h2>{props.title}</h2>

      <div>
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              marginRight: 8,
              fontWeight: filter === f ? "bold" : "normal",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ margin: "12px 0" }}>
        <input
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          placeholder="输入新的待办事项"
          style={{ marginRight: 8 }}
        />
        <button onClick={() => addTodo({ text: input })} disabled={!input.trim()}>
          添加
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ paddingLeft: 20 }}>
        {getVisibleTodos().map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              cursor: "pointer",
              textDecoration: todo.done ? "line-through" : "none",
              color: todo.deadline && !todo.done ? "orange" : "inherit",
            }}
          >
            {todo.text}
            {todo.deadline
              ? `（截止：${todo.deadline.toLocaleDateString()}）`
              : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
