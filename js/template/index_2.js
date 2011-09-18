var Site = function(){};


Site.init = function()
{
    load:(function()
    {   
        var a ={
           
            color:"#E0E0E0"
           };
           
       var site = new Vjs.Site(a);
       /*
       var myview = new Vjs.ScrollerView({id:"scrollview",footer:false});

       var box1 = new Vjs.Box({id:"1",color:"white",height:"200px", width:"320px"})
       var box2 = new Vjs.Box({id:"box2",color:"pink",height:"200px", width:"320px"})
       box2.hide();
       box1.attachEvent("click", function(w){document.site.getWidgetsById("box2")[0].show();
       w.parent.parent.refresh();
       })


       var ext1box = new Vjs.ExtBox({width:"100%",header_height:"20px",color:"green"});
    ext1box.el.style.margin="0 auto";
    ext1box.setInnerHTML("asfdj fslajfd lsldfj  lasdfj lasdjf lasjflkfj lsdj f<br\>khk hdkfd ")
    ext1box.attachEvent("click", function(w){
            //var myscroll = w.parent;

            //myscroll.parent.refresh();
            document.site.getWidgetsById("scrollview")[0].widgets[1].refresh();
            //alert("adsada");
    })
       myview.add(box1);
       myview.add(ext1box);
       myview.add(box2);

     
       site.append(myview)

       myview.widgets[1].refresh();
*/


//var mycar = new Vjs.Image({id:"mycar",img:"images/colors/Black.jpg",height:"280px",width:"320px"})

        var theme = {
            mybox1:{
                type:"Box",
                params:{width:"200px",height:"300px",color:"red"},
                events:{
                    click:function(w){alert('asdasasd')
                    }
                }
            },
            myimage:{
                type:"Image",
                params:{img:"images/colors/Black.jpg",height:"280px",width:"320px"}
            },
            scrollbox:{
                type:"Box",
                params:{width:"220px",height:"300px",color:"green",ss:"sdd"},
                children:{
                    mysecondbox:{
                            type:"Box",
                            params:{width:"200px",height:"100px",color:"yellow",ss:"sdd"},
                            children:{
                                mythirdsecond:{
                                type:"Box",
                                params:{width:"100px",height:"100px",color:"pink",ss:"sdd"}
                                }
                            }
                        }
                }
            },
            mybox2:{
                type:"Box",
                params:{width:"300px",height:"300px",color:"blue"},
                events:{
                    click:function(w){
                        document.site.getWidgetsById("mybox1")[0].show();}
                }

            }
        }
        //alert(Math.floor(Math.random()*101))
       Vjs.Parser(site,theme);

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