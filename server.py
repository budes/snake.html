from http.server import HTTPServer, CGIHTTPRequestHandler

diretorio = '.' # Já que o meu index está aqui

endrc = 'localhost'
port = 8080

server = HTTPServer((endrc, port), CGIHTTPRequestHandler)

server.serve_forever()