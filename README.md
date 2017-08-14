# Resize Photos
This is a job application challenge. This project will build an Express.js HTTP Server that consumes an external service, download some images and resize them.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
In order to build this project from the source code, you will need to install:
  * [Node.js - version 6,11,2 or higher](https://nodejs.org/en/)
  * [MongoDb](https://docs.mongodb.com/manual/installation/)
  * [GraphicsMagic](http://www.graphicsmagick.org/)

Make sure that gm (GraphicsMagic) is being recognized as a system command, executing the command bellow on the terminal:

```bash
$ gm --help
```

If not, add GraphicsMagic path inside path environment variable.

### Running the app

First of all, let's clone this git repository.
```bash
$ git clone https://github.com/msantos-sw/b2w-resize-photo.git
```

Now, in your terminal, go to the project path and then, run the command bellow. This will install all node modules necessary.
```bash
$ npm i
```

The app source code is cloned and the dependencies have been installed. But, before running the server, first, initialize your mongod service.
```bash
$ mongod
```

Great! Now we can start the server. In your terminal run the command bellow.
```bash
$ npm start
```

## Consuming the resizing photo service

## Testing the app
The unit tests was developed using mocha. To run the tests, on your terminal, run the command bellow, but, before running the command make sure that the app is not running.
```
npm test
```
