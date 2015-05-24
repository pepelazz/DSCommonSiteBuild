(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/javascript/app.coffee":[function(require,module,exports){
require('./ng-app');

require('./util');

require('./drag-and-drop/ng-drag-and-drop');



},{"./drag-and-drop/ng-drag-and-drop":"/Users/Trikster/static_sites/DSCommonSite/_DSCommonSite/src/javascript/drag-and-drop/ng-drag-and-drop.coffee","./ng-app":"/Users/Trikster/static_sites/DSCommonSite/_DSCommonSite/src/javascript/ng-app.coffee","./util":"/Users/Trikster/static_sites/DSCommonSite/_DSCommonSite/src/javascript/util.coffee"}],"/Users/Trikster/static_sites/DSCommonSite/_DSCommonSite/src/javascript/drag-and-drop/check-cursor-on-element.coffee":[function(require,module,exports){
var overlaps;

overlaps = (function() {
  var compareX, compareY, getPositions;
  getPositions = function(elem) {
    var height, pos, width;
    pos = $(elem).offset();
    width = $(elem).width();
    height = $(elem).height();
    return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
  };
  compareX = function(x, elPos) {
    if (x < elPos[0][0] || x > elPos[0][1]) {
      return false;
    } else {
      return true;
    }
  };
  compareY = function(y, elPos) {
    if (y < elPos[1][0] || y > elPos[1][1]) {
      return false;
    } else {
      return true;
    }
  };
  return function(coord, el) {
    var elPos;
    elPos = getPositions(el);
    return compareX(coord[0], elPos) && compareY(coord[1], elPos);
  };
})();

module.exports = overlaps;



},{}],"/Users/Trikster/static_sites/DSCommonSite/_DSCommonSite/src/javascript/drag-and-drop/ng-drag-and-drop.coffee":[function(require,module,exports){
var module, overlaps;

overlaps = require('./overlaps');

module = angular.module('dragAndDrop', []);

module.directive('draggableItem', [
  '$rootScope', '$timeout', (function($rootScope, $timeout) {
    return {
      restrict: 'A',
      link: (function($scope, element, attrs) {
        $(element).on('mousedown', function(e) {
          var cloneEl, deltaCoord, moveAt;
          e.preventDefault();
          $(element).addClass('drag-taken-element');
          cloneEl = $('<div></div>').appendTo('body').html($(this).html()).css({
            height: $(this).innerHeight()
          }).css({
            width: $(this).innerWidth()
          }).addClass('drag-element').css({
            top: $(this).position().top
          }).css({
            left: $(this).position().left
          });
          deltaCoord = [e.pageX - $(this).offset().left, e.pageY - $(this).offset().top];
          moveAt = (function(e) {
            var x, y;
            x = e.pageX - deltaCoord[0] + 'px';
            y = e.pageY - deltaCoord[1] + 'px';
            $(cloneEl).css({
              top: 'auto'
            }).css({
              left: 'auto'
            }).css('-webkit-transform', 'translate(' + x + ',' + y + ')');
            if (overlaps($(cloneEl), $('.drop-zone'))) {
              $(cloneEl).addClass('drag-element-in-drop-zone');
            } else {
              $(cloneEl).removeClass('drag-element-in-drop-zone');
            }
          });
          $(document).on('mousemove', (function(e) {
            moveAt(e);
          }));
          $(document).on('mouseup', (function(e) {
            var obj;
            $(cloneEl).remove();
            $(document).off('mousemove');
            $(document).off('mouseup');
            $(element).removeClass('drag-taken-element');
            obj = $scope.$eval(attrs.draggableItem);
            obj.coord = [e.pageX, e.pageY];
            $rootScope.arrayChange(obj);
          }));
          return moveAt(e);
        });
      })
    };
  })
]);



},{"./overlaps":"/Users/Trikster/static_sites/DSCommonSite/_DSCommonSite/src/javascript/drag-and-drop/overlaps.coffee"}],"/Users/Trikster/static_sites/DSCommonSite/_DSCommonSite/src/javascript/drag-and-drop/overlaps.coffee":[function(require,module,exports){
var overlaps;

overlaps = (function() {
  var comparePositions, getPositions;
  getPositions = function(elem) {
    var height, pos, width;
    pos = $(elem).offset();
    width = $(elem).width();
    height = $(elem).height();
    return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
  };
  comparePositions = function(p1, p2) {
    var r1, r2;
    r1 = (p1[0] < p2[0] ? p1 : p2);
    r2 = (p1[0] < p2[0] ? p2 : p1);
    return r1[1] > r2[0] || r1[0] === r2[0];
  };
  return function(a, b) {
    var pos1, pos2;
    pos1 = getPositions(a);
    pos2 = getPositions(b);
    return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
  };
})();

module.exports = overlaps;



},{}],"/Users/Trikster/static_sites/DSCommonSite/_DSCommonSite/src/javascript/ng-app.coffee":[function(require,module,exports){
var cursorOnElement, module;

cursorOnElement = require('./drag-and-drop/check-cursor-on-element');

module = angular.module('app', ['dragAndDrop', 'uiSlider']);

module.controller('main', [
  '$rootScope', '$scope', '$http', '$location', '$timeout', '$log', (function($rootScope, $scope, $http, $location, $timeout, $log) {
    var arr1, arr2, i, obj1, obj2, _i;
    arr1 = $scope.arr1 = [];
    arr2 = $scope.arr2 = [];
    for (i = _i = 0; _i <= 10; i = ++_i) {
      obj1 = {
        num: 'arr1-' + i
      };
      obj2 = {
        num: 'arr2-' + i
      };
      arr1.push(obj1);
      arr2.push(obj2);
    }
    $rootScope.arrayChange = (function(obj) {
      $('.drop-zone').each(function(i) {
        if (cursorOnElement(obj.coord, $('.drop-zone')[i])) {
          if (obj.array === 'arr1' && i !== 0) {
            arr2.push(arr1[obj.index]);
            arr1.splice(obj.index, 1);
          }
          if (obj.array === 'arr2' && i !== 1) {
            arr1.push(arr2[obj.index]);
            arr2.splice(obj.index, 1);
          }
          return $timeout(function() {
            return $scope.$apply();
          });
        }
      });
    });
  })
]);



},{"./drag-and-drop/check-cursor-on-element":"/Users/Trikster/static_sites/DSCommonSite/_DSCommonSite/src/javascript/drag-and-drop/check-cursor-on-element.coffee"}],"/Users/Trikster/static_sites/DSCommonSite/_DSCommonSite/src/javascript/util.coffee":[function(require,module,exports){
var fixSize;

$(function() {
  fixSize();
  return $(window).on('resize', (function() {
    fixSize();
  }));
});

fixSize = (function() {});



},{}]},{},["./src/javascript/app.coffee"]);
