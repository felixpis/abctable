(function(){angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/src/template.html','<div class="abc-table">\r\n    <div class="toolbar" ng-hide="$ctrl.options.hideToolbar">\r\n        <div class="items-count">\r\n            <span>{{$ctrl.filteredData.length}} of </span><span>{{$ctrl.data.length}}</span>\r\n        </div>\r\n        <ul uib-pagination total-items="$ctrl.filteredData.length" ng-model="$ctrl.currentPage" items-per-page="$ctrl.options.pageSize"\r\n            max-size="15"></ul>\r\n    </div>\r\n    <div class="table-responsive">\r\n        <table class="{{$ctrl.options.class}}">\r\n            <tr  ng-hide="$ctrl.options.hideHeader">\r\n                <th ng-repeat="column in $ctrl.columns" ng-if="!column.hidden" ng-init="$ctrl.initColumn(column)" ng-style="column.style">\r\n                    <input type="checkbox" class="checkbox" ng-if="column.type == \'checkbox\'" ng-checked="$ctrl.isAllchecked()" ng-click="$ctrl.checkAll()"></input>\r\n                    <span ng-if="column.type != \'checkbox\'" ng-click="$ctrl.sort(column.field)" class="title" ng-class="{\'title-sorted\': $ctrl.options.sort.field == column.field}">{{column.title}}</span>\r\n                </th>\r\n            </tr>\r\n            <tr ng-if="$ctrl.options.showAggRow">\r\n                <td ng-repeat="column in $ctrl.columns" ng-if="!column.hidden">\r\n                    <div ng-if="column.aggs.enabled" ng-include="$ctrl.getAggsTemplateUrl(column)"></div>\r\n                </td>\r\n            </tr>\r\n            <tr ng-if="$ctrl.options.showFilter">\r\n                <td ng-repeat="column in $ctrl.columns" ng-if="!column.hidden">\r\n                    <div ng-if="column.filter.enabled" ng-include="$ctrl.getFilterTemplateUrl(column)"></div>\r\n                </td>\r\n            </tr>\r\n            <tr ng-repeat="item in ($ctrl.filteredData = ($ctrl.data | abcFilterData:$ctrl.columns:$ctrl.options.externalFilter | orderBy: $ctrl.options.sort.field:$ctrl.options.sort.reverse) | abcSlice:$ctrl.fromItem():$ctrl.toItem()) track by $index"\r\n                ng-class="$ctrl.rowStyle(item)" ng-init="rowIndex = $index; prev = $ctrl.filteredData[rowIndex - 1]; next = $ctrl.filteredData[rowIndex + 1]">\r\n                <td ng-repeat="column in $ctrl.columns"  ng-if="!column.hidden" class="{{$ctrl.getCellClass(column, item)}}" ng-dblclick="$ctrl.showEditMode(item, column)">\r\n                    <ng-include src="$ctrl.getTemplateUrl(column, item)"></ng-include>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</div>');
$templateCache.put('/src/templates/aggs/currency.html','<span ng-if="!column.aggs.values">\r\n    {{column.aggs.value | currency:column.symbol}}\r\n</span>\r\n<span ng-if="column.aggs.values" ng-repeat="value in column.aggs.values track by $index">\r\n    <br ng-if="$index > 0" /> {{value | currency: column.symbol}}\r\n</span>');
$templateCache.put('/src/templates/aggs/number.html','<span ng-if="!column.aggs.values">\r\n    {{column.aggs.value | number}}\r\n</span>\r\n<span ng-if="column.aggs.values" ng-repeat="value in column.aggs.values track by $index">\r\n     <br ng-if="$index > 0" /> {{value | number}}\r\n</span>');
$templateCache.put('/src/templates/cells/checkbox.html','<input type="checkbox" class="checkbox" ng-model="item.checked" ng-click="$ctrl.checkClick(rowIndex, item.checked, $event)"></input>');
$templateCache.put('/src/templates/cells/currency.html','<span>\r\n    {{item[column.field] | currency:column.symbol}}\r\n</span>');
$templateCache.put('/src/templates/cells/date.html','<span>\r\n    {{item[column.field] | date: column.format}}\r\n</span>');
$templateCache.put('/src/templates/cells/index.html','{{rowIndex + 1}}');
$templateCache.put('/src/templates/cells/link.html','<span ng-if="column.showPreview">\r\n    <a ng-if="!!item[column.field]" abc-link-image-preview ng-href="{{item[column.field]}}" target="_blank">{{$ctrl.linkCellText(item, column)}}</a>\r\n</span>\r\n<span ng-if="!column.showPreview">\r\n    <a ng-if="!!item[column.field]" ng-href="{{item[column.field]}}" target="_blank">{{$ctrl.linkCellText(item, column)}}</a>\r\n</span>');
$templateCache.put('/src/templates/cells/number.html','<span>\r\n    {{item[column.field] | number}}\r\n</span>');
$templateCache.put('/src/templates/cells/text.html','<span>\r\n    {{item[column.field]}}\r\n</span>');
$templateCache.put('/src/templates/edit/currency.html','<input class="form-control" type="number" ng-model="item.editValue" ng-keydown="$ctrl.onSpecialKey(item, column, rowIndex, $index, $event)" ng-blur="$ctrl.fieldUpdated(item, column)" style="width: 100%;" focus-me="$ctrl.isEditMode(item, column)">');
$templateCache.put('/src/templates/edit/link.html','<input class="form-control" type="text" ng-model="item.editValue" ng-keydown="$ctrl.onSpecialKey(item, column, rowIndex, $index, $event)" ng-blur="$ctrl.fieldUpdated(item, column)" focus-me="$ctrl.isEditMode(item, column)">');
$templateCache.put('/src/templates/edit/number.html','<input class="form-control" type="number" ng-model="item.editValue" ng-keydown="$ctrl.onSpecialKey(item, column, rowIndex, $index, $event)" ng-blur="$ctrl.fieldUpdated(item, column)" style="width: 100%;" focus-me="$ctrl.isEditMode(item, column)">');
$templateCache.put('/src/templates/edit/select.html','<select class="form-control" ng-model="item.editValue" ng-keydown="$ctrl.onSpecialKey(item, column, rowIndex, $index, $event)" ng-options="field for field in column.editValues" ng-blur="$ctrl.fieldUpdated(item, column)" focus-me="$ctrl.isEditMode(item, column)"></select>\r\n');
$templateCache.put('/src/templates/edit/text.html','<input class="form-control" type="text" ng-model="item.editValue" ng-keydown="$ctrl.onSpecialKey(item, column, rowIndex, $index, $event)" ng-blur="$ctrl.fieldUpdated(item, column)" focus-me="$ctrl.isEditMode(item, column)">');
$templateCache.put('/src/templates/filters/checkbox.html','<label ng-click="$ctrl.filterCheck(column)" style="cursor:pointer;" title="{{column.filter.tooltip}}">\r\n    <i class="fa fa-2x" ng-class="{\'fa-check-square-o\': column.filter.value, \'fa-square-o\': !column.filter.value}"></i>\r\n   {{column.filter.label}}\r\n</label>');
$templateCache.put('/src/templates/filters/select.html','<ui-select ng-if="column.filter.list != null" multiple ng-model="column.filter.values" theme="bootstrap" sortable="true" on-select="$ctrl.filterSelect()" on-remove="$ctrl.filterSelect()">\r\n    <ui-select-match>{{$item}}</ui-select-match>\r\n    <ui-select-choices repeat="item in column.filter.list | filter: $select.search | limitTo: 100">\r\n      <div ng-bind-html="item | highlight: $select.search"></div>\r\n    </ui-select-choices>\r\n  </ui-select>\r\n\r\n  <ui-select ng-if="column.filter.list == null" multiple tagging tagging-label="false" ng-model="column.filter.values" theme="bootstrap" sortable="true" on-select="$ctrl.filterSelect()" on-remove="$ctrl.filterSelect()">\r\n    <ui-select-match>{{$item}}</ui-select-match>\r\n    <ui-select-choices repeat="item in [] | filter: $select.search">\r\n      <div ng-bind-html="item | highlight: $select.search"></div>\r\n    </ui-select-choices>\r\n  </ui-select>');
$templateCache.put('/src/templates/filters/text.html','<input type="text" class="form-control" ng-model="column.filter.value">');}]);})();
(function() {
    'use strict';

    angular.module('abcTable', [
        'ui.select','ui.bootstrap','ngSanitize', 'templates'
    ]);

    
})();

