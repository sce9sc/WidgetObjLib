Vjs.Box = function(/*params*/){
     var params = arguments[0] || {};
     //this.base = Vjs.Widget;
     //this.base(params);
     params.type = params.type||"box";
     params.className = params.className || "vjsbox";
     params.align = params.align||"";
     Vjs.Widget.call(this,params);
     if(params.align=="center")
        this.el.style.margin="0 auto";
     if(params.border)
         this.el.style.border = params.border
     if(params.roundCorner)
         this.el.style.borderRadius= params.roundCorner; 
     if(params.padding){
         this.el.style.padding = params.padding;
     }

     if(params.margin){
         this.el.style.margin = params.margin;
     }
}
Vjs.Box.prototype = new Vjs.Widget;



Vjs.hBox = function(/*params*/)
{
     var params = arguments[0] || {};
     params.type = params.type||"hbox";
     params.className = params.className || "vjshbox";
     Vjs.Box.call(this,params);
     //this.el.style.position = "relative";
     //var div = document.createElement("div");
     //div.style.clear = "both";
     //this.el.appendChild(div);
     this.el.style.clear = "both";
}

Vjs.hBox.prototype = new Vjs.Box;

Vjs.hBox.prototype.append = function(w/*,anim*/)
{
    //w.el.style.position = "relative";
    w.el.style.cssFloat = w.orientation;
    Vjs.Widget.prototype.append.apply(this,arguments);
    //this._calcDimensions(w);
    
}

Vjs.hBox.prototype._calcDimensions = function(w)
{
    if(this.height=="auto" && this.width=="auto")
    {
        if(this.el.style.height!="auto")
        {
            alert("aa")
        }
        else
        {
            //this.
            alert(parseInt(window.getComputedStyle(w.el,null).getPropertyValue("height").slice(0,-2)));
            //this.el.style.height =w.el.style.height
        }


    
    }
    
    /*alert("adasd");
    if(this.height=="auto" && this.width=="auto")
    {
        var maxheight =0;
        var totalwidth =0;
        if(this.id=="mainbox")
            {
                alert(this.widgets);
                for(var i=0; i<this.widgets.length;i++)
                {

                        var a = parseInt(this.widgets[i].height.slice(0,-2))
                        var height = parseInt(window.getComputedStyle(this.widgets[i].el,null).getPropertyValue("height").slice(0,-2));
                        //var width = parseInt(window.getComputedStyle(this.widgets[i].el,null).getPropertyValue("width").slice(0,-2));
                        alert(w.id +"-"+this.widgets[i].id+"="+height);
                        //totalwidth += width;
                        //this.width=totalwidth;
                        if(maxheight<height)
                        {
                            maxheight = height;
                            this.height = maxheight;
                        }

                }
            }
    }



    /*
    if((this.height=="auto" && this.width=="auto")||(this.height=="" && this.width==""))
        {
            this.height = w.height;
            this.width = w.width;
        }
     else if(this.height="auto" ){
         //need to calculate which widget has the largest height
         var height=0;
        if(this.id=="centerBox")
    {
        for(var i=0; i<this.widgets.length;i++)
        {
            var a = parseInt(this.widgets[i].height.slice(0,-2))
            alert(a +"ada")
            if(this.height=="")
            {
              this.el.style.height = w.el.style.height
            }else{
            this.el.style.height=(parseInt(this.el.style.height.slice(0,-2))+ parseInt(this.widgets[i].el.style.height.slice(0,-2)))+"px"
            alert(this.height)}
        }

    }
     }
     else{
         if(parseInt(this.height.slice(0,-2))<parseInt(w.height.slice(0,-2))){
            this.height = w.height;
            
         }
         this.width = parseInt(this.width.slice(0,-2))+parseInt(w.width.slice(0,-2))+"px";
     }*/
     //this.redraw();
    
}




Vjs.ScrollBox = function(/*params*/)
{
     var params = arguments[0] || {};
     params.type = params.type||"scrollbox";
     params.className = params.className || "vjs_scrollbox";
     params.scrollparams = params.scrollparams || {};
     this.direction = params.direction || "v";
     Vjs.Box.call(this,params);
     var box = new Vjs.Box({id:"scroller"});
     this.append(box);
     this.scroller = new iScroll(this.el,params.scrollparams);
}

