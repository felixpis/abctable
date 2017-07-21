
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