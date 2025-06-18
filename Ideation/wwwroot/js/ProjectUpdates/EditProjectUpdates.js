
var jsonFormProjectUpdatesData = $.parseJSON($('#JsonFormProjectUpdatesData').val());
var userName = $('#UserName').val();
var roleId = $('#RoleId').val();
var projectMasterData = jsonFormProjectUpdatesData["ProjectMasterDataList"];
var headerData = jsonFormProjectUpdatesData["ProjectDetailsHeaderDataList"];
//var Commentdata = "";
var ProjectLeadListDetails = [];
var ProjectLeadListDetailIds = [];
var usersMap = {};

$(document).ready(function () {
    debugger  
    $('#ProjectLead').val(projectMasterData[0].ProjectLead);
    $('#ProjectLeadID').val(projectMasterData[0].ProjectLeadID);
    $("#ProjectLeadList option").each(function () {
        var value = $(this).val();
        var text = $(this).text();
        var displayText = text;
        ProjectLeadListDetails.push({
            label: displayText,
            value: value
            });
        ProjectLeadListDetailIds.push(value);
        usersMap[displayText] = value;

    });
   //console.log(ProjectLeadListDetails,'ProjectLeadListDetails');
    CKEDITOR.replace('Comments', {
        height: 105,
        toolbarGroups: [{
            "name": "basicstyles",
            "groups": ["basicstyles"]
        }],
        removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,PasteFromWord,Bold,Italic',
        toolbar: [
            { name: 'insert', items: ['NumberedList'] }
        ],
        autoParagraph: true,
        enterMode: CKEDITOR.ENTER_P,
        pasteFilter: 'plain-text',
        on: {
            instanceReady: function (evt) {
                // Start numbering when the editor gets focus
                this.editable().on('keypress', function () {
                    var editor = CKEDITOR.instances['Comments'];
                    var command = editor.getCommand('numberedlist');

                    if (command.state === CKEDITOR.TRISTATE_OFF) {
                        editor.execCommand('numberedlist');
                    }
                   
                });
                this.editable().on('paste', function (evt) {
                    var editor = CKEDITOR.instances['Comments'];
                    var command = editor.getCommand('numberedlist');

                    if (command.state === CKEDITOR.TRISTATE_OFF) {
                        editor.execCommand('numberedlist');
                    }
                    
                  
                });

            }
        }
    });

   

    if (projectMasterData.length > 0) {
        $('#ProjectId').text(projectMasterData[0].ProjectCode);
        $('#ProjectDescription').text(projectMasterData[0].ProjectDescription);
        $('#ProjectHub').text(projectMasterData[0].ProjectHub);
        $('#ProjectDivision').text(projectMasterData[0].ProjectDivision);
        $('#ProjectType').text(projectMasterData[0].ProjectType);
        $('#ProjectClassification').text(projectMasterData[0].ProjectClassification);
        $('#HghCode').text(projectMasterData[0].HghCode);
        $('#RAndDName').text(projectMasterData[0].RAndDName);
        $('#ProjectStatus').text(projectMasterData[0].ProjectStatus);
    }

    var history = "";
    var originalFormat = "MM/DD/YYYY HH:mm:ss";
    var newFormat = "DD MMM YYYY hh:mm A";


    if (headerData.length > 0) {

        //$('#Comments').val(headerData[0].Comment);
        $('#Sku').val(headerData[0].Sku);
        $('#Volume').val(headerData[0].Volume);
        $('#TargetTtd').datepicker('setDate', headerData[0].TargetTTD);
        $('#TargetProductionDate').datepicker('setDate', headerData[0].TargetProductionDate);
        //$('#TargetTtd').val(headerData[0].TargetTTD);
        //$('#TargetProductionDate').val(headerData[0].TargetProductionDate);
        $('#TargetCost').val(headerData[0].AcceptedTargetCost);
        $('#Currency').val(headerData[0].Currency);
        $('#M1Quantity').val(headerData[0].M1Quantity);
        $('#M2Quantity').val(headerData[0].M2Quantity);
        $('#M3Quantity').val(headerData[0].M3Quantity);
        $('#Y1Quantity').val(headerData[0].Y1Quantity);
        $('#Y2Quantity').val(headerData[0].Y2Quantity);
        $('#Y3Quantity').val(headerData[0].Y3Quantity);
        $('#ProjectLead').val(headerData[0].ProjectLead);
    
        headerData.forEach(function (data,i) {
            

            var $html = $('<div>' + data.Comment + '</div>');
            $html.find('ol').css("font-size", "12px");
            $html.find('ol').css("font-family", "Open Sans,sans-serif");
            $html.find('ol li p').css("margin-top", "0px");
            var $listItems = $html.find('ol li');
            var threshold = 2;
            if ($listItems.length > threshold) {
                $listItems.slice(threshold).hide();

                var $readMore = $('<a class="read-more-show" data-commlist="' + data.Comment + '" href="#" id="2">Read More</a>');


                var $readLess = $('<a class="read-more-hide" data-commlist="' + data.Comment + '" href="#" more-id="2"> Read Less</a>');

                $readLess.hide();

                $(document).on('click', '.read-more-hide', function (e) {
                    e.preventDefault();
                    var $parent = $(this).parent();
                    $parent.find('ol li:gt(1)').hide();
                    $(this).hide();
                    $parent.find('.read-more-show').show();
                });

                $(document).on('click', '.read-more-show', function (e) {
                    e.preventDefault();
                    var $parent = $(this).parent();
                    $parent.find('ol li:gt()').show();
                    $(this).hide();
                    $parent.find('.read-more-hide').show();
                });

                // append the links to the HTML string
                $html.append($readMore);
                $html.append($readLess);
            }

            // Changing the date format
            var originalDate = data.CreatedDate;
            //Commentdata = data.Comment;
            var originalMoment = moment(originalDate, originalFormat);
            var newDate = originalMoment.format(newFormat);
            if (roleId == "1" && data.IsLatestComment == "1") {               
                data.IsLatestComment = 0;
            }

               

            var loggedInUser = $('#UserName').val();
            
            // create HTML string
            history += '<div class="history_section mb-0">' +
                '<div class="user_history col-auto col-form-label lbl_flex">' +
                '<div class="history_info"><span><i class="fas fa-user"></i></span> <span class="history_name">' + data.CreatedByName + '</span></div>' +
                '<div style="display:flex;justify-content:end;align-items:center"><span class="date_font">' + newDate + '</span><span class="_download"><span' + (data.IsContainDocument == 0 ? ' style = "display:none"' : "") + ' ><i onclick="onClickViewToDownload(\'' + data.ProjectCode + '\',\'' + data.CreatedBy + '\',\'' + data.CreatedDate + '\')" class="fa fa-files-o" title="View Documents"></i></span><span ' + ((data.IsLatestComment != 0 && data.CreatedBy == loggedInUser) || (i == 0 && roleId == "1") ? " " : 'style = "display:none"') + 'class="btn-icon -edit"> <i  onclick="EditHistory(\'' + data.ProjectCode + '\',\'' + data.CreatedBy + '\',\'' + data.ProjectUpdatesHeaderId + '\',\'' + data.CreatedDate + '\',\'' + data.DocumentName + '\',\'' + data.ProjectDocId + '\')" class="fa fa-edit" title="Edit"></i></span ></span ></div > ' +
                '</div>' +             
                '<p>' + $html.html() + '</p>' +               
                '</div>';

        }); 

        $('#DynamicHistory').append(history);
        $('.read-more-show,.read-more-hide').css({ "font-size": "13px", "margin-left": "3vh" });
    }

});




