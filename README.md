# uncaged-dasboard

Simple rotating carousel of donations from Chimp.net's /site-activity.json feed 

## Getting Started

The project uses Grunt, so you should install it globally for an easy alias with `npm install -g grunt-cli`
You can now run tasks defined in the /Gruntfile.js.

Likewise we also use bower. `npm install -g bower` to have access to the install command. Run a `bower install` to get the app deps

### Important Tasks
`grunt serve` - Builds the application and starts a livereloading dev server at the PORT env variable, this is everything you need to dev.
`grunt build:dist` Builds the assets into a the ./dist/ dir for the asset server.
`npm start` runs the very simple node server.js which acts as a static asset server for ./dist at `http://localhost:PORT`

`grunt build:dist` and `npm start` are what 

## important Env variables
PORT {int} Port the server accepts requeest on
DEBUG_MODE {bool} how verbose loggin is for the application.
ENDPOINT {string} - root url for checking site-activity. eg an `ENDPOINT=https://chimp.net` will look for the activity feed at `https://chimp.net/site-activity.json`
API_KEY {string} - Currently applies this as a query paramter to the /site-acitivty.json request as a query Paramter as `?api_key=API_KEY`

## Deploying to Heroku

This project requires the Grunt - Node Buildpack to execute the proper sequence of install - build - run. 
Buildpack can be found here: https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git.

The build pack definition no longer reccomends this approach, so efforts should me made to move the grunt install step
to a postinstall npm script.
