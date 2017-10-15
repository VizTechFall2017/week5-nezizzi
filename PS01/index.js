var svg = d3.select('svg').append('g').attr('transform','translate(100,100)');


var allData;
var male;
var female;
gender= female;

//axes
var ScaleX = d3.scaleLinear().domain([0,30]).range([0, 450]);
var ScaleY = d3.scaleLinear().domain([0,30]).range([400, 0]);
svg.append("g")
    .attr('transform','translate(0,400)')
    .call(d3.axisBottom(ScaleX));
svg.append("g")
    .call(d3.axisLeft(ScaleY));


//import the data from the .csv file
d3.csv('./data.csv', function(dataIn) {

    allData = dataIn;

    //save the objects from the .csv with female
    female = dataIn.filter(function(d){
        return d.A2GENDER == 1;
    });

    //save the objects from the .csv with male
    male = dataIn.filter(function(d){
        return d.A2GENDER == 2;
    });
    console.log(female);
    console.log(male);



    svg.append('text')
        .text('TITLE HERE')
        .attr('transform','translate(300, -20)')
        .style('text-anchor','middle');

    svg.append('text')
        .text('NOT SURE YET')
        .attr('transform','translate(260, 440)');

    svg.append('text')
        .text('NOT SURE YET')
        .attr('transform', 'translate(-50,250)rotate(270)');

    //bind the data to the d3 selection, but don't draw it yet
    svg.selectAll('circles')
        .data(current)
        .enter()
        .append('circle')
        .attr('class','c_dataPoints')
        .attr('r', 5)
        .attr('fill', "purple");

    svg.selectAll('circles')
        .data(former)
        .enter()
        .append('circle')
        .attr('class','f_dataPoints')
        .attr('r', 5)
        .attr('fill', "grey");

    //call the drawPoints function below, and hand it the data2016 variable with the 2016 object array in it
    //drawPoints(data2016);

});


/*

//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    svg.selectAll('.w_dataPoints')  //select all of the circles with dataPoints class that we made using the enter() commmand above
        .data(pointData)          //re-attach them to data (necessary for when the data changes from 2016 to 2017)
        .attr('cx',function(d){   //look up values for all the attributes that might have changed, and draw the new circles
            return scaleX(d.age);
        })
        .attr('cy',function(d){
            return scaleY(d.women);
        });

    svg.selectAll('.m_dataPoints')  //do the same for the men's data series
        .data(pointData)
        .attr('cx',function(d){
            return scaleX(d.age);
        })
        .attr('cy',function(d){
            return scaleY(d.men);
        });
}

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