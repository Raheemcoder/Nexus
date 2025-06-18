

var NPDLaunchMasterProductHierarchyData = $.parseJSON($('#NPDLaunchMasterProductHierarchyData').val());

var CategoryList = $.parseJSON($('#NPDCategoryString').val());
var DivisionList = $.parseJSON($('#NPDDivisionString').val());
var ProductList = $.parseJSON($('#NPDProductString').val());
var FormulationList = $.parseJSON($('#NPDFormulationString').val());
var SubCategoryList = $.parseJSON($('#NPDSubCategoryString').val());
var UserName = $('#UserName').val();

var checkedData = [];
var catcheckedData = [];
var ProductcheckedData = [];

colmodels = [

    {
        name: 'MaterialCode',
        label: 'Material Code',
        resizable: true,
        ignoreCase: true,
        width: 100,
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
        //sorttype: 'date',
      // formatter: 'date',
        exportcol: false,
      // formatoptions: { newformat: 'd-m-Y' }
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
                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
                              <select class="form-control appearence ProductGroup data-singleselect" id=`+ rowobject.MaterialCode + `ProductGroup'> <option value="" >Select</option>` + productString + `</select>
                        </div>`;
            }
            else if (productGroup != rowobject.ProductGroup) {
                for (var i = 0; i < ProductList.length; i++) {
                    if (ProductList[i].Value.toLowerCase() == productGroup.toLowerCase()) {
                        productString += '<option value="' + ProductList[i].Value + '" selected>' + ProductList[i].Value + '</option>';
                    } else {
                        productString += '<option value="' + ProductList[i].Value + '">' + ProductList[i].Value + '</option>';
                    }
                }
                if (rowobject.ProductGroup != null) {
                    return `<div class="d-flex action_icons align-items-center single-select_dropdown">
                    <select class="form-control  appearence ProductGroup data-singleselect" id=`+ rowobject.MaterialCode + `ProductGroup'>` + productString + `</select> 
                      </div>`;
                }
                else {
                    return `<div class="d-flex action_icons align-items-center single-select_dropdown">
                    <select class="form-control  appearence ProductGroup data-singleselect" id=`+ rowobject.MaterialCode + `ProductGroup'> <option value="" >Select</option>` + productString + `</select> 
                      </div>`;
                }
            }
            else {
                for (var i = 0; i < ProductList.length; i++) {
                    if (ProductList[i]?.Value.toLowerCase() == rowobject.ProductGroup.toLowerCase()) {
                        productString += '<option value="' + ProductList[i].Value + '" selected>' + ProductList[i].Value + '</option>';
                    } else {
                        productString += '<option value="' + ProductList[i].Value + '">' + ProductList[i].Value + '</option>';
                    }
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
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
                return '<div class="d-flex action_icons align-items-center single-select_dropdown">' +
                    '<select class="form-control appearence HGMLSubCategory data-singleselect" id="' + rowobject.MaterialCode + 'HGMLSubCategory"><option value="" >Select</option></select>' +
                    '</div>';
            }
            else if ((SubCategory != "" && SubCategory != null && SubCategory != undefined) && (ProductGroup == "" || ProductGroup == null || ProductGroup == undefined)) {
                return '<div class="d-flex action_icons align-items-center single-select_dropdown">' +
                    '<select class="form-control appearence HGMLSubCategory data-singleselect" id="' + rowobject.MaterialCode + 'HGMLSubCategory"><option value="" >Select</option></select>' +
                    '</div>';
            }

            else if ((ProductGroup != null && ProductGroup != "" && ProductGroup != undefined) && (SubCategory == "" || SubCategory == null || SubCategory == undefined) && (SubCategoryOpt == null || SubCategoryOpt == "")) {
                var categoryArray = hgmlSubCategoryOptionsArray;
                subCategoryString = '<option value="" >Select</option>';
                for (var i = 0; i < categoryArray.length; i++) {
                    subCategoryString += '<option class="SubCategoryOption" value="' + categoryArray[i] + '">' + categoryArray[i] + '</option>';
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown"> 
                           <select class="form-control appearence HGMLSubCategory data-singleselect" id=`+ rowobject.MaterialCode + `HGMLSubCategory'>` + subCategoryString + `</select> 
                           </div>`;

            }

            else if ((ProductGroup != null && ProductGroup != "" && ProductGroup != undefined) && ((rowobject.HGMLSubCategory != null && rowobject.HGMLSubCategory != "" && rowobject.HGMLSubCategory != undefined) && SubCategory == rowobject.HGMLSubCategory) && hgmlSubCategoryOptionsArray != undefined) {
                var categoryArray = hgmlSubCategoryOptionsArray;
                subCategoryString = '<option value="" >Select</option>';
                for (var i = 0; i < categoryArray.length; i++) {
                    if (rowobject.HGMLSubCategory.toLowerCase() == categoryArray[i]?.toLowerCase()) {
                        subCategoryString += '<option class="SubCategoryOption" value="' + categoryArray[i] + '" selected>' + categoryArray[i] + '</option>';
                    }
                    else {
                        subCategoryString += '<option class="SubCategoryOption" value="' + categoryArray[i] + '">' + categoryArray[i] + '</option>';
                    }
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown"> 
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
                        if (Catlist[i]?.toLowerCase() === SubCategory.toLowerCase()) {
                            subCategoryString += '<option class="SubCategoryOption" value="' + Catlist[i] + '" selected>' + Catlist[i] + '</option>';
                        } else {
                            subCategoryString += '<option class="SubCategoryOption" value="' + Catlist[i] + '">' + Catlist[i] + '</option>';
                        }
                    }
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
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
                        if (Catlist[i]?.toLowerCase() === SubCategory.toLowerCase()) {
                            subCategoryString += '<option class="SubCategoryOption" value="' + Catlist[i] + '" selected>' + Catlist[i] + '</option>';
                        } else {
                            subCategoryString += '<option class="SubCategoryOption" value="' + Catlist[i] + '">' + Catlist[i] + '</option>';
                        }
                    }
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
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
                return '<div class="d-flex action_icons align-items-center single-select_dropdown">' +
                    '<select class="form-control appearence HGMLCategory data-singleselect" id="' + rowobject.MaterialCode + 'HGMLCategory"><option value="" >Select</option></select>' +
                    '</div>';
            }
            else if (((subcategory == "" || subcategory == null || subcategory == undefined) || (subcategory != null && subcategory != "" && subcategory != undefined)) && (rowobject.ProductGroup == null || rowobject.ProductGroup == "" || rowobject.ProductGroup == undefined)) {
                return '<div class="d-flex action_icons align-items-center single-select_dropdown">' +
                    '<select class="form-control appearence HGMLCategory data-singleselect" id="' + rowobject.MaterialCode + 'HGMLCategory"><option value="" >Select</option></select>' +
                    '</div>';
            }

            else if ((subcategory != null && subcategory != "" && subcategory != undefined) && (rowobject.ProductGroup != null && rowobject.ProductGroup != "" && rowobject.ProductGroup != undefined) && (Category == "" || Category == null || Category == undefined) && (CategoryOpt == null || CategoryOpt == "")) {
                var categoryArray = hgmlCategoryOptionsArray;
                categoryString = '<option value="" >Select</option>';
                for (var i = 0; i < categoryArray.length; i++) {
                    categoryString += '<option class="CategoryOption" value="' + categoryArray[i] + '">' + categoryArray[i] + '</option>';
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown"> 
                           <select class="form-control appearence HGMLCategory data-singleselect" id=`+ rowobject.MaterialCode + `HGMLCategory'>` + categoryString + `</select> 
                           </div>`;

            }

            else if ((subcategory != null && subcategory != "" && subcategory != undefined) && ((rowobject.HGMLCategory != null && rowobject.HGMLCategory != "" && rowobject.HGMLCategory != undefined) && Category == rowobject.HGMLCategory) && (rowobject.HGMLProductgroup != null && rowobject.HGMLProductgroup != "" && rowobject.HGMLProductgroup != undefined)) {
                var categoryArray = hgmlCategoryOptionsArray;
                categoryString = '<option value="" >Select</option>';
                for (var i = 0; i < categoryArray.length; i++) {
                    if (rowobject.HGMLCategory.toLowerCase() == categoryArray[i]?.toLowerCase()) {
                        categoryString += '<option class="CategoryOption" value="' + categoryArray[i] + '" selected>' + categoryArray[i] + '</option>';
                    }
                    else {
                        categoryString += '<option class="CategoryOption" value="' + categoryArray[i] + '">' + categoryArray[i] + '</option>';
                    }
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
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
                if (Catlist.length != 0) {
                    for (var i = 0; i < Catlist.length; i++) {
                        if (Catlist[i]?.toLowerCase() === Category.toLowerCase()) {
                            categoryString += '<option class="CategoryOption" value="' + Catlist[i] + '" selected>' + Catlist[i] + '</option>';
                        } else {
                            categoryString += '<option class="CategoryOption" value="' + Catlist[i] + '">' + Catlist[i] + '</option>';
                        }
                    }
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
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
                if (Catlist.length != 0) {
                    for (var i = 0; i < Catlist.length; i++) {
                        if (Catlist[i]?.toLowerCase() === Category.toLowerCase()) {
                            categoryString += '<option class="CategoryOption" value="' + Catlist[i] + '" selected>' + Catlist[i] + '</option>';
                        } else {
                            categoryString += '<option class="CategoryOption" value="' + Catlist[i] + '">' + Catlist[i] + '</option>';
                        }
                    }
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown"> 
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

                return '<div class="d-flex action_icons align-items-center single-select_dropdown">' +
                    '<select class="form-control appearence HGMLDivision data-singleselect" id="' + rowobject.MaterialCode + 'HGMLDivision"><option value="" >Select</option></select>' +
                    '</div>';
            }
            else if (((subcategory == "" || subcategory == null || subcategory == undefined) || (subcategory != null && subcategory != "" && subcategory != undefined)) && (rowobject.ProductGroup == null || rowobject.ProductGroup == "" || rowobject.ProductGroup == undefined)) {
                return '<div class="d-flex action_icons align-items-center single-select_dropdown">' +
                    '<select class="form-control appearence HGMLDivision data-singleselect" id="' + rowobject.MaterialCode + 'HGMLDivision"><option value="" >Select</option></select>' +
                    '</div>';
            }

            else if ((subcategory != null && subcategory != "" && typeof (subcategory) != "undefined") && (rowobject.ProductGroup != null && rowobject.ProductGroup != "" && rowobject.ProductGroup != undefined) && (division == "" || division == null || division == undefined) && (DivOpt == null || DivOpt == "")) {
                var divisionArray = hgmlDivisionOptionsArray
                DString = '<option value="" >Select</option>';
                for (var i = 0; i < divisionArray.length; i++) {
                    DString += '<option class="DivisionOption" value="' + divisionArray[i] + '">' + divisionArray[i] + '</option>';
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
                           <select class="form-control appearence HGMLDivision data-singleselect" id=`+ rowobject.MaterialCode + `HGMLDivision'>` + DString + `</select> 
                           </div>`;

            }

            else if ((subcategory != null && subcategory != "" && typeof (subcategory) != "undefined") && ((rowobject.HGMLDivision != null && rowobject.HGMLDivision != "" && rowobject.HGMLDivision != undefined) && division == rowobject.HGMLDivision) && (rowobject.HGMLProductgroup != null && rowobject.HGMLProductgroup != "" && rowobject.HGMLProductgroup != undefined)) {
                var divisionArray = hgmlDivisionOptionsArray
                DString = '<option value="" >Select</option>';
                for (var i = 0; i < divisionArray.length; i++) {
                    if (rowobject.HGMLDivision.toLowerCase() == divisionArray[i]?.toLowerCase()) {
                        DString += '<option class="DivisionOption" value="' + divisionArray[i] + '" selected>' + divisionArray[i] + '</option>';
                    }
                    else {
                        DString += '<option class="DivisionOption" value="' + divisionArray[i] + '">' + divisionArray[i] + '</option>';
                    }
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
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
                        if (Divlist[i]?.toLowerCase() === division.toLowerCase()) {
                            DString += '<option class="DivisionOption" value="' + Divlist[i] + '" selected>' + Divlist[i] + '</option>';
                        } else {
                            DString += '<option class="DivisionOption" value="' + Divlist[i] + '">' + Divlist[i] + '</option>';
                        }
                    }
                }

                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
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
                        if (Divlist[i]?.toLowerCase() === division.toLowerCase()) {
                            DString += '<option class="DivisionOption" value="' + Divlist[i] + '" selected>' + Divlist[i] + '</option>';
                        } else {
                            DString += '<option class="DivisionOption" value="' + Divlist[i] + '">' + Divlist[i] + '</option>';
                        }
                    }
                }

                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
                           <select class="form-control appearence HGMLDivision data-singleselect" id=`+ rowobject.MaterialCode + `HGMLDivision'><option value="" >Select</option>` + DString + `</select> 
                           </div>`;

            }
        }
    },

    {
        name: 'HGMLFormulation',
        label: 'HGML Product Format',
        resizable: true,
        ignoreCase: true,
        exportcol: false,
        title: false,
        formatter: function (cellvalue, options, rowobject) {
            var FString = "";
            var index = checkedData.findIndex(s => s.MaterialCode == rowobject.MaterialCode);
            var formulation;
            if (index >= 0) {
                formulation = checkedData[index].HGMLFormulation;
            }
            else {
                formulation = rowobject.HGMLFormulation;
            }
            if (formulation == "" || formulation == null || formulation == undefined) {

                FString += '<option value=' + "" + '>' + "select" + '</option>'
                for (var i = 0; i < FormulationList.length; i++) {
                    FString += '<option value="' + FormulationList[i].Value + '">' + FormulationList[i].Value + '</option>';
                }
                return '<div class="d-flex action_icons align-items-center single-select_dropdown">' +
                    '<select class="form-control appearence HGMLFormulation data-singleselect" id="' + rowobject.MaterialCode + 'HGMLFormulation"> ' + FString + '</option></select>' +
                    '</div>';
            }
            else if (formulation != rowobject.HGMLFormulation) {
                for (var i = 0; i < FormulationList.length; i++) {
                    if (FormulationList[i]?.Value.toLowerCase() == formulation.toLowerCase()) {
                        FString += '<option value="' + FormulationList[i].Value + '" selected>' + FormulationList[i].Value + '</option>';
                    } else {
                        FString += '<option value="' + FormulationList[i].Value + '">' + FormulationList[i].Value + '</option>';
                    }
                }
                if (rowobject.HGMLFormulation != null) {
                    return `<div class="d-flex action_icons align-items-center single-select_dropdown">
                    <select class="form-control  appearence HGMLFormulation data-singleselect" id=`+ rowobject.MaterialCode + `HGMLFormulation'>` + FString + `</select> 
                       </div>`;
                }
                else {
                    return `<div class="d-flex action_icons align-items-center single-select_dropdown">
                    <select class="form-control  appearence HGMLFormulation data-singleselect" id=`+ rowobject.MaterialCode + `HGMLFormulation'> <option value="" >Select</option>` + FString + `</select> 
                       </div>`;
                }

            }
            else {
                for (var i = 0; i < FormulationList.length; i++) {
                    if (FormulationList[i]?.Value.toLowerCase() == rowobject.HGMLFormulation.toLowerCase()) {
                        FString += '<option value="' + FormulationList[i].Value + '" selected>' + FormulationList[i].Value + '</option>';
                    } else {
                        FString += '<option value="' + FormulationList[i].Value + '">' + FormulationList[i].Value + '</option>';
                    }
                }
                return `<div class="d-flex action_icons align-items-center single-select_dropdown">
                    <select class="form-control  appearence HGMLFormulation data-singleselect" id=`+ rowobject.MaterialCode + `HGMLFormulation'>` + FString + `</select> 
                       </div>`;

            }

        }
    },

    {
        name: 'ProductGroup',
        label: 'HGML Product Group',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'HGMLSubCategory',
        label: 'HGML Sub Category',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'HGMLCategory',
        label: 'HGML Category',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'HGMLDivision',
        label: 'HGML Division',
        resizable: true,
        ignoreCase: true,
        width: 120,
        hidden: true,
        exportcol: true,
    },
    {
        name: 'HGMLFormulation',
        label: 'HGML Product Format',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: true,
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
    {
        name: 'HGMLSubCategoryOptions',
        label: 'HGMLSubCategoryOptions',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        exportcol: false,
    },

],

    $("#ProductHierarchy_Grid").jqGrid({
        url: '',
        datatype: 'local',
        data: NPDLaunchMasterProductHierarchyData,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        rowNum: 20,
        viewrecords: true,
        pager: '#pager_ProductHierarchy_Grid',
        rownumbers: false,
        scroll: true,

        gridComplete: function () {
            var objRows = $("#ProductHierarchy_Grid tbody tr");
            var objHeader = $("#ProductHierarchy_Grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            $('[data-singleselect]').select2();
            $('.data-singleselect').select2();
        }
    });
$("#ProductHierarchy_Grid").jqGrid('filterToolbar', {
    autosearch: true,
    stringResult: false,
    searchOnEnter: false,
    defaultSearch: "cn"
});

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

$('.data-datepicker').datepicker({
    format: 'dd-mm-yyyy',
    todayHighlight: true,
    autoclose: true
});
$('.date-datepicker-year').datepicker({
    format: 'yyyy',
    viewMode: 'years',
    minViewMode: 'years',
    autoclose: true
});

$(".year_dropdown").css("display", "none");
$("input[name='chkPinNo']").click(function () {
    if ($("#chkNo").is(":checked")) {
        $(".year_dropdown").css("display", "block");
    } else if ($("#chkYes").is(":checked")) {
        $(".year_dropdown").css("display", "block");
    } else if ($("#chkAll").is(":checked")) {
        $(".year_dropdown").css("display", "none");
    }
});

setTimeout(function () {
    $('#message_alert').fadeOut('slow');
}, 5000);


$('#ProductHierarchy_Grid tr td:nth-child(1)').click(function () {
    //console.log("Clicked");
    $('#ProductHierarchy_Grid tr').removeClass('active');
    $(this).parent().addClass('show_edit').siblings().removeClass('show_edit');
});
$(".save_edit1").hide();
$(".close_edit").click(function () {
    $('#ProductHierarchy_Grid tr td:nth-child(1)').click(function () {
        //console.log("Clicked");
        $('#ProductHierarchy_Grid tr').removeClass('active');
        $(this).parent().addClass('show_edit').siblings().removeClass('show_edit');
    });
    $(".show_edit select.save_edit").show();
    $(".value_close").hide();
});
$(".time_cross").click(function () {
    $('#ProductHierarchy_Grid tr td:nth-child(1)').click(function () {
        //console.log("Clicked");
        $('#ProductHierarchy_Grid tr').removeClass('active');
        $(this).parent().removeClass('show_edit').siblings().removeClass('show_edit');
    });
    $(".close_edit, .value_close").show();
    $(".value_close").show();
    $(".show_edit select.save_edit").hide();
    $(".save_edit1").hide();
    $(".save_edit").hide();
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


    rowData = getRowDataInArray(this);
    var foundIndex = checkedData.findIndex(x => x.MaterialCode === rowData.MaterialCode);

    if (foundIndex !== -1) {
        checkedData[foundIndex] = rowData;
    }
    else {
        checkedData.push(rowData);
    }

});


var divisionValues = "";
var categoryValues = "";

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
    var grd = $('#ProductHierarchy_Grid');
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


    rowData = getRowDataInArray(this);
    var foundIndex = checkedData.findIndex(x => x.MaterialCode === rowData.MaterialCode);

    if (foundIndex !== -1) {
        checkedData[foundIndex] = rowData;
    }
    else {
        checkedData.push(rowData);
    }

});

$('body').on('change', '.HGMLFormulation,.HGMLDivision,.HGMLCategory', function () {

    rowData = getRowDataInArray(this);
    var foundIndex = checkedData.findIndex(x => x.MaterialCode === rowData.MaterialCode);

    if (foundIndex !== -1) {
        checkedData[foundIndex] = rowData;
    }
    else {
        checkedData.push(rowData);
    }
});

function getRowDataInArray(obj) {
    var clossestTableRow = $(obj).closest("tr");
    var grd = $('#ProductHierarchy_Grid');
    var rowid = $(obj).closest("tr.jqgrow").attr("id");
    var materialCode = grd.jqGrid('getCell', rowid, 'MaterialCode');
    var materialName = grd.jqGrid('getCell', rowid, 'MaterialName');
    var createdDate = grd.jqGrid('getCell', rowid, 'CreatedDate');
    var HGMLCategory = $(clossestTableRow).children().find(".HGMLCategory").val() != undefined ? $(clossestTableRow).children().find(".HGMLCategory").val() : grd.jqGrid('getCell', rowid, 'HGMLCategory'); var HGMLSubCategory = $(clossestTableRow).children().find(".HGMLSubCategory").val() != undefined ? $(clossestTableRow).children().find(".HGMLSubCategory").val() : grd.jqGrid('getCell', rowid, 'HGMLSubCategory');
    var productGroup = $(clossestTableRow).children().find(".ProductGroup").val() != undefined ? $(clossestTableRow).children().find(".ProductGroup").val() : grd.jqGrid('getCell', rowid, 'ProductGroup');
    var HGMLDivision = $(clossestTableRow).children().find(".HGMLDivision").val() != undefined ? $(clossestTableRow).children().find(".HGMLDivision").val() : grd.jqGrid('getCell', rowid, 'HGMLDivision');
    var HGMLFormulation = $(clossestTableRow).children().find(".HGMLFormulation").val() != undefined ? $(clossestTableRow).children().find(".HGMLFormulation").val() : grd.jqGrid('getCell', rowid, 'HGMLFormulation');

    var arrayitem = {

        MaterialCode: materialCode,
        MaterialName: materialName,
        CreatedDate: createdDate,
        HGMLCategory: HGMLCategory,
        HGMLSubCategory: HGMLSubCategory,
        ProductGroup: productGroup,
        HGMLDivision: HGMLDivision,
        HGMLFormulation: HGMLFormulation,
    };

    return arrayitem;
}


$("#ExcelDownload").click(function () {
    var grid = $('#ProductHierarchy_Grid');
    /*  grid.hideCol('Source');*/
    var data = $('#ProductHierarchy_Grid').jqGrid('getGridParam', 'data');
    if (data.length == 0) {
        alert("No data in Grid");
    }
    else {
        try {

            $('#ProductHierarchy_Grid').jqGrid("exportToExcel", {
                includeLabels: true,
                includeGroupHeader: true,
                includeFooter: true,
                fileName: "ProductHierarchy.xlsx",
                maxlength: 80,
                exportcol: true,

            });
        } catch (err) {
            alert(err);
        }
        /*  grid.showCol('Source');*/
    }
});


$("#SearchProductHierarchyData").on("click", function () {
    LoadProductHierarchy();
});

function LoadProductHierarchy(flag) {

    if (flag == "refresh") {
        $("#NpdHmlDivision").val("").select2();
        $("#NpdHgmlProductGroup").val("").select2();
        $("#NpdHgmlFormulation").val("").select2();
    }
    var division = $("#NpdHmlDivision").val();
    var category = $("#NpdHgmlCategory").val();
    var productGroup = $("#NpdHgmlProductGroup").val();
    var formulation = $("#NpdHgmlFormulation").val();
    $.ajax({
        type: "POST",
        url: ROOT + "NPDLaunchMaster/ProductHierarchyData",
        data: { division: division, category: category, productGroup: productGroup, formulation: formulation },
        success: function (result) {
            var result_json = JSON.parse(result);
            $("#ProductHierarchy_Grid").jqGrid("clearGridData");
            $("#ProductHierarchy_Grid").jqGrid('setGridParam', { data: result_json });
            $("#ProductHierarchy_Grid").trigger('reloadGrid', [{ page: 1 }]);
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}
$(".SaveProductHierarchyData").on("click", function () {
    var materialcode = [];
    if (checkedData.length != 0) {
        checkedData.forEach(function (obj) {
            materialcode.push(obj.MaterialCode);
        });
    }
    //var selectedData = [];
    //$("#ProductHierarchy_Grid tr").each(function () {
    //    var rowData = getRowDataInArray(this);
    //    if (rowData.MaterialCode) {
    //        selectedData.push(rowData);
    //    }
    //});
    if (checkedData.length == 0) {

        alert('There are no changes to save!');
    }
    else {

        var uniqueMaterialCode = materialcode.join(', ');
        var msg = 'Are you sure you want to save the <b>' + uniqueMaterialCode + '</b> material details, The saved Hierarchy information will be displayed in Material list.'
        confirm(msg, function () {
            $('#ProductHierarchyData').val(JSON.stringify(checkedData));
            document.getElementById('ProductHierarchy_Form_Submit').submit();
            Selectedmaterialcode = "";
        });
    }
});
$("#refresh").click(function () {
    LoadProductHierarchy("refresh");
});