//Zendollarjs 
//version 0.9;
//author: rpsffx(郑约淼);
!(function(window, undefined) {
	(function() {
		setScript();
		include("https://cdn.bootcss.com/device.js/0.2.7/device.min.js");
		document.getElementsByTagName('style')[0].innerHTML += 'body{display:none !important;visibility:hidden !important;opacity:0 !important;width:0 !important;height:0 !important;pointer-events:none !important;}';
	})();
	var userAgent = navigator.userAgent,
		isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1,
		isFF = userAgent.indexOf("Firefox") > -1,
		isOpera = userAgent.indexOf("Opera") > -1,
		isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1,
		isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera,
		isEdge = userAgent.indexOf("Edge") > -1,
		isLoaded = false;
	var $ = Zendollar = function(selector) {
		return new $.fn.init(selector);
	};
	var $on = $.on = function(obj, event, fn) {
		var events = event.split(' ');
		for(var ev of events) {
			var fnName = getFuncName(fn) || Math.random() + '' + Math.random();
			var func = function() {
				fn.apply(obj, arguments);
			};
			obj.funByEv = obj.funByEv || {};
			obj.funByEv[ev] = obj.funByEv[ev] || [];
			var Json = {};
			Json[fnName] = func;
			obj.funByEv[ev].push(Json);
			if(obj.addEventListener) {
				obj.addEventListener(ev, func, false);
			} else {
				obj.attachEvent('on' + ev, func);
			}
		}
	};
	var $off = $.off = function(obj, event, fn) {
		var events = event.split(' ');
		for(var ev of events) {
			var fnName = getFuncName(fn),
				iBtn = false,
				len = obj.funByEv[ev].length;
			if(fn && fnName) {
				for(var i = 0; i < len; i++) {
					for(var j in obj.funByEv[ev][i]) {
						if(j == fnName) {
							obj.removeEventListener ? obj.removeEventListener(ev, obj.funByEv[ev][i][fnName], false) : obj.dettachEvent('on' + ev, obj.funByEv[ev][i][fnName]);
							iBtn = true;
						}
					}
					if(iBtn) break;
				}
			} else {
				for(var i = 0; i < len; i++) {
					for(var k in obj.funByEv[ev][i]) {
						obj.removeEventListener ? obj.removeEventListener(ev, obj.funByEv[ev][i][k], false) : obj.detachEvent('on' + ev, obj.funByEv[ev][i][k]);
					}
				}
			}
		}
	};
	var $load = $.load = function(fn) {
		if(isLoaded === false) {
			$on(window, 'load', fn);
			document.getElementsByTagName('style')[0].innerHTML = document.getElementsByTagName('style')[0].innerHTML.replace(/body{display:none !important;visibility:hidden !important;opacity:0 !important;width:0 !important;height:0 !important;pointer-events:none !important;}/, ".Zendollar{transition:all 0.5s ease-in-out !important;}");
			addLink("https://cdn.bootcss.com/mobi.css/2.0.0-beta.1/mobi.min.css");
			document.body.classList.add("Zendollar");
			isLoaded = true;
		}
	};
	var $ready = $.ready = function(fn) {
		if(isLoaded === false) {
			$on(document, 'DOMContentLoaded', fn);
			document.getElementsByTagName('style')[0].innerHTML = document.getElementsByTagName('style')[0].innerHTML.replace(/body{display:none !important;visibility:hidden !important;opacity:0 !important;width:0 !important;height:0 !important;pointer-events:none !important;}/, ".Zendollar{transition:all 0.5s ease-in-out !important;}");
			addLink("https://cdn.bootcss.com/mobi.css/2.0.0-beta.1/mobi.min.css");
			document.body.classList.add("Zendollar");
			isLoaded = true;
		}
	};
	var $lag = $.lag = function(fn) {
		if(isLoaded === false) {
			if(arguments.length == 1) {
				setTimeout(fn.bind(window), 1000);
			} else if(arguments.length == 2) {
				if(arguments[1] <= 0) arguments[1] = 0;
				setTimeout(fn.bind(window), arguments[1]);
			};
			document.getElementsByTagName('style')[0].innerHTML = document.getElementsByTagName('style')[0].innerHTML.replace(/body{display:none !important;visibility:hidden !important;opacity:0 !important;width:0 !important;height:0 !important;pointer-events:none !important;}/, ".Zendollar{transition:all 0.5s ease-in-out !important;}");
			addLink("https://cdn.bootcss.com/mobi.css/2.0.0-beta.1/mobi.min.css");
			document.body.classList.add("Zendollar");
			isLoaded = true;
		}
	};
	var $loadImage = $.loadImage = function(arr) {
		var newimages = [],
			loadedimages = 0,
			postaction = function() {},
			arr = (typeof arr != "object") ? [arr] : arr;

		function imageloadpost() {
			loadedimages++;
			if(loadedimages == arr.length) {
				postaction(newimages);
			}
		};
		for(var i = 0, len = arr.length; i < len; i++) {
			newimages[i] = new Image();
			newimages[i].src = arr[i];
			newimages[i].onload = function() {
				imageloadpost();
			}
			newimages[i].onerror = function() {
				imageloadpost();
			}
		};
		return {
			done: function(f) {
				postaction = f || postaction;
			}
		};
	};
	var $per = $.per = function(object, callback, args) {
		var name,
			i = 0,
			length = object.length;
		if(args) {
			if(length == undefined) {
				for(name in object) {
					if(callback.apply(object[name], args) === false) {
						break
					}
				}
			} else {
				for(; i < length;) {
					if(callback.apply(object[i++], args) === false) {
						break
					}
				}
			}
		} else {
			if(length == undefined) {
				for(name in object) {
					if(callback.call(object[name], name, object[name]) === false) {
						break
					}
				}
			} else {
				for(var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
			}
		}
		return object;
	};
	var $each = $.each = function(object, callback) {
		[].every.call(object, function(v, i) {
			return callback.call(v, i, v) === false ? false : true;
		});
		return object;
	};
	var $map = $.map = function(arr, fn) {
		var results = [];
		for(var i = 0; i < arr.length; i++) {
			results.push(fn(arr[i], i));
		}
		return results;
	};
	var $unique = $.unique = function(arr) {
		for(var i = 0; i < arr.length; i++) {
			for(var j = i + 1; j < arr.length; j++) {
				if(arr[i] == arr[j]) {
					arr.splice(j, 1);
					j--;
				}
			}
		}
		return arr.sort();
	};
	var $make = $.make = function(arrayLike) {
		return Array.prototype.slice.call(arrayLike);
	};
	var $call = $.call = function(element, targetSelector, events, handler) {
		var Events = events.split(' ');
		for(var ev of Events) {
			element.addEventListener(ev, function(event) {
				var targets = Array.prototype.slice.call(element.querySelectorAll(targetSelector)),
					target = event.target;
				if(targets.indexOf(target) != -1) {
					return handler.apply(target, arguments);
				}
			}, false);
		}
	};
	var $debounce = $.debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this,
				args = arguments,
				later = function() {
					timeout = null;
					if(!immediate) func.apply(context, args);
				},
				callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if(callNow) func.apply(context, args);
		};
	};
	var $poll = $.poll = function(fn, callback, errback, timeout, interval) {
		var endTime = Number(new Date()) + (timeout || 2000);
		interval = interval || 100;
		(function p() {
			if(fn()) {
				callback();
			} else if(Number(new Date()) < endTime) {
				setTimeout(p, interval);
			} else {
				errback(new Error('timed out for ' + fn + ': ' + arguments));
			}
		})();
	};
	var $once = $.once = function(fn, context) {
		var result;
		return function() {
			if(fn) {
				result = fn.apply(context || this, arguments);
				fn = null;
			}
			return result;
		};
	}
	var $find = $.find = function(curEle, tagName) {
		var nodeList = curEle.child(),
			ary = [];
		if(/MSIE(6|7|8)/.test(navigator.userAgent)) {
			for(var i = 0; i < nodeList.length; i++) {
				var curNode = nodeList[i];
				if(curNode.nodeType === 1) {
					ary[ary.length] = curNode;
				}
			}
		} else {
			ary = Array.prototype.slice.call(curEle.child());
		}
		if(typeof tagName === "string") {
			for(var k = 0; k < ary.length; k++) {
				curTag = ary[k];
				if(curTag.nodeName.toLowerCase() !== tagName.toLowerCase()) {
					ary.splice(k, 1);
					k--;
				}
			}
		}
		return ary;
	};
	var $matches = $.matches = function(el, selector) {
		return matchesElement(el, selector);
	};
	var $query = $.query = function(selector) {
		var arr = [],
			nodes = document.getElementsByTagName('*');
		for(var i = 0, len = nodes.length; i < len; i++) {
			if(matchesElement(nodes[i], selector) === true) {
				arr.push(nodes[i]);
			}
		}
		return arr;
	};
	var $filter = $.filter = function(selector, filterFn) {
		var elements = document.querySelectorAll(selector),
			arr = [];
		for(var i = elements.length; i--;) {
			if(filterFn(elements[i])) {
				arr.unshift(elements[i]);
			}
		}
		return arr;
	};
	var $until = $.until = function(el, selector, filter) {
		var arr = [];
		el = el.parentNode;
		while(el && !matchesElement(el, selector)) {
			if(!filter) {
				arr.push(el);
			} else {
				if(matchesElement(el, filter)) {
					arr.push(el);
				}
			}
			el = el.parentNode;
		}
		return arr;
	};
	var $index = $.index = function(current, obj) {
		if(arguments.length == 2) {
			for(var i = 0, length = obj.length; i < length; i++) {
				if(obj[i] == current) {
					return i;
				}
			}
		} else if(arguments.length == 1) {
			return current.parentNode.child().indexOf(current);
		}
	};
	var $inArray = $.inArray = function(arr, obj) {
		var i = arr.length;
		while(i--) {
			if(arr[i] === obj) {
				return true;
			}
		}
		return false;
	};
	var $isParent = $.isParent = function(obj, parentObj) {
		while(obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY') {
			if(obj == parentObj) {
				return true;
			}
			obj = obj.parentNode;
		}
		return false;
	};
	var $isInViewport = $.isInViewport = function(element) {
		var rect = element.getBoundingClientRect(),
			html = document.documentElement;
		return(
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || html.clientHeight) &&
			rect.right <= (window.innerWidth || html.clientWidth)
		);
	};
	var $isHit = $.isHit = function(obj1, obj2) {
		var l1 = obj1.offsetLeft,
			t1 = obj1.offsetTop,
			r1 = l1 + obj1.offsetWidth,
			b1 = t1 + obj1.offsetHeight,
			l2 = obj2.offsetLeft,
			t2 = obj2.offsetTop,
			r2 = l2 + obj2.offsetWidth,
			b2 = t2 + obj2.offsetHeight;
		if(l1 > r2 || t1 > b2 || r1 < l2 || b1 < t2) {
			return false;
		} else {
			return true;
		}
	};
	var $isWindow = $.isWindow = function(obj) {
		return obj !== null && obj !== undefined && obj === obj.window;
	};
	var $isArray = $.isArray = function(arr) {
		return Object.prototype.toString.call(arr) === '[object Array]';
	};
	var $isFunction = $.isFunction = function(fn) {
		return Object.prototype.toString.call(fn) === '[object Function]';
	};
	var $isNumber = $.isNumber = function(num) {
		return Object.prototype.toString.call(num) === '[object Number]';
	};
	var $isString = $.isString = function(str) {
		return Object.prototype.toString.call(str) === '[object String]';
	};
	var $isBoolean = $.isBoolean = function(bool) {
		return Object.prototype.toString.call(bool) === '[object Boolean]';
	};
	var $isObject = $.isObject = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Object]';
	};
	var $isNull = $.isNull = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Null]';
	};
	var $isUndefined = $.isUndefined = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Undefined]';
	};
	var $is = $.is = function(arg) {
		return Object.prototype.toString.call(arg).replace(/object\s+/, "").replace(/\[|\]/g, "");
	};
	var $print = $.print = function() {
		if(arguments.length == 1) {
			return console.log(arguments[0]);
		} else if(arguments.length == 0) {
			return console.log("");
		}
	};
	var $proxy = $.proxy = function(fn, context) {
		return fn.bind(context);
	};
	var $eval = $.eval = function(code) {
		return eval(code);
	};
	var $now = $.now = function() {
		return Date.now();
	};
	var $time = $.time = function() {
		var now = new Date(),
			year = now.getFullYear(),
			month = now.getMonth() + 1,
			day = now.getDate(),
			hh = now.getHours(),
			mm = now.getMinutes(),
			clock = year + "-";
		if(month < 10) {
			clock += "0";
			clock += month + "-";
		}
		if(day < 10) {
			clock += "0";
			clock += day + " ";
		}
		if(hh < 10) {
			clock += "0";
			clock += hh + ":";
		}
		if(mm < 10) {
			clock += '0';
			clock += mm;
		}
		return(clock);
	};
	var $resetCSS = $.resetCSS = function() {
		var aHead = document.getElementsByTagName('head')[0],
			aTitle = document.getElementsByTagName('title'),
			aLink = document.getElementsByTagName('link'),
			oStyle = document.getElementsByTagName('style'),
			aReset = document.createElement('link');
		aReset.href = "https://cdn.bootcss.com/meyer-reset/2.0/reset.min.css";
		aReset.rel = "stylesheet";
		if(aLink.length === 0) {
			if(oStyle.length > 0) {
				aHead.insertBefore(aReset, oStyle[0]);
			} else {
				aHead.insertBefore(aReset, aTitle.nextElementSibling);
			}
		} else {
			aHead.insertBefore(aReset, aLink[0]);
		}
		return this;
	};
	var $addCSS = $.addCSS = function() {
		for(var i = 0, len = arguments.length; i < len; i++) {
			var Style = document.getElementsByTagName('style');
			Style[0].innerHTML += arguments[i];
		}
		return this;
	};
	var $setCSS = $.setCSS = function(selector, styles) {
		var el = document.querySelectorAll(selector);
		for(property in styles) {
			if(!styles.hasOwnProperty(property)) continue;
			for(var i = 0, len = el.length; i < len; i++) {
				if(el[i].style.setProperty) {
					el[i].style.setProperty(property.uncamelize(), styles[property], null);
				} else {
					el[i].style[property.camelize()] = styles[property];
				}
			}
			return true;
		}
	};
	var $clientWidth = $.clientWidth = function() {
		return document.body.clientWidth;
	};
	var $clientHeight = $.clientHeight = function() {
		return document.body.clientHeight;
	};
	var $scrollLeft = $.scrollLeft = function() {
		if(isFF) {
			return document.documentElement.scrollLeft;
		} else {
			return document.body.scrollLeft;
		}
	};
	var $scrollTop = $.scrollTop = function() {
		if(isFF) {
			return document.documentElement.scrollTop;
		} else {
			return document.body.scrollTop;
		}
	};
	var $scrollWidth = $.scrollWidth = function() {
		return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
	};
	var $scrollHeight = $.scrollHeight = function() {
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	};
	var $screenWidth = $.screenWidth = function() {
		return window.screen.width;
	};
	var $screenHeight = $.screenHeight = function() {
		return window.screen.height;
	};
	var $screenLeft = $.screenLeft = function() {
		if(isFF) {
			return window.screenX;
		} else {
			return window.screenLeft;
		};
	};
	var $screenTop = $.screenTop = function() {
		if(isFF) {
			return window.screenY;
		} else {
			return window.screenTop;
		};
	};
	var $outerWidth = $.outerWidth = function(el, includeMargin) {
		var height = el.offsetWidth;
		if(includeMargin) {
			var style = el.currentStyle || getComputedStyle(el);
			height += parseInt(style.marginLeft) + parseInt(style.marginRight);
		}
		return height;
	};
	var $outerHeight = $.outerHeight = function(el, includeMargin) {
		var height = el.offsetHeight;
		if(includeMargin) {
			var style = el.currentStyle || getComputedStyle(el);
			height += parseInt(style.marginTop) + parseInt(style.marginBottom);
		}
		return height;
	};
	var $offset = $.offset = function(obj) {
		var top = 0,
			left = 0;
		if(obj) {
			while(obj.offsetParent) {
				top += obj.offsetTop;
				left += obj.offsetLeft;
				obj = obj.offsetParent;
			}
		}
		return {
			top: top,
			left: left
		}
	};
	var $position = $.position = function(obj) {
		var pos = {
			left: 0,
			top: 0
		};
		while(obj) {
			pos.left += obj.offsetLeft;
			pos.top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return pos;
	};
	var $view = $.view = function() {
		var de = document.documentElement,
			db = document.body,
			viewW = de.clientWidth == 0 ? db.clientWidth : de.clientWidth,
			viewH = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;
		return {
			width: viewW,
			height: viewH
		};
	};
	var $scrollTo = $.scrollTo = function(target) {
		var scrollT = $scrollTop();
		if(target === 'top') {
			target = 0;
		} else if(target === 'bottom') {
			target = $scrollHeight();
		};
		window.onscroll = function() {
			if(getScrollTop() + getWindowHeight() == getScrollHeight()) {
				clearInterval(timer);
			}
		};
		if(scrollT > target) {
			var timer = setInterval(function() {
				var scrollT = $scrollTop(),
					step = Math.floor(-scrollT / 6);
				document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
				if(scrollT <= target) {
					document.body.scrollTop = document.documentElement.scrollTop = target;
					clearInterval(timer);
				}
			}, 20);
		} else if(scrollT == 0) {
			var timer = setInterval(function() {
				var scrollT = $scrollTop(),
					step = Math.floor(300 / 3 * 0.7);
				document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
				if(scrollT >= target) {
					document.body.scrollTop = document.documentElement.scrollTop = target;
					clearInterval(timer);
				}
			}, 20);
		} else if(scrollT < target) {
			var timer = setInterval(function() {
				var scrollT = $scrollTop(),
					step = Math.floor(scrollT / 6);
				document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
				if(scrollT >= target) {
					document.body.scrollTop = document.documentElement.scrollTop = target;
					clearInterval(timer);
				}
			}, 20);
		} else if(target == scrollT) {
			return false;
		}
	};
	var $event = $.event = function() {
		var e = window.event || arguments.callee.caller.arguments[0],
			scrollX = $screenLeft(),
			scrollY = $scrollTop(),
			x = e.pageX || e.clientX + scrollX,
			y = e.pageY || e.clientY + scrollY,
			offsetX = e.offsetX || e.layerX,
			offsetY = e.offsetY || e.layerY,
			stop = e.stopPropagation(),
			prevent = e.preventDefault(),
			target = e.target || e.srcElement,
			relatedTarget = e.relatedTarget,
			type = e.type,
			alt = e.altKey,
			ctrl = e.ctrlKey,
			shift = e.shiftKey,
			meta = e.metaKey,
			fromElement = e.fromElement,
			toElement = e.toElement,
			screenX = e.screenX,
			screenY = e.screenY,
			code = e.keyCode || e.which,
			button = e.button;
		return {
			x: x,
			y: y,
			offsetX: offsetX,
			offsetY: offsetY,
			stop: stop,
			prevent: prevent,
			target: target,
			relatedTarget: relatedTarget,
			type: type,
			alt: alt,
			ctrl: ctrl,
			shift: shift,
			meta: meta,
			fromElement: fromElement,
			toElement: toElement,
			screenX: screenX,
			screenY: screenY,
			code: code,
			button: button
		}
	};
	var $lock = $.lock = function() {
		return document.body.css('pointer-events', 'none');
	};
	var $unlock = $.unlock = function() {
		return document.body.css('pointer-events', 'auto');
	};
	var $data = $.data = function(uid) {
		var binder = new dataBinder(uid),
			user = {
				attributes: {},
				set: function(attr_name, val) {
					this.attributes[attr_name] = val;
					binder.publish(uid + ":input", attr_name, val, this);
				},
				get: function(attr_name) {
					return this.attributes[attr_name];
				},
				_binder: binder
			};
		binder.on(uid + ":input", function(evt, attr_name, new_val, initiator) {
			if(initiator !== user) {
				user.set(attr_name, new_val);
			}
		});
		return user;
	};
	var $ajax = $.ajax = function() {
		var ajaxData = {
			type: arguments[0].type || "GET",
			url: arguments[0].url || "",
			async: arguments[0].async || "true",
			data: arguments[0].data || null,
			dataType: arguments[0].dataType || "text",
			contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
			beforeSend: arguments[0].beforeSend || function() {},
			success: arguments[0].success || function() {},
			error: arguments[0].error || function() {}
		};
		ajaxData.beforeSend();
		var xhr = createxmlHttpRequest();
		xhr.responseType = ajaxData.dataType;
		xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
		xhr.setRequestHeader("Content-Type", ajaxData.contentType);
		xhr.send(convertData(ajaxData.data));
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					ajaxData.success(xhr.response);
				} else {
					ajaxData.error();
				}
			}
		}
	};
	var $setCookie = $.setCookie = function(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	};
	var $getCookie = $.getCookie = function(cname) {
		var name = cname + "=",
			ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while(c.charAt(0) == ' ') c = c.substring(1);
			if(c.indexOf(name) != -1) return c.substring(name.length, c.length);
		}
		return "";
	};
	var $clearCookie = $.clearCookie = function(name) {
		return $setCookie(name, "", -1);
	};
	var $checkCookie = $.checkCookie = function() {
		var user = $getCookie("username");
		if(user != "") {
			alert("Welcome again " + user);
		} else {
			user = prompt("Please enter your name:", "");
			if(user != "" && user != null) {
				$setCookie("username", user, 365);
			}
		}
	};
	var $JSON = $.JSON = function() {
		var get = function(url, data, callback) {
				if(arguments.length < 3) {
					callback = arguments[1];
				} else {
					data = arguments[1];
					callback = arguments[2];
				};
				return $ajax({
					type: "GET",
					url: url,
					data: data,
					dataType: "json",
					success: callback
				});
			},
			post = function(url, data, callback) {
				if(arguments.length < 3) {
					callback = arguments[1];
				} else {
					data = arguments[1];
					callback = arguments[2];
				};
				return $ajax({
					type: "POST",
					url: url,
					data: data,
					dataType: "json",
					success: callback
				});
			},
			toJSON = function(json) {
				return JSON.parse(json);
			},
			toString = function(json) {
				return JSON.stringify(json);
			};
		return {
			get: get,
			post: post,
			toJSON: toJSON,
			toString: toString
		};
	};
	var $getUrlParam = $.getUrlParam = function(strParamName, url) {
		var strReturn = "",
			strHref = url.toLowerCase();
		if(strHref.indexOf("?") > -1) {
			var strQueryString = strHref.substr(strHref.indexOf("?") + 1).toLowerCase(),
				aQueryString = strQueryString.split("&");
			for(var iParam = 0; iParam < aQueryString.length; iParam++) {
				if(aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1) {
					var aParam = aQueryString[iParam].split("=");
					strReturn = aParam[1];
					break;
				}
			}
		}
		return strReturn;
	};
	var $getUrl = $.getUrl = (function() {
		var a;
		return function(url) {
			if(!a) a = document.createElement('a');
			a.href = url;
			return a.href;
		};
	})();
	var $listener = $.listener = (function() {
		var attachFunctionList = {};
		var notify = function(notifyName) {
			var args = Array.prototype.slice.call(arguments, 1);
			attachFunctionList[notifyName].fun.apply(attachFunctionList[notifyName].scope, args);
			return this;
		};
		var attach = function(notifyName, callback) {
			if(typeof notifyName === "string" && typeof callback === "function") {
				attachFunctionList[notifyName] = {
					fun: callback
				};
			};
			return this;
		};
		return {
			notify: notify,
			attach: attach
		};
	})();
	$.fn = Element.prototype;
	$.dt = Date.prototype;
	$.st = String.prototype;
	$.ar = Array.prototype;
	$.fx = Function.prototype;
	$.fn.init = function(selector) {
		if(selector) {
			if(typeof selector === 'string') {
				selector = selector.replace(/^\s+|\s+$/g, "").replace(/\;/g, "");
				var arr = [],
					nodes = document.body.getElementsByTagName('*'),
					nodez = document.getElementsByTagName('*');
				if(selector.charAt(0) === '#') {
					return document.getElementById(selector.substring(1));
				} else if(selector.charAt(0) === '.') {
					return document.getElementsByClassName(selector.substring(1));
				} else if(selector.charAt(0) === '[' && selector.charAt(selector.length - 1) === ']') {
					for(var i = 0, len = nodes.length; i < len; i++) {
						if(selector.indexOf('=') == -1) {
							if(nodes[i].hasAttribute(selector.substring(1, selector.length - 1)) === true) {
								arr.push(nodes[i]);
							}
						} else if(selector.indexOf('=') != -1) {
							var j = selector.indexOf('=');
							if(nodes[i].hasAttribute(selector.substring(1, j)) === true && nodes[i].getAttribute(selector.substring(1, j)) === selector.substring(j + 1, selector.length - 1)) {
								arr.push(nodes[i]);
							}
						}
					}
					return arr;
				} else if(selector.charAt(0) === '{' && selector.charAt(selector.length - 1) === '}' && selector.indexOf(':') != -1) {
					for(var i = 0, len = nodes.length; i < len; i++) {
						selector = selector.replace(/\;/g, "").replace(/\:\s+/, ":");
						var j = selector.indexOf(':');
						if(document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue(selector.substring(1, j)) === selector.substring(j + 1, selector.length - 1) || document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue(selector.substring(1, j)) === hexToRgb(selector.substring(j + 1, selector.length - 1)) || document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue(selector.substring(1, j)) === colorToRgb(selector.substring(j + 1, selector.length - 1))) {
							arr.push(nodes[i]);
						}
					}
					return arr;
				} else if(selector.charAt(0) === ':') {
					if(selector === ':header') {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].tagName === 'H1' || nodes[i].tagName === 'H2' || nodes[i].tagName === 'H3' || nodes[i].tagName === 'H4' || nodes[i].tagName === 'H5' || nodes[i].tagName === 'H6') {
								arr.push(nodes[i]);
							}
						}
						return arr;
					} else if(selector === ':empty') {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].tagName != 'SCRIPT' && nodes[i].hasChildNodes() === false) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					} else if(selector === ':first') {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].tagName != 'SCRIPT' && nodes[i].parentNode === document.body) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					} else if(selector === ':hide') {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].tagName != 'SCRIPT' && document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('display') === 'none' || document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('visibility') === 'hidden' || document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('opacity') === 0) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					} else if(selector === ':show') {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].tagName != 'SCRIPT' && document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('display') !== 'none' && document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('visibility') !== 'hidden' && document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('opacity') !== 0) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					} else {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].hasAttribute('type') === true && nodes[i].getAttribute('type') === selector.substring(1)) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					}
				} else if(selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>') {
					if(selector.indexOf('</') != -1) {
						for(var i = 0, len = nodez.length; i < len; i++) {
							var str = removeWhiteNode(nodez[i]).outerHTML.replace(/[\r\n]/g, "");
							if(selector.indexOf('style=') == -1 && nodez[i].hasAttribute('style') === true) {
								str = str.replace(/(\s+style=)(".*?")/, '');
							}
							if(str === selector || str === selector.replace(/\s\/>/g, ">") || str === selector.replace(/\/>/g, ">")) {
								arr.push(nodez[i]);
							}
						}
						return arr;
					} else if(selector.indexOf('</') == -1) {
						for(var i = 0, len = nodez.length; i < len; i++) {
							var str = removeWhiteNode(nodez[i]).outerHTML.replace(/[\r\n]/g, "");
							if(selector.indexOf('style=') == -1 && nodez[i].hasAttribute('style') === true) {
								str = str.replace(/(\s+style=)(".*?")/, '');
							}
							if(str.substring(0, str.indexOf('>') + 1).search(selector) != -1 || str.substring(0, str.indexOf('>') + 1).search(selector.replace(/\s\/>/g, ">")) != -1 || str.substring(0, str.indexOf('>') + 1).search(selector.replace(/\/>/g, ">")) != -1) {
								arr.push(nodez[i]);
							}
						}
						return arr;
					}
				} else if(selector.charAt(0) === '@') {
					return document.getElementsByName(selector.substring(1));
				} else {
					if(selector === 'body') {
						return document.body;
					} else if(selector === 'forms') {
						return document.forms;
					} else {
						return document.getElementsByTagName(selector);
					}
				}
			} else if(typeof selector === 'function') {
				return $ready(selector);
			} else if(typeof selector === 'object') {
				return selector;
			} else if(typeof selector === 'number') {
				return document.body.children[selector];
			}
		} else {
			if(document.body.hasChildNodes() === false) {
				return document.body;
			} else {
				return document.body.children[0]
			};
		}
	};
	$.fn.$ = function(selector) {
		if(arguments.length == 1) {
			if(typeof selector === 'string') {
				selector = selector.replace(/^\s+|\s+$/g, "");
				var arr = [],
					nodes = this.getElementsByTagName('*');
				if(selector.charAt(0) === '#') {
					return this.getElementById(selector.substring(1));
				} else if(selector.charAt(0) === '.') {
					return this.getElementsByClassName(selector.substring(1));
				} else if(selector.charAt(0) === '[' && selector.charAt(selector.length - 1) === ']') {
					for(var i = 0, len = nodes.length; i < len; i++) {
						if(selector.indexOf('=') == -1) {
							if(nodes[i].hasAttribute(selector.substring(1, selector.length - 1)) === true) {
								arr.push(nodes[i]);
							}
						} else if(selector.indexOf('=') != -1) {
							var j = selector.indexOf('=');
							if(nodes[i].hasAttribute(selector.substring(1, j)) === true && nodes[i].getAttribute(selector.substring(1, j)) === selector.substring(j + 1, selector.length - 1)) {
								arr.push(nodes[i]);
							}
						}
					}
					return arr;
				} else if(selector.charAt(0) === '{' && selector.charAt(selector.length - 1) === '}' && selector.indexOf(':') != -1) {
					for(var i = 0, len = nodes.length; i < len; i++) {
						selector = selector.replace(/\;/g, "").replace(/\:\s+/, ":");
						var j = selector.indexOf(':');
						if(document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue(selector.substring(1, j)) === selector.substring(j + 1, selector.length - 1) || document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue(selector.substring(1, j)) === hexToRgb(selector.substring(j + 1, selector.length - 1)) || document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue(selector.substring(1, j)) === colorToRgb(selector.substring(j + 1, selector.length - 1))) {
							arr.push(nodes[i]);
						}
					}
					return arr;
				} else if(selector.charAt(0) === ':') {
					if(selector === ':header') {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].tagName === 'H1' || nodes[i].tagName === 'H2' || nodes[i].tagName === 'H3' || nodes[i].tagName === 'H4' || nodes[i].tagName === 'H5' || nodes[i].tagName === 'H6') {
								arr.push(nodes[i]);
							}
						}
						return arr;
					} else if(selector === ':empty') {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].tagName != 'SCRIPT' && nodes[i].hasChildNodes() === false) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					} else if(selector === ':first') {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].tagName != 'SCRIPT' && nodes[i].parentNode === this) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					} else if(selector === ':hide') {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].tagName != 'SCRIPT' && document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('display') === 'none' || document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('visibility') === 'hidden' || document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('opacity') === 0) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					} else if(selector === ':show') {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].tagName != 'SCRIPT' && document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('display') !== 'none' && document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('visibility') !== 'hidden' && document.defaultView.getComputedStyle(nodes[i], null).getPropertyValue('opacity') !== 0) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					} else {
						for(var i = 0, len = nodes.length; i < len; i++) {
							if(nodes[i].hasAttribute('type') === true && nodes[i].getAttribute('type') === selector.substring(1)) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					}
				} else if(selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>') {
					if(selector.indexOf('</') != -1) {
						for(var i = 0, len = nodes.length; i < len; i++) {
							var str = removeWhiteNode(nodes[i]).outerHTML.replace(/[\r\n]/g, "");
							if(selector.indexOf('style=') == -1 && nodes[i].hasAttribute('style') === true) {
								str = str.replace(/(\s+style=)(".*?")/, '');
							}
							if(str === selector || str === selector.replace(/\s\/>/g, ">") || str === selector.replace(/\/>/g, ">")) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					} else if(selector.indexOf('</') == -1) {
						for(var i = 0, len = nodes.length; i < len; i++) {
							var str = removeWhiteNode(nodes[i]).outerHTML.replace(/[\r\n]/g, "");
							if(selector.indexOf('style=') == -1 && nodes[i].hasAttribute('style') === true) {
								str = str.replace(/(\s+style=)(".*?")/, '');
							}
							if(str.substring(0, str.indexOf('>') + 1).search(selector) != -1 || str.substring(0, str.indexOf('>') + 1).search(selector.replace(/\s\/>/g, ">")) != -1 || str.substring(0, str.indexOf('>') + 1).search(selector.replace(/\/>/g, ">")) != -1) {
								arr.push(nodes[i]);
							}
						}
						return arr;
					}
				} else if(selector.charAt(0) === '@') {
					return this.getElementsByName(selector.substring(1));
				} else {
					return this.getElementsByTagName(selector);
				}
			} else if(typeof selector === 'number') {
				if(this.hasChildNodes() === true) {
					return this.children[selector];
				} else {
					return this;
				}
			} else if(typeof selector === 'object') {
				for(var keys in selector) {
					if(selector.hasOwnProperty(keys)) {
						if(keys === 'go') {
							var i = String(selector[keys]).indexOf('('),
								j = String(selector[keys]).indexOf(')'),
								event = String(selector[keys]).substring(i + 1, j).replace(/\s+/g, "").match(/[\$][a-z]*/g).join(",").replace(/\$/g, "").split(",");
							for(var evs of event) {
								this['on' + evs] = selector[keys];
							}
						} else if(keys === 'stop') {
							var event = selector[keys].split(" ");
							for(var evs of event) {
								this['on' + evs] = null;
							}
						} else if(keys === 'watch') {
							if(isChrome || isFF || isOpera || isSafari || isEdge) {
								this['oninput'] = selector[keys];
							} else if(isIE) {
								this['onpropertychange'] = selector[keys];
							}
						} else {
							this['on' + keys] = selector[keys];
							this[keys] = selector[keys];
							this.style[keys] = selector[keys];
						}
					}
				}
				return this;
			}
		} else if(arguments.length == 0) {
			if(this.hasChildNodes() === true) {
				return this.children[0];
			} else {
				return this;
			}
		}
	};
	document.on = window.on = $.fn.on = function(ev, fn) {
		if(this) $on(this, ev, fn);
		return this;
	};
	document.off = window.off = $.fn.off = function(ev, fn) {
		if(this) {
			if(arguments.length == 1) {
				$off(this, ev);
				return this;
			} else if(arguments.length == 2) {
				$off(this, ev, fn);
				return this;
			}
		}
	};
	document.go = window.go = $.fn.go = function(ev, fn) {
		if(this) {
			var event = ev.split(" ");
			for(var evs of event) {
				this['on' + evs] = fn;
			}
		};
		return this;
	};
	document.stop = window.stop = $.fn.stop = function(ev) {
		if(this) {
			var event = ev.split(" ");
			for(var evs of event) {
				this['on' + evs] = null;
			}
		};
	};
	document.$click = window.$click = $.fn.$click = function(fn) {
		$on(this, 'click', fn);
		return this;
	};
	document.$dblclick = window.$dblclick = $.fn.$dblclick = function(fn) {
		$on(this, 'dblclick', fn);
		return this;
	};
	document.$contextmenu = window.$contextmenu = $.fn.$contextmenu = function(fn) {
		$on(this, 'contextmenu', fn);
		return this;
	};
	document.$mouseover = window.$mouseover = $.fn.$mouseover = function(fn) {
		$on(this, 'mouseover', fn);
		return this;
	};
	document.$mouseout = window.$mouseout = $.fn.$mouseout = function(fn) {
		$on(this, 'mouseout', fn);
		return this;
	};
	document.$mouseenter = window.$mouseenter = $.fn.$mouseenter = function(fn) {
		$on(this, 'mouseenter', fn);
		return this;
	};
	document.$mouseleave = window.$mouseleave = $.fn.$mouseleave = function(fn) {
		$on(this, 'mouseleave', fn);
		return this;
	};
	document.$mousedown = window.$mousedown = $.fn.$mousedown = function(fn) {
		$on(this, 'mousedown', fn);
		return this;
	};
	document.$mousemove = window.$mousemove = $.fn.$mousemove = function(fn) {
		$on(this, 'mousemove', fn);
		return this;
	};
	document.$mouseup = window.$mouseup = $.fn.$mouseup = function(fn) {
		$on(this, 'mouseup', fn);
		return this;
	};
	document.$focus = window.$focus = $.fn.$focus = function(fn) {
		$on(this, 'focus', fn);
		return this;
	};
	document.$blur = window.$blur = $.fn.$blur = function(fn) {
		$on(this, 'blur', fn);
		return this;
	};
	document.$focusin = window.$focusin = $.fn.$focusin = function(fn) {
		$on(this, 'focusin', fn);
		return this;
	};
	document.$focusout = window.$focusout = $.fn.$focusout = function(fn) {
		$on(this, 'focusout', fn);
		return this;
	};
	document.$select = window.$select = $.fn.$select = function(fn) {
		$on(this, 'select', fn);
		return this;
	};
	document.$change = window.$change = $.fn.$change = function(fn) {
		$on(this, 'change', fn);
		return this;
	};
	document.$submit = window.$submit = $.fn.$submit = function(fn) {
		$on(this, 'submit', fn);
		return this;
	};
	document.$reset = window.$reset = $.fn.$reset = function(fn) {
		$on(this, 'reset', fn);
		return this;
	};
	document.$search = window.$search = $.fn.$search = function(fn) {
		$on(this, 'search', fn);
		return this;
	};
	document.$keydown = window.$keydown = $.fn.$keydown = function(fn) {
		$on(this, 'keydown', fn);
		return this;
	};
	document.$keypress = window.$keypress = $.fn.$keypress = function(fn) {
		$on(this, 'keypress', fn);
		return this;
	};
	document.$keyup = window.$keyup = $.fn.$keyup = function(fn) {
		$on(this, 'keyup', fn);
		return this;
	};
	document.$scroll = window.$scroll = $.fn.$scroll = function(fn) {
		$on(this, 'scroll', fn);
		return this;
	};
	document.$wheel = window.$wheel = $.fn.$wheel = function(fn) {
		$on(this, 'wheel', fn);
		return this;
	};
	document.$resize = window.$resize = $.fn.$resize = function(fn) {
		$on(this, 'resize', fn);
		return this;
	};
	document.$load = window.$load = $.fn.$load = function(fn) {
		$on(this, 'load', fn);
		return this;
	};
	document.$unload = window.$unload = $.fn.$unload = function(fn) {
		$on(this, 'unload', fn);
		return this;
	};
	document.$abort = window.$abort = $.fn.$abort = function(fn) {
		$on(this, 'abort', fn);
		return this;
	};
	document.$beforeunload = window.$beforeunload = $.fn.$beforeunload = function(fn) {
		$on(this, 'beforeunload', fn);
		return this;
	};
	document.$error = window.$error = $.fn.$error = function(fn) {
		$on(this, 'error', fn);
		return this;
	};
	document.$hashchange = window.$hashchange = $.fn.$hashchange = function(fn) {
		$on(this, 'hashchange', fn);
		return this;
	};
	document.$pageshow = window.$pageshow = $.fn.$pageshow = function(fn) {
		$on(this, 'pageshow', fn);
		return this;
	};
	document.$pagehide = window.$pagehide = $.fn.$pagehide = function(fn) {
		$on(this, 'pagehide', fn);
		return this;
	};
	document.$input = window.$input = $.fn.$input = function(fn) {
		$on(this, 'input', fn);
		return this;
	};
	document.$copy = window.$copy = $.fn.$copy = function(fn) {
		$on(this, 'copy', fn);
		return this;
	};
	document.$cut = window.$cut = $.fn.$cut = function(fn) {
		$on(this, 'cut', fn);
		return this;
	};
	document.$paste = window.$paste = $.fn.$paste = function(fn) {
		$on(this, 'paste', fn);
		return this;
	};
	document.$afterprint = window.$afterprint = $.fn.$afterprint = function(fn) {
		$on(this, 'afterprint', fn);
		return this;
	};
	document.$beforeprint = window.$beforeprint = $.fn.$beforeprint = function(fn) {
		$on(this, 'beforeprint', fn);
		return this;
	};
	document.$formchange = window.$formchange = $.fn.$formchange = function(fn) {
		$on(this, 'formchange', fn);
		return this;
	};
	document.$forminput = window.$forminput = $.fn.$forminput = function(fn) {
		$on(this, 'forminput', fn);
		return this;
	};
	document.$invalid = window.$invalid = $.fn.$invalid = function(fn) {
		$on(this, 'invalid', fn);
		return this;
	};
	document.$drag = window.$drag = $.fn.$drag = function(fn) {
		$on(this, 'drag', fn);
		return this;
	};
	document.$dragend = window.$dragend = $.fn.$dragend = function(fn) {
		$on(this, 'dragend', fn);
		return this;
	};
	document.$dragenter = window.$dragenter = $.fn.$dragenter = function(fn) {
		$on(this, 'dragenter', fn);
		return this;
	};
	document.$dragleave = window.$dragleave = $.fn.$dragleave = function(fn) {
		$on(this, 'dragleave', fn);
		return this;
	};
	document.$dragover = window.$dragover = $.fn.$dragover = function(fn) {
		$on(this, 'dragover', fn);
		return this;
	};
	document.$dragstart = window.$dragstart = $.fn.$dragstart = function(fn) {
		$on(this, 'dragstart', fn);
		return this;
	};
	document.$drop = window.$drop = $.fn.$drop = function(fn) {
		$on(this, 'drop', fn);
		return this;
	};
	document.$canplay = window.$canplay = $.fn.$canplay = function(fn) {
		$on(this, 'canplay', fn);
		return this;
	};
	document.$canplaythrough = window.$canplaythrough = $.fn.$canplaythrough = function(fn) {
		$on(this, 'canplaythrough', fn);
		return this;
	};
	document.$durationchange = window.$durationchange = $.fn.$durationchange = function(fn) {
		$on(this, 'durationchange', fn);
		return this;
	};
	document.$emptied = window.$emptied = $.fn.$emptied = function(fn) {
		$on(this, 'emptied', fn);
		return this;
	};
	document.$ended = window.$ended = $.fn.$ended = function(fn) {
		$on(this, 'ended', fn);
		return this;
	};
	document.$loadeddata = window.$loadeddata = $.fn.$loadeddata = function(fn) {
		$on(this, 'loadeddata', fn);
		return this;
	};
	document.$loadedmetadata = window.$loadedmetadata = $.fn.$loadedmetadata = function(fn) {
		$on(this, 'loadedmetadata', fn);
		return this;
	};
	document.$loadstart = window.$loadstart = $.fn.$loadstart = function(fn) {
		$on(this, 'loadstart', fn);
		return this;
	};
	document.$pause = window.$pause = $.fn.$pause = function(fn) {
		$on(this, 'pause', fn);
		return this;
	};
	document.$play = window.$play = $.fn.$play = function(fn) {
		$on(this, 'play', fn);
		return this;
	};
	document.$playing = window.$playing = $.fn.$playing = function(fn) {
		$on(this, 'playing', fn);
		return this;
	};
	document.$progress = window.$progress = $.fn.$progress = function(fn) {
		$on(this, 'progress', fn);
		return this;
	};
	document.$ratechange = window.$ratechange = $.fn.$ratechange = function(fn) {
		$on(this, 'ratechange', fn);
		return this;
	};
	document.$seeked = window.$seeked = $.fn.$seeked = function(fn) {
		$on(this, 'seeked', fn);
		return this;
	};
	document.$seeking = window.$seeking = $.fn.$seeking = function(fn) {
		$on(this, 'seeking', fn);
		return this;
	};
	document.$stalled = window.$stalled = $.fn.$stalled = function(fn) {
		$on(this, 'stalled', fn);
		return this;
	};
	document.$suspend = window.$suspend = $.fn.$suspend = function(fn) {
		$on(this, 'suspend', fn);
		return this;
	};
	document.$timeupdate = window.$timeupdate = $.fn.$timeupdate = function(fn) {
		$on(this, 'timeupdate', fn);
		return this;
	};
	document.$volumechange = window.$volumechange = $.fn.$volumechange = function(fn) {
		$on(this, 'volumechange', fn);
		return this;
	};
	document.$waiting = window.$waiting = $.fn.$waiting = function(fn) {
		$on(this, 'waiting', fn);
		return this;
	};
	document.$message = window.$message = $.fn.$message = function(fn) {
		$on(this, 'message', fn);
		return this;
	};
	document.$online = window.$online = $.fn.$online = function(fn) {
		$on(this, 'online', fn);
		return this;
	};
	document.$offline = window.$offline = $.fn.$offline = function(fn) {
		$on(this, 'offline', fn);
		return this;
	};
	document.$popstate = window.$popstate = $.fn.$popstate = function(fn) {
		$on(this, 'popstate', fn);
		return this;
	};
	document.$show = window.$show = $.fn.$show = function(fn) {
		$on(this, 'show', fn);
		return this;
	};
	document.$storage = window.$storage = $.fn.$storage = function(fn) {
		$on(this, 'storage', fn);
		return this;
	};
	document.$redo = window.$redo = $.fn.$redo = function(fn) {
		$on(this, 'redo', fn);
		return this;
	};
	document.$undo = window.$undo = $.fn.$undo = function(fn) {
		$on(this, 'undo', fn);
		return this;
	};
	document.$toggle = window.$toggle = $.fn.$toggle = function(fn) {
		$on(this, 'toggle', fn);
		return this;
	};
	document.$animationstart = window.$animationstart = $.fn.$animationstart = function(fn) {
		$on(this, 'animationstart', fn);
		return this;
	};
	document.$animationiteration = window.$animationiteration = $.fn.$animationiteration = function(fn) {
		$on(this, 'animationiteration', fn);
		return this;
	};
	document.$animationend = window.$animationend = $.fn.$animationend = function(fn) {
		$on(this, 'animationend', fn);
		return this;
	};
	document.$transitionend = window.$transitionend = $.fn.$transitionend = function(fn) {
		$on(this, 'transitionend', fn);
		return this;
	};
	document.$width = function() {
		return $scrollWidth();
	};
	document.$height = function() {
		return $scrollHeight();
	};
	window.$width = function() {
		return $screenWidth();
	};
	window.$height = function() {
		return $screenHeight();
	};
	$.fn.$width = function() {
		if(arguments.length == 0) {
			return this.offsetWidth;
		} else if(arguments.length == 1) {
			this.style.width = arguments[0] + 'px';
			return this;
		}
	};
	$.fn.$height = function() {
		if(arguments.length == 0) {
			return this.offsetHeight;
		} else if(arguments.length == 1) {
			this.style.height = arguments[0] + 'px';
			return this;
		}
	};
	$.fn.trigger = function(type, data) {
		var event = document.createEvent('HTMLEvents');
		event.initEvent(type, true, true);
		event.data = data || {};
		event.eventName = type;
		event.target = this;
		this.dispatchEvent(event);
		return this;
	};
	$.fn.toggle = function() {
		var Arguments = arguments;

		function addToggle(obj) {
			var count = 0;
			$on(obj, 'click', function() {
				Arguments[count++ % Arguments.length].call(obj);
			});
		};
		addToggle(this);
		return this;
	};
	$.fn.hover = function(fn1, fn2) {
		$on(this, 'mouseover', fn1);
		$on(this, 'mouseout', fn2);
		return this;
	};
	$.fn.press = function(fn1, fn2) {
		$on(this, 'mousedown', fn1);
		$on(this, 'mouseup', fn2);
		return this;
	};
	$.fn.follow = function(ev1, fn1, ev2, fn2) {
		var flag = true;
		$on(this, ev1, function() {
			if(flag) {
				fn1.apply(this, arguments);
				if(ev1 && fn1) {
					flag = false;
				}
			}
			if(!flag) {
				$on(this, ev2, fn2);
			}
		});
		return this;
	};
	$.fn.watch = function(fn) {
		if(isChrome || isFF || isOpera || isSafari || isEdge) {
			$on(this, 'input', fn);
			return this;
		} else if(isIE) {
			$on(this, 'propertychange', fn);
			return this;
		}
	};
	$.fn.unwatch = function(fn) {
		if(isChrome || isFF || isOpera || isSafari || isEdge) {
			$off(this, 'input', fn);
			return this;
		} else if(isIE) {
			$off(this, 'propertychange', fn);
			return this;
		}
	};
	$.fn.clean = function() {
		var str = this.value,
			flag = true;
		this.onfocus = function() {
			if(flag) {
				this.value = null;
			}
		}
		this.onblur = function() {
			if(!this.value) {
				this.value = str;
				flag = true;
			} else {
				flag = false;
			}
		}
		return this;
	};
	$.fn.css = function() {
		var option;
		if(arguments.length > 0) {
			option = arguments[0];
			if(2 === arguments.length) {
				option = {}, option[arguments[0]] = arguments[1];
			}
			if('object' === typeof option) {
				for(var key in option) {
					if(option.hasOwnProperty(key)) {
						this.style[key] = option[key];
					}
				}
			} else if('string' === typeof option) {
				return document.defaultView.getComputedStyle(this, null).getPropertyValue(option);
			}
		}
		return this;
	};
	$.fn.attr = function() {
		var option;
		if(arguments.length > 0) {
			option = arguments[0];
			if(2 === arguments.length) {
				this.setAttribute(option, arguments[1]);
			}
			if('object' === typeof option) {
				for(var key in option) {
					if(option.hasOwnProperty(key)) {
						this[key] = option[key];
					}
				}
			} else if('string' === typeof option) {
				return this.getAttribute(option);
			}
		}
		return this;
	};
	$.fn.offset = function() {
		return this.getBoundingClientRect();
	};
	$.fn.position = function() {
		return {
			left: this.offsetLeft,
			top: this.offsetTop
		};
	};
	$.fn.create = function() {
		if(arguments.length == 0) {
			return this.appendChild(document.createElement(String(this.tagName).toLowerCase()));
		} else if(arguments.length == 1) {
			return this.appendChild(document.createElement(arguments[0]));
		}
	};
	$.fn.val = function() {
		if(arguments.length == 0) {
			return this.value;
		} else if(arguments.length == 1) {
			this.value = arguments[0];
			return this;
		}
	};
	$.fn.html = function() {
		if(arguments.length == 0) {
			return this.innerHTML;
		} else if(arguments.length == 1) {
			this.innerHTML = arguments[0];
			return this;
		}
	};
	$.fn.text = function() {
		if(arguments.length == 0) {
			return this.textContent;
		} else if(arguments.length == 1) {
			this.textContent = arguments[0];
			return this;
		}
	};
	$.fn.append = function() {
		this.innerHTML += arguments[0];
		return this;
	};
	$.fn.prepend = function() {
		this.innerHTML = arguments[0] + this.innerHTML;
		return this;
	};
	$.fn.after = function() {
		this.outerHTML += arguments[0];
		return this;
	};
	$.fn.before = function() {
		this.outerHTML = arguments[0] + this.outerHTML;
		return this;
	};
	$.fn.empty = function() {
		this.innerHTML = " ";
		return this;
	};
	$.fn.replaceWith = function() {
		this.outerHTML = arguments[0];
		return this;
	};
	$.fn.insertFront = function() {
		if(this.parentNode) {
			this.parentNode.insertBefore(arguments[0], this);
		}
	}
	$.fn.insertBack = function() {
		if(this.parentNode) {
			this.parentNode.insertBefore(arguments[0], nextnode(this));
		}
	};
	$.fn.remove = function() {
		return this.parentNode.removeChild(this);
	};
	$.fn.clear = function() {
		return this.outerHTML = "";
	};
	$.fn.show = function() {
		this.style.display = 'block';
		return this;
	};
	$.fn.hide = function() {
		this.style.display = 'none';
		return this;
	};
	$.fn.float = function() {
		if(arguments.length == 1) {
			this.style.float = arguments[0];
		} else if(arguments.length == 0) {
			this.style.float = 'left';
		}
		return this;
	};
	$.fn.sink = function() {
		this.style.float = 'none';
		return this;
	};
	$.fn.display = function() {
		if(arguments.length == 1) {
			this.style.display = arguments[0];
		} else if(arguments.length == 0) {
			this.style.display = 'block';
		}
		return this;
	};
	$.fn.opacity = function() {
		if(arguments.length == 0) {
			this.style.transition = 'opacity 1s';
			this.style.opacity = 0.5;
			return this;
		} else if(arguments.length == 1) {
			this.style.transition = 'opacity 1s';
			this.style.opacity = arguments[0];
			return this;
		}
	};
	$.fn.colour = function() {
		this.style.transition = 'background-color 0.5s';
		this.style.backgroundColor = arguments[0];
		return this;
	};
	$.fn.defaultCSS = function() {
		this.removeAttribute('style');
		return this;
	};
	$.fn.hasClass = function(cName) {
		return !!this.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
	};
	$.fn.addClass = function(cName) {
		if(!this.hasClass(cName)) {
			this.className += " " + cName;
		}
		return this;
	};
	$.fn.removeClass = function(cName) {
		if(this.hasClass(cName)) {
			this.className = this.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
		}
		return this;
	};
	$.fn.toggleClass = function(cName) {
		var arr = cName.split(' ');
		for(var i = 0; i < arr.length; i++) {
			var reg = new RegExp('\\b' + arr[i] + '\\b');
			if(reg.test(this.className)) {
				var className = this.className.split(' ');
				for(var j = 0; j < className.length; j++) {
					if(reg.test(className[j])) {
						className.splice(j, 1);
					}
				}
				this.className = className.join(' ');
			} else {
				this.className ? this.className += ' ' + arr[i] : this.className += arr[i];
			}
		}
		return this;
	};
	$.fn.index = function() {
		return Array.prototype.slice.call(this.parentNode.children).indexOf(this);
	};
	$.fn.contains = function() {
		return this.compareDocumentPosition(arguments[0]) - 19 > 0;
	};
	$.fn.siblings = function() {
		var nodes = [],
			previ = prenode(this);
		while(previ) {
			if(previ.nodeType === 1) {
				nodes.push(previ);
			}
			previ = prenode(previ);
		}
		nodes.reverse();
		var nexts = nextnode(this);
		while(nexts) {
			if(nexts.nodeType === 1) {
				nodes.push(nexts);
			}
			nexts = nextnode(nexts);
		}
		return nodes;
	};
	$.fn.child = function() {
		var objChild = [],
			objs = this.getElementsByTagName('*');
		for(var i = 0, j = objs.length; i < j; ++i) {
			if(objs[i].nodeType != 1) {
				alert(objs[i].nodeType);
				continue;
			}
			var temp = objs[i].parentNode;
			if(temp.nodeType == 1) {
				if(temp == this) {
					objChild[objChild.length] = objs[i];
				}
			} else if(temp.parentNode == this) {
				objChild[objChild.length] = objs[i];
			}
		}
		return objChild;
	};
	$.fn.clone = function() {
		if(arguments.length == 0) {
			return this.cloneNode(true);
		} else if(arguments.length == 1) {
			return this.cloneNode(arguments[0]);
		}
	};
	$.fn.parent = function() {
		if(this.parentNode) {
			return this.parentNode;
		} else {
			return this;
		}
	};
	$.fn.prev = function() {
		if(!prenode(this)) {
			return this;
		} else {
			return prenode(this);
		}
	};
	$.fn.next = function() {
		if(!nextnode(this)) {
			return this;
		} else {
			return nextnode(this);
		}
	};
	$.fn.prevAll = function() {
		var nodes = [],
			previ = prenode(this);
		while(previ) {
			if(previ.nodeType === 1) {
				nodes.push(previ);
			}
			previ = prenode(previ);
		}
		nodes.reverse();
		return nodes;
	};
	$.fn.nextAll = function() {
		var nodes = [],
			nexts = nextnode(this);
		while(nexts) {
			if(nexts.nodeType === 1) {
				nodes.push(nexts);
			}
			nexts = nextnode(nexts);
		}
		return nodes;
	};
	$.fn.first = function() {
		if(this.hasChildNodes()) {
			return firstnode(this);
		} else {
			return this;
		}
	};
	$.fn.last = function() {
		if(this.hasChildNodes()) {
			return lastnode(this);
		} else {
			return this;
		}
	};
	$.fn.posterity = function() {
		if(this.hasChildNodes()) {
			return this.getElementsByTagName('*');
		} else {
			return this;
		}
	};
	$.fn.closest = function() {
		var el = this;
		while(el) {
			if(matchesElement(el, arguments[0])) {
				break;
			}
			el = el.parentNode;
		}
		return el;
	};
	$.fn.lock = function() {
		this.css('pointer-events', 'none');
		return this;
	};
	$.fn.unlock = function() {
		this.css('pointer-events', 'auto');
		return this;
	};
	$.fn.slideDown = function() {
		var flag = true;
		if(flag) {
			flag = false;
			slideNode(this);
			setZenColor(this);
			var sNode = this.parentNode.getElementsByTagName('zen'),
				arr = [],
				timer = null;
			for(var i = 0, len = sNode.length; i < len; i++) {
				if(sNode[i] === nextnode(this)) {
					arr.push(sNode[i]);
				}
			}
			clearTimeout(timer);
			if(arguments.length > 0) {
				arr[0].style.transition = 'height ' + arguments[0] + 's';
				timer = setTimeout(function() {
					this.style.visibility = 'hidden';
					arr[0].style.visibility = 'hidden';
					flag = true;
				}.bind(this), arguments[0] * 1000);
			} else {
				arr[0].style.transition = 'height 2s';
				timer = setTimeout(function() {
					this.style.visibility = 'hidden';
					arr[0].style.visibility = 'hidden';
					flag = true;
				}.bind(this), 2000);
			}
			arr[0].style.height = this.offsetHeight + 'px';
		}
		return this;
	};
	$.fn.slideUp = function() {
		var flag = true;
		if(flag) {
			flag = false;
			var timer = null,
				sNode = this.parentNode.getElementsByTagName('zen'),
				arr = [];
			setZenColor(this);
			clearTimeout(timer);
			for(var i = 0, len = sNode.length; i < len; i++) {
				if(sNode[i] === nextnode(this)) {
					arr.push(sNode[i]);
				}
			}
			this.style.visibility = 'visible';
			arr[0].style.visibility = 'visible';
			if(isFF) {
				arr[0].style.left = this.getBoundingClientRect().left + document.documentElement.scrollLeft + 'px';
				arr[0].style.top = this.getBoundingClientRect().top + document.documentElement.scrollTop + 'px';
			} else {
				arr[0].style.left = this.getBoundingClientRect().left + document.body.scrollLeft + 'px';
				arr[0].style.top = this.getBoundingClientRect().top + document.body.scrollTop + 'px';
			}
			if(arguments.length > 0) {
				arr[0].style.transition = 'height ' + arguments[0] + 's';
				timer = setTimeout(function() {
					arr[0].parentNode.removeChild(arr[0]);
					flag = true;
				}.bind(this), arguments[0] * 1000);
			} else {
				arr[0].style.transition = 'height 2s';
				timer = setTimeout(function() {
					arr[0].parentNode.removeChild(arr[0]);
					flag = true;
				}.bind(this), 2000);
			}
			arr[0].style.height = 0;
		}
		return this;
	};
	$.fn.animate = function(json, interval, sp, fn) {
		animate(this, json, interval, sp, fn);

		function animate(obj, json, interval, sp, fn) {
			clearInterval(obj.timer);

			function getStyle(obj, arr) {
				if(obj.currentStyle) {
					return obj.currentStyle[arr];
				} else {
					return document.defaultView.getComputedStyle(obj, null)[arr];
				}
			}
			if(interval === "linear") {
				interval = 15;
			} else if(interval === "swing") {
				interval = 25;
			}
			obj.timer = setInterval(function() {
				var flag = true;
				for(var arr in json) {
					var icur = 0;
					if(arr == "opacity") {
						icur = Math.round(parseFloat(getStyle(obj, arr)) * 100);
					} else {
						icur = parseInt(getStyle(obj, arr));
					}
					if(sp === "fast") {
						sp = 0.07;
					} else if(sp === "normal") {
						sp = 0.04;
					} else if(sp === "slow") {
						sp = 0.01;
					}
					var speed = (json[arr] - icur) * sp;
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					if(icur != json[arr]) {
						flag = false;
					}
					if(arr == "opacity") {
						obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
						obj.style.opacity = (icur + speed) / 100;
					} else {
						obj.style[arr] = icur + speed + "px";
					}
				}
				if(flag) {
					clearInterval(obj.timer);
					if(fn && typeof fn === 'function') {
						fn.apply(obj, arguments);
					}
				}
			}, interval);
		}
		return this;
	};
	$.fn.drag = function() {
		drag(this);

		function drag(elem) {
			elem.onmousedown = function(ev) {
				var ev = ev || event;
				var disX = ev.clientX - this.offsetLeft,
					disY = ev.clientY - this.offsetTop;
				elem.style.position = 'absolute';
				elem.style.cursor = 'pointer';
				document.onmousemove = function(ev) {
					var ev = ev || event;
					elem.style.left = ev.clientX - disX + 'px';
					elem.style.top = ev.clientY - disY + 'px';
				};
				document.onmouseup = function() {
					document.onmousemove = null;
					document.onmouseup = null;
				};
			};
		}
		return this;
	};
	$.fn.fadeOut = function(speed) {
		fadeOut(this, speed);

		function fadeOut(elem, speed) {
			elem.style.display = "block";
			var tempOpacity = 1;
			(function() {
				setOpacity(elem, tempOpacity);
				tempOpacity -= 0.05;
				if(tempOpacity > 0) {
					setTimeout(arguments.callee, speed);
				} else {
					elem.style.display = "none";
				}
			})();
		}
		return this;
	};
	$.fn.fadeIn = function(speed) {
		fadeIn(this, speed);

		function fadeIn(elem, speed) {
			elem.style.display = "block";
			setOpacity(elem, 0);
			var tempOpacity = 0;
			(function() {
				setOpacity(elem, tempOpacity);
				tempOpacity += 0.05;
				if(tempOpacity <= 1) {
					setTimeout(arguments.callee, speed);
				}
			})();
		}
		return this;
	};
	$.fn.fadeTo = function(speed, opacity) {
		fadeTo(this, speed, opacity);

		function fadeTo(elem, speed, opacity) {
			var tempOpacity = 0;
			elem.style.display = "block";
			(function() {
				setOpacity(elem, tempOpacity);
				tempOpacity += 0.05;
				if(tempOpacity <= opacity) {
					setTimeout(arguments.callee, speed);
				}
			})();
		}
		return this;
	};
	$.dt.format = function(formatStr) {
		var str = formatStr,
			Week = ['日', '一', '二', '三', '四', '五', '六'];
		str = str.replace(/yyyy|YYYY/, this.getFullYear());
		str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
		str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
		str = str.replace(/M/g, (this.getMonth() + 1));
		str = str.replace(/w|W/g, Week[this.getDay()]);
		str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
		str = str.replace(/d|D/g, this.getDate());
		str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
		str = str.replace(/h|H/g, this.getHours());
		str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
		str = str.replace(/m/g, this.getMinutes());
		str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
		str = str.replace(/s|S/g, this.getSeconds());
		return str;
	};
	$.dt.addDate = function(type, num) {
		var type = type.toLowerCase();
		switch(type) {
			case 's':
				return new Date.parse(Date.parse(this) + (1000 * num));
			case 'i':
				return new Date.parse(Date.parse(this) + (60000 * num));
			case 'h':
				return new Date(Date.parse(this) + (3600000 * num));
			case 'd':
				return new Date(Date.parse(this) + (86400000 * num));
			case 'w':
				return new Date(Date.parse(this) + ((86400000 * 7) * num));
			case 'm':
				return new Date(this.getFullYear(), (this.getMonth()) + num, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
			case 'q':
				return new Date(this.getFullYear(), (this.getMonth()) + num * 3, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
			case 'y':
				return new Date((this.getFullYear() + num), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
		}
	};
	$.dt.dateDiff = function(type, date) {
		if(typeof date == 'string') date = date.toDate();
		switch(type) {
			case 's':
				return parseInt((date - this) / 1000);
			case 'i':
				return parseInt((date - this) / 60000);
			case 'h':
				return parseInt((date - this) / 3600000);
			case 'd':
				return parseInt((date - this) / 86400000);
			case 'w':
				return parseInt((date - this) / (86400000 * 7));
			case 'm':
				return(date.getMonth() + 1) + ((date.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
			case 'y':
				return date.getFullYear() - this.getFullYear();
		}
	};
	$.st.leftTrim = function() {
		return this.replace(/(^[\\s]*)/g, "");
	};
	$.st.rightTrim = function() {
		return this.replace(/([\\s]*$)/g, "");
	};
	$.st.trimAll = function() {
		return this.replace(/\s/g, "");
	};
	$.st.replaceAll = function(s1, s2) {
		return this.replace(new RegExp(s1, "gm"), s2);
	};
	$.st.firstUpperCase = function() {
		return this.toLowerCase().replace(/\b[a-z]/g, function(s) {
			return s.toUpperCase();
		});
	};
	$.st.startWith = function(s) {
		if(s == null || s == "" || this.length == 0 || s.length > this.length)
			return false;
		if(this.substr(0, s.length) == s)
			return true;
		else
			return false;
		return true;
	};
	$.st.endWith = function(s) {
		if(s == null || s == "" || this.length == 0 || s.length > this.length)
			return false;
		if(this.substring(this.length - s.length) == s)
			return true;
		else
			return false;
		return true;
	};
	$.st.append = function(aStr) {
		return this.concat(aStr);
	};
	$.st.prepend = function(aStr) {
		return aStr + this;
	};
	$.st.appendTo = function(obj) {
		return obj.innerHTML += this;
	};
	$.st.prependTo = function(obj) {
		return obj.innerHTML = this + obj.innerHTML;
	};
	$.st.insert = function(ofset, aStr) {
		if(ofset < 0 || ofset >= this.length - 1) {
			return this.append(aStr);
		}
		return this.substring(0, ofset + 1) + aStr + this.substring(ofset + 1);
	};
	$.st.insertStrPerIndex = function(index, str) {
		if(this.length > index && index > 0) {
			var arr = new Array(),
				num = parseInt(this.length / index);
			console.log(num);
			for(var i = 0; i <= num; i++) {
				var firstval = i * index;
				if(firstval < this.length) {
					arr.push(this.substr(firstval, index));
				}
			}
			return arr.join(str);
		} else {
			return this.toString();
		}
	};
	$.st.left = function(n) {
		return this.slice(0, n - this.slice(0, n).replace(/[\x00-\xff]/g, "").length);
	};
	$.st.right = function(n) {
		return this.slice(this.slice(-n).replace(/[\x00-\xff]/g, "").length - n);
	};
	$.st.setCharAt = function(sIndex, aStr) {
		if(sIndex < 0 || sIndex > this.length - 1) {
			return this.valueOf();
		}
		return this.substring(0, sIndex) + aStr + this.substring(sIndex + 1);
	};
	$.st.deleteCharAt = function(sIndex) {
		if(sIndex < 0 || sIndex >= this.length) {
			return this.valueOf();
		} else if(sIndex == 0) {
			return this.substring(1, this.length);
		} else if(sIndex == this.length - 1) {
			return this.substring(0, this.length - 1);
		} else {
			return this.substring(0, sIndex) + this.substring(sIndex + 1);
		}
	};
	$.st.deleteString = function(sIndex, eIndex) {
		if(sIndex == eIndex) {
			return this.deleteCharAt(sIndex);
		} else {
			if(sIndex > eIndex) {
				var tIndex = eIndex;
				eIndex = sIndex;
				sIndex = tIndex;
			}
			if(sIndex < 0) sIndex = 0;
			if(eIndex > this.length - 1) eIndex = this.length - 1;
			return this.substring(0, sIndex + 1) + this.substring(eIndex, this.length);
		}
	};
	$.st.cutString = function(cutLength) {
		if(!cutLength) {
			cutLength = this.countLength();
		}
		var strLength = 0,
			cutStr = "";
		if(cutLength > this.countLength()) {
			cutStr = this;
		} else {
			for(var i = 0; i < this.length; i++) {
				if(this.charAt(i) > '~') {
					strLength += 2;
				} else {
					strLength += 1;
				}
				if(strLength >= cutLength) {
					cutStr = this.substring(0, i + 1);
					break;
				}
			}
		}
		return cutStr;
	};
	$.st.countLength = function() {
		var len = 0;
		for(var i = 0; i < this.length; i++) {
			if(this.charCodeAt(i) > 255)
				len += 2;
			else
				len++;
		}
		return len;
	};
	$.st.total = function(re) {
		re = eval("/" + re + "/ig");
		return this.match(re).length;
	};
	$.st.reverse = function() {
		return this.split('').reverse().join('');
	};
	$.st.regular = function(reg) {
		var result = true;
		if(this.length > 0) {
			if(!reg.test(this)) {
				result = false;
			}
		}
		return result;
	};
	$.st.isNull = function() {
		return this.trim().length == 0 ? true : false;
	};
	$.st.isNumber = function() {
		for(var i = 0; i < this.length; i++) {
			if(this.charAt(i) < '0' || this.charAt(i) > '9') {
				return false;
			}
		}
		return true;
	};
	$.st.isVersion = function() {
		var reg = /^([a-zA-Z_])([a-zA-Z0-9_.])*$/;
		return this.regular(reg);
	};
	$.st.isString = function() {
		var reg = /^[^']*$/;
		return this.regular(reg);
	};
	$.st.isLetter = function() {
		var reg = /^[a-zA-Z]+$/;
		return this.regular(reg);
	};
	$.st.equals = function(aStr) {
		if(this.length != aStr.length) {
			return false;
		} else {
			for(var i = 0; i < this.length; i++) {
				if(this.charAt(i) != aStr.charAt(i)) {
					return false;
				}
			}
			return true;
		}
	};
	$.st.equalsIgnoreCase = function(aStr) {
		if(this.length != aStr.length) {
			return false;
		} else {
			var tmp1 = this.toLowerCase(),
				tmp2 = aStr.toLowerCase();
			return tmp1.equals(tmp2);
		}
	};
	$.st.camelize = function() {
		var re = /-(\w)/g;
		return this.replace(re, function() {
			var args = arguments;
			return args[1].toUpperCase();
		});
	};
	$.st.uncamelize = function() {
		var re = /([a-z])([A-Z])/g;
		return this.replace(re, function() {
			var args = arguments;
			return args[1] + "-" + args[2].toLowerCase();
		});
	};
	$.st.toArray = function() {
		var arr = [];
		for(x = 0; x < this.length; x++) {
			arr[x] = this.charAt(x);
		}
		return arr;
	};
	$.st.toDate = function() {
		var converted = Date.parse(this),
			myDate = new Date(converted);
		if(isNaN(myDate)) {
			var arys = this.split('-');
			myDate = new Date(arys[0], --arys[1], arys[2]);
		}
		return myDate;
	};
	$.st.htmlEncode = function() {
		return this.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>');
	};
	$.st.htmlDecode = function() {
		return this.replace(/&/g, '&').replace(/"/g, '\"').replace(/</g, '<').replace(/>/g, '>');
	};
	$.st.getQuery = function(name) {
		var reg = new RegExp('(^|&)' + name + ' = ([^&] * )(&|$)'),
			r = this.substr(this.indexOf('/?') + 1).match(reg);
		return r[2] ? unescape(r[2]) : null;
	};
	$.st.pad = function(input, length, type) {
		if(!input) return this;
		if(!length || length < 1) var length = 1;
		var input = Array(length + 1).join(input),
			value,
			type = type ? type.toUpperCase() : '';
		switch(type) {
			case 'LEFT':
				return input + this;
			case 'BOTH':
				return input + this + input;
			default:
				return this + input;
		}
	};
	$.ar.insert = function(index, item) {
		this.splice(index, 0, item);
		return this;
	};　
	$.ar.pushAll = function() {
		var currentLength = this.length;
		for(var i = 0; i < arguments.length; i++) {
			this[currentLength + i] = arguments[i];
		}
		return this;
	};
	$.ar.unique = function() {
		this.sort();
		var re = [this[0]];
		for(var i = 1; i < this.length; i++) {
			if(this[i] !== re[re.length - 1]) {
				re.push(this[i]);
			}
		}
		return re;
	};
	$.ar.indexOf = function(val) {
		for(var i = 0; i < this.length; i++) {
			if(this[i] == val) return i;
		}
		return -1;
	};
	$.ar.getMax = function() {
		return this.sortNum(1)[0];
	};
	$.ar.getMin = function() {
		return this.sortNum(0)[0];
	};
	$.ar.contains = function(obj) {
		var i = this.length;
		while(i--) {
			if(this[i] === obj) {
				return true;
			}
		}
		return false;
	};
	$.ar.total = function(o) {
		var t = 0;
		for(var i = 0; i < this.length; i++) {
			if(this[i] == o) {
				t++;
			}
		}
		return t;
	};
	$.ar.toString = function() {
		return this.join(arguments[0] || "");
	};
	$.ar.sortNum = function(i) {
		if(!i) {
			i = 0;
		};
		if(i == 1) {
			return this.sort(function(a, b) {
				return b - a;
			});
		};
		return this.sort(function(a, b) {
			return a - b;
		});
	};
	$.ar.random = function() {
		var tempArr = [],
			me = this,
			t;
		while(me.length > 0) {
			t = Math.floor(Math.random() * me.length);
			tempArr[tempArr.length] = me[t];
			me = me.removeAt(t);
		}
		return tempArr;
	};
	$.ar.orderRandom = function() {
		return this.sort(function() {
			return Math.random() > 0.5 ? "-1" : "1";
		});
	};
	$.ar.clear = function() {
		this.splice(0, this.length);
		return this;
	};
	$.ar.remove = function(val) {
		var index = this.indexOf(val);
		while(index > -1) {
			this.splice(index, 1);
			index = this.indexOf(val);
		}
		return this;
	};
	$.ar.removeAt = function(index) {
		if(index < 0) {
			return this;
		}
		return this.slice(0, index).concat(this.slice(index + 1, this.length));
	};
	$.ar.union = function(a) {
		return this.concat(a).unique();
	};
	$.ar.minus = function(a) {
		var result = [],
			clone = this;
		for(var i = 0; i < clone.length; i++) {
			var flag = true;
			for(var j = 0; j < a.length; j++) {
				if(clone[i] == a[j])
					flag = false;
			}
			if(flag)
				result.push(clone[i]);
		}
		return result.unique();
	};
	$.ar.intersect = function(b) {
		var result = [],
			a = this;
		for(var i = 0; i < b.length; i++) {
			var temp = b[i];
			for(var j = 0; j < a.length; j++) {
				if(temp === a[j]) {
					result.push(temp);
					break;
				}
			}
		}
		return result.unique();
	};
	$.fx.construct = function(aArgs) {
		var oNew = Object.create(this.prototype);
		this.apply(oNew, aArgs);
		return oNew;
	};

	function setScript() {
		var Script = document.getElementsByTagName('script'),
			Head = document.getElementsByTagName('head')[0],
			Style = document.getElementsByTagName('style'),
			Title = document.getElementsByTagName('title')[0],
			Meta = document.getElementsByTagName('meta'),
			Meta1 = document.createElement('meta'),
			Meta2 = document.createElement('meta');
		for(var i = 0, len = Script.length; i < len; i++) {
			if(Script[i].hasAttribute('src') === true && String(Script[i].src).indexOf('Zendollarjs') != -1) {
				Script[i].setAttribute('async', 'async');
			}
		}
		Meta1.setAttribute("http.equiv", "x-ua-compatible");
		Meta1.content = "ie=edge";
		Meta2.name = "viewport";
		Meta2.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
		if(Meta.length == 1) {
			Head.insertBefore(Meta1, Title);
			Head.insertBefore(Meta2, Title);
		}
		if(Style.length === 0) {
			var aStyle = document.createElement('style');
			Head.appendChild(aStyle);
		}
	};

	function include(path) {
		var a = document.createElement("script");
		a.type = "text/javascript";
		a.src = path;
		var Script = document.getElementsByTagName("script");
		for(var i = 0, len = Script.length; i < len; i++) {
			if(Script[i].hasAttribute('src') === false) {
				document.body.insertBefore(a, Script[i]);
				a.setAttribute('async', 'async');
			} else {
				document.body.appendChild(a);
				a.setAttribute('async', 'async');
			}
		}
	};

	function addLink(path) {
		var h = document.getElementsByTagName('head')[0],
			l = document.getElementsByTagName('link'),
			r = document.createElement('link'),
			s = document.getElementsByTagName('style')[0];
		r.href = path;
		r.rel = "stylesheet";
		if(l.length > 0) {
			h.insertBefore(r, l[0]);
		} else {
			h.insertBefore(r, s);
		}
	};

	function getFuncName(fn) {
		if(!fn) return null;
		var reg = /\bfunction\s+([^(]+)/;
		var result = fn.toString().match(reg);
		return result ? result[1] : null;
	};

	function matchesElement(element, selector) {
		if(element.matches) {
			return element.matches(selector);
		} else if(element.matchesSelector) {
			return element.matchesSelector(selector);
		} else if(element.webkitMatchesSelector) {
			return element.webkitMatchesSelector(selector);
		} else if(element.msMatchesSelector) {
			return element.msMatchesSelector(selector);
		} else if(element.mozMatchesSelector) {
			return element.mozMatchesSelector(selector);
		} else if(element.oMatchesSelector) {
			return element.oMatchesSelector(selector);
		}
	};

	function getScrollTop() {　　
		var scrollTop = 0,
			bodyScrollTop = 0,
			documentScrollTop = 0;　　
		if(document.body) {　　　　
			bodyScrollTop = document.body.scrollTop;　　
		}　　
		if(document.documentElement) {　　　　
			documentScrollTop = document.documentElement.scrollTop;　　
		}　　
		scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
		return scrollTop;
	};

	function getScrollHeight() {　　
		var scrollHeight = 0,
			bodyScrollHeight = 0,
			documentScrollHeight = 0;　　
		if(document.body) {　　　　
			bodyScrollHeight = document.body.scrollHeight;　　
		}　　
		if(document.documentElement) {　　　　
			documentScrollHeight = document.documentElement.scrollHeight;　　
		}　　
		scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
		return scrollHeight;
	};

	function getWindowHeight() {　　
		var windowHeight = 0;　　
		if(document.compatMode == "CSS1Compat") {　　　　
			windowHeight = document.documentElement.clientHeight;　　
		} else {　　　　
			windowHeight = document.body.clientHeight;　　
		}　　
		return windowHeight;
	};

	function dataBinder(object_id) {
		var pubSub = {
				callbacks: {},
				on: function(msg, callback) {
					this.callbacks[msg] = this.callbacks[msg] || [];
					this.callbacks[msg].push(callback);
				},
				publish: function(msg) {
					this.callbacks[msg] = this.callbacks[msg] || [];
					for(var i = 0, len = this.callbacks[msg].length; i < len; i++) {
						this.callbacks[msg][i].apply(this, arguments);
					}
				}
			},
			data_attr = "data-bind-" + object_id,
			message = object_id + ":input",
			timeIn;
		changeHandler = function(evt) {
			var target = evt.target || evt.srcElement,
				prop_name = target.getAttribute(data_attr);
			if(prop_name && prop_name !== "") {
				clearTimeout(timeIn);
				timeIn = setTimeout(function() {
					pubSub.publish(message, prop_name, target.value);
				}, 50);
			}
		};
		if(document.addEventListener) {
			document.addEventListener("input", changeHandler, false);
		} else {
			document.attachEvent("oninput", changeHandler);
		}
		pubSub.on(message, function(evt, prop_name, new_val) {
			var elements = document.querySelectorAll("[" + data_attr + "=" + prop_name + "]"),
				tag_name;
			for(var i = 0, len = elements.length; i < len; i++) {
				tag_name = elements[i].tagName.toLowerCase();
				if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
					elements[i].value = new_val;
				} else {
					elements[i].innerHTML = new_val;
				}
			}
		});
		return pubSub;
	};

	function createxmlHttpRequest() {
		if(window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} else if(window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
	};

	function convertData(data) {
		if(typeof data === 'object') {
			var convertResult = "";
			for(var c in data) {
				convertResult += c + "=" + data[c] + "&";
			}
			convertResult = convertResult.substring(0, convertResult.length - 1)
			return convertResult;
		} else {
			return data;
		}
	};

	function removeWhiteNode(node) {
		for(var i = 0; i < node.childNodes.length; i++) {
			if(node.childNodes[i].nodeType === 3 && /^\s+$/.test(node.childNodes[i].nodeValue)) {
				node.childNodes[i].parentNode.removeChild(node.childNodes[i]);
			}
		}
		return node;
	};

	function hexToRgb(hex) {
		var color = [],
			rgb = [];
		hex = hex.replace(/#/, "");
		if(hex.length == 3) {
			var tmp = [];
			for(var i = 0; i < 3; i++) {
				tmp.push(hex.charAt(i) + hex.charAt(i));
			}
			hex = tmp.join("");
		}
		for(var i = 0; i < 3; i++) {
			color[i] = "0x" + hex.substr(i + 2, 2);
			rgb.push(parseInt(Number(color[i])));
		}
		return "rgb(" + rgb.join(", ") + ")";
	};

	function colorToRgb(str) {
		if(str && typeof str === 'string') {
			if(str == "lightpink") {
				return str = "rgb(255, 182, 193)";
			} else if(str == "pink") {
				return str = "rgb(255, 192, 203)";
			} else if(str == "crimson") {
				return str = "rgb(220, 20, 60)";
			} else if(str == "lavenderblush") {
				return str = "rgb(255, 240, 245)";
			} else if(str == "palevioletred") {
				return str = "rgb(219, 112, 147)";
			} else if(str == "hotpink") {
				return str = "rgb(255, 105, 180)";
			} else if(str == "deeppink") {
				return str = "rgb(255, 20, 147)";
			} else if(str == "mediumvioletred") {
				return str = "rgb(199, 21, 133)";
			} else if(str == "orchid") {
				return str = "rgb(218, 112, 214)";
			} else if(str == "thistle") {
				return str = "rgb(216, 191, 216)";
			} else if(str == "plum") {
				return str = "rgb(221, 160, 221)";
			} else if(str == "violet") {
				return str = "rgb(238, 130, 238)";
			} else if(str == "magenta") {
				return str = "rgb(255, 0, 255)";
			} else if(str == "fuchsia") {
				return str = "rgb(255, 0, 255)";
			} else if(str == "darkmagenta") {
				return str = "rgb(139, 0, 139)";
			} else if(str == "purple") {
				return str = "rgb(128, 0, 128)";
			} else if(str == "mediumorchid") {
				return str = "rgb(186, 85, 211)";
			} else if(str == "darkvoilet") {
				return str = "rgb(148, 0, 211)";
			} else if(str == "darkorchid") {
				return str = "rgb(153, 50, 204)";
			} else if(str == "indigo") {
				return str = "rgb(75, 0, 130)";
			} else if(str == "blueviolet") {
				return str = "rgb(138, 43, 226)";
			} else if(str == "mediumpurple") {
				return str = "rgb(147, 112, 219)";
			} else if(str == "mediumslateblue") {
				return str = "rgb(123, 104, 238)";
			} else if(str == "slateblue") {
				return str = "rgb(106, 90, 205)";
			} else if(str == "darkslateblue") {
				return str = "rgb(72, 61, 139)";
			} else if(str == "lavender") {
				return str = "rgb(230, 230, 250)";
			} else if(str == "ghostwhite") {
				return str = "rgb(248, 248, 255)";
			} else if(str == "blue") {
				return str = "rgb(0, 0, 255)";
			} else if(str == "mediumblue") {
				return str = "rgb(0, 0, 205)";
			} else if(str == "midnightblue") {
				return str = "rgb(25, 25, 112)";
			} else if(str == "darkblue") {
				return str = "rgb(0, 0, 139)";
			} else if(str == "navy") {
				return str = "rgb(0, 0, 128)";
			} else if(str == "royalblue") {
				return str = "rgb(65, 105, 225)";
			} else if(str == "cornflowerblue") {
				return str = "rgb(100, 149, 237)";
			} else if(str == "lightsteelblue") {
				return str = "rgb(176, 196, 222)";
			} else if(str == "lightslategray" || str == "lightslategrey") {
				return str = "rgb(119, 136, 153)";
			} else if(str == "slategray" || str == "slategrey") {
				return str = "rgb(112, 128, 144)";
			} else if(str == "doderblue") {
				return str = "rgb(30, 144, 255)";
			} else if(str == "aliceblue") {
				return str = "rgb(240, 248, 255)";
			} else if(str == "steelblue") {
				return str = "rgb(70, 130, 180)";
			} else if(str == "lightskyblue") {
				return str = "rgb(135, 206, 250)";
			} else if(str == "skyblue") {
				return str = "rgb(135, 206, 235)";
			} else if(str == "deepskyblue") {
				return str = "rgb(0, 191, 255)";
			} else if(str == "lightblue") {
				return str = "rgb(173, 216, 230)";
			} else if(str == "powderblue") {
				return str = "rgb(176, 224, 230)";
			} else if(str == "cadetblue") {
				return str = "rgb(95, 158, 160)";
			} else if(str == "azure") {
				return str = "rgb(240, 255, 255)";
			} else if(str == "lightcyan") {
				return str = "rgb(225, 255, 255)";
			} else if(str == "paleturquoise") {
				return str = "rgb(175, 238, 238)";
			} else if(str == "cyan") {
				return str = "rgb(0, 255, 255)";
			} else if(str == "aqua") {
				return str = "rgb(0, 255, 255)";
			} else if(str == "darkturquoise") {
				return str = "rgb(0, 206, 209)";
			} else if(str == "darkslategray" || str == "darkslategrey") {
				return str = "rgb(47, 79, 79)";
			} else if(str == "darkcyan") {
				return str = "rgb(0, 139, 139)";
			} else if(str == "teal") {
				return str = "rgb(0, 128, 128)";
			} else if(str == "mediumturquoise") {
				return str = "rgb(72, 209, 204)";
			} else if(str == "lightseagreen") {
				return str = "rgb(32, 178, 170)";
			} else if(str == "turquoise") {
				return str = "rgb(64, 224, 208)";
			} else if(str == "auqamarin") {
				return str = "rgb(127, 255, 170)";
			} else if(str == "mediumaquamarine") {
				return str = "rgb(0, 250, 154)";
			} else if(str == "mediumspringgreen") {
				return str = "rgb(245, 255, 250)";
			} else if(str == "mintcream") {
				return str = "rgb(0, 255, 127)";
			} else if(str == "springgreen") {
				return str = "rgb(60, 179, 113)";
			} else if(str == "seagreen") {
				return str = "rgb(46, 139, 87)";
			} else if(str == "honeydew") {
				return str = "rgb(240, 255, 240)";
			} else if(str == "lightgreen") {
				return str = "rgb(144, 238, 144)";
			} else if(str == "palegreen") {
				return str = "rgb(152, 251, 152)";
			} else if(str == "darkseagreen") {
				return str = "rgb(143, 188, 143)";
			} else if(str == "limegreen") {
				return str = "rgb(50, 205, 50)";
			} else if(str == "lime") {
				return str = "rgb(0, 255, 0)";
			} else if(str == "forestgreen") {
				return str = "rgb(34, 139, 34)";
			} else if(str == "green") {
				return str = "rgb(0, 128, 0)";
			} else if(str == "darkgreen") {
				return str = "rgb(0, 100, 0)";
			} else if(str == "chartreuse") {
				return str = "rgb(127, 255, 0)";
			} else if(str == "lawngreen") {
				return str = "rgb(124, 252, 0)";
			} else if(str == "greenyellow") {
				return str = "rgb(173, 255, 47)";
			} else if(str == "olivedrab") {
				return str = "rgb(85, 107, 47)";
			} else if(str == "beige") {
				return str = "rgb(107, 142, 35)";
			} else if(str == "lightgoldenrodyellow") {
				return str = "rgb(250, 250, 210)";
			} else if(str == "ivory") {
				return str = "rgb(255, 255, 240)";
			} else if(str == "lightyellow") {
				return str = "rgb(255, 255, 224)";
			} else if(str == "yellow") {
				return str = "rgb(255, 255, 0)";
			} else if(str == "olive") {
				return str = "rgb(128, 128, 0)";
			} else if(str == "darkkhaki") {
				return str = "rgb(189, 183, 107)";
			} else if(str == "lemonchelse iffon") {
				return str = "rgb(255, 250, 205)";
			} else if(str == "palegodenrod") {
				return str = "rgb(238, 232, 170)";
			} else if(str == "khaki") {
				return str = "rgb(240, 230, 140)";
			} else if(str == "gold") {
				return str = "rgb(255, 215, 0)";
			} else if(str == "cornislk") {
				return str = "rgb(255, 248, 220)";
			} else if(str == "goldenrod") {
				return str = "rgb(218, 165, 32)";
			} else if(str == "floralwhite") {
				return str = "rgb(255, 250, 240)";
			} else if(str == "oldlace") {
				return str = "rgb(253, 245, 230)";
			} else if(str == "wheat") {
				return str = "rgb(245, 222, 179)";
			} else if(str == "moccasin") {
				return str = "rgb(255, 228, 181)";
			} else if(str == "orange") {
				return str = "rgb(255, 165, 0)";
			} else if(str == "papayawhip") {
				return str = "rgb(255, 239, 213)";
			} else if(str == "blanchedalmond") {
				return str = "rgb(255, 235, 205)";
			} else if(str == "navajowhite") {
				return str = "rgb(255, 222, 173)";
			} else if(str == "antiquewhite") {
				return str = "rgb(250, 235, 215)";
			} else if(str == "tan") {
				return str = "rgb(210, 180, 140)";
			} else if(str == "brulywood") {
				return str = "rgb(222, 184, 135)";
			} else if(str == "bisque") {
				return str = "rgb(255, 228, 196)";
			} else if(str == "darkorange") {
				return str = "rgb(255, 140, 0)";
			} else if(str == "linen") {
				return str = "rgb(250, 240, 230)";
			} else if(str == "peru") {
				return str = "rgb(205, 133, 63)";
			} else if(str == "peachpuff") {
				return str = "rgb(255, 218, 185)";
			} else if(str == "sandybrown") {
				return str = "rgb(244, 164, 96)";
			} else if(str == "chocolate") {
				return str = "rgb(210, 105, 30)";
			} else if(str == "saddlebrown") {
				return str = "rgb(139, 69, 19)";
			} else if(str == "seashell") {
				return str = "rgb(255, 245, 238)";
			} else if(str == "sienna") {
				return str = "rgb(160, 82, 45)";
			} else if(str == "lightsalmon") {
				return str = "rgb(255, 160, 122)";
			} else if(str == "coral") {
				return str = "rgb(255, 127, 80)";
			} else if(str == "orangered") {
				return str = "rgb(255, 69, 0)";
			} else if(str == "darksalmon") {
				return str = "rgb(233, 150, 122)";
			} else if(str == "tomato") {
				return str = "rgb(255, 99, 71)";
			} else if(str == "mistyrose") {
				return str = "rgb(255, 228, 225)";
			} else if(str == "salmon") {
				return str = "rgb(250, 128, 114)";
			} else if(str == "snow") {
				return str = "rgb(255, 250, 250)";
			} else if(str == "lightcoral") {
				return str = "rgb(240, 128, 128)";
			} else if(str == "rosybrown") {
				return str = "rgb(188, 143, 143)";
			} else if(str == "indianred") {
				return str = "rgb(205, 92, 92)";
			} else if(str == "red") {
				return str = "rgb(255, 0, 0)";
			} else if(str == "brown") {
				return str = "rgb(165, 42, 42)";
			} else if(str == "firebrick") {
				return str = "rgb(178, 34, 34)";
			} else if(str == "darkred") {
				return str = "rgb(139, 0, 0)";
			} else if(str == "maroon") {
				return str = "rgb(128, 0, 0)";
			} else if(str == "white") {
				return str = "rgb(255, 255, 255)";
			} else if(str == "whitesmoke") {
				return str = "rgb(245, 245, 245)";
			} else if(str == "gainsboro") {
				return str = "rgb(220, 220, 220)";
			} else if(str == "lightgrey" || str == "lightgray") {
				return str = "rgb(211, 211, 211)";
			} else if(str == "silver") {
				return str = "rgb(192, 192, 192)";
			} else if(str == "darkgray" || str == "darkgrey") {
				return str = "rgb(169, 169, 169)";
			} else if(str == "gray" || str == "grey") {
				return str = "rgb(128, 128, 128)";
			} else if(str == "dimgray" || str == "dimgrey") {
				return str = "rgb(105, 105, 105)";
			} else if(str == "black") {
				return str = "rgb(0, 0, 0)";
			}
		};
	};

	function nextnode(obj) {
		if(obj.nextElementSibling) {
			return obj.nextElementSibling;
		} else {
			return obj.nextSibling;
		};
	};

	function prenode(obj) {
		if(obj.previousElementSibling) {
			return obj.previousElementSibling;
		} else {
			return obj.previousSibling;
		};
	};

	function firstnode(obj) {
		if(obj.firstElementChild) {
			return obj.firstElementChild;
		} else {
			return obj.firstChild;
		};
	};

	function lastnode(obj) {
		if(obj.lastElementChild) {
			return obj.lastElementChild;
		} else {
			return obj.lastChild;
		};
	};

	function slideNode(obj) {
		var iframe = document.createElement('zen');
		iframe.style.display = 'inline-block';
		iframe.style.width = obj.offsetWidth + 'px';
		iframe.style.height = 0;
		iframe.style.position = "absolute";
		if(isFF) {
			iframe.style.left = obj.getBoundingClientRect().left + document.documentElement.scrollLeft + 'px';
			iframe.style.top = obj.getBoundingClientRect().top + document.documentElement.scrollTop + 'px';
		} else {
			iframe.style.left = obj.getBoundingClientRect().left + document.body.scrollLeft + 'px';
			iframe.style.top = obj.getBoundingClientRect().top + document.body.scrollTop + 'px';
		}
		iframe.style.margin = 0;
		iframe.style.padding = 0;
		iframe.style.zIndex = 999999;
		if(nextnode(obj)) {
			obj.parentNode.insertBefore(iframe, nextnode(obj));
		} else {
			obj.parentNode.appendChild(iframe);
		}
	};

	function setZenColor(obj) {
		var Zen = document.getElementsByTagName('zen'),
			icolor;
		for(var i = 0, len = Zen.length; i < len; i++) {
			if(Zen[i] === nextnode(obj)) {
				if(obj.parentNode) {
					icolor = document.defaultView.getComputedStyle(obj.parentNode, null).getPropertyValue('background-color');
				} else {
					icolor = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('background-color');
				}
				Zen[i].style.backgroundColor = icolor;
			}
		}
	};

	function setOpacity(elem, opacity) {
		if(elem.style.filter) {
			elem.style.filter = 'alpha(opacity:' + opacity * 100 + ')';
		} else {
			elem.style.opacity = opacity;
		}
	};
	if(!Array.prototype.copyWithin) {
		Array.prototype.copyWithin = function(target, start /*, end*/ ) {
			if(this == null) {
				throw new TypeError('this is null or not defined');
			}
			var O = Object(this);
			var len = O.length >>> 0;
			var relativeTarget = target >> 0;
			var to = relativeTarget < 0 ?
				Math.max(len + relativeTarget, 0) :
				Math.min(relativeTarget, len);
			var relativeStart = start >> 0;
			var from = relativeStart < 0 ?
				Math.max(len + relativeStart, 0) :
				Math.min(relativeStart, len);
			var end = arguments[2];
			var relativeEnd = end === undefined ? len : end >> 0;
			var final = relativeEnd < 0 ?
				Math.max(len + relativeEnd, 0) :
				Math.min(relativeEnd, len);
			var count = Math.min(final - from, len - to);
			var direction = 1;
			if(from < to && to < (from + count)) {
				direction = -1;
				from += count - 1;
				to += count - 1;
			}
			while(count > 0) {
				if(from in O) {
					O[to] = O[from];
				} else {
					delete O[to];
				}
				from += direction;
				to += direction;
				count--;
			}
			return O;
		};
	};
	if(!Array.from) {
		Array.from = (function() {
			var toStr = Object.prototype.toString;
			var isCallable = function(fn) {
				return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
			};
			var toInteger = function(value) {
				var number = Number(value);
				if(isNaN(number)) {
					return 0;
				}
				if(number === 0 || !isFinite(number)) {
					return number;
				}
				return(number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
			};
			var maxSafeInteger = Math.pow(2, 53) - 1;
			var toLength = function(value) {
				var len = toInteger(value);
				return Math.min(Math.max(len, 0), maxSafeInteger);
			};
			return function from(arrayLike /*, mapFn, thisArg */ ) {
				var C = this;
				var items = Object(arrayLike);
				if(arrayLike == null) {
					throw new TypeError("Array.from requires an array-like object - not null or undefined");
				}
				var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
				var T;
				if(typeof mapFn !== 'undefined') {
					if(!isCallable(mapFn)) {
						throw new TypeError('Array.from: when provided, the second argument must be a function');
					}
					if(arguments.length > 2) {
						T = arguments[2];
					}
				}
				var len = toLength(items.length);
				var A = isCallable(C) ? Object(new C(len)) : new Array(len);
				var k = 0;
				var kValue;
				while(k < len) {
					kValue = items[k];
					if(mapFn) {
						A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
					} else {
						A[k] = kValue;
					}
					k += 1;
				}
				A.length = len;
				return A;
			};
		}());
	};
	if(!Array.isArray) {
		Array.isArray = function(arg) {
			return Object.prototype.toString.call(arg) === '[object Array]';
		};
	};
	if(!Array.of) {
		Array.of = function() {
			return Array.prototype.slice.call(arguments);
		};
	};
	if(!Array.prototype.every) {
		Array.prototype.every = function(fun /*, thisArg */ ) {
			'use strict';
			if(this === void 0 || this === null)
				throw new TypeError();
			var t = Object(this);
			var len = t.length >>> 0;
			if(typeof fun !== 'function')
				throw new TypeError();
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for(var i = 0; i < len; i++) {
				if(i in t && !fun.call(thisArg, t[i], i, t))
					return false;
			}
			return true;
		};
	};
	if(!Array.prototype.fill) {
		Array.prototype.fill = function(value) {
			if(this == null) {
				throw new TypeError('this is null or not defined');
			}
			var O = Object(this);
			var len = O.length >>> 0;
			var start = arguments[1];
			var relativeStart = start >> 0;
			var k = relativeStart < 0 ?
				Math.max(len + relativeStart, 0) :
				Math.min(relativeStart, len);
			var end = arguments[2];
			var relativeEnd = end === undefined ?
				len :
				end >> 0;
			var final = relativeEnd < 0 ?
				Math.max(len + relativeEnd, 0) :
				Math.min(relativeEnd, len);
			while(k < final) {
				O[k] = value;
				k++;
			}
			return O;
		};
	};
	if(!Array.prototype.filter) {
		Array.prototype.filter = function(fun /*, thisArg */ ) {
			"use strict";
			if(this === void 0 || this === null)
				throw new TypeError();
			var t = Object(this);
			var len = t.length >>> 0;
			if(typeof fun !== "function")
				throw new TypeError();
			var res = [];
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for(var i = 0; i < len; i++) {
				if(i in t) {
					var val = t[i];
					if(fun.call(thisArg, val, i, t))
						res.push(val);
				}
			}
			return res;
		};
	};
	if(!Array.prototype.find) {
		Array.prototype.find = function(predicate) {
			'use strict';
			if(this == null) {
				throw new TypeError('Array.prototype.find called on null or undefined');
			}
			if(typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}
			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;
			for(var i = 0; i < length; i++) {
				value = list[i];
				if(predicate.call(thisArg, value, i, list)) {
					return value;
				}
			}
			return undefined;
		};
	};
	if(!Array.prototype.findIndex) {
		Array.prototype.findIndex = function(predicate) {
			if(this === null) {
				throw new TypeError('Array.prototype.findIndex called on null or undefined');
			}
			if(typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}
			var list = Object(this);
			var length = list.length >>> 0;
			var thisArg = arguments[1];
			var value;
			for(var i = 0; i < length; i++) {
				value = list[i];
				if(predicate.call(thisArg, value, i, list)) {
					return i;
				}
			}
			return -1;
		};
	};
	if(!Array.prototype.forEach) {
		Array.prototype.forEach = function(callback, thisArg) {
			var T, k;
			if(this == null) {
				throw new TypeError(' this is null or not defined');
			}
			var O = Object(this);
			var len = O.length >>> 0;
			if(typeof callback !== "function") {
				throw new TypeError(callback + ' is not a function');
			}
			if(arguments.length > 1) {
				T = thisArg;
			}
			k = 0;
			while(k < len) {
				var kValue;
				if(k in O) {
					kValue = O[k];
					callback.call(T, kValue, k, O);
				}
				k++;
			}
		};
	};
	if(!Array.prototype.includes) {
		Object.defineProperty(Array.prototype, 'includes', {
			value: function(searchElement, fromIndex) {
				if(this == null) {
					throw new TypeError('"this" is null or not defined');
				}
				var o = Object(this);
				var len = o.length >>> 0;
				if(len === 0) {
					return false;
				}
				var n = fromIndex | 0;
				var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
				while(k < len) {
					if(o[k] === searchElement) {
						return true;
					}
					k++;
				}
				return false;
			}
		});
	};
	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(searchElement, fromIndex) {
			var k;
			if(this == null) {
				throw new TypeError('"this" is null or not defined');
			}
			var O = Object(this);
			var len = O.length >>> 0;
			if(len === 0) {
				return -1;
			}
			var n = +fromIndex || 0;
			if(Math.abs(n) === Infinity) {
				n = 0;
			}
			if(n >= len) {
				return -1;
			}
			k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
			while(k < len) {
				if(k in O && O[k] === searchElement) {
					return k;
				}
				k++;
			}
			return -1;
		};
	};
	if(!Array.prototype.lastIndexOf) {
		Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/ ) {
			'use strict';
			if(this === void 0 || this === null) {
				throw new TypeError();
			}
			var n, k,
				t = Object(this),
				len = t.length >>> 0;
			if(len === 0) {
				return -1;
			}
			n = len - 1;
			if(arguments.length > 1) {
				n = Number(arguments[1]);
				if(n != n) {
					n = 0;
				} else if(n != 0 && n != (1 / 0) && n != -(1 / 0)) {
					n = (n > 0 || -1) * Math.floor(Math.abs(n));
				}
			}
			for(k = n >= 0 ?
				Math.min(n, len - 1) :
				len - Math.abs(n); k >= 0; k--) {
				if(k in t && t[k] === searchElement) {
					return k;
				}
			}
			return -1;
		};
	};
	if(!Array.prototype.map) {
		Array.prototype.map = function(callback, thisArg) {
			var T, A, k;
			if(this == null) {
				throw new TypeError(" this is null or not defined");
			}
			var O = Object(this);
			var len = O.length >>> 0;
			if(Object.prototype.toString.call(callback) != "[object Function]") {
				throw new TypeError(callback + " is not a function");
			}
			if(thisArg) {
				T = thisArg;
			}
			A = new Array(len);
			k = 0;
			while(k < len) {
				var kValue, mappedValue;
				if(k in O) {
					kValue = O[k];
					mappedValue = callback.call(T, kValue, k, O);
					A[k] = mappedValue;
				}
				k++;
			}
			return A;
		};
	};
	if(!Array.prototype.reduce) {
		Array.prototype.reduce = function(callback /*, initialValue*/ ) {
			'use strict';
			if(this === null) {
				throw new TypeError('Array.prototype.reduce called on null or undefined');
			}
			if(typeof callback !== 'function') {
				throw new TypeError(callback + ' is not a function');
			}
			var t = Object(this),
				len = t.length >>> 0,
				k = 0,
				value;
			if(arguments.length >= 2) {
				value = arguments[1];
			} else {
				while(k < len && !(k in t)) {
					k++;
				}
				if(k >= len) {
					throw new TypeError('Reduce of empty array with no initial value');
				}
				value = t[k++];
			}
			for(; k < len; k++) {
				if(k in t) {
					value = callback(value, t[k], k, t);
				}
			}
			return value;
		};
	};
	if('function' !== typeof Array.prototype.reduceRight) {
		Array.prototype.reduceRight = function(callback /*, initialValue*/ ) {
			'use strict';
			if(null === this || 'undefined' === typeof this) {
				throw new TypeError('Array.prototype.reduce called on null or undefined');
			}
			if('function' !== typeof callback) {
				throw new TypeError(callback + ' is not a function');
			}
			var t = Object(this),
				len = t.length >>> 0,
				k = len - 1,
				value;
			if(arguments.length >= 2) {
				value = arguments[1];
			} else {
				while(k >= 0 && !(k in t)) {
					k--;
				}
				if(k < 0) {
					throw new TypeError('Reduce of empty array with no initial value');
				}
				value = t[k--];
			}
			for(; k >= 0; k--) {
				if(k in t) {
					value = callback(value, t[k], k, t);
				}
			}
			return value;
		};
	};
	if(!Object.defineProperties) {
		Object.defineProperties = function(obj, properties) {
			function convertToDescriptor(desc) {
				function hasProperty(obj, prop) {
					return Object.prototype.hasOwnProperty.call(obj, prop);
				};

				function isCallable(v) {
					return typeof v === "function";
				};
				if(typeof desc !== "object" || desc === null)
					throw new TypeError("不是正规的对象");
				var d = {};
				if(hasProperty(desc, "enumerable"))
					d.enumerable = !!desc.enumerable;
				if(hasProperty(desc, "configurable"))
					d.configurable = !!desc.configurable;
				if(hasProperty(desc, "value"))
					d.value = desc.value;
				if(hasProperty(desc, "writable"))
					d.writable = !!desc.writable;
				if(hasProperty(desc, "get")) {
					var g = desc.get;
					if(!isCallable(g) && g !== "undefined")
						throw new TypeError("bad get");
					d.get = g;
				}
				if(hasProperty(desc, "set")) {
					var s = desc.set;
					if(!isCallable(s) && s !== "undefined")
						throw new TypeError("bad set");
					d.set = s;
				}
				if(("get" in d || "set" in d) && ("value" in d || "writable" in d))
					throw new TypeError("identity-confused descriptor");
				return d;
			}
			if(typeof obj !== "object" || obj === null)
				throw new TypeError("不是正规的对象");
			properties = Object(properties);
			var keys = Object.keys(properties);
			var descs = [];
			for(var i = 0; i < keys.length; i++)
				descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);
			for(var i = 0; i < descs.length; i++)
				Object.defineProperty(obj, descs[i][0], descs[i][1]);
			return obj;
		};
	};
	if(!Object.assign) {
		Object.defineProperty(Object, "assign", {
			enumerable: false,
			configurable: true,
			writable: true,
			value: function(target, firstSource) {
				"use strict";
				if(target === undefined || target === null)
					throw new TypeError("Cannot convert first argument to object");
				var to = Object(target);
				for(var i = 1; i < arguments.length; i++) {
					var nextSource = arguments[i];
					if(nextSource === undefined || nextSource === null) continue;
					var keysArray = Object.keys(Object(nextSource));
					for(var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
						var nextKey = keysArray[nextIndex];
						var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
						if(desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
					}
				}
				return to;
			}
		});
	};
	if(typeof Object.create != 'function') {
		Object.create = (function() {
			function Temp() {}
			var hasOwn = Object.prototype.hasOwnProperty;
			return function(O) {
				if(typeof O != 'object') {
					throw TypeError('Object prototype may only be an Object or null');
				}
				Temp.prototype = O;
				var obj = new Temp();
				Temp.prototype = null;
				if(arguments.length > 1) {
					// Object.defineProperties does ToObject on its first argument.
					var Properties = Object(arguments[1]);
					for(var prop in Properties) {
						if(hasOwn.call(Properties, prop)) {
							obj[prop] = Properties[prop];
						}
					}
				}
				return obj;
			};
		})();
	};
	if(!Object.is) {
		Object.is = function(x, y) {
			if(x === y) {
				return x !== 0 || 1 / x === 1 / y;
			} else {
				return x !== x && y !== y;
			}
		};
	};
	if(!Object.keys) {
		Object.keys = (function() {
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({
					toString: null
				}).propertyIsEnumerable('toString'),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length;
			return function(obj) {
				if(typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
				var result = [];
				for(var prop in obj) {
					if(hasOwnProperty.call(obj, prop)) result.push(prop);
				}
				if(hasDontEnumBug) {
					for(var i = 0; i < dontEnumsLength; i++) {
						if(hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
					}
				}
				return result;
			}
		})()
	};
	if(!String.fromCodePoint) {
		(function() {
			var defineProperty = (function() {
				// IE 8 only supports `Object.defineProperty` on DOM elements
				try {
					var object = {};
					var $defineProperty = Object.defineProperty;
					var result = $defineProperty(object, object, object) && $defineProperty;
				} catch(error) {}
				return result;
			}());
			var stringFromCharCode = String.fromCharCode;
			var floor = Math.floor;
			var fromCodePoint = function() {
				var MAX_SIZE = 0x4000;
				var codeUnits = [];
				var highSurrogate;
				var lowSurrogate;
				var index = -1;
				var length = arguments.length;
				if(!length) {
					return '';
				}
				var result = '';
				while(++index < length) {
					var codePoint = Number(arguments[index]);
					if(!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
						codePoint < 0 || // not a valid Unicode code point
						codePoint > 0x10FFFF || // not a valid Unicode code point
						floor(codePoint) != codePoint // not an integer
					) {
						throw RangeError('Invalid code point: ' + codePoint);
					}
					if(codePoint <= 0xFFFF) { // BMP code point
						codeUnits.push(codePoint);
					} else { // Astral code point; split in surrogate halves
						// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
						codePoint -= 0x10000;
						highSurrogate = (codePoint >> 10) + 0xD800;
						lowSurrogate = (codePoint % 0x400) + 0xDC00;
						codeUnits.push(highSurrogate, lowSurrogate);
					}
					if(index + 1 == length || codeUnits.length > MAX_SIZE) {
						result += stringFromCharCode.apply(null, codeUnits);
						codeUnits.length = 0;
					}
				}
				return result;
			};
			if(defineProperty) {
				defineProperty(String, 'fromCodePoint', {
					'value': fromCodePoint,
					'configurable': true,
					'writable': true
				});
			} else {
				String.fromCodePoint = fromCodePoint;
			}
		}());
	};
	if(!String.prototype.codePointAt) {
		(function() {
			'use strict';
			var codePointAt = function(position) {
				if(this == null) {
					throw TypeError();
				}
				var string = String(this);
				var size = string.length;
				var index = position ? Number(position) : 0;
				if(index != index) {
					index = 0;
				}
				if(index < 0 || index >= size) {
					return undefined;
				}
				var first = string.charCodeAt(index);
				var second;
				if(
					first >= 0xD800 && first <= 0xDBFF &&
					size > index + 1
				) {
					second = string.charCodeAt(index + 1);
					if(second >= 0xDC00 && second <= 0xDFFF) {
						return(first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
					}
				}
				return first;
			};
			if(Object.defineProperty) {
				Object.defineProperty(String.prototype, 'codePointAt', {
					'value': codePointAt,
					'configurable': true,
					'writable': true
				});
			} else {
				String.prototype.codePointAt = codePointAt;
			}
		}());
	};
	if(!String.prototype.startsWith) {
		(function() {
			'use strict';
			var defineProperty = (function() {
				try {
					var object = {};
					var $defineProperty = Object.defineProperty;
					var result = $defineProperty(object, object, object) && $defineProperty;
				} catch(error) {}
				return result;
			}());
			var toString = {}.toString;
			var startsWith = function(search) {
				if(this == null) {
					throw TypeError();
				}
				var string = String(this);
				if(search && toString.call(search) == '[object RegExp]') {
					throw TypeError();
				}
				var stringLength = string.length;
				var searchString = String(search);
				var searchLength = searchString.length;
				var position = arguments.length > 1 ? arguments[1] : undefined;
				var pos = position ? Number(position) : 0;
				if(pos != pos) { // better `isNaN`
					pos = 0;
				}
				var start = Math.min(Math.max(pos, 0), stringLength);
				if(searchLength + start > stringLength) {
					return false;
				}
				var index = -1;
				while(++index < searchLength) {
					if(string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
						return false;
					}
				}
				return true;
			};
			if(defineProperty) {
				defineProperty(String.prototype, 'startsWith', {
					'value': startsWith,
					'configurable': true,
					'writable': true
				});
			} else {
				String.prototype.startsWith = startsWith;
			}
		}());
	};
	if(!String.prototype.endsWith) {
		(function() {
			'use strict';
			var defineProperty = (function() {
				try {
					var object = {};
					var $defineProperty = Object.defineProperty;
					var result = $defineProperty(object, object, object) && $defineProperty;
				} catch(error) {}
				return result;
			}());
			var toString = {}.toString;
			var endsWith = function(search) {
				if(this == null) {
					throw TypeError();
				}
				var string = String(this);
				if(search && toString.call(search) == '[object RegExp]') {
					throw TypeError();
				}
				var stringLength = string.length;
				var searchString = String(search);
				var searchLength = searchString.length;
				var pos = stringLength;
				if(arguments.length > 1) {
					var position = arguments[1];
					if(position !== undefined) {
						pos = position ? Number(position) : 0;
						if(pos != pos) {
							pos = 0;
						}
					}
				}
				var end = Math.min(Math.max(pos, 0), stringLength);
				var start = end - searchLength;
				if(start < 0) {
					return false;
				}
				var index = -1;
				while(++index < searchLength) {
					if(string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
						return false;
					}
				}
				return true;
			};
			if(defineProperty) {
				defineProperty(String.prototype, 'endsWith', {
					'value': endsWith,
					'configurable': true,
					'writable': true
				});
			} else {
				String.prototype.endsWith = endsWith;
			}
		}());
	};
	if(!String.prototype.repeat) {
		String.prototype.repeat = function(count) {
			'use strict';
			if(this == null) {
				throw new TypeError('can\'t convert ' + this + ' to object');
			}
			var str = '' + this;
			count = +count;
			if(count != count) {
				count = 0;
			}
			if(count < 0) {
				throw new RangeError('repeat count must be non-negative');
			}
			if(count == Infinity) {
				throw new RangeError('repeat count must be less than infinity');
			}
			count = Math.floor(count);
			if(str.length == 0 || count == 0) {
				return '';
			}
			if(str.length * count >= 1 << 28) {
				throw new RangeError('repeat count must not overflow maximum string size');
			}
			var rpt = '';
			for(;;) {
				if((count & 1) == 1) {
					rpt += str;
				}
				count >>>= 1;
				if(count == 0) {
					break;
				}
				str += str;
			}
			return rpt;
		}
	};
	if('ab'.substr(-1) != 'b') {
		String.prototype.substr = function(substr) {
			return function(start, length) {
				if(start < 0) start = this.length + start;
				return substr.call(this, start, length);
			}
		}(String.prototype.substr);
	};
	if(!String.prototype.includes) {
		String.prototype.includes = function(search, start) {
			'use strict';
			if(typeof start !== 'number') {
				start = 0;
			}
			if(start + search.length > this.length) {
				return false;
			} else {
				return this.indexOf(search, start) !== -1;
			}
		};
	};
	if(!String.prototype.trim) {
		String.prototype.trim = function() {
			return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		};
	};
	if(!Function.prototype.bind) {
		Function.prototype.bind = function(oThis) {
			if(typeof this !== "function") {
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}
			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP = function() {},
				fBound = function() {
					return fToBind.apply(this instanceof fNOP ?
						this :
						oThis || this,
						aArgs.concat(Array.prototype.slice.call(arguments)));
				};
			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();
			return fBound;
		};
	};
	if(!Number.isFinite) {
		Number.isFinite = Number.isFinite || function(value) {
			return typeof value === "number" && isFinite(value);
		}
	};
	if(!Number.isInteger) {
		Number.isInteger = Number.isInteger || function(value) {
			return typeof value === "number" &&
				isFinite(value) &&
				Math.floor(value) === value;
		};
	};
	if(!Number.isNaN) {
		Number.isNaN = Number.isNaN || function(value) {
			return typeof value === "number" && isNaN(value);
		}
	};
	if(!Number.isSafeInteger) {
		Number.isSafeInteger = Number.isSafeInteger || function(value) {
			return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
		};
	};
	if(typeof window === "object" && typeof window.document === "object") {
		window.userAgent = userAgent;
		window.isChrome = isChrome;
		window.isFF = isFF;
		window.isOpera = isOpera;
		window.isSafari = isSafari;
		window.isIE = isIE;
		window.isEdge = isEdge;
		window.isLoaded = isLoaded;
		window.$ = window.Zendollar = $;
		window.$on = $on;
		window.$off = $off;
		window.$load = $load;
		window.$ready = $ready;
		window.$lag = $lag;
		window.$loadImage = $loadImage;
		window.$per = $per;
		window.$each = $each;
		window.$map = $map;
		window.$unique = $unique;
		window.$make = $make;
		window.$call = $call;
		window.$debounce = $debounce;
		window.$poll = $poll;
		window.$once = $once;
		window.$find = $find;
		window.$matches = $matches;
		window.$query = $query;
		window.$filter = $filter;
		window.$until = $until;
		window.$index = $index;
		window.$inArray = $inArray;
		window.$isParent = $isParent;
		window.$isInViewport = $isInViewport;
		window.$isHit = $isHit;
		window.$isWindow = $isWindow;
		window.$isArray = $isArray;
		window.$isFunction = $isFunction;
		window.$isNumber = $isNumber;
		window.$isString = $isString;
		window.$isBoolean = $isBoolean;
		window.$isObject = $isObject;
		window.$isNull = $isNull;
		window.$isUndefined = $isUndefined;
		window.$is = $is;
		window.$print = $print;
		window.$proxy = $proxy;
		window.$eval = $eval;
		window.$now = $now;
		window.$time = $time;
		window.$resetCSS = $resetCSS;
		window.$addCSS = $addCSS;
		window.$setCSS = $setCSS;
		window.$clientWidth = $clientWidth;
		window.$clientHeight = $clientHeight;
		window.$scrollLeft = $scrollLeft;
		window.$scrollTop = $scrollTop;
		window.$scrollWidth = $scrollWidth;
		window.$scrollHeight = $scrollHeight;
		window.$screenWidth = $screenWidth;
		window.$screenHeight = $screenHeight;
		window.$screenLeft = $screenLeft;
		window.$screenTop = $screenTop;
		window.$outerWidth = $outerWidth;
		window.$outerHeight = $outerHeight;
		window.$offset = $offset;
		window.$position = $position;
		window.$view = $view;
		window.$scrollTo = $scrollTo;
		window.$event = $event;
		window.$lock = $lock;
		window.$unlock = $unlock;
		window.$data = $data;
		window.$ajax = $ajax;
		window.$setCookie = $setCookie;
		window.$getCookie = $getCookie;
		window.$clearCookie = $clearCookie;
		window.$checkCookie = $checkCookie;
		window.$JSON = $JSON;
		window.$getUrlParam = $getUrlParam;
		window.$getUrl = $getUrl;
		window.$listener = $listener;
	};
})(window);
