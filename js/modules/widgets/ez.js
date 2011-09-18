ez = {};

ez.$               = function(k)
{
	return document.querySelectorAll(k);
};
ez.GetBase         = function()
{
	return document.body;
};
ez.GetBlend        = function(k)
{
	return k.style.opacity;
};
ez.GetDiv          = function(k)
{
	return document.getElementById(k);
};
ez.GetHead         = function()
{
	return document.head;
};
ez.GetHei          = function(k)
{
	return window.getComputedStyle(k, null).getPropertyValue('height');
};
ez.GetInnerHei     = function()
{
	return window.innerHeight;
}
ez.GetKind         = function(k, h)
{
	return k.getElementsByTagName(h);
};
ez.GetLen          = function(k)
{
	return k.length;
};
ez.GetMouseX       = function(k)
{
	return k.pageX;
};
ez.GetMouseY       = function(k)
{
	return k.pageY;
};
ez.GetOffsetY      = function(k)
{
	return window.pageYOffset;
};
ez.GetPicWidth     = function(k)
{
	return k.width;
};
ez.GetPicHei       = function(k)
{
	return k.height;
};
ez.GetStandalone   = function()
{
	return window.navigator.standalone;
};
ez.GetTopMost      = function()
{
	var divs = ez.$('BODY > div');
	for (var d in divs) if (ez.GetZindex(divs[d]) == 2) return divs[d];
}
ez.GetTouchX       = function(k)
{
	return k.targetTouches[0].clientX;
};
ez.GetTouchY       = function(k)
{
	return k.targetTouches[0].clientY;
};
ez.GetTransform    = function(k)
{
	return k.style.webkitTransform;
};
ez.GetUA           = function(k)
{
	return navigator.userAgent.toLowerCase();
};
ez.GetVisible      = function(k)
{
	return k.style.display;
};
ez.GetWidth        = function(k)
{
	return window.getComputedStyle(k, null).getPropertyValue('width');
};
ez.GetZindex       = function(k)
{
	return window.getComputedStyle(k, null).getPropertyValue('z-index');
};

ez.SetBackColor    = function(k, h)
{
	k.style.background = h;
};
ez.SetBlend        = function(k, h)
{
	k.style.opacity = h;
};
ez.SetBorder       = function(k, h)
{
	k.style.border = h;
};
ez.SetBorderRadius = function(k, h)
{
	k.style.webkitBorderRadius = h;
};
ez.SetBoxShadow    = function(k, h)
{
	k.style.webkitBoxShadow = h;
};
ez.SetColor        = function(k, h)
{
	k.style.color = h;
};
ez.SetFloat        = function(k, h)
{
	k.style.float = h;
};
ez.SetHei          = function(k, h)
{
	k.style.height = h;
}
ez.SetLeft         = function(k, h)
{
	k.style.left = h;
};
ez.SetSpaces       = function(k, h)
{
	k.style.margin = h;
};
ez.SetPicWidth     = function(k, h)
{
	k.width = h;
};
ez.SetPicHei       = function(k, h)
{
	k.height = h;
};
ez.SetPopState     = function(k)
{
	window.onhashchange = k;
};
ez.SetPosition     = function(k, h)
{
	k.style.position = h;
};
ez.SetOverflow     = function(k, h)
{
	k.style.overflow = h;
};
ez.SetReflection   = function(k, h)
{
	k.style.webkitBoxReflect = h;
};
ez.SetTop          = function(k, h)
{
	k.style.top = h;
};
ez.SetTrans        = function(k, h)
{
	k.style.opacity = h;
};
ez.SetTransform    = function(k, h)
{
	k.style.webkitTransform = h;
};
ez.SetTransition   = function(k, h)
{
	k.style.webkitTransition = h;
};
ez.SetVisible      = function(k, h)
{
	k.style.display = h;
};
ez.SetWidth        = function(k, h)
{
	k.style.width = h;
};
ez.SetZindex       = function(k, h)
{
	k.style.zIndex = h;
};

ez.CenterDiv       = function(k)
{
	k.style.marginLeft = '-'+parseInt(window.getComputedStyle(k, null).getPropertyValue('width'))/2;
	k.style.left = '50%';
};
ez.CenterDiv320    = function(k)
{
	var width = parseInt(window.getComputedStyle(k, null).getPropertyValue('width'));
	k.style.left = ((320-(width))/2)+'px';
};
ez.GeneratePic     = function()
{
	return (new Image());
};
ez.TouchCapable    = function()
{
	if (typeof document.createElement('div').ontouchstart == 'undefined') return false;
	return true;
};
ez.hasClass        = function(e, c)
{
	return e.className.match(new RegExp('(\\s|^)'+c+'(\\s|$)'));
};
ez.addClass        = function(e, c)
{
	if (!hasClass(e, c)) e.className+=' '+c;
};
ez.removeClass     = function(e, c)
{
	e.className = e.className.replace(new RegExp('(\\s|^)'+c+'(\\s|$)'), ' ');
};


ez.BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
                },
                {
			string: navigator.userAgent,
			subString: "iPad",
			identity: "iPad"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};

Array.prototype.removeItem = function(item) {
    for (var i=0; i<this.length; i++) {
        if (this[i] === item) {
            this.splice(i,1);
            return true;
        }
    }
    return false;
}