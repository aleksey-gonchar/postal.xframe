/*!
 *  * postal.xframe - postal.js/postal.federation plugin for federating instances of postal.js across iframe/window boundaries.
 *  * Author: Jim Cowart (http://ifandelse.com)
 *  * Version: v0.5.0
 *  * Url: http://github.com/postaljs/postal.xframe
 *  * License(s): (MIT OR GPL-2.0)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("postal"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "postal"], factory);
	else if(typeof exports === 'object')
		exports["postalXframe"] = factory(require("lodash"), require("postal"));
	else
		root["postalXframe"] = factory(root["_"], root["postal"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/"use strict";
	
	var /*istanbul ignore next*/_lodash = __webpack_require__(1);
	
	/*istanbul ignore next*/var _lodash2 = _interopRequireDefault(_lodash);
	
	var /*istanbul ignore next*/_postal = __webpack_require__(2);
	
	/*istanbul ignore next*/var _postal2 = _interopRequireDefault(_postal);
	
	var /*istanbul ignore next*/_utils = __webpack_require__(3);
	
	var /*istanbul ignore next*/_state = __webpack_require__(4);
	
	var /*istanbul ignore next*/_XFrameClient = __webpack_require__(5);
	
	/*istanbul ignore next*/var _XFrameClient2 = _interopRequireDefault(_XFrameClient);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function listener() {
		plugin.routeMessage.apply(plugin, arguments);
	}
	
	function listenToWorker(worker) {
		if (! /*istanbul ignore next*/_lodash2.default.include( /*istanbul ignore next*/_state.state.workers, worker)) {
			worker.addEventListener("message", listener);
			/*istanbul ignore next*/_state.state.workers.push(worker);
		}
	}
	
	/*istanbul ignore next*/_XFrameClient2.default.getInstance = function getInstance(source, origin, instanceId) {
		var client = new /*istanbul ignore next*/_XFrameClient2.default(source, {
			origin: origin,
			isWorker: typeof Worker !== "undefined" && source instanceof Worker
		}, instanceId);
		if (client.options.isWorker) {
			listenToWorker(client.target);
		}
		return client;
	};
	
	var NO_OP = function NO_OP() {};
	
	var plugin = /*istanbul ignore next*/_postal2.default.fedx.transports.xframe = {
		eagerSerialize: /*istanbul ignore next*/_state.env.useEagerSerialize,
		XFrameClient: /*istanbul ignore next*/_XFrameClient2.default,
		configure: function /*istanbul ignore next*/configure(cfg) {
			if (cfg) {
				/*istanbul ignore next*/_state.state.config = /*istanbul ignore next*/_lodash2.default.defaults( /*istanbul ignore next*/_lodash2.default.extend( /*istanbul ignore next*/_state.state.config, cfg), /*istanbul ignore next*/_state.state.defaults);
			}
			return (/*istanbul ignore next*/_state.state.config
			);
		},
		clearConfiguration: function /*istanbul ignore next*/clearConfiguration() {
			/*istanbul ignore next*/_state.state.config = /*istanbul ignore next*/_lodash2.default.extend({}, /*istanbul ignore next*/_state.state.defaults);
		},
		//find all iFrames and the parent window if in an iframe
		getTargets: /*istanbul ignore next*/_state.env.isWorker ? function () {
			return [{
				target: {
					postMessage: postMessage
				}
			}]; // TO-DO: look into this...
		} : function () {
			var targets = /*istanbul ignore next*/_lodash2.default.map(document.getElementsByTagName("iframe"), function (i) {
				var urlHack = document.createElement("a");
				urlHack.href = i.src;
				var origin = urlHack.protocol + "//" + urlHack.host;
				// The following condition fixes the IE issue of setting the origin while the iframe is 'empty':
				// if the iframe has no 'src' set to some meaningful url (at this very moment),
				// then the urlHack returns neither protocol nor host information.
				if (origin === "//") {
					origin = null;
				}
				return {
					target: i.contentWindow,
					origin: origin || /*istanbul ignore next*/_state.state.config.defaultOriginUrl
				};
			});
			if (window.parent && window.parent !== window) {
				targets.push({
					target: window.parent,
					origin: "*"
				});
			}
			return targets.concat( /*istanbul ignore next*/_state.state.workers);
		},
		remotes: [],
		wrapForTransport: /*istanbul ignore next*/_state.env.useEagerSerialize ? function (packingSlip) {
			return JSON.stringify({
				postal: true,
				packingSlip: packingSlip
			});
		} : function (packingSlip) {
			return {
				postal: true,
				packingSlip: packingSlip
			};
		},
		unwrapFromTransport: function /*istanbul ignore next*/unwrapFromTransport(msgData) {
			if (typeof msgData === "string" && ( /*istanbul ignore next*/_state.env.useEagerSerialize || msgData.indexOf('"postal":true') !== -1)) {
				try {
					return JSON.parse(msgData);
				} catch (ex) {
					return {};
				}
			} else {
				return msgData;
			}
		},
		routeMessage: function /*istanbul ignore next*/routeMessage(event) {
			// source = remote window or worker?
			var source = event.source || event.currentTarget;
			var parsed = this.unwrapFromTransport(event.data);
			if (parsed.postal) {
				var remote = /*istanbul ignore next*/_lodash2.default.find(this.remotes, function (x) {
					return x.target === source;
				});
				if (!remote) {
					remote = /*istanbul ignore next*/_XFrameClient2.default.getInstance(source, event.origin, parsed.packingSlip.instanceId);
					this.remotes.push(remote);
				}
				remote.onMessage(parsed.packingSlip);
			}
		},
		sendMessage: function /*istanbul ignore next*/sendMessage(env) {
			var envelope = env;
			if ( /*istanbul ignore next*/_state.state.config.safeSerialize) {
				envelope = /*istanbul ignore next*/(0, _utils.safeSerialize)( /*istanbul ignore next*/_lodash2.default.cloneDeep(env));
			}
			/*istanbul ignore next*/_lodash2.default.each(this.remotes, function (remote) {
				remote.sendMessage(envelope);
			});
		},
		disconnect: function /*istanbul ignore next*/disconnect(options) {
			options = options || {};
			var clients = options.instanceId ?
			// an instanceId value or array was provided, let's get the client proxy instances for the id(s)
			/*istanbul ignore next*/_lodash2.default.reduce( /*istanbul ignore next*/_lodash2.default.isArray(options.instanceId) ? options.instanceId : [options.instanceId], /*istanbul ignore next*/_utils._memoRemoteByInstanceId, [], this) :
			// Ok so we don't have instanceId(s), let's try target(s)
			options.target ?
			// Ok, so we have a targets array, we need to iterate over it and get a list of the proxy/client instances
			/*istanbul ignore next*/_lodash2.default.reduce( /*istanbul ignore next*/_lodash2.default.isArray(options.target) ? options.target : [options.target], /*istanbul ignore next*/_utils._memoRemoteByTarget, [], this) :
			// aww, heck - we don't have instanceId(s) or target(s), so it's ALL THE REMOTES
			this.remotes;
			if (!options.doNotNotify) {
				/*istanbul ignore next*/_lodash2.default.each(clients, /*istanbul ignore next*/_utils._disconnectClient, this);
			}
			this.remotes = /*istanbul ignore next*/_lodash2.default.without.apply(null, [this.remotes].concat(clients));
		},
		signalReady: function /*istanbul ignore next*/signalReady(targets, callback) {
			targets = /*istanbul ignore next*/_lodash2.default.isArray(targets) ? targets : [targets];
			targets = targets.length ? targets : this.getTargets();
			callback = callback || NO_OP;
			/*istanbul ignore next*/_lodash2.default.each(targets, function (def) {
				if (def.target) {
					def.origin = def.origin || /*istanbul ignore next*/_state.state.config.defaultOriginUrl;
					var remote = /*istanbul ignore next*/_lodash2.default.find(this.remotes, function (x) {
						return x.target === def.target;
					});
					if (!remote) {
						remote = /*istanbul ignore next*/_XFrameClient2.default.getInstance(def.target, def.origin);
						this.remotes.push(remote);
					}
					remote.sendPing(callback);
				}
			}, this);
		},
		addEventListener: /*istanbul ignore next*/_state.env.isWorker ? function () {
			addEventListener("message", listener);
		} : function (eventName, handler, bubble) {
			// in normal browser context
			if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
				window.addEventListener(eventName, handler, bubble);
			} else {
				throw new Error("postal.xframe only works with browsers that support window.addEventListener");
			}
		},
		listenToWorker: listenToWorker,
		stopListeningToWorker: function /*istanbul ignore next*/stopListeningToWorker(worker) {
			if (worker) {
				worker.removeEventListener("message", listener);
				/*istanbul ignore next*/_state.state.workers = /*istanbul ignore next*/_lodash2.default.without( /*istanbul ignore next*/_state.state.workers, worker);
			} else {
				while ( /*istanbul ignore next*/_state.state.workers.length) {
					/*istanbul ignore next*/_state.state.workers.pop().removeEventListener("message", listener);
				}
			}
		}
	};
	
	plugin.addEventListener("message", listener, false);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.entries = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports._memoRemoteByInstanceId = _memoRemoteByInstanceId;
	/*istanbul ignore next*/exports._memoRemoteByTarget = _memoRemoteByTarget;
	/*istanbul ignore next*/exports._disconnectClient = _disconnectClient;
	/*istanbul ignore next*/exports.safeSerialize = safeSerialize;
	
	var /*istanbul ignore next*/_lodash = __webpack_require__(1);
	
	/*istanbul ignore next*/var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _memoRemoteByInstanceId(memo, instanceId) {
		var proxy = /*istanbul ignore next*/_lodash2.default.find(this.remotes, function (x) {
			return x.instanceId === instanceId;
		});
		if (proxy) {
			memo.push(proxy);
		}
		return memo;
	}
	
	function _memoRemoteByTarget(memo, tgt) {
		var proxy = /*istanbul ignore next*/_lodash2.default.find(this.remotes, function (x) {
			return x.target === tgt;
		});
		if (proxy) {
			memo.push(proxy);
		}
		return memo;
	}
	
	function _disconnectClient(client) {
		client.disconnect();
	}
	
	function safeSerialize(envelope) {
		/*istanbul ignore next*/var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for ( /*istanbul ignore next*/var _iterator = entries(envelope)[Symbol.iterator](), _step; /*istanbul ignore next*/!(_iteratorNormalCompletion = (_step = _iterator.next()).done); /*istanbul ignore next*/_iteratorNormalCompletion = true) {
				/*istanbul ignore next*/var _step$value = _slicedToArray(_step.value, 2),
				    key = _step$value[0],
				    val = _step$value[1];
	
				if (typeof val === "function") {
					delete envelope[key];
				}
				if ( /*istanbul ignore next*/_lodash2.default.isPlainObject(val)) {
					safeSerialize(val);
				}
				if ( /*istanbul ignore next*/_lodash2.default.isArray(val)) {
					/*istanbul ignore next*/_lodash2.default.each(val, safeSerialize);
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		return envelope;
	}
	
	var entries = /*istanbul ignore next*/exports.entries = regeneratorRuntime.mark(function entries(obj) /*istanbul ignore next*/{
		var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, k;
	
		return regeneratorRuntime.wrap(function entries$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (["object", "function"].indexOf( /*istanbul ignore next*/typeof obj === "undefined" ? "undefined" : _typeof(obj)) === -1) {
							obj = {};
						}
						_iteratorNormalCompletion2 = true;
						_didIteratorError2 = false;
						_iteratorError2 = undefined;
						_context.prev = 4;
						_iterator2 = Object.keys(obj)[Symbol.iterator]();
	
					case 6:
						if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
							_context.next = 13;
							break;
						}
	
						k = _step2.value;
						_context.next = 10;
						return [k, obj[k]];
	
					case 10:
						_iteratorNormalCompletion2 = true;
						_context.next = 6;
						break;
	
					case 13:
						_context.next = 19;
						break;
	
					case 15:
						_context.prev = 15;
						_context.t0 = _context["catch"](4);
						_didIteratorError2 = true;
						_iteratorError2 = _context.t0;
	
					case 19:
						_context.prev = 19;
						_context.prev = 20;
	
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
	
					case 22:
						_context.prev = 22;
	
						if (!_didIteratorError2) {
							_context.next = 25;
							break;
						}
	
						throw _iteratorError2;
	
					case 25:
						return _context.finish(22);
	
					case 26:
						return _context.finish(19);
	
					case 27:
					case "end":
						return _context.stop();
				}
			}
		}, entries, this, [[4, 15, 19, 27], [20,, 22, 26]]);
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.state = exports.env = undefined;
	
	var /*istanbul ignore next*/_lodash = __webpack_require__(1);
	
	/*istanbul ignore next*/var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var env = /*istanbul ignore next*/exports.env = {
		origin: location.origin || location.protocol + "//" + location.host,
		isWorker: typeof window === "undefined" && postMessage && location,
		// I know, I KNOW. The alternative was very expensive perf & time-wise
		// so I saved you a perf hit by checking the stinking UA. Sigh.
		// I sought the opinion of several other devs. We all traveled
		// to the far east to consult with the wisdom of a monk - turns
		// out he didn"t know JavaScript, and our passports were stolen on the
		// return trip. We stowed away aboard a freighter headed back to the
		// US and by the time we got back, no one had heard of IE 8 or 9. True story.
		useEagerSerialize: /MSIE [8,9]/.test(navigator.userAgent)
	};
	
	var defaults = {
		allowedOrigins: [env.origin],
		enabled: true,
		defaultOriginUrl: "*",
		safeSerialize: false
	};
	
	var state = /*istanbul ignore next*/exports.state = {
		workers: [],
		config: /*istanbul ignore next*/_lodash2.default.extend({}, defaults),
		defaults: defaults
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore next*/"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var /*istanbul ignore next*/_postal = __webpack_require__(2);
	
	/*istanbul ignore next*/var _postal2 = _interopRequireDefault(_postal);
	
	var /*istanbul ignore next*/_lodash = __webpack_require__(1);
	
	/*istanbul ignore next*/var _lodash2 = _interopRequireDefault(_lodash);
	
	var /*istanbul ignore next*/_state = __webpack_require__(4);
	
	/*istanbul ignore next*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var XFrameClient = function (_postal$fedx$Federati) {
		_inherits(XFrameClient, _postal$fedx$Federati);
	
		function /*istanbul ignore next*/XFrameClient() {
			/*istanbul ignore next*/var _ref;
	
			_classCallCheck(this, XFrameClient);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			/*istanbul ignore next*/var _this = _possibleConstructorReturn(this, (_ref = XFrameClient.__proto__ || Object.getPrototypeOf(XFrameClient)).call.apply(_ref, [this].concat(args)));
	
			/*istanbul ignore next*/_this.transportName = "xframe";
			/*istanbul ignore next*/return _this;
		}
	
		_createClass(XFrameClient, [{
			key: "shouldProcess",
			value: function shouldProcess() {
				var hasDomainFilters = !! /*istanbul ignore next*/_state.state.config.allowedOrigins.length;
				return (/*istanbul ignore next*/_state.state.config.enabled && (
					// another frame/window
					this.options.origin === "*" || hasDomainFilters && /*istanbul ignore next*/_lodash2.default.contains( /*istanbul ignore next*/_state.state.config.allowedOrigins, this.options.origin) || !hasDomainFilters ||
					// worker
					this.options.isWorker && /*istanbul ignore next*/_lodash2.default.contains( /*istanbul ignore next*/_state.state.workers, this.target) ||
					// we are in a worker
					/*istanbul ignore next*/_state.env.isWorker)
				);
			}
		}, {
			key: "send",
			value: function send(packingSlip) {
				if (this.shouldProcess()) {
					var context = /*istanbul ignore next*/_state.env.isWorker ? null : this.target;
					var args = [/*istanbul ignore next*/_postal2.default.fedx.transports.xframe.wrapForTransport(packingSlip)];
					if (!this.options.isWorker && ! /*istanbul ignore next*/_state.env.isWorker) {
						args.push(this.options.origin);
					}
					if (! /*istanbul ignore next*/_state.env.isWorker) {
						if (args.length === 1) {
							this.target.postMessage(args[0]);
						} else {
							this.target.postMessage(args[0], args[1]);
						}
					} else {
						this.target.postMessage.apply(context, args);
					}
				}
			}
		}]);
	
		return XFrameClient;
	}( /*istanbul ignore next*/_postal2.default.fedx.FederationClient);
	
	/*istanbul ignore next*/exports.default = XFrameClient;

/***/ }
/******/ ])
});
;