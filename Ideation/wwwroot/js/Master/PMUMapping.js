var ProjStatus;
var PMUFlag;
var changedprojectId = 0;
var changedmilestoneId = 0;
var checkedmilestones = [];
var golbalsequencenumber = 1;
var usertextid = '';
var searchresult = [];
var milestoneconut = '';
var DefaultArray = [];
var DurationList = [];
var projectId = '';
var ProjectName = '';
var selectedval = 'n';
var pmudetails = [];
var isinvalide = 0;
var display = 's';
var issetrelationchanged = true;
var usernumber = '';
var pmugridData = [];
var durationflag = false;
var setrelationchanged = false;
var beforesetrelation = '';
var beforeDuration = '';
var MaterialArray = [];
var changedDuration = '';
var selectedmilestoneId = '';
var ParentMilestoneid = '';
var useridslist = '';
var compltedmilestone = true;
var sort = true;
var gridselectedrow = [];
var changedSequnceNo = '';
var looping = true;
var userchangedSetrelation = true;
var milestoneid_looping = [];
var selectedrowsequnce = [];
var EnddatechangedRowId = '';
var cloneproject = false;
var clonedProjectName = '';
var clonedprojectId = '';
var prevStartDate = '';
var prevEndDate = '';
var datepapulation = true;
var startDatealertdisplay = true;
var DatesPapulation = '';
var uploadedFiles = [];
var deletedrow = '';
var fileuploadedsuccess = false;
var Existingsupportingdocfilenames = [];
var FileNamesList = [];
var UploadedFilesnameList = [];
var fileuploadedrow = '';
var selectedFiles = [];
var FileName = [];
var MilestoneFilesList = [];
var formData = new FormData();
var subgrid_table_id = [];
var SubGridDatedisplaycount = 0;
var EndDatechange_Sub = false;
var TotalSubGridData = [];
var rowSequnce = comingSubGrid
var Subchange = false;
var LoadSubGridData = true;
var SubGridSelectedrowid = '';
var comingSubGrid = false
var DurationchangedSubGrid = true;
var ParentSubGridId = '';
var ClonedProjectDetails = false;
var selectedprojectId_Clone = '';
var projectIdchanged = false;
var TemplateSubGridDisplay = true;
var SelectedSubMilestoneData = [];
var emptySetRelation = '';
var ExtraDaysAdd = '';
var pmuFirstData = [];
var ParentId = '';
var ParentSubgrid_data = [];
var ParentSequnceNo = '';
var SubMilestonestartid = '8001';
var data_Added = true;
var deletedSubMilestone = false;
var AddSubMilestoneFlag = true;
var Datachange_SubgRID = '';
var newSubGridrow = '';
var SubGridSelected = '';
var prevSubGridStartDate = '';
var prevSubGridEndDate = '';
var prevSubGridSetrelation = '';
var prevSubGridDuration = '';
var prevSubGridmapperUser = '';
var prevSubGridmapperUserid = '';
var prevSubGridSubRemarks = '';
var SubGridChanged = false;
var unselectSubMilestone = false;
var SubgridStartDatechanged = '';
var SelectedProjectId = '';
var Setrelationchanged_sub = true;
var DisplaySubGridValue = '';
var DependentSub_Milestones = [];
var dependentMilestoneDetailsList = [];
var UpdatedStartDate_User = '';
var updatedStartDateDisplay = '';
var UpdatedSetrelation_display = '';
var unionSelectedSubgrid_id = '';
var changedmaingrid_id = '';
var VersionReamrks = '';
var chnagedSubgridDateId = '';
var CancelHighlighter = '';
$(document).ready(function () {
    jQuery.support.cors = true;
    $('#loader').css('visibility', 'hidden');
    $('.checkboxpmu').hide();
    $('#Versionchange').hide();
    $('#Setrelation').multiselect({
        includeSelectAllOption: true,
        maxHeight: 300
    });
    $('[data-singleselect]').select2();

    $('#FromProjectId').select2();
    $('#ToProjectId').select2();
    DurationList = []; searchresult = [];
    var projectId = $('#selectedProjectId').val();
    //Parent Grid Colmodels
    models = [

        {
            name: 'MilestoneId',
            label: 'Milestone Id',
            width: 40,
            resizable: true,
            ignoreCase: true,
            hidden: true,
            sortable: false
            //formatter: function (cellvalue, options, rowobject) {
            //    return '<span class="cellWithoutBackground" style="background-color:green;">' + rowobject.MilestoneId + '</span>';
            //}
        },

        {
            name: 'RowId',
            label: 'RowId',
            //width: 100,
            resizable: true,
            ignoreCase: true,
            hidden: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {


                //return '<input type="text" id="' + options.rowId + '" >';

            }
        },

        {
            name: 'SequenceNo',
            label: 'M.No',
            width: 70,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            //formatter: function (cellvalue, options, rowobject) {
            //    if (rowobject.MilestoneStatus == 'Completed') {
            //        return '<span class="cellWithoutBackground" style="background-color:#9ee99e;">' + rowobject.SequenceNo + '</span>';
            //    } else {
            //        return rowobject.SequenceNo
            //    }

            //}
        },

        {
            name: 'MilestoneName',
            resizable: true,
            width: 280,
            label: 'Milestone Name',
            ignoreCase: true,
            sortable: false,

            //formatter: function (cellvalue, options, rowobject) {
            //    if (rowobject.MilestoneStatus == 'Completed') {
            //        return '<span class="cellWithoutBackground" style="background-color:#9ee99e;text - align:left">' + rowobject.MilestoneName + '</span>';
            //    } else {
            //        return rowobject.MilestoneName
            //    }
            //}

        },
        {
            name: 'MilestoneStatus',
            resizable: true,
            width: 900,
            hidden: true,
            label: 'Milestone Name',
            ignoreCase: true,
            sortable: false
        },
        {
            name: 'rowidNo',
            resizable: true,
            width: 150,
            hidden: true,
            label: 'Milestone Name',
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {
                return rowobject.rowidNo = options.rowId;
            }

        },
        {
            name: 'SetRelation',
            label: 'Set Relation',
            width: 100,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {

                if (rowobject.SequenceNo == 1) {

                    $('#1SetRelation').hide();
                    return '';
                } else {
                    if (cellvalue == undefined) {
                        return '<input type="text"   data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'SetRelation" class="form-control allownumericwithdecimal"  onchange="ChangeSetRelation(' + options.rowId + ',' + rowobject.SequenceNo + ')" />';

                    } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                        return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'SetRelation" value="' + rowobject.SetRelation + '" class="form-control allownumericwithdecimal  input-disabled"  onchange="ChangeSetRelation(' + options.rowId + ',' + rowobject.SequenceNo + ')" readonly />';

                    } else {
                        return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'SetRelation" value="' + rowobject.SetRelation + '" class="form-control allownumericwithdecimal"  onchange="ChangeSetRelation(' + options.rowId + ',' + rowobject.SequenceNo + ')"  />';
                    }
                }

            }
        },
        {
            name: 'RelationType',
            label: 'RelationType',
            width: 100,
            resizable: true,
            ignoreCase: true,
            hidden: true,
            sortable: false
        },
        {
            name: 'Duration',
            label: 'Duration',
            width: 90,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {

                if (rowobject.SubmilestoneExit == 'True') {
                    if (rowobject.Duration != '') {
                        return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'Duration" class="form-control duration allownumericwithdecimal  input-disabled" value="' + rowobject.Duration + '" placeholder="Duration" onchange="ChangeDuration(' + options.rowId + ',' + rowobject.SequenceNo + ')" readonly />';
                    } else {
                        return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'Duration" class="form-control duration allownumericwithdecimal" placeholder="Duration" onchange="ChangeDuration(' + options.rowId + ',' + rowobject.SequenceNo + ')" readonly />';
                    }

                } else if (cellvalue == undefined) {
                    return '<input type="text" data-id="' + options.rowId + '"    id="' + rowobject.SequenceNo + 'Duration" class="form-control duration allownumericwithdecimal" placeholder="Duration" onchange="ChangeDuration(' + options.rowId + ',' + rowobject.SequenceNo + ')" />';

                }
                else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                    return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'Duration" value="' + rowobject.Duration + '" class="form-control duration allownumericwithdecimal  input-disabled" placeholder="Duration" onchange="ChangeDuration(' + options.rowId + ',' + rowobject.SequenceNo + ')" readonly />';
                } else {
                    return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'Duration" value="' + rowobject.Duration + '" class="form-control duration allownumericwithdecimal" placeholder="Duration" onchange="ChangeDuration(' + options.rowId + ',' + rowobject.SequenceNo + ')"  />';
                }


            }

        },
        {
            name: 'StartDate',
            label: 'Start Date',
            width: 105,
            resizable: true,
            //sorttype:'Date',
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                if (cellvalue == undefined) {

                    return '<input type="text" class="form-control datepickerS" data-id="' + options.rowId + '"id="' +
                        rowobject.SequenceNo + 'start_date"  placeholder="dd/mm/yyyy"  />';
                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval' || rowobject.SubMilestoneComplete =='') {
                    return '<input type="text" class="form-control  input-disabled" data-id="' + options.rowId + '"value="' + rowobject.StartDate + '" id="' +
                        rowobject.SequenceNo + 'start_date"  placeholder="dd/mm/yyyy" readonly/>';
                } else {
                    return '<input type="text" class="form-control datepickerS" data-id="' + options.rowId + '"value="' + rowobject.StartDate + '" id="' +
                        rowobject.SequenceNo + 'start_date"  placeholder="dd/mm/yyyy"/>';
                }


            }
        },
        {
            name: 'EndDate',
            resizable: true,
            label: 'End Date',
            sorttype: 'Date',
            width: 105,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.SubmilestoneExit == 'True') {
                    if (rowobject.EndDate != null) {
                        return '<input type="text" class="form-control  input-disabled" data-id="' + options.rowId + '" id="' +
                            rowobject.SequenceNo + 'end_date" value="' + rowobject.EndDate + '"  placeholder="dd/mm/yyyy" readonly/>';
                    } else {
                        return '<input type="text" class="form-control input-disabled " data-id="' + options.rowId + '" id="' +
                            rowobject.SequenceNo + 'end_date"  placeholder="dd/mm/yyyy" readonly/>';
                    }

                } else if (cellvalue == undefined) {
                    return '<input type="text" class="form-control datepickerE" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo +
                        'end_date" placeholder="dd/mm/yyyy" />';
                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval' || rowobject.SubmilestoneExit == 'True') {
                    return '<input type="text" class="form-control  input-disabled" data-id="' + options.rowId + '" value="' + rowobject.EndDate + '" id="' +
                        rowobject.SequenceNo + 'end_date"  placeholder="dd/mm/yyyy" readonly/>';
                }
                else {
                    return '<input type="text" class="form-control datepickerE" data-id="' + options.rowId + '" value="' + rowobject.EndDate + '" id="' +
                        rowobject.SequenceNo + 'end_date"  placeholder="dd/mm/yyyy"/>';

                }

            }
        },
        {
            name: 'ExtraDays',
            resizable: true,
            label: 'Extra Days',
            sorttype: 'Date',
            width: 55,
            hidden: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                if (cellvalue == undefined || rowobject.ExtraDays == '0') {
                    return '<input type="text" class="form-control" data-id="' + options.rowId + '" id="' + rowobject.SequenceNo +
                        'ExtraDays"  onchange="ChangeExtraDays(' + options.rowId + ',' + rowobject.SequenceNo + ')"/>';
                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                    return '<input type="text" class="form-control" data-id="' + options.rowId + '" value="' + rowobject.ExtraDays + '" id="' +
                        rowobject.SequenceNo + 'ExtraDays"  onchange="ChangeExtraDays(' + options.rowId + ',' + rowobject.SequenceNo + ')" readonly/>';
                }
                else {
                    return '<input type="text" class="form-control" data-id="' + options.rowId + '" value="' + rowobject.ExtraDays + '" id="' +
                        rowobject.SequenceNo + 'ExtraDays"  onchange="ChangeExtraDays(' + options.rowId + ',' + rowobject.SequenceNo + ')"/>';
                }

            }
        },
        {
            name: 'UserId',
            resizable: true,
            label: 'User(s)',
            ignoreCase: true,
            hidden: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {

                if (cellvalue == undefined) {
                    return '<input type="text"   id="' + rowobject.SequenceNo + 'mapperUserid" class="form-control tags" placeholder="user" />';

                }
                return '<input type="text" id="' + rowobject.SequenceNo + 'mapperUserid" value="' + rowobject.UserName + '" class="form-control tags " placeholder="user" />';

            }
        },
        {
            name: 'UserName',
            resizable: true,
            label: 'User(s)',
            ignoreCase: true,
            width: 250,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {

                if (cellvalue == undefined) {
                    return '<input type="text"  id="' + rowobject.SequenceNo + 'mapperUser" class="form-control tags "  placeholder="user"  onclick="EditUser(' + options.rowId + ')"/>';

                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                    return '<input type="text" id="' + rowobject.SequenceNo + 'mapperUser" value="' + rowobject.UserName + '" title="' + rowobject.UserName + '" class="form-control tags  input-disabled" placeholder="user"  onclick="EditUser(' + options.rowId + ')" multiple readonly/>';
                } else {
                    return '<input type="text" id="' + rowobject.SequenceNo + 'mapperUser" value="' + rowobject.UserName + '" title="' + rowobject.UserName + '" class="form-control tags "  placeholder="user" onclick="EditUser(' + options.rowId + ')" />';
                }


            }

        },
        {
            name: 'Remarks',
            resizable: true,
            label: 'Remarks',
            width: 200,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                if (cellvalue == undefined) {

                    return '<textarea rows="1" id="' + rowobject.SequenceNo + 'Remarks" value="' + rowobject.Remarks + '" onchange="Remarksenter(' + options.rowId + ')"  class="form-control remarks">' + rowobject.Remarks + '</textarea>';
                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                    return '<textarea rows="1" id="' + rowobject.SequenceNo + 'Remarks" value="' + rowobject.Remarks + '"  class="form-control remarks  input-disabled" readonly>' + rowobject.Remarks + '</textarea>'
                }
                else {
                    return '<textarea rows="1" id="' + rowobject.SequenceNo + 'Remarks" value="' + rowobject.Remarks + '" onchange="Remarksenter(' + options.rowId + ')" class="form-control remarks">' + rowobject.Remarks + '</textarea>'

                }


            }
        },
        {
            name: 'IsApproved',
            resizable: true,
            label: 'IsApproved',
            ignoreCase: true,
            hidden: true,
            sortable: false,

        },
        {
            name: 'FileName',
            label: 'File Upload',
            width: 150,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                    return '<input type="file"   data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'FileUpload" name="pmufiles" class="form-control"  disabled />';
                    // return '';
                } else {
                    return '<input type="file"   data-id="' + options.rowId + '" id="' + rowobject.SequenceNo + 'FileUpload" name="' + options.rowId + 'file"  class="form-control" onchange="FileUpload(' + options.rowId + ',event)"  id="' + options.rowId + 'viewFile" multiple/>';

                }



            }
        },
        {
            name: 'Action',
            label: 'Action',
            width: 80,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.FileName == '' || rowobject.FileName == undefined && rowobject.MilestoneStatus != 'Completed') {
                    return '<div class="grid-icons-group -justify-center" id="' + rowobject.SequenceNo + 'DisplayIcons"><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="ViewUploadedImages(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-success btn_button" title="View" id="' + options.rowId + 'viewuploadedfile" hidden><i class="fas fa-eye"></i></a><a href="javascript: void(0);" class="grid-icon-only" onclick="AddSubMilestone(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-warning btn_button" title="Add Sub Milestone(s)" id="' + options.rowId + 'AddSubMilestoneicon"><i class="fas fa-plus"></i></a></div>';
                }
                else if (rowobject.MilestoneStatus == 'Completed' && rowobject.FileName != '') {
                    return '<div class="grid-icons-group -justify-center" id="' + rowobject.SequenceNo + 'DisplayIcons" ><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="ViewUploadedImages(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-success btn_button" title="View" id="' + options.rowId + 'viewuploadedfile"><i class="fas fa-eye"></i></a><a href="javascript: void(0);" class="grid-icon-only" onclick="AddSubMilestone(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-warning btn_button" title="Add Sub Milestone(s)" id="' + options.rowId + 'AddSubMilestoneicon" hidden><i class="fas fa-plus"></i></a></div>';
                } else if (rowobject.MilestoneStatus == 'Completed' && rowobject.FileName == '') {
                    return '<div class="grid-icons-group -justify-center" id="' + rowobject.SequenceNo + 'DisplayIcons" ><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="ViewUploadedImages(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-success btn_button" title="View" id="' + options.rowId + 'viewuploadedfile" hidden><i class="fas fa-eye"></i></a><a href="javascript: void(0);" class="grid-icon-only" onclick="AddSubMilestone(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-warning btn_button" title="Add" id="' + options.rowId + 'AddSubMilestoneicon" hidden><i class="fas fa-plus"></i></a></div>';
                } else if (rowobject.MilestoneStatus == null && rowobject.FileName != '') {
                    return '<div class="grid-icons-group -justify-center" id="' + rowobject.SequenceNo + 'DisplayIcons"><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="ViewUploadedImages(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-success btn_button" title="View" id="' + options.rowId + 'viewuploadedfile" hidden><i class="fas fa-eye"></i></a><a href="javascript: void(0);" class="grid-icon-only" onclick="AddSubMilestone(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-warning btn_button" title="Add Sub Milestone(s)" id="' + options.rowId + 'AddSubMilestoneicon"><i class="fas fa-plus"></i></a></div>';
                }
                else {
                    return '<div class="grid-icons-group -justify-center" id="' + rowobject.SequenceNo + 'DisplayIcons" ><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="ViewUploadedImages(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-success btn_button" title="View" id="' + options.rowId + 'viewuploadedfile"><i class="fas fa-eye"></i></a><a href="javascript: void(0);" class="grid-icon-only" onclick="AddSubMilestone(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-warning btn_button" title="Add Sub Milestone(s)" id="' + options.rowId + 'AddSubMilestoneicon"><i class="fas fa-plus"></i></a></div>';

                }
            }
        },
        {
            name: 'SubmilestoneExit',
            resizable: true,
            label: 'SubmilestoneExit',
            ignoreCase: true,
            hidden: true,
            sortable: false,
            classes: 'submilestoneexist'
        }

    ]

    //Sub Grid Colmodels
    colmodels = [
        {
            name: "multiselect",
            label: "Select",
            width: 100,
            formatter: function (cellValue, options, rowObject) {

                if (rowObject.Action == 'true' && rowObject.PMUMappingStatus != 'APPROVED') {
                    return '<div class="grid-icons-group -justify-center" id="' + rowObject.SequenceNo + 'DisplayIcons" ><input type="checkbox" class="my-checkbox"  id="checkbox_' + rowObject.SubMilestoneId + '" onchange=SubGridselection(' + options.rowId + ',' + rowObject.SubMilestoneId + ',' + options.gid + ') checked><a href="javascript: void(0);" class="grid-icon-only Rejecticon" onclick="DeleteSubMiestone(' + rowObject.SubMilestoneId + ',' + options.gid + ')"  title="Delete" id="' + rowObject.SubMilestoneId + 'DeleteSubMiestone"><i class="fas fa-trash"></i></a></div>';

                } else if (rowObject.MilestoneStatus == 'Completed' || rowObject.MilestoneStatus == 'Done' || rowObject.IsApproved == 'Pending For Approval') {
                    return '<div class="grid-icons-group -justify-center" id="' + rowObject.SequenceNo + 'DisplayIcons" ><input type="checkbox" class="my-checkbox"  id="checkbox_' + rowObject.SubMilestoneId + '" onchange=SubGridselection(' + options.rowId + ',' + rowObject.SubMilestoneId + ',' + options.gid + ') checked disabled><a href="javascript: void(0);" class="grid-icon-only Rejecticon" onclick="DeleteSubMiestone(' + rowObject.SubMilestoneId + ',' + options.gid + ')"  title="Delete" id="' + rowObject.SubMilestoneId + 'DeleteSubMiestone" hidden><i class="fas fa-trash"></i></a></div>';
                } else if (rowObject.Action == 'true' && rowObject.StartDate != '' && rowObject.PMUMappingStatus == 'APPROVED') {
                    return '<div class="grid-icons-group -justify-center" id="' + rowObject.SequenceNo + 'DisplayIcons" ><input type="checkbox" class="my-checkbox"  id="checkbox_' + rowObject.SubMilestoneId + '" onchange=SubGridselection(' + options.rowId + ',' + rowObject.SubMilestoneId + ',' + options.gid + ') checked></div>';
                } else {
                    return '<div class="grid-icons-group -justify-center" id="' + rowObject.SequenceNo + 'DisplayIcons" ><input type="checkbox" class="my-checkbox"  id="checkbox_' + rowObject.SubMilestoneId + '" onchange=SubGridselection(' + options.rowId + ',' + rowObject.SubMilestoneId + ',' + options.gid + ')><a href="javascript: void(0);" class="grid-icon-only Rejecticon" onclick="DeleteSubMiestone(' + rowObject.SubMilestoneId + ',' + options.gid + ')"  title="Delete" id="' + rowObject.SubMilestoneId + 'DeleteSubMiestone"><i class="fas fa-trash"></i></a></div>';

                }
            }
        },
        {
            name: 'SequenceNo',
            label: 'Milestone No',
            width: 20,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            hidden: true
        },


        {
            name: 'RoleId',
            resizable: true,
            label: 'RoleId',
            hidden: true,
            ignoreCase: true
        },
        {
            name: 'SubMilestoneId',
            resizable: true,
            label: 'Sub Milestone Id',
            width: 120,
            ignoreCase: true,

            // hidden: true
        },
        {
            name: 'SubMilestoneName',
            resizable: true,
            label: 'Sub Milestone Name',
            width: 150,
            ignoreCase: true,
        },

        {
            name: 'MilestoneStatus',
            resizable: true,
            width: 200,
            hidden: true,
            label: 'Milestone Name',
            ignoreCase: true,
            sortable: false
        },
        {
            name: 'SetRelation',
            resizable: true,
            label: 'Set Relation',
            width: 80,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {

                if (cellvalue == undefined) {
                    return '<input type="text"   data-id="' + options.rowId + '" id="' + rowobject.SubMilestoneId + 'SetRelation" class="form-control allownumericwithdecimal"  onchange="ChangeSetRelationSubGrid(' + options.rowId + ',' + options.gid + ')" />';

                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                    return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SubMilestoneId + 'SetRelation" value="' + rowobject.SetRelation + '" class="form-control allownumericwithdecimal input-disabled"  onchange="ChangeSetRelationSubGrid(' + options.rowId + ',' + options.gid + ')" readonly />';

                } else {
                    return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SubMilestoneId + 'SetRelation" value="' + rowobject.SetRelation + '" class="form-control allownumericwithdecimal"  onchange="ChangeSetRelationSubGrid(' + options.rowId + ',' + options.gid + ')"  />';
                }

            }

        },
        {
            name: 'RelationType',
            resizable: true,
            label: 'Relation Type',
            ignoreCase: true,
            width: 90,
            hidden: true,
            formatter: function (cellvalue, options, rowobject) {


                if (rowobject.SetRelation == '0' || rowobject.SetRelation == '') {
                    $('#' + rowobject.SubMilestoneId + 'RelationType').hide();

                    return '';

                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                    return '<select  id="' + rowobject.SubMilestoneId + 'RelationType" value="' + rowobject.RelationType + '" onchange="ChangeRelationType(' + options.rowId + ',' + options.gid + ')" class="input-disabled form-control" disabled><option value = "0">-- Select --</option><option value=' + rowobject.RelationType + ' selected>' + rowobject.RelationType + '</option></select>';

                } else {
                    return '<select class="form-control" id="' + rowobject.SubMilestoneId + 'RelationType" value="' + rowobject.RelationType + '" onchange="ChangeRelationType(' + options.rowId + ',' + options.gid + ')" ><option value = "0">-- Select --</option><option value="FS ( Sequence)" selected>FS ( Sequence)</option><option value="SS ( Parallel )">SS ( Parallel )</option></select>';
                }


            }
        },
        {
            name: 'Duration',
            resizable: true,
            label: 'Duration',
            width: 50,
            ignoreCase: true,
            formatter: function (cellvalue, options, rowobject) {

                if (cellvalue == undefined) {
                    return '<input type="text" data-id="' + options.rowId + '"    id="' + rowobject.SubMilestoneId + 'SubGridDuration" class="form-control duration allownumericwithdecimal" placeholder="Duration" onchange="SubGridChangeDuration(' + options.rowId + ',' + options.gid + ')" />';

                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                    return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SubMilestoneId + 'SubGridDuration" value="' + rowobject.Duration + '" class="form-control duration allownumericwithdecimal input-disabled" placeholder="Duration" onchange="SubGridChangeDuration(' + options.rowId + ',' + options.gid + ')" readonly />';
                } else {
                    return '<input type="text" data-id="' + options.rowId + '" id="' + rowobject.SubMilestoneId + 'SubGridDuration" value="' + rowobject.Duration + '" class="form-control duration allownumericwithdecimal" placeholder="Duration" onchange="SubGridChangeDuration(' + options.rowId + ',' + options.gid + ')"  />';
                }


            }

        },
        {
            name: 'Status',
            resizable: true,
            width: 50,
            label: 'Status',
            ignoreCase: true,
            hidden: true


        },
        {
            name: 'StartDate',
            label: 'Start Date',
            resizable: true,
            //sorttype:'Date',
            width: 60,
            ignoreCase: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {

                if (cellvalue == undefined) {

                    return '<input type="text" class="form-control datepickerS" data-id="' + options.rowId + '"id="' +
                        rowobject.SubMilestoneId + 'start_date"  placeholder="dd/mm/yyyy"/>';
                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval' || rowobject.SubmilestoneExit ==
                    "True") {
                    return '<input type="text" class="form-control input-disabled" data-id="' + options.rowId + '"value="' + rowobject.StartDate + '" id="' +
                        rowobject.SubMilestoneId + 'start_date"  placeholder="dd/mm/yyyy" readonly/>';
                } else {
                    return '<input type="text" class="form-control datepickerS" data-id="' + options.rowId + '"value="' + rowobject.StartDate + '" id="' +
                        rowobject.SubMilestoneId + 'start_date"  placeholder="dd/mm/yyyy" />';
                }


            },


        },
        {
            name: 'EndDate',
            resizable: true,
            label: 'End Date',
            sorttype: 'Date',
            ignoreCase: true,
            width: 60,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {
                if (cellvalue == undefined) {
                    return '<input type="text" class="form-control datepickerE" data-id="' + options.rowId + '" id="' + rowobject.SubMilestoneId +
                        'end_date" placeholder="dd/mm/yyyy"/>';
                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval' || rowobject.SubmilestoneExit ==
                    "True") {
                    return '<input type="text" class="form-control input-disabled" data-id="' + options.rowId + '" value="' + rowobject.EndDate + '" id="' +
                        rowobject.SubMilestoneId + 'end_date"  placeholder="dd/mm/yyyy" readonly/>';
                }
                else {
                    return '<input type="text" class="form-control datepickerE" data-id="' + options.rowId + '" value="' + rowobject.EndDate + '" id="' +
                        rowobject.SubMilestoneId + 'end_date"  placeholder="dd/mm/yyyy" />';

                }

            }
        },

        {
            name: 'UserId',
            resizable: true,
            label: 'User(s)',
            ignoreCase: true,
            hidden: true,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {

                if (cellvalue == undefined) {
                    return '<input type="text"   id="' + rowobject.SubMilestoneId + 'mapperUserid" class="form-control tagsid" placeholder="user" />';

                }
                return '<input type="text" id="' + rowobject.SubMilestoneId + 'mapperUserid" value="' + rowobject.UserId + '" class="form-control tags" placeholder="user" />';

            }
        },
        {
            name: 'UserName',
            resizable: true,
            label: 'User(s)',
            ignoreCase: true,
            width: 150,
            sortable: false,
            formatter: function (cellvalue, options, rowobject) {

                if (cellvalue == undefined) {
                    return '<input type="text"  id="' + rowobject.SubMilestoneId + 'mapperUser" class="form-control tags SubUser"  placeholder="user" onclick="SubEditUser(' + options.gid + ',' + options.rowId + ')" />';

                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                    return '<input type="text" id="' + rowobject.SubMilestoneId + 'mapperUser" value="' + rowobject.UserName + '" title="' + rowobject.UserName + '" class="form-control tags SubUser input-disabled" placeholder="user" onclick="SubEditUser(' + options.gid + ',' + options.rowId + ')"  multiple readonly/>';
                } else {
                    return '<input type="text" id="' + rowobject.SubMilestoneId + 'mapperUser" value="' + rowobject.UserName + '" title="' + rowobject.UserName + '" class="form-control tags SubUser" onclick="SubEditUser(' + options.gid + ',' + options.rowId + ')"  placeholder="user"  />';
                }


            }

        },
        {
            name: 'Remarks',
            resizable: true,
            label: 'Remarks',
            ignoreCase: true,
            sortable: false,
            width: 120,
            formatter: function (cellvalue, options, rowobject) {
                if (cellvalue == undefined) {

                    return '<textarea id="' + rowobject.SubMilestoneId + 'SubRemarks" value="' + rowobject.Remarks + '" onkeyup="SubRemarksenter(' + options.gid + ',' + options.rowId + ')"  class="form-control remarks">' + rowobject.Remarks + '</textarea>';
                } else if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                    return '<textarea id="' + rowobject.SubMilestoneId + 'SubRemarks" value="' + rowobject.Remarks + '"  class="form-control remarks input-disabled" readonly>' + rowobject.Remarks + '</textarea>'
                }
                else {
                    return '<textarea id="' + rowobject.SubMilestoneId + 'SubRemarks" value="' + rowobject.Remarks + '" onkeyup="SubRemarksenter(' + options.gid + ',' + options.rowId + ')" class="form-control remarks">' + rowobject.Remarks + '</textarea>'

                }


            }
        },
        {
            name: 'IsApproved',
            resizable: true,
            label: 'IsApproved',
            ignoreCase: true,
            hidden: true,
            sortable: false,

        },
        {
            name: 'FileName',
            label: 'File Upload',
            width: 180,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            hidden: true,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.MilestoneStatus == 'Completed' || rowobject.IsApproved == 'Pending For Approval') {
                    return '<input type="file"   data-id="' + options.rowId + '" id="' + rowobject.SubMilestoneId + 'SubFileUpload" name="pmufiles" class="form-control"  disabled />';
                } else {
                    return '<input type="file"   data-id="' + options.rowId + '" id="' + rowobject.SubMilestoneId + 'SubFileUpload" name="' + options.rowId + 'file3"  class="form-control" onchange="FileUpload(' + options.rowId + ',event)"  id="' + options.rowId + 'viewFile" multiple/>';

                }

            }
        },
        {
            name: 'Action',
            label: 'Action',
            width: 50,
            resizable: true,
            ignoreCase: true,
            sortable: false,
            hidden: true,
            formatter: function (cellvalue, options, rowobject) {
                if (rowobject.FileName == '') {
                    return '<div class="grid-icons-group -justify-center" id="' + rowobject.SequenceNo + 'DisplayIcons" hidden><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="ViewUploadedImages(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-success btn_button" title="Download" id="' + options.rowId + 'viewuploadedfile"><i class="fas fa-eye"></i></a></div>';

                }
                else if (rowobject.MilestoneStatus == 'Completed' && rowobject.FileName != '') {
                    return '<div class="grid-icons-group -justify-center" id="' + rowobject.SequenceNo + 'DisplayIcons" ><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="ViewUploadedImages(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-success btn_button" title="Download" id="' + options.rowId + 'viewuploadedfile"><i class="fas fa-eye"></i></a></div>';
                }
                else {
                    return '<div class="grid-icons-group -justify-center" id="' + rowobject.SequenceNo + 'DisplayIcons" ><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="ViewUploadedImages(' + rowobject.MilestoneId + ',' + options.rowId + ')" class="icon_color text-success btn_button" title="Download" id="' + options.rowId + 'viewuploadedfile"><i class="fas fa-eye"></i></a></div>';

                }



            }
        },


    ]
    
    if ($('#selectedProjectId').val() != '0') {

        var ProjectName = $('#selectedProjectName').val();
        var projectId = $('#selectedProjectId').val();
        SelectedProjectId = projectId;
        display = 'N';
        $("div.id_100 select").select2().val(projectId).change();

        if (projectId == 0) {
            $(".projectName_error").show();

            $(".projectName_error").html("Please Select Project Name");
        } else {
            $(".projectName_error").hide();

        }

        $.ajax({
            //contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: ROOT + "Master/MilestonesList",
            method: "Post",
            data: { projectId: projectId, projectName: ProjectName, clonedProjectId: projectId, clonedProjectName: ProjectName },
            success: function (data) {
                display = 's';
                $('#loader').show();
                $('#loader').css('visibility', 'visible');
                pmugridData = data;
                pmuFirstData = data;
                pmugridData[0].SetRelation = '0';

                $.jgrid.gridUnload('#jqgrid');

                CreateJqGrid(pmugridData);
                searchresult = data;
                LoadSubGridData = false;
                allData = $('#jqgrid').jqGrid('getGridParam', data);
                data.forEach(element => {

                    if (element.StartDate != '' && element.EndDate != '') {
                        DurationList.push({
                            milestoneName: element.MilestoneName,
                            Duration: element.Duration,
                            MilestoneStatus: element.MilestoneStatus,
                            SetRelation: element.SetRelation
                        });
                    }

                });
                data.forEach(element => {

                    pmudetails.push({
                        Duration: element.Duration,
                        MilestoneName: element.MilestoneName,
                        RelationType: element.RelationType,
                        SequenceNo: element.SequenceNo,
                        SetRelation: element.SetRelation
                    })
                })

                ProjStatus = searchresult[0].Status;
                PMUFlag = searchresult[0].Flag;
                var j = 1
                for (var i = 0; i <= pmugridData.length - 1; i++) {

                    if (pmugridData[i].Action == "true") {

                        $('#jqg_jqgrid_' + j).prop('checked', true);
                        MaterialArray.push(pmugridData[i]);
                        if (($('#jqg_jqgrid_' + j).prop('checked') == true)) {

                            $('body').addClass("menuitemshow");
                            $('#' + pmugridData[i].SequenceNo + 'mapperUserid').val(pmugridData[i].UserId);
                        }
                        if (pmugridData[i].MilestoneStatus == 'Completed' || pmugridData[i].IsApproved == 'Pending For Approval') {
                            $('#jqg_jqgrid_' + j).attr("disabled", true);

                        }

                    }
                    j++;

                }

                $('.datepickerS').datepicker({
                    dateFormat: 'dd/mm/yy',
                    autoclose: true,
                    onSelect: function (e) {
                        ChangeDate($(this).attr('data-id'), $(this).attr('id'));
                    }
                });
                $('.datepickerE').datepicker({
                    dateFormat: 'dd/mm/yy',
                    autoclose: true,
                    onSelect: function (e) {
                        EndChangeDate($(this).attr('data-id'), $(this).attr('id'));
                    }
                });
                LoadUser('mapperUser');

                if (pmugridData[0].Status == 'SUBMITTED') {
                    $(".approve_btn").css('display', 'inline-block');
                    $(".checkboxpmu").hide();
                    $('#BtnClone').css('display', 'none');
                    $('#TemplateListdiv').hide();

                }
                if (pmugridData[0].Status == 'APPROVED') {
                    $(".save_btn").css('display', 'none');
                    $(".approve_btn").css('display', 'none');
                    $('#BtnClone').css('display', 'none');
                    $('#TemplateListdiv').hide();
                    $(".checkboxpmu").show();

                }
                if (pmugridData[0].Status == '') {
                    $(".approve_btn").css('display', 'none');
                    $(".checkboxpmu").hide();
                }


                var IsApproved = pmugridData.findIndex(obj => obj.IsApproved == 'Pending For Approval');
                if (IsApproved >= 0) {
                    $('#pendingApprovalmodel').modal('show');
                    $('#Pendingapprovalmilestones').empty();
                    $.each(pmugridData, function (i) {
                        if (pmugridData[i].IsApproved == 'Pending For Approval')
                            $('#Pendingapprovalmilestones').append('<ul><b><li>' + pmugridData[i].MilestoneName + '</li></b></ul>')
                    })


                }
                for (var i = 0; i < TotalSubGridData.length; i++) {
                    var IsApproved = TotalSubGridData[i].findIndex(obj => obj.IsApproved == 'Pending For Approval');
                    if (IsApproved >= 0) {
                        $('#pendingApprovalmodel').modal('show');
                        $.each(TotalSubGridData[i], function (j) {
                            if (TotalSubGridData[i][j].IsApproved == 'Pending For Approval')
                                $('#Pendingapprovalmilestones').append('<ul><b><li>' + TotalSubGridData[i][j].SubMilestoneName + '</li></b></ul>')
                        });

                    }
                }


                $("#jqgrid tbody tr").each(function (index, e) {

                    if ($(e).find("td:nth-child(7)").text() == 'Completed') {
                        $(this).attr("class", "custom-class");

                    }
                });

                $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
                $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
                var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
                if ($TableHeight > 280) {
                    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
                }
                else {
                    $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
                }

                $('#loader').css('visibility', 'hidden');
            },
            error: function (err) {
            }
        });

    } else {
        $("div.id_100 select").select2().val(projectId).change();
        $(".submit_btn").css('display', 'none');
        selected = 's'

    }
    $(".save_btn").on("click", function () {
    
        var Version = $('#Version').val();

        if (looping) {

            DefaultArray = $('#jqgrid').jqGrid('getGridParam', 'data');

            var rows = $("#jqgrid").jqGrid('getGridParam', 'records');
            var myCellData = [];
            if (VersionReamrks == '') {
                
                return false;
            }
            $.each(pmugridData, function (i, obj) {
                if (obj.Action == 'true') {
                    if (obj.StartDate !== null && obj.StartDate !== '' && typeof (obj.StartDate) !== "undefined") {
                        obj.FormattedStartDate = moment(obj.StartDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                    }
                    if (obj.EndDate !== null && obj.EndDate !== '' && typeof (obj.EndDate) !== "undefined") {
                        obj.FormattedEndDate = moment(obj.EndDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                    }
                    myCellData.push(obj);
                }
            });
            if (myCellData.length == 0) {
                alert("Please select the check box ");
                return false;
            }
            else {
                $.each(myCellData, function (i, obj) {
                    obj.LineItemNo = i + 1;
                    obj.ProjectId = $("#ProjectId option:Selected").val();
                    obj.CreatedBy = $("#LoggedinUser").val();
                    obj.Action = "";
                    obj.Status = '0';
                    obj.MilestoneStatus = 'Open';
                    obj.projectFlag = 'p';

                });

                var date = 0;


                $.each(myCellData, function (i, obj) {

                    if (obj.UserName == 0 || obj.UserName == "") {
                        date = 1;
                    }
                });
                if (date === 1) {
                    alert("Please Enter User");
                    return false;
                }


                var TotalSubMilestoneList = [];
                
                for (var i = 0; i < subgrid_table_id.length; i++) {
                    var data = $('#' + subgrid_table_id[i]).jqGrid('getGridParam', 'data');
                    if (data != undefined) {
                        
                        var emptyStringObjects = $.grep(data, function (obj) {
                            return $.trim(obj.SetRelation) === '';
                        });
                        if (emptyStringObjects.length > 1) {

                            emptySetRelation = 1;
                            alert('Please enter the Set Relation in sub grid');
                            break;
                        } else {
                            if (data.length > 0) {

                                for (var j = 0; j < data.length; j++) {
                                    if (data[j].StartDate !== null && data[j].StartDate !== '' && typeof (data[j].StartDate) !== "undefined") {
                                        data[j].FormattedStartDate = moment(data[j].StartDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                                    }
                                    if (data[j].EndDate !== null && data[j].EndDate !== '' && typeof (data[j].EndDate) !== "undefined") {
                                        data[j].FormattedEndDate = moment(data[j].EndDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                                    }
                                    TotalSubMilestoneList.push(data[j]);
                                }

                            }
                        }
                    }

                }
                if (emptySetRelation == 1) {
                    return false;
                }

                Griddata = JSON.stringify(myCellData);
                FileName = JSON.stringify(FileName);
                TotalSubGridData = JSON.stringify(TotalSubMilestoneList);
                var flag = "SAVE";

                formData.append('flag', flag);
                formData.append('projectId', projectId);
                formData.append('DatesPapulationflage', DatesPapulationflage);
                formData.append('Griddata', Griddata);
                formData.append('Version', Version);
                formData.append('FileName', FileName);
                formData.append('TotalSubGridData', TotalSubGridData);
                formData.append('VersionReamrks', VersionReamrks);
                formData.append('chnagedSubgridDateId', chnagedSubgridDateId);

                $.ajax({
                    url: ROOT + 'Master/PMUMapping',
                    type: 'POST',

                    data: formData,
                    contentType: false,

                    processData: false,

                    success: function (result) {

                        location.reload();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log('err', XMLHttpRequest, textStatus, errorThrown);
                    }
                });
                //$.ajax({
                //    url: ROOT + 'Master/PMUMapping',
                //    type: "POST",
                //    async: false, 
                //    data: { Griddata: Griddata, flag: flag, Version: Version, DatesPapulationflage: DatesPapulationflage },
                //    success: function (result) {

                //        location.reload();
                //    }
                //});


            }
        } else {
            alert('looping')
        }
    });


    //click on Approve bitton

    $(".approve_btn").on("click", function () {

        if (looping) {
            $("#myModal").modal('show');

        } else {
            alert('There is a circle dependency observed for the below marked milestones');

        }
    });

    $("#OkApproval").on("click", function () {

        changedmilestoneIdList = [];
        projectId = $('#ProjectId option:selected').val();
        var rows = $("#jqgrid").jqGrid('getGridParam', 'records');
        var myCellData = [];
        var Version = $('#Version').val();
        $.each(pmugridData, function (i, obj) {
            if (obj.Action == 'true') {
                if (obj.StartDate !== null && obj.StartDate !== '' && typeof (obj.StartDate) !== "undefined") {
                    obj.FormattedStartDate = moment(obj.StartDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                }
                if (obj.EndDate !== null && obj.EndDate !== '' && typeof (obj.EndDate) !== "undefined") {
                    obj.FormattedEndDate = moment(obj.EndDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                }
                
                myCellData.push(obj);
            }
        });
        if (myCellData.length == 0) {
            alert("Please select the check box ");
            return false;
        }
        else {
            $.each(myCellData, function (i, obj) {

                obj.LineItemNo = i + 1;
                obj.ProjectId = projectId;
                obj.CreatedBy = $("#LoggedinUser").val();
                obj.Status = '1';
                obj.MilestoneStatus = 'Open';
                obj.projectFlag = 'p';

            });


            var date = 0;
            var emptydate = ''
            var emptysetrelation = '';
            var emptyDuration = '';
            $.each(myCellData, function (i, obj) {

                if (obj.UserName == 0 || obj.UserName == "") {
                    date = 1;
                }

                if (obj.StartDate == "" || obj.EndDate == "" || obj.StartDate == null || obj.EndDate == null) {
                    emptydate = 1;
                }
            });


            if (emptysetrelation === 1) {
                alert("Please Enter the Set Relation");
                return false;
            }
            if (emptyDuration === 1) {
                alert("Please Enter the Duration");
                return false;
            }
            if (emptydate === 1) {
                alert("Please select the Date");
                return false;
            }
            if (date === 1) {
                alert("Please Enter User");
                return false;
            }

            var TotalSubMilestone = [];

            for (var i = 0; i < subgrid_table_id.length; i++) {
                var data = $('#' + subgrid_table_id[i]).jqGrid('getGridParam', 'data');
                if (data != undefined) {
                    //var isDuplicate = $.grep(data, function (obj) {
                    //    return obj.SetRelation === '';
                    //}).length > 0;
                    var emptyStringObjects = $.grep(data, function (obj) {
                        return $.trim(obj.SetRelation) === '';
                    });
                    if (emptyStringObjects.length > 1) {

                        emptySetRelation = 1;
                        alert('Please enter the Set Relation in sub grid');
                        break;
                    } else {
                        if (data.length > 0) {

                            for (var j = 0; j < data.length; j++) {
                                if (data[j].StartDate !== null && data[j].StartDate !== '' && typeof (data[j].StartDate) !== "undefined") {
                                    data[j].FormattedStartDate = moment(data[j].StartDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                                }
                                if (data[j].EndDate !== null && data[j].EndDate !== '' && typeof (data[j].EndDate) !== "undefined") {
                                    data[j].FormattedEndDate = moment(data[j].EndDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                                }
                                TotalSubMilestone.push(data[j]);
                            }
                        }
                    }
                }

            }
            if (emptySetRelation == 1) {
                return false;
            }
            var emptySubStartDate = '';
            var emptySubEndDate = '';
            var emptySubDuration = '';
            var emptySubUserId = '';
            var emptySubSetRelation = '';

            for (var i = 0; i < TotalSubGridData.length; i++) {
                if (TotalSubGridData[i].length > 0) {
                    var Seq = TotalSubGridData[i][0].SequenceNo
                    var Index = pmugridData.findIndex(obj => obj.SequenceNo == Seq);
                    if (pmugridData[Index].Action == 'true') {
                        var TotalSubGridDatafilterdata = TotalSubGridData[i].filter(obj => obj.Action == 'true');
                        for (var j = 0; j < TotalSubGridDatafilterdata.length; j++) {
                            TotalSubGridDatafilterdata[j].Status = '1';
                            if (TotalSubGridDatafilterdata[j].UserName == "" || TotalSubGridDatafilterdata[j].UserId == "" || TotalSubGridDatafilterdata[j].UserId == undefined || TotalSubGridDatafilterdata[j].UserId == null) {
                                emptySubUserId = 1;
                            }

                            if (TotalSubGridDatafilterdata[j].StartDate == "" || TotalSubGridDatafilterdata[j].EndDate == "" || TotalSubGridDatafilterdata[j].StartDate == null || TotalSubGridDatafilterdata[j].EndDate == null) {
                                emptySubStartDate = 1;
                            }
                            if (TotalSubGridDatafilterdata[j].SetRelation == '') {
                                emptySubSetRelation = 1;


                            }
                            if (TotalSubGridDatafilterdata[j].Duration == '') {
                                emptySubDuration = 1;
                            }
                        }
                    }
                }



            }

            if (emptySubDuration === 1) {
                alert("Please enter the duration for Sub Milestone");
                return false;
            }
            if (emptySubStartDate === 1) {
                alert("Please select the date for Sub Milestone(s)");
                return false;
            }
            if (emptySubUserId === 1) {
                alert("Please select user(s) for Sub Milestone(s)");
                return false;
            }

            if (emptySubSetRelation === 1) {
                alert("Please Enter Set Relation");
                return false;
            }
            Griddata = JSON.stringify(myCellData);
            FileName = JSON.stringify(FileName);
            TotalSubGridData = JSON.stringify(TotalSubMilestone);
            if (projectId != '') {

                formData.append('flag', 'APPROVED');
                formData.append('projectId', projectId);
                formData.append('changedmilestoneId', changedmilestoneId);
                formData.append('Griddata', Griddata);
                formData.append('Version', Version);
                formData.append('FileName', FileName);
                formData.append('TotalSubGridData', TotalSubGridData);
                formData.append('VersionReamrks', VersionReamrks);
                formData.append('chnagedSubgridDateId', chnagedSubgridDateId);

                $.ajax({
                    url: ROOT + 'Master/PMUMapping',
                    type: 'POST',

                    data: formData,
                    contentType: false,

                    processData: false,

                    success: function (result) {

                        location.reload();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log('err', XMLHttpRequest, textStatus, errorThrown);
                    }
                });

                //$.ajax({
                //    url: ROOT + 'Master/PMUMapping',
                //    type: "POST",
                //    //  dataType: 'JSON',
                //    data: { Griddata: Griddata, flag: 'APPROVED', projectId: projectId, changedmilestoneId: changedmilestoneId, Version: Version },
                //    success: function (result) {

                //        location.reload();
                //    }
                //});


            }


        }
    });

    $('.data-datepicker').datepicker({
        format: 'dd-mm-yyyy',
        todayHighlight: true,
        autoclose: true,

    });

    $(".submit_btn").on("click", function () {

        if (looping) {

            DatesPapulationflage = 'Yes';


            DefaultArray = $('#jqgrid').jqGrid('getGridParam', 'data');
            projectId = $('#ProjectId').children(":selected").attr("value");
            var rows = $("#jqgrid").jqGrid('getGridParam', 'records');
            var Version = $('#Version').val();
            var myCellData = [];

            $.each(pmugridData, function (i, obj) {
                if (obj.Action == 'true') {
                    if (obj.StartDate !== null && obj.StartDate !== '' && typeof (obj.StartDate) !== "undefined") {
                        obj.FormattedStartDate = moment(obj.StartDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                    }
                    if (obj.EndDate !== null && obj.EndDate !== '' && typeof (obj.EndDate) !== "undefined") {
                        obj.FormattedEndDate = moment(obj.EndDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                    }
                    myCellData.push(obj);
                }
            });
            
            if (myCellData.length == 0) {
                alert("Please select the check box ");
                return false;
            }
            else {
                $.each(myCellData, function (i, obj) {

                    obj.LineItemNo = i + 1;

                    obj.ProjectId = projectId;
                    obj.CreatedBy = $("#LoggedinUser").val();
                    obj.Status = '1';
                    obj.MilestoneStatus = 'Open';
                    obj.projectFlag = 'p';
                });
                var date = 0;
                var emptydate = '';
                var emptysetrelation = '';
                var emptyDuration = '';
                $.each(myCellData, function (i, obj) {

                    if (obj.UserName == "" || obj.UserId == "" || obj.UserId == undefined) {
                        date = 1;
                        //$('#' + obj.SequenceNo + 'usererror').text('Please Enter User');
                        //return false;
                    }

                    if (obj.StartDate == "" || obj.EndDate == "" || obj.StartDate == null || obj.EndDate == null) {
                        emptydate = 1;
                    }
                    if (obj.SetRelation == '') {
                        emptysetrelation = 1;
                        //$('#' + obj.SequenceNo + 'Setrelationerror').text('Please Enter Set Relation');
                        //return false;

                    }
                    if (obj.Duration == '') {
                        emptyDuration = 1;
                        //$('#' + obj.SequenceNo + 'Durationerror').text('Please Enter Duration');
                        //return false;
                    }
                });

                if (emptyDuration === 1) {
                    alert("Please Enter the Duration");
                    return false;
                }
                if (emptydate === 1) {
                    alert("Please select the Date");
                    return false;
                }

                if (date === 1) {
                    alert("Please Enter User");   
                    return false;
                }

                if ($('#AccepptVersionCreation').prop('checked')) {

                    if ($('#Version').val() == '') {
                        $('#VersionError').text('Please enter the version');
                        return false;
                    }
                }

                var TotalSubMilestone = [];
                

                for (var i = 0; i < subgrid_table_id.length; i++) {
                    var data = $('#' + subgrid_table_id[i]).jqGrid('getGridParam', 'data');
                    if (data != undefined) {
                       // data = data.filter(obj => obj.Action =='true')
                        var emptyStringObjects = $.grep(data, function (obj) {
                            return $.trim(obj.SetRelation) === '' || $.trim(obj.SetRelation) === '0';
                        });
                        if (emptyStringObjects.length > 1) {

                            emptySetRelation = 1;
                            alert('Please enter the Set Relation in sub grid');
                            break;
                        } else {
                            if (data.length > 0) {

                                for (var j = 0; j < data.length; j++) {
                                    if (data[j].StartDate !== null && data[j].StartDate !== '' && typeof (data[j].StartDate) !== "undefined") {
                                        data[j].FormattedStartDate = moment(data[j].StartDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                                    }
                                    if (data[j].EndDate !== null && data[j].EndDate !== '' && typeof (data[j].EndDate) !== "undefined") {
                                        data[j].FormattedEndDate = moment(data[j].EndDate, "DD/MM/YYYY").format("YYYY-MM-DD");
                                    }
                                    TotalSubMilestone.push(data[j]);
                                }
                            }
                        }
                    }

                }
                if (emptySetRelation == 1) {
                    return false;
                }
                var emptySubStartDate = '';
                var emptySubEndDate = '';
                var emptySubDuration = '';
                var emptySubUserId = '';
                var emptySubSetRelation = '';

                for (var i = 0; i < TotalSubGridData.length; i++) {
                    if (TotalSubGridData[i].length > 0) {
                        var Seq = TotalSubGridData[i][0].SequenceNo
                        var Index = pmugridData.findIndex(obj => obj.SequenceNo == Seq);
                        if (pmugridData[Index].Action == 'true') {
                            var TotalSubGridDatafilter = TotalSubGridData[i].filter(obj => obj.Action == 'true');
                            for (var j = 0; j < TotalSubGridDatafilter.length; j++) {
                                TotalSubGridDatafilter[j].Status = '1';
                                if (TotalSubGridDatafilter[j].UserName == "" || TotalSubGridDatafilter[j].UserId == "" || TotalSubGridDatafilter[j].UserId == undefined || TotalSubGridDatafilter[j].UserId == null || TotalSubGridDatafilter[j].UserName == null) {
                                    emptySubUserId = 1;
                                }

                                if (TotalSubGridDatafilter[j].StartDate == "" || TotalSubGridDatafilter[j].EndDate == "" || TotalSubGridDatafilter[j].StartDate == null || TotalSubGridDatafilter[j].EndDate == null) {
                                    emptySubStartDate = 1;
                                }
                                if (TotalSubGridDatafilter[j].SetRelation == '') {
                                    emptySubSetRelation = 1;


                                }
                                if (TotalSubGridDatafilter[j].Duration == '') {
                                    emptySubDuration = 1;
                                }
                            }
                        }
                    }



                }

                if (emptySubDuration === 1) {
                    alert("Please Enter the duration for Sub Milestone");
                    return false;
                }
                if (emptySubStartDate === 1) {
                    alert("Please select the date for Sub Milestone(s)");
                    return false;
                }
                if (emptySubUserId === 1) {
                    alert("Please select the User(s) for Sub Milestone(s)");
                    return false;
                }
                if (emptySubSetRelation === 1) {
                    alert("Please enter the Set Relation");
                    return false;
                }

                Griddata = JSON.stringify(myCellData);
                FileName = JSON.stringify(FileName);
                TotalSubMilestone = JSON.stringify(TotalSubMilestone);
                if (ProjStatus == 'APPROVED') {

                    var flag = " ";

                }
                else {
                    var flag = "SUBMIT";
                }
                var AccepptVersionCreation = $('#AccepptVersionCreation').prop('checked');

                formData.append('flag', flag);
                formData.append('projectId', projectId);
                formData.append('changedmilestoneId', changedmilestoneId);
                formData.append('Griddata', Griddata);
                formData.append('AccepptVersionCreation', AccepptVersionCreation);
                formData.append('DatesPapulationflage', DatesPapulationflage);
                formData.append('FileName', FileName);
                formData.append('Version', Version);
                formData.append('TotalSubGridData', TotalSubMilestone);
                formData.append('VersionReamrks', VersionReamrks);
                formData.append('chnagedSubgridDateId', chnagedSubgridDateId);

                if (projectId != '') {
                    //UploadedFile();


                    $.ajax({
                        url: ROOT + 'Master/PMUMapping',
                        type: 'POST',

                        data: formData,
                        contentType: false,

                        processData: false,

                        success: function (result) {

                            location.reload();
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log('err', XMLHttpRequest, textStatus, errorThrown);
                        }
                    });


                }
                else {

                    $(".projectName_error").html("Please Select Project Name");

                }

            }
        } else {
            alert('There is a circle dependency observed for the below marked milestones');
        }

    });


});



$('#Addmilestone').on('click', function () {
    $('#SequenceNo').val('');
    $('#MilestoneName').val('');
    $('#Setrelation').val('');
})


function CreateJqGrid(data) {
    //$('#loader').show();
    //$('#loader').css('visibility', 'visible');

    $("#jqgrid").jqGrid({
        url: '',
        datatype: 'local',
        data: data,
        mtype: 'GET',
        colModel: models,
        loadonce: true,
        viewrecords: true,
        ajaxSubgridOptions: { async: false },
        sortable: false,
        // sortorder: 'desc',
        rowNum: 1000,
        beforeProcessing: function () {
            console.log('loader display ');
            $('#loader').show();
            $('#loader').css('visibility', 'visible');
        },
        gridview: true,
        subGrid: true,
        subGridRowExpanded: function (subgrid_id, row_id) {
            var rowData = $('#jqgrid').getRowData(row_id);

            subgrid_table = subgrid_id + "_t" + rowData.SequenceNo + "";
            if (subgrid_table_id.indexOf(subgrid_table) == -1) {
                subgrid_table_id.push(subgrid_id + "_t" + rowData.SequenceNo + "");
            }

            $("#" + subgrid_id).html("<table id='" + subgrid_table + "'></table>");
            $.jgrid.gridUnload('#' + subgrid_table);
            if (TemplateSubGridDisplay) {
                CreateSubGriddata(subgrid_table, row_id);

            }

        },
        multiselect: true,
        beforeSelectRow: function (rowid, e) {
            gettingprevdata(rowid, status);
            var $myGrid = $(this),
                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                cm = $myGrid.jqGrid('getGridParam', 'colModel');
            // return (cm[i].name === 'cb');
            return (cm[i].name === '');
        },

        onCellSelect: function (rowid, ci, html, e) {

            fileuploadedrow = rowid;
            var status = $('#jqg_jqgrid_' + rowid).prop('checked');
            if ($(e.target).hasClass('cbox')) {
                rowselect(rowid, status);
            }

        },


        scroll: 1,
        pager: '#pager',
        userDataOnFooter: true,
        subGridBeforeExpand: function (subgrid_id, row_id) {

            var rowdata = $('#jqgrid').getRowData(row_id);
            rowSequnce = rowdata.SequenceNo;
        },
        gridComplete: function () {

            var objRows = $("#jqgrid tbody tr");
            var objHeader = $("#jqgrid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }

            // for loop MaterialArray
            // loop $("#jqgrid tbody tr") foreach loop
            // for each element's td:nth-child(4) text val == MaterialArray[i].SequenceNo
            // select first td and textbox inside the element and check the textbox

            //console.log('MaterialArray', MaterialArray);

            for (var i = 0; i < MaterialArray.length; i++) {
                $("#jqgrid tbody tr").each(function (index, e) {

                    if ($(e).find("td:nth-child(5)").text() == MaterialArray[i].SequenceNo) {
                        // console.log('MilestoneStatus', $(e).MilestoneStatus);
                        $(e).find("td:nth-child(1) input").attr("checked", true);


                        if ($(e).find("td:nth-child(7)").text() == 'Completed' || $(e).find("td:nth-child(18)").text() == 'Pending For Approval') {
                            $(e).find("td:nth-child(1) input").attr("disabled", true);
                            //  $(this).attr("class", "custom-class");
                        }

                        $('#' + MaterialArray[i].SequenceNo + 'start_date').val(MaterialArray[i].StartDate);
                        $('#' + MaterialArray[i].SequenceNo + 'end_date').val(MaterialArray[i].EndDate);
                        $('#' + MaterialArray[i].SequenceNo + 'mapperUserid').val(MaterialArray[i].UserId);
                        $('#' + MaterialArray[i].SequenceNo + 'mapperUser').val(MaterialArray[i].UserName);
                        $('#' + MaterialArray[i].SequenceNo + 'Duration').val(MaterialArray[i].Duration);
                        $('#' + MaterialArray[i].SequenceNo + 'SetRelation').val(MaterialArray[i].SetRelation);
                        $('#' + MaterialArray[i].SequenceNo + 'Remarks').val(MaterialArray[i].Remarks);
                        $('#' + MaterialArray[i].SequenceNo + 'ExtraDays').val(MaterialArray[i].ExtraDays);

                    }
                });

            }
            //Highlight the row if it is in circular dependent
            if (!looping) {
              
                for (var i = 0; i <= milestoneid_looping.length - 1; i++) {
                    $("#jqgrid tbody tr").each(function (index, e) {


                        if ($(e).find("td:nth-child(5)").text() == milestoneid_looping[i]) {
                            $(e).closest('tr').children('td,th').css('background-color', 'orange');
                        }
                    });
                }
            }
            
            $('.datepickerS').datepicker({
                dateFormat: 'dd/mm/yy',
                autoclose: true,
                onSelect: function (e) {
                    ChangeDate($(this).attr('data-id'), $(this).attr('id'));
                }
            });
            $('.datepickerE').datepicker({
                dateFormat: 'dd/mm/yy',
                autoclose: true,
                onSelect: function (e) {
                    EndChangeDate($(this).attr('data-id'), $(this).attr('id'));
                }
            });

            LoadUser('mapperUser');

           


        },



        loadComplete: function () {
            //close the expand and expand again display the data in Subgrid
            var rows = $("#jqgrid").getDataIDs();
            for (var i = 0; i < rows.length; i++) {
                var row_id = rows[i];
                var rowdata = $('#jqgrid').getRowData(row_id);
                if (rowdata.SubmilestoneExit == 'True') {

                    rowSequnce = rowdata.SequenceNo;
                    $("#jqgrid").expandSubGridRow(row_id);
                }

            }

            $('.submilestoneexist').each(function (i, obj) {
                if (obj.textContent != 'True') {
                    var td = $(obj).parent().find('td.sgcollapsed');
                    $(td).unbind("click").html("");
                } else {

                }
            })

            var $grid = $('#jqgrid');
            // $("#jqgrid").jqGrid("setGridParam", { beforeSelectRow: function (rowid, e) { return $(e.target).is("input:checkbox"); } });
            var totalAmount = $grid.jqGrid('getCol', 'Amount', false, 'sum');
            $grid.jqGrid('footerData', 'set', { 'OrderQtyInPallets': "Total Amount $:" });
            $grid.jqGrid('footerData', 'set', { 'Amount': parseFloat($grid.jqGrid('getCol', 'Amount', false, 'sum')).toFixed(2) });
            $(".tamounteuro").text(parseFloat(totalAmount).toFixed(2));
            parseInt(totalAmount) !== 0 ? $(".tamountdlr").text(parseFloat(1 / totalAmount).toFixed(2)) : 0;
            console.log('loader Hide ')
            $('#loader').css('visibility', 'hidden');
            $("#loader").hide();
        }

    });

    $("#jqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        stringResult: false,
        searchOnEnter: false,
        defaultSearch: "cn"
    });
    //allow only numbers
    $('.allownumericwithdecimal').keypress(function (e) {

        var charCode = (e.which) ? e.which : event.keyCode;
        if (String.fromCharCode(charCode).match(/[^0-9,\b]/g))

            return false;
    });
    $(".txtOnly").keypress(function (e) {
        var key = e.keyCode;
        if (key >= 48 && key <= 57) {
            e.preventDefault();
        }
    });

}

function CreateSubGriddata(subgrid_table, rowid) {

    if (ClonedProjectDetails) {
        var projectId = selectedprojectId_Clone;
        //ClonedProjectDetails = false;
    } else {
        var projectId = $('#ProjectId').children(":selected").attr("value");

    }
    var rowdata = $('#jqgrid').jqGrid('getRowData', rowid);
    var ParentMilestoneSubgriddata = [];
    if (ParentSubgrid_data.length > 0) {
        ParentMilestoneSubgriddata = ParentSubgrid_data.filter(obj => obj.SequenceNo == rowdata.SequenceNo);
        $.jgrid.gridUnload('#' + subgrid_table);
        CreateSubGrid(ParentMilestoneSubgriddata, subgrid_table);
    }


    $.ajax({
        url: ROOT + "Master/GetSubMilestones",
        type: "get",
        dataType: 'JSON',
        async: false,
        data: { SequnceNo: rowdata.SequenceNo, ProjectId: projectId },
        success: function (result) {
            var existingSubGrid_data = true;
            var mergedArray = $.merge(result, ParentMilestoneSubgriddata);

            if (TotalSubGridData.length > 0) {
                for (var i = 0; i < TotalSubGridData.length; i++) {
                    var data = TotalSubGridData[i];
                    if (data[0].SequenceNo == rowdata.SequenceNo) {
                        mergedArray = $.merge(data, ParentMilestoneSubgriddata);
                        
                        var uniqueArray = [];

                        // Iterate through the original array
                        $.each(mergedArray, function (index, obj) {
                            var isDuplicate = false;

                            // Check if the object already exists in the unique array
                            $.each(uniqueArray, function (_, uniqueObj) {
                                if (compareObjects(obj, uniqueObj)) {
                                    isDuplicate = true;
                                    return false; // Exit the loop early
                                }
                            });

                            // If not a duplicate, add it to the unique array
                            if (!isDuplicate) {
                                uniqueArray.push(obj);
                            }
                        });

                        arrayOfObjects = uniqueArray;

                        console.log(arrayOfObjects);
                        mergedArray = uniqueArray
                        //mergedArray = uniqueArrayOfObjects
                        //disable the unmapped milestone once primary milestone is completed
                        var data = mergedArray.filter(obj => obj.Action == 'true');
                        if (data.length > 0) {

                            var completedData = pmugridData.filter(obj => obj.MilestoneStatus == 'Completed' && obj.SequenceNo == data[0].SequenceNo);
                            if (completedData.length != 0) {
                                var data = mergedArray.filter(obj => obj.Action == null);
                                $.each(mergedArray, function (index, obj) {
                                    if (obj.Action == null) {
                                        obj.MilestoneStatus = 'Done';
                                    }
                                });
                            }
                        }

                        TotalSubGridData[i] = mergedArray;
                        existingSubGrid_data = false;
                        break;
                    }
                }
                if (deletedSubMilestone) {
                    existingSubGrid_data = false;
                }
                if (existingSubGrid_data) {
                    if (mergedArray.length > 0) {
                        if (ClonedProjectDetails) {
                            $.each(mergedArray, function (i) {
                                mergedArray[i].Status = '';
                                mergedArray[i].MilestoneStatus = '';
                                mergedArray[i].IsApproved = '';
                                mergedArray[i].FileName = '';
                                mergedArray[i].Remarks = '';
                                mergedArray[i].PMUMappingStatus = '';


                            })
                        }
                        TotalSubGridData.push(mergedArray);
                        existingSubGrid_data = false;
                    }
                }

            } else {
                //disable the unmapped milestone once primary milestone is completed

                var data = result.filter(obj => obj.Action == 'true');
                var completedData = pmugridData.filter(obj => obj.MilestoneStatus == 'Completed' && obj.SequenceNo == data[0].SequenceNo);
                if (completedData.length != 0) {
                    var data = result.filter(obj => obj.Action == null);
                    $.each(result, function (index, obj) {
                        if (obj.Action == null) {
                            obj.MilestoneStatus = 'Done';
                        }
                    });
                }
                if (ClonedProjectDetails) {
                    $.each(result, function (i) {
                        result[i].Status = '';
                        result[i].MilestoneStatus = '';
                        result[i].IsApproved = '';
                        result[i].FileName = '';
                        result[i].Remarks = '';
                        result[i].PMUMappingStatus = '';


                    })
                }
                TotalSubGridData.push(result);


            }
            $.jgrid.gridUnload('#' + subgrid_table);
            CreateSubGrid(mergedArray, subgrid_table);
            SubGridsortingrecord(subgrid_table);

        }

    });

    $('.allownumericwithdecimal').keypress(function (e) {

        var charCode = (e.which) ? e.which : event.keyCode;
        if (String.fromCharCode(charCode).match(/[^0-9,\b]/g))

            return false;
    });
}
function compareObjects(obj1, obj2) {
    return obj1.SubMilestoneId === obj2.SubMilestoneId;
}


function Remarksenter(rowid) {

    var rowData = $('#jqgrid').getRowData(rowid);
    objindex = pmugridData.findIndex(obj => obj.SequenceNo == rowData.SequenceNo);
    pmugridData[objindex].Remarks = $('#' + rowData.SequenceNo + 'Remarks').val();
    objindex = MaterialArray.findIndex(obj => obj.SequenceNo == rowData.SequenceNo);
    MaterialArray[objindex].Remarks = $('#' + rowData.SequenceNo + 'Remarks').val();
}
function SubRemarksenter(gid, rowid) {

    var gridid = gid.id;
    var data = $('#' + gridid).jqGrid('getGridParam', 'data');
    var rowdata = $('#' + gridid).jqGrid('getRowData', rowid);
    var index = data.findIndex(obj => obj.SubMilestoneId == rowdata.SubMilestoneId);
    data[index].Remarks = $('#' + rowdata.SubMilestoneId + 'SubRemarks').val();
    //$.jgrid.gridUnload('#'+gridid);
    //CreateSubGrid(data, gridid)

}
//$('.remarks').on('keyup', function () {
//    alert('Hi');
//})
function gettingprevdata(rowid, isSelected) {
    selectedrowid = rowid;
    var rowData = $('#jqgrid').getRowData(rowid);
    selectedrowsequnce = rowData.SequenceNo;
    selectedmilestoneId = rowData.MilestoneId;
    prevStartDate = $('#' + rowData.SequenceNo + 'start_date').val();
    prevEndDate = $('#' + rowData.SequenceNo + 'end_date').val();
    beforesetrelation = $('#' + rowData.SequenceNo + 'SetRelation').val();
    beforeDuration = $('#' + rowData.SequenceNo + 'Duration').val();
    var seqNo = rowData.SequenceNo;
}

function rowselect(rowid, isSelected) {

    var rowempty = true;
    selectedrowid = rowid;
    var rowData = $('#jqgrid').getRowData(rowid);
    selectedmilestoneId = rowData.MilestoneId;
    prevStartDate = $('#' + rowData.SequenceNo + 'start_date').val();
    prevEndDate = $('#' + rowData.SequenceNo + 'end_date').val();
    // console.log('rowData', rowData);
    beforesetrelation = $('#' + rowData.SequenceNo + 'SetRelation').val();
    beforeDuration = $('#' + rowData.SequenceNo + 'Duration').val();
    var seqNo = rowData.SequenceNo;
    allData = $('#jqgrid').jqGrid('getGridParam', 'data');

    if (isSelected == true) {


        setrelationchanged = false;
        if (selectedrowid == '1') {
            objIndex = pmugridData.findIndex(obj => obj.SequenceNo == rowData.SequenceNo);
            pmugridData[objIndex].Action = 'true';
        }
        if (beforesetrelation == undefined) {
            var index1 = -1;
            var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
            if (index1 == -1) {
                MaterialArray.push(pmugridData[objIndex]);
            }
        }
        //Added
        objIndex = pmugridData.findIndex(obj => obj.SequenceNo == rowData.SequenceNo);
        pmugridData[objIndex].Action = 'true';
        var index1 = -1;
        //adding new records in MaterialArray to display after filter in jqgrid
        var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
        if (index1 == -1) {
            MaterialArray.push(pmugridData[objIndex]);
        }

        var relation = $('#' + seqNo + 'SetRelation').val();
        if (relation != undefined) {
            relation = relation.split(',');

            var data = $('#jqgrid').jqGrid('getGridParam', 'data');

            for (var j = 0; j <= relation.length - 1; j++) {
                for (var i = 0; i <= data.length - 1; i++) {

                    if (data[i].SequenceNo == relation[j]) {
                        //var setrelationrowid = data[i].rowidNo;
                        objindex1 = pmugridData.findIndex(obj => obj.SequenceNo == relation[j]);
                        if (isSelected == true) {
                            if (pmugridData[objindex1].Action == null || pmugridData[objindex1].Action == '') {

                                alert('Dependent Milestones are not mapped ');
                                $('#jqg_jqgrid_' + rowid).prop('checked', false);

                                // $('#jqgrid').jqGrid('setCell', rowid, 'Action', '');
                                pmugridData[objIndex].Action = '';
                                var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                                if (index1 >= 0) {
                                    MaterialArray.splice(index1, 1);
                                }
                                var alertdisplay = true;
                                break;
                            } else {

                                //get_relations(rowid, []);
                                objIndex = pmugridData.findIndex(obj => obj.SequenceNo == rowData.SequenceNo && obj.MilestoneName == rowData.MilestoneName);
                                pmugridData[objIndex].Action = 'true';
                                var index1 = -1;
                                var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                                if (index1 == -1) {
                                    MaterialArray.push(pmugridData[objIndex])
                                }

                                beforesetrelation = Math.max.apply(Math, relation);
                                
                                objIndex = pmugridData.findIndex(obj => obj.SequenceNo == beforesetrelation);
                                
                                var selectedrowStartDate = $("#" + seqNo + "start_date").val();
                                var selectedrowEndDate = $("#" + seqNo + "end_date").val();
                                var ExtraDays = $("#" + beforesetrelation + "ExtraDays").val();

                                if (selectedrowStartDate == '' && selectedrowEndDate == '') {
                                    if (pmugridData[0].EndDate != '' && pmugridData[0].EndDate != null) {
                                        var HighestDate = getHighestdatefromMulSetrelation($('#' + seqNo + 'SetRelation').val());
                                        var relationenddate = HighestDate;
                                    }
                                    else { var relationenddate='' }
                                    if (relationenddate != undefined && relationenddate != '') {
                                        var startdatechange = new Date(relationenddate.split("/").reverse().join("-"));
                                        var Enddate = '';
                                        if (parseInt(ExtraDays) > 0) {
                                            Enddate = moment(startdatechange).add(parseInt(ExtraDays) + 1, 'days').format('DD/MM/YYYY');

                                        } else {
                                            Enddate = moment(startdatechange).add(1, 'days').format('DD/MM/YYYY');

                                        }
                                        $("#" + seqNo + "start_date").val(Enddate);
                                        var SubgridParent_StartDate = $("#" + seqNo + "start_date").val();
                                        //filling SubGrid here

                                        var TotalDuration = '';
                                        var FinalData = '';
                                        var SubGridDatedisplaycount = 0;
                                        var Enddateforcheckedbox = '';
                                        var enddateforcheckedcheckbox = new Date(Enddate.split("/").reverse().join("-"));
                                        TotalDuration = $('#' + seqNo + 'Duration').val();
                                        Enddateforcheckedbox = moment(enddateforcheckedcheckbox).add(TotalDuration - 1, 'days').format('DD/MM/YYYY');
                                        $("#" + seqNo + "end_date").val(Enddateforcheckedbox);

                                        var index1 = pmugridData.findIndex(obj => obj.SequenceNo == seqNo);
                                        pmugridData[index1].StartDate = Enddate;

                                        pmugridData[index1].EndDate = Enddateforcheckedbox;
                                        var index1 = MaterialArray.findIndex(obj => obj.SequenceNo == seqNo);
                                        MaterialArray[index1].StartDate = Enddate;

                                        MaterialArray[index1].EndDate = Enddateforcheckedbox;

                                    }
                                }
                                break;

                            }


                        }
                    }

                }
                if (alertdisplay) {
                    break;
                }

            }
        }


    }
    else {


        if (($('#jqg_jqgrid_' + rowid).prop('checked') == false)) {
            var flag = true;
            //objIndex = pmugridData.fin


            for (var i = 0; i <= pmugridData.length - 1; i++) {

                if (pmugridData[i].SetRelation != null) {
                    var SetRelation = pmugridData[i].SetRelation.split(',');


                    for (var k = 0; k <= SetRelation.length - 1; k++) {
                        if (SetRelation[k] == seqNo) {
                            // console.log('obj.rowidNo', pmugridData[i].rowidNo);
                            if (pmugridData[i].Action == 'true') {
                                alert('Please check whether the below milestone(s) are dependent on the current milestone');
                                // $('#jqgrid').jqGrid('setCell', allData[i].SequenceNo, 'Action', 1//);
                                $('#jqg_jqgrid_' + rowid).prop('checked', true);
                                rowempty = false;
                                alertdisplay = true;
                                var index1 = -1;
                                var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                                if (index1 == -1) {
                                    MaterialArray.push(allData[i - 1]);
                                }

                                break;
                            }
                        }

                    }
                }
                else {
                    //  rowempty = false;
                }
                if (alertdisplay) {

                    break;
                }
            }

            if (rowempty) {
                $("#" + seqNo + "start_date").val('');
                $("#" + seqNo + "end_date").val('');
                $("#" + seqNo + "mapperUser").val('');
                $('#' + seqNo + 'Remarks').val('');
                if (rowData.SubmilestoneExit == 'True') {

                    $.each(subgrid_table_id, function (i, obj) {
                        var gridrowid = subgrid_table_id[i].split('_');

                        if (gridrowid[1] == rowid) {
                            gridid = subgrid_table_id[i]
                        }
                    })

                    for (var i = 0; i < TotalSubGridData.length; i++) {
                        var data = TotalSubGridData[i];
                        var SubGRIDATA = data.findIndex(obj => obj.SequenceNo == seqNo);
                        if (SubGRIDATA != -1) {


                            $.each(data, function (j, obj) {

                                data[j].StartDate = '',
                                    data[j].MilestoneStatus = '',
                                    data[j].EndDate = '',
                                    data[j].UserId = '',
                                    data[j].UserName = '',
                                    data[j].Action = '',
                                    data[j].Remarks = ''
                            });
                            var AssignedData = data;

                            TotalSubGridData[i] = AssignedData;
                            $.jgrid.gridUnload('#' + gridid);
                            CreateSubGrid(TotalSubGridData[i], gridid);
                            break;
                        }

                    }
                    LoadSubGridData = true;
                    $("#" + gridid).jqGrid("clearGridData", true);
                    $("#" + gridid).jqGrid('setGridParam', { data: AssignedData });

                    $("#" + gridid).trigger('reloadGrid');


                }


                var index1 = -1;
                var index1 = MaterialArray.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                if (index1 >= 0) {
                    MaterialArray.splice(index1, 1);
                }



                $('#jqg_jqgrid_' + rowid).prop('checked', false);
                DurationList = DurationList.filter(function (obj) {
                    return obj.milestoneName !== rowData.MilestoneName;
                });


                $('#jqgrid').jqGrid('setCell', seqNo, 'Action', '');


                var index1 = -1;
                var index1 = pmugridData.findIndex(s => s.SequenceNo == rowData.SequenceNo && s.MilestoneName == rowData.MilestoneName);
                if (index1 >= 0) {
                    pmugridData[index1].StartDate = '';
                    pmugridData[index1].EndDate = '';
                    pmugridData[index1].UserId = '';
                    pmugridData[index1].UserName = '';
                    pmugridData[index1].Action = '';
                    pmugridData[index1].Remarks = '';
                }
                
            }


        }

    }



    //For remove the Highlighter
    //var parentSelectedData = pmugridData.filter(obj => obj.Action == "true")
    for (var i = 0; i < pmugridData.length; i++) {

        $("#jqgrid tbody tr").each(function (index, e) {

            if ($(e).find("td:nth-child(5)").text() == pmugridData[i].SequenceNo) {
                //$(this).removeAttr('custom-classUpdate');
                $(e).find("td:nth-child(12)").css("background-color", "white");
                $(e).find("td:nth-child(13)").css("background-color", "white");

            }
        });
    }
    var Updatedgridid = '';
    var data = [];
    for (var Sub = 0; Sub <= TotalSubGridData.length; Sub++) {
        //SubgridData.push(TotalSubGridData[Sub]);
        $.merge(data, $.extend(true, [], TotalSubGridData[Sub]));

    }
    //var data = DependentSub_Milestones.filter(obj => obj.SubMilestoneId >= unionSelectedSubgrid_id);
    for (var i = 0; i < data.length; i++) {

        for (var j = 0; j < subgrid_table_id.length; j++) {
            var ids = subgrid_table_id[j].split('_');
            var Seqcompare = ids[2].replace('t', '');
            if (Seqcompare.trim() == data[i].SequenceNo) {
                Updatedgridid = subgrid_table_id[j];
            }
        }
        console.log(Updatedgridid);
        $("#" + Updatedgridid + ' tbody tr').each(function (index, e) {
            var Seq = $(e).find("td:nth-child(4)").text();
            if (Seq == data[i].SubMilestoneId) {
                //$(this).attr("class", "custom-classUpdate");
                $(e).find("td:nth-child(11)").css("background-color", "white");

                $(e).find("td:nth-child(12)").css("background-color", "white");


            }
        });
    }
}

function SubEditUser(gid, rowid) {

    var rowData = $('#' + gid.id).getRowData(rowid);
    usernumber = rowData.SubMilestoneId;
    var pindex = pmugridData.findIndex(obj => obj.SequenceNo == rowData.SequenceNo)
    selectedmilestoneId = rowData.MilestoneId;
    ParentMilestoneid = pmugridData[pindex].MilestoneId;
    var username = $('#' + usernumber + 'mapperUser').val();
    var UserId = $('#' + usernumber + 'mapperUserid').val();

}
function EditUser(rowid) {

    // alert('hi');
    var rowData = $('#jqgrid').getRowData(rowid);
    usernumber = rowData.SequenceNo;
    selectedmilestoneId = rowData.MilestoneId;
    var username = $('#' + usernumber + 'mapperUser').val();
    var userid = $('#' + usernumber + 'mapperUserid').val();
    if (username == '') {
        objindex = MaterialArray.findIndex(obj => obj.SequenceNo == usernumber);
        MaterialArray[objindex].UserId = '';
        MaterialArray[objindex].UserName = '';
        objindex = pmugridData.findIndex(obj => obj.SequenceNo == usernumber);
        pmugridData[objindex].UserId = '';
        pmugridData[objindex].UserName = '';
    }


}

var availableTags = [];
var usersMap = {};
var availabledata = [];
function LoadUser(UserinputId) {

    $.ajax({
        url: ROOT + 'Master/UserList',
        type: "POST",
        dataType: 'JSON',
        data: { "Griddata": DefaultArray },
        success: function (result) {

            // console.log('result', result);
            availableTags = [];
            usersMap = {};

            result.forEach(element => {

                availableTags.push({
                    label: element.UserName,
                    value: element.UserId
                });

                usersMap[element.UserName] = element.UserId;

            });
            //console.log('result', result);
            //console.log('availableTags', availableTags);
            //console.log('usersMap', usersMap);

            $(".tags").autocomplete({

                //source: availableTags,
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

                        regex_validated_array = $.grep(availableTags, function (item, index) {
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

                    this.value = terms.join(',');

                    useridslist = userIds.join(',');
                    $('#' + usernumber + 'mapperUserid').val(userIds.join(','));


                },
                focus: function () {
                    return false;
                },

                select: function (event, ui) {
                    var Action = '';
                    var SubAction = '';
                    var UserIndex = pmugridData.findIndex(obj => obj.SequenceNo == usernumber);
                    if (UserIndex != -1) {
                        Action = pmugridData[UserIndex].Action
                    }
                    for (var Milestone = 0; Milestone <= TotalSubGridData.length - 1; Milestone++) {
                        var UserSubIndex = TotalSubGridData[Milestone].findIndex(obj => obj.SubMilestoneId == usernumber)
                        if (UserSubIndex != -1) {
                            SubAction = TotalSubGridData[Milestone][UserSubIndex].Action;
                            break;
                        }
                    }

                    if (Action == 'true' || SubAction == 'true') {



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

                        this.value = terms.join(',');
                        useridslist = userIds.join(',');
                        $('#' + usernumber + 'mapperUserid').val(userIds.join(','));
                        //$('#' + usernumber + 'usererror').text('');
                        objindex = pmugridData.findIndex(obj => obj.MilestoneId == ParentMilestoneid);

                        if (selectedmilestoneId != undefined) {


                            objindex = MaterialArray.findIndex(obj => obj.MilestoneId == selectedmilestoneId);
                            MaterialArray[objindex].UserId = userIds.join(',');
                            MaterialArray[objindex].UserName = this.value;
                            objindex = pmugridData.findIndex(obj => obj.MilestoneId == selectedmilestoneId);
                            pmugridData[objindex].UserId = userIds.join(',');
                            pmugridData[objindex].UserName = this.value;
                        } else {
                            for (var data = 0; data < TotalSubGridData.length; data++) {

                                var index = TotalSubGridData[data].findIndex(obj => obj.SubMilestoneId == usernumber);
                                if (index != -1) {
                                    TotalSubGridData[data][index].UserId = userIds.join(',');
                                    TotalSubGridData[data][index].UserName = this.value;
                                }

                            }
                        }
                        if (pmugridData[objindex].SubmilestoneExit == 'True') {

                            for (var j = 0; j < subgrid_table_id.length; j++) {
                                var mystring = subgrid_table_id[j].split('_');
                                var Seq = mystring[2].substring(1);
                                if (Seq == pmugridData[objindex].SequenceNo) {
                                    var SubGridiD = subgrid_table_id[j];
                                }
                            }

                            for (var i = 0; i < TotalSubGridData.length; i++) {

                                //var Index = pmugridData.findIndex(obj => obj.SequenceNo == Seq);
                                if (pmugridData[objindex].Action == 'true') {

                                    if (pmugridData[objindex].SequenceNo == TotalSubGridData[i][0].SequenceNo) {

                                        $.jgrid.gridUnload('#' + SubGridiD);
                                        CreateSubGrid(TotalSubGridData[i], SubGridiD);
                                        SubGridsortingrecord(SubGridiD);
                                    }
                                }
                            }


                        }

                        return false;


                    } else {

                        alert('Please select the milestone before selecting the user(s).');
                        //$('#' + usernumber + 'mapperUserid') .autocomplete('close').val('');
                        //  $('#' + usernumber + 'mapperUser').autocomplete('close').val('');
                        $('#' + usernumber + 'mapperUserid').val('');
                        $('#' + usernumber + 'mapperUser').val('');
                        ui.item.value = "";


                    }
                }

            });


        }
    });
    var parentSelectedData = pmugridData.filter(obj => obj.Action == "true")
    for (var i = 0; i < parentSelectedData.length; i++) {

        $("#jqgrid tbody tr").each(function (index, e) {

            if ($(e).find("td:nth-child(5)").text() == parentSelectedData[i].SequenceNo) {
                //$(this).removeAttr('custom-classUpdate');
                $(e).find("td:nth-child(12)").css("background-color", "white");
                $(e).find("td:nth-child(13)").css("background-color", "white");

            }
        });
    }
    var Updatedgridid = '';
    var data = [];
    for (var Sub = 0; Sub <= TotalSubGridData.length; Sub++) {
        //SubgridData.push(TotalSubGridData[Sub]);
        $.merge(data, $.extend(true, [], TotalSubGridData[Sub]));

    }
    //var data = DependentSub_Milestones.filter(obj => obj.SubMilestoneId >= unionSelectedSubgrid_id);
    for (var i = 0; i < data.length; i++) {
        if (subgrid_table_id.length > 0) {

            for (var j = 0; j < subgrid_table_id.length; j++) {
                var ids = subgrid_table_id[j].split('_');
                var Seqcompare = ids[2].replace('t', '');
                if (Seqcompare.trim() == data[i].SequenceNo) {
                    Updatedgridid = subgrid_table_id[j];
                }
            }

            console.log(Updatedgridid);
            $("#" + Updatedgridid + ' tbody tr').each(function (index, e) {
                var Seq = $(e).find("td:nth-child(4)").text();
                if (Seq == data[i].SubMilestoneId) {
                    $(e).find("td:nth-child(11)").css("background-color", "white");

                    $(e).find("td:nth-child(12)").css("background-color", "white");


                }
            });
        }
    }

}
function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}

$('.tags').keyup(function (e) {


    if (e.keyCode == 8) alert('backspace trapped');
})


$('#btnSubmit').on('click', function () {

    selectedprojectId_Clone = $('#FromProjectId').val();
    var selectedProjectName = $("#FromProjectId option:Selected").text();
    clonedprojectId = $('#ToProjectId').val();
    clonedProjectName = $("#ToProjectId option:Selected").text();
    if (selectedprojectId_Clone == '0') {
        $('.FromProjectId_error').text('Please select the From Project');
        // return false;
    } else {
        $('.FromProjectId_error').text('');

    }
    if (clonedprojectId == '0') {
        $('.ToProjectId_error').text('Please select the To Project');
        return false;
    } else {
        $('.ToProjectId_error').text('');

    }
    if (selectedprojectId_Clone != '0' && clonedprojectId != '0') {
        cloneproject = true;

        $("#ProjectId").val(clonedprojectId).trigger("change");

        cloneprojectDate(selectedprojectId_Clone, selectedProjectName, clonedprojectId, clonedProjectName);


    }
    function cloneprojectDate(projectId, ProjectName, clonedprojectId, clonedProjectName) {


        DurationList = []; searchresult = [];
        MaterialArray = [];
        subgrid_table_id = [];
        $('#selectedProjectName').val(clonedprojectId);
        $('#selectedProjectId').val(clonedProjectName);

        if (projectId == "0") {
            $(".projectName_error").show();
            $(".projectName_error").html("Please Select Project Name");
            $('#btnRefresh').css('display', 'none');
            $('#BtnClone').css('display', 'none');
            $('#TemplateListdiv').hide();
            $.ajax({
                url: ROOT + "Master/MilestonesList",
                type: 'GET',

                data: { projectId: projectId, projectName: ProjectName, clonedProjectId: clonedprojectId, clonedProjectName: clonedProjectName },
                dataType: 'JSON',
                success: function (result) {
                    $("#jqgrid").jqGrid("clearGridData", true);
                    $('#ApproveModal').css('display', 'none');
                }
            });

        }
        else {
            // console.log('project name changed');
            $(".projectName_error").html("");
            $("#SaveModel").show();
            $("#SaveModel1").show();
            $('#btnRefresh').show();
            $('#BtnClone').show();
            $('#TemplateListdiv').show();
            TotalSubGridData = [];
            // DefaultArray = $('#jqgrid').jqGrid('getGridParam', 'data');
            $.ajax({
                url: ROOT + "Master/MilestonesList",
                type: 'post',
                data: { projectId: projectId, projectName: ProjectName, clonedProjectId: clonedprojectId, clonedProjectName: clonedProjectName },
                dataType: 'JSON',
                success: function (result) {

                    $(".projectName_error").hide();

                    $('#addModal').modal('hide');
                    searchresult = result;
                    result.forEach(element => {

                        if (element.StartDate != '' && element.EndDate != '') {
                            DurationList.push({
                                milestoneName: element.MilestoneName,
                                Duration: element.Duration,
                                MilestoneStatus: element.MilestoneStatus,
                                SetRelation: element.SetRelation

                            });
                        }

                    });
                    ProjStatus = '';
                    PMUFlag = result[0].Flag;
                    //console.log('ProjStatus', ProjStatus);
                    //console.log('PMUFlag', PMUFlag);
                    //console.log('result', result);

                    ClonedProjectDetails = true;
                    TotalSubGridData = [];
                    pmugridData = result;
                    //console.log('pmugridData', pmugridData);
                    $.each(pmugridData, function (i) {
                        pmugridData[i].Status = '';
                        pmugridData[i].MilestoneStatus = '';
                        pmugridData[i].IsApproved = '';
                        pmugridData[i].FileName = '';
                        pmugridData[i].Remarks = '';

                    })
                    LoadSubGridData = true;
                    //projectIdchanged = false;
                    subgrid_table_id = [];
                    // displayDuration();
                    $("#jqgrid").jqGrid("clearGridData", true);
                    $("#jqgrid").jqGrid('setGridParam', { data: pmugridData });

                    $("#jqgrid").trigger('reloadGrid');

                    //CreateJqGrid(pmugridData);
                    $('#TemplateList').val('');
                    allData = $('#jqgrid').jqGrid('getGridParam', result);
                    LoadSubGridData = false;
                    $('#selectedProjectName').val(ProjectName);
                    $('#selectedProjectId').val(projectId);

                    var rows = $("#jqgrid").jqGrid('getGridParam', 'records');
                    var j = 1
                    for (var i = 0; i <= pmugridData.length - 1; i++) {

                        if (pmugridData[i].Action == "true") {

                            //$('#jqgrid').jqGrid('setSelection', rowids[i], result[i].Action);
                            $('#jqg_jqgrid_' + j).prop('checked', true);
                            if (($('#jqg_jqgrid_' + j).prop('checked') == true)) {

                                MaterialArray.push(pmugridData[i]);
                                $('body').addClass("menuitemshow");
                                $('#' + pmugridData[i].SequenceNo + 'mapperUserid').val(pmugridData[i].UserId);
                            }

                        }
                        j++;

                    }


                    $('.datepickerS').datepicker({
                        dateFormat: 'dd/mm/yy',
                        autoclose: true,
                        onSelect: function (e) {
                            ChangeDate($(this).attr('data-id'), $(this).attr('id'));
                        }
                    });
                    $('.datepickerE').datepicker({
                        dateFormat: 'dd/mm/yy',
                        autoclose: true,
                        onSelect: function (e) {
                            EndChangeDate($(this).attr('data-id'), $(this).attr('id'));
                        }
                    });

                    LoadUser('mapperUser');
                    $(".checkboxpmu").hide();

                    //ClonedProjectDetails = false;
                    $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
                    $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
                    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
                    if ($TableHeight > 280) {
                        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "17px");
                    }
                    else {
                        $(".-virtual-scroll").find(".ui-jqgrid-htable").css("padding-right", "0px");
                    }
                }
            });
        }

    }


    //cloneProject(selectedprojectId_Clone, selectedProjectName, clonedprojectId, clonedProjectName);
});
$("#ProjectId").on("change", function () {
    $('#loader').show();
    $('#loader').css('visibility', 'visible');
    ParentSubgrid_data = [];
    
     DisplaySubGridValue = '';
     DependentSub_Milestones = [];
     dependentMilestoneDetailsList = [];
     UpdatedStartDate_User = '';
     updatedStartDateDisplay = '';
     UpdatedSetrelation_display = '';
    SubMilestonestartid = '8001';
    var ProjectName = $("#ProjectId option:Selected").text();
    var projectId = $('#ProjectId').children(":selected").attr('value');
    SelectedProjectId = projectId;
    subgrid_table_id = [];
    if (cloneproject) {
        ProjectName = clonedProjectName;
        projectId = clonedprojectId;
        cloneproject = false;

    } else {
        cloneproject = false;
    }

    
    displayDate(projectId, ProjectName);
    //$('#loader').css('visibility', 'hidden');


});

function displayDate(projectId, ProjectName) {

    if (display == 's') {
        DurationList = []; searchresult = [];
        MaterialArray = [];

        //var ProjectName = $("#ProjectId option:Selected").text();
        //var projectId = $('#ProjectId').children(":selected").attr('value');

        $('#selectedProjectName').val(ProjectName);
        $('#selectedProjectId').val(projectId);

        if (projectId == "0") {
            $(".projectName_error").show();
            $(".projectName_error").html("Please Select Project Name");
            $('#btnRefresh').css('display', 'none');
            $('#BtnClone').css('display', 'none');
            $('#TemplateListdiv').hide();
            $.ajax({
                url: ROOT + "Master/MilestonesList",
                type: 'GET',
                data: { projectId: projectId, projectName: ProjectName, clonedProjectId: projectId, clonedProjectName: ProjectName },
                dataType: 'JSON',
                success: function (result) {
                    $("#jqgrid").jqGrid("clearGridData", true);
                    $('#ApproveModal').css('display', 'none');
                }
            });

        }
        else {
            // console.log('project name changed');
            $(".projectName_error").html("");
            $("#SaveModel").show();
            $("#SaveModel1").show();
            $('#btnRefresh').show();
            $('#BtnClone').show();
            $('#TemplateListdiv').show();
            // DefaultArray = $('#jqgrid').jqGrid('getGridParam', 'data');
            $('#loader').show();
            $('#loader').css('visibility', 'visible');
            $.ajax({
                url: ROOT + "Master/MilestonesList",
                type: 'post',
                data: { projectId: projectId, projectName: ProjectName, clonedProjectId: projectId, clonedProjectName: ProjectName },
                dataType: 'JSON',
                success: function (result) {

                    pmuFirstData = result

                    //location.reload();
                    $(".projectName_error").hide();

                    $('#addModal').modal('hide');
                    searchresult = result;
                    result.forEach(element => {

                        if (element.StartDate != '' && element.EndDate != '') {
                            DurationList.push({
                                milestoneName: element.MilestoneName,
                                Duration: element.Duration,
                                MilestoneStatus: element.MilestoneStatus,
                                SetRelation: element.SetRelation

                            });
                        }

                    });
                    ProjStatus = result[0].Status;
                    PMUFlag = result[0].Flag;
                    //console.log('ProjStatus', ProjStatus);
                    //console.log('PMUFlag', PMUFlag);
                    //console.log('result', result);


                    pmugridData = result;

                    pmugridData[0].SetRelation = '0';

                    //displayDuration();

                    projectIdchanged = true;
                    LoadSubGridData = false;
                    ClonedProjectDetails = false;
                    TotalSubGridData = [];
                    $.jgrid.gridUnload('#jqgrid');

                    CreateJqGrid(pmugridData);

                    projectIdchanged = false;
                    //LoadSubGridData = true;
                    allData = $('#jqgrid').jqGrid('getGridParam', result);
                    //TotalSubGridData = [];
                    //if (subgrid_table_id.length > 0) {

                    //    for (var i = 0; i < subgrid_table_id.length; i++) {
                    //        var data = $('#' + subgrid_table_id[i]).jqGrid('getGridParam', 'data');
                    //        if (data.length > 0) {
                    //            TotalSubGridData.push(data);

                    //        }

                    //    }
                    //}

                    var rows = $("#jqgrid").jqGrid('getGridParam', 'records');
                    var j = 1
                    for (var i = 0; i <= pmugridData.length - 1; i++) {

                        if (pmugridData[i].Action == "true") {

                            //$('#jqgrid').jqGrid('setSelection', rowids[i], result[i].Action);
                            $('#jqg_jqgrid_' + j).prop('checked', true);
                            if (($('#jqg_jqgrid_' + j).prop('checked') == true)) {

                                MaterialArray.push(pmugridData[i]);
                                $('body').addClass("menuitemshow");
                                $('#' + pmugridData[i].SequenceNo + 'mapperUserid').val(pmugridData[i].UserId);
                            }
                            if (pmugridData[i].MilestoneStatus == 'Completed' || pmugridData[i].IsApproved == 'Pending For Approval') {
                                $('#jqg_jqgrid_' + j).attr("disabled", true);

                            }
                        }
                        j++;

                    }


                    $('.datepickerS').datepicker({
                        dateFormat: 'dd/mm/yy',
                        autoclose: true,
                        onSelect: function (e) {
                            ChangeDate($(this).attr('data-id'), $(this).attr('id'));
                        }
                    });
                    $('.datepickerE').datepicker({
                        dateFormat: 'dd/mm/yy',
                        autoclose: true,
                        onSelect: function (e) {
                            EndChangeDate($(this).attr('data-id'), $(this).attr('id'));
                        }
                    });

                    LoadUser('mapperUser');

                    if (result[0].Status == 'SUBMITTED') {
                        $(".approve_btn").css('display', 'inline-block');
                        $(".checkboxpmu").hide();
                        $('#BtnClone').css('display', 'none');
                        $('#TemplateListdiv').hide();

                    }
                    if (result[0].Status == 'APPROVED') {
                        $(".save_btn").css('display', 'none');
                        $('#BtnClone').css('display', 'none');
                        $('#TemplateListdiv').hide();
                        $(".approve_btn").css('display', 'none');



                        $(".checkboxpmu").show();

                    }
                    if (result[0].Status == '') {
                        $(".approve_btn").css('display', 'none');
                        $(".checkboxpmu").hide();
                    }

                    var IsApproved = pmugridData.findIndex(obj => obj.IsApproved == 'Pending For Approval');
                    if (IsApproved >= 0) {
                        $('#pendingApprovalmodel').modal('show');
                        $('#Pendingapprovalmilestones').empty();
                        $.each(pmugridData, function (i) {
                            if (pmugridData[i].IsApproved == 'Pending For Approval')
                                $('#Pendingapprovalmilestones').append('<ul><b><li>' + pmugridData[i].MilestoneName + '</li></b></ul>')
                        });

                    }
                    for (var i = 0; i < TotalSubGridData.length; i++) {
                        var IsApproved = TotalSubGridData[i].findIndex(obj => obj.IsApproved == 'Pending For Approval');
                        if (IsApproved >= 0) {
                            $('#pendingApprovalmodel').modal('show');
                            $.each(TotalSubGridData[i], function (j) {
                                console.log(TotalSubGridData[i][j].IsApproved);
                                if (TotalSubGridData[i][j].IsApproved == 'Pending For Approval')
                                    $('#Pendingapprovalmilestones').append('<ul><b><li>' + TotalSubGridData[i][j].SubMilestoneName + '</li></b></ul>')
                            });

                        }
                    }

                    $("#jqgrid tbody tr").each(function (index, e) {

                        if ($(e).find("td:nth-child(7)").text() == 'Completed') {
                            $(this).attr("class", "custom-class");
                            /* $(e).closest('tr').children('td,th').css('background-color', 'rgb(127 197 127)');*/

                        }
                    });



                    //$('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
                    //$('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
                    //var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
                    //if ($TableHeight > 278) {
                    //    $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                    //    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
                    //}
                    //else {
                    //    $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");

                    //}
                    //$('#loader').css('visibility', 'hidden');

                }
            });
        }
    }
}





var rowindex = '';
var iserror = false;

function EndChangeDate(rowid, Sequnce) {

    EnddatechangedRowId = rowid;
    newSubGridrow = false;
    Datachange_SubgRID = false;
    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
    ParentSubGridId = dataFromTheRow.SequenceNo;

    if (($('#jqg_jqgrid_' + rowid).prop('checked') == false)) {
        alert('Please select the checkbox');
        $("#" + dataFromTheRow.SequenceNo + "end_date").val('');
        objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
        pmugridData[objIndex].StartDate = '';
        return false;
    }

    objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
    pmugridData[objIndex].EndDate = $("#" + dataFromTheRow.SequenceNo + "end_date").val();
    UpdatedEndDate_User = pmugridData[objIndex].EndDate;
    changedmilestoneId = dataFromTheRow.SequenceNo;
    for (var sub = 0; sub < TotalSubGridData.length; sub++) {
        var Subdata = TotalSubGridData[sub].find(obj => obj.SequenceNo >= changedmilestoneId);
        if (Subdata != undefined) {
            chnagedSubgridDateId = Subdata.SubMilestoneId;
            break
        }

    }
    var setrelation = parseInt($("#" + changedmilestoneId + "SetRelation").val());


    var sDate = $("#" + changedmilestoneId + "start_date").val().split('/').join('-');
    var eDate = $("#" + changedmilestoneId + "end_date").val().split('/').join('-');

    var ssdate = new Date(sDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    var eedate = new Date(eDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

    var milli_secs = ssdate - eedate;

    var days = milli_secs / (1000 * 3600 * 24);
    var diff = Math.round(Math.abs(days));
    if (dataFromTheRow.SubmilestoneExit != 'True') {
        $("#" + changedmilestoneId + "Duration").val(diff + 1);

    }



    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
    var startDate = moment($("#" + dataFromTheRow.SequenceNo + "start_date").val(), 'DD-MM-YYYY');
    var endDate = moment($("#" + dataFromTheRow.SequenceNo + "end_date").val(), 'DD-MM-YYYY');


    if (startDate > endDate) {
        alert("End date should be greater than Start date");
        $("#jqgrid").jqGrid('getLocalRow', dataFromTheRow.SequenceNo).EndDate = "";
        $("#" + dataFromTheRow.SequenceNo + "end_date").val(prevEndDate);
        $("#" + dataFromTheRow.SequenceNo + "end_date").datepicker('setDate', prevEndDate);
        $("#" + dataFromTheRow.SequenceNo + "Duration").val(beforeDuration);

        // $("#jqgrid").trigger('reloadGrid');
        iserror = true;

        return false;


    }




    if (durationflag) {
        DurationList.forEach(function (item, index) {
            if (index == rowid - 1) {
                DurationList[index].Duration = diff;
            }
        });


    } else {
        DurationList.forEach(function (item, index) {
            if (index == rowid - 1) {
                DurationList[index].Duration = diff + 1;
            }
        });

    }

    objIndex = searchresult.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
    searchresult[objIndex].Duration = diff + 1;
    console.log('After', searchresult);

    //var rowindex = parseInt(changedmilestoneId);
    rowindex = parseInt(rowid) + 1;
    var SequnceRow = changedmilestoneId;
    var nextSequnce = parseInt(changedmilestoneId) + 1;
    // var nextRowId = parseInt(rowindex) + 1;

    var Setrelation_StartDate = $("#" + setrelation + "start_date").val();

    var selectedrow_StartDate = $("#" + changedmilestoneId + "start_date").val();

    if (Setrelation_StartDate != undefined && selectedrow_StartDate != undefined) {
        Setrelation_StartDate = Setrelation_StartDate.split("/").reverse().join("-");
        selectedrow_StartDate = selectedrow_StartDate.split("/").reverse().join("-");
        Setrelation_StartDate = new Date(Setrelation_StartDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        selectedrow_StartDate = new Date(selectedrow_StartDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        if (Setrelation_StartDate < selectedrow_StartDate) {
            //alert('do you want to change the remaining dates');



        }
        //Showing Alert meassage for dependency date change while changes the end date 
        var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
        //var dependent_exit = MaterialArray.findIndex(obj => obj.SetRelation == dataFromTheRow.SequenceNo);
        var dependent_exit = MaterialArray.findIndex(obj => obj.SetRelation.split(',').includes(dataFromTheRow.SequenceNo));
        if (dependent_exit > 0) {
            //display updated details
            DisplaySubGridValue = '';
            dependentMilestoneDetails(SelectedProjectId, dataFromTheRow.MilestoneId);
            if (dependentMilestoneDetailsList.length > 0) {
                displayUpdatedatesdetails(dataFromTheRow.MilestoneId, SelectedProjectId,'Dependentjqgridend');
            }
            $('#UserConfirmationforenddate').modal('show');
        } else {
            selectedrowsequnce = dataFromTheRow.SequenceNo;
            ParentSubGridId = dataFromTheRow.SequenceNo;
            cancelbutton();
            // remove Highlighter

            //remove Highlighter
            for (var i = 0; i < pmugridData.length; i++) {

                $("#jqgrid tbody tr").each(function (index, e) {

                    if ($(e).find("td:nth-child(5)").text() == pmugridData[i].SequenceNo) {
                        //$(this).removeAttr('custom-classUpdate');
                        $(e).find("td:nth-child(12)").css("background-color", "white");
                        $(e).find("td:nth-child(13)").css("background-color", "white");

                    }
                });
            }

        }
    }
    else {
        if ($('1end_date').val() != '') {
            //display updated details
            DisplaySubGridValue = '';
            dependentMilestoneDetails(SelectedProjectId, dataFromTheRow.MilestoneId);
            if (dependentMilestoneDetailsList.length > 0) {
                displayUpdatedatesdetails(dataFromTheRow.MilestoneId, SelectedProjectId, 'Dependentjqgridend');
            }
            $('#UserConfirmationforenddate').modal('show');

        } else {



            //DatepapulateforEndDATE();
            var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
            var dependent_exit = MaterialArray.findIndex(obj => obj.SetRelation == dataFromTheRow.SequenceNo);
            if (dependent_exit > 0) {

                for (var i = 1; i <= pmugridData.length - 1; i++) {
                    if ($('#jqg_jqgrid_' + i).prop('checked') == true) {

                        for (var j = 0; j <= pmugridData.length - 1; j++) {

                            var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowindex);
                            var startDate = moment($("#" + rowid + "start_date").val(), 'DD-MM-YYYY');
                            var endDate = moment($("#" + rowid + "end_date").val(), 'DD-MM-YYYY');

                            if (issetrelationchanged) {
                                if (startDate > endDate) {
                                    alert("End date should be greater than Start date of the selected Milestone");
                                    $("#jqgrid").jqGrid('getLocalRow', SequnceRow).EndDate = "";
                                    $("#" + SequnceRow + "end_date").val(prevEndDate);
                                    $("#" + SequnceRow + "end_date").datepicker('setDate', prevEndDate);
                                    // $("#jqgrid").trigger('reloadGrid');
                                    iserror = true;

                                    break;
                                }
                            }
                            if (($('#jqg_jqgrid_' + rowindex).prop('checked') == true)) {



                                if (pmugridData[j].MilestoneName == dataFromTheRow.MilestoneName) {


                                    var NextdataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowindex);

                                    if (NextdataFromTheRow.MilestoneStatus != 'Completed') {

                                        var sequnceno = NextdataFromTheRow.SequenceNo;
                                        var NextrowSetrealtion = $('#' + sequnceno + 'SetRelation').val();
                                        var ed = $("#" + NextrowSetrealtion + "end_date").val();

                                        var stardatechange = new Date(ed.split("/").reverse().join("-"));

                                        var newDate = moment(stardatechange).add(1, 'days').format('DD/MM/YYYY');


                                        if (($('#jqg_jqgrid_' + rowindex).prop('checked') == true)) {
                                            $("#" + sequnceno + "start_date").val(newDate);
                                            $("#" + sequnceno + "start_date").datepicker("setDate", newDate);
                                            objIndex = pmugridData.findIndex((obj => obj.SequenceNo == sequnceno));
                                            pmugridData[objIndex].StartDate = newDate;
                                            objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == sequnceno));
                                            MaterialArray[objIndex].StartDate = newDate;

                                        }
                                    }

                                    var enddateformate = new Date(newDate.split("/").reverse().join("-"));
                                    var duration = $('#' + sequnceno + 'Duration').val();
                                    if (durationflag) {
                                        var Enddate = moment(enddateformate).add(duration, 'days').format('DD/MM/YYYY');
                                    } else {
                                        Enddate = moment(enddateformate).add(duration - 1, 'days').format('DD/MM/YYYY');
                                    }

                                    if (($('#jqg_jqgrid_' + rowindex).prop('checked') == true)) {
                                        $("#" + sequnceno + "end_date").val(Enddate);
                                        $("#" + sequnceno + "end_date").datepicker("setDate", Enddate);
                                        objIndex = pmugridData.findIndex((obj => obj.SequenceNo == sequnceno));
                                        pmugridData[objIndex].EndDate = Enddate;
                                        objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == sequnceno));
                                        MaterialArray[objIndex].EndDate = Enddate;
                                    }

                                    rowindex++;




                                }
                            }
                            else {
                                rowindex++;

                            }


                        }

                    }
                    if (iserror) {
                        break;
                    }
                }
                $("#jqgrid").jqGrid('getLocalRow', rowindex).StartDate = '';
            }

        }
    }

}
$('#endChangeDate').on('click', function (e) {
    DatesPapulationflage = 'Yes';

    DatepapulateforEndDATE();
    $('#EndNoButton').show();
});


function DatepapulateforEndDATE() {

        var SubSelectedrowid = EnddatechangedRowId;
    var rowid = ParentSubGridId;//parent grd seq no

    $('#jqgrid tbody tr').each(function (index, e) {


        if ($(e).find("td:nth-child(5)").text() == ParentSubGridId) {
            rowid = $(this).closest("tr").attr("id");
        }
    });





    rowindex = parseInt(rowid) + 1;
    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);

    if (dataFromTheRow.SubmilestoneExit == 'True') {
        var subgridData = jQuery('#' + newStr).jqGrid('getGridParam', 'data');
        var SubdataFromTheRow = jQuery('#' + newStr).jqGrid('getRowData', SubSelectedrowid);

        var SetrelationSub = $('#' + SubdataFromTheRow.SubMilestoneId + 'SetRelation').val();
        if (SubgridStartDatechanged) {
            st = $('#' + SubdataFromTheRow.SubMilestoneId + 'start_date').val();
            SubgridStartDatechanged = false;

        } else {


            if (SetrelationSub == '0') {
                st = $('#' + SubdataFromTheRow.SubMilestoneId + 'start_date').val();
            } else {
                //finding Highest date for multiple Setrelations
                var LastDate = [];
                SetrelationSub = SetrelationSub.split(',');
                $.each(SetrelationSub, function (i, obj) {

                    var mulIndex = subgridData.findIndex(obj => obj.SubMilestoneId == SetrelationSub[i]);
                    var highestEndDate = subgridData[mulIndex].EndDate;
                    if (highestEndDate != '' && highestEndDate != null) {

                        var nextenddate = new Date(highestEndDate.split("/").reverse().join("-"));
                        LastDate.push(new Date(nextenddate));
                    }
                })
                var highestDate = new Date(Math.max.apply(null, LastDate));
                //var highestDate = data[data.length - 1].EndDate;

                highestDate = moment(highestDate).format('DD/MM/YYYY');
                st = highestDate
               // st = $('#' + SetrelationSub + 'end_date').val();

            }
            var rowenddate = new Date(st.split("/").reverse().join("-"));
            st = moment(rowenddate).add(1, 'days').format('DD/MM/YYYY');
        }

        //getting an error while unselect the checkbox , parent milestone date are not updating

        var NewEndDate = SubGridDatesDisplay(SubSelectedrowid, newStr, 'start_date', st)
        
        if (NewEndDate.newDate != 'Invalid date') {

            $('#' + dataFromTheRow.SequenceNo + 'end_date').val(NewEndDate.newDate);
            if (SubSelectedrowid == '1') {
                $('#' + dataFromTheRow.SequenceNo + 'start_date').val(NewEndDate.StartDate);

            }
            $('#' + dataFromTheRow.SequenceNo + 'Duration').val(NewEndDate.Duration);
        } else {
            var DurationIndex = pmuFirstData.findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);
            if (rowid == '1') {
                $('#' + dataFromTheRow.SequenceNo + 'start_date').val(NewEndDate.StartDate);

            }
            $('#' + dataFromTheRow.SequenceNo + 'Duration').val(pmuFirstData[DurationIndex].Duration);
            var rowenddate = new Date(NewEndDate.StartDate.split("/").reverse().join("-"));
            var newDate = moment(rowenddate).add(parseInt(pmuFirstData[DurationIndex].Duration) - 1, 'days').format('DD/MM/YYYY');

            $('#' + dataFromTheRow.SequenceNo + 'end_date').val(newDate);

        }

        var index = pmugridData.findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);
        //pmugridData[index].StartDate = NewEndDate.StartDate;
        pmugridData[index].EndDate = NewEndDate.newDate;
        pmugridData[index].Duration = NewEndDate.Duration;
        var index = MaterialArray.findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);
        //MaterialArray[index].StartDate = NewEndDate.StartDate;
        MaterialArray[index].EndDate = NewEndDate.newDate;
        MaterialArray[index].Duration = NewEndDate.Duration;


    }




    var dependent_exit = MaterialArray.findIndex(obj => obj.SetRelation.split(',').includes(dataFromTheRow.SequenceNo));
    if (dependent_exit > 0) {
        for (var i = 1; i <= pmugridData.length - 1; i++) {
            if ($('#jqg_jqgrid_' + i).prop('checked') == true) {

                for (var j = 0; j <= pmugridData.length - 1; j++) {

                    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowindex);
                    var startDate = moment($("#" + rowid + "start_date").val(), 'DD-MM-YYYY');
                    var endDate = moment($("#" + rowid + "end_date").val(), 'DD-MM-YYYY');

                    if (issetrelationchanged) {
                        if (startDate > endDate) {
                            alert("End date should be greater than Start date");
                            $("#jqgrid").jqGrid('getLocalRow', SequnceRow).EndDate = "";
                            $("#" + SequnceRow + "end_date").val('');
                            $("#" + SequnceRow + "end_date").datepicker('setDate', '');
                            // $("#jqgrid").trigger('reloadGrid');
                            iserror = true;

                            break;
                        }
                    }
                    if (($('#jqg_jqgrid_' + rowindex).prop('checked') == true)) {



                        if (pmugridData[j].MilestoneName == dataFromTheRow.MilestoneName) {


                            var NextdataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowindex);

                            if (NextdataFromTheRow.MilestoneStatus != 'Completed') {

                                //startdate change 
                                //take setrelation startdate(setrelationstartdate) and select row startdate(currentstartdate) and compre date
                                //if it (setrelationstartdate<currentstartdate)-->no need to change the dates 
                                //same we need to do in changedate also

                                var sequnceno = NextdataFromTheRow.SequenceNo;
                                var NextrowSetrealtion = $('#' + sequnceno + 'SetRelation').val();
                                 var HighestDate=  getHighestdatefromMulSetrelation(NextrowSetrealtion)

                               // var ed = $("#" + NextrowSetrealtion + "end_date").val();
                                var ed = HighestDate

                                var stardatechange = new Date(ed.split("/").reverse().join("-"));

                                var ExtraDays = $("#" + NextrowSetrealtion + "ExtraDays").val();
                                var newDate = '';
                                if (ExtraDays != '') {
                                    newDate = moment(stardatechange).add(parseInt(ExtraDays) + 1, 'days').format('DD/MM/YYYY');

                                } else {
                                    newDate = moment(stardatechange).add(1, 'days').format('DD/MM/YYYY');

                                }


                                if (($('#jqg_jqgrid_' + rowindex).prop('checked') == true)) {
                                    $("#" + sequnceno + "start_date").val(newDate);
                                    $("#" + sequnceno + "start_date").datepicker("setDate", newDate);
                                    objIndex = pmugridData.findIndex((obj => obj.SequenceNo == sequnceno));
                                    pmugridData[objIndex].StartDate = newDate;
                                    objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == sequnceno));
                                    MaterialArray[objIndex].StartDate = newDate;

                                }
                            }


                            var TotalDuration = '';
                            var FinalData = '';
                            var SubGridDatedisplaycount = 0;


                            if (NextdataFromTheRow.SubmilestoneExit == 'True') {
                                var gridid = '';
                                if (subgrid_table_id.length != SubGridDatedisplaycount) {
                                    $.each(subgrid_table_id, function (i, obj) {

                                        var gridrowid = subgrid_table_id[i].split('_');
                                        if (gridrowid[1] == rowindex) {
                                            gridid = subgrid_table_id[i]
                                        }
                                    })
                                }
                                var SubGridData = $('#' + gridid).jqGrid('getGridParam', 'data');
                                var selecteddata = SubGridData.filter(obj => obj.Action == 'true');

                                EndDatechange_Sub = true;
                                if (selecteddata.length > 0) {
                                    FinalData = SubGridDatesDisplay(0, gridid, 'start_date', $("#" + NextdataFromTheRow.SequenceNo + "start_date").val());

                                    SubGridDatedisplaycount++



                                    Enddate = FinalData.newDate;
                                    TotalDuration = FinalData.Duration;
                                    $("#" + NextdataFromTheRow.SequenceNo + "Duration").val(TotalDuration);
                                } else {
                                    var enddateformate = new Date(newDate.split("/").reverse().join("-"));
                                    TotalDuration = $('#' + sequnceno + 'Duration').val();
                                    if (durationflag) {
                                        var Enddate = moment(enddateformate).add(TotalDuration, 'days').format('DD/MM/YYYY');
                                    } else {
                                        Enddate = moment(enddateformate).add(TotalDuration - 1, 'days').format('DD/MM/YYYY');
                                    }
                                }

                            } else {
                                var enddateformate = new Date(newDate.split("/").reverse().join("-"));
                                TotalDuration = $('#' + sequnceno + 'Duration').val();
                                if (durationflag) {
                                    var Enddate = moment(enddateformate).add(TotalDuration, 'days').format('DD/MM/YYYY');
                                } else {
                                    Enddate = moment(enddateformate).add(TotalDuration - 1, 'days').format('DD/MM/YYYY');
                                }


                            }






                            if (($('#jqg_jqgrid_' + rowindex).prop('checked') == true)) {
                                $("#" + sequnceno + "end_date").val(Enddate);
                                $("#" + sequnceno + "Duration").val(TotalDuration);
                                $("#" + sequnceno + "end_date").datepicker("setDate", Enddate);
                                objIndex = pmugridData.findIndex((obj => obj.SequenceNo == sequnceno));
                                pmugridData[objIndex].EndDate = Enddate;
                                pmugridData[objIndex].Duration = TotalDuration;
                                objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == sequnceno));
                                MaterialArray[objIndex].EndDate = Enddate;
                                MaterialArray[objIndex].Duration = TotalDuration;
                            }

                            rowindex++;




                        }
                    }
                    else {
                        rowindex++;

                    }


                }

            }
            if (iserror) {
                break;
            }
        }
        $("#jqgrid").jqGrid('getLocalRow', rowindex).StartDate = '';
    }
    //Highlight updated dates row
    HighlightUpdatedDaterows();

}

