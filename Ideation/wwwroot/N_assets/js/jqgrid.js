// in this array push the objects which are selected in multiselect jqgrid. In your object RowNo parameter is mandatory to add
// eg [{RowNo:1,... other parameters}]
var outputArrayMultiselect = []; 
//jqGrid Resuable code
function CallAjaxGET(URL, params, async) {
    //Load the JSON data we'll need to populate our jqGrid
    $.ajax(
        {
            type: "GET",
            url: ROOT + URL,
            data: params,
            async: async,
            dataType: "json",
            contentType: 'application/json',
            error: function () {
                alert(" An error occurred.");
            },
            success: function (data) {
                //  Work through our JSON data, and create the two arrays needed by jqGrid 
                //  to display this dynamic data.
                var listOfColumnModels = [];
                //var listOfColumnNames = [];
                //listOfColumnModels = [];
                for (var prop in data[0]) {
                    if (data[0].hasOwnProperty(prop)) {
                        listOfColumnModels.push({
                            name: prop,
                            //width: columnWidth,
                            sortable: true,
                            //hidden: bHidden
                        });
                    }
                }
                //Now we have our JSON data, and list of Column Headings and Models, we can create our jqGrid.
                //CreateJQGrid(data, listOfColumnModels);
            }
        });
}
function CallAjaxPOST(URL, params, async) {
    //Load the JSON data we'll need to populate our jqGrid
    $.ajax(
        {
            type: "POST",
            url: ROOT + URL,
            data: params,
            async: async,
            dataType: "json",
            contentType: 'application/json',
            error: function () {
                alert(" An error occurred.");
            },
            success: function (data) {
                //  Work through our JSON data, and create the two arrays needed by jqGrid 
                //  to display this dynamic data.
                var listOfColumnModels = [];
                //var listOfColumnNames = [];
                for (var prop in data[0]) {
                    if (data[0].hasOwnProperty(prop)) {
                        //  We have found one property (field) in our JSON data.
                        //  Add a column to the list of Columns which we want our jqGrid to display
                        var listOfColumnModels = [];
                        listOfColumnModels.push({
                            name: prop,
                            //width: columnWidth,
                            sortable: true,
                            //hidden: bHidden,
                        });
                    }
                }
                //Now we have our JSON data, and list of Column Headings and Models, we can create our jqGrid.
                //CreateJQGrid(data, listOfColumnModels);
            }
        });
}

//jQGrid initialization - Virtual Scroll with Authorization & Multiselect
//eg for calling normal list page CreateJQGrid('#usermaster', APIURL + "UserList", 'JSON', [], colmodels, token, true)
//eg for calling multiselect page CreateJQGrid('#roleMappingModal', '', 'local', result, rolecolmodels, token, true, true)
function CreateJQGrid(selector, url, dataType, data, colmodels, token, enableAuthorization = false, enableMultiselect = false, mtype = "GET", maxheight = "45vh") {
    //  After loading the JSON data from our webservice, and establishing the list of
    //  Column Names & Models, we can call this function to create the jqGrid.
    $.jgrid.gridUnload(selector);
    $(selector).jqGrid({
        url: url,
        datatype: dataType,
        mtype: mtype,
        data: data,
        loadBeforeSend: function (jqXHR) {
            if (enableAuthorization)
                jqXHR.setRequestHeader("Authorization", token);
        },
        colModel: colmodels,
        loadonce: true,
        forceClientSorting: true,
        viewrecords: true,
        rowNum: enableMultiselect ? data.length : 1000,
        scroll: 1,
        pager: selector + '_pager',
        multiselect: enableMultiselect,
        beforeSelectRow: function (rowId, e) {
            return $(e.target).is("input:checkbox");
        },
        // use the below function in your js file
        //selectGridRow = function (id, selected) {
        //    if (selected) {
        //        var rowData = jQuery("#vendorMappingModal").getRowData(id); // use your jqgrid selector
        //        var objIndex = -1;
        //        objIndex = outputArrayMultiselect.findIndex(function (o) { return parseInt(o.RowNo) === parseInt(rowData.RowNo) });
        //        if (objIndex === -1) {
        //            outputArrayMultiselect.push(rowData);
        //        }
        //    }
        //}
        onSelectRow: enableMultiselect ? selectGridRow : null,
        // use the below function in your js file
        //selectAllGrid = function (id, selected) {
        //    if (selected) {
        //        var data = $("#vendorMappingModal").jqGrid('getGridParam', 'data'); // use your jqgrid selector
        //        $.each(data, function (i, rowData) {
        //            var objIndex = -1;
        //            objIndex = outputArrayMultiselect.findIndex(function (o) { return parseInt(o.RowNo) === parseInt(rowData.RowNo) });
        //            if (objIndex === -1) {
        //                outputArrayMultiselect.push(rowData);
        //            }
        //        })
        //    }
        //}
        onSelectAll: enableMultiselect ? selectAllGrid : null,
        gridComplete: function () {
            var objRows = $(selector + " tbody tr");
            var objHeader = $(selector + " tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
            if (enableMultiselect) {
                var rowIds = jQuery(selector).jqGrid('getDataIDs');
                console.log(rowIds)
                $.each(rowIds, function (i, rowId) {
                    var rowData = jQuery(selector).jqGrid('getRowData', rowId);
                    console.log(rowData)
                    var objIndex = -1
                    objIndex = outputArrayMultiselect.findIndex(function (s) { return parseInt(s.RowNo) === parseInt(rowData.RowNo) });
                    console.log(objIndex)
                    if (objIndex >= 0) {
                        jQuery(selector).jqGrid('setSelection', rowId, true);
                    }
                })
            }

        },
        jsonReader: {
            root: function (obj) {
                console.log(obj);
                return typeof obj === "string" ? $.parseJSON(obj) : obj;
            },
            page: function (obj) {
                console.log(obj)
                return obj.PageNum;
            },
            records: function (obj) {
                console.log(obj)
                return obj.TotalRecords;
            },
            total: function (obj) {
                console.log(obj)
                return Math.round(obj.TotalRecords / 1000);
            },
            repeatitems: false
        },
        search: true, // Enable search toolbar
        searchClearButton: true, // Enable "Clear" button
    });
    $(selector).jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        enableClear: false,
        defaultSearch: "cn"
    });
    $('.ui-jqgrid-bdiv').css({ 'max-height': maxheight });
    $('.ui-jqgrid-bdiv').children("div").css({ 'height': maxheight });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    console.log($TableHeight, "$TableHeight")
    if ($TableHeight > 380) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
    }
    else {
        //$(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "unset");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px")
        //$(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")

    }
}

//jQGrid initialization - Pagination
function CreateJQGridPagination(url, datatype, mtype, params, colmodels) {
    //  After loading the JSON data from our webservice, and establishing the list of 
    //  Column Names & Models, we can call this function to create the jqGrid.
    $("#jqgrid-pagination").jqGrid({
        url: url,
        datatype: datatype,
        data: params,
        mtype: mtype,
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        ignoreCase: true,
        shrinkToFit: true,
        rowNum: 12,
        pager: '#pager-pagination',
        gridComplete: function () {
            var objRows = $("#jqgrid-pagination tbody tr");
            var objHeader = $("#jqgrid-pagination tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
    $("#jqgrid-pagination").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    $('.ui-jqgrid-bdiv').css({ 'max-height': '50vh' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'height': '50vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 380) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
    }
    else {
        //$(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "unset");
        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px")
        //$(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")

    }
}







