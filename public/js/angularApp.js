var app = angular.module('app', ['ui.router']);


//controllers ---------------------------------------

app.controller('MainCtrl', function($scope, posts){

  $scope.posts =[
    {title: 'post 1', upvotes: 5},
    {title: 'post 2', upvotes: 10},
    {title: 'post 3', upvotes: 7},
    {title: 'post 4', upvotes: 3}
  ];


  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
    {author: 'Joe', body: 'Cool post!', upvotes: 0},
    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
  ]
    });
    $scope.title = '';
    $scope.link = '';
  };

$scope.incrementUpvotes = function(post){
  post.upvotes += 1;
};

$scope.posts = posts.posts;

});







app.controller('PostsCtrl', function($scope, $stateParams, posts){
  $scope.post = posts.posts[$stateParams.id];

  $scope.addComment = function(){
  if($scope.body === '') { return; }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    upvotes: 0
  });
  $scope.body = '';
};

});



//services and factories--------------------------------------------

app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);




//routes------------------------------------------------

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home',{
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
    })

    .state('posts', {
  url: '/posts/{id}',
  templateUrl: '/posts.html',
  controller: 'PostsCtrl'
});

    $urlRouterProvider.otherwise('home');
});