function HighlightUpdatedDaterows() {

    // Remove Highlighter main grid
    var parentSelectedData = pmugridData.filter(obj => obj.Action == "true")
    for (var i = 0; i < parentSelectedData.length; i++) {

        $("#jqgrid tbody tr").each(function (index, e) {

            if ($(e).find("td:nth-child(5)").text() == parentSelectedData[i].SequenceNo) {
                //$(this).removeAttr('custom-classUpdate');
                $(e).find("td:nth-child(12)").css("background-color", "white");
                $(e).find("td:nth-child(13)").css("background-color", "white");

            }
        });
    }

    var Updatedgridid = '';
    var data = [];
    for (var Sub = 0; Sub <= TotalSubGridData.length; Sub++) {
        //SubgridData.push(TotalSubGridData[Sub]);
        $.merge(data, $.extend(true, [], TotalSubGridData[Sub]));

    }
    for (var i = 0; i < data.length; i++) {

        for (var j = 0; j < subgrid_table_id.length; j++) {
            var ids = subgrid_table_id[j].split('_');
            var Seqcompare = ids[2].replace('t', '');
            if (Seqcompare.trim() == data[i].SequenceNo) {
                Updatedgridid = subgrid_table_id[j];
            }
        }
        console.log(Updatedgridid);
        $("#" + Updatedgridid + ' tbody tr').each(function (index, e) {
            var Seq = $(e).find("td:nth-child(4)").text();
            if (Seq == data[i].SubMilestoneId) {
                //$(this).attr("class", "custom-classUpdate");
                $(e).find("td:nth-child(11)").css("background-color", "white");

                $(e).find("td:nth-child(12)").css("background-color", "white");


            }
        });
    }
    if (changedmaingrid_id != '') {
        dependentMilestoneDetailsList = dependentMilestoneDetailsList.filter(obj => obj.SequenceNo == changedmaingrid_id);
        changedmaingrid_id = '';
    }

    for (var i = 0; i < dependentMilestoneDetailsList.length; i++) {

        $("#jqgrid tbody tr").each(function (index, e) {

            if ($(e).find("td:nth-child(5)").text() == dependentMilestoneDetailsList[i].SequenceNo) {
              // $(this).attr("class", "custom-classUpdate");
                $(e).find("td:nth-child(12)").css("background-color", "rgb(149 197 24)");
                $(e).find("td:nth-child(13)").css("background-color", "rgb(149 197 24)");

            }
        });
    }
    //Hightlight Subgrid 
    var Updatedgridid = '';
    var SubMilestoneExist = $.map(dependentMilestoneDetailsList, function (e) {
        if (e.SubmilestoneExit == 'True') {
            return e.SequenceNo;
        }
    });
    
    var data = $.grep(DependentSub_Milestones, function (e, i) {
        var Seq = parseInt(e.SequenceNo);
        if ($.inArray(Seq, SubMilestoneExist) !== -1) {
           
            return DependentSub_Milestones[i];
        }
       
    })
    var SubData = [];
    var dependentdata = [];
    var index = data.findIndex(obj => obj.SubMilestoneId == unionSelectedSubgrid_id);
    if (index != -1) {
        var Seq = data[index].SequenceNo;
         SubData = data.filter(obj => obj.SequenceNo == Seq);
    }
    if (!CancelHighlighter) {
        if (unionSelectedSubgrid_id != '') {

            dependentdata.push(data[index])
            //dependentdata = SubData.filter(obj => obj.SetRelation == unionSelectedSubgrid_id);
            if (SubData.length > 0) {
                for (var i = 0; i < SubData.length - 1; i++) {

                    $.merge(dependentdata, $.extend(true, [], SubData.filter(obj => obj.SetRelation == SubData[i].SubMilestoneId)));

                }
            }
            unionSelectedSubgrid_id = '';
        }
        $.each(data, function (index, obj) {
            if (obj.SequenceNo === Seq) {
                data.splice(index, 1); // Remove the object at the current index
                return false; // Exit the loop since the object is removed
            }
        });
        $.merge(data, $.extend(true, [], dependentdata));
    } else {
        data = data.filter(obj => obj.SubMilestoneId == unionSelectedSubgrid_id)
        CancelHighlighter = '';
        unionSelectedSubgrid_id=''
    }

    for (var i = 0; i < data.length; i++) {

        for (var j = 0; j < subgrid_table_id.length; j++) {
            var ids = subgrid_table_id[j].split('_');
            var Seqcompare = ids[2].replace('t', '');
            if (Seqcompare.trim() == data[i].SequenceNo) {
                Updatedgridid = subgrid_table_id[j];
            }
        }
        
        $("#" + Updatedgridid + ' tbody tr').each(function (index, e) {
            var Seq = $(e).find("td:nth-child(4)").text();
            if (Seq == data[i].SubMilestoneId) {
                $(e).find("td:nth-child(11)").css("background-color", "rgb(149 197 24)");

                $(e).find("td:nth-child(12)").css("background-color", "rgb(149 197 24)");


            }
        });
    }
}

