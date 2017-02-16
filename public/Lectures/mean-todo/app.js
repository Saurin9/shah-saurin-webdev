console.log("Hello");          // Prints the argument, here the angular object to the console (in 'Inspect element' of page)
angular
    .module("TodoApp", [])   // If there are dependencies for this module, list them as an array in brackets []
    .controller("TodoController", TodoController) //means 'TodoController is implemented in a function named 'TodoController';
                                                    // need not be the same names

function TodoController($scope) {         // Constructor of 'TodoController'
    console.log('Hello from Todo Controller')
    // $scope.hello = "hello world"       // Variable 'hello' declared here is accessible in the controller
                                          // too using {{hello}}. Variables declared in Model or View are
                                          // accessible in both placed
    $scope.todos=[
        {'title': 'Todo 1', 'note': 'Note 1'},
        {'title': 'Todo 2', 'note': 'Note 2'},
        {'title': 'Todo 3', 'note': 'Note 3'},
        {'title': 'Todo 4', 'note': 'Note 4'},
        {'title': 'Todo 5', 'note': 'Note 5'},
        {'title': 'Todo 6', 'note': 'Note 6'},
    ];
}