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