function ChangeSetRelation(rowid, sequnceNo) {

    userchangedSetrelation = false;
    selectedrow = rowid;
    var lastelement = '';
    var errorflag = true;
    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);//row data
    ParentSubGridId = dataFromTheRow.SequenceNo;

    selectedrowsequnce = dataFromTheRow.SequenceNo;
    var SetRelation = $('#' + dataFromTheRow.SequenceNo + 'SetRelation').val();
    if (SetRelation == '0') {
        alert('Please enter valid Set Relation');
        $('#' + dataFromTheRow.SequenceNo + 'SetRelation').val(beforesetrelation);
    }
    allData = $('#jqgrid').jqGrid('getGridParam', 'data');

    var sequncelist = SetRelation.split(',');

    FindRowIDsequnce = Math.max.apply(Math, sequncelist);
    objIndex = pmugridData.findIndex((obj => obj.SequenceNo == sequnceNo));
    pmugridData[objIndex].SetRelation = SetRelation;

    //check multiple setrelation Action is true
    var areAllIdsTrue = sequncelist.every(function (id) {
        var item = pmugridData.find(function (element) {
            return element.SequenceNo == id;
        });
        return item && item.Action == 'true';
    });

    console.log('areAllIdsTrue', areAllIdsTrue);
    objIndex = pmugridData.findIndex((obj => obj.SequenceNo == FindRowIDsequnce));
    if (objIndex >= 0) {
        var FindRowID = allData.findIndex((obj => obj.SequenceNo == FindRowIDsequnce));

        //CHECKING the setrelationed checked
        if (areAllIdsTrue) {
            //CHECKING the current milestone checked
            objIndex = pmugridData.findIndex((obj => obj.SequenceNo == sequnceNo));
            if (pmugridData[objIndex].Action == "true") {
                //this is looping
                get_relations(dataFromTheRow.SequenceNo, []);
                sortingrecord();

                if (looping) {

                    var setrelation = FindRowIDsequnce;
                    for (var seq = 0; seq <= sequncelist.length - 1; seq++) {


                        if (sequnceNo <= sequncelist[seq]) {
                            // isinvalide = 1;


                            if (sequnceNo == sequncelist[seq]) {
                                errorflag = false;
                                sort = false
                                alert('Please enter valid Set Relation ');
                                $("#" + sequnceNo + "SetRelation").val(beforesetrelation);
                            } else {
                                alert('Please click on refresh button for sorting the records');
                                sort = false;
                                errorflag = true;
                            }

                            break;
                        }
                    }


                    setrelationchanged = true;

                    if (errorflag) {

                        //for remove the color in looping milestone
                        for (var i = 0; i <= milestoneid_looping.length - 1; i++) {
                            $("#jqgrid tbody tr").each(function (index, e) {

                                if ($(e).find("td:nth-child(5)").text() == milestoneid_looping[i]) {
                                    $(e).closest('tr').children('td,th').css('background-color', '');
                                }
                            });
                        }
                        //end
                        isinvalide = 0;

                        if (pmugridData[0].StartDate != '' && pmugridData[0].StartDate != null && pmugridData[0].StartDate != undefined) {
                            var HighestDate = getHighestdatefromMulSetrelation(SetRelation)

                            objIndex = pmugridData.findIndex((obj => obj.SequenceNo == FindRowIDsequnce));
                            // var Setrelationrowidend = pmugridData[objIndex].EndDate;
                            var Setrelationrowidend = HighestDate;
                            var enddate = Setrelationrowidend
                        } else { var enddate = ''; }
                        if (enddate != '' && enddate != undefined) {

                            var startDateChange = moment(enddate, 'DD/MM/YYYY');
                            var SetRelation_ExtraDays = $("#" + FindRowIDsequnce + "ExtraDays").val();

                            var startdatechange = '';
                            if (SetRelation_ExtraDays) {
                                startdatechange = moment(startDateChange).add(parseInt(SetRelation_ExtraDays) + 1, 'days').format('DD/MM/YYYY');

                            } else {
                                startdatechange = moment(startDateChange).add(1, 'days').format('DD/MM/YYYY');

                            }

                            $("#" + sequnceNo + "start_date").val(startdatechange);
                            $("#" + sequnceNo + "start_date").datepicker("setDate", startdatechange);
                            issetrelationchanged = false;

                            objIndex = pmugridData.findIndex((obj => obj.SequenceNo == sequnceNo));
                            pmugridData[objIndex].StartDate = startdatechange;




                            //updating the setrelation in duration list
                            objIndex = DurationList.findIndex((obj => obj.milestoneName == dataFromTheRow.MilestoneName));


                            if (objIndex != -1) {
                                DurationList[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                            }




                            objIndex = searchresult.findIndex((obj => obj.MilestoneName == dataFromTheRow.MilestoneName));


                            if (objIndex != -1) {
                                searchresult[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                            }


                            //updating alldate
                            objIndex = allData.findIndex((obj => obj.MilestoneName == dataFromTheRow.MilestoneName));


                            if (objIndex != -1) {
                                allData[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                            }


                            if (durationflag == false) {
                                setrelationchanged = false;

                            } else {
                                setrelationchanged = true;

                            }

                            sort = true;
                            // selectedrow = sequnceNo;
                            //sortingrecord();
                            // ChangeDate(rowid, sequnceNo + 'start_date');
                            var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
                            /*var dependent_exit = MaterialArray.findIndex(obj => Math.max.apply(Math, obj.SetRelation.split(',')) == dataFromTheRow.SequenceNo);*/
                            var dependent_exit = MaterialArray.findIndex(obj => obj.SetRelation == dataFromTheRow.SequenceNo);
                            if (dependent_exit > 0) {
                                DisplaySubGridValue = 'false';
                                UpdatedStartDate_User = startdatechange
                                dependentMilestoneDetails(SelectedProjectId, dataFromTheRow.MilestoneId);
                                if (dependentMilestoneDetailsList.length > 0) {
                                    displayUpdatedatesdetails(dataFromTheRow.MilestoneId, SelectedProjectId, 'Dependentjqgrid');
                                }
                                $('#UserConfirmationforStartDate').modal('show');
                            } else {
                                selectedrowsequnce = dataFromTheRow.SequenceNo;
                                ParentSubGridId = dataFromTheRow.SequenceNo;
                                cancelbutton();
                            }

                            userchangedSetrelation = true;

                        }
                        else {
                            objIndex = DurationList.findIndex((obj => obj.milestoneName == dataFromTheRow.MilestoneName));

                            if (objIndex != -1) {
                                DurationList[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                            }

                            //searchresult update
                            objIndex = searchresult.findIndex((obj => obj.MilestoneName == dataFromTheRow.MilestoneName));



                            if (objIndex != -1) {
                                searchresult[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                            }



                            //updating alldate
                            objIndex = allData.findIndex((obj => obj.MilestoneName == dataFromTheRow.MilestoneName));


                            if (objIndex != -1) {
                                allData[objIndex].SetRelation = $("#" + sequnceNo + "SetRelation").val();

                            }




                        }
                    }
                } else {

                    for (var i = 0; i <= milestoneid_looping.length - 1; i++) {
                        $("#jqgrid tbody tr").each(function (index, e) {

                            if ($(e).find("td:nth-child(5)").text() == milestoneid_looping[i]) {
                                //$("#jqgrid").jqGrid('setRowData', rowid, false, { color: 'white', weightfont: 'bold', background: 'orange' });
                                // $(e.target).closest('tr').children('td,th').css('background-color', '#000');
                                $(e).closest('tr').children('td,th').css('background-color', 'orange');

                            }
                        });
                    }


                }
            }



        } else {
            alert('Change set relation milestone is not checked');
            $('#' + dataFromTheRow.SequenceNo + 'SetRelation').val(beforesetrelation);
            objindex = pmugridData.findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);
            pmugridData[objindex].SetRelation = beforesetrelation;
            objindex = MaterialArray.findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);
            MaterialArray[objindex].SetRelation = beforesetrelation;
        }
    } else {
        alert('The set relation entered for the milestone is inactive or invalid, Please enter valid set relation.');
        $('#' + dataFromTheRow.SequenceNo + 'SetRelation').val(beforesetrelation);
        objindex = pmugridData.findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);
        pmugridData[objindex].SetRelation = beforesetrelation;
        objindex = MaterialArray.findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);
        MaterialArray[objindex].SetRelation = beforesetrelation;
    }
}

