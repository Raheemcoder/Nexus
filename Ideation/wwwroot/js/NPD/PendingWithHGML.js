
var jsonFormNpdData = $.parseJSON($('#JsonFormNpdData').val())

$('#Npd_ProjectName').val(jsonFormNpdData.ProjectDetails[0].ProjectName);
$('#Npd_BusinessObjective').val(jsonFormNpdData.ProjectDetails[0].BusinessObjective);

var DivId = $("#Division").val();
var categoryId = $("#Category").val();

$.ajax({
    type: "POST",
    url: ROOT + "User/GetCategoryBYId",
    data: { divisionId: DivId },
    dataType: "json",
    success: function (Categoryresult) {
        //
        if (Categoryresult != null) {
            $("option").remove(".CategoryOption");
            var CategoryList = '';

            $.each(Categoryresult, function (i, obj) {
                //
                if (obj.categoryID == categoryId) {
                    CategoryList = '<option class="CategoryOption" selected value="' + obj.categoryID + '">' + obj.categoryName + '</option>';
                }
                else {
                    CategoryList = '<option class="CategoryOption" value="' + obj.categoryID + '">' + obj.categoryName + '</option>';
                }
                $(".addCategoryOption").append(CategoryList);
            })
        }
    },
    error: function () {
        alert("Error occured!!");
    }
});


$(document).ready(function () {
    $('.example-dropUp').multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        buttonWidth: '100%',
        maxHeight: 500,


    });
});

