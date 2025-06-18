$(document).ready(function () {
    var url = "/Ideation/IdeationDisplay";
    $.get(url, null, function (data) {
        var result = jQuery.parseJSON(data);
        
        for (i = 0; i < result.length; i++) {
            var tabledata = '<tr data-bs-toggle="modal" data-bs-target="#exampleModal">' +
                '<td>' + result[i].EmployeeId + '</td><td>' + result[i].BusinessDivisionName + '</td>' +
                '<td>' + result[i].InnovationTitle + '</td><td>' + result[i].PlatformTypeName + '</td>' +
                '<td class="approved" id="status"><a href="@Url.Content("#")">' + result[i].StatusName + '</a></td><td>' + result[i].CreatedBy + '</td>' +
                '<td>' + result[i].CreatedDate + '</td></tr>';
            $("#tbody").append(tabledata);
        }

    });
   
});