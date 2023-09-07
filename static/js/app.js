// Store the URL in a variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create a function to initialize the page
function init() {  // start function_1
  // Fetch the "samples" information from the json data  
  d3.json(url).then(function(data) {
    const bb_data = data.samples;

//CREATE DROP DOWN LIST

    // Create a dropdown list of IDs - assistance received from AskBCS
    let dropDownList = d3.select("#selDataset");
    bb_data.forEach(({ id }) => {
      dropDownList.append("option").text(id);
    });

    // Get the first ID and for use when updating the plots and the demographics panel
    const initialID = bb_data[0].id;

    // Call the functions to set up initial charts in the html using the initial ID 
    updateBarPlotly(initialID, bb_data);
    updateBubblePlotly(initialID, bb_data);
    updateDemogPanel(initialID)
    updateGuage(initialID)
  });
}
//CREATE CREATE BAR AND BUBBLE PLOTS

// Function to update the plots based on the selected ID
function updateBarPlotly(selectedID, bb_data) { 

  // Filter the data by the selected ID
  const selectedData = bb_data.find(ID => ID.id === selectedID);

    // Create a horizontal bar chart with top 10 OTUs by Individual
    // Get top 10 data to populate the chart
    const top10_otu_id = selectedData.otu_ids.slice(0, 10);
    const top10_otu_vals_select = selectedData.sample_values.slice(0, 10);

      // Sort the results in ascending order
      let top10_otu_vals = top10_otu_vals_select.sort((firstNum, secondNum) => firstNum - secondNum);
      //console.log(top10_otu_vals); // check values are sorted correctly;

    // populate the chart
    let data1 = [{
      x: top10_otu_vals,
      y: top10_otu_id.map(id => `OTU ${id}`),
      type: "bar",
      orientation: "h",
      marker: {
        color: top10_otu_id},
    }];

    // Define the layout of the chart
    let layout1 = {
      title: `Top 10 OTUs by Individual: ${selectedID}`,
      width: 450,
      height: 390,
      margin: { t: 50, r: 60, l: 60, b: 50 },
      font: {family: "Arial" }
    };

  // Update the bar chart
    Plotly.newPlot("bar", data1, layout1);
  };

// Create a bubble (scatter) chart which displays each OTU by Individual
function updateBubblePlotly(selectedID, bb_data) { // start function_2

  // Filter the data by the selected ID
  const selectedData = bb_data.find(ID => ID.id === selectedID);
    
  // Get data to populate the chart  
  const x_otu_id = selectedData.otu_ids;
    const y_otu_vals = selectedData.sample_values;

    // Filter the data by the selected ID
    let data2 = [{
      x: x_otu_id,
      y: y_otu_vals,
      mode: "markers",
      marker: {
        color: x_otu_id,
        opacity: 0.6,
        size: y_otu_vals,
      }}];
    
    // Define the layout of the chart
    let layout2 = {
      title: `OTU Sample Size by Individual: ${selectedID}`,
        height: 380,
        margin: { t: 50, r: 80, l: 50, b: 50 },
        font: {family: "Arial" }
    };

    // Send the chart to html page
    Plotly.newPlot("bubble", data2, layout2);
  };

//  CREAT DEMOGRAPHICS PANEL

// Fetch the "metadata" information from the json data and add a filter demographic info by individual
// Assistance received from AskBCS
function updateDemogPanel(sample) {
d3.json(url).then(function(data) {

  // Create an array for the metadata
  let demograpics_data = data.metadata;

  // Add a filter to filter data by individual
  let dd_data = demograpics_data.filter(sample_info => sample_info.id == sample);
  
  // Assign the first result to a variable 
  let dd_data_result = dd_data[0];

  // set a variable to store information to be held in the html element
  let dd_panel = d3.select("#sample-metadata");
  dd_panel.html("");

  // iterate through metadata setting key and value information to be displayed in the panel
  Object.entries(dd_data_result).forEach(([key, value]) => {
    dd_panel.append("h6").text(`${key}: ${value}`);
  });
})};

//   BONUS CREATE A GAUGE CHART

// Fetch the "metadata" information from the json data and add a filter demographic info by individual 
function updateGuage(selectedID) {
d3.json(url).then(function(data) {
  let wash_data = data.metadata;
  let wfreq_data = wash_data.filter(sample_info => sample_info.id == selectedID);
  let wfreq_data_result = wfreq_data[0];

// Prepare guage chart for washing frequency
  let wfreq_chart = [{
    type: "indicator", 
    mode: "gauge+number",    
    domain: { x: [0, 1], y: [0, 1] },
    value: wfreq_data_result.wfreq,
    labels: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9"],
    textposition: "inside",
    title: `Belly Button Washing Frequency: ${selectedID} <br> Scubs per week`,
    marker: {
      colors: ["midnightblue"],
      ticks: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9"],},
    gauge: {
      axis: {range: [null, 10]}, 
      bar: {color: "rgb(250, 150, 100)"},
      steps: [
        { range: [0, 1], color: "rgb(194, 105, 119)"},
        { range: [1, 2], color: "rgb(176, 81, 96)" },
        { range: [2, 3], color: "rgb(158, 68, 82)" },
        { range: [3, 4], color: "rgb(140, 56, 68)" },
        { range: [4, 5], color: "rgb(128, 47, 58)" },
        { range: [5, 6], color: "rgb(112, 37, 47)" },
        { range: [6, 7], color: "rgb(99, 29, 38)" },
        { range: [7, 8], color: "rgb(87, 23, 31)" },
        { range: [8, 9], color: "rgb(74, 18, 25)" },
        { range: [9, 10], color: "rgb(56, 12, 18)" }
    ]},            
  }];
  let layout3 = {
    width: 430,
    height: 390,
    margin: { t: 50, r: 60, l: 60, b: 50 },
    font: {family: "Arial" }
  };
  Plotly.newPlot("gauge", wfreq_chart, layout3);
});
};
// // ADD EVENT HANDLER to update charts on change in dropdownlist 
// Direction received from AskBCS 
function optionChanged(user_sample_id){ 
  d3.json(url).then(function(data) {
    const bb_data = data.samples;
    const wash_data = data.metadata
  updateBarPlotly(user_sample_id, bb_data);
  updateBubblePlotly(user_sample_id, bb_data);
  updateDemogPanel(user_sample_id);
  updateGuage(user_sample_id, wash_data);
})}; 

init(); // Initialize the page