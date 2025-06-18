
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
    CKEDITOR.replace('editormagic4', {
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
    CKEDITOR.replace('editormagic11', {
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
    CKEDITOR.replace('editormagic12', {
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
    CKEDITOR.replace('editor', {
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
    CKEDITOR.replace('editorcmpoff', {
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
    CKEDITOR.replace('editorcfr', {
        height:275,
        width:950,
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
    CKEDITOR.replace('editorcfr1', {
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

CKEDITOR.replace('PP_HUB_Remarks', {
            height: 270,
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
    







    
        data = [
        {
            //"Action": "",
            "Product": "Product1",
        "ExpectedFeatures": "Easy Squeezability & tear-ability of the sachet Price point Highlight",
        "ExpectedBenefits": "Reduces Hair Fall; Makes Hair",
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

        $("#worksheet").jqGrid({
            url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_worksheet',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
               var objRows = $("#worksheet tbody tr");
        var objHeader = $("#worksheet tbody tr td");
   
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
        $('.ui-jqgrid-bdiv').children("div").css({'min-height': '10vh' });
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
        $("#edit_worksheet").click(function(){
            $(".margin_top115").addClass("top_margin");
        var tr=$(this).closest("tr");
        var productValue=$(tr).children("td").eq(1).text();
        $(".first_profile").val(productValue);
        $("#cke_editor4_features").hide();
        $("#expected_profile").show();
        var product1Value=$(tr).children("td").eq(2).text();
        $("#expected_profile").val(product1Value);
        $("#cke_editor4_benefits").hide();
        $("#benefits_profile").show();
        var indicationValue=$(tr).children("td").eq(3).text();
        $("#benefits_profile").val(indicationValue);
    });
    


//@* Product profile script *@

    data = [
    {
        //"Action": " ",
        "Product": "Product1",
    "DesiredIngredients": "Bhrigaraja & Palasha",
    "IndicationConditions": "1 sachet per Hair wash, shampoo",
    "Musthaveclaims": "Reduces Hair Fall",
    "Nicetohaveclaims": "Reduces Hair Fall",
    "DosageForm": "Liquid",
    "BenchmarkProducts": "Pantene Hair Fall Control, Dove Hair Fall rescue",
    "DesiredProductCharacteristics": "3 years Free from Paraben Sachet format",
    "ImageUpload": "",
        },



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
            name: 'IndicationConditions',
            label: 'Indication Conditions',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Musthaveclaims',
            label: 'Must Have Claims',
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Nicetohaveclaims',
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
            name: 'ImageUpload',
            label: 'Images',
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="text-center icon_section align-items-left">
                          <a class="icon_color btn_button" title="Edit" id="edit_benchmark"><i class="fa fa-download mr-2" title="Edit"></i></a>

                          </div>`;
            }
        },

    ],

    $("#product_profile").jqGrid({
        url: '',
    datatype: 'local',
    data: data,
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_product',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
                var objRows = $("#product_profile tbody tr");
    var objHeader = $("#product_profile tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
    for (i = 0; i < objFirstRowColumns.length; i++) {
        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });
    //$("#product_profile").jqGrid('filterToolbar', {
        //    autosearch: true,
        //    stringResult: false,
        //    searchOnEnter: false,
        //    defaultSearch: "cn"
        //});

        $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
    $('.ui-jqgrid-bdiv').children("div").css({'min-height': '10vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }




//@* Benchmark sample script *@

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
    $('.ui-jqgrid-bdiv').children("div").css({'min-height': '5vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
   if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
   }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
   }
    $("#edit_benchmark").click(function(){
    var tr=$(this).closest("tr");
    var productValue=$(tr).children("td").eq(1).text();
    $("#product22").val(productValue);
    var skuValue=$(tr).children("td").eq(2).text();
    $("#sku22").val(skuValue);
    var markValue=$(tr).children("td").eq(3).text();
    $("#sku23").val(markValue);
    var DesiredValue=$(tr).children("td").eq(4).text();
    $("#desired21").val(DesiredValue);
    var Desired3Value=$(tr).children("td").eq(5).text();
    $("#Desired211").val(Desired3Value);
    var OthersValue=$(tr).children("td").eq(6).text();
    $("#Others3").val(OthersValue);
    });

//@* expected sample script *@

    data = [
    {
        //"Action": " ",
        "Product": "Product1",
    "SKU": "SKU001",
    "PrimaryPackaging": "Singular Sachet",
    "SecondaryPackaging": "Singular Sachet",
    "TertiaryPackaging": "Singular Sachet",
    "BenchmarkProducts": "Singular Sachet",
    "DesiredProductCharacteristics": "Singular Sachet",
    "Others": "Shipper",
    "Mould": "New",
    "ImagesUpload": "",

        },



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
            name: 'DesiredProductCharacteristics',
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
            name: 'ImagesUpload',
            label: 'Images',
            resizable: true,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                return `<div class="text-center icon_section align-items-left">
                              <a class="icon_color btn_button" title="Edit" id="edit_benchmark"><i class="fa fa-download mr-2" title="Edit"></i></a>

                              </div>`;
            }
        },

    ],

    $("#expected").jqGrid({
        url: '',
    datatype: 'local',
    data: data,
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_expected',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
                var objRows = $("#expected tbody tr");
    var objHeader = $("#expected tbody tr td");

                if (objRows.length > 1) {
                    var objFirstRowColumns = $(objRows[1]).children("td");
    for (i = 0; i < objFirstRowColumns.length; i++) {
        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                    }
                }

            }
        });
    //$("#expected").jqGrid('filterToolbar', {
        //    autosearch: true,
        //    stringResult: false,
        //    searchOnEnter: false,
        //    defaultSearch: "cn"
        //});

        $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
    $('.ui-jqgrid-bdiv').children("div").css({'min-height': '5vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }



//@* new_moulds sample script *@

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
          <a class="icon_color btn_button" title="Edit" id="edit_mark"><i class="fa fa-download mr-2" title="Edit"></i></a>
         
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
    $('.ui-jqgrid-bdiv').children("div").css({'min-height': '5vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
   if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
   }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
   }


    $("#edit_mark").click(function(){
    var tr=$(this).closest("tr");
    var productValue=$(tr).children("td").eq(1).text();
    $("#product1").val(productValue);
    var skuValue=$(tr).children("td").eq(2).text();
    $("#sku1").val(skuValue);
    var markValue=$(tr).children("td").eq(3).text();
    $("#sku12").val(markValue);
    var DesiredValue=$(tr).children("td").eq(4).text();
    $("#desired").val(DesiredValue);
    var Desired1Value=$(tr).children("td").eq(5).text();
    $("#Desired1").val(Desired1Value);
    var OthersValue=$(tr).children("td").eq(6).text();
    $("#Others").val(OthersValue);
});


//@* business_info sample script *@

    data = [
    {
        "Action": "",
    "Product": "Product1",
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
        <a class="icon_color btn_button edit" title="Edit" id="edit_info"><i class="fa fa-edit mr-2" title="Edit"></i></a>
        <a class="icon_color btn_button" title="Delete" ><i class="fa fa-trash" data-bs-toggle="modal" data-bs-target="#DeleteModal" title="Delete"></i></a>
    </div>`;
            }
        },
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
        name: 'ProposedNamesofproduct',
    label: 'Proposed Name&#8217;s of Product',
    width: 150,
    resizable: true,
    ignoreCase: true,
        },
    {
        name: 'Proposedlaunchdate',
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
        name: 'M1',
    label: 'M1 Quantity',
    width: 140,
    resizable: true,
    ignoreCase: true,
        },
    {
        name: 'M2',
    label: 'M2 Quantity',
    width: 140,
    resizable: true,
    ignoreCase: true,
        },
    {
        name: 'M3',
    label: 'M3 Quantity',
    width: 140,
    resizable: true,
    ignoreCase: true,
        },
    {
        name: 'Y1',
    label: 'Y1 Quantity',
    width: 140,
    resizable: true,
    ignoreCase: true,
        },
    {
        name: 'Y2',
    label: 'Y2 Quantity',
    width: 140,
    resizable: true,
    ignoreCase: true,
        },
    {
        name: 'Y3',
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

    $("#business_info").jqGrid({
        url: '',
    datatype: 'local',
    data: data,
    mtype: 'GET',
    colModel: colmodels,
    loadonce: true,
    viewrecords: true,
    pager: '#pager_businessinfo',
    rowNum: 20,
    scroll: 1,

    gridComplete: function () {
                var objRows = $("#business_info tbody tr");
    var objHeader = $("#business_info tbody tr td");

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
        //    defaultSearch: "cn",

        //});

        $('.ui-jqgrid-bdiv').css({ 'max-height': '45vh' });
    $('.ui-jqgrid-bdiv').children("div").css({'min-height': '5vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
    }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
    }


//@* popup modal info *@

    data = [
    {
        //"Action": "",
        "Product": "Product1",
    "SKU": "SKU001",
    "ProposedNamesofproduct": "Bhringaraja Hairfall Shampoo (TBC)",
    "Proposedlaunchdate": "12-06-2022",
    "ProposedSellingPrice": "Rs 3 for 6 ml",
    "ProposedTP": "Rs 2 for 6 ml",
    "ProposedMRP": "Rs 2 for 6 ml",
    "ExpectedGP": "Rs 2 for 6 ml",
    "M1": "20,00,000 .",
    "M2": "30,00,000 .",
    "M3": "20,00,000 .",
    "Y1": "2,20.00.000 .",
    "Y2": "2,20,00,000 .",
    "Y3": "3,70,00,000 .",
    "UOM": "ml",
    "BusinessValue":"",
    "ProjectCategorization":"",
    "ComplexitytobeAssigned":"",
    "Stakeholders":"",
       },
    {
        //"Action": "",
        "Product": "Product2",
    "SKU": "SKU002",
    "ProposedNamesofproduct": "Bhringaraja Hairfall Shampoo ",
    "Proposedlaunchdate": "12-07-2022",
    "ProposedSellingPrice": "Rs 3 for 6 ml",
    "ProposedTP": "Rs 2 for 6 ml",
    "ProposedMRP": "Rs 2 for 6 ml",
    "ExpectedGP": "Rs 2 for 6 ml",
    "M1": "20,00,000 .",
    "M2": "30,00,000 .",
    "M3": "20,00,000 .",
    "Y1": "2,20.00.000 .",
    "Y2": "2,20,00,000 .",
    "Y3": "3,70,00,000 .",
    "UOM": "ml",
    "BusinessValue":"",
    "ProjectCategorization":"",
    "ComplexitytobeAssigned":"",
    "Stakeholders":"",
       },
    {
        //"Action": "",
        "Product": "Product3",
    "SKU": "SKU003",
    "ProposedNamesofproduct": "Bhringaraja Hairfall Shampoo (TBC)",
    "Proposedlaunchdate": "12-09-2022",
    "ProposedSellingPrice": "Rs 3 for 6 ml",
    "ProposedTP": "Rs 2 for 6 ml",
    "ProposedMRP": "Rs 2 for 6 ml",
    "ExpectedGP": "Rs 2 for 6 ml",
    "M1": "20,00,000 .",
    "M2": "30,00,000 .",
    "M3": "20,00,000 .",
    "Y1": "2,20.00.000 .",
    "Y2": "2,20,00,000 .",
    "Y3": "3,70,00,000 .",
    "UOM": "ml",
    "BusinessValue":"",
    "ProjectCategorization":"",
    "ComplexitytobeAssigned":"",
    "Stakeholders":"",
       },



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
            name: 'ProposedNamesofproduct',
            label: 'Proposed Name&#8217;s of Product',
            width: 150,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Proposedlaunchdate',
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
            name: 'M1',
            label: 'M1 Quantity',
            width: 140,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'M2',
            label: 'M2 Quantity',
            width: 140,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'M3',
            label: 'M3 Quantity',
            width: 140,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Y1',
            label: 'Y1 Quantity',
            width: 140,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Y2',
            label: 'Y2 Quantity',
            width: 140,
            resizable: true,
            ignoreCase: true,
        },
        {
            name: 'Y3',
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
    pager: '#pager_businessinfo',
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
    $('.ui-jqgrid-bdiv').children("div").css({'min-height': '5vh' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
   if ($TableHeight > 330) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "17px");
   }
    else {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
    $(".-virtual-scroll").find(".ui-jqgrid-hbox").css("padding-right", "0px")
   }


    $("#edit_info").click(function(){
    var tr=$(this).closest("tr");
    var productValue=$(tr).children("td").eq(1).text();
    $("#product").val(productValue);
    var skuValue=$(tr).children("td").eq(2).text();
    $("#sku").val(skuValue);
    var ProposedValue=$(tr).children("td").eq(3).text();
    $("#proposed").val(ProposedValue);
    var dateValue=$(tr).children("td").eq(4).text();
    $("#date").val(dateValue);
    var PriceValue=$(tr).children("td").eq(5).text();
    $("#price").val(PriceValue);
    var MRPValue=$(tr).children("td").eq(6).text();
    $("#mrp_tp").val(MRPValue);
    var GPValue=$(tr).children("td").eq(7).text();
    $("#gp").val(GPValue);
    var m1Value=$(tr).children("td").eq(8).text();
    $("#m1").val(m1Value);
    var m2Value=$(tr).children("td").eq(9).text();
    $("#m2").val(m2Value);
    var m3Value=$(tr).children("td").eq(10).text();
    $("#m3").val(m3Value);
    var y1Value=$(tr).children("td").eq(11).text();
    $("#y1").val(y1Value);
    var y2Value=$(tr).children("td").eq(12).text();
    $("#y2").val(y2Value);
    var y3Value=$(tr).children("td").eq(13).text();
    $("#y3").val(y3Value);
});

