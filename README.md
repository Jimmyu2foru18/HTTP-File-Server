# Simple HTTP File Server

This is A user-friendly HTTP file server designed for easy file sharing and management over a network.

## Features

- Serve files over HTTP (e.g., `curl http://localhost:3000/file.txt`)
- Directory listing with navigation capabilities
- Simple and intuitive web interface
- Easy to set up and use

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jimmyu2foru18/HTTP File Server.git
cd HTTP File Server
```

2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the server:
```bash
npm start
```

2. Access files through:
- Web browser: Visit `http://localhost:3000`
- Command line: Use curl commands
  ```bash
  # Download a file
  curl http://localhost:3000/files/example.txt
  
  # Upload a file
  curl -X POST -F "file=@local-file.txt" http://localhost:3000/upload
  ```

## Directory Listing

FileHarbor provides an interactive directory listing feature:
- Navigate through directories using the web interface
- View file details including size and modification date
- Download files directly from the listing page

## API Endpoints

- `GET /`: Home page with directory listing
- `GET /files/:filename`: Download a specific file
- `POST /upload`: Upload a new file
- `GET /files`: List all files in JSON format

## Customization

You can customize FileHarbor by modifying these environment variables:

```bash
PORT=3000           # Server port (default: 3000)
FILES_DIR=./files   # Files directory (default: ./files)
```

## Project Structure

```
/
├── server.js         # Main server file
├── package.json      # Project dependencies and scripts
├── files/            # Directory containing files to serve (created automatically)
└── README.md         # This documentation
```
