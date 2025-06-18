var dropdowndata = [];
$grid = $("#TTDDashboard_grid")
var grid_arr = [];
var grid_arr_new = [];
var productnames_arr = [];
var role = $('#Role').val()
var year_old = ''
var prod_old = ''
var dateremarks_arr = ({
    "BaselineTTDRemarks": [],
    "BaselineProductionRemarks": [],
    "TTDTargetRemarks": [],
    "ProductionTargetRemarks": []
});

var isExport = true;
$(document).ready(function () {

    $(".second_header").addClass('d-none');

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    $('#ProdYear').datepicker('destroy')
    $('#ProdYear').datepicker({
        format: 'yyyy',
        viewMode: "years",
        minViewMode: "years",
        todayHighlight: true,
        autoclose: true,
        endDate: (new Date().getFullYear() + 1).toString()
    });

    $('#ProdYear').datepicker('setDate', today);

    $('#ProdName').val('').trigger('change');
    year_old = $('#ProdYear').val()
    prod_old = $('#ProdName').val()
    $('.hidelegends').show();
    $("#btnsearch").trigger('click');

});

var colmodels = [
    {
        name: 'TTDHeaderId',
        label: 'Header Id',
        width: 70,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        frozen: true,
        sortable: false,

    },
    {
        name: 'RowNo',
        label: 'Row',
        width: 70,
        resizable: true,
        ignoreCase: true,
        hidden: true,
        frozen: true,
        sortable: false,

    },
    {
        name: 'Action',
        label: 'Action',
        width: 80,
        resizable: true,
        ignoreCase: true,
        frozen: true,
        search: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form action_icons icons_' + rowobject.RowNo + '">' +
                '<span class="mr-2 deleterow _hide deleterow_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" title="Delete"><i class="fas fa-trash color-delete"></i></span>' +
                '<span class="mr-2 editrow _hide editrow_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" title="Edit"><i class="fas fa-pen text-primary"></i></span>' +
                '<span class="mr-2 cancelrow _hide cancelrow_' + rowobject.RowNo + '"  data-lineno="' + rowobject.RowNo + '"  title="Close" ><i class="fas fa-times-circle color-history"></i></span>' +
                '<span class="mr-2 saverow _hide saverow_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" title="Save" ><i class="fas fa-save color-file"></i></span>' +
                '</div>';

        }
    },
    {
        name: 'ProductionTargetYear',
        label: 'Year',
        width: 50,
        resizable: true,
        ignoreCase: true,
        frozen: true,
        sortable: false,
        hidden: true,
        exportcol: false
    },
    {
        name: 'ProjectBriefId',
        label: 'Project Brief Id',
        width: 90,
        resizable: true,
        ignoreCase: true,
        frozen: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form projectbriefid_div">' +
                '<input type="text" class="form-control projectbriefid removespecials updatevalue projectbriefid_selected_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.ProjectBriefId + '">' +
                '<span class="text-danger _hide errortext valid  projectbrief_selected_' + rowobject.RowNo + '_valid" >Please enter valid Project Brief Number or NA</span>' +
                '</div>';
        }
    },
    {
        name: 'ProductName',
        label: 'Product',
        width: 200,
        resizable: true,
        ignoreCase: true,
        frozen: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form product_div">' +
                '<input type="text" title="'+rowobject.ProductName+'" class="form-control product prodmarket removespaces updatevalue product_selected_' + rowobject.RowNo + '" ' +
                'data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.ProductName + '">' +
                '<span class="text-danger _hide errortext valid text-wrap product_selected_' + rowobject.RowNo + '_valid">Please enter Product</span>' +
                '</div>';
        }
    },
    {
        name: 'RDId',
        label: 'R&D',
        width: 90,
        resizable: true,
        ignoreCase: true,
        frozen: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form ">' +
                '<select class="form-control rd updatevalue rd_selected_' + rowobject.RowNo + '" data-singleselect data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" >' +
                '<option value="0">Select</option>' +
                '</select > ' +
                '</div>';
        }
    },
    {
        name: 'PackSizes',
        label: 'Pack Sizes',
        resizable: true,
        width: 90,
        ignoreCase: true,
        frozen: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form ">' +
                '<input type="text" class="form-control packsize removespaces updatevalue packsize_selected_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"  value="' + rowobject.PackSizes + '">' +
                '</div>';
        }
    },

    {
        name: 'ClassificationTypeId',
        label: 'Classification',
        resizable: true,
        ignoreCase: true,
        width: 90,
        frozen: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form ">' +
                '<select class="form-control classification updatevalue classification_selected_' + rowobject.RowNo + '" data-singleselect data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" >' +
                '<option value="0">Select</option>' +
                '</select > ' +
                '</div>';
        }
    },
    {
        name: 'PriorityTypeId',
        label: 'Priority',
        resizable: true,
        width: 110,
        ignoreCase: true,
        frozen: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form ">' +
                '<select class="form-control priority updatevalue priority_selected_' + rowobject.RowNo + '" data-singleselect data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" >' +
                '<option value="0">Select</option>' +
                '</select > ' +
                '</div>';
        }
    },
    {
        name: 'MarketTypeId',
        label: 'Market',
        resizable: true,
        width: 120,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form ">' +
                '<select class="form-control market prodmarket updatevalue market_selected_' + rowobject.RowNo + '" data-singleselect data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" >' +
                '<option value="0">Select</option>' +
                '</select > ' +
                '<span class="text-danger _hide errortext valid text-wrap market_selected_' + rowobject.RowNo + '_valid">Please select Market</span>' +
                '</div>';
        }
    },
    {
        name: 'CategoryId',
        label: 'Category',
        resizable: true,
        width: 100,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form ">' +
                '<select class="form-control category updatevalue category_selected_' + rowobject.RowNo + '" data-singleselect data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" >' +
                '<option value="0">Select</option>' +
                '</select > ' +
                '</div>';
        }
    },
    {
        name: 'SubCategoryId',
        label: 'Sub Category',
        resizable: true,
        width: 90,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form ">' +
                '<select class="form-control subcategory updatevalue subcategory_selected_' + rowobject.RowNo + '" data-singleselect data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" >' +
                '<option value="0">Select</option>' +
                '</select > ' +
                '</div>';
        }
    },
    {
        name: 'BriefAcceptedDate',
        label: 'Brief Accepted Date',
        resizable: true,
        width: 120,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="text-center input_form remarks_icon">' +
                '<div class="remarks_calender">' +
                '<input type="text" title="' + rowobject.BriefAcceptedDate +'" class="form-control briefaccepteddate updatevalue briefaccepteddate_selected_' + rowobject.RowNo + '" data-datepicker  data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" data-datepicker="true"  value="' + rowobject.BriefAcceptedDate + '">' +
                '<span data-toggle="modal" data-target="#remarks_pop_"><i class="fas fa-calendar text-info"></i></span>' +
                '</div>' +
                '</div>';

        }
    },
    //{
    //    name: 'HGMLValue',
    //    label: 'HGML',
    //    resizable: true,
    //    width: 60,
    //    ignoreCase: true,
    //    sortable: false,
    //    formatter: function (cellvalue, options, rowobject) {
    //        return '<div class="text-center input_form ">' +
    //            '<input type="text" class="form-control onlydecimal updatevalue businessvalue hgmlvalue_selected_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '"  value="' + rowobject.HGMLValue + '">' +
    //            '</div>';
    //    }
    //},
    //{
    //    name: 'APACValue',
    //    label: 'APAC',
    //    resizable: true,
    //    width: 60,
    //    ignoreCase: true,
    //    sortable: false,
    //    formatter: function (cellvalue, options, rowobject) {
    //        return '<div class="text-center input_form ">' +
    //            '<input type="text" class="form-control onlydecimal updatevalue  businessvalue apacvalue_selected_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.APACValue + '">' +
    //            '</div>';
    //    }
    //},
    //{
    //    name: 'EuropeValue',
    //    label: 'Europe',
    //    resizable: true,
    //    width: 60,
    //    ignoreCase: true,
    //    sortable: false,
    //    formatter: function (cellvalue, options, rowobject) {
    //        return '<div class="text-center input_form ">' +
    //            '<input type="text" class="form-control onlydecimal updatevalue businessvalue europevalue_selected_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.EuropeValue + '">' +
    //            '</div>';
    //    }
    //},
    //{
    //    name: 'HUSAValue',
    //    label: 'HUSA',
    //    resizable: true,
    //    width: 60,
    //    ignoreCase: true,
    //    sortable: false,
    //    formatter: function (cellvalue, options, rowobject) {
    //        return '<div class="text-center input_form ">' +
    //            '<input type="text" class="form-control onlydecimal updatevalue businessvalue husavalue_selected_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.HUSAValue + '">' +
    //            '</div>';
    //    }
    //},
    //{
    //    name: 'IndiaValue',
    //    label: 'India',
    //    resizable: true,
    //    width: 60,
    //    ignoreCase: true,
    //    sortable: false,
    //    formatter: function (cellvalue, options, rowobject) {
    //        return '<div class="text-center input_form ">' +
    //            '<input type="text" class="form-control onlydecimal updatevalue businessvalue indiavalue_selected_' + rowobject.RowNo + '" id="indiavalue_selected_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.IndiaValue + '">' +
    //            '</div>';
    //    }


    //},
    //{
    //    name: 'METAPValue',
    //    label: 'METAP',
    //    resizable: true,
    //    width: 60,
    //    ignoreCase: true,
    //    sortable: false,
    //    formatter: function (cellvalue, options, rowobject) {
    //        return '<div class="text-center input_form ">' +
    //            '<input type="text" class="form-control onlydecimal updatevalue businessvalue metapvalue_selected_' + rowobject.RowNo + '"  data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.METAPValue + '">' +
    //            '</div>';
    //    }
    //},
    {
        name: 'BusinessValueYear1',
        label: 'Business value in <br> M$ (Year 1)',
        resizable: true,
        width: 118,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form ">' +
                '<input type="text" title="' + rowobject.BusinessValueYear1 +'" class="form-control onlydecimal updatevalue businessvalueyear1_selected_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.BusinessValueYear1 + '">' +
                '</div>';
        }
    },
    {
        name: 'BusinessValueYear2',
        label: 'Business value in <br> M$ (Year 2)',
        resizable: true,
        width: 118,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form ">' +
                '<input type="text" title="' + rowobject.BusinessValueYear2 +'" class="form-control  onlydecimal updatevalue businessvalueyear2_selected_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.BusinessValueYear2 + '">' +
                '</div>';
        }
    },
    {
        name: 'BaselineTTDDate',
        label: 'Baseline TTD Date',
        resizable: true,
        width: 120,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form remarks_icon">' +
                '<div class="remarks_calender">' +
                '<input type="text" title="' + rowobject.BaselineTTDDate +'" class="form-control baselinettd updatevalue baselinettd_selected_' + rowobject.RowNo + '" data-datepicker-monthyear1 data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.BaselineTTDDate + '">' +
                '<span data-toggle="modal" data-target="#r"><i class="fas fa-calendar text-info"></i></span>' +
                '</div>' +
                '<span data-toggle="modal" data-valid="baselinettdremarks_selected_" data-rowno="' + rowobject.RowNo + '" data-columnname="BaselineTTDRemarks" data-datecolumn="BaselineTTDDate" class="openremarksmodel"><i class="fas fa-info-circle text-primary"></i></span>' +
                '</div>' +
                '<span class="text-danger _hide errortext valid text-wrap baselinettdremarks_selected_' + rowobject.RowNo + '_valid">Please enter Remarks</span>';
        }
    },
    {
        name: 'BaselineProductionDate',
        label: 'Baseline Production <br> Date',
        resizable: true,
        width: 125,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form remarks_icon">' +
                '<div class="remarks_calender">' +
                '<input type="text" title="' + rowobject.BaselineProductionDate +'" class="form-control baselineprod updatevalue baselineproduction_selected_' + rowobject.RowNo + '" data-datepicker-monthyear1 data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.BaselineProductionDate + '">' +
                '<span data-toggle="modal" data-target="#remarks_pop_"><i class="fas fa-calendar text-info"></i></span>' +
                '</div>' +
                '<span data-toggle="modal" data-valid="baselineproductionremarks_selected_" data-rowno="' + rowobject.RowNo + '" data-columnname="BaselineProductionRemarks" data-datecolumn="BaselineProductionDate" class="openremarksmodel"><i class="fas fa-info-circle text-primary"></i></span>' +
                '</div>' +
                '<span class="text-danger _hide errortext valid text-wrap baselineproductionremarks_selected_' + rowobject.RowNo + '_valid">Please enter Remarks</span>';
        }
    },
    {
        name: 'TTDTargetDate',
        label: 'TTD Target Date',
        resizable: true,
        width: 120,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form remarks_icon">' +
                '<div class="remarks_calender">' +
                '<input type="text" title="' + rowobject.TTDTargetDate +'" class="form-control ttdtarget updatevalue ttdtarget_selected_' + rowobject.RowNo + '" data-datepicker-monthyear1 data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.TTDTargetDate + '">' +
                '<span data-toggle="modal" data-target="#remarks_pop_"><i class="fas fa-calendar text-info"></i></span>' +
                '</div>' +
                '<span data-toggle="modal" data-valid="ttdtargetremarks_selected_" data-rowno="' + rowobject.RowNo + '" data-columnname="TTDTargetRemarks" data-datecolumn="TTDTargetDate" class="openremarksmodel"><i class="fas fa-info-circle text-primary"></i></span>' +
                '</div>' +
                '<span class="text-danger _hide errortext valid text-wrap ttdtargetremarks_selected_' + rowobject.RowNo + '_valid">Please enter Remarks</span>';
        }
    },
    {
        name: 'ProductionTargetDate',
        label: 'Production Target <br> Date',
        resizable: true,
        width: 125,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form remarks_icon">' +
                '<div class="remarks_calender">' +
                '<input type="text"  title="' + rowobject.ProductionTargetDate +'"  class="form-control prodtarget updatevalue prodtarget_selected_' + rowobject.RowNo + '" data-datepicker-monthyear1 data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.ProductionTargetDate + '">' +
                '<span data-toggle="modal" data-target="#remarks_pop_"><i class="fas fa-calendar text-info"></i></span>' +
                '</div>' +
                '<span data-toggle="modal" data-valid="prodtargetremarks_selected_" data-rowno="' + rowobject.RowNo + '" data-columnname="ProductionTargetRemarks" data-datecolumn="ProductionTargetDate" class="openremarksmodel"><i class="fas fa-info-circle text-primary"></i></span>' +
                '</div>' +
                '<span class="text-danger _hide errortext valid text-wrap prodtargetremarks_selected_' + rowobject.RowNo + '_valid">Please enter Remarks</span>';
        }
    },
    {
        name: 'TTDTargetCommentId',
        label: 'TTD Target Comments',
        resizable: true,
        width: 150,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form ">' +
                '<div style="display:flex;">' +
                '<select class="form-control ttdcomments updatevalue ttdcomments_selected_' + rowobject.RowNo + '" data-singleselect data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.TTDTargetCommentId + '">' +
                '<option value="0">Select</option>' +
                '</select > ' +
                '<span class="historydetails _hide ttdcommentshistory_' + rowobject.RowNo + '" data-toggle="modal" data-rowno="' + rowobject.RowNo + '" data-columnname="TTD Target Comments"><i class="fas fa-history ml-2 mr-1 mt-2 text-danger"></i></span>' +
                '</div>' +
                '</div>';
        }
    },
    {
        name: 'ProductionTargetCommentId',
        label: 'Production Target Comments',
        resizable: true,
        width: 160,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form">' +
                '<div style="display:flex;">' +
                '<select class="form-control prodcomments updatevalue prodtargetcomments_selected_' + rowobject.RowNo + '" data-singleselect data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.ProductionTargetCommentId + '">' +
                '<option value="0">Select</option>' +
                '</select> ' +
                '<span class="historydetails _hide productioncommentshistory_' + rowobject.RowNo + '" data-toggle="modal" data-rowno="' + rowobject.RowNo + '" data-columnname="Production Target Comments"><i class="fas fa-history ml-2 mt-2 mr-1 text-danger "></i></span>' +
                '</div>' +
                '</div>';
        }
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        width: 160,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center input_form ">' +
                '<div style="display:flex;">' +
                '<input type="text" title="' + rowobject.Remarks +'" class="form-control remarks removespaces updatevalue remarks_selected_' + rowobject.RowNo + '"  data-lineno="' + rowobject.RowNo + '" data-name="' + options.colModel.name + '" value="' + rowobject.Remarks + '">' +
                '<span class="historydetails _hide remarkshistory_' + rowobject.RowNo + '" data-toggle="modal" data-rowno="' + rowobject.RowNo + '" data-columnname="Remarks"><i class="fas fa-history ml-2 mr-1 mt-2 text-danger "></i></span>' +
                '</div>' +
                '</div>' +
                '<div class="text-center"><span class="text-danger _hide errortext valid text-wrap remarks_selected_' + rowobject.RowNo + '_valid">Please enter Remarks</span></div>';
        }
    },
    {
        name: 'ActionBy',
        label: 'Last Updated By',
        resizable: true,
        width: 120,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.ActionBy == "") {
                return "";
            }
            else {
                return '<div class="text-center input_form ">' +
                    '<div style="display:flex;">' +
                    '<span style="font-size:11px !important;" class="mr-1 mt-2 actionbyselected_' + rowobject.RowNo + '">' + rowobject.ActionBy + '</span>' +
                    '<div><span class="historydetails updatedhistorydata_' + rowobject.RowNo + '" data-toggle="modal" data-rowno="' + rowobject.RowNo + '" data-columnname="ActionHistory"><i class="fas fa-history ml-2 mr-1 mt-2 text-danger "></i></span></div>' +
                    '</div>' +

                    '</div>';

            }

        }
    }
];
function createTTDGrid(data) {
    var activeData = data.filter(function (obj) {
        return obj.IsActive === true;
    });

    $.jgrid.gridUnload('#TTDDashboard_grid');
    $grid = $("#TTDDashboard_grid")
    $("#TTDDashboard_grid").jqGrid({
        url: '',
        datatype: 'local',
        frozenColumns: true,
        data: activeData,
        mtype: 'GET',
        colModel: colmodels,
        viewrecords: true,
        width: 1500,
        scroll: false,
        shrinkToFit: false,
        loadonce: true,
        pager: '#TTDDashboardpager',
        rowNum: activeData.length,
        menuIcon: true,
        menuUI: {
            tabs: ['hideCols']
        },
        dataModel: activeData,
        rowattr: function (rowData) {
            return { class: `trrowno_${rowData.RowNo}` };
        },
        resizeStop: function () {
            resizeColumnHeader.call(this);
            fixPositionsOfFrozenDivs.call(this);
            fixGboxHeight.call(this);
        },
        loadComplete: function () {
            if ($(".ui-jqgrid .frozen-bdiv").length > 0) {
                bindDropdowns();
                bindActions();
            }
        },
        gridComplete: function () {
            var objRows = $("#TTDDashboard_grid tbody tr");
            var objHeader = $("#TTDDashboard_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            $('[data-datepicker]').datepicker({
                format: 'dd/mm/yyyy',
                todayHighlight: true,
                autoclose: true
            });

            $('[data-datepicker-monthyear1]').datepicker({
                format: 'M/yyyy',
                viewMode: "months",
                minViewMode: "months",
                todayHighlight: true,
                autoclose: true
            });
        },
    });
    const scrollAmount = 100;
    $("#TTDDashboard_grid").bind("jqGridGridComplete", function () {
        const gridBdiv = $('.ui-jqgrid-bdiv')[0];

        $('#leftArrow').click(function () {
            gridBdiv.scrollLeft -= scrollAmount;
        });

        $('#rightArrow').click(function () {
            gridBdiv.scrollLeft += scrollAmount;
        });
    });
    jQuery("#TTDDashboard_grid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            { startColumnName: 'Action', numberOfColumns: 11, titleText: '' },
            { startColumnName: 'HGMLValue', numberOfColumns: 7, titleText: 'Business Value in M$' },
            { startColumnName: 'BaselineTTDDate', numberOfColumns: 4, titleText: '' },
            { startColumnName: 'TTDTargetCommentId', numberOfColumns: 2, titleText: 'Comments on timing' },
            { startColumnName: 'CommentsOnTiming', numberOfColumns: 1, titleText: '' },
        ]
    });
    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 240px)' });
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

    $(".ui-pg-table.ui-common-table.ui-paging-pager").find("tbody").find("tr").html("");

    $grid.jqGrid('navGrid', '#TTDDashboardpager', { add: false, edit: false, del: false }, {}, {}, {},
        { multipleSearch: true, overlay: 0 });
    $grid.jqGrid('navButtonAdd', '#TTDDashboardpager', {
        caption: "Filter",
        title: "Toggle Searching Toolbar",
        buttonicon: 'ui-icon-pin-s',
        onClickButton: function () {
            this.toggleToolbar();
            if ($.isFunction(this.p._complete)) {
                if ($('.ui-search-toolbar', this.grid.hDiv).is(':visible')) {
                    $('.ui-search-toolbar', this.grid.fhDiv).show();
                } else {
                    $('.ui-search-toolbar', this.grid.fhDiv).hide();
                }
                this.p._complete.call(this);
                fixPositionsOfFrozenDivs.call(this);
            }
        }
    });
    if (role.toLowerCase() == 'report viewer') {
        $('.hidelegends').hide();
        $("#TTDDashboard_grid").jqGrid('destroyFrozenColumns');
        $("#TTDDashboard_grid").jqGrid('hideCol', 'Action');
        $("#TTDDashboard_grid").jqGrid('setFrozenColumns');
    }
    $grid.jqGrid('setFrozenColumns');
    syncRowHeights();

    bindDropdowns();
    bindActions();
}
function bindDropdowns() {
    $.ajax({
        url: ROOT + "TTDDashboard/GetTTDDropdownData",
        async: false,
        type: 'GET',
        success: function (data) {
            dropdowndata = data.TTDDropDownDataList;
            populateDropdown();
        }
    })
};
function populateDropdown() {
    var dropdowns = [
        { class: '.rd', type: 'r&d' },
        { class: '.classification', type: 'classification' },
        { class: '.priority', type: 'ttdpriority' },
        { class: '.market', type: 'projhub' },
        { class: '.category', type: 'ttdcategory' },
        { class: '.subcategory', type: 'ttdsubcategory' },
        { class: '.ttdcomments', type: 'ttdtargetcomments' },
        { class: '.prodcomments', type: 'prodtargetcomments' },
    ];
    dropdowns.forEach(function (dropdown) {
        var filteredList = dropdowndata.filter(function (obj) {
            return obj.Type.trim().toLowerCase() === dropdown.type.toLowerCase();
        });
        $(dropdown.class).html("");
        var option = '<option value="0">Select</option>';
        filteredList.forEach(function (item) {
            option = option + '<option value="' + item.Value + '">' + item.Text + '</option>';
        });
        $(dropdown.class).append(option);
    });

    //var filteredList1 = dropdowndata.filter(function (obj) {
    //    return obj.Type.trim().toLowerCase() === 'projhub'
    //});

    //$('.market').multiselect('destroy');
    //$('.market').empty();
    //var multioption = '';
    //$.each(filteredList1, function (obj1, item) {
    //    multioption = multioption + '<option value="' + item.Id + '">' + item.Name + '</option>'
    //});
    //$('.market').append(multioption);

    //$("[data-multiselect]").multiselect({
    //    enableFiltering: true,
    //    includeSelectAllOption: true,
    //    enableCaseInsensitiveFiltering: true,
    //    maxHeight: 500,
    //    buttonWidth: '100%',
    //    dropUp: true
    //});

    var activedata = grid_arr_new.filter(function (obj) {
        return obj.IsActive == true;
    })
    $.each(activedata, function (i, obj) {
        var filteredList = dropdowndata.filter(function (item) {
            return item.Type.trim().toLowerCase() === "ttdsubcategory" && (item.DependOnType.trim().toLowerCase() == "ttdcategory" && item.DependOnValue == obj.CategoryId)
        });
        var tablerow = $('.trrowno_' + obj.RowNo + ' .subcategory');

        $(tablerow).html("");
        var option = '<option value="0">Select</option>';
        if (filteredList != "") {
            filteredList.forEach(function (item) {
                option = option + '<option value="' + item.Value + '">' + item.Text + '</option>';
            });
        }
        $(tablerow).append(option);
        $(".rd_selected_" + obj.RowNo).val(obj.RDId);
        $(".classification_selected_" + obj.RowNo).val(obj.ClassificationTypeId);
        $(".priority_selected_" + obj.RowNo).val(obj.PriorityTypeId);
        $(".category_selected_" + obj.RowNo).val(obj.CategoryId);
        $(".subcategory_selected_" + obj.RowNo).val(obj.SubCategoryId);
        $(".market_selected_" + obj.RowNo).val(obj.MarketTypeId);
        $(".ttdcomments_selected_" + obj.RowNo).val(obj.TTDTargetCommentId)
        $(".prodtargetcomments_selected_" + obj.RowNo).val(obj.ProductionTargetCommentId);
    });

    $('[data-singleselect]').select2();

    //$('[data-multiselect]').multiselect('refresh');
}
function bindproductnamesdropdown() {
    var prodyear = year_old;

    $.ajax({
        type: "GET",
        url: ROOT + "TTDDashboard/GetProductNamesData",
        async: false,
        success: function (response) {
            productnames_arr = [];
            productnames_arr = response;

            var productname = $("#ProdName option:selected").text();
            $("#ProdName").html("");

            var select = '<option value="">Select</option>';

            if (response != "") {
                //var yearproductdata = productnames_arr.filter(function (obj) {
                //    return parseInt(obj.ProductionTargetYear) == parseInt(prodyear);
                //})
                var seenProducts = new Set();
                var yearproductdata = $.grep(productnames_arr, function (obj) {
                    var productName = obj.ProductName;
                    var isDuplicate = seenProducts.has(productName);
                    if (!isDuplicate) {
                        seenProducts.add(productName);
                    }
                    return parseInt(obj.ProductionTargetYear) == parseInt(prodyear) && !isDuplicate;
                });
                $.each(yearproductdata, function (i, obj) {
                    if (productname === obj.ProductName) {
                        select = select + '<option value="' + obj.TTDHeaderId + '" selected>' + obj.ProductName + '</option>'
                    } else {
                        select = select + '<option value="' + obj.TTDHeaderId + '">' + obj.ProductName + '</option>'
                    }
                })
            }

            $("#ProdName").append(select);

            $('[data-singleselect]').select2();
        },
        error: function (response) {
            alert(response);
        }
    });
}
function getSavedData(response) {
    $.each(response, function (i, obj) {
        grid_arr_new.unshift({
            "TTDHeaderId": obj.TTDHeaderId,
            "RowNo": obj.RowNo,
            "ProductionTargetYear": obj.ProductionTargetYear,
            "ProjectBriefId": obj.ProjectBriefId,
            "ProductName": obj.ProductName,
            "RDId": obj.RDId.toString(),
            "PackSizes": obj.PackSizes,
            "ClassificationTypeId": obj.ClassificationTypeId.toString(),
            "PriorityTypeId": obj.PriorityTypeId.toString(),
            "MarketTypeId": obj.MarketTypeId.toString(),
            "CategoryId": obj.CategoryId.toString(),
            "SubCategoryId": obj.SubCategoryId.toString(),
            "BriefAcceptedDate": obj.BriefAcceptedDate,
            //"HGMLValue": obj.HGMLValue,
            //"APACValue": obj.APACValue,
            //"EuropeValue": obj.EuropeValue,
            //"HUSAValue": obj.HUSAValue,
            //"IndiaValue": obj.IndiaValue,
            //"METAPValue": obj.METAPValue,
            "BusinessValueYear1": obj.BusinessValueYear1,
            "BusinessValueYear2": obj.BusinessValueYear2,
            "BaselineTTDDate": obj.BaselineTTDDate,
            "BaselineTTDRemarks": obj.BaselineTTDRemarks,
            "BaselineProductionDate": obj.BaselineProductionDate,
            "BaselineProductionRemarks": obj.BaselineProductionRemarks,
            "TTDTargetDate": obj.TTDTargetDate,
            "TTDTargetRemarks": obj.TTDTargetRemarks,
            "ProductionTargetDate": obj.ProductionTargetDate,
            "ProductionTargetRemarks": obj.ProductionTargetRemarks,
            "TTDTargetCommentId": obj.TTDTargetCommentId.toString(),
            "ProductionTargetCommentId": obj.ProductionTargetCommentId.toString(),
            "Remarks": obj.Remarks,
            "ActionBy": obj.ActionBy,
            "IsEdit": false,
            "IsNew": false,
            "IsActive": obj.IsActive,
            "IsChanged": false,
            "IsTTDComment": obj.IsTTDComment,
            "IsProductionComment": obj.IsProductionComment,
            "IsRemarks": obj.IsRemarks,
            "BaselineTTDRemarks_HasRemarks": false,
            "BaselineProductionRemarks_HasRemarks": false,
            "TTDTargetRemarks_HasRemarks": false,
            "ProductionTargetRemarks_HasRemarks": false,
            "LoginId":obj.LoginId
        });
    })
}
function getGridData() {
    var count = grid_arr_new.length > 0 ? 1 : 10;
    if (role.toLowerCase() == 'report viewer') {
        count = 0;

    }

    while (count > 0) {
        var maxNumber = 0
        if (grid_arr_new.length === 0) {
            maxNumber = maxNumber + 1
        }
        else {
            var ids = grid_arr_new.map(function (object) {
                return object.RowNo;
            });
            var max = Math.max(...ids);
            maxNumber = max + 1;
        }
        grid_arr_new.unshift({
            "TTDHeaderId": "",
            "RowNo": maxNumber,
            "ProductionTargetYear": year_old,
            "ProjectBriefId": "",
            "ProductName": "",
            "RDId": "0",
            "PackSizes": "",
            "ClassificationTypeId": "0",
            "PriorityTypeId": "0",
            "MarketTypeId": "0",
            "CategoryId": "0",
            "SubCategoryId": "0",
            "BriefAcceptedDate": "",
            //"HGMLValue": "",
            //"APACValue": "",
            //"EuropeValue": "",
            //"HUSAValue": "",
            //"IndiaValue": "",
            //"METAPValue": "",
            "BusinessValueYear1": "",
            "BusinessValueYear2": "",
            "BaselineTTDDate": "",
            "BaselineTTDRemarks": "",
            "BaselineProductionDate": "",
            "BaselineProductionRemarks": "",
            "TTDTargetDate": "",
            "TTDTargetRemarks": "",
            "ProductionTargetDate": "",
            "ProductionTargetRemarks": "",
            "TTDTargetCommentId": "0",
            "ProductionTargetCommentId": "0",
            "Remarks": "",
            "ActionBy": "",
            "IsEdit": true,
            "IsNew": true,
            "IsActive": true,
            "IsChanged": false,
            "IsTTDComment": false,
            "IsProductionComment": false,
            "IsRemarks": false,
            "BaselineTTDRemarks_HasRemarks": false,
            "BaselineProductionRemarks_HasRemarks": false,
            "TTDTargetRemarks_HasRemarks": false,
            "ProductionTargetRemarks_HasRemarks": false,
            "LoginId": ""

        });
        count--;
    }

    if (role.toLowerCase() == 'report viewer') {
        $(".viewbtn").hide();
    } else {
        $(".viewbtn").show();
    }
}
$(document).off('click', '#btnsearch').on('click', '#btnsearch', function () {

    var isChanged = validatechangeddata(grid_arr_new);
    if (isChanged) {
        confirmSearch("There are unsaved changes, Are you sure you want to continue ?", function () {
            var prodyear = $('#ProdYear').val();
            var prodname = $('#ProdName option:selected').text();
            year_old = $('#ProdYear').val()
            prod_old = $('#ProdName').val()
            prodname = prodname === "Select" ? '' : prodname
            $.ajax({
                type: "GET",
                url: ROOT + "TTDDashboard/GetTTDData",
                data: { prodyear: prodyear, product: prodname },
                async: false,
                success: function (response) {
                    grid_arr_new = [];
                    if (response != "") {
                        if (response.length > 0) {
                            getSavedData(response);
                        }
                    }
                    getGridData();
                    grid_arr = structuredClone(grid_arr_new);
                    createTTDGrid(grid_arr_new);
                    bindproductnamesdropdown();
                    binddateremarksdata();
                },
                error: function (response) {
                    alert(response);
                }
            });
        },
            function () {
                $('#ProdYear').val(year_old)
                $('#ProdName').val(prod_old).trigger('change');

            });
    }
    else {
        var prodyear = $('#ProdYear').val();
        var prodname = $('#ProdName option:selected').text();
        prodname = prodname === "Select" ? '' : prodname
        year_old = $('#ProdYear').val()
        prod_old = $('#ProdName').val()
        $.ajax({
            type: "GET",
            url: ROOT + "TTDDashboard/GetTTDData",
            data: { prodyear: prodyear, product: prodname },
            async: false,
            success: function (response) {
                grid_arr_new = [];
                if (response != "") {
                    if (response.length > 0) {
                        getSavedData(response);
                    }
                }
                getGridData();
                grid_arr = structuredClone(grid_arr_new);
                createTTDGrid(grid_arr_new);
                bindproductnamesdropdown();
                binddateremarksdata();
            },
            error: function (response) {
                alert(response);
            }
        });
    }
});
$(document).off('click', '#btnrefresh').on('click', '#btnrefresh', function () {

    var isChanged = validatechangeddata(grid_arr_new);
    if (isChanged) {
        confirm("There are unsaved changes, Are you sure you want to refresh ?", function () {

            var date = new Date();
            var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            $('#ProdYear').datepicker('destroy')
            $('#ProdYear').datepicker({
                format: 'yyyy',
                viewMode: "years",
                minViewMode: "years",
                todayHighlight: true,
                autoclose: true,
                endDate: (new Date().getFullYear() + 1).toString()
            });
            $('#ProdYear').datepicker('setDate', today);

            $('#ProdName').val('').trigger('change');

            grid_arr_new = [];

            $('#btnsearch').trigger('click');
        });
    }
    else {
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        $('#ProdYear').datepicker('destroy')
        $('#ProdYear').datepicker({
            format: 'yyyy',
            viewMode: "years",
            minViewMode: "years",
            todayHighlight: true,
            autoclose: true,
            endDate: (new Date().getFullYear() + 1).toString()
        });
        $('#ProdYear').datepicker('setDate', today);

        $('#ProdName').val('').trigger('change');

        grid_arr_new = [];

        $('#btnsearch').trigger('click');
    }
});
$(document).off('click', '#addbtn').on('click', '#addbtn', function () {
    var maxNumber = 0
    if (grid_arr_new.length === 0) {
        maxNumber = maxNumber + 1
    }
    else {
        var ids = grid_arr_new.map(function (object) {
            return object.RowNo;
        });
        var max = Math.max(...ids);
        maxNumber = max + 1;
    }
    grid_arr_new.unshift({
        "TTDHeaderId": "",
        "RowNo": maxNumber,
        "ProductionTargetYear": year_old,
        "ProjectBriefId": "",
        "ProductName": "",
        "RDId": "0",
        "PackSizes": "",
        "ClassificationTypeId": "0",
        "PriorityTypeId": "0",
        "MarketTypeId": "0",
        "CategoryId": "0",
        "SubCategoryId": "0",
        "BriefAcceptedDate": "",
        //"HGMLValue": "",
        //"APACValue": "",
        //"EuropeValue": "",
        //"HUSAValue": "",
        //"IndiaValue": "",
        //"METAPValue": "",
        "BusinessValueYear1": "",
        "BusinessValueYear2": "",
        "BaselineTTDDate": "",
        "BaselineTTDRemarks": "",
        "BaselineProductionDate": "",
        "BaselineProductionRemarks": "",
        "TTDTargetDate": "",
        "TTDTargetRemarks": "",
        "ProductionTargetDate": "",
        "ProductionTargetRemarks": "",
        "TTDTargetCommentId": "0",
        "ProductionTargetCommentId": "0",
        "Remarks": "",
        "ActionBy": "",
        "IsEdit": true,
        "IsNew": true,
        "IsActive": true,
        "IsChanged": false,
        "IsTTDComment": false,
        "IsProductionComment": false,
        "IsRemarks": false,
        "BaselineTTDRemarks_HasRemarks": false,
        "BaselineProductionRemarks_HasRemarks": false,
        "TTDTargetRemarks_HasRemarks": false,
        "ProductionTargetRemarks_HasRemarks": false,
        "LoginId":""
    });
    var newindex = grid_arr_new.findIndex(function (obj) {
        return obj.RowNo == maxNumber
    })
    grid_arr.unshift(structuredClone(grid_arr_new[newindex]));
    createTTDGrid(grid_arr_new)
});
function bindActions() {
    var activeData = grid_arr_new.filter(function (obj) {
        return obj.IsActive === true;
    })
    $.each(activeData, function (i, obj) {
        if (obj.IsEdit == true) {
            if (obj.IsNew == true) {
                $('.deleterow_' + obj.RowNo).removeClass('_hide');
                $('.editrow_' + obj.RowNo).addClass('_hide');
                $('.cancelrow_' + obj.RowNo).addClass('_hide');
                $('.saverow_' + obj.RowNo).addClass('_hide');

            } else {
                $('.deleterow_' + obj.RowNo).removeClass('_hide');
                $('.editrow_' + obj.RowNo).addClass('_hide');
                $('.cancelrow_' + obj.RowNo).removeClass('_hide');
                $('.saverow_' + obj.RowNo).removeClass('_hide');
            }

            $('.trrowno_' + obj.RowNo + ' .form-control').attr("disabled", false);
            //$('.trrowno_' + obj.RowNo + ' .multiselect').attr("disabled", false);
        } else {
            $('.deleterow_' + obj.RowNo).removeClass('_hide');
            $('.editrow_' + obj.RowNo).removeClass('_hide');
            $('.cancelrow_' + obj.RowNo).addClass('_hide');
            $('.saverow_' + obj.RowNo).addClass('_hide');

            $('.trrowno_' + obj.RowNo + ' .form-control').attr("disabled", true);
            //$('.trrowno_' + obj.RowNo + ' .multiselect').attr("disabled", true);

        }

        if (obj.IsTTDComment == true) {
            $('.ttdcommentshistory_' + obj.RowNo).removeClass('_hide');
        }
        if (obj.IsProductionComment == true) {
            $('.productioncommentshistory_' + obj.RowNo).removeClass('_hide');
        }
        if (obj.IsRemarks == true) {
            $('.remarkshistory_' + obj.RowNo).removeClass('_hide');
        }
    })
}
$(document).off('click', '.editrow').on('click', '.editrow', function () {
    var e = $(this);
    var rowno = parseInt($(e).data('lineno'));
    var index = grid_arr_new.findIndex(m => m.RowNo === rowno);

    if (index >= 0) {
        grid_arr_new[index].IsEdit = true;
        grid_arr[index].IsEdit = true;

        var newrow = grid_arr_new[index].IsNew;

        if (newrow == true) {
            $('.deleterow_' + rowno).removeClass('_hide');
            $('.editrow_' + rowno).addClass('_hide');
            $('.cancelrow_' + rowno).addClass('_hide');
            $('.saverow_' + rowno).addClass('_hide');

        } else {
            $('.deleterow_' + rowno).removeClass('_hide');
            $('.editrow_' + rowno).addClass('_hide');
            $('.cancelrow_' + rowno).removeClass('_hide');
            $('.saverow_' + rowno).removeClass('_hide');
        }

        $('.trrowno_' + rowno + ' .form-control').attr("disabled", false);
        //$('.trrowno_' + rowno + ' .multiselect').attr("disabled", false);

    }
});
$(document).off('click', '.cancelrow').on('click', '.cancelrow', function () {
    var e = $(this);
    var rowno = parseInt($(e).data('lineno'));
    var index = grid_arr_new.findIndex(m => m.RowNo === rowno);

    if (index >= 0) {
        grid_arr_new[index].IsEdit = false;
        grid_arr[index].IsEdit = false;

        grid_arr[index].IsChanged = false;
        grid_arr_new[index].IsChanged = false;

        var newrow = grid_arr_new[index].IsNew;

        if (newrow == true) {
            $('.deleterow_' + rowno).removeClass('_hide');
            $('.editrow_' + rowno).addClass('_hide');
            $('.cancelrow_' + rowno).addClass('_hide');
            $('.saverow_' + rowno).addClass('_hide');

        } else {
            $('.deleterow_' + rowno).removeClass('_hide');
            $('.editrow_' + rowno).removeClass('_hide');
            $('.cancelrow_' + rowno).addClass('_hide');
            $('.saverow_' + rowno).addClass('_hide');

        }
        $('.trrowno_' + rowno + ' .form-control').attr("disabled", true);
        //$('.trrowno_' + rowno + ' .multiselect').attr("disabled", true);
        $('.trrowno_' + rowno + ' .errortext').addClass("_hide");

        grid_arr_new[index] = structuredClone(grid_arr[index]);

        updateRowData(rowno);
    }
});
function updateRowData(rowno) {

    var rowdata = grid_arr_new.filter(function (obj) {
        return obj.RowNo == rowno;
    })

    var tablerow = $('.trrowno_' + rowno);

    $(tablerow).find("[data-singleselect]").select2("destroy");

    $.each(rowdata, function (i, obj) {
        var filteredList = dropdowndata.filter(function (item) {
            return item.Type.trim().toLowerCase() === "ttdsubcategory" && (item.DependOnType.trim().toLowerCase() == "ttdcategory" && item.DependOnValue == obj.CategoryId)
        });
        var subrow = $('.trrowno_' + obj.RowNo + ' .subcategory');

        $(subrow).html("");
        var option = '<option value="0">Select</option>';
        if (filteredList != "") {
            filteredList.forEach(function (item) {
                option = option + '<option value="' + item.Value + '">' + item.Text + '</option>';
            });
        }
        $(subrow).append(option);

        $(".projectbriefid_selected_" + rowno).val(obj.ProjectBriefId);
        $(".product_selected_" + rowno).val(obj.ProductName);
        $(".rd_selected_" + rowno).val(obj.RDId);
        $(".packsize_selected_" + rowno).val(obj.PackSizes);
        $(".classification_selected_" + rowno).val(obj.ClassificationTypeId);
        $(".priority_selected_" + rowno).val(obj.PriorityTypeId);
        $(".market_selected_" + rowno).val(obj.MarketTypeId);
        $(".category_selected_" + rowno).val(obj.CategoryId);
        $(".subcategory_selected_" + rowno).val(obj.SubCategoryId);
        $(".briefaccepteddate_selected_" + rowno).val(obj.BriefAcceptedDate);
        //$(".hgmlvalue_selected_" + rowno).val(obj.HGMLValue);
        //$(".apacvalue_selected_" + rowno).val(obj.APACValue);
        //$(".europevalue_selected_" + rowno).val(obj.EuropeValue);
        //$(".husavalue_selected_" + rowno).val(obj.HUSAValue);
        //$(".indiavalue_selected_" + rowno).val(obj.IndiaValue);
        //$(".metapvalue_selected_" + rowno).val(obj.METAPValue);
        $(".businessvalueyear1_selected_" + rowno).val(obj.BusinessValueYear1);
        $(".businessvalueyear1_selected_" + rowno).val(obj.BusinessValueYear2);
        $(".baselinettd_selected_" + rowno).val(obj.BaselineTTDDate);
        $(".baselineproduction_selected_" + rowno).val(obj.BaselineProductionDate);
        $(".ttdtarget_selected_" + rowno).val(obj.TTDTargetDate);
        $(".prodtarget_selected_" + rowno).val(obj.ProductionTargetDate);
        $(".ttdcomments_selected_" + rowno).val(obj.TTDTargetCommentId);
        $(".prodtargetcomments_selected_" + rowno).val(obj.ProductionTargetCommentId);
        $(".remarks_selected_" + rowno).val(obj.Remarks);

        $.each(dateremarks_arr, function (column, data) {
            var index = data.findIndex(function (item) {
                return item.IsNew == true && item.RowNo == obj.RowNo
            })
            if (index > -1) {
                dateremarks_arr[column][index].Remarks = "";
            }
        })
        //$.each(sample_data_arr, function (column, data) {
        //    dateremarks_arr[column].push({
        //        "RowNo": obj.RowNo,
        //        "Date": obj[column + "Date"],
        //        "Remarks": obj[column],
        //        "CreatedBy": obj.CreatedBy,
        //        "CreatedOn": obj.CreatedOn,
        //        "IsNew": false,
        //        "TTDLineNo": obj.TTDLineNo
        //    })
        //})
    });

    $(tablerow).find("[data-singleselect]").select2();

    //$(tablerow).find('[data-multiselect]').multiselect('refresh');
}
$(document).off('click', '.deleterow').on('click', '.deleterow', function () {
    var e = $(this);
    var rowno = parseInt($(e).data('lineno'));
    var index = grid_arr_new.findIndex(function (obj) {
        return obj.RowNo == rowno
    })
    confirm("Are you sure you want to Delete?", function () {
        $.ajax({
            url: ROOT + "TTDDashboard/DeleteTTDData",
            //async: false,
            type: 'POST',
            data: { ttdHeaderId: grid_arr_new[index].TTDHeaderId },
            success: function (result) {
                var index = grid_arr_new.findIndex(m => m.RowNo === rowno);
                if (index >= 0) {
                    grid_arr_new[index].IsActive = false;

                    grid_arr[index] = structuredClone(grid_arr_new[index]);
                }
                createTTDGrid(grid_arr_new);

                //$(".trrowno_" + rowno).html("");
                //$(".trrowno_" + rowno).hide();

                //var activeCount = grid_arr_new.filter(function (obj) {
                //    return obj.IsActive === true;
                //}).length;

                //var $pager = $("#TTDDashboardpager");
                //$pager.find('.ui-paging-info').text("View 1 - " + activeCount + " of " + activeCount);

                showAlertMessage(result, "alert-danger");
            }
        });
    });
});
$(document).off('click', '.saverow').on('click', '.saverow', function () {
    var e = $(this);
    var rowno = parseInt($(e).data('lineno'));
    var data = grid_arr_new.filter(function (obj) {
        return obj.RowNo == rowno;
    });

    var validdata = data.filter(function (obj) {
        return (obj.ProductionTargetYear != year_old || obj.ProjectBriefId != "" || obj.ProductName != "" ||
            obj.RDId != "0" || obj.PackSizes != "" || obj.PackSizes != "" || obj.ClassificationTypeId != "0" || obj.PriorityTypeId != "0" || obj.MarketTypeId != "0" ||
            obj.CategoryId != "0" || obj.SubCategoryId != "0" || obj.BriefAcceptedDate != "" ||
            //obj.HGMLValue != "" || obj.APACValue != "" || obj.EuropeValue != "" || obj.HUSAValue != "" || obj.IndiaValue != "" || obj.METAPValue != "" ||
            obj.BusinessValueYear1 != "" || obj.BusinessValueYear2 != "" || obj.BaselineTTDDate != "" || obj.BaselineTTDRemarks != "" ||
            obj.BaselineProductionDate != "" || obj.BaselineProductionRemarks != "" || obj.TTDTargetDate != "" || obj.TTDTargetRemarks != "" ||
            obj.ProductionTargetDate != "" || obj.ProductionTargetRemarks != "" || obj.TTDTargetCommentId != "0" || obj.ProductionTargetCommentId != "0" || obj.Remarks != "");
    });

    if (validdata.length > 0) {
        var isChanged = validatechangeddata(data);
        if (isChanged) {
            var isValid = validatedata(data);
            if (isValid) {
                var invalidremarksdata = data.filter(function (obj) {
                    return obj.IsChanged == true && obj.IsNew == false && obj.Remarks == "";
                })
                var productnames_arr_invalid = [];
                $.each(invalidremarksdata, function (i, obj) {
                    productnames_arr_invalid.push(obj.ProductName)
                })

                var productNames = productnames_arr_invalid.join(",")
                if (productNames == "") {
                    confirm("Are you sure you want to Save?", function () {
                        var validchangeddata = structuredClone(data.filter(function (obj) {
                            return obj.IsChanged == true;
                        })
                        );
                        $.each(validchangeddata, function (i, obj) {
                            obj.BriefAcceptedDate = convertStringDateFormat(obj.BriefAcceptedDate)
                            var oldindex = grid_arr.findIndex(function (item) {
                                return item.RowNo === obj.RowNo;
                            })
                            if ((obj.BaselineTTDDate == grid_arr[oldindex].BaselineTTDDate) && obj.BaselineTTDRemarks == grid_arr[oldindex].BaselineTTDRemarks) {
                                obj.BaselineTTDDate = ""
                                obj.BaselineTTDRemarks = ""

                            }
                            if ((obj.BaselineProductionDate == grid_arr[oldindex].BaselineProductionDate) && obj.BaselineProductionRemarks == grid_arr[oldindex].BaselineProductionRemarks) {
                                obj.BaselineProductionDate = ""
                                obj.BaselineProductionRemarks =""
                            }
                            if ((obj.TTDTargetDate == grid_arr[oldindex].TTDTargetDate) && obj.TTDTargetRemarks == grid_arr[oldindex].TTDTargetRemarks) {
                                obj.TTDTargetDate = ""
                                obj.TTDTargetRemarks = ""

                            }
                            if ((obj.ProductionTargetDate == grid_arr[oldindex].ProductionTargetDate) && obj.ProductionTargetRemarks == grid_arr[oldindex].ProductionTargetRemarks) {
                                obj.ProductionTargetDate = ""
                                obj.ProductionTargetRemarks = ""
                            }

                            if (obj.TTDTargetCommentId == grid_arr[oldindex].TTDTargetCommentId) {
                                obj.TTDTargetCommentId = 0
                            }
                            if (obj.ProductionTargetCommentId == grid_arr[oldindex].ProductionTargetCommentId) {
                                obj.ProductionTargetCommentId = 0
                            }
                            if (obj.Remarks == grid_arr[oldindex].Remarks) {
                                obj.Remarks = ""
                            }
                        })
                        var ttdDashboard = {
                            TTDData: validchangeddata
                        }
                        $.ajax({
                            url: ROOT + "TTDDashboard/SaveTTDData",
                            //async: false,
                            type: 'POST',
                            data: {
                                ttdDashboard: ttdDashboard
                            },
                            success: function (result) {
                                if (result.toLowerCase().includes("success")) {
                                    var index = grid_arr_new.findIndex(m => m.RowNo === rowno);
                                    if (index >= 0) {
                                        grid_arr_new[index].IsNew = false;
                                        grid_arr_new[index].IsEdit = false;
                                        grid_arr_new[index].IsChanged = false;

                                        var loginId = grid_arr_new[index].LoginId;
                                        grid_arr_new[index].ActionBy = loginId
                                        $('.actionbyselected_' + rowno).text(loginId);

                                        grid_arr_new[index].BaselineTTDRemarks_HasRemarks = false;
                                        grid_arr_new[index].BaselineProductionRemarks_HasRemarks = false;
                                        grid_arr_new[index].TTDTargetRemarks_HasRemarks = false;
                                        grid_arr_new[index].ProductionTargetRemarks_HasRemarks = false;

                                        grid_arr_new[index].BaselineTTDRemarks = "";
                                        grid_arr_new[index].BaselineProductionRemarks = "";
                                        grid_arr_new[index].TTDTargetRemarks = "";
                                        grid_arr_new[index].ProductionTargetRemarks = "";

                                        if (grid_arr_new[index].Remarks != "" || grid_arr[index].IsRemarks == true) {
                                            grid_arr_new[index].IsRemarks = true;
                                        }
                                        if (grid_arr_new[index].TTDTargetCommentId != 0 || grid_arr[index].IsTTDComment == true) {
                                            grid_arr_new[index].IsTTDComment = true;
                                        }
                                        if (grid_arr_new[index].ProductionTargetCommentId != 0 || grid_arr[index].IsProductionComment == true) {
                                            grid_arr_new[index].IsProductionComment = true;
                                        }

                                        grid_arr[index] = structuredClone(grid_arr_new[index]);
                                    }
                                    bindActions();
                                    bindproductnamesdropdown();
                                    binddateremarksdata();
                                    showAlertMessage(result, "alert-success");

                                } else {
                                    showAlertMessage(result, "alert-danger");
                                }
                            }
                        });
                    });
                } else {
                    alert("Please enter Remarks for the following Product : " + "<strong>" + productNames + "</strong>");
                }
            }
        } else {
            alert("There are no changes to Save");
        }
    } else {
        alert("There is no data to Save");
    }
});
$(document).off('click', '#savebtn').on('click', '#savebtn', function () {
    var activedata = grid_arr_new.filter(function (obj) {
        return obj.IsActive == true;
    })

    var validdata = activedata.filter(function (obj) {
        return (obj.ProductionTargetYear != year_old || obj.ProjectBriefId != "" || obj.ProductName != "" ||
            obj.RDId != "0" || obj.PackSizes != "" || obj.PackSizes != "" || obj.ClassificationTypeId != "0" || obj.PriorityTypeId != "0" || obj.MarketTypeId != "0" ||
            obj.CategoryId != "0" || obj.SubCategoryId != "0" || obj.BriefAcceptedDate != "" ||
            //obj.HGMLValue != "" || obj.APACValue != "" || obj.EuropeValue != "" || obj.HUSAValue != "" || obj.IndiaValue != "" || obj.METAPValue != "" ||
            obj.BusinessValueYear1 != "" || obj.BusinessValueYear2 != "" || obj.BaselineTTDDate != "" || obj.BaselineTTDRemarks != "" ||
            obj.BaselineProductionDate != "" || obj.BaselineProductionRemarks != "" || obj.TTDTargetDate != "" || obj.TTDTargetRemarks != "" ||
            obj.ProductionTargetDate != "" || obj.ProductionTargetRemarks != "" || obj.TTDTargetCommentId != "0" || obj.ProductionTargetCommentId != "0" || obj.Remarks != "");
    });

    if (validdata.length > 0) {

        var isChanged = validatechangeddata(activedata);
        if (isChanged) {
            var isValid = validatedata(activedata);
            if (isValid) {
                var invalidremarksdata = activedata.filter(function (obj) {
                    return obj.IsChanged == true && obj.IsNew == false && obj.Remarks == "";
                })
                var productnames_arr_invalid = [];
                $.each(invalidremarksdata, function (i, obj) {
                    productnames_arr_invalid.push(obj.ProductName)
                })

                var productNames = productnames_arr_invalid.join(",");

                if (productNames == "") {
                    confirm("Are you sure you want to Save?", function () {
                        var validchangeddata = structuredClone(activedata.filter(function (obj) {
                            return obj.IsChanged == true;
                        }));

                        $.each(validchangeddata, function (i, obj) {
                            obj.BriefAcceptedDate = convertStringDateFormat(obj.BriefAcceptedDate)
                            var oldindex = grid_arr.findIndex(function (item) {
                                return item.RowNo === obj.RowNo;
                            })
                            if ((obj.BaselineTTDDate == grid_arr[oldindex].BaselineTTDDate) && obj.BaselineTTDRemarks == grid_arr[oldindex].BaselineTTDRemarks) {
                                obj.BaselineTTDDate = ""
                                obj.BaselineTTDRemarks = ""

                            }
                            if ((obj.BaselineProductionDate == grid_arr[oldindex].BaselineProductionDate) && obj.BaselineProductionRemarks == grid_arr[oldindex].BaselineProductionRemarks) {
                                obj.BaselineProductionDate = ""
                                obj.BaselineProductionRemarks = ""
                            }
                            if ((obj.TTDTargetDate == grid_arr[oldindex].TTDTargetDate) && obj.TTDTargetRemarks == grid_arr[oldindex].TTDTargetRemarks) {
                                obj.TTDTargetDate = ""
                                obj.TTDTargetRemarks = ""

                            }
                            if ((obj.ProductionTargetDate == grid_arr[oldindex].ProductionTargetDate) && obj.ProductionTargetRemarks == grid_arr[oldindex].ProductionTargetRemarks) {
                                obj.ProductionTargetDate = ""
                                obj.ProductionTargetRemarks = ""
                            }
                            if (obj.TTDTargetCommentId == grid_arr[oldindex].TTDTargetCommentId) {
                                obj.TTDTargetCommentId = 0
                            }
                            if (obj.ProductionTargetCommentId == grid_arr[oldindex].ProductionTargetCommentId) {
                                obj.ProductionTargetCommentId = 0
                            }
                            if (obj.Remarks == grid_arr[oldindex].Remarks) {
                                obj.Remarks = ""
                            }
                        })

                        var ttdDashboard = {
                            TTDData: validchangeddata
                        }

                        $.ajax({
                            url: ROOT + "TTDDashboard/SaveTTDData",
                            // async: false,
                            type: 'POST',
                            data: {
                                ttdDashboard: ttdDashboard
                            },
                            success: function (result) {
                                if (result.toLowerCase().includes("success")) {
                                    grid_arr_new = [];
                                    $("#btnsearch").trigger("click");
                                    showAlertMessage(result, "alert-success");
                                } else {
                                    showAlertMessage(result, "alert-danger");
                                }
                            }
                        });
                    });
                } else {
                    alert("Please enter Remarks for the following Products : " + "<strong>" + productNames + "</strong>");
                }
            }
        } else {
            alert("There are no changes to Save");
        }
    } else {
        alert("There is no data to Save");
    }
});
function validatechangeddata(data) {
    var isChanged = false;
    $.each(data, function (index, obj) {

        if (obj.IsChanged == true) {
            isChanged = true;
        } else {
            $('.trrowno_' + obj.RowNo + ' .errortext').addClass("_hide");
        }
    })
    return isChanged;
}
function validatedata(data) {
    var isValid = true;
    var isScrolled = false;
    var changeddata = data.filter(function (obj) {
        return obj.IsChanged == true;
    })
    $.each(changeddata, function (i, obj) {

        var projectbriefidvalue = obj.ProjectBriefId;
        //var projectbriefidformat = new RegExp('^(PB' + '\\d{6}|NA)$', 'i');
        var projectbriefidformat = new RegExp('^(PB' + '\\d{6}|NA)$');

        if (projectbriefidformat.test(projectbriefidvalue) || projectbriefidvalue == "") {
            $('.projectbrief_selected_' + obj.RowNo + '_valid').addClass('_hide');
        }
        else {
            isValid = false;
            $('.projectbrief_selected_' + obj.RowNo + '_valid').removeClass('_hide');
        }

        var productvalue = obj.ProductName;
        var marketvalue = obj.MarketTypeId;
        var indexforvalidation = -1;
        var indexforvalidation = grid_arr.findIndex(function (obj1) {
            return obj1.RowNo == obj.RowNo && obj.IsChanged == true;
        });
        var rowdata = data.filter(function (item) {
            return item.RowNo == obj.RowNo;
        })
        var rowdataindex = rowdata.findIndex(function (obj) {
            return obj.IsChanged == true;
        })


        if ((productvalue === "" || productvalue === null) && rowdataindex > -1) {
            isValid = false;
            $('.product_selected_' + obj.RowNo + '_valid').removeClass('_hide');
        } else {
            var prodyear = year_old;
            var productnamesnotcurrentyear_arr = productnames_arr.filter(function (item) {
                return parseInt(item.ProductionTargetYear) != parseInt(prodyear)
            })

            var gridproductnames_arr = [];
            var activedata = grid_arr_new.filter(function (obj1) {
                return obj1.IsActive == true;
            })
            activedata = structuredClone(activedata).reverse();
            $.each(activedata, function (i, obj1) {
                if (obj1.ProductName != "" && obj1.ProductName != null) {
                    var index = gridproductnames_arr.findIndex(function (item) {
                        return obj1.ProductName.toLowerCase() === item.ProductName.toLowerCase() && obj1.RowNo == item.RowNo;
                    });
                    if (index == -1) {
                        gridproductnames_arr.push({
                            "RowNo": obj1.RowNo,
                            "ProductName": obj1.ProductName
                        });
                    }
                }

            });
            var productindex = productnamesnotcurrentyear_arr.findIndex(function (item) {
                return item.ProductName.trim().toLowerCase() == productvalue.trim().toLowerCase();
            });
            var productgridindex = gridproductnames_arr.findIndex(function (item) {
                return item.ProductName.trim().toLowerCase() == productvalue.trim().toLowerCase() && parseInt(item.RowNo) != parseInt(obj.RowNo);
            });

            if (productindex > -1 || productgridindex > -1) {
                if (marketvalue == "" || marketvalue == "0") {
                    isValid = false;
                    $('.market_selected_' + obj.RowNo + '_valid').removeClass('_hide');
                    if (!isScrolled) {
                        scrollToColumn("MarketTypeId");
                        scrollToRow(obj.RowNo);
                        isScrolled = true
                    }
                } else {
                    $('.market_selected_' + obj.RowNo + '_valid').addClass('_hide');
                }

            } else {
                $('.product_selected_' + obj.RowNo + '_valid').addClass('_hide');
                $('.market_selected_' + obj.RowNo + '_valid').addClass('_hide');
            }
        }

        if (obj.IsNew == false) {

            if (rowdataindex > -1) {
                var old_baselinettddate = grid_arr[indexforvalidation].BaselineTTDDate;
                var new_baselinettdate = obj.BaselineTTDDate;
                var baselinettdremarks = obj.BaselineTTDRemarks;
                if (old_baselinettddate != new_baselinettdate) {
                    if ((baselinettdremarks == "" || baselinettdremarks == null) && rowdataindex > -1) {
                        isValid = false;
                        $('.baselinettdremarks_selected_' + obj.RowNo + '_valid').removeClass('_hide');
                        if (!isScrolled) {
                            scrollToColumn("BaselineTTDDate");
                            scrollToRow(obj.RowNo);
                            isScrolled = true
                        }

                    } else {
                        $('.baselinettdremarks_selected_' + obj.RowNo + '_valid').addClass('_hide');
                    }

                } else {
                    $('.baselinettdremarks_selected_' + obj.RowNo + '_valid').addClass('_hide');
                }

                var old_baselineproductiondate = grid_arr[indexforvalidation].BaselineProductionDate;
                var new_baselineproductiondate = obj.BaselineProductionDate;
                var baselineproductionremarks = obj.BaselineProductionRemarks;
                if (old_baselineproductiondate != new_baselineproductiondate) {
                    if ((baselineproductionremarks == "" || baselineproductionremarks == null) && rowdataindex > -1) {
                        isValid = false;
                        $('.baselineproductionremarks_selected_' + obj.RowNo + '_valid').removeClass('_hide');
                        if (!isScrolled) {
                            scrollToColumn("BaselineProductionDate");
                            scrollToRow(obj.RowNo);
                            isScrolled = true
                        }
                    } else {
                        $('.baselineproductionremarks_selected_' + obj.RowNo + '_valid').addClass('_hide');
                    }
                } else {
                    $('.baselineproductionremarks_selected_' + obj.RowNo + '_valid').addClass('_hide');
                }

                var old_ttdtargetdate = grid_arr[indexforvalidation].TTDTargetDate;
                var new_ttdtargetdate = obj.TTDTargetDate;
                var ttdtargetremarks = obj.TTDTargetRemarks;
                if (old_ttdtargetdate != new_ttdtargetdate) {
                    if ((ttdtargetremarks == "" || ttdtargetremarks == null) && rowdataindex > -1) {
                        isValid = false;
                        $('.ttdtargetremarks_selected_' + obj.RowNo + '_valid').removeClass('_hide');
                        if (!isScrolled) {
                            scrollToColumn("TTDTargetDate");
                            scrollToRow(obj.RowNo);
                            isScrolled = true
                        }

                    } else {
                        $('.ttdtargetremarks_selected_' + obj.RowNo + '_valid').addClass('_hide');
                    }

                } else {
                    $('.ttdtargetremarks_selected_' + obj.RowNo + '_valid').addClass('_hide');
                }

                var old_productiontargetdate = grid_arr[indexforvalidation].ProductionTargetDate;
                var new_productiontargetdate = obj.ProductionTargetDate;
                var productiontargetremarks = obj.ProductionTargetRemarks;
                if (old_productiontargetdate != new_productiontargetdate) {
                    if ((productiontargetremarks == "" || productiontargetremarks == null) && rowdataindex > -1) {
                        isValid = false;
                        $('.prodtargetremarks_selected_' + obj.RowNo + '_valid').removeClass('_hide');
                        if (!isScrolled) {
                            scrollToColumn("ProductionTargetDate");
                            scrollToRow(obj.RowNo);
                            isScrolled = true
                        }
                    } else {
                        $('.prodtargetremarks_selected_' + obj.RowNo + '_valid').addClass('_hide');
                    }
                } else {
                    $('.prodtargetremarks_selected_' + obj.RowNo + '_valid').addClass('_hide');
                }

                var remarksvalue = obj.Remarks;
                if ((remarksvalue == "" || remarksvalue == null) && rowdataindex > -1) {
                    $('.remarks_selected_' + obj.RowNo + '_valid').removeClass('_hide');
                    if (!isScrolled) {
                        scrollToColumn("Remarks");
                        scrollToRow(obj.RowNo);
                        isScrolled = true
                    }

                } else {
                    $('.remarks_selected_' + obj.RowNo + '_valid').addClass('_hide');
                }
            }
        }

    })
    syncRowHeights();
    return isValid;
}
function convertStringDateFormat(dateStr) {
    if (dateStr === "" || dateStr == null) {
        return ""
    } else {
        var parts = dateStr.split('/');
        var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
        return formattedDate;
    }
}
$(document).on('change', '.updatevalue', function () {
    updateGridArray(this);
});