function getHighestdatefromMulSetrelation(SetRelation) {
    //finding Highest date for multiple Setrelations
    var LastDate = [];
    var SetRelation = SetRelation.split(',')
    $.each(SetRelation, function (i, obj) {

        var mulIndex = pmugridData.findIndex(obj => obj.SequenceNo == SetRelation[i]);
        var highestEndDate = pmugridData[mulIndex].EndDate;
        if (highestEndDate != '' && highestEndDate != null) {

            var nextenddate = new Date(highestEndDate.split("/").reverse().join("-"));
            LastDate.push(new Date(nextenddate));
        }
    })
    var highestDate = new Date(Math.max.apply(null, LastDate));
    //var highestDate = data[data.length - 1].EndDate;

    highestDate = moment(highestDate).format('DD/MM/YYYY');
    return highestDate;

}
function ChangeDuration(rowid, sequnceNo) {

    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);//row data
    var changedmilestoneId = parseInt(rowid);
    var Duration = $("#" + sequnceNo + "Duration").val();
    changedDuration = Duration;
    //filter Array
    objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
    if (objIndex > 0) {
        MaterialArray[objIndex].Duration = $("#" + sequnceNo + "Duration").val();
    }


    if (Duration == '0') {
        alert("Please enter valid Duration");
        $('#' + sequnceNo + 'Duration').val(beforeDuration);
    }
    Duration = $("#" + sequnceNo + "Duration").val();

    $.each(DurationList, function (index, ele) {
        if (index == rowid - 1) {
            DurationList[index].Duration = Duration;
        }

    })

    objIndex = searchresult.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
    searchresult[objIndex].Duration = $("#" + sequnceNo + "Duration").val();

    var startDate = $("#" + sequnceNo + "start_date").val();
    if (startDate != '') {
        var startDateChange = moment(startDate, 'DD/MM/YYYY');
        // var endDateFromate = new Date(endDateChange.split("/").reverse().join("-"));

        var endDateChange = moment(startDateChange).add(Duration - 1, 'days').format('DD/MM/YYYY');
        $("#" + sequnceNo + "end_date").val(endDateChange);
        $("#" + sequnceNo + "end_date").datepicker("setDate", endDateChange);
        //main geid data
        objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
        pmugridData[objIndex].EndDate = endDateChange;
        pmugridData[objIndex].Duration = $("#" + sequnceNo + "Duration").val();
        sequnceNo = sequnceNo.toString();
        sequnceNo = sequnceNo.concat('start_date');
        durationflag = false;

        EndChangeDate(rowid, sequnceNo);

    }

}

$('#btnRefresh').on('click', function () {

    //sorting parent rows
    $('#loader').show();
    $('#loader').css('visibility', 'visible');
    sortingrecord();
    var SubGridMilestoneData = pmugridData.filter(obj => obj.SubmilestoneExit == 'True' && obj.Action == 'true');
    for (var i = 0; i < SubGridMilestoneData.length; i++) {
        for (var j = 0; j < subgrid_table_id.length; j++) {
            var GridId = subgrid_table_id[j].split('_');
            var Seq = GridId[2].slice('1');
            if (SubGridMilestoneData[i].SequenceNo == Seq) {
                SubGridsortingrecord(subgrid_table_id[j])

            }
        }
    }
    $('#loader').hide();
    $('#loader').css('visibility', 'hidden');
});


//For Sorting the records based on setrelation 

function matchedrecords(ele) {
    var dependedrows = MaterialArray.filter(v => Math.max.apply(Math, v.SetRelation.split(',')) == ele);
    return dependedrows;
}
function matchedsequnceNo(ele) {
    var sequnceNoList = [];
    var sequnceNo = MaterialArray.filter(v => Math.max.apply(Math, v.SetRelation.split(',')) == ele);
    for (var i = 0; i <= sequnceNo.length - 1; i++) {
        sequnceNoList.push(sequnceNo[i].SequenceNo);
    }
    return sequnceNoList;
}

function sortingrecord() {

    if (looping) {

        objindex = MaterialArray.findIndex(obj => obj.SetRelation == "");
        if (objindex > 0) {
            alert("Please Enter the Setrelation ");
            return false;

        }

        MaterialArray[0].SetRelation = '0';
        var result = [];
        result.push(pmugridData[0]);

        var selected_rows = [1];

        while (selected_rows.length > 0) {
            var ele = selected_rows.shift();
            Array.prototype.push.apply(result, matchedrecords(ele));

            Array.prototype.push.apply(selected_rows, matchedsequnceNo(ele));

        }


        var selectedmilestonedata = result;
        var unselectedmilestonedata = pmugridData.filter(obj => obj.Action == null || obj.Action == '');
        Array.prototype.push.apply(selectedmilestonedata, unselectedmilestonedata);
        pmugridData = [];
        subgrid_table_id = [];
        pmugridData = selectedmilestonedata;
        TemplateSubGridDisplay = true;
        LoadSubGridData = false;
        projectIdchanged = false;
        sort = true;
        //$("#jqgrid").jqGrid("clearGridData", true);
        //$("#jqgrid").jqGrid('setGridParam', { data: pmugridData });

        //$("#jqgrid").trigger('reloadGrid');

        $.jgrid.gridUnload('#jqgrid');
        CreateJqGrid(pmugridData);



        $("#jqgrid tbody tr").each(function (index, e) {

            if ($(e).find("td:nth-child(7)").text() == 'Completed') {
                $(this).attr("class", "custom-class");

            }
        });

    } else {
        alert('There is a circle dependency observed for the below marked milestones');

    }

}

function process(date) {
    var parts = date.split("/");
    console.log(new Date(parts[2], parts[1] - 1, parts[0]));
    return new Date(parts[2], parts[1] - 1, parts[0]);
}


function ChangeDate(rowid, Sequnce) {

    if (looping) {
        var SequnceRowId = ''

        if (sort) {
            var suffix = Sequnce.match(/\d+/);


            if (suffix[0] != null) {
                SequnceRowId = suffix[0];

            }
            var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);//row data
            //for sending the mail are taking the SubMilestone id 
            changedmilestoneId = SequnceRowId;
            for (var sub = 0; sub < TotalSubGridData.length; sub++) {
                var Subdata = TotalSubGridData[sub].find(obj => obj.SequenceNo >= changedmilestoneId);
                if (Subdata != undefined) {
                    chnagedSubgridDateId = Subdata.SubMilestoneId;
                    break
                }

            }
            selectedrowsequnce = SequnceRowId;
            selectedrow = selectedrowsequnce;
            if (ExtraDaysAdd) {
                ParentSubGridId = rowid + 1;
                ExtraDaysAdd = false;
            } else {
                ParentSubGridId = dataFromTheRow.SequenceNo;
            }

            var relationid = $('#' + SequnceRowId + 'SetRelation').val();
            if (SequnceRowId != '1') {

                relationid = relationid.split(',');
                relationid = Math.max.apply(Math, relationid);
            } else {
                DatesPapulationflage = '';
            }

            var Finddepedent = pmugridData.findIndex((obj => obj.setrelation == relationid));
            if (Finddepedent == -1) {
                DatesPapulationflage = '';
            }


            var rowindex = 0;



            if (($('#jqg_jqgrid_' + rowid).prop('checked') == false)) {
                alert('Please select the checkbox');
                $("#" + SequnceRowId + "start_date").val('');
                objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
                pmugridData[objIndex].StartDate = '';


            } else {
                if (rowid == '1') {
                    var data = pmugridData.filter(obj => obj.Action == 'true');
                    if (data.length > 1) {
                        

                        if (data[0].StartDate != '' && data[0].StartDate != undefined) {
                            var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
                            var dependent_exit = MaterialArray.findIndex(obj => obj.SetRelation == dataFromTheRow.SequenceNo);
                            if (dependent_exit > 0) {
                                DisplaySubGridValue = 'false';
                                UpdatedStartDate_User = $("#" + SequnceRowId + "start_date").val();
                                dependentMilestoneDetails(SelectedProjectId, dataFromTheRow.MilestoneId);
                                if (dependentMilestoneDetailsList.length > 0) {
                                    displayUpdatedatesdetails(dataFromTheRow.MilestoneId, SelectedProjectId, 'Dependentjqgrid');
                                }
                                $('#UserConfirmationforStartDate').modal('show');
                            }
                        } else {
                            setrelationchanged = false;

                            startDatepapulation();
                        }
                    } else {

                        //this is for mapped only one Milestone
                        //29 this code will execute only one milestone is mapped
                        //EnddatechangedRowId='1'
                        //cancelbutton();
                        var index = pmugridData.findIndex(obj => obj.SequenceNo == changedmilestoneId);
                        pmugridData[index].StartDate = $("#" + changedmilestoneId + "start_date").val();
                        SubGridDatedisplaycount = 0;
                        startDatepapulation();
                    }
                } else {


                    if (rowid > 1) {

                        var endDate = moment($("#" + relationid + "start_date").val(), 'DD-MM-YYYY');
                        var startDate = moment($("#" + changedmilestoneId + "start_date").val(), 'DD-MM-YYYY');
                        if (endDate >= startDate) {
                            alert('For the selected milestone start date should be between start date and end date of dependent milestone.');
                            $("#" + changedmilestoneId + "start_date").val(prevStartDate);
                            $("#" + changedmilestoneId + "end_date").val(prevEndDate);
                            datepapulation = false;
                            // $("#" + changedmilestoneId + "end_date").datepicker("setDate", '');

                        } else {
                            datepapulation = true;

                        }

                    } else {
                        datepapulation = true;
                    }
                    if (datepapulation) {


                        var selected_StartDate = $("#" + SequnceRowId + "start_date").val();
                        var setrelation_Startdate = $("#" + relationid + "start_date").val();


                        if (setrelation_Startdate != undefined) {


                            if (selected_StartDate != undefined && setrelation_Startdate != undefined) {
                                var newdate = selected_StartDate.split("/").reverse().join("-");
                                var newdate1 = setrelation_Startdate.split("/").reverse().join("-");
                                selected_StartDate = new Date(newdate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
                                setrelation_Startdate = new Date(newdate1.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
                                if (userchangedSetrelation) {
                                    if (setrelation_Startdate >= selected_StartDate) {

                                        alert('The selected milestone date should be greater than the Start Date of dependent milestone.');
                                        $("#" + SequnceRowId + "start_date").val(prevStartDate);
                                        startDatealertdisplay = false;
                                    } else {
                                        startDatealertdisplay = true;
                                    }
                                }
                                if (startDatealertdisplay) {
                                    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
                                    var dependent_exit = MaterialArray.findIndex(obj => obj.SetRelation.split(',').includes(dataFromTheRow.SequenceNo));
                                    if (dependent_exit > 0) {
                                        DisplaySubGridValue = 'false';
                                        UpdatedStartDate_User = $("#" + SequnceRowId + "start_date").val();
                                        dependentMilestoneDetails(SelectedProjectId, dataFromTheRow.MilestoneId);
                                        if (dependentMilestoneDetailsList.length > 0) {
                                            displayUpdatedatesdetails(dataFromTheRow.MilestoneId, SelectedProjectId,'Dependentjqgrid');
                                        }
                                        $('#UserConfirmationforStartDate').modal('show');
                                    } else {
                                        //there is no dependent milestone 
                                        selectedrowsequnce = dataFromTheRow.SequenceNo;
                                        ParentSubGridId = dataFromTheRow.SequenceNo;
                                        EnddatechangedRowId = 1
                                        //cancelbutton();
                                        SubGridDatedisplaycount = 0;
                                        startDatepapulation();
                                        //remove Highlighter
                                        for (var i = 0; i < pmugridData.length; i++) {

                                            $("#jqgrid tbody tr").each(function (index, e) {

                                                if ($(e).find("td:nth-child(5)").text() == pmugridData[i].SequenceNo) {
                                                    //$(this).removeAttr('custom-classUpdate');
                                                    $(e).find("td:nth-child(12)").css("background-color", "white");
                                                    $(e).find("td:nth-child(13)").css("background-color", "white");

                                                }
                                            });
                                        }
                                    }
                                }



                            } else {
                                if ($('#1end_date').val() == '') {
                                    startDatepapulation();
                                }

                            }
                        } else {
                            var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
                            var dependent_exit = MaterialArray.findIndex(obj => obj.SetRelation == dataFromTheRow.SequenceNo);
                            if (dependent_exit > 0) {
                                $('#UserConfirmationforStartDate').modal('show');
                            } else {
                                selectedrowsequnce = dataFromTheRow.SequenceNo;
                                ParentSubGridId = dataFromTheRow.SequenceNo;

                                cancelbutton();

                            }

                        }
                    }
                }

            }


        } else {
            sort = false;
            alert('Please click on refresh button for sorting the records based on dependancy');

        }
    } else {

        alert('There is a circle dependency observed for the below marked milestones');
    }
    alldata = pmugridData;
}

$('#ChangeDate').on('click', function (e) {

    setrelationchanged = false;
    DatesPapulationflage = 'Yes';
    startDatepapulation();
});

$('#EndNoButton').on('click', function () {
    //condition for check the checkbox when unselect the check box and click on cancel 
    if (unselectSubMilestone) {
        var SubGridRowId = parseInt(EnddatechangedRowId);
        unselectSubMilestone = false;
    } else {

        var SubGridRowId = EnddatechangedRowId;

    }
    rowid = selectedrowsequnce;
    if (newStr != '') {
        var dataFromTheRow_Sub = jQuery('#' + newStr).jqGrid('getRowData', SubGridRowId);
        var Selected_SubGRID = jQuery('#' + newStr).jqGrid('getGridParam', 'data');
        var selectedmilestoneId = dataFromTheRow_Sub.SubMilestoneId;
        var seqNo = dataFromTheRow_Sub.SequenceNo;
    }
    //About subgrids
    if (newSubGridrow) {
        //when creating new subgrid 
        if (SubGridSelected) {


            var objIndex = Selected_SubGRID.findIndex(obj => obj.SubMilestoneId == dataFromTheRow_Sub.SubMilestoneId);
            Selected_SubGRID[objIndex].Action = '';
            $('#checkbox_' + selectedmilestoneId).prop('checked', false);
            $("#" + selectedmilestoneId + "start_date").val('');
            $("#" + selectedmilestoneId + "end_date").val('');
            $("#" + selectedmilestoneId + "mapperUser").val('');
            $("#" + selectedmilestoneId + "SubRemarks").val('');
            $("#" + selectedmilestoneId + "mapperUser").val('');
            objIndex = Selected_SubGRID.findIndex(obj => obj.SubMilestoneId == selectedmilestoneId);
            Selected_SubGRID[objIndex].Action = '';
            Selected_SubGRID[objIndex].StartDate = '';
            Selected_SubGRID[objIndex].EndDate = '';
            Selected_SubGRID[objIndex].UserId = '';
            Selected_SubGRID[objIndex].UserName = '';
            Selected_SubGRID[objIndex].Remarks = '';
            newSubGridrow = false;
            SubGridSelected = false;
        } else {
            var objIndex = Selected_SubGRID.findIndex(obj => obj.SubMilestoneId == dataFromTheRow_Sub.SubMilestoneId);
            Selected_SubGRID[objIndex].Action = 'true';
            $('#checkbox_' + selectedmilestoneId).prop('checked', true);
            $("#" + selectedmilestoneId + "start_date").val(prevSubGridStartDate);
            $("#" + selectedmilestoneId + "end_date").val(prevSubGridEndDate);
            $("#" + selectedmilestoneId + "mapperUser").val(prevSubGridmapperUser);
            $("#" + selectedmilestoneId + "SubRemarks").val(prevSubGridSubRemarks);
            $("#" + selectedmilestoneId + "mapperUserid").val(prevSubGridmapperUserid);
            $("#" + selectedmilestoneId + "SetRelation").val(prevSubGridSetrelation);

            objIndex = Selected_SubGRID.findIndex(obj => obj.SubMilestoneId == selectedmilestoneId);
            Selected_SubGRID[objIndex].Action = 'true';
            Selected_SubGRID[objIndex].StartDate = prevSubGridStartDate;
            Selected_SubGRID[objIndex].EndDate = prevSubGridEndDate;
            Selected_SubGRID[objIndex].UserId = prevSubGridmapperUserid;
            Selected_SubGRID[objIndex].UserName = prevSubGridmapperUser;
            Selected_SubGRID[objIndex].Remarks = prevSubGridSubRemarks;
            Selected_SubGRID[objIndex].SetRelation = prevSubGridSetrelation;

            newSubGridrow = false;
        }
        for (var i = 0; i < TotalSubGridData.length; i++) {
            var index = TotalSubGridData[i].findIndex(obj => obj.SubMilestoneId == selectedmilestoneId);
            if (index != -1) {
                TotalSubGridData[i] = Selected_SubGRID;
                break;
            }
        }
        SubGridsortingrecord(newStr);
        SubChangeDate('1', seqNo, newStr);
        
    } else {


        if (Datachange_SubgRID) {
            $('#checkbox_' + dataFromTheRow_Sub.SubMilestoneId).prop('checked', true);
            $('#' + dataFromTheRow_Sub.SubMilestoneId + 'end_date').val(PrevEnddate_SubGRID);

            $('#' + dataFromTheRow_Sub.SubMilestoneId + 'start_date').val(prevSubGridStartDate);
            $('#' + dataFromTheRow_Sub.SubMilestoneId + 'SetRelation').val(prevSubGridSetrelation);
            for (var prevdata = 0; prevdata < TotalSubGridData.length; prevdata++) {
                var index = TotalSubGridData[prevdata].findIndex(obj => obj.SubMilestoneId == dataFromTheRow_Sub.SubMilestoneId);
                if (index != -1) {
                    TotalSubGridData[prevdata][index].EndDate = PrevEnddate_SubGRID;
                    TotalSubGridData[prevdata][index].SetRelation = prevSubGridSetrelation;
                    TotalSubGridData[prevdata][index].Action = 'true';
                }
            }
            Datachange_SubgRID = false;
        } else {

            $('#' + rowid + 'Duration').val(beforeDuration);
            $('#' + rowid + 'end_date').val(prevEndDate);
            var cancelupdateindex = pmugridData.findIndex(obj => obj.SequenceNo == selectedrowsequnce);
            pmugridData[cancelupdateindex].EndDate = prevEndDate;
            pmugridData[cancelupdateindex].Duration = beforeDuration;
        }
    }
})

function startDatepapulation() {
    //enddatepapulation_Sub();

    var Subdependency = '';
    rowid = selectedrow;
    $('#jqgrid tbody tr').each(function (index, e) {


        if ($(e).find("td:nth-child(5)").text() == selectedrow) {
            rowid = $(this).closest("tr").attr("id");
        }
    });
    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
    if (($('#jqg_jqgrid_' + rowid).prop('checked') == true)) {
        if (newStr != '' && dataFromTheRow.SubmilestoneExit == 'True') {
            var selectedSubMilestone_id = jQuery('#' + newStr).jqGrid('getRowData', EnddatechangedRowId);
            for (var Sub = 0; Sub <= TotalSubGridData.length - 1; Sub++) {
                var index = TotalSubGridData[Sub].findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);
                if (index != -1) {
                    break
                }
            }
            Subdependency = TotalSubGridData[Sub].findIndex(obj => obj.SetRelation.split(',').includes(selectedSubMilestone_id.SubMilestoneId.toString()));

        }

        var dependent_exit = MaterialArray.findIndex(obj => obj.SetRelation == dataFromTheRow.SequenceNo);
        if (dependent_exit > 0 || Subdependency > 0) {


            var rowindex = 0;
            for (let days of pmugridData) {
                for (var i = 1; i <= pmugridData.length; i++) {
                    if (($('#jqg_jqgrid_' + i).prop('checked') == true)) {

                        var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);

                        var sd = $("#" + dataFromTheRow.SequenceNo + "start_date").val();

                        if (days.MilestoneName == dataFromTheRow.MilestoneName) {

                            rowindex++;
                            if (($('#jqg_jqgrid_' + rowid).prop('checked') == true)) {

                                var startdatechange = moment(sd, 'DD/MM/YYYY');
                                var Enddate = '';
                                if (setrelationchanged) {//this false while change the duration after set 
                                    Enddate = moment(startdatechange).add(days.Duration, 'days').format('DD/MM/YYYY');

                                } else {
                                    Enddate = moment(startdatechange).add(days.Duration - 1, 'days').format('DD/MM/YYYY');

                                }
                                var TotalDuration = '';
                                var FinalData = '';
                                var gridid = '';
                                $.each(subgrid_table_id, function (i, obj) {

                                    var gridrowid = subgrid_table_id[i].split('_');
                                    if (gridrowid[1] == rowid) {
                                        gridid = subgrid_table_id[i]
                                    }
                                });



                                if (dataFromTheRow.SubmilestoneExit == 'True') {

                                    for (var i = 0; TotalSubGridData.length > 0; i++) {
                                        var Filter_Data = TotalSubGridData[i].filter(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);
                                        if (Filter_Data.length > 0) {
                                            break;
                                        }
                                    }
                                    var SubGrid_SelectedData = Filter_Data.filter(obj => obj.Action == 'true');
                                    if (SubGrid_SelectedData.length > 0) {

                                        var datenew = '';
                                        if (comingSubGrid) {
                                            var SubGridrowdata = $('#' + gridid).jqGrid('getRowData', EnddatechangedRowId);
                                            var Setrelation = $('#' + SubGridrowdata.SubMilestoneId + 'SetRelation').val();
                                            if (Setrelation != '0') {
                                                var newdate = $('#' + Setrelation + 'end_date').val();
                                                datenew = moment(newdate, 'DD/MM/YYYY');
                                                datenew = moment(datenew).add(1, 'days').format('DD/MM/YYYY');
                                            } else {
                                                var newdate = $('#' + SubGridrowdata.SubMilestoneId + 'start_date').val();
                                                datenew = newdate;
                                            }


                                            FinalData = SubGridDatesDisplay(EnddatechangedRowId, gridid, dataFromTheRow.SequenceNo, datenew);
                                            SubGridDatedisplaycount++
                                            comingSubGrid = false;
                                        } else {
                                            FinalData = SubGridDatesDisplay(0, gridid, dataFromTheRow.SequenceNo, sd);
                                            SubGridDatedisplaycount++
                                            DurationchangedSubGrid = false;

                                        }

                                        Enddate = FinalData.newDate;
                                        TotalDuration = FinalData.Duration;
                                        $("#" + dataFromTheRow.SequenceNo + "Duration").val(TotalDuration);

                                        objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));

                                        MaterialArray[objIndex].Duration = TotalDuration;
                                        objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
                                        pmugridData[objIndex].Duration = TotalDuration;
                                    }
                                }

                                if (Enddate != 'Invalid date') {
                                    $("#" + dataFromTheRow.SequenceNo + "end_date").val(Enddate);
                                    $("#" + dataFromTheRow.SequenceNo + "end_date").datepicker("setDate", Enddate);
                                    objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
                                    pmugridData[objIndex].EndDate = Enddate;
                                    pmugridData[objIndex].StartDate = sd;

                                    objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
                                    MaterialArray[objIndex].EndDate = Enddate;
                                    MaterialArray[objIndex].StartDate = sd;
                                }

                            }

                            var nextRowId = parseInt(rowid) + 1;
                            var nextSequncerow = parseInt(changedmilestoneId) + 1;

                            if (($('#jqg_jqgrid_' + nextRowId).prop('checked') == true)) {
                                var setrelationDate = '';

                                var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', nextRowId);
                                if (dataFromTheRow.MilestoneStatus != 'Completed') {
                                    //if (rowindex != DurationList.length) {

                                    var SetRelation = $("#" + dataFromTheRow.SequenceNo + "SetRelation").val();

                                    if (SetRelation != undefined) {
                                        SetRelation = SetRelation.split(',');
                                    }
                                    //finding Highest date for multiple Setrelations
                                    var LastDate = [];
                                    $.each(SetRelation, function (i, obj) {

                                        var mulIndex = pmugridData.findIndex(obj => obj.SequenceNo == SetRelation[i]);
                                        var highestEndDate = pmugridData[mulIndex].EndDate;
                                        if (highestEndDate != '' && highestEndDate != null) {

                                            var nextenddate = new Date(highestEndDate.split("/").reverse().join("-"));
                                            LastDate.push(new Date(nextenddate));
                                        }
                                    })
                                    var highestDate = new Date(Math.max.apply(null, LastDate));
                                    //var highestDate = data[data.length - 1].EndDate;

                                    highestDate = moment(highestDate).format('DD/MM/YYYY');



                                    FindRowIDsequnce = Math.max.apply(Math, SetRelation);

                                    //setrelationDate = $("#" + FindRowIDsequnce + "end_date").val();
                                    setrelationDate = highestDate
                                    var SetRelation_ExtraDays = $("#" + FindRowIDsequnce + "ExtraDays").val();

                                    var nextStartDate = new Date(setrelationDate.split("/").reverse().join("-"));
                                    var newDate = '';
                                    if (SetRelation_ExtraDays) {
                                        newDate = moment(nextStartDate).add(parseInt(SetRelation_ExtraDays) + 1, 'days').format('DD/MM/YYYY');

                                    } else {
                                        newDate = moment(nextStartDate).add(1, 'days').format('DD/MM/YYYY');

                                    }

                                    if (newDate != 'Invalid date') {

                                        $("#" + dataFromTheRow.SequenceNo + "start_date").val(newDate);
                                        $("#" + dataFromTheRow.SequenceNo + "start_date").datepicker("setDate", newDate);


                                        objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
                                        pmugridData[objIndex].StartDate = newDate;
                                        objIndex = MaterialArray.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
                                        MaterialArray[objIndex].StartDate = newDate;
                                    }


                                }
                                //}

                            } else {
                                //changedmilestoneId++;
                                rowid++;
                                //i = changedmilestoneId;
                                break;
                            }


                            sd = $("#" + nextRowId + "start_date").val();

                            //  changedmilestoneId++;
                            rowid++;


                        }
                    } else {
                        break;
                    }
                }
            }
        }
        else {
            //if (subgrid_table_id.length != SubGridDatedisplaycount) {

            //    FinalData = SubGridDatesDisplay(rowid, subgrid_table_id[SubGridDatedisplaycount], 'start_date', $("#" + dataFromTheRow.SequenceNo + "start_date").val());
            //    SubGridDatedisplaycount++
            //}
            if (dataFromTheRow.SubmilestoneExit == 'True') {
                console.log('gridid', gridid);
                FinalData = SubGridDatesDisplay(rowid, subgrid_table_id[SubGridDatedisplaycount], 'start_date', $("#" + dataFromTheRow.SequenceNo + "start_date").val());
                SubGridDatedisplaycount++

                Enddate = FinalData.newDate;
                var DurationIndex = pmuFirstData.findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);

                if (Enddate == 'Invalid date') {
                    var StartDate = $('#' + dataFromTheRow.SequenceNo + 'start_date').val();
                    var rowenddate = new Date(StartDate.split("/").reverse().join("-"));
                    var newDate = moment(rowenddate).add(parseInt(pmuFirstData[DurationIndex].Duration) - 1, 'days').format('DD/MM/YYYY');

                    $('#' + dataFromTheRow.SequenceNo + 'end_date').val(newDate);
                    pmugridData[DurationIndex].StartDate = StartDate;
                    pmugridData[DurationIndex].EndDate = newDate;

                } else {


                    TotalDuration = FinalData.Duration;
                    $("#" + dataFromTheRow.SequenceNo + "Duration").val(TotalDuration);
                    $("#" + dataFromTheRow.SequenceNo + "end_date").val(Enddate);
                    pmugridData[DurationIndex].Duration = TotalDuration;
                    pmugridData[DurationIndex].EndDate = Enddate;
                    if (dataFromTheRow.SequenceNo == '1') {
                        pmugridData[DurationIndex].StartDate = $('#' + dataFromTheRow.SequenceNo + 'start_date').val();

                    }
                }
            } else {
                var index = pmugridData.findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);
                var startdate = $('#' + dataFromTheRow.SequenceNo + 'start_date').val();
                var rowenddate = new Date(startdate.split("/").reverse().join("-"));
                var Duration = $("#" + dataFromTheRow.SequenceNo + "Duration").val();
                var newDate = moment(rowenddate).add(parseInt(Duration) - 1, 'days').format('DD/MM/YYYY');

                $('#' + dataFromTheRow.SequenceNo + 'end_date').val(newDate);
                pmugridData[index].StartDate = startdate;
                pmugridData[index].EndDate = newDate;
            }
        }
    }

    //HightLight update dates rows
    HighlightUpdatedDaterows();

}


