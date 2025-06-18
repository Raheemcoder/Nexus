var data = [{
    "MilestoneId": "0",
    "SequenceNo": "11",
    "MilestoneName": "test",
    "RelationType": "",
    "SetRelation": "No relation",
    "Duration": 1,
    "Status": "true"
}];


$(document).ready(function () {

    $('#ProjectId').hide();
    $(".projectName_error").hide();
    $('#projectNameList').hide();
   

    colmodels = [
        {
            name: 'Action',
            resizable: true,
            width: 40,
            label: 'Action',
            ignoreCase: true,
            classes: 'text-center',
            search: false,
            sortable: false,

            formatter: function (cellvalue, options, rowobject) {

                return '<div class="grid-icons-group -justify-center"><a href="javascript: void(0);" class="grid-icon-only"  title="Edit"><i class="fas fa-pen" data-toggle="modal" data-target="#addModal" onclick="EditMilestone(\'' + options.rowId + '\')"> </i></a></div>';
            }
        },
        {
            name: 'RoleId',
            resizable: true,
            label: 'RoleId',
            hidden: true,
            ignoreCase: true
        },
        {
            name: 'MilestoneId',
            resizable: true,
            label: 'MilestoneId',
            ignoreCase: true,
            hidden: true
        },
        {
            name: 'MilestoneName',
            resizable: true,
            label: 'Milestone Name',
            ignoreCase: true
        },
        {
            name: 'SequenceNo',
            label: 'Sequence No',
            width: 70,
            resizable: true,
            ignoreCase: true
        },
        {
            name: 'RelationType',
            resizable: true,
            label: 'Relation Type',
            ignoreCase: true,
            hidden: true
        },
        {
            name: 'SetRelation',
            resizable: true,
            label: 'Set Relation',
            ignoreCase: true,

        },
        {
            name: 'Duration',
            resizable: true,
            label: 'Duration',
            ignoreCase: true
        },
        {
            name: 'Status',
            resizable: true,
            width: 50,
            label: 'Status',
            ignoreCase: true,

            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.Status == "Active") {
                    return '<span class="text-success">Active</span>';
                }
                else {
                    return '<span class="text-danger">InActive</span>';

                }
            }
        },
        {
            name: 'SubmilestoneExit',
            resizable: true,
            label: 'SubmilestoneExit',
            ignoreCase: true,
            hidden: true,
            sortable: false,
            classes: 'submilestoneexist'
        }
    ]


    models = [

        {
            name: 'RoleId',
            resizable: true,
            label: 'RoleId',
            hidden: true,
            ignoreCase: true
        },
        {
            name: 'SubMilestoneId',
            resizable: true,
            label: 'Sub MilestoneId',
            ignoreCase: true,
            hidden: true
        },
        {
            name: 'SubMilestoneName',
            resizable: true,
            label: 'Sub Milestone Name',
            ignoreCase: true
        },

        {
            name: 'RelationType',
            resizable: true,
            label: 'Relation Type',
            ignoreCase: true,
            hidden: true
        },
        {
            name: 'SetRelation',
            resizable: true,
            label: 'Set Relation',
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                if (cellvalue == '0') {

                    return ''
                }
                else {
                    return rowobject.SetRelation

                }

            }
        },
        {
            name: 'Duration',
            resizable: true,
            label: 'Duration',
            ignoreCase: true
        },
        {
            name: 'MilestoneStatus',
            resizable: true,
            width: 50,
            label: 'Status',
            ignoreCase: true,

            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.MilestoneStatus == "True") {
                    return '<span class="text-success">Active</span>';
                }
                else {
                    return '<span class="text-danger">InActive</span>';

                }
            }
        },
    ]


    $("#jqgrid").jqGrid({
        url: ROOT + "Master/GetMilestoneList",
        datatype: 'json',
        //datatype: dataType,
        //data: params,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        //height: 350,
        rowNum: 20,
        scroll: true,
        pager: '#pager',
        //subGrid: true,
        //subGridRowExpanded: function (subgrid_id, row_id) {

        //    var subgrid_table_id = subgrid_id + "_t";
        //    var selectedMilestone_id = jQuery('#jqgrid').jqGrid('getRowData', row_id);
        //    var rowSequnce = selectedMilestone_id.SequenceNo;

        //    $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "'></table>");
        //    $("#" + subgrid_table_id).jqGrid({
        //        url: ROOT + "Master/GetSubMilestones",
        //        datatype: 'json',
        //        mtype: 'GET',
        //        colModel: models,
        //        postData: { SequnceNo: rowSequnce },
        //        loadonce: true,
        //        viewrecords: true,
        //        rowNum: 20,
        //        scroll: true,
        //        pager: '#pager_id',
        //        height: "auto",

        //    });
        //   // $("#" + subgrid_table_id).jqGrid("navGrid", "#" + pager_id, { edit: false, add: false, del: false });
        //},
        gridComplete: function () {
            var objRows = $("#jqgrid tbody tr");
            var objHeader = $("#jqgrid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        },
        loadComplete: function () {

            //var rows = $("#jqgrid").getDataIDs();
            //for (var i = 0; i < rows.length; i++) {
            //    var row_id = rows[i];
            //    var rowdata = $('#jqgrid').getRowData(row_id);
            //    if (rowdata.SubmilestoneExit == 'True') {

            //        rowSequnce = rowdata.SequenceNo;
            //        $("#jqgrid").expandSubGridRow(row_id);
            //    }

            //}

            $('.submilestoneexist').each(function (i, obj) {
                console.log('i', i);
                if (obj.textContent != 'True') {
                    var td = $(obj).parent().find('td.sgcollapsed');
                    $(td).unbind("click").html("");
                } else {

                }
            })

            var $grid = $('#jqgrid');
            // $("#jqgrid").jqGrid("setGridParam", { beforeSelectRow: function (rowid, e) { return $(e.target).is("input:checkbox"); } });
            var totalAmount = $grid.jqGrid('getCol', 'Amount', false, 'sum');
            $grid.jqGrid('footerData', 'set', { 'OrderQtyInPallets': "Total Amount $:" });
            $grid.jqGrid('footerData', 'set', { 'Amount': parseFloat($grid.jqGrid('getCol', 'Amount', false, 'sum')).toFixed(2) });
            $(".tamounteuro").text(parseFloat(totalAmount).toFixed(2));
            parseInt(totalAmount) !== 0 ? $(".tamountdlr").text(parseFloat(1 / totalAmount).toFixed(2)) : 0;
        }
    });
    $("#jqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });





    $('#Addmilestone').on('click', function () {

        var seq = $("#count").val();
        $('#SequenceNo').val(parseInt(seq));
    })



});


$('body').on('click', '#btnExcel', function () {
    $('#loader1').css('visibility', '');
    $("#jqgrid").jqGrid("exportToExcel", {
        includeLabels: true,
        includeGroupHeader: true,
        includeFooter: true,
        fileName: "NewStoreRequestsList.xlsx",
        maxlength: 100 // maxlength for visible string data 
    });
    $('#loader1').css('visibility', 'hidden');
});


function EditMilestone(rowid) {



    var rowData = $('#jqgrid').getRowData(rowid);

    var SequenceNo = rowData.SequenceNo;

    //$('#SequenceNo').val(SequenceNo);
    $('#SetSequnce').prop('disabled', true);
    $('#SetSequnce').addClass('input-disabled');
    $("#element").text("Edit Milestone Details ");
    if (rowData.SetRelation === "") {
        $("#SpecialSet").hide();
    }
    else {

        $("#SpecialSet").show();
    }
    $("#Name").val(rowData.MilestoneName);

    $('#SetSequnce').append(new Option(rowData.SequenceNo, rowData.SequenceNo));
    $("#SetSequnce").find("option[value=" + rowData.SequenceNo + "]").prop("selected", true);
    //modified
    $("#relationtype option[value='" + rowData.RelationType + "']").prop('selected', true);

    $("#MilestoneId").val(rowData.MilestoneId);
    $('#Duration').val(rowData.Duration);

    var existingMultiselectdata = $('#Setrelation').val();

    if (existingMultiselectdata.length > 0) {
        $.each(existingMultiselectdata, function (index, value) {

            $("#Setrelation").find("option[value=" + value + "]").prop("selected", false);
        });

    }
    if (String(rowData.Status) == "<span class=" + '"' + "text-success" + '"' + ">Active</span>") {

        $("#option1").prop("checked", true);
        $("#option2").prop("checked", false);
    }
    else {
        $("#option1").prop("checked", false);
        $("#option2").prop("checked", true);
    }



    var setrelation = rowData.SetRelation.split(',');
    $.each(setrelation, function (index, value) {


        $("#Setrelation").find("option[value=" + value + "]").prop("selected", true);
    });
    $("#Setrelation").multiselect("refresh");

    var seq = parseInt(rowData.SequenceNo - 1);

    $('#Setrelation option').filter(function () {
        return parseInt($(this).val()) > seq
    }).prop('disabled', true);

    //$('#Setrelation option').each(function () {
    //    if ($(this).val() > seq) {
    //        $(this).val().hide();
    //    }
    //})


    $("#Setrelation").multiselect("refresh");


    $('#SequenceNo').val(SequenceNo);


    //$('#addModal').modal('Show');


}

$('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 270px)' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 130) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
}