const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function init();
d3.json(url).then(function (data) {
  const bb_data = data.samples;
  console.log(bb_data);

  let dropDownList = bb_data.map(({id})=> id);
    console.log(dropDownList);

  let top10_otu_id = bb_data.map(row => row.otu_ids.slice(0, 10));
  let top10_otu_vals = bb_data.map(row => row.sample_values.slice(0, 10));
  data1 = [{
    x: top10_otu_vals[1], 
    y: {"OTU": top10_otu_id[0]},
    // y: top10_otu_id[0],
    // axisY : {prefix: "OTU "},
    type: "bar",
    orientation: "h",     
    title: `Top 10 OTUs by Individual: {$top10_otu_id}`,
  }];

  Plotly.newPlot("bar", data1);

  d3.selectAll("#selDataset").on("onchange", updatePlotly);
//create call function to activate change in drop down menue 
function updatePlotly(){
  let dropDownList = d3.select("#selDataset");
  let dataset = dropDownList.property("#selDataset");

  //initialise x and y arrays

  if (dataset === "selDataset"){
      x = top10_otu_vals[0]
      y = top10_otu_id[0]};
  }
});
d3.selectAll("#selDataset").on("onchange", updatePlotly);
//create call function to activate change in drop down menue 
function updatePlotly(){
  let dropDownList = d3.select("#selDataset");
  let dataset = dropDownList.property("#selDataset");

  //initialise x and y arrays

  if (dataset === "selDataset"){
      x = top10_otu_vals[0]
      y = top10_otu_id[0]};
  }
// init()