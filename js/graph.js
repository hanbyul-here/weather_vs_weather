function graph(city_q){

	this.svg;
	this.margin;
	this.width;
	this.height;
	this.city_q = city_q;


	this.setup = function(){

		var selector_q = "#"+this.city_q+" .graph";

		var margin = {top: 30, right: 0, bottom: 10, left: 30};
		this.width = $(selector_q).width() - margin.left - margin.right;
		this.height = 100 - margin.top - margin.bottom;

		

		this.svg = d3.select(selector_q)
	    	.append("svg")
	        .attr("width", this.width + margin.left + margin.right)
	        .attr("height", this.height + margin.top + margin.bottom)
	    	.append("g")
	        .attr("transform", 
	              "translate(" + margin.left + "," + margin.top + ")");
	}
 
	function kToF(kelvin){
		var temp = ((Math.floor(((kelvin-278.15)*1.5+32))*100)/100);
		return temp;
	}
	
	function kToC_(kelvin){
		var temp = (Math.floor((kelvin-273.15)*100)/100);
		return temp;
	}




	this.draw_graph = function(data){
		console.log("drawn");
	

		var tempValues = [];


		for(var i =0; i<data.list.length; i++){
			tempValues.push(kToF(parseFloat(data.list[i].main.temp)));
		}
		console.log(tempValues.length);
		// make buffer for graph
		var buffer  = 0.3;
		
		
		var xScale = d3.scale.linear().domain([0,tempValues.length]).range([0,this.width]);	
		var yScale = d3.scale.linear()   
	                   .domain([d3.min(tempValues)-buffer,d3.max(tempValues)+buffer])
	                   .range([this.height,0]);

		var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(3);
		var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(3);

		// A line generator, for the dark stroke.
		var line = d3.svg.line()
		    .x(function(d,i) { return xScale(i) })
		    .y(function(d,i) { return yScale(d); })
		    .interpolate("interpolate");


		 // Add the clip path.
		 this.svg.append("clipPath")
		      .attr("id", "clip")
		    .append("rect")
		      .attr("width", this.width)
		      .attr("height", this.height);

		 this.svg.selectAll('.line')
		    .data([tempValues])
		    .enter()
		      .append('path')
		        .attr('class', 'line')
		        .attr('clip-path', 'url(#clip)')
		        .attr('d', function(d,i) {
		          return line(d,i);

		        });

		this.svg.append("g")
		    .attr("class", "y axis")
		    .call(yAxis);

		}

		this.update = function(data){
			var selector_q = "#"+this.city_q+" .graph";
			$(this.city_q+" .graph").text("");
		
			var tempValues = [];
			var buffer = 0.3;

			for(var i =0; i<data.list.length; i++){
				tempValues.push(kToF(parseFloat(data.list[i].main.temp)));
			}

					var xScale = d3.scale.linear().domain([0,tempValues.length]).range([0,this.width]);	
		var yScale = d3.scale.linear()   
	                   .domain([d3.min(tempValues)-buffer,d3.max(tempValues)+buffer])
	                   .range([this.height,0]);

		var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(3);
		var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(3);


		var line =  d3.svg.line()
		    .x(function(d,i) { return xScale(i) })
		    .y(function(d,i) { return yScale(d); })
		    .interpolate("interpolate");


			    // Make the changes
        	this.svg.select(".line")   // change the line
            	.attr("d", function(d,i){
            		return line(d,i);
            	});
    
        	this.svg.select(".y.axis") // change the y axis
            	.call(yAxis);


		}

		this.remove = function(){


			
			if((".graph svg g #clip").length>0){
				console.log("deleted");
						 	$(selector_q+" .graph").text("");
				d3.select(".graph svg g path").remove();
				d3.select(".graph svg g g").remove();
			}

		}
}

