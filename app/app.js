angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("index-async.html","<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <link rel=\"stylesheet\" href=\"bower_components/html5-boilerplate/css/normalize.css\">\n  <link rel=\"stylesheet\" href=\"bower_components/html5-boilerplate/css/main.css\">\n  <style>\n    [ng-cloak] {\n      display: none;\n    }\n  </style>\n  <script src=\"bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js\"></script>\n  <script>\n    // include angular loader, which allows the files to load in any order\n    //@@NG_LOADER_START@@\n    // You need to run `npm run update-index-async` to inject the angular async code here\n    //@@NG_LOADER_END@@\n\n    // include a third-party async loader library\n    /*!\n     * $script.js v1.3\n     * https://github.com/ded/script.js\n     * Copyright: @ded & @fat - Dustin Diaz, Jacob Thornton 2011\n     * Follow our software http://twitter.com/dedfat\n     * License: MIT\n     */\n    !function(a,b,c){function t(a,c){var e=b.createElement(\"script\"),f=j;e.onload=e.onerror=e[o]=function(){e[m]&&!/^c|loade/.test(e[m])||f||(e.onload=e[o]=null,f=1,c())},e.async=1,e.src=a,d.insertBefore(e,d.firstChild)}function q(a,b){p(a,function(a){return!b(a)})}var d=b.getElementsByTagName(\"head\")[0],e={},f={},g={},h={},i=\"string\",j=!1,k=\"push\",l=\"DOMContentLoaded\",m=\"readyState\",n=\"addEventListener\",o=\"onreadystatechange\",p=function(a,b){for(var c=0,d=a.length;c<d;++c)if(!b(a[c]))return j;return 1};!b[m]&&b[n]&&(b[n](l,function r(){b.removeEventListener(l,r,j),b[m]=\"complete\"},j),b[m]=\"loading\");var s=function(a,b,d){function o(){if(!--m){e[l]=1,j&&j();for(var a in g)p(a.split(\"|\"),n)&&!q(g[a],n)&&(g[a]=[])}}function n(a){return a.call?a():e[a]}a=a[k]?a:[a];var i=b&&b.call,j=i?b:d,l=i?a.join(\"\"):b,m=a.length;c(function(){q(a,function(a){h[a]?(l&&(f[l]=1),o()):(h[a]=1,l&&(f[l]=1),t(s.path?s.path+a+\".js\":a,o))})},0);return s};s.get=t,s.ready=function(a,b,c){a=a[k]?a:[a];var d=[];!q(a,function(a){e[a]||d[k](a)})&&p(a,function(a){return e[a]})?b():!function(a){g[a]=g[a]||[],g[a][k](b),c&&c(d)}(a.join(\"|\"));return s};var u=a.$script;s.noConflict=function(){a.$script=u;return this},typeof module!=\"undefined\"&&module.exports?module.exports=s:a.$script=s}(this,document,setTimeout)\n\n    // load all of the dependencies asynchronously.\n    $script([\n      \'bower_components/angular/angular.js\',\n      \'bower_components/angular-route/angular-route.js\',\n      \'app.js\',\n      \'view1/view1.js\',\n      \'view2/view2.js\',\n      \'components/version/version.js\',\n      \'components/version/version-directive.js\',\n      \'components/version/interpolate-filter.js\'\n    ], function() {\n      // when all is done, execute bootstrap angular application\n      angular.bootstrap(document, [\'myApp\']);\n    });\n  </script>\n  <title>My AngularJS App</title>\n  <link rel=\"stylesheet\" href=\"app.css\">\n</head>\n<body ng-cloak>\n  <ul class=\"menu\">\n    <li><a href=\"#/view1\">view1</a></li>\n    <li><a href=\"#/view2\">view2</a></li>\n  </ul>\n\n  <div ng-view></div>\n\n  <div>Angular seed app: v<span app-version></span></div>\n\n</body>\n</html>\n");
$templateCache.put("components/view1/view1.html","<p>This is the partial for view 1.</p>\n");
$templateCache.put("components/view2/view2.html","<p>This is the partial for view 2.</p>\n<p>\n  Showing of \'interpolate\' filter:\n  {{ \'Current version is v%VERSION%.\' | interpolate }}\n</p>\n");
$templateCache.put("components/login/login.html","<h1>Logga in</h1>\n<form ng-submit=\"login()\">\n  <div class=\"form-group\">\n    <input type=\"text\" ng-model=\"user.email\" placeholder=\"Användarnamn\" />\n  </div>\n  <div class=\"form-group\">\n    <input type=\"password\" ng-model=\"user.password\" placeholder=\"Lösenord\" />\n  </div>\n  <button type=\"submit\" class=\"btn btn-default\">Logga in</button>\n\n</form>");
$templateCache.put("components/members/detail/members.detail.html","<a class=\"btn btn-default pull-right\" ui-sref=\"members.edit({id: member.id})\">Redigera</a>\n<h1>{{member.first_name}} {{member.last_name}}</h1>\n\n<h2>Inbetalningar</h2>\n<table class=\"table table-bordered table-hover table-condensed\">\n  <tr>\n    <th>Id</th>\n    <th>Datum</th>\n    <th>Summa</th>\n    <th>Betalningsmetod</th>\n    <th>Registrerad av</th>\n    <th>Ändra</th>\n  </tr>\n  <tr ng-repeat=\"payment in member.payments\">\n    <td>{{payment.id}}</td>\n    <td>\n      <span editable-date=\"payment.payment_date\" e-name=\"payment_date\" e-form=\"rowform\" e-required>\n        {{ payment.payment_date }}\n      </span>\n    </td>\n    <td>\n      <span editable-number=\"payment.amount\" e-name=\"amount\" e-form=\"rowform\" e-required>\n        {{payment.amount}}\n      </span>\n    </td>\n    <td>\n        <span editable-select=\"payment.payment_method_id\" e-name=\"payment_method_id\" onshow=\"loadPaymentMethods()\" e-form=\"rowform\" e-ng-options=\"p.id as p.name for p in paymentMethods\">\n          {{payment.payment_method.name}}\n        </span>\n    </td>\n    <td>\n      <a ui-sref=\"members.detail({id: payment.created_by.id})\">{{payment.created_by.first_name}} {{payment.created_by.last_name}}</a>\n    </td>\n    <td>\n      <form editable-form name=\"rowform\" onbeforesave=\"savePayment($data, member.id)\" ng-show=\"rowform.$visible\" class=\"form-buttons form-inline\" shown=\"insertedPayment == payment\">\n        <button type=\"submit\" ng-disabled=\"rowform.$waiting\" class=\"btn btn-primary\">\n          save\n        </button>\n        <button type=\"button\" ng-disabled=\"rowform.$waiting\" ng-click=\"rowform.$cancel()\" class=\"btn btn-default\">\n          cancel\n        </button>\n      </form>\n      <div class=\"buttons\" ng-show=\"!rowform.$visible\">\n        <button class=\"btn btn-primary\" ng-click=\"rowform.$show()\">edit</button>\n        <button class=\"btn btn-danger\" ng-click=\"removeMember($index)\">del</button>\n      </div> \n    </td>\n  </tr>\n</table>\n<p><a class=\"btn btn-success\" ng-click=\"sendPaymentReminder()\">Påminn medlem om betalning</a></p>\n<p><a class=\"btn btn-success\" ng-click=\"addPayment()\">Lägg till betalning</a></p>");
$templateCache.put("components/members/edit/members.edit.html","<form class=\"form-horizontal\">\n  <div class=\"form-group\">\n    <label>Id</label>\n    <input type=\"number\" class=\"form-control\" placeholder=\"Id\" ng-model=\"member.id\" readonly>\n    <label>Personnummer</label>\n    <input class=\"form-control\" placeholder=\"YYYYMMDDXXXX\" ng-model=\"member.personal_number\">\n    <label>Förnamn</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Förnamn\" ng-model=\"member.first_name\">\n    <label>Efternamn</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Efternamn\" ng-model=\"member.last_name\">\n    <label>Kön</label>\n    <select ng-model=\"member.gender_id\">\n      <option ng-repeat=\"g in genders\" value=\"{{g.id}}\" ng-selected=\"member.gender_id == g.id\">{{g.name}}</option>\n    </select>\n    <label>Land</label>\n    <select ng-model=\"member.country_id\">\n      <option ng-repeat=\"c in countries\" value=\"{{c.id}}\" ng-selected=\"member.country_id == c.id\">{{c.name}}</option>\n    </select>\n    <div ng-if=\"countries\">\n      <label>Adress</label>\n      <input type=\"text\" class=\"form-control\" placeholder=\"Adress\" ng-model=\"member.street_address\">\n      <label>Postnummer</label>\n      <input type=\"text\" class=\"form-control\" placeholder=\"Postnummer\" ng-model=\"member.postcode\" ng-blur=\"checkZipcodes()\">\n      <label>Stad</label>\n      <input type=\"text\" class=\"form-control\" placeholder=\"Stad\" ng-model=\"member.city\">\n    </div>\n    <label>Telefonnummer</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Telefon\" ng-model=\"member.phone\">\n    <label>E-post</label>\n    <input type=\"email\" class=\"form-control\" placeholder=\"E-post\" ng-model=\"member.email\">\n    <label>AIK-Forum</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"AIK-Forum\" ng-model=\"member.aik_forum_id\" strip-media-url=\"aikforum\">\n    <label>Facebook</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Facebook\" ng-model=\"member.facebook_id\" strip-media-url=\"facebook\">\n    <label>Twitter</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Twitter\" ng-model=\"member.twitter_id\" strip-media-url=\"twitter\">\n    <label>Medlem sedan</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Medlem sedan\" ng-model=\"member.member_since\">\n    <label>Senaste betalning</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Senaste betalning\" ng-model=\"member.paiddate\">\n    <label>Medlemskap utgår</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Medlemskap utgår\" ng-model=\"member.expiredate\">\n    <!--\n    <label>Betalningsmetod</label>\n    <select ng-model=\"member.paymentMethods\" ng-options=\"p.name for p in paymentMethods\"></select>\n    <label>Admin-nivå</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Admin-nivå\" ng-model=\"member.adminlevel_id\">\n    -->\n    <label>Kommentar</label>\n    <input type=\"text\" class=\"form-control\" placeholder=\"Kommentar\" ng-model=\"member.comment\">\n  </div>\n\n  <button type=\"submit\" class=\"btn btn-default\" ng-click=\"submit()\">Skicka</button>\n</form>");
$templateCache.put("components/members/import/members.import.html","<div \n  ngf-drop \n  ngf-select \n  ng-model=\"file\" \n  class=\"drop-box\" \n  ngf-drag-over-class=\"\'dragover\'\" \n  ngf-multiple=\"false\" \n  ngf-allow-dir=\"true\"\n  accept=\"application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\" \n  style=\"width: 400px; height: 200px; border: 10px dashed black; text-align: center; padding-top: 40px;\">\n    Släpp Excel-filen här för att ladda upp\n</div>\n<p>{{log}}</p>\n    <div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div>\n    Files:\n    <ul>\n        <li ng-repeat=\"f in files\" style=\"font:smaller\">{{f.name}} {{f.$error}} {{f.$errorParam}}</li>\n    </ul>");
$templateCache.put("/components/members/list/members.list.html","<a ui-sref=\"members.add\" class=\"btn btn-success pull-right\">Lägg till användare</a>\n<form ng-submit=\"search()\" class=\"form-inline\">\n  <input type=\"text\" class=\"form-control\" placeholder=\"Sök\" ng-model=\"filterQuery\" />\n  <select \n    ng-model=\"filterType\" ng-options=\"option.name for option in filterOptions\" class=\"form-control\" ng-change=\"resetLocation(\'{{filterType.value}}\')\">\n  </select>\n  <input type=\"submit\" class=\"form-control btn btn-default\" value=\"Sök\" />\n</form>\n\n\n<table class=\"table table-striped\">\n  <thead>\n    <tr>\n      <td><a ui-sref=\"members.list({sort: sortById})\">Id</a></td>\n      <td><a ui-sref=\"members.list({sort: sortByPersonal_number})\">Personnummer</a></td>\n      <td>Namn</td>\n      <td>E-post</td>\n      <td>Telefonnummer</td>\n      <td>Facebook</td>\n      <td>Twitter</td>\n      <td>AIK-Forum</td>\n      <td>Medlem sedan</td>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat=\"member in members\" ng-click=\"goToMember(member.id)\">\n      <td ng-bind=\"member.id\" sortable=\"id\" filter=\"{\'id\': \'text\'}\"></td>\n      <td ng-bind=\"member.personal_number\" sortable=\"personal_number\"></td>\n      <td>{{member.first_name}} {{member.last_name}}</td>\n      <td ng-bind=\"member.email\"></td>\n      <td ng-bind=\"member.phone\"></td>\n      <td ng-bind=\"member.facebook_id\"></td>\n      <td ng-bind=\"member.twitter_id\"></td>\n      <td ng-bind=\"member.aik_forum_id\"></td>\n      <td ng-bind=\"member.member_since\"></td>\n      <td>\n        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\" ng-click=\"goToMemberEdit(member.id)\">\n          Redigera\n        </button>\n      </td>\n    </tr>\n  </tbody>\n</table>");
$templateCache.put("components/members/payment/members.payment.html","<h1>{{member.first_name}} {{member.last_name}}</h1>\n\n<ui-view />");
$templateCache.put("components/pay/parseToken/pay.parseToken.html","asd");
$templateCache.put("components/members/payment/step2/members.payment.step2.html","Betala!\n\n<div ng-bind-html=\"iframe\" evaluate-script></div>");
$templateCache.put("components/members/payment/step1/members.payment.step1.html","<ul>\n  <li ng-repeat=\"method in paymentMethods\"><a ui-sref=\"members.addPayment.step2({payment_method_id: method.id})\">{{method.name}}</a></li>\n</ul>");
$templateCache.put("components/members/payment/step3/members.payment.step3.html","");}]);

