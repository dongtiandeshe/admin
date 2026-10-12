/*
 * @Author: Duanyt
 * @Date: 2026-09-21 13:26:45
 * @LastEditTime: 2026-10-12 11:21:16
 * @LastEditors: Duanyt
 * @Description: 
 */
import { useState, type ReactNode } from "react";
import Count from "./components/count";
import TodoList from "./components/typescripe";

type PracticeItem = {
	id: string;
	title: string;
	render: () => ReactNode;
};

const practiceItems = [
	{
		id: "count",
		title: "计数器",
		render: () => <Count />,
	},
	{
		id: "typescript",
		title: "TypeScript 待办练习",
		render: () => (
			<TodoList
				title="TypeScript 待办练习"
				initialTodos={[
					{ id: 1, text: "完成计数器练习", done: false },
					{ id: 2, text: "完成 TypeScript 练习", done: false },
				]}
			/>
		),
	},
] satisfies PracticeItem[];

type PracticeView = (typeof practiceItems)[number]["id"];

export default function Practice() {
	const [activeView, setActiveView] = useState<PracticeView>("count");
	const activeItem = practiceItems.find((item) => item.id === activeView);

	return (
		<main>
			<nav aria-label="练习组件">
				{practiceItems.map((item, index) => (
					<span key={item.id}>
						{index > 0 && " | "}
						<a
							href={`#${item.id}`}
							aria-current={activeView === item.id ? "page" : undefined}
							onClick={(event) => {
								event.preventDefault();
								setActiveView(item.id);
							}}
						>
							{item.title}
						</a>
					</span>
				))}
			</nav>

			<section>{activeItem?.render()}</section>
		</main>
	);
}
