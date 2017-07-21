(function () {
    'use strict';

    angular.module('myApp', [
        'abcTable'
    ]).controller('mainController', MainController);


    function MainController($http, $filter) {
        var vm = this;
        vm.options = {
            showFilter: true,
            showAggRow: true,
            hideToolbar: false,
            hideHeader: false,
            class: 'table table-striped table-hover',
            rowStyle: function (item) {
                return {
                    'success': item.OrderDisplay == '8832937'
                }
            },
            pageSize: 50,
            sort: {
                field: 'ID',
                reverse: false
            },
            externalFilter: function (item) {
                return true;
            },
            valueChanged: function (newValue, oldValue, field, item) {
                console.log('New value: ' + newValue);
                console.log('Old value: ' + oldValue);
                console.log('Field: ' + field);
            }
        };

        vm.columns = [
            {
                type: 'checkbox'
            },
            {
                type: 'index'
            },
            {
                title: '#',
                field: 'ID',
                filter: {
                    fromData: false
                }
            },
            {
                title: 'Order ID',
                field: 'OrderDisplay',
                cellClass: 'bold-cell',
                style: {
                    'width': '150px'
                },
                aggs: {
                    enabled: true,
                    type: 'number',
                    fromData: true,
                    operator: 'unique'
                }
            },
            {
                title: 'Company',
                field: 'Company',
                style: {
                    'width': '250px'
                },
                templateUrl: '/test/templates/company-cell.html',
                aggs: {
                    enabled: true,
                    type: 'number',
                    fromData: true,
                    operator: 'unique'
                },
                allowEdit: true,
                editType: 'select',
                editValues: ['ONE', 'TWO', 'THREE']
            },
            {
                title: 'Item',
                field: 'ItemName',
                hidden: false,
                allowEdit: true,
                filter: {
                    method: function (filterValues, value) {
                        if (!filterValues || filterValues.length == 0) {
                            return true;
                        }
                        var name;
                        value = value.toLowerCase();
                        for (var i = 0; i < filterValues.length; i++) {
                            name = filterValues[i].toLowerCase();
                            if (value.indexOf(name) == 0 || value.indexOf(" " + name) > 0) {
                                return true;
                            }
                        }
                        return false;
                    }
                },
                aggs: {
                    enabled: true,
                    type: 'number',
                    fromData: true,
                    operator: 'unique'
                }
            },
            {
                title: 'Price',
                field: 'Price',
                templateUrl: '/test/templates/price-cell.html',
                type: 'currency',
                symbol: '₪',
                allowEdit: true,
                style: { 'width': '100px' },
                cellClass: function (item) {
                    if (item.Price > 0) {
                        return "bg-success";
                    } else {
                        return "bg-warning";
                    }
                },
                filter: {
                    enabled: true,
                    type: 'checkbox',
                    label: 'L.50.',
                    method: function (filterValue, value, item) {
                        return !filterValue || (value < 50);
                    },
                    tooltip: 'Lower then 50'
                },
                aggs: {
                    enabled: true,
                    type: 'currency',
                    fromData: function (value, item) {
                        return value * item.Quantity;
                    },
                    operator: ['sum', 'avg']
                }
            },
            {
                title: 'Date Added',
                field: 'AddedDate',
                type: 'date',
                format: 'dd/MM hh:mm',
                filter: {
                    list: [],
                    fromData: function (value) {
                        return $filter("date")(value, "dd/MM");
                    },
                    method: function (filterValues, value) {
                        if (!filterValues || filterValues.length == 0) {
                            return true;
                        }
                        return filterValues.indexOf($filter("date")(value, "dd/MM")) >= 0;
                    }
                }
            },
            {
                title: 'Comment',
                field: 'Comment',
                type: 'text',
                allowEdit: true,
                filter: {
                    enabled: true,
                    type: 'text'
                }
            },
            {
                title: 'Quantity',
                field: 'Quantity',
                style: { 'width': '100px' },
                type: 'number',
                allowEdit: true,
                filter: {
                    enabled: false,
                },
                aggs: {
                    enabled: true,
                    type: 'number',
                    fromData: true,
                    operator: ['sum', 'avg']
                }
            }];

        $http.get('/test/MOCK_DATA.json').then(function (response) {
            vm.data = response.data;
            vm.options.dataChanged();
        })
    }
})();