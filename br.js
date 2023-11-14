
//Before Query Rules
(function executeRule(current, previous /*null when async*/) {

	current.addQuery('priority', 2);
    current.addQuery('priority', [1,2]); //Tem como usar array para o query
	current.addQuery('category', 'hardware');

})(current, previous);


//Before rules (submit/update)
(function executeRule(current, previous /*null when async*/) {

	current.short_description = "Olá";


})(current, previous);



//After rules (submit/update) 
(function executeRule(current, previous /*null when async*/) {

	current.short_description = "Olá";
    current.update() //colocar sempre update pois o after rules é após o update e submit

})(current, previous);


//Usando GlideSystem
(function executeRule(current, previous /*null when async*/) {

	gs.addInfoMessage('Usando Glide System')
    gs.addErrorMessage('Usando Glide System')

})(current, previous);


