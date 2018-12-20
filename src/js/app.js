import $ from 'jquery';
//import {parseCode} from './code-analyzer';
import {startSymbolicSubstitution} from './symbolic-substitution';

$(document).ready(function () {
    $('#addArg').click(() => {
        let argName = '<td><label>Arg name: <input id="name" type="text"></label></td>';
        let argValue = '<td><label>Arg value: <input id="value" type="text"></label></td>';
        $('#argsTable').append('<tr class="arg">' + argName + argValue + '</tr>');
    });

    $('#codeSubmissionButton').click(() => {
        let argsNameAndValue = getArgesValue();
        var argsNameAndValueString = JSON.stringify(argsNameAndValue);
        console.log(argsNameAndValueString); // eslint-disable-line no-console
        let codeToParse = $('#codePlaceholder').val();
        let finalCodeOutput = startSymbolicSubstitution(codeToParse, argsNameAndValue);
        console.log(finalCodeOutput); // eslint-disable-line no-console
        $('#finalCodeOutput').html(finalCodeOutput);
    });
});

function getArgesValue(){
    let argsNameAndValue = {};
    $('tr.arg').each(function() {
        let _name = $(this).find('#name').val();
        let _value = $(this).find('#value').val();
        if(_value.charAt(0) == '['){
            let array = _value.substring(1, _value.length - 1).replace(/ /g,'').split(',');
            _value = array;
        }
        argsNameAndValue[_name] = [];
        argsNameAndValue[_name].push({'line': 0, 'conditions': [], 'value': _value});
    });
    return argsNameAndValue;
}
/*
$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        let vairablesValuePerRow = substitution(parsedCode);
        //var stringParsedCode = JSON.stringify(vairablesValuePerRow);
        //console.log(stringParsedCode); // eslint-disable-line no-console
        var tbody = document.getElementById('tbody');
        var header = document.getElementById('header');
        var th= '<thead><tr><td>' + 'Line' + '</td>' + '<td>' + 'Type' + '</td><td>' + 'Name' + '</td><td>' + 'Cond' + '</td><td>' + 'Value' + '</td></tr></thead>';
        header.innerHTML += th;
        for(var i in parsedCode){
            var tr = '<tr><td>' + parsedCode[i].Line + '</td><td>' + parsedCode[i].Type + '</td><td>' + parsedCode[i].Name + '</td><td>' + parsedCode[i].Cond + '</td><td>' + parsedCode[i].Value + '</td></tr>';
            tbody.innerHTML += tr;
        }
        //$('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });

});*/

