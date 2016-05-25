(function() {
  document.getElementById("left_arrow").addEventListener("click", prev);
  document.getElementById("right_arrow").addEventListener("click", next);
  search_btn = document.getElementById("search");
  search_btn.addEventListener("click", submit);
  query =  document.getElementById("query");
  result_count = document.getElementById("result_count");
  pagination = document.getElementById("pagination");
  result_table = document.getElementById("result_table");
  page = 0;
  limit = 5;
  total = 0;
  api_version = 3
})();

function submit() { 
  search_btn.disabled = true;
  var query_string = query.value.trim();
  if(query_string != ''){
    var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	  {
	    if (xhttp.readyState == 4 && xhttp.status == 200)
	      {
	        eval(xhttp.responseText);
	        search_btn.disabled = false;
	       }
	   }; 
     xhttp.open("GET", "https://api.twitch.tv/kraken/search/streams?q="+query_string+"&limit="+limit+"&offset="+page*limit+"&api_version="+api_version+"&callback=twitch_callback", false);
	 xhttp.send();
  }
}

function next() {
  last_page = Math.floor(total/limit);
  if(page != last_page) {
    page++;
    submit();
   }
}

function prev(){
	if(page != 0) {
		page--;
		submit();
	}
}

function twitch_callback(data){
  total = data._total;
  result_count.innerHTML = 'Total Results: ' + total

  if(total > 0) {
    last_page = Math.floor(total/limit);
	pagination.innerHTML = page+1 + '/' + last_page;
	result_table.innerHTML = build_html(data.streams);
   }
   else
	  pagination.innerHTML = '0/0';
}

function build_html(streams) {
	html = '';
	for (i = 0; i < 5; i++) {
		html += '<tr>\
					<td>\
						<img src="'+ streams[i].preview.medium +'">\
					</td>\
					<td>\
						<h2>'+ streams[i].channel.display_name +'</h2>\
						<hr>\
						'+ streams[i].game +' - '+ streams[i].viewers + ' viewers' + '\
						<hr>\
						<div class="text">\
							Stream description text text text texttext text text texttext text text texttext text text texttext text text texttext text text texttext text text texttext text text texttext text text texttext text text texttext text text texttext text text texttext text text texttext text text texttext text text texttexttext text text texttext text text texttext text text texttext text text texttext text text texttext text text texttext text text texttext text text....\
						</div>\
					</td>\
				</tr>';		
	}
	return html;
}