Vjs.ScrollBox.prototype = new Vjs.Box;

Vjs.ScrollBox.prototype.getOffset = function()
{
    var scroller = this.getWidgetsByIs("scroller")[0];
}



Vjs.ScrollBox.prototype.append = function(w/*,animClass*/)
{
    if(this.widgets.length == 0){
       Vjs.Widget.prototype.append.apply(this,arguments);
    }
    else{
       Vjs.Widget.prototype.append.apply(this.widgets[0],arguments);
       
    }
   
       
}

Vjs.ScrollBox.prototype.redraw = function()
{
    
    if(this.direction == "h")
    {
        //we need to calculate the width of the largest widget and append it to the scroller
        var scroller = this.widgets[0]
        var scroller_width=0;
        for(var i=0;i<scroller.widgets.length;i++)
        {            
           
            var widgetWidth = parseInt( scroller.widgets[i].width.slice(0,-2));
            if(scroller_width<widgetWidth)
                {
                  scroller_width = widgetWidth;
                }
        }
        scroller.width = scroller_width;
        scroller.redraw();
    }
    Vjs.Widget.prototype.redraw.apply(this,arguments);
    this.refresh();
    
}

Vjs.ScrollBox.prototype.refresh = function()
{
    this.scroller.refresh();
}

Vjs.ScrollBox.prototype.setInnerHtml = function(text)
{
    this.el.childNodes[0].innerHTML = "<p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p>v<p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p><p>asdadadasd</p>v"
    alert(this.el.childNodes[0].innerHTML);
    //this.widgets[0].el.innerHTML = text
}




Vjs.ExtBox = function(/*params*/){
     var params = arguments[0] || {};    
     params.type = params.type||"extbox";
     this.headerHeight = params.height || "20px";
     this.headerWidth = params.width || "100%";
     this.headerImg1 = params.headerImg1 || "images/Gal.jpg";
     this.headerImg2 = params.headerImg2 || "images/arrowClosed.png";
     params.className = params.className || "vjs_extbox";
     params.callback = params.callback || null;
     Vjs.Box.call(this,params);
     var box_header = new Vjs.hBox({className:"extbox_header",height:this.headerHeight,color:"#E0E0E0"});
     var header_img1 = new Vjs.Image({className:"gal",img:this.headerImg1,height:this.headerHeight,width:"80px",position:"0"});
     box_header.append(header_img1);
     var header_img2 = new Vjs.Image({id:"arrowclosed",className:"arrowclosed",img:this.headerImg2,height:this.headerHeight,width:"21px"});
     box_header.append(header_img2);
     var box_body = new Vjs.Box({className:"extbox_body",color:"#E0E0E0",width:"100%",height:"100px"});
     box_body.hide();
     this.hidden = true;
     this.append(box_header);
     this.append(box_body);
     
     this.el.style.borderBottom = "1px solid black"
     box_header.attachEvent("click", Vjs.ExtBox._onclick)
 
}

Vjs.ExtBox.prototype = new Vjs.Widget;

Vjs.ExtBox.prototype.attachEvent = function(evt,f)
{
    
    Vjs.Widget.prototype.attachEvent.apply(this.widgets[0],arguments);
};

Vjs.ExtBox.prototype.setInnerHTML = function(html)
{
   this.widgets[1].el.innerHTML =html
    
}




Vjs.ExtBox._onclick = function(w)
{   
    var arrowclosed=w.getWidgetsById("arrowclosed")[0]
    if(w.parent.hidden){
        w.parent.widgets[1].show();        
        arrowclosed.setImageURL("images/arrowExpanded.png");
        w.parent.hidden =false;
    }
    else
    {
        w.parent.widgets[1].hide();
        arrowclosed.setImageURL("images/arrowClosed.png");
        w.parent.hidden =true;       
    }
}


