var svg = d3.select('svg').append('g').attr('transform','translate(100,100)');


var allData;
var male;
var female;
gender= female;

//axes
var ScaleX = d3.scalePoint().domain(["None", "Diploma from Dance School", "Diploma from Performing Arts School", "Bachelor's Degree", " Advanced Diploma from Dance School", "Advanced Diploma from Performing Arts School","Graduate Degree"]).range([0, 800]);
var ScaleY =d3.scalePoint().domain(["None", "Completed Primary School", "Completed Secondary School", "Post Secondary Diploma", "Bachelor's Degree", "Graduate Degree"]).range([500, 0]);
svg.append("g")
    .attr('transform','translate(85,500)')
    .call(d3.axisBottom(ScaleX));
svg.append("g")
    .attr('transform','translate(85,0)')
    .call(d3.axisLeft(ScaleY));


svg.append('text')
    .text('TITLE HERE')
    .attr('transform','translate(300, -20)')
    .style('text-anchor','middle');

svg.append('text')
    .text('NOT SURE YET1')
    .attr('transform','translate(260, 440)');

svg.append('text')
    .text('NOT SURE YET')
    .attr('transform', 'translate(-50,250)rotate(270)');

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
   // console.log(female);
    //console.log(male);


    f_current = female.filter(function(d){
        return d.A1CURFOR == 1;
    });
    f_former = female.filter(function(d){
        return d.A1CURFOR == 2;
    });
    m_current = male.filter(function(d){
        return d.A1CURFOR == 1;
    });
    m_former = male.filter(function(d){
        return d.A1CURFOR == 2;
    });

});

/*
    //console.log(m_current);
    //console.log(m_former);
    //console.log(f_current);
    //console.log(f_former);


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
    drawPoints(f_current);
    drawPoints(f_former);


});

/*



//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    svg.selectAll('.c_dataPoints')  //select all of the circles with dataPoints class that we made using the enter() commmand above
        .data(pointData)          //re-attach them to data (necessary for when the data changes from 2016 to 2017)
        .attr('cx',function(d){   //look up values for all the attributes that might have changed, and draw the new circles
            return scaleX(d.);
        })
        .attr('cy',function(d){
            return scaleY(d.women);
        });

    svg.selectAll('.f_dataPoints')  //do the same for the men's data series
        .data(pointData)
        .attr('cx',function(d){
            return scaleX(d.age);
        })
        .attr('cy',function(d){
            return scaleY(d.men);
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