// Use d3 library to read in "samples.json" file and 
// URL: https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch json data and console log it
d3.json(url).then(function (bb_data) {
    console.log(bb_data);
});

// Greek god names
let id = samples.map(function (row){
    return row.greekName
  });
  
  // Trace for the Greek Data
  let trace1 = {
      x: samples.map(row => row.greekName),
      y: samples.map(row => row.greeksamples),
      type: "bar"
    };
  
  // Data trace array
  let data = [trace1];
  
  // Apply a title to the layout
  let layout = {
    title: "Greek gods search results"
  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
  

// // // Intruction: Create horizontal bar chart with dropdown menu.  Display the top 10 OTUs for each individual 
// // // Get ids, out_ids and sample values
// let dropDownList = Object.values(bb_data.id);
// let top10_otu_id = Object.values(bb_data.otu_ids);
// let top10_otu_vals = Object.values(bb_data.sample_values);

// // //Use function to initialse the page with a default plot
// function init(){
//     data1 = [{
//         x: bb_data.map(row => row.top10_otu_vals.slice[0,10]),
//         y: bb_data.map(row => row.top10_otu_id.slice[0,10]),
//         type: "bar",
//         labels: dropDownList,
//         title: "Top 10 OTUs by Individual"}];
    
//    Plotly.newPlot("bar", data1)
// };

// init()

// // Call to update the charts upon new selection

// // d3.selectAll("#selDataset").on("change", updateData);

// // function updateData(){
// //     let dropDownList = d3.select("#selDataset");
// // }
// // // render the plot to teh div tab with id "bar"



// // init()

// // USE TO SELECT ALL PLOTS?
// // d3.selectAll("li").on("click", function() {
// //     // you can select the element just like any other selection
// //     let listItem = d3.select(this);
// //     listItem.style("color", "blue");
  
// //     let listItemText = listItem.text();
// //     console.log(listItemText);
// //   });
//   // // get top 10 OTU ids for each individual
// // let top10_otu = bb_data.map(function (row){
// //     return row.samples.otu_ids.slice[0,10]
// //   });

// // // get values for top 10 OTU's for each individual
// // let top10_otu_vals = bb_data.map(function (row){
// //     return row.samples.otu_ids.slice[0,10]
// //   });