var Vjs = {}


Vjs.startX = Vjs.endX = 0;
Vjs.startY = Vjs.endY = 0;
Vjs.mouseX = Vjs.mouseY=0;
Vjs.touchThreshold = 2;

Vjs.version = '0.1';

Vjs.Module = function(type,sName, sFile, d)
{
    this.isLoaded = false;
    this.name = sName;
    this.file = sFile;
    this.dependencies = d;
    this.type = type,
    this.callback = null;
    
}

Vjs.moduleslist=[
    new Vjs.Module("link","widgetccs","js/modules/widgets/widgets.css",1),
    new Vjs.Module("script","lib","js/modules/widgets/ez.js",1),
    new Vjs.Module("script","ejs","js/modules/ejs/ejs.js",1),
    new Vjs.Module("script","iscroll","js/modules/iscroll/iscroll-lite.js",1),
    new Vjs.Module("script","widgets","js/modules/widgets/widget.js",1),
    new Vjs.Module("script","widget_box","js/modules/widgets/box.js",1),
    new Vjs.Module("script","widget_image","js/modules/widgets/image.js",1),
    new Vjs.Module("script","index","js/template/index.js",1)
]


Vjs.Module.prototype.load = function(callback) {
	var oElement;
	this.callback = callback;
	if (this.type == 'script') {
		oElement = document.createElement('script');
		oElement.type = 'text/javascript';
		oElement.defer = true;
		oElement.src = this.file +"?"+Math.floor(Math.random()*1001);
		var onload = (document.all)?'onreadystatechange':'onload'; //for IE5
                oElement[onload] = Vjs.__moduleObj_onstatechange;
	}
        else{
            oElement=document.createElement('LINK');
            oElement.type='text/css';
            oElement.href=this.file;
            oElement.rel='stylesheet';
            this.isLoaded=true;
            if(callback){
                callback();
            }
        }	
	oElement.moduleObj = this;
	oElement.id = this.file;
	document.getElementsByTagName('head')[0].appendChild(oElement);	
}


Vjs.__moduleObj_onstatechange = function() {
	this.moduleObj.isLoaded = true;
        if (this.moduleObj.callback)
        this.moduleObj.callback();
	
}

Vjs.setStyle=function(el,cssText){
    el.style.cssText=cssText;
    //el.setAttribute('style',cssText);
    //}
    //else{
    //    el.setAttribute('style',cssText);
    //}
}

Vjs.gethrefParam =  function(name)
       {
           alert(name)
           //name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]")
           var regexS = "[\\?&]"+name+"=([^&#]*)";
           var regex = new RegExp(regexS);
           var results= regex.exec(window.location.href);
           if(results==null) return "";
           else return results[1];

       }



Vjs.createloadingBar = function(modulesL)
{
    var loading =  document.getElementById("progressbar");
    var loadingbar =  document.getElementById("loadingbar");
    loading.style.background = "-webkit-gradient(linear,left bottom,left top,color-stop(0.06, rgb(199,199,199)),color-stop(0.53, rgb(240,240,240)),color-stop(1, rgb(199,199,199)))"
    var indicator =  document.getElementById("indicator");
    indicator.style.height="15px";
    indicator.style.background = "-webkit-gradient(linear,left bottom,left top,color-stop(0.00, rgb(207,207,207)),color-stop(0.50, rgb(0,204,255)),color-stop(1, rgb(207,207,207)))"
    loadingbar.style.display="block";
}
Vjs.setloadingBar = function(modules,moduleNum,m)
{
    var progressbar =document.getElementById("progressbar").style.width.slice(0,-2);
    var indicator = document.getElementById("indicator");
    var loadinginfo =  document.getElementById("loadinginfo");
    loadinginfo.innerHTML = m.name
    //indicator.style.width = ((modules.length)/moduleNum)*100 +"px";
    indicator.style.width = (moduleNum-modules.length)*progressbar/moduleNum +"px";
}
Vjs.hideLoadingBar = function()
{
     var loadingbar =  document.getElementById("loadingbar");
     loadingbar.style.display="none";
}

Vjs.load = function(modules,moduleNum, callback) {
    function loadme() {
        
        if (modules.length > 0){
            var m = modules.shift();
            Vjs.setloadingBar(modules,moduleNum,m)
            m.load(loadme); // it will call this function again
        }
        else {
            callback(moduleNum);
            Vjs.hideLoadingBar();
        }
    }
    Vjs.createloadingBar(moduleNum);
    loadme();
}

Vjs.XHRPool = (
	function() {
		var stack = [];
		var poolSize = 10;
		var nullFunction = function(){};
		function createXHR() {
			if (window.XMLHttpRequest)
				return new XMLHttpRequest();
			else if (window.ActiveXObject)
				return new ActiveXObject('Microsoft.XMLHTTP');
            else
                return null;
		}
		for (var i = 0; i<poolSize; i++)
			stack.push(createXHR());
		return ({
			release : function(xhr) {
				xhr.onreadystatechange = nullFunction;
				xhr.abort();
				stack.push(xhr);
			},
			getInstance : function() {
				if (stack.length < 1)
	    			return createXHR();
				else
					return stack.pop();
	  		},
	  		toString : function() {
				return "stack size = " + stack.length;
			}
	 	});
	}
)();

