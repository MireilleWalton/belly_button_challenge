const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function (samples) {
    console.log(samples)});

//

  let dropDownList = Object.values(samples.id);
  console.log(bb_data.id)
  let top10_otu_id = Object.values(samples.otu_ids);
  let top10_otu_vals = Object.values(samples.sample_values);

// 

function init(){
    data1 = [{
        x: samples.map(row => row.top10_otu_vals.slice[0,10]),
        y: samples.map(row => row.top10_otu_id.slice[0,10]),
        type: "bar",
        labels: dropDownList,
        title: "Top 10 OTUs by Individual"}];
    
   Plotly.newPlot("bar", data1)
};



// let id = data.map(function (row){
//     return row.samples.id
//   });

// console.log(id)
  
//   // Trace for the Greek Data
//   let trace1 = {
//       x: samples.map(row => row.greekName),
//       y: samples.map(row => row.greeksamples),
//       type: "bar"
//     };
  
//   // Data trace array
//   let data = [trace1];
  
//   // Apply a title to the layout
//   let layout = {
//     title: "Greek gods search results"
//   };
  
//   // Render the plot to the div tag with id "plot"
//   Plotly.newPlot("plot", data, layout);
  



// // // Intruction: Create horizontal bar chart with dropdown menu.  Display the top 10 OTUs for each individual 
// // // Get ids, out_ids and sample values
// let dropDownList = Object.values(samples.id);
// console.log(samples.id)
// let top10_otu_id = Object.values(samples.otu_ids);
// let top10_otu_vals = Object.values(samples.sample_values);

// // //Use function to initialse the page with a default plot
// function init(){
//     data1 = [{
//         x: samples.map(row => row.top10_otu_vals.slice[0,10]),
//         y: samples.map(row => row.top10_otu_id.slice[0,10]),
//         type: "bar",
//         labels: dropDownList,
//         title: "Top 10 OTUs by Individual"}];
    
//    Plotly.newPlot("bar", data1)
// };

// init()