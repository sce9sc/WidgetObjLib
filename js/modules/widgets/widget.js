Vjs.Widget = function(/*params*/){
    //
    var params = arguments[0] || {};
    this.type = params.type || "widget";
    this.width = params.width || "auto";
    this.height = params.height || "auto";
    this.minWidth = params.minWidth || null;
    this.minHeight = params.minHeight || null;
    this.left = params.left||0;
    this.top = params.top||0;
    this.value = params.value || "";
    this.draggable = params.draggable || false;
    this.parentdrg = params.parentdrg || false;
    this.selectable = params.selectable || true;
    this.hidden = params.hidden || false;
    this.orientation = params.orientation || 'left';
    this.id = params.id || null;
    this.el = document.createElement('div');
    this.el.id= this.id;
    if(params.style)
        Vjs.setStyle(this.el,params.style);
    if(params.bgcolor)
        this.setColor(params.bgcolor);
    if(params.className)
        this.setClassName(params.className);
    params.position = params.position || "relative"
    this.el.style.position = params.position;
    this.el.innerHTML =this.value;
    this.el.style.height =this.height;
    this.el.style.width =this.width;
    if(this.hidden)
        this.el.style.display ="none";
    this.widgets = [];
    if(isNaN(this.left)||isNaN(this.top)){
        this.el.style.top = this.top;
        this.el.style.left = this.left;
        if(!this.draggable)this.el.style.display="inline-block";
    }
    if(this.draggable){
        this.el.style.position = "absolute";
        this.el.style.top = params.top ||"0";
        this.el.style.left = params.left||"0";
        this.defaultIndex = 10;
    }
    if(params.resizable){
       //this.el.style.border = "4px solid gray";
       //this.attachEvent("mousedown",Vjs.Widget.testresize,false);
       //this.el.style.resize ="both";
       //this.el.style.border ="1px solid gray";
       //this.el.style.overflow ="auto";
    }
    
};

Vjs.Widget.testresize = function(evt,w)
{
    alert(w.id);

}

Vjs.Widget.resize = function(evt,w)
{
    var height = w.getHeight(true)
    var width = w.getWidth(true);
    var offsetL = Vjs.mouseX-w.el.offsetLeft;
    var offsetT = Vjs.mouseY-w.el.offsetTop;
    w.el.innerHTML = Vjs.mouseY + "-"+offsetT+"---" +w.el.offsetLeft
   
    if(offsetL>width||offsetL<4){
        w.el.style.cursor="e-resize";
        //var mydiv = document.getElementById("ybar");
        //mydiv.style.left = Vjs.mouseY;
        w.el.style.borderColor="yellow";
    }
    else if(offsetT>height||offsetT<4)
        {
            w.el.style.borderColor="yellow";
        }
    else
        {
       w.el.style.borderColor="black";
       w.el.style.cursor = "auto";
       }

    w.attachEvent("mouseout",function(ext,wgt){
        wgt.el.style.borderColor="black";
    })
    
}



Vjs.Widget._dragstart=function(evt,wgt,w){
    if(wgt.draggable)
            {
                //target_wgt.el.style.cursor = "pointer";
                w.dragwgt = wgt
                wgt.cursorStartX = Vjs.mouseX//evt.clientX + window.scrollX;
                wgt.cursorStartY = Vjs.mouseY//evt.clientY + window.scrollY;
                wgt.elStartLeft  = wgt.el.offsetLeft;//parseInt(w.el.style.left, 10);
                wgt.elStartTop   = wgt.el.offsetTop;//parseInt(w.el.style.top,  10);

                if (isNaN(wgt.elStartLeft)) wgt.elStartLeft = 0;
                if (isNaN(wgt.elStartTop))  wgt.elStartTop  = 0;
                // Update element's z-index.
                w.bringToFront(wgt);
                //clicked_wgt.el.style.zIndex = ++clicked_wgt.el.style.zIndex;

                w.attachEvent("mouseup", Vjs.Widget.dragStop,true);
                w.attachEvent("mousemove",Vjs.Widget.dragGo,true);
                evt.preventDefault();
            }

}

Vjs.Widget.checkBehaviour=function(evt,w){

       // we need to check if the element is a span (span do not have ids)
        var targetid = (evt.target.id == "")?evt.target.parentNode.id:evt.target.id;
        //Get the widget that was clicked
        var clicked_wgt=(w.id == targetid)?w:w.getWidgetsById(targetid)[0];
        //Need to check if the widget that was clicked has a parent that is draggable
        
        if(clicked_wgt.parentdrg)
            {
                var depth=0
                function getdrgParent(evt,wgt,w)
                {
                   if(wgt.draggable==true)
                       Vjs.Widget._dragstart(evt,wgt,w);
                   else
                       getdrgParent(evt,wgt.parent,w);
                }
                getdrgParent(evt,clicked_wgt,w)
            }
        else
           Vjs.Widget._dragstart(evt,clicked_wgt,w);
        
    }

