# ABCTABLE

### The ultimate grid/table component for angularjs application
---
## Features
* Simple and lightweight table based grid working with [angularjs](https://angularjs.org/)
* Multiple filters based on [angular-ui-select](https://angular-ui.github.io/ui-select/)
* Build-in aggregation functions (sum, average, unique) with easy configuration
* Cell templates support (text, number, date, currency, checkbox, link and custom)
* Inline editing support with templates (text, number, select and custom)
* Using [bootstrap](http://getbootstrap.com) style snippets
* Paging, sorting
* Conditional row/cell styling
* Keyboard integration (`ENTER`/`TAB`/`ESC`)

## Build
```sh
git clone https://github.com/felixpis/abctable.git
cd abctable
npm install
bower install
gulp run build
```
Build generates two files in folder `dist`: `abctable.js` and `abctable.css`

(For development run `gulp`)

## Dependencies
* [AngularJS](https://angularjs.org/)
* angular-sanitize
* [Angular UI Bootstrap](http://angular-ui.github.io/bootstrap/)
* [Bootstrap](http://getbootstrap.com)
* [Angular UI select](https://angular-ui.github.io/ui-select/)
* [Fontawesome](http://fontawesome.io/)

## Using in your web app
Add main js, css and all the dependencies to html
```html
<link href="/bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
<link href="/bower_components/bootstrap/dist/css/bootstrap-theme.css" rel="stylesheet">
<link href="/bower_components/angular-ui-select/dist/select.css" rel="stylesheet">
<link href="/bower_components/font-awesome/css/font-awesome.css" rel="stylesheet">
<link href="abctable.css" rel="stylesheet">


<script src="/bower_components/angular/angular.js"></script>
<script src="/bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="/bower_components/angular-ui-select/dist/select.js"></script>
<script src="abctable.js"></script>
```
Add angular dependency to your main module
```javascript
angular.module('myApp', ['abcTable'])
```

Add html tag
```html
<abc-table columns="vm.columns" data="vm.data" options="vm.options"></abc-table>
```

In controller create options object
```javascript
vm.options = {
        showFilter: true,
        class: 'table table-striped table-hover',
        pageSize: 50
};
```
And then create columns definition
```javascript
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
        title: 'Company',
        field: 'Company',
        style: {
            'width': '250px'
        },
        templateUrl: '/test/templates/company-cell.html'
        },
    {
        title: 'Comment',
        field: 'Comment',
        type: 'text',
        filter: {
            enabled: true,
            type: 'text'
        }
    }];
```
Finally retrieve data
```javascript
$http.get('/test/data.json').then(function (response) {
    vm.data = response.data;
})
```
***
## Todo
1. Build demo page
2. Add server side support