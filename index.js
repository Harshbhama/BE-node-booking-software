const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors');
const app = express();
var corsOptions = {
  origin: 'http://localhost:3000' };
app.use(cors(corsOptions));
const routes = {
    '/iternary': 'http://localhost:4001',
    '/chat': 'http://localhost:4002'
}
for (const route in routes){
  const target = routes[route]
  app.use(route, createProxyMiddleware({target}))
}

const PORT = 4000
app.listen(PORT, () => {
  console.log("Api gateway started at", PORT);
})