Vjs.Widget.prototype.bringToFront=function(clicked_wgt)
{
    var num_drg_widgets = this.drg_widgets.length;
    if(clicked_wgt.el.style.zIndex != clicked_wgt.defaultIndex +num_drg_widgets-1)
    {
        var sort = []
        for(var i=0; i<num_drg_widgets;i++){
            if(this.dragwgt.id==this.drg_widgets[i].id){
                var wlist = this.drg_widgets.splice(i,1);
                sort =this.drg_widgets;
                sort.push(wlist[0]);
            }
        }
        for(var d=0;d<num_drg_widgets;d++){
            this.drg_widgets[d].el.style.zIndex = this.drg_widgets[d].defaultIndex + d;
        };
    }

}

Vjs.Widget.dragStop = function(evt,w)
{
    var X = w.dragwgt.getLeft(true);
    var Y = w.dragwgt.getTop(true);
    w.dragwgt.setLeft(Math.round(X/w.snapToGrid) * w.snapToGrid); // Round to nearest GridSpace (Default 20)
    w.dragwgt.setTop(Math.round(Y/w.snapToGrid) * w.snapToGrid); // Round to nearest GridSpace (Default 20)
    w.detachEvent("mousemove",Vjs.Widget.dragGo,true);
    w.detachEvent("mouseup",Vjs.Widget.dragStop,true);

}

Vjs.Widget.dragGo = function(evt,w)
{
    var x = Vjs.mouseX
    var y = Vjs.mouseY
    w.dragwgt._startgo(x,y);
    evt.preventDefault();
   
}

Vjs.Widget.prototype._startgo = function(x,y)
{   
    //if(window.innerWidth)
    var go_X = (this.elStartLeft + x - this.cursorStartX)
    var go_Y = (this.elStartTop + y - this.cursorStartY)
    var w_border = document.body.clientWidth - this.getWidth(true);
    if(go_X>=0)
        if(go_X<w_border)
            this.el.style.left=go_X +"px";
    if(go_Y>0)
        this.el.style.top=go_Y +"px";

 }



Vjs.Widget.prototype.setClassName = function(classname) {
    this.el.style.className = classname
    this.classname = classname
}


Vjs.Widget.prototype.getClassName = function(color) {
    return this.classname||'';
}

Vjs.Widget.prototype.getHeight =function(/*strip*/)
{
    this.height=this.el.style.height;
    if(arguments[0])
        return parseInt(this.height.slice(0,-2));
    return this.height;
};

Vjs.Widget.prototype.getWidth=function(/*strip*/)
{
    this.width=this.el.style.width;
    if(arguments[0])
        return parseInt(this.width.slice(0,-2));
    return this.width;
};

Vjs.Widget.prototype.getTop =function(/*strip*/)
{
    this.top=this.el.style.top;
    if(arguments[0])
        return parseInt(this.top.slice(0,-2));
    return this.top;
};

Vjs.Widget.prototype.getLeft=function(/*strip*/)
{
    this.left=this.el.style.left;
    if(arguments[0])
        return parseInt(this.left.slice(0,-2));
    return this.left;
};


Vjs.Widget.prototype.setTop =function(str)
{
    this.el.style.top=str;
    this.top=this.el.style.top;
};

Vjs.Widget.prototype.setLeft=function(str)
{
    this.el.style.left = str;
    this.left=this.el.style.left;

};

Vjs.Widget.prototype.setColor = function(color) {
    this.el.style.backgroundColor = color
    this.color = color
};


Vjs.Widget.prototype.getColor = function(color) {
    return this.color||'';
};




Vjs.Widget.prototype.find = function(eval_condition,param) {
    var w;
    var ws = [];
    for (var i=0; i<this.widgets.length; i++) {
        w = this.widgets[i];
        if (eval(eval_condition)) ws.push(w);
        ws=ws.concat(w.find(eval_condition,param));
    }
    return ws;
};


Vjs.Widget.prototype.hasChildren = function()
{   
    return (this.widgets.length >0)? true:false;
}

Vjs.Widget.prototype.getWidgetsById = function(param) {
    return this.find('w.id == param',param);
}

Vjs.Widget.prototype.redraw = function()
{
    var parent=this.el.parentNode||this.el.parentElement;
    if(parent != null)
    {
        if(parent&&this.el.style.display!='none'){
            this.el.style.width = this.width;
            this.el.style.height = this.height;
            this.el.style.backgroundColor = this.color;
        }
    }
    else{
        this.el.style.width = this.width;
        this.el.style.height = this.height;
        this.el.style.backgroundColor = this.color;
    }
    
    
    
}

