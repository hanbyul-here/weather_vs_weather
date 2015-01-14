var london_graph;
var nyc_graph;
var first = 0;

$(document).ready(function(){ 
	london_graph = new graph("london");
	nyc_graph = new graph("nyc");
	london_graph.setup();
	nyc_graph.setup();

	updateData(51.5286416,-0.1015987,"#london",london_graph);
	updateData(40.7056258,-73.97968,"#nyc",nyc_graph);

});


//update current temperature + humicity + weather description data 

var updateData = function(latq,lonq,selector_q,graph){
    //send ajax get request to openweather         
    $.ajax({
        crossDomain:true,
		type:"GET",
		contentType: "application/json; charset=utf-8",
		url:"http://api.openweathermap.org/data/2.5/weather?lat="+latq+"&lon="+lonq,
        dataType:'jsonp'			
	})
	.done(function(data){

		//cod implies data is appropriate or not
		
		if(data.cod ===200){
			$(selector_q+" .title_part .cityname").text(data.name + ", "+ data.sys.country);
			$(selector_q+" .title_part .desc").text(data.weather[0].description);	
			$(selector_q+" .info_part .temperature").text(kToF(data.main.temp).toString()+"°F");	
			$(selector_q+" .info_part .humidity").text(data.main.humidity);
			updateGraph(data.id,graph,selector_q);
		}else{
			//when data is not avilable
			$(selector_q+" .title_part .cityname").text("");
			$(selector_q+" .desc").text("Weather data is currently not available for this area, try later.");
			$(selector_q+" .title_part .desc").text("");	
			$(selector_q+" .info_part .temperature").text("");	
			$(selector_q+" .info_part .humidity").text("");
			$(selector_q+" .graph svg g").text("");
		}
	})
	.fail(function(jqxhr,textstat,errthrown){
		
		$(selector_q+" .title_part .cityname").text("");
		$(selector_q+" .desc").text("Weather data is currently not available for this area, try later.");
		$(selector_q+" .title_part .desc").text("");	
		$(selector_q+" .info_part .temperature").text("");	
		$(selector_q+" .info_part .humidity").text("");
		$(selector_q+" .graph svg g").text("");
	});

}

// update temperature history data + graph

function updateGraph(city_q,graph,selector_q){

	var curr_time_f = new Date().getTime();
	var past_time_f = curr_time_f - 600*60*1000;

	var curr_time = Math.floor(curr_time_f/1000).toString();
	var past_time = Math.floor(past_time_f/1000).toString();

	var q_default = "http://api.openweathermap.org/data/2.5/history/city?id="+city_q+"&type=hour&start="+past_time+"&end="+curr_time;
		
	$.ajax({
        crossDomain:true,
		type:"GET",
		contentType: "application/json; charset=utf-8",
		url:q_default,
        dataType:'jsonp'
	})		
	.done(function(data){

		//when data has record for weather
		if(data.cnt > 1){
		 	
		 	$(selector_q+" .graph svg g").text("");		 	     	
			$(selector_q+" .graph .no_history_data").text("");
			graph.draw_graph(data);

		 }else{
		 	$(selector_q+" .graph svg g").text("");
		 	$(selector_q+" .graph .no_history_data").text("Temerpature history data is currently not available on this area");
		 
		}
	})
	.fail(function(jqxhr,textstat,errthrown){
		$(selector_q+" .graph svg g").text("");
		$(selector_q+" .graph .no_history_data").text("Temerpature history data is currently not available");
	});
}


//kelving -> F / C

function kToF(kelvin){
	var temp = ((Math.floor(((kelvin-278.15)*1.5+32))*100)/100);
	return temp;
}	