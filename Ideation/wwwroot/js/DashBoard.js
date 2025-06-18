$(document).ready(function () {
    $(".statusdetails").click(function () {
        
        var platformvalue = $(this).attr("data-bs-pt");
        var bussinessdivisionvalue = $(this).attr("data-bs-bd");
        var statusvalue = $(this).attr("data-bs-st");
        //alert(platformvalue);
        //alert(bussinessdivisionvalue);
        //alert(statusvalue);
        $.ajax({
            type: "POST",
            url: ROOT + "Dashboard/GetStatusDashBoardData",
            data: { PlatformTypeName: platformvalue, BusinessDivisionName: bussinessdivisionvalue, StatusName: statusvalue },
            dataType: "json",
            success: function (result) {
                if (result == '') {
                    alert("Please enter the correct no");
                }
                else {
                    if (result != null) {
                        console.log(result);
                        $("#table_data").empty();
                        $.each(result, function (i, obj) {
                                var tabledata = '<tr data-toggle="modal" data-target="#bcw"> <td>' +
                                    '<button type="button" class="btn_inn DbData" data-bs-toggle="modal" data-bs-target="#dashBoardModal" data-bs-dismiss="modal" data-value="' + obj.InnovationId + '"><i class="fa-solid fa-eye"></i></button > </td>'+
                                    '<td>' + obj.InnovationId + '</td>' +
                                    '<td>' + obj.BusinessDivisionName + '</td><td>' + obj.InnovationTitle + '</td>' +
                                    '<td>' + obj.PlatformTypeName + '</td><td>' + obj.StatusName + '</td > <td>' + obj.CreatedBy + '</td >' +
                                    ' <td>' + obj.CreatedDate + '</td >'
                            '</tr > ';

                            $("#table_data").append(tabledata);
                        })
                    }
                }
            }
        })
    })

    
});
$("body").on('click','.DbData',function () {
    var val = $(this).data('value');
    
    $.ajax({
        type: "POST",
        url: ROOT + "Dashboard/GetDashBoardById",
        data: { innovationId: val },
        dataType: "json",
        success: function (response) {
            if (response == '') {
                alert("Please enter the correct no");
            }
            else {
                if (response != null) {
                    console.log(response);
                    $("#dbmodal_innovationid").val(response.InnovationId);
                    $("#dbmodal_innovationtile").text(response.InnovationTitle);
                    $("#dbmodal_keywords").val(response.Keyword);
                    $("#dbmodal_pt").val(response.PlatformTypeName);
                    $("#dbmodal_other").val(response.Other);
                    $("#dbmodal_bd").val(response.BusinessDivisionName);
                    $("#dbmodal_gs").val(response.GeographicName);
                    
                    $("#dbmodal_st").val(response.StrategicFitName);
                    if (response.FilePath == null || response.FilePath == '') {
                        $("#dbmodel_filedownload").hide();
                        $("#downloadlable").hide();
                    } else {
                        $("#dbmodel_filedownload").show();
                        $("#downloadlable").show();
                        $("#dbmodel_filedownload").attr("href", ROOT + "imageUpload/" + response.FilePath);
                    }
                    $("#dbmodal_description").val(response.Description);
                }
            }
        }
    })
})
function closeModalPopup() {
    $(".modal-backdrop").remove();
}

