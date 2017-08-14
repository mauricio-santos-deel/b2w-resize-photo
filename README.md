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
After starting the server, you can use any Http Client to consume the service after starting the server. I used [Advanced REST Client google chrome extension](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo).

First let's send a GET HTTP Request to `api/image`'. This should return the list of resized images.
![img1](https://user-images.githubusercontent.com/23347207/29290756-a3af2c68-8117-11e7-9a37-667ba453d816.png)

It returned a empty array because the service that downloads and resize the images has not been run. Let's run it by sending a POST HTTP Request to `api/images`.
![img2](https://user-images.githubusercontent.com/23347207/29290758-a749f6dc-8117-11e7-8ddf-a73bde697edf.png)

After waiting 10 seconds, send again a GET HTTP Request to `api/image`'. This should return the list of resized images.
![img3](https://user-images.githubusercontent.com/23347207/29290760-a9a3039c-8117-11e7-966e-937e57c0bb7a.png)

Great! You can also request the `server/imageName` to return the image. See:
![img4](https://user-images.githubusercontent.com/23347207/29290765-abd8004a-8117-11e7-841d-6b245f7da7ce.png)

## Testing the app
The unit tests was developed using mocha. To run the tests, on your terminal, run the command bellow, but, before running the command make sure that the app is not running.
```
npm test
```
