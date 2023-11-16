
//Puxando Script Include dentro de uma BR
(function executeRule(current, previous /*null when async*/) {

	current.short_description = "Olá";
	testeFuncao(); //Script Include sendo chamado


})(current, previous);


//função de um Script Include

function logPropertyValues(str){
    this.debug = false;
    this.debugPrefix = 'Lucas';
 
    if(this.debug){
        gs.info(this.debugPrefix + str);
    }
}

//Começo do Script Include

//Client Script com Script Include

function onLoad() {
   var ga = new GlideAjax('HelloWorld');
   ga.addParam('sysparm_name', 'alertGreeting');
   ga.addParam('sysparm_user_name', 'Jederson');
   ga.getXML(HelloWorldParse);
 
 
   function HelloWorldParse(response) {
    var answerFromXML = response.responseXML.documentElement.getAttribute('answer');
    alert(answerFromXML);
   }
   
}


// Script Include usando Ajax
 
var HelloWorld = Class.create();
HelloWorld.prototype = Object.extendsObject(AbstractAjaxProcessor, {
 
    alertGreeting: function() {
        return "Hello" + this.getParameter('sysparm_user_name') + "!";
    },
   
    type: 'HelloWorld'
});

//Fim do Script Include + Client Script com JSON

//Script Include JSON

var AssignmentGroupUtils = Class.create();
AssignmentGroupUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
countGroupMembers: function(){
   
    var grpName = "";
    var message = "There are no members in this Assignment Group";
    var groupID = this.getParameter('sysparm_group_id');
   
    var grpMems = new GlideRecord('sys_user_grmember');
    grpMems.addQuery('group.sys_id', groupID);
    grpMems.query();
   
    if (grpMems.next()){
        grpName = grpMems.getDisplayValue('group');
    }
    if (grpName != "") {
        message = 'There are ' + grpMems.getRowCount() + ' members in the ' + grpName + ' group';
    }
   
    return message;
},
   
    assignAnalyst: function() {
        var groupID = this.getParameter('sysparm_group_id');
        var membersArray = [];
 
        var membersGR = new GlideRecord('sys_user_grmember');
        membersGR.addQuery('group.sys_id', groupID);
        membersGR.query();
 
        while (membersGR.next()) {
            var member = {};
            member.sys_id = membersGR.user.sys_id.toString();
            member.name = membersGR.user.getDisplayValue();
            membersArray.push(member);
 
        } //close while
 
        return JSON.stringify(membersArray);
 
    }, //close function
   
   
    type: 'AssignmentGroupUtils'
});


//Client Script JSON

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }
 
    var membersGA = new GlideAjax('AssignmentGroupUtils');
    membersGA.addParam('sysparm_name', 'countGroupMembers');
    membersGA.addParam('sysparm_group_id', g_form.getValue('assignment_group'));
    membersGA.getXMLAnswer(membersParse);
 
    function membersParse(response) {
        var members = JSON.parse(response);
 
        if (members.length > 0) {
            var randomNum = Math.floor(Math.random() * members.length);
            g_form.setValue('assigned_to', members[randomNum].sys_id, members[randomNum].name);
        } else {
            g_form.setValue('assigned_to', '');
            alert('O assignment group não tem nenhum user atribuído');
        }
    }
}


//FIM


//Integração com REST usando Rest message, client script e script include

//Primeiro criar um rest message com a autenticação e tudo

//Script Include

var ViaCEPUtils = Class.create();
ViaCEPUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
buscarEndereco: function() {
    var cep = this.getParameter('sysparm_cep');
 
    var data = {
        success: true,
        payload: null
    };
 
    try {
        var viacepRADefaultGet = new sn_ws.RESTMessageV2('ViaCEP', 'Default GET');//colocar o nome da sua REST message e o método
        viacepRADefaultGet.setStringParameterNoEscape('u_cep', cep);
 
        var response = viacepRADefaultGet.execute();
        var responseBody = response.getBody();
 
        data.success = true;
        data.payload = JSON.parse(responseBody);
    } catch (error){
        data.success = false;
        data.payload = error;
    }
    return JSON.stringify(data);
},
    type: 'ViaCEPUtils'
});


//Client Script

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
       return;
    }
  
    var cep = String(newValue).trim();
  
    if(cep.length !=8) {
     alert('O CEP deve conter 8 números');
     limparCampos();
     return;
    }
  
    habilitarOuDesabilitarCampos(false);
  
    var viaCEPUtilsGA = new GlideAjax('global.ViaCEPUtils'); //APIname do script include "tem que ficar negrito e itálico"
    viaCEPUtilsGA.addParam('sysparm_name', 'buscarEndereco');
    viaCEPUtilsGA.addParam('sysparm_cep', cep);
  
    viaCEPUtilsGA.getXMLAnswer(handleParseAnswer);
  
    function handleParseAnswer(answer) {
     var resposta = JSON.parse(answer);
    }
 }


 //Client script #1

 function onLoad() {
    //Type appropriate comment here, and begin script below
    if(g_form.isNewRecord()){
         g_form.setValue('caller_id', '62826bf03710200044e0bfc8bcbe5df1');
    }
 }


 //Client script #2

 function onLoad() {
    //Type appropriate comment here, and begin script below
    if(g_form.isNewRecord()){
         var user = g_user.userID
         /* g_form.setValue('caller_id', '62826bf03710200044e0bfc8bcbe5df1'); */
         g_form.setValue('caller_id', user);
    }
 }

 //Client script #3

 function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
       return;
    }
    
    if(newValue == 1){
         alert('Prioridade foi para P1')
    }
    
 }


 //Client script #4

 function onLoad() {
    
	var isvip = g_form.getReference('caller_id', callBackMethod);
	
}
	
	function callBackMethod(isvip){
	
		if(isvip.vip.toString() == 'true'){
		alert('User is VIP');
	}
	
 
}