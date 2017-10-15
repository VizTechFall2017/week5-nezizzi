var svg = d3.select('svg').append('g').attr('transform','translate(100,100)');


var allData;
var current;
var former;
clicked=true;

//axes
//var ScaleX = d3.scalePoint().domain(["None", "Diploma from Dance School", "Diploma from Performing Arts School", "Bachelor's Degree", " Advanced Diploma from Dance School", "Advanced Diploma from Performing Arts School","Graduate Degree"]).range([0, 800]);
var ScaleX = d3.scalePoint().domain(["1", "2", "3", "4", "5", "6","7"]).range([0, 800]);
var ScaleY = d3.scaleLinear().domain([0,30]).range([400, 0]);
svg.append("g")
    .attr('transform','translate(0,400)')
    .call(d3.axisBottom(ScaleX))
svg.append("g")
    .call(d3.axisLeft(ScaleY));

axislabel = ["None", "Diploma from Dance School", "Diploma from Performing Arts School", "Bachelor's Degree", " Advanced Diploma from Dance School", "Advanced Diploma from Performing Arts School","Graduate Degree"]

/*svg.append('text')
    .text(axislabel)
    .attr('transform','translate(0,450)')
    .attr("text-anchor", "axisBottom");*/


svg.append('text')
    .text('DANCER EDUCATION LEVELS')
    .attr('transform','translate(500, -20)')
    .style('text-anchor','middle');

svg.append('text')
    .text('Highest Dance Education Level')
    .attr('transform','translate(250, 600)');

svg.append('text')
    .text('Age')
    .attr('transform', 'translate(-50,200)rotate(270)');

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
        .attr('class','a_beg')
        .attr('r', 5)
        .attr('fill', "purple");

    svg.selectAll('circles')
        .data(current)
        .enter()
        .append('circle')
        .attr('class','a_prof')
        .attr('r', 5)
        .attr('fill', "grey");


    drawPoints(current);

});




//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    svg.selectAll('.a_beg')
        .data(pointData)
        .attr('cx',function(d){   //look up values for all the attributes that might have changed, and draw the new circles
            return ScaleX(d.A6QUALS1);
        })
        .attr('cy',function(d){
            return ScaleY(d.A8ABEGTR);
        });

    svg.selectAll('.a_prof')
        .data(pointData)
        .attr('cx',function(d){
            return ScaleX(d.A6QUALS1);
        })
        .attr('cy',function(d){
            return ScaleY(d.A8CBGPCR);
        });
}



//this function runs when the HTML button is clicked.
function buttonClicked(){

    if(clicked == true){
        drawPoints(former);
        clicked = false;
    }
    else{
        drawPoints(current);
        clicked = true;
    }


}