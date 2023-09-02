// Define the URL variable at the top level of your script so that it's accessible by both functions.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to initialize the page
function init() {
  // Fetch the JSON data
  d3.json(url).then(function(data) {
    const bb_data = data.samples;

    // Create a dropdown list of IDs
    let dropDownList = d3.select("#selDataset");
    bb_data.forEach(({ id }) => {
      dropDownList.append("option").text(id);
    });

    // Get the first ID and update the plots
    const initialID = bb_data[0].id;
    updatePlotly(initialID, bb_data);
  });
}

// Function to update the plots based on the selected ID
function updatePlotly(selectedID, bb_data) {
  const selectedData = bb_data.find(item => item.id === selectedID);
  
  // Rest of your updatePlotly code...
}

// Initialize the page
init();

// Add event listener to the dropdown
d3.selectAll("#selDataset").on("change", function () {
  const selectedID = d3.select("#selDataset").property("value");
  updatePlotly(selectedID, bb_data); // Pass bb_data to updatePlotly
});// const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function init();
// d3.json(url).then(function (data) {
//   const bb_data = data.samples;
//   console.log(bb_data);

//   let dropDownList = bb_data.map(({id})=> id);
//     console.log(dropDownList);

//   let top10_otu_id = bb_data.map(row => row.otu_ids.slice(0, 10));
//   let top10_otu_vals = bb_data.map(row => row.sample_values.slice(0, 10));
//   data1 = [{
//     x: top10_otu_vals[1], 
//     y: top10_otu_id[0],
//     // y: top10_otu_id[0],
//     // axisY : {prefix: "OTU "},
//     type: "bar",
//     orientation: "h",     
//     title: `Top 10 OTUs by Individual: {$top10_otu_id}`,
//   }];

//   Plotly.newPlot("bar", data1);

//   d3.selectAll("#selDataset").on("onchange", updatePlotly);
// //create call function to activate change in drop down menue 
// function updatePlotly(){
//   let dropDownList = d3.select("#selDataset");
//   // let dataset = dropDownList.property(i_id);

//   for(let i_id = 0; i_id < dropDownList.length; i_id ++) {
//     d3.select("#selDataset")
//     .append("option")
//     .text(dropDownList[i])
//   };
//   //initialise x and y arrays

//   if (dataset === "selDataset"){
//       x = top10_otu_vals[0]
//       y = top10_otu_id[0]};
//   }})
// init()

// Function to initialize the page
function init() {
  d3.json(url).then(function (data) {
    const bb_data = data.samples;

    // Create a dropdown list of IDs
    let dropDownList = d3.select("#selDataset");
    bb_data.forEach(({ id }) => {
      dropDownList.append("option").text(id);
    });

    // Get the first ID and update the plots
    const initialID = bb_data[0].id;
    updatePlotly(initialID);
  });
}

// Function to update the plots based on the selected ID
function updatePlotly(selectedID) {
  d3.json(url).then(function (data) {
    const bb_data = data.samples;
    const selectedData = bb_data.find(item => item.id === selectedID);

    // Create a horizontal bar chart with top 10 OTUs by Individual
    const top10_otu_id = selectedData.otu_ids.slice(0, 10);
    const top10_otu_vals = selectedData.sample_values.slice(0, 10);

    var data1 = {
      x: top10_otu_vals,
      y: top10_otu_id.map(id => `OTU ${id}`),
      type: "bar",
      orientation: "h",
    };

    var layout1 = {
      title: `Top 10 OTUs by Individual: ${selectedID}`,
    };

    // Update the bar chart
    Plotly.newPlot("bar", [data1], layout1);

    // Create a bubble (scatter) chart which displays each OTU by Individual
    const x_otu_id = selectedData.otu_ids;
    const y_otu_vals = selectedData.sample_values;

    var data2 = [{
      x: x_otu_id,
      y: y_otu_vals,
      mode: 'markers',
      marker: {
        color: x_otu_id,
        opacity: 0.6,
        size: y_otu_vals,
      },
    }];

    var layout2 = {
      title: `OTU Sample Size by Individual: ${selectedID}`,
    };

    // Update the bubble chart
    Plotly.newPlot("bubble", data2, layout2);
//   });
// }

// // Initialize the page
// init();

// // Add event listener to the dropdown
// d3.selectAll("#selDataset").on("change", function () {
//   const selectedID = d3.select("#selDataset").property("value");
//   updatePlotly(selectedID);
// });
// Function to initialize the page
function init() {
  d3.json(url).then(function (data) {
    const bb_data = data.samples;

    // Create a dropdown list of IDs
    let dropDownList = d3.select("#selDataset");
    bb_data.forEach(({ id }) => {
      dropDownList.append("option").text(id);
    });

    // Get the first ID and update the plots
    const initialID = bb_data[0].id;
    updatePlotly(initialID);
  });
}

// Function to update the plots based on the selected ID
function updatePlotly(selectedID) {
  d3.json(url).then(function (data) {
    const bb_data = data.samples;
    const selectedData = bb_data.find(item => item.id === selectedID);