$(document).on('change', '.product', function () {
    var e = $(this);
    var value = $(this).val()
    var rowno = parseInt($(e).data('lineno'));

    var rowdata = grid_arr_new.filter(function (item) {
        return item.RowNo == rowno;
    })
    var rowdataindex = rowdata.findIndex(function (obj) {
        return obj.IsChanged == true;
    })

    if ((value === "" || value === null) && rowdataindex > -1) {
        $('.product_selected_' + rowno + '_valid').removeClass('_hide');
    } else {
        $('.product_selected_' + rowno + '_valid').addClass('_hide');
    }
});
$(document).on('change', '.prodmarket', function () {
    var e = $(this);
    var rowno = parseInt($(e).data('lineno'));
    var name = $(e).data('name');
    var gridarrindex = grid_arr_new.findIndex(function (item) {
        return item.RowNo == rowno;
    });
    var rowdata = grid_arr_new.filter(function (item) {
        return item.RowNo == rowno;
    })

    var productvalue = grid_arr_new[gridarrindex].ProductName;
    var marketvalue = grid_arr_new[gridarrindex].MarketTypeId;

    var rowdataindex = rowdata.findIndex(function (obj) {
        return obj.IsChanged == true && obj.RowNo == rowno;
    })

    if (!((productvalue === "" || productvalue === null) && rowdataindex > -1)) {
        var prodyear = year_old;
        var productnamesnotcurrentyear_arr = productnames_arr.filter(function (item) {
            return parseInt(item.ProductionTargetYear) != parseInt(prodyear)
        })

        var gridproductnames_arr = [];
        var activedata = grid_arr_new.filter(function (obj1) {
            return obj1.IsActive == true;
        })
        $.each(activedata, function (i, obj1) {
            if (obj1.ProductName != "" && obj1.ProductName != null) {
                var index = gridproductnames_arr.findIndex(function (item) {
                    return obj1.ProductName.toLowerCase() === item.ProductName.toLowerCase() && obj1.RowNo == item.RowNo;
                });
                if (index == -1) {
                    gridproductnames_arr.push({
                        "RowNo": obj1.RowNo,
                        "ProductName": obj1.ProductName,
                        "MarketTypeId": obj1.MarketTypeId
                    });
                }
            }
        });
        var prodindex = productnamesnotcurrentyear_arr.findIndex(function (obj) {
            return obj.ProductName.trim().toLowerCase() == productvalue.trim().toLowerCase() && obj.MarketTypeId == marketvalue
        });
        var productgridindex = gridproductnames_arr.findIndex(function (item) {
            return item.ProductName.trim().toLowerCase() == productvalue.trim().toLowerCase() && item.MarketTypeId == marketvalue && parseInt(item.RowNo) != rowno;
        });
        if (marketvalue != '' && marketvalue != '0') {
            if (prodindex > -1 || productgridindex > -1) {

                alert('Product and Market Combination already exists');

                if (name == "ProductName") {
                    grid_arr_new[gridarrindex].ProductName = grid_arr[gridarrindex].ProductName;
                    $(".product_selected_" + rowno).val(grid_arr[gridarrindex].ProductName);
                } else {
                    $('.trrowno_' + rowno).find(".market").select2("destroy");

                    grid_arr_new[gridarrindex].MarketTypeId = "0";
                    $(".market_selected_" + rowno).val("0");
                    $('.trrowno_' + rowno).find(".market").select2();
                }
                updateIsChanged(rowno);
            }
        }

    }
    $('.market_selected_' + rowno + '_valid').addClass('_hide');
});
$(document).on('change', '.projectbriefid', function () {
    var e = $(this);
    var value = $(this).val()
    var rowno = parseInt($(e).data('lineno'));
    //var format = new RegExp('^(PB' + '\\d{6}|NA)$', 'i');
    var format = new RegExp('^(PB' + '\\d{6}|NA)$');

    if (format.test(value) || value === "") {
        $('.projectbrief_selected_' + rowno + '_valid').addClass('_hide');
    } else {
        $('.projectbrief_selected_' + rowno + '_valid').removeClass('_hide');
    }
});
$(document).on('change', '.category', function () {
    var e = $(this);
    var value = $(this).val()
    var rowno = parseInt($(e).data('lineno'));

    var filteredList = dropdowndata.filter(function (item) {
        return item.Type.trim().toLowerCase() === "ttdsubcategory" && (item.DependOnType.trim().toLowerCase() == "ttdcategory" && item.DependOnValue == value)
    });
    var subrow = $('.trrowno_' + rowno + ' .subcategory');

    $(subrow).html("");
    var option = '<option value="0">Select</option>';
    if (filteredList != "") {
        filteredList.forEach(function (item) {
            option = option + '<option value="' + item.Value + '">' + item.Text + '</option>';
        });
    }
    $(subrow).append(option);
    $(subrow).select2();

    var index = grid_arr_new.findIndex(function (obj) {
        return obj.RowNo == rowno
    })
    grid_arr_new[index].SubCategoryId = "0";

    updateIsChanged(rowno);
});
$(document).on('change', '.remarks', function () {
    var e = $(this);
    var value = $(this).val()
    var rowno = parseInt($(e).data('lineno'));

    var rowdata = grid_arr_new.filter(function (item) {
        return item.RowNo == rowno;
    })
    var rowdataindex = rowdata.findIndex(function (obj) {
        return obj.IsChanged == true && obj.IsNew == false;
    })

    if ((value === "" || value === null) && rowdataindex > -1) {
        $('.remarks_selected_' + rowno + '_valid').removeClass('_hide');
    } else {
        $('.remarks_selected_' + rowno + '_valid').addClass('_hide');
    }
});
$(document).on('change', '.form-control', function () {
    syncRowHeights();
})

