# irondb - Iron Meteorite Database

### Dependencies and documentation
* [Node JS](https://nodejs.org/en/) - Server-side JS Runtime
* [Express.JS](https://expressjs.com/en/4x/api.html) - Web Application Framework
* [EJS](http://ejs.co/) - Templating Engine
* [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/) - Front-end Framework
* [JQuery](https://api.jquery.com/) - JavaScript Library
* [Passport.js](http://www.passportjs.org/) - Authentication middleware fo Node.js

### Tools
* [NPM](https://www.npmjs.com/) - Node Package Manager
* [Gulp](https://gulpjs.com/) - Task Runner
To install Gulp run `npm install gulp-cli -g`
* [Docker](https://www.docker.com/) - Container Engine
To install follow the instructions for your given operating sytem [here](https://docs.docker.com/v17.12/install/). 

### Structure

```bash
├── bin						# Scripts
│	│
│ 	└── www					# Server startup bash script.
│
├── controller				# Handels business logic and routing.
│	│
│ 	├── routes
│ 	│ 	└── index.js 	# Index router - file defines logic for the "/" route.
│ 	│ 
│ 	└── app.js 			# Primary server file.
│ 
├── public 					# Directory containing public static assets.
│	│
│	├── javascripts			# Directory containing js assests. Target for bootstrap js dependencies.
│	│
│	└── stylesheets			# Directory containing css assests. Target for bootstrap.css.
│
├──	views
│	│
│	├── bootstrap			# Directory containing templates for bootstrap tags.
│	│
│	└── index.ejs			# Example EJS template.
│
├── .gitignore				# File defines files git ignore tracking.
│
├── gulpfile.js 			# Gulp task script.
│
├── package.json			# NPM package manager project config.
│
└── README.md 				# Project documentation file.
```





### Required Dependencies
1. Node
2. Gulp

### To Run without docker
1. `cd irondb` - change directory to root
2. `npm install` - Install dependencies.
3. `sudo npm install -g gulp-cli` - Install gulp cli
4. `npm install gulp` - confirm gulp installation
5. `gulp sass` - Compile bootstrap sass and move to public directory.
6. `gulp js` - Move JS dependencies into public directory.
7. `npm start` - Start the server.
8. `http://localhost:3000` - Navigate to localhost port 3000.

### To Run with Docker-Compose
Pre-requisite - Must have docker and gulp cli installed, and docker must be running. See Tool section above for installation details.
1. `cd irondb` - change directory to root
2. `npm install` - Install dependencies.
3. `gulp sass` - Compile bootstrap sass and move to public directory.
4. `gulp js` - Move JS dependencies into public directory.
5. `mkdir pg-data` - Create pg-data directory for postgres data. 
6. `docker-compose up --build` - Use docker compose to build and run images.
	- You can also run up and build commands separately, i.e. `docker-compose build` and `docker-compose up`.
Notes: control-c to exit, then `docker-compose down` to gracefully stop images if they are not already down. Gulp tasks must be run manually before building the image to ensure proper bootstrap integration. 

### Useful docker-compose commands:
* `docker-compose build` - Build images defined by the current directories docker-compose.yml file, but don't run containers.
* `docker-compose up` - Run containers defined by the current directories docker-compose.yml file.
* `docker-compose up --build` - Build and run containers.
* `docker-compose down` - Gracefully stop containers.

Base project initialized using [Express Generator](https://expressjs.com/en/starter/generator.html).
