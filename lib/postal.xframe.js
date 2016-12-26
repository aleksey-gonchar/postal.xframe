(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("postal"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["postal", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["postalXframe"] = factory(require("postal"), require("lodash"));
	else
		root["postalXframe"] = factory(root["postal"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return env; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return state; });


let env = {
	origin: location.origin || location.protocol + "//" + location.host,
	isWorker: ( typeof window === "undefined" ) && postMessage && location,
	// I know, I KNOW. The alternative was very expensive perf & time-wise
	// so I saved you a perf hit by checking the stinking UA. Sigh.
	// I sought the opinion of several other devs. We all traveled
	// to the far east to consult with the wisdom of a monk - turns
	// out he didn"t know JavaScript, and our passports were stolen on the
	// return trip. We stowed away aboard a freighter headed back to the
	// US and by the time we got back, no one had heard of IE 8 or 9. True story.
	useEagerSerialize: /MSIE [8,9]/.test( navigator.userAgent )
};

const defaults = {
	allowedOrigins: [ env.origin ],
	enabled: true,
	defaultOriginUrl: "*",
	safeSerialize: false
};

let state = {
	workers: [],
	config: __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend( {}, defaults ),
	defaults
};


/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_postal__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_postal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_postal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state__ = __webpack_require__(1);




class XFrameClient extends __WEBPACK_IMPORTED_MODULE_0_postal___default.a.fedx.FederationClient {

	constructor( ...args ) {
		super( ...args );
		this.transportName = "xframe";
	}

	shouldProcess() {
		const hasDomainFilters = !!__WEBPACK_IMPORTED_MODULE_2__state__["a" /* state */].config.allowedOrigins.length;
		return __WEBPACK_IMPORTED_MODULE_2__state__["a" /* state */].config.enabled &&
			// another frame/window
			( ( this.options.origin === "*" || ( hasDomainFilters && __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.contains( __WEBPACK_IMPORTED_MODULE_2__state__["a" /* state */].config.allowedOrigins, this.options.origin ) || !hasDomainFilters ) ) ||
			// worker
			( this.options.isWorker && __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.contains( __WEBPACK_IMPORTED_MODULE_2__state__["a" /* state */].workers, this.target ) ) ||
			// we are in a worker
			__WEBPACK_IMPORTED_MODULE_2__state__["b" /* env */].isWorker );
	}

	send( packingSlip ) {
		if ( this.shouldProcess() ) {
			const context = __WEBPACK_IMPORTED_MODULE_2__state__["b" /* env */].isWorker ? null : this.target;
			const args = [ __WEBPACK_IMPORTED_MODULE_0_postal___default.a.fedx.transports.xframe.wrapForTransport( packingSlip ) ];
			if ( !this.options.isWorker && !__WEBPACK_IMPORTED_MODULE_2__state__["b" /* env */].isWorker ) {
				args.push( this.options.origin );
			}
			if ( !__WEBPACK_IMPORTED_MODULE_2__state__["b" /* env */].isWorker ) {
				if ( args.length === 1 ) {
					this.target.postMessage( args[0] );
				} else {
					this.target.postMessage( args[0], args[1] );
				}
			} else {
				this.target.postMessage.apply( context, args );
			}
		}
	}
}
/* harmony export (immutable) */ exports["a"] = XFrameClient;



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony export (immutable) */ exports["b"] = _memoRemoteByInstanceId;
/* harmony export (immutable) */ exports["c"] = _memoRemoteByTarget;
/* harmony export (immutable) */ exports["d"] = _disconnectClient;
/* harmony export (immutable) */ exports["a"] = safeSerialize;
/* unused harmony export entries */


function _memoRemoteByInstanceId( memo, instanceId ) {
	var proxy = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.find( this.remotes, function( x ) {
		return x.instanceId === instanceId;
	} );
	if ( proxy ) {
		memo.push( proxy );
	}
	return memo;
}

function _memoRemoteByTarget( memo, tgt ) {
	var proxy = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.find( this.remotes, function( x ) {
		return x.target === tgt;
	} );
	if ( proxy ) {
		memo.push( proxy );
	}
	return memo;
}

function _disconnectClient( client ) {
	client.disconnect();
}

function safeSerialize( envelope ) {
	for ( let [ key, val ] of entries( envelope ) ) {
		if ( typeof val === "function" ) {
			delete envelope[ key ];
		}
		if ( __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isPlainObject( val ) ) {
			safeSerialize( val );
		}
		if ( __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray( val ) ) {
			__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each( val, safeSerialize );
		}
	}
	return envelope;
}

var entries = function*( obj ) {
	if ( [ "object", "function" ].indexOf( typeof obj ) === -1 ) {
		obj = {};
	}
	for ( var k of Object.keys( obj ) ) {
		yield [ k, obj[ k ] ];
	}
};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__XFrameClient__ = __webpack_require__(3);
const _ = __webpack_require__(0)
const postal = __webpack_require__(2)





function listener() {
	plugin.routeMessage.apply( plugin, arguments );
}

function listenToWorker( worker ) {
	if ( !_.include( __WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].workers, worker ) ) {
		worker.addEventListener( "message", listener );
		__WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].workers.push( worker );
	}
}

__WEBPACK_IMPORTED_MODULE_2__XFrameClient__["a" /* default */].getInstance = function getInstance( source, origin, instanceId ) {
	const client = new __WEBPACK_IMPORTED_MODULE_2__XFrameClient__["a" /* default */]( source, {
		origin: origin,
		isWorker: ( typeof Worker !== "undefined" && source instanceof Worker )
	}, instanceId );
	if ( client.options.isWorker ) {
		listenToWorker( client.target );
	}
	return client;
};

const NO_OP = function() {};

const plugin = postal.fedx.transports.xframe = {
	eagerSerialize: __WEBPACK_IMPORTED_MODULE_1__state__["b" /* env */].useEagerSerialize,
	XFrameClient: __WEBPACK_IMPORTED_MODULE_2__XFrameClient__["a" /* default */],
	configure: function( cfg ) {
		if ( cfg ) {
			__WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].config = _.defaults( _.extend( __WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].config, cfg ), __WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].defaults );
		}
		return __WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].config;
	},
	clearConfiguration: function() {
		__WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].config = _.extend( {}, __WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].defaults );
	},
	//find all iFrames and the parent window if in an iframe
	getTargets: __WEBPACK_IMPORTED_MODULE_1__state__["b" /* env */].isWorker ? function() {
		return [ {
			target: {
				postMessage: postMessage
			}
		} ]; // TO-DO: look into this...
	} : function() {
		const targets = _.map( document.getElementsByTagName( "iframe" ), function( i ) {
			var urlHack = document.createElement( "a" );
			urlHack.href = i.src;
			let origin = urlHack.protocol + "//" + urlHack.host;
			// The following condition fixes the IE issue of setting the origin while the iframe is 'empty':
			// if the iframe has no 'src' set to some meaningful url (at this very moment),
			// then the urlHack returns neither protocol nor host information.
			if ( origin === "//" ) {
				origin = null;
			}
			return {
				target: i.contentWindow,
				origin: origin || __WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].config.defaultOriginUrl
			};
		} );
		if ( window.parent && window.parent !== window ) {
			targets.push( {
				target: window.parent,
				origin: "*"
			} );
		}
		return targets.concat( __WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].workers );
	},
	remotes: [],
	wrapForTransport: __WEBPACK_IMPORTED_MODULE_1__state__["b" /* env */].useEagerSerialize ? function( packingSlip ) {
		return JSON.stringify( {
			postal: true,
			packingSlip: packingSlip
		} );
	} : function( packingSlip ) {
		return {
			postal: true,
			packingSlip: packingSlip
		};
	},
	unwrapFromTransport: function( msgData ) {
		if ( typeof msgData === "string" && ( __WEBPACK_IMPORTED_MODULE_1__state__["b" /* env */].useEagerSerialize || msgData.indexOf( '"postal":true' ) !== -1 ) ) {
			try {
				return JSON.parse( msgData );
			} catch ( ex ) {
				return {};
			}
		} else {
			return msgData;
		}
	},
	routeMessage: function( event ) {
		// source = remote window or worker?
		const source = event.source || event.currentTarget;
		const parsed = this.unwrapFromTransport( event.data );
		if ( parsed.postal ) {
			var remote = _.find( this.remotes, function( x ) {
				return x.target === source;
			} );
			if ( !remote ) {
				remote = __WEBPACK_IMPORTED_MODULE_2__XFrameClient__["a" /* default */].getInstance( source, event.origin, parsed.packingSlip.instanceId );
				this.remotes.push( remote );
			}
			remote.onMessage( parsed.packingSlip );
		}
	},
	sendMessage: function( env ) {
		let envelope = env;
		if ( __WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].config.safeSerialize ) {
			envelope = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* safeSerialize */])( _.cloneDeep( env ) );
		}
		_.each( this.remotes, function( remote ) {
			remote.sendMessage( envelope );
		} );
	},
	disconnect: function( options ) {
		options = options || {};
		const clients = options.instanceId ?
			// an instanceId value or array was provided, let's get the client proxy instances for the id(s)
			_.reduce( _.isArray( options.instanceId ) ? options.instanceId : [ options.instanceId ], __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* _memoRemoteByInstanceId */], [], this ) :
			// Ok so we don't have instanceId(s), let's try target(s)
			options.target ?
				// Ok, so we have a targets array, we need to iterate over it and get a list of the proxy/client instances
				_.reduce( _.isArray( options.target ) ? options.target : [ options.target ], __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* _memoRemoteByTarget */], [], this ) :
				// aww, heck - we don't have instanceId(s) or target(s), so it's ALL THE REMOTES
				this.remotes;
		if ( !options.doNotNotify ) {
			_.each( clients, __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* _disconnectClient */], this );
		}
		this.remotes = _.without.apply( null, [ this.remotes ].concat( clients ) );
	},
	signalReady: function( targets, callback ) {
		targets = _.isArray( targets ) ? targets : [ targets ];
		targets = targets.length ? targets : this.getTargets();
		callback = callback || NO_OP;
		_.each( targets, function( def ) {
			if ( def.target ) {
				def.origin = def.origin || __WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].config.defaultOriginUrl;
				let remote = _.find( this.remotes, function( x ) {
					return x.target === def.target;
				} );
				if ( !remote ) {
					remote = __WEBPACK_IMPORTED_MODULE_2__XFrameClient__["a" /* default */].getInstance( def.target, def.origin );
					this.remotes.push( remote );
				}
				remote.sendPing( callback );
			}
		}, this );
	},
	addEventListener: __WEBPACK_IMPORTED_MODULE_1__state__["b" /* env */].isWorker ? function() {
		addEventListener( "message", listener );
	} : function( eventName, handler, bubble ) {
		// in normal browser context
		if ( typeof window !== "undefined" && typeof window.addEventListener === "function" ) {
			window.addEventListener( eventName, handler, bubble );
		} else {
			throw new Error( "postal.xframe only works with browsers that support window.addEventListener" );
		}
	},
	listenToWorker: listenToWorker,
	stopListeningToWorker: function( worker ) {
		if ( worker ) {
			worker.removeEventListener( "message", listener );
			__WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].workers = _.without( __WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].workers, worker );
		} else {
			while ( __WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].workers.length ) {
				__WEBPACK_IMPORTED_MODULE_1__state__["a" /* state */].workers.pop().removeEventListener( "message", listener );
			}
		}
	}
};

plugin.addEventListener( "message", listener, false );


/***/ }
/******/ ])
});
;
//# sourceMappingURL=postal.xframe.js.map