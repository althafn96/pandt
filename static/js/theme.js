window.theme = {};
window.theme.fn = {
    getOptions: function(opts) {
        if (typeof(opts) == 'object') {
            return opts;
        } else if (typeof(opts) == 'string') {
            try {
                return JSON.parse(opts.replace(/'/g, '"').replace(';', ''));
            } catch (e) {
                return {};
            }
        } else {
            return {};
        }
    },
    execPluginFunction: function(functionName, context) {
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    },
    intObs: function(selector, functionName, intObsOptions, alwaysObserve) {
        var $el = document.querySelectorAll(selector);
        var intersectionObserverOptions = {
            rootMargin: '0px 0px 200px 0px'
        }
        if (intObsOptions.length) {
            $.extend(intersectionObserverOptions, intObsOptions);
        }
        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (entry.intersectionRatio > 0) {
                    if (typeof functionName === 'string') {
                        var func = Function('return ' + functionName)();
                    } else {
                        var callback = functionName;
                        callback.call($(entry.target));
                    }
                    if (!alwaysObserve) {
                        observer.unobserve(entry.target);
                    }
                }
            }
        }, intersectionObserverOptions);
        $($el).each(function() {
            observer.observe($(this)[0]);
        });
    },
    intObsInit: function(selector, functionName) {
        var $el = document.querySelectorAll(selector);
        var intersectionObserverOptions = {
            rootMargin: '200px'
        }
        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (entry.intersectionRatio > 0) {
                    var $this = $(entry.target),
                        opts;
                    var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
                    if (pluginOptions)
                        opts = pluginOptions;
                    theme.fn.execPluginFunction(functionName, $this, opts);
                    observer.unobserve(entry.target);
                }
            }
        }, intersectionObserverOptions);
        $($el).each(function() {
            observer.observe($(this)[0]);
        });
    },
    dynIntObsInit: function(selector, functionName, pluginDefaults) {
        var $el = document.querySelectorAll(selector);
        $($el).each(function() {
            var $this = $(this),
                opts;
            var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
            if (pluginOptions)
                opts = pluginOptions;
            var mergedPluginDefaults = theme.fn.mergeOptions(pluginDefaults, opts)
            var intersectionObserverOptions = {
                rootMargin: theme.fn.getRootMargin(functionName, mergedPluginDefaults),
                threshold: 0
            }
            var observer = new IntersectionObserver(function(entries) {
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.intersectionRatio > 0) {
                        theme.fn.execPluginFunction(functionName, $this, mergedPluginDefaults);
                        observer.unobserve(entry.target);
                    }
                }
            }, intersectionObserverOptions);
            observer.observe($this[0]);
        });
    },
    getRootMargin: function(plugin, pluginDefaults) {
        switch (plugin) {
            case 'themePluginCounter':
                return pluginDefaults.accY ? '0px 0px ' + pluginDefaults.accY + 'px 0px' : '0px 0px 200px 0px';
                break;
            case 'themePluginAnimate':
                return pluginDefaults.accY ? '0px 0px ' + pluginDefaults.accY + 'px 0px' : '0px 0px 200px 0px';
                break;
            default:
                return '0px 0px 200px 0px';
                break;
        }
    },
    mergeOptions: function(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    },
    execOnceTroughEvent: function($el, event, callback) {
        var self = this,
            dataName = self.formatDataName(event);
        $($el).on(event, function() {
            if (!$(this).data(dataName)) {
                callback.call($(this));
                $(this).data(dataName, true);
                $(this).off(event);
            }
        });
        return this;
    },
    execOnceTroughWindowEvent: function($el, event, callback) {
        var self = this,
            dataName = self.formatDataName(event);
        $($el).on(event, function() {
            if (!$(this).data(dataName)) {
                callback();
                $(this).data(dataName, true);
                $(this).off(event);
            }
        });
        return this;
    },
    formatDataName: function(name) {
        name = name.replace('.', '');
        return name;
    },
    isElementInView: function($el) {
        var rect = $el[0].getBoundingClientRect();
        return (rect.top <= (window.innerHeight / 3));
    }
};
! function() {
    "use strict";
    if ("object" == typeof window)
        if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) "isIntersecting" in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
            get: function() {
                return this.intersectionRatio > 0
            }
        });
        else {
            var t = function(t) {
                    for (var e = window.document, o = i(e); o;) o = i(e = o.ownerDocument);
                    return e
                }(),
                e = [],
                o = null,
                n = null;
            s.prototype.THROTTLE_TIMEOUT = 100, s.prototype.POLL_INTERVAL = null, s.prototype.USE_MUTATION_OBSERVER = !0, s._setupCrossOriginUpdater = function() {
                return o || (o = function(t, o) {
                    n = t && o ? l(t, o) : {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    }, e.forEach(function(t) {
                        t._checkForIntersections()
                    })
                }), o
            }, s._resetCrossOriginUpdater = function() {
                o = null, n = null
            }, s.prototype.observe = function(t) {
                if (!this._observationTargets.some(function(e) {
                        return e.element == t
                    })) {
                    if (!t || 1 != t.nodeType) throw new Error("target must be an Element");
                    this._registerInstance(), this._observationTargets.push({
                        element: t,
                        entry: null
                    }), this._monitorIntersections(t.ownerDocument), this._checkForIntersections()
                }
            }, s.prototype.unobserve = function(t) {
                this._observationTargets = this._observationTargets.filter(function(e) {
                    return e.element != t
                }), this._unmonitorIntersections(t.ownerDocument), 0 == this._observationTargets.length && this._unregisterInstance()
            }, s.prototype.disconnect = function() {
                this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance()
            }, s.prototype.takeRecords = function() {
                var t = this._queuedEntries.slice();
                return this._queuedEntries = [], t
            }, s.prototype._initThresholds = function(t) {
                var e = t || [0];
                return Array.isArray(e) || (e = [e]), e.sort().filter(function(t, e, o) {
                    if ("number" != typeof t || isNaN(t) || t < 0 || t > 1) throw new Error("threshold must be a number between 0 and 1 inclusively");
                    return t !== o[e - 1]
                })
            }, s.prototype._parseRootMargin = function(t) {
                var e = (t || "0px").split(/\s+/).map(function(t) {
                    var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                    if (!e) throw new Error("rootMargin must be specified in pixels or percent");
                    return {
                        value: parseFloat(e[1]),
                        unit: e[2]
                    }
                });
                return e[1] = e[1] || e[0], e[2] = e[2] || e[0], e[3] = e[3] || e[1], e
            }, s.prototype._monitorIntersections = function(e) {
                var o = e.defaultView;
                if (o && -1 == this._monitoringDocuments.indexOf(e)) {
                    var n = this._checkForIntersections,
                        r = null,
                        s = null;
                    this.POLL_INTERVAL ? r = o.setInterval(n, this.POLL_INTERVAL) : (h(o, "resize", n, !0), h(e, "scroll", n, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in o && (s = new o.MutationObserver(n)).observe(e, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0
                    })), this._monitoringDocuments.push(e), this._monitoringUnsubscribes.push(function() {
                        var t = e.defaultView;
                        t && (r && t.clearInterval(r), c(t, "resize", n, !0)), c(e, "scroll", n, !0), s && s.disconnect()
                    });
                    var u = this.root && (this.root.ownerDocument || this.root) || t;
                    if (e != u) {
                        var a = i(e);
                        a && this._monitorIntersections(a.ownerDocument)
                    }
                }
            }, s.prototype._unmonitorIntersections = function(e) {
                var o = this._monitoringDocuments.indexOf(e);
                if (-1 != o) {
                    var n = this.root && (this.root.ownerDocument || this.root) || t;
                    if (!this._observationTargets.some(function(t) {
                            var o = t.element.ownerDocument;
                            if (o == e) return !0;
                            for (; o && o != n;) {
                                var r = i(o);
                                if ((o = r && r.ownerDocument) == e) return !0
                            }
                            return !1
                        })) {
                        var r = this._monitoringUnsubscribes[o];
                        if (this._monitoringDocuments.splice(o, 1), this._monitoringUnsubscribes.splice(o, 1), r(), e != n) {
                            var s = i(e);
                            s && this._unmonitorIntersections(s.ownerDocument)
                        }
                    }
                }
            }, s.prototype._unmonitorAllIntersections = function() {
                var t = this._monitoringUnsubscribes.slice(0);
                this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
                for (var e = 0; e < t.length; e++) t[e]()
            }, s.prototype._checkForIntersections = function() {
                if (this.root || !o || n) {
                    var t = this._rootIsInDom(),
                        e = t ? this._getRootRect() : {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            width: 0,
                            height: 0
                        };
                    this._observationTargets.forEach(function(n) {
                        var i = n.element,
                            s = u(i),
                            h = this._rootContainsTarget(i),
                            c = n.entry,
                            a = t && h && this._computeTargetAndRootIntersection(i, s, e),
                            l = null;
                        this._rootContainsTarget(i) ? o && !this.root || (l = e) : l = {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            width: 0,
                            height: 0
                        };
                        var f = n.entry = new r({
                            time: window.performance && performance.now && performance.now(),
                            target: i,
                            boundingClientRect: s,
                            rootBounds: l,
                            intersectionRect: a
                        });
                        c ? t && h ? this._hasCrossedThreshold(c, f) && this._queuedEntries.push(f) : c && c.isIntersecting && this._queuedEntries.push(f) : this._queuedEntries.push(f)
                    }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this)
                }
            }, s.prototype._computeTargetAndRootIntersection = function(e, i, r) {
                if ("none" != window.getComputedStyle(e).display) {
                    for (var s, h, c, a, f, d, g, m, v = i, _ = p(e), b = !1; !b && _;) {
                        var w = null,
                            y = 1 == _.nodeType ? window.getComputedStyle(_) : {};
                        if ("none" == y.display) return null;
                        if (_ == this.root || 9 == _.nodeType)
                            if (b = !0, _ == this.root || _ == t) o && !this.root ? !n || 0 == n.width && 0 == n.height ? (_ = null, w = null, v = null) : w = n : w = r;
                            else {
                                var I = p(_),
                                    E = I && u(I),
                                    T = I && this._computeTargetAndRootIntersection(I, E, r);
                                E && T ? (_ = I, w = l(E, T)) : (_ = null, v = null)
                            }
                        else {
                            var R = _.ownerDocument;
                            _ != R.body && _ != R.documentElement && "visible" != y.overflow && (w = u(_))
                        }
                        if (w && (s = w, h = v, c = void 0, a = void 0, f = void 0, d = void 0, g = void 0, m = void 0, c = Math.max(s.top, h.top), a = Math.min(s.bottom, h.bottom), f = Math.max(s.left, h.left), d = Math.min(s.right, h.right), m = a - c, v = (g = d - f) >= 0 && m >= 0 && {
                                top: c,
                                bottom: a,
                                left: f,
                                right: d,
                                width: g,
                                height: m
                            } || null), !v) break;
                        _ = _ && p(_)
                    }
                    return v
                }
            }, s.prototype._getRootRect = function() {
                var e;
                if (this.root && !d(this.root)) e = u(this.root);
                else {
                    var o = d(this.root) ? this.root : t,
                        n = o.documentElement,
                        i = o.body;
                    e = {
                        top: 0,
                        left: 0,
                        right: n.clientWidth || i.clientWidth,
                        width: n.clientWidth || i.clientWidth,
                        bottom: n.clientHeight || i.clientHeight,
                        height: n.clientHeight || i.clientHeight
                    }
                }
                return this._expandRectByRootMargin(e)
            }, s.prototype._expandRectByRootMargin = function(t) {
                var e = this._rootMarginValues.map(function(e, o) {
                        return "px" == e.unit ? e.value : e.value * (o % 2 ? t.width : t.height) / 100
                    }),
                    o = {
                        top: t.top - e[0],
                        right: t.right + e[1],
                        bottom: t.bottom + e[2],
                        left: t.left - e[3]
                    };
                return o.width = o.right - o.left, o.height = o.bottom - o.top, o
            }, s.prototype._hasCrossedThreshold = function(t, e) {
                var o = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
                    n = e.isIntersecting ? e.intersectionRatio || 0 : -1;
                if (o !== n)
                    for (var i = 0; i < this.thresholds.length; i++) {
                        var r = this.thresholds[i];
                        if (r == o || r == n || r < o != r < n) return !0
                    }
            }, s.prototype._rootIsInDom = function() {
                return !this.root || f(t, this.root)
            }, s.prototype._rootContainsTarget = function(e) {
                var o = this.root && (this.root.ownerDocument || this.root) || t;
                return f(o, e) && (!this.root || o == e.ownerDocument)
            }, s.prototype._registerInstance = function() {
                e.indexOf(this) < 0 && e.push(this)
            }, s.prototype._unregisterInstance = function() {
                var t = e.indexOf(this); - 1 != t && e.splice(t, 1)
            }, window.IntersectionObserver = s, window.IntersectionObserverEntry = r
        }
    function i(t) {
        try {
            return t.defaultView && t.defaultView.frameElement || null
        } catch (t) {
            return null
        }
    }

    function r(t) {
        this.time = t.time, this.target = t.target, this.rootBounds = a(t.rootBounds), this.boundingClientRect = a(t.boundingClientRect), this.intersectionRect = a(t.intersectionRect || {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
        }), this.isIntersecting = !!t.intersectionRect;
        var e = this.boundingClientRect,
            o = e.width * e.height,
            n = this.intersectionRect,
            i = n.width * n.height;
        this.intersectionRatio = o ? Number((i / o).toFixed(4)) : this.isIntersecting ? 1 : 0
    }

    function s(t, e) {
        var o, n, i, r = e || {};
        if ("function" != typeof t) throw new Error("callback must be a function");
        if (r.root && 1 != r.root.nodeType && 9 != r.root.nodeType) throw new Error("root must be a Document or Element");
        this._checkForIntersections = (o = this._checkForIntersections.bind(this), n = this.THROTTLE_TIMEOUT, i = null, function() {
            i || (i = setTimeout(function() {
                o(), i = null
            }, n))
        }), this._callback = t, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(r.rootMargin), this.thresholds = this._initThresholds(r.threshold), this.root = r.root || null, this.rootMargin = this._rootMarginValues.map(function(t) {
            return t.value + t.unit
        }).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = []
    }

    function h(t, e, o, n) {
        "function" == typeof t.addEventListener ? t.addEventListener(e, o, n || !1) : "function" == typeof t.attachEvent && t.attachEvent("on" + e, o)
    }

    function c(t, e, o, n) {
        "function" == typeof t.removeEventListener ? t.removeEventListener(e, o, n || !1) : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, o)
    }

    function u(t) {
        var e;
        try {
            e = t.getBoundingClientRect()
        } catch (t) {}
        return e ? (e.width && e.height || (e = {
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            width: e.right - e.left,
            height: e.bottom - e.top
        }), e) : {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
        }
    }

    function a(t) {
        return !t || "x" in t ? t : {
            top: t.top,
            y: t.top,
            bottom: t.bottom,
            left: t.left,
            x: t.left,
            right: t.right,
            width: t.width,
            height: t.height
        }
    }

    function l(t, e) {
        var o = e.top - t.top,
            n = e.left - t.left;
        return {
            top: o,
            left: n,
            height: e.height,
            width: e.width,
            bottom: o + e.height,
            right: n + e.width
        }
    }

    function f(t, e) {
        for (var o = e; o;) {
            if (o == t) return !0;
            o = p(o)
        }
        return !1
    }

    function p(e) {
        var o = e.parentNode;
        return 9 == e.nodeType && e != t ? i(e) : (o && o.assignedSlot && (o = o.assignedSlot.parentNode), o && 11 == o.nodeType && o.host ? o.host : o)
    }

    function d(t) {
        return t && 9 === t.nodeType
    }
}();
(function($) {
    $.extend({
        browserSelector: function() {
            (function(a) {
                (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
            })(navigator.userAgent || navigator.vendor || window.opera);
            var hasTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
            var u = navigator.userAgent,
                ua = u.toLowerCase(),
                is = function(t) {
                    return ua.indexOf(t) > -1;
                },
                g = 'gecko',
                w = 'webkit',
                s = 'safari',
                o = 'opera',
                h = document.documentElement,
                b = [(!(/opera|webtv/i.test(ua)) && /msie\s(\d)/.test(ua)) ? ('ie ie' + parseFloat(navigator.appVersion.split("MSIE")[1])) : is('firefox/2') ? g + ' ff2' : is('firefox/3.5') ? g + ' ff3 ff3_5' : is('firefox/3') ? g + ' ff3' : is('gecko/') ? g : is('opera') ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.jQuery1 : (/opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.jQuery2 : '')) : is('konqueror') ? 'konqueror' : is('chrome') ? w + ' chrome' : is('iron') ? w + ' iron' : is('applewebkit/') ? w + ' ' + s + (/version\/(\d+)/.test(ua) ? ' ' + s + RegExp.jQuery1 : '') : is('mozilla/') ? g : '', is('j2me') ? 'mobile' : is('iphone') ? 'iphone' : is('ipod') ? 'ipod' : is('mac') ? 'mac' : is('darwin') ? 'mac' : is('webtv') ? 'webtv' : is('win') ? 'win' : is('freebsd') ? 'freebsd' : (is('x11') || is('linux')) ? 'linux' : '', 'js'];
            c = b.join(' ');
            if ($.browser.mobile) {
                c += ' mobile';
            }
            if (hasTouch) {
                c += ' touch';
            }
            h.className += ' ' + c;
            var isEdge = /Edge/.test(navigator.userAgent);
            if (isEdge) {
                $('html').removeClass('chrome').addClass('edge');
            }
            var isIE11 = !(window.ActiveXObject) && "ActiveXObject" in window;
            if (isIE11) {
                $('html').removeClass('gecko').addClass('ie ie11');
                return;
            }
            if ($('body').hasClass('dark')) {
                $('html').addClass('dark');
            }
            if ($('body').hasClass('boxed')) {
                $('html').addClass('boxed');
            }
        }
    });
    $.browserSelector();
    theme.globalWindowWidth = $(window).width();
    var globalWindowWidth = $(window).width();
    window.onresize = function() {
        theme.globalWindowWidth = $(window).width();
    }
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
        $(document).ready(function($) {
            $('.thumb-info').attr('onclick', 'return true');
        });
    }
    $(window).on('load', function() {
        if ($('[data-toggle="tooltip"]').length) {
            $('[data-toggle="tooltip"]').tooltip();
        }
        if ($('[data-toggle="popover"]').length) {
            $('[data-toggle="popover"]').popover();
        }
    });
    if ($('a[data-toggle="tab"]').length) {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            $(this).parents('.nav-tabs').find('.active').removeClass('active');
            $(this).addClass('active').parent().addClass('active');
        });
    }
    if (window.location.hash) {
        $(window).on('load', function() {
            if ($(window.location.hash).get(0)) {
                $('a.nav-link[href="' + window.location.hash + '"]:not([data-hash])').trigger('click');
            }
        });
    }
    if ($('a[data-toggle="tab"]').length) {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            var $tabPane = $($(e.target).attr('href'));
            if ($tabPane.length) {
                $tabPane.find('.owl-carousel').trigger('refresh.owl.carousel');
            }
        });
    }
    if (!$('html').hasClass('disable-onload-scroll') && window.location.hash && !['#*'].includes(window.location.hash)) {
        window.scrollTo(0, 0);
        $(window).on('load', function() {
            setTimeout(function() {
                var target = window.location.hash,
                    offset = ($(window).width() < 768) ? 180 : 90;
                if (!$(target).length) {
                    return;
                }
                if ($("a[href$='" + window.location.hash + "']").is('[data-hash-offset]')) {
                    offset = parseInt($("a[href$='" + window.location.hash + "']").first().attr('data-hash-offset'));
                } else if ($("html").is('[data-hash-offset]')) {
                    offset = parseInt($("html").attr('data-hash-offset'));
                }
                if (isNaN(offset)) {
                    offset = 0;
                }
                $('body').addClass('scrolling');
                $('html, body').animate({
                    scrollTop: $(target).offset().top - offset
                }, 600, 'easeOutQuad', function() {
                    $('body').removeClass('scrolling');
                });
            }, 1);
        });
    }
    $.fn.extend({
        textRotator: function(options) {
            var defaults = {
                fadeSpeed: 500,
                pauseSpeed: 100,
                child: null
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                var o = options;
                var obj = $(this);
                var items = $(obj.children(), obj);
                items.each(function() {
                    $(this).hide();
                })
                if (!o.child) {
                    var next = $(obj).children(':first');
                } else {
                    var next = o.child;
                }
                $(next).fadeIn(o.fadeSpeed, function() {
                    $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
                        var next = $(this).next();
                        if (next.length == 0) {
                            next = $(obj).children(':first');
                        }
                        $(obj).textRotator({
                            child: next,
                            fadeSpeed: o.fadeSpeed,
                            pauseSpeed: o.pauseSpeed
                        });
                    })
                });
            });
        }
    });
    var $noticeTopBar = {
        $wrapper: $('.notice-top-bar'),
        $closeBtn: $('.notice-top-bar-close'),
        $header: $('#header'),
        $body: $('.body'),
        init: function() {
            var self = this;
            if (!$.cookie('portoNoticeTopBarClose')) {
                self.build().events();
            } else {
                self.$wrapper.parent().prepend('<!-- Notice Top Bar removed by cookie -->');
                self.$wrapper.remove();
            }
            return this;
        },
        build: function() {
            var self = this;
            $(window).on('load', function() {
                setTimeout(function() {
                    self.$body.css({
                        'margin-top': self.$wrapper.outerHeight(),
                        'transition': 'ease margin 300ms'
                    });
                    $('#noticeTopBarContent').textRotator({
                        fadeSpeed: 500,
                        pauseSpeed: 5000
                    });
                    if (['absolute', 'fixed'].includes(self.$header.css('position'))) {
                        self.$header.css({
                            'top': self.$wrapper.outerHeight(),
                            'transition': 'ease top 300ms'
                        });
                    }
                    $(window).trigger('notice.top.bar.opened');
                }, 1000);
            });
            return this;
        },
        events: function() {
            var self = this;
            self.$closeBtn.on('click', function(e) {
                e.preventDefault();
                self.$body.animate({
                    'margin-top': 0,
                }, 300, function() {
                    self.$wrapper.remove();
                    self.saveCookie();
                });
                if (['absolute', 'fixed'].includes(self.$header.css('position'))) {
                    self.$header.animate({
                        top: 0
                    }, 300);
                }
                if (self.$header.hasClass('header-effect-shrink')) {
                    self.$header.find('.header-body').animate({
                        top: 0
                    }, 300);
                }
                $(window).trigger('notice.top.bar.closed');
            });
            return this;
        },
        checkCookie: function() {
            var self = this;
            if ($.cookie('portoNoticeTopBarClose')) {
                return true;
            } else {
                return false;
            }
            return this;
        },
        saveCookie: function() {
            var self = this;
            $.cookie('portoNoticeTopBarClose', true);
            return this;
        }
    }
    if ($('.notice-top-bar').length) {
        $noticeTopBar.init();
    }
    if ($('.image-hotspot').length) {
        $('.image-hotspot').append('<span class="ring"></span>').append('<span class="circle"></span>');
    }
    if ($('body[data-plugin-page-transition]').length) {
        var link_click = false;
        $(document).on('click', 'a', function(e) {
            link_click = $(this);
        });
        $(window).on("beforeunload", function(e) {
            if (typeof link_click === 'object') {
                var href = link_click.attr('href');
                if (href.indexOf('mailto:') != 0 && href.indexOf('tel:') != 0 && !link_click.data('rm-from-transition')) {
                    $('body').addClass('page-transition-active');
                }
            }
        });
        $(window).on("pageshow", function(e) {
            if (e.persisted) {
                if ($('html').hasClass('safari')) {
                    window.location.reload();
                }
                $('body').removeClass('page-transition-active');
            }
        });
    }
    if ($('.thumb-info-floating-caption').length) {
        $('.thumb-info-floating-caption').on('mouseenter', function() {
            if (!$('.thumb-info-floating-caption-title').length) {
                $('.body').append('<div class="thumb-info-floating-caption-title">' + $(this).data('title') + '</div>');
                if ($(this).data('type')) {
                    $('.thumb-info-floating-caption-title').append('<div class="thumb-info-floating-caption-type">' + $(this).data('type') + '</div>').css({
                        'padding-bottom': 22
                    });
                }
                if ($(this).hasClass('thumb-info-floating-caption-clean')) {
                    $('.thumb-info-floating-caption-title').addClass('bg-transparent');
                }
            }
        }).on('mouseout', function() {
            $('.thumb-info-floating-caption-title').remove();
        });
        $(document).on('mousemove', function(e) {
            $('.thumb-info-floating-caption-title').css({
                position: 'fixed',
                left: e.clientX - 20,
                top: e.clientY + 20
            });
        });
    }
    $('[data-toggle-text-click]').on('click', function() {
        $(this).text(function(i, text) {
            return text === $(this).attr('data-toggle-text-click') ? $(this).attr('data-toggle-text-click-alt') : $(this).attr('data-toggle-text-click');
        });
    });
    if ($('.shape-divider').length) {
        aspectRatioSVG();
        $(window).on('resize', function() {
            aspectRatioSVG();
        });
    }
    if ($('.shape-divider-horizontal-animation').length) {
        theme.fn.intObs('.shape-divider-horizontal-animation', function() {
            for (var i = 0; i <= 1; i++) {
                var svgClone = $(this).find('svg:nth-child(1)').clone();
                $(this).append(svgClone)
            }
            $(this).addClass('start');
        }, {});
    }
    $('[data-porto-toggle-class]').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass($(this).data('porto-toggle-class'));
    });
    var $window = $(window);
    $window.on('resize dynamic.height.resize', function() {
        $('[data-dynamic-height]').each(function() {
            var $this = $(this),
                values = JSON.parse($this.data('dynamic-height').replace(/'/g, '"').replace(';', ''))
            if ($window.width() < 576) {
                $this.height(values[4]);
            }
            if ($window.width() > 575 && $window.width() < 768) {
                $this.height(values[3]);
            }
            if ($window.width() > 767 && $window.width() < 992) {
                $this.height(values[2]);
            }
            if ($window.width() > 991 && $window.width() < 1200) {
                $this.height(values[1]);
            }
            if ($window.width() > 1199) {
                $this.height(values[0]);
            }
        });
    });
    if ($window.width() < 992) {
        $window.trigger('dynamic.height.resize');
    }
    if ($('[data-trigger-play-video]').length) {
        theme.fn.execOnceTroughEvent('[data-trigger-play-video]', 'mouseover.trigger.play.video', function() {
            var $video = $($(this).data('trigger-play-video'));
            $(this).on('click', function(e) {
                e.preventDefault();
                if ($(this).data('trigger-play-video-remove') == 'yes') {
                    $(this).animate({
                        opacity: 0
                    }, 300, function() {
                        $video[0].play();
                        $(this).remove();
                    });
                } else {
                    setTimeout(function() {
                        $video[0].play();
                    }, 300);
                }
            });
        });
    }
    if ($('video[data-auto-play]').length) {
        $(window).on('load', function() {
            $('video[data-auto-play]').each(function() {
                var $video = $(this);
                setTimeout(function() {
                    if ($('#' + $video.attr('id')).length) {
                        if ($('[data-trigger-play-video="#' + $video.attr('id') + '"]').data('trigger-play-video-remove') == 'yes') {
                            $('[data-trigger-play-video="#' + $video.attr('id') + '"]').animate({
                                opacity: 0
                            }, 300, function() {
                                $video[0].play();
                                $('[data-trigger-play-video="#' + $video.attr('id') + '"]').remove();
                            });
                        } else {
                            setTimeout(function() {
                                $video[0].play();
                            }, 300);
                        }
                    }
                }, 100);
            });
        });
    }
    if ($('[data-remove-min-height]').length) {
        $(window).on('load', function() {
            $('[data-remove-min-height]').each(function() {
                $(this).css({
                    'min-height': 0
                });
            });
        });
    }
    if ($('.style-switcher-open-loader').length) {
        $('.style-switcher-open-loader').on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            $this.addClass('style-switcher-open-loader-loading');
            var basePath = $(this).data('base-path'),
                skinSrc = $(this).data('skin-src');
            var script1 = document.createElement("script");
            script1.src = basePath + "master/style-switcher/style.switcher.localstorage.js";
            var script2 = document.createElement("script");
            script2.src = basePath + "master/style-switcher/style.switcher.js";
            script2.id = "styleSwitcherScript";
            script2.setAttribute('data-base-path', basePath);
            script2.setAttribute('data-skin-src', skinSrc);
            script2.onload = function() {
                setTimeout(function() {
                    function checkIfReady() {
                        if (!$('.style-switcher-open').length) {
                            window.setTimeout(checkIfReady, 100);
                        } else {
                            $('.style-switcher-open').trigger('click');
                        }
                    }
                    checkIfReady();
                }, 500);
            }
            document.body.appendChild(script1);
            document.body.appendChild(script2);
        });
    }
    try {
        if (window.location !== window.parent.location) {
            $(window).on('load', function() {
                $el = $('<a />').addClass('remove-envato-frame').attr({
                    'href': window.location.href,
                    'target': '_parent'
                }).text('Remove Frame');
                $('body').append($el);
            });
        }
    } catch (e) {
        console.log(e);
    }
})(jQuery);

