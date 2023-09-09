const server = Bun.serve({
    hostname: 'localhost',
    port: 3000,
    fetch: handler,
});

console.log(`Server running at http://${server.hostname}:${server.port}/`);


function handler(request:Request):Response {
  const url = new URL(request.url);
  return new Response(`Not Found: ${url}`, { status: 404 });
  
}