//function calculatetotal(rowno) {
//    var index = grid_arr_new.findIndex(function (obj) {
//        return obj.RowNo == rowno
//    })

//    var businessvalue = ((grid_arr_new[index].HGMLValue != "" ? parseFloat(grid_arr_new[index].HGMLValue) : 0) +
//        (grid_arr_new[index].APACValue != "" ? parseFloat(grid_arr_new[index].APACValue) : 0) +
//        (grid_arr_new[index].EuropeValue != "" ? parseFloat(grid_arr_new[index].EuropeValue) : 0) +
//        (grid_arr_new[index].HUSAValue != "" ? parseFloat(grid_arr_new[index].HUSAValue) : 0) +
//        (grid_arr_new[index].IndiaValue != "" ? parseFloat(grid_arr_new[index].IndiaValue) : 0) +
//        (grid_arr_new[index].METAPValue != "" ? parseFloat(grid_arr_new[index].METAPValue) : 0));

//    return businessvalue;
//}
//$(document).on('change', '.businessvalue', function () {
//    var e = $(this);
//    var value = $(this).val() > 0 ? parseFloat($(this).val()) : 0
//    var rowno = parseInt($(e).data('lineno'));

//    var total = calculatetotal(rowno);
//    total = total >= 0 ? parseFloat(total).toFixed(2) : "";
//    var index = grid_arr_new.findIndex(m => m.RowNo === rowno);
//    if (index >= 0) {
//        grid_arr_new[index].TotalBusinessValue = total;

