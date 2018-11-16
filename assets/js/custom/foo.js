if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

function initScrollReveal() {
    jQuery(".scroll-reveal").length && (window.sr = ScrollReveal({
        origin: "bottom",
        distance: "75%",
        duration: 500,
        scale: 1,
        viewFactor: .9
    }), jQuery(".scroll-reveal").each(function() {
        sr.reveal(this, {
            delay: 450 * Math.random()
        })
    }))
}


function initRandomBlocks() {
    var i = 0;
    jQuery(".customer-logos-list li").each(function() {
        var t = jQuery(this);
        if (t.find("img").attr("height") > i) {
            i = t.find("img").attr("height");
            var e = parseInt(i) + 2 * parseInt(jQuery(".customer-logos-list li").css("padding-top"));
            jQuery(".customer-logos-list li").css("height", e)
        }
    });
}! 

function(g) {
    "use strict";
    var m = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    m.VERSION = "3.3.6", m.TRANSITION_DURATION = 150, m.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, m.prototype.init = function(t, e, i) {
        if (this.enabled = !0, this.type = t, this.$element = g(e), this.options = this.getOptions(i), this.$viewport = this.options.viewport && g(g.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var s = this.options.trigger.split(" "), n = s.length; n--;) {
            var o = s[n];
            if ("click" == o) this.$element.on("click." + this.type, this.options.selector, g.proxy(this.toggle, this));
            else if ("manual" != o) {
                var r = "hover" == o ? "mouseenter" : "focusin",
                    a = "hover" == o ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, g.proxy(this.enter, this)), this.$element.on(a + "." + this.type, this.options.selector, g.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = g.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, m.prototype.getDefaults = function() {
        return m.DEFAULTS
    }, m.prototype.getOptions = function(t) {
        return (t = g.extend({}, this.getDefaults(), this.$element.data(), t)).delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    }, m.prototype.getDelegateOptions = function() {
        var i = {},
            s = this.getDefaults();
        return this._options && g.each(this._options, function(t, e) {
            s[t] != e && (i[t] = e)
        }), i
    }, m.prototype.enter = function(t) {
        var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
        return e || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e)), t instanceof g.Event && (e.inState["focusin" == t.type ? "focus" : "hover"] = !0), e.tip().hasClass("in") || "in" == e.hoverState ? void(e.hoverState = "in") : (clearTimeout(e.timeout), e.hoverState = "in", e.options.delay && e.options.delay.show ? void(e.timeout = setTimeout(function() {
            "in" == e.hoverState && e.show()
        }, e.options.delay.show)) : e.show())
    }, m.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, m.prototype.leave = function(t) {
        var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
        return e || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e)), t instanceof g.Event && (e.inState["focusout" == t.type ? "focus" : "hover"] = !1), e.isInStateTrue() ? void 0 : (clearTimeout(e.timeout), e.hoverState = "out", e.options.delay && e.options.delay.hide ? void(e.timeout = setTimeout(function() {
            "out" == e.hoverState && e.hide()
        }, e.options.delay.hide)) : e.hide())
    }, m.prototype.show = function() {
        var t = g.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(t);
            var e = g.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (t.isDefaultPrevented() || !e) return;
            var i = this,
                s = this.tip(),
                n = this.getUID(this.type);
            this.setContent(), s.attr("id", n), this.$element.attr("aria-describedby", n), this.options.animation && s.addClass("fade");
            var o = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                r = /\s?auto?\s?/i,
                a = r.test(o);
            a && (o = o.replace(r, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(o).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var l = this.getPosition(),
                h = s[0].offsetWidth,
                c = s[0].offsetHeight;
            if (a) {
                var d = o,
                    u = this.getPosition(this.$viewport);
                o = "bottom" == o && l.bottom + c > u.bottom ? "top" : "top" == o && l.top - c < u.top ? "bottom" : "right" == o && l.right + h > u.width ? "left" : "left" == o && l.left - h < u.left ? "right" : o, s.removeClass(d).addClass(o)
            }
            var p = this.getCalculatedOffset(o, l, h, c);
            this.applyPlacement(p, o);
            var f = function() {
                var t = i.hoverState;
                i.$element.trigger("shown.bs." + i.type), i.hoverState = null, "out" == t && i.leave(i)
            };
            g.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", f).emulateTransitionEnd(m.TRANSITION_DURATION) : f()
        }
    }, m.prototype.applyPlacement = function(t, e) {
        var i = this.tip(),
            s = i[0].offsetWidth,
            n = i[0].offsetHeight,
            o = parseInt(i.css("margin-top"), 10),
            r = parseInt(i.css("margin-left"), 10);
        isNaN(o) && (o = 0), isNaN(r) && (r = 0), t.top += o, t.left += r, g.offset.setOffset(i[0], g.extend({
            using: function(t) {
                i.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, t), 0), i.addClass("in");
        var a = i[0].offsetWidth,
            l = i[0].offsetHeight;
        "top" == e && l != n && (t.top = t.top + n - l);
        var h = this.getViewportAdjustedDelta(e, t, a, l);
        h.left ? t.left += h.left : t.top += h.top;
        var c = /top|bottom/.test(e),
            d = c ? 2 * h.left - s + a : 2 * h.top - n + l,
            u = c ? "offsetWidth" : "offsetHeight";
        i.offset(t), this.replaceArrow(d, i[0][u], c)
    }, m.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, m.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, m.prototype.hide = function(t) {
        function e() {
            "in" != i.hoverState && s.detach(), i.$element.removeAttr("aria-describedby").trigger("hidden.bs." + i.type), t && t()
        }
        var i = this,
            s = g(this.$tip),
            n = g.Event("hide.bs." + this.type);
        return this.$element.trigger(n), n.isDefaultPrevented() ? void 0 : (s.removeClass("in"), g.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", e).emulateTransitionEnd(m.TRANSITION_DURATION) : e(), this.hoverState = null, this)
    }, m.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, m.prototype.hasContent = function() {
        return this.getTitle()
    }, m.prototype.getPosition = function(t) {
        var e = (t = t || this.$element)[0],
            i = "BODY" == e.tagName,
            s = e.getBoundingClientRect();
        null == s.width && (s = g.extend({}, s, {
            width: s.right - s.left,
            height: s.bottom - s.top
        }));
        var n = i ? {
                top: 0,
                left: 0
            } : t.offset(),
            o = {
                scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
            },
            r = i ? {
                width: g(window).width(),
                height: g(window).height()
            } : null;
        return g.extend({}, s, o, r, n)
    }, m.prototype.getCalculatedOffset = function(t, e, i, s) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - s,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - s / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - s / 2,
            left: e.left + e.width
        }
    }, m.prototype.getViewportAdjustedDelta = function(t, e, i, s) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return n;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - o - r.scroll,
                l = e.top + o - r.scroll + s;
            a < r.top ? n.top = r.top - a : l > r.top + r.height && (n.top = r.top + r.height - l)
        } else {
            var h = e.left - o,
                c = e.left + o + i;
            h < r.left ? n.left = r.left - h : c > r.right && (n.left = r.left + r.width - c)
        }
        return n
    }, m.prototype.getTitle = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }, m.prototype.getUID = function(t) {
        for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
        return t
    }, m.prototype.tip = function() {
        if (!this.$tip && (this.$tip = g(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, m.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, m.prototype.enable = function() {
        this.enabled = !0
    }, m.prototype.disable = function() {
        this.enabled = !1
    }, m.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, m.prototype.toggle = function(t) {
        var e = this;
        t && ((e = g(t.currentTarget).data("bs." + this.type)) || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e))), t ? (e.inState.click = !e.inState.click, e.isInStateTrue() ? e.enter(e) : e.leave(e)) : e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
    }, m.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null
        })
    };
    var t = g.fn.tooltip;
    g.fn.tooltip = function(s) {
        return this.each(function() {
            var t = g(this),
                e = t.data("bs.tooltip"),
                i = "object" == typeof s && s;
            (e || !/destroy|hide/.test(s)) && (e || t.data("bs.tooltip", e = new m(this, i)), "string" == typeof s && e[s]())
        })
    }, g.fn.tooltip.Constructor = m, g.fn.tooltip.noConflict = function() {
        return g.fn.tooltip = t, this
    }
}(jQuery),





