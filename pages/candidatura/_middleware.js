

export function middleware(req, ev) {
    console.log("HEllo")
  return new Response('Hello, world!')
}