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