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
var standard = [{
	"id": "installningar",
	"extraonclick": "",
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
	},{
		"type": "underhead",
		"text": {
			"sv": "Text storlek",
			"eng": "Text size"
		}
	},{
		"type": "select",
		"id": "settingstextsize",
		"placeholder": {
			"sv": "Välj önskad text storlek",
			"eng": "Select desired text size"
		},
		"options": ['0.5', '1', '1.5', '2', '2.5', '3'],
		"change": "textsize(this);"
	}]
}, {
	"id": "chart",
	"extraonclick": "addchart();",
	"menu": {
		"sv": "Statistik",
		"eng": "Stastistics"
	},
	"content": [{
		"type": "head",
		"text": {
			"sv": "Statistik",
			"eng": "Stastistics"
		}
	},{
		"type": "wrapper",
		"id": "chartwrapper"
	}]
}, {
	"id": "vadardetta",
	"extraonclick": "",
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
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
function localStorageSearch(){
	var allid = [];
	for (var i = 0; i < localStorage.length; i++) {
		allid.push(localStorage.key(i));
	};
	return allid;
};
function addchart(){
	var allid = localStorageSearch();
	var data = [];
	var dates = {};
	for (var i = 0; i < modules.length; i++) {
		var datainside = [];
		for (var a = 0; a < allid.length; a++) {
			if(modules[i].onchange == allid[a].split('-')[0]){
				datainside.push(allid[a]);
				var rensa = allid[a].split(modules[i].onchange + '-')[1]
				if(!dates[rensa]){
					dates[rensa] = modules[i].onchange;
				}else{
					dates[rensa] = modules[i].onchange + ', ' + dates[rensa];
				};
			};
		};
		var scale = {"id": modules[i].onchange, "dataid": datainside.sort()};
		data.push(scale);
	};
	var alladatum = Object.keys(dates);
	var seriesdata = [];
	var seriesdatatwo = [];
	for (var a = 0; a < modules.length; a++) {
		var moduledata = [];
		var moduledatatwo = {"id": modules[a].onchange, "data": []};
		for (var i = 0; i < alladatum.length; i++) {
			var idtag = modules[a].onchange + '-' + alladatum[i];
			if(!localStorage.getItem(idtag)){
				moduledata.push(null);
				moduledatatwo.data.push(null)
			}else{
				var encodeinfo = sjcl.decrypt(sessionStorage.getItem('pw'), localStorage.getItem(idtag));
				moduledata.push(encodeinfo);
				moduledatatwo.data.push(encodeinfo);
			};
		};
		seriesdatatwo.push(moduledatatwo);
	};
	console.log(seriesdatatwo);
	var chartwrapper = document.getElementById('chartwrapper');
		removechilds(chartwrapper);
	for (var i = 0; i < seriesdatatwo.length; i++) {
		var underhead = document.createElement('h2');
			var underheadtext = document.createTextNode(capitalizeFirstLetter(seriesdatatwo[i].id));
			underhead.appendChild(underheadtext);
		chartwrapper.appendChild(underhead);
		var chartdiv = document.createElement('div');
			chartdiv.setAttribute('class', 'ct-chart ct-golden-section');
			chartdiv.setAttribute('id', 'chart' + seriesdatatwo[i].id);
		chartwrapper.appendChild(chartdiv);
		new Chartist.Line('#chart' + seriesdatatwo[i].id, {
			labels: alladatum,
			series: [seriesdatatwo[i].data]
		});
	};
};
function error(type, text){
	var message = document.getElementById('message');
		removechilds(message);
		var text = document.createTextNode(text);
		message.appendChild(text);
		message.setAttribute('class', type + ' show');
		setTimeout(function(){message.removeAttribute('class');}, 3000);
};
function brake(element){element.appendChild(document.createElement('br'));};
function pasteinfo(data){
	var info = document.getElementById('editor').getElementsByClassName('ql-editor')[0];
	brake(info);
	for (var i = 0; i < data.length; i++){
		if(data[i][0] == 'text'){
			var grundtext = document.createTextNode(data[i][1]);
			info.appendChild(grundtext);
		}else if(data[i][0] == 'lank'){
			var link = document.createElement('a');
				link.setAttribute('href', '#');
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
			var img = document.createElement('img');
				img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAAB3CAYAAAD2OykMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1Qjk0MTlGOTkxREUxMUU4ODk1OTg4QTlCMUFFQzJGMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1Qjk0MTlGQTkxREUxMUU4ODk1OTg4QTlCMUFFQzJGMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVCOTQxOUY3OTFERTExRTg4OTU5ODhBOUIxQUVDMkYyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVCOTQxOUY4OTFERTExRTg4OTU5ODhBOUIxQUVDMkYyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2SNK8AAACFJJREFUeNrsnQto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');
				img.setAttribute('alt', data[i][1]);
				img.setAttribute('data-type', data[i][0]);
				img.setAttribute('data-source', data[i][2]);
				img.setAttribute('onclick', "larger(this)");
				img.setAttribute('class', "icon");
			info.appendChild(img);
		}else if(data[i][0] == 'pdf'){
			var img = document.createElement('img');
				img.setAttribute('src', 'data:image/png;base64,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');
				img.setAttribute('alt', data[i][1]);
				img.setAttribute('data-type', data[i][0]);
				img.setAttribute('data-source', data[i][2]);
				img.setAttribute('onclick', "larger(this)");
				img.setAttribute('class', "icon");
			info.appendChild(img);
		}else if(data[i][0] == 'youtube'){
			var img = document.createElement('img');
				img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAAB3CAYAAAD2OykMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1Qjk0MTlGOTkxREUxMUU4ODk1OTg4QTlCMUFFQzJGMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1Qjk0MTlGQTkxREUxMUU4ODk1OTg4QTlCMUFFQzJGMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVCOTQxOUY3OTFERTExRTg4OTU5ODhBOUIxQUVDMkYyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVCOTQxOUY4OTFERTExRTg4OTU5ODhBOUIxQUVDMkYyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2SNK8AAACFJJREFUeNrsnQto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');
				img.setAttribute('alt', data[i][1]);
				img.setAttribute('data-type', data[i][0]);
				img.setAttribute('data-source', data[i][2]);
				img.setAttribute('onclick', "larger(this)");
				img.setAttribute('class', "icon");
			info.appendChild(img);
		}else{
			console.log(data[i][0] + ' som typ av info stödjs inte!');
			error('error', 'Typ av information stödjs in att klistras in.');
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
	document.activeElement.blur();
	var type = element.getAttribute('data-type');
	var modal = document.getElementById('myModal');
	var modalImg = document.getElementById("img01");
		removechilds(modalImg);
		if(type == 'bild'){
			var img = document.createElement('img');
				img.setAttribute('src', element.src);
			modalImg.appendChild(img);
			var captionText = document.getElementById("caption");
				modal.style.display = "block";
				captionText.innerHTML = element.getAttribute('alt');
		}else if(type == 'youtube'){
			var source = element.getAttribute('data-source');
			var iframe = document.createElement('iframe');
				iframe.setAttribute('width', '100%');
				iframe.setAttribute('height', '315px');
				iframe.setAttribute('src', 'https://www.youtube.com/embed/' + source + '?rel=0');
				iframe.setAttribute('frameborder', '0');
				iframe.setAttribute('allowfullscreen', 'allowfullscreen');
			modalImg.appendChild(iframe);
			var captionText = document.getElementById("caption");
				modal.style.display = "block";
				captionText.innerHTML = element.getAttribute('alt');
		}else if(type == 'video'){
			var source = element.getAttribute('data-source');
			var iframe = document.createElement('iframe');
				iframe.setAttribute('width', '100%');
				iframe.setAttribute('height', '315px');
				iframe.setAttribute('src', source);
				iframe.setAttribute('frameborder', '0');
				iframe.setAttribute('allowfullscreen', 'allowfullscreen');
			modalImg.appendChild(iframe);
			var captionText = document.getElementById("caption");
				modal.style.display = "block";
				captionText.innerHTML = element.getAttribute('alt');
		}else if(type == 'pdf' || type == 'lank'){
			document.getElementById('infoicon').setAttribute('class', 'fas fa-times-circle');
			document.getElementById('infoicon').setAttribute('data-active', 'true');
			showwrapper('preview');
			var source = element.getAttribute('data-source');
			var wrapperpew = document.getElementById('preview');
				removechilds(wrapperpew);
				var iframe = document.createElement('iframe');
					iframe.setAttribute('width', '100%');
					iframe.setAttribute('height', '100%');
					iframe.setAttribute('src', source);
					iframe.setAttribute('frameborder', '0');
					iframe.setAttribute('allowfullscreen', 'allowfullscreen');
				wrapperpew.appendChild(iframe);
		}else{
			console.log(type + ' som typ av info stödjs inte att visas i större förhandsgranskning!');
		};
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
	var tosave = sjcl.encrypt(sessionStorage.getItem('pw'), document.getElementById('editor').getElementsByClassName('ql-editor')[0].innerHTML);
	localStorage.setItem('patdag-' + document.getElementById('datum').innerText, tosave);
};
function loadsave(){
	var data = localStorage.getItem('patdag-' + document.getElementById('datum').innerText);
	if(!data){
		var editorelem = document.getElementById('editor').getElementsByClassName('ql-editor')[0];
		removechilds(editorelem);
		/*var dagenscitat = document.createElement('p');
			var dagenscitattext = document.createTextNode('');
			dagenscitat.appendChild(dagenscitattext);
		editorelem.appendChild(dagenscitat);*/
	}else{
		var encodeinfo = sjcl.decrypt(sessionStorage.getItem('pw'), data);
		document.getElementById('editor').getElementsByClassName('ql-editor')[0].innerHTML = encodeinfo;
	};
	loadSettingScale();
	//scale('Vad är det för väder idag?', '1', '3', '5', 'vader');
	loadSprak();
	loadsettingtextsize();
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
				}else if(data[i].type == 'wrapper'){
					var span = document.createElement('span');
						span.setAttribute('id', data[i].id);
					wrapper.appendChild(span);
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
	for (var i = 0; i < standard.length; i++){
		var p = document.createElement('p');
			p.setAttribute('onclick', standard[i].extraonclick + 'showwrapper(\'' + standard[i].id + '\');')
			var button = document.createTextNode(getLanguage(standard[i].menu))
			p.appendChild(button);
		wrapper.appendChild(p);
		writeinformation(standard[i].id, standard[i].content);
	};
};
function textsize(element){
	if(element.value == ''){}else{
		var styleelem = document.getElementById('textsizestyle');
		var number = Number(element.value);
		var newcode = document.createTextNode('#datum, p, h3 {font-size: ' + number + 'em} h1 {font-size: ' + (number + 1) + 'em} #menu p, h2 {font-size: ' + (number + 0.5) + 'em}');
		if(!styleelem){
			var head = document.getElementsByTagName('head')[0];
				var style = document.createElement('style');
					style.setAttribute('type', 'text/css');
					style.setAttribute('id', 'textsizestyle');
					style.appendChild(newcode);
				head.appendChild(style);
		}else{
			removechilds(styleelem);
			styleelem.appendChild(newcode);
		};
		localStorage.setItem('settingstextsize', element.value);
	};
};
function loadsettingtextsize(){
	var number = localStorage.getItem('settingstextsize');
	if(!number){}else{
		var settingselect = document.getElementById('settingstextsize')
		settingselect.value = number;
		textsize(settingselect);
	};
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