# MyFIURevised-API
MyFIURevised is a project to create a more user-friendly MyFIU Student Portal.

MyFIURevised-API is the backend/server API layer of MyFIURevised that uses CasperJS to grab students' information by simulating browser requests and human interaction. It spits this data out into an easily consumable JSON format that can then be used any sort of front-end application, whether it be a mobile, desktop or web app.

## Technologies
MyFIURevised-API uses the following technologies:

* [Nginx Server with StartSSL](http://nginx.org/en/docs/) (asynchronous/non-blocking server with encryption for security of data transmission)
* [Docker](https://docs.docker.com/) (for app containerization/scalability)
* [Express](http://expressjs.com/) (for handling request routes and organizing logic)
* [CasperJS with SpookyJS](https://github.com/SpookyJS/SpookyJS) (for grabbing data from the MyFIU student portal)
* [Mocha](http://mochajs.org/)/[Chai](http://chaijs.com/)/[Chai-as-promised](https://github.com/domenic/chai-as-promised/)/[SuperTest](https://github.com/visionmedia/supertest) (for unit/integration testing and ensuring bug-free code)
* [Gulp](http://gulpjs.com/) (for automating tasks like running unit tests)

## Contributing
If you want to contribute, please create a pull request. Please make sure that you write test cases for your code and that such tests pass!

As added quality control to the codebase, your code must also pass this project's JSHint rules.

All tests must go under the appropriate `tests` folder (unit tests must go under the `unit` folder and integration tests must go under the `integration` folder). Unit test file structure, naming and directories must follow the structure based on the corresponding file in the `api` folder.