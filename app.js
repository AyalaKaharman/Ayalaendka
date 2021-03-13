const http = require("http");
var fs = require("fs");
function serveStaticFile(res, path, contentType, responseCode) {
    responseCode = 200;
    fs.readFile(__dirname + path, function (error, data) {
        if (error) {
            res.writeHead(500, { "Content-Type": "text/plain" })
            res.end("error.html");
        }
        else {
            res.writeHead(responseCode, { "Content-Type": contentType });
            res.end(data);
        };


    });
}
http.createServer(function (req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch (path){
            case "": 
            serveStaticFile(res, "/index.html", "text/html");
            break;
        case "/about":
            serveStaticFile(res, "/about.html", "text/html");
            break;
        
        case "/graduation":
            serveStaticFile(res, "/img/gallery/graduation.jpg", "image/jpeg");
            break;
        case "/study":
            serveStaticFile(res, "/img/gallery/study.jpg", "image/jpeg");
            break;

        // If we enter localhost:3000/memes it will open the video.
        case "/memes":
            serveStaticFile(res, "/video/students/memes.mp4", "video/mp4");
            break;
        default:
            serveStaticFile(res, "error.html", "text/html");
            break;
    }
}).listen(3000);