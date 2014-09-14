app.controller('Movies', function Movies($scope, $http) {

  $scope.authorList = [];
  $scope.query = "";
  $scope.include_adult = false;
  $scope.page = 0;
  $scope.total_pages = 0;
  $scope.total_results = 0;
  $scope.paginator = [];
  $scope.movieListAll = [];
  $scope.currentPerson = null;
  $scope.configuration = {};
  $scope.movieGroup = 'cast';

  var API = {
    "KEY": "be3d23840948a1d2124852356aefd638",
    "URL" : "http://api.themoviedb.org/3/"
  };
  
  $scope.get_configuration = function(){
    $http.get(API['URL'] + 'configuration'
      + '?api_key=' + API['KEY'])
    .success(function(data, status) {
      $scope.configuration = data;
    }).error(function(data, status) {
      console.log(data || "Request failed", status);
    });
  };

  $scope.get_author_list = function() {
    $http.get(API['URL'] + 'search/person'
      + '?api_key=' + API['KEY']
      + '&query=' + $scope.query 
      + '&include_adult=' + $scope.include_adult)
    .success(function(data, status) {
      $scope.authorList = data.results;
      /*$scope.authorList = sampleResponse.results;
      $scope.page = sampleResponse.page;
      $scope.total_pages = sampleResponse.total_pages;
      $scope.total_results = sampleResponse.total_results;
      $scope.paginator = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];*/
      
      if($scope.authorList.length){
        $scope.currentPerson =  $scope.authorList[0];
        if($scope.currentPerson.id){
          $scope.get_movie_list($scope.currentPerson.id);
        }
      }
    }).error(function(data, status) {
      console.log(data || "Request failed", status);
    });
  };
  
  $scope.select_author = function(person){
    $scope.currentPerson = person;
    $scope.get_movie_list(person.id);
  };
  
  $scope.get_movie_list = function(person_id) {
    $http.get(API['URL'] + 'person/' + person_id + '/movie_credits'
      + '?api_key=' + API['KEY']
      + '&query=' + $scope.query
      + '&include_adult=' + $scope.include_adult)
    .success(function(data, status) {
      $scope.movieListAll = data;
      $scope.switch_movie_group($scope.movieGroup);
    }).error(function(data, status) {
      console.log(data || "Request failed", status);
    });
  };

  $scope.switch_movie_group= function(key) {
    $scope.movieGroup = key;
    $scope.movieList = $scope.movieListAll[key];
  };
  
  $scope.get_configuration();

});
