let color = document.getElementById("newColor").value;
let bgColor = '#804545';
let colorType = 'manual';
let body = document.getElementById("body");

document.getElementById("btnGrid").addEventListener("click", hideGrid);
document.getElementById("btnRnd").addEventListener("click", rndColor);
document.getElementById("btnShd").addEventListener("click", addShade);
document.getElementById("btnErs").addEventListener("click", ersColor);
document.getElementById("newColor").addEventListener("input", manualColor);
document.getElementById("bgColor").addEventListener("input", changeBG);
body.addEventListener('mousedown',gridListen);
body.addEventListener('mouseup',mouseUp);

function ersColor(){colorType = 'erase';}
function changeBG(){bgColor=document.getElementById("bgColor").value;}
function manualColor(){colorType = 'manual';}
function rndColor(){colorType ='random';}
function addShade(){colorType ='shade';}

//show/hide grid
function hideGrid() {
    let gap = document.getElementById("container")
    if (gap.style.gap == '0px'){gap.style.gridGap = "1px";}
    else if (gap.style.gap == '1px'){gap.style.gridGap = "0px";}
    else  {gap.style.gridGap = "0px";}
}

//create initial grid
for(let i = 0; i < 9; i++) {
    var div = document.createElement("div");
    div.className = "grid";
    //div.innerHTML = i;
    div.id = i;
    document.getElementById("container").appendChild(div);
}

//resize grid
function resize(newSize){
    //change default color
    color = document.getElementById("newColor").value;

    //delete old grid
    let oldGrid = document.getElementsByClassName("grid");   
    for (i=oldGrid.length-1; i>=0; i--) {
        oldGrid[i].remove();
    }

    //change grid column number
    document.getElementById("container").style.gridTemplateColumns= 'auto '.repeat(newSize);;

    //create new grid
    for( i = 0; i < newSize**2; i++) {
         div = document.createElement("div");
        div.className = "grid";
                //div.innerHTML = i;
        document.getElementById("container").appendChild(div);
        document.getElementsByClassName("grid")[i].style.backgroundColor = bgColor;
    }
    //change grid color based on picked bg color
       gridListen();
}

//slider
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerText = slider.value +' x '+slider.value;

slider.oninput = function() {
  output.innerText = this.value+' x '+this.value;
  resize(this.value);
}


//ganti input scan all grid
function gridListen(){
    let gridPixels = container.querySelectorAll('.grid');
    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseover', redirect));
    gridPixels.forEach(gridPixel => gridPixel.backgroundColor = 'black');
}
//ganti warna
function redirect(){
    console.log(typeof (event.path[0].style.backgroundColor));
    if (colorType =='random'){
        color = '#'+Math.floor(Math.random()*16777215).toString(16);
    } else if (colorType =='shade'){
        color = event.path[0].style.backgroundColor;
        console.log ('COlor: '+color);
        
        //kalo hex, ubah ke hsl
        if (color.charAt(0) == '#'){
            color = hexToHSL(color);
        }
        //selama HS-L<100%, L nya+10%
        let lumPercent = color.split(",");
        let lumOnly = lumPercent[2].split("%");

        if(lumOnly[0]<=100){lumOnly[0]=parseInt(lumOnly[0])+10};
        if(lumOnly[0]>100){lumOnly[0]=100};
        
        lumPercent[2] = lumOnly[0]+'%)'
        
        color = lumPercent.join(',');



        console.log(color);
    } else if (colorType =='manual'){
        color = document.getElementById("newColor").value;
    } else if (colorType = 'erase'){
        color = bgColor;
    }
    this.style.backgroundColor = color;
    
}


function mouseUp(){
    //console.log ('up');
    grid = document.getElementsByClassName('grid');
    for (var i = 0; i < grid.length; i++) {
        grid[i].removeEventListener('mouseover',redirect);
        
    }
}


function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return "hsl(" + h + "," + s + "%," + l + "%)";
  }

