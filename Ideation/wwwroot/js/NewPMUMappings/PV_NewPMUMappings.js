
if ($("#Version").val() != "" || $("#Version").val() != null) {
    $("#notes_span").hide();
}

var taskData = $.parseJSON($('#PMUMappingDetails').val());


var array = [];
var val = 0;
var criticalval = 0;
var criticalarray = [];

computeCPM(taskData);

// Print the results
printTask(array);

function getTaskCode(data, code) {

    var index = 0;
    var flag = 0;
    $.each(data, function (i, task) {
        var inputString = code;
        var fsIndex = inputString.toUpperCase().indexOf("FS");
        var ssIndex = inputString.toUpperCase().indexOf("SS");
        var fsCharacters = inputString.substring(0, fsIndex).length;
        var ssCharacters = inputString.substring(0, ssIndex).length;
        if ((fsIndex !== -1 && fsIndex > 0) || (ssIndex !== -1 && ssIndex > 0)) {
            var letterBefore;
            if (fsIndex !== -1) {
                letterBefore = inputString.substring(fsIndex - fsCharacters, fsIndex).toUpperCase();
            } else {
                letterBefore = inputString.substring(ssIndex - ssCharacters, ssIndex).toUpperCase();
            }
            if (task.SlNo == letterBefore) {
                flag = 1;
                task.deplendentslno = letterBefore;
                return false;
            }
        }
        else {
            if (task.SlNo == inputString) {
                flag = 1;
                task.dependentslno = letterBefore;
                return false;
            }
        }
        index++;
    });

    if (flag === 1) {
        return index;
    } else {
        return -1;
    }
}

function forwardPass(myData) {
    var nTask = myData.length;
    var temp = [];

    $.each(myData, function (i, task) {
        if (task.WBSHeaderId == 0) {
            if (task.Dependency == null || task.Dependency == "") {
                task.ES = 0;

                val = val + 1;
                if (!array["Array" + val]) {
                    array["Array" + val] = [];
                    array["Array" + val].push(task);
                }
                try {
                    task.EF = task.ES + task.Duration;
                } catch (error) {
                }
            } else {
                var depend = task.Dependency.split(',');
                $.each(depend, function (j, pred) {
                    var index = getTaskCode(myData, pred);
                    var fsIndex = pred.toUpperCase().indexOf("FS");
                    var ssIndex = pred.toUpperCase().indexOf("SS");
                    if (fsIndex != -1) {
                        temp.push(myData[index].EF);
                    }
                    else {
                        temp.push(myData[index].ES);
                    }

                });

                task.ES = Math.max.apply(null, temp);

                try {
                    task.EF = task.ES + task.Duration;
                } catch (error) {

                }
                var getval = "";
                var Arraylength = Object.values(array).map(array => array.length).length;
                for (var i = 1; i <= Arraylength; i++) {
                    var innerArryLength = array["Array" + i].length;
                    for (var j = 0; j < innerArryLength; j++) {
                        task.dependentslno = "";
                        var inputString = task.Dependency.split(',');
                        for (var k = 0; k < inputString.length; k++) {
                            var fsIndex = inputString[k].toUpperCase().indexOf("FS");
                            var ssIndex = inputString[k].toUpperCase().indexOf("SS");
                            var fsCharacters = inputString[k].substring(0, fsIndex).length;
                            var ssCharacters = inputString[k].substring(0, ssIndex).length;
                            if ((fsIndex !== -1 && fsIndex > 0) || (ssIndex !== -1 && ssIndex > 0)) {
                                var letterBefore;
                                if (fsIndex !== -1) {
                                    letterBefore = inputString[k].substring(fsIndex - fsCharacters, fsIndex).toUpperCase();
                                } else {
                                    letterBefore = inputString[k].substring(ssIndex - ssCharacters, ssIndex).toUpperCase();
                                }
                                task.dependentslno += letterBefore + ',';
                            }
                        }
                        var dependecyarray = task.dependentslno.replace(/,$/, '').split(",");
                        for (var n = 0; n < dependecyarray.length; n++) {
                            if (array["Array" + i][j].SlNo == dependecyarray[n]) {
                                getval += i + ',';
                            }
                        }
                    }

                }
                if (getval == "") {

                    array["Array" + val][Arraylength] = task
                } else {

                    var getvalArray = getval.replace(/,$/, '').split(",");
                    var uniqueValues = [...new Set(getvalArray)];
                    for (var m = 0; m < uniqueValues.length; m++) {
                        Arraylength = array["Array" + uniqueValues[m]].length
                        array["Array" + uniqueValues[m]][Arraylength] = task
                    }
                }

                temp = [];
            }
        }


    });
    return array;
}
function backwardPass(myData) {
    var nTask = myData.length;
    var temp = [];
    var successors = [];
    var Arraylength = Object.values(array).map(array => array.length).length;
    for (var i = 1; i <= Arraylength; i++) {
        var innerArryLength = array["Array" + i].length;
        for (var j = innerArryLength - 1; j >= 0; j--) {
            if (array["Array" + i][j].Dependency !== null) {
                var depend = array["Array" + i][j].Dependency.split(',');
                $.each(depend, function (k, pred) {
                    var index = getTaskCode(array["Array" + i], pred);
                    if (!array["Array" + i]["successors"]) {
                        array["Array" + i]["successors"] = [];
                    }
                    if (array["Array" + i]["successors"][index] !== undefined) {
                        array["Array" + i]["successors"][index] += ',' + array["Array" + i][j].SlNo;
                    }
                    else {
                        array["Array" + i]["successors"][index] = array["Array" + i][j].SlNo;
                    }
                })
            }
        }
    }

    for (var i = 1; i <= Arraylength; i++) {
        var innerArryLength = array["Array" + i].length;
        for (var j = 0; j <= innerArryLength - 1; j++) {
            if (innerArryLength == 1) {
                array["Array" + i][j].SUCCESSORS = undefined
            }
            else {
                array["Array" + i][j].SUCCESSORS = array["Array" + i]["successors"][j]?.toString().split(',');
            }
        }
    }
    for (var i = 1; i <= Arraylength; i++) {
        var innerArryLength = array["Array" + i].length;
        for (var j = innerArryLength - 1; j >= 0; j--) {
            if (array["Array" + i][j].SUCCESSORS == null || array["Array" + i][j].SUCCESSORS == undefined) {
                array["Array" + i][j].LF = array["Array" + i].length > 0 ? Math.max(...array["Array" + i].map(m => !isNaN(m.EF) ? m.EF : 0)) : 0;
                array["Array" + i][j].LS = array["Array" + i][j].LF - array["Array" + i][j].Duration;
            }
            else {
                var successor = array["Array" + i][j].SUCCESSORS.toString().split(',');
                $.each(successor, function (j, succ) {
                    var index = getTaskCode(array["Array" + i], succ);
                    if (array["Array" + i][index] && !isNaN(array["Array" + i][index].LS)) {
                        var ssIndex = array["Array" + i][index].Dependency.toUpperCase().indexOf("SS");
                        var fsIndex = array["Array" + i][index].Dependency.toUpperCase().indexOf("FS");
                        if (ssIndex != -1 && fsIndex == -1) {
                        }
                        else {
                            temp.push(array["Array" + i][index].LS);
                        }
                    }
                })
                if (temp.length > 0) {
                    array["Array" + i][j].LF = Math.min.apply(null, temp);
                    array["Array" + i][j].LS = array["Array" + i][j].LF - array["Array" + i][j].Duration;
                } else {                    
                    if (array["Array" + i][j].SUCCESSORS != undefined && temp.length == 0) {
                        array["Array" + i][j].LF = array["Array" + i].length > 0 ? array["Array" + i][j].EF : 0; 
                        array["Array" + i][j].LS = array["Array" + i][j].LF - array["Array" + i][j].Duration;
                    } else {
                        array["Array" + i][j].LF = array["Array" + i][j].Duration;
                        array["Array" + i][j].LS = 0
                    }
                }
                temp = [];
            }
        }
    }
    return array;
}


