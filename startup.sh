python -c 'import BaseHTTPServer as bhs, SimpleHTTPServer as shs; bhs.HTTPServer(("127.0.0.1", 8000), shs.SimpleHTTPRequestHandler).serve_forever()'
