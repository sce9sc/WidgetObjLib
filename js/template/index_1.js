var Site = function(){};


Site.init = function()
{
    load:(function()
    {   
        var a ={
            width:"320px",
            color:"#E0E0E0"
           };
           
       var site = new Vjs.Site(a);
        
       var header = new Vjs.Box({id:"header",height:"100px",width:"100%",color:"blue"})        
       site.append(header);
       var view = new Vjs.ScrollBox({id:"view",height:"257px",width:"100%",scrollparams:{hScrollbar:false,vScrollbar:false}});
       site.append(view);
        
       var mycar = new Vjs.Image({id:"mycar",img:"images/colors/Black.jpg",height:"280px",width:"320px"})
       view.append(mycar);

       var colorpicker = new Vjs.hBox({id:"colorpicker"})
       colorpicker.el.style.margin="0 auto";
       
       var leftbox = new Vjs.Box({width:"50px",height:"20px"})
       var rightbox = new Vjs.Box({width:"50px",height:"20px"})       
       var colorscroll = new Vjs.ColorPicker1({id:"test"});
       colorpicker.append(leftbox);
       colorpicker.append(colorscroll);
       colorpicker.append(rightbox);
       //colorscroll.redraw();
       view.append(colorpicker); 
       //alert("adsa");
       //colorscroll.redraw();    
        //--------------------Extented Box----------------------------
        var ext1box = new Vjs.ExtBox({width:"300px",header_height:"20px",color:"green"});
        ext1box.el.style.margin="0 auto";
        ext1box.setInnerHTML("asfdj fslajfd lsldfj  lasdfj lasdjf lasjflkfj lsdj f<br\>khk hdkfd ")
        ext1box.attachEvent("click", function(w){document.site.getWidgetsById("view")[0].redraw();})
        
        
        var ext2box = new Vjs.ExtBox({width:"300px",header_height:"20px",color:"green",headerImg1:"images/Features.jpg"});
        ext2box.el.style.margin="0 auto";
        
        ext2box.attachEvent("click", function(w){document.site.getWidgetsById("view")[0].redraw();
        })
        
        ext2box.setInnerHTML("asfdj fslajfd lsldfj lasdfj lasdjf lasjflkfj lsdj f<br\>khk hdkfd ")
        
        view.append(ext1box);
        view.append(ext2box);
         
        //site.append(view);
        
        view.redraw();
        colorscroll.redraw();
        //site.append(view);
        
        //alert(site.getWidgetsById("mycar")[0].id);
        
        
        
        
    })();
    
};



 /*
(function() {
    
    
    
    var loadingBar = new Vjs.Widget({color:"green",height:"60px",value:"this is a test",id:"l2"});
    view.append(loadingBar); 
    
    
    var mybox = new Vjs.Box({value:"asdadasd"});


//alert(mybox.value)
    view.append(mybox)
    
    alert(view.widgets);
    var a = view.getWidgetsById("l2");
    alert(a[0].value);
    
})();
*/