function SubGridDatesDisplay(rowid, subgrid_table_id, StartDateid, newDate) {


    var rowidList = $("#" + subgrid_table_id).getDataIDs();
    var j = parseInt(rowid) - 1;
    var SubGridData = [];
    var StartDate = '';
    SubGridData = $('#' + subgrid_table_id).jqGrid('getGridParam', 'data');
    var SubmainGridData = jQuery('#' + subgrid_table_id).jqGrid('getRowData', rowid);

    var FirstStartDate = newDate;
    StartDate = newDate;
    var index = 0;
    if (rowid == 0) {
        index = 0;

    } else {
        var mainGridData = jQuery('#' + subgrid_table_id).jqGrid('getRowData', rowid);
        index = SubGridData.findIndex(obj => obj.SubMilestoneId == mainGridData.SubMilestoneId)

    }

    for (var Sub = index; Sub < SubGridData.length; Sub++) {
        if (SubGridData[Sub].Action == 'true') {


            if (StartDate != '') {
                SubGridData[Sub].StartDate = StartDate;
                //StartDate = ''
            } else {
                var SetRelation = SubGridData[Sub].SetRelation.split(',');
                //finding Highest date for multiple Setrelations
                var LastDate = [];
                $.each(SetRelation, function (i, obj) {

                    var mulIndex = SubGridData.findIndex(obj => obj.SubMilestoneId == SetRelation[i]);
                    if (mulIndex != -1) {
                        var highestEndDate = SubGridData[mulIndex].EndDate;

                    } else {
                        var highestEndDate = SubGridData[0].EndDate;
                    }
                    if (highestEndDate != '' && highestEndDate != null) {

                        var nextenddate = new Date(highestEndDate.split("/").reverse().join("-"));
                        LastDate.push(new Date(nextenddate));
                    }
                })
                var highestDate = new Date(Math.max.apply(null, LastDate));
                //var highestDate = data[data.length - 1].EndDate;

                highestDate = moment(highestDate).format('DD/MM/YYYY');

                StartDate = highestDate;
                var nextStartDate = new Date(StartDate.split("/").reverse().join("-"));

                var newDate = moment(nextStartDate).add(1, 'days').format('DD/MM/YYYY');

                SubGridData[Sub].StartDate = newDate;
                StartDate = SubGridData[Sub].StartDate;

            }
            var durationAddedenddate = ''
            var nextStartDate = new Date(StartDate.split("/").reverse().join("-"));
            if (SubGridData[Sub].Duration == 0) {
                durationAddedenddate = moment(nextStartDate).add(SubGridData[Sub].Duration, 'days').format('DD/MM/YYYY');
                EndDatechange_Sub = false;
            } else {
                durationAddedenddate = moment(nextStartDate).add(SubGridData[Sub].Duration - 1, 'days').format('DD/MM/YYYY');
            }

            SubGridData[Sub].EndDate = durationAddedenddate;
            StartDate = '';
        }

    };
    for (var i = 0; i < TotalSubGridData.length; i++) {
        var data = TotalSubGridData[i];
        var index = data.findIndex(obj => obj.SequenceNo == SubGridData[0].SequenceNo);
        if (index != -1) {
            TotalSubGridData[i] = SubGridData;
            break
        }
    }

    var data = [];
    data.push(SubGridData[0]);
    for (var i = 0; i < SubGridData.length; i++) {
        if (data.length > i) {
            var filterData = $.grep(SubGridData, function (obj) {
                return obj.SetRelation == data[i].SubMilestoneId;
            });
        }
        data = $.merge(data, filterData);
    }

    function compareObjects(obj1, obj2) {
        return obj1.SubMilestoneId === obj2.SubMilestoneId;
    }

    // Find the difference between array2 and array1
    var diff = $.grep(SubGridData, function (item2) {
        return $.inArray(true, $.map(data, function (item1) {
            return compareObjects(item1, item2);
        })) === -1;
    });
    if (diff.length > 0) {
        //data.push(diff);
        data = $.merge(data, diff);

    }

    $.jgrid.gridUnload('#' + subgrid_table_id);
    CreateSubGrid(data, subgrid_table_id)

    SubGridsortingrecord(subgrid_table_id)
    var totalDuration = 0;

    var LastDate = [];
    ////Finding highest end date here

    data = data.filter(obj => obj.Action == 'true');
    var lasetSubMilestone = data[data.length - 1].SetRelation;
    var multipleSameSubmilestones = data.filter(obj => obj.SetRelation == lasetSubMilestone);
    $.each(multipleSameSubmilestones, function (i, obj) {

        var enddate = multipleSameSubmilestones[i].EndDate;
        if (enddate != '' && enddate != null) {

            var nextenddate = new Date(enddate.split("/").reverse().join("-"));
            LastDate.push(new Date(nextenddate));
        }
    })
    var highestDate = new Date(Math.max.apply(null, LastDate));
    //var highestDate = data[data.length - 1].EndDate;

    highestDate = moment(highestDate).format('DD/MM/YYYY');

    var StartingDate = new Date(SubGridData[0].StartDate.split("/").reverse().join("-"));
    var Finaldate = new Date(highestDate.split("/").reverse().join("-"));
    var timeDiff = Finaldate.getTime() - StartingDate.getTime();
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalDuration = daysDiff + 1;
    var FinalData = { newDate: highestDate, Duration: totalDuration, StartDate: FirstStartDate };

   
    return FinalData;
}




function CreateSubGrid(Data, subgrid_table_id) {
    $("#" + subgrid_table_id).jqGrid({
        url: '',
        datatype: 'local',
        data: Data,
        mtype: 'GET',
        colModel: colmodels,
        loadonce: true,
        viewrecords: true,
        sortable: false,

        // multiselect: true,
        rowNum: 1000,
        onCellSelect: function (rowid, ci, option, e) {

            fileuploadedrow = rowid;

            var grid = $(this);

            var status = $('#jqg_jqgrid_' + rowid).prop('checked');

            prevSubGridData(rowid, status, grid);


        },
        gridComplete: function () {
            var grid = $(this);
            $('#' + grid[0].id + ' tr').each(function (index, e) {

                if ($(e).find("td:nth-child(6)").text() == 'Completed') {
                    $(this).attr("class", "custom-class");

                }
            });

            for (var i = 0; i <= milestoneid_looping.length - 1; i++) {
                $("#" + grid[0].id + ' tbody tr').each(function (index, e) {


                    if ($(e).find("td:nth-child(4)").text() == milestoneid_looping[i]) {
                        $(e).closest('tr').children('td,th').css('background-color', 'orange');
                    }
                });
            }
            $('.datepickerS').datepicker({
                dateFormat: 'dd/mm/yy',
                autoclose: true,
                onSelect: function (e) {
                    var gridId = $(this).closest("table").attr("id");
                    SubChangeDate($(this).attr('data-id'), $(this).attr('id'), gridId);
                }
            });
            $('.datepickerE').datepicker({
                dateFormat: 'dd/mm/yy',
                autoclose: true,
                onSelect: function (e, inst) {
                    var gridId = $(this).closest("table").attr("id");
                    SubEndChangeDate($(this).attr('data-id'), $(this).attr('id'), gridId);
                }
            });



            LoadUser('SubmapperUser');
        },
        // loadComplete: function () {


        //     var $grid = subgrid_table_id
        //    // $("#jqgrid").jqGrid("setGridParam", { beforeSelectRow: function (rowid, e) { return $(e.target).is("input:checkbox"); } });
        //    var totalAmount = $grid.jqGrid('getCol', 'Amount', false, 'sum');
        //    $grid.jqGrid('footerData', 'set', { 'OrderQtyInPallets': "Total Amount $:" });
        //    $grid.jqGrid('footerData', 'set', { 'Amount': parseFloat($grid.jqGrid('getCol', 'Amount', false, 'sum')).toFixed(2) });
        //    $(".tamounteuro").text(parseFloat(totalAmount).toFixed(2));
        //    parseInt(totalAmount) !== 0 ? $(".tamountdlr").text(parseFloat(1 / totalAmount).toFixed(2)) : 0;

        //    //$('#loader').css('visibility', 'hidden');
        //}

    });


}

function prevSubGridData(rowid, status, grid) {
    var dataFromTheRow = jQuery('#' + grid[0].id).jqGrid('getRowData', rowid);
    var prevSubGridStartDate = $('#' + dataFromTheRow.SubMilestoneId + 'start_date').val();
    var prevSubGridEndDate = $('#' + dataFromTheRow.SubMilestoneId + 'end_date').val();
    var prevSubGridSetrelation = $('#' + dataFromTheRow.SubMilestoneId + 'SetRelation').val();
    var prevSubGridDuration = $('#' + dataFromTheRow.SubMilestoneId + 'SubGridDuration').val();


}

function SubGridselection(rowid, SubMilestoneId, gid) {

    var rowempty = true;
    selectedrowid = rowid;
    var SubGridId = gid.id;
    var objIndex = '';
    newStr = SubGridId;
    $('#EndNoButton').show();
    var rowData = $('#' + SubGridId).getRowData(rowid);
    var seqNo = rowData.SequenceNo;
    selectedrowsequnce = seqNo;
    selectedSubMilestone_id.SequenceNo = seqNo;
    EnddatechangedRowId = rowid;
    ParentSubGridId = rowData.SequenceNo;
    selectedmilestoneId = rowData.SubMilestoneId;
    beforeDuration = $('#' + seqNo + 'Duration').val();
    prevEndDate = $('#' + seqNo + 'end_date').val();
    var Setrelation = $('#' + selectedmilestoneId + 'SetRelation').val();
  
    var RelationType = $('#' + selectedmilestoneId + 'RelationType').val();
    var ParentIndex = pmugridData.findIndex(obj => obj.SequenceNo == seqNo);
    var ParentMilestoneMapped = pmugridData[ParentIndex].Action;
    for (var Sub = 0; Sub < TotalSubGridData.length; Sub++) {
        var Selected_SubGRID = TotalSubGridData[Sub].filter(obj => obj.SequenceNo == seqNo);
        if (Selected_SubGRID.length > 0) {
            break
        }
    }
    if (ParentMilestoneMapped == 'true') {


        var isSelected = $('#checkbox_' + selectedmilestoneId).prop('checked');
        objIndex = Selected_SubGRID.findIndex(obj => obj.SubMilestoneId == rowData.SubMilestoneId);


        if (isSelected == true) {
            SubGridSelected = isSelected;
            unselectSubMilestone = false;
            Selected_SubGRID[objIndex].Action = 'true';
            TotalSubGridData[Sub] = Selected_SubGRID;
            if (Setrelation === '') {
                $('#checkbox_' + selectedmilestoneId).prop('checked', false);

                alert('Please Enter Setrelation');
                return false;
            }

            if (selectedrowid == '1') {
                var ParentStartDate = $("#" + seqNo + "start_date").val();
                var ParentrowEndDate = $("#" + seqNo + "end_date").val();

                if (ParentStartDate != '') {
                    var SubGridDuration = $('#' + selectedmilestoneId + 'SubGridDuration').val();
                    $("#" + rowData.SubMilestoneId + "start_date").val(ParentStartDate);
                    var startdatechange = new Date(ParentStartDate.split("/").reverse().join("-"));
                    var Enddate = '';
                    Enddate = moment(startdatechange).add(parseInt(SubGridDuration) - 1, 'days').format('DD/MM/YYYY');
                    $("#" + rowData.SubMilestoneId + "end_date").val(Enddate);
                    $("#" + seqNo + "end_date").val(Enddate);
                    $("#" + seqNo + "Duration").val(SubGridDuration);
                    Selected_SubGRID[objIndex].StartDate = ParentStartDate;
                    Selected_SubGRID[objIndex].EndDate = Enddate;
                    var inde = pmugridData.findIndex(obj => obj.SequenceNo == seqNo);
                    pmugridData[inde].EndDate = Enddate;
                    pmugridData[inde].Duration = SubGridDuration;
                }
                Selected_SubGRID[objIndex].Action = 'true';
                TotalSubGridData[Sub] = Selected_SubGRID;
               
                SubGridsortingrecord(SubGridId);
                SubChangeDate(rowid, seqNo, SubGridId);
                return false;

            }
            //taking max setrelation when multiplr set relaion are there
           
            var relation = Setrelation.split(',');

           
             var data = $('#' + SubGridId).jqGrid('getGridParam', 'data');

            var areAllIdsTrue = relation.every(function (id) {
                var item = data.find(function (element) {
                    return element.SubMilestoneId == id;
                });
                return item && item.Action == 'true';
            });
            relation = Math.max.apply(Math, relation);
           // Setrelation = relation;
            console.log('areAllIdsTrue', areAllIdsTrue);
            if (Setrelation != undefined) {


                for (var i = 0; i <= data.length - 1; i++) {

                    if (data[i].SubMilestoneId == relation) {
                        
                        if (isSelected == true) {
                            if (!areAllIdsTrue) {

                                alert('Dependent Sub Milestones are not mapped ');
                                $('#checkbox_' + selectedmilestoneId).prop('checked', false);

                                Selected_SubGRID[objIndex].Action = '';

                                TotalSubGridData[Sub] = Selected_SubGRID;
                                break;
                            } else {

                                //objIndex = Selected_SubGRID.findIndex(obj => obj.SequenceNo == rowData.SequenceNo && obj.SubMilestoneName == rowData.SubMilestoneName);
                                //Selected_SubGRID[objIndex].Action = 'true';

                                var SetrelationSub = Setrelation.split(',');
                                var LastDate = [];
                                $.each(SetrelationSub, function (i, obj) {

                                    var mulIndex = data.findIndex(obj => obj.SubMilestoneId == SetrelationSub[i]);
                                    var highestEndDate = data[mulIndex].EndDate;
                                    if (highestEndDate != '' && highestEndDate != null && highestEndDate != undefined) {

                                        var nextenddate = new Date(highestEndDate.split("/").reverse().join("-"));
                                        LastDate.push(new Date(nextenddate));
                                    }
                                })
                                var highestDate = new Date(Math.max.apply(null, LastDate));
                                highestDate = moment(highestDate).format('DD/MM/YYYY');

                                objIndex = Selected_SubGRID.findIndex(obj => obj.SubMilestoneId == relation);
                                var relationenddate = highestDate;
                                var relationstartDate = Selected_SubGRID[objIndex].StartDate;

                                var selectedrowStartDate = $("#" + selectedmilestoneId + "start_date").val();
                                var selectedrowEndDate = $("#" + selectedmilestoneId + "end_date").val();

                                if (selectedrowStartDate == '' && selectedrowEndDate == '') {

                                    if (relationenddate != undefined && relationenddate != '' && relationenddate != 'Invalid date') {

                                        if (RelationType == 'SS ( Parallel )') {

                                            $("#" + selectedmilestoneId + "start_date").val(relationstartDate);
                                        } else {
                                            var Enddate = '';
                                            var startdatechange = new Date(relationenddate.split("/").reverse().join("-"));
                                            var startdate = moment(startdatechange).add(1, 'days').format('DD/MM/YYYY');
                                            $("#" + selectedmilestoneId + "start_date").val(startdate);
                                            st = startdate;
                                        }

                                        var Enddate = new Date(startdate.split("/").reverse().join("-"));
                                        var Duration = $("#" + selectedmilestoneId + "SubGridDuration").val();
                                        Enddate = moment(Enddate).add(Duration - 1, 'days').format('DD/MM/YYYY');
                                        $("#" + selectedmilestoneId + "end_date").val(Enddate);
                                        var gridid = '';

                                        $.each(subgrid_table_id, function (i, obj) {
                                            var gridrowid = subgrid_table_id[i].split('_');
                                            if (gridrowid[1] == rowid) {
                                                gridid = subgrid_table_id[i]
                                            }
                                        })
                                        var objIndex = Selected_SubGRID.findIndex(obj => obj.SubMilestoneId == selectedmilestoneId);
                                        Selected_SubGRID[objIndex].StartDate = startdate;
                                        Selected_SubGRID[objIndex].EndDate = Enddate;
                                        Selected_SubGRID[objIndex].Duration = Duration;
                                        $.jgrid.gridUnload('#' + SubGridId);

                                        CreateSubGrid(Selected_SubGRID, SubGridId);
                                        newSubGridrow = true;

                                        //$('#UserConfirmationforenddate').modal('show');


                                        var maingriddependatedata = pmugridData.filter(obj => obj.SetRelation == seqNo && obj.Action == 'true');
                                        var Subgriddependatedata = data.filter(obj => obj.SetRelation == selectedmilestoneId && obj.Action == 'true');
                                        if (maingriddependatedata.length > 0 || Subgriddependatedata.length > 0) {

                                            var parentindex_dependent = pmugridData.findIndex(obj => obj.SequenceNo == seqNo && obj.Action == 'true');

                                            DisplaySubGridValue = 'True';
                                            updatedStartDateDisplay = true;
                                            dependentMilestoneDetails(SelectedProjectId, pmugridData[parentindex_dependent].MilestoneId);

                                            var SubIndex = DependentSub_Milestones.findIndex(obj => obj.SubMilestoneId == rowData.SubMilestoneId);
                                            
                                            var UpdatedSetrelation = $('#' + rowData.SubMilestoneId + 'SetRelation').val();
                                            UpdatedSetrelation = UpdatedSetrelation.split(',');
                                            $.each(UpdatedSetrelation, function (i, obj) {

                                                var mulIndex = data.findIndex(obj => obj.SubMilestoneId == SetrelationSub[i]);
                                                var highestEndDate = data[mulIndex].EndDate;
                                                if (highestEndDate != '' && highestEndDate != null) {

                                                    var nextenddate = new Date(highestEndDate.split("/").reverse().join("-"));
                                                    LastDate.push(new Date(nextenddate));
                                                }
                                            })
                                            var highestDate = new Date(Math.max.apply(null, LastDate));
                                            highestDate = moment(highestDate).format('DD/MM/YYYY');
                                            var UpdatedEnddateSet = highestDate;
                                                //var UpdatedEnddateSet = $('#' + UpdatedSetrelation + 'end_date').val();
                                                var UpdatedSetrelationStartDate = new Date(UpdatedEnddateSet.split("/").reverse().join("-"));
                                                UpdatedSetrelationStartDate = moment(UpdatedSetrelationStartDate).add(1, 'days').format('DD/MM/YYYY');
                                                UpdatedStartDate_User = UpdatedSetrelationStartDate;
                                            
                                            var SubStartDate = new Date(UpdatedStartDate_User.split("/").reverse().join("-"));
                                            UpdatedEndDate_User = moment(SubStartDate).add(DependentSub_Milestones[SubIndex].Duration - 1, 'days').format('DD/MM/YYYY');
                                            if (dependentMilestoneDetailsList.length > 0) {
                                                displayUpdatedatesdetails(rowData.SubMilestoneId, SelectedProjectId, 'Dependentjqgridend');
                                            }

                                            $('#UserConfirmationforenddate').modal('show');
                                            // SubGridSelected = false
                                        } else {
                                            var LastDate = [];
                                            var Setrelation = $('#' + selectedmilestoneId + 'SetRelation').val();

                                            if (SubGridChanged) {
                                                var SubStartDate = $('#' + Setrelation + 'end_date').val();
                                                SubStartDate = new Date(SubStartDate.split("/").reverse().join("-"));
                                                SubStartDate = moment(SubStartDate).add(1, 'days').format('DD/MM/YYYY');
                                                $('#' + selectedmilestoneId + 'start_date').val(SubStartDate);
                                                SubGridChanged = false;

                                            } else {
                                                var SubStartDate = $('#' + selectedmilestoneId + 'start_date').val();

                                            }
                                            var nextStartDate = new Date(SubStartDate.split("/").reverse().join("-"));
                                            var SubDuration = $('#' + selectedmilestoneId + 'SubGridDuration').val();

                                            var newDate = moment(nextStartDate).add(SubDuration - 1, 'days').format('DD/MM/YYYY');
                                            $('#' + selectedmilestoneId + 'end_date').val(newDate);
                                            for (var SubGRID = 0; SubGRID <= TotalSubGridData.length - 1; SubGRID++) {
                                                var SubgridData = TotalSubGridData[SubGRID];
                                                var index = SubgridData.findIndex(obj => obj.SubMilestoneId == selectedmilestoneId);
                                                if (index != -1) {
                                                    TotalSubGridData[SubGRID][index].StartDate = SubStartDate;
                                                    TotalSubGridData[SubGRID][index].Duration = SubDuration;
                                                    TotalSubGridData[SubGRID][index].EndDate = newDate;
                                                    TotalSubGridData[SubGRID][index].SetRelation = Setrelation;

                                                    break;
                                                }

                                            }

                                            $.jgrid.gridUnload('#' + newStr);

                                            CreateSubGrid(SubgridData, newStr);
                                            SubGridsortingrecord(newStr);

                                            var Finaloutput = TotalSubGridData[SubGRID].filter(obj => obj.Action == 'true');
                                            var multipleLastSubMilestones = TotalSubGridData[SubGRID].filter(obj => obj.SetRelation == Finaloutput[Finaloutput.length - 1].SetRelation && obj.Action == 'true');

                                            $.each(multipleLastSubMilestones, function (i, obj) {

                                                var enddate = multipleLastSubMilestones[i].EndDate;
                                                if (enddate != '' && enddate != null) {

                                                    var nextenddate = new Date(enddate.split("/").reverse().join("-"));
                                                    LastDate.push(new Date(nextenddate));
                                                }
                                            })

                                            var Finaldate = new Date(Math.max.apply(null, LastDate));
                                            var Sub_StartDate = data[0].StartDate;
                                            var StartingDate = new Date(Sub_StartDate.split("/").reverse().join("-"));

                                            var timeDiff = new Date(Finaldate).getTime() - new Date(StartingDate).getTime();
                                            var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                                            totalDuration = daysDiff + 1;
                                            var parsedDate = moment(Finaldate, "DD/MM/YYYY");
                                            var parsedDate = moment(parsedDate, "ddd MMM DD YYYY HH:mm:ss ZZ");

                                            // Format the parsed date to "dd/mm/yyyy" format
                                            var formattedDate = parsedDate.format("DD/MM/YYYY");


                                            $('#' + seqNo + 'end_date').val(formattedDate);
                                            $('#' + seqNo + 'Duration').val(totalDuration);
                                            var indexparent = pmugridData.findIndex(obj => obj.SequenceNo == seqNo);
                                            pmugridData[indexparent].EndDate = formattedDate;
                                            pmugridData[indexparent].Duration = totalDuration;

                                        }


                                    }
                                } else {
                                    TotalSubGridData[Sub] = Selected_SubGRID;
                                }
                                // SubGridSelected = false;
                                break;

                            }


                        }
                    }

                }

            }


        } else {
            //functionality for unselect the Sub Milestones
            var SelectedData = Selected_SubGRID.filter(obj => obj.Action == 'true');
            var data = SelectedData.filter(obj => obj.SetRelation == selectedmilestoneId);
            if (data.length > 0) {
                alert('Please check whether the below sub milestone(s) are dependent on the current sub milestone');
                $('#checkbox_' + selectedmilestoneId).prop('checked', true);
            } else {

                //SubChangeDate(rowid, seqNo, SubGridId);

                Selected_SubGRID[objIndex].Action = '';
                TotalSubGridData[Sub] = Selected_SubGRID;
                prevSubGridStartDate = $('#' + selectedmilestoneId + 'start_date').val();
                prevSubGridEndDate = $('#' + selectedmilestoneId + 'end_date').val();
                prevSubGridSetrelation = $('#' + selectedmilestoneId + 'SetRelation').val();
                prevSubGridDuration = $('#' + selectedmilestoneId + 'SubGridDuration').val();
                prevSubGridmapperUser = $('#' + selectedmilestoneId + 'mapperUser').val();
                prevSubGridmapperUserid = $('#' + selectedmilestoneId + 'mapperUserid').val();
                prevSubGridSubRemarks = $("#" + selectedmilestoneId + "SubRemarks").val();
                PrevEnddate_SubGRID = prevSubGridEndDate;

                $('#checkbox_' + selectedmilestoneId).prop('checked', false);
                $("#" + selectedmilestoneId + "start_date").val('');
                $("#" + selectedmilestoneId + "end_date").val('');
                $("#" + selectedmilestoneId + "mapperUser").val('');
                $("#" + selectedmilestoneId + "SubRemarks").val('');
                $("#" + selectedmilestoneId + "mapperUser").val('');
                objIndex = Selected_SubGRID.findIndex(obj => obj.SubMilestoneId == selectedmilestoneId);
                Selected_SubGRID[objIndex].Action = '';
                Selected_SubGRID[objIndex].StartDate = '';
                Selected_SubGRID[objIndex].EndDate = '';
                Selected_SubGRID[objIndex].UserId = '';
                Selected_SubGRID[objIndex].UserName = '';
                Selected_SubGRID[objIndex].Remarks = '';
                TotalSubGridData[Sub] = Selected_SubGRID;
                //GETTING ERROR IF WE PASS THE
                // SubChangeDate('1', seqNo, SubGridId);
                SubGridSelected = false;
                if (rowid > 1) {
                    var unselectedrowid = rowid - 1;
                    SubChangeDate(unselectedrowid, seqNo, SubGridId);

                } else {
                    SubChangeDate(rowid, seqNo, SubGridId);

                }
                //EnddatechangedRowId = unselectedrowid;
                //Add for uncheck the sub grid check box annd click on cancel functionality
                newSubGridrow = true;
                unselectSubMilestone = true;
            }
        }

    } else {
        alert('Parent Milestone is not mapped');

        $('#checkbox_' + selectedmilestoneId).prop('checked', false);
        objIndex = Selected_SubGRID.findIndex(obj => obj.SubMilestoneId == selectedmilestoneId);
        Selected_SubGRID[objIndex].Action = '';
        TotalSubGridData[i] = Selected_SubGRID;

    }
    //gridreload issue
    $.jgrid.gridUnload('#' + SubGridId);

    CreateSubGrid(Selected_SubGRID, SubGridId);
    SubGridsortingrecord(SubGridId);
     //geting the Sub rowid after sort 

    $('#' + SubGridId + ' tbody tr').each(function (index, e) {


        if ($(e).find("td:nth-child(4)").text() == selectedmilestoneId) {
            EnddatechangedRowId = $(this).closest("tr").attr("id");
        }
    });
}



