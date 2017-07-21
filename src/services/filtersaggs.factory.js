
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