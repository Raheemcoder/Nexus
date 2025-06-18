$(document).ready(function () {
    function clearValidationMessage(element) {
        $(element).siblings('.text-danger').html('');
    }
    $('#Keyword, #InnovationTitle, #other').on('keyup', function () {
        clearValidationMessage(this);
    });
    $('#mainInnForm select, input[type="file"]').on('change', function () {
        clearValidationMessage(this);
    });
    $('#pmodal_st').on('change', function () {
        if ($('#pmodal_st').val() != '' || $('#pmodal_st').val() != null || typeof ($('#pmodal_st')) != "undefined") {
            $('#pmodal_StrategicFitId_valid').hide();
        }
    });
    $('#pmodal_pt').on('change', function () {
        if ($('#pmodal_pt').val() != '' || $('#pmodal_pt').val() != null || typeof ($('#pmodal_pt')) != "undefined") {
            $('#pmodal_PlatformTypeId_valid').hide();

        }
        $('#pmodal_Other_valid').hide();
    });
    $('#pmodal_bd').on('change', function () {
        if ($('#pmodal_bd').val() != '' || $('#pmodal_bd').val() != null || typeof ($('#pmodal_bd')) != "undefined") {
            $('#pmodal_BusinessDivisionId_valid').hide();
        }
    });
    $('#pmodal_gs').on('change', function () {
        if ($('#pmodal_gs').val() != '' || $('#pmodal_bd').val() != null || typeof ($('#pmodal_bd')) != "undefined") {
            $('#pmodal_GeographicId_valid').hide();
        }
    });
    
    $("#pmodal_other").change(function () {
        if ($('#pmodal_other').val() != '' || $('#pmodal_other').val() != null || typeof ($('#pmodal_other')) != "undefined") {
            $('#pmodal_Other_valid').hide();
        }
    });
   


    

    $('.multi-select').multiselect({
        includeSelectAllOption: true,
        buttonWidth: 220,
        maxHeight: 300,
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true
    });
    $(".others").hide();
    $("#regionlabel").hide();
    $("#region").hide();

    $(".download_template").attr("href", ROOT + "imageUpload/" + "iSpace pitch templates.pptx");

    $("#otherplatform").change(function () {
        debugger;
        var platformvalue = $("#otherplatform").val();
        var strategicfitvalue = $("#strategicfitid").val();
        if (platformvalue == 16) {
            $(".others").show();
            //$("#other").attr('required', 'required');
            $("#other").rules('add', 'required');
            $('#other').val('');
        }
        else {
            $(".others").hide();
            //$("#other").removeAttr('required');
            $("#other").rules('remove', 'required');
            $('#other').val('');

        }
    });
    $("#geographicregion").change(function () {
        var geographicvalue = $("#geographicregion").val();
        if (geographicvalue == 31 || geographicvalue == 32) {
            $("#regionlabel").show();
            $("#region").show();
            $("#region").attr('required', 'required');
        }
        else {
            $("#regionlabel").hide();
            $("#region").hide();
            $("#region").removeAttr('required');
        }
    });

    setTimeout(function () {
        $("#message2").fadeOut();
    }, 5000);

});
$('#submitdata').off('click').on('click', function () {
    if ($('#mainInnForm').valid()){
        $(this).prop('disabled', true);
        $('#mainInnForm').submit();
    }
});
$("#saveInn").click(function () {
    debugger;
    var isValid = true
    var InnovationData = {
        BusinessDivisionId: $("#pmodal_bd").val(),
        GeographicId: $("#pmodal_gs").val(),
        PlatformTypeId: $("#pmodal_pt").val(),
        Other: $("#pmodal_other").val(),
        StrategicFitId: $("#pmodal_st").val(),
        PostedFile: $("#pfileupload").val()
        //Remarks: $("#pmodal_remarkStatus").val()
    };
    $.each(InnovationData, function (key, value) {
        if (key === "Other") {
            var platformvalue = $("#pmodal_pt").val();
            if (platformvalue == 16) {
                if (value === "" || value === null) {
                    $("#pmodal_" + key + "_valid").show();
                    isValid = false
                }
            } else {
                $("#pmodal_" + key + "_valid").hide();
            }
        } else if (key === "StrategicFitId") {
            if (value.length === 0) {
                $("#pmodal_" + key + "_valid").show();
                isValid = false
            } else {
                $("#pmodal_" + key + "_valid").hide();
            }
        }
        else {
            if (value === "" || value === null) {
                $("#pmodal_" + key + "_valid").show();
                isValid = false
            } else {
                $("#pmodal_" + key + "_valid").hide();
            }
        }
    });
    if (isValid) {
        debugger;
        //$("#confirmpopup").modal("show");
        //$('#ConfirmOKbutton').off('click').on('click', function () {
        //    debugger;
           
        //});
        submitModalInnSave()
    }
});


