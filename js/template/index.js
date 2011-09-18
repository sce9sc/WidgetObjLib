var Site = function(){};


Site.init = function()
{
    load:(function()
    {   
       var params ={
            bgcolor:"black",
            style:"font-family:Verdana;min-width:1000px;",
            snapToGrid:10
            };
           
       var site = new Vjs.Site(params);
      
        var theme = {
            //msgBox:{type:"Box",params:{draggable:true,top:"200px",width:"200px",height:"300px",bgcolor:"red"}},
            window:{type:"Window",params:{draggable:true,top:"200px",width:"200",height:"300"}},
            bar:{type:"Box",params:{position:"absolute",width:"100%",height:"20px",bgcolor:"gray",style:"bottom:0px;left:0px"}},
            header:{
                type:"Box",
                params:{width:"100%",height:"100px",bgcolor:"black"},
                children:{
                    shouttasktxt:{
                            type:"Label",
                            params:{rotate:"90",color:"white",top:"40px",left:"80px",text:"Shoutask",style:"font-size:22px;"}
                        },
                    logodescr:{
                            type:"Label",
                            params:{position:"absolute",color:"white",top:"30px",left:"400px",text:"where location is not an issue"}
                        }
                    }
                },
             topbar:{
                 type:"Image",
                 params:{img:"images/topbar.png",repeat:"repeat-x",width:"100%",height:"50px"}
             },
             createTaskbox:{
                 type:"Box",
                 params:{align:"center",bgcolor:"blue",width:"600px",height:"120px",roundCorner:"0px 0px 15px 15px",
                     style:"border-left:2px solid gray;border-right:2px solid gray;border-bottom:2px solid gray"},
                 children:{
                     testB1:{
                         type:"Box",
                         params:{top:"10px",left:"200px",width:"30px",height:"50px",bgcolor:"yellow"}
                     },
                     testB2:{
                         type:"Button",
                         params:{width:"100px",align:"center"},
                         events:{click:function(evt,w){document.site.getWidgetsById('window')[0].show()}}
                     }
                 }},
             mainbox:{
                 type:"hBox",
                 params:{align:"center",padding:"30px 0px 30px 0px",width:"1000px",height:"1000px"},
                 events:{click:function(evt,w){}},
                 children:{
                     leftbox:{
                         type:"Box",
                         params:{width:"200px",height:"auto"},
                         children:{
                             lbox1:{type:"Box",params:{height:"300px",bgcolor:"#333333",margin:"0px 5px 10px 0px"}},
                             lbox2:{type:"Box",params:{height:"300px",bgcolor:"#333333",margin:"0px 5px 10px 0px"}},
                             lbox3:{type:"Box",params:{height:"300px",bgcolor:"#333333",margin:"0px 5px 10px 0px"}}
                             
                         }
                     },
                     centerBox:{
                         type:"Box",
                         params:{width:"600px"},
                         children:{
                             tasklistBox:{
                                 type:"hBox",
                                 params:{height:"400px",bgcolor:"black"},
                                 children:{
                                     leftlistBar:{
                                         type:"Box",
                                         params:{width:"50px",height:"100%",bgcolor:"#FF9900"}
                                     }
                                 }
                             },
                             messageBox:{
                                 type:"hBox",
                                 params:{height:"200px",bgcolor:"333333",margin:"20px 0px 0px 0px"},
                                 children:{
                                     msgtitleBox:{
                                         type:"Box",
                                         params:{width:"50px",height:"200px",resizable:true,bgcolor:"red"}
                                     },
                                     msgbarBox:{
                                         type:"Box",
                                         params:{width:"5px",height:"100%",bgcolor:"#FF9900"}
                                     }

                                 }
                             }
                         }
                     },
                     rightBox:{
                         type:"Box",
                         params:{width:"200px",height:"auto"},
                         children:{
                             rbox1:{type:"Box",params:{height:"300px",bgcolor:"#333333",margin:"0px 0px 10px 5px"}},
                             rbox2:{type:"Box",params:{height:"300px",bgcolor:"#333333",margin:"0px 0px 10px 5px"}},
                             rbox3:{type:"Box",params:{height:"300px",bgcolor:"#333333",margin:"0px 0px 10px 5px"}}
                         }
                     }

                    }
                 },
                  footerBox:{
                         type:"Box",
                         params:{align:"center",width:"1000px",height:"150px", style:"border-top:1px solid #FF9900"}
                         
                     }

        }
        

       Vjs.Parser(site,theme);

      


    })();
    
};
