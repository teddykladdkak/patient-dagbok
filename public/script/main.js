var modules = [{
	"text": {
		"sv": "Hur mår du idag?",
		"eng": "How do you feel today?"
	},
	"min": "1",
	"val": "3",
	"max": "5",
	"onchange": "moodscale"
},{
	"text": {
		"sv": "Hur är smärtan idag?",
		"eng": "Whats your pain scale?"
	},
	"min": "1",
	"val": "1",
	"max": "10",
	"onchange": "painscale"
}];

function brake(element){element.appendChild(document.createElement('br'));};
function pasteinfo(data){
	var info = document.getElementById('info');
	brake(info);
	for (var i = 0; i < data.length; i++){
		if(data[i][0] == 'text'){
			var grundtext = document.createTextNode(data[i][1]);
			info.appendChild(grundtext);
		}else if(data[i][0] == 'lank'){
			var link = document.createElement('a');
				link.setAttribute('href', '#');
				//link.setAttribute('onclick', 'openInNewTab("' + data[i][2] + '")');
				link.setAttribute('onclick', "larger(this)");
				link.setAttribute('data-type', data[i][0]);
				link.setAttribute('data-source', data[i][2]);
				link.setAttribute('target', '_blank');
				var linktext = document.createTextNode(' ' + data[i][1]);
				link.appendChild(linktext);
			info.appendChild(link);
		}else if(data[i][0] == 'bild'){
			var img = document.createElement('img');
				img.setAttribute('src', data[i][2]);
				img.setAttribute('alt', data[i][1]);
				img.setAttribute('data-type', data[i][0]);
				img.setAttribute('onclick', "larger(this)");
			info.appendChild(img);
		}else if(data[i][0] == 'video'){
			var video = document.createElement('video');
				video.setAttribute('id', 'video');
				video.setAttribute('alt', data[i][1]);
				video.setAttribute('onclick', "larger(this)");
				video.setAttribute('data-type', data[i][0]);
				video.setAttribute('data-source', data[i][2]);
				var source = document.createElement('source');
					source.setAttribute('src', data[i][2]);
					source.setAttribute('type', "video/mp4");
				video.appendChild(source);
			info.appendChild(video);
		}else if(data[i][0] == 'pdf'){
			var img = document.createElement('img');
				img.setAttribute('src', 'icons/pdf.png');
				img.setAttribute('alt', data[i][1]);
				img.setAttribute('data-type', data[i][0]);
				img.setAttribute('data-source', data[i][2]);
				img.setAttribute('onclick', "larger(this)");
			info.appendChild(img);
		}else if(data[i][0] == 'youtube'){
			var img = document.createElement('img');
				img.setAttribute('src', 'https://i.ytimg.com/vi/' + data[i][2] + '/hqdefault.jpg');
				img.setAttribute('alt', data[i][1]);
				img.setAttribute('data-type', data[i][0]);
				img.setAttribute('data-source', data[i][2]);
				img.setAttribute('onclick', "larger(this)");
			info.appendChild(img);
		}else{
			console.log(data[i][0] + ' som typ av info stödjs inte!');
		};
	};
	brake(info);
};
function openInNewTab(url) {var win = window.open(url, '_blank');win.focus();};
function showfirstelem(){
	var wrapper = document.getElementById('buttons');
	var alldivs = wrapper.getElementsByTagName('div');
	for (var i = alldivs.length - 1; i >= 0; i--) {
		alldivs[i].setAttribute('style', 'display: none;');
	};
	alldivs[0].removeAttribute('style');
	document.getElementById('left').removeAttribute('style');
};
function larger(element){
	var type = element.getAttribute('data-type');
	var modal = document.getElementById('myModal');
	var modalImg = document.getElementById("img01");
		removechilds(modalImg);
		if(type == 'bild'){
			var img = document.createElement('img');
				img.setAttribute('src', element.src);
			modalImg.appendChild(img);
		}else if(type == 'youtube'){
			var source = element.getAttribute('data-source');
			var iframe = document.createElement('iframe');
				iframe.setAttribute('width', '100%');
				iframe.setAttribute('height', '315px');
				iframe.setAttribute('src', 'https://www.youtube.com/embed/' + source + '?rel=0');
				iframe.setAttribute('frameborder', '0');
				iframe.setAttribute('allowfullscreen', 'allowfullscreen');
			modalImg.appendChild(iframe);
		}else if(type == 'video'){
			var source = element.getAttribute('data-source');
			var video = document.createElement('video');
				video.setAttribute('width', '100%');
				video.setAttribute('controls', '');
				video.setAttribute('data-video', '0');
				var sourceelem = document.createElement('source');
					sourceelem.setAttribute('src', source);
					sourceelem.setAttribute('type', 'video/mp4');
				video.appendChild(sourceelem);
				video.appendChild(document.createTextNode('Tyvärr kan inte video laddas.'));
			modalImg.appendChild(video);
		}else if(type == 'pdf' || type == 'lank'){
			var source = element.getAttribute('data-source');
			var iframe = document.createElement('iframe');
				iframe.setAttribute('width', '100%');
				iframe.setAttribute('height', '315px');
				iframe.setAttribute('src', source);
				iframe.setAttribute('frameborder', '0');
				iframe.setAttribute('allowfullscreen', 'allowfullscreen');
			modalImg.appendChild(iframe);
		}else{
			console.log(type + ' som typ av info stödjs inte att visas i större förhandsgranskning!');
		};
	var captionText = document.getElementById("caption");
		modal.style.display = "block";
		captionText.innerHTML = element.getAttribute('alt');
};
function hidelarger(){
	var modalImg = document.getElementById("img01");
		removechilds(modalImg);
	var modal = document.getElementById('myModal');
		modal.style.display = "none";
};
function newwrapper(id, hide){
	//Lägg till funktion som läser av sidan ifall id redan existerar? Använda return för att visa vilket id som valdes?
	var wrapper = document.getElementById('buttons');
		var start = document.createElement('div');
			start.setAttribute('id', id);
			if(!hide){}else{
				start.setAttribute('style', 'display: none;');
			};
		wrapper.appendChild(start);
};
function makeid(namn){return namn.replace(/\s/g,'').replace( /\W/g , '').toLowerCase();};
function show(id, element){
	document.getElementById('left').setAttribute('style', 'color: white;')
	element.parentElement.setAttribute('style', 'display: none;');
	document.getElementById(id).removeAttribute('style');
};
function removechilds(parent){
	if(parent.hasChildNodes()){
		while (parent.hasChildNodes()) {
			parent.removeChild(parent.firstChild);
		};
	};
};
function addzero(number){if(number <= 9){return "0" + number;}else{return number;};};
function getDate(dateannan, timeannan, milisecsave){
	if(!dateannan && !timeannan && !milisecsave){
		var date = new Date();
	}else if(!milisecsave){
		var annatdatum = dateannan.split('-');
		var annattid = timeannan.split(':');
		var date = new Date(annatdatum[0], annatdatum[1] - 1, annatdatum[2], annattid[0], annattid[1]);
	}else{
		var date = new Date(parseInt(milisecsave));
	};
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mm = date.getMinutes();
	var milisec = date.getTime();
	var datum = y + '-' + addzero(m) + '-' + addzero(d);
	var tid = addzero(h) + ':' + addzero(mm);
	return {"datum": datum, "tid": tid, "milisec": milisec};
};
function load(){
	bulidmenu();
	var datumhead = document.getElementById('datum');
		removechilds(datumhead);
		var datumtext = document.createTextNode(getDate().datum);
		datumhead.appendChild(datumtext);
	checkpwsave();
};
function scale(text, min, val, max, onchange){
	var wrapper = document.getElementById('bedomning');
		var p = document.createElement('p');
			var ptext = document.createTextNode(text);
			p.appendChild(ptext);
		wrapper.appendChild(p);
		var valuewrapper = document.createElement('div');
			valuewrapper.setAttribute('class', 'valuewrapper');
		wrapper.appendChild(valuewrapper);
		var inputwrapper = document.createElement('div');
			inputwrapper.setAttribute('class', 'inputwrapper');
			var input = document.createElement('input');
				input.setAttribute('type', 'range');
				input.setAttribute('min', min);
				input.setAttribute('max', max);
				input.setAttribute('value', loadModule(onchange, val));
				input.setAttribute('onchange', onchange + '(this)');
			inputwrapper.appendChild(input);
		wrapper.appendChild(inputwrapper);
	window[onchange](input);
};
function painscale(element){
	saveModule('painscale', element.value);
};
function moodscale(element){
	var wrapper = element.parentElement.parentElement.getElementsByClassName('valuewrapper')[0];
	removechilds(wrapper);
	if(element.value == 1){
		var ico = ['fas fa-thumbs-down', 'fas fa-frown'];
	}else if(element.value == 2){
		var ico = ['fas fa-frown'];
	}else if(element.value == 3){
		var ico = ['fas fa-meh'];
	}else if(element.value == 4){
		var ico = ['fas fa-smile'];
	}else if(element.value == 5){
		var ico = ['fas fa-thumbs-up', 'fas fa-smile'];
	};
	for (var i = ico.length - 1; i >= 0; i--) {
		var icon = document.createElement('i');
			icon.setAttribute('class', ico[i]);
			icon.setAttribute('aria-hidden', 'true');
		wrapper.appendChild(icon);
	};
	saveModule('moodscale', element.value);
};
function saveModule(id, val){
	var datum = document.getElementById('datum').innerText;
	if(!sessionStorage.getItem('pw')){}else{
		var tosave = sjcl.encrypt(sessionStorage.getItem('pw'), val);
		localStorage.setItem(id + '-' + datum, tosave);
	};
};
function loadModule(id, val){
	var datum = document.getElementById('datum').innerText;
	var savedata = localStorage.getItem(id + '-' + datum);
	if(!savedata){
		return val;
	}else{
		var encodeinfo = sjcl.decrypt(sessionStorage.getItem('pw'), savedata);
		return encodeinfo;
	};
};
function showqr(element){
	if(!document.getElementById('password').getAttribute('style')){}else{
		document.getElementById('infoicon').setAttribute('class', 'fas fa-info-circle');
		document.getElementById('infoicon').setAttribute('data-active', 'false');
		if(element.getAttribute('data-active') == 'false'){
			element.setAttribute('data-active', 'true');
			element.setAttribute('class', 'fas fa-times-circle');
			showwrapper('qrwrapper');
		}else if(element.getAttribute('data-active') == 'true'){
			element.setAttribute('data-active', 'false');
			element.setAttribute('class', 'fas fa-qrcode');
			showwrapper('patient');
		};
	};
};
//  http://bitwiseshiftleft.github.io/sjcl/
function save(){
	var tosave = sjcl.encrypt(sessionStorage.getItem('pw'), document.getElementById('info').innerHTML);
	localStorage.setItem('patdag-' + document.getElementById('datum').innerText, tosave);
};
function loadsave(){
	var data = localStorage.getItem('patdag-' + document.getElementById('datum').innerText);
	if(!data){
		removechilds(document.getElementById('info'));
	}else{
		var encodeinfo = sjcl.decrypt(sessionStorage.getItem('pw'), data);
		document.getElementById('info').innerHTML = encodeinfo;
	};
	loadSettingScale();
	//scale('Vad är det för väder idag?', '1', '3', '5', 'vader');
	loadSprak();
	showwrapper('patient');
};
function loadSprak(){
	if(!localStorage.getItem('firstlang')){}else{
		document.getElementById('settingsprakforsta').value = localStorage.getItem('firstlang');
	};
	if(!localStorage.getItem('secondlang')){}else{
		document.getElementById('settingsprakandra').value = localStorage.getItem('secondlang');
	};
};
function loadSettingScale(){
	removechilds(document.getElementById('bedomning'));
	var settingscale = localStorage.getItem('settingscale');
	if(!settingscale){
		scale(getLanguage(modules[0].text), modules[0].min, modules[0].val, modules[0].max, modules[0].onchange);
	}else{
		var toarray = JSON.parse(settingscale);
		for (var i = 0; i < toarray.length; i++){
			var scaleinformation = JSON.parse(toarray[i]);
			scale(getLanguage(scaleinformation.text), scaleinformation.min, scaleinformation.val, scaleinformation.max, scaleinformation.onchange);
			var checkbox = document.getElementById('settingscale' + scaleinformation.onchange);
				checkbox.setAttribute('class', 'fas fa-toggle-on settingscale');
				checkbox.setAttribute('data-status', 'on');
		};
	};
};
function newmonth(ar, manad, todo){
	var nyar = ar;
	if(todo == '-'){
		var nymanad = parseInt(manad) - 1;
	}else if(todo == '+'){
		var nymanad = parseInt(manad) + 1;
	}else{
		var nymanad = manad;
	};
	if(nymanad <= 0){
		var nyar = parseInt(ar) - 1;
	};
	if(nymanad >= 13){
		var nyar = parseInt(ar) + 1;
	};
	return {"ar": nyar, "manad": addzero(nymanad)};
};
function annanmanad(todo){
	var datesplit = document.getElementById('datum').getElementsByTagName('th')[0].innerText.split('-');
	var nymanad = newmonth(datesplit[0], datesplit[1], todo);
	writeCal(nymanad.ar, nymanad.manad);
};
function annandag(todo, date){
	var datelem = document.getElementById('datum');
	document.getElementById('dateback').setAttribute('onclick', 'annandag(\'-\')');
	document.getElementById('forward').setAttribute('onclick', 'annandag(\'+\')');
	var nuvarandedatum = datelem.innerText;
	var milisec = getDate(nuvarandedatum, '01:00', '').milisec;
	removechilds(document.getElementById('bedomning'));
	if(todo == '-'){
		var nyttmilisec = milisec - 86400000;
	}else if(todo == '+'){
		var nyttmilisec = milisec + 86400000;
	}else if(todo == '='){
		var nyttmilisec = getDate(date, '01:00', '').milisec;
	};
	var nyttdatum = getDate('', '', nyttmilisec);
	removechilds(datelem);
	var nydattext = document.createTextNode(nyttdatum.datum);
	datelem.appendChild(nydattext);
	loadsave();
	setTimeout(function(){
		document.getElementById('datum').setAttribute('onclick', 'writeCal(this);');
	}, 500);
};
function pwdots(num){
	var pwdots = document.getElementById('pwdots').getElementsByTagName('span');
	for (var i = 0; i < pwdots.length; i++){
		pwdots[i].removeAttribute('class');
	};
	for (var i = 0; i < num; i++){
		pwdots[i].setAttribute('class', 'pwmarked');
	};
}
function checkpwsave(){
	var pw = sessionStorage.getItem('pw');
	if(!pw){
		showwrapper('password');
	}else{
		if(checkpw()){
			loadsave();
		}else{
			showwrapper('password');
		};
	};
};
function addpwnum(element){
	var inputelem = document.getElementById('pwinput');
	inputelem.value = inputelem.value + element.innerText;
	if(inputelem.value.length == 4){
		sessionStorage.setItem('pw', inputelem.value);
		if(checkpw()){
			loadsave();
		};
	}else{
		pwdots(inputelem.value.length);
	};
};
function removepwnum(){
	var inputelem = document.getElementById('pwinput');
	inputelem.value = inputelem.value.slice(0, -1);
	pwdots(inputelem.value.length);
};
function pwerror(){
	console.log('ERRROR!!!!');
	sessionStorage.removeItem('pw');
	var pwdots = document.getElementById('pwdots').getElementsByTagName('span');
	for (var i = 0; i < pwdots.length; i++){
		pwdots[i].setAttribute('class', 'pwerror');
	};
	document.getElementById('pwinput').value = '';
};
function checkpw(){for (var i = 0; i <= localStorage.length - 1; i++) { var key = localStorage.key(i);if(key.split('-')[0] == 'patdag'){try {var encodeinfo = sjcl.decrypt(sessionStorage.getItem('pw'), localStorage.getItem(key));return true;} catch(e) {pwerror();return false;};};};return true;};
function showwrapper(id){
	var allwrappers = document.getElementsByClassName('wrapper');
	for (var i = allwrappers.length - 1; i >= 0; i--) {
		allwrappers[i].setAttribute('style', 'display: none;');
	};
	document.getElementById(id).removeAttribute('style');
};
function showmenu(element){
	if(!document.getElementById('password').getAttribute('style')){}else{
		document.getElementById('qricon').setAttribute('class', 'fas fa-qrcode');
		document.getElementById('qricon').setAttribute('data-active', 'false');
		if(element.getAttribute('data-active') == 'false'){
			element.setAttribute('data-active', 'true');
			element.setAttribute('class', 'fas fa-times-circle');
			showwrapper('menu');
		}else if(element.getAttribute('data-active') == 'true'){
			element.setAttribute('data-active', 'false');
			element.setAttribute('class', 'fas fa-info-circle');
			showwrapper('patient');
		};
	};	
};
function writeinformation(id, data){
	var body = document.getElementById('informationswrappers');
		var outwrapper = document.createElement('div');
			outwrapper.setAttribute('class', 'wrapper information');
			outwrapper.setAttribute('id', id);
			outwrapper.setAttribute('style', 'display: none;');
			var wrapper = document.createElement('div');
				wrapper.setAttribute('class', 'innerinformation');
			for (var i = 0; i < data.length; i++){
				if(data[i].type == 'head'){
					var h1 = document.createElement('h1');
						var text = document.createTextNode(getLanguage(data[i].text));
						h1.appendChild(text);
					wrapper.appendChild(h1);
				}else if(data[i].type == 'underhead'){
					var h2 = document.createElement('h2');
						var text = document.createTextNode(getLanguage(data[i].text));
						h2.appendChild(text);
					wrapper.appendChild(h2);
				}else if(data[i].type == 'text'){
					var p = document.createElement('p');
						var text = document.createTextNode(getLanguage(data[i].text));
						p.appendChild(text);
					wrapper.appendChild(p);
				}else if(data[i].type == 'img'){
					var imgwrap = document.createElement('div');
						imgwrap.setAttribute('class', 'imgwrap');
						var img = document.createElement('img');
							img.setAttribute('src', data[i].adress);
						imgwrap.appendChild(img);
					wrapper.appendChild(imgwrap);
				}else if(data[i].type == 'button'){
					var input = document.createElement('input');
						input.setAttribute('type', 'button');
						input.setAttribute('value', getLanguage(data[i].text));
						input.setAttribute('onclick', data[i].click);
					wrapper.appendChild(input);
				}else if(data[i].type == 'select'){
					var select = document.createElement('select');
						select.setAttribute('onchange', data[i].change);
						select.setAttribute('id', data[i].id);
						var first = document.createElement('option');
							first.setAttribute('value', '');
							var firsttext = document.createTextNode(getLanguage(data[i].placeholder));
							first.appendChild(firsttext);
						select.appendChild(first);
						for (var a = 0; a < data[i].options.length; a++){
							var option = document.createElement('option');
								option.setAttribute('value', data[i].options[a]);
								var optiontext = document.createTextNode(data[i].options[a]);
								option.appendChild(optiontext);
							select.appendChild(option);
						};
					wrapper.appendChild(select);
				}else if(data[i].type == 'scale'){
					for (var a = 0; a < modules.length; a++){
						var checkdiv = document.createElement('p');
							var checkbox = document.createElement('i');
								checkbox.setAttribute('id', 'settingscale' + modules[a].onchange);
								checkbox.setAttribute('class', 'fas fa-toggle-off settingscale');
								checkbox.setAttribute('data-prop', JSON.stringify(modules[a]));
								checkbox.setAttribute('onclick', 'checkscale(this);');
								checkbox.setAttribute('data-status', 'off');
							checkdiv.appendChild(checkbox);
							var checktext = document.createTextNode(getLanguage(modules[a].text));
							checkdiv.appendChild(checktext);
						wrapper.appendChild(checkdiv);
					};
				};
			};
			outwrapper.appendChild(wrapper);
		body.appendChild(outwrapper);
};
function checkscale(element){
	if(element.getAttribute('data-status') == 'off'){
		element.setAttribute('class', 'fas fa-toggle-on settingscale');
		element.setAttribute('data-status', 'on');
	}else{
		element.setAttribute('class', 'fas fa-toggle-off settingscale');
		element.setAttribute('data-status', 'off');
	};
	var allsettingscale = document.getElementsByClassName('settingscale');
	var tosave = [];
	for (var i = 0; i < allsettingscale.length; i++){
		if(allsettingscale[i].getAttribute('data-status') == 'on'){
			tosave.push(allsettingscale[i].getAttribute('data-prop'));
		};
	};
	if(tosave.length == 0){
		localStorage.removeItem('settingscale');
	}else{
		localStorage.setItem('settingscale', JSON.stringify(tosave));
	};
	loadSettingScale();
};
function bulidmenu(){
	var body = document.getElementById('informationswrappers');
	removechilds(body);
	var local = JSON.parse(localStorage.getItem('skrivin'));
	var wrapper = document.getElementById('menu');
	removechilds(wrapper);
	if(!local){}else{
		for (var i = 0; i < local.length; i++){
			var p = document.createElement('p');
				p.setAttribute('onclick', 'showwrapper(\'' + local[i].id + '\');')
				var button = document.createTextNode(getLanguage(local[i].menu));
				p.appendChild(button);
			wrapper.appendChild(p);
			writeinformation(local[i].id, local[i].content);
		};
	};
	var standard = [{
		"id": "installningar",
		"menu": {
			"sv": "Inställningar",
			"eng": "Settings"
		},
		"content": [{
			"type": "head",
			"text": {
				"sv": "Inställningar",
				"eng": "Settings"
			}
		},{
			"type": "underhead",
			"text": {
				"sv": "Informations sidor",
				"eng": "Information pages"
			}
		},{
			"type": "button",
			"text": {
				"sv": "Ta bort avdelningsinformation",
				"eng": "Remove ward information"
			},
			"click": "settingskrivut();"
		},{
			"type": "underhead",
			"text": {
				"sv": "Språk",
				"eng": "Language"
			}
		},{
			"type": "select",
			"id": "settingsprakforsta",
			"placeholder": {
				"sv": "Välj förstaspråk",
				"eng": "Select first language"
			},
			"options": ['sv', 'eng'],
			"change": "andrasprak('forsta', this);"
		},{
			"type": "select",
			"id": "settingsprakandra",
			"placeholder": {
				"sv": "Välj andraspråk",
				"eng": "Select second language"
			},
			"options": ['sv', 'eng'],
			"change": "andrasprak('andra', this);"
		},{
			"type": "underhead",
			"text": {
				"sv": "Skala",
				"eng": "Scale"
			}
		},{
			"type": "scale"
		}]
	}, {
		"id": "vadardetta",
		"menu": {
			"sv": "Vad är PatientDagboken?",
			"eng": "What is PatientDagboken (Patient diary)"
		},
		"content": [{
			"type": "head",
			"text": {
				"sv": "Vad är PatientDagboken?",
				"eng": "What is PatientDagboken (Patient diary)"
			}
		},{
			"type": "text",
			"text": {
				"sv": "Detta är ett projekt som ämnar ge dig som patient möjlighet att skapa dagbok under din vårdtid. Skillnaden mellan denna och alla andra dagböcker som finns på marknaden är att du inte är ensam att skriva, vårdpersonalen hjälper till att skriva i dagboken genom att klistra in information.",
				"eng": "This is a project that aims to give you as a patient the opportunity to create a diary during your care period. The difference between this and all other diaries on the market is that you are not alone in writing, the healthcare staff helps to write in the diary by pasting information."
			}
		},{
			"type": "text",
			"text": {
				"sv": "All informaiton som skrivs här är din och kan inte läsas av någon annan, det är upp till dig ifall du vill delge din information till vårdpersonalen.",
				"eng": "All information written here is yours and can not be read by anyone else, it is up to you if you want to share your information with healthcare professionals."
			}
		}]
	}];
	for (var i = 0; i < standard.length; i++){
		var p = document.createElement('p');
			p.setAttribute('onclick', 'showwrapper(\'' + standard[i].id + '\');')
			var button = document.createTextNode(getLanguage(standard[i].menu))
			p.appendChild(button);
		wrapper.appendChild(p);
		writeinformation(standard[i].id, standard[i].content);
	};
	/*var settingwrapp = document.getElementById('installningar');
	for (var i = 0; i < scaledata.length; i++){
		var checkdiv = document.createElement('div');
			var checkbox = document.createElement('i');
				checkbox.setAttribute('id', 'settingscale' + scaledata[i].onchange);
				checkbox.setAttribute('class', 'fas fa-toggle-off settingscale');
			checkdiv.appendChild(checkbox);
			var checktext = document.createTextNode(getLanguage(scaledata[i].text));
			checkdiv.appendChild(checktext);
		settingwrapp.appendChild(checkdiv);
	};*/
};
function settingskrivut(){
	localStorage.removeItem('skrivin');
	bulidmenu();
	document.getElementById('qricon').setAttribute('data-active', 'false');
	document.getElementById('qricon').setAttribute('class', 'fas fa-qrcode');
	document.getElementById('infoicon').setAttribute('class', 'fas fa-info-circle');
	document.getElementById('infoicon').setAttribute('data-active', 'false');
	showwrapper('patient');
};
function andrasprak(todo, element){
	if(todo == 'forsta'){
		if(element.value == ''){
			localStorage.removeItem('firstlang');
		}else{
			localStorage.setItem('firstlang', element.value);
		};
	}else if(todo == 'andra'){
		if(element.value == ''){
			localStorage.removeItem('secondlang');
		}else{
			localStorage.setItem('secondlang', element.value);
		};
	};
};
function getLanguage(versions){
	var firstlang = localStorage.getItem('firstlang');
	var secondlang = localStorage.getItem('secondlang');
	if(!firstlang && !secondlang){
		if(!versions.sv){
			if(!versions.eng){
				return 'Kunde inte hitta passande språk.'
			}else{
				return versions.eng;
			};
		}else{
			return versions.sv;
		};
	}else{
		if(!versions[firstlang]){
			if(!versions[secondlang]){
				if(!versions.eng){
					if(!versions.sv){
						return 'Kunde inte hitta passande språk.'
					}else{
						return versions.sv;
					};
				}else{
					return versions.eng;
				};
			}else{
				return versions[secondlang];
			};
		}else{
			return versions[firstlang];
		};
	};
};
function daysInMonth (month, year) {return new Date(year, month, 0).getDate();};
function calendararray(ar, manad){
	var d = new Date(parseInt(ar), (parseInt(manad) - 1), 1);
	var dag = parseInt(d.getDay());
	if(dag == 0){dag = 7;};
	var dayinmon = parseInt(daysInMonth((d.getMonth() + 1), d.getFullYear()));
	var manad = [];
	var weekarray = [];
	for (var i = 1; i < dag; i++){weekarray.push('');};
	for (var i = 1; i < 20; i++){weekarray.push(i);var start = i;if(weekarray.length == 7){i = 100;};};
	manad.push(weekarray);
	for (var i = 2; i < 8; i++){var restweek = [];for (var a = 1; a < 8; a++){++start;restweek.push(start);if(dayinmon == start){i = 100;a = 100;};};manad.push(restweek);};
	return manad;
};
function dayContainInfo(ar, manad, dag){
	if(getDate().datum == ar + '-' + manad + '-' + dag){
		var todaystyle = ' border: solid 2px #000';
	}else{
		var todaystyle = '';
	};
	if(dag == '' || !dag){
		return 'color: darkgray;' + todaystyle;
	}else{
		if(!localStorage.getItem('patdag-' + ar + '-' + manad + '-' + dag)){
			return 'color: darkgray;' + todaystyle;
		}else{
			return 'font-weight: bold;' + todaystyle;
		};
	};
};
function writeCal(ar, manad){
	document.getElementById('datum').removeAttribute('onclick');
	document.getElementById('dateback').setAttribute('onclick', 'annanmanad(\'-\')');
	document.getElementById('forward').setAttribute('onclick', 'annanmanad(\'+\')');
	var calendar = document.getElementById('datum');
	if(!ar || !manad){
		var datesplit = calendar.innerText.split('-');
		var ar = datesplit[0];
		var manad = datesplit[1];
	};
	removechilds(calendar);
	var table = document.createElement('table');
		table.setAttribute('style', 'display: inline-block;');
		var thead = document.createElement('thead');
			var theadtr = document.createElement('tr');
				var theadth = document.createElement('th');
					theadth.setAttribute('colspan', '7');
					var theadtext = document.createTextNode(ar + '-' + manad);
					theadth.appendChild(theadtext);
				theadtr.appendChild(theadth);
			thead.appendChild(theadtr);
		table.appendChild(thead);
		var tbody = document.createElement('tbody');
		var manadarray = calendararray(ar, manad);
		for (var i = 0; i < manadarray.length; i++){
			var tr = document.createElement('tr');
			for (var a = 0; a < manadarray[i].length; a++){
				var td = document.createElement('td');
					td.setAttribute('style', dayContainInfo(ar, manad, addzero(manadarray[i][a])));
					td.setAttribute('onclick', 'annandag(\'=\', \'' + ar + '-' + manad + '-' + addzero(manadarray[i][a]) + '\')')
					var tdtext = document.createTextNode(manadarray[i][a]);
					td.appendChild(tdtext);
				tr.appendChild(td);
			};
			tbody.appendChild(tr);
		};
		table.appendChild(tbody);
	calendar.appendChild(table);
};