$('.CancelDate').on('click', function () {

    DatesPapulationflage = 'No';
    cancelbutton();
    $('#EndNoButton').show();
    CancelHighlighter = true;
    HighlightUpdatedDaterows();
});
function cancelbutton() {
    
    rowid = ParentSubGridId;

    $('#jqgrid tbody tr').each(function (index, e) {


        if ($(e).find("td:nth-child(5)").text() == ParentSubGridId) {
            rowid = $(this).closest("tr").attr("id");
        }
    });


    //For update the Sub grid row 
    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
    changedmaingrid_id = dataFromTheRow.SequenceNo;
    if (dataFromTheRow.SubmilestoneExit == 'True') {
        var SubGridRowId = EnddatechangedRowId;
        if (SubGridRowId != '') {

            var SubdataFromTheRow = jQuery('#' + newStr).jqGrid('getRowData', SubGridRowId);
            unionSelectedSubgrid_id = SubdataFromTheRow.SubMilestoneId;
            var SubGRIDDATA = jQuery('#' + newStr).jqGrid('getGridParam', 'data');
            var CurrentMilestone = SubGRIDDATA.findIndex(obj => obj.SubMilestoneId == SubdataFromTheRow.SubMilestoneId);
            if (SubGRIDDATA[CurrentMilestone].Action != '') {

                var Setrelation = $('#' + SubdataFromTheRow.SubMilestoneId + 'SetRelation').val();
                if (SubGridChanged && Setrelation !='0') {
                    var StartDate_Sub = $('#' + Setrelation + 'end_date').val();
                    var rowStartDate = new Date(StartDate_Sub.split("/").reverse().join("-"));

                    var newDate = moment(rowStartDate).add(1, 'days').format('DD/MM/YYYY');

                    StartDate_Sub = newDate;
                    SubGridChanged = false
                } else {

                    StartDate_Sub = $('#' + SubdataFromTheRow.SubMilestoneId + 'start_date').val()

                }
                var Duration_Sub = $('#' + SubdataFromTheRow.SubMilestoneId + 'SubGridDuration').val();
                var rowStartDate = new Date(StartDate_Sub.split("/").reverse().join("-"));
                var newDate = moment(rowStartDate).add(parseInt(Duration_Sub) - 1, 'days').format('DD/MM/YYYY');
                $("#" + SubdataFromTheRow.SubMilestoneId + "end_date").val(newDate);

                for (var SubGRID = 0; SubGRID < TotalSubGridData.length; SubGRID++) {
                    var index_Sub = TotalSubGridData[SubGRID].findIndex(obj => obj.SubMilestoneId == SubdataFromTheRow.SubMilestoneId);
                    if (index_Sub != -1) {
                        TotalSubGridData[SubGRID][index_Sub].StartDate = StartDate_Sub;
                        TotalSubGridData[SubGRID][index_Sub].Duration = Duration_Sub
                        TotalSubGridData[SubGRID][index_Sub].EndDate = newDate;
                        break
                    }
                }

               

                $.jgrid.gridUnload('#' + newStr);
                CreateSubGrid(TotalSubGridData[SubGRID], newStr);
                SubGridsortingrecord(newStr);

                var data = TotalSubGridData[SubGRID];
                var FirstStartDate = TotalSubGridData[SubGRID][0].StartDate;
                //UPDATING THE DURATION AFTER USER EXTANDED THE END DATE IN sUBgrid
                var totalDuration = 0;

                var LastDate = [];
                ////Finding highest end date here

                data = data.filter(obj => obj.EndDate != null && obj.Action == 'true');
                var lasetSubMilestone = data[data.length - 1].SetRelation;
                var multipleSameSubmilestones = data.filter(obj => obj.SetRelation == lasetSubMilestone && obj.Action == 'true');
                $.each(multipleSameSubmilestones, function (i, obj) {

                    var enddate = multipleSameSubmilestones[i].EndDate;
                    if (enddate != '' && enddate != null) {

                        var nextenddate = new Date(enddate.split("/").reverse().join("-"));
                        LastDate.push(new Date(nextenddate));
                    }
                })
                var highestDate = new Date(Math.max.apply(null, LastDate));
                //var highestDate = data[data.length - 1].EndDate;

                highestDate = moment(highestDate).format('DD/MM/YYYY');

                var StartingDate = new Date(FirstStartDate.split("/").reverse().join("-"));
                var Finaldate = new Date(highestDate.split("/").reverse().join("-"));
                var timeDiff = Finaldate.getTime() - StartingDate.getTime();
                var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                totalDuration = daysDiff + 1;

            } else {
                $("#" + SubdataFromTheRow.SubMilestoneId + "end_date").val('');
                $("#" + SubdataFromTheRow.SubMilestoneId + "start_date").val('');
                $("#" + SubdataFromTheRow.SubMilestoneId + "mapperUser").val('');
                $("#" + SubdataFromTheRow.SubMilestoneId + "mapperUserid").val('');

                $("#" + SubdataFromTheRow.SubMilestoneId + "SubRemarks").val('');
                for (var SubGRID = 0; SubGRID < TotalSubGridData.length; SubGRID++) {
                    var index_Sub = TotalSubGridData[SubGRID].findIndex(obj => obj.SubMilestoneId == SubdataFromTheRow.SubMilestoneId);
                    if (index_Sub != -1) {
                        TotalSubGridData[SubGRID][index_Sub].StartDate = '';
                        // TotalSubGridData[SubGRID][index_Sub].Duration = ''
                        TotalSubGridData[SubGRID][index_Sub].EndDate = '';
                        TotalSubGridData[SubGRID][index_Sub].Remarks = '';
                        TotalSubGridData[SubGRID][index_Sub].UserId = '';
                        TotalSubGridData[SubGRID][index_Sub].UserName = '';
                        break
                    }
                }
                $.jgrid.gridUnload('#' + newStr);
                CreateSubGrid(TotalSubGridData[SubGRID], newStr);
                var data = TotalSubGridData[SubGRID];
                var FirstStartDate = TotalSubGridData[SubGRID][0].StartDate;
                //UPDATING THE DURATION AFTER USER EXTANDED THE END DATE IN sUBgrid
                var totalDuration = 0;

                var LastDate = [];
                ////Finding highest end date here

                data = data.filter(obj => obj.Action=='true');
                var lasetSubMilestone = data[data.length - 1].SetRelation;
                var multipleSameSubmilestones = data.filter(obj => obj.SetRelation == lasetSubMilestone);
                $.each(multipleSameSubmilestones, function (i, obj) {

                    var enddate = multipleSameSubmilestones[i].EndDate;
                    if (enddate != '' && enddate != null) {

                        var nextenddate = new Date(enddate.split("/").reverse().join("-"));
                        LastDate.push(new Date(nextenddate));
                    }
                })
                var highestDate = new Date(Math.max.apply(null, LastDate));
                //var highestDate = data[data.length - 1].EndDate;

                highestDate = moment(highestDate).format('DD/MM/YYYY');

                var StartingDate = new Date(FirstStartDate.split("/").reverse().join("-"));
                var Finaldate = new Date(highestDate.split("/").reverse().join("-"));
                var timeDiff = Finaldate.getTime() - StartingDate.getTime();
                var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                totalDuration = daysDiff + 1;

            }
        }
    }

    //end 






    var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', rowid);
    if (newStr != '') {
        var SubGRIDDATA = jQuery('#' + newStr).jqGrid('getGridParam', 'data');

        if (EnddatechangedRowId == '1' && SubGRIDDATA[CurrentMilestone].Action == 'true') {
            $("#" + dataFromTheRow.SequenceNo + "start_date").val(StartDate_Sub);
            $("#" + dataFromTheRow.SequenceNo + "end_date").val(highestDate);
            $("#" + dataFromTheRow.SequenceNo + "Duration").val(totalDuration);

        }


        var StartDate = $("#" + dataFromTheRow.SequenceNo + "start_date").val();
        var SetRelation = $('#' + dataFromTheRow.SequenceNo + 'SetRelation').val();
        var ParentIndex = pmugridData.findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);
        var Index = pmugridData.findIndex(obj => obj.SequenceNo == SetRelation);
        if (Index != -1) {

            if (pmugridData[ParentIndex].SubmilestoneExit != 'True') {
                if (pmugridData[Index].ExtraDays > 0) {
                    StartDate = $("#" + SetRelation + "end_date").val();
                    var rowStartDate = new Date(StartDate.split("/").reverse().join("-"));
                    var newDate = moment(rowStartDate).add(parseInt(pmugridData[Index].ExtraDays) + 1, 'days').format('DD/MM/YYYY');
                    $("#" + dataFromTheRow.SequenceNo + "start_date").val(newDate);
                    StartDate = newDate;
                } else {
                    var StartDate = $("#" + dataFromTheRow.SequenceNo + "start_date").val();

                }
            } else {
                SubGRIDDATA = SubGRIDDATA.filter(obj => obj.Action == 'true');
                if (SubGRIDDATA.length > 0) {

                    var SubMilestoneId = SubGRIDDATA[SubGRIDDATA.length - 1].SubMilestoneId;
                    var StartDate = $("#" + SubMilestoneId + "end_date").val();
                } else {
                    var Setrelationdate = pmugridData[Index].EndDate;
                    var rowStartDate = new Date(Setrelationdate.split("/").reverse().join("-"));
                    var newDate = moment(rowStartDate).add(1, 'days').format('DD/MM/YYYY');
                    $("#" + dataFromTheRow.SequenceNo + "start_date").val(newDate);
                    $("#" + dataFromTheRow.SequenceNo + "Duration").val(pmugridData[ParentIndex].Duration);
                    var rowStartDate = new Date(newDate.split("/").reverse().join("-"));
                    newDate = moment(rowStartDate).add(parseInt(pmugridData[ParentIndex].Duration) - 1, 'days').format('DD/MM/YYYY');
                    StartDate = newDate;

                }

                //var rowStartDate = new Date(StartDate.split("/").reverse().join("-"));
                //var newDate = moment(rowStartDate).add(1, 'days').format('DD/MM/YYYY');
                $("#" + dataFromTheRow.SequenceNo + "end_date").val(highestDate);
                $("#" + dataFromTheRow.SequenceNo + "Duration").val(totalDuration);
                //HighlightUpdatedDaterows();
                return false;
            }
        } else {
            //for update the first parent milestone while extended the last end date 
            if (dataFromTheRow.SequenceNo == '1' && dataFromTheRow.SubmilestoneExit == 'True') {
                var SubGRIDDATA = jQuery('#' + newStr).jqGrid('getGridParam', 'data');
                SubGRIDDATA = SubGRIDDATA.filter(obj => obj.Action == 'true');
                var SubMilestoneId = SubGRIDDATA[SubGRIDDATA.length - 1].SubMilestoneId;
                var Setrelation = $("#" + SubMilestoneId + "SetRelation").val();

                var multipleSameSubmilestones = SubGRIDDATA.filter(obj => obj.SetRelation == lasetSubMilestone);
                $.each(multipleSameSubmilestones, function (i, obj) {

                    var enddate = multipleSameSubmilestones[i].EndDate;
                    if (enddate != '' && enddate != null) {

                        var nextenddate = new Date(enddate.split("/").reverse().join("-"));
                        LastDate.push(new Date(nextenddate));
                    }
                })
                var highestDate = new Date(Math.max.apply(null, LastDate));
                //var highestDate = data[data.length - 1].EndDate;

                highestDate = moment(highestDate).format('DD/MM/YYYY');

                var StartingDate = new Date(FirstStartDate.split("/").reverse().join("-"));
                var Finaldate = new Date(highestDate.split("/").reverse().join("-"));
                var timeDiff = Finaldate.getTime() - StartingDate.getTime();
                var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                totalDuration = daysDiff + 1;
                Finaldate = moment(Finaldate).format('DD/MM/YYYY');
                var StartDate = $("#" + SubMilestoneId + "end_date").val();
                $("#" + dataFromTheRow.SequenceNo + "end_date").val(Finaldate);
                $("#" + dataFromTheRow.SequenceNo + "Duration").val(totalDuration);
                //HighlightUpdatedDaterows();
                return false;

            }

        }
    } else {
        var StartDate = $("#" + dataFromTheRow.SequenceNo + "start_date").val();

    }
    var index = pmudetails.findIndex(obj => obj.SequenceNo == dataFromTheRow.SequenceNo);

    //displayDuration(newStr,1);
    var Duration = $("#" + dataFromTheRow.SequenceNo + "Duration").val();

    var rowenddate = new Date(StartDate.split("/").reverse().join("-"));
    //if (Duration > 1) {

    //} else {
    //    var newDate = moment(rowenddate).add(Duration, 'days').format('DD/MM/YYYY');
    //}
    var newDate = moment(rowenddate).add(Duration - 1, 'days').format('DD/MM/YYYY');

    $("#" + dataFromTheRow.SequenceNo + "end_date").val(newDate);

    objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
    pmugridData[objIndex].StartDate = StartDate;
    pmugridData[objIndex].EndDate = newDate;
    if (newStr != '') {
        SubGridsortingrecord(newStr);

    }


    //HighlightUpdatedDaterows();
}

$('#NoButton').on('click', function () {


    if (Datachange_SubgRID) {
        var SubGridRowId = EnddatechangedRowId;
        var SubdataFromTheRow = jQuery('#' + newStr).jqGrid('getRowData', SubGridRowId);

        $('#' + SubdataFromTheRow.SubMilestoneId + 'end_date').val(PrevEnddate_SubGRID);
        $('#' + SubdataFromTheRow.SubMilestoneId + 'SubGridDuration').val(PrevDuration_SubGRID)
        for (var SubGRID = 0; SubGRID < TotalSubGridData.length; SubGRID++) {
            var index_Sub = TotalSubGridData[SubGRID].findIndex(obj => obj.SubMilestoneId == SubdataFromTheRow.SubMilestoneId);
            if (index_Sub != -1) {
                TotalSubGridData[SubGRID][index_Sub].EndDate = PrevEnddate_SubGRID;
                TotalSubGridData[SubGRID][index_Sub].Duration = PrevDuration_SubGRID;

                break
            }
        }
        Datachange_SubgRID = false;

    } else {

        rowid = selectedrowsequnce;
        $('#' + rowid + 'start_date').val(prevStartDate);
        $('#' + rowid + 'end_date').val(prevEndDate);
        $('#' + rowid + 'Duration').val(beforeDuration);
        $('#' + rowid + 'SetRelation').val(beforesetrelation);
        var cancelupdateindex = pmugridData.findIndex(obj => obj.SequenceNo == selectedrowsequnce);
        pmugridData[cancelupdateindex].StartDate = prevStartDate;
        pmugridData[cancelupdateindex].EndDate = prevEndDate;
        pmugridData[cancelupdateindex].SetRelation = beforesetrelation;

        pmugridData[cancelupdateindex].Duration = beforeDuration;
    }
})



//for looping the milestone validation



function get_relations(row_id, visited_relations) {

    // cycle check
    // 16       []
    // 4        [16]
    // 100      [16, 4]
    // 55       [16, 4, 100]
    // 16       [16, 4, 100, 55]
    // alert('exe');
    //var dataFromTheRow = jQuery('#jqgrid').jqGrid('getRowData', row_id);

    //if ($('#jqg_jqgrid_' + row_id).prop('checked') == true) {

    if (visited_relations.includes(row_id)) {
        //alert('Cycle found with milestone id: ' + row_id + ' and its relations: ' + visited_relations);
        alert('There is circle dependency found between the milestones ' + row_id + ' and its relations are: ' + visited_relations);
        //$("#" + row_id + 'SetRelation').val('');
        milestoneid_looping = visited_relations;
        looping = false;
        return true;
    } else {
        looping = true;
    }
    // get relation id
    objIndex = MaterialArray.findIndex(obj => obj.SequenceNo == row_id);
    if (objIndex > 0) {
        var relation = MaterialArray[objIndex].SetRelation.split(',');

        var Setrelation = Math.max.apply(Math, relation);

        var relation_id = Setrelation;

    } else {
        return true;
    }
    //var relation_id = $("#" + dataFromTheRow.SequenceNo + 'SetRelation').val();

    // add row_id in visited_relations
    visited_relations.push(parseInt(row_id));
    get_relations(relation_id, visited_relations);

    return false;
};

$('#BtnClone').on('click', function () {

    // alert('hitted');
    var ProjectName = $("#ProjectId option:Selected").text();
    var projectId = $('#ProjectId').children(":selected").attr('value');
    $("#ToProjectId").val(projectId).trigger("change");
    $("#ToProjectId option:Selected").text(ProjectName);
    $("#FromProjectId").val('0').trigger("change");
    $('#addModal').modal('show');

})



$('#pendingforApprovalbtn').click(function () {
    $('#pendingApprovalmodel').modal('hide');
})

$('#btnTemplateAdd').click(function () {

    var TemplateId = $('#TemplateList').val();
    $('#loader').show();
    $('#loader').css('visibility', 'visible');
    $.ajax({
        url: ROOT + "Master/SelectedTemplateDetails",
        type: 'post',
        data: { TemplateId: TemplateId },
        dataType: 'JSON',
        success: function (result) {

            $(".projectName_error").hide();

            $('#addModal').modal('hide');
            searchresult = result;
            result.forEach(element => {

                if (element.StartDate != '' && element.EndDate != '') {
                    DurationList.push({
                        milestoneName: element.MilestoneName,
                        Duration: element.Duration,
                        MilestoneStatus: element.MilestoneStatus,
                        SetRelation: element.SetRelation

                    });
                }

            });
            ProjStatus = '';
            PMUFlag = result[0].Flag;

            pmugridData = result;
            $.each(pmugridData, function (i) {
                pmugridData[i].Status = '';
                pmugridData[i].MilestoneStatus = '';
                pmugridData[i].IsApproved = '';
                pmugridData[i].Remarks = '';
                pmugridData[i].FileName = '';
                pmugridData[i].StartDate = '';
                pmugridData[i].EndDate = '';
                pmugridData[i].UserName = '';
                pmugridData[i].UserId = '';
            })

            subgrid_table_id = [];
            TemplateSubGridDisplay = false;
            $("#jqgrid").jqGrid("clearGridData", true);
            $("#jqgrid").jqGrid('setGridParam', { data: pmugridData });

            $("#jqgrid").trigger('reloadGrid');

            // displayDuration();

            var rows = $("#jqgrid").getDataIDs();
            for (var i = 0; i < rows.length; i++) {
                var row_id = rows[i];
                var rowdata = $('#jqgrid').getRowData(row_id);
                if (rowdata.SubmilestoneExit == 'True') {

                    rowSequnce = rowdata.SequenceNo;
                    $("#jqgrid").expandSubGridRow(row_id);

                }

            }



            allData = $('#jqgrid').jqGrid('getGridParam', result);

            $('#selectedProjectName').val(ProjectName);
            $('#selectedProjectId').val(projectId);
            MaterialArray = [];
            var rows = $("#jqgrid").jqGrid('getGridParam', 'records');
            var j = 1
            for (var i = 0; i <= pmugridData.length - 1; i++) {

                if (pmugridData[i].Action == "true") {

                    $('#jqg_jqgrid_' + j).prop('checked', true);
                    if (($('#jqg_jqgrid_' + j).prop('checked') == true)) {

                        MaterialArray.push(pmugridData[i]);
                        $('body').addClass("menuitemshow");
                        $('#' + pmugridData[i].SequenceNo + 'mapperUserid').val(pmugridData[i].UserId);
                    }

                } else {
                    $('#jqg_jqgrid_' + j).prop('checked', false);
                }
                j++;

            }


            $('.datepickerS').datepicker({
                dateFormat: 'dd/mm/yy',
                autoclose: true,
                onSelect: function (e) {
                    ChangeDate($(this).attr('data-id'), $(this).attr('id'));
                }
            });
            $('.datepickerE').datepicker({
                dateFormat: 'dd/mm/yy',
                autoclose: true,
                onSelect: function (e) {
                    EndChangeDate($(this).attr('data-id'), $(this).attr('id'));
                }
            });

            LoadUser('mapperUser');
            $(".checkboxpmu").hide();
            //Sorting the records 
            sortingrecord();
            //display template related SubGrid Data
            DisplaySubGridData();
            $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
            $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
            var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
            if ($TableHeight > 278) {
                $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
                $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
            }
            else {
                $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");

            }
            //$('#loader').css('visibility', 'hidden');
        }
    });

});
function DisplaySubGridData() {

    var TemplateId = $('#TemplateList').val();
    var SubgridExitData = pmugridData.filter(function (item) {
        return item.SubmilestoneExit == 'True'
    });
    for (var i = 0; i < SubgridExitData.length; i++) {
        $('#loader').show();
        $('#loader').css('visibility', 'visible');

        $.ajax({
            url: ROOT + "Master/SelectedTemplatesubMilestoneDetails",
            type: 'post',
            async: false,
            data: { TemplateId: TemplateId, SequenceNo: SubgridExitData[i].SequenceNo },
            dataType: 'JSON',
            success: function (result) {
                var SubgridData = [];
                $.each(result, function (i, item) {
                    SubgridData.push({
                        SubMilestoneId: item.MilestoneId,
                        SubMilestoneName: item.MilestoneName,
                        Duration: item.Duration,
                        StartDate: '',
                        EndDate: '',
                        MilestoneStatus: '',
                        IsApproved: '',
                        RelationType: item.RelationType,
                        Remarks: '',
                        SequenceNo: item.SequenceNo,
                        SetRelation: item.SetRelation,

                    })
                })
                for (var j = 0; j < subgrid_table_id.length; j++) {
                    var GridId = subgrid_table_id[j].split('_');
                    var Seq = GridId[2].slice('1');
                    if (SubgridExitData[i].SequenceNo == Seq) {
                        $.jgrid.gridUnload('#' + subgrid_table_id[j]);

                        CreateSubGrid(SubgridData, subgrid_table_id[j]);
                        break;
                    }
                }

            }
        });
    }


}

$('#AccepptVersionCreation').change(function () {
    var cardddetailsProjectId = $("#ProjectId option:Selected").val();

    if ($(this).is(':checked')) {

        $.ajax({
            type: "post",
            url: ROOT + "Milestone/GetVersion",
            data: { ProjectId: cardddetailsProjectId },
            dataType: "json",
            success: function (response) {
                $('#Version').val(response);
                $('#VersionError').text('');
                $('#Versionchange').show();
                $('#VersionRemarks').val('');
                $('#VersionRemarkspop').modal('show');
            },
            error: function (err) {
                var filter
                alert(err.statusText);
            }
        });
    } else {
        $('#Versionchange').hide();
    }
});

$('#VersionAcept').click(function () {

    var version = $('#Version').val();
    if (version.length == 0) {
        $('#VersionError').text('Please enter the Version');
        $('#userconfirmationforversion').modal('show');
    } else {
        $('#userconfirmationforversion').modal('hide');
    }
})
$('#CancelVersion').click(function () {

    $('#userconfirmationforversion').modal('hide');
    $('#AccepptVersionCreation').prop('checked', false);
})





function FileUpload(rowid, event) {

    fileuploadedrow = rowid;
    var rowData = jQuery('#jqgrid').jqGrid('getRowData', rowid);
    var names3 = [];
    supportingdocfilenames3 = [];

    var array = ['pdf', 'doc', 'docx', 'xls', 'txt', 'xlsx', 'ppt', 'zip', 'jpg', 'jpeg', 'png', 'csv'];

    var length = 0;
    var text = [];

    text = $(`input[name=${rowid}file]`).get(0).files;
    var flag = true;



    $.each(text, function (index, value1) {

        var ext = value1.name.split('.').pop().toLowerCase()

        if (jQuery.inArray(ext, array) === -1) {

            alert("Please upload a valid file");

            $(`input[name=${rowId}file]`).val('');
            $('#' + rowData.SequenceNo + 'FileUpload').val('');
            flag = false;

            return false;

        }

    });

    if (flag) {


        //FileName = [];
        FileNamesList = [];
        for (var i = 0; i < $(`input[name=${rowid}file]`).get(0).files.length; i++) {

            names3.push($(`input[name=${rowid}file]`).get(0).files[i].size);

            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

            length += $(`input[name=${rowid}file]`).get(0).files[i].size / 1024;



            if (length < 5120) {

                supportingdocfilenames3.push($(`input[name=${rowid}file]`).get(0).files[i].name.toString());

            }

            else {

                alert('The file size should be less than 5 MB');

                $(`input[name=${rowid}file]`).get(0).val('');
                $('#' + rowData.SequenceNo + 'FileUpload').val('');
                // $(`#${rowId}COAdocshowfile`).attr('hidden', true);

                return false;

            }

            var supportfiles = [];
            var file1 = $(`input[name=${rowid}file]`).get(0).files[i];
            supportfiles.push(file1);
            MilestoneFilesList.push(rowData.MilestoneId);

            var str1 = $(`input[name=${rowid}file]`).get(0).files[i].name.toString().split('\\').pop();
            var str2 = rowData.MilestoneId;
            //var name = str2.concat(" ", str1);

            var strname = str2 + '' + str1;

            const newFile = new File(supportfiles, strname, { type: supportfiles.type });

            formData.delete(rowData.MilestoneId);
            formData.append('files', newFile);
            //formData.append(rowData.MilestoneId, newFile);
            var rowId = uploadedFiles.length;
            if (rowId == 0) {
                rowId = 1;
            }

            FileNamesList.push(strname);
            //var filenameindex = FileName.findIndex(obj => obj.MilestoneId == rowData.MilestoneId);
            //if (filenameindex == -1) {
            FileName.push({
                FileName: strname,
                MilestoneId: rowData.MilestoneId
            })
            //}

            rowId++;
        }
        var index = pmugridData.findIndex(obj => obj.SequenceNo == rowData.SequenceNo);
        //if (pmugridData[index].FileName != '') {

        //    var arraylist = pmugridData[index].FileName.split(',')
        //    for (var i = 0; i < arraylist.length; i++) {
        //        FileNamesList.push(arraylist[i]);
        //        /*FileNames.push(uploadedFiles[i].FileName);*/
        //    }
        //}

        pmugridData[index].FileName = FileNamesList.join(',');


    }

}

var counter = 0;
var Seq = '';


var deletefiledata = [];
$('#ToDeleteTheSelectedGridRow_Ok').on('click', function () {

    rowid = deletedrow
    var rowdata = jQuery('#jqgrid').jqGrid('getRowData', fileuploadedrow);
    var uploadedfilerowdata = jQuery('#FileUploadjqgrid').jqGrid('getRowData', rowid);

    var projectId = $('#ProjectId').children(":selected").attr('value');

    deletefiledata.push(uploadedfilerowdata);

    var DeletedFileName = uploadedfilerowdata.FileName;





    $.ajax({

        url: ROOT + 'Master/DeleteImageFile',

        type: 'POST',
        dataType: 'JSON',
        data: { fileName: DeletedFileName, ProjectId: projectId, MilestoneId: rowdata.MilestoneId, rowNo: uploadedfilerowdata.rowNo },

        success: function (result) {


            var filterdata = [];
            uploadedFiles = jQuery.grep(uploadedFiles, function (object) {
                return object.FileName != DeletedFileName;
            });
            filterdata = jQuery.grep(uploadedFiles, function (object) {
                return object.FileName != DeletedFileName;
            });
            if (filterdata.length == 0) {
                var pmudataindex = pmugridData.findIndex(obj => obj.SequenceNo == rowdata.SequenceNo);
                pmugridData[pmudataindex].FileName = '';
               // $('#' + rowdata.SequenceNo + 'DisplayIcons').hide();
                $('#' + rowdata.SequenceNo + 'viewuploadedfile').hide();
            }


            $("#FileUploadjqgrid").jqGrid("clearGridData", true);
            jQuery('#FileUploadjqgrid').jqGrid('setGridParam', { data: filterdata });
            jQuery('#FileUploadjqgrid').trigger('reloadGrid');
            //CreateJQGrid(uploadedFiles);
            CreateJQGridFile(uploadedFiles)
            $('#ToDeleteTheSelectedGridRow').modal('hide');

            $('#dependentMilestones').modal('show');
            objindex = pmugridData.findIndex(obj => obj.MilestoneId == rowdata.MilestoneId);
            FileNamesList = [];

            FileNamesList = pmugridData[objindex].FileName.split(',');
            DeletedFileName = '"' + DeletedFileName + '"';
            //var idx = $.inArray(DeletedFileName, FileNamesList);
            //if (idx == -1) {
            //    // FileNamesList.push(dataid);
            //    console.log('inside');
            //} else {
            //    FileNamesList.splice(idx, 1);
            //}
            FileNamesList = jQuery.grep(FileNamesList, function (object) {
                return object.trim() != DeletedFileName;
            });

            pmugridData[objindex].FileName = FileNamesList.join(',');

        }

    });

})


function deleteUploadedFile(rowid) {

    $('#ToDeleteTheSelectedGridRow').modal('show');

    deletedrow = rowid;
}

function DownloadUploadedImage(rowId) {

    var uploadedfilerowdata = jQuery('#FileUploadjqgrid').jqGrid('getRowData', rowId);

    var index = uploadedFiles.findIndex(obj => obj.FileName == uploadedfilerowdata.FileName);
    //FileName = uploadedFiles[index].FileName.replaceAll('"', '');
    if (uploadedFiles.FileName != '') {
        var FileName = uploadedFiles[index].FileName.replaceAll('"', '');
        $('#' + rowId + 'DownloadImageOrFile').attr("href", ROOT + "Master/DownloadPackageImageFile?fileName=" + FileName.trim());

        //$.ajax({

        //    url: ROOT + 'Master/DownloadPackageImageFile',

        //    type: 'POST',
        //    dataType: 'JSON',
        //    data: { fileName: FileName },

        //    success: function (result) {
        //        debugger
        //        window.open(URL.createObjectURL(result), '_blank');
        //        //if (result.endsWith(".pdf") ) {
        //        //    window.open(result, "_blank");
        //        //} else {
        //        //    window.location.href = result;
        //        //}
        //    }

        //});

        return true;
    }


}



//File uploade
function ViewUploadedImages(MilestoneId, rowId) {

    var projectId = $('#ProjectId').children(":selected").attr('value');
    fileuploadedrow = rowId;
    $.ajax({

        url: ROOT + 'Master/DisplayUploadedFiles',

        type: 'POST',
        dataType: 'JSON',
        data: { ProjectId: projectId, MilestoneId: MilestoneId },

        success: function (result) {

            //if (uploadedFiles.length > 0) {
            uploadedFiles = [];
            // FileNamesList = [];
            if (result.length > 0) {
                for (var i = 0; i <= result.length - 1; i++) {

                    uploadedFiles.push(result[i]);
                    // FileNamesList.push(result[i].FileName);

                }


            }

            var filterdata = [];
            //filterdata = jQuery.grep(deletefiledata, function (object) {
            //        return object.MilestoneId == MilestoneId;
            //});
            //Array.prototype.push.apply(uploadedFiles, filterdata);


            var filteredArray1 = $.grep(uploadedFiles, function (obj1) {
                return !$.grep(deletefiledata, function (obj2) {
                    return obj1.FileName == obj2.FileName;
                }).length;
            });

            $("#FileUploadjqgrid").jqGrid("clearGridData", true);
            jQuery('#FileUploadjqgrid').jqGrid('setGridParam', { data: filteredArray1 });
            jQuery('#FileUploadjqgrid').trigger('reloadGrid');
            //CreateJQGrid(uploadedFiles);
            CreateJQGridFile(uploadedFiles)
            $('#dependentMilestones').modal('show');
            //var pmufile = [];
            //for (var i = 0; i < filteredArray1.length; i++) {
            //    pmufile.push(filteredArray1[i].FileName);
            //}
            //var arraylist = $.grep(FileName, function (obj) {
            //    obj.MilestoneId == MilestoneId
            //});

            //$.each(arraylist, function (index, value) {
            //    pmufile.push(value.filename); // Push each element of array1 into array2
            //});
            //objindex = pmugridData.findIndex(obj => obj.MilestoneId == MilestoneId);
            //pmugridData[objindex].FileName = pmufile.join(',');

        }

    });


}

function CreateJQGridFile(data) {
    jQuery("#FileUploadjqgrid").jqGrid({
        datatype: 'local',
        data: data,
        colModel: filemodels,
        width: 1,
        rowNum: 10000,
        viewrecords: true,
        scroll: true,
        pager: '#FileUploadpager',
        gridComplete: function () {
            var objRows = $("#FileUploadjqgrid tbody tr");
            var objHeader = $("#FileUploadjqgrid tbody tr td");
            if (objRows.length > 1) {
                var objFirstRowColumns = $(objRows[1]).children("td");
                for (i = 0; i < objFirstRowColumns.length; i++) {
                    $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
                }
            }
        }
    });



    $("#FileUploadjqgrid").jqGrid('filterToolbar', {
        autosearch: true,
        // resizable: true,
        //width: 100,
        stringResult: true,
        searchOnEnter: false,
        defaultSearch: "cn"
    });

    $('.ui-jqgrid-bdiv').css({ 'max-height': '300px' });
    $('.ui-jqgrid-bdiv').children("div").css({ 'height': 'auto' });
    var $TableHeight = $(".ui-jqgrid-bdiv").find("tbody").height();
    if ($TableHeight > 278) {
        $(".ui-jqgrid").find(".ui-jqgrid-bdiv").css("overflow", "auto");
        $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "17px");
    }
    else {
        $(".m-table__responsive").find(".ui-jqgrid-htable").css("padding-right", "0px");

    }

}

filemodels = [

    {
        name: 'MilestoneId',
        label: 'Milestone Id',
        resizable: true,
        ignoreCase: true,
        hidden: true,
    },

    {
        name: 'RowId',
        label: 'RowId',
        resizable: true,
        ignoreCase: true,
        hidden: true,
        sortable: false,
    },

    {
        name: 'rowNo',
        label: 'Milestone No',
        width: 90,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        hidden: true,
    },

    {
        name: 'MilestoneName',
        resizable: true,
        width: 100,
        label: 'Milestone Name',
        ignoreCase: true,
        sortable: false,
        hidden: true

    },
    {
        name: 'FileName',
        resizable: true,
        width: 100,
        label: 'File Name',
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'UploadedBy',
        resizable: true,
        width: 100,
        label: 'Uploaded By',
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'UploadedDate',
        resizable: true,
        width: 100,
        label: 'Uploaded Date',
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'Action',
        label: 'Action',
        width: 50,
        resizable: true,
        ignoreCase: true,
        sortable: false,
        formatter: function (cellvalue, options, rowobject) {

            return '<div class="grid-icons-group -justify-center" id="' + options.rowId + 'DisplayIcons"><a href="javascript: void(0);" class="grid-icon-only Approveicon" onclick="DownloadUploadedImage(' + options.rowId + ')" class="icon_color text-success btn_button" title="Download" id="' + options.rowId + 'DownloadImageOrFile"><i class="fas fa-download"></i></a><a href="javascript: void(0);" class="grid-icon-only Rejecticon"  title="Delete"><i class="fas fa-trash" onclick="deleteUploadedFile(\'' + options.rowId + '\')"> </i></a></div>';

        }
    }

]

$('#btnok').click(function () {
    $('#dependentMilestones').modal('hide');
});
$('#CancelVersion').click(function () {
    $('#ToDeleteTheSelectedGridRow').modal('hide');
})

