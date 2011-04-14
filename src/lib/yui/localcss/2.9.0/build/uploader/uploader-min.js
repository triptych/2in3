/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/*!
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * @namespace YAHOO
 */
YAHOO.namespace("deconcept");YAHOO.deconcept=YAHOO.deconcept||{};if(typeof YAHOO.deconcept.util=="undefined"||!YAHOO.deconcept.util){YAHOO.deconcept.util={};}if(typeof YAHOO.deconcept.SWFObjectUtil=="undefined"||!YAHOO.deconcept.SWFObjectUtil){YAHOO.deconcept.SWFObjectUtil={};}YAHOO.deconcept.SWFObject=function(f,d,m,g,j,l,n,i,a,e){if(!document.getElementById){return;}this.DETECT_KEY=e?e:"detectflash";this.skipDetect=YAHOO.deconcept.util.getRequestParameter(this.DETECT_KEY);this.params={};this.variables={};this.attributes=[];if(f){this.setAttribute("swf",f);}if(d){this.setAttribute("id",d);}if(m){this.setAttribute("width",m);}if(g){this.setAttribute("height",g);}if(j){this.setAttribute("version",new YAHOO.deconcept.PlayerVersion(j.toString().split(".")));}this.installedVer=YAHOO.deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){YAHOO.deconcept.SWFObject.doPrepUnload=true;}if(l){this.addParam("bgcolor",l);}var b=n?n:"high";this.addParam("quality",b);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var k=(i)?i:window.location;this.setAttribute("xiRedirectUrl",k);this.setAttribute("redirectUrl","");if(a){this.setAttribute("redirectUrl",a);}};YAHOO.deconcept.SWFObject.prototype={useExpressInstall:function(a){this.xiSWFPath=!a?"expressinstall.swf":a;this.setAttribute("useExpressInstall",true);},setAttribute:function(a,b){this.attributes[a]=b;},getAttribute:function(a){return this.attributes[a];},addParam:function(a,b){this.params[a]=b;},getParams:function(){return this.params;},addVariable:function(a,b){this.variables[a]=b;},getVariable:function(a){return this.variables[a];},getVariables:function(){return this.variables;},getVariablePairs:function(){var a=[];var b;var c=this.getVariables();for(b in c){if(c.hasOwnProperty(b)){a[a.length]=YAHOO.lang.escapeHTML(b||"")+"="+YAHOO.lang.escapeHTML(encodeURIComponent(c[b]||""));}}return a;},getSWFHTML:function(){var d="";var c={};var a="";var b="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}d='<embed type="application/x-shockwave-flash" src="'+YAHOO.lang.escapeHTML(this.getAttribute("swf")||"")+'" width="'+YAHOO.lang.escapeHTML(this.getAttribute("width")||"")+'" height="'+YAHOO.lang.escapeHTML(this.getAttribute("height")||"")+'" style="'+YAHOO.lang.escapeHTML(this.getAttribute("style")||"")+'"';d+=' id="'+YAHOO.lang.escapeHTML(this.getAttribute("id")||"")+'" name="'+YAHOO.lang.escapeHTML(this.getAttribute("id")||"")+'" ';c=this.getParams();for(a in c){if(c.hasOwnProperty(a)){d+=YAHOO.lang.escapeHTML(a||"")+'="'+YAHOO.lang.escapeHTML(c[a]||"")+'" ';}}b=this.getVariablePairs().join("&");if(b.length>0){d+='flashvars="'+b+'"';}d+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}d='<object id="'+YAHOO.lang.escapeHTML(this.getAttribute("id")||"")+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+YAHOO.lang.escapeHTML(this.getAttribute("width")||"")+'" height="'+YAHOO.lang.escapeHTML(this.getAttribute("height")||"")+'" style="'+YAHOO.lang.escapeHTML(this.getAttribute("style")||"")+'">';d+='<param name="movie" value="'+YAHOO.lang.escapeHTML(this.getAttribute("swf")||"")+'" />';c=this.getParams();for(a in c){if(c.hasOwnProperty(a)){d+='<param name="'+YAHOO.lang.escapeHTML(a||"")+'" value="'+YAHOO.lang.escapeHTML(c[a]||"")+'" />';}}b=this.getVariablePairs().join("&");if(b.length>0){d+='<param name="flashvars" value="'+b+'" />';}d+="</object>";}return d;},write:function(a){if(this.getAttribute("useExpressInstall")){var b=new YAHOO.deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(b)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var c=(typeof a=="string")?document.getElementById(a):a;c.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!==""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};YAHOO.deconcept.SWFObjectUtil.getPlayerVersion=function(){var d=null;var c=new YAHOO.deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var a=navigator.plugins["Shockwave Flash"];if(a&&a.description){c=new YAHOO.deconcept.PlayerVersion(a.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var b=3;while(d){try{b++;d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+b);c=new YAHOO.deconcept.PlayerVersion([b,0,0]);}catch(f){d=null;}}}else{try{d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(f){try{d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");c=new YAHOO.deconcept.PlayerVersion([6,0,21]);d.AllowScriptAccess="always";}catch(f){if(c.major==6){return c;}}try{d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(f){}}if(d!==null){c=new YAHOO.deconcept.PlayerVersion(d.GetVariable("$version").split(" ")[1].split(","));}}}return c;};YAHOO.deconcept.PlayerVersion=function(a){this.major=a[0]!==null?parseInt(a[0],0):0;this.minor=a[1]!==null?parseInt(a[1],0):0;this.rev=a[2]!==null?parseInt(a[2],0):0;};YAHOO.deconcept.PlayerVersion.prototype.versionIsValid=function(a){if(this.major<a.major){return false;
}if(this.major>a.major){return true;}if(this.minor<a.minor){return false;}if(this.minor>a.minor){return true;}if(this.rev<a.rev){return false;}return true;};YAHOO.deconcept.util={getRequestParameter:function(d){var c=document.location.search||document.location.hash;if(d===null){return c;}if(c){var b=c.substring(1).split("&");for(var a=0;a<b.length;a++){if(b[a].substring(0,b[a].indexOf("="))==d){return b[a].substring((b[a].indexOf("=")+1));}}}return"";}};YAHOO.deconcept.SWFObjectUtil.cleanupSWFs=function(){var c=document.getElementsByTagName("OBJECT");for(var b=c.length-1;b>=0;b--){c[b].style.display="none";for(var a in c[b]){if(typeof c[b][a]=="function"){c[b][a]=function(){};}}}};if(YAHOO.deconcept.SWFObject.doPrepUnload){if(!YAHOO.deconcept.unloadSet){YAHOO.deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",YAHOO.deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",YAHOO.deconcept.SWFObjectUtil.prepUnload);YAHOO.deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(a){return document.all[a];};}YAHOO.widget.FlashAdapter=function(f,a,b,c){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};b=b||{};this._id=b.id=b.id||YAHOO.util.Dom.generateId(null,"yuigen");b.version=b.version||"9.0.45";b.backgroundColor=b.backgroundColor||"#ffffff";this._attributes=b;this._swfURL=f;this._containerID=a;this._embedSWF(this._swfURL,this._containerID,b.id,b.version,b.backgroundColor,b.expressInstall,b.wmode,c);try{this.createEvent("contentReady");}catch(d){}};YAHOO.widget.FlashAdapter.owners=YAHOO.widget.FlashAdapter.owners||{};YAHOO.extend(YAHOO.widget.FlashAdapter,YAHOO.util.AttributeProvider,{_swfURL:null,_containerID:null,_swf:null,_id:null,_initialized:false,_attributes:null,toString:function(){return"FlashAdapter "+this._id;},destroy:function(){if(this._swf){var b=YAHOO.util.Dom.get(this._containerID);b.removeChild(this._swf);}var a=this._id;for(var c in this){if(YAHOO.lang.hasOwnProperty(this,c)){this[c]=null;}}},_embedSWF:function(j,i,e,c,f,g,b,h){var d=new YAHOO.deconcept.SWFObject(j,e,"100%","100%",c,f);if(g){d.useExpressInstall(g);}d.addParam("allowScriptAccess","always");if(b){d.addParam("wmode",b);}d.addParam("menu","false");d.addVariable("allowedDomain",document.location.hostname);d.addVariable("YUISwfId",e);d.addVariable("YUIBridgeCallback","YAHOO.widget.FlashAdapter.eventHandler");if(h){d.addVariable("buttonSkin",h);}var a=YAHOO.util.Dom.get(i);var k=d.write(a);if(k){this._swf=YAHOO.util.Dom.get(e);YAHOO.widget.FlashAdapter.owners[e]=this;}else{}},_eventHandler:function(b){var a=b.type;switch(a){case"swfReady":this._loadHandler();return;case"log":return;}this.fireEvent(a,b);},_loadHandler:function(){this._initialized=false;this._initAttributes(this._attributes);this.setAttributes(this._attributes,true);this._initialized=true;this.fireEvent("contentReady");},set:function(a,b){this._attributes[a]=b;YAHOO.widget.FlashAdapter.superclass.set.call(this,a,b);},_initAttributes:function(a){this.getAttributeConfig("altText",{method:this._getAltText});this.setAttributeConfig("altText",{method:this._setAltText});this.getAttributeConfig("swfURL",{method:this._getSWFURL});},_getSWFURL:function(){return this._swfURL;},_getAltText:function(){return this._swf.getAltText();},_setAltText:function(a){return this._swf.setAltText(a);}});YAHOO.widget.FlashAdapter.eventHandler=function(a,b){if(!YAHOO.widget.FlashAdapter.owners[a]){setTimeout(function(){YAHOO.widget.FlashAdapter.eventHandler(a,b);},0);}else{YAHOO.widget.FlashAdapter.owners[a]._eventHandler(b);}};YAHOO.widget.FlashAdapter.proxyFunctionCount=0;YAHOO.widget.FlashAdapter.createProxyFunction=function(b){var a=YAHOO.widget.FlashAdapter.proxyFunctionCount;YAHOO.widget.FlashAdapter["proxyFunction"+a]=function(){return b.apply(null,arguments);};YAHOO.widget.FlashAdapter.proxyFunctionCount++;return"YAHOO.widget.FlashAdapter.proxyFunction"+a.toString();};YAHOO.widget.FlashAdapter.removeProxyFunction=function(a){if(!a||a.indexOf("YAHOO.widget.FlashAdapter.proxyFunction")<0){return;}a=a.substr(26);YAHOO.widget.FlashAdapter[a]=null;};YAHOO.widget.Uploader=function(a,b,d){var c="window";if(!(b)||(b&&d)){c="transparent";}YAHOO.widget.Uploader.superclass.constructor.call(this,YAHOO.widget.Uploader.SWFURL,a,{wmode:c},b);this.createEvent("mouseDown");this.createEvent("mouseUp");this.createEvent("rollOver");this.createEvent("rollOut");this.createEvent("click");this.createEvent("fileSelect");this.createEvent("uploadStart");this.createEvent("uploadProgress");this.createEvent("uploadCancel");this.createEvent("uploadComplete");this.createEvent("uploadCompleteData");this.createEvent("uploadError");};YAHOO.widget.Uploader.SWFURL="assets/uploader.swf";YAHOO.extend(YAHOO.widget.Uploader,YAHOO.widget.FlashAdapter,{upload:function(a,b,e,c,d){this._swf.upload(a,b,e,c,d);},uploadThese:function(b,a,e,c,d){this._swf.uploadThese(b,a,e,c,d);},uploadAll:function(a,d,b,c){this._swf.uploadAll(a,d,b,c);},cancel:function(a){this._swf.cancel(a);},clearFileList:function(){this._swf.clearFileList();},removeFile:function(a){this._swf.removeFile(a);},setAllowLogging:function(a){this._swf.setAllowLogging(a);},setSimUploadLimit:function(a){this._swf.setSimUploadLimit(a);},setAllowMultipleFiles:function(a){this._swf.setAllowMultipleFiles(a);},setFileFilters:function(a){this._swf.setFileFilters(a);},enable:function(){this._swf.enable();},disable:function(){this._swf.disable();}});YAHOO.register("uploader",YAHOO.widget.Uploader,{version:"2.9.0",build:"2800"});