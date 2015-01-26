var explore = angular.module('explore', []);

explore.controller('exploreController', ['$scope', function($scope) {


    $scope.data = ''; //input from user
    

    // $scope.getRecipeJsonFetch = function() {
    //   console.log("im getting called")
    //   var apiKey = "dvx6S3S7EBxvE71L3JpvyWeo4wYh5T3Y";
    //   var recipeID = 196149;
    //   var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;
    //   $.ajax({
    //     type: "GET",
    //     dataType: 'json',
    //     cache: false,
    //     url: url,
    //     success: function (data) {
    //       alert('success');
    //       // $scope.data = data.Results;
    //       // console.log(data);
    //     }
    //   });
    // }

    $scope.getRecipeJsonSearch = function(search){
      var apiKey = "dvx6S3S7EBxvE71L3JpvyWeo4wYh5T3Y";
      var titleKeyword = search;
      console.log("TitleKeyword", titleKeyword)
      var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
                + titleKeyword 
                + "&api_key="+apiKey;
      $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: url,
        success: function (data) {
            alert('success');
            $scope.apiData = [];
            $scope.apiData.title = data.Results;
            $scope.apiData = data.Results;
            console.log($scope.apiData);
            var arr = [];

            //iterate through apiData
                //create a ul tag 
            //for each property in current element 
                //create an li tag with class = name of key in obj in array
            //append each li to the parent ul, 
        //append parent ul to body/$el
            var newdiv = document.createElement('div');
          
            for(var i = 0; i < $scope.apiData.length; i++){
                var newul = document.createElement('ul');
                for(var key in $scope.apiData[i]){
                    if(key === 'ImageURL' || key === 'ReviewCount' || key === 'StarRating' || key === 'Title' || key === 'Cuisine' || key === 'WebURL' || key === 'YieldNumber' || key === 'Category'){
                        //add if else here to make image url and weburl turn into pics and links respectivly
                        if(key === 'ImageURL'){
                            var newimg = document.createElement('img');
                            var src = $scope.apiData[i][key];   
                            $(newimg).attr("src",src);

                            var newli = document.createElement('li');
                            newli.appendChild(newimg)
                            // var text = document.createTextNode(key + ": " + $scope.apiData[i][key])
                            // newli.appendChild(text)
                            // newli.text = $scope.apiData[i][key]
                            newli.className = key;
                            newul.appendChild(newli); 
                        }else{
                            var newli = document.createElement('li');
                            var text = document.createTextNode(key + ": " + $scope.apiData[i][key])
                            newli.appendChild(text)
                            // newli.text = $scope.apiData[i][key]
                            newli.className = key;
                            newul.appendChild(newli); 
                            // console.log(newul)
                            
                        }
                    }   
                }
                newul.className = "ul-class" // + i
                newdiv.appendChild(newul);
            }
            var currentDiv = document.getElementById("explore-list");
            document.body.insertBefore(newdiv, currentDiv); 
            //append ul to body document.createElement(arr)

              // arr.push(" " + $scope.apiData[i].Title + " ");
              
            // }

        // }
        }
      });
    }
}]);




