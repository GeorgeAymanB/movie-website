# movie-website
This is a simple movie web app built using the Express.js framework that allows users to manage a collection of movies in mongoDB. Users can list all movies, add new movies, edit existing movies, and delete movies. Additionally, the application logs every incoming request to a log.txt file using middleware.

**Features**
1.List All Movies: Users can view a list of all movies in the collection.
2.Add New Movie: Users can add new movies to the collection. Each movie should have a title and a poster image.
3.Edit Movie: Users can edit existing movie title.
4.Delete Movie: Users can delete a movie from the collection.
5.Logging: The application logs every incoming HTTP request to a log.txt file. The log should include details such as the request method, URL, timestamp, and any relevant request headers.

**Technologies Used**
-Express.js: The core framework for building the web server and handling HTTP requests.
-MongoBD: used to store and handle movie data

**Setup and usage**
1.Clone this repository to your local machine.
2.Install the required dependencies using npm install.
3.Start the application with npm start.
4.Access the application in your web browser at http://localhost:3001

**If you wish to contribute to this project, please follow these guidelines:
**
1.Fork the repository and create a new branch for your feature or bug fix.
2.Make your changes and test thoroughly.
3.Ensure that your code follows consistent coding standards.
4.Create a pull request with a clear description of your changes.
5.Be responsive to feedback and be prepared to make changes as requested.