//    }
//    $('.businessvalue_selected_' + rowno).val(total);
//});

$('body').on('input', '.removespaces', function () {
    this.value = this.value.replace(/\s+/g, ' ').replace(/^\s+/, '');
});
$('body').on('input', '.removespecials', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
});
$('body').on('input', '.onlydecimal', function () {
    this.value = this.value.replace(/[^0-9.]/g, '');
    this.value = this.value.replace(/^0+(\d)/, '$1');
});
$('body').on('change', '.onlydecimal', function () {
    if (this.value != "") {
        this.value = parseFloat(this.value).toFixed(2);
    } else {
        this.value = ""
    }
});
function updateGridArray(element) {
    var e = $(element);
    var rowno = parseInt($(e).data('lineno'));
    var name = $(e).data('name');

    var value = "";
    value = $(e).val().replace(/^\s+/g, '').trim()

    var index = grid_arr_new.findIndex(m => m.RowNo === rowno);
    if (index >= 0) {
        grid_arr_new[index][name] = value;
    }
    var newdata = grid_arr_new.filter(function (obj) {
        return obj.RowNo == rowno;
    });
    updateIsChanged(rowno);
}
function updateIsChanged(rowno) {
    var rowno = parseInt(rowno);
    var index = grid_arr_new.findIndex(m => m.RowNo === rowno);
    var newdata = grid_arr_new.filter(function (obj) {
        return obj.RowNo == rowno;
    });

    var isChanged = false;
    $.each(newdata, function (i, obj) {
        isChanged = false
        var oldindex = grid_arr.findIndex(function (item) {
            return obj.RowNo == item.RowNo;
        })

        const olddata = grid_arr[oldindex];

        for (const key in obj) {
            if (olddata[key] !== obj[key]) {
                isChanged = true;
            }
        }
        grid_arr_new[index].IsChanged = isChanged;
        grid_arr[index].IsChanged = isChanged;
    })
    if (!isChanged) {
        $('.trrowno_' + rowno + ' .errortext').addClass("_hide");
    }
}
resizeColumnHeader = function () {
    var rowHight, resizeSpanHeight,
        headerRow = $(this).closest("div.ui-jqgrid-view")
            .find("table.ui-jqgrid-htable>thead>tr.ui-jqgrid-labels");
    rowHight = headerRow.height();
    headerRow.find("div.ui-jqgrid-sortable").each(function () {
        var ts = $(this);
        ts.css('top', (rowHight - ts.outerHeight()) / 2 + 'px');
    });
};
fixPositionsOfFrozenDivs = function () {
    var $rows;
    if (typeof this.grid.fbDiv !== "undefined") {
        $rows = $('>div>table.ui-jqgrid-btable>tbody>tr', this.grid.bDiv);
        $('>table.ui-jqgrid-btable>tbody>tr', this.grid.fbDiv).each(function (i) {
            var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
            if ($(this).hasClass("jqgrow")) {
                $(this).height(rowHight);
                rowHightFrozen = $(this).height();
                if (rowHight !== rowHightFrozen) {
                    $(this).height(rowHight + (rowHight - rowHightFrozen));
                }
            }
        });
        $(this.grid.fbDiv).height(this.grid.bDiv.clientHeight);
        $(this.grid.fbDiv).css($(this.grid.bDiv).position());

    }
    if (typeof this.grid.fhDiv !== "undefined") {
        $rows = $('>div>table.ui-jqgrid-htable>thead>tr', this.grid.hDiv);
        $('>table.ui-jqgrid-htable>thead>tr', this.grid.fhDiv).each(function (i) {
            var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
            $(this).height(rowHight);
            rowHightFrozen = $(this).height();
            if (rowHight !== rowHightFrozen) {
                $(this).height(rowHight + (rowHight - rowHightFrozen));
            }
        });
        $(this.grid.fhDiv).height(this.grid.hDiv.clientHeight);
        $(this.grid.fhDiv).css($(this.grid.hDiv).position());
    }
};
fixGboxHeight = function () {
    var gviewHeight = $("#gview_" + $.jgrid.jqID(this.id)).outerHeight(),
        pagerHeight = $(this.p.pager).outerHeight();

    $("#gbox_" + $.jgrid.jqID(this.id)).height(gviewHeight + pagerHeight);
    gviewHeight = $("#gview_" + $.jgrid.jqID(this.id)).outerHeight();
    pagerHeight = $(this.p.pager).outerHeight();
    $("#gbox_" + $.jgrid.jqID(this.id)).height(gviewHeight + pagerHeight);
};
function syncRowHeights() {
    var mainGridId = $grid.attr('id');
    var frozenGridId = mainGridId + '_frozen';
    var mainRows = $grid.find('.jqgrow');

    mainRows.each(function () {
        var rowId = this.id;
        var frozenRow = $('#' + frozenGridId).find('#' + rowId);

        if (frozenRow.length) {
            var mainHeight = $(this).outerHeight();
            var frozenHeight = frozenRow.outerHeight();
            //var maxHeight = Math.max(mainHeight, frozenHeight);

            frozenRow[0].style.setProperty('height', mainHeight + 'px', 'important');
        } else {
            console.warn(`Row with ID ${rowId} not found in frozen grid (${frozenGridId})`);
        }
    });
}

