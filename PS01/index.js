var svg = d3.select('svg').append('g').attr('transform','translate(100,100)');


var allData;
var current;
var former;
gender= current;

//axes
//var ScaleX = d3.scalePoint().domain(["None", "Diploma from Dance School", "Diploma from Performing Arts School", "Bachelor's Degree", " Advanced Diploma from Dance School", "Advanced Diploma from Performing Arts School","Graduate Degree"]).range([0, 800]);
var ScaleX = d3.scalePoint().domain(["1", "2", "3", "4", "5", "6","7"]).range([0, 800]);
var ScaleY = d3.scaleLinear().domain([0,30]).range([400, 0]);
svg.append("g")
    .attr('transform','translate(0,400)')
    .call(d3.axisBottom(ScaleX))
    .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

svg.append("g")
    .call(d3.axisLeft(ScaleY));


svg.append('text')
    .text('DANCER EDUCATION LEVELS')
    .attr('transform','translate(500, -20)')
    .style('text-anchor','middle');

svg.append('text')
    .text('Highest Dance Education Level')
    .attr('transform','translate(250, 600)');

svg.append('text')
    .text('Highest Non-Dance Education Level')
    .attr('transform', 'translate(-75,300)rotate(270)');

//import the data from the .csv file
d3.csv('./data.csv', function(dataIn) {

    allData = dataIn;

    current = dataIn.filter(function(d){
        return d.A1CURFOR == 1;
    });
    former = dataIn.filter(function(d){
        return d.A1CURFOR == 2;
    });

    console.log(current);
    console.log(former);


    //bind the data to the d3 selection, but don't draw it yet
    svg.selectAll('circles')
        .data(current)
        .enter()
        .append('circle')
        .attr('class','c_data')
        .attr('r', 5)
        .attr('fill', "purple");

    svg.selectAll('circles')
        .data(former)
        .enter()
        .append('circle')
        .attr('class','f_data')
        .attr('r', 5)
        .attr('fill', "grey");


    drawPoints(current);

});




//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    svg.selectAll('.c_data')
        .data(pointData)
        .attr('cx',function(d){   //look up values for all the attributes that might have changed, and draw the new circles
            return ScaleX(d.A6QUALS1);
        })
        .attr('cy',function(d){
            return ScaleY(d.A8ABEGTR);
        });

    svg.selectAll('.f_data')
        .data(pointData)
        .attr('cx',function(d){
            return ScaleX(d.A6QUALS1);
        })
        .attr('cy',function(d){
            return ScaleY(d.A8CBGPCR);
        });
}


/*
//this function runs when the HTML button is clicked.
function buttonClicked(){

    //check to see whether the tracker variable is true. If it is, use the 2017 data set
    if(clicked == true){
        drawPoints(data2000);  //call the draw function again, to redraw the circles
        clicked = false;       //reset the value of the tracker variable
    }
    else{   //if the tracker variable is not true, use the 2016 data set
        drawPoints(data2016);
        clicked = true;
    }



}*/