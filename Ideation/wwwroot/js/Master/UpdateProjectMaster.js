
function FetchData(data) {
    
    var rowData = jQuery("#jqgrid").getRowData(data);
    pageload = false;
    var projectId = rowData['ProjectId'];
    var status = $('#' + data+'status-dropdown :selected').text();
    var IsActive = $('#' + data+'IsActive-dropdown :selected').text();

  var fetch = { ProjectId: projectId, Status: status, IsActive: IsActive };
    var projectData = JSON.stringify({ 'projectData': fetch });

    //if (rowData.PMUMappingStatus == 'Yes' || rowData.PMUMappingStatus == 'No') {
    //    $('#ProjectStatuschange').modal('show');
    //    return false;
    //} else {
    //    UpdateStatus(fetch);
    //}
    $.ajax({
        // contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        url: ROOT + "Master/ProjectMaster",
        method: "POST",
        data: { projectData: fetch },
        success: function () {
            window.location.href = ROOT + "Master/ProjectMaster";
            //location.reload();
            // alert("Succesfully updated data");
        },
        error: function (err) {
            Console.error(err);
        }
    });

}