Vjs.ColorPicker1 = function(/*params*/){
    var params = arguments[0] || {};    
    params.type = params.type||"colorpicker1";
    params.color = "";//"#E0E0E0";
    params.height = "24px";
    params.width = "100px";
    params.direction = "h"
    params.scrollparams={vScroll:false,hScrollbar:false};
    Vjs.ScrollBox.call(this,params);
    
    var scrollcontent = new Vjs.hBox()
    var box1 = new Vjs.Image({id:"colorpick1",img:"images/sampleColors/Black.jpg",width:"27px",height:"12px"})
    var box2 = new Vjs.Box({id:"colorpick2",color:"green",width:"27px",height:"12px"})
    var box3 = new Vjs.Box({id:"colorpick3",color:"yellow",width:"27px",height:"12px"})
    var box4 = new Vjs.Box({id:"colorpick4",color:"red",width:"27px",height:"12px"})
    var box5 = new Vjs.Box({id:"colorpick5",color:"blue",width:"27px",height:"12px"})
    var box6 = new Vjs.Box({id:"colorpick6",color:"pink",width:"27px",height:"12px"})
    scrollcontent.append(box1);
    scrollcontent.append(box2);
    scrollcontent.append(box3);
    scrollcontent.append(box4);
    scrollcontent.append(box5);
    scrollcontent.append(box6);
    
    box1.el.style.marginTop= "12px"; 
    box2.el.style.marginTop= "12px"; 
    box3.el.style.marginTop= "12px"; 
    box4.el.style.marginTop= "12px"; 
    box5.el.style.marginTop= "12px"; 
    box6.el.style.marginTop= "12px";
    
    
    
    box1.attachEvent("click", function(w){
            //alert(document.site.widgets[1].widgets[0].widgets[0].id);
            //alert(w.parent.parent.parent.widgets[0].widgets[0].id);
            
            var mycar = document.site.widgets[1].widgets[0].widgets[0]; 
            mycar.setImageURL("images/colors/Black.jpg")
            w.height = "24px";
            w.el.style.backgroundPosition = "0 0";
            w.el.style.backgroundSize = "auto 24px";
            w.el.style.marginTop= "0px";
            w.redraw();
            
        });
        
    box2.attachEvent("click", function(w){
        
        var mycar = document.site.widgets[1].widgets[0].widgets[0]; 
         if(this.check != 'undefined')
            {this.check=true}
        else
            {
                if(this.check ==true)
                    {
                      this.check = false  
                    }
                    else
                        this.check = true
            }
        mycar.setImageURL("images/colors/CyberGrayMetallic.jpg")
    w.height = "24px";
        w.el.style.marginTop= "0px";
        w.redraw();});
    box3.attachEvent("click", function(w){var mycar = document.site.getWidgetsById("mycar")[0];mycar.setImageURL("images/colors/ImperialBlueMetallic.jpg")});
    box4.attachEvent("click", function(w){var mycar = document.site.getWidgetsById("mycar")[0];mycar.setImageURL("images/colors/InfernoOrangeMetallic.jpg")});
    box5.attachEvent("click", function(w){var mycar = document.site.getWidgetsById("mycar")[0];mycar.setImageURL("images/colors/RallyYellow.jpg")});
    box6.attachEvent("click", function(w){var mycar = document.site.getWidgetsById("mycar")[0];mycar.setImageURL("images/colors/SynergyGreenMetallic.jpg")});
       
    
    this.append(scrollcontent);    
}


Vjs.ColorPicker1.prototype = new Vjs.ScrollBox;