'use strict';

var askCrm = angular.module('askCrm', [
  'ui.router',
  'askCrm.pay',
  'askCrm.members',
  'askCrm.api',
  'askCrm.login',
  'xeditable',
  'checklist-model',
  'ngCookies',
  'ngFileUpload'
])

// The templates module is only used in /dist
var lazyModules = ['templates'];
angular.forEach(lazyModules, function(dependency) {
  var m;
  try {
    m = angular.module(dependency);
  } catch (e) {}

  if (m) {
    askCrm.requires.push(dependency);
  }
});

askCrm.constant('APIURI', appConfig.apiUri)

.config(['$urlRouterProvider', '$locationProvider', function($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/login');

  $locationProvider.html5Mode(false);
}])

.filter('currentdate',['$filter',  function($filter) {
    return function() {
        return $filter('date')(new Date(), 'yyyy-MM-dd');
    };
}])

.factory('principal', ['$q', '$http', '$timeout', '$cookies', 'Api',
  function($q, $http, $timeout, $cookies, Api) {
    var _identity = undefined,
      _authenticated = false;

    return {
      isIdentityResolved: function() {
        return angular.isDefined(_identity);
      },
      isAuthenticated: function() {
        return _authenticated;
      },
      isInRole: function(role) {
        if (!_authenticated || !_identity.roles) return false;

        for (var i=0;i<_identity.roles.length;i++) {
          if( _identity.roles[i].name === role ) {
            return true;
          }
        }

        return false;
        return _identity.roles.indexOf(role) != -1;
      },
      isInAnyRole: function(roles) {
        if (!_authenticated || !_identity.roles) return false;

        for (var i = 0; i < roles.length; i++) {
          if (this.isInRole(roles[i])) return true;
        }

        return false;
      },
      authenticate: function(identity) {
        _identity = identity;
        _authenticated = identity != null;
      },
      unsetIdentity: function() {
        _identity = undefined;
        _authenticated = false;
      },
      identity: function(force) {
        var deferred = $q.defer();

        if (force === true) _identity = undefined;

        // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
        if (angular.isDefined(_identity)) {
          deferred.resolve(_identity);

          return deferred.promise;
        }

        Api.Users().get({id: $cookies.user_id}, function(data) {
            _identity = data;
            _authenticated = true;
            deferred.resolve(_identity);
        }, function(data){
            _identity = undefined;
            _authenticated = false;
            deferred.reject(data);
        });

        // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
        //                   $http.get('/svc/account/identity', { ignoreErrors: true })
        //                        .success(function(data) {
        //                            _identity = data;
        //                            _authenticated = true;
        //                            deferred.resolve(_identity);
        //                        })
        //                        .error(function () {
        //                            _identity = null;
        //                            _authenticated = false;
        //                            deferred.resolve(_identity);
        //                        });

        return deferred.promise;
      }
    };
  }
])

