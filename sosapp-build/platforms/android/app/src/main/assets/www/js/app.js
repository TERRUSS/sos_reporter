
id = sessionStorage.getItem("id");
var path = window.location.pathname;
var page = path.split("/").pop();
//sessionStorage.clear();


function post_request_assinc(path, params, method='POST') {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			alert(JSON.stringify(this.response));
			return this.response;
		}
	};
	url_send = new URLSearchParams(params).toString();
	xhttp.open(method, path, true);
	xhttp.responseType = "json";
	xhttp.send(url_send);
}

function post_request(path, params, method='POST') {
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			return this.response;
		}
	};
	url_send = new URLSearchParams(params).toString();
	xhttp.open(method, path, false);
	xhttp.send(url_send);
}

function timeConverter(timestamp){
  var a = new Date(timestamp);
  var year = a.getFullYear();
  var month = a.getMonth()+1;
  var day = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function errorfunction(error){
	switch(error.code) {
		case error.TIMEOUT:
			alert(error.message);
		break;
		case error.PERMISSION_DENIED:
			alert(error.message);
		break;
		default:
			alert(error.message);
			break;
	}
}
	
function successfunction(position){
	var date = timeConverter(position.timestamp);
	

	var xhttplogin = new XMLHttpRequest();
	xhttplogin.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {						
			liste = JSON.parse(this.response);
			if (liste["result"] != "error"){
				document.getElementById("btnsos").innerHTML = "SOS ENVOYÉ !";
				setTimeout(function (){ document.getElementById("btnsos").innerHTML = "SOS"; },1000);
			}else{
				alert(liste["message"]);
			}
		}
	};
	url_send = "id="+id+"&latitude="+position.coords.latitude+"&longitude="+position.coords.longitude+"&date="+date;
	xhttplogin.open("post", 'https://arveto.io/newalert', false);
	xhttplogin.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhttplogin.send(url_send);
	
}


function sos(){
	navigator.geolocation.getCurrentPosition(successfunction, errorfunction, {maximumAge:5000, timeout:2000});
}


window.addEventListener('load', function() {
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.getElementsByClassName('needs-validation');
	// Loop over them and prevent submission
	var validation = Array.prototype.filter.call(forms, function(form) {
		
	  form.addEventListener("submit", function(event) {
		if (form.checkValidity() === false) {
		  event.preventDefault();
		  event.stopPropagation();
			
		}else{
			var path = window.location.pathname;
			var page = path.split("/").pop();
			
			if (page == "index.html" || page == ""){

				var login_user = document.getElementById("login").value;
				var mdp_user = document.getElementById("mdp").value;

				/*  NOM PRENOM BASE DE DONNÉE + Création de localstorage*/				
				
				var xhttplogin = new XMLHttpRequest();
				xhttplogin.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {						
						liste = JSON.parse(this.response);
						if (liste["result"] != "error"){
							sessionStorage.setItem("id",liste['id']['id']);
						}else{
							alert(liste["message"]);
						}
					}
				};
				url_send = "login="+login_user+"&password="+mdp_user;
				xhttplogin.open("post", 'https://arveto.io/login', false);
				xhttplogin.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhttplogin.send(url_send);


			}else if (page == "register.html"){
				var mdp_user = document.getElementById("mdp").value;
				var nom_user = document.getElementById("nom").value;
				var prenom_user = document.getElementById("prenom").value;

				var login_user = prenom_user+nom_user;
				/*  NOM PRENOM BASE DE DONNÉE + Création de localstorage*/
				
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						liste = JSON.parse(this.response);
						if (liste["result"] != "error"){
							sessionStorage.setItem("id",liste['id'][0]);
						}else{
							alert(liste["message"]);
						}
					}
				};
				url_send = "login="+login_user+"&password="+mdp_user+"&faname="+nom_user+"&finame="+prenom_user;
				xhttp.open("post", 'https://arveto.io/signup', false);
				xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhttp.send(url_send);	
			}
		}
		form.classList.add('was-validated');
	  }, false);
	});
}, false);


