
var myApprovalPendingData = $.parseJSON($('#MyApprovalPendingData').val());

var CategoryList = $.parseJSON($('#CategoryString').val());
var ProductList = $.parseJSON($('#ProductString').val());
var SubCategoryList = $.parseJSON($('#SubCategoryString').val());
var UserName = $('#UserName').val();
var isNpdList = $.parseJSON($('#IsNpdList_Serialized').val());
var checkedData = [];
var selectedbox = [];
var ProductcheckedData = [];

var catcheckedData = [];

colmodels = [

    {
        name: 'Check_Box',
        label: '<input type="checkbox" id="cbox" onclick="checkBox(event)"/>',
        editable: true,
        index: 'Check_Box',
        width: 60,
        align: 'left',
        resizable: false,
        edittype: 'checkbox',
        formatoptions: {
            disabled: false
        },
        editoptions:
        {
            value: "True:False"
        },

        sortable: false,
        search: false,
        formatter: function checkboxFormatter(cellValue, options, rowObject) {
            var uniqueId = 'checkbox_' + options.rowId;
            var checkbox = '<input type="checkbox" id="' + uniqueId + '" class="checkbox" />';
            return checkbox;
        }
    },

    {
        name: 'Action',
        label: 'Action',
        width: 90,
        resizable: true,
        ignoreCase: true,
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="text-center ">' +
                '<div><span class="btn-icon -edit" title="Approve" onclick=SingleApproveOrReject(' + rowobject.MaterialCode + ',"Yes")><i class="fas fa-thumbs-up"></i></span><span title="Reject" class="btn-icon -delete" onclick=SingleApproveOrReject(' + rowobject.MaterialCode + ',"No") data-bs-toggle="modal" data-bs-target="#reject" ><i class="fas fa-thumbs-down"></i></span></div>' +
                '</div>';
        }
    },

    {
        name: 'MaterialCode',
        label: 'Material Code',
        resizable: true,
        ignoreCase: true,
        width: 100,
        classes: 'materialcode',
    },
    {
        name: 'MaterialName',
        label: 'Material Name',
        resizable: true,
        ignoreCase: true,
        width: 200,
    },
    {
        name: 'CreatedDate',
        label: 'Material Created Date',
        resizable: true,
        ignoreCase: true,
        width: 100,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd-m-Y' },
        exportcol: false,
    },
    {
        name: 'MaterialCreatedDate',
        label: 'Material Created Date',
        resizable: true,
        ignoreCase: true,
        width: 100,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'ProductGroup',
        label: 'HGML Product Group',
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        title: false,
        formatter: function (cellvalue, options, rowobject) {
            productString = "";
            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var productGroup;
            if (index >= 0) {
                productGroup = checkedData[index].ProductGroup;
            }
            else {
                productGroup = rowobject.ProductGroup;
            }

            if (productGroup == "" || productGroup == null || productGroup == undefined) {
                for (var i = 0; i < ProductList.length; i++) {
                    productString += '<option value="' + ProductList[i].Value + '">' + ProductList[i].Value + '</option>';
                }
                return `<div class="text-left "> 
                              <select class="form-control appearence ProductGroup data-singleselect" id=`+ rowobject.MaterialCode + `ProductGroup'> <option value="" >Select</option>` + productString + `</select>
                        </div>`;
            }
            else if (productGroup != rowobject.ProductGroup) {
                for (var i = 0; i < ProductList.length; i++) {
                    if (ProductList[i].Value == productGroup) {
                        productString += '<option value="' + ProductList[i].Value + '" selected>' + ProductList[i].Value + '</option>';
                    } else {
                        productString += '<option value="' + ProductList[i].Value + '">' + ProductList[i].Value + '</option>';
                    }
                }
                if (rowobject.ProductGroup != null) {
                    return `<div class="text-left "> 
                    <select class="form-control  appearence ProductGroup data-singleselect" id=`+ rowobject.MaterialCode + `ProductGroup'>` + productString + `</select> 
                      </div>`;
                }
                else {
                    return `<div class="text-left "> 
                    <select class="form-control  appearence ProductGroup data-singleselect" id=`+ rowobject.MaterialCode + `ProductGroup'> <option value="" >Select</option>` + productString + `</select> 
                      </div>`;
                }
            }
            else {
                for (var i = 0; i < ProductList.length; i++) {
                    if (ProductList[i].Value == rowobject.ProductGroup) {
                        productString += '<option value="' + ProductList[i].Value + '" selected>' + ProductList[i].Value + '</option>';
                    } else {
                        productString += '<option value="' + ProductList[i].Value + '">' + ProductList[i].Value + '</option>';
                    }
                }
                return `<div class="text-left "> 
                    <select class="form-control  appearence ProductGroup data-singleselect" id=`+ rowobject.MaterialCode + `ProductGroup'>` + productString + `</select> 
                       </div>`;

            }
        }
    },
    {
        name: 'HGMLSubCategory',
        label: 'HGML Sub Category',
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        title: false,
        formatter: function (cellvalue, options, rowobject) {
            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var SubCategory;
            if (index >= 0) {
                SubCategory = checkedData[index].HGMLSubCategory;
            }
            else {
                SubCategory = rowobject.HGMLSubCategory;
            }
            subCategoryString = "";


            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var ProductGroup;
            if (index >= 0) {
                ProductGroup = checkedData[index].ProductGroup;
            }
            else {
                ProductGroup = rowobject.ProductGroup;
            }


            var index = ProductcheckedData.findIndex(s => s.materialCode == rowobject.MaterialCode && s.productgroup == ProductGroup);
            var SubCategoryOpt;

            if (index >= 0) {
                SubCategoryOpt = ProductcheckedData[index].subCategory;
            }
            else {
                SubCategoryOpt = rowobject.HGMLSubCategory;
            }
            var hgmlSubCategoryOptionsArray
            if (rowobject.HGMLSubCategoryOptions != "" && rowobject.HGMLSubCategoryOptions != null) {
                hgmlSubCategoryOptionsArray = rowobject.HGMLSubCategoryOptions.split(',');
            }


            if ((SubCategory == "" || SubCategory == null || SubCategory == undefined) && (ProductGroup == "" || ProductGroup == null || ProductGroup == undefined)) {
                return '<div class="text-left">' +
                    '<select class="form-control appearence HGMLSubCategory data-singleselect" id="' + rowobject.MaterialCode + 'HGMLSubCategory"><option value="" >Select</option></select>' +
                    '</div>';
            }
            else if ((SubCategory != "" && SubCategory != null && SubCategory != undefined) && (ProductGroup == "" || ProductGroup == null || ProductGroup == undefined)) {
                return '<div class="text-left">' +
                    '<select class="form-control appearence HGMLSubCategory data-singleselect" id="' + rowobject.MaterialCode + 'HGMLSubCategory"><option value="" >Select</option></select>' +
                    '</div>';
            }
            else if ((ProductGroup != null && ProductGroup != "" && ProductGroup != undefined) && (SubCategory == "" || SubCategory == null || SubCategory == undefined) && (SubCategoryOpt == null || SubCategoryOpt == "")) {
                var categoryArray = hgmlSubCategoryOptionsArray;
                subCategoryString = '<option value="" >Select</option>';
                for (var i = 0; i < categoryArray.length; i++) {
                    subCategoryString += '<option class="SubCategoryOption" value="' + categoryArray[i] + '">' + categoryArray[i] + '</option>';
                }
                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLSubCategory data-singleselect" id=`+ rowobject.MaterialCode + `HGMLSubCategory'>` + subCategoryString + `</select> 
                           </div>`;

            }

            else if ((ProductGroup != null && ProductGroup != "" && ProductGroup != undefined) && ((rowobject.HGMLSubCategory != null && rowobject.HGMLSubCategory != "" && rowobject.HGMLSubCategory != undefined) && SubCategory == rowobject.HGMLSubCategory) && hgmlSubCategoryOptionsArray != undefined) {
                var categoryArray = hgmlSubCategoryOptionsArray;
                subCategoryString = '<option value="" >Select</option>';
                for (var i = 0; i < categoryArray.length; i++) {
                    if (rowobject.HGMLSubCategory == categoryArray[i]) {
                        subCategoryString += '<option class="SubCategoryOption" value="' + categoryArray[i] + '" selected>' + categoryArray[i] + '</option>';
                    }
                    else {
                        subCategoryString += '<option class="SubCategoryOption" value="' + categoryArray[i] + '">' + categoryArray[i] + '</option>';
                    }
                }
                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLSubCategory data-singleselect" id=`+ rowobject.MaterialCode + `HGMLSubCategory'>` + subCategoryString + `</select> 
                           </div>`;

            }

            else if (SubCategory != rowobject.HGMLSubCategory) {
                if (SubCategoryOpt != "" && SubCategoryOpt != null) {
                    var Catlist = SubCategoryOpt.split(',');
                }
                else if (rowobject.HGMLSubCategoryOptions != "" || rowobject.HGMLSubCategoryOptions != null) {
                    var Catlist = hgmlSubCategoryOptionsArray;
                }

                if (Catlist.length != 0) {
                    for (var i = 0; i < Catlist.length; i++) {
                        if (Catlist[i] === SubCategory) {
                            subCategoryString += '<option class="SubCategoryOption" value="' + Catlist[i] + '" selected>' + Catlist[i] + '</option>';
                        } else {
                            subCategoryString += '<option class="SubCategoryOption" value="' + Catlist[i] + '">' + Catlist[i] + '</option>';
                        }
                    }
                }
                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLSubCategory data-singleselect" id=`+ rowobject.MaterialCode + `HGMLSubCategory'><option value="" >Select</option>` + subCategoryString + `</select> 
                           </div>`;

            }
            else {
                if (SubCategoryOpt != "" && SubCategoryOpt != null) {
                    var Catlist = SubCategoryOpt.split(',');
                }
                else if (rowobject.HGMLSubCategoryOptions != "" || rowobject.HGMLSubCategoryOptions != null) {
                    var Catlist = hgmlSubCategoryOptionsArray;
                }
                if (Catlist.length != 0) {
                    for (var i = 0; i < Catlist.length; i++) {
                        if (Catlist[i] === SubCategory) {
                            subCategoryString += '<option class="SubCategoryOption" value="' + Catlist[i] + '" selected>' + Catlist[i] + '</option>';
                        } else {
                            subCategoryString += '<option class="SubCategoryOption" value="' + Catlist[i] + '">' + Catlist[i] + '</option>';
                        }
                    }
                }
                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLSubCategory data-singleselect" id=`+ rowobject.MaterialCode + `HGMLSubCategory'><option value="" >Select</option>` + subCategoryString + `</select> 
                           </div>`;
            }
        }
    },
    {
        name: 'HGMLCategory',
        label: 'HGML Category',
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        title: false,
        formatter: function (cellvalue, options, rowobject) {
            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var Category;
            if (index >= 0) {
                Category = checkedData[index].HGMLCategory;
            }
            else {
                Category = rowobject.HGMLCategory;
            }
            categoryString = "";

            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var subcategory;
            if (index >= 0) {
                subcategory = checkedData[index].HGMLSubCategory;
            }
            else {
                subcategory = rowobject.HGMLSubCategory;
            }

            var index = catcheckedData.findIndex(s => s.materialCode == rowobject.MaterialCode && s.subcategory == subcategory);
            var CategoryOpt;
            if (index >= 0) {
                CategoryOpt = catcheckedData[index].categoryValues;
            }
            else {
                CategoryOpt = rowobject.HGMLCategory;
            }

            var hgmlCategoryOptionsArray
            if (rowobject.HGMLCategoryOptions != "" && rowobject.HGMLCategoryOptions != null) {
                hgmlCategoryOptionsArray = rowobject.HGMLCategoryOptions.split(',');
            }


            if (((Category == "" || Category == null || Category == undefined) || ((Category != "" && Category != null && Category != undefined))) && (subcategory == "" || subcategory == null || subcategory == undefined)) {
                return '<div class="text-left">' +
                    '<select class="form-control appearence HGMLCategory data-singleselect" id="' + rowobject.MaterialCode + 'HGMLCategory"><option value="" >Select</option></select>' +
                    '</div>';
            }
            else if (((subcategory == "" || subcategory == null || subcategory == undefined) || (subcategory != null && subcategory != "" && subcategory != undefined)) && (rowobject.ProductGroup == null || rowobject.ProductGroup == "" || rowobject.ProductGroup == undefined)) {
                return '<div class="text-left">' +
                    '<select class="form-control appearence HGMLCategory data-singleselect" id="' + rowobject.MaterialCode + 'HGMLCategory"><option value="" >Select</option></select>' +
                    '</div>';
            }

            else if ((subcategory != null && subcategory != "" && subcategory != undefined) && (rowobject.ProductGroup != null && rowobject.ProductGroup != "" && rowobject.ProductGroup != undefined) && (Category == "" || Category == null || Category == undefined) && (CategoryOpt == null || CategoryOpt == "")) {
                var categoryArray = hgmlCategoryOptionsArray;
                categoryString = '<option value="" >Select</option>';
                for (var i = 0; i < categoryArray.length; i++) {
                    categoryString += '<option class="CategoryOption" value="' + categoryArray[i] + '">' + categoryArray[i] + '</option>';
                }
                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLCategory data-singleselect" id=`+ rowobject.MaterialCode + `HGMLCategory'>` + categoryString + `</select> 
                           </div>`;

            }

            else if ((subcategory != null && subcategory != "" && subcategory != undefined) && ((rowobject.HGMLCategory != null && rowobject.HGMLCategory != "" && rowobject.HGMLCategory != undefined) && Category == rowobject.HGMLCategory) && (rowobject.HGMLProductgroup != null && rowobject.HGMLProductgroup != "" && rowobject.HGMLProductgroup != undefined)) {
                var categoryArray = hgmlCategoryOptionsArray;
                categoryString = '<option value="" >Select</option>';
                for (var i = 0; i < categoryArray.length; i++) {
                    if (rowobject.HGMLCategory == categoryArray[i]) {
                        categoryString += '<option class="CategoryOption" value="' + categoryArray[i] + '" selected>' + categoryArray[i] + '</option>';
                    }
                    else {
                        categoryString += '<option class="CategoryOption" value="' + categoryArray[i] + '">' + categoryArray[i] + '</option>';
                    }
                }
                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLCategory data-singleselect" id=`+ rowobject.MaterialCode + `HGMLCategory'>` + categoryString + `</select> 
                           </div>`;

            }

            else if (Category != rowobject.HGMLCategory) {
                if (CategoryOpt != "" && CategoryOpt != null) {
                    var Catlist = CategoryOpt.split(',');
                }
                else if (rowobject.HGMLCategoryOptions != "" || rowobject.HGMLCategoryOptions != null) {
                    var Catlist = hgmlCategoryOptionsArray;
                }
                if (Catlist != undefined) {
                    for (var i = 0; i < Catlist.length; i++) {
                        if (Catlist[i] === Category) {
                            categoryString += '<option class="CategoryOption" value="' + Catlist[i] + '" selected>' + Catlist[i] + '</option>';
                        } else {
                            categoryString += '<option class="CategoryOption" value="' + Catlist[i] + '">' + Catlist[i] + '</option>';
                        }
                    }
                }
                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLCategory data-singleselect" id=`+ rowobject.MaterialCode + `HGMLCategory'><option value="" >Select</option>` + categoryString + `</select> 
                           </div>`;

            }
            else {
                if (CategoryOpt != "" && CategoryOpt != null) {
                    var Catlist = CategoryOpt.split(',');
                }
                else if (rowobject.HGMLCategoryOptions != "" || rowobject.HGMLCategoryOptions != null) {
                    var Catlist = hgmlCategoryOptionsArray;
                }

                if (Catlist != undefined) {
                    for (var i = 0; i < Catlist.length; i++) {
                        if (Catlist[i] === Category) {
                            categoryString += '<option class="CategoryOption" value="' + Catlist[i] + '" selected>' + Catlist[i] + '</option>';
                        } else {
                            categoryString += '<option class="CategoryOption" value="' + Catlist[i] + '">' + Catlist[i] + '</option>';
                        }
                    }
                }
                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLCategory data-singleselect" id=`+ rowobject.MaterialCode + `HGMLCategory'><option value="" >Select</option>` + categoryString + `</select> 
                           </div>`;
            }
        }
    },
    {
        name: 'HGMLDivision',
        label: 'HGML Division',
        resizable: true,
        ignoreCase: true,
        width: 120,
        exportcol: false,
        title: false,
        exportcol: false,

        formatter: function (cellvalue, options, rowobject) {
            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var DString = "";
            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var division;
            if (index >= 0) {
                division = checkedData[index].HGMLDivision;
            }
            else {
                division = rowobject.HGMLDivision;
            }

            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var subcategory;
            if (index >= 0) {
                subcategory = checkedData[index].HGMLSubCategory;
            }
            else {
                subcategory = rowobject.HGMLSubCategory;
            }

            var index = catcheckedData.findIndex(s => s.materialCode == rowobject.MaterialCode && s.subcategory == subcategory);
            var DivOpt;
            if (index >= 0) {
                DivOpt = catcheckedData[index].divisionValues;
            }
            else {
                DivOpt = rowobject.HGMLDivision;
            }

            var hgmlDivisionOptionsArray
            if (rowobject.HGMLDivisionOptions != "" && rowobject.HGMLDivisionOptions != null) {
                hgmlDivisionOptionsArray = rowobject.HGMLDivisionOptions.split(',');
            }

            if (((division == null || division == "" || division == undefined) || (division != null && division != "" && division != undefined)) && (subcategory == null || subcategory == "" || subcategory == undefined)) {

                return '<div class="text-left ">' +
                    '<select class="form-control appearence HGMLDivision data-singleselect" id="' + rowobject.MaterialCode + 'HGMLDivision"><option value="" >Select</option></select>' +
                    '</div>';
            }
            else if (((subcategory == "" || subcategory == null || subcategory == undefined) || (subcategory != null && subcategory != "" && subcategory != undefined)) && (rowobject.ProductGroup == null || rowobject.ProductGroup == "" || rowobject.ProductGroup == undefined)) {
                return '<div class="text-left ">' +
                    '<select class="form-control appearence HGMLDivision data-singleselect" id="' + rowobject.MaterialCode + 'HGMLDivision"><option value="" >Select</option></select>' +
                    '</div>';
            }

            else if ((subcategory != null && subcategory != "" && typeof (subcategory) != "undefined") && (rowobject.ProductGroup != null && rowobject.ProductGroup != "" && rowobject.ProductGroup != undefined) && (division == "" || division == null || division == undefined) && (DivOpt == null || DivOpt == "")) {
                var divisionArray = hgmlDivisionOptionsArray
                DString = '<option value="" >Select</option>';
                for (var i = 0; i < divisionArray.length; i++) {
                    DString += '<option class="DivisionOption" value="' + divisionArray[i] + '">' + divisionArray[i] + '</option>';
                }
                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLDivision data-singleselect" id=`+ rowobject.MaterialCode + `HGMLDivision'>` + DString + `</select> 
                           </div>`;

            }

            else if ((subcategory != null && subcategory != "" && typeof (subcategory) != "undefined") && ((rowobject.HGMLDivision != null && rowobject.HGMLDivision != "" && rowobject.HGMLDivision != undefined) && division == rowobject.HGMLDivision) && (rowobject.HGMLProductgroup != null && rowobject.HGMLProductgroup != "" && rowobject.HGMLProductgroup != undefined)) {
                var divisionArray = hgmlDivisionOptionsArray
                DString = '<option value="" >Select</option>';
                for (var i = 0; i < divisionArray.length; i++) {
                    if (rowobject.HGMLDivision == divisionArray[i]) {
                        DString += '<option class="DivisionOption" value="' + divisionArray[i] + '" selected>' + divisionArray[i] + '</option>';
                    }
                    else {
                        DString += '<option class="DivisionOption" value="' + divisionArray[i] + '">' + divisionArray[i] + '</option>';
                    }
                }
                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLDivision data-singleselect" id=`+ rowobject.MaterialCode + `HGMLDivision'>` + DString + `</select> 
                           </div>`;

            }

            else if (division != rowobject.HGMLDivision) {
                if (DivOpt != "" && DivOpt != null) {
                    var Divlist = DivOpt.split(',');
                }
                else if (rowobject.HGMLCategoryOptions != "" || rowobject.HGMLCategoryOptions != null) {
                    var Divlist = hgmlDivisionOptionsArray;
                }
                if (Divlist.length != 0) {
                    for (var i = 0; i < Divlist.length; i++) {
                        if (Divlist[i] === division) {
                            DString += '<option class="DivisionOption" value="' + Divlist[i] + '" selected>' + Divlist[i] + '</option>';
                        } else {
                            DString += '<option class="DivisionOption" value="' + Divlist[i] + '">' + Divlist[i] + '</option>';
                        }
                    }
                }

                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLDivision data-singleselect" id=`+ rowobject.MaterialCode + `HGMLDivision'><option value="" >Select</option>` + DString + `</select> 
                           </div>`;

            }
            else {
                if (DivOpt != "" && DivOpt != null) {
                    var Divlist = DivOpt.split(',');
                }
                else if (rowobject.HGMLCategoryOptions != "" || rowobject.HGMLCategoryOptions != null) {
                    var Divlist = hgmlDivisionOptionsArray;
                }
                if (Divlist.length != 0) {
                    for (var i = 0; i < Divlist.length; i++) {
                        if (Divlist[i] === division) {
                            DString += '<option class="DivisionOption" value="' + Divlist[i] + '" selected>' + Divlist[i] + '</option>';
                        } else {
                            DString += '<option class="DivisionOption" value="' + Divlist[i] + '">' + Divlist[i] + '</option>';
                        }
                    }
                }

                return `<div class="text-left "> 
                           <select class="form-control appearence HGMLDivision data-singleselect" id=`+ rowobject.MaterialCode + `HGMLDivision'><option value="" >Select</option>` + DString + `</select> 
                           </div>`;

            }
        }
    },


    //{
    //    name: 'HGMLDivision',
    //    label: 'HGML Division',
    //    resizable: true,
    //    ignoreCase: true,
    //    width: 120,
    //    hidden: true,
    //    classes: "HGMLDivision"
    //},
    {
        name: 'HGMLFormulation',
        label: 'HGML Formulation',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        classes: "HGMLFormulation"
    },
    {
        name: 'BusinessLaunchYear',
        label: 'Business Launch Year',
        exportcol: true,
        search: true,
        resizable: true,
        ignoreCase: true,
        width: 100,
    },
    {
        name: 'BusinessLaunchDate',
        label: 'Business Launch Date',
        resizable: true,
        ignoreCase: true,
        width: 140,
        title: false,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd-m-Y' },
        formatter: function (cellvalue, options, rowobject) {
            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var businessValue;
            if (index >= 0) {

                businessValue = checkedData[index].BusinessLaunchDate;
            }
            else {

                businessValue = rowobject.BusinessLaunchDate;
            }
            if (businessValue == "") {

                return `<div class="text-left datepicker-container">
                    <input type="text" onpaste="return false;" value="`+ businessValue + `" class="form-control input_height data-datepicker BusinessLaunchDate" id='` + rowobject.MaterialCode + `BusinessLaunchDate'/>
                    <span class="datepicker-symbol"></span>
                    </div>`;
            }
            else {
                return `<div class="text-left datepicker-container">
                    <input type="text" onpaste="return false;" value="`+ businessValue + `" class="form-control input_height data-datepicker BusinessLaunchDate" id='` + rowobject.MaterialCode + `BusinessLaunchDate'/>
                    <span class="datepicker-symbol"></span>
                    </div>`;
            }

        }
    },
    {
        name: 'RandDLaunchDate',
        label: 'R&D Launch Date',
        resizable: true,
        ignoreCase: true,
        width: 140,
        title: false,
        sorttype: 'date',
        formatter: 'date',
        formatoptions: { newformat: 'd-m-Y' },
        formatter: function (cellvalue, options, rowobject) {
            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var randDValue;
            if (index >= 0) {

                randDValue = checkedData[index].RandDLaunchDate;
            }
            else {

                randDValue = rowobject.RandDLaunchDate;
            }

            if (randDValue == "") {
                return `<div class="text-left datepicker-container">
                    <input type="text" class="form-control input_height data-datepicker RandDLaunchDate"  value=` + randDValue + `>
                    <span class="datepicker-symbol"></span>
                    </div>`;
            }
            else {
                return `<div class="text-left datepicker-container"> 
                    <input type="text" class="form-control input_height data-datepicker RandDLaunchDate"  value=` + randDValue + `> 
                    <span class="datepicker-symbol" ></span>
                    </div>`;

            }


        }
    },
    {
        name: 'IsNPD',
        label: 'Is NPD',
        resizable: true,
        ignoreCase: true,
        width: 120,
        title: false,
        formatter: function (cellvalue, options, rowobject) {
            isnpdString = "";
            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);

            var isNpdValue;
            if (index >= 0) {

                if (checkedData[index].IsNPD == '1') {
                    isNpdValue = 'Yes';
                }
                else if (checkedData[index].IsNPD == '0') {
                    isNpdValue = 'No';
                }
            }
            else {
                isNpdValue = rowobject.IsNPD;
            }

            if (isNpdValue != "") {
                var isNpd = "";

                for (var i = 0; i < isNpdList.length; i++) {
                    if (isNpdValue == isNpdList[i].Text) {
                        isNpd += '<option selected  value="' + isNpdList[i].Value + '">' + isNpdList[i].Text + '</option>';
                    } else {
                        isNpd += '<option  value="' + isNpdList[i].Value + '">' + isNpdList[i].Text + '</option>';
                    }
                }

                return `<div class="text-left ">
                               <select class="form-control data-singleselect appearence IsNPD" id='`+ rowobject.MaterialCode + `IsNPD'>` + isNpd + `</select> </div>`;

            }
        }
    },
    {
        name: 'UpdatedBy',
        label: 'Updated by',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'ApprovedOrRejectedBy',
        label: 'Approved/Rejected by',
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Status',
        label: 'Staus',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },
    {
        name: 'IsProductHierarchyFilled',
        label: 'Is Product Hierarchy Data Filled',
        resizable: true,
        ignoreCase: true,
        width: 100,
        hidden: true
    },
    {
        name: 'HGMLCategoryOptions',
        label: 'HGMLCategoryOptions',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: false,
    },
    {
        name: 'HGMLDivisionOptions',
        label: 'HGMLDivisionOptions',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: false,
    },

],

    $("#MyApprovalPending_Grid").jqGrid({
        url: '',
        datatype: 'local',
        data: myApprovalPendingData,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_MyApprovalPending_Grid',
        rowNum: myApprovalPendingData.length,
        scroll: 1,
        //multiselect: true,
        rowattr: function (rowData) {
            if (rowData.IsProductHierarchyFilled == '0') {
                return {
                    "style": "outline: 1.5px solid #FF0000;"
                    //"style": "background: red;"
                    //"class": "highlight-row"
                };
            }
        },
        gridComplete: function () {
            var objRows = $("#MyApprovalPending_Grid tbody tr");
            var objHeader = $("#MyApprovalPending_Grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            for (var i = 0; i < selectedbox.length; i++) {
                $("#MyApprovalPending_Grid tbody tr").each(function (index, e) {
                    var materialCode = $(e).find("td:nth-child(3)").text(); // Assuming MaterialCode is in the second column

                    if (materialCode == selectedbox[i].MaterialCode) {
                        $(e).find("td:nth-child(1) input").prop("checked", true);
                    }
                });
            }

            //var gridData = $("#MyApprovalPending_Grid").jqGrid('getRowData');
            //for (var i = 0; i < gridData.length; i++) {

            //    if (gridData[i].IsProductHierarchyFilled == '0') {
            //        $("#MyApprovalPending_Grid").jqGrid('setRowData', i + 1, false, { outline: '1.5px solid #FF0000' });
            //    }
            //}

            //jQuery('#MyApprovalPending_Grid').jqGrid('setCell', 1, '', '', { 'background-color': 'yellow' });


            $('.data-datepicker').datepicker({
                format: 'dd-mm-yyyy',
                todayHighlight: true,
                autoclose: true
            });
            $('#MyApprovalPending_Grid tr td:nth-child(1)').click(function () {
                var checkbox = $(this).find('input[type="checkbox"]');
                if (checkbox.prop('checked')) {
                    $('#MyApprovalPending_Grid tr').removeClass('active');
                    $(this).parent().addClass('show_edit')
                } else {
                    $(this).parent().addClass('active');
                    $(this).parent().removeClass('show_edit');
                }
            });

            var headerCheckbox = document.getElementById('cbox');
            if (headerCheckbox.checked) {
                var headerCheckbox = document.getElementById('cbox');
                var allChecked = true;
                $('#MyApprovalPending_Grid tbody .checkbox').each(function () {
                    if (!this.checked) {
                        allChecked = false;
                        return false; // Exit the loop early
                    }
                });
                if (allChecked) {
                    headerCheckbox.checked = true;
                } else {
                    headerCheckbox.checked = false;
                }
                var checkbox = $(this).find('input[type="checkbox"]');
                if (checkbox.prop('checked')) {
                    $('#MyApprovalPending_Grid tr').removeClass('active');
                    $(this).parent().addClass('show_edit');
                }
                else {
                    $(this).parent().addClass('active');
                    $(this).parent().removeClass('show_edit');
                }
            }

            $('[data-singleselect]').select2();
            $('.data-singleselect').select2();
        }
    });
$("#MyApprovalPending_Grid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
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

$("#SearchNpdLmData").on("click", function () {
    NPDListLoad();
});

function NPDListLoad() {
    debugger
    var division = $("#NpdHmlDivision").val();
    var category = $("#NpdHgmlCategory").val();
    var productGroup = $("#NpdHgmlProductGroup").val();
    var subCategory = $("#NpdHgmlSubCategory").val();
    $.ajax({
        type: "POST",
        url: ROOT + "NPDLaunchMaster/MyapprovalPendingHeaderData",
        data: { division: division, category: category, productGroup: productGroup, subCategory: subCategory },
        success: function (result) {
            var result_json = JSON.parse(result);
            $("#MyApprovalPending_Grid").jqGrid("clearGridData");
            $("#MyApprovalPending_Grid").jqGrid('setGridParam', { data: result_json });
            $("#MyApprovalPending_Grid").trigger('reloadGrid', [{ page: 1 }]);
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}

setTimeout(function () {
    $('#message_alert').fadeOut('slow');
}, 5000);

$('#MyApprovalPending_Grid tr td:nth-child(1)').click(function () {
    var checkbox = $(this).find('input[type="checkbox"]');
    if (checkbox.prop('checked')) {
        $('#MyApprovalPending_Grid tr').removeClass('active');
        $(this).parent().addClass('show_edit')
    } else {
        $(this).parent().addClass('active');
        $(this).parent().removeClass('show_edit');
    }
});



$('.multiselect').multiselect({
    includeSelectAllOption: true,
    buttonWidth: 220,
    maxHeight: 300,
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true
});
$(document).ready(function () {
    $('#purpose').on('change', function () {
        if (this.value == 'business') {
            $(".year_dropdown").show();
        }
        else if (this.value == 'rd') {
            $(".year_dropdown").show();
        }
        else {
            $(".year_dropdown").hide();
        }
    });
    $('#purpose1').on('change', function () {
        if (this.value == 'details') {
            $("#so_number").hide();
            $("#serial_number, #assign_engineer").show();
        }
        else {
            $("#so_number").show();
            $("#serial_number").hide();
        }
    });

});

//to get the check box
$('body').on('change', '.checkbox', function () {
    if ($(this).is(':checked')) {
        var rowData = getmaterialcodeonly(this);
        selectedbox.push(rowData);
    }
    else if (!$(this).is(':checked')) {

        var rowData = getmaterialcodeonly(this);
        var foundIndex = selectedbox.findIndex(x => x.MaterialCode === rowData.MaterialCode);
        if (foundIndex !== -1) {
            selectedbox.splice(foundIndex, 1);
        }
    }
});

function getmaterialcodeonly(obj) {
    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#MyApprovalPending_Grid');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");

    var materialCode = grd.jqGrid('getCell', rowid, 'MaterialCode');
    var arrayitem = {
        MaterialCode: materialCode
    }
    return arrayitem;
}

var subCategoryValues = "";

$('body').on('change', '.ProductGroup', function () {
    subCategoryValues = "";

    var clossestTableRow = $(this).closest("tr");
    var grd = $('#ProductHierarchy_Grid');
    var rowid = $(this).closest("tr.jqgrow").attr("id");
    var HGMLProductgroup = $(clossestTableRow).children().find(".ProductGroup").val() != undefined ? $(clossestTableRow).children().find(".ProductGroup").val() : grd.jqGrid('getCell', rowid, 'ProductGroup');

    $.ajax({
        type: "POST",
        url: ROOT + "NPDLaunchMaster/GetOtherMasterInfoByProductGroup",
        data: { ProductGroup: HGMLProductgroup },
        dataType: "json",
        async: false,
        success: function (Respond) {
            $(clossestTableRow).find("option.SubCategoryOption").remove();
            $(clossestTableRow).find("option.DivisionOption").remove();
            $(clossestTableRow).find("option.CategoryOption").remove();
            $.each(Respond, function (i, obj) {
                if (i == 0) {
                    subCategoryValues = Respond[i].HGMLSubCategory
                }
                else {
                    subCategoryValues += ',' + Respond[i].HGMLSubCategory
                }
                var SubCategoryList = '<option class="SubCategoryOption" value="' + Respond[i].HGMLSubCategory + '">' + Respond[i].HGMLSubCategory + '</option>';
                $(clossestTableRow).children().find(".HGMLSubCategory").append(SubCategoryList);
            });
        },
        error: function () {
            alert("Error occured!!");
        }
    });

    var clossestTableRow = $(this).closest("tr");
    var grd = $('#ProductHierarchy_Grid');
    var rowid = $(this).closest("tr.jqgrow").attr("id");
    var materialCode = grd.jqGrid('getCell', rowid, 'MaterialCode');

    var arraydata = {
        materialCode: materialCode,
        subCategory: subCategoryValues,
        productgroup: HGMLProductgroup

    }

    CatrowData = arraydata;
    var foundIndex = ProductcheckedData.findIndex(x => x.MaterialCode === CatrowData.MaterialCode);

    if (foundIndex !== -1) {
        ProductcheckedData[foundIndex] = CatrowData;
    }
    else {
        ProductcheckedData.push(CatrowData);
    }


    rowData = getchecckedRowData(this);
    var foundIndex = checkedData.findIndex(x => x.MaterialCode === rowData.MaterialCode);

    if (foundIndex !== -1) {
        checkedData[foundIndex] = rowData;
    }
    else {
        checkedData.push(rowData);
    }

});

$('body').on('change', '.HGMLSubCategory', function () {
    divisionValues = "";
    categoryValues = "";
    var clossestTableRow = $(this).closest("tr");
    var grd = $('#ProductHierarchy_Grid');
    var rowid = $(this).closest("tr.jqgrow").attr("id");
    var HGMLSubCategory = $(clossestTableRow).children().find(".HGMLSubCategory").val() != undefined ? $(clossestTableRow).children().find(".HGMLSubCategory").val() : grd.jqGrid('getCell', rowid, 'HGMLSubCategory');
    var HGMLProductgroup = $(clossestTableRow).children().find(".ProductGroup").val() != undefined ? $(clossestTableRow).children().find(".ProductGroup").val() : grd.jqGrid('getCell', rowid, 'ProductGroup');

    $.ajax({
        type: "POST",
        url: ROOT + "NPDLaunchMaster/GetOtherMasterInfoBySubCateg",
        data: { SubCategory: HGMLSubCategory, ProductGroup: HGMLProductgroup },
        dataType: "json",
        async: false,
        success: function (Respond) {
            $(clossestTableRow).find("option.DivisionOption").remove();
            $(clossestTableRow).find("option.CategoryOption").remove();

            $.each(Respond.NPDDivisionInfo, function (i, obj) {
                if (i == 0) {
                    divisionValues = Respond.NPDDivisionInfo[i].HGMLDivision
                }
                else {
                    divisionValues += ',' + Respond.NPDDivisionInfo[i].HGMLDivision
                }
                var divisionList = '<option class="DivisionOption" value="' + Respond.NPDDivisionInfo[i].HGMLDivision + '">' + Respond.NPDDivisionInfo[i].HGMLDivision + '</option>';
                $(clossestTableRow).children().find(".HGMLDivision").append(divisionList);
            });


            $.each(Respond.NPDCategoryInfo, function (i, obj) {
                if (i == 0) {
                    categoryValues = Respond.NPDCategoryInfo[i].HGMLCategory
                }
                else {
                    categoryValues += ',' + Respond.NPDCategoryInfo[i].HGMLCategory
                }
                var categoryList = '<option class="CategoryOption" value="' + Respond.NPDCategoryInfo[i].HGMLCategory + '">' + Respond.NPDCategoryInfo[i].HGMLCategory + '</option>';
                $(clossestTableRow).children().find(".HGMLCategory").append(categoryList);
            });
        },
        error: function () {
            alert("Error occured!!");
        }
    });

    var clossestTableRow = $(this).closest("tr");
    var grd = $('#MyApprovalPending_Grid');
    var rowid = $(this).closest("tr.jqgrow").attr("id");
    var materialCode = grd.jqGrid('getCell', rowid, 'MaterialCode');

    var arraydata = {
        materialCode: materialCode,
        categoryValues: categoryValues,
        divisionValues: divisionValues,
        subcategory: HGMLSubCategory
    }

    CatrowData = arraydata;
    var foundIndex = catcheckedData.findIndex(x => x.MaterialCode === CatrowData.MaterialCode);

    if (foundIndex !== -1) {
        catcheckedData[foundIndex] = CatrowData;
    }
    else {
        catcheckedData.push(CatrowData);
    }

    var rowData = getchecckedRowData(this);
    var foundIndex = checkedData.findIndex(x => x.MaterialCode === rowData.MaterialCode);

    if (foundIndex !== -1) {
        checkedData[foundIndex] = rowData;
    }
    else {
        checkedData.push(rowData);
    }

});

var checkedData = [];
$('body').on('change', '.checkbox,.HGMLCategory,.ProductGroup,.IsNPD,.BusinessLaunchDate,.RandDLaunchDate', function () {

    if ($(this).is(':checked')) {
        var rowData = getchecckedRowData(this);

        var foundIndex = checkedData.findIndex(x => x.MaterialCode === rowData.MaterialCode);
        if (foundIndex !== -1) {
            checkedData[foundIndex] = rowData;
        }
        else {
            checkedData.push(rowData);
        }
    } else if ($(this).closest('tr').find('.checkbox')) {
        var rowData = getchecckedRowData(this);
        var foundIndex = checkedData.findIndex(x => x.MaterialCode === rowData.MaterialCode);

        if (foundIndex !== -1) {
            checkedData[foundIndex] = rowData;
        }
        else {
            checkedData.push(rowData);
        }
    }
});
function getchecckedRowData(obj) {

    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#MyApprovalPending_Grid');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");

    var materialCode = grd.jqGrid('getCell', rowid, 'MaterialCode');
    var category = $(clossestTableRow).children().find(".HGMLCategory").val() != undefined ? $(clossestTableRow).children().find(".HGMLCategory").val() : grd.jqGrid('getCell', rowid, 'HGMLCategory');
    var subCategory = $(clossestTableRow).children().find(".HGMLSubCategory").val() != undefined ? $(clossestTableRow).children().find(".HGMLSubCategory").val() : grd.jqGrid('getCell', rowid, 'HGMLSubCategory');
    var productGroup = $(clossestTableRow).children().find(".ProductGroup").val() != undefined ? $(clossestTableRow).children().find(".ProductGroup").val() : grd.jqGrid('getCell', rowid, 'ProductGroup');
    var isNPD = $(clossestTableRow).children().find(".IsNPD").val() != undefined ? $(clossestTableRow).children().find(".IsNPD").val() : grd.jqGrid('getCell', rowid, 'IsNPD');
    var businessLaunchDate = $(clossestTableRow).children().find(".BusinessLaunchDate").val() != undefined ? $(clossestTableRow).children().find(".BusinessLaunchDate").val() : grd.jqGrid('getCell', rowid, 'BusinessLaunchDate');
    var rAndDLaunchDate = $(clossestTableRow).children().find(".RandDLaunchDate").val() != undefined ? $(clossestTableRow).children().find(".RandDLaunchDate").val() : grd.jqGrid('getCell', rowid, 'RandDLaunchDate');

    var division = $(clossestTableRow).find(".HGMLDivision").val() != undefined ? $(clossestTableRow).find(".HGMLDivision").val() : grd.jqGrid('getCell', rowid, 'HGMLDivision');
    var formulation = $.trim($(obj).closest('tr').find('td.HGMLFormulation').text());

    var arrayitem = {
        MaterialCode: materialCode,
        IsNPD: isNPD,
        BusinessLaunchDate: businessLaunchDate,
        RandDLaunchDate: rAndDLaunchDate,
        HGMLCategory: category,
        HGMLSubCategory: subCategory,
        ProductGroup: productGroup,
        HGMLDivision: division,
        HGMLFormulation: formulation,
    };

    return arrayitem;
}

// when Click on Approve Button
$(".MyApprovalApprove").on('click', function () {
    $('#ByClick_OK').prop("disabled", false);
    var flag = true;
    var myApprovalPendingData = [];
    $("#MyApprovalPending_Grid tr").each(function () {

        if ($(this).find('.checkbox').prop('checked')) {
            var rowData = getchecckedRowData(this);
            myApprovalPendingData.push(rowData);
        }
    });

    if (myApprovalPendingData == [] || myApprovalPendingData.length == 0) {

        flag = false
        alert('Please select atleast one Material to Approve the data')
    }
    if (flag) {
        $('#Approve').modal('show');
    }
    $('#ByClick_OK').click(function () {
        $('#SaveMyApprovalData').val(JSON.stringify(myApprovalPendingData));
        $('#SingleOrMultiple').val('Multiple');
        document.getElementById('MyApprovalPending_Form_Submit').submit();
        $('#ByClick_OK').prop("disabled", true);
    });
});

//When Click On Reject Button
$(".MyApprovalReject").on('click', function () {

    $('#RejectClick_OK').prop("disabled", false);
    var flag = true;
    var myApprovalPendingData = [];
    $("#MyApprovalPending_Grid tr").each(function () {

        if ($(this).find('.checkbox').prop('checked')) {
            var rowData = getchecckedRowData(this);
            myApprovalPendingData.push(rowData);
        }
    });
    if (myApprovalPendingData == [] || myApprovalPendingData.length == 0) {
        flag = false
        alert('Please select atleast one Material to Reject the data');
    }

    if (flag) {
        $('#Reject').modal('show');
    }
    $('#RejectClick_OK').click(function () {

        var rejectRemarks = $.trim($('#RemarksforReject').val());

        if (rejectRemarks == "") {
            $('#Error_RejectRemarks').show();
            return false;
        }
        else {
            $('#SaveMyApprovalData').val(JSON.stringify(myApprovalPendingData));
            $('#SingleOrMultiple').val('Multiple');
            $('#RejectRemarks').val(rejectRemarks);
            document.getElementById('MyApprovalPending_Form_Submit').submit();
            $('#RejectClick_OK').prop("disabled", true);
        }
    });
});

function SingleApproveOrReject(materialcode, IsApproved) {

    $('#ByClick_OK').prop("disabled", false);
    $('#RejectClick_OK').prop("disabled", false);
    var selectedData = [];


    $("#MyApprovalPending_Grid tr").each(function () {
        if ($(this).find('.materialcode').text() == materialcode) {
            var rowData = getchecckedRowData(this);
            selectedData.push(rowData);
        }
    });

    if (IsApproved == "Yes") {

        $('#Approve').modal('show');
        $('#ByClick_OK').click(function () {
            $('#SaveMyApprovalData').val(JSON.stringify(selectedData));
            document.getElementById('MyApprovalPending_Form_Submit').submit();
            $('#ByClick_OK').prop("disabled", true);
        });

    }
    else if (IsApproved == "No") {

        $('#Reject').modal('show');
        $('#RejectClick_OK').click(function () {
            var rejectRemarks = $.trim($('#RemarksforReject').val());
            if (rejectRemarks == "") {
                $('#Error_RejectRemarks').show();
                return false;
            }
            else {
                $('#RejectRemarks').val(rejectRemarks);
                $('#SaveMyApprovalData').val(JSON.stringify(selectedData));
                document.getElementById('MyApprovalPending_Form_Submit').submit();
                $('#RejectClick_OK').prop("disabled", true);
            }
        });
    }
}

$("#RemarksforReject").keyup(function () {
    $("#RemarksforReject").val() == "" ? $("#Error_RejectRemarks").show() : $("#Error_RejectRemarks").hide();
});


function checkBox(e) {
    e = e || event;/* get IE event ( not passed ) */
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = false;
    var headerCheckbox = document.getElementById('cbox');
    var isChecked = headerCheckbox.checked;
    if (isChecked) {
        $('#MyApprovalPending_Grid .checkbox').prop('checked', true);
        $('#MyApprovalPending_Grid tr').addClass('show_edit');
    }
    else {
        $('#MyApprovalPending_Grid .checkbox').prop('checked', false);
        $('#MyApprovalPending_Grid tr').removeClass('show_edit');
    }
}
$('#MyApprovalPending_Grid tr td:nth-child(1)').click(function () {

    var headerCheckbox = document.getElementById('cbox');
    var allChecked = true;
    $('#MyApprovalPending_Grid tbody .checkbox').each(function () {
        if (!this.checked) {
            allChecked = false;
            return false; // Exit the loop early
        }
    });
    if (allChecked) {
        headerCheckbox.checked = true;
    } else {
        headerCheckbox.checked = false;
    }
    var checkbox = $(this).find('input[type="checkbox"]');
    if (checkbox.prop('checked')) {
        $('#MyApprovalPending_Grid tr').removeClass('active');
        $(this).parent().addClass('show_edit');
    }
    else {
        $(this).parent().addClass('active');
        $(this).parent().removeClass('show_edit');
    }
});

$('.BusinessLaunchDate').on('keydown paste', function (event) {
    event.preventDefault();

});

$('.RandDLaunchDate').on('keydown paste', function (event) {
    event.preventDefault();
});

$(window).on('hidden.bs.modal', function () {
    $('.closeModal').val("");
    $('.Error_closeModal').hide();
});