var fileExtension = ['pdf', 'jpg', 'jpeg', 'png', 'ppt', 'pptx'];

$(document).on('change', '#fileupload', function (e) {
    debugger;
    var valid = true;
    var fileName = e.target.files[0].name;
    var extension = fileName.split(".").pop();
    var size = e.target.files[0].size;
    var maxSizeInBytes = 3 * 1024 * 1024;

    //if ($.inArray(extension.toLowerCase(), fileExtension) === -1) {
    //    alert("Please select " + fileExtension.toString() + " files only");
    //    $(this).val('');
    //    valid = false;
    //    return false;
    //}
    if (size > maxSizeInBytes) {
        alert('Please select file size of Upto 3 MB');
        $(this).val('');
        valid = false;
        return false;
    }
});

$(document).on('change', '#pfileupload', function (e) {
    debugger;
    var valid = true;
    var fileName = e.target.files[0].name;
    var extension = fileName.split(".").pop();
    var size = e.target.files[0].size;
    var maxSizeInBytes = 3 * 1024 * 1024;

    //if ($.inArray(extension.toLowerCase(), fileExtension) === -1) {
    //    alert("Please select " + fileExtension.toString() + " files only");
    //    $(this).val('');
    //    valid = false;
    //    return false;
    //}
    if (size > maxSizeInBytes) {
        alert('Please select file size of Upto 3 MB');
        $(this).val('');
        valid = false;
        return false;
    }
    var value = $(this).val();
    if (value === "" || value === null) {
        $("#pmodal_pfileupload_valid").show();
    } else {
        $("#pmodal_pfileupload_valid").hide();
    }
});



