# ChatterHub Backend

## Acknowledgements
This backend is based on the [sample go app](https://github.com/CVWO/sample-go-app) provided by CVWO.

## Getting Started

### Installing Go

Download and install Go by following the instructions [here](https://go.dev/doc/install).

### Running the app
1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) this repo.
2. [Clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) **your** forked repo.
3. Open your terminal and navigate to the directory containing your cloned project.
4. Run `go run cmd/server/main.go` and head over to http://localhost:8000/users to view the response.


### Navigating the code
This is the main file structure. 
```
.
├── cmd
│   ├── server
├── internal
│   ├── api         # Encapsulates types and utilities related to the API
│   ├── dataacess   # Data Access layer accesses data from the database
│   ├── database    # Encapsulates the types and utilities related to the database
│   ├── handlers    # Handler functions to respond to requests
│   ├── models      # Definitions of objects used in the application
│   ├── router      # Encapsulates types and utilities related to the router
│   ├── routes      # Defines routes that are used in the application
├── README.md
├── go.mod
└── go.sum
```

Main directories/files to note:
* `cmd` contains the main entry point for the application
* `internal` holds most of the functional code for your project that is specific to the core logic of your application
* `README.md` is a form of documentation about the project. It is what you are reading right now.
* `go.mod` contains important metadata, for example, the dependencies in the project. See [here](https://go.dev/ref/mod) for more information
* `go.sum` See [here](https://go.dev/ref/mod) for more information

Try changing some source code and see how the app changes.

## Next Steps

* This project uses [go-chi](https://github.com/go-chi/chi) as a web framework. Feel free to explore other web frameworks such as [gin-gonic](https://github.com/gin-gonic/gin). Compare their pros and cons and use whatever that best justifies the trade-offs.
* Read up more on the [MVC framework](https://developer.mozilla.org/en-US/docs/Glossary/MVC) which this code is designed upon.
* Sometimes, code formatting can get messy and opiniated. Do see how you can incoporate [linters](https://github.com/golangci/golangci-lint) to format your code.