function getResponsiveWidth() {
    var windowWidth = $(window).width();
    if (windowWidth > 1800) {
        return 200;
    } else if (windowWidth > 1300) {
        return 165;
    } else if (windowWidth > 1200) {
        return 125;
    } else if (windowWidth > 768) {
        return 50;
    } else {
        return 30;
    }
};
function scrollToColumn(columnName) {
    const gridBdiv = $('.ui-jqgrid-bdiv')[0];

    const $column = $('td[aria-describedby="TTDDashboard_grid_' + columnName + '"]:first');
    if ($column.length === 0) {
        return;
    }

    const columnOffset = $column.position().left;
    const containerWidth = $(gridBdiv).width();

    const targetScrollLeft = columnOffset - containerWidth * 0.66; // 61% to the left

    const currentScrollLeft = gridBdiv.scrollLeft;
    const scrollableWidth = $(gridBdiv).prop('scrollWidth') - containerWidth;

    let newScrollLeft = targetScrollLeft;

    if (newScrollLeft < 0) {
        newScrollLeft = 0;
    }

    if (newScrollLeft > scrollableWidth) {
        newScrollLeft = scrollableWidth;
    }

    $(gridBdiv).animate({
        scrollLeft: newScrollLeft
    }, 500);
}
function scrollToRow(rowno) {
    const gridBdiv = $('.ui-jqgrid-bdiv')[0];
    const $targetRow = $('.trrowno_' + rowno);

    if ($targetRow.length === 0) {
        console.error("Row not found:", rowno);
        return;
    }

    const rowOffset = $targetRow.position().top + gridBdiv.scrollTop;
    const containerHeight = $(gridBdiv).height();

    $(gridBdiv).animate({
        scrollTop: rowOffset - containerHeight / 2
    }, 500);
}
function showAlertMessage(message, alertClass) {
    $('#alertText').text(message);
    $('#alertMessage').removeClass().addClass('alert ' + alertClass);
    $('#alertMessage').show();
    setTimeout(function () {
        $('#alertMessage').hide();
    }, 3000);
}
function binddateremarksdata() {
    dateremarks_arr = ({
        "BaselineTTDRemarks": [],
        "BaselineProductionRemarks": [],
        "TTDTargetRemarks": [],
        "ProductionTargetRemarks": []
    })
    $.each(grid_arr_new, function (i, obj) {
        $.each(dateremarks_arr, function (column, data) {
            if (obj[column] == grid_arr[i][column]) {
                dateremarks_arr[column].push({
                    "RowNo": obj.RowNo,
                    "Date": "",
                    "Remarks": "",
                    "CreatedBy": "",
                    "CreatedOn": "",
                    "IsNew": true,
                    "TTDLineNo":0
                })
            }
            else {
                dateremarks_arr[column].push({
                    "RowNo": obj.RowNo,
                    "Date": "",
                    "Remarks":obj[column],
                    "CreatedBy": "",
                    "CreatedOn": "",
                    "IsNew": true,
                    "TTDLineNo":0
                })
            }
            
        })
    });

    var prodyear = year_old;

    $.ajax({
        type: "GET",
        url: ROOT + "TTDDashboard/GetDateRemarksData",
        data: { prodyear: prodyear },
        async: false,
        success: function (response) {
            if (response != "") {
                if (response.length > 0) {
                    bindsaveddateremarksdate(response);

                }
            }
        },
        error: function (response) {
            alert(response);
        }
    });
}
function bindsaveddateremarksdate(data) {
    var sample_data_arr = ({
        "BaselineTTDRemarks": [],
        "BaselineProductionRemarks": [],
        "TTDTargetRemarks": [],
        "ProductionTargetRemarks": []
    })
    $.each(data, function (i, obj) {
        var index = grid_arr_new.findIndex(function (item) { 
            return obj.TTDHeaderId == item.TTDHeaderId;
        })
        if (index > -1) {
            $.each(sample_data_arr, function (column, data) {
                dateremarks_arr[column].push({
                    "RowNo": grid_arr_new[index].RowNo,
                    "Date": obj[column + "Date"],
                    "Remarks": obj[column],
                    "CreatedBy": obj.CreatedBy,
                    "CreatedOn": obj.CreatedOn,
                    "IsNew": false,
                    "TTDLineNo": obj.TTDLineNo
                })
            })
        }
        
    });
}

var basettdcolmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 100,
        resizable: true,
        ignoreCase: true,
        frozen: true,
        search: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsNew == true) {
                return '<div class="text-center input_form action_icons">' +
                    '<span class="deletedateremarks deletedateremarksrow_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" title="Delete"><i class="fas fa-trash color-delete"></i></span>' +
                    '<span class="ml-2 editdateremarks editdateremarksrow_' + rowobject.RowNo + '" data-lineno="' + rowobject.TTDLineNo + '" title="Edit"><i class="fas fa-pen text-primary"></i></span>' +
                    '</div>';
            }
            else {
                return '<div class="text-center input_form action_icons">' +
                    '<span class="ml-2 editdateremarks editdateremarksrow_' + rowobject.RowNo + '" data-lineno="' + rowobject.TTDLineNo + '" title="Edit"><i class="fas fa-pen text-primary"></i></span>' +
                    '</div>';
            }
        }
    },
    {
        name: 'Date',
        label: 'Baseline TTD Date',
        width: 100,
        align: "center",
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'Remarks',
        label: 'Baseline TTD Remarks',
        width: 350,
        resizable: true,
        ignoreCase: true,

    },

    {
        name: 'CreatedBy',
        label: 'Submitted By',
        width: 150,
        align: "center",
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedOn',
        label: 'Submitted On',
        width: 150,
        align: "center",
        resizable: true,
        ignoreCase: true,
    },

];
var baseprodcolmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 100,
        resizable: true,
        ignoreCase: true,
        frozen: true,
        search: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsNew == true) {
                return '<div class="text-center input_form action_icons">' +
                    '<span class="deletedateremarks deletedateremarksrow_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" title="Delete"><i class="fas fa-trash color-delete"></i></span>' +
                    '<span class="ml-2 editdateremarks editdateremarksrow_' + rowobject.TTDLineNo + '" data-lineno="' + rowobject.TTDLineNo + '" title="Edit"><i class="fas fa-pen text-primary"></i></span>' +
                    '</div>';
            }
            else {
                return '<div class="text-center input_form action_icons">' +
                    '<span class="ml-2 editdateremarks editdateremarksrow_' + rowobject.TTDLineNo + '" data-lineno="' + rowobject.TTDLineNo + '" title="Edit"><i class="fas fa-pen text-primary"></i></span>' +
                    '</div>';
            }
        }
    },
    {
        name: 'Date',
        label: 'Baseline Production Date',
        width: 100,
        align: "center",
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'Remarks',
        label: 'Baseline Production Remarks',
        width: 350,
        resizable: true,
        ignoreCase: true,

    },

    {
        name: 'CreatedBy',
        label: 'Submitted By',
        width: 150,
        align: "center",
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedOn',
        label: 'Submitted On',
        width: 150,
        align: "center",
        resizable: true,
        ignoreCase: true,
    },

];
var ttdtargetcolmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 100,
        resizable: true,
        ignoreCase: true,
        frozen: true,
        search: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsNew == true) {
                return '<div class="text-center input_form action_icons">' +
                    '<span class="deletedateremarks deletedateremarksrow_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" title="Delete"><i class="fas fa-trash color-delete"></i></span>' +
                    '<span class="ml-2 editdateremarks editdateremarksrow_' + rowobject.RowNo + '" data-lineno="' + rowobject.TTDLineNo + '" title="Edit"><i class="fas fa-pen text-primary"></i></span>' +
                    '</div>';
            }
            else {
                return '<div class="text-center input_form action_icons">' +
                    '<span class="ml-2 editdateremarks editdateremarksrow_' + rowobject.RowNo + '" data-lineno="' + rowobject.TTDLineNo + '" title="Edit"><i class="fas fa-pen text-primary"></i></span>' +
                    '</div>';
            }
        }
    },
    {
        name: 'Date',
        label: 'TTD Target Date',
        width: 100,
        align: "center",
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'Remarks',
        label: 'TTD Target Remarks',
        width: 350,
        resizable: true,
        ignoreCase: true,

    },

    {
        name: 'CreatedBy',
        label: 'Submitted By',
        width: 150,
        align: "center",
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedOn',
        label: 'Submitted On',
        width: 150,
        align: "center",
        resizable: true,
        ignoreCase: true,
    },

];
var prodtargetcolmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 100,
        resizable: true,
        ignoreCase: true,
        frozen: true,
        search: false,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.IsNew == true) {
                return '<div class="text-center input_form action_icons">' +
                    '<span class="deletedateremarks deletedateremarksrow_' + rowobject.RowNo + '" data-lineno="' + rowobject.RowNo + '" title="Delete"><i class="fas fa-trash color-delete"></i></span>' +
                    '<span class="ml-2 editdateremarks editdateremarksrow_' + rowobject.RowNo + '" data-lineno="' + rowobject.TTDLineNo + '" title="Edit"><i class="fas fa-pen text-primary"></i></span>' +
                    '</div>';
            }
            else {
                return '<div class="text-center input_form action_icons">' +
                    '<span class="ml-2 editdateremarks editdateremarksrow_' + rowobject.RowNo + '" data-lineno="' + rowobject.TTDLineNo + '" title="Edit"><i class="fas fa-pen text-primary"></i></span>' +
                    '</div>';
            }
        }
    },
    {
        name: 'Date',
        label: 'Production Target Date',
        width: 100,
        align: "center",
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'Remarks',
        label: 'Production Target Remarks',
        width: 350,
        resizable: true,
        ignoreCase: true,

    },

    {
        name: 'CreatedBy',
        label: 'Submitted By',
        width: 150,
        align: "center",
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedOn',
        label: 'Submitted On',
        width: 150,
        align: "center",
        resizable: true,
        ignoreCase: true,
    },

];