.factory('authorization', ['$rootScope', '$state', '$q', '$http', '$cookies', 'principal', 'APIURI',
  function($rootScope, $state, $q, $http, $cookies, principal, APIURI) {
    return {
      authorize: function() {
        return principal.identity()
          .then(function(data) {
            var isAuthenticated = principal.isAuthenticated();
            // Check if the state needs a role auth and if the user don't have it
            if ($rootScope.toState && $rootScope.toState.data && $rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
              if (isAuthenticated) $state.go('login'); // user is signed in but not authorized for desired state
              else {
                // user is not authenticated. stow the state they wanted before you
                // send them to the signin state, so you can return them when you're done
                $rootScope.returnToState = $rootScope.toState;
                $rootScope.returnToStateParams = $rootScope.toStateParams;

                // now, send them to the signin state so they can log in
                $state.go('login');
              }
            }
          }, function(reason){
              // If we couldn't get the user data
              $state.go('login');
          });
      },
      setTokenAndUser: function(token, user) {
        $cookies.token = token;
        $cookies.user_id = user.id;
        return;
      },
      login: function(_user) {
          var deferred = $q.defer();

          $http
            .post(APIURI + '/authentication', _user)
            .success(function (data, status, headers, config) {
                $cookies.token = data.token;
                $cookies.user_id = data.user.id;
                deferred.resolve(true);
            })
            .error(function (data, status, headers, config) {
                delete $cookies.token;
                deferred.reject(data);
            })

          return deferred.promise;
      },
      logout: function() {
          delete $cookies.token;
          principal.unsetIdentity();
      }
    };
  }
])