$('[data-multiselect]').multiselect({
    includeSelectAllOption: true,
    buttonWidth: '100%',
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true
});


var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
$('[data-datepicker-monthyear]').datepicker({
    format: 'M/yyyy',
    viewMode: 'months',
    minViewMode: 'months',
    todayHighlight: true,
    autoclose: true,
    startDate: '+30'

});


function validateSaveForm() {

    var flag = true;
    if ($('#ProjectLead').val() == '') {        
        $('#ProjectLeadID').val('');
    }
    //  var comments = $.trim($('#Comments').val());
    var comments = CKEDITOR.instances["Comments"].getData();
    //var sku = $.trim($('#Sku').val());//
    //var volume = $.trim($('#Volume').val());
    //var uploadDocument = $('#UploadDocument').val();
    //var targetTtd = $('#TargetTtd').val();
    //var targetProductionDate = $('#TargetProductionDate').val();
    //var targetCost = $.trim($('#TargetCost').val());
    //var currency = $('#Currency').val();

    $('#Save_Ok').prop('disabled', false);  
    $('.Err_PU').hide();

    if (comments == ""/* || targetTtd == "" || targetProductionDate == "" || targetCost == "" || currency == ""*/) {

        flag = false;

        comments == "" ? $('#Err_Comments').show() : $('#Err_Comments').hide();
        //targetTtd == "" ? $('#Err_TargetTtd').show() : $('#Err_TargetTtd').hide();
        //targetProductionDate == "" ? $('#Err_TargetProductionDate').show() : $('#Err_TargetProductionDate').hide();
        //targetCost == "" ? $('#Err_TargetCost').show() : $('#Err_TargetCost').hide();
        //currency == "" ? $('#Err_Currency').show() : $('#Err_Currency').hide();
    }

    if (flag) {
        $('#SaveModal').modal('show');

        $('#Save_Ok').click(function () {

            $('#Save_Ok').prop('disabled', true);

            $('#ProjectCode').val(projectMasterData[0].ProjectCode);

            //if ($('#UploadDocument').val() == '') {
            //    if ($('#OldUploadedFiles').val() !== '' && $('#OldUploadedFiles').val() != null && $('#OldUploadedFiles').val() != undefined && $('#OldUploadedFiles').val() != 'undefined') {
            //        $('#UploadDocument').val($('#OldUploadedFiles').val())
            //    }
            //}


            $('#ProjectUpdates_Details_Submit').submit();

        });
    }
}

