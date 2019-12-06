
id = sessionStorage.getItem("id");
var path = window.location.pathname;
var page = path.split("/").pop();
//sessionStorage.clear();

function parsedate(date){
	var a = new Date(date);
	var year = a.getFullYear();
	var month = a.getMonth()+1;
	var day = a.getDate();
	if (day < 10){ day = "0"+day; }
	var hour = a.getHours();
	if (hour < 10){ hour = "0"+hour; }
	var min = a.getMinutes();
	if (min < 10){ min = "0"+min; }
	var sec = a.getSeconds();
	if (sec < 10){ sec = "0"+sec; }
	var time = day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
	return time;
}

function get_alert(){
	var xhttplogin = new XMLHttpRequest();
	xhttplogin.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {						
			jsonlist = JSON.parse(this.response);
			if (jsonlist["result"] != "error"){
				html = '<table id="table" class="table table-striped table-bordered" style="width:100%"><thead><tr>'
				+'<th>Nom</th><th>Prénom</th><th>Date</th><th>Localisation</th></tr></thead><tbody>';
				for ( alerte in jsonlist["alerts"]) {
					html += "<tr>";
						html += "<td>"+jsonlist["alerts"][alerte]["faname"]+"</td>"
						+"<td>"+jsonlist["alerts"][alerte]["finame"]+"</td>"
						+"<td>"+parsedate(jsonlist["alerts"][alerte]["date"])+"</td>"
						+"<td><a href='https://www.google.com/maps/search/?api=1&query="+jsonlist["alerts"][alerte]["lat"]+","+jsonlist["alerts"][alerte]["lng"]+"'>"
						+jsonlist["alerts"][alerte]["lat"]+" LAT "+jsonlist["alerts"][alerte]["lng"]+" LNG</a></td>"		
					html += "</tr>";
				}
				html += "</tbody></table>";
				document.getElementById("table_div").innerHTML = html;
				
				initDataTable("#table",3);
			}else{
				alert(liste["message"]);
			}
		}
	};
	url_send = "";
	xhttplogin.open("post", 'https://arveto.io/listallalerts', false);
	xhttplogin.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhttplogin.send(url_send);
}



setInterval(get_alert, 10000);

get_alert();
