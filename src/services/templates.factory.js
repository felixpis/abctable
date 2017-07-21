
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