var formData = new FormData();

function validateFileUpload() {


    var flag = true;
    var supportedExtention = ['pdf', 'doc', 'docx', 'xls', 'txt', 'xlsx', 'ppt', 'zip', 'jpg', 'jpeg', 'png', 'csv'];

    var fileLength = 0;

    var filesArray = [];

    filesArray = $(`#UploadDocument`).get(0).files;

    $.each(filesArray, function (index, file) {

        var ext = file.name.split('.').pop().toLowerCase();

        if (jQuery.inArray(ext, supportedExtention) === -1) {

            alert("Please upload a valid file");
            $(`#UploadDocument`).val('');

            flag = false;

            return false;
        }
    });

    if (flag) {

        for (var i = 0; i < $(`#UploadDocument`).get(0).files.length; i++) {

            var sizeList = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            fileLength += $(`#UploadDocument`).get(0).files[i].size / 1024;

            if (fileLength > 5120) {
                alert('The file size should be less than 5 MB');
                $('#UploadDocument').val('');
                $('#deleteSelectedFile').hide();
                $(`#UploadDocument`).get(0).val('');
                

                return false;
            }

            var supportedFiles = [];
            var file1 = $(`#UploadDocument`).get(0).files[i];

            supportedFiles.push(file1);

            var fileName = $(`#UploadDocument`).get(0).files[i].name.toString().split('\\').pop();

            supportedFiles.name = "100" + fileName;

            const newFile = new File(supportedFiles, fileName, { type: supportedFiles[0].type });

            formData.append('files', newFile);
            $('#deleteSelectedFile').show();

        }
    }
}

function onClickViewToDownload(projectCode, createdBy, createdDate) {

    $.ajax({

        type: "POST",
        url: ROOT + "ProjectUpdates/GetUploadedDocumentDetail",
        data: { projectCode: projectCode, createdBy: createdBy, createdDate: createdDate },
        dataType: "json",
        success: function (response) {

            if (response.length > 0) {

                $("#Document_Download_Grid").jqGrid("clearGridData");
                $("#Document_Download_Grid").trigger('reloadGrid');
                $("#Document_Download_Grid").jqGrid('setGridParam', { data: response });
                $("#Document_Download_Grid").trigger('reloadGrid');
            } else {
                $("#Document_Download_Grid").jqGrid("clearGridData");
                $("#Document_Download_Grid").trigger('reloadGrid');
            }
            // console.log(response);

            $('#ViewModal').modal('show');
        },
        error: function (err) {

            alert(err.responseText);
        }
    });


}

