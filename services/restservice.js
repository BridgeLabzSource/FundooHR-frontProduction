angular.module('mainApp').service('restService', function ($http, $log, $q, localStorageService) {
    this.baseUrl = "http://192.168.0.40:3000/";
    var self = this;
    var token = localStorageService.get('token').token;
    //    function for GET
    this.getRequest = function (path, query) {

        var deferred = $q.defer();
        $http({
            method: "GET",
            url: self.baseUrl + path,
            params: query,
            headers: {'x-token': token}
            // "url": "employee.json"
        }).then(function (data) {
            //sending data...
            deferred.resolve(data);
        }, function (msg, code) {
            deferred.reject(msg);

            $log.error(msg, code);
        });
        return deferred.promise;
    };
    this.postRequest = function (path, data) {
        var deferred = $q.defer();
        $http({
            method: "post",
            url: self.baseUrl + path,
            data: data,
            headers: {'x-token': token}
        }).then(function (data) {
            //sending data...
            deferred.resolve(data);
        }, function (msg, code) {
            deferred.reject(msg);
            $log.error(msg, code);
        });
        return deferred.promise;
    };

});