function scrollAndFocus($this, scrollTarget, focusTarget, scrollOffset, scrollAgain) {
    (function($) {
        $('body').addClass('scrolling');
        if ($($this).closest('#mainNav').length) {
            $($this).parents('.collapse.show').collapse('hide');
        }
        $('html, body').animate({
            scrollTop: $(scrollTarget).offset().top - (scrollOffset ? scrollOffset : 0)
        }, 300, function() {
            $('body').removeClass('scrolling');
            setTimeout(function() {
                $(focusTarget).focus();
            }, 500);
            if (scrollAgain) {
                $('html, body').animate({
                    scrollTop: $(scrollTarget).offset().top - (scrollOffset ? scrollOffset : 0)
                });
            }
        });
    })(jQuery);
}

function aspectRatioSVG() {
    if ($(window).width() < 1950) {
        $('.shape-divider svg[preserveAspectRatio]').each(function() {
            if (!$(this).parent().hasClass('shape-divider-horizontal-animation')) {
                $(this).attr('preserveAspectRatio', 'xMinYMin');
            } else {
                $(this).attr('preserveAspectRatio', 'none');
            }
        });
    } else {
        $('.shape-divider svg[preserveAspectRatio]').each(function() {
            $(this).attr('preserveAspectRatio', 'none');
        });
    }
}
document.addEventListener('lazybeforeunveil', function(e) {
    var bg = e.target.getAttribute('data-bg-src');
    if (bg) {
        e.target.style.backgroundImage = 'url(' + bg + ')';
    }
});
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    var CountTo = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, CountTo.DEFAULTS, this.dataOptions(), options);
        this.init();
    };
    CountTo.DEFAULTS = {
        from: 0,
        to: 0,
        speed: 1000,
        refreshInterval: 100,
        decimals: 0,
        formatter: formatter,
        onUpdate: null,
        onComplete: null
    };
    CountTo.prototype.init = function() {
        this.value = this.options.from;
        this.loops = Math.ceil(this.options.speed / this.options.refreshInterval);
        this.loopCount = 0;
        this.increment = (this.options.to - this.options.from) / this.loops;
    };
    CountTo.prototype.dataOptions = function() {
        var options = {
            from: this.$element.data('from'),
            to: this.$element.data('to'),
            speed: this.$element.data('speed'),
            refreshInterval: this.$element.data('refresh-interval'),
            decimals: this.$element.data('decimals')
        };
        var keys = Object.keys(options);
        for (var i in keys) {
            var key = keys[i];
            if (typeof(options[key]) === 'undefined') {
                delete options[key];
            }
        }
        return options;
    };
    CountTo.prototype.update = function() {
        this.value += this.increment;
        this.loopCount++;
        this.render();
        if (typeof(this.options.onUpdate) == 'function') {
            this.options.onUpdate.call(this.$element, this.value);
        }
        if (this.loopCount >= this.loops) {
            clearInterval(this.interval);
            this.value = this.options.to;
            if (typeof(this.options.onComplete) == 'function') {
                this.options.onComplete.call(this.$element, this.value);
            }
        }
    };
    CountTo.prototype.render = function() {
        var formattedValue = this.options.formatter.call(this.$element, this.value, this.options);
        this.$element.text(formattedValue);
    };
    CountTo.prototype.restart = function() {
        this.stop();
        this.init();
        this.start();
    };
    CountTo.prototype.start = function() {
        this.stop();
        this.render();
        this.interval = setInterval(this.update.bind(this), this.options.refreshInterval);
    };
    CountTo.prototype.stop = function() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    CountTo.prototype.toggle = function() {
        if (this.interval) {
            this.stop();
        } else {
            this.start();
        }
    };

    function formatter(value, options) {
        return value.toFixed(options.decimals);
    }
    $.fn.countTo = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('countTo');
            var init = !data || typeof(option) === 'object';
            var options = typeof(option) === 'object' ? option : {};
            var method = typeof(option) === 'string' ? option : 'start';
            if (init) {
                if (data) data.stop();
                $this.data('countTo', data = new CountTo(this, options));
            }
            data[method].call(data);
        });
    };
}));
(function($) {
    $.fn.visible = function(partial, hidden, direction, container) {
        if (this.length < 1)
            return;
        var $t = this.length > 1 ? this.eq(0) : this,
            isContained = typeof container !== 'undefined' && container !== null,
            $w = isContained ? $(container) : $(window),
            wPosition = isContained ? $w.position() : 0,
            t = $t.get(0),
            vpWidth = $w.outerWidth(),
            vpHeight = $w.outerHeight(),
            direction = (direction) ? direction : 'both',
            clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;
        if (typeof t.getBoundingClientRect === 'function') {
            var rec = t.getBoundingClientRect(),
                tViz = isContained ? rec.top - wPosition.top >= 0 && rec.top < vpHeight + wPosition.top : rec.top >= 0 && rec.top < vpHeight,
                bViz = isContained ? rec.bottom - wPosition.top > 0 && rec.bottom <= vpHeight + wPosition.top : rec.bottom > 0 && rec.bottom <= vpHeight,
                lViz = isContained ? rec.left - wPosition.left >= 0 && rec.left < vpWidth + wPosition.left : rec.left >= 0 && rec.left < vpWidth,
                rViz = isContained ? rec.right - wPosition.left > 0 && rec.right < vpWidth + wPosition.left : rec.right > 0 && rec.right <= vpWidth,
                vVisible = partial ? tViz || bViz : tViz && bViz,
                hVisible = partial ? lViz || rViz : lViz && rViz;
            if (direction === 'both')
                return clientSize && vVisible && hVisible;
            else if (direction === 'vertical')
                return clientSize && vVisible;
            else if (direction === 'horizontal')
                return clientSize && hVisible;
        } else {
            var viewTop = isContained ? 0 : wPosition,
                viewBottom = viewTop + vpHeight,
                viewLeft = $w.scrollLeft(),
                viewRight = viewLeft + vpWidth,
                position = $t.position(),
                _top = position.top,
                _bottom = _top + $t.height(),
                _left = position.left,
                _right = _left + $t.width(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom,
                compareLeft = partial === true ? _right : _left,
                compareRight = partial === true ? _left : _right;
            if (direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if (direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if (direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };
})(jQuery);;
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function($) {
    var _previousResizeWidth = -1,
        _updateTimeout = -1;
    var _parse = function(value) {
        return parseFloat(value) || 0;
    };
    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];
        $elements.each(function() {
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;
            if (lastRow === null) {
                rows.push($that);
            } else {
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    rows.push($that);
                }
            }
            lastTop = top;
        });
        return rows;
    };
    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };
        if (typeof options === 'object') {
            return $.extend(opts, options);
        }
        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }
        return opts;
    };
    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);
        if (opts.remove) {
            var that = this;
            this.css(opts.property, '');
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });
            return this;
        }
        if (this.length <= 1 && !opts.target) {
            return this;
        }
        matchHeight._groups.push({
            elements: this,
            options: opts
        });
        matchHeight._apply(this, opts);
        return this;
    };
    matchHeight.version = '0.7.2';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;
    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);
        var $hiddenParents = $elements.parents().filter(':hidden');
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });
        $hiddenParents.css('display', 'block');
        if (opts.byRow && !opts.target) {
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display');
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }
                $that.data('style-cache', $that.attr('style'));
                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });
            rows = _rows($elements);
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }
        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = 0;
            if (!opts.target) {
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }
                $row.each(function() {
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }
                    var css = {
                        'display': display
                    };
                    css[opts.property] = '';
                    $that.css(css);
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                targetHeight = opts.target.outerHeight(false);
            }
            $row.each(function() {
                var $that = $(this),
                    verticalPadding = 0;
                if (opts.target && $that.is(opts.target)) {
                    return;
                }
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }
        return this;
    };
    matchHeight._applyDataApi = function() {
        var groups = {};
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');
            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };
    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }
        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });
        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };
    matchHeight._update = function(throttle, event) {
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };
    $(matchHeight._applyDataApi);
    var on = $.fn.on ? 'on' : 'bind';
    $(window)[on]('load', function(event) {
        matchHeight._update(false, event);
    });
    $(window)[on]('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });
});
/*! waitForImages jQuery Plugin - v2.4.0 - 2018-02-13
 * https://github.com/alexanderdickson/waitForImages
 * Copyright (c) 2018 Alex Dickson; Licensed MIT */
