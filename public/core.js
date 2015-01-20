var supperclub = angular.module('supperclub', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all meals and show them
    $http.get('/api/meals')
        .success(function(data) {
            $scope.meals = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createMeal = function() {
        $http.post('/api/meals', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.meals = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteMeal = function(id) {
        $http.delete('/api/meals/' + id)
            .success(function(data) {
                $scope.meals = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });        
    };
    $scope.voteUp = function(meal){
        $http.post('/api/meals/votes/' + meal._id)  
            .success(function(data) {
                meal.votes = data.votes;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    $scope.voteDown = function(meal){
        $http.post('/api/meals/votes/down/' + meal._id)  
            .success(function(data) {
                meal.votes = data.votes;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

}