$(document).ready(function () {
    $('.filterable .btn-filter').click(function () {
        var $panel = $(this).parents('.filterable'),
            $filters = $panel.find('.filters input'),
            $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

    $('.filterable .filters input').keyup(function (e) {
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
        var $input = $(this),
            inputContent = $input.val().toLowerCase(),
            $panel = $input.parents('.filterable'),
            column = $panel.find('.filters th').index($input.parents('th')),
            $table = $panel.find('.table'),
            $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function () {
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
        }
    });
});



//Editor HUSA remarks

CKEDITOR.replace('editorhusa', {
    height: 270,
    width: 1100,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "links",
        "groups": ["links"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

CKEDITOR.replace('editormagic2', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord',
    removePlugins: 'elementspath'
});
CKEDITOR.replace('editormagic1', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editormagic3', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

//CKEDITOR.replace('editormagic4', {
//    height: 105,
//    toolbarGroups: [{
//        "name": "basicstyles",
//        "groups": ["basicstyles"]
//    },


//    {
//        "name": "insert",
//        "groups": ["insert"]
//    },

//    ],
//    // Remove the redundant buttons from toolbar groups defined above.
//    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
//});

CKEDITOR.replace('editormagic5', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editormagic6', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editormagic7', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editormagic8', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editormagic9', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editormagic10', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },


    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
//CKEDITOR.replace('editormagic11', {
//    height: 105,
//    toolbarGroups: [{
//        "name": "basicstyles",
//        "groups": ["basicstyles"]
//    },


//    {
//        "name": "insert",
//        "groups": ["insert"]
//    },

//    ],
//    // Remove the redundant buttons from toolbar groups defined above.
//    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
//});

//CKEDITOR.replace('editormagic12', {
//    height: 105,
//    toolbarGroups: [{
//        "name": "basicstyles",
//        "groups": ["basicstyles"]
//    },


//    {
//        "name": "insert",
//        "groups": ["insert"]
//    },

//    ],
//    // Remove the redundant buttons from toolbar groups defined above.
//    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
//});

//Business Objective

CKEDITOR.replace('Npd_BusinessObjective', {
    height: 105,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "links",
        "groups": ["links"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
//CKEDITOR.replace('editorcmpoff', {
//    toolbarGroups: [{
//        "name": "basicstyles",
//        "groups": ["basicstyles"]
//    },
//    {
//        "name": "links",
//        "groups": ["links"]
//    },
//    {
//        "name": "paragraph",
//        "groups": ["list", "blocks"]
//    },

//    {
//        "name": "insert",
//        "groups": ["insert"]
//    },

//    ],
//    // Remove the redundant buttons from toolbar groups defined above.
//    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
//});

//Competitive Offerings

CKEDITOR.replace('PP_CompetitiveOfferings', {
    height: 275,
    width: 950,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "links",
        "groups": ["links"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],

    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

// Unmet Need

CKEDITOR.replace('PP_UnmetNeed', {
    height: 275,
    width: 950,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "links",
        "groups": ["links"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],

    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editorcfr2', {
    height: 160,
    width: 950,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "links",
        "groups": ["links"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],

    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});
CKEDITOR.replace('editorcfr3', {
    height: 160,
    width: 950,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "links",
        "groups": ["links"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    {
        "name": "insert",
        "groups": ["insert"]
    },

    ],

    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});


CKEDITOR.replace('editor4_features', {
    height: 150,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "links",
        "groups": ["links"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    {
        "name": "insert",
        "groups": ["insert"]
    },

        //{
        //    "name": "about",
        //    "groups": ["about"]
        //}
    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});

CKEDITOR.replace('editor4_benefits', {
    height: 150,
    toolbarGroups: [{
        "name": "basicstyles",
        "groups": ["basicstyles"]
    },
    {
        "name": "links",
        "groups": ["links"]
    },
    {
        "name": "paragraph",
        "groups": ["list", "blocks"]
    },

    {
        "name": "insert",
        "groups": ["insert"]
    },

        //{
        //    "name": "about",
        //    "groups": ["about"]
        //}
    ],
    // Remove the redundant buttons from toolbar groups defined above.
    removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord'
});











data = [
    {
        //"Action": "",
        "Product": "Product1",
        "ExpectedFeatures": "Easy Squeezability & tear-ability of the sachet Price point Highlight",
        "ExpectedBenefits": "Reduces Hair Fall; Makes Hair",
    },



]

//Product Positioning

colmodels = [
    {
        name: 'TargetConsumer',
        label: 'Target Consumer',
        resizable: true,
        ignoreCase: true,
       // hidden: true
    },
    {
        name: 'CompetitiveOfferings',
        label: 'Competitive Offerings',
        resizable: true,
        ignoreCase: true,
        //hidden: true
    },
    {
        name: 'UnmetNeed',
        label: 'Unmet Need',
        resizable: true,
        ignoreCase: true,
       // hidden: true
    },
    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ExpectedFeatures',
        label: 'Expected Features',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ExpectedBenefits',
        label: 'Expected Benefits',
        resizable: true,
        ignoreCase: true,
    },


],

    $("#Product_Positioning").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdData['ProductPositioning'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Product_Positioning tbody tr");
            var objHeader = $("#Product_Positioning tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


//$("#benefits_profile").hide();
//$("#expected_profile").hide();
//$("#edit_worksheet").click(function () {
//    $(".margin_top115").addClass("top_margin");
//    var tr = $(this).closest("tr");
//    var productValue = $(tr).children("td").eq(1).text();
//    $(".first_profile").val(productValue);
//    $("#cke_editor4_features").hide();
//    $("#expected_profile").show();
//    var product1Value = $(tr).children("td").eq(2).text();
//    $("#expected_profile").val(product1Value);
//    $("#cke_editor4_benefits").hide();
//    $("#benefits_profile").show();
//    var indicationValue = $(tr).children("td").eq(3).text();
//    $("#benefits_profile").val(indicationValue);
//});


data = [


    {
        //"Action": "",
        "HUBName": "HUSA",
        "Remarks": " The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "APAC",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "RUMEA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "EU",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "INDIA",
        "Remarks": "The details are Okay",

    },



]

//Project Details Remarks

colmodels = [
  
    {
        name: 'HUBName',
        label: 'HUB Name',
        resizable: true,
        width: 300,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        width: 700,
        ignoreCase: true,
    },
],

    $("#Project_Details_Remarks").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet1',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Project_Details_Remarks tbody tr");
            var objHeader = $("#Project_Details_Remarks tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });


$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}



data = [


    {
        //"Action": "",
        "HUBName": "HUSA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "APAC",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "RUMEA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "EU",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "INDIA",
        "Remarks": "The details are Okay",

    },



]

//Formulation Profile Remarks

colmodels = [

    {
        name: 'HUBName',
        label: 'HUB Name',
        resizable: true,
        width: 300,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        width: 700,
        ignoreCase: true,
    },

],

    $("#Formulation_Profile_Remarks").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet2',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Formulation_Profile_Remarks tbody tr");
            var objHeader = $("#Formulation_Profile_Remarks tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}
$("#benefits_profile").hide();
$("#expected_profile").hide();
$("#edit_worksheet").click(function () {
    $(".margin_top115").addClass("top_margin");
    var tr = $(this).closest("tr");
    var productValue = $(tr).children("td").eq(1).text();
    $(".first_profile").val(productValue);
    $("#cke_editor4_features").hide();
    $("#expected_profile").show();
    var product1Value = $(tr).children("td").eq(2).text();
    $("#expected_profile").val(product1Value);
    $("#cke_editor4_benefits").hide();
    $("#benefits_profile").show();
    var indicationValue = $(tr).children("td").eq(3).text();
    $("#benefits_profile").val(indicationValue);
});


data = [


    {
        //"Action": "",
        "HUBName": "HUSA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "APAC",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "RUMEA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "EU",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "INDIA",
        "Remarks": "The details are Okay",

    },



]

//Packaging Profile Remarks

colmodels = [
    //  {
    //     name: 'Action',
    //     label: 'Action',
    //     width:90,
    //     resizable: true,
    //     ignoreCase: true,
    //      formatter: function (cellvalue, options, rowobject) {
    //            return `<div class="text-center icon_section align-items-left">
    //<a class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //<a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //</div>`;
    //        }
    // },
    {
        name: 'HUBName',
        label: 'HUB Name',
        resizable: true,
        width: 300,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        width: 700,
        ignoreCase: true,
    },

],

    $("#Packaging_Profile_Remarks").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet3',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Packaging_Profile_Remarks tbody tr");
            var objHeader = $("#Packaging_Profile_Remarks tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


data = [


    {
        //"Action": "",
        "HUBName": "HUSA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "APAC",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "RUMEA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "EU",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "INDIA",
        "Remarks": "The details are Okay",

    },



]

//Business Information Remarks

colmodels = [

    //  {
    //     name: 'Action',
    //     label: 'Action',
    //     width:90,
    //     resizable: true,
    //     ignoreCase: true,
    //      formatter: function (cellvalue, options, rowobject) {
    //            return `<div class="text-center icon_section align-items-left">
    //<a class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //<a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //</div>`;
    //        }
    // },
    {
        name: 'HUBName',
        label: 'HUB Name',
        resizable: true,
        width: 300,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        width: 700,
        ignoreCase: true,
    },

],

    $("#Business_Information_Remarks").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet4',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Business_Information_Remarks tbody tr");
            var objHeader = $("#Business_Information_Remarks tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


//Product profile : Formulation Profile

colmodels = [
    //{
    //    name: 'Action',
    //    label: 'Action',
    //    width: 90,
    //    resizable: true,
    //    ignoreCase: true,
    //    formatter: function (cellvalue, options, rowobject) {
    //        return `<div class="text-center icon_section align-items-left">
    //          <a class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //          <a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //          </div>`;
    //    }
    //},
    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DesiredIngredients',
        label: 'Desired Ingredients',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'IndicationOrConditions',
        label: 'Indication Conditions',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'MustHaveClaims',
        label: 'Must Have Claims',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'NiceToHaveClaims',
        label: 'Nice to Have Claims',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DosageForm',
        label: 'Dosage Form',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BenchmarkProducts',
        label: 'Benchmark Products',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DesiredProductCharacteristics',
        label: 'Desired Product Characteristics',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BenchmarkProductsImageDownload',
        label: 'Images',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
                              <a class="icon_color btn_button" title="Edit" id="edit_benchmark"><i class="fa fa-download mr-2" title="Edit"></i></a>

                              </div>`;
        }
    },
    {
        name: 'BenchmarkProductsImage',
        label: 'Benchmark Products Image Hide',
        resizable: true,
        ignoreCase: true,
        //hidden: true
    },

],

    $("#Formulation_Profile").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdData['FormulationProfile'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_product',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Formulation_Profile tbody tr");
            var objHeader = $("#Formulation_Profile tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}




/* Benchmark sample script */

data = [
    {
        //"Action": "",
        "Product": "Product1",
        "SKU": "SKU001",
        "PrimaryPackaging": "Singular Sachet",
        "SecondaryPackaging": "Singular Sachet",
        "TertiaryPackaging": "Shipper",
        "Others": "Shipper",
        "ImageUpload": "",
    },



]
colmodels = [
    // {
    //     name: 'Action',
    //     label: 'Action',
    //     width:90,
    //     resizable: true,
    //     ignoreCase: true,
    //      formatter: function (cellvalue, options, rowobject) {
    //            return `<div class="text-center icon_section align-items-left">
    //<a class="icon_color btn_button" title="Edit" id="edit_benchmark"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //<a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //</div>`;
    //        }
    // },
    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'PrimaryPackaging',
        label: 'Primary Packaging',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SecondaryPackaging',
        label: 'Secondary Packaging',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TertiaryPackaging',
        label: 'Tertiary Packaging',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Others',
        label: 'Others (If any)',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ImageUpload',
        label: 'Images Upload',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
                  <a class="icon_color btn_button" title="Edit" id="edit_benchmark"><i class="fa fa-download mr-2" title="Edit"></i></a>

                  </div>`;
        }
    },




],

    $("#benchmark").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_benchmark',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#benchmark tbody tr");
            var objHeader = $("#benchmark tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
//$("#benchmark").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}
$("#edit_benchmark").click(function () {
    var tr = $(this).closest("tr");
    var productValue = $(tr).children("td").eq(1).text();
    $("#product22").val(productValue);
    var skuValue = $(tr).children("td").eq(2).text();
    $("#sku22").val(skuValue);
    var markValue = $(tr).children("td").eq(3).text();
    $("#sku23").val(markValue);
    var DesiredValue = $(tr).children("td").eq(4).text();
    $("#desired21").val(DesiredValue);
    var Desired3Value = $(tr).children("td").eq(5).text();
    $("#Desired211").val(Desired3Value);
    var OthersValue = $(tr).children("td").eq(6).text();
    $("#Others3").val(OthersValue);
});


//Product Profile: Packaging Profile

colmodels = [

    //{
    //    name: 'Action',
    //    label: 'Action',
    //    width: 90,
    //    resizable: true,
    //    ignoreCase: true,
    //    formatter: function (cellvalue, options, rowobject) {
    //        return `<div class="text-center icon_section align-items-left">
    //      <a class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //      <a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //      </div>`;
    //    }
    //},
    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'PrimaryPackaging',
        label: 'Primary Packaging',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SecondaryPackaging',
        label: 'Secondary Packaging',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'TertiaryPackaging',
        label: 'Tertiary Packaging',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BenchmarkProducts',
        label: 'Benchmark Products',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DesiredPackagingCharacteristics',
        label: 'Desired Packaging Characteristics',
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'Others',
        label: 'Others (If any)',
        resizable: true,
        ignoreCase: true,
    },

    {
        name: 'Mould',
        label: 'Mould',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ImagesUploadDownload',
        label: 'Images',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
                              <a class="icon_color btn_button" title="Edit" id="edit_benchmark"><i class="fa fa-download mr-2" title="Edit"></i></a>

                              </div>`;
        }
    },
    {
        name: 'ImagesUpload',
        label: 'Images Hide',
        resizable: true,
        ignoreCase: true,
        //hidden: true
    },

],

    $("#Packaging_Profile").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdData['PackagingProfile'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Packaging_Profile tbody tr");
            var objHeader = $("#Packaging_Profile tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}



/* new_moulds sample script */

data = [
    {
        //"Action": "",
        "Product": "Product1",
        "SKU": "SKU001",
        "BenchmarkProducts": "Cylinder based on artwork",
        "DesiredProductCharacteristics": "Cylinder based on artwork",
        "DesiredProductCharacteristics2": "Cylinder based on artwork",
        "Others": "Cylinder based on artwork",
        "ImageUpload": "",
    },



]
colmodels = [
    //  {
    //     name: 'Action',
    //     label: 'Action',
    //     width:90,
    //     resizable: true,
    //     ignoreCase: true,
    //      formatter: function (cellvalue, options, rowobject) {
    //            return `<div class="text-center icon_section align-items-left">
    //<a class="icon_color btn_button" title="Edit" id="edit_mark"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //<a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //</div>`;
    //        }
    // },

    {
        name: 'Product',
        label: 'Product',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BenchmarkProducts',
        label: 'Benchmark Products',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DesiredProductCharacteristics',
        label: 'Desired Product Characteristics',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'DesiredProductCharacteristics2',
        label: 'Desired Product Characteristics',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Others',
        label: 'Others (If any)',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ImageUpload',
        label: 'Images Upload',
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
                  <a class="icon_color btn_button" title="Edit" id="edit_benchmark"><i class="fa fa-download mr-2" title="Edit"></i></a>

                  </div>`;
        }
    },


],

    $("#new_moulds").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_moulds',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#new_moulds tbody tr");
            var objHeader = $("#new_moulds tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
//$("#new_moulds").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


$("#edit_mark").click(function () {
    var tr = $(this).closest("tr");
    var productValue = $(tr).children("td").eq(1).text();
    $("#product1").val(productValue);
    var skuValue = $(tr).children("td").eq(2).text();
    $("#sku1").val(skuValue);
    var markValue = $(tr).children("td").eq(3).text();
    $("#sku12").val(markValue);
    var DesiredValue = $(tr).children("td").eq(4).text();
    $("#desired").val(DesiredValue);
    var Desired1Value = $(tr).children("td").eq(5).text();
    $("#Desired1").val(Desired1Value);
    var OthersValue = $(tr).children("td").eq(6).text();
    $("#Others").val(OthersValue);
});

var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
$('[data-datepicker-today]').datepicker({
    todayHighlight: true,
    autoclose: true
});
$('[data-datepicker-today]').datepicker('setDate', today);


//Business Information

colmodels = [
    //{
    //    name: 'Action',
    //    label: 'Action',
    //    width: 90,
    //    resizable: true,
    //    ignoreCase: true,
    //    formatter: function (cellvalue, options, rowobject) {
    //        return `<div class="text-center icon_section align-items-left">
    //              <a class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //              <a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //              </div>`;
    //    }
    //},
    {
        name: 'Product',
        label: 'Product',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'SKU',
        label: 'SKU',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedNamesOfProduct',
        label: 'Proposed Name&#8217;s of Product',
        width: 150,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedLaunchDate',
        label: 'Proposed Launch Date',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedSellingPrice',
        label: 'Proposed Selling Price',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedTP',
        label: 'Proposed TP',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ProposedMRP',
        label: 'Proposed MRP',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ExpectedGP',
        label: 'Expected GP % ',
        width: 130,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'BusinessValue',
        label: 'Business Value <span class="Bus_val">(Y2 Quantity * Proposed Selling Price)</span>',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M1Quantity',
        label: 'M1 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M2Quantity',
        label: 'M2 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'M3Quantity',
        label: 'M3 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y1Quantity',
        label: 'Y1 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y2Quantity',
        label: 'Y2 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Y3Quantity',
        label: 'Y3 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'UOM',
        label: 'UOM',
        width: 140,
        resizable: true,
        ignoreCase: true,
    },

],

    $("#Business_Information").jqGrid({
        url: '',
        datatype: 'local',
        data: jsonFormNpdData['BusinessInformation'],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_businessinfo',
        rowNum: 20,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#Business_Information tbody tr");
            var objHeader = $("#Business_Information tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


/* popup modal info */

data = [
    {
        //"Action": "",
        "Product": "",
        "SKU": "SKU001",
        "ProposedNamesofproduct": "Bhringaraja Hairfall Shampoo (TBC)",
        "Proposedlaunchdate": "12-06-2022",
        "ProposedSellingPrice": "Rs 3 for 6 ml",
        "ProposedTP": "Rs 2 for 6 ml",
        "ProposedMRP": "Rs 2 for 6 ml",
        "ExpectedGP": "Rs 2 for 6 ml",
        "M1": "20,00,000.",
        "M2": "30,00,000.",
        "M3": "20,00,000.",
        "Y1": "2,20.00.000.",
        "Y2": "2,20,00,000.",
        "Y3": "3,70,00,000.",
        "UOM": "ml",
        "BusinessValue": "",
        "ProjectCategorization": "",
        "ComplexitytobeAssigned": "",
        "Stakeholders": "",
    },
    {
        //"Action": "",
        "Product": "Product22",
        "SKU": "SKU002",
        "ProposedNamesofproduct": "Bhringaraja Hairfall Shampoo ",
        "Proposedlaunchdate": "12-07-2022",
        "ProposedSellingPrice": "Rs 3 for 6 ml",
        "ProposedTP": "Rs 2 for 6 ml",
        "ProposedMRP": "Rs 2 for 6 ml",
        "ExpectedGP": "Rs 2 for 6 ml",
        "M1": "20,00,000.",
        "M2": "30,00,000.",
        "M3": "20,00,000.",
        "Y1": "2,20.00.000.",
        "Y2": "2,20,00,000.",
        "Y3": "3,70,00,000.",
        "UOM": "ml",
        "BusinessValue": "",
        "ProjectCategorization": "",
        "ComplexitytobeAssigned": "",
        "Stakeholders": "",
    },
    //{
    //    //"Action": "",
    //    "Product": "Product3",
    //    "SKU": "SKU003",
    //    "ProposedNamesofproduct": "Bhringaraja Hairfall Shampoo (TBC)",
    //    "Proposedlaunchdate": "12-09-2022",
    //    "ProposedSellingPrice": "Rs 3 for 6 ml",
    //    "ProposedTP": "Rs 2 for 6 ml",
    //    "ProposedMRP": "Rs 2 for 6 ml",
    //    "ExpectedGP": "Rs 2 for 6 ml",
    //    "M1": "20,00,000.",
    //    "M2": "30,00,000.",
    //    "M3": "20,00,000.",
    //    "Y1": "2,20.00.000.",
    //    "Y2": "2,20,00,000.",
    //    "Y3": "3,70,00,000.",
    //     "UOM": "ml",
    //    "BusinessValue": "",
    //    "ProjectCategorization": "",
    //    "ComplexitytobeAssigned": "",
    //    "Stakeholders": "",
    //},



]
colmodels = [
    //{
    //    name: 'Action',
    //    label: 'Action',
    //    width: 90,
    //    resizable: true,
    //    ignoreCase: true,
    //    formatter: function (cellvalue, options, rowobject) {
    //        return `<div class="text-center icon_section align-items-left">
    //  <a class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //  <a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //  </div>`;
    //    }
    //},
    {
        name: 'Product',
        label: 'Product',
        width: 100,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="Product1" readonly>
                                </div>
                           `;
        }
    },
    {
        name: 'SKU',
        label: 'SKU',
        width: 100,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="SKU001" readonly>
                                </div>
                            `;
        }
    },
    {
        name: 'ProposedNamesofproduct',
        label: 'Proposed Name&#8217;s of Product',
        width: 160,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="Bhringaraja Hairfall Shampoo (TBC)" readonly>
                                </div>
                            `;
        }
    },
    {
        name: 'Proposedlaunchdate',
        label: 'Proposed Launch Date',
        width: 130,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control date-picker1" value="09-12-2022" data-datepicker>
                                </div>
                            `;
        }
    },
    {
        name: 'ProposedSellingPrice',
        label: 'Proposed Selling Price',
        width: 130,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="Rs 3 for 6 ml">
                                </div>
                            `;
        }
    },
    {
        name: 'ProposedTP',
        label: 'Proposed TP',
        width: 130,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="Rs 2 for 6 ml">
                                </div>
                            `;
        }
    },
    {
        name: 'ProposedMRP',
        label: 'Proposed MRP',
        width: 130,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="Rs 2 for 6 ml">
                                </div>
                            `;
        }
    },
    {
        name: 'ExpectedGP',
        label: 'Expected GP % ',
        width: 130,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="Rs 2 for 6 ml">
                                </div>
                            `;
        }
    },
    {
        name: 'BusinessValue',
        label: 'Business Value <span class="Bus_val">(Y2 Quantity * Proposed Selling Price)</span>',
        width: 140,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control">
                                </div>
                            `;
        }
    },
    {
        name: 'M1',
        label: 'M1 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="20,00,000">
                                </div>
                            `;
        }
    },
    {
        name: 'M2',
        label: 'M2 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="30,00,000">
                                </div>
                            `;
        }
    },
    {
        name: 'M3',
        label: 'M3 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="20,00,000">
                                </div>
                           `;
        }
    },
    {
        name: 'Y1',
        label: 'Y1 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="2,20.00.000">
                                </div>
                            `;
        }
    },
    {
        name: 'Y2',
        label: 'Y2 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="2,20.00.000">
                                </div>
                            `;
        }
    },
    {
        name: 'Y3',
        label: 'Y3 Quantity',
        width: 140,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                    <div class="demo-content">
                                        <input type="text" class="form-control" value="3,70,00,000">
                                    </div>
                                `;
        }
    },
    {
        name: 'UOM',
        label: 'UOM',
        width: 100,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `

                                <div class="demo-content">
                                    <input type="text" class="form-control" value="ml">
                                </div>
                            `;
        }
    },

    // {
    //    name: 'ProjectCategorization',
    //    label: 'Project Categorization',
    //    width:140,
    //    resizable: true,
    //    ignoreCase: true,
    //},
    //{
    //    name: 'ComplexitytobeAssigned',
    //    label: 'Complexity to be Assigned',
    //    width:140,
    //    resizable: true,
    //    ignoreCase: true,
    //},
    //{
    //    name: 'stakeholders',
    //    label: 'Stakeholders',
    //    width:140,
    //    resizable: true,
    //    ignoreCase: true,
    //},



],

    $("#business_info_view").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_businessinfo_view',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#business_info_view tbody tr");
            var objHeader = $("#business_info_view tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
//$("#business_info").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}


$("#edit_info").click(function () {
    var tr = $(this).closest("tr");
    var productValue = $(tr).children("td").eq(1).text();
    $("#product").val(productValue);
    var skuValue = $(tr).children("td").eq(2).text();
    $("#sku").val(skuValue);
    var ProposedValue = $(tr).children("td").eq(3).text();
    $("#proposed").val(ProposedValue);
    var dateValue = $(tr).children("td").eq(4).text();
    $("#date").val(dateValue);
    var PriceValue = $(tr).children("td").eq(5).text();
    $("#price").val(PriceValue);
    var MRPValue = $(tr).children("td").eq(6).text();
    $("#mrp_tp").val(MRPValue);
    var GPValue = $(tr).children("td").eq(7).text();
    $("#gp").val(GPValue);
    var m1Value = $(tr).children("td").eq(8).text();
    $("#m1").val(m1Value);
    var m2Value = $(tr).children("td").eq(9).text();
    $("#m2").val(m2Value);
    var m3Value = $(tr).children("td").eq(10).text();
    $("#m3").val(m3Value);
    var y1Value = $(tr).children("td").eq(11).text();
    $("#y1").val(y1Value);
    var y2Value = $(tr).children("td").eq(12).text();
    $("#y2").val(y2Value);
    var y3Value = $(tr).children("td").eq(13).text();
    $("#y3").val(y3Value);
});



data = [
    {
        "Action": "",
        "ProductName": "Product Name1",
        "Product": "Health care",
        "Priority": "High",
        "Remarks": "Updated",
    },



]
colmodels = [
    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
            <a class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fa fa-edit mr-2" title="Edit"></i></a>
            <a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" data-bs-toggle="modal" data-bs-target="#DeleteModal" title="Delete"></i></a>
        </div>`;
        }
    },
    {
        name: 'ProductName',
        label: 'Product Name',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Product',
        label: 'Participating Markets',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Priority',
        label: 'Project Priority',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
    },



],

    $("#HGML_Data").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_HGML',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#HGML_Data tbody tr");
            var objHeader = $("#HGML_Data tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
//$("#worksheet").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}
$("#benefits_profile").hide();
$("#expected_profile").hide();
$("#edit_worksheet").click(function () {
    $(".margin_top115").addClass("top_margin");
    var tr = $(this).closest("tr");
    var productValue = $(tr).children("td").eq(1).text();
    $(".first_profile").val(productValue);
    $("#cke_editor4_features").hide();
    $("#expected_profile").show();
    var product1Value = $(tr).children("td").eq(2).text();
    $("#expected_profile").val(product1Value);
    $("#cke_editor4_benefits").hide();
    $("#benefits_profile").show();
    var indicationValue = $(tr).children("td").eq(3).text();
    $("#benefits_profile").val(indicationValue);
});



data = [


    {
        //"Action": "",
        "HUBName": "HUSA",
        "Remarks": " The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "APAC",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "RUMEA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "EU",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "INDIA",
        "Remarks": "The details are Okay",

    },



]
colmodels = [
    //  {
    //     name: 'Action',
    //     label: 'Action',
    //     width:90,
    //     resizable: true,
    //     ignoreCase: true,
    //      formatter: function (cellvalue, options, rowobject) {
    //            return `<div class="text-center icon_section align-items-left">
    //<a class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //<a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //</div>`;
    //        }
    // },
    {
        name: 'HUBName',
        label: 'HUB Name',
        resizable: true,
        width: 300,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        width: 700,
        ignoreCase: true,
    },



],

    $("#worksheet1").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet1',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#worksheet1 tbody tr");
            var objHeader = $("#worksheet1 tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
//$("#worksheet").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}
$("#benefits_profile").hide();
$("#expected_profile").hide();
$("#edit_worksheet").click(function () {
    $(".margin_top115").addClass("top_margin");
    var tr = $(this).closest("tr");
    var productValue = $(tr).children("td").eq(1).text();
    $(".first_profile").val(productValue);
    $("#cke_editor4_features").hide();
    $("#expected_profile").show();
    var product1Value = $(tr).children("td").eq(2).text();
    $("#expected_profile").val(product1Value);
    $("#cke_editor4_benefits").hide();
    $("#benefits_profile").show();
    var indicationValue = $(tr).children("td").eq(3).text();
    $("#benefits_profile").val(indicationValue);
});


data = [


    {
        //"Action": "",
        "HUBName": "HUSA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "APAC",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "RUMEA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "EU",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "INDIA",
        "Remarks": "The details are Okay",

    },



]
colmodels = [
    //  {
    //     name: 'Action',
    //     label: 'Action',
    //     width:90,
    //     resizable: true,
    //     ignoreCase: true,
    //      formatter: function (cellvalue, options, rowobject) {
    //            return `<div class="text-center icon_section align-items-left">
    //<a class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //<a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //</div>`;
    //        }
    // },
    {
        name: 'HUBName',
        label: 'HUB Name',
        resizable: true,
        width: 300,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        width: 700,
        ignoreCase: true,
    },



],

    $("#worksheet2").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet2',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#worksheet2 tbody tr");
            var objHeader = $("#worksheet2 tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
//$("#worksheet").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}
$("#benefits_profile").hide();
$("#expected_profile").hide();
$("#edit_worksheet").click(function () {
    $(".margin_top115").addClass("top_margin");
    var tr = $(this).closest("tr");
    var productValue = $(tr).children("td").eq(1).text();
    $(".first_profile").val(productValue);
    $("#cke_editor4_features").hide();
    $("#expected_profile").show();
    var product1Value = $(tr).children("td").eq(2).text();
    $("#expected_profile").val(product1Value);
    $("#cke_editor4_benefits").hide();
    $("#benefits_profile").show();
    var indicationValue = $(tr).children("td").eq(3).text();
    $("#benefits_profile").val(indicationValue);
});


data = [


    {
        //"Action": "",
        "HUBName": "HUSA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "APAC",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "RUMEA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "EU",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "INDIA",
        "Remarks": "The details are Okay",

    },



]
colmodels = [
    //  {
    //     name: 'Action',
    //     label: 'Action',
    //     width:90,
    //     resizable: true,
    //     ignoreCase: true,
    //      formatter: function (cellvalue, options, rowobject) {
    //            return `<div class="text-center icon_section align-items-left">
    //<a class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //<a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //</div>`;
    //        }
    // },
    {
        name: 'HUBName',
        label: 'HUB Name',
        resizable: true,
        width: 300,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        width: 700,
        ignoreCase: true,
    },



],

    $("#worksheet3").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet3',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#worksheet3 tbody tr");
            var objHeader = $("#worksheet3 tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
//$("#worksheet").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}
$("#benefits_profile").hide();
$("#expected_profile").hide();
$("#edit_worksheet").click(function () {
    $(".margin_top115").addClass("top_margin");
    var tr = $(this).closest("tr");
    var productValue = $(tr).children("td").eq(1).text();
    $(".first_profile").val(productValue);
    $("#cke_editor4_features").hide();
    $("#expected_profile").show();
    var product1Value = $(tr).children("td").eq(2).text();
    $("#expected_profile").val(product1Value);
    $("#cke_editor4_benefits").hide();
    $("#benefits_profile").show();
    var indicationValue = $(tr).children("td").eq(3).text();
    $("#benefits_profile").val(indicationValue);
});


data = [


    {
        //"Action": "",
        "HUBName": "HUSA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "APAC",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "RUMEA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "EU",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "INDIA",
        "Remarks": "The details are Okay",

    },



]
colmodels = [
    //  {
    //     name: 'Action',
    //     label: 'Action',
    //     width:90,
    //     resizable: true,
    //     ignoreCase: true,
    //      formatter: function (cellvalue, options, rowobject) {
    //            return `<div class="text-center icon_section align-items-left">
    //<a class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //<a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //</div>`;
    //        }
    // },
    {
        name: 'HUBName',
        label: 'HUB Name',
        resizable: true,
        width: 300,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        width: 700,
        ignoreCase: true,
    },



],

    $("#worksheet4").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet4',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#worksheet4 tbody tr");
            var objHeader = $("#worksheet4 tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
//$("#worksheet").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}
$("#benefits_profile").hide();
$("#expected_profile").hide();
$("#edit_worksheet").click(function () {
    $(".margin_top115").addClass("top_margin");
    var tr = $(this).closest("tr");
    var productValue = $(tr).children("td").eq(1).text();
    $(".first_profile").val(productValue);
    $("#cke_editor4_features").hide();
    $("#expected_profile").show();
    var product1Value = $(tr).children("td").eq(2).text();
    $("#expected_profile").val(product1Value);
    $("#cke_editor4_benefits").hide();
    $("#benefits_profile").show();
    var indicationValue = $(tr).children("td").eq(3).text();
    $("#benefits_profile").val(indicationValue);
});


data = [


    {
        //"Action": "",
        "HUBName": "HUSA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "APAC",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "RUMEA",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "EU",
        "Remarks": "The details are Okay",

    },
    {
        //"Action": "",
        "HUBName": "INDIA",
        "Remarks": "The details are Okay",

    },



]
colmodels = [
    //  {
    //     name: 'Action',
    //     label: 'Action',
    //     width:90,
    //     resizable: true,
    //     ignoreCase: true,
    //      formatter: function (cellvalue, options, rowobject) {
    //            return `<div class="text-center icon_section align-items-left">
    //<a class="icon_color btn_button" title="Edit" id="edit_worksheet"><i class="fa fa-edit mr-2" title="Edit"></i></a>
    //<a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" title="Delete"></i></a>
    //</div>`;
    //        }
    // },
    {
        name: 'HUBName',
        label: 'HUB Name',
        resizable: true,
        width: 300,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        width: 700,
        ignoreCase: true,
    },



],

    $("#worksheet5").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet5',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#worksheet5 tbody tr");
            var objHeader = $("#worksheet5 tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
//$("#worksheet").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '10vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}
$("#benefits_profile").hide();
$("#expected_profile").hide();
$("#edit_worksheet").click(function () {
    $(".margin_top115").addClass("top_margin");
    var tr = $(this).closest("tr");
    var productValue = $(tr).children("td").eq(1).text();
    $(".first_profile").val(productValue);
    $("#cke_editor4_features").hide();
    $("#expected_profile").show();
    var product1Value = $(tr).children("td").eq(2).text();
    $("#expected_profile").val(product1Value);
    $("#cke_editor4_benefits").hide();
    $("#benefits_profile").show();
    var indicationValue = $(tr).children("td").eq(3).text();
    $("#benefits_profile").val(indicationValue);
});
var myModal = document.getElementById('exampleModalView');
console.log("Kaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", myModal);
myModal.addEventListener('shown.bs.modal', function () {
    $('.date-picker1').datepicker({
        todayHighlight: true,
        autoclose: true
    });
})


/* new_production  script */

data = [
    {
        "Action": " ",
        "HUB": "RUMEA",
        "HUBUser": "Reshma@himalayawellness.com",
        "Remarks": "Updated",

    },
    {
        "Action": " ",
        "HUB": "HUSA",
        "HUBUser": "Diana@himalayawellness.com",
        "Remarks": "Updated",

    },



]
colmodels = [

    {
        name: 'Action',
        label: 'Action',
        width: 60,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            return `<div class="text-center icon_section align-items-left">
        <a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" data-bs-toggle="modal" data-bs-target="#DeleteModal" title="Delete"></i></a>
    </div>`;
        }
    },
    {
        name: 'HUB',
        label: 'HUB',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'HUBUser',
        label: 'HUB User',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
    },



],

    $("#prd_desc1").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_expected1',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#prd_desc1 tbody tr");
            var objHeader = $("#prd_desc1 tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
//$("#new_moulds").jqGrid('filterToolbar', {
//    autosearch: true,
//    stringResult: false,
//    searchOnEnter: false,
//    defaultSearch: "cn"
//});

$('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
$('.ui-jqgrid-bdiv').children("div").css({ 'min-height': '5vh' });
var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
if ($TableHeight > 330) {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
}
else {
    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
}




//Dependency dropdown for Category

$("#Division").change(function () {
    
    var DivId = $("#Division").val();
    $.ajax({
        type: "POST",
        url: ROOT + "User/GetCategoryBYId",
        data: { divisionId: DivId },
        dataType: "json",
        success: function (categoryResult) {
            
            if (categoryResult != null) {
                $("option").remove(".CategoryOption");
                $.each(categoryResult, function (i, obj) {
                    
                    var categoryList = '<option class="CategoryOption" value="' + obj.categoryID + '">' + obj.categoryName + '</option>';
                    $(".addCategoryOption").append(categoryList);
                })
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
});


/*Code to get date*/
var todayDate = new Date();
$('#NPD_InitiatedDate').text(todayDate.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }));