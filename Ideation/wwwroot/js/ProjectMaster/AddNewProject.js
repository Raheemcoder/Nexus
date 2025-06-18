var UserGroup = [];
var jsonArray = [];

$(document).ready(function () {

    var prjName = $.trim($('#PMPrjName').val());
    if (prjName.length > 40) {
        $('#Err_PrjName_Exceed').show();
    }
    else {
        $('#Err_PrjName_Exceed').hide();
    }

    $('#PMStartDate').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
    });

    $('#PMEndDate').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
    });

    $('#PMStartDate').on('change', function () {
        $('#PMEndDate').datepicker('setStartDate', $(this).val());
    });

    $('#PMEndDate').on('change', function () {
        $('#PMStartDate').datepicker('setEndDate', $(this).val());
    });

    //var today = new Date();
    //var todayDate = ('0' + today.getDate()).slice(-2) + '/' + ('0' + (today.getMonth() + 1)).slice(-2) + '/' + today.getFullYear();

    //var lastYear = new Date();
    //lastYear.setFullYear(today.getFullYear() - 1);
    //var oneYearBeforeDate = ('0' + lastYear.getDate()).slice(-2) + '/' + ('0' + (lastYear.getMonth() + 1)).slice(-2) + '/' + lastYear.getFullYear();

    //var nextYear = new Date();
    //nextYear.setFullYear(today.getFullYear() + 1);
    //var oneYearAfterDate = ('0' + nextYear.getDate()).slice(-2) + '/' + ('0' + (nextYear.getMonth() + 1)).slice(-2) + '/' + nextYear.getFullYear();

    //$('#PMStartDate').datepicker({
    //    format: 'dd/mm/yyyy',
    //    autoclose: true,
    //    startDate: oneYearBeforeDate,
    //    endDate: oneYearAfterDate
    //});

    //$('#PMEndDate').datepicker({
    //    format: 'dd/mm/yyyy',
    //    autoclose: true,
    //    startDate: oneYearBeforeDate,
    //    endDate: oneYearAfterDate
    //});

    //$('#PMStartDate').on('change', function () {
    //    $('#PMEndDate').datepicker('setStartDate', $(this).val());
    //});

    //$('#PMEndDate').on('change', function () {
    //    $('#PMStartDate').datepicker('setEndDate', $(this).val());
    //});

    UserGroup = $("#UserGrp").val();
    jsonArray = JSON.parse(UserGroup);

    if (jsonArray.length > 0) {
        if (jsonArray[0].UserPortfolio == "9002") {
            var defaultPortfolioValue = "9002";
            $('#PMPortfolioName').val(defaultPortfolioValue).trigger('change');
        }
    }

});
$('#PMPrjName').on("keyup", function (event) {
    var prjName = $.trim($('#PMPrjName').val());
    if (prjName.length > 0) {

        $('#Err_PrjName').hide();
    }
    else {
        $('#Err_PrjName').show();
    }
    if (prjName.length > 40) {
        $('#Err_PrjName_Exceed').show();
    }
    else {
        $('#Err_PrjName_Exceed').hide();
    }
});
$("#PMTemplateName").on("change", function () {
    var template = $.trim($('#PMTemplateName').val());
    if (template.length > 0 && template != "Select") {

        $('#Err_Template').hide();
    }
    else {
        $('#Err_Template').show();
    }
});
$("#PMHubMaster").on("change", function () {
    var hub = $.trim($('#PMHubMaster').val());
    if (hub.length > 0) {

        $('#Err_Hub').hide();
    }
    else {
        $('#Err_Hub').show();
    }
});
$("#PMStartDate").on("change", function () {

    var startDate = $.trim($('#PMStartDate').val());

    if (startDate.length > 0) {
        $('#Err_StartDate').hide();
    }
    else {
        $('#Err_StartDate').show();
    }
});
$("#PMEndDate").on("change", function () {

    var endDate = $.trim($('#PMEndDate').val());

    if (endDate.length > 0) {

        $('#Err_EndDate').hide();
    }
    else {
        $('#Err_EndDate').show();
    }
});
$("#PMStartDate").on("keyup", function () {

    var startDate = $.trim($('#PMStartDate').val());

    if (startDate.length > 0 && startDate.length != 10) {
        $('#Val_StartDate').show();
    }
    else {
        $('#Val_StartDate').hide();
    }
});
$("#PMEndDate").on("keyup", function () {

    var endDate = $.trim($('#PMEndDate').val());

    if (endDate.length > 0 && endDate.length != 10) {
        $('#Val_EndDate').show();
    }
    else {
        $('#Val_EndDate').hide();
    }
});

$(document).on('change', '#PMPortfolioName', function () {

    var portfolio = $.trim($('#PMPortfolioName').val());
    if (portfolio.length > 0) {
        $('#Err_Portfolio').hide();
    }
    else {
        $('#Err_Portfolio').show();
        $('#Err_Bucket').show();
        $('#Err_ItemType').show();
        $('#Err_Template').show();
    }


    var portfolioId = $(this).val();
    var bucketArray = $.parseJSON($('#SetBucket').val());
    var filteredBuckets = FilterBucketDropDown(portfolioId);

    function FilterBucketDropDown(PortfolioId) {
        var Buckets = bucketArray.filter(function (item) {
            return item.Parent === PortfolioId;
        });
        return Buckets;
    }

    $('#PMBucketName').empty();
    var bucketList = '<option>Select</option>';
    $.each(filteredBuckets, function (index, value) {
        bucketList += '<option value="' + value["BucketId"] + '">' + value["BucketName"] + '</option>';
    });

    $('#PMItemTypeName').empty();
    var itemTypeList = '<option>Select</option>';

    $('#PMTemplateName').empty();
    var templateList = '<option>Select</option>';


    $('#PMBucketName').append(bucketList);
    $('#PMItemTypeName').append(itemTypeList);
    $('#PMTemplateName').append(templateList);

    if (jsonArray[0].UserPortfolio == "9002") {
        var defaultBucketValue = "RD INDIA D3";
        $('#PMBucketName').val(defaultBucketValue).trigger('change');
    }
});

$(document).on('change', '#PMBucketName', function () {

    var bucket = $.trim($('#PMBucketName').val());
    if (bucket.length > 0 && bucket != "Select") {

        $('#Err_Bucket').hide();
    }
    else {
        flag = false;
        $('#Err_Bucket').show();
        $('#Err_ItemType').show();
        $('#Err_Template').show();
    }

    var bucketId = $(this).val();

    var itemTypeArray = $.parseJSON($('#SetItemType').val());
    var filteredItemType = FilterItemTypeDropDown(bucketId);

    function FilterItemTypeDropDown(BucketId) {
        var filteredItemType = itemTypeArray.filter(function (item) {
            return item.Parent === BucketId;
        });

        return filteredItemType;
    }

    $('#PMItemTypeName').empty();
    var itemTypeList = '<option>Select</option>';
    $.each(filteredItemType, function (index, value) {
        itemTypeList += '<option value="' + value["ItemTypeId"] + '">' + value["ItemTypeName"] + '</option>';
    });

    $('#PMTemplateName').empty();
    var templateList = '<option>Select</option>';


    $('#PMItemTypeName').append(itemTypeList);
    $('#PMTemplateName').append(templateList);

    if (jsonArray[0].UserPortfolio == "9002") {
        var defaultItemType = "9007";
        $('#PMItemTypeName').val(defaultItemType).trigger('change');
    }
});

$(document).on('change', '#PMItemTypeName', function () {

    var itemType = $.trim($('#PMItemTypeName').val());
    if (itemType.length > 0 && itemType != "Select") {

        $('#Err_ItemType').hide();
    }
    else {
        $('#Err_ItemType').show();
        $('#Err_Template').show();
    }

    var itemTypeId = $(this).val();
    var templateArray = $.parseJSON($('#SetTemplate').val());
    var filteredTemplate = FilterTemplateDropDown(itemTypeId);

    function FilterTemplateDropDown(ItemtypeId) {
        var filteredTemplate = templateArray.filter(function (item) {
            return item.Parent === ItemtypeId;
        });

        return filteredTemplate;
    }

    $('#PMTemplateName').empty();

    var templateList = '<option>Select</option>';

    $.each(filteredTemplate, function (index, value) {
        templateList += '<option value="' + value["TemplateId"] + '">' + value["Template"] + '</option>';
    });

    $('#PMTemplateName').append(templateList);

    if (jsonArray[0].UserPortfolio == "9002") {
        var defaultTemplateName = "RN D3";
        $('#PMTemplateName').val(defaultTemplateName).trigger('change');
    }
});

//For MultiSelect Hub Values
function updateHiddenHubValue() {
    var selectedHubs = Array.from(document.querySelectorAll('#PMHubMaster option:checked')).map(option => option.value);
    var selectedHubsString = selectedHubs.join(',');
    document.getElementById('SelectedHubs').value = selectedHubsString;
}

//Form validation of addproject
function validateNewProjectForm() {

    var flag = true;

    var prjName = $.trim($('#PMPrjName').val());
    var portfolio = $('#PMPortfolioName').val();
    var template = $('#PMTemplateName').val();
    var itemType = $('#PMItemTypeName').val();
    var bucket = $('#PMBucketName').val();
    var hub = $('#PMHubMaster').val();
    var startDate = $('#PMStartDate').val();
    var endDate = $('#PMEndDate').val();

    $('.Err_PM').hide();

    if (prjName == "" || portfolio == "" || template == "" || template == "Select"
        || itemType == "" || itemType == "Select" || bucket == "" || bucket == "Select"
        || startDate == "" || endDate == "" || hub == ""
        || startDate.length > 0 && startDate.length != 10 || endDate.length > 0 && endDate.length != 10 || prjName.length > 40) {

        flag = false;
        prjName == "" ? $('#Err_PrjName').show() : $('#Err_PrjName').hide();
        prjName.length > 40 ? $('#Err_PrjName_Exceed').show() : $('#Err_PrjName_Exceed').hide();
        /*  product == "" ? $('#Err_Product').show() : $('#Err_Product').hide();*/
        portfolio == "" ? $('#Err_Portfolio').show() : $('#Err_Portfolio').hide();
        ((template == "") || (template == "Select")) ? $('#Err_Template').show() : $('#Err_Template').hide();
        ((itemType == "") || (itemType == "Select")) ? $('#Err_ItemType').show() : $('#Err_ItemType').hide();
        ((bucket == "") || (bucket == "Select")) ? $('#Err_Bucket').show() : $('#Err_Bucket').hide();
        hub == "" ? $('#Err_Hub').show() : $('#Err_Hub').hide();
        startDate == "" ? $('#Err_StartDate').show() : $('#Err_StartDate').hide();
        endDate == "" ? $('#Err_EndDate').show() : $('#Err_EndDate').hide();
        (startDate.length > 0 && startDate.length != 10) == true ? $('#Val_StartDate').show() : $('#Val_StartDate').hide();
        (endDate.length > 0 && endDate.length != 10) == true ? $('#Val_EndDate').show() : $('#Val_EndDate').hide();

    }

    if (flag) {
        $('#SaveAddProjectModal').modal('show');
        $('#SaveNewProject').click(function () {
            $('#SaveAddProjectModal').modal('hide');
            $('#AddNewProject').submit();
            $('#loader').show();
            $('#loader').css('visibility', 'visible');
        });
    }
}