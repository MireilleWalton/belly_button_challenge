// Store the URL in a variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create a function to initialize the page
function init() {  // start function_1
  // Fetch the "samples" and "metadata" information from the json data  
  d3.json(url).then(function(data) {
    const bb_data = data.samples;

    // Create a dropdown list of IDs - assistance received from AskBCS
    let dropDownList = d3.select("#selDataset");
    bb_data.forEach(({ id }) => {
      dropDownList.append("option").text(id);
    });

    // Get the first ID and update the plots
    const initialID = bb_data[0].id;
    updatePlotly(initialID, bb_data);
  });

// Function to update the plots based on the selected ID
function updatePlotly(selectedID, bb_data) { // start function_2
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
    Plotly.newPlot("bar", [data1], layout1);

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
      },
    }];

    let layout2 = {
      title: `OTU Sample Size by Individual: ${selectedID}`,
    };

    // Update the bubble chart
    Plotly.newPlot("bubble", data2, layout2);
  }}
  
// // Function to update the element id 'sample-metadata' based on the selected ID

d3.json(url).then(function(data) {
  const demograpics_data = data.metadata;
});

  // DEMOGRAPHICS OPTION1
  // create an array of catgory labels ('demo_data') for panel_body
  let d_data_lables = Object.keys(data.demographics_data);
  let d_data = Object.values(data.demographics_data);

function initial_d_data() {
  let d_data = [{
    lables: d_data_lables,
    values: d_data,
  }]
}

  // DEMOGRAPHICS OPTION2
function initial_d_data() {
    let d_id: `id: ${data.demographics_data.id[1]}`;
    let d_ethnicity: `ethnicity: ${data.demographics_data.ethnicity[1]}`;
    d_gender: `gender: ${data.demographics_data.gender[1]}`;
    d_age: `age: ${data.demographics_data.age[1]}`;
    d_location: `,location: ${data.demographics_data.location[1]}`;
    d_bbtype: `bbtype: ${data.demographics_data.bbtyp[1]}`;
    d_wfreq: `wfreq: ${data.demographics_data.qfreq[1]}`;
  };

  function update_initial_d_data(sample){
    d3.json(url).then(function(data) {
      const demograpics_data = data.metadata;
   # then get the metadata from sample.json
   # filter metadata from the sample parameter that is passed into the function
   #console.log your results
   
   }

   // FUNCTION TO UPDATE DEMOGRAPHICS DATA
function update_initial_d_data(sample){
  d3.json(url).then(function(data) {
    const demographics_data = data.metadata;
    let dd_data = demographics_data.filter(sample)
  });

//   let update_d_data = initial_d_data.property("value");
//   let update_data = [];
//   if (d_id === initialID){
//     updated_d_data = initial_d_data
//   }
//   else if (d_id === selectedID){
//     updated_d_data = update_d_data
//   };

//   // Initialize the page
init();
// // Add event listener to the dropdown list (element id 'selDataset')
d3.selectAll("#selDataset").on("change", function () {
  const selectedID = d3.select("#selDataset").property("value");
  updatePlotly(selectedID, bb_data); // Pass bb_data to updatePlotly
});

// Add an event lister to the demographic data (element id 'sample-metadata')

d3.selectAll("#sample-metadata").on("change", update_initial_d_data)// Pass demo_data to updatePlotly
});
