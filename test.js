const http = require('http');
const fs = require('fs');

http.createServer(function (err,req,res){
	res.writerHead(200, {'Content-Type' : 'image/png'});
	res.end('Hello Node');
	//fs.createReadStream('./image/test.png').pipe(res);
}).listen(3001);

console.log('Server running at http://127.0.0.1:3001/');