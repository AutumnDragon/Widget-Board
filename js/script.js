

// desktop look controls
const INPUTS = document.querySelectorAll('.controls input');

function handleUpdate() {
  const SUFFIX = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + SUFFIX);
}

INPUTS.forEach(input => input.addEventListener('change', handleUpdate));
INPUTS.forEach(input => input.addEventListener('mousemove', handleUpdate));



// Button Control to Show Widgets
function showWidget(e) {
  if (!e.target.matches('button')) return; // skip this unless it's an button
  const BTN = (e.target);
  const WIDGETINDEX = BTN.getAttribute("name");
  console.log(WIDGETINDEX);
  console.log(e.target);
  document.getElementById(WIDGETINDEX).classList.toggle("hidden");
}
document.addEventListener('click', showWidget);




// drag and drop
var dragndrop = (function() {
  var widgetPositions = JSON.parse(localStorage.getItem('widgetPosition')) || [];
  var myX = '';
  var myY = '';
  var whichWidget = '';

  // Develop This
  // Read initial placement of widgets from  local storage
  // function placeWidgets() {
  //   var elements = document.querySelectorAll('.widget');
  //   for (var i = elements.length - 1; i >= 0; i--) {
  //     elements[i].style.top = 5; // read y from local localStorage
  //     elements[i].style.left = 5; // read x from local localStorage
  //   };
  // }

  function resetZ() {
    var elements = document.querySelectorAll('.widget');
    for (var i = elements.length - 1; i >= 0; i--) {
      elements[i].style.zIndex = 5;
    };
  }

  function moveStart(e) {

    whichWidget = e.target;
    myX = e.offsetX === undefined ? e.layerX : e.offsetX;
    myY = e.offsetY === undefined ? e.layerY : e.offsetY;
    resetZ();
    whichWidget.style.zIndex = 10;
  }

  function moveDragOver(e) {
    e.preventDefault();
  }

  function moveDrop(e) {
    e.preventDefault();
    whichWidget.style.left = e.pageX - myX + 'px';
    whichWidget.style.top = e.pageY - myY + 'px';
  }

  document.querySelector('body').addEventListener('dragstart', moveStart, false);
  document.querySelector('body').addEventListener('dragover', moveDragOver, false);
  document.querySelector('body').addEventListener('drop', moveDrop, false);
})();



// title
var myTitle = (function() {





function addTitle(e) {
  e.preventDefault();
  const titleText = (this.querySelector('[name=titleText]')).value;
  const itemT = {
    text,
    done: false
  };

  items.push(itemT);
  populateTitle(title1, itemsList);
  localStorage.setItem('title1', JSON.stringify(title1));
  this.reset();
}

function populateTitle(title = [], toDoItemList) {
  titleText.innerHTML = toDoItem.map((doItem, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${doItem.done ? 'checked' : ''} />
        <label for="item${i}">${doItem.text}</label>
      </li>
    `;
  });
}



})(); // close myTitle

// ToDo List
var toDoList = (function() {
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.toDoItem');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(toDoItem = [], toDoItemList) {
  toDoItemList.innerHTML = toDoItem.map((doItem, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${doItem.done ? 'checked' : ''} />
        <label for="item${i}">${doItem.text}</label>
      </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);

})();// end of toDo list


// Calculator widget
var calculator = (function() {

var calcDisplay = document.getElementById('calcDisplay');

function toDisplay(e) {
  if (!e.target.matches('.number')) return;
  var key = e.target.value;
  console.log(key);
  calcDisplay.value+=key;

}
document.getElementById('clear').addEventListener('click',function() {
    calcDisplay.value='';
})

document.getElementById('sqrt').addEventListener('click',function() {
    calcDisplay.value=Math.sqrt(calcDisplay.value);
})

document.getElementById('answer').addEventListener('click', function() {
  x=calcDisplay.value
  x=eval(x);
  calcDisplay.value=x;
})

document.getElementById('backspace').addEventListener('click', function() {
  var num = calcDisplay.value;
  var len = num.length-1;
  var newNum = num.substring(0,len);
  calcDisplay.value = newNum;
})

addEventListener('click', toDisplay);
addEventListener('click', clear);

})();  // End of calculator function



// game

var game = (function() {

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// ball
var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;
// ball move
var dx = 3;
var dy = -3;
// paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleDx = 7;
var rightPressed;
var leftPressed;


function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(event.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius ||
    (   y + dy > canvas.height - paddleHeight - ballRadius &&
        x + dx > paddleX &&
        x + dx < paddleX + paddleWidth )
  ) {
    dy = -dy;
  }
  // else if (y + dy > canvas.height) {
  //   location.reload();
  // }

  if(rightPressed && (paddleX + paddleWidth) < canvas.width) {
    paddleX += paddleDx;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= paddleDx;
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}
 requestAnimationFrame(draw);

})();   // End of Game function



// clock
var clock = (function() {

  const HOURHAND = document.querySelector("#hour");
  const MINUTEHAND = document.querySelector("#minute");
  const SECONDHAND = document.querySelector("#second");

  var date = new Date();
  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let hrPosition = (hr*360/12)+(min*(360/60)/12);
  let minPosition = (min*360/60)+(sec*(360/60)/60);
  let secPosition = sec*360/60;

  function runTheClock() {
    hrPosition = hrPosition+(3/360);
    minPosition = minPosition+(6/60);
    secPosition = secPosition+6;

    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
  }

var interval = setInterval(runTheClock, 1000);

})();  // End clock


// Picture of the Day
var NASA = (function() {

  var today = new Date();
   today.setDate(today.getHours()-2);  // sometime have to change it to       today.setDate(today.getDate()-1);
   document.getElementById('myDate').valueAsDate = today;

function getPic() {
  var url = "https://api.nasa.gov/planetary/apod?api_key=RUmqA1f5t5gvFHPg2sVkTIMAQjyhHEIyURxEJt25";
  var date = document.getElementById("myDate").value;
  var dates = "&start_date="+date+"&end_date="+date;
  console.log("URL:", url+dates);

  $.ajax({
    url: url+dates,
    success: function(result){
      console.log(result);
    $("#apod-pic").html(`
      <div class="featuredImage">
        <img src="${result[0].url}">
      </div>
      <p>${result[0].title}</p>
      `)
    }})
  }
  getPic();

  // gets the date value when the date input looses focus
   document.getElementById("myDate").addEventListener("blur", function(e) {
     date = e.target.value;
     console.log("change date:", date);
     getPic();
   })


})();
