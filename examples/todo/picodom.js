!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? t(exports)
		: "function" == typeof define && define.amd
			? define(["exports"], t)
			: t((e.picodom = {}));
})(this, function (e) {
	"use strict";
	function t(e, t) {
		var n,
			r = [];
		for (u = arguments.length; u-- > 2; ) d.push(arguments[u]);
		for (; d.length; )
			if (Array.isArray((n = d.pop())))
				for (u = n.length; u--; ) d.push(n[u]);
			else
				null != n &&
					!0 !== n &&
					!1 !== n &&
					("number" == typeof n && (n += ""), r.push(n));
		return "string" == typeof e
			? { tag: e, data: t || {}, children: r }
			: e(t, r);
	}
	function n(e, t, a, l, u, d) {
		if (null == a) t = e.insertBefore(o(l, u), t);
		else if (null != l.tag && l.tag === a.tag) {
			i(t, a.data, l.data), (u = u || "svg" === l.tag);
			for (
				var c = l.children.length,
					s = a.children.length,
					h = {},
					v = [],
					p = {},
					g = 0;
				g < s;
				g++
			) {
				var y = (v[g] = t.childNodes[g]),
					m = a.children[g],
					b = r(m);
				null != b && (h[b] = [y, m]);
			}
			for (var g = 0, k = 0; k < c; ) {
				var y = v[g],
					m = a.children[g],
					w = l.children[k],
					b = r(m);
				if (p[b]) g++;
				else {
					var x = r(w),
						A = h[x] || [];
					null == x
						? (null == b && (n(t, y, m, w, u), k++), g++)
						: (b === x
								? (n(t, A[0], A[1], w, u), g++)
								: A[0]
									? (t.insertBefore(A[0], y),
										n(t, A[0], A[1], w, u))
									: n(t, y, null, w, u),
							k++,
							(p[x] = w));
				}
			}
			for (; g < s; ) {
				var m = a.children[g],
					b = r(m);
				null == b && f(t, v[g], m.data), g++;
			}
			for (var g in h) {
				var A = h[g],
					B = A[1];
				p[B.data.key] || f(t, A[0], B.data);
			}
		} else
			t &&
				l !== t.nodeValue &&
				((t = e.insertBefore(o(l, u), (d = t))), f(e, d, a.data));
		return t;
	}
	function r(e) {
		if (e && (e = e.data)) return e.key;
	}
	function a(e, t) {
		var n = {};
		for (var r in e) n[r] = e[r];
		for (var r in t) n[r] = t[r];
		return n;
	}
	function o(e, t) {
		if ("string" == typeof e) var n = document.createTextNode(e);
		else {
			var n = (t = t || "svg" === e.tag)
				? document.createElementNS("http://www.w3.org/2000/svg", e.tag)
				: document.createElement(e.tag);
			e.data &&
				e.data.oncreate &&
				c.push(function () {
					e.data.oncreate(n);
				});
			for (var r in e.data) l(n, r, e.data[r]);
			for (var r = 0; r < e.children.length; )
				n.appendChild(o(e.children[r++], t));
		}
		return n;
	}
	function i(e, t, n) {
		for (var r in a(t, n)) {
			var o = n[r],
				i = "value" === r || "checked" === r ? e[r] : t[r];
			o !== i && l(e, r, o, i);
		}
		n &&
			n.onupdate &&
			c.push(function () {
				n.onupdate(e, t);
			});
	}
	function f(e, t, n) {
		n && n.onremove ? n.onremove(t) : e.removeChild(t);
	}
	function l(e, t, n, r) {
		if ("key" === t);
		else if ("style" === t)
			for (var o in a(r, (n = n || {}))) e.style[o] = n[o] || "";
		else {
			try {
				e[t] = n;
			} catch (e) {}
			"function" != typeof n &&
				(n ? e.setAttribute(t, n) : e.removeAttribute(t));
		}
	}
	var u,
		d = [],
		c = [],
		s = function (e, t, r, a, o) {
			for (r = n(a || document.body, r, e, t); (o = c.pop()); ) o();
			return r;
		};
	(e.h = t), (e.patch = s);
});
//# sourceMappingURL=picodom.js.map
