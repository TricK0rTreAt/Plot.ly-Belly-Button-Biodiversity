

// access data
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function metadata(sample) {
    d3.json(url).then((data) => {
      let metadata= data.metadata;
      let filter= metadata.filter(sampleobj => sampleobj.id == sample);
      let result= filter[0]
      let panel = d3.select("#sample-metadata");
      panel.html("");

      Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
        
      });
    });
  }


// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

function charts(sample) {
    d3.json(url).then(data => {
    let samples = data.samples;
    let filter = samples.filter(row => row.id == sample);
    let result = filter[0];
    let sample_values = result.sample_values;
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
   
let barchartlayout = {
    y: otu_ids.slice(0,10).map(row => "OTU " + row).reverse(),
    x: sample_values.slice(0,10).reverse(),
    text: otu_labels.slice(0,10).reverse(),
    type: "bar",
    orientation: "h",
    
};

let bardata = [barchartlayout];

let layout1 = {
  title: "Top 10 Bacteria Cultures Found",
  width: 400,
    margin:{l: 100,t: 50}
}

Plotly.newPlot("bar",bardata,layout1);




// 3. Create a bubble chart that displays each sample.

let bubblelayout = {
    x: otu_ids,
    y: sample_values,
    mode: "markers",
    text: otu_labels,
    marker: {
      size: sample_values,
      color: otu_ids,
    }
  };
  
  let bubbledata = [bubblelayout];
  
  let layout2 = {
    xaxis: {
        title: "OTU ID"
    }
  };
  
  Plotly.newPlot("bubble", bubbledata, layout2);
  
})
}


// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

function init(){
  d3.json(url).then(data =>{
    let selector = d3.select("#selDataset");
    let samplenames = data.names
    samplenames.forEach((name)=>{
      selector.append("option").text(name).property("value", name);
});
  
  
  let first = samplenames[0];
  metadata(first);
  charts(first);
  });
}


// function to apply changes 
function optionChanged(newsample){
    metadata(newsample);
    charts(newsample);
}

init();