Vjs.Label = function(/*params*/)
{
    var params = arguments[0] ||{};
    Vjs.Widget.call(this, params);
    params.type= params.type ||"label";
    var span = document.createElement("span");
    params.text = params.text || "";
    span.innerHTML = params.text;

    span.style.fontSize = params.size||null;
    if(params.color)
        span.style.color = params.color;

    if(params.rotate)
        {
            span.style.webkitTransform= "rotate("+params.rotate+"deg)";
            span.style.writingMode="lr-tb";
        }
    this.el.appendChild(span);
    this.el.style.display = "inline-block";
    if(this.parentdrg){
            this.selectable = false;
            with(span){
            style.webkitUserSelect= "none";
            style.khtmlUserSelect= "none";
            style.mozUserSelect= "none";
            style.oUserSelect= "none";
            style.userSelect= "none";
            }
            //
            this.el.style.webkitUserSelect= "none";
            this.el.style.khtmlUserSelect= "none";
            this.el.style.mozUserSelect= "none";
            this.el.style.oUserSelect= "none";
            this.el.style.userSelect= "none";
            this.el.style.cursor = "default"

     }
}
Vjs.Label.prototype = new Vjs.Widget;



Vjs.Label.prototype.setText = function(str) {
    var span = this.el.getElementsByTagName("span")[0];
    span.innerHTML =str;
}


Vjs.Image = function(/*params*/) {
    var params = arguments[0] || {};

    Vjs.Widget.call(this, params);
    params.type = params.type||"image";
    params.reflection = params.reflection || null;
    this.setImageURL(params.img);
    this.el.style.backgroundRepeat = params.repeat || 'no-repeat';
    this.el.style.backgroundPosition = params.position || '50% 50%';
    if (params.reflection !=null)
    {
           this.el.className = 'image reflection';           
    }else
        {
            this.el.className = 'image' ;
        }
   
}

Vjs.Image.prototype = new Vjs.Widget;

Vjs.Image.prototype.setImageURL = function(url) {
    this._url = url || null;
    if (this._url) {
        this.el.style.backgroundImage = "url('" + this._url + "')";
    }
    else {
        this.el.style.backgroundImage = '';
    }
}

Vjs.Image.prototype.getImageURL = function() {
    return this._url;
}






Vjs.Button = function(/*params*/) {
    var params = arguments[0] || {};

    Vjs.Widget.call(this, params);
    params.type = params.type||"button";

    var span = document.createElement("span");
    this.caption = params.caption || "button";
    span.innerHTML = this.caption;
    this.el.appendChild(span);
    this.el.style.textAlign = "center";
    this.el.style.display ="inline-block";
    this.el.style.borderRadius = "8px ";
    this.el.style.padding ="2px 5px 2px 5px";
    this.setBackground();
    //this.el.style.padding = "2px 2px 2px 2px";
    this.el.style.border = "1px solid grey";
    this.attachEvent("mousedown", Vjs.Button._onmousedown,false);
    this.attachEvent("mousup", Vjs.Button._onmouseup,false);
    this.attachEvent("mouseout", Vjs.Button._onmouseout,false);
    this.attachEvent("mouseover", Vjs.Button._onmouseover,false);

}

Vjs.Button.prototype = new Vjs.Widget;


Vjs.Button.prototype.setBackground = function()
{
    this.el.style.background = "-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgb(207,231,250)), color-stop(100%,rgb(99,147,193)))";
    this.el.style.webkitBoxShadow=" 0px 0px 3px 1px #000033";

}

Vjs.Button._onmousedown = function(evt,w)
{
    //alert(evt);
}

Vjs.Button._onmouseup = function(evt,w)
{
    //alert(evt);
}

Vjs.Button._onmouseout = function(evt,w)
{
    //alert(evt);
    w.el.style.webkitBoxShadow=" 0px 0px 3px 1px #000033";
}

Vjs.Button._onmouseover = function(evt,w)
{
    //alert(evt);
    w.el.style.webkitBoxShadow=" 0px 0px 3px 1px yellow";
}

/*
Vjs.FBLikebtn = function(/*params/)
{
    var params = arguments[0] || {};

    Vjs.Widget.call(this, params);
    var iframe = new document.createElement('iframe');
    iframe.src = "http://www.facebook.com/plugins/like.php?href=www.velti.com";
    iframe.scrolling = "no";
    iframe.frameborder = "0";
    iframe.style.border = "none";
    iframe.style.width = "100px";
    iframe.style.height = "20px";
    this.el.appendChild(iframe);
}


Vjs.FBLikebtn.prototype = new Vjs.Widget;


/*
 *<iframe src="http://www.facebook.com/plugins/like.php?href=YOUR_URL"
        scrolling="no" frameborder="0"
        style="border:none; width:450px; height:80px"></iframe>
 */