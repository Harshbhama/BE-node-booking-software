const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express();

const routes = {
    '/iternary': 'http://localhost:4001'
}
for (const route in routes){
  const target = routes[route]
  app.use(route, createProxyMiddleware({target}))
}

const PORT = 4000
app.listen(PORT, () => {
  console.log("Api gateway started at", PORT);
})