const http = require("http");
const fs = require("fs");
const path = require("path");
/*  */

const server = http.createServer((req, res) => {
  // Obtenemos la ruta del archivo solicitado
  const filePath = path.join(
    __dirname,
    "src",
    req.url === "/" ? "index.html" : req.url
  );
  console.log("filePath")
  console.log(filePath)

  // Verificamos si el archivo existe
  fs.exists(filePath, (exists) => {
    if (exists) {
      // Leemos el archivo y lo enviamos como respuesta
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(`Error al leer el archivo: ${err}`);
        } else {
          const contentType = getContentType(filePath);
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
    } else {
      res.writeHead(404);
      res.end("Archivo no encontrado");
    }
  });
});



// Función para obtener el tipo de contenido del archivo
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
      return "image/jpg";
    default:
      return "text/plain";
  }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${PORT}/`);
});