function createRemarksGrid(data, colmodels) {
    data = data.filter(function (obj) {
        return (obj.IsNew === false || obj.Remarks !== "") && obj.Date !== '';
    });

    $.jgrid.gridUnload('#dateremarks_grid')
    $("#dateremarks_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        width: 500,
        viewrecords: true,
        pager: '#dateremarks_pager',
        rowNum: data.length,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#dateremarks_grid tbody tr");
            var objHeader = $("#dateremarks_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

    $("#dateremarks_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 400px)' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 50) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
    var rowNo = parseInt($(".dateremarksrowno").val());
    var maindata = grid_arr_new.filter(function (obj) {
        return obj.IsEdit == true && obj.RowNo == rowNo
    });
    if (maindata.length == 0) {
        $("#dateremarks_grid").jqGrid('hideCol', 'Action');
    }
    if (role.toLowerCase() == 'report viewer') {
        $("#dateremarks_grid").jqGrid('hideCol', 'Action');
    }
}
$(document).off('click', '.openremarksmodel').on('click', '.openremarksmodel', function () {
    var rowNo = parseInt($(this).data('rowno'));
    var columnName = $(this).data('columnname');
    var datecolumnName = $(this).data('datecolumn');
    var validName = $(this).data('valid');

    $('#remarks_mandate').addClass('_hide');
    
    $('.ttdlineno').val(0)
    var gridIndex = grid_arr_new.findIndex(function (obj) {
        return obj.RowNo == rowNo;
    })
    if (grid_arr_new[gridIndex].IsEdit == true && !grid_arr_new[gridIndex][columnName + '_HasRemarks']) {
        $('.remarksedit').attr('disabled', false);
        $('.remarksedit').show();
    }
    else {
        $('.remarksedit').attr('disabled', true);
        $('.remarksedit').hide();
    }

    createcolmodels(columnName, rowNo, datecolumnName, validName)
});
function createcolmodels(columnName, rowno, datecolumnName, validclassName) {
    debugger;
    var title = "";
    var remarks = dateremarks_arr[columnName];

    var gridIndex = grid_arr_new.findIndex(function (obj) {
        return obj.RowNo == rowno;
    })

    var remarksdata = [];
    if (remarks.length > 0) {
        var remarksindex = dateremarks_arr[columnName].findIndex(function (obj) {
            return obj.IsNew == true && obj.RowNo == rowno;
        })
        if (remarksindex > -1) {
            dateremarks_arr[columnName][remarksindex].Date = structuredClone(grid_arr_new[gridIndex][datecolumnName]);
            //dateremarks_arr[columnName][remarksindex].Remarks = structuredClone(grid_arr_new[gridIndex][columnName]);
        }

        remarksdata = dateremarks_arr[columnName].filter(function (obj) {
            return obj.RowNo == rowno;
        })

        var remarksvalue = grid_arr_new[gridIndex][columnName];
        var isNew = grid_arr_new[gridIndex].IsNew;
        var isChanged = grid_arr_new[gridIndex].IsChanged;

        var newdate = grid_arr_new[gridIndex][datecolumnName];
        var olddate = grid_arr[gridIndex][datecolumnName];

        if (isNew == false) {
            if (olddate != newdate) {
                if (isChanged && (remarksvalue === "" || remarksvalue === null)) {
                    //$("." + validclassName + rowno + "_valid").removeClass("_hide");
                }
                else {
                    $("." + validclassName + rowno + "_valid").addClass("_hide");
                }
            } else {
                $("." + validclassName + rowno + "_valid").addClass("_hide");
            }
        }
    }

   

    $(".dataremarksproduct").text(grid_arr_new[gridIndex].ProductName);
    $(".dateremarkscolumn").val(columnName);
    $(".dateremarksdatecolumn").val(datecolumnName);
    $(".dateremarksvalidclass").val(validclassName);
    $(".dateremarksrowno").val(rowno);
    $(".dataremarkstitle").text(title + " Remarks");
    $('.dateremarkstext').val('')
    debugger;
    if (columnName == 'BaselineTTDRemarks') {
        title = "Baseline TTD"
        createRemarksGrid(remarksdata, basettdcolmodels);
    }
    else if (columnName == 'BaselineProductionRemarks') {
        title = "Baseline Production"
        createRemarksGrid(remarksdata, baseprodcolmodels);
    }
    else if (columnName == 'TTDTargetRemarks') {
        title = "TTD Target"
        createRemarksGrid(remarksdata, ttdtargetcolmodels);
    }
    else if (columnName == 'ProductionTargetRemarks') {
        title = "Production Target"
        createRemarksGrid(remarksdata, prodtargetcolmodels);
    }
    $('#dateremarksmodal').modal('show');

}
function saveeditedRemarks() {
    var remarks = $('.dateremarkstext').val().trim();
    var rowno = parseInt($(".dateremarksrowno").val());
    var columnName = $(".dateremarkscolumn").val();
    var datecolumnName = $(".dateremarksdatecolumn").val();
    var validclassName = $(".dateremarksvalidclass").val();
    var ttdlineNo = parseInt($('.ttdlineno').val())

    $.ajax({
        type: "POST",
        url: ROOT + "TTDDashboard/UpdateSavedRemarks",
        async:false,
        data: { DateAndRemarksId: ttdlineNo, Type: columnName,Remarks:remarks},
        success: function (response) {
            debugger;
            if (response.includes('Successfully')) {
                alert('Remarks Updated Successfully')
                var index = dateremarks_arr[columnName].findIndex(function (obj) {
                    return obj.TTDLineNo == ttdlineNo;
                });
                dateremarks_arr[columnName][index].Remarks = remarks;
            }
        },
        error: function (response) {
            alert(response);
        }
    });
}
$(document).off('click', '.adddateremarks').on('click', '.adddateremarks', function () {
    var remarks = $('.dateremarkstext').val().trim();
    var rowno = parseInt($(".dateremarksrowno").val());
    var columnName = $(".dateremarkscolumn").val();
    var datecolumnName = $(".dateremarksdatecolumn").val();
    var validclassName = $(".dateremarksvalidclass").val();
    var ttdlineNo = parseInt($('.ttdlineno').val())
    debugger;
    if (remarks == '' || remarks == null) {
        $('#remarks_mandate').removeClass('_hide');
    }
    else
    {
        $('#remarks_mandate').addClass('_hide');

        if (ttdlineNo > 0) {
            saveeditedRemarks();
        }
        else {
        var index = grid_arr_new.findIndex(function (obj) {
            return obj.RowNo == rowno;
        })
        if (index >= 0) {
            grid_arr_new[index][columnName] = remarks;
            grid_arr_new[index][columnName + '_HasRemarks'] = true;

        };

        var remarksdata = dateremarks_arr[columnName];
        var remarksindex = -1;
        if (remarksdata != "" && remarksdata != null) {
            remarksindex = remarksdata.findIndex(function (obj) {
                return obj.RowNo == rowno && obj.IsNew == true;
            })
        }
        if (remarksindex == -1) {
            dateremarks_arr[columnName].push({
                "RowNo": rowno,
                "Date": "",
                "Remarks": remarks,
                "CreatedBy": "",
                "CreatedOn": "",
                "IsNew": true
            })
        } else {
            //dateremarks_arr[columnName][remarksindex].Date = "";
            dateremarks_arr[columnName][remarksindex].Remarks = remarks;
        }
        
        }
        $('.dateremarkstext').val('');
        $('.ttdlineno').val(0)
        updateIsChanged(rowno);
        var index = dateremarks_arr[columnName].findIndex(function (obj) {
            return obj.RowNo === rowno && obj.IsNew==true && obj.Remarks==''
        });
        if (index > -1) {
            $('.remarksedit').attr('disabled', false);
            $('.remarksedit').show();
        }
        else {
            $('.remarksedit').attr('disabled', true);
            $('.remarksedit').hide();
        }
        createcolmodels(columnName, rowno, datecolumnName, validclassName);

        
    }
});
$(document).off('click', '.deletedateremarks').on('click', '.deletedateremarks', function () {
    var remarks = $('.dateremarkstext').val();
    var rowno = parseInt($(".dateremarksrowno").val());
    var columnName = $(".dateremarkscolumn").val();
    var datecolumnName = $(".dateremarksdatecolumn").val();
    var validclassName = $(".dateremarksvalidclass").val();

    confirm("Are you sure, you want to Delete Remarks", function () {
        var index = grid_arr_new.findIndex(function (obj) {
            return obj.RowNo == rowno;
        })
        if (index >= 0) {
            grid_arr_new[index][columnName] = "";
            grid_arr_new[index][columnName + '_HasRemarks'] = false;

        };

        var remarksdata = dateremarks_arr[columnName];
        var remarksindex = -1;
        if (remarksdata != "" && remarksdata != null) {
            remarksindex = remarksdata.findIndex(function (obj) {
                return obj.RowNo == rowno && obj.IsNew == true;
            })
        }
        if (remarksindex > -1) {
            dateremarks_arr[columnName][remarksindex].Remarks = "";

        }

        updateIsChanged(rowno);
        $('.remarksedit').attr('disabled', false);
        $('.remarksedit').show();
        createcolmodels(columnName, rowno, datecolumnName, validclassName);
        $('#remarks_mandate').addClass('_hide');
    });
});
$(document).off('click', '.editdateremarks').on('click', '.editdateremarks', function () {
    debugger;
    var rowno = parseInt($(".dateremarksrowno").val());
    var columnName = $(".dateremarkscolumn").val();
    var datecolumnName = $(".dateremarksdatecolumn").val();
    var validclassName = $(".dateremarksvalidclass").val();
    var e = $(this);
    var ttdlineNo = parseInt($(e).data('lineno'));
    $('.ttdlineno').val(ttdlineNo)
    //var index = grid_arr_new.findIndex(function (obj) {
    //    return obj.RowNo == rowno;
    //})
    //if (index >= 0) {
    //    grid_arr_new[index][columnName] = "";
    //};
    if (ttdlineNo > 0) {
        var remarksdata = dateremarks_arr[columnName];
        var remarksindex = -1;
        if (remarksdata != "" && remarksdata != null) {
            remarksindex = remarksdata.findIndex(function (obj) {
                return obj.TTDLineNo == ttdlineNo
            })
        }
    }
    else {
        var remarksdata = dateremarks_arr[columnName];
        var remarksindex = -1;
        if (remarksdata != "" && remarksdata != null) {
            remarksindex = remarksdata.findIndex(function (obj) {
                return obj.RowNo == rowno
            })
        }
    }
    
    debugger;
    if (remarksindex > -1) {
        remarks = dateremarks_arr[columnName][remarksindex].Remarks;
        $('.dateremarkstext').val(remarks);

    }
    $('.dateremarkstext').val(remarks);
    $('.remarksedit').attr('disabled', false);
    $('.remarksedit').show();
    $('#remarks_mandate').addClass('_hide');
});

var historyttdtargetremarks = [
    {
        name: 'Remarks',
        label: 'TTD Target Remarks',
        width: 300,
        resizable: true,
        ignoreCase: true,

    },
    {
        name: 'CreatedBy',
        label: 'Submitted By',
        width: 150,
        resizable: true,
        ignoreCase: true,
        align: "center",
    },
    {
        name: 'CreatedOn',
        label: 'Submitted On',
        width: 100,
        resizable: true,
        ignoreCase: true,
        align: "center",
    },

];
var historyproductiontargetremarks = [
    {
        name: 'Remarks',
        label: 'Production Target Remarks',
        width: 300,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedBy',
        label: 'Submitted By',
        width: 150,
        resizable: true,
        ignoreCase: true,
        align: "center",
    },
    {
        name: 'CreatedOn',
        label: 'Submitted On',
        width: 100,
        resizable: true,
        ignoreCase: true,
        align: "center"
    },

];
var historyremarks = [
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 300,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedBy',
        label: 'Submitted By',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedOn',
        label: 'Submitted On',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },

];
var historyaction = [
    {
        name: 'Action',
        label: 'Action',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ActionBy',
        label: 'Action By',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ActionOn',
        label: 'Action On',
        width: 100,
        resizable: true,
        ignoreCase: true,
    },

];

$(document).off('click', '.historydetails').on('click', '.historydetails', function () {
    var rowNo = parseInt($(this).data('rowno'));
    var columnName = $(this).data('columnname');

    var index = grid_arr_new.findIndex(function (obj) {
        return obj.RowNo == rowNo;
    })

    var prodyear = year_old;
    var ttdheaderid = grid_arr_new[index].TTDHeaderId;
    var historytype = columnName.replaceAll(" ", "");

    var columnmodel = ""
    if (historytype.toLowerCase() == "ttdtargetcomments") {
        columnmodel = historyttdtargetremarks;
    } else if (historytype.toLowerCase() == "productiontargetcomments") {
        columnmodel = historyproductiontargetremarks
    } else if (historytype.toLowerCase() == "remarks") {
        columnmodel = historyremarks
    }
    else if (historytype.toLowerCase() == "actionhistory") {
        columnmodel = historyaction


    }
    if (historytype.toLowerCase() == "actionhistory") {
        $(".historytitle").text('Action History');
    }
    else {
        $(".historytitle").text(columnName + " History");

    }
    $(".historyproduct").text(grid_arr_new[index].ProductName);

    $.ajax({
        type: "GET",
        url: ROOT + "TTDDashboard/GetHistoryData",
        data: { prodyear: prodyear, ttdheaderid: ttdheaderid, historytype: historytype },
        async: false,
        success: function (response) {
            createHistortGrid(response, columnmodel);
            $('#historymodal').modal('show');
        },
        error: function (response) {
            alert(response);
        }
    });
})


function createHistortGrid(data, colModel) {
    $.jgrid.gridUnload('#history_grid')
    $("#history_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colModel,
        loadonce: true,
        width: 500,
        viewrecords: true,
        pager: '#history_pager',
        rowNum: data.length,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#history_grid tbody tr");
            var objHeader = $("#history_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

    $("#history_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 400px)' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '0vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 50) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "4px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".-virtual-scroll").find(".ui-jqgrid-hdiv").css("padding-right", "0px")
    }
}

$(document).off('click', '.btn-cancel').on('click', '.btn-cancel', function () {
    $('.ui-jqgrid-bdiv').css({ 'max-height': 'calc(100vh - 240px)' });
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
});
$(document).off('click', '#exceldownload').on('click', '#exceldownload', function () {
    var isValid = true;
    var selectedYear = year_old
    var selectedProduct = $('#ProdName option:selected').text()
    if (selectedProduct == 'Select') {
        selectedProduct = ''
    }
    var data = $('#TTDDashboard_grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("There is no data present in the grid");
        isValid = false;
    }
    if (isValid) {
        window.location.href = ROOT + "TTDDashboard/GetTTDExcelData?prodyear=" + selectedYear + "&&product=" + selectedProduct;

    }
});

window.confirmSearch = function (msg, func, func1) {
    $('#confirmpopupmesssage').empty().html(msg);
    $('#confirmpopup').modal('show');
    if (func) {
        $("#ConfirmOKbutton").unbind("click");
        $('#ConfirmOKbutton').on("click", func);
    }
    if (func1) {
        $("#Confirmcancelbutton").unbind("click");
        $('#Confirmcancelbutton').on("click", func1);
    }
};