function closeModalPopup() {
    $(".modal-backdrop").remove();
}
function ViewDetails(innId, type) {
    $.ajax({
        type: "POST",
        url: ROOT + "NewInnovation/GetInnovationData",
        data: { innovationId: innId },
        dataType: "json",
        success: function (response) {
            if (response == '') {
                alert("Please enter the correct no");
            }
            else {
                if (response != null) {
                    if (type == 'submitted') {
                        $('#innDataView').modal('show');

                    }
                    else {
                        $('#pendDataView').modal('show');
                    }
                    debugger;
                    $("#modal_innovationid").val(response.InnovationId);
                    $("#modal_innovationtile").text(response.InnovationTitle);
                    $("#modal_innovationtile").attr("title", response.Remarks);

                    $("#modal_keywords").val(response.Keyword);
                    $("#modal_keywords").attr("title", response.Keyword);

                    $("#modal_pt").val(response.PlatformTypeName);
                    $("#modal_pt").attr("title", response.PlatformTypeName);

                    $("#modal_other").val(response.Other);
                    $("#modal_other").attr("title", response.Other);

                    $("#modal_bd").val(response.BusinessDivisionName);
                    $("#modal_bd").attr("title", response.BusinessDivisionName);

                    $("#modal_gs").val(response.GeographicName);
                    $("#modal_gs").attr("title", response.GeographicName);

                    $("#modal_st").val(response.StrategicFitName);
                    $("#modal_st").attr("title", response.StrategicFitName);

                    if (response.FilePath == null || response.FilePath == '') {
                        $("#innmodel_filedownload").hide();
                        $("#downloadlable").hide();
                    } else {
                        $("#innmodel_filedownload").show();
                        $("#downloadlable").show();
                        $("#innmodel_filedownload").attr("href", ROOT + "imageUpload/" + response.FilePath);
                    }
                    $("#modal_description").val(response.Description);



                    $("#pmodal_innovationid").val(response.InnovationId);
                    $("#pmodal_innovationtile").text(response.InnovationTitle);
                    $("#pmodal_keywords").val(response.Keyword);
                    $("#pmodal_keywords").attr("title", response.Keyword);
                    $("#pmodal_pt").val(response.PlatformTypeId).trigger('change');
                    $("#pmodal_other").val(response.Other);
                    $("#pmodal_bd").val(response.BusinessDivisionId).trigger('change');
                    $("#pmodal_gs").val(response.GeographicId).trigger('change');
                    $("#pmodal_st").val(response.StrategicFitId);
                    $('#pmodal_st').multiselect('refresh')
                    if (response.FilePath == null || response.FilePath == '') {
                        $("#Pending_filedownload").hide();
                        $("#pdownloadlable").hide();

                    } else {
                        $("#Pending_filedownload").show();
                        $("#pdownloadlable").show();
                        $("#pfilename").val(response.FilePath);
                        $("#Pending_filedownload").attr("href", ROOT + "imageUpload/" + response.FilePath);

                    }
                    $("#pmodal_description").val(response.Description);
                    $("#pmodal_remarks").val(response.Remarks);
                    $("#pmodal_remarkStatus").val(response.Remarks);
                    $("#pmodal_remarkStatus").attr("title", response.Remarks);

                    $("#pmodal_BusinessDivisionId_valid").hide();
                    $("#pmodal_GeographicId_valid").hide();
                    $("#pmodal_PlatformTypeId_valid").hide();
                    $("#pmodal_Other_valid").hide();
                    $("#pmodal_StrategicFitId_valid").hide();
                    $("#pmodal_PostedFile_valid").hide();
                }
            }
        },
        error: function () {
            alert("Error occured!!");
        }
    });
}
function innovationstatu(innstats) {
    console.log(json.stringify(innstats));
    $.ajax({
        type: "post",
        url: root + "NewInnovation/UpdateInnovationData",
        data: { innovat: innstats },
        datatype: "json",
        success: function (result) {
            if (result != null) {
                console.log(result);
            }
            alert("success");
            $("#penddataview").hide();
            $(".modal-backdrop").remove();
            window.location.reload();
        }
    });

}

