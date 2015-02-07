// this is the graph object
function Graph(){
  this.id = null;
  this.name = 'Untitled Graph';
  this.category = 'Miscellaneous';
  // this.image_url = '';
  this.product_image = '';
  this.gauge = null;
  this.graphSize = [0,0];
  this.numOfColors = 1;
  this.layout = '|';
  this.notes = '';
  this.privacy = true;
  this.preview = '';
  this.backgroundColor = '#fff';
  this.element = document.getElementById("graph");
  this.context = this.element.getContext("2d");
  //this.data = this.element.toDataURL('image/jpeg');
  this.data = function() {
    return this.element.toDataURL('image/jpeg');
  }

  this.updateLayout = function(i,j,c) {
    this.layout += "|" + i + "," + j + "," + c;
  }
}

Graph.prototype.save = function() {
  var localGraph = this;
  localGraph.preview = localGraph.data();
  if (this.id == null) { 
    // key: value
    $.post("/graphs", { graph: { name: this.name, category: this.category, image_url: this.image_url, product_image: this.product_image, layout: this.layout, notes: this.notes, privacy: this.privacy, preview: this.preview }}, function( data ) {
      // alert("data " + data);
      // alert("data id " + data.id);
      alert("on success:" + data.id);
      localGraph.id = data.id;

    });
  } else {
    $.ajax({
        url: "/graphs/" + this.id,
        type: "PUT",
        data: { graph: { name: this.name, category: this.category, product_image: this.productImage, gauge: this.gauge, graphSize: this.graphSize, numOfColors: this.numOfColors, layout: this.layout, notes: this.notes, privacy: this.privacy, preview: this.data(), background: this.backgroundColor }},
        success: function( data ) {
          alert('success');
        }
    });
  }
}

// post(url, postdata, callback) {
//   response = HTTPlibrary.post(url, postdata);
//   json = ParseJSON(response);
//   callback(json);
// }

// fills the clicked square with the selected color
Graph.prototype.renderCell = function(i,j) {
  //alert("inside renderCell");
  var ctx = this.context;
  ctx.fillStyle = currentColor;
  // x start,y start, width, length
  ctx.fillRect((i*20+1),(j*20+1),18,18);
}

Graph.prototype.redraw = function() {
  var tmpgraph = this;
  this.layout.split('|').forEach(function(triple) {
    var t = triple.split(",");
    if (t.length == 3) {
      currentColor = t[2];
      tmpgraph.renderCell(t[0], t[1]);
    }
  });
}



Graph.prototype.drawGraphTemplate = function(){
  var context = this.context;
  // sets the background color to white so when user downloads graph it has a background
  context.fillStyle = this.backgroundColor;
  // rectangularGrid(context);
  squareGrid(context);
  // this.data = this.element.toDataURL('image/jpeg');
}

function squareGrid(context){
  console.log('square grid drawn');
  context.fillRect(0,0,800,800);

  // draws the horizontal lines. i stands for the number of lines I want drawn
  for (var i=0; i<=40; i++){
    // (0,0)(800,0),   (0,20)(800,20),   last: (0, 800)(740, 740)
    context.moveTo(0, i*20);
    context.lineTo(800, i*20);
    context.stroke();
  }

  // draws the vertical lines
  for (var i=0; i<=40; i++){
    context.moveTo(i*20, 0);
    context.lineTo(i*20, 800);
    context.stroke();
  }
}

function rectangularGrid(context){
  console.log('rectangular grid drawn');
  context.fillRect(0,0,1400,740);
  
  // draws the horizontal lines. i stands for the number of lines I want drawn
  for (var i=0; i<=100; i++){
    // (0,0)(800,0),   (0,20)(800,20),   last: (0, 800)(740, 740)
    context.moveTo(0, i*14);
    context.lineTo(1400, i*14);
    context.stroke();
  }

  // draws the vertical lines
  for (var i=0; i<=70; i++){
    context.moveTo(i*20, 0);
    context.lineTo(i*20, 740);
    context.stroke();
  }
}


Graph.prototype.showInfo = function(){
  document.getElementById('graph-title').textContent = name;
  $('#graphInfo-container').append('<span class="info">Created By: </span>' + this.userID);
  $('#graphInfo-container').append('<span class="info">Category: </span>' + this.category);
  $('#graphInfo-container').append('<span class="info">Gauge: </span>' + this.gauge);
  $('#graphInfo-container').append('<span class="info">Number of Colors: </span>' + this.numOfColors);
  $('#graphInfo-container').append('<span class="info">Notes: </span>' + this.notes);
  $('#graphInfo-container').append('<span class="info">Privacy Settings: </span>' + this.privacy);
}

Graph.prototype.graphInfoForDevOnly = function(){
  console.log('*************************FOR DEV ONLY**********************')
  console.log(this);
  console.log(this.userID);
  console.log(this.name);
  console.log(this.category);
  console.log(this.imageURL);
  console.log(this.productImage);
  console.log(this.gauge);
  console.log(this.graphSize);
  console.log(this.numOfColors);
  console.log(this.layout);
  console.log(this.notes);
  console.log(this.privacy);
  console.log(this.preview);
  // console.log(this.element);
  // console.log(this.context);
  // console.log(this.data);
  console.log('***********************************************');
}