function() {
    var l, i, n, r, o = {}.hasOwnProperty;
    (r = function() {
        function t() {
            this.options_index = 0, this.parsed = []
        }
        return t.prototype.add_node = function(t) {
            return "OPTGROUP" === t.nodeName.toUpperCase() ? this.add_group(t) : this.add_option(t)
        }, t.prototype.add_group = function(t) {
            var e, i, s, n, o, r;
            for (e = this.parsed.length, this.parsed.push({
                    array_index: e,
                    group: !0,
                    label: this.escapeExpression(t.label),
                    title: t.title ? t.title : void 0,
                    children: 0,
                    disabled: t.disabled,
                    classes: t.className
                }), r = [], s = 0, n = (o = t.childNodes).length; s < n; s++) i = o[s], r.push(this.add_option(i, e, t.disabled));
            return r
        }, t.prototype.add_option = function(t, e, i) {
            return "OPTION" === t.nodeName.toUpperCase() ? ("" !== t.text ? (null != e && (this.parsed[e].children += 1), this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                value: t.value,
                text: t.text,
                html: t.innerHTML,
                title: t.title ? t.title : void 0,
                selected: t.selected,
                disabled: !0 === i ? i : t.disabled,
                group_array_index: e,
                group_label: null != e ? this.parsed[e].label : null,
                classes: t.className,
                style: t.style.cssText
            })) : this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                empty: !0
            }), this.options_index += 1) : void 0
        }, t.prototype.escapeExpression = function(t) {
            var e, i;
            return null == t || !1 === t ? "" : /[\&\<\>\"\'\`]/.test(t) ? (e = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            }, i = /&(?!\w+;)|[\<\>\"\'\`]/g, t.replace(i, function(t) {
                return e[t] || "&amp;"
            })) : t
        }, t
    }()).select_to_array = function(t) {
        var e, i, s, n, o;
        for (i = new r, s = 0, n = (o = t.childNodes).length; s < n; s++) e = o[s], i.add_node(e);
        return i.parsed
    }, i = function() {
        function n(t, e) {
            var i, s;
            this.form_field = t, this.options = null != e ? e : {}, this.label_click_handler = (i = this.label_click_handler, s = this, function() {
                return i.apply(s, arguments)
            }), n.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready())
        }
        return n.prototype.set_default_values = function() {
            var e = this;
            return this.click_test_action = function(t) {
                return e.test_active_click(t)
            }, this.activate_action = function(t) {
                return e.activate_field(t)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className), this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text && this.options.allow_single_deselect, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null == this.options.enable_split_word_search || this.options.enable_split_word_search, this.group_search = null == this.options.group_search || this.options.group_search, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null == this.options.single_backstroke_delete || this.options.single_backstroke_delete, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null == this.options.display_selected_options || this.options.display_selected_options, this.display_disabled_options = null == this.options.display_disabled_options || this.options.display_disabled_options, this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1, this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY, this.case_sensitive_search = this.options.case_sensitive_search || !1, this.hide_results_on_select = null == this.options.hide_results_on_select || this.options.hide_results_on_select
        }, n.prototype.set_default_text = function() {
            return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || n.default_multiple_text : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || n.default_single_text, this.default_text = this.escape_html(this.default_text), this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || n.default_no_result_text
        }, n.prototype.choice_label = function(t) {
            return this.include_group_label_in_selected && null != t.group_label ? "<b class='group-name'>" + t.group_label + "</b>" + t.html : t.html
        }, n.prototype.mouse_enter = function() {
            return this.mouse_on_container = !0
        }, n.prototype.mouse_leave = function() {
            return this.mouse_on_container = !1
        }, n.prototype.input_focus = function(t) {
            var e = this;
            if (this.is_multiple) {
                if (!this.active_field) return setTimeout(function() {
                    return e.container_mousedown()
                }, 50)
            } else if (!this.active_field) return this.activate_field()
        }, n.prototype.input_blur = function(t) {
            var e = this;
            return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function() {
                return e.blur_test()
            }, 100))
        }, n.prototype.label_click_handler = function(t) {
            return this.is_multiple ? this.container_mousedown(t) : this.activate_field()
        }, n.prototype.results_option_build = function(t) {
            var e, i, s, n, o, r, a;
            for (e = "", o = n = 0, r = (a = this.results_data).length; o < r && ("" !== (s = (i = a[o]).group ? this.result_add_group(i) : this.result_add_option(i)) && (n++, e += s), (null != t ? t.first : void 0) && (i.selected && this.is_multiple ? this.choice_build(i) : i.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(i))), !(n >= this.max_shown_results)); o++);
            return e
        }, n.prototype.result_add_option = function(t) {
            var e, i;
            return t.search_match && this.include_option_in_results(t) ? (e = [], t.disabled || t.selected && this.is_multiple || e.push("active-result"), !t.disabled || t.selected && this.is_multiple || e.push("disabled-result"), t.selected && e.push("result-selected"), null != t.group_array_index && e.push("group-option"), "" !== t.classes && e.push(t.classes), (i = document.createElement("li")).className = e.join(" "), i.style.cssText = t.style, i.setAttribute("data-option-array-index", t.array_index), i.innerHTML = t.search_text, t.title && (i.title = t.title), this.outerHTML(i)) : ""
        }, n.prototype.result_add_group = function(t) {
            var e, i;
            return (t.search_match || t.group_match) && 0 < t.active_options ? ((e = []).push("group-result"), t.classes && e.push(t.classes), (i = document.createElement("li")).className = e.join(" "), i.innerHTML = t.search_text, t.title && (i.title = t.title), this.outerHTML(i)) : ""
        }, n.prototype.results_update_field = function() {
            return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing ? this.winnow_results() : void 0
        }, n.prototype.reset_single_select_options = function() {
            var t, e, i, s, n;
            for (n = [], e = 0, i = (s = this.results_data).length; e < i; e++)(t = s[e]).selected ? n.push(t.selected = !1) : n.push(void 0);
            return n
        }, n.prototype.results_toggle = function() {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, n.prototype.results_search = function(t) {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, n.prototype.winnow_results = function() {
            var t, e, i, s, n, o, r, a, l, h, c, d;
            for (this.no_results_clear(), n = 0, t = (r = this.get_search_text()).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), s = this.get_search_regex(t), e = this.get_highlight_regex(t), h = 0, c = (d = this.results_data).length; h < c; h++)(i = d[h]).search_match = !1, o = null, this.include_option_in_results(i) && (i.group && (i.group_match = !1, i.active_options = 0), null != i.group_array_index && this.results_data[i.group_array_index] && (0 === (o = this.results_data[i.group_array_index]).active_options && o.search_match && (n += 1), o.active_options += 1), i.search_text = i.group ? i.label : i.html, (!i.group || this.group_search) && (i.search_match = this.search_string_match(i.search_text, s), i.search_match && !i.group && (n += 1), i.search_match ? (r.length && (a = i.search_text.search(e), l = i.search_text.substr(0, a + r.length) + "</em>" + i.search_text.substr(a + r.length), i.search_text = l.substr(0, a) + "<em>" + l.substr(a)), null != o && (o.group_match = !0)) : null != i.group_array_index && this.results_data[i.group_array_index].search_match && (i.search_match = !0)));
            return this.result_clear_highlight(), n < 1 && r.length ? (this.update_results_content(""), this.no_results(r)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
        }, n.prototype.get_search_regex = function(t) {
            var e, i;
            return e = this.search_contains ? "" : "^", i = this.case_sensitive_search ? "" : "i", new RegExp(e + t, i)
        }, n.prototype.get_highlight_regex = function(t) {
            var e, i;
            return e = this.search_contains ? "" : "\\b", i = this.case_sensitive_search ? "" : "i", new RegExp(e + t, i)
        }, n.prototype.search_string_match = function(t, e) {
            var i, s, n, o;
            if (e.test(t)) return !0;
            if (this.enable_split_word_search && (0 <= t.indexOf(" ") || 0 === t.indexOf("[")) && (s = t.replace(/\[|\]/g, "").split(" ")).length)
                for (n = 0, o = s.length; n < o; n++)
                    if (i = s[n], e.test(i)) return !0
        }, n.prototype.choices_count = function() {
            var t, e, i;
            if (null != this.selected_option_count) return this.selected_option_count;
            for (t = this.selected_option_count = 0, e = (i = this.form_field.options).length; t < e; t++) i[t].selected && (this.selected_option_count += 1);
            return this.selected_option_count
        }, n.prototype.choices_click = function(t) {
            return t.preventDefault(), this.activate_field(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
        }, n.prototype.keydown_checker = function(t) {
            var e, i;
            switch (e = null != (i = t.which) ? i : t.keyCode, this.search_field_scale(), 8 !== e && this.pending_backstroke && this.clear_backstroke(), e) {
                case 8:
                    this.backstroke_length = this.get_search_field_value().length;
                    break;
                case 9:
                    this.results_showing && !this.is_multiple && this.result_select(t), this.mouse_on_container = !1;
                    break;
                case 13:
                case 27:
                    this.results_showing && t.preventDefault();
                    break;
                case 32:
                    this.disable_search && t.preventDefault();
                    break;
                case 38:
                    t.preventDefault(), this.keyup_arrow();
                    break;
                case 40:
                    t.preventDefault(), this.keydown_arrow()
            }
        }, n.prototype.keyup_checker = function(t) {
            var e, i;
            switch (e = null != (i = t.which) ? i : t.keyCode, this.search_field_scale(), e) {
                case 8:
                    this.is_multiple && this.backstroke_length < 1 && 0 < this.choices_count() ? this.keydown_backstroke() : this.pending_backstroke || (this.result_clear_highlight(), this.results_search());
                    break;
                case 13:
                    t.preventDefault(), this.results_showing && this.result_select(t);
                    break;
                case 27:
                    this.results_showing && this.results_hide();
                    break;
                case 9:
                case 16:
                case 17:
                case 18:
                case 38:
                case 40:
                case 91:
                    break;
                default:
                    this.results_search()
            }
        }, n.prototype.clipboard_event_checker = function(t) {
            var e = this;
            if (!this.is_disabled) return setTimeout(function() {
                return e.results_search()
            }, 50)
        }, n.prototype.container_width = function() {
            return null != this.options.width ? this.options.width : this.form_field.offsetWidth + "px"
        }, n.prototype.include_option_in_results = function(t) {
            return !(this.is_multiple && !this.display_selected_options && t.selected) && (!(!this.display_disabled_options && t.disabled) && !t.empty)
        }, n.prototype.search_results_touchstart = function(t) {
            return this.touch_started = !0, this.search_results_mouseover(t)
        }, n.prototype.search_results_touchmove = function(t) {
            return this.touch_started = !1, this.search_results_mouseout(t)
        }, n.prototype.search_results_touchend = function(t) {
            return this.touch_started ? this.search_results_mouseup(t) : void 0
        }, n.prototype.outerHTML = function(t) {
            var e;
            return t.outerHTML ? t.outerHTML : ((e = document.createElement("div")).appendChild(t), e.innerHTML)
        }, n.prototype.get_single_html = function() {
            return '<a class="chosen-single chosen-default">\n  <span>' + this.default_text + '</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>'
        }, n.prototype.get_multi_html = function() {
            return '<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="' + this.default_text + '" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>'
        }, n.prototype.get_no_results_html = function(t) {
            return '<li class="no-results">\n  ' + this.results_none_found + " <span>" + t + "</span>\n</li>"
        }, n.browser_is_supported = function() {
            return "Microsoft Internet Explorer" === window.navigator.appName ? 8 <= document.documentMode : !(/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent))
        }, n.default_multiple_text = "Select Some Options", n.default_single_text = "Select an Option", n.default_no_result_text = "No results match", n
    }(), (l = jQuery).fn.extend({
        chosen: function(s) {
            return i.browser_is_supported() ? this.each(function(t) {
                var e, i;
                return i = (e = l(this)).data("chosen"), "destroy" === s ? void(i instanceof n && i.destroy()) : void(i instanceof n || e.data("chosen", new n(this, s)))
            }) : this
        }
    }), n = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
            function i() {
                this.constructor = t
            }
            for (var s in e) o.call(e, s) && (t[s] = e[s]);
            i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, i), e.prototype.setup = function() {
            return this.form_field_jq = l(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex
        }, e.prototype.set_up_html = function() {
            var t, e;
            return (t = ["chosen-container"]).push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && t.push(this.form_field.className), this.is_rtl && t.push("chosen-rtl"), e = {
                class: t.join(" "),
                title: this.form_field.title
            }, this.form_field.id.length && (e.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = l("<div />", e), this.container.width(this.container_width()), this.is_multiple ? this.container.html(this.get_multi_html()) : this.container.html(this.get_single_html()), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior()
        }, e.prototype.on_ready = function() {
            return this.form_field_jq.trigger("chosen:ready", {
                chosen: this
            })
        }, e.prototype.register_observers = function() {
            var e = this;
            return this.container.bind("touchstart.chosen", function(t) {
                e.container_mousedown(t)
            }), this.container.bind("touchend.chosen", function(t) {
                e.container_mouseup(t)
            }), this.container.bind("mousedown.chosen", function(t) {
                e.container_mousedown(t)
            }), this.container.bind("mouseup.chosen", function(t) {
                e.container_mouseup(t)
            }), this.container.bind("mouseenter.chosen", function(t) {
                e.mouse_enter(t)
            }), this.container.bind("mouseleave.chosen", function(t) {
                e.mouse_leave(t)
            }), this.search_results.bind("mouseup.chosen", function(t) {
                e.search_results_mouseup(t)
            }), this.search_results.bind("mouseover.chosen", function(t) {
                e.search_results_mouseover(t)
            }), this.search_results.bind("mouseout.chosen", function(t) {
                e.search_results_mouseout(t)
            }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function(t) {
                e.search_results_mousewheel(t)
            }), this.search_results.bind("touchstart.chosen", function(t) {
                e.search_results_touchstart(t)
            }), this.search_results.bind("touchmove.chosen", function(t) {
                e.search_results_touchmove(t)
            }), this.search_results.bind("touchend.chosen", function(t) {
                e.search_results_touchend(t)
            }), this.form_field_jq.bind("chosen:updated.chosen", function(t) {
                e.results_update_field(t)
            }), this.form_field_jq.bind("chosen:activate.chosen", function(t) {
                e.activate_field(t)
            }), this.form_field_jq.bind("chosen:open.chosen", function(t) {
                e.container_mousedown(t)
            }), this.form_field_jq.bind("chosen:close.chosen", function(t) {
                e.close_field(t)
            }), this.search_field.bind("blur.chosen", function(t) {
                e.input_blur(t)
            }), this.search_field.bind("keyup.chosen", function(t) {
                e.keyup_checker(t)
            }), this.search_field.bind("keydown.chosen", function(t) {
                e.keydown_checker(t)
            }), this.search_field.bind("focus.chosen", function(t) {
                e.input_focus(t)
            }), this.search_field.bind("cut.chosen", function(t) {
                e.clipboard_event_checker(t)
            }), this.search_field.bind("paste.chosen", function(t) {
                e.clipboard_event_checker(t)
            }), this.is_multiple ? this.search_choices.bind("click.chosen", function(t) {
                e.choices_click(t)
            }) : this.container.bind("click.chosen", function(t) {
                t.preventDefault()
            })
        }, e.prototype.destroy = function() {
            return l(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), 0 < this.form_field_label.length && this.form_field_label.unbind("click.chosen"), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
        }, e.prototype.search_field_disabled = function() {
            return this.is_disabled = this.form_field.disabled || this.form_field_jq.parents("fieldset").is(":disabled"), this.container.toggleClass("chosen-disabled", this.is_disabled), this.search_field[0].disabled = this.is_disabled, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_field), this.is_disabled ? this.close_field() : this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_field)
        }, e.prototype.container_mousedown = function(t) {
            var e;
            if (!this.is_disabled) return !t || "mousedown" !== (e = t.type) && "touchstart" !== e || this.results_showing || t.preventDefault(), null != t && l(t.target).hasClass("search-choice-close") ? void 0 : (this.active_field ? this.is_multiple || !t || l(t.target)[0] !== this.selected_item[0] && !l(t.target).parents("a.chosen-single").length || (t.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), l(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
        }, e.prototype.container_mouseup = function(t) {
            return "ABBR" !== t.target.nodeName || this.is_disabled ? void 0 : this.results_reset(t)
        }, e.prototype.search_results_mousewheel = function(t) {
            var e;
            return t.originalEvent && (e = t.originalEvent.deltaY || -t.originalEvent.wheelDelta || t.originalEvent.detail), null != e ? (t.preventDefault(), "DOMMouseScroll" === t.type && (e *= 40), this.search_results.scrollTop(e + this.search_results.scrollTop())) : void 0
        }, e.prototype.blur_test = function(t) {
            return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
        }, e.prototype.close_field = function() {
            return l(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale(), this.search_field.blur()
        }, e.prototype.activate_field = function() {
            return this.is_disabled ? void 0 : (this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus())
        }, e.prototype.test_active_click = function(t) {
            var e;
            return (e = l(t.target).closest(".chosen-container")).length && this.container[0] === e[0] ? this.active_field = !0 : this.close_field()
        }, e.prototype.results_build = function() {
            return this.parsing = !0, this.selected_option_count = null, this.results_data = r.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({
                first: !0
            })), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
        }, e.prototype.result_do_highlight = function(t) {
            var e, i, s, n;
            if (t.length) {
                if (this.result_clear_highlight(), this.result_highlight = t, this.result_highlight.addClass("highlighted"), (s = parseInt(this.search_results.css("maxHeight"), 10)) + (n = this.search_results.scrollTop()) <= (e = (i = this.result_highlight.position().top + this.search_results.scrollTop()) + this.result_highlight.outerHeight())) return this.search_results.scrollTop(0 < e - s ? e - s : 0);
                if (i < n) return this.search_results.scrollTop(i)
            }
        }, e.prototype.result_clear_highlight = function() {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
        }, e.prototype.results_show = function() {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.get_search_field_value()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {
                chosen: this
            }))
        }, e.prototype.update_results_content = function(t) {
            return this.search_results.html(t)
        }, e.prototype.results_hide = function() {
            return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {
                chosen: this
            })), this.results_showing = !1
        }, e.prototype.set_tab_index = function(t) {
            var e;
            return this.form_field.tabIndex ? (e = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = e) : void 0
        }, e.prototype.set_label_behavior = function() {
            return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = l("label[for='" + this.form_field.id + "']")), 0 < this.form_field_label.length ? this.form_field_label.bind("click.chosen", this.label_click_handler) : void 0
        }, e.prototype.show_search_field_default = function() {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        }, e.prototype.search_results_mouseup = function(t) {
            var e;
            return (e = l(t.target).hasClass("active-result") ? l(t.target) : l(t.target).parents(".active-result").first()).length ? (this.result_highlight = e, this.result_select(t), this.search_field.focus()) : void 0
        }, e.prototype.search_results_mouseover = function(t) {
            var e;
            return (e = l(t.target).hasClass("active-result") ? l(t.target) : l(t.target).parents(".active-result").first()) ? this.result_do_highlight(e) : void 0
        }, e.prototype.search_results_mouseout = function(t) {
            return l(t.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
        }, e.prototype.choice_build = function(t) {
            var e, i, s = this;
            return e = l("<li />", {
                class: "search-choice"
            }).html("<span>" + this.choice_label(t) + "</span>"), t.disabled ? e.addClass("search-choice-disabled") : ((i = l("<a />", {
                class: "search-choice-close",
                "data-option-array-index": t.array_index
            })).bind("click.chosen", function(t) {
                return s.choice_destroy_link_click(t)
            }), e.append(i)), this.search_container.before(e)
        }, e.prototype.choice_destroy_link_click = function(t) {
            return t.preventDefault(), t.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(l(t.target))
        }, e.prototype.choice_destroy = function(t) {
            return this.result_deselect(t[0].getAttribute("data-option-array-index")) ? (this.active_field ? this.search_field.focus() : this.show_search_field_default(), this.is_multiple && 0 < this.choices_count() && this.get_search_field_value().length < 1 && this.results_hide(), t.parents("li").first().remove(), this.search_field_scale()) : void 0
        }, e.prototype.results_reset = function() {
            return this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.trigger_form_field_change(), this.active_field ? this.results_hide() : void 0
        }, e.prototype.results_reset_cleanup = function() {
            return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
        }, e.prototype.result_select = function(t) {
            var e, i;
            return this.result_highlight ? (e = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }), !1) : (this.is_multiple ? e.removeClass("active-result") : this.reset_single_select_options(), e.addClass("result-selected"), (i = this.results_data[e[0].getAttribute("data-option-array-index")]).selected = !0, this.form_field.options[i.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(i) : this.single_set_selected_text(this.choice_label(i)), (!this.is_multiple || this.hide_results_on_select && !t.metaKey && !t.ctrlKey) && (this.results_hide(), this.show_search_field_default()), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.trigger_form_field_change({
                selected: this.form_field.options[i.options_index].value
            }), this.current_selectedIndex = this.form_field.selectedIndex, t.preventDefault(), this.search_field_scale())) : void 0
        }, e.prototype.single_set_selected_text = function(t) {
            return null == t && (t = this.default_text), t === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").html(t)
        }, e.prototype.result_deselect = function(t) {
            var e;
            return e = this.results_data[t], !this.form_field.options[e.options_index].disabled && (e.selected = !1, this.form_field.options[e.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.trigger_form_field_change({
                deselected: this.form_field.options[e.options_index].value
            }), this.search_field_scale(), !0)
        }, e.prototype.single_deselect_control_build = function() {
            return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
        }, e.prototype.get_search_field_value = function() {
            return this.search_field.val()
        }, e.prototype.get_search_text = function() {
            return this.escape_html(l.trim(this.get_search_field_value()))
        }, e.prototype.escape_html = function(t) {
            return l("<div/>").text(t).html()
        }, e.prototype.winnow_results_set_highlight = function() {
            var t, e;
            return null != (t = (e = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result")).length ? e.first() : this.search_results.find(".active-result").first()) ? this.result_do_highlight(t) : void 0
        }, e.prototype.no_results = function(t) {
            var e;
            return e = this.get_no_results_html(t), this.search_results.append(e), this.form_field_jq.trigger("chosen:no_results", {
                chosen: this
            })
        }, e.prototype.no_results_clear = function() {
            return this.search_results.find(".no-results").remove()
        }, e.prototype.keydown_arrow = function() {
            var t;
            return this.results_showing && this.result_highlight ? (t = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(t) : void 0 : this.results_show()
        }, e.prototype.keyup_arrow = function() {
            var t;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (t = this.result_highlight.prevAll("li.active-result")).length ? this.result_do_highlight(t.first()) : (0 < this.choices_count() && this.results_hide(), this.result_clear_highlight()) : void 0 : this.results_show()
        }, e.prototype.keydown_backstroke = function() {
            var t;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (t = this.search_container.siblings("li.search-choice").last()).length && !t.hasClass("search-choice-disabled") ? (this.pending_backstroke = t, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0
        }, e.prototype.clear_backstroke = function() {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
        }, e.prototype.search_field_scale = function() {
            var t, e, i, s, n, o, r, a;
            if (this.is_multiple) {
                for (s = {
                        position: "absolute",
                        left: "-1000px",
                        top: "-1000px",
                        display: "none",
                        whiteSpace: "pre"
                    }, r = 0, a = (n = ["fontSize", "fontStyle", "fontWeight", "fontFamily", "lineHeight", "textTransform", "letterSpacing"]).length; r < a; r++) s[i = n[r]] = this.search_field.css(i);
                return (e = l("<div />").css(s)).text(this.get_search_field_value()), l("body").append(e), o = e.width() + 25, e.remove(), t = this.container.outerWidth(), o = Math.min(t - 10, o), this.search_field.width(o)
            }
        }, e.prototype.trigger_form_field_change = function(t) {
            return this.form_field_jq.trigger("input", t), this.form_field_jq.trigger("change", t)
        }, e
    }()
}.call(this),
    function() {
        "use strict";

        function o(t, e, i) {
            "addEventListener" in window ? t.addEventListener(e, i, !1) : "attachEvent" in window && t.attachEvent("on" + e, i)
        }

        function e(t) {
            return R + "[" + z + "] " + t
        }

        function a(t) {
            N && "object" == typeof window.console && console.log(e(t))
        }

        function r(t) {
            "object" == typeof window.console && console.warn(e(t))
        }

        function i() {
            var t, e, i, s, n;
            a("Initialising iFrame"),
                function() {
                    function t(t) {
                        return "true" === t
                    }
                    var e = $.substr(P).split(":");
                    z = e[0], k = void 0 !== e[1] ? Number(e[1]) : k, S = void 0 !== e[2] ? t(e[2]) : S, N = void 0 !== e[3] ? t(e[3]) : N, O = void 0 !== e[4] ? Number(e[4]) : O, M = void 0 !== e[5] ? t(e[5]) : M, b = void 0 !== e[6] ? t(e[6]) : b, x = e[7], A = void 0 !== e[8] ? e[8] : A, C = e[9], T = e[10], q = void 0 !== e[11] ? Number(e[11]) : q
                }(), void 0 === x && (x = k + "px"), n = "margin", -1 !== x.indexOf("-") && r("Negative CSS value ignored for " + n), l("margin", x), l("background", C), l("padding", T), (s = document.createElement("div")).style.clear = "both", s.style.display = "block", document.body.appendChild(s), h(), document.documentElement.style.height = "", document.body.style.height = "", a('HTML & body height set to "auto"'), M && (a("Enable public methods"), window.parentIFrame = {
                    close: function() {
                        g("close", "parentIFrame.close()", 0, 0)
                    },
                    getId: function() {
                        return z
                    },
                    reset: function() {
                        y("parentIFrame.size")
                    },
                    scrollTo: function(t, e) {
                        _(e, t, "scrollTo")
                    },
                    scrollToOffset: function(t, e) {
                        _(e, t, "scrollToOffset")
                    },
                    sendMessage: function(t, e) {
                        _(0, 0, "message", JSON.stringify(t), e)
                    },
                    setHeightCalculationMethod: function(t) {
                        A = t, h()
                    },
                    setTargetOrigin: function(t) {
                        a("Set targetOrigin: " + t), W = t
                    },
                    size: function(t, e) {
                        var i = (t || "") + (e ? "," + e : "");
                        m(), g("size", "parentIFrame.size(" + i + ")", t, e)
                    }
                }), !0 === b ? (o(window, "resize", function() {
                    g("resize", "Window resized")
                }), o(window, "click", function() {
                    g("click", "Window clicked")
                }), (t = window.MutationObserver || window.WebKitMutationObserver) ? O < 0 ? c() : (e = document.querySelector("body"), i = new t(function(t) {
                    g("mutationObserver", "mutationObserver: " + t[0].target + " " + t[0].type),
                        function(t) {
                            function i(t) {
                                (void 0 === t.height || void 0 === t.width || 0 === t.height || 0 === t.width) && (a("Attach listerner to " + t.src), o(t, "load", function() {
                                    g("imageLoad", "Image loaded")
                                }))
                            }
                            t.forEach(function(t) {
                                if ("attributes" === t.type && "src" === t.attributeName) i(t.target);
                                else if ("childList" === t.type) {
                                    var e = t.target.querySelectorAll("img");
                                    Array.prototype.forEach.call(e, function(t) {
                                        i(t)
                                    })
                                }
                            })
                        }(t)
                }), a("Enable MutationObserver"), i.observe(e, {
                    attributes: !0,
                    attributeOldValue: !1,
                    characterData: !0,
                    characterDataOldValue: !1,
                    childList: !0,
                    subtree: !0
                })) : (r("MutationObserver not supported in this browser!"), c())) : a("Auto Resize disabled"), g("init", "Init message from host page")
        }

        function l(t, e) {
            void 0 !== e && "" !== e && "null" !== e && a("Body " + t + ' set to "' + (document.body.style[t] = e) + '"')
        }

        function h() {
            Q !== A && (A in Y || (r(A + " is not a valid option for heightCalculationMethod."), A = "bodyScroll"), a('Height calculation method set to "' + A + '"'))
        }

        function c() {
            0 !== O && (a("setInterval: " + O + "ms"), setInterval(function() {
                g("interval", "setInterval: " + O)
            }, Math.abs(O)))
        }

        function t() {
            function t(t) {
                var s = document.body,
                    e = 0;
                return "defaultView" in document && "getComputedStyle" in document.defaultView ? e = null !== (e = document.defaultView.getComputedStyle(s, null)) ? e[t] : 0 : e = function(t) {
                    if (/^\d+(px)?$/i.test(t)) return parseInt(t, w);
                    var e = s.style.left,
                        i = s.runtimeStyle.left;
                    return s.runtimeStyle.left = s.currentStyle.left, s.style.left = t || 0, t = s.style.pixelLeft, s.style.left = e, s.runtimeStyle.left = i, t
                }(s.currentStyle[t]), parseInt(e, w)
            }
            return document.body.offsetHeight + t("marginTop") + t("marginBottom")
        }

        function s() {
            return document.body.scrollHeight
        }

        function n() {
            return document.documentElement.offsetHeight
        }

        function d() {
            return document.documentElement.scrollHeight
        }

        function u() {
            return [t(), s(), n(), d()]
        }

        function p() {
            return Math.max.apply(null, u())
        }

        function f() {
            return Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
        }

        function g(t, e, i, s) {
            function n() {
                t in {
                    reset: 1,
                    resetPage: 1,
                    init: 1
                } || a("Trigger event: " + e)
            }
            var o, r;
            B && t in j ? a("Trigger event cancelled: " + t) : function() {
                function t(t, e) {
                    return !(Math.abs(t - e) <= q)
                }
                return o = void 0 !== i ? i : Y[A](), r = void 0 !== s ? s : f(), t(I, o) || S && t(V, r)
            }() ? (n(), m(), _(I = o, V = r, t)) : !(t in {
                init: 1,
                interval: 1,
                size: 1
            }) && A in L ? y(e) : t in {
                interval: 1
            } || (n(), a("No change in size detected"))
        }

        function m() {
            B || (B = !0, a("Trigger event lock on")), clearTimeout(U), U = setTimeout(function() {
                B = !1, a("Trigger event lock off"), a("--")
            }, E)
        }

        function v(t) {
            I = Y[A](), V = f(), _(I, V, t)
        }

        // CONTINUE UP FROM HERE 

        var b = !0,
            w = 10,
            C = "",
            k = 0,
            x = "",
            T = "",
            S = !1,
            j = {
                resize: 1,
                click: 1
            },
            E = 128,
            I = 1,
            D = !0,
            Q = "offset",
            A = Q,
            H = !0,
            $ = "",
            O = 32,
            N = !1,
            R = "[iFrameSizer]",
            P = R.length,
            z = "",
            M = !1,
            L = {
                max: 1,
                scroll: 1,
                bodyScroll: 1,
                documentElementScroll: 1
            },
            W = "*",
            F = window.parent,
            q = 0,
            B = !1,
            U = null,
            V = 1,
            Y = {
                offset: t,
                bodyOffset: t,
                bodyScroll: s,
                documentElementOffset: n,
                scroll: d,
                documentElementScroll: d,
                max: p,
                min: function() {
                    return Math.min.apply(null, u())
                },
                grow: p,
                lowestElement: function() {
                    return Math.max(t(), function() {
                        for (var t = document.querySelectorAll("body *"), e = t.length, i = 0, s = (new Date).getTime(), n = 0; n < e; n++) t[n].getBoundingClientRect().bottom > i && (i = t[n].getBoundingClientRect().bottom);
                        return s = (new Date).getTime() - s, a("Parsed " + e + " HTML elements"), a("LowestElement bottom position calculated in " + s + "ms"), i
                    }())
                }
            };
        o(window, "message", function(t) {
            R === ("" + t.data).substr(0, P) && (D && t.data.split(":")[2] in {
                true: 1,
                false: 1
            } ? ($ = t.data, F = t.source, i(), D = !1, setTimeout(function() {
                H = !1
            }, E)) : "reset" === t.data.split("]")[1] ? H ? a("Page reset ignored by init") : (a("Page size reset by host page"), v("resetPage")) : t.data === $ || "iFrameResize" in window || r("Unexpected message (" + t.data + ")"))
        })
    }(),
    function() {
        "use strict";

        function n(t, e, i) {
            "addEventListener" in window ? t.addEventListener(e, i, !1) : "attachEvent" in window && t.attachEvent("on" + e, i)
        }

        function t() {
            function i(t) {
                if ("IFRAME" !== t.tagName.toUpperCase()) throw new TypeError("Expected <IFRAME> tag, found <" + t.tagName + ">.");
                e.call(t)
            }
            return function(t, e) {
                (function(t) {
                    for (var e in s(t = t || {}), C) C.hasOwnProperty(e) && (w[e] = t.hasOwnProperty(e) ? t[e] : C[e])
                })(t), Array.prototype.forEach.call(document.querySelectorAll(e || "iframe"), i)
            }
        }
        var i, r = 0,
            f = !0,
            g = "message".length,
            m = "[iFrameSizer]",
            v = m.length,
            y = "",
            _ = null,
            a = window.requestAnimationFrame,
            b = {
                max: 1,
                scroll: 1,
                bodyScroll: 1,
                documentElementScroll: 1
            },
            w = {},
            C = {
                autoResize: !0,
                bodyBackground: null,
                bodyMargin: null,
                bodyMarginV1: 8,
                bodyPadding: null,
                checkOrigin: !0,
                enablePublicMethods: !1,
                heightCalculationMethod: "offset",
                interval: 32,
                log: !1,
                maxHeight: 1 / 0,
                maxWidth: 1 / 0,
                minHeight: 0,
                minWidth: 0,
                scrolling: !1,
                sizeHeight: !0,
                sizeWidth: !1,
                tolerance: 0,
                closedCallback: function() {},
                initCallback: function() {},
                messageCallback: function() {},
                resizedCallback: function() {}
            };
        (function() {
            var t, e = ["moz", "webkit", "o", "ms"];
            for (t = 0; t < e.length && !a; t += 1) a = window[e[t] + "RequestAnimationFrame"];
            a || l(" RequestAnimationFrame not supported")
        })(), n(window, "message", function(i) {
            function s() {
                t("Height"), t("Width"), p(function() {
                    u(a), c(), w.resizedCallback(a)
                }, a, "resetPage")
            }

            function t(t) {
                var e = Number(w["max" + t]),
                    i = Number(w["min" + t]),
                    s = t.toLowerCase(),
                    n = Number(a[s]);
                if (e < i) throw new Error("Value for min" + t + " can not be greater than max" + t);
                l(" Checking " + s + " is in range " + i + "-" + e), n < i && (n = i, l(" Set " + s + " to min value")), e < n && (n = e, l(" Set " + s + " to max value")), a[s] = "" + n
            }

            function n(t) {
                var e, i = t ? (e = a.iframe.getBoundingClientRect(), h(), {
                    x: Number(e.left) + Number(_.x),
                    y: Number(e.top) + Number(_.y)
                }) : {
                    x: 0,
                    y: 0
                };
                l(" Reposition requested from iFrame (offset x:" + i.x + " y:" + i.y + ")"), _ = {
                    x: Number(a.width) + i.x,
                    y: Number(a.height) + i.y
                }, c()
            }
            var e, o, r = i.data,
                a = {};
            m === ("" + r).substr(0, v) && (l(" Received: " + r), o = r.substr(v).split(":"), a = {
                iframe: document.getElementById(o[0]),
                id: o[0],
                height: o[1],
                width: o[2],
                type: o[3]
            }, (e = a.type in {
                true: 1,
                false: 1
            }) && l(" Ignoring init message from meta parent page"), !e && function() {
                if (null === a.iframe) throw new Error("iFrame (" + a.id + ") does not exist on " + y);
                return !0
            }() && function() {
                var t = i.origin,
                    e = a.iframe.src.split("/").slice(0, 3).join("/");
                if (w.checkOrigin && (l(" Checking connection is from: " + e), "" + t != "null" && t !== e)) throw new Error("Unexpected message received from: " + t + " for " + a.iframe.id + ". Message was: " + i.data + ". This error can be disabled by adding the checkOrigin: false option.");
                return !0
            }() && (function() {
                switch (a.type) {
                    case "close":
                        e = a.iframe, l(" Removing iFrame: " + (i = e.id)), e.parentNode.removeChild(e), w.closedCallback(i), l(" --"), w.resizedCallback(a);
                        break;
                    case "message":
                        t = r.substr(r.indexOf(":") + g + 6), l(" MessageCallback passed: {iframe: " + a.iframe.id + ", message: " + t + "}"), w.messageCallback({
                            iframe: a.iframe,
                            message: JSON.parse(t)
                        }), l(" --");
                        break;
                    case "scrollTo":
                        n(!1);
                        break;
                    case "scrollToOffset":
                        n(!0);
                        break;
                    case "reset":
                        d(a);
                        break;
                    case "init":
                        s(), w.initCallback(a.iframe);
                        break;
                    default:
                        s()
                }
                var t, e, i
            }(), f = !1))
        }), window.jQuery && ((i = jQuery).fn.iFrameResize = function(t) {
            return s(t = t || {}), w = i.extend({}, C, t), this.filter("iframe").each(e).end()
        }), "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.iFrameResize = t()
    }(), window.isTouchDevice = /Windows Phone/.test(navigator.userAgent) || "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch, jQuery(function() {
        initSteps(), initOpenClose(), initNavHover(), initMobileNav(), initCycleCarousel(), initAccordion(), initFundingBanner(), initCookieBanner(), initFixedHeader(), initRetinaCover(), initVideoPopup(), initBackgroundResize(), initRandomBlocks(), initSearch(), initBlog(), initTimeline(), initLanguage(), initTinyFilter(), initSmoothScroll(), initEventsDropdown(), initSnapToBottom(), initScrollReveal()
    });





function initSteps() {
    jQuery(".story-wrap").lineSVG({
        onceMode: !1
    })
}


function initTimeline() {
    if (jQuery("#timeline-wrapper").length) {
        jQuery('[data-toggle="popover"]').popover({
            html: !0,
            placement: function(t, e) {
                return jQuery(window).width() < 991 ? "bottom" : "right"
            },
            content: function() {
                return jQuery(this).next(".line-event-content").html()
            }
        }).on("mouseenter", function() {
            jQuery(this).hasClass("active") || (jQuery(".line-event a").removeClass("active"), jQuery(".popover").popover("hide"), jQuery(this).addClass("active").popover("show"))
        }).on("mouseleave", function() {
            var t = this,
                e = jQuery(this).parent();
            setTimeout(function() {
                jQuery(".popover:hover").length || e.is(":hover") || jQuery(t).removeClass("active").popover("hide")
            }, 150)
        }).on("shown.bs.popover", function() {
            var t = jQuery(this).parent().find(".popover");
            if (window.isTouchDevice && !isElementInViewport(t)) {
                var e = jQuery(this).offset().top - 2 * jQuery("header.header").height();
                jQuery("html, body").animate({
                    scrollTop: e + "px"
                })
            }
        }), jQuery("a.event-0").addClass("active").popover("show"), jQuery('[data-toggle="popover"]:not(.event-0)').on("mouseover", function() {
            jQuery("a.event-0").removeClass("active").popover("hide")
        }), jQuery("html").on("click tap", function(t) {
            void 0 === jQuery(t.target).data("toggle") && jQuery('[data-toggle="popover"]').popover("hide")
        });
        var e = jQuery(".timeline.row").offset().top - jQuery("header.header").height(),
            i = jQuery(".timeline.row").offset().left;
        jQuery(document).on("ready scroll", function() {
            var t = jQuery(document).scrollTop();
            e <= t ? jQuery("#timeline-legend").addClass("sticky").css({
                top: "125px",
                left: i
            }) : t < e && jQuery("#timeline-legend").removeClass("sticky").css({
                top: 0,
                left: 0
            })
        })
    }
}! 

function(e, t) {
    "use strict";
    function i(t) {
    }
    i.prototype = {
        destroy: function() {}
    }
}(jQuery, jQuery(window)),
function(e, o) {
    "use strict";

    function i(t) {
        this.options = e.extend({
            activeClass: "on-scroll",
            steps: ".steps",
            line: ".line",
            startItem: ".story-symbol",
            turnWidth: 50,
            onceMode: !1
        }, t), this.init()
    }
    i.prototype = {
        init: function() {
            this.findElements(), this.attachEvents()
        },
        findElements: function() {
            this.holder = e(this.options.holder), this.steps = this.holder.find(this.options.steps), this.startItem = this.holder.find(this.options.startItem), this.line = this.holder.find(this.options.line), this.path = this.line.children("path")
        },
        drawLine: function() {
            var h = this;
            this.holderData = {
                x: this.holder.offset().left,
                y: this.holder.offset().top,
                w: this.holder.outerWidth(),
                h: this.holder.outerHeight()
            };
            var c, d = function(t) {
                    return t.offset().left - h.holderData.x
                },
                u = function(t) {
                    return t.offset().top - h.holderData.y
                };
            this.line.attr("width", h.holderData.width).attr("height", h.holderData.height), this.path.attr("d", (c = "M" + (d(h.startItem) + h.startItem.outerWidth() / 2) + "," + (u(h.startItem) + h.startItem.outerHeight()), h.steps.each(function(t) {
                var e = jQuery(this),
                    i = 0 === t,
                    s = t === h.steps.length - 1,
                    n = t % 2,
                    o = e.outerWidth() - 2,
                    r = e.outerHeight(),
                    a = Math.ceil(d(e) + 1),
                    l = Math.ceil(u(e));
                i && (c += "L" + (a + o / 2) + "," + (l - h.options.turnWidth), c += "Q" + (a + o / 2) + "," + l + " " + (a + o / 2 - h.options.turnWidth) + "," + l, c += "L" + (a + h.options.turnWidth) + "," + l, c += "Q" + a + "," + l + " " + a + "," + (l + h.options.turnWidth)), n ? (c += "L" + (a + o) + "," + (l + r - h.options.turnWidth), c += "Q" + (a + o) + "," + (l + r) + "," + (a + o - h.options.turnWidth) + "," + (l + r), s || (c += "L" + (a + h.options.turnWidth) + "," + (l + r), c += "Q" + a + "," + (l + r) + " " + a + "," + (l + r + h.options.turnWidth))) : (c += "L" + a + "," + (l + r - h.options.turnWidth), c += "Q" + a + "," + (l + r) + " " + (a + h.options.turnWidth) + "," + (l + r), s || (c += "L" + (a + o - h.options.turnWidth) + "," + (l + r), c += "Q" + (a + o) + "," + (l + r) + " " + (a + o) + "," + (l + r + h.options.turnWidth))), s && (c += n ? "L" + (a + o / 2 + h.options.turnWidth) + "," + (l + r) : "L" + (a + o / 2 - h.options.turnWidth) + "," + (l + r), c += "Q" + (a + o / 2) + "," + (l + r) + "," + (a + o / 2) + "," + (l + r + h.options.turnWidth), c += "L" + (a + o / 2) + "," + h.holderData.h)
            }), c))
        },
        attachEvents: function() {
            var s = this,
                n = function() {
                    var t = e(this);
                    o.scrollTop() + .6 * o.height() > t.offset().top ? t.addClass(s.options.activeClass) : s.options.onceMode || t.removeClass(s.options.activeClass)
                };
            this.resizeHandler = function() {
                s.drawLine(), s.scrollHandler()
            }, this.scrollHandler = function() {
                s.steps.each(n), s.prevScrollPercentage || (s.prevScrollPercentage = 0);
                var t = s.path[0].getTotalLength();
                if (0 !== t) {
                    var e = Math.min(1, Math.max(0, o.scrollTop() + o.height() / 2 + 200 - s.holderData.y) / s.holderData.h),
                        i = t * e;
                    s.path[0].style.strokeDashoffset = t - i, s.options.onceMode && (e < s.prevScrollPercentage && (e = s.prevScrollPercentage), s.prevScrollPercentage = e), s.path[0].style.strokeDasharray = .99 <= e ? "none" : t + " " + t
                }
            }, this.resizeHandler(), o.on({
                scroll: s.scrollHandler,
                resize: s.resizeHandler,
                orientationchange: s.resizeHandler,
                load: s.resizeHandler
            })
        },

        destroy: function() {}
    }, e.fn.lineSVG = function(t) {
        return this.each(function() {
            e(this).data("LineSVG", new i(e.extend(t, {
                holder: this
            })))
        })
    }
}(jQuery, jQuery(window));

var ImageStretcher = {};
function TinyFilter() {

}(jQuery),
function(s) {
    function e(t) {
        this.options = s.extend({
            activeClass: "active",
            mask: "div.slides-mask",
            slider: ">ul",
            slides: ">li",
            btnPrev: ".btn-prev",
            btnNext: ".btn-next",
            pagerLinks: "ul.pager > li",
            generatePagination: !1,
            pagerList: "<ul>",
            pagerListItem: '<li><a href="#"></a></li>',
            pagerListItemText: "a",
            galleryReadyClass: "gallery-js-ready",
            currentNumber: "span.current-num",
            totalNumber: "span.total-num",
            maskAutoSize: !1,
            autoRotation: !1,
            pauseOnHover: !1,
            stretchSlideToMask: !1,
            switchTime: 3e3,
            animSpeed: 500,
            handleTouch: !0,
            swipeThreshold: 15,
            vertical: !1
        }, t), this.init()
    }

}(jQuery),
function(c, t) {

    function e(t) {
        this.options = c.extend({
            anchorLinks: 'a[href^="#"]',
            container: null,
            extraOffset: null,
            activeClasses: null,
            easing: "swing",
            animMode: "duration",
            animDuration: 800,
            animSpeed: 1500,
            anchorActiveClass: "anchor-active",
            sectionActiveClass: "section-active",
            wheelBehavior: "stop",
            useNativeAnchorScrolling: !1
        }, t), this.init()
    }
    e.prototype = {
        init: function() {
            this.initStructure(), this.attachEvents()
        }
    }, c.extend(e, {
        scrollTo: function(t, e, i) {
            s(t, e, i)
        }
    });

    







}(window, document);