var submissioncolmodels = [
    {
        name: 'Action',
        label: '',
        resizable: true,
        width: 30,
        ignoreCase: true,
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="d-flex justify-content-center action_icons align-items-center" title="">' +
                '<a href="#" class="" title="" onclick="ViewDetails(' + rowobject.InnovationId + ', \'submitted\')"><i class="fas fa-eye" aria-hidden="true" title="Eye"></i></a>' +
                '</div>';
        }
    },
    {
        name: 'InnovationTitle',
        label: 'Projects',
        width: 120,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'StatusName',
        label: 'Status',
        width: 50,
        resizable: true,
        ignoreCase: true,
        formatter: function (cellvalue, options, rowobject) {
            if (rowobject.StatusName.toLowerCase() == "approved") {
                return '<span style="color:green !important;">' + cellvalue + '</span>';

            }
            else if (rowobject.StatusName.toLowerCase() == "declined") {
                return '<span style="color:red !important;">' + cellvalue + '</span>';

            }
            else if (rowobject.StatusName.toLowerCase() == "pending") {
                return '<span style="color:orange !important;">' + cellvalue + '</span>';

            }
            else if (rowobject.StatusName.toLowerCase() == "existing") {
                return '<span style="color:blue !important;">' + cellvalue + '</span>';

            }
            else if (rowobject.StatusName.toLowerCase() == "sendback") {
                return '<span style="color:light blue !important;">' + cellvalue + '</span>';

            }
            else {
                return '<span>' + cellvalue + '</span>';

            }
        }

    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 90,
        resizable: true,
        ignoreCase: true

    },
];
function createsubmissiongrid(submitteddata) {
    $.jgrid.gridUnload('#submissions_grid');
    $("#submissions_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: submitteddata,
        mtype: 'GET',
        colModel: submissioncolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#submissions_pager',
        rowNum: 30,
        scroll: 1,
        gridComplete: function () {
            var objRows = $("#submissions_grid tbody tr");
            var objHeader = $("#submissions_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#submissions_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

}
$('#submitmodal').on('click', function () {
    debugger;
    $.ajax({
        type: "GET",
        url: ROOT + "NewInnovation/GetSubmittedData",
        dataType: 'JSON',
        success: function (result) {
            debugger;
            $('#submissionsmodal').modal('show');
            createsubmissiongrid(result)
        },
    });
});


var pendingcolmodels = [
    {
        name: 'Action',
        label: '',
        resizable: true,
        width: 30,
        ignoreCase: true,
        search: false,
        formatter: function (cellvalue, options, rowobject) {
            return '<div class="d-flex  justify-content-center action_icons align-items-center" title="">' +
                '<a href="#" class="" title="" onclick="ViewDetails(' + rowobject.InnovationId + ', \'pending\')"><i class="fas fa-eye" aria-hidden="true" title="Eye"></i></a>' +
                '</div>';
        }
    },
    {
        name: 'InnovationTitle',
        label: 'Projects',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'StatusName',
        label: 'Status',
        width: 90,
        resizable: true,
        ignoreCase: true,
    },
    {
        name: 'Remarks',
        label: 'Remarks',
        width: 90,
        resizable: true,
        ignoreCase: true,

    },



];

function creatependingjqgrid(pendingdata) {
    debugger;
    $.jgrid.gridUnload('#innovation_grid');
    $("#innovation_grid").jqGrid({
        url: '',
        datatype: 'local',
        data: pendingdata,
        mtype: 'GET',
        colModel: pendingcolmodels,
        loadonce: true,
        viewrecords: true,
        pager: '#innovation_pager',
        rowNum: 30,
        scroll: 1,


        gridComplete: function () {
            var objRows = $("#innovation_grid tbody tr");
            var objHeader = $("#innovation_grid tbody tr td");

            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

        }
    });
    $("#innovation_grid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
}
$('#pendingmodal').on('click', function () {
    $.ajax({
        type: "GET",
        url: ROOT + "NewInnovation/GetPendingData",
        dataType: 'JSON',
        success: function (result) {
            debugger;
            $('#pendingsubmissionsmodal').modal('show');
            creatependingjqgrid(result);

        },
    });
});
function submitModalInnSave() {
    var InnovationId = $("#pmodal_innovationid").val();
    var Keyword = $("#pmodal_keywords").val();
    var PlatformTypeId = $("#pmodal_pt").val();
    var Other = $("#pmodal_other").val();
    var BusinessDivisionId = $("#pmodal_bd").val();
    var GeographicId = $("#pmodal_gs").val();
    var StrategicFitId = $("#pmodal_st").val();
    var Description = $("#pmodal_description").val();
    var Remarks = $("#pmodal_remarkStatus").val()
    //var Region = $("#pmodal_region").val();
    //var FilePath = $("#pfileupload").val();
    var fileUpload = $("#pfileupload").get(0);
    var files = fileUpload.files;

    var formData = new FormData();
    formData.append("InnovationId", InnovationId);
    formData.append("Keyword", Keyword);
    formData.append("PlatformTypeId", PlatformTypeId);
    formData.append("Other", Other);
    formData.append("BusinessDivisionId", BusinessDivisionId);
    formData.append("GeographicId", GeographicId);
    formData.append("StrategicFitId", StrategicFitId);
    formData.append("Description", Description);
    formData.append("Remarks", Remarks);
    if (files.length != "0" || files.length != 0) {
        formData.append("PostedFile", files[0]);
    }

    $.ajax({
        url: ROOT + 'NewInnovation/UpdateInnovationData',
        dataType: 'JSON',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        async: false,
        success: function (result) {
            debugger;
            window.location.reload();
        },
        error: function () {
            alert(" An Error occured!!");
        }
    });
}