(function() {
'use strict';

    angular
        .module('abcTable')
        .factory('abcTemplatesService', abcTemplatesService);
    
    function abcTemplatesService() {
        
        var templatesPath = '/src/templates/';
        
        var service = {
            getTemplateUrl: getTemplateUrl,
            getFilterTemplateUrl: getFilterTemplateUrl,
            getAggsTemplateUrl: getAggsTemplateUrl
        };
        
        return service;

        ////////////////
        function getTemplateUrl(column, item, isEditMode) {

            if (item.editField && isEditMode) {
                return getEditTemplateUrl(column);
            }

            return getCellTemplateUrl(column);
        }

        function getCellTemplateUrl(column) {
            if (column.templateUrl) {
                return column.templateUrl;
            }
            if (column.type) {
                return templatesPath + 'cells/' + column.type + '.html';
            }
            return templatesPath + 'cells/text.html';
        }

        function getEditTemplateUrl(column) {
            if (column.editTemplateUrl) {
                return column.editTemplateUrl;
            }
            if (column.editType) {
                return templatesPath + 'edit/' + column.editType + '.html';
            }
            if (column.type) {
                return templatesPath + 'edit/' + column.type + '.html';
            }
            return templatesPath + 'edit/text.html';
        }

        function getFilterTemplateUrl(column) {
            if (column.filter.templateUrl) {
                return column.filter.templateUrl;
            }
            if (column.filter.type) {
                return templatesPath + 'filters/' + column.filter.type + '.html';
            }
            return templatesPath + 'filters/select.html';
        }

        function getAggsTemplateUrl(column) {
            if (column.aggs.templateUrl) {
                return column.aggs.templateUrl;
            }
            if (column.aggs.type) {
                return templatesPath + 'aggs/' + column.aggs.type + '.html';
            }
            return templatesPath + 'aggs/number.html';
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('abcTable')
        .factory('abcFilteraggsService', abcFilteraggsService);

    function abcFilteraggsService() {
        var emptyLabel = '[EMPTY]';
        var service = {
            refreshFilters: refreshFilters,
            refreshAggs: refreshAggs
        };

        return service;

        ////////////////
        function refreshFilters(data, columns) {
            if (data) {
                columns.forEach(function (column) {
                    if (column.filter && column.filter.enabled && column.filter.fromData) {
                        column.filter.list = [];
                        data.forEach(function (item) {
                            var value = item[column.field] + '';
                            if (typeof column.filter.fromData == "function") {
                                value = column.filter.fromData(value);
                            }
                            if (!value) {
                                value = emptyLabel;
                            }
                            if (column.filter.list.indexOf(value) < 0) {
                                if (value == emptyLabel) {
                                    column.filter.list.unshift(value);
                                }
                                else {
                                    column.filter.list.push(value);
                                }

                            }
                        })
                    }
                })
            }
        }

        function refreshAggs(data, columns) {
            if (data) {
                columns.forEach(function (column) {
                    if (column.aggs && column.aggs.enabled && column.aggs.fromData) {
                        column.aggs.value = 0;
                        column.aggs.values = undefined;
                        var objToProcess = {
                            uniqueHelper: {},
                            sum: 0,
                            sum2: 0,
                            count: data.length
                        };
                        var uniqueHelper = {};
                        var sum = 0;
                        data.forEach(function (item) {
                            var value = item[column.field];
                            if (typeof column.aggs.fromData == "function") {
                                value = column.aggs.fromData(value, item);
                            }
                            if (column.aggs.operator instanceof Array) {
                                column.aggs.operator.forEach(function (oper) {
                                    processByOperator(oper, objToProcess, value);
                                })
                            }
                            else {
                                processByOperator(column.aggs.operator, objToProcess, value);
                            }
                            // switch (column.aggs.operator) {
                            //     case "unique":
                            //         uniqueHelper[value] = (uniqueHelper[value] || 0) + 1;
                            //         break;
                            //     case "sum":
                            //         sum += parseInt(value, 10);
                            //         break;
                            //     case "avg":
                            //         sum += parseInt(value, 10);
                            //         break;
                            // }
                        })
                        if (column.aggs.operator instanceof Array) {
                            column.aggs.values = [];
                            column.aggs.operator.forEach(function (oper) {
                                var value = getValueByOperator(oper, objToProcess);
                                column.aggs.values.push(value);
                            })
                        }
                        else {
                            column.aggs.value = getValueByOperator(column.aggs.operator, objToProcess);
                        }


                        // switch (column.aggs.operator) {
                        //     case "unique":
                        //         column.aggs.value = Object.keys(uniqueHelper).length;
                        //         break;
                        //     case "sum":
                        //         column.aggs.value = sum;
                        //         break;
                        //     case "avg":
                        //         column.aggs.value = parseInt(sum / data.length, 10);
                        //         break;
                        // }
                    }
                })
            }
        }

        function processByOperator(operator, objToProcess, value) {
            switch (operator) {
                case "unique":
                    objToProcess.uniqueHelper[value] = (objToProcess.uniqueHelper[value] || 0) + 1;
                    break;
                case "sum":
                    objToProcess.sum += parseFloat(value);
                    break;
                case "avg":
                    objToProcess.sum2 += parseFloat(value);
                    break;
            }
        }

        function getValueByOperator(operator, objToProcess) {
            switch (operator) {
                case "unique":
                    return Object.keys(objToProcess.uniqueHelper).length;
                case "sum":
                    return objToProcess.sum;
                case "avg":
                    return parseInt(objToProcess.sum2 / objToProcess.count, 10);
            }
        }
    }
})();

(function() {
'use strict';

    angular
        .module('abcTable')
        .factory('abcCheckboxesService', abcCheckboxesService);

    function abcCheckboxesService() {
        
        var allChecked = false,
            lastCheckedIndex = null;
        
        var service = {
            isAllchecked: isAllchecked,
            checkAll: checkAll,
            checkClick: checkClick,
            getCheckedItems: getCheckedItems
        };
        
        return service;

                
        ////////////////
        function checkAll (data) {
            allChecked = !allChecked;
            var i = 0, length = data.length;
            for (i = 0; i < length; i++) {
                data[i].checked = allChecked;
            }
        }

        function isAllchecked (data) {
            allChecked = true;
            for (var i = 0; i < data.length; i++) {
                if (!data[i].checked) {
                    allChecked = false;
                    break;
                }
            }
            return allChecked;
        }

        function checkClick (index, checked, data, event) {
            //var index = $ctrl.fromItem() + $index;
            if (event.shiftKey && lastCheckedIndex != null) {
                selectAllBetween(lastCheckedIndex, index, data);

            }

            if (checked) {
                lastCheckedIndex = index;
            }
            else {
                lastCheckedIndex = null;
            }
        }

        function selectAllBetween(start, end, data) {
            var i,
                s = Math.min(start, end),
                e = Math.max(start, end);
            for (i = s; i < e; i++) {
                data[i].checked = true;
            }
        }

        function getCheckedItems(data) {
            return data.filter(function (item) {
                return item.checked;
            })
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('abcTable')
        .filter('abcSlice', slice)
        .filter('abcFilterData', filterData);

    function slice() {
        return function (arr, start, end) {
            if (arr) {
                return arr.slice(start, end);
            }
            return [];

        };
    }

    function filterData() {

        var emptyLabel = '[EMPTY]';

        function isValuesExist(filterValues, value) {
            var showEmptyValues = false;
            if (!filterValues || filterValues.length == 0) {
                return true;
            }

            if (filterValues.indexOf(emptyLabel) >= 0 && !value) {
                showEmptyValues = true;
            }
            return showEmptyValues || filterValues.indexOf(value + "") >= 0;
        }

        function isValueExist(filterValue, value) {
            if (!filterValue) {
                return true;
            }

            if (!value) {
                value = "";
            }

            value = "" + value;

            return value.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0;
        }

        function isValueBool(filterValue, value) {
            return !filterValue || !!value;
        }

        return function (items, columns, externalFilter) {
            if (!items) {
                return [];
            }

            var filteredItems = items.filter(function (item) {
                var shown = true;
                var value;
                columns.forEach(function (column) {
                    value = item[column.field];
                    if (column.filter && shown) {
                        switch (column.filter.type) {
                            case "select":
                                var testMethod = column.filter.method || isValuesExist;
                                if (!testMethod(column.filter.values, value)) {
                                    shown = false;
                                }
                                break;
                            case "text":
                                if (!isValueExist(column.filter.value, value))
                                    shown = false;
                                break;
                            case "checkbox":
                                var testMethod = column.filter.method || isValueBool;
                                if (!testMethod(column.filter.value, value, item)) {
                                    shown = false;
                                }
                                break;
                        }
                    }
                })

                if (shown && externalFilter) {
                    shown = externalFilter(item);
                }

                return shown;
            })

            return filteredItems;
        }
    }
})();
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
(function () {
    'use strict';


    angular
        .module('abcTable')
        .component('abcTable', {
            templateUrl: '/src/template.html',
            controller: ABCTableController,
            bindings: {
                columns: '=',
                data: '=',
                options: '='
            },
        });

    ABCTableController.$inject = ['$timeout', 'abcTemplatesService', 'abcCheckboxesService', 'abcFilteraggsService'];
    function ABCTableController($timeout, abcTemplatesService, abcCheckboxesService, abcFilteraggsService) {
        var $ctrl = this;
        $ctrl.currentPage = 1;
        $ctrl.filteredData = [];

        $ctrl.$onInit = function () {
            if (!$ctrl.options.sort) {
                $ctrl.options.sort = {
                    field: null,
                    reverse: false
                }
            }
            $ctrl.options.dataChanged = function () {
                $timeout(function () {
                    refreshFilters();
                    refreshAggs();
                }, 0);

            }
            $ctrl.options.getCheckedItems = function () {
                return abcCheckboxesService.getCheckedItems($ctrl.data);
            }
        };

        $ctrl.rowStyle = function (item) {
            var defaultStyle = { 'info': item.checked, 'warning': !!item.editField };

            if ($ctrl.options.rowStyle) {
                Object.assign(defaultStyle, $ctrl.options.rowStyle(item));
            }

            return defaultStyle;
        }

        $ctrl.initColumn = function (column) {
            if (column.type == 'checkbox') {
                return;
            }

            if ($ctrl.options.showFilter) {
                if (!column.filter) {
                    column.filter = {
                        enabled: true,
                        type: 'select',
                        list: [],
                        fromData: true
                    }
                }
                if (typeof column.filter.enabled == "undefined") {
                    column.filter.enabled = true;
                }

                if (typeof column.filter.list == "undefined") {
                    column.filter.list = null;
                }

                if (typeof column.filter.type == "undefined") {
                    column.filter.type = 'select';
                }

            }
        }

        $ctrl.filterCheck = function (column) {
            column.filter.value = !column.filter.value;
            $timeout(function () {
                refreshAggs();
            }, 0);
        }

        $ctrl.filterSelect = function () {
            refreshAggs();
        }

        $ctrl.sort = function (field) {
            if ($ctrl.options.sort.field == field) {
                $ctrl.options.sort.reverse = !$ctrl.options.sort.reverse;
            }
            else {
                $ctrl.options.sort.field = field;
                $ctrl.options.sort.reverse = false;
            }

        }

        $ctrl.getCellClass = function (column, item) {

            if (!column.cellClass) {
                return undefined;
            }
            if (typeof column.cellClass == "string") {
                return column.cellClass;
            }

            var resolvedClass = column.cellClass(item);
            return resolvedClass;


        }

        //Templates
        $ctrl.getTemplateUrl = function (column, item) {
            return abcTemplatesService.getTemplateUrl(column, item, $ctrl.isEditMode(item, column));
        }

        $ctrl.getFilterTemplateUrl = function (column) {
            return abcTemplatesService.getFilterTemplateUrl(column);
        }

        $ctrl.getAggsTemplateUrl = function (column) {
            return abcTemplatesService.getAggsTemplateUrl(column);
        }

        //Checkboxes
        $ctrl.checkAll = function () {
            abcCheckboxesService.checkAll($ctrl.filteredData);
        }

        $ctrl.isAllchecked = function () {
            return abcCheckboxesService.isAllchecked($ctrl.filteredData);
        }

        $ctrl.checkClick = function ($index, checked, event) {
            var index = $ctrl.fromItem() + $index;
            abcCheckboxesService.checkClick(index, checked, $ctrl.filteredData, event);
        }

        $ctrl.showEditMode = function (item, column) {
            if (!column.allowEdit) {
                return;
            }

            item.editField = column.field;
            item.editValue = item[column.field];
        }

        $ctrl.hideEditMode = function (item) {
            item.editField = null;
            item.editValue = null;
        }

        $ctrl.isEditMode = function (item, column) {
            return item.editField == column.field;
        }

        $ctrl.fromItem = function () {
            return ($ctrl.currentPage - 1) * $ctrl.options.pageSize;
        }

        $ctrl.toItem = function () {
            return Math.min($ctrl.currentPage * $ctrl.options.pageSize, $ctrl.filteredData.length);
        }

        $ctrl.onSpecialKey = function (item, column, rowIndex, colIndex, event) {
            switch (event.keyCode) {
                case 27:
                    $ctrl.hideEditMode(item);
                    break;
                case 13:
                    $ctrl.fieldUpdated(item, column);
                    var nextItem = $ctrl.filteredData[$ctrl.fromItem() + rowIndex + 1];
                    if (nextItem) {
                        $ctrl.showEditMode(nextItem, column);
                    }
                    break;
                case 9:
                    $ctrl.fieldUpdated(item, column);
                    var nextColumn = getNextEditableColumn($ctrl.columns, colIndex);
                    if (nextColumn) {
                        $ctrl.showEditMode(item, nextColumn);
                    }
                    break;
                default:
                    break;

            }
        }

        function getNextEditableColumn(columns, index) {
            var column = columns[index + 1];
            if (!column) {
                return null;
            }
            if (column.allowEdit && !column.hidden) {
                return column;
            } else {
                return getNextEditableColumn(columns, index + 1);
            }



        }

        $ctrl.fieldUpdated = function (item, column) {
            if (item[column.field] != item.editValue) {
                var oldValue = item[column.field];
                item[column.field] = item.editValue;
                if ($ctrl.options.valueChanged) {
                    $ctrl.options.valueChanged(item.editValue, oldValue, item.editField, item);
                }
                refreshFilters();
                refreshAggs();
            }
            $ctrl.hideEditMode(item);
        }

        $ctrl.linkCellText = function (item, column) {
            if (column.linkTextField) {
                return item[column.linkTextField];
            }

            return column.linkText;
        }

        function refreshFilters() {
            abcFilteraggsService.refreshFilters($ctrl.filteredData, $ctrl.columns);
        }

        function refreshAggs() {
            abcFilteraggsService.refreshAggs($ctrl.filteredData, $ctrl.columns);
        }


        $ctrl.$onChanges = function (changesObj) {

        };
        $ctrl.$onDestory = function () {
        };
    }
})();