let http = require('http');
let port = process.env.PORT || 8000;
let fs = require('fs');

let server = http.createServer(function(req, res) {

  //Your code here
  if(req.method === 'GET' && req.url === '/intro'){
    console.log("Welcome!");
    res.setHeader('Content-Type','text/plain');
    res.end('Welcome to Back-End!!!!');

  } else if(req.method === 'GET' && req.url === '/pets'){
    let myPets = ['Boomer', 'Prince', 'Pepsi'];
    let pets = JSON.stringify(myPets);
    res.setHeader('Content-Type', 'application/json');
    res.end(pets);
    console.log('I am at Pets');

  } else if(req.method === 'GET' && req.url === '/getinfo'){
    fs.readFile('./static/info.txt', 'utf8', function(err, data){
      if(err) throw err

      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
    });
  } else if(req.method === 'POST' && req.url === '/count'){
    fs.readFile('./static/storage.txt','utf8', function(err, counterData){
      let myNumber = parseInt(counterData) + 1;
      fs.writeFile('./static/storage.txt', myNumber, function(err){
        if(err) throw err
        res.setHeader('Content-Type', 'text/plain');
        res.end("Total Hits: " + myNumber);
      });

    });

  } else if(req.method === 'GET' && req.url === '/getcount'){
    fs.readFile('./static/storage.txt', 'utf8', function(err, readCounter){
      if(err) throw err
      res.setHeader('Content-Type', 'text/plain');
      res.end(readCounter);
    });
  } else if(req.method === 'GET' && req.url === '/index'){
    fs.readFile('./static/index.html',"utf8", function(err, indexFileData){
      if(err) throw err
      res.setHeader('Content-Type', 'text/html');
      res.end(indexFileData);
    });

  } else if(req.method === 'GET' && req.url === '/dynamic'){

    fs.readFile('./static/storage.txt', 'utf8', function(err, data){
      var newDataNo = parseInt(data);
      fs.readFile('./dynamic/index.html', "utf8", function(err, dynamicData){
        if(err) throw err
        res.setHeader('Content-Type', 'text/html');
        res.end(dynamicData.replace("{{count}}", newDataNo));
      });
    });

  } else{
    res.setHeader('Content-Type', 'text/plain');
    res.end('Error!');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});
