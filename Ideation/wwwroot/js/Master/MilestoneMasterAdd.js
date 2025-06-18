$(document).ready(function () {
    var submithide = '';

    $("#Duration").val('');
    $(function () {
        $('#Setrelation').multiselect({
            includeSelectAllOption: true,
            maxHeight: 300
        });
    });
    $("#btnSubmit").click(function () {
      
        submithide = '';
        var sequnceNo = $('#SetSequnce').val();
        var Name = $('#Name').val();
        var relationType = $('#relationtype').val();
        var setRelationList = $("#Setrelation option:Selected").val();
        var setRelation = $('#Setrelation').val().toString();
        var status = $("input:radio[name='Status']:checked").val();
        var recordCount = $("#count").val();
        var duration = parseInt($("#Duration").val());
        //modified

        if (recordCount == "0") {
            if (setRelation === "") {
                setRelation = 'No relation';
            }
        }



        if (sequnceNo.length == "0") {
            alert("Please select the Sequence Number ");
            return false;
        }




        if (Name.length == " ") {
            alert("Please enter the Milestone Name");
            //Isvalidename = falsel
            return false;
        }

        if ($("#Duration").val() =='') {
            alert("Please enter the Duration");
            return false;
        }
       
        if (sequnceNo != 1) {

            if (parseInt(recordCount) > 1) {
                if (setRelationList == undefined) {

                        alert("Please select the set relation");
                       
                        return false;
                    
                }
            }

        }
        if (status == undefined) {
            alert("Please select the Status");
            return false;
        }
        //if ($("#MilestoneId").val() !='1013') {
        //    for (var i = 0; i < setRelationList.length; i++) {
        //        console.log('seq', setRelation[i]);
        //        if (parseInt(sequnceNo) < parseInt(setRelation[i])) {
        //            alert('Please select the SetRelation less than the Sequnce Number');
        //            submithide = 'more';
        //        }
        //    }
        //}
        

        //modified



        
        var milestone = {
            "MilestoneId": $("#MilestoneId").val(),
            "SequenceNo": $('#SetSequnce').val(),
            "MilestoneName": $('#Name').val(),
            "RelationType": $('#relationtype').val(),
            "SetRelation": setRelation,
            "Duration" : duration,
           "Status" : status,
        };
        //milestone["MilestoneId"] = $("#MilestoneId").val();
        //milestone["SequenceNo"] = $('#SetSequnce').val();
        //milestone["MilestoneName"] = $('#Name').val();
        //milestone["RelationType"] = $('#relationtype').val();
        //milestone["SetRelation"] = setRelation;
        //milestone["Duration"] = duration;
        //milestone["Status"] = status;
        //var milestone= JSON.stringify(milestone)
        console.log('milestone', milestone);
        if (milestone != null && submithide=='') {
            $.ajax({
                type: "POST",
                url: ROOT + "Master/MilestoneMaster",
                data: { milestone: milestone },
                /*contentType: "application/json; charset=utf-8",*/
                dataType: "json",

                success: function (response) {
                    
                    console.log('response', response);
                    if (response != null && response != '') {
                        //alert("Name : " + response.MilestoneName + ", Designation : " + response.SequenceNo);
                        //location.reload();
                        //alert(response.OutMessage);
                        window.location.href = ROOT + "Master/MilestoneMaster";

                    }else {
                        alert("Something went wrong");
                    }
                },
                error: function (err) {
                    alert(err.responseText);
                }

            });
        }
    });
    
    $("#Addmilestone").click(function () {
        $("#element").prepend("Add New ");
    });


    $("#btnCancel").click(function () {


        $('#SetSequnce').val(" ");
        $('#Name').val(" ");
        $('#relationtype').val(" ");
        // $('#Setrelation').val(" ");
        $('#Setrelation :selected').attr('selected', '');
        //milestone["Status"] = $('#option1').val();

        location.reload();
    });
    $("#close").click(function () {


        $('#SetSequnce').val(" ");
        $('#Name').val(" ");
        $('#relationtype').val(" ");
        // $('#Setrelation').val(" ");
        $('#Setrelation :selected').attr('selected', '');
        //milestone["Status"] = $('#option1').val();

        location.reload();
    });
    //$("#message").slideUp(6000);
   

});