;
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    var eventNamespace = 'waitForImages';
    var hasSrcset = (function(img) {
        return img.srcset && img.sizes;
    })(new Image());
    $.waitForImages = {
        hasImageProperties: ['backgroundImage', 'listStyleImage', 'borderImage', 'borderCornerImage', 'cursor'],
        hasImageAttributes: ['srcset']
    };
    $.expr.pseudos['has-src'] = function(obj) {
        return $(obj).is('img[src][src!=""]');
    };
    $.expr.pseudos.uncached = function(obj) {
        if (!$(obj).is(':has-src')) {
            return false;
        }
        return !obj.complete;
    };
    $.fn.waitForImages = function() {
        var allImgsLength = 0;
        var allImgsLoaded = 0;
        var deferred = $.Deferred();
        var originalCollection = this;
        var allImgs = [];
        var hasImgProperties = $.waitForImages.hasImageProperties || [];
        var hasImageAttributes = $.waitForImages.hasImageAttributes || [];
        var matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
        var finishedCallback;
        var eachCallback;
        var waitForAll;
        if ($.isPlainObject(arguments[0])) {
            waitForAll = arguments[0].waitForAll;
            eachCallback = arguments[0].each;
            finishedCallback = arguments[0].finished;
        } else {
            if (arguments.length === 1 && $.type(arguments[0]) === 'boolean') {
                waitForAll = arguments[0];
            } else {
                finishedCallback = arguments[0];
                eachCallback = arguments[1];
                waitForAll = arguments[2];
            }
        }
        finishedCallback = finishedCallback || $.noop;
        eachCallback = eachCallback || $.noop;
        waitForAll = !!waitForAll;
        if (!$.isFunction(finishedCallback) || !$.isFunction(eachCallback)) {
            throw new TypeError('An invalid callback was supplied.');
        }
        this.each(function() {
            var obj = $(this);
            if (waitForAll) {
                obj.find('*').addBack().each(function() {
                    var element = $(this);
                    if (element.is('img:has-src') && !element.is('[srcset]')) {
                        allImgs.push({
                            src: element.attr('src'),
                            element: element[0]
                        });
                    }
                    $.each(hasImgProperties, function(i, property) {
                        var propertyValue = element.css(property);
                        var match;
                        if (!propertyValue) {
                            return true;
                        }
                        while (match = matchUrl.exec(propertyValue)) {
                            allImgs.push({
                                src: match[2],
                                element: element[0]
                            });
                        }
                    });
                    $.each(hasImageAttributes, function(i, attribute) {
                        var attributeValue = element.attr(attribute);
                        var attributeValues;
                        if (!attributeValue) {
                            return true;
                        }
                        allImgs.push({
                            src: element.attr('src'),
                            srcset: element.attr('srcset'),
                            element: element[0]
                        });
                    });
                });
            } else {
                obj.find('img:has-src').each(function() {
                    allImgs.push({
                        src: this.src,
                        element: this
                    });
                });
            }
        });
        allImgsLength = allImgs.length;
        allImgsLoaded = 0;
        if (allImgsLength === 0) {
            finishedCallback.call(originalCollection);
            deferred.resolveWith(originalCollection);
        }
        $.each(allImgs, function(i, img) {
            var image = new Image();
            var events = 'load.' + eventNamespace + ' error.' + eventNamespace;
            $(image).one(events, function me(event) {
                var eachArguments = [allImgsLoaded, allImgsLength, event.type == 'load'];
                allImgsLoaded++;
                eachCallback.apply(img.element, eachArguments);
                deferred.notifyWith(img.element, eachArguments);
                $(this).off(events, me);
                if (allImgsLoaded == allImgsLength) {
                    finishedCallback.call(originalCollection[0]);
                    deferred.resolveWith(originalCollection[0]);
                    return false;
                }
            });
            if (hasSrcset && img.srcset) {
                image.srcset = img.srcset;
                image.sizes = img.sizes;
            }
            image.src = img.src;
        });
        return deferred.promise();
    };
}));
(function(w, $) {
    fontSpy = function(fontName, conf) {
        var $html = $('html'),
            $body = $('body'),
            fontFamilyName = fontName;
        if (typeof fontFamilyName !== 'string' || fontFamilyName === '') {
            throw 'A valid fontName is required. fontName must be a string and must not be an empty string.';
        }
        var defaults = {
            font: fontFamilyName,
            fontClass: fontFamilyName.toLowerCase().replace(/\s/g, ''),
            success: function() {},
            failure: function() {},
            testFont: 'Courier New',
            testString: 'QW@HhsXJ',
            glyphs: '',
            delay: 50,
            timeOut: 1000,
            callback: $.noop
        };
        var config = $.extend(defaults, conf);
        var $tester = $('<span>' + config.testString + config.glyphs + '</span>').css('position', 'absolute').css('top', '-9999px').css('left', '-9999px').css('visibility', 'hidden').css('fontFamily', config.testFont).css('fontSize', '250px');
        $body.append($tester);
        var fallbackFontWidth = $tester.outerWidth();
        $tester.css('fontFamily', config.font + ',' + config.testFont);
        var failure = function() {
            $html.addClass("no-" + config.fontClass);
            if (config && config.failure) {
                config.failure();
            }
            config.callback(new Error('FontSpy timeout'));
            $tester.remove();
        };
        var success = function() {
            config.callback();
            $html.addClass(config.fontClass);
            if (config && config.success) {
                config.success();
            }
            $tester.remove();
        };
        var retry = function() {
            setTimeout(checkFont, config.delay);
            config.timeOut = config.timeOut - config.delay;
        };
        var checkFont = function() {
            var loadedFontWidth = $tester.outerWidth();
            if (fallbackFontWidth !== loadedFontWidth) {
                success();
            } else if (config.timeOut < 0) {
                failure();
            } else {
                retry();
            }
        }
        checkFont();
    }
})(this, jQuery);
(function($) {
    "use strict";
    $.fn.pin = function(options) {
        var scrollY = 0,
            elements = [],
            disabled = false,
            $window = $(window);
        options = options || {};
        var recalculateLimits = function() {
            for (var i = 0, len = elements.length; i < len; i++) {
                var $this = elements[i];
                if (options.minWidth && $window.width() <= options.minWidth) {
                    if ($this.parent().is(".pin-wrapper")) {
                        $this.unwrap();
                    }
                    $this.css({
                        width: "",
                        left: "",
                        top: "",
                        position: ""
                    });
                    if (options.activeClass) {
                        $this.removeClass(options.activeClass);
                    }
                    disabled = true;
                    continue;
                } else {
                    disabled = false;
                }
                var $container = options.containerSelector ? $this.closest(options.containerSelector) : $(document.body);
                var offset = $this.offset();
                var containerOffset = $container.offset();
                var parentOffset = $this.parent().offset();
                if (!$this.parent().is(".pin-wrapper")) {
                    $this.wrap("<div class='pin-wrapper'>");
                }
                var pad = $.extend({
                    top: 0,
                    bottom: 0
                }, options.padding || {});
                $this.data("pin", {
                    pad: pad,
                    from: (options.containerSelector ? containerOffset.top : offset.top) - pad.top,
                    to: containerOffset.top + $container.height() - $this.outerHeight() - pad.bottom,
                    end: containerOffset.top + $container.height(),
                    parentTop: parentOffset.top
                });
                $this.css({
                    width: $this.outerWidth()
                });
                $this.parent().css("height", $this.outerHeight());
            }
        };
        var onScroll = function() {
            if (disabled) {
                return;
            }
            scrollY = $window.scrollTop();
            var elmts = [];
            for (var i = 0, len = elements.length; i < len; i++) {
                var $this = $(elements[i]),
                    data = $this.data("pin");
                if (!data) {
                    continue;
                }
                elmts.push($this);
                var from = data.from - data.pad.bottom,
                    to = data.to - data.pad.top;
                if (from + $this.outerHeight() > data.end) {
                    $this.css('position', '');
                    continue;
                }
                if (from < scrollY && to > scrollY) {
                    !($this.css("position") == "fixed") && $this.css({
                        left: $this.offset().left,
                        top: data.pad.top
                    }).css("position", "fixed");
                    if (options.activeClass) {
                        $this.addClass(options.activeClass);
                    }
                } else if (scrollY >= to) {
                    $this.css({
                        left: "",
                        top: to - data.parentTop + data.pad.top
                    }).css("position", "absolute");
                    if (options.activeClass) {
                        $this.addClass(options.activeClass);
                    }
                } else {
                    $this.css({
                        position: "",
                        top: "",
                        left: ""
                    });
                    if (options.activeClass) {
                        $this.removeClass(options.activeClass);
                    }
                }
            }
            elements = elmts;
        };
        var update = function() {
            recalculateLimits();
            onScroll();
        };
        this.each(function() {
            var $this = $(this),
                data = $(this).data('pin') || {};
            if (data && data.update) {
                return;
            }
            elements.push($this);
            $("img", this).one("load", recalculateLimits);
            data.update = update;
            $(this).data('pin', data);
        });
        $window.scroll(onScroll);
        $window.resize(function() {
            recalculateLimits();
        });
        recalculateLimits();
        $window.on('load', update);
        return this;
    };
})(jQuery);
(function($) {
    "use strict";
    var defaults = {
        action: function() {},
        runOnLoad: false,
        duration: 500
    };
    var settings = defaults,
        running = false,
        start;
    var methods = {};
    methods.init = function() {
        for (var i = 0; i <= arguments.length; i++) {
            var arg = arguments[i];
            switch (typeof arg) {
                case "function":
                    settings.action = arg;
                    break;
                case "boolean":
                    settings.runOnLoad = arg;
                    break;
                case "number":
                    settings.duration = arg;
                    break;
            }
        }
        return this.each(function() {
            if (settings.runOnLoad) {
                settings.action();
            }
            $(this).resize(function() {
                methods.timedAction.call(this);
            });
        });
    };
    methods.timedAction = function(code, millisec) {
        var doAction = function() {
            var remaining = settings.duration;
            if (running) {
                var elapse = new Date() - start;
                remaining = settings.duration - elapse;
                if (remaining <= 0) {
                    clearTimeout(running);
                    running = false;
                    settings.action();
                    return;
                }
            }
            wait(remaining);
        };
        var wait = function(time) {
            running = setTimeout(doAction, time);
        };
        start = new Date();
        if (typeof millisec === 'number') {
            settings.duration = millisec;
        }
        if (typeof code === 'function') {
            settings.action = code;
        }
        if (!running) {
            doAction();
        }
    };
    $.fn.afterResize = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.init.apply(this, arguments);
        }
    };
})(jQuery);
jQuery(document).ready(function($) {
    var animationDelay = 2500,
        barAnimationDelay = 3800,
        barWaiting = barAnimationDelay - 3000,
        lettersDelay = 50,
        typeLettersDelay = 150,
        selectionDuration = 500,
        typeAnimationDelay = selectionDuration + 800,
        revealDuration = 600,
        revealAnimationDelay = 1500;
    initHeadline();

    function initHeadline() {
        animateHeadline('.word-rotator', '.word-rotator.letters');
    }

    function animateHeadline($selector) {
        var duration = animationDelay;
        theme.fn.intObs($selector, function() {
            if ($(this).hasClass('letters')) {
                $(this).find('b').each(function() {
                    var word = $(this),
                        letters = word.text().split(''),
                        selected = word.hasClass('is-visible');
                    for (i in letters) {
                        if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                        letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
                    }
                    var newLetters = letters.join('');
                    word.html(newLetters).css('opacity', 1);
                });
            }
            var headline = $(this);
            if (headline.hasClass('loading-bar')) {
                duration = barAnimationDelay;
                setTimeout(function() {
                    headline.find('.word-rotator-words').addClass('is-loading')
                }, barWaiting);
            } else if (headline.hasClass('clip')) {
                var spanWrapper = headline.find('.word-rotator-words'),
                    newWidth = spanWrapper.outerWidth() + 10
                spanWrapper.css('width', newWidth);
            } else if (!headline.hasClass('type')) {
                var words = headline.find('.word-rotator-words b'),
                    width = 0;
                words.each(function() {
                    var wordWidth = $(this).outerWidth();
                    if (wordWidth > width) width = wordWidth;
                });
                headline.find('.word-rotator-words').css('width', width);
            };
            setTimeout(function() {
                hideWord(headline.find('.is-visible').eq(0))
            }, duration);
        }, {});
    }

    function hideWord($word) {
        var nextWord = takeNext($word);
        if ($word.parents('.word-rotator').hasClass('type')) {
            var parentSpan = $word.parent('.word-rotator-words');
            parentSpan.addClass('selected').removeClass('waiting');
            setTimeout(function() {
                parentSpan.removeClass('selected');
                $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
            }, selectionDuration);
            setTimeout(function() {
                showWord(nextWord, typeLettersDelay)
            }, typeAnimationDelay);
        } else if ($word.parents('.word-rotator').hasClass('letters')) {
            var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
            hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
            showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
        } else if ($word.parents('.word-rotator').hasClass('clip')) {
            $word.parents('.word-rotator-words').stop(true, true).animate({
                width: '2px'
            }, revealDuration, function() {
                switchWord($word, nextWord);
                showWord(nextWord);
            });
        } else if ($word.parents('.word-rotator').hasClass('loading-bar')) {
            $word.parents('.word-rotator-words').removeClass('is-loading');
            switchWord($word, nextWord);
            setTimeout(function() {
                hideWord(nextWord)
            }, barAnimationDelay);
            setTimeout(function() {
                $word.parents('.word-rotator-words').addClass('is-loading')
            }, barWaiting);
        } else {
            switchWord($word, nextWord);
            setTimeout(function() {
                hideWord(nextWord)
            }, animationDelay);
        }
    }

    function showWord($word, $duration) {
        if ($word.parents('.word-rotator').hasClass('type')) {
            showLetter($word.find('i').eq(0), $word, false, $duration);
            $word.addClass('is-visible').removeClass('is-hidden');
        } else if ($word.parents('.word-rotator').hasClass('clip')) {
            if (document.hasFocus()) {
                $word.parents('.word-rotator-words').stop(true, true).animate({
                    'width': $word.outerWidth() + 10
                }, revealDuration, function() {
                    setTimeout(function() {
                        hideWord($word)
                    }, revealAnimationDelay);
                });
            } else {
                $word.parents('.word-rotator-words').stop(true, true).animate({
                    width: $word.outerWidth() + 10
                });
                setTimeout(function() {
                    hideWord($word)
                }, revealAnimationDelay);
            }
        }
    }

    function hideLetter($letter, $word, $bool, $duration) {
        $letter.removeClass('in').addClass('out');
        if (!$letter.is(':last-child')) {
            setTimeout(function() {
                hideLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else if ($bool) {
            setTimeout(function() {
                hideWord(takeNext($word))
            }, animationDelay);
        }
        if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
            var nextWord = takeNext($word);
            switchWord($word, nextWord);
        }
    }

    function showLetter($letter, $word, $bool, $duration) {
        $letter.addClass('in').removeClass('out');
        if (!$letter.is(':last-child')) {
            setTimeout(function() {
                showLetter($letter.next(), $word, $bool, $duration);
            }, $duration);
        } else {
            if ($word.parents('.word-rotator').hasClass('type')) {
                setTimeout(function() {
                    $word.parents('.word-rotator-words').addClass('waiting');
                }, 200);
            }
            if (!$bool) {
                setTimeout(function() {
                    hideWord($word)
                }, animationDelay)
            }
            if (!$word.closest('.word-rotator').hasClass('type')) {
                $word.closest('.word-rotator-words').stop(true, true).animate({
                    width: $word.outerWidth()
                });
            }
        }
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
        if (!$newWord.closest('.word-rotator').hasClass('clip')) {
            var space = 0,
                delay = ($newWord.outerWidth() > $oldWord.outerWidth()) ? 0 : 600;
            if ($newWord.closest('.word-rotator').hasClass('loading-bar') || $newWord.closest('.word-rotator').hasClass('slide')) {
                space = 3;
                delay = 0;
            }
            setTimeout(function() {
                $newWord.closest('.word-rotator-words').stop(true, true).animate({
                    width: $newWord.outerWidth() + space
                });
            }, delay);
        }
    }
});
(function($) {
    $.fn.hover3d = function(options) {
        var settings = $.extend({
            selector: null,
            perspective: 1000,
            sensitivity: 20,
            invert: false,
            shine: false,
            hoverInClass: "hover-in",
            hoverOutClass: "hover-out",
            hoverClass: "hover-3d"
        }, options);
        return this.each(function() {
            var $this = $(this),
                $card = $this.find(settings.selector);
            currentX = 0;
            currentY = 0;
            if (settings.shine) {
                $card.append('<div class="shine"></div>');
            }
            var $shine = $(this).find(".shine");
            $this.css({
                perspective: settings.perspective + "px",
                transformStyle: "preserve-3d"
            });
            $card.css({
                perspective: settings.perspective + "px",
                transformStyle: "preserve-3d",
            });
            $shine.css({
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                transform: 'translateZ(1px)',
                "z-index": 9
            });

            function enter(event) {
                $card.addClass(settings.hoverInClass + " " + settings.hoverClass);
                currentX = currentY = 0;
                setTimeout(function() {
                    $card.removeClass(settings.hoverInClass);
                }, 1000);
            }

            function move(event) {
                var w = $card.innerWidth(),
                    h = $card.innerHeight(),
                    currentX = Math.round(event.pageX - $card.offset().left),
                    currentY = Math.round(event.pageY - $card.offset().top),
                    ax = settings.invert ? (w / 2 - currentX) / settings.sensitivity : -(w / 2 - currentX) / settings.sensitivity,
                    ay = settings.invert ? -(h / 2 - currentY) / settings.sensitivity : (h / 2 - currentY) / settings.sensitivity,
                    dx = currentX - w / 2,
                    dy = currentY - h / 2,
                    theta = Math.atan2(dy, dx),
                    angle = theta * 180 / Math.PI - 90;
                if (angle < 0) {
                    angle = angle + 360;
                }
                $card.css({
                    perspective: settings.perspective + "px",
                    transformStyle: "preserve-3d",
                    transform: "rotateY(" + ax + "deg) rotateX(" + ay + "deg)"
                });
                $shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + event.offsetY / h * .5 + ') 0%,rgba(255,255,255,0) 80%)');
            }

            function leave() {
                $card.addClass(settings.hoverOutClass + " " + settings.hoverClass);
                $card.css({
                    perspective: settings.perspective + "px",
                    transformStyle: "preserve-3d",
                    transform: "rotateX(0) rotateY(0)"
                });
                setTimeout(function() {
                    $card.removeClass(settings.hoverOutClass + " " + settings.hoverClass);
                    currentX = currentY = 0;
                }, 1000);
            }
            $this.on("mouseenter", function() {
                return enter();
            });
            $this.on("mousemove", function(event) {
                return move(event);
            });
            $this.on("mouseleave", function() {
                return leave();
            });
        });
    };
}(jQuery));
(function($) {
    if ($.isFunction($.fn['hover3d']) && $('.hover-effect-3d').length) {
        theme.fn.execOnceTroughEvent('.hover-effect-3d', 'mouseover.trigger.hover3d', function() {
            $(this).each(function() {
                var $this = $(this);
                $this.hover3d({
                    selector: ".thumb-info"
                });
            });
        });
    }
}).apply(this, [jQuery]);
if ($('[data-title-border]').length) {
    var $pageHeaderTitleBorder = $('<span class="page-header-title-border"></span>'),
        $pageHeaderTitle = $('[data-title-border]'),
        $window = $(window);
    $pageHeaderTitle.before($pageHeaderTitleBorder);
    var setPageHeaderTitleBorderWidth = function() {
        $pageHeaderTitleBorder.width($pageHeaderTitle.width());
    }
    $window.afterResize(function() {
        setPageHeaderTitleBorderWidth();
    });
    setPageHeaderTitleBorderWidth();
    $pageHeaderTitleBorder.addClass('visible');
}
(function($) {
    var $footerReveal = {
        $wrapper: $('.footer-reveal'),
        init: function() {
            var self = this;
            self.build();
            self.events();
        },
        build: function() {
            var self = this,
                footer_height = self.$wrapper.outerHeight(true),
                window_height = ($(window).height() - $('.header-body').height());
            if (footer_height > window_height) {
                $('#footer').removeClass('footer-reveal');
                $('body').css('margin-bottom', 0);
            } else {
                $('#footer').addClass('footer-reveal');
                $('body').css('margin-bottom', footer_height);
            }
        },
        events: function() {
            var self = this,
                $window = $(window);
            $window.on('load', function() {
                $window.afterResize(function() {
                    self.build();
                });
            });
        }
    }
    if ($('.footer-reveal').length) {
        $footerReveal.init();
    }
})(jQuery);
if ($('[data-reinit-plugin]').length) {
    $('[data-reinit-plugin]').on('click', function(e) {
        e.preventDefault();
        var pluginInstance = $(this).data('reinit-plugin'),
            pluginFunction = $(this).data('reinit-plugin-function'),
            pluginElement = $(this).data('reinit-plugin-element'),
            pluginOptions = theme.fn.getOptions($(this).data('reinit-plugin-options'));
        $(pluginElement).data(pluginInstance).destroy();
        setTimeout(function() {
            theme.fn.execPluginFunction(pluginFunction, $(pluginElement), pluginOptions);
        }, 1000);
    });
}
if ($('[data-copy-to-clipboard]').length) {
    theme.fn.intObs('[data-copy-to-clipboard]', function() {
        var $this = $(this);
        $this.wrap('<div class="copy-to-clipboard-wrapper position-relative"></div>');
        var $copyButton = $('<a href="#" class="btn btn-primary btn-px-2 py-1 text-0 position-absolute top-8 right-8">COPY</a>');
        $this.parent().prepend($copyButton);
        $copyButton.on('click', function(e) {
            e.preventDefault();
            var $btn = $(this),
                $temp = $('<textarea class="d-block opacity-0" style="height: 0;">');
            $btn.parent().append($temp);
            $temp.val($this.text());
            $temp[0].select();
            $temp[0].setSelectionRange(0, 99999);
            document.execCommand("copy");
            $btn.addClass('copied');
            setTimeout(function() {
                $btn.removeClass('copied');
            }, 1000);
            $temp.remove();
        });
    }, {
        rootMargin: '0px 0px 0px 0px'
    });
}
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__animate';
    var PluginAnimate = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginAnimate.defaults = {
        accX: 0,
        accY: -80,
        delay: 100,
        duration: '750ms',
        minWindowWidth: 0,
        forceAnimation: false
    };
    PluginAnimate.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginAnimate.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this;
            if ($('body').hasClass('loading-overlay-showing')) {
                $(window).on('loading.overlay.ready', function() {
                    self.animate();
                });
            } else {
                self.animate();
            }
            return this;
        },
        animate: function() {
            var self = this,
                $el = this.options.wrapper,
                delay = 0,
                duration = this.options.duration,
                elTopDistance = $el.offset().top,
                windowTopDistance = $(window).scrollTop();
            if ($el.data('appear-animation-svg')) {
                $el.find('[data-appear-animation]').each(function() {
                    var $this = $(this),
                        opts;
                    var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
                    if (pluginOptions)
                        opts = pluginOptions;
                    $this.themePluginAnimate(opts);
                });
                return this;
            }
            if (self.options.firstLoadNoAnim) {
                $el.removeClass('appear-animation');
                if ($el.closest('.owl-carousel').get(0)) {
                    setTimeout(function() {
                        $el.closest('.owl-carousel').on('change.owl.carousel', function() {
                            self.options.firstLoadNoAnim = false;
                            $el.removeData('__animate');
                            $el.themePluginAnimate(self.options);
                        });
                    }, 500);
                }
                return this;
            }
            $el.addClass('appear-animation animated');
            if (!$('html').hasClass('no-csstransitions') && $(window).width() > self.options.minWindowWidth && elTopDistance >= windowTopDistance || self.options.forceAnimation == true) {
                delay = ($el.attr('data-appear-animation-delay') ? $el.attr('data-appear-animation-delay') : self.options.delay);
                duration = ($el.attr('data-appear-animation-duration') ? $el.attr('data-appear-animation-duration') : self.options.duration);
                if (duration != '750ms') {
                    $el.css('animation-duration', duration);
                }
                $el.css('animation-delay', delay + 'ms');
                $el.addClass($el.attr('data-appear-animation') + ' appear-animation-visible');
                $el.trigger('animation:show');
            } else {
                $el.addClass('appear-animation-visible');
            }
            return this;
        }
    };
    $.extend(theme, {
        PluginAnimate: PluginAnimate
    });
    $.fn.themePluginAnimate = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginAnimate($this, opts);
            }
        });
    };
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__animatedLetters';
    var PluginAnimatedLetters = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginAnimatedLetters.defaults = {
        animationName: 'fadeIn',
        animationSpeed: 50,
        startDelay: 500,
        minWindowWidth: 768,
        letterClass: ''
    };
    PluginAnimatedLetters.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            var self = this;
            this.$el = $el;
            this.initialText = $el.text();
            this.setData().setOptions(opts).build().events();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginAnimatedLetters.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this,
                letters = self.$el.text().split('');
            if ($(window).width() < self.options.minWindowWidth) {
                return this;
            }
            if (self.options.firstLoadNoAnim) {
                self.$el.css({
                    visibility: 'visible'
                });
                if (self.$el.closest('.owl-carousel').get(0)) {
                    setTimeout(function() {
                        self.$el.closest('.owl-carousel').on('change.owl.carousel', function() {
                            self.options.firstLoadNoAnim = false;
                            self.build();
                        });
                    }, 500);
                }
                return this;
            }
            self.$el.addClass('initialized');
            self.setMinHeight();
            self.$el.text('');
            setTimeout(function() {
                for (var i = 0; i < letters.length; i++) {
                    var letter = letters[i];
                    self.$el.append('<span class="letter ' + (self.options.letterClass ? self.options.letterClass + ' ' : '') + self.options.animationName + ' animated" style="animation-delay: ' + (i * self.options.animationSpeed) + 'ms;">' + letter + '</span>');
                }
            }, self.options.startDelay);
            return this;
        },
        setMinHeight: function() {
            var self = this;
            if (self.$el.closest('.owl-carousel').get(0)) {
                self.$el.closest('.owl-carousel').addClass('d-block');
                self.$el.css('min-height', self.$el.height());
                self.$el.closest('.owl-carousel').removeClass('d-block');
            } else {
                self.$el.css('min-height', self.$el.height());
            }
            return this;
        },
        destroy: function() {
            var self = this;
            self.$el.html(self.initialText).css('min-height', '');
            return this;
        },
        events: function() {
            var self = this;
            self.$el.on('animated.letters.destroy', function() {
                self.destroy();
            });
            self.$el.on('animated.letters.initialize', function() {
                self.build();
            });
            return this;
        }
    };
    $.extend(theme, {
        PluginAnimatedLetters: PluginAnimatedLetters
    });
    $.fn.themePluginAnimatedLetters = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginAnimatedLetters($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__beforeafter';
    var PluginBeforeAfter = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginBeforeAfter.defaults = {};
    PluginBeforeAfter.prototype = {
        initialize: function($el, opts) {
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginBeforeAfter.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.twentytwenty))) {
                return this;
            }
            var self = this;
            self.options.wrapper.twentytwenty(self.options);
            return this;
        }
    };
    $.extend(theme, {
        PluginBeforeAfter: PluginBeforeAfter
    });
    $.fn.themePluginBeforeAfter = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginBeforeAfter($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__carouselLight';
    var PluginCarouselLight = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginCarouselLight.defaults = {
        autoplay: true,
        autoplayTimeout: 7000,
        disableAutoPlayOnClick: true
    };
    PluginCarouselLight.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.clickFlag = true;
            this.setData().setOptions(opts).build().owlNav().owlDots().autoPlay().events();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginCarouselLight.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this;
            self.$el.css('opacity', 1).find('.owl-item:first-child').addClass('active');
            self.$el.trigger('initialized.owl.carousel');
            self.carouselNavigate();
            return this;
        },
        changeSlide: function($nextSlide) {
            var self = this,
                $prevSlide = self.$el.find('.owl-item.active');
            self.$el.find('.owl-item.active').addClass('removing');
            $prevSlide.removeClass('fadeIn').addClass('fadeOut animated');
            setTimeout(function() {
                setTimeout(function() {
                    $prevSlide.removeClass('active');
                }, 400);
                $nextSlide.addClass('active').removeClass('fadeOut').addClass('fadeIn animated');
            }, 200);
            self.$el.find('.owl-dot').removeClass('active').eq($nextSlide.index()).addClass('active');
            self.$el.trigger({
                type: 'change.owl.carousel',
                nextSlideIndex: $nextSlide.index(),
                prevSlideIndex: $prevSlide.index()
            });
            setTimeout(function() {
                self.$el.trigger({
                    type: 'changed.owl.carousel',
                    nextSlideIndex: $nextSlide.index(),
                    prevSlideIndex: $prevSlide.index()
                });
            }, 500);
        },
        owlNav: function() {
            var self = this,
                $owlNext = self.$el.find('.owl-next'),
                $owlPrev = self.$el.find('.owl-prev');
            $owlPrev.on('click', function(e) {
                e.preventDefault();
                if (self.options.disableAutoPlayOnClick) {
                    window.clearInterval(self.autoPlayInterval);
                }
                if (self.avoidMultipleClicks()) {
                    return false;
                }
                self.owlPrev();
            });
            $owlNext.on('click', function(e) {
                e.preventDefault();
                if (self.options.disableAutoPlayOnClick) {
                    window.clearInterval(self.autoPlayInterval);
                }
                if (self.avoidMultipleClicks()) {
                    return false;
                }
                self.owlNext();
            });
            return this;
        },
        owlDots: function() {
            var self = this,
                $owlDot = self.$el.find('.owl-dot');
            $owlDot.on('click', function(e) {
                e.preventDefault();
                if (self.options.disableAutoPlayOnClick) {
                    window.clearInterval(self.autoPlayInterval);
                }
                if (self.avoidMultipleClicks()) {
                    return false;
                }
                var dotIndex = $(this).index();
                self.changeSlide(self.$el.find('.owl-item').eq(dotIndex));
            });
            return this;
        },
        owlPrev: function() {
            var self = this;
            if (self.$el.find('.owl-item.active').prev().get(0)) {
                self.changeSlide(self.$el.find('.owl-item.active').prev());
            } else {
                self.changeSlide(self.$el.find('.owl-item:last-child'));
            }
        },
        owlNext: function() {
            var self = this;
            if (self.$el.find('.owl-item.active').next().get(0)) {
                self.changeSlide(self.$el.find('.owl-item.active').next());
            } else {
                self.changeSlide(self.$el.find('.owl-item').eq(0));
            }
        },
        avoidMultipleClicks: function() {
            var self = this;
            if (!self.clickFlag) {
                return true;
            }
            if (self.clickFlag) {
                self.clickFlag = false;
                setTimeout(function() {
                    self.clickFlag = true;
                }, 1000);
            }
            return false;
        },
        autoPlay: function() {
            var self = this,
                $el = this.options.wrapper;
            if (self.options.autoplay) {
                self.autoPlayInterval = window.setInterval(function() {
                    self.owlNext();
                }, self.options.autoplayTimeout);
            }
            return this;
        },
        carouselNavigate: function() {
            var self = this,
                $el = this.options.wrapper,
                $carousel = $el;
            if ($('[data-carousel-navigate]').get(0)) {
                $('[data-carousel-navigate-id="#' + $el.attr('id') + '"]').each(function() {
                    var $this = $(this),
                        hasCarousel = $($this.data('carousel-navigate-id')).get(0),
                        toIndex = $this.data('carousel-navigate-to');
                    if (hasCarousel) {
                        $this.on('click', function() {
                            self.changeSlide(self.$el.find('.owl-item').eq(parseInt(toIndex) - 1));
                        });
                    }
                });
                $el.on('change.owl.carousel', function(e) {
                    $('[data-carousel-navigate-id="#' + $el.attr('id') + '"]').removeClass('active');
                });
                $el.on('changed.owl.carousel', function(e) {
                    $('[data-carousel-navigate-id="#' + $el.attr('id') + '"][data-carousel-navigate-to="' + (e.nextSlideIndex + 1) + '"]').addClass('active');
                });
            }
            return this;
        },
        events: function() {
            var self = this;
            self.$el.on('change.owl.carousel', function(event) {
                self.$el.find('[data-appear-animation], [data-plugin-animated-letters]').addClass('d-none');
                self.$el.find('[data-plugin-animated-letters]').trigger('animated.letters.destroy');
                self.$el.find('.owl-item:not(.active) [data-carousel-onchange-show]').removeClass('d-none');
            });
            self.$el.on('changed.owl.carousel', function(event) {
                setTimeout(function() {
                    if (self.$el.find('.owl-item.cloned [data-appear-animation]').get(0)) {
                        self.$el.find('.owl-item.cloned [data-appear-animation]').each(function() {
                            var $this = $(this),
                                opts;
                            var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
                            if (pluginOptions)
                                opts = pluginOptions;
                            $this.themePluginAnimate(opts);
                        });
                    }
                    self.$el.find('.owl-item.active [data-appear-animation], [data-plugin-animated-letters]').removeClass('d-none');
                    self.$el.find('.owl-item.active [data-plugin-animated-letters]').trigger('animated.letters.initialize');
                    self.$el.find('.owl-item.cloned.active [data-plugin-video-background]').trigger('video.background.initialize');
                }, 500);
            });
        }
    };
    $.extend(theme, {
        PluginCarouselLight: PluginCarouselLight
    });
    $.fn.themePluginCarouselLight = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginCarouselLight($this, opts);
            }
        });
    };
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__carousel';
    var PluginCarousel = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginCarousel.defaults = {
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            479: {
                items: 1
            },
            768: {
                items: 2
            },
            979: {
                items: 3
            },
            1199: {
                items: 4
            }
        },
        navText: [],
        refresh: false
    };
    PluginCarousel.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            if ($el.find('[data-icon]').get(0)) {
                var self = this;
                $(window).on('icon.rendered', function() {
                    if ($el.data(instanceName)) {
                        return this;
                    }
                    setTimeout(function() {
                        self.setData().setOptions(opts).build();
                    }, 1000);
                });
                return this;
            }
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginCarousel.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.owlCarousel))) {
                return this;
            }
            var self = this,
                $el = this.options.wrapper;
            $el.addClass('owl-theme');
            $el.addClass('owl-loading');
            if ($('html').attr('dir') == 'rtl') {
                this.options = $.extend(true, {}, this.options, {
                    rtl: true
                });
            }
            if (this.options.items == 1) {
                this.options.responsive = {}
            }
            if (this.options.items > 4) {
                this.options = $.extend(true, {}, this.options, {
                    responsive: {
                        1199: {
                            items: this.options.items
                        }
                    }
                });
            }
            if (this.options.autoHeight) {
                var itemsHeight = [];
                $el.find('.owl-item').each(function() {
                    if ($(this).hasClass('active')) {
                        itemsHeight.push($(this).height());
                    }
                });
                $(window).afterResize(function() {
                    $el.find('.owl-stage-outer').height(Math.max.apply(null, itemsHeight));
                });
                $(window).on('load', function() {
                    $el.find('.owl-stage-outer').height(Math.max.apply(null, itemsHeight));
                });
            }
            $el.owlCarousel(this.options).addClass('owl-carousel-init animated fadeIn');
            setTimeout(function() {
                $el.removeClass('animated fadeIn');
            }, 1000);
            if ($el.closest('.owl-carousel-wrapper').get(0)) {
                setTimeout(function() {
                    $el.closest('.owl-carousel-wrapper').css({
                        height: ''
                    });
                }, 500);
            }
            if ($el.prev().hasClass('owl-carousel-loader')) {
                $el.prev().remove();
            }
            self.navigationOffsets();
            if ($el.hasClass('nav-outside')) {
                $(window).on('owl.carousel.nav.outside', function() {
                    if ($(window).width() < 992) {
                        self.options.stagePadding = 40;
                        $el.addClass('stage-margin');
                    } else {
                        self.options.stagePadding = 0;
                        $el.removeClass('stage-margin');
                    }
                    $el.owlCarousel('destroy').owlCarousel(self.options);
                    self.navigationOffsets();
                });
                $(window).on('load', function() {
                    $(window).afterResize(function() {
                        $(window).trigger('owl.carousel.nav.outside');
                    });
                });
                $(window).trigger('owl.carousel.nav.outside');
            }
            if ($el.hasClass('nav-svg-arrows-1')) {
                var svg_arrow = '' +
                    '<svg version="1.1" viewBox="0 0 15.698 8.706" width="17" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                    '<polygon stroke="#212121" stroke-width="0.1" fill="#212121" points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 "/>' +
                    '</svg>';
                $el.find('.owl-next, .owl-prev').append(svg_arrow);
            }
            if ($el.attr('data-sync')) {
                $el.on('change.owl.carousel', function(event) {
                    if (event.namespace && event.property.name === 'position') {
                        var target = event.relatedTarget.relative(event.property.value, true);
                        $($el.data('sync')).owlCarousel('to', target, 300, true);
                    }
                });
            }
            if ($el.hasClass('carousel-center-active-item')) {
                var itemsActive = $el.find('.owl-item.active'),
                    indexCenter = Math.floor(($el.find('.owl-item.active').length - 1) / 2),
                    itemCenter = itemsActive.eq(indexCenter);
                itemCenter.addClass('current');
                $el.on('change.owl.carousel', function(event) {
                    $el.find('.owl-item').removeClass('current');
                    setTimeout(function() {
                        var itemsActive = $el.find('.owl-item.active'),
                            indexCenter = Math.floor(($el.find('.owl-item.active').length - 1) / 2),
                            itemCenter = itemsActive.eq(indexCenter);
                        itemCenter.addClass('current');
                    }, 100);
                });
                $el.trigger('refresh.owl.carousel');
            }
            if (self.options.animateIn || self.options.animateOut) {
                $el.on('change.owl.carousel', function(event) {
                    $el.find('[data-appear-animation], [data-plugin-animated-letters]').addClass('d-none');
                    $el.find('[data-plugin-animated-letters]').trigger('animated.letters.destroy');
                    $el.find('.owl-item:not(.active) [data-carousel-onchange-show]').removeClass('d-none');
                });
                $el.on('changed.owl.carousel', function(event) {
                    setTimeout(function() {
                        if ($el.find('.owl-item.cloned [data-appear-animation]').get(0)) {
                            $el.find('.owl-item.cloned [data-appear-animation]').each(function() {
                                var $this = $(this),
                                    opts;
                                var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
                                if (pluginOptions)
                                    opts = pluginOptions;
                                $this.themePluginAnimate(opts);
                            });
                        }
                        $el.find('.owl-item.active [data-appear-animation], [data-plugin-animated-letters]').removeClass('d-none');
                        $el.find('.owl-item.active [data-plugin-animated-letters]').trigger('animated.letters.initialize');
                        $el.find('.owl-item.cloned.active [data-plugin-video-background]').trigger('video.background.initialize');
                    }, 1000);
                });
            }
            if ($el.find('[data-icon]').length) {
                $el.on('change.owl.carousel drag.owl.carousel', function() {
                    $el.find('.owl-item.cloned [data-icon]').each(function() {
                        var $this = $(this),
                            opts;
                        var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
                        if (pluginOptions)
                            opts = pluginOptions;
                        $this.themePluginIcon(opts);
                    });
                });
            }
            if ($el.find('[data-plugin-video-background]').get(0)) {
                $(window).resize();
            }
            $el.removeClass('owl-loading');
            $el.css('height', 'auto');
            self.carouselNavigate();
            if (self.options.refresh) {
                $el.owlCarousel('refresh');
            }
            return this;
        },
        navigationOffsets: function() {
            var self = this,
                $el = this.options.wrapper,
                navHasTransform = $el.find('.owl-nav').css('transform') == 'none' ? false : true,
                dotsHasTransform = $el.find('.owl-dots').css('transform') == 'none' ? false : true;
            if (self.options.navHorizontalOffset && !self.options.navVerticalOffset) {
                if (!navHasTransform) {
                    $el.find('.owl-nav').css({
                        transform: 'translate3d(' + self.options.navHorizontalOffset + ', 0, 0)'
                    });
                } else {
                    $el.find('.owl-nav').css({
                        left: self.options.navHorizontalOffset
                    });
                }
            }
            if (self.options.navVerticalOffset && !self.options.navHorizontalOffset) {
                if (!navHasTransform) {
                    $el.find('.owl-nav').css({
                        transform: 'translate3d(0, ' + self.options.navVerticalOffset + ', 0)'
                    });
                } else {
                    $el.find('.owl-nav').css({
                        top: 'calc( 50% - ' + self.options.navVerticalOffset + ' )'
                    });
                }
            }
            if (self.options.navVerticalOffset && self.options.navHorizontalOffset) {
                if (!navHasTransform) {
                    $el.find('.owl-nav').css({
                        transform: 'translate3d(' + self.options.navHorizontalOffset + ', ' + self.options.navVerticalOffset + ', 0)'
                    });
                } else {
                    $el.find('.owl-nav').css({
                        top: 'calc( 50% - ' + self.options.navVerticalOffset + ' )',
                        left: self.options.navHorizontalOffset
                    });
                }
            }
            if (self.options.dotsHorizontalOffset && !self.options.dotsVerticalOffset) {
                $el.find('.owl-dots').css({
                    transform: 'translate3d(' + self.options.dotsHorizontalOffset + ', 0, 0)'
                });
            }
            if (self.options.dotsVerticalOffset && !self.options.dotsHorizontalOffset) {
                if (!dotsHasTransform) {
                    $el.find('.owl-dots').css({
                        transform: 'translate3d(0, ' + self.options.dotsVerticalOffset + ', 0)'
                    });
                } else {
                    $el.find('.owl-dots').css({
                        top: 'calc( 50% - ' + self.options.dotsVerticalOffset + ' )'
                    });
                }
            }
            if (self.options.dotsVerticalOffset && self.options.dotsHorizontalOffset) {
                $el.find('.owl-dots').css({
                    transform: 'translate3d(' + self.options.dotsHorizontalOffset + ', ' + self.options.dotsVerticalOffset + ', 0)'
                });
            }
            return this;
        },
        carouselNavigate: function() {
            var self = this,
                $el = this.options.wrapper,
                $carousel = $el.data('owl.carousel');
            if ($('[data-carousel-navigate]').get(0)) {
                $('[data-carousel-navigate-id="#' + $el.attr('id') + '"]').each(function() {
                    var $this = $(this),
                        hasCarousel = $($this.data('carousel-navigate-id')).get(0),
                        toIndex = $this.data('carousel-navigate-to');
                    if (hasCarousel) {
                        $this.on('click', function() {
                            $carousel.to(parseInt(toIndex) - 1);
                        });
                    }
                });
                $el.on('change.owl.carousel', function() {
                    $('[data-carousel-navigate-id="#' + $el.attr('id') + '"]').removeClass('active');
                });
                $el.on('changed.owl.carousel', function(e) {
                    $('[data-carousel-navigate-id="#' + $el.attr('id') + '"][data-carousel-navigate-to="' + (e.item.index + 1) + '"]').addClass('active');
                });
            }
            return this;
        }
    };
    $.extend(theme, {
        PluginCarousel: PluginCarousel
    });
    $.fn.themePluginCarousel = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginCarousel($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__chartCircular';
    var PluginChartCircular = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginChartCircular.defaults = {
        accX: 0,
        accY: -150,
        delay: 1,
        barColor: '#0088CC',
        trackColor: '#f2f2f2',
        scaleColor: false,
        scaleLength: 5,
        lineCap: 'round',
        lineWidth: 13,
        size: 175,
        rotate: 0,
        animate: ({
            duration: 2500,
            enabled: true
        })
    };
    PluginChartCircular.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginChartCircular.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.easyPieChart))) {
                return this;
            }
            var self = this,
                $el = this.options.wrapper,
                value = ($el.attr('data-percent') ? $el.attr('data-percent') : 0),
                percentEl = $el.find('.percent');
            $.extend(true, self.options, {
                onStep: function(from, to, currentValue) {
                    percentEl.html(parseInt(currentValue));
                }
            });
            $el.attr('data-percent', 0);
            $el.easyPieChart(self.options);
            setTimeout(function() {
                $el.data('easyPieChart').update(value);
                $el.attr('data-percent', value);
            }, self.options.delay);
            return this;
        }
    };
    $.extend(theme, {
        PluginChartCircular: PluginChartCircular
    });
    $.fn.themePluginChartCircular = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginChartCircular($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__countdown';
    var PluginCountdown = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginCountdown.defaults = {
        date: '2030/06/10 12:00:00',
        textDay: 'DAY',
        textHour: 'HRS',
        textMin: 'MIN',
        textSec: 'SEC',
        uppercase: true,
        numberClass: '',
        wrapperClass: '',
        insertHTMLbefore: '',
        insertHTMLafter: ''
    };
    PluginCountdown.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginCountdown.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.countTo))) {
                return this;
            }
            var self = this,
                $el = this.options.wrapper,
                numberClass = (self.options.numberClass) ? ' ' + self.options.numberClass : '',
                wrapperClass = (self.options.wrapperClass) ? ' ' + self.options.wrapperClass : '';
            if (self.options.uppercase) {
                $el.countdown(self.options.date).on('update.countdown', function(event) {
                    var $this = $(this).html(event.strftime(self.options.insertHTMLbefore +
                        '<span class="days' + wrapperClass + '"><span class="' + numberClass + '">%D</span> ' + self.options.textDay + '<div class="d-inline text-uppercase">%!d</div></span> ' +
                        '<span class="hours' + wrapperClass + '"><span class="' + numberClass + '">%H</span> ' + self.options.textHour + '</span> ' +
                        '<span class="minutes' + wrapperClass + '"><span class="' + numberClass + '">%M</span> ' + self.options.textMin + '</span> ' +
                        '<span class="seconds' + wrapperClass + '"><span class="' + numberClass + '">%S</span> ' + self.options.textSec + '</span> ' +
                        self.options.insertHTMLafter));
                });
            } else {
                $el.countdown(self.options.date).on('update.countdown', function(event) {
                    var $this = $(this).html(event.strftime(self.options.insertHTMLbefore +
                        '<span class="days' + wrapperClass + '"><span class="' + numberClass + '">%D</span> ' + self.options.textDay + '%!d</span> ' +
                        '<span class="hours' + wrapperClass + '"><span class="' + numberClass + '">%H</span> ' + self.options.textHour + '</span> ' +
                        '<span class="minutes' + wrapperClass + '"><span class="' + numberClass + '">%M</span> ' + self.options.textMin + '</span> ' +
                        '<span class="seconds' + wrapperClass + '"><span class="' + numberClass + '">%S</span> ' + self.options.textSec + '</span> ' +
                        self.options.insertHTMLafter));
                });
            }
            return this;
        }
    };
    $.extend(theme, {
        PluginCountdown: PluginCountdown
    });
    $.fn.themePluginCountdown = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginCountdown($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__counter';
    var PluginCounter = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginCounter.defaulst = {
        accX: 0,
        accY: 0,
        appendWrapper: false,
        prependWrapper: false,
        speed: 3000,
        refreshInterval: 100,
        decimals: 0,
        onUpdate: null,
        onComplete: null
    }
    PluginCounter.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginCounter.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.countTo))) {
                return this;
            }
            var self = this,
                $el = this.options.wrapper;
            $.extend(self.options, {
                onComplete: function() {
                    if ($el.data('append')) {
                        if (self.options.appendWrapper) {
                            var appendWrapper = $(self.options.appendWrapper);
                            appendWrapper.append($el.data('append'));
                            $el.html($el.html() + appendWrapper[0].outerHTML);
                        } else {
                            $el.html($el.html() + $el.data('append'));
                        }
                    }
                    if ($el.data('prepend')) {
                        if (self.options.prependWrapper) {
                            var prependWrapper = $(self.options.prependWrapper);
                            prependWrapper.append($el.data('prepend'));
                            $el.html($el.html() + prependWrapper[0].outerHTML);
                        } else {
                            $el.html($el.data('prepend') + $el.html());
                        }
                    }
                }
            });
            $el.countTo(self.options);
            return this;
        }
    };
    $.extend(theme, {
        PluginCounter: PluginCounter
    });
    $.fn.themePluginCounter = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginCounter($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__cursorEffect';
    var PluginCursorEffect = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginCursorEffect.defaulst = {}
    PluginCursorEffect.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build().events();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginCursorEffect.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this;
            self.clientX = -100;
            self.clientY = -100;
            if (self.options.hideMouseCursor) {
                self.$el.addClass('hide-mouse-cursor');
            }
            var cursorOuter = document.createElement('DIV');
            cursorOuter.className = 'cursor-outer';
            var cursorInner = document.createElement('DIV');
            cursorInner.className = 'cursor-inner';
            if (self.options.cursorOuterColor) {
                cursorOuter.style = 'border-color: ' + self.options.cursorOuterColor + ';';
            }
            if (self.options.cursorInnerColor) {
                cursorInner.style = 'background-color: ' + self.options.cursorInnerColor + ';';
            }
            if (self.options.size) {
                switch (self.options.size) {
                    case 'small':
                        self.$el.addClass('cursor-effect-size-small');
                        break;
                    case 'big':
                        self.$el.addClass('cursor-effect-size-big');
                        break;
                }
            }
            if (self.options.style) {
                self.$el.addClass(self.options.style);
            }
            document.body.prepend(cursorOuter);
            document.body.prepend(cursorInner);
            var render = function() {
                cursorOuter.style.transform = 'translate(' + self.clientX + 'px, ' + self.clientY + 'px)';
                cursorInner.style.transform = 'translate(' + self.clientX + 'px, ' + self.clientY + 'px)';
                self.loopInside = requestAnimationFrame(render);
            }
            self.loop = requestAnimationFrame(render);
            return this;
        },
        events: function() {
            var self = this,
                $cursorOuter = $('.cursor-outer'),
                $cursorInner = $('.cursor-inner');
            var initialCursorOuterBox = $cursorOuter[0].getBoundingClientRect(),
                initialCursorOuterRadius = $cursorOuter.css('border-radius');
            document.addEventListener('mousemove', function(e) {
                if (!self.isStuck) {
                    self.clientX = e.clientX - 20;
                    self.clientY = e.clientY - 20;
                }
                $cursorOuter.removeClass('opacity-0');
            });
            self.isStuck = false;
            $('[data-cursor-effect-hover]').on('mouseenter', function(e) {
                $cursorOuter.addClass('cursor-outer-hover');
                $cursorInner.addClass('cursor-inner-hover');
                var hoverColor = $(this).data('cursor-effect-hover-color');
                $cursorOuter.addClass('cursor-color-' + hoverColor);
                $cursorInner.addClass('cursor-color-' + hoverColor);
                switch ($(this).data('cursor-effect-hover')) {
                    case 'fit':
                        var thisBox = $(this)[0].getBoundingClientRect();
                        self.clientX = thisBox.x;
                        self.clientY = thisBox.y;
                        $cursorOuter.css({
                            width: thisBox.width,
                            height: thisBox.height,
                            'border-radius': $(this).css('border-radius')
                        }).addClass('cursor-outer-fit');
                        $cursorInner.addClass('opacity-0');
                        self.isStuck = true;
                        break;
                    case 'plus':
                        $cursorInner.addClass('cursor-inner-plus');
                        break;
                }
            });
            $('[data-cursor-effect-hover]').on('mouseleave', function() {
                $cursorOuter.removeClass('cursor-outer-hover');
                $cursorInner.removeClass('cursor-inner-hover');
                var hoverColor = $(this).data('cursor-effect-hover-color');
                $cursorOuter.removeClass('cursor-color-' + hoverColor);
                $cursorInner.removeClass('cursor-color-' + hoverColor);
                switch ($(this).data('cursor-effect-hover')) {
                    case 'fit':
                        $cursorOuter.css({
                            width: initialCursorOuterBox.width,
                            height: initialCursorOuterBox.height,
                            'border-radius': initialCursorOuterRadius
                        }).removeClass('cursor-outer-fit');
                        $cursorInner.removeClass('opacity-0');
                        self.isStuck = false;
                        break;
                    case 'plus':
                        $cursorInner.removeClass('cursor-inner-plus');
                        break;
                }
            });
            $(window).on('scroll', function() {
                if ($cursorOuter.hasClass('cursor-outer-fit')) {
                    $cursorOuter.addClass('opacity-0').removeClass('cursor-outer-fit');
                }
            });
            return this;
        },
        destroy: function() {
            var self = this;
            self.$el.removeClass('hide-mouse-cursor cursor-effect-size-small cursor-effect-size-big cursor-effect-style-square');
            cancelAnimationFrame(self.loop);
            cancelAnimationFrame(self.loopInside);
            document.querySelector('.cursor-outer').remove();
            document.querySelector('.cursor-inner').remove();
            self.$el.removeData(instanceName, self);
        }
    };
    $.extend(theme, {
        PluginCursorEffect: PluginCursorEffect
    });
    $.fn.themePluginCursorEffect = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginCursorEffect($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    'use strict';
    theme = theme || {};
    var instanceName = '__floatElement';
    var PluginFloatElement = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginFloatElement.defaults = {
        startPos: 'top',
        speed: 3,
        horizontal: false,
        isInsideSVG: false,
        transition: false,
        transitionDelay: 0,
        transitionDuration: 500
    };
    PluginFloatElement.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginFloatElement.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this,
                $el = this.options.wrapper,
                $window = $(window),
                minus;
            if ($el.data('plugin-float-element-svg')) {
                $el.find('[data-plugin-float-element]').each(function() {
                    var $this = $(this),
                        opts;
                    var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
                    if (pluginOptions)
                        opts = pluginOptions;
                    $this.themePluginFloatElement(opts);
                });
                return this;
            }
            if (self.options.style) {
                $el.attr('style', self.options.style);
            }
            if ($window.width() > 767) {
                if (self.options.startPos == 'none') {
                    minus = '';
                } else if (self.options.startPos == 'top') {
                    $el.css({
                        top: 0
                    });
                    minus = '';
                } else {
                    $el.css({
                        bottom: 0
                    });
                    minus = '-';
                }
                if (self.options.transition) {
                    $el.css({
                        transition: 'ease-out transform ' + self.options.transitionDuration + 'ms ' + self.options.transitionDelay + 'ms'
                    });
                }
                self.movement(minus);
                $window.on('scroll', function() {
                    self.movement(minus);
                });
            }
            return this;
        },
        movement: function(minus) {
            var self = this,
                $el = this.options.wrapper,
                $window = $(window),
                scrollTop = $window.scrollTop(),
                elementOffset = $el.offset().top,
                currentElementOffset = (elementOffset - scrollTop),
                factor = (self.options.isInsideSVG) ? 2 : 100;
            var scrollPercent = factor * currentElementOffset / ($window.height());
            if ($el.visible(true)) {
                if (!self.options.horizontal) {
                    $el.css({
                        transform: 'translate3d(0, ' + minus + scrollPercent / self.options.speed + '%, 0)'
                    });
                } else {
                    $el.css({
                        transform: 'translate3d(' + minus + scrollPercent / self.options.speed + '%, ' + minus + scrollPercent / self.options.speed + '%, 0)'
                    });
                }
            }
        }
    };
    $.extend(theme, {
        PluginFloatElement: PluginFloatElement
    });
    $.fn.themePluginFloatElement = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginFloatElement($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__gdpr';
    var PluginGDPR = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginGDPR.defaults = {
        cookieBarShowDelay: 3000
    };
    PluginGDPR.prototype = {
        initialize: function($el, opts) {
            var self = this;
            this.$el = $el;
            this.setData().setOptions(opts).build().events();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginGDPR.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this;
            if (!$.cookie('porto-privacy-bar')) {
                $(window).on('load', function() {
                    setTimeout(function() {
                        self.options.wrapper.addClass('show');
                    }, self.options.cookieBarShowDelay);
                });
            }
            if ($.cookie('porto-gdpr-preferences')) {
                var preferencesArr = $.cookie('porto-gdpr-preferences').split(',');
                for (var i = 0; i < preferencesArr.length; i++) {
                    if ($('input[value="' + preferencesArr[i] + '"]').get(0)) {
                        if ($('input[value="' + preferencesArr[i] + '"]').is(':checkbox')) {
                            $('input[value="' + preferencesArr[i] + '"]').prop('checked', true);
                        }
                    }
                }
            }
            return this;
        },
        events: function() {
            var self = this;
            self.options.wrapper.find('.gdpr-agree-trigger').on('click', function(e) {
                e.preventDefault();
                $.cookie('porto-privacy-bar', true);
                self.removeCookieBar();
            });
            self.options.wrapper.find('.gdpr-preferences-trigger').on('click', function(e) {
                e.preventDefault();
                $('.gdpr-preferences-popup').toggleClass('show');
            });
            $('.gdpr-close-popup').on('click', function(e) {
                e.preventDefault();
                $('.gdpr-preferences-popup').toggleClass('show');
            });
            $('.gdpr-preferences-popup').on('click', function(e) {
                if (!$(e.target).closest('.gdpr-preferences-popup-content').get(0)) {
                    $('.gdpr-preferences-popup').toggleClass('show');
                }
            });
            $('.gdpr-preferences-form').on('submit', function(e) {
                e.preventDefault();
                var $this = $(this);
                $this.find('button[type="submit"]').text('SAVING...');
                var formData = [];
                $this.find('.gdpr-input').each(function() {
                    if ($(this).is(':checkbox') && $(this).is(':checked') || $(this).is(':hidden')) {
                        formData.push($(this).val());
                    }
                });
                $.cookie('porto-privacy-bar', true);
                $.cookie('porto-gdpr-preferences', formData);
                setTimeout(function() {
                    $this.find('button[type="submit"]').text('SAVED!').removeClass('btn-primary').addClass('btn-success');
                    setTimeout(function() {
                        $('.gdpr-preferences-popup').toggleClass('show');
                        self.removeCookieBar();
                        $this.find('button[type="submit"]').text('SAVE PREFERENCES').removeClass('btn-success').addClass('btn-primary');
                        location.reload();
                    }, 500);
                }, 1000);
            });
            $('.gdpr-reset-cookies').on('click', function(e) {
                e.preventDefault();
                self.clearCookies();
                location.reload();
            });
            $('.gdpr-open-preferences').on('click', function(e) {
                e.preventDefault();
                $('.gdpr-preferences-popup').toggleClass('show');
            });
            return this;
        },
        removeCookieBar: function() {
            var self = this;
            self.options.wrapper.addClass('removing').on('transitionend', function() {
                setTimeout(function() {
                    self.options.wrapper.removeClass('show removing');
                }, 500);
            });
            return this;
        },
        clearCookies: function() {
            var self = this;
            $.removeCookie('porto-privacy-bar');
            $.removeCookie('porto-gdpr-preferences');
            return this;
        }
    };
    $.extend(theme, {
        PluginGDPR: PluginGDPR
    });
    $.fn.themePluginGDPR = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginGDPR($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__gdprwrapper';
    var PluginGDPRWrapper = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginGDPRWrapper.defaults = {};
    PluginGDPRWrapper.prototype = {
        initialize: function($el, opts) {
            var self = this;
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginGDPRWrapper.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this;
            if ($.cookie('porto-gdpr-preferences').indexOf(self.options.checkCookie) != -1) {
                $.ajax({
                    url: self.options.ajaxURL,
                    cache: false,
                    complete: function(data) {
                        setTimeout(function() {
                            self.options.wrapper.html(data.responseText);
                        }, 1000);
                    }
                });
            }
            return this;
        }
    };
    $.extend(theme, {
        PluginGDPRWrapper: PluginGDPRWrapper
    });
    $.fn.themePluginGDPRWrapper = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginGDPRWrapper($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    'use strict';
    theme = theme || {};
    var instanceName = '__icon';
    var PluginIcon = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginIcon.defaults = {
        color: '#2388ED',
        animated: false,
        delay: 300,
        onlySVG: false
    };
    PluginIcon.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginIcon.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this,
                $el = this.options.wrapper,
                color = self.options.color,
                elTopDistance = $el.offset().top,
                windowTopDistance = $(window).scrollTop(),
                duration = (self.options.animated && !self.options.strokeBased) ? 200 : 100;
            if (window.location.protocol === 'file:') {
                $el.css({
                    opacity: 1,
                    width: $el.attr('width')
                });
                if (self.options.extraClass) {
                    $el.addClass(self.options.extraClass);
                }
                if (self.options.extraClass.indexOf('-color-light') > 0) {
                    $el.css({
                        filter: 'invert(1)'
                    });
                }
                $(window).trigger('icon.rendered');
                return;
            }
            if (self.options.duration) {
                duration = self.options.duration;
            }
            var SVGContent = $.get({
                url: $el.attr('src'),
                success: function(data, status, xhr) {
                    var iconWrapper = $('<div class="animated-icon animated fadeIn">' + xhr.responseText + '</div>'),
                        uniqid = 'icon_' + Math.floor(Math.random() * 26) + Date.now();
                    iconWrapper.find('svg').attr('id', uniqid);
                    if ($el.attr('width')) {
                        iconWrapper.find('svg').attr('width', $el.attr('width')).attr('height', $el.attr('width'));
                    }
                    if ($el.attr('height')) {
                        iconWrapper.find('svg').attr('height', $el.attr('height'));
                    }
                    if (self.options.svgViewBox) {
                        iconWrapper.find('svg').attr('viewBox', self.options.svgViewBox);
                    }
                    $el.replaceWith(iconWrapper);
                    if (self.options.extraClass) {
                        iconWrapper.addClass(self.options.extraClass);
                    }
                    if (self.options.onlySVG) {
                        $(window).trigger('icon.rendered');
                        return this;
                    }
                    $el = iconWrapper;
                    var icon = new Vivus(uniqid, {
                        start: 'manual',
                        type: 'sync',
                        selfDestroy: true,
                        duration: duration,
                        onReady: function(obj) {
                            var styleElement = document.createElementNS("http://www.w3.org/2000/svg", "style"),
                                animateStyle = '';
                            if (self.options.animated && !self.options.strokeBased || !self.options.animated && color && !self.options.strokeBased) {
                                animateStyle = 'stroke-width: 0.1px; fill-opacity: 0; transition: ease fill-opacity 300ms;';
                                styleElement.textContent = '#' + uniqid + ' path, #' + uniqid + ' line, #' + uniqid + ' rect, #' + uniqid + ' circle, #' + uniqid + ' polyline { fill: ' + color + '; stroke: ' + color + '; ' + animateStyle + (self.options.svgStyle ? self.options.svgStyle : "") + ' } .finished path { fill-opacity: 1; }';
                                obj.el.appendChild(styleElement);
                            }
                            if (self.options.animated && self.options.strokeBased || !self.options.animated && color && self.options.strokeBased) {
                                styleElement.textContent = '#' + uniqid + ' path, #' + uniqid + ' line, #' + uniqid + ' rect, #' + uniqid + ' circle, #' + uniqid + ' polyline { stroke: ' + color + '; ' + (self.options.svgStyle ? self.options.svgStyle : "") + '}';
                                obj.el.appendChild(styleElement);
                            }
                            $.event.trigger('theme.plugin.icon.svg.ready');
                        }
                    });
                    if (!self.options.animated) {
                        setTimeout(function() {
                            icon.finish();
                        }, 10);
                        $el.css({
                            opacity: 1
                        });
                    }
                    if (self.options.animated && $(window).width() > 767) {
                        if ($el.visible(true)) {
                            self.startIconAnimation(icon, $el);
                        } else if (elTopDistance < windowTopDistance) {
                            self.startIconAnimation(icon, $el);
                        }
                        $(window).on('scroll', function() {
                            if ($el.visible(true)) {
                                self.startIconAnimation(icon, $el);
                            }
                        });
                    } else {
                        $el.css({
                            opacity: 1
                        });
                        icon.finish();
                        $(window).on('theme.plugin.icon.svg.ready', function() {
                            setTimeout(function() {
                                icon.el.setAttribute('class', 'finished');
                                icon.finish();
                            }, 300);
                        });
                    }
                    $(window).trigger('icon.rendered');
                }
            });
            return this;
        },
        startIconAnimation: function(icon, $el) {
            var self = this;
            $({
                to: 0
            }).animate({
                to: 1
            }, ((self.options.strokeBased) ? self.options.delay : self.options.delay + 300), function() {
                $el.css({
                    opacity: 1
                });
            });
            $({
                to: 0
            }).animate({
                to: 1
            }, self.options.delay, function() {
                icon.play(1);
                setTimeout(function() {
                    icon.el.setAttribute('class', 'finished');
                }, icon.duration * 5);
            });
        }
    };
    $.extend(theme, {
        PluginIcon: PluginIcon
    });
    $.fn.themePluginIcon = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginIcon($this, opts);
            }
        });
    };
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__lightbox';
    var PluginLightbox = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginLightbox.defaults = {
        tClose: 'Close (Esc)',
        tLoading: 'Loading...',
        gallery: {
            tPrev: 'Previous (Left arrow key)',
            tNext: 'Next (Right arrow key)',
            tCounter: '%curr% of %total%'
        },
        image: {
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        ajax: {
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        callbacks: {
            open: function() {
                $('html').addClass('lightbox-opened');
            },
            close: function() {
                $('html').removeClass('lightbox-opened');
            }
        }
    };
    PluginLightbox.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginLightbox.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.magnificPopup))) {
                return this;
            }
            this.options.wrapper.magnificPopup(this.options);
            return this;
        }
    };
    $.extend(theme, {
        PluginLightbox: PluginLightbox
    });
    $.fn.themePluginLightbox = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginLightbox($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    'use strict';
    theme = theme || {};
    var loadingOverlayDefaultTemplate = ['<div class="loading-overlay">', '<div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>', '</div>'].join('');
    var loadingOverlayPercentageTemplate = ['<div class="loading-overlay loading-overlay-percentage">', '<div class="page-loader-progress-wrapper"><span class="page-loader-progress">0</span><span class="page-loader-progress-symbol">%</span></div>', '</div>'].join('');
    var loadingOverlayCubesTemplate = ['<div class="loading-overlay">', '<div class="bounce-loader"><div class="cssload-thecube"><div class="cssload-cube cssload-c1"></div><div class="cssload-cube cssload-c2"></div><div class="cssload-cube cssload-c4"></div><div class="cssload-cube cssload-c3"></div></div></div>', '</div>'].join('');
    var loadingOverlayCubeProgressTemplate = ['<div class="loading-overlay">', '<div class="bounce-loader"><span class="cssload-cube-progress"><span class="cssload-cube-progress-inner"></span></span></div>', '</div>'].join('');
    var loadingOverlayFloatRingsTemplate = ['<div class="loading-overlay">', '<div class="bounce-loader"><div class="cssload-float-rings-loader"><div class="cssload-float-rings-inner cssload-one"></div><div class="cssload-float-rings-inner cssload-two"></div><div class="cssload-float-rings-inner cssload-three"></div></div></div>', '</div>'].join('');
    var loadingOverlayFloatBarsTemplate = ['<div class="loading-overlay">', '<div class="bounce-loader"><div class="cssload-float-bars-container"><ul class="cssload-float-bars-flex-container"><li><span class="cssload-float-bars-loading"></span></li></div></div></div>', '</div>'].join('');
    var loadingOverlaySpeedingWheelTemplate = ['<div class="loading-overlay">', '<div class="bounce-loader"><div class="cssload-speeding-wheel-container"><div class="cssload-speeding-wheel"></div></div></div>', '</div>'].join('');
    var loadingOverlayZenithTemplate = ['<div class="loading-overlay">', '<div class="bounce-loader"><div class="cssload-zenith-container"><div class="cssload-zenith"></div></div></div>', '</div>'].join('');
    var loadingOverlaySpinningSquareTemplate = ['<div class="loading-overlay">', '<div class="bounce-loader"><div class="cssload-spinning-square-loading"></div></div>', '</div>'].join('');
    var loadingOverlayPulseTemplate = ['<div class="loading-overlay">', '<div class="bounce-loader"><div class="wrapper-pulse"><div class="cssload-pulse-loader"></div></div></div>', '</div>'].join('');
    var LoadingOverlay = function($wrapper, options, noInheritOptions) {
        return this.initialize($wrapper, options, noInheritOptions);
    };
    LoadingOverlay.prototype = {
        options: {
            css: {},
            hideDelay: 500,
            progressMinTimeout: 0,
            effect: 'default'
        },
        initialize: function($wrapper, options, noInheritOptions) {
            this.$wrapper = $wrapper;
            this.setVars().setOptions(options, noInheritOptions).build().events().dynamicShowHideEvents();
            this.$wrapper.data('loadingOverlay', this);
        },
        setVars: function() {
            this.$overlay = this.$wrapper.find('.loading-overlay');
            this.pageStatus = null;
            this.progress = null;
            this.animationInterval = 33;
            return this;
        },
        setOptions: function(options, noInheritOptions) {
            if (!this.$overlay.get(0)) {
                this.matchProperties();
            }
            if (noInheritOptions) {
                this.options = $.extend(true, {}, this.options, options);
            } else {
                this.options = $.extend(true, {}, this.options, options, theme.fn.getOptions(this.$wrapper.data('plugin-options')));
            }
            this.loaderClass = this.getLoaderClass(this.options.css.backgroundColor);
            return this;
        },
        build: function() {
            var _self = this;
            if (!this.$overlay.closest(document.documentElement).get(0)) {
                if (!this.$cachedOverlay) {
                    switch (_self.options.effect) {
                        case 'percentageProgress1':
                            this.$overlay = $(loadingOverlayPercentageTemplate).clone();
                            break;
                        case 'percentageProgress2':
                            this.$overlay = $(loadingOverlayPercentageTemplate).clone();
                            this.$overlay.addClass('loading-overlay-percentage-effect-2').prepend('<div class="loading-overlay-background-layer"></div>');
                            break;
                        case 'cubes':
                            this.$overlay = $(loadingOverlayCubesTemplate).clone();
                            break;
                        case 'cubeProgress':
                            this.$overlay = $(loadingOverlayCubeProgressTemplate).clone();
                            break;
                        case 'floatRings':
                            this.$overlay = $(loadingOverlayFloatRingsTemplate).clone();
                            break;
                        case 'floatBars':
                            this.$overlay = $(loadingOverlayFloatBarsTemplate).clone();
                            break;
                        case 'speedingWheel':
                            this.$overlay = $(loadingOverlaySpeedingWheelTemplate).clone();
                            break;
                        case 'zenith':
                            this.$overlay = $(loadingOverlayZenithTemplate).clone();
                            break;
                        case 'spinningSquare':
                            this.$overlay = $(loadingOverlaySpinningSquareTemplate).clone();
                            break;
                        case 'pulse':
                            this.$overlay = $(loadingOverlayPulseTemplate).clone();
                            break;
                        case 'default':
                        default:
                            this.$overlay = $(loadingOverlayDefaultTemplate).clone();
                            break;
                    }
                    if (this.options.css) {
                        this.$overlay.css(this.options.css);
                        this.$overlay.find('.loader').addClass(this.loaderClass);
                    }
                } else {
                    this.$overlay = this.$cachedOverlay.clone();
                }
                this.$wrapper.prepend(this.$overlay);
            }
            if (!this.$cachedOverlay) {
                this.$cachedOverlay = this.$overlay.clone();
            }
            if (['percentageProgress1', 'percentageProgress2'].includes(_self.options.effect)) {
                _self.updateProgress();
                if (_self.options.isDynamicHideShow) {
                    setTimeout(function() {
                        _self.progress = 'complete';
                        $('.page-loader-progress').text(100);
                        if (['percentageProgress2'].includes(_self.options.effect)) {
                            $('.loading-overlay-background-layer').css({
                                width: '100%'
                            });
                        }
                    }, 2800);
                }
            }
            return this;
        },
        events: function() {
            var _self = this;
            if (this.options.startShowing) {
                _self.show();
            }
            if (this.$wrapper.is('body') || this.options.hideOnWindowLoad) {
                $(window).on('load error', function() {
                    setTimeout(function() {
                        _self.hide();
                    }, _self.options.progressMinTimeout);
                });
            }
            if (this.options.listenOn) {
                $(this.options.listenOn).on('loading-overlay:show beforeSend.ic', function(e) {
                    e.stopPropagation();
                    _self.show();
                }).on('loading-overlay:hide complete.ic', function(e) {
                    e.stopPropagation();
                    _self.hide();
                });
            }
            this.$wrapper.on('loading-overlay:show beforeSend.ic', function(e) {
                if (e.target === _self.$wrapper.get(0)) {
                    e.stopPropagation();
                    _self.show();
                    return true;
                }
                return false;
            }).on('loading-overlay:hide complete.ic', function(e) {
                if (e.target === _self.$wrapper.get(0)) {
                    e.stopPropagation();
                    _self.hide();
                    return true;
                }
                return false;
            });
            if (['percentageProgress1', 'percentageProgress2'].includes(_self.options.effect)) {
                $(window).on('load', function() {
                    setTimeout(function() {
                        _self.pageStatus = "complete";
                        $('.page-loader-progress').text(100);
                        if (['percentageProgress2'].includes(_self.options.effect)) {
                            $('.loading-overlay-background-layer').css({
                                width: '100%'
                            });
                        }
                    }, _self.options.progressMinTimeout);
                });
            }
            return this;
        },
        show: function() {
            this.build();
            this.position = this.$wrapper.css('position').toLowerCase();
            if (this.position != 'relative' || this.position != 'absolute' || this.position != 'fixed') {
                this.$wrapper.css({
                    position: 'relative'
                });
            }
            this.$wrapper.addClass('loading-overlay-showing');
        },
        hide: function() {
            var _self = this;
            setTimeout(function() {
                _self.$wrapper.removeClass('loading-overlay-showing');
                if (this.position != 'relative' || this.position != 'absolute' || this.position != 'fixed') {
                    _self.$wrapper.css({
                        position: ''
                    });
                }
                $(window).trigger('loading.overlay.ready');
            }, _self.options.hideDelay);
        },
        updateProgress: function() {
            var _self = this;
            var render = function() {
                if (_self.pageStatus == "complete") {
                    $('.page-loader-progress').text(100);
                    setTimeout(function() {
                        $('.page-loader-progress').addClass('d-none');
                    }, 700);
                } else {
                    if (_self.progress == null) {
                        _self.progress = 1;
                    }
                    _self.progress = _self.progress + 1;
                    if (_self.progress >= 0 && _self.progress <= 30) {
                        _self.animationInterval += 1;
                        $('.page-loader-progress').text(_self.progress);
                    } else if (_self.progress > 30 && _self.progress <= 60) {
                        _self.animationInterval += 2;
                        $('.page-loader-progress').text(_self.progress);
                    } else if (_self.progress > 60 && _self.progress <= 80) {
                        _self.animationInterval += 40;
                        $('.page-loader-progress').text(_self.progress);
                    } else if (_self.progress > 80 && _self.progress <= 90) {
                        _self.animationInterval += 80;
                        $('.page-loader-progress').text(_self.progress);
                    } else if (_self.progress > 90 && _self.progress <= 95) {
                        _self.animationInterval += 150;
                        $('.page-loader-progress').text(_self.progress);
                    } else if (_self.progress > 95 && _self.progress <= 99) {
                        _self.animationInterval += 400;
                        $('.page-loader-progress').text(_self.progress);
                    } else if (_self.progress >= 100) {
                        $('.page-loader-progress').text(99);
                    }
                    if (['percentageProgress2'].includes(_self.options.effect)) {
                        $('.loading-overlay-background-layer').css({
                            width: _self.progress + '%'
                        });
                    }
                    self.loopInside = setTimeout(render, _self.animationInterval);
                }
            }
            render();
            return this;
        },
        matchProperties: function() {
            var i, l, properties;
            properties = ['backgroundColor', 'borderRadius'];
            l = properties.length;
            for (i = 0; i < l; i++) {
                var obj = {};
                obj[properties[i]] = this.$wrapper.css(properties[i]);
                $.extend(this.options.css, obj);
            }
        },
        getLoaderClass: function(backgroundColor) {
            if (!backgroundColor || backgroundColor === 'transparent' || backgroundColor === 'inherit') {
                return 'black';
            }
            var hexColor, r, g, b, yiq;
            var colorToHex = function(color) {
                var hex, rgb;
                if (color.indexOf('#') > -1) {
                    hex = color.replace('#', '');
                } else {
                    rgb = color.match(/\d+/g);
                    hex = ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2);
                }
                if (hex.length === 3) {
                    hex = hex + hex;
                }
                return hex;
            };
            hexColor = colorToHex(backgroundColor);
            r = parseInt(hexColor.substr(0, 2), 16);
            g = parseInt(hexColor.substr(2, 2), 16);
            b = parseInt(hexColor.substr(4, 2), 16);
            yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            return (yiq >= 128) ? 'black' : 'white';
        },
        dynamicShowHide: function(effect) {
            var _self = this;
            $('body').removeData('loadingOverlay');
            $('.loading-overlay').remove();
            if (effect == '') {
                return this;
            }
            $('body').loadingOverlay({
                effect: effect ? effect : 'pulse',
                isDynamicHideShow: true
            }, true);
            $('body').data('loadingOverlay').show();
            setTimeout(function() {
                $('body').data('loadingOverlay').hide();
            }, 3000);
            return this;
        },
        dynamicShowHideEvents: function() {
            var _self = this;
            $(document).off('click.loading-overlay-button').on('click.loading-overlay-button', '.loading-overlay-button', function(e) {
                e.preventDefault();
                _self.dynamicShowHide($(this).data('effect'));
            });
            $(document).off('change.loading-overlay-select').on('change.loading-overlay-select', '.loading-overlay-select', function() {
                _self.dynamicShowHide($(this).val());
            });
            return this;
        }
    };
    $.extend(theme, {
        LoadingOverlay: LoadingOverlay
    });
    $.fn.loadingOverlay = function(opts, noInheritOptions) {
        return this.each(function() {
            var $this = $(this);
            var loadingOverlay = $this.data('loadingOverlay');
            if (loadingOverlay) {
                return loadingOverlay;
            } else {
                var options = opts || $this.data('loading-overlay-options') || {};
                return new LoadingOverlay($this, options, noInheritOptions);
            }
        });
    }
    $('[data-loading-overlay]').loadingOverlay();
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__masonry';
    var PluginMasonry = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginMasonry.defaults = {};
    PluginMasonry.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginMasonry.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.isotope))) {
                return this;
            }
            var self = this,
                $window = $(window);
            self.$loader = false;
            if (self.options.wrapper.parents('.masonry-loader').get(0)) {
                self.$loader = self.options.wrapper.parents('.masonry-loader');
                self.createLoader();
            }
            self.options.wrapper.one('layoutComplete', function(event, laidOutItems) {
                self.removeLoader();
            });
            self.options.wrapper.waitForImages(function() {
                self.options.wrapper.isotope(self.options);
            });
            if ($('html').hasClass('ie10') || $('html').hasClass('ie11')) {
                var padding = parseInt(self.options.wrapper.children().css('padding-left')) + parseInt(self.options.wrapper.children().css('padding-right'));
            }
            $(window).on('resize', function() {
                setTimeout(function() {
                    self.options.wrapper.isotope('layout');
                }, 300);
            });
            setTimeout(function() {
                self.removeLoader();
            }, 3000);
            return this;
        },
        createLoader: function() {
            var self = this;
            var loaderTemplate = ['<div class="bounce-loader">', '<div class="bounce1"></div>', '<div class="bounce2"></div>', '<div class="bounce3"></div>', '</div>'].join('');
            self.$loader.append(loaderTemplate);
            return this;
        },
        removeLoader: function() {
            var self = this;
            if (self.$loader) {
                self.$loader.removeClass('masonry-loader-showing');
                setTimeout(function() {
                    self.$loader.addClass('masonry-loader-loaded');
                }, 300);
            }
        }
    };
    $.extend(theme, {
        PluginMasonry: PluginMasonry
    });
    $.fn.themePluginMasonry = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginMasonry($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__matchHeight';
    var PluginMatchHeight = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginMatchHeight.defaults = {
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    };
    PluginMatchHeight.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginMatchHeight.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.matchHeight))) {
                return this;
            }
            var self = this;
            self.options.wrapper.matchHeight(self.options);
            return this;
        }
    };
    $.extend(theme, {
        PluginMatchHeight: PluginMatchHeight
    });
    $.fn.themePluginMatchHeight = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginMatchHeight($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__parallax';
    var PluginParallax = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginParallax.defaults = {
        speed: 1.5,
        horizontalPosition: '50%',
        offset: 0,
        parallaxDirection: 'top',
        parallaxHeight: '180%',
        scrollableParallax: false,
        scrollableParallaxMinWidth: 991,
        startOffset: 7,
        transitionDuration: '200ms',
        cssProperty: 'width',
        cssValueStart: 40,
        cssValueEnd: 100,
        cssValueUnit: 'vw'
    };
    PluginParallax.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginParallax.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this,
                $window = $(window),
                offset, yPos, bgpos, background, rotateY;
            if (self.options.scrollableParallax && $(window).width() > self.options.scrollableParallaxMinWidth) {
                var $scrollableWrapper = self.options.wrapper.find('.scrollable-parallax-wrapper');
                if ($scrollableWrapper.get(0)) {
                    var progress = ($(window).scrollTop() > (self.options.wrapper.offset().top + $(window).outerHeight())) ? self.options.cssValueEnd : self.options.cssValueStart,
                        cssValueUnit = self.options.cssValueUnit ? self.options.cssValueUnit : '';
                    $scrollableWrapper.css({
                        'background-image': 'url(' + self.options.wrapper.data('image-src') + ')',
                        'background-size': 'cover',
                        'background-position': 'center',
                        'background-attachment': 'fixed',
                        'transition': 'ease ' + self.options.cssProperty + ' ' + self.options.transitionDuration,
                        'width': progress + '%'
                    });
                    $(window).on('scroll', function(e) {
                        if (self.options.wrapper.visible(true)) {
                            var $window = $(window),
                                scrollTop = $window.scrollTop(),
                                elementOffset = self.options.wrapper.offset().top,
                                currentElementOffset = (elementOffset - scrollTop);
                            var scrollPercent = Math.abs(+(currentElementOffset - $window.height()) / (self.options.startOffset ? self.options.startOffset : 7));
                            if (scrollPercent <= self.options.cssValueEnd && progress <= self.options.cssValueEnd) {
                                progress = self.options.cssValueStart + scrollPercent;
                            }
                            if (progress > self.options.cssValueEnd) {
                                progress = self.options.cssValueEnd;
                            }
                            if (progress < self.options.cssValueStart) {
                                progress = self.options.cssValueStart;
                            }
                            var styles = {}
                            styles[self.options.cssProperty] = progress + cssValueUnit;
                            $scrollableWrapper.css(styles);
                        }
                    });
                }
                return;
            }
            if (self.options.fadeIn) {
                background = $('<div class="parallax-background fadeIn animated"></div>');
            } else {
                background = $('<div class="parallax-background"></div>');
            }
            background.css({
                'background-image': 'url(' + self.options.wrapper.data('image-src') + ')',
                'background-size': 'cover',
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'width': '100%',
                'height': self.options.parallaxHeight
            });
            self.options.wrapper.prepend(background);
            self.options.wrapper.css({
                'position': 'relative',
                'overflow': 'hidden'
            });
            var parallaxEffectOnScrolResize = function() {
                $window.on('scroll resize', function() {
                    offset = self.options.wrapper.offset();
                    yPos = -($window.scrollTop() - (offset.top - 100)) / ((self.options.speed + 2));
                    plxPos = (yPos < 0) ? Math.abs(yPos) : -Math.abs(yPos);
                    rotateY = ($('html[dir="rtl"]').get(0)) ? ' rotateY(180deg)' : '';
                    if (self.options.parallaxDirection == 'bottom') {
                        self.options.offset = 250;
                    }
                    var y = ((plxPos - 50) + (self.options.offset));
                    if (self.options.parallaxDirection == 'bottom') {
                        y = (y < 0) ? Math.abs(y) : -Math.abs(y);
                    }
                    background.css({
                        'transform': 'translate3d(0, ' + y + 'px, 0)' + rotateY,
                        'background-position-x': self.options.horizontalPosition
                    });
                });
                $window.trigger('scroll');
            }
            if (!$.browser.mobile) {
                parallaxEffectOnScrolResize();
            } else {
                if (self.options.enableOnMobile == true) {
                    parallaxEffectOnScrolResize();
                } else {
                    self.options.wrapper.addClass('parallax-disabled');
                }
            }
            return this;
        }
    };
    $.extend(theme, {
        PluginParallax: PluginParallax
    });
    $.fn.themePluginParallax = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginParallax($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__progressBar';
    var PluginProgressBar = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginProgressBar.defaults = {
        accX: 0,
        accY: -50,
        delay: 1
    };
    PluginProgressBar.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginProgressBar.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this,
                $el = this.options.wrapper,
                delay = 1;
            delay = ($el.attr('data-appear-animation-delay') ? $el.attr('data-appear-animation-delay') : self.options.delay);
            $el.addClass($el.attr('data-appear-animation'));
            setTimeout(function() {
                $el.animate({
                    width: $el.attr('data-appear-progress-animation')
                }, 1500, 'easeOutQuad', function() {
                    $el.find('.progress-bar-tooltip').animate({
                        opacity: 1
                    }, 500, 'easeOutQuad');
                });
            }, delay);
            return this;
        }
    };
    $.extend(theme, {
        PluginProgressBar: PluginProgressBar
    });
    $.fn.themePluginProgressBar = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginProgressBar($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__readmore';
    var PluginReadMore = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginReadMore.defaults = {
        buttonOpenLabel: 'Read More <i class="fas fa-chevron-down text-2 ml-1"></i>',
        buttonCloseLabel: 'Read Less <i class="fas fa-chevron-up text-2 ml-1"></i>',
        enableToggle: true,
        maxHeight: 110,
        overlayColor: '#FFF',
        overlayHeight: 100,
        startOpened: false,
        align: 'left'
    };
    PluginReadMore.prototype = {
        initialize: function($el, opts) {
            var self = this;
            this.$el = $el;
            this.setData().setOptions(opts).build().events();
            if (self.options.startOpened) {
                self.options.wrapper.find('.readmore-button-wrapper > a').trigger('click');
            }
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginReadMore.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this;
            self.options.wrapper.addClass('position-relative');
            self.options.wrapper.append('<div class="readmore-overlay"></div>');
            var backgroundCssValue = 'linear-gradient(180deg, rgba(2, 0, 36, 0) 0%, ' + self.options.overlayColor + ' 100%)';
            if ($('html').hasClass('safari')) {
                backgroundCssValue = '-webkit-linear-gradient(top, rgba(2, 0, 36, 0) 0%, ' + self.options.overlayColor + ' 100%)'
            }
            self.options.wrapper.find('.readmore-overlay').css({
                background: backgroundCssValue,
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: self.options.overlayHeight,
                'z-index': 1
            });
            self.options.wrapper.find('.readmore-button-wrapper').removeClass('d-none').css({
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                'z-index': 2
            });
            self.options.wrapper.find('.readmore-button-wrapper > a').html(self.options.buttonOpenLabel);
            self.options.wrapper.css({
                'height': self.options.maxHeight,
                'overflow-y': 'hidden'
            });
            switch (self.options.align) {
                case 'center':
                    self.options.wrapper.find('.readmore-button-wrapper').addClass('text-center');
                    break;
                case 'right':
                    self.options.wrapper.find('.readmore-button-wrapper').addClass('text-right');
                    break;
                case 'left':
                default:
                    self.options.wrapper.find('.readmore-button-wrapper').addClass('text-left');
                    break;
            }
            return this;
        },
        events: function() {
            var self = this;
            self.readMore = function() {
                self.options.wrapper.find('.readmore-button-wrapper > a:not(.readless)').on('click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    setTimeout(function() {
                        self.options.wrapper.animate({
                            'height': self.options.wrapper[0].scrollHeight
                        }, function() {
                            if (!self.options.enableToggle) {
                                $this.fadeOut();
                            }
                            $this.html(self.options.buttonCloseLabel).addClass('readless').off('click');
                            self.readLess();
                            self.options.wrapper.find('.readmore-overlay').fadeOut();
                            self.options.wrapper.css({
                                'max-height': 'none',
                                'overflow': 'visible'
                            });
                            self.options.wrapper.find('.readmore-button-wrapper').animate({
                                bottom: -20
                            });
                        });
                    }, 200);
                });
            }
            self.readLess = function() {
                self.options.wrapper.find('.readmore-button-wrapper > a.readless').on('click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    self.options.wrapper.find('.readmore-button-wrapper').animate({
                        bottom: 0
                    });
                    self.options.wrapper.find('.readmore-overlay').fadeIn();
                    setTimeout(function() {
                        self.options.wrapper.height(self.options.wrapper[0].scrollHeight).animate({
                            'height': self.options.maxHeight
                        }, function() {
                            $this.html(self.options.buttonOpenLabel).removeClass('readless').off('click');
                            self.readMore();
                            self.options.wrapper.css({
                                'overflow': 'hidden'
                            });
                        });
                    }, 200);
                });
            }
            self.readMore();
            return this;
        }
    };
    $.extend(theme, {
        PluginReadMore: PluginReadMore
    });
    $.fn.themePluginReadMore = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginReadMore($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__revolution';
    var PluginRevolutionSlider = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginRevolutionSlider.defaults = {
        sliderType: 'standard',
        sliderLayout: 'fullwidth',
        delay: 9000,
        gridwidth: 1170,
        gridheight: 500,
        spinner: 'spinner3',
        disableProgressBar: 'on',
        parallax: {
            type: 'off',
            bgparallax: 'off'
        },
        navigation: {
            keyboardNavigation: 'off',
            keyboard_direction: 'horizontal',
            mouseScrollNavigation: 'off',
            onHoverStop: 'off',
            touch: {
                touchenabled: 'on',
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: 'horizontal',
                drag_block_vertical: false
            },
            arrows: {
                enable: true,
                hide_onmobile: false,
                hide_under: 0,
                hide_onleave: true,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                left: {
                    h_align: 'left',
                    v_align: 'center',
                    h_offset: 30,
                    v_offset: 0
                },
                right: {
                    h_align: 'right',
                    v_align: 'center',
                    h_offset: 30,
                    v_offset: 0
                }
            }
        },
        addOnTypewriter: {
            enable: false
        },
        addOnWhiteboard: {
            enable: false,
        },
        whiteboard: {
            movehand: {
                src: '../vendor/rs-plugin/revolution-addons/whiteboard/assets/images/hand_point_right.png',
                width: 400,
                height: 1000,
                handtype: 'right',
                transform: {
                    transformX: 50,
                    transformY: 50
                },
                jittering: {
                    distance: '80',
                    distance_horizontal: '100',
                    repeat: '5',
                    offset: '10',
                    offset_horizontal: '0'
                },
                rotation: {
                    angle: '10',
                    repeat: '3'
                }
            },
            writehand: {
                src: '../vendor/rs-plugin/revolution-addons/whiteboard/assets/images/write_right_angle.png',
                width: 572,
                height: 691,
                handtype: 'right',
                transform: {
                    transformX: 50,
                    transformY: 50
                },
                jittering: {
                    distance: '80',
                    distance_horizontal: '100',
                    repeat: '5',
                    offset: '10',
                    offset_horizontal: '0'
                },
                rotation: {
                    angle: '10',
                    repeat: '3'
                }
            }
        },
        addOnParticles: {
            enable: false
        },
        particles: {
            startSlide: "first",
            endSlide: "last",
            zIndex: "1",
            particles: {
                number: {
                    value: 80
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#ffffff",
                        opacity: 1
                    },
                    image: {
                        src: ""
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    min: 0.25,
                    anim: {
                        enable: false,
                        speed: 3,
                        opacity_min: 0,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: false,
                    min: 30,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: true,
                    min_speed: 6,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                events: {
                    onhover: {
                        enable: false,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: false,
                        mode: "repulse"
                    }
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        opacity: 0.4
                    },
                    repulse: {
                        distance: 200
                    }
                }
            }
        },
        addOnCountdown: {
            enable: false,
            targetdate: new Date().getTime() + 864000000,
            slidechanges: [{
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                slide: 2
            }]
        },
        addOnSlicey: {
            enable: false
        },
        addOnFilmstrip: {
            enable: false
        },
        addOnBeforeAfter: {
            enable: false,
            options: {
                cursor: "move",
                carousel: false,
                arrowStyles: {
                    leftIcon: "fa-icon-caret-left",
                    rightIcon: "fa-icon-caret-right",
                    topIcon: "fa-icon-caret-up",
                    bottomIcon: "fa-icon-caret-down",
                    size: "35",
                    color: "#ffffff",
                    spacing: "10",
                    bgColor: "transparent",
                    padding: "0",
                    borderRadius: "0"
                },
                dividerStyles: {
                    width: "1",
                    color: "rgba(255, 255, 255, 0.5)"
                }
            }
        },
        addOnPanorama: {
            enable: false
        },
        addOnRevealer: {
            enable: false,
        },
        revealer: {
            direction: "open_horizontal",
            color: "#ffffff",
            duration: "1500",
            delay: "0",
            easing: "Power2.easeInOut",
            overlay_enabled: true,
            overlay_color: "#000000",
            overlay_duration: "1500",
            overlay_delay: "0",
            overlay_easing: "Power2.easeInOut",
            spinner: "1",
            spinnerColor: "#006dd2",
            spinnerHtml: "<div class='rsaddon-revealer-spinner rsaddon-revealer-spinner-1'><div class='rsaddon-revealer-1'><span style='background: {{color}}'><\/span><span style='background: {{color}}'><\/span><span style='background: {{color}}'><\/span><span style='background: {{color}}'><\/span><span style='background: {{color}}'><\/span><span style='background: {{color}}'><\/span><span style='background: {{color}}'><\/span><span style='background: {{color}}'><\/span><span style='background: {{color}}'><\/span><span style='background: {{color}}'><\/span><\/div><\/div \/>"
        },
        addOnDuotone: {
            enable: false
        },
        addOnBubblemorph: {
            enable: false
        },
        addOnDistortion: {
            enable: false
        }
    };
    PluginRevolutionSlider.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build().events();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginRevolutionSlider.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.revolution))) {
                return this;
            }
            if (this.options.wrapper.find('> ul > li').length == 1) {
                this.options.wrapper.addClass('slider-single-slide');
                $.extend(this.options.navigation, {
                    bullets: {
                        enable: false
                    }
                });
            }
            if (this.options.sliderLayout == 'fullscreen') {
                this.options.wrapper.closest('.slider-container').addClass('fullscreen-slider');
            }
            this.options.wrapper.revolution(this.options);
            if (this.options.addOnTypewriter.enable) {
                RsTypewriterAddOn($, this.options.wrapper);
            }
            if (this.options.addOnWhiteboard.enable) {
                this.options.wrapper.rsWhiteBoard();
            }
            if (this.options.addOnParticles.enable) {
                RsParticlesAddOn(this.options.wrapper);
            }
            if (this.options.addOnCountdown.enable) {
                tp_countdown(this.options.wrapper, this.options.addOnCountdown.targetdate, this.options.addOnCountdown.slidechanges);
            }
            if (this.options.addOnSlicey.enable) {
                this.options.wrapper.revSliderSlicey();
            }
            if (this.options.addOnFilmstrip.enable) {
                RsFilmstripAddOn($, this.options.wrapper, '../vendor/rs-plugin/revolution-addons/filmstrip/', false);
            }
            if (this.options.addOnBeforeAfter.enable) {
                RevSliderBeforeAfter($, this.options.wrapper, this.options.addOnBeforeAfter.options);
            }
            if (this.options.addOnPanorama.enable) {
                RsAddonPanorama($, this.options.wrapper);
            }
            if (this.options.addOnRevealer.enable) {
                RsRevealerAddOn($, this.options.wrapper, this.options.revealer.spinnerHtml);
            }
            if (this.options.addOnDuotone.enable) {
                RsAddonDuotone($, this.options.wrapper, true, "cubic-bezier(0.645, 0.045, 0.355, 1.000)", "1000");
            }
            if (this.options.addOnBubblemorph.enable) {
                BubbleMorphAddOn($, this.options.wrapper, false);
            }
            if (this.options.addOnDistortion.enable) {
                RsLiquideffectAddOn($, this.options.wrapper);
            }
            return this;
        },
        events: function() {
            return this;
        }
    };
    $.extend(theme, {
        PluginRevolutionSlider: PluginRevolutionSlider
    });
    $.fn.themePluginRevolutionSlider = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginRevolutionSlider($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    $.extend(theme, {
        PluginScrollToTop: {
            defaults: {
                wrapper: $('body'),
                offset: 150,
                buttonClass: 'scroll-to-top',
                iconClass: 'fas fa-chevron-up',
                delay: 1000,
                visibleMobile: false,
                label: false,
                easing: 'easeOutBack'
            },
            initialize: function(opts) {
                initialized = true;
                if ($('body[data-plugin-section-scroll]').get(0)) {
                    return;
                }
                this.setOptions(opts).build().events();
                return this;
            },
            setOptions: function(opts) {
                this.options = $.extend(true, {}, this.defaults, opts);
                return this;
            },
            build: function() {
                var self = this,
                    $el;
                $el = $('<a />').addClass(self.options.buttonClass).attr({
                    'href': '#',
                }).append($('<i />').addClass(self.options.iconClass));
                if (!self.options.visibleMobile) {
                    $el.addClass('hidden-mobile');
                }
                if (self.options.label) {
                    $el.append($('<span />').html(self.options.label));
                }
                this.options.wrapper.append($el);
                this.$el = $el;
                return this;
            },
            events: function() {
                var self = this,
                    _isScrolling = false;
                self.$el.on('click', function(e) {
                    e.preventDefault();
                    $('body, html').animate({
                        scrollTop: 0
                    }, self.options.delay, self.options.easing);
                    return false;
                });
                $(window).scroll(function() {
                    if (!_isScrolling) {
                        _isScrolling = true;
                        if ($(window).scrollTop() > self.options.offset) {
                            self.$el.stop(true, true).addClass('visible');
                            _isScrolling = false;
                        } else {
                            self.$el.stop(true, true).removeClass('visible');
                            _isScrolling = false;
                        }
                    }
                });
                return this;
            }
        }
    });
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__scrollable';
    var PluginScrollable = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginScrollable.updateModals = function() {
        PluginScrollable.updateBootstrapModal();
    };
    PluginScrollable.updateBootstrapModal = function() {
        var updateBoostrapModal;
        updateBoostrapModal = typeof $.fn.modal !== 'undefined';
        updateBoostrapModal = updateBoostrapModal && typeof $.fn.modal.Constructor !== 'undefined';
        updateBoostrapModal = updateBoostrapModal && typeof $.fn.modal.Constructor.prototype !== 'undefined';
        updateBoostrapModal = updateBoostrapModal && typeof $.fn.modal.Constructor.prototype.enforceFocus !== 'undefined';
        if (!updateBoostrapModal) {
            return false;
        }
        var originalFocus = $.fn.modal.Constructor.prototype.enforceFocus;
        $.fn.modal.Constructor.prototype.enforceFocus = function() {
            originalFocus.apply(this);
            var $scrollable = this.$element.find('.scrollable');
            if ($scrollable) {
                if ($.isFunction($.fn['themePluginScrollable'])) {
                    $scrollable.themePluginScrollable();
                }
                if ($.isFunction($.fn['nanoScroller'])) {
                    $scrollable.nanoScroller();
                }
            }
        };
    };
    PluginScrollable.defaults = {
        contentClass: 'scrollable-content',
        paneClass: 'scrollable-pane',
        sliderClass: 'scrollable-slider',
        alwaysVisible: true,
        preventPageScrolling: true
    };
    PluginScrollable.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginScrollable.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            this.options.wrapper.nanoScroller(this.options);
            return this;
        }
    };
    $.extend(theme, {
        PluginScrollable: PluginScrollable
    });
    $.fn.themePluginScrollable = function(opts) {
        return this.each(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginScrollable($this, opts);
            }
        });
    };
    $(function() {
        PluginScrollable.updateModals();
    });
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__sectionScroll';
    var PluginSectionScroll = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginSectionScroll.defaults = {
        targetClass: '.section',
        dotsNav: true,
        changeHeaderLogo: true,
        headerLogoDark: 'img/logo-default-slim.png',
        headerLogoLight: 'img/logo-default-slim-dark.png'
    };
    PluginSectionScroll.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build().events();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginSectionScroll.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this,
                $el = this.options.wrapper;
            if ($('html').hasClass('side-header-overlay-full-screen')) {
                self.$header = $('.sticky-wrapper');
            } else {
                self.$header = $('#header');
            }
            self.updateSectionsHeight();
            $(this.options.targetClass).wrap('<div class="section-wrapper"></div>');
            $('.section-wrapper').each(function() {
                $(this).height($(this).find('.section-scroll').outerHeight());
            });
            $('.section-wrapper').first().addClass('active');
            var flag = false,
                scrollableFlag = false,
                touchDirection = '',
                touchstartY = 0,
                touchendY = 0;
            $(window).on('touchstart', function(event) {
                touchstartY = event.changedTouches[0].screenY;
            });
            var wheelEvent = 'onwheel' in document ? 'wheel' : document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
            if ($(window).width() < 992 && $('html').hasClass('touch')) {
                wheelEvent = 'onwheel' in document ? 'wheel touchend' : document.onmousewheel !== undefined ? 'mousewheel touchend' : 'DOMMouseScroll touchend';
            }
            if ($(window).width() < 992) {
                $('html').removeClass('overflow-hidden');
                $(window).on('scroll', function() {
                    var index = 0;
                    $('.section-scroll').each(function() {
                        if ($(this).offset().top <= $(window).scrollTop() + 50) {
                            var $currentSection2 = $('.section-wrapper').eq(index).find('.section-scroll');
                            $('.section-scroll-dots-navigation > ul > li').removeClass('active');
                            $('.section-scroll-dots-navigation > ul > li').eq(index).addClass('active');
                            $(window).trigger({
                                type: 'section.scroll.mobile.change.header.color',
                                currentSection: $currentSection2
                            });
                        }
                        index++;
                    });
                });
                $(window).on('section.scroll.mobile.change.header.color', function(e) {
                    if (typeof e.currentSection == 'undefined') {
                        return;
                    }
                    var $currentSection = e.currentSection,
                        headerColor = $currentSection.data('section-scroll-header-color');
                    $('#header .header-nav').removeClass('header-nav-light-text header-nav-dark-text').addClass('header-nav-' + headerColor + '-text');
                    $('#header .header-nav-features').removeClass('header-nav-features-dark header-nav-features-light').addClass('header-nav-features-' + headerColor);
                    $('#header .header-social-icons').removeClass('social-icons-icon-dark social-icons-icon-light').addClass('social-icons-icon-' + headerColor);
                    if (self.options.changeHeaderLogo && headerColor != undefined) {
                        if (headerColor == 'light') {
                            $('#header .header-logo img').attr('src', self.options.headerLogoLight);
                        } else if (headerColor == 'dark') {
                            $('#header .header-logo img').attr('src', self.options.headerLogoDark);
                        }
                    }
                    self.$header.css({
                        opacity: 1
                    });
                });
            }
            $(window).on(wheelEvent, function(e) {
                if ($(window).width() < 992) {
                    return;
                }
                if ($(window).width() < 992 && $('html').hasClass('touch')) {
                    if ($(e.target).closest('.section-scroll-dots-navigation').get(0) || $(e.target).closest('.header-body').get(0) || $(e.target).closest('.owl-carousel').get(0)) {
                        return;
                    }
                }
                if ($('html.side-header-overlay-full-screen.side-header-hide').get(0)) {
                    return;
                }
                var wheelDirection = e.originalEvent.wheelDelta == undefined ? e.originalEvent.deltaY > 0 : e.originalEvent.wheelDelta < 0;
                if ($(window).width() < 992 && $('html').hasClass('touch')) {
                    touchendY = event.changedTouches[0].screenY;
                    if (touchendY <= touchstartY) {
                        touchDirection = 'up';
                    }
                    if (touchendY >= touchstartY) {
                        touchDirection = 'down';
                    }
                    if (touchendY == touchstartY) {
                        return;
                    }
                }
                var $currentSection = $('.section-wrapper').eq(self.getCurrentIndex()).find('.section-scroll'),
                    $nextSection = self.getNextSection(wheelDirection, touchDirection),
                    nextSectionOffsetTop;
                if (self.getCurrentIndex() == $('.section-wrapper').length - 1) {
                    nextSectionOffsetTop = $(document).height();
                } else {
                    nextSectionOffsetTop = $nextSection.offset().top;
                }
                if ($(window).width() < 992 && $('html').hasClass('touch')) {
                    setTimeout(function() {
                        if ($('.section-wrapper').eq(self.getCurrentIndex()).find('.section-scroll').hasClass('section-scroll-scrollable')) {
                            $('html').removeClass('overflow-hidden');
                        } else {
                            $('html').addClass('overflow-hidden');
                        }
                    }, 1200);
                }
                if ($currentSection.hasClass('section-scroll-scrollable')) {
                    if (!flag && !scrollableFlag) {
                        if (wheelDirection || touchDirection == 'up') {
                            if (($(window).scrollTop() + $(window).height()) >= nextSectionOffsetTop) {
                                flag = true;
                                setTimeout(function() {
                                    $(window).trigger('section.scroll.change.header.color');
                                    setTimeout(function() {
                                        flag = false;
                                    }, 500);
                                }, 1000);
                                if (self.getCurrentIndex() == ($('.section-wrapper').length - 1)) {
                                    return false;
                                }
                                self.moveTo($currentSection.offset().top + $currentSection.outerHeight());
                                self.changeSectionActiveState($nextSection);
                                self.$header.css({
                                    opacity: 0,
                                    transition: 'ease opacity 500ms'
                                });
                            }
                            if (!$('html').hasClass('touch')) {
                                for (var i = 1; i < 100; i++) {
                                    $('body, html').scrollTop($(window).scrollTop() + 1);
                                    if (($(window).scrollTop() + $(window).height()) >= nextSectionOffsetTop) {
                                        scrollableFlag = true;
                                        setTimeout(function() {
                                            $(window).trigger('section.scroll.change.header.color');
                                            scrollableFlag = false;
                                        }, 500);
                                        break;
                                    }
                                }
                            }
                        } else {
                            if ($(window).scrollTop() <= $currentSection.offset().top) {
                                flag = true;
                                setTimeout(function() {
                                    $(window).trigger('section.scroll.change.header.color');
                                    setTimeout(function() {
                                        flag = false;
                                    }, 500);
                                }, 1000);
                                if (self.getCurrentIndex() == 0) {
                                    return false;
                                }
                                self.moveTo($currentSection.offset().top - $(window).height());
                                self.changeSectionActiveState($nextSection);
                                self.$header.css({
                                    opacity: 0,
                                    transition: 'ease opacity 500ms'
                                });
                            }
                            if (!$('html').hasClass('touch')) {
                                for (var i = 1; i < 100; i++) {
                                    $('body, html').scrollTop($(window).scrollTop() - 1);
                                    if ($(window).scrollTop() <= $currentSection.offset().top) {
                                        scrollableFlag = true;
                                        setTimeout(function() {
                                            $(window).trigger('section.scroll.change.header.color');
                                            scrollableFlag = false;
                                        }, 500);
                                        break;
                                    }
                                }
                            }
                        }
                        self.changeDotsActiveState();
                        return;
                    }
                }
                if (!flag && !scrollableFlag) {
                    if (wheelDirection || touchDirection == 'up') {
                        if (self.getCurrentIndex() == ($('.section-wrapper').length - 1)) {
                            return false;
                        }
                        self.changeSectionActiveState($nextSection);
                        setTimeout(function() {
                            self.moveTo($nextSection.offset().top);
                        }, 150);
                    } else {
                        if (self.getCurrentIndex() == 0) {
                            return false;
                        }
                        self.changeSectionActiveState($nextSection);
                        if ($nextSection.height() > $(window).height()) {
                            self.moveTo($currentSection.offset().top - $(window).height());
                        } else {
                            setTimeout(function() {
                                self.moveTo($nextSection.offset().top);
                            }, 150);
                        }
                    }
                    self.changeDotsActiveState();
                    self.$header.css({
                        opacity: 0,
                        transition: 'ease opacity 500ms'
                    });
                    $nextSection.css({
                        position: 'relative',
                        opacity: 1,
                        'z-index': 1,
                        transform: 'translate3d(0,0,0) scale(1)'
                    });
                    $currentSection.css({
                        position: 'fixed',
                        width: '100%',
                        top: 0,
                        left: 0,
                        opacity: 0,
                        'z-index': 0,
                        transform: 'translate3d(0,0,-10px) scale(0.7)',
                        transition: 'ease transform 600ms, ease opacity 600ms',
                    });
                    setTimeout(function() {
                        $currentSection.css({
                            position: 'relative',
                            opacity: 1,
                            transform: 'translate3d(0,0,-10px) scale(1)'
                        });
                        $(window).trigger('section.scroll.change.header.color');
                        setTimeout(function() {
                            flag = false;
                        }, 500);
                    }, 1000);
                    flag = true;
                }
                return;
            });
            if (this.options.dotsNav) {
                self.dotsNavigation();
            }
            setTimeout(function() {
                if ($(window.location.hash).get(0)) {
                    self.moveTo($(window.location.hash).parent().offset().top);
                    self.changeSectionActiveState($(window.location.hash));
                    self.changeDotsActiveState();
                    self.updateHash(true);
                } else {
                    var hash = window.location.hash,
                        index = hash.replace('#', '');
                    if (!hash) {
                        index = 1;
                    }
                    self.moveTo($('.section-wrapper').eq(index - 1).offset().top);
                    self.changeSectionActiveState($('.section-wrapper').eq(index - 1).find('.section-scroll'));
                    self.changeDotsActiveState();
                    self.updateHash(true);
                }
                $(window).trigger('section.scroll.ready');
                $(window).trigger('section.scroll.change.header.color');
            }, 500);
            return this;
        },
        updateSectionsHeight: function() {
            var self = this;
            $('.section-scroll').css({
                height: ''
            });
            $('.section-scroll').each(function() {
                if ($(this).outerHeight() < ($(window).height() + 3)) {
                    $(this).css({
                        height: '100vh'
                    });
                } else {
                    $(this).addClass('section-scroll-scrollable');
                }
            });
            $('.section-wrapper').each(function() {
                $(this).height($(this).find('.section-scroll').outerHeight());
            });
            return this;
        },
        updateHash: function(first_load) {
            var self = this;
            if (!window.location.hash) {
                window.location.hash = 1;
            } else {
                if (!first_load) {
                    var $section = $('.section-wrapper').eq(self.getCurrentIndex()).find('.section-scroll'),
                        section_id = $section.attr('id') ? $section.attr('id') : $section.parent().index() + 1;
                    window.location.hash = section_id;
                }
            }
            return this;
        },
        getCurrentIndex: function() {
            var self = this,
                currentIndex = 0;
            currentIndex = $('.section-wrapper.active').index();
            return currentIndex;
        },
        moveTo: function($scrollTopValue, first_load) {
            var self = this;
            $('body, html').animate({
                scrollTop: $scrollTopValue
            }, 1000, 'easeOutQuint');
            setTimeout(function() {
                self.updateHash();
            }, 500);
            return this;
        },
        getNextSection: function(wheelDirection, touchDirection) {
            var self = this,
                $nextSection = '';
            if (wheelDirection || touchDirection == 'up') {
                $nextSection = $('.section-wrapper').eq(self.getCurrentIndex() + 1).find('.section-scroll');
            } else {
                $nextSection = $('.section-wrapper').eq(self.getCurrentIndex() - 1).find('.section-scroll');
            }
            return $nextSection;
        },
        changeSectionActiveState: function($nextSection) {
            var self = this;
            $('.section-wrapper').removeClass('active');
            $nextSection.parent().addClass('active');
            return this;
        },
        changeDotsActiveState: function() {
            var self = this;
            $('.section-scroll-dots-navigation > ul > li').removeClass('active');
            $('.section-scroll-dots-navigation > ul > li').eq(self.getCurrentIndex()).addClass('active');
            return this;
        },
        dotsNavigation: function() {
            var self = this;
            var dotsNav = $('<div class="section-scroll-dots-navigation"><ul class="list list-unstyled"></ul></div>'),
                currentSectionIndex = self.getCurrentIndex();
            if (self.options.dotsClass) {
                dotsNav.addClass(self.options.dotsClass);
            }
            for (var i = 0; i < $('.section-scroll').length; i++) {
                var title = $('.section-wrapper').eq(i).find('.section-scroll').data('section-scroll-title');
                dotsNav.find('> ul').append('<li' + ((currentSectionIndex == i) ? ' class="active"' : '') + '><a href="#' + i + '" data-nav-id="' + i + '"><span>' + title + '</span></a></li>');
            }
            $('.body').append(dotsNav);
            dotsNav.find('a[data-nav-id]').on('click touchstart', function(e) {
                e.preventDefault();
                var $this = $(this);
                $('.section-scroll').css({
                    opacity: 0,
                    transition: 'ease opacity 300ms'
                });
                self.$header.css({
                    opacity: 0,
                    transition: 'ease opacity 500ms'
                });
                setTimeout(function() {
                    self.moveTo($('.section-wrapper').eq($this.data('nav-id')).offset().top)
                    $('.section-wrapper').removeClass('active');
                    $('.section-wrapper').eq($this.data('nav-id')).addClass('active');
                    $('.section-wrapper').eq(self.getCurrentIndex()).find('.section-scroll').css({
                        opacity: 1
                    });
                    setTimeout(function() {
                        $('.section-scroll').css({
                            opacity: 1
                        });
                        $(window).trigger('section.scroll.change.header.color');
                    }, 500);
                    if ($(window).width() > 991) {
                        self.changeDotsActiveState();
                    }
                }, 500);
            });
            return this;
        },
        events: function() {
            var self = this;
            $(window).on('section.scroll.ready', function() {
                $(window).scrollTop(0);
            });
            $(window).on('section.scroll.change.header.color', function() {
                var headerColor = $('.section-wrapper').eq(self.getCurrentIndex()).find('.section-scroll').data('section-scroll-header-color');
                $('#header .header-nav').removeClass('header-nav-light-text header-nav-dark-text').addClass('header-nav-' + headerColor + '-text');
                $('#header .header-nav-features').removeClass('header-nav-features-dark header-nav-features-light').addClass('header-nav-features-' + headerColor);
                $('#header .header-social-icons').removeClass('social-icons-icon-dark social-icons-icon-light').addClass('social-icons-icon-' + headerColor);
                if (self.options.changeHeaderLogo && headerColor != undefined) {
                    if (headerColor == 'light') {
                        $('#header .header-logo img').attr('src', self.options.headerLogoLight);
                    } else if (headerColor == 'dark') {
                        $('#header .header-logo img').attr('src', self.options.headerLogoDark);
                    }
                }
                self.$header.css({
                    opacity: 1
                });
            });
            $(document).ready(function() {
                $(window).afterResize(function() {
                    self.updateSectionsHeight();
                    if ($(window).width() < 992) {
                        $('html').removeClass('overflow-hidden');
                    }
                });
            });
            return this;
        }
    };
    $.extend(theme, {
        PluginSectionScroll: PluginSectionScroll
    });
    $.fn.themePluginSectionScroll = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginSectionScroll($this, opts);
            }
        });
    };
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__sort';
    var PluginSort = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginSort.defaults = {
        useHash: true,
        itemSelector: '.isotope-item',
        layoutMode: 'masonry',
        filter: '*',
        hiddenStyle: {
            opacity: 0
        },
        visibleStyle: {
            opacity: 1
        },
        stagger: 30,
        isOriginLeft: ($('html').attr('dir') == 'rtl' ? false : true)
    };
    PluginSort.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginSort.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.isotope))) {
                return this;
            }
            var self = this,
                $source = this.options.wrapper,
                $destination = $('.sort-destination[data-sort-id="' + $source.attr('data-sort-id') + '"]'),
                $window = $(window);
            if ($destination.get(0)) {
                self.$source = $source;
                self.$destination = $destination;
                self.$loader = false;
                self.setParagraphHeight($destination);
                if (self.$destination.parents('.sort-destination-loader').get(0)) {
                    self.$loader = self.$destination.parents('.sort-destination-loader');
                    self.createLoader();
                }
                $destination.attr('data-filter', '*');
                $destination.one('layoutComplete', function(event, laidOutItems) {
                    self.removeLoader();
                    if ($('[data-plugin-sticky]').length) {
                        setTimeout(function() {
                            $('[data-plugin-sticky]').each(function() {
                                $(this).data('__sticky').build();
                                $(window).trigger('resize');
                            });
                        }, 500);
                    }
                });
                if ($('html').hasClass('ie10') || $('html').hasClass('ie11')) {
                    var padding = parseInt(self.options.wrapper.children().css('padding-left')) + parseInt(self.options.wrapper.children().css('padding-right'));
                }
                $destination.waitForImages(function() {
                    $destination.isotope(self.options);
                    self.events();
                });
                setTimeout(function() {
                    self.removeLoader();
                }, 3000);
            }
            return this;
        },
        events: function() {
            var self = this,
                filter = null,
                $window = $(window);
            self.$source.find('a').click(function(e) {
                e.preventDefault();
                filter = $(this).parent().data('option-value');
                self.setFilter(filter);
                if (e.originalEvent) {
                    self.$source.trigger('filtered');
                }
                return this;
            });
            self.$destination.trigger('filtered');
            self.$source.trigger('filtered');
            if (self.options.useHash) {
                self.hashEvents();
            }
            $window.on('resize sort.resize', function() {
                setTimeout(function() {
                    self.$destination.isotope('layout');
                }, 300);
            });
            setTimeout(function() {
                $window.trigger('sort.resize');
            }, 300);
            return this;
        },
        setFilter: function(filter) {
            var self = this,
                page = false,
                currentFilter = filter;
            self.$source.find('.active').removeClass('active');
            self.$source.find('li[data-option-value="' + filter + '"], li[data-option-value="' + filter + '"] > a').addClass('active');
            self.options.filter = currentFilter;
            if (self.$destination.attr('data-current-page')) {
                currentFilter = currentFilter + '[data-page-rel=' + self.$destination.attr('data-current-page') + ']';
            }
            self.$destination.attr('data-filter', filter).isotope({
                filter: currentFilter
            }).one('arrangeComplete', function(event, filteredItems) {
                if (self.options.useHash) {
                    if (window.location.hash != '' || self.options.filter.replace('.', '') != '*') {
                        window.location.hash = self.options.filter.replace('.', '');
                    }
                }
                $(window).trigger('scroll');
            }).trigger('filtered');
            return this;
        },
        hashEvents: function() {
            var self = this,
                hash = null,
                hashFilter = null,
                initHashFilter = '.' + location.hash.replace('#', '');
            if (initHashFilter != '.' && initHashFilter != '.*') {
                self.setFilter(initHashFilter);
            }
            $(window).on('hashchange', function(e) {
                hashFilter = '.' + location.hash.replace('#', '');
                hash = (hashFilter == '.' || hashFilter == '.*' ? '*' : hashFilter);
                self.setFilter(hash);
            });
            return this;
        },
        setParagraphHeight: function() {
            var self = this,
                minParagraphHeight = 0,
                paragraphs = $('span.thumb-info-caption p', self.$destination);
            paragraphs.each(function() {
                if ($(this).height() > minParagraphHeight) {
                    minParagraphHeight = ($(this).height() + 10);
                }
            });
            paragraphs.height(minParagraphHeight);
            return this;
        },
        createLoader: function() {
            var self = this;
            var loaderTemplate = ['<div class="bounce-loader">', '<div class="bounce1"></div>', '<div class="bounce2"></div>', '<div class="bounce3"></div>', '</div>'].join('');
            self.$loader.append(loaderTemplate);
            return this;
        },
        removeLoader: function() {
            var self = this;
            if (self.$loader) {
                self.$loader.removeClass('sort-destination-loader-showing');
                setTimeout(function() {
                    self.$loader.addClass('sort-destination-loader-loaded');
                }, 300);
            }
        }
    };
    $.extend(theme, {
        PluginSort: PluginSort
    });
    $.fn.themePluginSort = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginSort($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__starrating';
    var PluginStarRating = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginStarRating.defaults = {
        theme: 'krajee-fas',
        color: 'primary',
        showClear: false,
        showCaption: false
    };
    PluginStarRating.prototype = {
        initialize: function($el, opts) {
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginStarRating.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.rating))) {
                return this;
            }
            var self = this;
            self.options.wrapper.rating(self.options);
            self.options.wrapper.parents('.rating-container').addClass('rating-' + self.options.color);
            if (self.options.extraClass) {
                self.options.wrapper.parents('.rating-container').addClass(self.options.extraClass);
            }
            return this;
        }
    };
    $.extend(theme, {
        PluginStarRating: PluginStarRating
    });
    $.fn.themePluginStarRating = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginStarRating($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__sticky';
    var PluginSticky = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginSticky.defaults = {
        minWidth: 991,
        activeClass: 'sticky-active'
    };
    PluginSticky.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build().events();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginSticky.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.pin))) {
                return this;
            }
            var self = this,
                $window = $(window);
            self.options.wrapper.pin(self.options);
            if (self.options.wrapper.hasClass('sticky-wrapper-transparent')) {
                self.options.wrapper.parent().addClass('position-absolute w-100');
            }
            $window.afterResize(function() {
                self.options.wrapper.removeAttr('style').removeData('pin');
                self.options.wrapper.pin(self.options);
                $window.trigger('scroll');
            });
            if (self.options.wrapper.find('img').attr('data-change-src')) {
                var $logo = self.options.wrapper.find('img'),
                    logoSrc = $logo.attr('src'),
                    logoNewSrc = $logo.attr('data-change-src');
                self.changeLogoSrc = function(activate) {
                    if (activate) {
                        $logo.attr('src', logoNewSrc);
                    } else {
                        $logo.attr('src', logoSrc);
                    }
                }
            }
            return this;
        },
        events: function() {
            var self = this,
                $window = $(window),
                $logo = self.options.wrapper.find('img'),
                sticky_activate_flag = true,
                sticky_deactivate_flag = false,
                class_to_check = (self.options.wrapper.hasClass('sticky-wrapper-effect-1')) ? 'sticky-effect-active' : 'sticky-active';
            $window.on('scroll sticky.effect.active', function() {
                if (self.options.wrapper.hasClass(class_to_check)) {
                    if (sticky_activate_flag) {
                        if ($logo.attr('data-change-src')) {
                            self.changeLogoSrc(true);
                        }
                        sticky_activate_flag = false;
                        sticky_deactivate_flag = true;
                    }
                } else {
                    if (sticky_deactivate_flag) {
                        if ($logo.attr('data-change-src')) {
                            self.changeLogoSrc(false);
                        }
                        sticky_deactivate_flag = false;
                        sticky_activate_flag = true;
                    }
                }
            });
            var is_backing = false;
            if (self.options.stickyStartEffectAt) {
                if (self.options.stickyStartEffectAt < $window.scrollTop()) {
                    self.options.wrapper.addClass('sticky-effect-active');
                    $window.trigger('sticky.effect.active');
                }
                $window.on('scroll', function() {
                    if (self.options.stickyStartEffectAt < $window.scrollTop()) {
                        self.options.wrapper.addClass('sticky-effect-active');
                        is_backing = true;
                        $window.trigger('sticky.effect.active');
                    } else {
                        if (is_backing) {
                            self.options.wrapper.find('.sticky-body').addClass('position-fixed');
                            is_backing = false;
                        }
                        if ($window.scrollTop() == 0) {
                            self.options.wrapper.find('.sticky-body').removeClass('position-fixed');
                        }
                        self.options.wrapper.removeClass('sticky-effect-active');
                    }
                });
            }
            if ($('[data-toggle="collapse"]').get(0)) {
                $('[data-toggle="collapse"]').on('click', function() {
                    setTimeout(function() {
                        self.build();
                        $(window).trigger('scroll');
                    }, 1000);
                });
            }
        }
    };
    $.extend(theme, {
        PluginSticky: PluginSticky
    });
    $.fn.themePluginSticky = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginSticky($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__toggle';
    var PluginToggle = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginToggle.defaults = {
        duration: 350,
        isAccordion: false
    };
    PluginToggle.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginToggle.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this,
                $wrapper = this.options.wrapper,
                $items = $wrapper.find('> .toggle'),
                $el = null;
            $items.each(function() {
                $el = $(this);
                if ($el.hasClass('active')) {
                    $el.find('> p').addClass('preview-active');
                    $el.find('> .toggle-content').slideDown(self.options.duration);
                }
                self.events($el);
            });
            if (self.options.isAccordion) {
                self.options.duration = self.options.duration / 2;
            }
            return this;
        },
        events: function($el) {
            var self = this,
                previewParCurrentHeight = 0,
                previewParAnimateHeight = 0,
                toggleContent = null;
            $el.find('> label, > .toggle-title').click(function(e) {
                var $this = $(this),
                    parentSection = $this.parent(),
                    parentWrapper = $this.parents('.toggle'),
                    previewPar = null,
                    closeElement = null;
                if (self.options.isAccordion && typeof(e.originalEvent) != 'undefined') {
                    closeElement = parentWrapper.find('.toggle.active > label, .toggle.active > .toggle-title');
                    if (closeElement[0] == $this[0]) {
                        return;
                    }
                }
                parentSection.toggleClass('active');
                if (parentSection.find('> p').get(0)) {
                    previewPar = parentSection.find('> p');
                    previewParCurrentHeight = previewPar.css('height');
                    previewPar.css('height', 'auto');
                    previewParAnimateHeight = previewPar.css('height');
                    previewPar.css('height', previewParCurrentHeight);
                }
                toggleContent = parentSection.find('> .toggle-content');
                if (parentSection.hasClass('active')) {
                    $(previewPar).animate({
                        height: previewParAnimateHeight
                    }, self.options.duration, function() {
                        $(this).addClass('preview-active');
                    });
                    toggleContent.slideDown(self.options.duration, function() {
                        if (closeElement) {
                            closeElement.trigger('click');
                        }
                    });
                } else {
                    $(previewPar).animate({
                        height: 0
                    }, self.options.duration, function() {
                        $(this).removeClass('preview-active');
                    });
                    toggleContent.slideUp(self.options.duration);
                }
            });
        }
    };
    $.extend(theme, {
        PluginToggle: PluginToggle
    });
    $.fn.themePluginToggle = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginToggle($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__tweets';
    var PluginTweets = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginTweets.defaults = {
        username: null,
        count: 2,
        URL: 'php/twitter-feed.php',
        iconColor: false
    };
    PluginTweets.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this.setData().setOptions(opts).build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginTweets.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (this.options.username == null || this.options.username == '') {
                return this;
            }
            var self = this,
                $wrapper = this.options.wrapper;
            $.ajax({
                type: 'GET',
                data: {
                    twitter_screen_name: self.options.username,
                    tweets_to_display: self.options.count,
                    icon_color: self.options.iconColor
                },
                url: self.options.URL,
            }).done(function(html) {
                $wrapper.html(html).find('a').attr('target', '_blank');
            });
            return this;
        }
    };
    $.extend(theme, {
        PluginTweets: PluginTweets
    });
    $.fn.themePluginTweets = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginTweets($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    $.extend(theme, {
        PluginValidation: {
            defaults: {
                formClass: 'needs-validation',
                validator: {
                    highlight: function(element) {
                        $(element).addClass('is-invalid').removeClass('is-valid').parent().removeClass('has-success').addClass('has-danger');
                    },
                    success: function(label, element) {
                        $(element).removeClass('is-invalid').addClass('is-valid').parent().removeClass('has-danger').addClass('has-success').find('label.error').remove();
                    },
                    errorPlacement: function(error, element) {
                        if (element.attr('type') == 'radio' || element.attr('type') == 'checkbox') {
                            error.appendTo(element.parent().parent());
                        } else {
                            error.insertAfter(element);
                        }
                    }
                },
                validateCaptchaURL: 'php/contact-form-verify-captcha.php',
                refreshCaptchaURL: 'php/contact-form-refresh-captcha.php'
            },
            initialize: function(opts) {
                initialized = true;
                this.setOptions(opts).build();
                return this;
            },
            setOptions: function(opts) {
                this.options = $.extend(true, {}, this.defaults, opts);
                return this;
            },
            build: function() {
                var self = this;
                if (!($.isFunction($.validator))) {
                    return this;
                }
                self.addMethods();
                self.setMessageGroups();
                $.validator.setDefaults(self.options.validator);
                $('.' + self.options.formClass).validate();
                return this;
            },
            addMethods: function() {
                var self = this;
                $.validator.addMethod('captcha', function(value, element, params) {
                    var captchaValid = false;
                    $.ajax({
                        url: self.options.validateCaptchaURL,
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        data: {
                            captcha: $.trim(value)
                        },
                        success: function(data) {
                            if (data.response == 'success') {
                                captchaValid = true;
                            }
                        }
                    });
                    if (captchaValid) {
                        return true;
                    }
                }, '');
                $('#refreshCaptcha').on('click', function(e) {
                    e.preventDefault();
                    $.get(self.options.refreshCaptchaURL, function(url) {
                        $('#captcha-image').attr('src', url);
                    });
                });
            },
            setMessageGroups: function() {
                $('.checkbox-group[data-msg-required], .radio-group[data-msg-required]').each(function() {
                    var message = $(this).data('msg-required');
                    $(this).find('input').attr('data-msg-required', message);
                });
            }
        }
    });
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__videobackground';
    var PluginVideoBackground = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginVideoBackground.defaults = {
        overlay: false,
        volume: 1,
        playbackRate: 1,
        muted: true,
        loop: true,
        autoplay: true,
        position: '50% 50%',
        posterType: 'detect',
        className: 'vide-video-wrapper'
    };
    PluginVideoBackground.prototype = {
        initialize: function($el, opts) {
            this.$el = $el;
            this.setData().setOptions(opts).build().events();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginVideoBackground.defaults, opts, {
                path: this.$el.data('video-path'),
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            var self = this;
            if (!($.isFunction($.fn.vide)) || (!this.options.path)) {
                return this;
            }
            if (this.options.overlay) {
                var overlayClass = this.options.overlayClass;
                this.options.wrapper.prepend($('<div />').addClass(overlayClass));
            }
            this.options.wrapper.vide(this.options.path, this.options).first().css('z-index', 0);
            self.changePoster();
            if (self.options.wrapper.closest('.owl-carousel').get(0)) {
                self.options.wrapper.closest('.owl-carousel').on('initialized.owl.carousel', function() {
                    $('.owl-item.cloned').find('[data-plugin-video-background] .vide-video-wrapper').remove();
                    $('.owl-item.cloned').find('[data-plugin-video-background]').vide(self.options.path, self.options).first().css('z-index', 0);
                    self.changePoster(self.options.wrapper.closest('.owl-carousel'));
                });
            }
            var $playButton = self.options.wrapper.find('.video-background-play');
            if ($playButton.get(0)) {
                var $playWrapper = self.options.wrapper.find('.video-background-play-wrapper');
                self.options.wrapper.find('.video-background-play').on('click', function(e) {
                    e.preventDefault();
                    if ($playWrapper.get(0)) {
                        $playWrapper.animate({
                            opacity: 0
                        }, 300, function() {
                            $playWrapper.parent().height($playWrapper.outerHeight());
                            $playWrapper.remove();
                        });
                    } else {
                        $playButton.animate({
                            opacity: 0
                        }, 300, function() {
                            $playButton.remove();
                        });
                    }
                    setTimeout(function() {
                        self.options.wrapper.find('video')[0].play();
                    }, 500)
                });
            }
            return this;
        },
        changePoster: function($carousel) {
            var self = this;
            if ($carousel && self.options.changePoster) {
                $carousel.find('.owl-item [data-plugin-video-background] .vide-video-wrapper').css({
                    'background-image': 'url(' + self.options.changePoster + ')'
                });
                return this;
            }
            if (self.options.changePoster) {
                self.options.wrapper.find('.vide-video-wrapper').css({
                    'background-image': 'url(' + self.options.changePoster + ')'
                });
            }
            return this;
        },
        events: function() {
            var self = this;
            self.options.wrapper.on('video.background.initialize', function() {
                self.build();
            });
            return this;
        }
    };
    $.extend(theme, {
        PluginVideoBackground: PluginVideoBackground
    });
    $.fn.themePluginVideoBackground = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginVideoBackground($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var initialized = false;
    $.extend(theme, {
        Account: {
            defaults: {
                wrapper: $('#headerAccount')
            },
            initialize: function($wrapper, opts) {
                if (initialized) {
                    return this;
                }
                initialized = true;
                this.$wrapper = ($wrapper || this.defaults.wrapper);
                this.setOptions(opts).events();
                return this;
            },
            setOptions: function(opts) {
                this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));
                return this;
            },
            events: function() {
                var self = this;
                $(window).on('load', function() {
                    $(document).ready(function() {
                        setTimeout(function() {
                            self.$wrapper.find('input').on('focus', function() {
                                self.$wrapper.addClass('open');
                                $(document).mouseup(function(e) {
                                    if (!self.$wrapper.is(e.target) && self.$wrapper.has(e.target).length === 0) {
                                        self.$wrapper.removeClass('open');
                                    }
                                });
                            });
                        }, 1500);
                    });
                });
                $('#headerSignUp').on('click', function(e) {
                    e.preventDefault();
                    self.$wrapper.addClass('signup').removeClass('signin').removeClass('recover');
                    self.$wrapper.find('.signup-form input:first').focus();
                });
                $('#headerSignIn').on('click', function(e) {
                    e.preventDefault();
                    self.$wrapper.addClass('signin').removeClass('signup').removeClass('recover');
                    self.$wrapper.find('.signin-form input:first').focus();
                });
                $('#headerRecover').on('click', function(e) {
                    e.preventDefault();
                    self.$wrapper.addClass('recover').removeClass('signup').removeClass('signin');
                    self.$wrapper.find('.recover-form input:first').focus();
                });
                $('#headerRecoverCancel').on('click', function(e) {
                    e.preventDefault();
                    self.$wrapper.addClass('signin').removeClass('signup').removeClass('recover');
                    self.$wrapper.find('.signin-form input:first').focus();
                });
            }
        }
    });
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var initialized = false;
    $.extend(theme, {
        Nav: {
            defaults: {
                wrapper: $('#mainNav'),
                scrollDelay: 600,
                scrollAnimation: 'easeOutQuad'
            },
            initialize: function($wrapper, opts) {
                if (initialized) {
                    return this;
                }
                initialized = true;
                this.$wrapper = ($wrapper || this.defaults.wrapper);
                this.setOptions(opts).build().events();
                return this;
            },
            setOptions: function(opts) {
                this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));
                return this;
            },
            build: function() {
                var self = this,
                    $html = $('html'),
                    $header = $('#header'),
                    $headerNavMain = $('#header .header-nav-main'),
                    thumbInfoPreview;
                if (self.$wrapper.find('a[data-thumb-preview]').length) {
                    self.$wrapper.find('a[data-thumb-preview]').each(function() {
                        thumbInfoPreview = $('<span />').addClass('thumb-info thumb-info-preview').append($('<span />').addClass('thumb-info-wrapper').append($('<span />').addClass('thumb-info-image').css('background-image', 'url(' + $(this).data('thumb-preview') + ')')));
                        $(this).append(thumbInfoPreview);
                    });
                }
                if ($html.hasClass('side-header') || $html.hasClass('side-header-hamburguer-sidebar')) {
                    if ($html.hasClass('side-header-right') || $html.hasClass('side-header-hamburguer-sidebar-right')) {
                        if (!$html.hasClass('side-header-right-no-reverse')) {
                            $header.find('.dropdown-submenu').addClass('dropdown-reverse');
                        }
                    }
                } else {
                    var checkReverseFlag = false;
                    self.checkReverse = function() {
                        if (!checkReverseFlag) {
                            self.$wrapper.find('.dropdown, .dropdown-submenu').removeClass('dropdown-reverse');
                            self.$wrapper.find('.dropdown:not(.manual):not(.dropdown-mega), .dropdown-submenu:not(.manual)').each(function() {
                                if (!$(this).find('.dropdown-menu').visible(false, true, 'horizontal')) {
                                    $(this).addClass('dropdown-reverse');
                                }
                            });
                            checkReverseFlag = true;
                        }
                    }
                    $(window).on('resize', function() {
                        checkReverseFlag = false;
                    });
                    $header.on('mouseover', function() {
                        self.checkReverse();
                    });
                }
                if ($headerNavMain.hasClass('header-nav-main-clone-items')) {
                    $headerNavMain.find('nav > ul > li > a').each(function() {
                        var parent = $(this).parent(),
                            clone = $(this).clone(),
                            clone2 = $(this).clone(),
                            wrapper = $('<span class="wrapper-items-cloned"></span>');
                        $(this).addClass('item-original');
                        clone2.addClass('item-two');
                        parent.prepend(wrapper);
                        wrapper.append(clone).append(clone2);
                    });
                }
                if ($('#header.header-floating-icons').length && $(window).width() > 991) {
                    var menuFloatingAnim = {
                        $menuFloating: $('#header.header-floating-icons .header-container > .header-row'),
                        build: function() {
                            var self = this;
                            self.init();
                        },
                        init: function() {
                            var self = this,
                                divisor = 0;
                            $(window).scroll(function() {
                                var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height()),
                                    st = $(this).scrollTop();
                                divisor = $(document).height() / $(window).height();
                                self.$menuFloating.find('.header-column > .header-row').css({
                                    transform: 'translateY( calc(' + scrollPercent + 'vh - ' + st / divisor + 'px) )'
                                });
                            });
                        }
                    }
                    menuFloatingAnim.build();
                }
                if ($('.header-nav-links-vertical-slide').length) {
                    var slideNavigation = {
                        $mainNav: $('#mainNav'),
                        $mainNavItem: $('#mainNav li'),
                        build: function() {
                            var self = this;
                            self.menuNav();
                        },
                        menuNav: function() {
                            var self = this;
                            self.$mainNavItem.on('click', function(e) {
                                var currentMenuItem = $(this),
                                    currentMenu = $(this).parent(),
                                    nextMenu = $(this).find('ul').first(),
                                    prevMenu = $(this).closest('.next-menu'),
                                    isSubMenu = currentMenuItem.hasClass('dropdown') || currentMenuItem.hasClass('dropdown-submenu'),
                                    isBack = currentMenuItem.hasClass('back-button'),
                                    nextMenuHeightDiff = ((nextMenu.find('> li').length * nextMenu.find('> li').outerHeight()) - nextMenu.outerHeight()),
                                    prevMenuHeightDiff = ((prevMenu.find('> li').length * prevMenu.find('> li').outerHeight()) - prevMenu.outerHeight());
                                if (isSubMenu) {
                                    currentMenu.addClass('next-menu');
                                    nextMenu.addClass('visible');
                                    currentMenu.css({
                                        overflow: 'visible',
                                        'overflow-y': 'visible'
                                    });
                                    if (nextMenuHeightDiff > 0) {
                                        nextMenu.css({
                                            overflow: 'hidden',
                                            'overflow-y': 'scroll'
                                        });
                                    }
                                    for (i = 0; i < nextMenu.find('> li').length; i++) {
                                        if (nextMenu.outerHeight() < ($('.header-row-side-header').outerHeight() - 100)) {
                                            nextMenu.css({
                                                height: nextMenu.outerHeight() + nextMenu.find('> li').outerHeight()
                                            });
                                        }
                                    }
                                    nextMenu.css({
                                        'padding-top': nextMenuHeightDiff + 'px'
                                    });
                                }
                                if (isBack) {
                                    currentMenu.parent().parent().removeClass('next-menu');
                                    currentMenu.removeClass('visible');
                                    if (prevMenuHeightDiff > 0) {
                                        prevMenu.css({
                                            overflow: 'hidden',
                                            'overflow-y': 'scroll'
                                        });
                                    }
                                }
                                e.stopPropagation();
                            });
                        }
                    }
                    $(window).trigger('resize');
                    if ($(window).width() > 991) {
                        slideNavigation.build();
                    }
                    $(document).ready(function() {
                        $(window).afterResize(function() {
                            if ($(window).width() > 991) {
                                slideNavigation.build();
                            }
                        });
                    });
                }
                if ($('.header-nav-main-mobile-dark').length) {
                    $('#header:not(.header-transparent-dark-bottom-border):not(.header-transparent-light-bottom-border)').addClass('header-no-border-bottom');
                }
                if ($(window).width() > 991) {
                    var focusFlag = false;
                    $header.find('.header-nav-main nav > ul > li > a').on('focus', function() {
                        if ($(window).width() > 991) {
                            if (!focusFlag) {
                                focusFlag = true;
                                $(this).trigger('blur');
                                self.focusMenuWithChildren();
                            }
                        }
                    });
                }
                return this;
            },
            focusMenuWithChildren: function() {
                var links, i, len, menu = document.querySelector('html:not(.side-header):not(.side-header-hamburguer-sidebar):not(.side-header-overlay-full-screen) .header-nav-main > nav');
                if (!menu) {
                    return false;
                }
                links = menu.getElementsByTagName('a');
                for (i = 0, len = links.length; i < len; i++) {
                    links[i].addEventListener('focus', toggleFocus, true);
                    links[i].addEventListener('blur', toggleFocus, true);
                }

                function toggleFocus() {
                    var self = this;
                    while (-1 === self.className.indexOf('header-nav-main')) {
                        if ('li' === self.tagName.toLowerCase()) {
                            if (-1 !== self.className.indexOf('accessibility-open')) {
                                self.className = self.className.replace(' accessibility-open', '');
                            } else {
                                self.className += ' accessibility-open';
                            }
                        }
                        self = self.parentElement;
                    }
                }
            },
            events: function() {
                var self = this,
                    $html = $('html'),
                    $header = $('#header'),
                    $window = $(window),
                    headerBodyHeight = $('.header-body').outerHeight();
                if ($header.hasClass('header')) {
                    $header = $('.header');
                }
                $header.find('a[href="#"]').on('click', function(e) {
                    e.preventDefault();
                });
                if ($html.hasClass('side-header-hamburguer-sidebar')) {
                    $header.find('.dropdown-toggle, .dropdown-submenu > a').append('<i class="fas fa-chevron-down fa-chevron-right"></i>');
                } else {
                    $header.find('.dropdown-toggle, .dropdown-submenu > a').append('<i class="fas fa-chevron-down"></i>');
                }
                $header.find('.dropdown-toggle[href="#"], .dropdown-submenu a[href="#"], .dropdown-toggle[href!="#"] .fa-chevron-down, .dropdown-submenu a[href!="#"] .fa-chevron-down').on('click', function(e) {
                    e.preventDefault();
                    if ($window.width() < 992) {
                        $(this).closest('li').toggleClass('open');
                        var height = ($header.hasClass('header-effect-shrink') && $html.hasClass('sticky-header-active')) ? theme.StickyHeader.options.stickyHeaderContainerHeight : headerBodyHeight;
                        $('.header-body').animate({
                            height: ($('.header-nav-main nav').outerHeight(true) + height) + 10
                        }, 0);
                    }
                });
                $header.find('li a.active').addClass('current-page-active');
                $header.find('.header-nav-click-to-open .dropdown-toggle[href="#"], .header-nav-click-to-open .dropdown-submenu a[href="#"], .header-nav-click-to-open .dropdown-toggle > i').on('click', function(e) {
                    if (!$('html').hasClass('side-header-hamburguer-sidebar') && $window.width() > 991) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    if ($window.width() > 991) {
                        e.preventDefault();
                        e.stopPropagation();
                        $header.find('li a.active').removeClass('active');
                        if ($(this).prop('tagName') == 'I') {
                            $(this).parent().addClass('active');
                        } else {
                            $(this).addClass('active');
                        }
                        if (!$(this).closest('li').hasClass('open')) {
                            var $li = $(this).closest('li'),
                                isSub = false;
                            if ($(this).prop('tagName') == 'I') {
                                $('#header .dropdown.open').removeClass('open');
                                $('#header .dropdown-menu .dropdown-submenu.open').removeClass('open');
                            }
                            if ($(this).parent().hasClass('dropdown-submenu')) {
                                isSub = true;
                            }
                            $(this).closest('.dropdown-menu').find('.dropdown-submenu.open').removeClass('open');
                            $(this).parent('.dropdown').parent().find('.dropdown.open').removeClass('open');
                            if (!isSub) {
                                $(this).parent().find('.dropdown-submenu.open').removeClass('open');
                            }
                            $li.addClass('open');
                            $(document).off('click.nav-click-to-open').on('click.nav-click-to-open', function(e) {
                                if (!$li.is(e.target) && $li.has(e.target).length === 0) {
                                    $li.removeClass('open');
                                    $li.parents('.open').removeClass('open');
                                    $header.find('li a.active').removeClass('active');
                                    $header.find('li a.current-page-active').addClass('active');
                                }
                            });
                        } else {
                            $(this).closest('li').removeClass('open');
                            $header.find('li a.active').removeClass('active');
                            $header.find('li a.current-page-active').addClass('active');
                        }
                        $window.trigger({
                            type: 'resize',
                            from: 'header-nav-click-to-open'
                        });
                    }
                });
                $header.find('[data-collapse-nav]').on('click', function(e) {
                    $(this).parents('.collapse').removeClass('show');
                });
                $header.find('.header-nav-features-toggle').on('click', function(e) {
                    e.preventDefault();
                    var $toggleParent = $(this).parent();
                    if (!$(this).siblings('.header-nav-features-dropdown').hasClass('show')) {
                        var $dropdown = $(this).siblings('.header-nav-features-dropdown');
                        $('.header-nav-features-dropdown.show').removeClass('show');
                        $dropdown.addClass('show');
                        $(document).off('click.header-nav-features-toggle').on('click.header-nav-features-toggle', function(e) {
                            if (!$toggleParent.is(e.target) && $toggleParent.has(e.target).length === 0) {
                                $('.header-nav-features-dropdown.show').removeClass('show');
                            }
                        });
                        if ($(this).attr('data-focus')) {
                            $('#' + $(this).attr('data-focus')).focus();
                        }
                    } else {
                        $(this).siblings('.header-nav-features-dropdown').removeClass('show');
                    }
                });
                var $hamburguerMenuBtn = $('.hamburguer-btn:not(.side-panel-toggle)'),
                    $hamburguerSideHeader = $('#header.side-header, #header.side-header-overlay-full-screen');
                $hamburguerMenuBtn.on('click', function() {
                    if ($(this).attr('data-set-active') != 'false') {
                        $(this).toggleClass('active');
                    }
                    $hamburguerSideHeader.toggleClass('side-header-hide');
                    $html.toggleClass('side-header-hide');
                    $window.trigger('resize');
                });
                $('.hamburguer-close:not(.side-panel-toggle)').on('click', function() {
                    $('.hamburguer-btn:not(.hamburguer-btn-side-header-mobile-show)').trigger('click');
                });
                $('.header-nav-main nav').on('show.bs.collapse', function() {
                    $(this).removeClass('closed');
                    $('html').addClass('mobile-menu-opened');
                    $('.header-body').animate({
                        height: ($('.header-body').outerHeight() + $('.header-nav-main nav').outerHeight(true)) + 10
                    });
                    if ($('#header').is('.header-bottom-slider, .header-below-slider') && !$('html').hasClass('sticky-header-active')) {
                        self.scrollToTarget($('#header'), 0);
                    }
                });
                $('.header-nav-main nav').on('hide.bs.collapse', function() {
                    $(this).addClass('closed');
                    $('html').removeClass('mobile-menu-opened');
                    $('.header-body').animate({
                        height: ($('.header-body').outerHeight() - $('.header-nav-main nav').outerHeight(true))
                    }, function() {
                        $(this).height('auto');
                    });
                });
                $window.on('stickyHeader.activate', function() {
                    if ($window.width() < 992 && $header.hasClass('header-effect-shrink')) {
                        if ($('.header-btn-collapse-nav').attr('aria-expanded') == 'true') {
                            $('.header-body').animate({
                                height: ($('.header-nav-main nav').outerHeight(true) + theme.StickyHeader.options.stickyHeaderContainerHeight) + (($('.header-nav-bar').length) ? $('.header-nav-bar').outerHeight() : 0)
                            });
                        }
                    }
                });
                $window.on('stickyHeader.deactivate', function() {
                    if ($window.width() < 992 && $header.hasClass('header-effect-shrink')) {
                        if ($('.header-btn-collapse-nav').attr('aria-expanded') == 'true') {
                            $('.header-body').animate({
                                height: headerBodyHeight + $('.header-nav-main nav').outerHeight(true) + 10
                            });
                        }
                    }
                });
                $window.on('resize.removeOpen', function(e) {
                    if (e.from == 'header-nav-click-to-open') {
                        return;
                    }
                    setTimeout(function() {
                        if ($window.width() > 991) {
                            $header.find('.dropdown.open').removeClass('open');
                        }
                    }, 100);
                });
                $(document).ready(function() {
                    if ($window.width() > 991) {
                        var flag = false;
                        $window.on('resize', function(e) {
                            if (e.from == 'header-nav-click-to-open') {
                                return;
                            }
                            $header.find('.dropdown.open').removeClass('open');
                            if ($window.width() < 992 && flag == false) {
                                headerBodyHeight = $('.header-body').outerHeight();
                                flag = true;
                                setTimeout(function() {
                                    flag = false;
                                }, 500);
                            }
                        });
                    }
                });
                if ($html.hasClass('side-header')) {
                    if ($window.width() < 992) {
                        $header.css({
                            height: $('.header-body .header-container').outerHeight() + (parseInt($('.header-body').css('border-top-width')) + parseInt($('.header-body').css('border-bottom-width')))
                        });
                    }
                    $(document).ready(function() {
                        $window.afterResize(function() {
                            if ($window.width() < 992) {
                                $header.css({
                                    height: $('.header-body .header-container').outerHeight() + (parseInt($('.header-body').css('border-top-width')) + parseInt($('.header-body').css('border-bottom-width')))
                                });
                            } else {
                                $header.css({
                                    height: ''
                                });
                            }
                        });
                    });
                }
                if ($('[data-hash]').length) {
                    $('[data-hash]').on('mouseover', function() {
                        var $this = $(this);
                        if (!$this.data('__dataHashBinded')) {
                            var target = $this.attr('href'),
                                offset = ($this.is("[data-hash-offset]") ? $this.data('hash-offset') : 0),
                                delay = ($this.is("[data-hash-delay]") ? $this.data('hash-delay') : 0);
                            if (target.indexOf('#') != -1 && $(target).length) {
                                $this.on('click', function(e) {
                                    e.preventDefault();
                                    if (!$(e.target).is('i')) {
                                        setTimeout(function() {
                                            $this.parents('.collapse.show').collapse('hide');
                                            $hamburguerSideHeader.addClass('side-header-hide');
                                            $html.addClass('side-header-hide');
                                            $window.trigger('resize');
                                            self.scrollToTarget(target, offset);
                                            if ($this.data('hash-trigger-click')) {
                                                var $clickTarget = $($this.data('hash-trigger-click')),
                                                    clickDelay = $this.data('hash-trigger-click-delay') ? $this.data('hash-trigger-click-delay') : 0;
                                                if ($clickTarget.length) {
                                                    setTimeout(function() {
                                                        $clickTarget.trigger('click');
                                                    }, clickDelay);
                                                }
                                            }
                                        }, delay);
                                    }
                                    return;
                                });
                            }
                            $(this).data('__dataHashBinded', true);
                        }
                    });
                }
                if ($('#header.header-floating-icons').length) {
                    $('#header.header-floating-icons [data-hash]').off().each(function() {
                        var target = $(this).attr('href'),
                            offset = ($(this).is("[data-hash-offset]") ? $(this).data('hash-offset') : 0);
                        if ($(target).length) {
                            $(this).on('click', function(e) {
                                e.preventDefault();
                                $('html, body').animate({
                                    scrollTop: $(target).offset().top - offset
                                }, 600, 'easeOutQuad', function() {});
                                return;
                            });
                        }
                    });
                }
                if ($('.side-panel-toggle').length) {
                    var init_html_class = $('html').attr('class');
                    $('.side-panel-toggle').on('click', function(e) {
                        var extra_class = $(this).data('extra-class'),
                            delay = (extra_class) ? 100 : 0;
                        e.preventDefault();
                        if ($(this).hasClass('active')) {
                            $('html').removeClass('side-panel-open');
                            $('.hamburguer-btn.side-panel-toggle:not(.side-panel-close)').removeClass('active');
                            return false;
                        }
                        if (extra_class) {
                            $('.side-panel-wrapper').css('transition', 'none');
                            $('html').removeClass().addClass(init_html_class).addClass(extra_class);
                        }
                        setTimeout(function() {
                            $('.side-panel-wrapper').css('transition', '');
                            $('html').toggleClass('side-panel-open');
                        }, delay);
                    });
                    $(document).on('click', function(e) {
                        if (!$(e.target).closest('.side-panel-wrapper').length && !$(e.target).hasClass('side-panel-toggle')) {
                            $('.hamburguer-btn.side-panel-toggle:not(.side-panel-close)').removeClass('active');
                            $('html').removeClass('side-panel-open');
                        }
                    });
                }
                return this;
            },
            scrollToTarget: function(target, offset) {
                var self = this;
                $('body').addClass('scrolling');
                $('html, body').animate({
                    scrollTop: $(target).offset().top - offset
                }, self.options.scrollDelay, self.options.scrollAnimation, function() {
                    $('body').removeClass('scrolling');
                    if (!theme.fn.isElementInView($(target))) {
                        self.scrollToTarget(target, offset);
                    }
                });
                return this;
            }
        }
    });
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var initialized = false;
    $.extend(theme, {
        Newsletter: {
            defaults: {
                wrapper: $('#newsletterForm')
            },
            initialize: function($wrapper, opts) {
                if (initialized) {
                    return this;
                }
                initialized = true;
                this.$wrapper = ($wrapper || this.defaults.wrapper);
                this.setOptions(opts).build();
                return this;
            },
            setOptions: function(opts) {
                this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));
                return this;
            },
            build: function() {
                if (!($.isFunction($.fn.validate))) {
                    return this;
                }
                var self = this,
                    $email = self.$wrapper.find('#newsletterEmail'),
                    $success = $('#newsletterSuccess'),
                    $error = $('#newsletterError');
                self.$wrapper.validate({
                    submitHandler: function(form) {
                        $.ajax({
                            type: 'POST',
                            url: self.$wrapper.attr('action'),
                            data: {
                                'email': $email.val()
                            },
                            dataType: 'json',
                            success: function(data) {
                                if (data.response == 'success') {
                                    $success.removeClass('d-none');
                                    $error.addClass('d-none');
                                    $email.val('').blur().closest('.control-group').removeClass('success').removeClass('error');
                                } else {
                                    $error.html(data.message);
                                    $error.removeClass('d-none');
                                    $success.addClass('d-none');
                                    $email.blur().closest('.control-group').removeClass('success').addClass('error');
                                }
                            }
                        });
                    },
                    rules: {
                        newsletterEmail: {
                            required: true,
                            email: true
                        }
                    },
                    errorPlacement: function(error, element) {}
                });
                return this;
            }
        }
    });
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var initialized = false;
    $.extend(theme, {
        Search: {
            defaults: {
                wrapper: $('#searchForm')
            },
            initialize: function($wrapper, opts) {
                if (initialized) {
                    return this;
                }
                initialized = true;
                this.$wrapper = ($wrapper || this.defaults.wrapper);
                this.setOptions(opts).build();
                return this;
            },
            setOptions: function(opts) {
                this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));
                return this;
            },
            build: function() {
                if (!($.isFunction($.fn.validate))) {
                    return this;
                }
                this.$wrapper.validate({
                    errorPlacement: function(error, element) {}
                });
                theme.fn.execOnceTroughEvent('#header', 'mouseover.search.reveal', function() {
                    $('.header-nav-features-search-reveal').each(function() {
                        var $el = $(this),
                            $header = $('#header'),
                            $html = $('html');
                        $el.find('.header-nav-features-search-show-icon').on('click', function() {
                            $el.addClass('show');
                            $header.addClass('search-show');
                            $html.addClass('search-show');
                            $('#headerSearch').focus();
                        });
                        $el.find('.header-nav-features-search-hide-icon').on('click', function() {
                            $el.removeClass('show');
                            $header.removeClass('search-show');
                            $html.removeClass('search-show');
                        });
                    });
                });
                return this;
            }
        }
    });
}).apply(this, [window.theme, jQuery]);
(function(theme, $) {
    theme = theme || {};
    var initialized = false;
    $.extend(theme, {
        StickyHeader: {
            defaults: {
                wrapper: $('#header'),
                headerBody: $('#header .header-body'),
                stickyEnabled: true,
                stickyEnableOnBoxed: true,
                stickyEnableOnMobile: true,
                stickyStartAt: 0,
                stickyStartAtElement: false,
                stickySetTop: 0,
                stickyEffect: '',
                stickyHeaderContainerHeight: false,
                stickyChangeLogo: false,
                stickyChangeLogoWrapper: true,
                stickyForce: false
            },
            initialize: function($wrapper, opts) {
                if (initialized) {
                    return this;
                }
                initialized = true;
                this.$wrapper = $('#header');

                if (this.$wrapper.hasClass('header')) {
                    this.$wrapper = $('.header[data-plugin-options]');
                }
                return this;
            },
            setOptions: function(opts) {
                this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));
                return this;
            },
            build: function() {
                if (!this.options.stickyEnableOnBoxed && $('html').hasClass('boxed') || $('html').hasClass('side-header-hamburguer-sidebar') && !this.options.stickyForce || !this.options.stickyEnabled) {
                    return this;
                }
                var self = this;
                if (self.options.wrapper.hasClass('header')) {
                    self.options.wrapper = $('.header');
                    self.options.headerBody = $('.header .header-body');
                }
                var $html = $('html'),
                    $window = $(window),
                    sideHeader = $html.hasClass('side-header'),
                    initialHeaderTopHeight = self.options.wrapper.find('.header-top').outerHeight(),
                    initialHeaderContainerHeight = self.options.wrapper.find('.header-container').outerHeight(),
                    minHeight;
                $html.addClass('sticky-header-enabled');
                if (parseInt(self.options.stickySetTop) < 0) {
                    $html.addClass('sticky-header-negative');
                }
                if ($('.notice-top-bar').get(0)) {
                    if (parseInt(self.options.stickySetTop) == 1 || self.options.stickyEffect == 'shrink') {
                        $('.body').on('transitionend webkitTransitionEnd oTransitionEnd', function() {
                            setTimeout(function() {
                                if (!$html.hasClass('sticky-header-active')) {
                                    self.options.headerBody.animate({
                                        top: $('.notice-top-bar').outerHeight()
                                    }, 300, function() {
                                        if ($html.hasClass('sticky-header-active')) {
                                            self.options.headerBody.css('top', 0);
                                        }
                                    });
                                }
                            }, 0);
                        });
                    }
                }
                if (self.options.stickyStartAtElement) {
                    var $stickyStartAtElement = $(self.options.stickyStartAtElement);
                    $(window).on('scroll resize sticky.header.resize', function() {
                        self.options.stickyStartAt = $stickyStartAtElement.offset().top;
                    });
                    $(window).trigger('sticky.header.resize');
                }
                if (self.options.wrapper.find('.header-top').get(0)) {
                    minHeight = (initialHeaderTopHeight + initialHeaderContainerHeight);
                } else {
                    minHeight = initialHeaderContainerHeight;
                }
                if (!sideHeader) {
                    if (!$('.header-logo-sticky-change').get(0)) {
                        self.options.wrapper.css('height', self.options.headerBody.outerHeight());
                    } else {
                        $window.on('stickyChangeLogo.loaded', function() {
                            self.options.wrapper.css('height', self.options.headerBody.outerHeight());
                        });
                    }
                    if (self.options.stickyEffect == 'shrink') {
                        $(document).ready(function() {
                            if ($window.scrollTop() >= self.options.stickyStartAt) {
                                self.options.wrapper.find('.header-container').on('transitionend webkitTransitionEnd oTransitionEnd', function() {
                                    self.options.headerBody.css('position', 'fixed');
                                });
                            } else {
                                if (!$html.hasClass('boxed')) {
                                    self.options.headerBody.css('position', 'fixed');
                                }
                            }
                        });
                        self.options.wrapper.find('.header-container').css('height', initialHeaderContainerHeight);
                        self.options.wrapper.find('.header-top').css('height', initialHeaderTopHeight);
                    }
                }
                if (self.options.stickyHeaderContainerHeight) {
                    self.options.wrapper.find('.header-container').css('height', self.options.wrapper.find('.header-container').outerHeight());
                }
                if ($html.hasClass('boxed') && self.options.stickyEffect == 'shrink') {
                    self.boxedLayout();
                }
                var activate_flag = true,
                    deactivate_flag = false,
                    initialStickyStartAt = self.options.stickyStartAt;
                self.checkStickyHeader = function() {
                    var $noticeTopBar = $('.notice-top-bar');
                    if ($noticeTopBar.get(0)) {
                        self.options.stickyStartAt = ($noticeTopBar.data('sticky-start-at')) ? $noticeTopBar.data('sticky-start-at') : $('.notice-top-bar').outerHeight();
                    } else {
                        if ($html.hasClass('boxed')) {
                            self.options.stickyStartAt = initialStickyStartAt + 25;
                        } else {
                            self.options.stickyStartAt = initialStickyStartAt;
                        }
                    }
                    if ($window.width() > 991 && $html.hasClass('side-header')) {
                        $html.removeClass('sticky-header-active');
                        activate_flag = true;
                        return;
                    }
                    if ($window.scrollTop() >= parseInt(self.options.stickyStartAt)) {
                        if (activate_flag) {
                            self.activateStickyHeader();
                            activate_flag = false;
                            deactivate_flag = true;
                        }
                    } else {
                        if (deactivate_flag) {
                            self.deactivateStickyHeader();
                            deactivate_flag = false;
                            activate_flag = true;
                        }
                    }
                };
                self.activateStickyHeader = function() {
                    if ($window.width() < 992) {
                        if (!self.options.stickyEnableOnMobile) {
                            self.deactivateStickyHeader();
                            return;
                        }
                    } else {
                        if (sideHeader) {
                            self.deactivateStickyHeader();
                            return;
                        }
                    }
                    $html.addClass('sticky-header-active');
                    if (self.options.stickyEffect == 'reveal') {
                        self.options.headerBody.css('top', '-' + self.options.stickyStartAt + 'px');
                        self.options.headerBody.animate({
                            top: self.options.stickySetTop
                        }, 400, function() {});
                    }
                    if (self.options.stickyEffect == 'shrink') {
                        if (self.options.wrapper.find('.header-top').get(0)) {
                            self.options.wrapper.find('.header-top').css({
                                height: 0,
                                'min-height': 0,
                                overflow: 'hidden'
                            });
                        }
                        if (self.options.stickyHeaderContainerHeight) {
                            self.options.wrapper.find('.header-container').css({
                                height: self.options.stickyHeaderContainerHeight,
                                'min-height': 0
                            });
                        } else {
                            self.options.wrapper.find('.header-container').css({
                                height: (initialHeaderContainerHeight / 3) * 2,
                                'min-height': 0
                            });
                            var y = initialHeaderContainerHeight - ((initialHeaderContainerHeight / 3) * 2);
                            $('.main').css({
                                transform: 'translate3d(0, -' + y + 'px, 0)',
                                transition: 'ease transform 300ms'
                            }).addClass('has-sticky-header-transform');
                            if ($html.hasClass('boxed')) {
                                self.options.headerBody.css('position', 'fixed');
                            }
                        }
                    }
                    self.options.headerBody.css('top', self.options.stickySetTop);
                    if (self.options.stickyChangeLogo) {
                        self.changeLogo(true);
                    }
                    if ($('[data-sticky-header-style]').length) {
                        $('[data-sticky-header-style]').each(function() {
                            var $el = $(this),
                                css = theme.fn.getOptions($el.data('sticky-header-style-active')),
                                opts = theme.fn.getOptions($el.data('sticky-header-style'));
                            if ($window.width() > opts.minResolution) {
                                $el.css(css);
                            }
                        });
                    }
                    $.event.trigger({
                        type: 'stickyHeader.activate'
                    });
                };
                self.deactivateStickyHeader = function() {
                    $html.removeClass('sticky-header-active');
                    if (self.options.stickyEffect == 'shrink') {
                        if ($html.hasClass('boxed')) {
                            self.options.headerBody.css('position', 'absolute');
                            if ($window.scrollTop() > $('.body').offset().top) {
                                self.options.headerBody.css('position', 'fixed');
                            }
                        } else {
                            self.options.headerBody.css('position', 'fixed');
                        }
                        if (self.options.wrapper.find('.header-top').get(0)) {
                            self.options.wrapper.find('.header-top').css({
                                height: initialHeaderTopHeight,
                                overflow: 'visible'
                            });
                            if (self.options.wrapper.find('.header-top [data-icon]').length) {
                                theme.fn.intObsInit('.header-top [data-icon]:not(.svg-inline--fa)', 'themePluginIcon');
                            }
                        }
                        self.options.wrapper.find('.header-container').css({
                            height: initialHeaderContainerHeight
                        });
                    }
                    self.options.headerBody.css('top', 0);
                    if (self.options.stickyChangeLogo) {
                        self.changeLogo(false);
                    }
                    if ($('[data-sticky-header-style]').length) {
                        $('[data-sticky-header-style]').each(function() {
                            var $el = $(this),
                                css = theme.fn.getOptions($el.data('sticky-header-style-deactive')),
                                opts = theme.fn.getOptions($el.data('sticky-header-style'));
                            if ($window.width() > opts.minResolution) {
                                $el.css(css);
                            }
                        });
                    }
                    $.event.trigger({
                        type: 'stickyHeader.deactivate'
                    });
                };
                if (parseInt(self.options.stickyStartAt) <= 0) {
                    self.activateStickyHeader();
                }
                if (self.options.stickyChangeLogo) {
                    var $logoWrapper = self.options.wrapper.find('.header-logo'),
                        $logo = $logoWrapper.find('img'),
                        logoWidth = $logo.attr('width'),
                        logoHeight = $logo.attr('height'),
                        logoSmallTop = parseInt($logo.attr('data-sticky-top') ? $logo.attr('data-sticky-top') : 0),
                        logoSmallWidth = parseInt($logo.attr('data-sticky-width') ? $logo.attr('data-sticky-width') : 'auto'),
                        logoSmallHeight = parseInt($logo.attr('data-sticky-height') ? $logo.attr('data-sticky-height') : 'auto');
                    if (self.options.stickyChangeLogoWrapper) {
                        $logoWrapper.css({
                            'width': $logo.outerWidth(true),
                            'height': $logo.outerHeight(true)
                        });
                    }
                    self.changeLogo = function(activate) {
                        if (activate) {
                            $logo.css({
                                'top': logoSmallTop,
                                'width': logoSmallWidth,
                                'height': logoSmallHeight
                            });
                        } else {
                            $logo.css({
                                'top': 0,
                                'width': logoWidth,
                                'height': logoHeight
                            });
                        }
                    }
                    $.event.trigger({
                        type: 'stickyChangeLogo.loaded'
                    });
                }
                var headerBodyHeight, flag = false;
                self.checkSideHeader = function() {
                    if ($window.width() < 992 && flag == false) {
                        headerBodyHeight = self.options.headerBody.height();
                        flag = true;
                    }
                    if (self.options.stickyStartAt == 0 && sideHeader) {
                        self.options.wrapper.css('min-height', 0);
                    }
                    if (self.options.stickyStartAt > 0 && sideHeader && $window.width() < 992) {
                        self.options.wrapper.css('min-height', headerBodyHeight);
                    }
                }
                return this;
            },
            events: function() {
                var self = this;
                if (!this.options.stickyEnableOnBoxed && $('body').hasClass('boxed') || $('html').hasClass('side-header-hamburguer-sidebar') && !this.options.stickyForce || !this.options.stickyEnabled) {
                    return this;
                }
                if (!self.options.alwaysStickyEnabled) {
                    $(window).on('scroll resize', function() {
                        self.checkStickyHeader();
                    });
                } else {
                    self.activateStickyHeader();
                }
                $(window).on('load resize', function() {
                    self.checkSideHeader();
                });
                $(window).on('layout.boxed', function() {
                    self.boxedLayout();
                });
                return this;
            },
            boxedLayout: function() {
                var self = this,
                    $window = $(window);
                if ($('html').hasClass('boxed') && self.options.stickyEffect == 'shrink') {
                    if ((parseInt(self.options.stickyStartAt) == 0) && $window.width() > 991) {
                        self.options.stickyStartAt = 30;
                    }
                    self.options.headerBody.css({
                        position: 'absolute',
                        top: 0
                    });
                    $window.on('scroll', function() {
                        if ($window.scrollTop() > $('.body').offset().top) {
                            self.options.headerBody.css({
                                'position': 'fixed',
                                'top': 0
                            });
                        } else {
                            self.options.headerBody.css({
                                'position': 'absolute',
                                'top': 0
                            });
                        }
                    });
                }
                return this;
            }
        }
    });
}).apply(this, [window.theme, jQuery]);