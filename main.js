let width = 400;
let height = 400;
let size = 0;

//initial size
for(var i = 0; i < 9; i++) {
    var div = document.createElement("div");
    div.className = "grid";
    //div.innerHTML = i;
    div.id = i;
    document.getElementById("container").appendChild(div);
}

const btn = document.querySelector('#btn');
btn.addEventListener('click', resize);

function resize(newSize){

    //let newSize = 10;
    
    //delete old grid
    let oldGrid = document.getElementsByClassName("grid");   
    for (i=oldGrid.length-1; i>=0; i--) {
        oldGrid[i].remove();
    }

    //change grid column number
    updateColumn(newSize);

    //create new grid
    for(var i = 0; i < newSize**2; i++) {
        var div = document.createElement("div");
        div.className = "grid";
        //div.innerHTML = i;
        document.getElementById("container").appendChild(div);
    }

    changeColor();
}

//update number of column
function updateColumn (col){
    let newCol = 'auto'
    for (i=0; i<col-1; i++) {
        newCol = newCol + ' auto';
    }
    document.getElementById("container").style.gridTemplateColumns= newCol;
}

//slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerText = slider.value +' x '+slider.value;

slider.oninput = function() {
  output.innerText = this.value+' x '+this.value;
  resize(this.value);
}


//ganti warna
function changeColor(){
    grid = document.getElementsByClassName('grid');
    for (var i = 0; i < grid.length; i++) {
        grid[i].addEventListener('mouseenter',redirect);
        
    }
    function redirect(){
        this.style.backgroundColor = "yellow";
    }
}
changeColor();