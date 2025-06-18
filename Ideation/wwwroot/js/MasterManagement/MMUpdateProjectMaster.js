function FetchData(data) {
    debugger
    var rowData = jQuery("#jqgrid").getRowData(data);
    var projectId = rowData['ProjectId'];
    var status = $('#' + data + 'status-dropdown :selected').text();
    var IsActive = $('#' + data + 'IsActive-dropdown :selected').text();

    var fetch = { ProjectId: projectId, Status: status, IsActive: IsActive };
    var projectData = JSON.stringify({ 'projectData': fetch });

    $.ajax({
        //contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: ROOT + "MasterManagement/MMProjectMaster",
        method: "POST",
        data: { projectData: fetch },
        success: function () {
            window.location.href = ROOT + "MasterManagement/MMProjectMaster";

            //location.reload();
            // alert("Succesfully updated data");
        },
        error: function (err) {
            Console.error(err);
        }
    });

}