//About Subgrid
function ChangeSetRelationSubGrid(rowid, gid) {

    
    UpdatedSetrelation_display=true
    milestoneid_looping = '';
    var tableid = gid.id;
    var selectedSubMilestone_id = jQuery('#' + tableid).jqGrid('getRowData', rowid);
    newSubGridrow = true;
    SubGridChanged = true;
    unselectSubMilestone = true;
    chnagedSubgridDateId = selectedSubMilestone_id.SubMilestoneId;
    //getting prev data
    SubGridSelected = false;
    SubgridStartDatechanged = false;
    Setrelationchanged_sub = false;
    for (var i = 0; i < TotalSubGridData.length; i++) {
        var index = TotalSubGridData[i].findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_id.SubMilestoneId);
        if (index != -1) {
            prevSubGridSetrelation = TotalSubGridData[i][index].SetRelation;
        }
    }
    prevSubGridStartDate = $("#" + selectedSubMilestone_id.SubMilestoneId + "start_date").val();
    prevSubGridEndDate = $("#" + selectedSubMilestone_id.SubMilestoneId + "end_date").val();
    var SubGridData = $('#' + tableid).jqGrid('getGridParam', 'data');
    var changedSetrelation = $('#' + selectedSubMilestone_id.SubMilestoneId + 'SetRelation').val();
    EnddatechangedRowId = rowid;
    newStr = tableid;
    //checking multiple set relation are related to same subgrid here
    var multipleSetrelation = changedSetrelation.split(',');
    //if (multipleSetrelation.length > 0) {
    //    for (var i = 0; i < multipleSetrelation.length; i++) {
    //        var valueExists = SubGridData.findIndex(obj => obj.SubMilestoneId == multipleSetrelation[i]);

    //    }

    //}
    var valueExists = multipleSetrelation.every(multipleSetrelation => SubGridData.some(item => item.SubMilestoneId === multipleSetrelation));
    var index = SubGridData.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_id.SubMilestoneId);
    if (valueExists || changedSetrelation == '' || changedSetrelation == '0') {
        var areAllIdsTrue = multipleSetrelation.every(function (id) {
            var item = SubGridData.find(function (element) {
                return element.SubMilestoneId == id;
            });
            return item && item.Action == 'true';
        });


        if (changedSetrelation != '') {
            if (!areAllIdsTrue) {
                alert('Dependent Sub Milestones are not mapped ');
                $('#' + selectedSubMilestone_id.SubMilestoneId + 'SetRelation').val(SubGridData[index].SetRelation);
                return false
            }
        } else {

            var emptySetrelation_Data = SubGridData.filter(obj => obj.SetRelation == changedSetrelation);
            if (emptySetrelation_Data.length > 1) {
                alert('Please enter the valid set relation');
                $('#' + selectedSubMilestone_id.SubMilestoneId + 'SetRelation').val(prevSubGridSetrelation);
                return false;
            }
            

        }
    } else {
        alert('Please enter the valid set relation');

        var index = SubGridData.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_id.SubMilestoneId);
        $('#' + selectedSubMilestone_id.SubMilestoneId + 'SetRelation').val(prevSubGridSetrelation);
        return false;
    }


    if (multipleSetrelation.length > 0) {
        for (var i = 0; i < multipleSetrelation.length; i++) {
            var index = SubGridData.findIndex(obj => obj.SubMilestoneId == multipleSetrelation[i]);

        }

    }
    if (changedSetrelation == selectedSubMilestone_id.SubMilestoneId) {
        alert('Please enter the valid set relation');

        var index = SubGridData.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_id.SubMilestoneId);
        $('#' + selectedSubMilestone_id.SubMilestoneId + 'SetRelation').val(prevSubGridSetrelation);
        return false;
    }
    SubGridsortingrecord(tableid);
    var index = SubGridData.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_id.SubMilestoneId);
    SubGridData[index].SetRelation = multipleSetrelation.join(',');


    var ParentStartData = $('#' + selectedSubMilestone_id.SequenceNo + 'start_date').val();
    beforeDuration = $('#' + selectedSubMilestone_id.SequenceNo + 'Duration').val();
    prevEndDate = $('#' + selectedSubMilestone_id.SequenceNo + 'end_date').val();
    selectedrowsequnce = selectedSubMilestone_id.SequenceNo;
    $('#' + tableid).jqGrid("clearGridData", true);
    $('#' + tableid).jqGrid('setGridParam', { data: SubGridData });
    $('#' + tableid).trigger('reloadGrid');


    $('#' +tableid +' tbody tr').each(function (index, e) {


        if ($(e).find("td:nth-child(4)").text() == selectedSubMilestone_id.SubMilestoneId) {
            EnddatechangedRowId = $(this).closest("tr").attr("id");
        }
    });


    findloopingSubgrid(selectedSubMilestone_id.SubMilestoneId, [], tableid);
    if (looping) {


        var data = $.grep(SubGridData, function (obj) {
            return obj.SetRelation == '' || obj.SetRelation == '0';
        });
        if (data.length > 0) {

            //if (parseInt(changedSetrelation) > 8000) {
            var SubGridSelectedData = SubGridData.filter(obj => obj.Action=='true'); 

            for (var i = 0; i < SubGridData.length; i++) {
                if (data.length > i) {
                    var filterData = $.grep(SubGridSelectedData, function (obj) {
                        var multipleSetrelation = obj.SetRelation.split(',');
                        if ($.inArray(data[i].SubMilestoneId, multipleSetrelation) !== -1) {
                            return obj.SetRelation == data[i].SubMilestoneId;

                        }
                    });
                }
                data = $.merge(data, filterData);
            }
            var diffArray = $.grep(SubGridData, function (obj1) {
                return !data.some(function (obj2) {
                    return obj1.SubMilestoneId === obj2.SubMilestoneId;
                });
            });
            data = $.merge(data, diffArray);

            var uniqueData = $.grep(data, function (obj, index) {
                return index === $.inArray(obj, data);
            });

            $('#' + uniqueData[0].SubMilestoneId + 'start_date').val(ParentStartData);
            uniqueData[0].StartDate = ParentStartData;
            $('#' + tableid).jqGrid("clearGridData", true);
            $('#' + tableid).jqGrid('setGridParam', { data: uniqueData });
            $('#' + tableid).trigger('reloadGrid');



            for (var SubGrid = 0; SubGrid < TotalSubGridData.length; SubGrid++) {
                var index = TotalSubGridData[SubGrid].findIndex(obj => obj.SequenceNo == uniqueData[0].SequenceNo);
                if (index != -1) {
                    TotalSubGridData[SubGrid] = uniqueData;
                    break;
                }
            }



            //for dates update we are calling this method 
            var isSelected = $('#checkbox_' + selectedSubMilestone_id.SubMilestoneId).prop('checked');

            if (SubGridData[0].StartDate != null && isSelected == true) {
                //SubChangeDate('1', selectedSubMilestone_id.SequenceNo, tableid)
                SubChangeDate(rowid, selectedSubMilestone_id.SequenceNo, tableid);
                Setrelationchanged_sub = true;

            }
            looping = true;

        } else {
            alert('At least one SubMilestone SetRelation should be empty');
        }
    } else {
        for (var i = 0; i <= milestoneid_looping.length - 1; i++) {
            $("#" + tableid + ' tbody tr').each(function (index, e) {


                if ($(e).find("td:nth-child(4)").text() == milestoneid_looping[i]) {
                    $(e).closest('tr').children('td,th').css('background-color', 'orange');
                }
            });
        }
    }

    //if (SubGridData[0].StartDate != null && isSelected == true) {
    //    SubGridsortingrecord(tableid);
    //}
    SubGridsortingrecord(tableid);

    $('#' + tableid + ' tbody tr').each(function (index, e) {


        if ($(e).find("td:nth-child(4)").text() == selectedSubMilestone_id.SubMilestoneId) {
            EnddatechangedRowId = $(this).closest("tr").attr("id");
        }
    });
   
}

function findloopingSubgrid(row_id, visited_relations, tableid) {

    if (visited_relations.includes(row_id)) {
        alert('There is circle dependency found between the milestones ' + row_id + ' and its relations are: ' + visited_relations);
        milestoneid_looping = visited_relations;
        looping = false;
        return true;
    } else {
        looping = true;
    }
    // get relation id
    var data = $('#' + tableid).jqGrid('getGridParam', 'data');
    objIndex = data.findIndex(obj => obj.SubMilestoneId == row_id);
    if (objIndex != -1) {
        var relation = data[objIndex].SetRelation.split(',');

        var Setrelation = Math.max.apply(Math, relation);

        var relation_id = Setrelation;

    } else {
        return true;
    }

    visited_relations.push(row_id);
    findloopingSubgrid(relation_id, visited_relations, tableid);

    return false;
}

function matchedrecordsub(ele, tableid) {
    var SubGridData = $('#' + tableid).jqGrid('getGridParam', 'data');
    var dependedrows = SubGridData.filter(v => Math.max.apply(Math, v.SetRelation.split(',')) == ele);
    return dependedrows;
}

function SubGridsortingrecord(tableid) {
    var maindata = $('#' + tableid).jqGrid('getGridParam', 'data');
    var SubGridData = $('#' + tableid).jqGrid('getGridParam', 'data');
    //SubGridData = SubGridData.filter(obj => obj.Action == 'true');
    var result = [];
    if (looping) {
        //var SetrelationData = SubGridData.filter(obj => obj.Action == '' || obj.Action == '0');
        //$.merge(result, SetrelationData);

        result.push(SubGridData[0]);

        var selected_rows = [SubGridData[0].SubMilestoneId];

        while (selected_rows.length > 0) {
            var ele = selected_rows.shift();
            var selectedrows = matchedrecordsub(ele, tableid)
            Array.prototype.push.apply(result, matchedrecordsub(ele, tableid));

            $.each(selectedrows, function (i, obj) {
                selected_rows.push(selectedrows[i].SubMilestoneId);
            })

        }

        var diffArray = $.grep(result, function (element) {
            return $.inArray(element, maindata) === -1;
        }).concat($.grep(maindata, function (element) {
            return $.inArray(element, result) === -1;
        }));
        Array.prototype.push.apply(result, diffArray);
        var mappedrecords = result.filter(obj => obj.Action == 'true');
        var unmappedrecords = SubGridData.filter(obj => obj.Action == '' || obj.Action == null);
        Array.prototype.push.apply(mappedrecords, unmappedrecords);

        //gridreload issue
        $.jgrid.gridUnload('#' + tableid);

        CreateSubGrid(mappedrecords, tableid);

    } else {
        //alert('THERE IS CIRCLE DEPENDEANCY OBSERVED FOR THE BELOW MARKED MILESTONES');
        alert('There is a circle dependency observed for the below marked milestones');

    }
    return result;

}
var newStr = '';
var st = '';
var selectedSubMilestone_id = '';
var Pid = '';
//function for Sub grid start date change 
function SubChangeDate(rowid, Sequnce, subgrid_table) {
    

    var Pid = subgrid_table.split('_')
    Datachange_SubgRID = true;
    if (rowid == '1') {
        Subchange = false;
    } else {
        Subchange = true;
    }
    if (Setrelationchanged_sub) {
        SubgridStartDatechanged = true;
        Setrelationchanged_sub = true;

    }
    newStr = subgrid_table;
    var SubGRIDdATA = jQuery('#' + newStr).jqGrid('getGridParam', 'data');
    selectedSubMilestone_id = jQuery('#' + newStr).jqGrid('getRowData', rowid);
    unionSelectedSubgrid_id = selectedSubMilestone_id.SubMilestoneId;
    changedmilestoneId = selectedSubMilestone_id.SequnceNo;
    chnagedSubgridDateId = unionSelectedSubgrid_id;

    if (($('#checkbox_' + selectedSubMilestone_id.SubMilestoneId).prop('checked') == false)) {
        alert('Please select the checkbox');
        $("#" + selectedSubMilestone_id.SubMilestoneId + "start_date").val('');
        //objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
        //pmugridData[objIndex].StartDate = '';
        return false;
    }

    
  
    var ParentMilestone = pmugridData.findIndex(obj => obj.SequenceNo == selectedSubMilestone_id.SequenceNo);
    var ParentMilestoneMapped = pmugridData[ParentMilestone].Action;
    if (ParentMilestoneMapped == 'true') {
        for (var prev = 0; prev < TotalSubGridData.length; prev++) {
            var sub_index = TotalSubGridData[prev].findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_id.SubMilestoneId);
            if (sub_index != -1) {
                if (unselectSubMilestone) {
                    PrevEnddate_SubGRID = TotalSubGridData[prev][sub_index].EndDate;
                    PrevDuration_SubGRID = TotalSubGridData[prev][sub_index].Duration;
                    prevSubGridStartDate = TotalSubGridData[prev][sub_index].StartDate;
                } else {
                    prevSubGridStartDate = TotalSubGridData[prev][sub_index].StartDate;
                    PrevEnddate_SubGRID = TotalSubGridData[prev][sub_index].EndDate;
                    PrevDuration_SubGRID = TotalSubGridData[prev][sub_index].Duration;
                    prevSubGridSetrelation = TotalSubGridData[prev][sub_index].SetRelation;
                }
                break;
            }

        }

        st = $('#' + selectedSubMilestone_id.SubMilestoneId + 'start_date').val();
        //var st = $('#' + selectedSubMilestone_id.SubMilestoneId + 'start_date').val();
        //checking Start date is grater than The parent Setrelation Start Date
        var ParentIndex = pmugridData.findIndex(obj => obj.SequenceNo == selectedSubMilestone_id.SequenceNo);
        var ParentMilestone = pmugridData[ParentIndex].MilestoneId
        var Parent_Setrelation = pmugridData[ParentIndex].SetRelation;
        var ParentSetrelation_Index = pmugridData.findIndex(obj => obj.SequenceNo == Parent_Setrelation);
        if (Parent_Setrelation == '0') {
            var ParentSetRelation_StartDate = pmugridData[ParentIndex].StartDate;

        } else {
            var ParentSetRelation_StartDate = pmugridData[ParentSetrelation_Index].StartDate;

        }
        if (ParentSetRelation_StartDate != null) {

            ParentSetRelation_StartDate = ParentSetRelation_StartDate.split('/').join('-');
            //var Sub_StartDate = st.split('/').join('-');
            var Sub_StartDate = moment(st, 'DD-MM-YYYY');
            var ParentSetRelation_StartDate = moment(ParentSetRelation_StartDate, 'DD-MM-YYYY');
            if (Sub_StartDate != '') {

                if (ParentSetRelation_StartDate > Sub_StartDate) {
                    alert('For the selected milestone start date should be Greater than start date of dependent milestone.');

                    $('#' + selectedSubMilestone_id.SubMilestoneId + 'start_date').val(prevSubGridStartDate);

                    return false;
                }
            }

            if (st != '') {

                EnddatechangedRowId = rowid;//sUBgrid row id 

                ParentSubGridId = selectedSubMilestone_id.SequenceNo;//parent seq number 
                comingSubGrid = true;
                var maingriddependatedata = pmugridData.filter(obj => obj.SetRelation == selectedSubMilestone_id.SequenceNo && obj.Action == 'true');
                var Subgriddependatedata = SubGRIDdATA.filter(obj => obj.SetRelation == selectedSubMilestone_id.SubMilestoneId && obj.Action == 'true');
                if (maingriddependatedata.length > 0 || Subgriddependatedata.length > 0) {
                    DisplaySubGridValue = 'True';
                    updatedStartDateDisplay = true;
                    dependentMilestoneDetails(SelectedProjectId, ParentMilestone);

                    var SubIndex = DependentSub_Milestones.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_id.SubMilestoneId);
                    if (UpdatedSetrelation_display) {
                        var UpdatedSetrelation = $('#' + selectedSubMilestone_id.SubMilestoneId + 'SetRelation').val();
                        if (UpdatedSetrelation == '') {
                            var UpdatedEnddateSet = $('#' + selectedSubMilestone_id.SubMilestoneId + 'end_date').val();
                            //updating the set relation when sorting the setreation 

                            var StartingDate = new Date($('#' + selectedSubMilestone_id.SubMilestoneId + 'start_date').val().split("/").reverse().join("-"));
                            var Finaldate = new Date(UpdatedEnddateSet.split("/").reverse().join("-"));
                            var timeDiff = Finaldate.getTime() - StartingDate.getTime();
                            var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            totalDuration = daysDiff + 1;
                            $('#' + selectedSubMilestone_id.SubMilestoneId + 'SubGridDuration').val(totalDuration);
                            var index = SubGRIDdATA.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_id.SubMilestoneId);
                            SubGRIDdATA[index].Duration = totalDuration;
                            $.jgrid.gridUnload('#' + newStr);

                            CreateSubGrid(SubGRIDdATA, newStr);

                        } else {
                            var UpdatedEnddateSet = $('#' + UpdatedSetrelation + 'end_date').val();

                        }
                        var UpdatedSetrelationStartDate = new Date(UpdatedEnddateSet.split("/").reverse().join("-"));
                        UpdatedSetrelationStartDate = moment(UpdatedSetrelationStartDate).add(1, 'days').format('DD/MM/YYYY');
                        UpdatedStartDate_User = UpdatedSetrelationStartDate;
                        UpdatedSetrelation_display = false;
                    } else {
                        UpdatedStartDate_User = st;

                    }
                    var SubStartDate = new Date(UpdatedStartDate_User.split("/").reverse().join("-"));
                    UpdatedEndDate_User = moment(SubStartDate).add(DependentSub_Milestones[SubIndex].Duration-1, 'days').format('DD/MM/YYYY');
                    if (dependentMilestoneDetailsList.length > 0) {
                        displayUpdatedatesdetails(selectedSubMilestone_id.SubMilestoneId, SelectedProjectId, 'Dependentjqgridend');
                    }
                    newSubGridrow = false;
                    $('#UserConfirmationforenddate').modal('show');


                } else {
                    var LastDate = [];
                    var Setrelation = $('#' + selectedSubMilestone_id.SubMilestoneId + 'SetRelation').val();

                    if (SubGridChanged) {
                        var SubStartDate = $('#' + Setrelation + 'end_date').val();
                        SubStartDate = new Date(SubStartDate.split("/").reverse().join("-"));
                        SubStartDate = moment(SubStartDate).add(1, 'days').format('DD/MM/YYYY');
                        $('#' + selectedSubMilestone_id.SubMilestoneId + 'start_date').val(SubStartDate);
                        SubGridChanged = false;

                    } else {
                        var SubStartDate = $('#' + selectedSubMilestone_id.SubMilestoneId + 'start_date').val();

                    }
                    var nextStartDate = new Date(SubStartDate.split("/").reverse().join("-"));
                    var SubDuration = $('#' + selectedSubMilestone_id.SubMilestoneId + 'SubGridDuration').val();

                    var newDate = moment(nextStartDate).add(SubDuration - 1, 'days').format('DD/MM/YYYY');
                    $('#' + selectedSubMilestone_id.SubMilestoneId + 'end_date').val(newDate);
                    for (var SubGRID = 0; SubGRID <= TotalSubGridData.length - 1; SubGRID++) {
                        var SubgridData = TotalSubGridData[SubGRID];
                        var index = SubgridData.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_id.SubMilestoneId);
                        if (index != -1) {
                            TotalSubGridData[SubGRID][index].StartDate = SubStartDate;
                            TotalSubGridData[SubGRID][index].Duration = SubDuration;
                            TotalSubGridData[SubGRID][index].EndDate = newDate;
                            TotalSubGridData[SubGRID][index].SetRelation = Setrelation;

                            break;
                        }

                    }

                    $.jgrid.gridUnload('#' + newStr);

                    CreateSubGrid(SubgridData, newStr);

                    var Finaloutput = TotalSubGridData[SubGRID].filter(obj => obj.Action == 'true');
                    var multipleLastSubMilestones = TotalSubGridData[SubGRID].filter(obj => obj.SetRelation == Finaloutput[Finaloutput.length - 1].SetRelation && obj.Action == 'true');

                    $.each(multipleLastSubMilestones, function (i, obj) {

                        var enddate = multipleLastSubMilestones[i].EndDate;
                        if (enddate != '' && enddate != null) {

                            var nextenddate = new Date(enddate.split("/").reverse().join("-"));
                            LastDate.push(new Date(nextenddate));
                        }
                    })

                    var Finaldate = new Date(Math.max.apply(null, LastDate));
                    SubStartDate = SubgridData[0].StartDate;
                    var StartingDate = new Date(SubStartDate.split("/").reverse().join("-"));

                    var timeDiff = new Date(Finaldate).getTime() - new Date(StartingDate).getTime();
                    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    totalDuration = daysDiff + 1;
                    var parsedDate = moment(Finaldate, "DD/MM/YYYY");
                    var parsedDate = moment(parsedDate, "ddd MMM DD YYYY HH:mm:ss ZZ");

                    // Format the parsed date to "dd/mm/yyyy" format
                    var formattedDate = parsedDate.format("DD/MM/YYYY");


                    $('#' + selectedSubMilestone_id.SequenceNo + 'end_date').val(formattedDate);
                    $('#' + selectedSubMilestone_id.SequenceNo + 'Duration').val(totalDuration);


                }
                comingSubGrid = false;
            }

        }
    } else {
        alert('Parent Milestone is not mapped');

        $('#' + selectedSubMilestone_id.SubMilestoneId + 'start_date').val('');


    }
  
}

var SubGridId_end = '';
var PrevEnddate_SubGRID = '';
var PrevDuration_SubGRID = '';
function SubEndChangeDate(rowid, Sequnce, subgrid_table) {
    Datachange_SubgRID = true;

    SubGridId_end = subgrid_table;
    SubGridSelectedrowid = rowid;
    Pid = subgrid_table.split('_');
    var nextStartDate = '';
    //var newStr = str.replace(/_[^_]*$/, "_t");
    newStr = subgrid_table;
    var data = $('#' + newStr).jqGrid('getGridParam', 'data');

    var selectedSubMilestone_id = jQuery('#' + newStr).jqGrid('getRowData', rowid);
    EnddatechangedRowId = rowid;
    unionSelectedSubgrid_id = selectedSubMilestone_id.SubMilestoneId;
    chnagedSubgridDateId = unionSelectedSubgrid_id;
    ParentSubGridId = selectedSubMilestone_id.SequenceNo;
    changedmilestoneId = selectedSubMilestone_id.SequenceNo;



    if (($('#checkbox_' + selectedSubMilestone_id.SubMilestoneId).prop('checked') == false)) {
        alert('Please select the checkbox');
        $("#" + selectedSubMilestone_id.SubMilestoneId + "end_date").val('');
        //objIndex = pmugridData.findIndex((obj => obj.SequenceNo == dataFromTheRow.SequenceNo));
        //pmugridData[objIndex].StartDate = '';
        return false;
    }
    
    var indexparent = pmugridData.findIndex(obj => obj.SequenceNo == ParentSubGridId);
        dependentMilestoneDetails(SelectedProjectId, pmugridData[indexparent].MilestoneId);

    if (ParentSubGridId) {
        SubGridDatedisplaycount = 0;
    }

    var selectedmilestoneSubmilestoneid = selectedSubMilestone_id.SubMilestoneId
    var enddate = $('#' + selectedSubMilestone_id.SubMilestoneId + 'end_date').val();
    UpdatedEndDate_User = enddate;
    var index = data.findIndex(obj => obj.SubMilestoneId == selectedmilestoneSubmilestoneid);
    var PrevEnddate = data[index].EndDate;
    PrevEnddate_SubGRID = PrevEnddate;
    PrevDuration_SubGRID = data[index].Duration;
    prevSubGridDuration = PrevDuration_SubGRID;
    prevSubGridEndDate = PrevEnddate_SubGRID;
    var PrevDuration = data[index].Duration
    var sddate = $("#" + selectedSubMilestone_id.SubMilestoneId + "start_date").val();
    var sDate = $("#" + selectedSubMilestone_id.SubMilestoneId + "start_date").val().split('/').join('-');
    var eDate = enddate.split('/').join('-');
    var StartDate = moment($("#" + selectedSubMilestone_id.SubMilestoneId + "start_date").val(), 'DD-MM-YYYY');
    var EndDate = moment(enddate, 'DD-MM-YYYY');
    if ($('#' + unionSelectedSubgrid_id + 'SetRelation').val() == '') {
        alert('Please Enter the Set Relation for SubGrid');
        $('#' + unionSelectedSubgrid_id + 'end_date').val(PrevEnddate);
        return false;
    }

    if (StartDate > EndDate) {
        alert("End date should be greater than Start date");
        $("#" + selectedSubMilestone_id.SubMilestoneId + "end_date").val(PrevEnddate);
        $("#" + selectedSubMilestone_id.SubMilestoneId + "end_date").datepicker('setDate', PrevEnddate);
        $("#" + selectedSubMilestone_id.SubMilestoneId + "SubGridDuration").val(PrevDuration);
        return false;
    } else {
        data[index].EndDate = enddate;
    }

    var ssdate = new Date(sDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    var eedate = new Date(eDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

    var milli_secs = ssdate - eedate;

    var days = milli_secs / (1000 * 3600 * 24);
    var diff = Math.round(Math.abs(days));
    data[index].Duration = diff + 1;
    $('#' + selectedSubMilestone_id.SubMilestoneId + 'SubGridDuration').val(diff + 1);
    comingSubGrid = true;
    //selectedrow = rowid;
    selectedrow = data[0].SequenceNo;
    var dependentdata = pmugridData.filter(obj => obj.SetRelation == selectedrow && obj.Action == 'true');
    var Subgriddependatedata = data.filter(obj => obj.SetRelation == selectedSubMilestone_id.SubMilestoneId && obj.Action == 'true');
    if (dependentdata.length > 0 || Subgriddependatedata.length > 0) {
        DisplaySubGridValue = 'True';
        //var indexparent = pmugridData.findIndex(obj => obj.SequenceNo == selectedrow);
        //dependentMilestoneDetails(SelectedProjectId, pmugridData[indexparent].MilestoneId);
        if (dependentMilestoneDetailsList.length > 0) {
            displayUpdatedatesdetails(selectedSubMilestone_id.SubMilestoneId, SelectedProjectId, 'Dependentjqgrid');
        }

        $('#UserConfirmationforStartDate').modal('show');

    } else {
        var LastDate = [];
        var Setrelation = $('#' + selectedSubMilestone_id.SubMilestoneId + 'SetRelation').val();

        if (SubGridChanged) {
            var SubStartDate = $('#' + Setrelation + 'end_date').val();
            SubStartDate = new Date(SubStartDate.split("/").reverse().join("-"));
            SubStartDate = moment(SubStartDate).add(1, 'days').format('DD/MM/YYYY');
            $('#' + selectedSubMilestone_id.SubMilestoneId + 'start_date').val(SubStartDate);
            SubGridChanged = false;

        } else {
            var SubStartDate = $('#' + selectedSubMilestone_id.SubMilestoneId + 'start_date').val();

        }
        var nextStartDate = new Date(SubStartDate.split("/").reverse().join("-"));
        var SubDuration = $('#' + selectedSubMilestone_id.SubMilestoneId + 'SubGridDuration').val();

        var newDate = moment(nextStartDate).add(SubDuration - 1, 'days').format('DD/MM/YYYY');
        $('#' + selectedSubMilestone_id.SubMilestoneId + 'end_date').val(newDate);
        for (var SubGRID = 0; SubGRID <= TotalSubGridData.length - 1; SubGRID++) {
            var SubgridData = TotalSubGridData[SubGRID];
            var index = SubgridData.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_id.SubMilestoneId);
            if (index != -1) {
                TotalSubGridData[SubGRID][index].StartDate = SubStartDate;
                TotalSubGridData[SubGRID][index].Duration = SubDuration;
                TotalSubGridData[SubGRID][index].EndDate = newDate;
                TotalSubGridData[SubGRID][index].SetRelation = Setrelation;

                break;
            }

        }

        $.jgrid.gridUnload('#' + newStr);

        CreateSubGrid(SubgridData, newStr);

        var Finaloutput = TotalSubGridData[SubGRID].filter(obj => obj.Action == 'true');
        var multipleLastSubMilestones = TotalSubGridData[SubGRID].filter(obj => obj.SetRelation == Finaloutput[Finaloutput.length - 1].SetRelation && obj.Action == 'true');

        $.each(multipleLastSubMilestones, function (i, obj) {

            var enddate = multipleLastSubMilestones[i].EndDate;
            if (enddate != '' && enddate != null) {

                var nextenddate = new Date(enddate.split("/").reverse().join("-"));
                LastDate.push(new Date(nextenddate));
            }
        })
        if (SubgridData.length > 0) {
            var SubStartDate = SubgridData[0].StartDate;

        }
        var Finaldate = new Date(Math.max.apply(null, LastDate));
        var StartingDate = new Date(SubStartDate.split("/").reverse().join("-"));

        var timeDiff = new Date(Finaldate).getTime() - new Date(StartingDate).getTime();
        var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        totalDuration = daysDiff + 1;
        var parsedDate = moment(Finaldate, "DD/MM/YYYY");
        var parsedDate = moment(parsedDate, "ddd MMM DD YYYY HH:mm:ss ZZ");

        // Format the parsed date to "dd/mm/yyyy" format
        var formattedDate = parsedDate.format("DD/MM/YYYY");


        $('#' + selectedSubMilestone_id.SequenceNo + 'end_date').val(formattedDate);
        $('#' + selectedSubMilestone_id.SequenceNo + 'Duration').val(totalDuration);

    }
}
//user confirm ok button after changes the end date
function enddatepapulation_Sub() {
    //looping Sub Grid for dates display
    var newStr = SubGridId_end;
    selectedrow = SubGridSelectedrowid;
    var data = $('#' + newStr).jqGrid('getGridParam', 'data');


    var selectedSubMilestone_id = jQuery('#' + newStr).jqGrid('getRowData', SubGridSelectedrowid);
    var selectedmilestoneSubmilestoneid = selectedSubMilestone_id.SubMilestoneId
    var enddate = $('#' + selectedSubMilestone_id.SubMilestoneId + 'end_date').val();
    var sddate = $("#" + selectedSubMilestone_id.SubMilestoneId + "start_date").val();

    var newStr = SubGridId_end;
    var index = data.findIndex(obj => obj.SubMilestoneId == selectedmilestoneSubmilestoneid);

    for (var Sub = index + 1; Sub < data.length; Sub++) {
        if (data[Sub].Action == 'true') {


            if (data[Sub].RelationType == 'FS ( Sequence)') {
                var ind = data.findIndex(obj => obj.SubMilestoneId == data[Sub].SetRelation);

                StartDate = data[ind].EndDate;
                var nextStartDate = new Date(StartDate.split("/").reverse().join("-"));

                var newDate = moment(nextStartDate).add(1, 'days').format('DD/MM/YYYY');
                data[Sub].StartDate = newDate;
                StartDate = newDate;
            } else {
                var index = data.findIndex(obj => obj.SubMilestoneId == data[Sub].SetRelation)
                StartDate = data[index].StartDate;
                data[Sub].StartDate = StartDate;
            }


            var durationAddedenddate = ''
            var nextStartDate = new Date(StartDate.split("/").reverse().join("-"));
            var Duration = $('#' + data[Sub].SubMilestoneId + 'SubGridDuration').val();
            if (data[Sub].Duration == 0) {
                durationAddedenddate = moment(nextStartDate).add(data[Sub].Duration, 'days').format('DD/MM/YYYY');
            } else {
                durationAddedenddate = moment(nextStartDate).add(Duration - 1, 'days').format('DD/MM/YYYY');
            }

            data[Sub].EndDate = durationAddedenddate;
            StartDate = '';
        }

    };

    var indno = data[0].SequenceNo;
    for (var i = 0; i < TotalSubGridData.length; i++) {
        var index = TotalSubGridData[i].findIndex(obj => obj.SequenceNo == indno);
        if (index != -1) {
            TotalSubGridData[i] = data;

        }
    }
    $('#' + newStr).jqGrid("clearGridData", true);
    $('#' + newStr).jqGrid('setGridParam', { data: data });
    $('#' + newStr).trigger('reloadGrid');
    var totalDuration = 0;
    var LastDate = [];
    data = data.filter(obj => obj.Action == 'true');

    var StratDate = [];

    $.each(data, function (i, obj) {

        var StartDate = data[i].StartDate;
        var nextStratdate = new Date(StartDate.split("/").reverse().join("-"));
        StratDate.push(new Date(nextStratdate));
    })
    //var highestDate = new Date(Math.max.apply(null, LastDate));
    var StartingDate = new Date(Math.min.apply(null, StratDate));
    var mappedSubGridData = data.filter(obj => obj.EndDate != null);

    var lasetSubMilestoneID = mappedSubGridData[mappedSubGridData.length - 1].SetRelation;
    var multipleSameSubmilestones = mappedSubGridData.filter(obj => obj.SetRelation == lasetSubMilestoneID);
    $.each(multipleSameSubmilestones, function (i, obj) {

        var enddate = multipleSameSubmilestones[i].EndDate;
        if (enddate != '' && enddate != null) {

            var nextenddate = new Date(enddate.split("/").reverse().join("-"));
            LastDate.push(new Date(nextenddate));
        }
    })
    var highestDate = new Date(Math.max.apply(null, LastDate));
    //var highestDate = data[data.length - 1].EndDate;

    highestDate = moment(highestDate).format('DD/MM/YYYY');
    //var highestDate = mappedSubGridData[mappedSubGridData.length - 1].EndDate;
    var Finaldate = new Date(Math.max.apply(null, LastDate));
    var timeDiff = Finaldate.getTime() - StartingDate.getTime();
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalDuration = daysDiff + 1;

    //highestDate = moment(highestDate).format('DD/MM/YYYY');
    $('#' + selectedSubMilestone_id.SequenceNo + 'end_date').val(highestDate);
    $('#' + selectedSubMilestone_id.SequenceNo + 'start_date').val(sddate);
    $('#' + selectedSubMilestone_id.SequenceNo + 'Duration').val(totalDuration);
    ParentId = Pid[1];
    var index = pmugridData.findIndex(obj => obj.SequenceNo == selectedSubMilestone_id.SequenceNo);
    prevStartDate = pmugridData[index].StartDate;
    prevEndDate = pmugridData[index].EndDate;
    beforeDuration = pmugridData[index].Duration;
    beforesetrelation = pmugridData[index].SetRelation;
    pmugridData[index].StartDate = sddate;
    pmugridData[index].EndDate = highestDate;
    pmugridData[index].Duration = totalDuration;
    if (DurationchangedSubGrid) {
        comingSubGrid = false;

    } else {
        comingSubGrid = true;

    }

}
function displayDuration(SubGridId, rowid) {

    var SubMilestone_ExitArray = $.grep(pmugridData, function (v) {
        return v.SubmilestoneExit === "True"
    });
    for (var i = 0; i < SubMilestone_ExitArray.length; i++) {
        rowSequnce = SubMilestone_ExitArray[i].SequenceNo;
        SelectedSubMilestoneData = [];
        CreateSubGriddata(SubGridId, rowid);
        var Data = [];
        if (SelectedSubMilestoneData.length > 0) {
            Data.push({
                SubMilestoneId: SelectedSubMilestoneData[0].SubMilestoneId,
                Duration: SelectedSubMilestoneData[0].Duration,
            })
        }
        $.each(SelectedSubMilestoneData, function (i, item) {

            var SetReltion = item.SetRelation;
            var iNDEX = Data.findIndex(obj => obj.SubMilestoneId == SetReltion);
            if (SetReltion != '') {


                if (item.RelationType == 'FS ( Sequence)') {
                    if (iNDEX != -1) {


                        var Duration = parseInt(item.Duration) + parseInt(Data[iNDEX].Duration);
                        Data.push({
                            SubMilestoneId: SelectedSubMilestoneData[i].SubMilestoneId,
                            Duration: Duration
                        })
                    }

                } else {
                    if (item.RelationType == 'SS ( Parallel )') {
                        if (iNDEX != -1) {
                            if (parseInt(item.Duration) > parseInt(Data[iNDEX].Duration)) {
                                Data.push({
                                    SubMilestoneId: SelectedSubMilestoneData[i].SubMilestoneId,
                                    Duration: item.Duration
                                })
                            } else {
                                Data.push({
                                    SubMilestoneId: SelectedSubMilestoneData[i].SubMilestoneId,
                                    Duration: Data[iNDEX].Duration
                                })
                            }
                        }
                    }
                }
            }

        })
        var highestSalary = -Infinity; // Initialize with a very small value

        $.each(Data, function (index, obj) {
            if (obj.Duration > highestSalary) {
                highestSalary = obj.Duration;
            }
        });
        if (SelectedSubMilestoneData.length > 0) {

            var FindSequnce = pmugridData.findIndex(obj => obj.SequenceNo == SelectedSubMilestoneData[0].SequenceNo);
            pmugridData[FindSequnce].Duration = highestSalary;
        }
    }
}

function SubGridChangeDuration(rowid, gid) {

    SubGridId = gid.id;
    var data = $('#' + SubGridId).jqGrid('getGridParam', 'data');
    var selectedSubMilestone_data = jQuery('#' + SubGridId).jqGrid('getRowData', rowid);
    EnddatechangedRowId = rowid;
    SubGridSelectedrowid = rowid + 1;
    ParentSubGridId = selectedSubMilestone_data.SequenceNo;
    Datachange_SubgRID = true;
    newStr = SubGridId;
    chnagedSubgridDateId = selectedSubMilestone_data.SubMilestoneId;
    //taking prev end and duration values 
    for (var prev = 0; prev < TotalSubGridData.length; prev++) {
        var sub_index = TotalSubGridData[prev].findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_data.SubMilestoneId);
        if (sub_index != -1) {
            PrevEnddate_SubGRID = TotalSubGridData[prev][sub_index].EndDate;
            PrevDuration_SubGRID = TotalSubGridData[prev][sub_index].Duration
            break;
        }

    }

    //end


    var index = pmugridData.findIndex(obj => obj.SequenceNo == selectedSubMilestone_data.SequenceNo);
    if (pmugridData[index].Action != null && pmugridData[index].Action != '') {
        var SubMilestone_Duration = $('#' + selectedSubMilestone_data.SubMilestoneId + 'SubGridDuration').val();
        var SubMilestone_StartDate = $('#' + selectedSubMilestone_data.SubMilestoneId + 'start_date').val();
        if (SubMilestone_StartDate != '') {
            var StartDate = new Date(SubMilestone_StartDate.split("/").reverse().join("-"));
            var EndDate = moment(StartDate).add(SubMilestone_Duration - 1, 'days').format('DD/MM/YYYY');
            $('#' + selectedSubMilestone_data.SubMilestoneId + 'end_date').val(EndDate);
            DurationchangedSubGrid = true;
            selectedrow = selectedSubMilestone_data.SequenceNo;

            var index = data.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_data.SubMilestoneId);
            data[index].Duration = SubMilestone_Duration;
            data[index].EndDate = EndDate;
            data[index].StratDate = SubMilestone_StartDate;
            SubGridId_end = SubGridId;
            $.jgrid.gridUnload('#' + SubGridId);
            CreateSubGrid(data, SubGridId);
            var dependentdata = pmugridData.filter(obj => obj.SetRelation==selectedSubMilestone_data.SequenceNo && obj.Action == 'true');

            var Subgriddependatedata = data.filter(obj => obj.SetRelation.split(',').includes(selectedSubMilestone_data.SubMilestoneId.toString()) && obj.Action == 'true');


            if (dependentdata.length > 0 || Subgriddependatedata.length > 0) {
                DisplaySubGridValue = 'True';
                var index = pmugridData.findIndex(obj => obj.SequenceNo == selectedSubMilestone_data.SequenceNo);

                dependentMilestoneDetails(SelectedProjectId, pmugridData[index].MilestoneId);
                if (dependentMilestoneDetailsList.length > 0) {
                    UpdatedEndDate_User = EndDate;
                    displayUpdatedatesdetails(selectedSubMilestone_data.SubMilestoneId, SelectedProjectId, 'Dependentjqgrid');
                }

                $('#UserConfirmationforStartDate').modal('show');

            } else {
                var LastDate = [];
                var Setrelation = $('#' + selectedSubMilestone_data.SubMilestoneId + 'SetRelation').val();

                if (SubGridChanged) {
                    var SubStartDate = $('#' + Setrelation + 'end_date').val();
                    SubStartDate = new Date(SubStartDate.split("/").reverse().join("-"));
                    SubStartDate = moment(SubStartDate).add(1, 'days').format('DD/MM/YYYY');
                    $('#' + selectedSubMilestone_data.SubMilestoneId + 'start_date').val(SubStartDate);
                    SubGridChanged = false;

                } else {
                    var SubStartDate = $('#' + selectedSubMilestone_data.SubMilestoneId + 'start_date').val();

                }
                var nextStartDate = new Date(SubStartDate.split("/").reverse().join("-"));
                var SubDuration = $('#' + selectedSubMilestone_data.SubMilestoneId + 'SubGridDuration').val();

                var newDate = moment(nextStartDate).add(SubDuration - 1, 'days').format('DD/MM/YYYY');
                $('#' + selectedSubMilestone_data.SubMilestoneId + 'end_date').val(newDate);
                for (var SubGRID = 0; SubGRID <= TotalSubGridData.length - 1; SubGRID++) {
                    var SubgridData = TotalSubGridData[SubGRID];
                    var index = SubgridData.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_data.SubMilestoneId);
                    if (index != -1) {
                        TotalSubGridData[SubGRID][index].StartDate = SubStartDate;
                        TotalSubGridData[SubGRID][index].Duration = SubDuration;
                        TotalSubGridData[SubGRID][index].EndDate = newDate;
                        TotalSubGridData[SubGRID][index].SetRelation = Setrelation;

                        break;
                    }

                }

                $.jgrid.gridUnload('#' + newStr);

                CreateSubGrid(SubgridData, newStr);

                var Finaloutput = TotalSubGridData[SubGRID].filter(obj => obj.Action == 'true');
                var multipleLastSubMilestones = TotalSubGridData[SubGRID].filter(obj => obj.SetRelation == Finaloutput[Finaloutput.length - 1].SetRelation && obj.Action == 'true');

                $.each(multipleLastSubMilestones, function (i, obj) {

                    var enddate = multipleLastSubMilestones[i].EndDate;
                    if (enddate != '' && enddate != null) {

                        var nextenddate = new Date(enddate.split("/").reverse().join("-"));
                        LastDate.push(new Date(nextenddate));
                    }
                })

                var Finaldate = new Date(Math.max.apply(null, LastDate));
                var StartingDate = new Date(SubStartDate.split("/").reverse().join("-"));

                var timeDiff = new Date(Finaldate).getTime() - new Date(StartingDate).getTime();
                var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                totalDuration = daysDiff + 1;
                var parsedDate = moment(Finaldate, "DD/MM/YYYY");
                var parsedDate = moment(parsedDate, "ddd MMM DD YYYY HH:mm:ss ZZ");

                // Format the parsed date to "dd/mm/yyyy" format
                var formattedDate = parsedDate.format("DD/MM/YYYY");


                $('#' + selectedSubMilestone_data.SequenceNo + 'end_date').val(formattedDate);
                $('#' + selectedSubMilestone_data.SequenceNo + 'Duration').val(totalDuration);

            }

            // SubEndChangeDate(rowid, selectedSubMilestone_data.SubMilestoneId, SubGridId);
        } else {
            var SelectedSubMilestoneData = []
            SelectedSubMilestoneData = data;
            var ind = SelectedSubMilestoneData.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_data.SubMilestoneId);
            SelectedSubMilestoneData[ind].Duration = SubMilestone_Duration;
            var Data = [];
            Data.push({
                SubMilestoneId: SelectedSubMilestoneData[0].SubMilestoneId,
                Duration: SelectedSubMilestoneData[0].Duration,
            })
            $.each(SelectedSubMilestoneData, function (i, item) {
                var SetReltion = item.SetRelation;
                var iNDEX = Data.findIndex(obj => obj.SubMilestoneId == SetReltion);
                if (item.RelationType == 'FS ( Sequence)') {
                    var Duration = parseInt(item.Duration) + parseInt(Data[iNDEX].Duration);
                    Data.push({
                        SubMilestoneId: SelectedSubMilestoneData[i].SubMilestoneId,
                        Duration: Duration
                    })

                } else {
                    if (item.RelationType == 'SS ( Parallel )') {

                        if (parseInt(item.Duration) > parseInt(Data[iNDEX].Duration)) {
                            Data.push({
                                SubMilestoneId: SelectedSubMilestoneData[i].SubMilestoneId,
                                Duration: item.Duration
                            })
                        } else {
                            Data.push({
                                SubMilestoneId: SelectedSubMilestoneData[i].SubMilestoneId,
                                Duration: Data[iNDEX].Duration
                            })
                        }
                    }
                }

            })
            var highestSalary = -Infinity; // Initialize with a very small value

            $.each(Data, function (index, obj) {
                if (obj.Duration > highestSalary) {
                    highestSalary = obj.Duration;
                }
            });

            var FindSequnce = pmugridData.findIndex(obj => obj.SequenceNo == SelectedSubMilestoneData[0].SequenceNo);
            pmugridData[FindSequnce].Duration = highestSalary;
            $('#' + pmugridData[FindSequnce].SequenceNo + 'Duration').val(highestSalary)

            //$.jgrid.gridUnload('#jqgrid');

            //CreateJqGrid(pmugridData);
        }
    } else {
        for (var i = 0; i <= TotalSubGridData.length - 1; i++) {
            var index = TotalSubGridData[i].findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_data.SubMilestoneId);
            TotalSubGridData[i][index].Duration = $('#' + selectedSubMilestone_data.SubMilestoneId + 'SubGridDuration').val();
        }
    }

}



