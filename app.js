(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ngModule;

ngModule = angular.module('app', [require('./section1/sectionSpecificCode.coffee'), require('./navHide.coffee'), require('./contentMenu.coffee'), require('./chart.coffee')]);


},{"./chart.coffee":2,"./contentMenu.coffee":3,"./navHide.coffee":4,"./section1/sectionSpecificCode.coffee":5}],2:[function(require,module,exports){
var ngModule;

module.exports = (ngModule = angular.module('chart', [])).name;

ngModule.directive('chartDirective', [
  (function() {
    return {
      restrict: 'A',
      link: (function($scope, element, attrs) {
        var data, i, j;
        data = [];
        for (i = j = 0; j <= 10; i = ++j) {
          data.push([moment().add(i, 'd').valueOf(), i]);
        }
        $(element).highcharts({
          chart: {
            type: "column"
          },
          title: {
            text: "Всего платежей"
          },
          legend: {
            enabled: false
          },
          xAxis: {
            type: 'datetime',
            labels: {
              format: '{value:%d.%m.%y}'
            }
          },
          yAxis: {
            title: {
              text: 'Сумма'
            }
          },
          series: [
            {
              name: "Платежи",
              data: data
            }
          ]
        });
      })
    };
  })
]);


},{}],3:[function(require,module,exports){
var ngModule;

module.exports = (ngModule = angular.module('contentMenu', [])).name;

ngModule.directive('contentMenuDirective', [
  '$document', '$window', (function($document, $window) {
    return {
      restrict: 'A',
      link: (function($scope, element, attrs) {
        var headerHeight;
        headerHeight = $('header').innerHeight();
        angular.element($window).bind("scroll", function() {
          if ($window.pageYOffset > headerHeight) {
            return element.addClass('fixed');
          } else {
            return element.removeClass('fixed');
          }
        });
      })
    };
  })
]);


},{}],4:[function(require,module,exports){
var ngModule;

module.exports = (ngModule = angular.module('navHideAnimation', [])).name;

ngModule.directive('headerDirective', [
  '$document', '$window', (function($document, $window) {
    return {
      restrict: 'A',
      link: (function($scope, element, attrs) {
        var dHeight, elHeight, elTop, wHeight, wScrollBefore, wScrollCurrent, wScrollDiff;
        elHeight = 0;
        elTop = 0;
        dHeight = 0;
        wHeight = 0;
        wScrollCurrent = 0;
        wScrollBefore = 0;
        wScrollDiff = 0;
        angular.element($window).bind("scroll", function() {
          elHeight = element.outerHeight();
          dHeight = $document.height();
          wHeight = $window.height;
          wScrollCurrent = $window.pageYOffset;
          wScrollDiff = wScrollBefore - wScrollCurrent;
          elTop = parseInt(element.css("top")) + wScrollDiff;
          if (wScrollCurrent <= 0) {
            element.css("top", 0);
          } else if (wScrollDiff > 0) {
            element.css("top", (elTop > 0 ? 0 : elTop));
          } else if (wScrollDiff < 0) {
            if (wScrollCurrent + wHeight >= dHeight - elHeight) {
              element.css("top", ((elTop = wScrollCurrent + wHeight - dHeight) < 0 ? elTop : 0));
            } else {
              element.css("top", (Math.abs(elTop) > elHeight ? -elHeight : elTop));
            }
          }
          wScrollBefore = wScrollCurrent;
        });
      })
    };
  })
]);


},{}],5:[function(require,module,exports){
var ngModule;

module.exports = (ngModule = angular.module('section1/sectionSpecificCode', [])).name;


},{}]},{},[1]);
