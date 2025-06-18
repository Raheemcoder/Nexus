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
                        //  We have found one property (field) in our JSON data.
                        //  Add a column to the list of Columns which we want our jqGrid to display
                        //listOfColumnNames.push(prop);
                        //  How do we want this field to be displayed in our jqGrid?
                        //var bHidden = (prop == "RetailerCode") || (prop == "RetailerCode");
                        //var columnWidth = (prop == "RetailerName") ? 200 : 50;
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
                        //  How do we want this field to be displayed in our jqGrid?
                        //var bHidden = (prop == "RetailerCode") || (prop == "RetailerCode");
                        //var columnWidth = (prop == "RetailerName") ? 200 : 50;
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

function CreateJQGrid(url, mtype, params, dataType, colmodels) {
    //  After loading the JSON data from our webservice, and establishing the list of 
    //  Column Names & Models, we can call this function to create the jqGrid.
    $("#jqgrid").jqGrid({
        url: url,
        //datatype: 'json',
        datatype: dataType,
        data: params,
        mtype: mtype,
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        //height: 350,
        rowNum: 20,
        scroll: true,
        pager: '#pager',
        gridComplete: function () {
            var objRows = $("#jqgrid tbody tr");
            var objHeader = $("#jqgrid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });
    $("#jqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    //$('.ui-jqgrid-bdiv').css({ 'max-height': '500px' });
}
