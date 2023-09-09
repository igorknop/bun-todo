import { renderToString } from "react-dom/server";

const server = Bun.serve({
  hostname: "localhost",
  port: 3000,
  fetch: handler,
});

console.log(`Server running at http://${server.hostname}:${server.port}/`);

function handler(request: Request): Response {
  const url = new URL(request.url);
  if (
    url.pathname === "/" ||
    url.pathname === "/index.html" ||
    url.pathname === ""
  ) {
    return new Response(Bun.file("./index.html"));
  }
  if (url.pathname === "/todos" && request.method === "POST") {
    return new Response(renderToString(<TodoList todos={[]} />));
  }
  if (url.pathname === "/todos" && request.method === "GET") {
    return new Response(renderToString(<TodoList todos={[]} />));
  }
  return new Response(`Not Found: ${url}`, { status: 404 });
}

function TodoList(props: { todos: { id: number; text: string }[] }) {
  return (
    <ul>
      {props.todos.length ? (
        props.todos.map((todo) => (
          <li>
            {todo.id}: {todo.text}
          </li>
        ))
      ) : (
        <li>Empty</li>
      )}
    </ul>
  );
}
