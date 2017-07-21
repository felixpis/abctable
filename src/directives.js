(function () {
    'use strict';

    angular
        .module('abcTable')
        .directive('focusMe', focusMe)
        .directive('abcLinkImagePreview', linkImagePreview);

    focusMe.$inject = ['$timeout', '$parse'];
    function focusMe($timeout, $parse) {
        return {
            //scope: true,   // optionally create a child scope
            link: function (scope, element, attrs) {
                var model = $parse(attrs.focusMe);
                scope.$watch(model, function (value) {
                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();
                            if (element[0].select) {
                                element[0].select();
                            }
                        });
                    }
                });
                // // to address @blesh's comment, set attribute value to 'false'
                // // on blur event:
                // element.bind('blur', function () {
                //     scope.$apply(model.assign(scope, false));
                // });
            }
        };
    }

    function linkImagePreview() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var imgPreview;
                element.bind('mouseover', function () {
                    imgPreview = angular.element('<div>').addClass('abc-link-img-preview');
                    var image = angular.element('<img>');
                    imgPreview.append(image);
                    document.body.appendChild(imgPreview[0]);
                    var url = element.attr('href');
                    image.attr('src', url);
                });

                element.bind('mousemove', function (e) {
                    imgPreview[0].style.left = (e.pageX + 10) + 'px';
                    imgPreview[0].style.top = (e.pageY + 10) + 'px';
                })

                element.bind('mouseout', function () {
                    document.body.removeChild(imgPreview[0]);
                });
            }
        }
    }

})();