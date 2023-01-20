///////////////////image grid gsap////////////////////
let options = {
  imgSrc : "/media/cruel.webp",
  containerName : "placeholder",
  rows:5,
  columns:5,
  margin:2.5,
  animTime: 0.3
}

function ImageGrid(defaults)
{
  let r = defaults.rows;
  let c = defaults.columns;
  let margin = defaults.margin;
    
  let placeholder = document.getElementsByClassName(defaults.containerName)[0];
  let container = document.createElement('div');
  container.className = "gridContainer";
  placeholder.appendChild(container); 
    
  let gridTile;  

  let w = (container.offsetWidth / c) -margin;
  let h = (container.offsetHeight / r) -margin;
  let arr = [];
    
  for (let i=0, l=r*c; i < l; i++)
  {    
    gridTile = document.createElement('div');
    gridTile.className = "gridTile";
    gridTile.style.backgroundImage = "url("+defaults.imgSrc+")";
    
       
    arr = [(w+margin)*(i%c), (h+margin)*Math.floor(i/c), ((w+margin)*(i%c)+w-margin), (h+margin)*Math.floor(i/c), ((w+margin)*(i%c)+w-margin), ((h+margin)*Math.floor(i/c) + h-margin), (w+margin)*(i%c), ((h+margin)*Math.floor(i/c) + h-margin)];
           
        
    TweenMax.set(gridTile, {webkitClipPath:'polygon('+arr[0]+'px '+ arr[1]+'px,'+arr[2]+'px '+arr[3]+'px, '+arr[4]+'px '+ arr[5] +'px, '+arr[6]+'px '+ arr[7] +'px)', clipPath:'polygon('+arr[0]+'px '+ arr[1]+'px,'+arr[2]+'px '+arr[3]+'px, '+arr[4]+'px '+ arr[5] +'px, '+arr[6]+'px '+ arr[7] +'px)'});
       
    container.appendChild(gridTile);    
    
    fixTilePosition(gridTile, i);
  }
  
  placeholder.addEventListener("mouseover", function(e){
    let allTiles = e.currentTarget.querySelectorAll(".gridTile");
    for (let t=0, le = allTiles.length; t < le; t++)
      {
        TweenMax.to(allTiles[t], defaults.animTime, {css:{backgroundPosition:"0px 0px"}, ease:Power1.easeOut});
      }
  })
                             
  placeholder.addEventListener("mouseleave", function(e){
    let allTiles = e.currentTarget.querySelectorAll(".gridTile");
    for (let ti=0, len = allTiles.length; ti < len; ti++)
      {
        fixTilePosition(allTiles[ti], ti, defaults.animTime);
      }
  })
  
  function fixTilePosition(tile, ind, time)
  {
    if(time==null)time=0;
    let centr, centrCol, centrRow, offsetW, offsetH, left, top;
    
    centr = Math.floor(c * r / 2);
    centrCol = Math.ceil(centr/c);
    centrRow = Math.ceil(centr/r);
        
    offsetW = w/centrCol;
    offsetH = h/centrRow;
    
    left = (Math.round((ind % c - centrCol + 1) * offsetW));
    top = (Math.round((Math.floor(ind/c) - centrRow + 1) * offsetH));
        
    TweenMax.to(tile, time, {css:{backgroundPosition:left+"px "+top+"px"}, ease:Power1.easeOut});
  }
}

ImageGrid(options);