Vjs.checkEventListeners = function()
{
     if (ez.TouchCapable())
		{
			var divs = ez.$('*');
			for (d in divs) 
                        { 
                            if (divs[d].onclick !== undefined) 
                            { 
                                divs[d].ontouchend = divs[d].onclick;divs[d].onclick = ''; 
                            } 
                        }
			
			ez.GetBase().addEventListener('touchstart',
			function(e)
			{
				Vjs.endX = Vjs.startX = ez.GetTouchX(e);
				Vjs.endY = Vjs.startY = ez.GetTouchY(e);
			},
			false);
			
			ez.GetBase().addEventListener('touchmove',
			function(e)
			{
				Vjs.endX = ez.GetTouchX(e);
				Vjs.endY = ez.GetTouchY(e);
			},
			false);
		}
                else
		{
			ez.GetBase().addEventListener('mousedown',
			function(e)
			{
				
                                Vjs.endX = Vjs.startX = ez.GetMouseX(e);
				Vjs.endY = Vjs.startY = ez.GetMouseY(e);
			},
			false);
			
			ez.GetBase().addEventListener('mousemove',
			function(e)
			{
				Vjs.endX = ez.GetMouseX(e);
				Vjs.endY = ez.GetMouseY(e);
			},
			false);
                        
                       
			
			alert('appsim is in compatible onclick-mode.');
		}
            
}

Vjs.isAvail = function() //Checks whether the framework is available for Transitions or Touches. The "appsim.touchThreshold" variable adds a slack in responsiveness, on devices other than the iPhone. Their screen is too sensitive in touches and the "ontouchend" listener doesn't execute otherwise.
{
	return (((Math.abs(Vjs.startX-Vjs.endX) > Vjs.touchThreshold) || (Math.abs(Vjs.startY-Vjs.endY) > Vjs.touchThreshold)) ? false : true);
};

Vjs.Parser = function(wgt,jsonStr)
{
    function parsing(w,el)
    {
        //var d;
        for(var d in el)
            {
                //put id
                el[d].params.id = d
                //create widget
                var f = new Vjs[el[d].type](el[d].params);
                //add any eventListeners
                if(el[d].hasOwnProperty("events"))
                    for(var ev in el[d].events)
                        f.attachEvent(ev,el[d].events[ev])
                //append 
                w.append(f);
                if(el[d].hasOwnProperty("children"))
                    parsing(f,el[d].children);
            }
    }
    parsing(wgt,jsonStr);
   
           
}
Vjs.mousecordinates = function()
{
    document.body.addEventListener('mousemove',function(e){
    Vjs.mouseX = e.clientX + window.scrollX;;
    Vjs.mouseY = e.clientY + window.scrollY;;
    },false);
}

Vjs.__init__ = function()
{
    Vjs.load(Vjs.moduleslist,Vjs.moduleslist.length,
        function() {
            //function when all are loaded
            //Vjs.checkEventListeners();
            ez.BrowserDetect.init();
            //alert(ez.BrowserDetect.browser);
            Site.init();
            Vjs.mousecordinates();
            //alert("done");
        }
    );     
}



/*Vjs.swipeDetection = function(div, f1, f2)
{
	var k = ez.GetDiv(div);
	k.anim = false;
	
	if (ez.TouchCapable())
	{
		k.addEventListener('touchstart',
		function(e)
		{
			k.swipeStart = k.swipeMove = ez.GetTouchX(e);
			k.anim = true;
		},
		false);
	
		k.addEventListener('touchmove',
		function(e)
		{
			if (Math.abs(k.swipeMove-k.swipeStart) > 5)
			{
				e.preventDefault();
			}
			k.swipeMove = ez.GetTouchX(e);
			
			if ((k.swipeMove - k.swipeStart) > 20) //Swipe r
			{
				Vjs.startX = Vjs.endX;
				Vjs.startY = Vjs.endY;
				if (k.anim) { k.anim = false; f1(); }
			}
			else
			if ((k.swipeMove - k.swipeStart) <-20) //Swipe left
			{
				Vjs.startX = Vjs.endX;
				Vjs.startY = Vjs.endY;
				if (k.anim) { k.anim = false; f2(); }
			}
		},
		false);
	}
	else
	{
		// Mouse handlers for the Desktop Version of appsim.
		//
		//
		k.addEventListener('mousedown',
		function(e)
		{
			k.swipeStart = k.swipeMove = ez.GetMouseX(e);
			k.capture = true;
		},
		false);
		
		k.addEventListener('mousemove',
		function(e)
		{
			if (k.capture)
			{
				if (Math.abs(k.swipeMove-k.swipeStart) > 5)
				{
					e.preventDefault();
				}
				k.swipeMove = ez.GetMouseX(e);
				
				if ((k.swipeMove - k.swipeStart) > 30) //Swipe r
				{
					k.capture = false;
					Vjs.startX = Vjs.endX;
					Vjs.startY = Vjs.endY;
					f1();
				}
				else
				if ((k.swipeMove - k.swipeStart) <-30) //Swipe left
				{
					k.capture = false;
					Vjs.startX = Vjs.endX;
					Vjs.startY = Vjs.endY;
					f2();
				}
			}
		},
		false);
	}
};*/