const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Set the directory to serve files from
const serveDirectory = path.join(__dirname, 'files');

// Create the files directory if it doesn't exist
if (!fs.existsSync(serveDirectory)) {
  fs.mkdirSync(serveDirectory, { recursive: true });
}

// Middleware to handle directory listing
app.get('*', (req, res) => {
  const requestPath = req.path === '/' ? '' : req.path;
  const fullPath = path.join(serveDirectory, requestPath);

  // Check if path exists
  if (!fs.existsSync(fullPath)) {
    return res.status(404).send('File or directory not found');
  }

  // Check if it's a directory
  if (fs.statSync(fullPath).isDirectory()) {
    // Read directory contents
    const files = fs.readdirSync(fullPath);
    
    // Generate HTML for directory listing
    const directoryPath = path.join('/', requestPath);
    let html = `<h1>Directory listing for ${directoryPath}</h1><ul>`;
    
    // Add parent directory link if not at root
    if (requestPath !== '') {
      const parentPath = path.dirname(requestPath) === '/' ? '/' : path.dirname(requestPath);
      html += `<li><a href="${parentPath}">Parent Directory</a></li>`;
    }
    
    // Add files and directories
    files.forEach(file => {
      const filePath = path.join(fullPath, file);
      const isDirectory = fs.statSync(filePath).isDirectory();
      const linkPath = path.join(requestPath, file);
      
      html += `<li><a href="${linkPath}">${file}${isDirectory ? '/' : ''}</a></li>`;
    });
    
    html += '</ul>';
    return res.send(html);
  }
  
  // If it's a file, serve it
  res.sendFile(fullPath);
});

app.listen(port, () => {
  console.log(`File server running at http://localhost:${port}`);
  console.log(`Serving files from: ${serveDirectory}`);
});