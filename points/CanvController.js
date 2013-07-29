(function() {
  var app = angular.module("canvApp", []);


  app.controller('CanvasController', ["$scope",function ($scope) {
      var canvas = document.getElementById ("canvas");
      var context = canvas.getContext('2d');

      canvas.width = 500;
      canvas.height = 500;
      context.globalAlpha = 0.8;
      context.beginPath();

      $scope.points = [];

      draw($scope.points);

      $scope.addPoint = function() {
        var id = 0;
        if ($scope.points.length > 0) {
          var pos = $scope.points.length - 1;
          id = $scope.points[pos].id + 1;
        }
        var p = { id: id, x: $scope.x, y: $scope.y, radius:$scope.radius};

        $scope.points.push(p);

        $scope.x = $scope.y = $scope.radius = '';

        draw($scope.points);
      };

      $scope.removePoint = function(point) {
        for (var i=0; i < $scope.points.length; i++) {
          $scope.points.splice (i,1);
        }
        context.clearRect(0,0,canvas.width,canvas.height);
        draw($scope.points);
      }

      function draw(points) {
        for (var i=0; i < points.length; i++) {
          drawDot(points[i]);
          if (i > 0) {
            drawLines(points[i], points);
          }
        }
      }

      function drawDot(point) {
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, 2*Math.PI, false);
        context.fillStyle = "#00ff00";
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = "#101010";
        context.stroke();
      }

      function drawLines (a, points) {
        context.beginPath();
        for (var i = 0; i < points.length; i++) {
          context.moveTo(a.x, a.y);
          context.lineTo(points[i].x, points[i].y);
        }
        context.strokeStyle = "#000f0f";
        context.stroke();
      }
  }]);
})();
