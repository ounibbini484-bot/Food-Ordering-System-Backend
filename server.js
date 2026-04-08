import http, { request } from 'http';
const server=http.createServer((req,res)=>{
    res.write("Hello im server ");
    res.end();
})
server.listen(8081)