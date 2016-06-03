var elements = [];
var elementNo = 0; 
topPos = [];
var interval; 
var allIntervals=[]; 

function getRandomColor() {
    
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/*
 * this is program for take characters randomly....
 * 
 */

function getRandomText()
{
    var text = "A";
   
    text = Math.floor(Math.random() * (122 - 65) + 65);
    return String.fromCharCode(text);
}

function onElementSelect(text)
{
    var span = document.createElement("span");
    var text = document.createTextNode(text);
    span.appendChild(text);
    document.getElementById("result_div").appendChild(span); 
}

/* this is program for add elements 
 * 1:create span dynamically using createElement
 * 2:create dynamic text using createTextNode and pass getRandomText() to it...
 * 3:append text to span
 * 4:set top=10px;
 * 5: set getRandomLeft() ana add px or percentage to it
 * 6:give id to created span and add elementNo to it
 * 7:initialise topPos ["dynamic_span_"+elementNo] = 0
 * 8:use addEventListener and pass click and function parameter to it
 * 9:removeChiled(this) remove current character from screen
 * 10:increment elementNo i.e elementNo++
 * 11:append span to game_screen
 * 12:return span
 *   */
 
function addElement()
{
    var span = document.createElement("span");
   
    var text = document.createTextNode(getRandomText());
    span.appendChild(text);
    span.style.top = "10px";
    span.style.left = getRandomLeft()+"px";
    span.id = "dynamic_span_"+elementNo;
    topPos["dynamic_span_"+elementNo] = 10 ; 
 
    span.addEventListener("click",function(event){
        
        document.getElementById("game_screen").removeChild(this); 
        
        onElementSelect(this.innerHTML);

    });
    
    elementNo++; 
    document.getElementById("game_screen").appendChild(span);
    return span;
}

function checkMyValidity( topPos)
{
    if (topPos > 400)
    {
        clearInterval(interval);
    }

}

function setGlider(span)
{
  var oneInterval =   setInterval(function () {
      var tempTop = span.style.top ;
       
       tempTop =  tempTop.replace('px',''); 
        if(tempTop >=400 && span.parentElement !== null) 
        {
            document.getElementById("game_screen").removeChild(span);
            return true;
        }
        
        span.style.color = getRandomColor();
        span.style.backgroundColor = getRandomColor();
        span.style.position = "absolute";
        span.style.top =  topPos[span.id] + "px";
        topPos[span.id] += 10;
        

    }, 500);
    
    allIntervals.push(oneInterval);
}

function getRandomLeft()
{
     return  Math.floor(Math.random() * (500 - 1) + 1);
}

/*
 *  this is initiates main program and start element adding
 *  1: empty topPos array 
 *  2: stops if already running
 *  3: add element and return elment's  object
 *  4: setGlider function with element's object as parameter 
 *  5: addMultiElements() function call 
 * 
 */
function start()
{
    topPos = []; 
    stop();
    var span = addElement();
    setGlider(span);
    addMultiElements();

}

function addMultiElements()
{
   interval =  setInterval(function(){
        var span = addElement();
        elements.push(span);
        setGlider(span);
    },2000);
}


/*
 *  This is game stop function which stops game if already running
 *  Clear single main interval 
 *  clear all intervals from allInterval array using for()
 */

function stop()
{
    clearInterval(interval);

    for(var i=0 ; i < allIntervals.length; i++)
    {
        clearInterval(allIntervals[i]);
    }
}