Vjs.Widget.prototype.append = function(w/*,animClass*/)
{   
    var anim = (arguments[1]?arguments[1]:false)
    var callb = (arguments[2]?arguments[1]:false)
    if(anim)
        {
            w.el.className = w.el.className +" "+ anim;
        }
    w.parent = this;
    if(w.draggable)
        {
            var drg_widgets = document.site.drg_widgets;
            w.el.style.zIndex =w.defaultIndex+drg_widgets.length;
            drg_widgets.push(w);
        }
    this.el.appendChild(w.el);
    this.widgets.push(w);
    //this.calcheight(w)
    
}






Vjs.Widget.prototype.remove = function()
{    
    this.parent.widgets.removeItem(this);
    this.parent.el.removeChild(this.el);    
}



Vjs.Widget.prototype.show = function()
{
    //this.el.style.visibility = "visible";
    this.el.style.display="block";
}

Vjs.Widget.prototype.hide = function()
{
    this.el.style.display="none";
}

Vjs.Widget.prototype._onclick = function(evt,w,f)
{
  
	alert(ez.TouchCapable())
  
  if (ez.TouchCapable()){
      this.addEvent('touchstart',function(e)
      {
          Vjs.endX = Vjs.startX = ez.GetTouchX(e);
          Vjs.endY = Vjs.startY = ez.GetTouchY(e);
      });

      this.addEvent('touchmove',function(e)
      {
          Vjs.endX = ez.GetTouchX(e);
          Vjs.endY = ez.GetTouchY(e);
      });

      this.addEvent('touchend',function(w,f)
      {
          return function(e)
          {
              if(Vjs.isAvail())
              {f(e,w);}
          }
      }(w,f)); 
  
  }else{
  
      this.addEvent('mousedown',
      function(e)
      {
          Vjs.endX = Vjs.startX = ez.GetMouseX(e);
          Vjs.endY = Vjs.startY = ez.GetMouseY(e);
      });

      this.addEvent('mousemove',
      function(e)
      {
          Vjs.endX = ez.GetMouseX(e);
          Vjs.endY = ez.GetMouseY(e);
      });
      this.addEvent(evt,
      function(w,f)
      {
          return function(e)
          {
              if(Vjs.isAvail())
              {f(e,w);}
          }
      }(w,f));  
  }
}

Vjs.Widget.prototype.addEvent = function(eventType,f,capturing)
{
    if(!this._eventregistry){
        this._eventregistry={};
    }

    if(eventType in this._eventregistry)
        this._eventregistry[eventType]=[];
    else
        this._eventregistry[eventType]=[];
    
    this._eventregistry[eventType].push(f)
    //alert(this._eventregistry[eventType])



    this.el.addEventListener(eventType,f,capturing)
}

Vjs.Widget.prototype.attachEvent = function(evt,f,capturing)
{
    var w = this;
    switch (evt)
    {
        case "click":
          this._onclick(evt,w,f);                       
          break;
        case "drag":
          this._ondrag(evt,w,f);
          break;
        default:
            this.addEvent(evt,function(w,f)
                {
                    return function(e)
                    {               
                        f(e,w);
                     }
                }(w,f),capturing)
        }
}


Vjs.Widget.prototype.removeEvent = function(eventType,f,capturing)
{
    this.el.removeEventListener(eventType,f,capturing)
}

Vjs.Widget.prototype.detachEvent = function(evt,f,capturing)
{
    //alert(evt);
    for(var i=0;i<this._eventregistry[evt].length;i++)
    {
        this.removeEvent(evt,this._eventregistry[evt][i],capturing)
        this._eventregistry[evt].splice(i,1);
    }
   
}




Vjs.Widget.prototype.parse = function(dom, callback) {
    //var parser = new QuiX.Parser();
    //parser.oncomplete = callback;
    //parser.parse(dom, this);
}

Vjs.Widget.prototype.parseFromUrl = function(url, oncomplete) {
    var xmlhttp = Vjs.XHRPool.getInstance();
    var self = this;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp != null && xmlhttp.readyState==4) {
            //QuiX.removeLoader();
            //self.parse(xmlhttp.responseXML, oncomplete);
            QuiX.XHRPool.release(xmlhttp);
        }
    }
    //QuiX.addLoader();
    xmlhttp.open('GET', url, true);
    xmlhttp.send('');
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



Vjs.Site = function(/*params*/)
{
    var params = arguments[0] || {};
    //params.height);
    this.root = document.getElementById("vjs");
    params.id="site";
    Vjs.Widget.call(this,params)
    this.root.appendChild(this.el);
    document.site = this;
    this.snapToGrid = params.snapToGrid ||1;
    this.drg_widgets=[];
    this.attachEvent("mousedown", Vjs.Widget.checkBehaviour, false)
}


Vjs.Site.prototype = new Vjs.Widget;
 

// backwards compatibility
//var View = Vjs.View;



