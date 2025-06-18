$(document).ready(function () {
    $('.multi-select').multiselect({
        includeSelectAllOption: true,
        buttonWidth: 220,
        maxHeight:300,
        enableCaseInsensitiveFiltering: true,
        enableFiltering: true
    });
    //$("#other").hide();
    //$("#otherlabel").hide();
    $(".others").hide();
    $("#regionlabel").hide();
    $("#region").hide();

    $("#download").attr("href", ROOT + "imageUpload/" + "iSpace pitch templates.pptx");
    
    $("#otherplatform").change(function () {
        var platformvalue = $("#otherplatform").val();
        var strategicfitvalue = $("#strategicfitid").val();
        if (platformvalue == 16) {
            //$("#other").show();
            //$("#otherlabel").show();
            $(".others").show();
            $("#other").attr('required', 'required');
        }
        else {
            //$("#other").hide();
            //$("#otherlabel").hide();
            $(".others").hide();
            $("#other").removeAttr('required');
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

    $(".innData").click(function () {
        var innId = $(this).data("value");
        $.ajax({
            type: "POST",
            url: ROOT + "Innovation/GetInnovationData",
            data: { innovationId: innId },
            dataType: "json",
            success: function (response) {
                if (response == '') {
                    alert("Please enter the correct no");
                }
                else {
                    if (response != null) {
                        console.log(response);
                        $("#modal_innovationid").val(response.InnovationId);
                        $("#modal_innovationtile").text(response.InnovationTitle);
                        $("#modal_keywords").val(response.Keyword);
                        $("#modal_pt").val(response.PlatformTypeName);
                        $("#modal_other").val(response.Other);
                        $("#modal_bd").val(response.BusinessDivisionName);
                        $("#modal_gs").val(response.GeographicName);

                        $("#modal_st").val(response.StrategicFitName);
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
                        $("#pmodal_pt").val(response.PlatformTypeId);
                        $("#pmodal_other").val(response.Other);
                        $("#pmodal_bd").val(response.BusinessDivisionId);
                        $("#pmodal_gs").val(response.GeographicId);
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
                        //$("#modal_table tbody").html(tabledata);
                        //$("#exampleModal").css({ opacity: 1 });
                        //$("#exampleModal").show();
                    }
                }
            },
            error: function () {
                alert("Error occured!!");
            }
        });


    });
    //$("#saveInn").click(function () {
    //    var innovat = { Keyword: $("#pmodal_keywords").val(), InnovationId: $("#pmodal_innovationid").val(), PlatformTypeId: $("#pmodal_pt").val(), StrategicFitId: $("#pmodal_st").val(), Other: $("#pmodal_other").val(), BusinessDivisionId: $("#pmodal_bd").val(), GeographicId: $("#pmodal_gs").val(), Region: $("#pmodal_region").val(), Description: $("#pmodal_description").val(), FilePath: $("#pfileupload").val(), PostedFile: $("#pfileupload").val() };
    //    innovationstatu(innovat);

    //})


    //$("#download").click(function () {
    //    window.location.href = ROOT + "Innovation/DownloadTemplet";
    //})

});

//function innovationstatu(innstats) {
//    console.log(JSON.stringify(innstats));
//    $.ajax({
//        type: "POST",
//        url: ROOT + "Innovation/UpdateInnovationData",
//        data: { innovat: innstats },
//        dataType: "json",
//        success: function (result) {
//            if (result != null) {
//                console.log(result);
//            }
//            alert("success");
//            $("#pendDataView").hide();
//            $(".modal-backdrop").remove();
//            window.location.reload();
//        }
//    });

//}
function closeModalPopup() {
    $(".modal-backdrop").remove();
}

