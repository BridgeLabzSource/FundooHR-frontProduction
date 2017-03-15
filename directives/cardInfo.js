angular.module('mainApp').directive('cardInfo', function() {
    /* return data */
    return {
        restrict: 'EA',
        scope: {
            data: '='
        },
        /* directive redirect to the html file*/
        templateUrl: 'templates/cardInfo.html',
    }
});