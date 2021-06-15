let width = 400;
let height = 400;
let size = 0;


for(var i = 0; i < 9; i++) {
    var div = document.createElement("div");
    div.className = "grid";
    div.innerHTML = i;
    document.getElementById("container").appendChild(div);
}

const btn = document.querySelector('#btn');
btn.addEventListener('click', resize);

function resize(){

    let newSize = 10;
    
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
        div.innerHTML = i;
        document.getElementById("container").appendChild(div);
    }
}

function updateColumn (col){
    let newCol = 'auto'
    for (i=0; i<col-1; i++) {
        newCol = newCol + ' auto';
    }
    document.getElementById("container").style.gridTemplateColumns= newCol;
}
