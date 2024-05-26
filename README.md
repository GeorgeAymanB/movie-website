# movie-website
This is a simple movie web app built using the Express.js framework that allows users to manage a collection of movies in mongoDB. Users can list all movies, add new movies, edit existing movies, and delete movies. Additionally, the application logs every incoming request to a log.txt file using middleware.
This code also creates the database "movies" itself and the collection "moviedata" if they didn't exist already.

**NOTE** the html file (index.html) contains all frontend code (HTML, CSS and JS)

# Features

1.List All Movies: Users can view a list of all movies in the collection.

2.Add New Movie: Users can add new movies to the collection. Each movie should have a title and a poster image.

3.Edit Movie: Users can edit existing movie title.

4.Delete Movie: Users can delete a movie from the collection.

5.Logging: The application logs every incoming HTTP request to a log.txt file. The log should include details such as the request method, URL, timestamp, and any relevant request headers.

# Technologies Used
-NodeJS 

-Express.js: The core framework for building the web server and handling HTTP requests.

-MongoBD: used to store and handle movie data 

	-Mongo connection URI:
		mongodb://localhost:27017
 
# Setup and usage
1.Clone this repository to your local machine.

2.Install the required dependencies using npm install:

	-npm init -y
	
	-npm install express
	
	-npm install mongoose
	
	-npm install body-parser cors dotenv
	
	-npm install nodemon

3.Start the application with by running **node app.js** in the terminal

4.Access the application in your web browser at http://localhost:3001
#
