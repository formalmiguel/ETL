------ To make a similar copy

--- create a new file in the terminal using

mkdir ETL

--- then cd into that directory

run npm init -y

--- to create a package.json file

--- then run

npm i --save csvtojson mongodb

--- to add csvtojson and mongodb

--- then make new folders with a similar setup to avoid confusion

--- have the csv file inside the folder and create a .js file for transforming your code.

--- after your .js file is ready look in Styles/styles.js for an idea of how you'd want your code to look)
--- cd into your folder and run
node styles.js

--- replace styles with the name of your js file
--- the terminal should log 'DB Connected!' when its connected
--- it'll also log 'done sorting' when sorting is done
--- I would begin checking Compass at this point
