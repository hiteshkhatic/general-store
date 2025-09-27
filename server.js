const http = require('node:http');

const server = http.createServer(function (req, res) {
    console.log(req.headers);
    res.writeHead(200)
    res.end('Hello my client , from the official server 😊');
})

server.listen(5000, () => console.log(`Server is running on PORT 5000`));