colmodels = [
    {
        name: 'UploadDocument',
        label: 'Document',
        resizable: true,
        ignoreCase: true,
        width: 150,
    },
    {
        name: 'CreatedBy',
        label: 'Uploaded By',
        width: 55,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'CreatedDate',
        label: 'Uploaded On',
        resizable: true,
        ignoreCase: true,
        width: 75
    },
    {
        name: 'Download',
        label: 'Action',
        width: 35,
        search: false,
        resizable: true,
        ignoreCase: true,
        classes: "DownloadFile",
        formatter: function (cellvalue, options, rowobject) {

            var fileName = rowobject.UploadDocument;
            var downloadUrl = ROOT + "ProjectUpdates/DownloadFile?fileName=" + encodeURIComponent(fileName);

            var fileExtension = fileName.split('.').pop().toLowerCase(); // Extract the file extension
            // List of known file extensions and their corresponding types
            var fileTypes = {
                'doc': 'Microsoft Word Document',
                'docx': 'Microsoft Word Document',
                'xls': 'Microsoft Excel Spreadsheet',
                'xlsx': 'Microsoft Excel Spreadsheet',
            };

            return `<div class="justify-center_">
                        <a title="Download" href="${downloadUrl}" class="btn-icon -view">
                            <i class="fas fa-download"></i>
                        </a>` + (fileExtension in fileTypes ? '' : `<a class="btn-icon -edit" title="View" id="${options.rowId}" href="${ROOT}ProjectUpdatesImages/${rowobject.UploadDocument}" target="_blank"><i class="fa fa-eye" title="View"></i></a>`) + `
                    </div>`;
        }
    },

],

    $("#Document_Download_Grid").jqGrid({
        url: '',
        datatype: 'local',
        data: [],
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#pager_upload',
        rowNum: 20,
        scroll: 1,

        gridComplete: function () {
            var objRows = $("#Document_Download_Grid tbody tr");
            var objHeader = $("#Document_Download_Grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
$("#Document_Download_Grid").jqGrid('filterToolbar', {
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


function onlyNumbers(evt) {

    var e = event || evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;

    var currentValue = evt.value;
    if (charCode == 46 && currentValue.indexOf(".") !== -1) {
        // Decimal point already exists in input
        return false;
    }

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
        return false;
    }

    return true;
}

if ($('#UploadDocument').val() == "") {
    $('#deleteSelectedFile').hide();
}
$('#UploadDocument').change(function () {
    if ($('#UploadDocument').val() == "") {
        $('#deleteSelectedFile').hide();
    }
})

$('#deleteSelectedFile').click(function () {
    if ($('#UploadDocument').val() != "") {
        confirm("Are you sure you want to delete the uploaded file?", function () {
            $('#UploadDocument').val("");
            $('#deleteSelectedFile').hide();
        })
    }
})
    
function EditHistory(projectCode, createdBy, headerId, createdDate,docName,docId) {
    debugger
    // var val = $(this).data('oldfiles')
    if (docName != '' && docName != null && docName != undefined && docName != 'undefined' && docName!='null') {
        $('#OldUploadedFiles').val(docName)
        $('#ProjectDocId').val(docId)
    }
   // CKEDITOR.instances["Comments"].setData("");
    //if (CKEDITOR.instances.Comments.getData() != "") {
    //    CKEDITOR.instances.Comments.setData('');
    //    validate();

    //} else {
    //    validate();
    //}
   // CKEDITOR.instances.Comments.setData(Commentdata);

    var comments = "";
       for (var i = 0; i < headerData.length; i++) {
           debugger
           if (headerData[i].ProjectUpdatesHeaderId === headerId) {
               comments = headerData[i].Comment;
               break;
           }
       }
       //$('#editHistory').html(projectCode);
       $('#ProjectUpdatesHeaderId').val(headerId);

    CKEDITOR.instances["Comments"].setData(comments);
    //CKEDITOR.instances.Comments.setData(Commentdata);

       //$('#Comments').val(Commentdata);
       //var editorInstance = CKEDITOR.instances.Comments;
       //if (editorInstance) {
       //    var currentContent = editorInstance.getData();
       //    var appendedContent = currentContent + Commentdata;
       //    debugger
       //    editorInstance.insertHtml(appendedContent);
       //}

   }
    

function onlyNumbersNotdecimals(evt) {
   debugger
    var e = event || evt;
    var charCode = e.which || e.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) || charCode == 46) {
        return false;
    }

    return true;
}
//function onlyNumbersNotdecimals(evt) {
//    debugger
//    var e = event || evt;
//    var charCode = e.which || e.keyCode;

//    if ((charCode >= 48 && charCode <= 57) ||
//        (charCode >= 65 && charCode <= 90) ||
//        (charCode >= 97 && charCode <= 122) ||
//        (charCode === 44)) {
//        return true;
//    } else {
//        return false;
//    }
//}


$('.tags').autocomplete({
    
    source: ProjectLeadListDetails,
    source: function (request, response) {
        
        var term = request.term;
        var item = request.term;
        var terms = [];

        var FullList = [];

        // substring of new string (only when a comma is in string)
        if (term.indexOf(',') > 0) {

            FullList = term.split(/;/g);
            FullList.pop();
            $.each(FullList, function (i, v) {
                //v = $.trim(v).toLowerCase();
                v = v.replace(/^\s+/, "").toLowerCase();
            })

            var index = term.lastIndexOf(',');
            term = term.substring(index + 1);
        }

        // regex to match string entered with start of suggestion strings
        var regex_validated_array = [];
        if ($.trim(term).length > 0) {
            //var re = $.ui.autocomplete.escapeRegex(term);
            var re = term;
            var matcher = new RegExp('^' + re, 'i');

            regex_validated_array = $.grep(ProjectLeadListDetails, function (item, index) {
                //return matcher.indexOf(item)!=-1;
                return $.trim(item.label).toLowerCase().indexOf(re.toLowerCase()) != -1 && (FullList.length == 0 || FullList.length > 0 && !FullList.includes($.trim(item.label)));
            });
        }

        // pass array `regex_validated_array ` to the response and 
        // `extractLast()` which takes care of the comma separation

        response($.ui.autocomplete.filter(regex_validated_array.slice(0, 50),
            extractLast(term)));

        //added for remove
        //console.log(item, 'term');

        item = item.split(',');
        item.forEach(term => {
            terms.push(term.trim());
        });
        //console.log('terms', terms);
        var userIds = [];
        terms.forEach(term => {

            userIds.push(usersMap[term]);
        });

        // empty strings for adding , at the end
        userIds.push('');
        terms.push('');

        this.value = terms;

        useridslist = userIds;
        $('#ProjectLeadID').val(userIds.slice(0, -1));

    },
    focus: function () {
        return false;
    },

    select: function (event, ui) {
        

            var items = [];
            // var row_id = $(event.target).parent('td').parent('tr').attr('id');

            // preparing all the user's actual names list
            var terms = split(this.value.trim());
            terms.pop();
            /* Logic goes here */
            var inArrayExists = terms.indexOf(ui.item.label);
            if (inArrayExists != -1) {
                alert('Duplicate selection is not allowed');
            } else {
                terms.push(ui.item.label);
            }
            terms.forEach(term => {
                items.push(term.trim());
            });


            // preparing all the user IDs list
            var userIds = [];
            items.forEach(term => {
                userIds.push(usersMap[term]);
            });
            //remove du
            // empty strings for adding , at the end
            userIds.push('');
            items.push('');

            this.value = terms
        useridslist = userIds
        $('#ProjectLeadID').val(userIds.slice(0, -1));
            return false;

    }
})
//console.log($('#ProjectLead').val(), 'jhygtf')
function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function preventInput(event) {
    // Check if a value is already selected
    var textBox = document.getElementById("ProjectLead");
    if (event.key === ",") {  
        event.preventDefault();
    }
    if (textBox.value.includes(",")) {
        // If a comma is already present, prevent any keypress events
        event.preventDefault();

    }

}