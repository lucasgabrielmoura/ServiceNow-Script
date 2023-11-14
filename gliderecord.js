//+verbosa
 
var gr = new GlideRecord('incident');
gr.addQuery('number', 'INC0009005');
gr.query();
 
if (gr.next()) {
    //exec lógica
}
 
 
//+acertiva
 
var gr = new GlideRecord('incident');
gr.get('49e6b5e047a6351063132398c26d4399'); //colar o sys_id do registro que vc quer afetar
gr.short_description = 'feita alteração pelo background';
gr.update();

// Glide Record
(function executeRule(current, previous /*null when async*/) {

	var vip = new GlideRecord('sys_user');
	var q1 = vip.addQuery('title', 'CONTAINS', 'Vice');
	q1.addOrCondition('title', 'CONTAINS', 'VP');
	q1.addOrCondition('title', 'CONTAINS', 'Chief');
	vip.query();

	while(vip.next()){
		vip.vip = true;
		gs.info('admin: ' + vip.name + 'com title: ' + vip.title + ' é agora um user vip');
		vip.update();
	}

})(current, previous);