function ChangeExtraDays(rowId, SequenceNo) {
    var index = '';
    var ExtraDay = $('#' + SequenceNo + 'ExtraDays').val();
    if (ExtraDay > 0) {
        var index = pmugridData.findIndex(obj => obj.SequenceNo == SequenceNo);
        pmugridData[index].ExtraDays = ExtraDay;
    } else {
        var index = pmugridData.findIndex(obj => obj.SequenceNo == SequenceNo);
        pmugridData[index].ExtraDays = ExtraDay;
    }
    var NextRowId = rowId + 1;
    var NextSequnceNo = pmugridData[index + 1].SequenceNo;
    var PresentStratDate = $('#' + SequenceNo + 'start_date').val();
    var PresentEndDate = $('#' + SequenceNo + 'end_date').val();
    var Next_StartDate = $('#' + NextSequnceNo + 'start_date').val();
    //ExtraDays = true;
    ExtraDaysAdd = true;
    var dependent_exit = pmugridData.findIndex(obj => obj.SetRelation == SequenceNo && obj.Action == 'true');
    if (dependent_exit > 0) {
        ChangeDate(rowId, SequenceNo + 'start_date')
    }
}

function ChangeRelationType(rowid, gid) {
    SubGridId = gid.id;
    var data = $('#' + SubGridId).jqGrid('getGridParam', 'data');
    var selectedSubMilestone_data = jQuery('#' + SubGridId).jqGrid('getRowData', rowid);
    var RelationType = $('#' + selectedSubMilestone_data.SubMilestoneId + 'RelationType').val();
    var index = data.findIndex(obj => obj.SubMilestoneId == selectedSubMilestone_data.SubMilestoneId);
    data[index].RelationType = RelationType;
    var ParentStartData = $('#' + selectedSubMilestone_data.SequenceNo + 'start_date').val();
    beforeDuration = $('#' + selectedSubMilestone_data.SequenceNo + 'Duration').val();
    prevEndDate = $('#' + selectedSubMilestone_data.SequenceNo + 'end_date').val();
    selectedrowsequnce = selectedSubMilestone_data.SequenceNo;
    $.jgrid.gridUnload('#' + SubGridId);
    CreateSubGrid(data, SubGridId);
    var isSelected = $('#checkbox_' + selectedSubMilestone_data.SubMilestoneId).prop('checked');
    if (isSelected == true) {
        SubChangeDate('1', '', SubGridId);
    }

}


var PrevMilestoneId = '';
function AddSubMilestone(MilestoneId, RowId) {
    $('#addSubMilestoneModal').modal('show');
    $('#SubSetrelation').empty();
    var Parent_rowdata = $('#jqgrid').getRowData(RowId);
    $('#MilestoneId').val(Parent_rowdata.MilestoneId);
    ParentSequnceNo = Parent_rowdata.SequenceNo;

    $('#Addelement').html('Add Sub Milestone<b> - ' + Parent_rowdata.MilestoneName + '<b/>')

    var dropdown = $('#SubSetrelation');
    dropdown.empty();
    dropdown.append($('<option>').val('0').text('--Select--'));
    if (TotalSubGridData.length == 0) {
        $('#SequenceNo').val(SubMilestonestartid);
        $('#relationtype').prop('disabled', true);
        $('#SubSetrelation').prop('disabled', true);
        $('#SubSetrelation').addClass('input-disabled');
        $('#relationtype').addClass('input-disabled');

    } else {
        var Maxnumberarray = [];
        var maxNumber = -Infinity;
        for (var i = 0; i < TotalSubGridData.length; i++) {
            var data = TotalSubGridData[i];
            $.each(data, function (index, obj) {
                var numbers = obj.SubMilestoneId;
                if (numbers > maxNumber) {
                    maxNumber = numbers; // Update the maximum number if a higher value is found
                    Maxnumberarray.push(maxNumber);
                }
            });
        }
        maxNumber = Math.max.apply(null, Maxnumberarray);
        SubMilestonestartid = parseInt(maxNumber) + 1;
        $('#SequenceNo').val(parseInt(maxNumber) + 1);
        //Set the Set relation details
        var DropdownDetails = [];
        for (var j = 0; j < TotalSubGridData.length; j++) {
            var data = TotalSubGridData[j].filter(obj => obj.SequenceNo == Parent_rowdata.SequenceNo);
            if (data.length > 0) {
                $.each(data, function (index, obj) {

                    DropdownDetails.push({
                        value: obj.SubMilestoneId,
                        text: obj.SubMilestoneName
                    });

                });
                break;
            }
        }
        //var dropdown = $('#SubSetrelation');
        //dropdown.empty();
        //dropdown.append($('<option>').val('0').text('--Select--'));
        // Loop through the options and add each one to the dropdown
        if (DropdownDetails.length > 0) {

            $.each(DropdownDetails, function (index, option) {
                dropdown.append($('<option>').val(option.value).text(option.text));
            });
            $('#relationtype').prop('disabled', false);
            $('#SubSetrelation').prop('disabled', false);
            $('#relationtype').removeClass('input-disabled');
            $('#SubSetrelation').removeClass('input-disabled');
        } else {
            $('#relationtype').prop('disabled', true);
            $('#SubSetrelation').prop('disabled', true);
            $('#relationtype').addClass('input-disabled');
            $('#SubSetrelation').addClass('input-disabled');
        }

    }

};
var newdata = [];
$('#AddSubMilestone').click(function () {
    var data = [];
    newdata = [];
    var SubMilestonesId = $('#SequenceNo').val();
    var Name = $('#Name').val();
    var relationType = $('#relationtype').val();
    var setRelationList = $("#SubSetrelation option:Selected").val();
    var setRelation = $('#SubSetrelation').val();

    if (Name.length == " ") {
        alert("Please enter  the Milestone Name");
        return false;
    }
    var dropdowndata = $("#SubSetrelation option").length;
    if (relationType == '') {
        if (data > 1) {
            alert("Please select the relation type");
            return false;
        }
    }

    if ($("#Duration").val() == '') {
        alert("Please enter the Duration");
        return false;
    }


    if (dropdowndata > 1) {
        if (setRelationList == '0') {

            alert("Please select the set relation");

            return false;

        }
    }
    var SubMilestoneData = {
        "Action": "",
        "SequenceNo": ParentSequnceNo,
        "SubMilestoneId": SubMilestonesId,
        "SubMilestoneName": Name,
        "RelationType": "FS ( Sequence)",
        "SetRelation": (setRelation == null) ? '' : setRelation,
        "Duration": $("#Duration").val(),
        "CreatedBy": '',
        "CreadtedDate": '',
        "Remarks": '',
    }
    //Adding new SuBMilestone for binding into Sub GRID
    //Displaying loader


    ParentSubgrid_data.push(SubMilestoneData);
    newdata.push(SubMilestoneData);
    PrevMilestoneId = ParentSequnceNo;
    var ParentIndex = pmugridData.findIndex(obj => obj.SequenceNo == ParentSequnceNo);
    AddSubMilestoneFlag = false;
    pmugridData[ParentIndex].SubmilestoneExit = "True";
    //$('#jqgrid').jqGrid("clearGridData", true);

    //$('#jqgrid').jqGrid('setGridParam', { data: pmugridData });
    //$('#jqgrid').trigger('reloadGrid');

    $.jgrid.gridUnload('#jqgrid');
    CreateJqGrid(pmugridData);

    $('#loader').show();
    $('#loader').css('visibility', 'visible');
    SubMilestonestartid = parseInt(SubMilestonestartid) + 1;
    $('#SequenceNo').val(SubMilestonestartid);
    $('#Name').val('');
    $("#Duration").val('');
    $('#relationtype').val('');
    $('#MilestoneList_ErrorMilestoneList_Error').text('');
    var DropdownDetails = [];
    var newData = ParentSubgrid_data.filter(obj => obj.SequenceNo == ParentSequnceNo);
    for (var j = 0; j < TotalSubGridData.length; j++) {
        var data = TotalSubGridData[j].filter(obj => obj.SequenceNo == ParentSequnceNo);
        if (data.length > 0) {
            $.each(data, function (index, obj) {

                DropdownDetails.push({
                    value: obj.SubMilestoneId,
                    text: obj.SubMilestoneName
                });

            });
            break;
        }
    }

    var dropdown = $('#SubSetrelation');
    dropdown.empty();
    dropdown.append($('<option>').val('0').text('--Select--'));
    // Loop through the options and add each one to the dropdown
    $.each(DropdownDetails, function (index, option) {
        dropdown.append($('<option>').val(option.value).text(option.text));
    });
    $('#relationtype').prop('disabled', false);
    $('#SubSetrelation').prop('disabled', false);
    $('#SubSetrelation').removeClass('input-disabled');
    $('#relationtype').removeClass('input-disabled');

    alert('Sub Milestone added Successfully');
   // $('#loader').css('visibility', 'hidden');

});



//delete Sub MilESTONE 
var deleteSubGrid_id = '';
var DeletedSubgrid_row = '';
var ParentSequnceNo = ''
function DeleteSubMiestone(MilestoneId, gid) {
    deleteSubGrid_id = gid.id;
    DeletedSubgrid_row = MilestoneId;
    for (var j = 0; j < TotalSubGridData.length; j++) {
        var index = TotalSubGridData[j].findIndex(obj => obj.SubMilestoneId == DeletedSubgrid_row);
        if (index != -1) {
            ParentSequnceNo = TotalSubGridData[j][0].SequenceNo;
            var SubMilestoneName = TotalSubGridData[j][index].SubMilestoneName;
            $('#Deletelement').html('Are you sure you want to delete the sub milestone <b>' + SubMilestoneName + '<b/> ?')
            break
        }

    }
    for (var i = 0; i < TotalSubGridData.length; i++) {
        var dependancy = TotalSubGridData[i].findIndex(obj => obj.SetRelation == DeletedSubgrid_row);
        if (dependancy != -1) {
            break;
        }
    }
    if (dependancy == -1) {
        $('#ToDeleteTheSelectedSubGridRow').modal('show');
        $('#DeleteSubMilestone').text('')

    } else {

        alert('Please check whether the below sub milestone(s) are dependent on the current milestone');

    }
}

$('#ToDeleteTheSelectedSubGridRow_Ok').click(function () {

    var ProjectId = $('#ProjectId option:selected').val();
    var ParentIndex = pmugridData.findIndex(obj => obj.SequenceNo == ParentSequnceNo);
    var ParentMilestoneId = pmugridData[ParentIndex].MilestoneId;
    var deletedAction = '';
    if (TotalSubGridData.length != 0) {
        for (var i = 0; i < TotalSubGridData.length; i++) {
            //var data = TotalSubGridData[i];
            var index = TotalSubGridData[i].findIndex(obj => obj.SubMilestoneId == DeletedSubgrid_row);
            if (index != -1) {
                deletedAction = TotalSubGridData[i][index].Action;

                TotalSubGridData[i].splice(index, 1);
                if (TotalSubGridData[i].length == 0) {
                    pmugridData[ParentIndex].SubmilestoneExit = " ";
                }
                break;
            }
        }
    }

    var ParentSubgrid_dataindex = ParentSubgrid_data.findIndex(obj => obj.SubMilestoneId == DeletedSubgrid_row);
    if (ParentSubgrid_dataindex != -1) {
        deletedAction = ParentSubgrid_data[ParentSubgrid_dataindex].Action;
    }
    ParentSubgrid_data.splice(ParentSubgrid_dataindex, 1);
    if (pmugridData[0].Status == 'APPROVED' || pmugridData[0].Status == 'SUBMITTED') {
        $.ajax({
            url: ROOT + 'Master/GetSubMilestonesCount',
            type: "get",
            async: false,
            data: { MilestoneId: DeletedSubgrid_row, ProjectId: ProjectId, ParentMilestoneId: ParentMilestoneId, SequnceNo:ParentSequnceNo },
            success: function (result) {

            }
        });
    }
    var seqNo = ParentSequnceNo;

    if (TotalSubGridData[i].length == 0) {
        var shiftedrecords = [];
        deletedSubMilestone = true;
        for (var shift = 0; shift < TotalSubGridData.length; shift++) {
            var data = TotalSubGridData[shift];
            if (data.length != 0) {
                shiftedrecords.push(data);
            }
        }
        TotalSubGridData = shiftedrecords;
        pmugridData[ParentIndex].SubmilestoneExit = "";
        $('#jqgrid').jqGrid("clearGridData", true);
        $('#jqgrid').jqGrid('setGridParam', { data: pmugridData });
        $('#jqgrid').trigger('reloadGrid');
    } else {
        $.jgrid.gridUnload('#' + deleteSubGrid_id);
        CreateSubGrid(TotalSubGridData[i], deleteSubGrid_id);
        if (deletedAction == 'true') {

            SubChangeDate('1', seqNo, deleteSubGrid_id)
        }
    }

    alert('Sub milestone deleted successfully');

    $('#ToDeleteTheSelectedSubGridRow').modal('hide');
    $('#EndNoButton').hide();
    //$('#EndNoButton').show();

});


$('#btnCancel').click(function () {
    $('#Name').val('');
    $('#Duration').val('');

})


///display updated Dates Details


function dependentMilestoneDetails(ProjectId, MilestoneId) {
    dependentMilestoneDetailsList = [];

    SelecteDprojectId = ProjectId;
    var mappeddetails = pmugridData.filter(obj => obj.Action == 'true');

    dependentMilestoneDetailsList = dependentMilestoneDetailsList.concat(JSON.parse(JSON.stringify(mappeddetails.filter(obj => obj.MilestoneId == MilestoneId)))); 
    for (var i = 0; i < dependentMilestoneDetailsList.length; i++) {
        if (mappeddetails[0].SetRelation == '') {
            mappeddetails[0].SetRelation = '0';

        }
        var data = mappeddetails.filter(obj => obj.SetRelation.split(',').includes(dependentMilestoneDetailsList[i].SequenceNo.toString()));
       
        //dependentMilestoneDetailsList = dependentMilestoneDetailsList.concat(JSON.parse(JSON.stringify(data)));
        // Concatenate arrays while avoiding duplicates
        $.each(data, function (index, newItem) {
            var isDuplicate = false;
            $.each(dependentMilestoneDetailsList, function (index, existingItem) {
                if (newItem.MilestoneId === existingItem.MilestoneId) {
                    isDuplicate = true;
                    return false; // Exit the loop if a duplicate is found
                }
            });

            if (!isDuplicate) {
                dependentMilestoneDetailsList.push(newItem);
            }
        });

    }

    console.log('dependentdetails', dependentMilestoneDetailsList);

    SubMilestoneDataList(ProjectId)

}

function SubMilestoneDataList(ProjectId) {
    
    var SubMilestonedata = dependentMilestoneDetailsList.filter(obj => obj.SubmilestoneExit == 'True');
    DependentSub_Milestones = [];
    if (SubMilestonedata.length > 0) {
        for (var i = 0; i < TotalSubGridData.length; i++) {
            var data = TotalSubGridData[i].filter(obj => obj.Action == 'true');
           // DependentSub_Milestones = $.merge(DependentSub_Milestones, data);
              $.merge(DependentSub_Milestones, $.extend(true, [], data));
        }
        for (var i = 0; i < DependentSub_Milestones.length; i++) {
                        var obj = DependentSub_Milestones[i];

            obj.MilestoneName = obj.SubMilestoneName;
            obj.UpdatedStartDate = obj.StartDate

            obj.UpdatedEndDate = obj.EndDate

        }
        console.log('DependentSub_Milestones', DependentSub_Milestones);
        
    }
}

function displayUpdatedatesdetails(MilestoneId, ProjectId,gridId) {
    console.log('DependentSub_Milestones', DependentSub_Milestones);
    console.log('dependentMilestoneDetailsList', dependentMilestoneDetailsList);
    
    DependentSub_Milestones = [];
    SubMilestoneDataList(ProjectId)
    var parent_Index = '';

    if (DisplaySubGridValue == 'True' && DependentSub_Milestones.length > 0) {
        if (updatedStartDateDisplay) {
            var index = DependentSub_Milestones.findIndex(obj => obj.SubMilestoneId == MilestoneId);
            DependentSub_Milestones[index].UpdatedStartDate = UpdatedStartDate_User;
            DependentSub_Milestones[index].UpdatedEndDate = UpdatedEndDate_User;
            if (prevSubGridSetrelation != '') {
                DependentSub_Milestones[index].SetRelation = prevSubGridSetrelation;
            }
            parent_Index = SubMilestoneDatesDisplay(index + 1, DependentSub_Milestones[index].SequenceNo);
            updatedStartDateDisplay = false;

        } else {
            var index = DependentSub_Milestones.findIndex(obj => obj.SubMilestoneId == MilestoneId);
            DependentSub_Milestones[index].UpdatedStartDate = DependentSub_Milestones[index].StartDate;
            if (PrevEnddate_SubGRID != '') {
                DependentSub_Milestones[index].EndDate = PrevEnddate_SubGRID;
                DependentSub_Milestones[index].Duration = PrevDuration_SubGRID;


            }

            DependentSub_Milestones[index].UpdatedEndDate = UpdatedEndDate_User;
            parent_Index = SubMilestoneDatesDisplay(index + 1, DependentSub_Milestones[index].SequenceNo);

        }
        
    }



    if (dependentMilestoneDetailsList.length > 0) {
        if (DisplaySubGridValue == '') {
            // on changing the duration 
            var index = dependentMilestoneDetailsList.findIndex(obj => obj.MilestoneId == MilestoneId);
            dependentMilestoneDetailsList[index].UpdatedStartDate = dependentMilestoneDetailsList[index].StartDate;
            if (prevStartDate != '' && prevEndDate != '' && beforeDuration !='') {
                dependentMilestoneDetailsList[index].Duration = beforeDuration;

                dependentMilestoneDetailsList[index].StartDate = prevStartDate
                dependentMilestoneDetailsList[index].EndDate = prevEndDate
            }
            dependentMilestoneDetailsList[index].UpdatedEndDate = UpdatedEndDate_User;
            var SequnceNo = dependentMilestoneDetailsList[index].SequenceNo;
        }
        else {
            if (parent_Index === '') {
                //For StartDate change details deisplay
                var index = dependentMilestoneDetailsList.findIndex(obj => obj.MilestoneId == MilestoneId);
                dependentMilestoneDetailsList[index].UpdatedStartDate = UpdatedStartDate_User;
                dependentMilestoneDetailsList[index].StartDate = prevStartDate;

                var EndDate = new Date(UpdatedStartDate_User.split("/").reverse().join("-"));
                StartDate = moment(EndDate).add(dependentMilestoneDetailsList[index].Duration - 1, 'days').format('DD/MM/YYYY');
                dependentMilestoneDetailsList[index].UpdatedEndDate = StartDate;
                var SequnceNo = dependentMilestoneDetailsList[index].SequenceNo;
            } else {
                var index = parent_Index;

            }
        }
        for (var i = index+1; i < dependentMilestoneDetailsList.length; i++) {
            var Setrelation = dependentMilestoneDetailsList[i].SetRelation;
            if (Setrelation != '' && Setrelation != undefined && Setrelation != null) {
                var HighestDate = getHighestdatefromMulSetrelation(Setrelation);
                var SetrelationEndDate = HighestDate;
                //var Setrelation_Index = dependentMilestoneDetailsList.findIndex(obj => obj.SequenceNo == Setrelation);

            } else {
                var Setrelation_Index = dependentMilestoneDetailsList.findIndex(obj => obj.SequenceNo == dependentMilestoneDetailsList[index].SequenceNo);
                var SetrelationEndDate = dependentMilestoneDetailsList[Setrelation_Index].UpdatedEndDate;

            }
            
            EndDate = new Date(SetrelationEndDate.split("/").reverse().join("-"));
            StartDate = moment(EndDate).add(1, 'days').format('DD/MM/YYYY');
            dependentMilestoneDetailsList[i].UpdatedStartDate = StartDate
            if (dependentMilestoneDetailsList[i].SubmilestoneExit == 'True') {
                var index = DependentSub_Milestones.findIndex(obj => obj.SequenceNo == dependentMilestoneDetailsList[i].SequenceNo);
                if (index != -1) {
                    DependentSub_Milestones[index].UpdatedStartDate = StartDate;


                    var enddate = new Date(StartDate.split("/").reverse().join("-"));
                    var updatedEndDate = moment(enddate).add(parseInt(DependentSub_Milestones[index].Duration) - 1, 'days').format('DD/MM/YYYY');
                    DependentSub_Milestones[index].UpdatedEndDate = updatedEndDate;
                    var nextstartdate = new Date(updatedEndDate.split("/").reverse().join("-"));
                    StartDate = moment(nextstartdate).add(1, 'days').format('DD/MM/YYYY');
                    if (DependentSub_Milestones.length > parseInt(index + 1)) {
                        DependentSub_Milestones[index + 1].UpdatedStartDate = StartDate;
                        SubMilestoneDatesDisplay(index + 1, dependentMilestoneDetailsList[i].SequenceNo)

                    } else {
                        dependentMilestoneDetailsList[i].UpdatedEndDate = updatedEndDate;
                    }
                } else {
                    var enddate = new Date(StartDate.split("/").reverse().join("-"));
                    var updatedEndDate = moment(enddate).add(parseInt(dependentMilestoneDetailsList[i].Duration) - 1, 'days').format('DD/MM/YYYY');
                    dependentMilestoneDetailsList[i].UpdatedEndDate = updatedEndDate;
                }
            } else {

                var enddate = new Date(StartDate.split("/").reverse().join("-"));
                var updatedEndDate = moment(enddate).add(parseInt(dependentMilestoneDetailsList[i].Duration) - 1, 'days').format('DD/MM/YYYY');
                dependentMilestoneDetailsList[i].UpdatedEndDate = updatedEndDate;
            }
        }
    }

    
    //$('#dependentMilestones').modal('show');
    $("#" + gridId).jqGrid("clearGridData", true);
    jQuery('#' + gridId).jqGrid('setGridParam', { data: dependentMilestoneDetailsList });
    jQuery('#' + gridId).trigger('reloadGrid');
    //CreateJqGrid(dependentMilestoneDetailsList);
    CreateSubGridDependent(gridId);

}

function SubMilestoneDatesDisplay(index, SequnceNo) {

    for (var i = index; i < DependentSub_Milestones.length; i++) {

        if (DependentSub_Milestones[i].SequenceNo == SequnceNo) {
            var Setrelation = DependentSub_Milestones[i].SetRelation;
            if (Setrelation != '' && Setrelation != '0' && Setrelation != undefined) {
                //var Setrelation_Index = DependentSub_Milestones.findIndex(obj => obj.SubMilestoneId == Setrelation);
                var LastDate = [];
                var SetrelationSub = Setrelation.split(',');
                $.each(SetrelationSub, function (i, obj) {

                    var mulIndex = DependentSub_Milestones.findIndex(obj => obj.SubMilestoneId == SetrelationSub[i]);
                    var highestEndDate = DependentSub_Milestones[mulIndex].EndDate;
                    if (highestEndDate != '' && highestEndDate != null) {

                        var nextenddate = new Date(highestEndDate.split("/").reverse().join("-"));
                        LastDate.push(new Date(nextenddate));
                    }
                })
                var highestDate = new Date(Math.max.apply(null, LastDate));
                //var highestDate = data[data.length - 1].EndDate;

                highestDate = moment(highestDate).format('DD/MM/YYYY');
                var SetrelationEndDate = highestDate;

              

            } else {
                var Setrelation_Index = DependentSub_Milestones.findIndex(obj => obj.SubMilestoneId == DependentSub_Milestones[i].SubMilestoneId);
                var SetrelationEndDate = DependentSub_Milestones[Setrelation_Index].UpdatedEndDate;


            }
            EndDate = new Date(SetrelationEndDate.split("/").reverse().join("-"));
            StartDate = moment(EndDate).add(1, 'days').format('DD/MM/YYYY');
            DependentSub_Milestones[i].UpdatedStartDate = StartDate;
            var enddate = new Date(StartDate.split("/").reverse().join("-"));
            var updatedEndDate = moment(enddate).add(parseInt(DependentSub_Milestones[i].Duration) - 1, 'days').format('DD/MM/YYYY');
            DependentSub_Milestones[i].UpdatedEndDate = updatedEndDate;
        }
    }
    ;
    var data = DependentSub_Milestones.filter(obj => obj.SequenceNo == SequnceNo)
    var lasetSubMilestone = data[data.length - 1].SetRelation;
    var multipleSameSubmilestones = data.filter(obj => obj.SetRelation == lasetSubMilestone);
    var LastDate = [];
    $.each(multipleSameSubmilestones, function (i, obj) {

        var enddate = multipleSameSubmilestones[i].UpdatedEndDate;
        if (enddate != '' && enddate != null) {

            var nextenddate = new Date(enddate.split("/").reverse().join("-"));
            LastDate.push(new Date(nextenddate));
        }
    })
    var highestDate = new Date(Math.max.apply(null, LastDate));
    //var highestDate = data[data.length - 1].EndDate;

    highestDate = moment(highestDate).format('DD/MM/YYYY');

    var StartingDate = new Date(data[0].UpdatedStartDate.split("/").reverse().join("-"));
    var Finaldate = new Date(highestDate.split("/").reverse().join("-"));
    var timeDiff = Finaldate.getTime() - StartingDate.getTime();
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalDuration = daysDiff + 1;
    parent_Index = dependentMilestoneDetailsList.findIndex(obj => obj.SequenceNo == SequnceNo);
    dependentMilestoneDetailsList[parent_Index].UpdatedStartDate = moment(StartingDate).format('DD/MM/YYYY');
    //dependentMilestoneDetailsList[parent_Index].Duration = totalDuration;

    dependentMilestoneDetailsList[parent_Index].UpdatedEndDate = highestDate;
    return parent_Index;
}

Submodels = [
    {
        name: 'SequenceNo',
        label: 'Sequence No',
        width: 90,
        resizable: true,
        hidden: true,
        ignoreCase: true,
        sortable: false,

    },

    {
        name: 'SubMilestoneId',
        label: 'Milestone No',
        width: 120,
        resizable: true,
        ignoreCase: true,
        sortable: false,
       
    },

    {
        name: 'MilestoneName',
        resizable: true,
        width: 280,
        label: 'Milestone Name',
        ignoreCase: true,
        sortable: false,

    },
    
    {
        name: 'SetRelation',
        label: 'Set Relation',
        width: 120,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'Duration',
        label: 'Duration',
        width: 80,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    
    {
        name: 'StartDate',
        label: 'Start Date',
        width: 105,
        resizable: true,
        //sorttype:'Date',
        ignoreCase: true,
        sortable: false,
       
    },
    {
        name: 'EndDate',
        resizable: true,
        label: 'End Date',
        sorttype: 'Date',
        width: 105,
        ignoreCase: true,
        sortable: false,
       
    },
    {
        name: 'UpdatedStartDate',
        label: 'Revised Start Date',
        width: 105,
        resizable: true,
        //sorttype:'Date',
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'UpdatedEndDate',
        resizable: true,
        label: 'Revised End Date',
        sorttype: 'Date',
        width: 105,
        ignoreCase: true,
        sortable: false,

    },
   
    {
        name: 'SubmilestoneExit',
        resizable: true,
        label: 'SubmilestoneExit',
        ignoreCase: true,
        hidden: true,
        sortable: false,
        classes: 'submilestoneexist'
    }

]

Parentmodels = [

    {
        name: 'SequenceNo',
        label: 'Milestone No',
        width: 120,
        resizable: true,
        ignoreCase: true,
        sortable: false,

    },

    {
        name: 'MilestoneName',
        resizable: true,
        width: 280,
        label: 'Milestone Name',
        ignoreCase: true,
        sortable: false,

    },

    {
        name: 'SetRelation',
        label: 'Set Relation',
        width: 120,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },
    {
        name: 'Duration',
        label: 'Duration',
        width: 80,
        resizable: true,
        ignoreCase: true,
        sortable: false,
    },

    {
        name: 'StartDate',
        label: 'Start Date',
        width: 105,
        resizable: true,
        //sorttype:'Date',
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'EndDate',
        resizable: true,
        label: 'End Date',
        sorttype: 'Date',
        width: 105,
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'UpdatedStartDate',
        label: 'Revised Start Date',
        width: 105,
        resizable: true,
        //sorttype:'Date',
        ignoreCase: true,
        sortable: false,

    },
    {
        name: 'UpdatedEndDate',
        resizable: true,
        label: 'Revised End Date',
        sorttype: 'Date',
        width: 105,
        ignoreCase: true,
        sortable: false,

    },

    {
        name: 'SubmilestoneExit',
        resizable: true,
        label: 'SubmilestoneExit',
        ignoreCase: true,
        hidden: true,
        sortable: false,
        classes: 'submilestoneexist'
    }

]


function CreateSubGridDependent(gridId) {
    $("#" + gridId).jqGrid({
        url: '',
        datatype: 'local',
        data: dependentMilestoneDetailsList,
        mtype: 'GET',
        colModel: Parentmodels,
        loadonce: true,
        viewrecords: true,
        sortable: false,
        // sortorder: 'desc',
        rowNum: 10000,
        //multiselect: true,
        gridview: true,

        scroll: 1,
        pager: '#pager',
        userDataOnFooter: true,
        subGrid: true,
        subGridOptions: {
            hasSubgrid: function (options) {
                console.log(options);
                var subgridData = options.data.subgridData;
                return subgridData != null && subgridData.length > 0;
            }
        },
        beforeExpandRow: function (rowid, rowData, e) {
            // Get the value of the column you want to check
            var columnValue = rowData.ColumnName; // Replace "ColumnName" with the actual name of the column
            var selectedMilestone_id = jQuery('#' + gridId).jqGrid('getRowData', row_id);

            // Conditionally prevent the expansion based on the column value
            if (columnValue === "disable") {
                // Return false to prevent the expansion
                return false;
            }
        },
        subGridRowExpanded: function (subgrid_id, row_id) {
            var projectId = $('#ProjectId').children(":selected").attr("value");

            var subgrid_table_id = subgrid_id + "_t";
            var selectedMilestone_id = jQuery('#' + gridId).jqGrid('getRowData', row_id);
            var rowSequnce = selectedMilestone_id.SequenceNo;
            var dataList = DependentSub_Milestones.filter(obj => obj.SequenceNo == rowSequnce);
            //for (var i = 0; i < dataList.length; i++) {
            //    var obj = dataList[i];
            //    obj.SequenceNo = obj.SubMilestoneId;
            //}
            $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "'></table>");
            $("#" + subgrid_table_id).jqGrid({
                datatype: "local",
                data: dataList,

                colModel: Submodels,
                loadonce: true,
                viewrecords: true,
                rowNum: 10000,
                scroll: true,
                pager: '#pager_id',
                height: "auto",

            });
           
        },
        gridComplete: function () {
            //var objRows = $("#"+gridId+' tbody tr");
            //var objHeader = $("#" + gridId' tbody tr td");
            //if (objRows.length > 1) {
            //    var objFirstRowColumns = $(objRows[1]).children("td");
            //    for (i = 0; i < objFirstRowColumns.length; i++) {
            //        $(objFirstRowColumns[i]).css("width", $(objHeader[i]).css("width"));
            //    }
            //}

        },

        loadComplete: function () {
            $('.submilestoneexist').each(function (i, obj) {
                console.log(obj.textContent);
                if (obj.textContent != 'True') {
                    var td = $(obj).parent().find('td.sgcollapsed');
                    $(td).unbind("click").html("");
                }
            })
            
            var $grid = $('#' + gridId);
            // $("#jqgrid").jqGrid("setGridParam", { beforeSelectRow: function (rowid, e) { return $(e.target).is("input:checkbox"); } });
            var totalAmount = $grid.jqGrid('getCol', 'Amount', false, 'sum');
            $grid.jqGrid('footerData', 'set', { 'OrderQtyInPallets': "Total Amount $:" });
            $grid.jqGrid('footerData', 'set', { 'Amount': parseFloat($grid.jqGrid('getCol', 'Amount', false, 'sum')).toFixed(2) });
            $(".tamounteuro").text(parseFloat(totalAmount).toFixed(2));
            parseInt(totalAmount) !== 0 ? $(".tamountdlr").text(parseFloat(1 / totalAmount).toFixed(2)) : 0;
        }

    });

}



$('#SaveVerionRemarks').click(function () {
    VersionReamrks = $('#VersionRemarks').val();
    var Version = $('#Version').val();

    if (Version == '') {
        $('#VersionError').text('Please Enter the Version');
        return false;
    }

    if (VersionReamrks == '') {
        $('#VersionRemarksError').text('Please Enter the Remarks');
        return false;
    } else {
        $('#VersionRemarkspop').modal('hide');

    }
})

$('#CancelVerionRemarks').click(function () {
    $('#VersionRemarkspop').modal('hide');
    $('#AccepptVersionCreation').prop('checked', false);
    $('#Versionchange').hide();

})