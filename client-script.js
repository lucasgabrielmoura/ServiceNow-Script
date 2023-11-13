function onLoad() {
    //Type appropriate comment here, and begin script below
    g_form.addInfoMessage("Teste de Client Script Shark Talent");
    g_form.addErrorMessage("Display error message no topo do formulário");
    g_form.flash("u_nome", "#FFFACD", 0);
    g_form.setValue("u_nome", "Lucas Gabriel");
    g_form.setMandatory("u_e_mail", true);
    g_form.addOption("u_genero", "outra", "outra");
    g_form.removeOption("u_genero", "outra");
    g_form.setLabelOf("u_genero", "Sexo");
    g_form.disableAttachments();
    g_form.showFieldMsg("u_organizacao", "Teste");

    if(g_form.isNewRecord()){
        g_form.addInfoMessage("É um novo registro");
        g_user.firstName;
    }
 }



 function onSubmit() {
    //Type appropriate comment here, and begin script below
    //confirm("Quer isso mesmo?")
    var turma = g_form.getValue('u_nome');
    if(turma === "oi"){
     return confirm("Aqui vai o confirmar");
    }else{
     g_form.addErrorMessage("Não vai salvar!");
     return false;
    }
 }



 function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
       return;
    }
    
    //Lembrando que o campo que será escutado é colocado no formulário na hora da criação do client script
    //Type appropriate comment here, and begin script below
    
 
    g_form.addInfoMessage("O campo nome foi alterado pelo Cliiiiiient Scriiiiiiipt")
 }


 function onCellEdit(sysIDs, table, oldValues, newValue, callback) {
    var saveAndClose = true;

  if(newValue == 6){
      alert("Você não pode mudar o status para Resolved de uma lista");
      saveAndClose = false;
  }
  if(newValue == 7){
      alert("Você não pode mudar o status para Closed de uma lista");
      saveAndClose = false;
  }
callback(saveAndClose); 
}


 //Lab 2.2

function onSubmit() {
 
    if (g_form.getValue('impact') == 1 && g_form.getValue('urgency') == 1 && !g_user.hasRoleExactly('major_inc_mgr')) {
 
        var ans = confirm("The customer is notified of all Priority-1 Incidents. Confirm basic information is included before submitting this P1 incident.\n\nSelect Ok to submit, or Cancel to return to the record.");
 
 
        if (!ans) {
            g_form.addInfoMessage("Incident is not submitted");
            g_form.addInfoMessage("If base information is unavailable, use the 'Additional comments' field to document why it is missing.");
 
            g_form.showFieldMsg('category', "Major Incident base field");
            g_form.showFieldMsg('cmdb_ci', "Major Incident base field");
            g_form.showFieldMsg('assignment_group', "Major Incident base field");
            g_form.showFieldMsg('short_description', "Major Incident base field");
        }
 
        return ans;
 
    }
 
}

 //Lab 2.3

 function onChange(control, oldValue, newValue, isLoading, isTemplate) {
	if (isLoading || newValue == '') {
		return;
	}
	
	//Document the current value of State, if New, use a decoration
	var incState = g_form.getValue('state');
	alert('LUCAS - O Valor do campo state é:' + incState);
	
	if (incState == 1) {
		alert("LUCAS - Linha 11 executada");
		g_form.addDecoration('state', 'icon-edit','Gathering initial details');
		g_form.flash('state', "teal", -4);
	}
	
	//Take this action if the new value of Impact is 1 or 2
	if (newValue == 1 || newValue == 2){
			g_form.removeOption('state', 3);  //On Hold
			g_form.removeOption('state', 6);  //Resolved
			g_form.removeOption('state', 7);  //Closed
			g_form.removeOption('state', 8);  //Canceled
			g_form.addInfoMessage("The State options have been removed");
	}
	
	//Take this action if the form is not loading the new value of Impact is NOT 1 or 2
	else if (!isLoading && newValue != 1 && newValue != 2){
			g_form.clearOption('state');
			g_form.addOption('state', 1, 'New', 0);
			g_form.addOption('state', 2, 'In Progress', 1);
			g_form.addOption('state', 3, 'On Hold', 2);
			g_form.addOption('state', 6, 'Resolved', 3);
			g_form.addOption('state', 7, 'Closed', 4);
			g_form.addOption('state', 8, 'Canceled', 5);
			g_form.setValue('state', incState);
	}
}

