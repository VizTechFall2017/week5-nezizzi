var svg = d3.select('svg').append('g').attr('transform','translate(100,100)');


var allData;
var male;
var female;
gender= female;

//axes
//var ScaleX = d3.scalePoint().domain(["None", "Diploma from Dance School", "Diploma from Performing Arts School", "Bachelor's Degree", " Advanced Diploma from Dance School", "Advanced Diploma from Performing Arts School","Graduate Degree"]).range([0, 800]);
//var ScaleY =d3.scalePoint().domain(["None", "Completed Primary School", "Completed Secondary School", "Post Secondary Diploma", "Bachelor's Degree", "Graduate Degree"]).range([400, 0]);
var ScaleX = d3.scalePoint().domain(["1", "2", "3", "4", "5", "6","7"]).range([0, 800]);
var ScaleY =d3.scalePoint().domain(["1", "2", "3", "4", "5", "6"]).range([400, 0]);
svg.append("g")
    .attr('transform','translate(85,400)')
    .call(d3.axisBottom(ScaleX))
    .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

svg.append("g")
    .attr('transform','translate(85,0)')
    .call(d3.axisLeft(ScaleY));


svg.append('text')
    .text('TITLE HERE')
    .attr('transform','translate(300, -20)')
    .style('text-anchor','middle');

svg.append('text')
    .text('Highest Dance Education Level')
    .attr('transform','translate(400, 600)');

svg.append('text')
    .text('Highest Non-Dance Education Level')
    .attr('transform', 'translate(-75,300)rotate(270)');

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



    //console.log(m_current);
    //console.log(m_former);
    //console.log(f_current);
    //console.log(f_former);


    //bind the data to the d3 selection, but don't draw it yet
    svg.selectAll('circles')
        .data(f_current)
        .enter()
        .append('circle')
        .attr('class','f_c')
        .attr('r', 5)
        .attr('fill', "purple");

    svg.selectAll('circles')
        .data(f_former)
        .enter()
        .append('circle')
        .attr('class','f_f')
        .attr('r', 5)
        .attr('fill', "grey");


    drawPoints(f_current);
    //drawPoints(f_former);


});




//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    svg.selectAll('.f_f')
        .data(pointData)
        .attr('cx',function(d){   //look up values for all the attributes that might have changed, and draw the new circles
            return ScaleX(d.A6QUALS1);
        })
        .attr('cy',function(d){
            return ScaleY(d.A6QUALS1);
        });

    svg.selectAll('.f_c')
        .data(pointData)
        .attr('cx',function(d){
            return ScaleX(d.A6QUALS1);
        })
        .attr('cy',function(d){
            return ScaleY(d.A6QUALS1);
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