Vjs.ScrollerView = function(/*params*/)
{
    var params = arguments[0] || {};
    Vjs.Box.call(this,params);
    document.addEventListener('touchmove', function (e) {e.preventDefault();}, false);
    params.headerHeight = params.headerHeight || "40px";
    params.headerWidth = params.headerWidth || "100%";
    params.footerHeight = params.footerHeight || "40px";
    params.footerWidth = params.footerWidth || "100%";
    params.footer = params.footer || false;
  
    var header = new Vjs.Box({color:"green",height:params.headerHeight,width:params.headerWidth});
    header.el.style.position ="absolute";
    header.el.style.zIndex = 2;
    header.el.style.top = 0;
    header.el.style.left = 0;
    this.append(header);

    this.scroller = new Vjs.ScrollBox({width:"100%"});
    this.scroller.el.style.position ="absolute";
    this.scroller.el.style.zIndex = 1;
    if(params.footer == true)
    {
        this.scroller.el.style.bottom = params.footerHeight;
    }
    else
        {
         this.scroller.el.style.bottom = 0;
        }

    this.scroller.el.style.top = params.headerHeight;
    this.scroller.el.style.left = 0;
    this.scroller.el.style.overflow = "auto";
    this.scroller.widgets[0].el.position="absolute";
    this.scroller.widgets[0].el.zIndex=1;

    this.append(this.scroller);

     if(params.footer == true)
    {
        var footer = new Vjs.Box({color:"blue",height:params.headerHeight,width:params.headerWidth});
        footer.el.style.position ="absolute";
        footer.el.style.zIndex = 2;
        footer.el.style.bottom = 0;
        footer.el.style.left = 0;
        this.append(footer);
    }


    /*

    var box1 = new Vjs.Box({id:"1",color:"white",height:"500px", width:"320px"})
    var box2 = new Vjs.Box({id:"2",color:"black",height:"400px", width:"320px"})
    var box3 = new Vjs.Box({id:"3",color:"green",height:"400px", width:"320px"})
    var box4 = new Vjs.Box({id:"4",color:"pink",height:"500px", width:"320px"})

    /*
    var ext1box = new Vjs.ExtBox({width:"100%",header_height:"20px",color:"green"});
    ext1box.el.style.margin="0 auto";
    ext1box.setInnerHTML("asfdj fslajfd lsldfj  lasdfj lasdjf lasjflkfj lsdj f<br\>khk hdkfd ")
    ext1box.attachEvent("click", function(w){
            //var myscroll = w.parent;

            //myscroll.parent.refresh();
            document.site.getWidgetsById("scrollview")[0].widgets[1].refresh();
            //alert("adsada");
    })
*/

/*
    box1.attachEvent("click", function(w){
        
        var myscroll = w.parent;
        myscroll.widgets[2].show();
        myscroll.parent.refresh();
    });
    box2.attachEvent("click", function(w){

        var myscroll = w.parent;
        myscroll.widgets[2].hide();
        myscroll.parent.refresh();
    });


    this.scroller.append(box1);
    this.scroller.append(box2);
    //scroller.append(ext1box);
    box3.hide();
    this.scroller.append(box3);
    this.scroller.append(box4);
*/
    this.scroller.refresh();
    
}

Vjs.ScrollerView.prototype = new Vjs.Box;

Vjs.ScrollerView.prototype.add = function(w/*,anim*/)
{
   
   Vjs.ScrollBox.prototype.append.apply(this.scroller,arguments);
   this.scroller.refresh();
}



Vjs.Window = function(/*params*/)
{

    var params = arguments[0] || {};

    params.draggable = true;
    params.roundCorner="8px 8px 10px 10px";
    Vjs.Box.call(this,params);
    this.el.style.webkitBoxShadow="0px 0px 10px  #ccc";
    this.el.style.resize = "both";
    var titleBar = new Vjs.Box({id:"titleBar",
        parentdrg:true,width:params.width,
        roundCorner:"8px 8px 0px 0px",
        height:"30px",bgcolor:"red"});
    titleBar.el.style.background = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgb(207,231,250)), color-stop(100%,rgb(99,147,193)))";
    var closeBtn = new Vjs.Box({id:"win_closeBtn",top:"6px",left:params.width-20,width:"15px",height:"15px",bgcolor:"red"})
    closeBtn.attachEvent("click", Vjs.Window._closeWindow, false)
    titleBar.append(closeBtn)
    this.append(titleBar);
    if(params.title)
        this.title = params.title;
        var title = new Vjs.Label({top:"5px",left:"10px", size:"12px",id:"wintitle",text:"asdadasd",parentdrg:true});
        
        titleBar.append(title);
    var innerBox = new Vjs.Box({roundCorner:"0px 0px 10px 10px",id:"innerBox",height:params.height-30,width:params.width,bgcolor:"white"})
    this.el.style.border="1px solid gray";
    this.append(innerBox);
    
}

Vjs.Window.prototype = new Vjs.Box;

Vjs.Window._closeWindow = function(evt,w)
{
    w.parent.parent.hide();
    
}