function slack(myData) {
    var Arraylength = Object.values(array).map(array => array.length).length;
    for (var i = 1; i <= Arraylength; i++) {
        var innerArryLength = array["Array" + i].length;
        for (var j = 0; j <= innerArryLength - 1; j++) {
            array["Array" + i][j].SLACK = array["Array" + i][j].LS - array["Array" + i][j].ES;
            array["Array" + i][j].CRITICAL = (array["Array" + i][j].SLACK === 0) ? "YES" : "NO";
        }
    }
    return array;
}

function computeCPM(myData) {

    myData = forwardPass(myData);
    myData = backwardPass(myData);
    myData = slack(myData);
    return myData;
}


function printTask(myData) {
    var Arraylength = Object.values(array).map(array => array.length).length;
    for (var i = 1; i <= Arraylength; i++) {
        var innerArryLength = array["Array" + i].length;
        for (var j = innerArryLength - 1; j >= 0; j--) {
            
            if (array["Array" + i][j].CRITICAL == "YES") {
                if (array["Array" + i][j].SUCCESSORS == undefined) {
                    //if (!criticalarray["Array" + i]) {
                    criticalval = 1 + criticalval;
                    criticalarray["Array" + criticalval] = [];
                    criticalarray["Array" + criticalval].push(array["Array" + i][j])
                    //} else {
                    //    criticalarray["Array" + i].push(array["Array" + i][j])
                    //}
                }
                else {
                    var Sucessor = array["Array" + i][j].SUCCESSORS;
                    for (var q = 1; q <= Arraylength; q++) {
                        if (criticalarray["Array" + q] != undefined) {
                            var innerCriticalArryLength = criticalarray["Array" + q].length;
                            for (var r = innerCriticalArryLength - 1; r >= 0; r--) {
                                for (var b = 0; b < Sucessor.length; b++) {
                                    if (criticalarray["Array" + q][r].SlNo == Sucessor[b]) {
                                        criticalarray["Array" + q].push(array["Array" + i][j])
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    var max = 0;
    var maxArray = "";
    for (var key in criticalarray) {
        
        if (criticalarray.hasOwnProperty(key)) {
            var length = criticalarray[key].length;
            if (length > max) {
                max = length;
                maxArray = key;
            }
            else if (length == max) {
                var countkeyduration = 0;
                var countmaxduration = 0;
                for (var i = 0; i < criticalarray[key].length; i++) {
                    countkeyduration = countkeyduration + criticalarray[key][i].Duration;
                }
                for (var j = 0; j < criticalarray[maxArray].length; j++) {
                    countmaxduration = countmaxduration + criticalarray[maxArray][j].Duration;
                }

                if (countkeyduration > countmaxduration) {
                    max = length;
                    maxArray = key;
                }
                else if (countmaxduration == countkeyduration) {
                    if (array[maxArray].length < array[key].length) {
                        max = length;
                        maxArray = key;
                    }
                }

            }
        }
    }
    if (maxArray != "") {
        for (var i = 0; i < criticalarray[maxArray].length; i++) {
            $('#pmumapping tbody tr td[data-slno="' + criticalarray[maxArray][i].SlNo + '"]').addClass('highlight-slno');
        }
    }
}
