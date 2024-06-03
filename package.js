import {createApp, toRefs, ref, reactive, onMounted, onUnmounted, onUpdated, computed, watch, watchEffect, inject, isProxy, toRaw} from "vue";
import {useRoute, useRouter, createRouter, createWebHistory, createWebHashHistory} from "vue-router";
import $__lib from "lib.min.js";
import "lib.min.js/plugin";

function vue () {
	return this;
	}

vue.create = createApp;
vue.inject = inject;
vue.slot = function (v) { return v.$slots; }
vue.c_data = function (v) { return v.$slots.default; }
vue.reference = function (data) { return ref (data || null); }
vue.reactive = function (key, value) { if (value) for (var i in value) key [i] = value [i]; else return reactive (key || {}); return key; }
vue.reactive.clear = function (data) { for (var i in data) delete data [i]; }
vue.watch = function (... proxy) { if (proxy.length === 3) return watch (proxy [0], proxy [2], proxy [1]); else return watch (... proxy); }
vue.model = function (model) { return vue.model.data [model]; }
vue.model.delete = function (model) { delete vue.model.data [model]; }
vue.model.data = reactive ({});

vue.router = function (option) { return vue.router.create (option); }
vue.router.use = function () { return vue.router.data = useRouter (); }
vue.router.create = function (option) { return createRouter ({history: createWebHistory (option.history), routes: option.data}); }
vue.router.previous = function (i = 1) { vue.router.data.go (- i); }
vue.router.next = function (i = 1) { vue.router.data.go (i); }
vue.router.path = function (path) { return vue.router.data.currentRoute.value.path = path; }
vue.router.register = function (router, dom) { return vue.$__router [router] = dom; }
vue.router.link = function (type, param) { if (param) return vue.router.link.data [type].to_param (param); else return vue.router.link.data [type]; }
vue.router.link.data = reactive ({});
vue.router.url = function (router) { vue.router.url.parse (router); }
vue.router.url.path = reactive ({});
vue.router.slot = ref ("index");
vue.router.exist = ref (null);
vue.router.try_catch = "/:catchAll(.*)";
vue.router.prefix = "router ";
vue.router.index_of = "router index";
vue.router.error_of = "router error:internal";
vue.router.$__data = [];
vue.$__router = {}

vue.route = function (path) { var route = vue.route.url.path [path || vue.route.path ()]; if (route) return route; else return {} }
vue.route.use = function () { return vue.route.data = useRoute (); }
vue.route.path = function (path) { if (path) return vue.route.data.path === path; else return vue.route.data.path; }
vue.route.param = function (param) { if (param) return vue.route.param.data [param]; else return vue.route.param.data; }
vue.route.param.get = function (param) { if (param) return vue.route.data.params [param]; else return vue.route.data.params; }
vue.route.param.data = reactive ({});
vue.route.query = function (query) { if (query) { if (typeof query === "string") return vue.route.data.query [query]; else { for (var i in query) if (vue.route.data.query [i] !== query [i]) return false; return true; } } else return vue.route.data.query; }
vue.route.source = function () { var matched; if (matched = vue.route.data.matched [0]) return {name: matched.name, path: matched.path} }
vue.route.type = function (path) { return vue.route (path).type; }
vue.route.exist = function (path) { if (path) return vue.router.exist.value = path in vue.route.url.path; else return vue.router.exist.value; }
vue.route.url = function () {}
vue.route.url.path = reactive ({});

vue.script = function (v = {}) {
	return {
		props: v.prop || v.attribute,
		setup (prop) {
			if (v.setup) return vue.data (v.setup.call (this, prop));
			else return vue.data (prop);
			},
		mounted () { vue.emit ("script:mount", this); if (v.mount) v.mount.call (this); },
		unmounted () { vue.emit ("script:eject", this); if (v.eject) v.eject.call (this); },
		created () { vue.emit ("script:create", this); if (v.create) v.create.call (this); },
		updated () { vue.emit ("script:update", this); if (v.update) v.update.call (this); },
		watch: v.watch,
		methods: v.method,
		}
	}

vue.event = function () {}
vue.event.data = {}
vue.emit = function (key, ... value) { var data; for (var i in vue.event.data [key]) data = vue.event.data [key][i].call (data, ... value); return data; }
vue.on = function (key, value) { if (vue.event.data [key]) vue.event.data [key].push (value); else vue.event.data [key] = [value]; }
vue.on.line = function (line, context) { if (arguments.length) { if (context) context (); return vue.on.line.status.value = line; } else return vue.on.line.status.value; }
vue.on.line.status = ref (null);
vue.on.progress = function () { var progress = 0; for (var i in vue.on.progress.data) progress ++; return progress; }
vue.on.progress.push = function (progress) { return vue.on.progress.data [progress] = true; }
vue.on.progress.clear = function (progress) { if (progress) delete vue.on.progress.data [progress]; else for (var i in vue.on.progress.data) delete vue.on.progress.data [i]; }
vue.on.progress.data = reactive ({});
vue.on.loading = function () { return vue.on.loading.data.value.length; }
vue.on.loading.push = function (loading) { return vue.on.loading.data.value.push (loading); }
vue.on.loading.clear = function (loading) {
	if (loading) vue.on.loading.data.value.splice (vue.on.loading.data.value.indexOf (loading));
	else vue.on.loading.data.value = [];
	}
vue.on.loading.data = ref ([]);
vue.on.loading.status = ref ("off");

export var the = function () {}
export var lib = $__lib;
export var library = function () {}
export default vue;
