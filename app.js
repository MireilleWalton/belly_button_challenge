// Store the URL in a variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create a function to initialize the page
function init() {  // start function_1
  // Fetch the "samples" and "metadata" information from the json data  
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
    updateBarPlotly(initialID, bb_data);
    updateBubblePlotly(initialID, bb_data);
    updateDemogPanel(initialID)
  });


//CREATE CREATE BAR AND BUBBLE PLOTS

// Function to update the plots based on the selected ID
function updateBarPlotly(selectedID, bb_data) { // start function_2
  const selectedData = bb_data.find(item => item.id === selectedID);

    // Create a horizontal bar chart with top 10 OTUs by Individual
    const top10_otu_id = selectedData.otu_ids.slice(0, 10);
    const top10_otu_vals = selectedData.sample_values.slice(0, 10);

    let data1 = {
      x: top10_otu_vals,
      y: top10_otu_id.map(id => `OTU ${id}`),
      type: "bar",
      orientation: "h",
    };

    let layout1 = {
      title: `Top 10 OTUs by Individual: ${selectedID}`,
    };

  // Update the bar chart
    Plotly.newPlot("bar", data1, layout1);
  };
  
function updateBubblePlotly(selectedID, bb_data) { // start function_2
  const selectedData = bb_data.find(item => item.id === selectedID);
    // Create a bubble (scatter) chart which displays each OTU by Individual
    const x_otu_id = selectedData.otu_ids;
    const y_otu_vals = selectedData.sample_values;

    let data2 = [{
      x: x_otu_id,
      y: y_otu_vals.reverse(),
      mode: 'markers',
      marker: {
        color: x_otu_id,
        opacity: 0.6,
        size: y_otu_vals,
      }}];
    
    let layout2 = {
      title: `OTU Sample Size by Individual: ${selectedID}`
    };

    // Update the bubble chart
    Plotly.newPlot("bubble", data2, layout2);
  };
  

//  CREAT DEMOGRAPHICS PANEL

// Function to populate the element id 'sample-metadata' based on the selected ID
// Assistance received from AskBCS
function updateDemogPanel(sample) {
d3.json(url).then(function(data) {
  let demograpics_data = data.metadata;
  let dd_data = demograpics_data.filter(sample_info => sample_info.id == sample);
  let dd_data_result = dd_data[0];
  let dd_panel = d3.select("#sample-metadata");
  dd_panel.html("");
  Object.entries(dd_data_result).forEach(([key, value]) => {
    dd_panel.append("h6").text(`${key}: ${value}`);
  });
});
}

// ADD EVENT LISTENERS

// Add event listener to the dropdown list to effect updates to plots and  panel (element ids 'selDataset' and element id 'sample-data')
  d3.select("#selDataset").on("change", function() {
  const selectedID = d3.select("#selDataset").property("value");
    updateBarPlotly(selectedID, bb_data);
    updateBubblePlotly(selectedID, bb_data);
    updateDemogPanel(selectedID);

    console.log(selectedID);
  });

  
  }
init(); // Initialize the page