import { renderToString } from "react-dom/server";

const server = Bun.serve({
  hostname: "localhost",
  port: 3000,
  fetch: handler,
});

console.log(`Server running at http://${server.hostname}:${server.port}/`);

type Todo = { id: number; text: string };
const todos: Todo[] = [];

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  if (
    url.pathname === "/" ||
    url.pathname === "/index.html" ||
    url.pathname === ""
  ) {
    return new Response(Bun.file("./index.html"));
  }
  if (url.pathname === "/todos" && request.method === "POST") {
    const {todo} = await request.json();
    if(!todo?.length) return new Response("Bad Request", {status: 400});
    todos.push({id: todos.length+1, text: todo});
    return new Response(renderToString(<TodoList todos={todos} />));
  }
  if (url.pathname === "/todos" && request.method === "GET") {
    return new Response(renderToString(<TodoList todos={todos} />));
  }
  return new Response(`Not Found: ${url}`, { status: 404 });
}

function TodoList(props: { todos: Todo[] }) {
  return (
    <ul>
      {props.todos.length ? (
        props.todos.map((todo) => (
          <li key={todo.id}>
            {todo.id}: {todo.text}
          </li>
        ))
      ) : (
        <li>Empty</li>
      )}
    </ul>
  );
}
