/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

;/*! svg.js v2.7.1 MIT*/;!function(t,e){"function"==typeof define&&define.amd?define(function(){return e(t,t.document)}):"object"==typeof exports?module.exports=t.document?e(t,t.document):function(t){return e(t,t.document)}:t.SVG=e(t,t.document)}("undefined"!=typeof window?window:this,function(t,e){function i(t,e,i,n){return i+n.replace(b.regex.dots," .")}function n(t){for(var e=t.slice(0),i=e.length;i--;)Array.isArray(e[i])&&(e[i]=n(e[i]));return e}function r(t,e){return t instanceof e}function s(t,e){return(t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.webkitMatchesSelector||t.oMatchesSelector).call(t,e)}function o(t){return t.toLowerCase().replace(/-(.)/g,function(t,e){return e.toUpperCase()})}function a(t){return t.charAt(0).toUpperCase()+t.slice(1)}function h(t){return 4==t.length?["#",t.substring(1,2),t.substring(1,2),t.substring(2,3),t.substring(2,3),t.substring(3,4),t.substring(3,4)].join(""):t}function u(t){var e=t.toString(16);return 1==e.length?"0"+e:e}function l(t,e,i){if(null==e||null==i){var n=t.bbox();null==e?e=n.width/n.height*i:null==i&&(i=n.height/n.width*e)}return{width:e,height:i}}function c(t,e,i){return{x:e*t.a+i*t.c+0,y:e*t.b+i*t.d+0}}function f(t){return{a:t[0],b:t[1],c:t[2],d:t[3],e:t[4],f:t[5]}}function d(t){return t instanceof b.Matrix||(t=new b.Matrix(t)),t}function p(t,e){t.cx=null==t.cx?e.bbox().cx:t.cx,t.cy=null==t.cy?e.bbox().cy:t.cy}function m(t){for(var e=0,i=t.length,n="";e<i;e++)n+=t[e][0],null!=t[e][1]&&(n+=t[e][1],null!=t[e][2]&&(n+=" ",n+=t[e][2],null!=t[e][3]&&(n+=" ",n+=t[e][3],n+=" ",n+=t[e][4],null!=t[e][5]&&(n+=" ",n+=t[e][5],n+=" ",n+=t[e][6],null!=t[e][7]&&(n+=" ",n+=t[e][7])))));return n+" "}function x(e){for(var i=e.childNodes.length-1;i>=0;i--)e.childNodes[i]instanceof t.SVGElement&&x(e.childNodes[i]);return b.adopt(e).id(b.eid(e.nodeName))}function y(t){return null==t.x&&(t.x=0,t.y=0,t.width=0,t.height=0),t.w=t.width,t.h=t.height,t.x2=t.x+t.width,t.y2=t.y+t.height,t.cx=t.x+t.width/2,t.cy=t.y+t.height/2,t}function v(t){var e=(t||"").toString().match(b.regex.reference);if(e)return e[1]}function g(t){return Math.abs(t)>1e-37?t:0}var w=void 0!==this?this:t,b=w.SVG=function(t){if(b.supported)return t=new b.Doc(t),b.parser.draw||b.prepare(),t};if(b.ns="http://www.w3.org/2000/svg",b.xmlns="http://www.w3.org/2000/xmlns/",b.xlink="http://www.w3.org/1999/xlink",b.svgjs="http://svgjs.com/svgjs",b.supported=function(){return!!e.createElementNS&&!!e.createElementNS(b.ns,"svg").createSVGRect}(),!b.supported)return!1;b.did=1e3,b.eid=function(t){return"Svgjs"+a(t)+b.did++},b.create=function(t){var i=e.createElementNS(this.ns,t);return i.setAttribute("id",this.eid(t)),i},b.extend=function(){var t,e,i,n;for(t=[].slice.call(arguments),e=t.pop(),n=t.length-1;n>=0;n--)if(t[n])for(i in e)t[n].prototype[i]=e[i];b.Set&&b.Set.inherit&&b.Set.inherit()},b.invent=function(t){var e="function"==typeof t.create?t.create:function(){this.constructor.call(this,b.create(t.create))};return t.inherit&&(e.prototype=new t.inherit),t.extend&&b.extend(e,t.extend),t.construct&&b.extend(t.parent||b.Container,t.construct),e},b.adopt=function(e){if(!e)return null;if(e.instance)return e.instance;var i;return i="svg"==e.nodeName?e.parentNode instanceof t.SVGElement?new b.Nested:new b.Doc:"linearGradient"==e.nodeName?new b.Gradient("linear"):"radialGradient"==e.nodeName?new b.Gradient("radial"):b[a(e.nodeName)]?new(b[a(e.nodeName)]):new b.Element(e),i.type=e.nodeName,i.node=e,e.instance=i,i instanceof b.Doc&&i.namespace().defs(),i.setData(JSON.parse(e.getAttribute("svgjs:data"))||{}),i},b.prepare=function(){var t=e.getElementsByTagName("body")[0],i=(t?new b.Doc(t):b.adopt(e.documentElement).nested()).size(2,0);b.parser={body:t||e.documentElement,draw:i.style("opacity:0;position:absolute;left:-100%;top:-100%;overflow:hidden").attr("focusable","false").node,poly:i.polyline().node,path:i.path().node,native:b.create("svg")}},b.parser={native:b.create("svg")},e.addEventListener("DOMContentLoaded",function(){b.parser.draw||b.prepare()},!1),b.regex={numberAndUnit:/^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i,hex:/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,rgb:/rgb\((\d+),(\d+),(\d+)\)/,reference:/#([a-z0-9\-_]+)/i,transforms:/\)\s*,?\s*/,whitespace:/\s/g,isHex:/^#[a-f0-9]{3,6}$/i,isRgb:/^rgb\(/,isCss:/[^:]+:[^;]+;?/,isBlank:/^(\s+)?$/,isNumber:/^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,isPercent:/^-?[\d\.]+%$/,isImage:/\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i,delimiter:/[\s,]+/,hyphen:/([^e])\-/gi,pathLetters:/[MLHVCSQTAZ]/gi,isPathLetter:/[MLHVCSQTAZ]/i,numbersWithDots:/((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi,dots:/\./g},b.utils={map:function(t,e){var i,n=t.length,r=[];for(i=0;i<n;i++)r.push(e(t[i]));return r},filter:function(t,e){var i,n=t.length,r=[];for(i=0;i<n;i++)e(t[i])&&r.push(t[i]);return r},radians:function(t){return t%360*Math.PI/180},degrees:function(t){return 180*t/Math.PI%360},filterSVGElements:function(e){return this.filter(e,function(e){return e instanceof t.SVGElement})}},b.defaults={attrs:{"fill-opacity":1,"stroke-opacity":1,"stroke-width":0,"stroke-linejoin":"miter","stroke-linecap":"butt",fill:"#000000",stroke:"#000000",opacity:1,x:0,y:0,cx:0,cy:0,width:0,height:0,r:0,rx:0,ry:0,offset:0,"stop-opacity":1,"stop-color":"#000000","font-size":16,"font-family":"Helvetica, Arial, sans-serif","text-anchor":"start"}},b.Color=function(t){var e;this.r=0,this.g=0,this.b=0,t&&("string"==typeof t?b.regex.isRgb.test(t)?(e=b.regex.rgb.exec(t.replace(b.regex.whitespace,"")),this.r=parseInt(e[1]),this.g=parseInt(e[2]),this.b=parseInt(e[3])):b.regex.isHex.test(t)&&(e=b.regex.hex.exec(h(t)),this.r=parseInt(e[1],16),this.g=parseInt(e[2],16),this.b=parseInt(e[3],16)):"object"==typeof t&&(this.r=t.r,this.g=t.g,this.b=t.b))},b.extend(b.Color,{toString:function(){return this.toHex()},toHex:function(){return"#"+u(this.r)+u(this.g)+u(this.b)},toRgb:function(){return"rgb("+[this.r,this.g,this.b].join()+")"},brightness:function(){return this.r/255*.3+this.g/255*.59+this.b/255*.11},morph:function(t){return this.destination=new b.Color(t),this},at:function(t){return this.destination?(t=t<0?0:t>1?1:t,new b.Color({r:~~(this.r+(this.destination.r-this.r)*t),g:~~(this.g+(this.destination.g-this.g)*t),b:~~(this.b+(this.destination.b-this.b)*t)})):this}}),b.Color.test=function(t){return t+="",b.regex.isHex.test(t)||b.regex.isRgb.test(t)},b.Color.isRgb=function(t){return t&&"number"==typeof t.r&&"number"==typeof t.g&&"number"==typeof t.b},b.Color.isColor=function(t){return b.Color.isRgb(t)||b.Color.test(t)},b.Array=function(t,e){t=(t||[]).valueOf(),0==t.length&&e&&(t=e.valueOf()),this.value=this.parse(t)},b.extend(b.Array,{morph:function(t){if(this.destination=this.parse(t),this.value.length!=this.destination.length){for(var e=this.value[this.value.length-1],i=this.destination[this.destination.length-1];this.value.length>this.destination.length;)this.destination.push(i);for(;this.value.length<this.destination.length;)this.value.push(e)}return this},settle:function(){for(var t=0,e=this.value.length,i=[];t<e;t++)-1==i.indexOf(this.value[t])&&i.push(this.value[t]);return this.value=i},at:function(t){if(!this.destination)return this;for(var e=0,i=this.value.length,n=[];e<i;e++)n.push(this.value[e]+(this.destination[e]-this.value[e])*t);return new b.Array(n)},toString:function(){return this.value.join(" ")},valueOf:function(){return this.value},parse:function(t){return t=t.valueOf(),Array.isArray(t)?t:this.split(t)},split:function(t){return t.trim().split(b.regex.delimiter).map(parseFloat)},reverse:function(){return this.value.reverse(),this},clone:function(){var t=new this.constructor;return t.value=n(this.value),t}}),b.PointArray=function(t,e){b.Array.call(this,t,e||[[0,0]])},b.PointArray.prototype=new b.Array,b.PointArray.prototype.constructor=b.PointArray,b.extend(b.PointArray,{toString:function(){for(var t=0,e=this.value.length,i=[];t<e;t++)i.push(this.value[t].join(","));return i.join(" ")},toLine:function(){return{x1:this.value[0][0],y1:this.value[0][1],x2:this.value[1][0],y2:this.value[1][1]}},at:function(t){if(!this.destination)return this;for(var e=0,i=this.value.length,n=[];e<i;e++)n.push([this.value[e][0]+(this.destination[e][0]-this.value[e][0])*t,this.value[e][1]+(this.destination[e][1]-this.value[e][1])*t]);return new b.PointArray(n)},parse:function(t){var e=[];if(t=t.valueOf(),Array.isArray(t)){if(Array.isArray(t[0]))return t.map(function(t){return t.slice()});if(null!=t[0].x)return t.map(function(t){return[t.x,t.y]})}else t=t.trim().split(b.regex.delimiter).map(parseFloat);t.length%2!=0&&t.pop();for(var i=0,n=t.length;i<n;i+=2)e.push([t[i],t[i+1]]);return e},move:function(t,e){var i=this.bbox();if(t-=i.x,e-=i.y,!isNaN(t)&&!isNaN(e))for(var n=this.value.length-1;n>=0;n--)this.value[n]=[this.value[n][0]+t,this.value[n][1]+e];return this},size:function(t,e){var i,n=this.bbox();for(i=this.value.length-1;i>=0;i--)n.width&&(this.value[i][0]=(this.value[i][0]-n.x)*t/n.width+n.x),n.height&&(this.value[i][1]=(this.value[i][1]-n.y)*e/n.height+n.y);return this},bbox:function(){return b.parser.poly.setAttribute("points",this.toString()),b.parser.poly.getBBox()}});for(var C={M:function(t,e,i){return e.x=i.x=t[0],e.y=i.y=t[1],["M",e.x,e.y]},L:function(t,e){return e.x=t[0],e.y=t[1],["L",t[0],t[1]]},H:function(t,e){return e.x=t[0],["H",t[0]]},V:function(t,e){return e.y=t[0],["V",t[0]]},C:function(t,e){return e.x=t[4],e.y=t[5],["C",t[0],t[1],t[2],t[3],t[4],t[5]]},S:function(t,e){return e.x=t[2],e.y=t[3],["S",t[0],t[1],t[2],t[3]]},Q:function(t,e){return e.x=t[2],e.y=t[3],["Q",t[0],t[1],t[2],t[3]]},T:function(t,e){return e.x=t[0],e.y=t[1],["T",t[0],t[1]]},Z:function(t,e,i){return e.x=i.x,e.y=i.y,["Z"]},A:function(t,e){return e.x=t[5],e.y=t[6],["A",t[0],t[1],t[2],t[3],t[4],t[5],t[6]]}},N="mlhvqtcsaz".split(""),A=0,P=N.length;A<P;++A)C[N[A]]=function(t){return function(e,i,n){if("H"==t)e[0]=e[0]+i.x;else if("V"==t)e[0]=e[0]+i.y;else if("A"==t)e[5]=e[5]+i.x,e[6]=e[6]+i.y;else for(var r=0,s=e.length;r<s;++r)e[r]=e[r]+(r%2?i.y:i.x);return C[t](e,i,n)}}(N[A].toUpperCase());b.PathArray=function(t,e){b.Array.call(this,t,e||[["M",0,0]])},b.PathArray.prototype=new b.Array,b.PathArray.prototype.constructor=b.PathArray,b.extend(b.PathArray,{toString:function(){return m(this.value)},move:function(t,e){var i=this.bbox();if(t-=i.x,e-=i.y,!isNaN(t)&&!isNaN(e))for(var n,r=this.value.length-1;r>=0;r--)n=this.value[r][0],"M"==n||"L"==n||"T"==n?(this.value[r][1]+=t,this.value[r][2]+=e):"H"==n?this.value[r][1]+=t:"V"==n?this.value[r][1]+=e:"C"==n||"S"==n||"Q"==n?(this.value[r][1]+=t,this.value[r][2]+=e,this.value[r][3]+=t,this.value[r][4]+=e,"C"==n&&(this.value[r][5]+=t,this.value[r][6]+=e)):"A"==n&&(this.value[r][6]+=t,this.value[r][7]+=e);return this},size:function(t,e){var i,n,r=this.bbox();for(i=this.value.length-1;i>=0;i--)n=this.value[i][0],"M"==n||"L"==n||"T"==n?(this.value[i][1]=(this.value[i][1]-r.x)*t/r.width+r.x,this.value[i][2]=(this.value[i][2]-r.y)*e/r.height+r.y):"H"==n?this.value[i][1]=(this.value[i][1]-r.x)*t/r.width+r.x:"V"==n?this.value[i][1]=(this.value[i][1]-r.y)*e/r.height+r.y:"C"==n||"S"==n||"Q"==n?(this.value[i][1]=(this.value[i][1]-r.x)*t/r.width+r.x,this.value[i][2]=(this.value[i][2]-r.y)*e/r.height+r.y,this.value[i][3]=(this.value[i][3]-r.x)*t/r.width+r.x,this.value[i][4]=(this.value[i][4]-r.y)*e/r.height+r.y,"C"==n&&(this.value[i][5]=(this.value[i][5]-r.x)*t/r.width+r.x,this.value[i][6]=(this.value[i][6]-r.y)*e/r.height+r.y)):"A"==n&&(this.value[i][1]=this.value[i][1]*t/r.width,this.value[i][2]=this.value[i][2]*e/r.height,this.value[i][6]=(this.value[i][6]-r.x)*t/r.width+r.x,this.value[i][7]=(this.value[i][7]-r.y)*e/r.height+r.y);return this},equalCommands:function(t){var e,i,n;for(t=new b.PathArray(t),n=this.value.length===t.value.length,e=0,i=this.value.length;n&&e<i;e++)n=this.value[e][0]===t.value[e][0];return n},morph:function(t){return t=new b.PathArray(t),this.equalCommands(t)?this.destination=t:this.destination=null,this},at:function(t){if(!this.destination)return this;var e,i,n,r,s=this.value,o=this.destination.value,a=[],h=new b.PathArray;for(e=0,i=s.length;e<i;e++){for(a[e]=[s[e][0]],n=1,r=s[e].length;n<r;n++)a[e][n]=s[e][n]+(o[e][n]-s[e][n])*t;"A"===a[e][0]&&(a[e][4]=+(0!=a[e][4]),a[e][5]=+(0!=a[e][5]))}return h.value=a,h},parse:function(t){if(t instanceof b.PathArray)return t.valueOf();var e,n,r={M:2,L:2,H:1,V:1,C:6,S:4,Q:4,T:2,A:7,Z:0};t="string"==typeof t?t.replace(b.regex.numbersWithDots,i).replace(b.regex.pathLetters," $& ").replace(b.regex.hyphen,"$1 -").trim().split(b.regex.delimiter):t.reduce(function(t,e){return[].concat.call(t,e)},[]);var n=[],s=new b.Point,o=new b.Point,a=0,h=t.length;do{b.regex.isPathLetter.test(t[a])?(e=t[a],++a):"M"==e?e="L":"m"==e&&(e="l"),n.push(C[e].call(null,t.slice(a,a+=r[e.toUpperCase()]).map(parseFloat),s,o))}while(h>a);return n},bbox:function(){return b.parser.path.setAttribute("d",this.toString()),b.parser.path.getBBox()}}),b.Number=b.invent({create:function(t,e){this.value=0,this.unit=e||"","number"==typeof t?this.value=isNaN(t)?0:isFinite(t)?t:t<0?-3.4e38:3.4e38:"string"==typeof t?(e=t.match(b.regex.numberAndUnit))&&(this.value=parseFloat(e[1]),"%"==e[5]?this.value/=100:"s"==e[5]&&(this.value*=1e3),this.unit=e[5]):t instanceof b.Number&&(this.value=t.valueOf(),this.unit=t.unit)},extend:{toString:function(){return("%"==this.unit?~~(1e8*this.value)/1e6:"s"==this.unit?this.value/1e3:this.value)+this.unit},toJSON:function(){return this.toString()},valueOf:function(){return this.value},plus:function(t){return t=new b.Number(t),new b.Number(this+t,this.unit||t.unit)},minus:function(t){return t=new b.Number(t),new b.Number(this-t,this.unit||t.unit)},times:function(t){return t=new b.Number(t),new b.Number(this*t,this.unit||t.unit)},divide:function(t){return t=new b.Number(t),new b.Number(this/t,this.unit||t.unit)},to:function(t){var e=new b.Number(this);return"string"==typeof t&&(e.unit=t),e},morph:function(t){return this.destination=new b.Number(t),t.relative&&(this.destination.value+=this.value),this},at:function(t){return this.destination?new b.Number(this.destination).minus(this).times(t).plus(this):this}}}),b.Element=b.invent({create:function(t){this._stroke=b.defaults.attrs.stroke,this._event=null,this._events={},this.dom={},(this.node=t)&&(this.type=t.nodeName,this.node.instance=this,this._events=t._events||{},this._stroke=t.getAttribute("stroke")||this._stroke)},extend:{x:function(t){return this.attr("x",t)},y:function(t){return this.attr("y",t)},cx:function(t){return null==t?this.x()+this.width()/2:this.x(t-this.width()/2)},cy:function(t){return null==t?this.y()+this.height()/2:this.y(t-this.height()/2)},move:function(t,e){return this.x(t).y(e)},center:function(t,e){return this.cx(t).cy(e)},width:function(t){return this.attr("width",t)},height:function(t){return this.attr("height",t)},size:function(t,e){var i=l(this,t,e);return this.width(new b.Number(i.width)).height(new b.Number(i.height))},clone:function(t){this.writeDataToDom();var e=x(this.node.cloneNode(!0));return t?t.add(e):this.after(e),e},remove:function(){return this.parent()&&this.parent().removeElement(this),this},replace:function(t){return this.after(t).remove(),t},addTo:function(t){return t.put(this)},putIn:function(t){return t.add(this)},id:function(t){return this.attr("id",t)},inside:function(t,e){var i=this.bbox();return t>i.x&&e>i.y&&t<i.x+i.width&&e<i.y+i.height},show:function(){return this.style("display","")},hide:function(){return this.style("display","none")},visible:function(){return"none"!=this.style("display")},toString:function(){return this.attr("id")},classes:function(){var t=this.attr("class");return null==t?[]:t.trim().split(b.regex.delimiter)},hasClass:function(t){return-1!=this.classes().indexOf(t)},addClass:function(t){if(!this.hasClass(t)){var e=this.classes();e.push(t),this.attr("class",e.join(" "))}return this},removeClass:function(t){return this.hasClass(t)&&this.attr("class",this.classes().filter(function(e){return e!=t}).join(" ")),this},toggleClass:function(t){return this.hasClass(t)?this.removeClass(t):this.addClass(t)},reference:function(t){return b.get(this.attr(t))},parent:function(e){var i=this;if(!i.node.parentNode)return null;if(i=b.adopt(i.node.parentNode),!e)return i;for(;i&&i.node instanceof t.SVGElement;){if("string"==typeof e?i.matches(e):i instanceof e)return i;if(!i.node.parentNode||"#document"==i.node.parentNode.nodeName||"#document-fragment"==i.node.parentNode.nodeName)return null;i=b.adopt(i.node.parentNode)}},doc:function(){return this instanceof b.Doc?this:this.parent(b.Doc)},parents:function(t){var e=[],i=this;do{if(!(i=i.parent(t))||!i.node)break;e.push(i)}while(i.parent);return e},matches:function(t){return s(this.node,t)},native:function(){return this.node},svg:function(t){var i=e.createElement("svg");if(!(t&&this instanceof b.Parent))return i.appendChild(t=e.createElement("svg")),this.writeDataToDom(),t.appendChild(this.node.cloneNode(!0)),i.innerHTML.replace(/^<svg>/,"").replace(/<\/svg>$/,"");i.innerHTML="<svg>"+t.replace(/\n/,"").replace(/<([\w:-]+)([^<]+?)\/>/g,"<$1$2></$1>")+"</svg>";for(var n=0,r=i.firstChild.childNodes.length;n<r;n++)this.node.appendChild(i.firstChild.firstChild);return this},writeDataToDom:function(){if(this.each||this.lines){(this.each?this:this.lines()).each(function(){this.writeDataToDom()})}return this.node.removeAttribute("svgjs:data"),Object.keys(this.dom).length&&this.node.setAttribute("svgjs:data",JSON.stringify(this.dom)),this},setData:function(t){return this.dom=t,this},is:function(t){return r(this,t)}}}),b.easing={"-":function(t){return t},"<>":function(t){return-Math.cos(t*Math.PI)/2+.5},">":function(t){return Math.sin(t*Math.PI/2)},"<":function(t){return 1-Math.cos(t*Math.PI/2)}},b.morph=function(t){return function(e,i){return new b.MorphObj(e,i).at(t)}},b.Situation=b.invent({create:function(t){this.init=!1,this.reversed=!1,this.reversing=!1,this.duration=new b.Number(t.duration).valueOf(),this.delay=new b.Number(t.delay).valueOf(),this.start=+new Date+this.delay,this.finish=this.start+this.duration,this.ease=t.ease,this.loop=0,this.loops=!1,this.animations={},this.attrs={},this.styles={},this.transforms=[],this.once={}}}),b.FX=b.invent({create:function(t){this._target=t,this.situations=[],this.active=!1,this.situation=null,this.paused=!1,this.lastPos=0,this.pos=0,this.absPos=0,this._speed=1},extend:{animate:function(t,e,i){"object"==typeof t&&(e=t.ease,i=t.delay,t=t.duration);var n=new b.Situation({duration:t||1e3,delay:i||0,ease:b.easing[e||"-"]||e});return this.queue(n),this},delay:function(t){var e=new b.Situation({duration:t,delay:0,ease:b.easing["-"]});return this.queue(e)},target:function(t){return t&&t instanceof b.Element?(this._target=t,this):this._target},timeToAbsPos:function(t){return(t-this.situation.start)/(this.situation.duration/this._speed)},absPosToTime:function(t){return this.situation.duration/this._speed*t+this.situation.start},startAnimFrame:function(){this.stopAnimFrame(),this.animationFrame=t.requestAnimationFrame(function(){this.step()}.bind(this))},stopAnimFrame:function(){t.cancelAnimationFrame(this.animationFrame)},start:function(){return!this.active&&this.situation&&(this.active=!0,this.startCurrent()),this},startCurrent:function(){return this.situation.start=+new Date+this.situation.delay/this._speed,this.situation.finish=this.situation.start+this.situation.duration/this._speed,this.initAnimations().step()},queue:function(t){return("function"==typeof t||t instanceof b.Situation)&&this.situations.push(t),this.situation||(this.situation=this.situations.shift()),this},dequeue:function(){return this.stop(),this.situation=this.situations.shift(),this.situation&&(this.situation instanceof b.Situation?this.start():this.situation.call(this)),this},initAnimations:function(){var t,e,i,n=this.situation;if(n.init)return this;for(t in n.animations)for(i=this.target()[t](),Array.isArray(i)||(i=[i]),Array.isArray(n.animations[t])||(n.animations[t]=[n.animations[t]]),e=i.length;e--;)n.animations[t][e]instanceof b.Number&&(i[e]=new b.Number(i[e])),n.animations[t][e]=i[e].morph(n.animations[t][e]);for(t in n.attrs)n.attrs[t]=new b.MorphObj(this.target().attr(t),n.attrs[t]);for(t in n.styles)n.styles[t]=new b.MorphObj(this.target().style(t),n.styles[t]);return n.initialTransformation=this.target().matrixify(),n.init=!0,this},clearQueue:function(){return this.situations=[],this},clearCurrent:function(){return this.situation=null,this},stop:function(t,e){var i=this.active;return this.active=!1,e&&this.clearQueue(),t&&this.situation&&(!i&&this.startCurrent(),this.atEnd()),this.stopAnimFrame(),this.clearCurrent()},reset:function(){if(this.situation){var t=this.situation;this.stop(),this.situation=t,this.atStart()}return this},finish:function(){for(this.stop(!0,!1);this.dequeue().situation&&this.stop(!0,!1););return this.clearQueue().clearCurrent(),this},atStart:function(){return this.at(0,!0)},atEnd:function(){return!0===this.situation.loops&&(this.situation.loops=this.situation.loop+1),"number"==typeof this.situation.loops?this.at(this.situation.loops,!0):this.at(1,!0)},at:function(t,e){var i=this.situation.duration/this._speed;return this.absPos=t,e||(this.situation.reversed&&(this.absPos=1-this.absPos),this.absPos+=this.situation.loop),this.situation.start=+new Date-this.absPos*i,this.situation.finish=this.situation.start+i,this.step(!0)},speed:function(t){return 0===t?this.pause():t?(this._speed=t,this.at(this.absPos,!0)):this._speed},loop:function(t,e){var i=this.last();return i.loops=null==t||t,i.loop=0,e&&(i.reversing=!0),this},pause:function(){return this.paused=!0,this.stopAnimFrame(),this},play:function(){return this.paused?(this.paused=!1,this.at(this.absPos,!0)):this},reverse:function(t){var e=this.last();return e.reversed=void 0===t?!e.reversed:t,this},progress:function(t){return t?this.situation.ease(this.pos):this.pos},after:function(t){var e=this.last(),i=function i(n){n.detail.situation==e&&(t.call(this,e),this.off("finished.fx",i))};return this.target().on("finished.fx",i),this._callStart()},during:function(t){var e=this.last(),i=function(i){i.detail.situation==e&&t.call(this,i.detail.pos,b.morph(i.detail.pos),i.detail.eased,e)};return this.target().off("during.fx",i).on("during.fx",i),this.after(function(){this.off("during.fx",i)}),this._callStart()},afterAll:function(t){var e=function e(i){t.call(this),this.off("allfinished.fx",e)};return this.target().off("allfinished.fx",e).on("allfinished.fx",e),this._callStart()},duringAll:function(t){var e=function(e){t.call(this,e.detail.pos,b.morph(e.detail.pos),e.detail.eased,e.detail.situation)};return this.target().off("during.fx",e).on("during.fx",e),this.afterAll(function(){this.off("during.fx",e)}),this._callStart()},last:function(){return this.situations.length?this.situations[this.situations.length-1]:this.situation},add:function(t,e,i){return this.last()[i||"animations"][t]=e,this._callStart()},step:function(t){if(t||(this.absPos=this.timeToAbsPos(+new Date)),!1!==this.situation.loops){var e,i,n;e=Math.max(this.absPos,0),i=Math.floor(e),!0===this.situation.loops||i<this.situation.loops?(this.pos=e-i,n=this.situation.loop,this.situation.loop=i):(this.absPos=this.situation.loops,this.pos=1,n=this.situation.loop-1,this.situation.loop=this.situation.loops),this.situation.reversing&&(this.situation.reversed=this.situation.reversed!=Boolean((this.situation.loop-n)%2))}else this.absPos=Math.min(this.absPos,1),this.pos=this.absPos;this.pos<0&&(this.pos=0),this.situation.reversed&&(this.pos=1-this.pos);var r=this.situation.ease(this.pos);for(var s in this.situation.once)s>this.lastPos&&s<=r&&(this.situation.once[s].call(this.target(),this.pos,r),delete this.situation.once[s]);return this.active&&this.target().fire("during",{pos:this.pos,eased:r,fx:this,situation:this.situation}),this.situation?(this.eachAt(),1==this.pos&&!this.situation.reversed||this.situation.reversed&&0==this.pos?(this.stopAnimFrame(),this.target().fire("finished",{fx:this,situation:this.situation}),this.situations.length||(this.target().fire("allfinished"),this.situations.length||(this.target().off(".fx"),this.active=!1)),this.active?this.dequeue():this.clearCurrent()):!this.paused&&this.active&&this.startAnimFrame(),this.lastPos=r,this):this},eachAt:function(){var t,e,i,n=this,r=this.target(),s=this.situation;for(t in s.animations)i=[].concat(s.animations[t]).map(function(t){return"string"!=typeof t&&t.at?t.at(s.ease(n.pos),n.pos):t}),r[t].apply(r,i);for(t in s.attrs)i=[t].concat(s.attrs[t]).map(function(t){return"string"!=typeof t&&t.at?t.at(s.ease(n.pos),n.pos):t}),r.attr.apply(r,i);for(t in s.styles)i=[t].concat(s.styles[t]).map(function(t){return"string"!=typeof t&&t.at?t.at(s.ease(n.pos),n.pos):t}),r.style.apply(r,i);if(s.transforms.length){for(i=s.initialTransformation,t=0,e=s.transforms.length;t<e;t++){var o=s.transforms[t];o instanceof b.Matrix?i=o.relative?i.multiply((new b.Matrix).morph(o).at(s.ease(this.pos))):i.morph(o).at(s.ease(this.pos)):(o.relative||o.undo(i.extract()),i=i.multiply(o.at(s.ease(this.pos))))}r.matrix(i)}return this},once:function(t,e,i){var n=this.last();return i||(t=n.ease(t)),n.once[t]=e,this},_callStart:function(){return setTimeout(function(){this.start()}.bind(this),0),this}},parent:b.Element,construct:{animate:function(t,e,i){return(this.fx||(this.fx=new b.FX(this))).animate(t,e,i)},delay:function(t){return(this.fx||(this.fx=new b.FX(this))).delay(t)},stop:function(t,e){return this.fx&&this.fx.stop(t,e),this},finish:function(){return this.fx&&this.fx.finish(),this},pause:function(){return this.fx&&this.fx.pause(),this},play:function(){return this.fx&&this.fx.play(),this},speed:function(t){if(this.fx){if(null==t)return this.fx.speed();this.fx.speed(t)}return this}}}),b.MorphObj=b.invent({create:function(t,e){return b.Color.isColor(e)?new b.Color(t).morph(e):b.regex.delimiter.test(t)?b.regex.pathLetters.test(t)?new b.PathArray(t).morph(e):new b.Array(t).morph(e):b.regex.numberAndUnit.test(e)?new b.Number(t).morph(e):(this.value=t,void(this.destination=e))},extend:{at:function(t,e){return e<1?this.value:this.destination},valueOf:function(){return this.value}}}),b.extend(b.FX,{attr:function(t,e,i){if("object"==typeof t)for(var n in t)this.attr(n,t[n]);else this.add(t,e,"attrs");return this},style:function(t,e){if("object"==typeof t)for(var i in t)this.style(i,t[i]);else this.add(t,e,"styles");return this},x:function(t,e){if(this.target()instanceof b.G)return this.transform({x:t},e),this;var i=new b.Number(t);return i.relative=e,this.add("x",i)},y:function(t,e){if(this.target()instanceof b.G)return this.transform({y:t},e),this;var i=new b.Number(t);return i.relative=e,this.add("y",i)},cx:function(t){return this.add("cx",new b.Number(t))},cy:function(t){return this.add("cy",new b.Number(t))},move:function(t,e){return this.x(t).y(e)},center:function(t,e){return this.cx(t).cy(e)},size:function(t,e){if(this.target()instanceof b.Text)this.attr("font-size",t);else{var i;t&&e||(i=this.target().bbox()),t||(t=i.width/i.height*e),e||(e=i.height/i.width*t),this.add("width",new b.Number(t)).add("height",new b.Number(e))}return this},width:function(t){return this.add("width",new b.Number(t))},height:function(t){return this.add("height",new b.Number(t))},plot:function(t,e,i,n){return 4==arguments.length?this.plot([t,e,i,n]):this.add("plot",new(this.target().morphArray)(t))},leading:function(t){return this.target().leading?this.add("leading",new b.Number(t)):this},viewbox:function(t,e,i,n){return this.target()instanceof b.Container&&this.add("viewbox",new b.ViewBox(t,e,i,n)),this},update:function(t){if(this.target()instanceof b.Stop){if("number"==typeof t||t instanceof b.Number)return this.update({offset:arguments[0],color:arguments[1],opacity:arguments[2]});null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",t.offset)}return this}}),b.Box=b.invent({create:function(t,e,i,n){if(!("object"!=typeof t||t instanceof b.Element))return b.Box.call(this,null!=t.left?t.left:t.x,null!=t.top?t.top:t.y,t.width,t.height);4==arguments.length&&(this.x=t,this.y=e,this.width=i,this.height=n),y(this)},extend:{merge:function(t){var e=new this.constructor;return e.x=Math.min(this.x,t.x),e.y=Math.min(this.y,t.y),e.width=Math.max(this.x+this.width,t.x+t.width)-e.x,e.height=Math.max(this.y+this.height,t.y+t.height)-e.y,y(e)},transform:function(t){var e,i=1/0,n=-1/0,r=1/0,s=-1/0;return[new b.Point(this.x,this.y),new b.Point(this.x2,this.y),new b.Point(this.x,this.y2),new b.Point(this.x2,this.y2)].forEach(function(e){e=e.transform(t),i=Math.min(i,e.x),n=Math.max(n,e.x),r=Math.min(r,e.y),s=Math.max(s,e.y)}),e=new this.constructor,e.x=i,e.width=n-i,e.y=r,e.height=s-r,y(e),e}}}),b.BBox=b.invent({create:function(t){if(b.Box.apply(this,[].slice.call(arguments)),t instanceof b.Element){var i;try{if(e.documentElement.contains){if(!e.documentElement.contains(t.node))throw new Exception("Element not in the dom")}else{for(var n=t.node;n.parentNode;)n=n.parentNode;if(n!=e)throw new Exception("Element not in the dom")}i=t.node.getBBox()}catch(e){if(t instanceof b.Shape){var r=t.clone(b.parser.draw.instance).show();i=r.node.getBBox(),r.remove()}else i={x:t.node.clientLeft,y:t.node.clientTop,width:t.node.clientWidth,height:t.node.clientHeight}}b.Box.call(this,i)}},inherit:b.Box,parent:b.Element,construct:{bbox:function(){return new b.BBox(this)}}}),b.BBox.prototype.constructor=b.BBox,b.extend(b.Element,{tbox:function(){return console.warn("Use of TBox is deprecated and mapped to RBox. Use .rbox() instead."),this.rbox(this.doc())}}),b.RBox=b.invent({create:function(t){b.Box.apply(this,[].slice.call(arguments)),t instanceof b.Element&&b.Box.call(this,t.node.getBoundingClientRect())},inherit:b.Box,parent:b.Element,extend:{addOffset:function(){return this.x+=t.pageXOffset,this.y+=t.pageYOffset,this}},construct:{rbox:function(t){return t?new b.RBox(this).transform(t.screenCTM().inverse()):new b.RBox(this).addOffset()}}}),b.RBox.prototype.constructor=b.RBox,b.Matrix=b.invent({create:function(t){var e,i=f([1,0,0,1,0,0]);for(t=t instanceof b.Element?t.matrixify():"string"==typeof t?f(t.split(b.regex.delimiter).map(parseFloat)):6==arguments.length?f([].slice.call(arguments)):Array.isArray(t)?f(t):"object"==typeof t?t:i,e=k.length-1;e>=0;--e)this[k[e]]=null!=t[k[e]]?t[k[e]]:i[k[e]]},extend:{extract:function(){var t=c(this,0,1),e=c(this,1,0),i=180/Math.PI*Math.atan2(t.y,t.x)-90;return{x:this.e,y:this.f,transformedX:(this.e*Math.cos(i*Math.PI/180)+this.f*Math.sin(i*Math.PI/180))/Math.sqrt(this.a*this.a+this.b*this.b),transformedY:(this.f*Math.cos(i*Math.PI/180)+this.e*Math.sin(-i*Math.PI/180))/Math.sqrt(this.c*this.c+this.d*this.d),skewX:-i,skewY:180/Math.PI*Math.atan2(e.y,e.x),scaleX:Math.sqrt(this.a*this.a+this.b*this.b),scaleY:Math.sqrt(this.c*this.c+this.d*this.d),rotation:i,a:this.a,b:this.b,c:this.c,d:this.d,e:this.e,f:this.f,matrix:new b.Matrix(this)}},clone:function(){return new b.Matrix(this)},morph:function(t){return this.destination=new b.Matrix(t),this},at:function(t){return this.destination?new b.Matrix({a:this.a+(this.destination.a-this.a)*t,b:this.b+(this.destination.b-this.b)*t,c:this.c+(this.destination.c-this.c)*t,d:this.d+(this.destination.d-this.d)*t,e:this.e+(this.destination.e-this.e)*t,f:this.f+(this.destination.f-this.f)*t}):this},multiply:function(t){return new b.Matrix(this.native().multiply(d(t).native()))},inverse:function(){return new b.Matrix(this.native().inverse())},translate:function(t,e){return new b.Matrix(this.native().translate(t||0,e||0))},scale:function(t,e,i,n){return 1==arguments.length?e=t:3==arguments.length&&(n=i,i=e,e=t),this.around(i,n,new b.Matrix(t,0,0,e,0,0))},rotate:function(t,e,i){return t=b.utils.radians(t),this.around(e,i,new b.Matrix(Math.cos(t),Math.sin(t),-Math.sin(t),Math.cos(t),0,0))},flip:function(t,e){return"x"==t?this.scale(-1,1,e,0):"y"==t?this.scale(1,-1,0,e):this.scale(-1,-1,t,null!=e?e:t)},skew:function(t,e,i,n){
return 1==arguments.length?e=t:3==arguments.length&&(n=i,i=e,e=t),t=b.utils.radians(t),e=b.utils.radians(e),this.around(i,n,new b.Matrix(1,Math.tan(e),Math.tan(t),1,0,0))},skewX:function(t,e,i){return this.skew(t,0,e,i)},skewY:function(t,e,i){return this.skew(0,t,e,i)},around:function(t,e,i){return this.multiply(new b.Matrix(1,0,0,1,t||0,e||0)).multiply(i).multiply(new b.Matrix(1,0,0,1,-t||0,-e||0))},native:function(){for(var t=b.parser.native.createSVGMatrix(),e=k.length-1;e>=0;e--)t[k[e]]=this[k[e]];return t},toString:function(){return"matrix("+g(this.a)+","+g(this.b)+","+g(this.c)+","+g(this.d)+","+g(this.e)+","+g(this.f)+")"}},parent:b.Element,construct:{ctm:function(){return new b.Matrix(this.node.getCTM())},screenCTM:function(){if(this instanceof b.Nested){var t=this.rect(1,1),e=t.node.getScreenCTM();return t.remove(),new b.Matrix(e)}return new b.Matrix(this.node.getScreenCTM())}}}),b.Point=b.invent({create:function(t,e){var i,n={x:0,y:0};i=Array.isArray(t)?{x:t[0],y:t[1]}:"object"==typeof t?{x:t.x,y:t.y}:null!=t?{x:t,y:null!=e?e:t}:n,this.x=i.x,this.y=i.y},extend:{clone:function(){return new b.Point(this)},morph:function(t,e){return this.destination=new b.Point(t,e),this},at:function(t){return this.destination?new b.Point({x:this.x+(this.destination.x-this.x)*t,y:this.y+(this.destination.y-this.y)*t}):this},native:function(){var t=b.parser.native.createSVGPoint();return t.x=this.x,t.y=this.y,t},transform:function(t){return new b.Point(this.native().matrixTransform(t.native()))}}}),b.extend(b.Element,{point:function(t,e){return new b.Point(t,e).transform(this.screenCTM().inverse())}}),b.extend(b.Element,{attr:function(t,e,i){if(null==t){for(t={},e=this.node.attributes,i=e.length-1;i>=0;i--)t[e[i].nodeName]=b.regex.isNumber.test(e[i].nodeValue)?parseFloat(e[i].nodeValue):e[i].nodeValue;return t}if("object"==typeof t)for(e in t)this.attr(e,t[e]);else if(null===e)this.node.removeAttribute(t);else{if(null==e)return e=this.node.getAttribute(t),null==e?b.defaults.attrs[t]:b.regex.isNumber.test(e)?parseFloat(e):e;"stroke-width"==t?this.attr("stroke",parseFloat(e)>0?this._stroke:null):"stroke"==t&&(this._stroke=e),"fill"!=t&&"stroke"!=t||(b.regex.isImage.test(e)&&(e=this.doc().defs().image(e,0,0)),e instanceof b.Image&&(e=this.doc().defs().pattern(0,0,function(){this.add(e)}))),"number"==typeof e?e=new b.Number(e):b.Color.isColor(e)?e=new b.Color(e):Array.isArray(e)&&(e=new b.Array(e)),"leading"==t?this.leading&&this.leading(e):"string"==typeof i?this.node.setAttributeNS(i,t,e.toString()):this.node.setAttribute(t,e.toString()),!this.rebuild||"font-size"!=t&&"x"!=t||this.rebuild(t,e)}return this}}),b.extend(b.Element,{transform:function(t,e){var i,n,r=this;if("object"!=typeof t)return i=new b.Matrix(r).extract(),"string"==typeof t?i[t]:i;if(i=new b.Matrix(r),e=!!e||!!t.relative,null!=t.a)i=e?i.multiply(new b.Matrix(t)):new b.Matrix(t);else if(null!=t.rotation)p(t,r),i=e?i.rotate(t.rotation,t.cx,t.cy):i.rotate(t.rotation-i.extract().rotation,t.cx,t.cy);else if(null!=t.scale||null!=t.scaleX||null!=t.scaleY){if(p(t,r),t.scaleX=null!=t.scale?t.scale:null!=t.scaleX?t.scaleX:1,t.scaleY=null!=t.scale?t.scale:null!=t.scaleY?t.scaleY:1,!e){var s=i.extract();t.scaleX=1*t.scaleX/s.scaleX,t.scaleY=1*t.scaleY/s.scaleY}i=i.scale(t.scaleX,t.scaleY,t.cx,t.cy)}else if(null!=t.skew||null!=t.skewX||null!=t.skewY){if(p(t,r),t.skewX=null!=t.skew?t.skew:null!=t.skewX?t.skewX:0,t.skewY=null!=t.skew?t.skew:null!=t.skewY?t.skewY:0,!e){var s=i.extract();i=i.multiply((new b.Matrix).skew(s.skewX,s.skewY,t.cx,t.cy).inverse())}i=i.skew(t.skewX,t.skewY,t.cx,t.cy)}else t.flip?("x"==t.flip||"y"==t.flip?t.offset=null==t.offset?r.bbox()["c"+t.flip]:t.offset:null==t.offset?(n=r.bbox(),t.flip=n.cx,t.offset=n.cy):t.flip=t.offset,i=(new b.Matrix).flip(t.flip,t.offset)):null==t.x&&null==t.y||(e?i=i.translate(t.x,t.y):(null!=t.x&&(i.e=t.x),null!=t.y&&(i.f=t.y)));return this.attr("transform",i)}}),b.extend(b.FX,{transform:function(t,e){var i,n,r=this.target();return"object"!=typeof t?(i=new b.Matrix(r).extract(),"string"==typeof t?i[t]:i):(e=!!e||!!t.relative,null!=t.a?i=new b.Matrix(t):null!=t.rotation?(p(t,r),i=new b.Rotate(t.rotation,t.cx,t.cy)):null!=t.scale||null!=t.scaleX||null!=t.scaleY?(p(t,r),t.scaleX=null!=t.scale?t.scale:null!=t.scaleX?t.scaleX:1,t.scaleY=null!=t.scale?t.scale:null!=t.scaleY?t.scaleY:1,i=new b.Scale(t.scaleX,t.scaleY,t.cx,t.cy)):null!=t.skewX||null!=t.skewY?(p(t,r),t.skewX=null!=t.skewX?t.skewX:0,t.skewY=null!=t.skewY?t.skewY:0,i=new b.Skew(t.skewX,t.skewY,t.cx,t.cy)):t.flip?("x"==t.flip||"y"==t.flip?t.offset=null==t.offset?r.bbox()["c"+t.flip]:t.offset:null==t.offset?(n=r.bbox(),t.flip=n.cx,t.offset=n.cy):t.flip=t.offset,i=(new b.Matrix).flip(t.flip,t.offset)):null==t.x&&null==t.y||(i=new b.Translate(t.x,t.y)),i?(i.relative=e,this.last().transforms.push(i),this._callStart()):this)}}),b.extend(b.Element,{untransform:function(){return this.attr("transform",null)},matrixify:function(){return(this.attr("transform")||"").split(b.regex.transforms).slice(0,-1).map(function(t){var e=t.trim().split("(");return[e[0],e[1].split(b.regex.delimiter).map(function(t){return parseFloat(t)})]}).reduce(function(t,e){return"matrix"==e[0]?t.multiply(f(e[1])):t[e[0]].apply(t,e[1])},new b.Matrix)},toParent:function(t){if(this==t)return this;var e=this.screenCTM(),i=t.screenCTM().inverse();return this.addTo(t).untransform().transform(i.multiply(e)),this},toDoc:function(){return this.toParent(this.doc())}}),b.Transformation=b.invent({create:function(t,e){if(arguments.length>1&&"boolean"!=typeof e)return this.constructor.call(this,[].slice.call(arguments));if(Array.isArray(t))for(var i=0,n=this.arguments.length;i<n;++i)this[this.arguments[i]]=t[i];else if("object"==typeof t)for(var i=0,n=this.arguments.length;i<n;++i)this[this.arguments[i]]=t[this.arguments[i]];this.inversed=!1,!0===e&&(this.inversed=!0)},extend:{arguments:[],method:"",at:function(t){for(var e=[],i=0,n=this.arguments.length;i<n;++i)e.push(this[this.arguments[i]]);var r=this._undo||new b.Matrix;return r=(new b.Matrix).morph(b.Matrix.prototype[this.method].apply(r,e)).at(t),this.inversed?r.inverse():r},undo:function(t){for(var e=0,i=this.arguments.length;e<i;++e)t[this.arguments[e]]=void 0===this[this.arguments[e]]?0:t[this.arguments[e]];return t.cx=this.cx,t.cy=this.cy,this._undo=new(b[a(this.method)])(t,!0).at(1),this}}}),b.Translate=b.invent({parent:b.Matrix,inherit:b.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["transformedX","transformedY"],method:"translate"}}),b.Rotate=b.invent({parent:b.Matrix,inherit:b.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["rotation","cx","cy"],method:"rotate",at:function(t){var e=(new b.Matrix).rotate((new b.Number).morph(this.rotation-(this._undo?this._undo.rotation:0)).at(t),this.cx,this.cy);return this.inversed?e.inverse():e},undo:function(t){return this._undo=t,this}}}),b.Scale=b.invent({parent:b.Matrix,inherit:b.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["scaleX","scaleY","cx","cy"],method:"scale"}}),b.Skew=b.invent({parent:b.Matrix,inherit:b.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["skewX","skewY","cx","cy"],method:"skew"}}),b.extend(b.Element,{style:function(t,e){if(0==arguments.length)return this.node.style.cssText||"";if(arguments.length<2)if("object"==typeof t)for(e in t)this.style(e,t[e]);else{if(!b.regex.isCss.test(t))return this.node.style[o(t)];for(t=t.split(/\s*;\s*/).filter(function(t){return!!t}).map(function(t){return t.split(/\s*:\s*/)});e=t.pop();)this.style(e[0],e[1])}else this.node.style[o(t)]=null===e||b.regex.isBlank.test(e)?"":e;return this}}),b.Parent=b.invent({create:function(t){this.constructor.call(this,t)},inherit:b.Element,extend:{children:function(){return b.utils.map(b.utils.filterSVGElements(this.node.childNodes),function(t){return b.adopt(t)})},add:function(t,e){return null==e?this.node.appendChild(t.node):t.node!=this.node.childNodes[e]&&this.node.insertBefore(t.node,this.node.childNodes[e]),this},put:function(t,e){return this.add(t,e),t},has:function(t){return this.index(t)>=0},index:function(t){return[].slice.call(this.node.childNodes).indexOf(t.node)},get:function(t){return b.adopt(this.node.childNodes[t])},first:function(){return this.get(0)},last:function(){return this.get(this.node.childNodes.length-1)},each:function(t,e){var i,n,r=this.children();for(i=0,n=r.length;i<n;i++)r[i]instanceof b.Element&&t.apply(r[i],[i,r]),e&&r[i]instanceof b.Container&&r[i].each(t,e);return this},removeElement:function(t){return this.node.removeChild(t.node),this},clear:function(){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return delete this._defs,this},defs:function(){return this.doc().defs()}}}),b.extend(b.Parent,{ungroup:function(t,e){return 0===e||this instanceof b.Defs||this.node==b.parser.draw?this:(t=t||(this instanceof b.Doc?this:this.parent(b.Parent)),e=e||1/0,this.each(function(){return this instanceof b.Defs?this:this instanceof b.Parent?this.ungroup(t,e-1):this.toParent(t)}),this.node.firstChild||this.remove(),this)},flatten:function(t,e){return this.ungroup(t,e)}}),b.Container=b.invent({create:function(t){this.constructor.call(this,t)},inherit:b.Parent}),b.ViewBox=b.invent({create:function(t){var e,i,n,r,s,o,a,h=[0,0,0,0],u=1,l=1,c=/[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/gi;if(t instanceof b.Element){for(o=t,a=t,s=(t.attr("viewBox")||"").match(c),t.bbox,n=new b.Number(t.width()),r=new b.Number(t.height());"%"==n.unit;)u*=n.value,n=new b.Number(o instanceof b.Doc?o.parent().offsetWidth:o.parent().width()),o=o.parent();for(;"%"==r.unit;)l*=r.value,r=new b.Number(a instanceof b.Doc?a.parent().offsetHeight:a.parent().height()),a=a.parent();this.x=0,this.y=0,this.width=n*u,this.height=r*l,this.zoom=1,s&&(e=parseFloat(s[0]),i=parseFloat(s[1]),n=parseFloat(s[2]),r=parseFloat(s[3]),this.zoom=this.width/this.height>n/r?this.height/r:this.width/n,this.x=e,this.y=i,this.width=n,this.height=r)}else t="string"==typeof t?t.match(c).map(function(t){return parseFloat(t)}):Array.isArray(t)?t:"object"==typeof t?[t.x,t.y,t.width,t.height]:4==arguments.length?[].slice.call(arguments):h,this.x=t[0],this.y=t[1],this.width=t[2],this.height=t[3]},extend:{toString:function(){return this.x+" "+this.y+" "+this.width+" "+this.height},morph:function(t,e,i,n){return this.destination=new b.ViewBox(t,e,i,n),this},at:function(t){return this.destination?new b.ViewBox([this.x+(this.destination.x-this.x)*t,this.y+(this.destination.y-this.y)*t,this.width+(this.destination.width-this.width)*t,this.height+(this.destination.height-this.height)*t]):this}},parent:b.Container,construct:{viewbox:function(t,e,i,n){return 0==arguments.length?new b.ViewBox(this):this.attr("viewBox",new b.ViewBox(t,e,i,n))}}}),["click","dblclick","mousedown","mouseup","mouseover","mouseout","mousemove","mouseenter","mouseleave","touchstart","touchmove","touchleave","touchend","touchcancel"].forEach(function(t){b.Element.prototype[t]=function(e){return null==e?b.off(this,t):b.on(this,t,e),this}}),b.listenerId=0,b.on=function(t,e,i,n,r){var s=i.bind(n||t),o=t instanceof b.Element?t.node:t;o.instance=o.instance||{_events:{}};var a=o.instance._events;i._svgjsListenerId||(i._svgjsListenerId=++b.listenerId),e.split(b.regex.delimiter).forEach(function(t){var e=t.split(".")[0],n=t.split(".")[1]||"*";a[e]=a[e]||{},a[e][n]=a[e][n]||{},a[e][n][i._svgjsListenerId]=s,o.addEventListener(e,s,r||!1)})},b.off=function(t,e,i,n){var r=t instanceof b.Element?t.node:t;if(r.instance&&("function"!=typeof i||(i=i._svgjsListenerId))){var s=r.instance._events;(e||"").split(b.regex.delimiter).forEach(function(t){var e,o,a=t&&t.split(".")[0],h=t&&t.split(".")[1];if(i)s[a]&&s[a][h||"*"]&&(r.removeEventListener(a,s[a][h||"*"][i],n||!1),delete s[a][h||"*"][i]);else if(a&&h){if(s[a]&&s[a][h]){for(o in s[a][h])b.off(r,[a,h].join("."),o);delete s[a][h]}}else if(h)for(t in s)for(e in s[t])h===e&&b.off(r,[t,h].join("."));else if(a){if(s[a]){for(e in s[a])b.off(r,[a,e].join("."));delete s[a]}}else{for(t in s)b.off(r,t);r.instance._events={}}})}},b.extend(b.Element,{on:function(t,e,i,n){return b.on(this,t,e,i,n),this},off:function(t,e){return b.off(this.node,t,e),this},fire:function(e,i){return e instanceof t.Event?this.node.dispatchEvent(e):this.node.dispatchEvent(e=new b.CustomEvent(e,{detail:i,cancelable:!0})),this._event=e,this},event:function(){return this._event}}),b.Defs=b.invent({create:"defs",inherit:b.Container}),b.G=b.invent({create:"g",inherit:b.Container,extend:{x:function(t){return null==t?this.transform("x"):this.transform({x:t-this.x()},!0)},y:function(t){return null==t?this.transform("y"):this.transform({y:t-this.y()},!0)},cx:function(t){return null==t?this.gbox().cx:this.x(t-this.gbox().width/2)},cy:function(t){return null==t?this.gbox().cy:this.y(t-this.gbox().height/2)},gbox:function(){var t=this.bbox(),e=this.transform();return t.x+=e.x,t.x2+=e.x,t.cx+=e.x,t.y+=e.y,t.y2+=e.y,t.cy+=e.y,t}},construct:{group:function(){return this.put(new b.G)}}}),b.Doc=b.invent({create:function(t){t&&(t="string"==typeof t?e.getElementById(t):t,"svg"==t.nodeName?this.constructor.call(this,t):(this.constructor.call(this,b.create("svg")),t.appendChild(this.node),this.size("100%","100%")),this.namespace().defs())},inherit:b.Container,extend:{namespace:function(){return this.attr({xmlns:b.ns,version:"1.1"}).attr("xmlns:xlink",b.xlink,b.xmlns).attr("xmlns:svgjs",b.svgjs,b.xmlns)},defs:function(){if(!this._defs){var t;(t=this.node.getElementsByTagName("defs")[0])?this._defs=b.adopt(t):this._defs=new b.Defs,this.node.appendChild(this._defs.node)}return this._defs},parent:function(){return this.node.parentNode&&"#document"!=this.node.parentNode.nodeName&&"#document-fragment"!=this.node.parentNode.nodeName?this.node.parentNode:null},spof:function(){var t=this.node.getScreenCTM();return t&&this.style("left",-t.e%1+"px").style("top",-t.f%1+"px"),this},remove:function(){return this.parent()&&this.parent().removeChild(this.node),this},clear:function(){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return delete this._defs,b.parser.draw.parentNode||this.node.appendChild(b.parser.draw),this},clone:function(t){this.writeDataToDom();var e=this.node,i=x(e.cloneNode(!0));return t?(t.node||t).appendChild(i.node):e.parentNode.insertBefore(i.node,e.nextSibling),i}}}),b.extend(b.Element,{siblings:function(){return this.parent().children()},position:function(){return this.parent().index(this)},next:function(){return this.siblings()[this.position()+1]},previous:function(){return this.siblings()[this.position()-1]},forward:function(){var t=this.position()+1,e=this.parent();return e.removeElement(this).add(this,t),e instanceof b.Doc&&e.node.appendChild(e.defs().node),this},backward:function(){var t=this.position();return t>0&&this.parent().removeElement(this).add(this,t-1),this},front:function(){var t=this.parent();return t.node.appendChild(this.node),t instanceof b.Doc&&t.node.appendChild(t.defs().node),this},back:function(){return this.position()>0&&this.parent().removeElement(this).add(this,0),this},before:function(t){t.remove();var e=this.position();return this.parent().add(t,e),this},after:function(t){t.remove();var e=this.position();return this.parent().add(t,e+1),this}}),b.Mask=b.invent({create:function(){this.constructor.call(this,b.create("mask")),this.targets=[]},inherit:b.Container,extend:{remove:function(){for(var t=this.targets.length-1;t>=0;t--)this.targets[t]&&this.targets[t].unmask();return this.targets=[],b.Element.prototype.remove.call(this),this}},construct:{mask:function(){return this.defs().put(new b.Mask)}}}),b.extend(b.Element,{maskWith:function(t){return this.masker=t instanceof b.Mask?t:this.parent().mask().add(t),this.masker.targets.push(this),this.attr("mask",'url("#'+this.masker.attr("id")+'")')},unmask:function(){return delete this.masker,this.attr("mask",null)}}),b.ClipPath=b.invent({create:function(){this.constructor.call(this,b.create("clipPath")),this.targets=[]},inherit:b.Container,extend:{remove:function(){for(var t=this.targets.length-1;t>=0;t--)this.targets[t]&&this.targets[t].unclip();return this.targets=[],this.parent().removeElement(this),this}},construct:{clip:function(){return this.defs().put(new b.ClipPath)}}}),b.extend(b.Element,{clipWith:function(t){return this.clipper=t instanceof b.ClipPath?t:this.parent().clip().add(t),this.clipper.targets.push(this),this.attr("clip-path",'url("#'+this.clipper.attr("id")+'")')},unclip:function(){return delete this.clipper,this.attr("clip-path",null)}}),b.Gradient=b.invent({create:function(t){this.constructor.call(this,b.create(t+"Gradient")),this.type=t},inherit:b.Container,extend:{at:function(t,e,i){return this.put(new b.Stop).update(t,e,i)},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},fill:function(){return"url(#"+this.id()+")"},toString:function(){return this.fill()},attr:function(t,e,i){return"transform"==t&&(t="gradientTransform"),b.Container.prototype.attr.call(this,t,e,i)}},construct:{gradient:function(t,e){return this.defs().gradient(t,e)}}}),b.extend(b.Gradient,b.FX,{from:function(t,e){return"radial"==(this._target||this).type?this.attr({fx:new b.Number(t),fy:new b.Number(e)}):this.attr({x1:new b.Number(t),y1:new b.Number(e)})},to:function(t,e){return"radial"==(this._target||this).type?this.attr({cx:new b.Number(t),cy:new b.Number(e)}):this.attr({x2:new b.Number(t),y2:new b.Number(e)})}}),b.extend(b.Defs,{gradient:function(t,e){return this.put(new b.Gradient(t)).update(e)}}),b.Stop=b.invent({create:"stop",inherit:b.Element,extend:{update:function(t){return("number"==typeof t||t instanceof b.Number)&&(t={offset:arguments[0],color:arguments[1],opacity:arguments[2]}),null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",new b.Number(t.offset)),this}}}),b.Pattern=b.invent({create:"pattern",inherit:b.Container,extend:{fill:function(){return"url(#"+this.id()+")"},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},toString:function(){return this.fill()},attr:function(t,e,i){return"transform"==t&&(t="patternTransform"),b.Container.prototype.attr.call(this,t,e,i)}},construct:{pattern:function(t,e,i){return this.defs().pattern(t,e,i)}}}),b.extend(b.Defs,{pattern:function(t,e,i){return this.put(new b.Pattern).update(i).attr({x:0,y:0,width:t,height:e,patternUnits:"userSpaceOnUse"})}}),b.Shape=b.invent({create:function(t){this.constructor.call(this,t)},inherit:b.Element}),b.Bare=b.invent({create:function(t,e){if(this.constructor.call(this,b.create(t)),e)for(var i in e.prototype)"function"==typeof e.prototype[i]&&(this[i]=e.prototype[i])},inherit:b.Element,extend:{words:function(t){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return this.node.appendChild(e.createTextNode(t)),this}}}),b.extend(b.Parent,{element:function(t,e){return this.put(new b.Bare(t,e))}}),b.Symbol=b.invent({create:"symbol",inherit:b.Container,construct:{symbol:function(){return this.put(new b.Symbol)}}}),b.Use=b.invent({create:"use",inherit:b.Shape,extend:{element:function(t,e){return this.attr("href",(e||"")+"#"+t,b.xlink)}},construct:{use:function(t,e){return this.put(new b.Use).element(t,e)}}}),b.Rect=b.invent({create:"rect",inherit:b.Shape,construct:{rect:function(t,e){return this.put(new b.Rect).size(t,e)}}}),b.Circle=b.invent({create:"circle",inherit:b.Shape,construct:{circle:function(t){return this.put(new b.Circle).rx(new b.Number(t).divide(2)).move(0,0)}}}),b.extend(b.Circle,b.FX,{rx:function(t){return this.attr("r",t)},ry:function(t){return this.rx(t)}}),b.Ellipse=b.invent({create:"ellipse",inherit:b.Shape,construct:{ellipse:function(t,e){return this.put(new b.Ellipse).size(t,e).move(0,0)}}}),b.extend(b.Ellipse,b.Rect,b.FX,{rx:function(t){return this.attr("rx",t)},ry:function(t){return this.attr("ry",t)}}),b.extend(b.Circle,b.Ellipse,{x:function(t){return null==t?this.cx()-this.rx():this.cx(t+this.rx())},y:function(t){return null==t?this.cy()-this.ry():this.cy(t+this.ry())},cx:function(t){return null==t?this.attr("cx"):this.attr("cx",t)},cy:function(t){return null==t?this.attr("cy"):this.attr("cy",t)},width:function(t){return null==t?2*this.rx():this.rx(new b.Number(t).divide(2))},height:function(t){return null==t?2*this.ry():this.ry(new b.Number(t).divide(2))},size:function(t,e){var i=l(this,t,e);return this.rx(new b.Number(i.width).divide(2)).ry(new b.Number(i.height).divide(2))}}),b.Line=b.invent({create:"line",inherit:b.Shape,extend:{array:function(){return new b.PointArray([[this.attr("x1"),this.attr("y1")],[this.attr("x2"),this.attr("y2")]])},plot:function(t,e,i,n){return null==t?this.array():(t=void 0!==e?{x1:t,y1:e,x2:i,y2:n}:new b.PointArray(t).toLine(),this.attr(t))},move:function(t,e){return this.attr(this.array().move(t,e).toLine())},size:function(t,e){var i=l(this,t,e);return this.attr(this.array().size(i.width,i.height).toLine())}},construct:{line:function(t,e,i,n){return b.Line.prototype.plot.apply(this.put(new b.Line),null!=t?[t,e,i,n]:[0,0,0,0])}}}),b.Polyline=b.invent({create:"polyline",inherit:b.Shape,construct:{polyline:function(t){return this.put(new b.Polyline).plot(t||new b.PointArray)}}}),b.Polygon=b.invent({create:"polygon",inherit:b.Shape,construct:{polygon:function(t){return this.put(new b.Polygon).plot(t||new b.PointArray)}}}),b.extend(b.Polyline,b.Polygon,{array:function(){return this._array||(this._array=new b.PointArray(this.attr("points")))},plot:function(t){return null==t?this.array():this.clear().attr("points","string"==typeof t?t:this._array=new b.PointArray(t))},clear:function(){return delete this._array,this},move:function(t,e){return this.attr("points",this.array().move(t,e))},size:function(t,e){var i=l(this,t,e);return this.attr("points",this.array().size(i.width,i.height))}}),b.extend(b.Line,b.Polyline,b.Polygon,{morphArray:b.PointArray,x:function(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)},y:function(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)},width:function(t){var e=this.bbox();return null==t?e.width:this.size(t,e.height)},height:function(t){var e=this.bbox();return null==t?e.height:this.size(e.width,t)}}),b.Path=b.invent({create:"path",inherit:b.Shape,extend:{morphArray:b.PathArray,array:function(){return this._array||(this._array=new b.PathArray(this.attr("d")))},plot:function(t){return null==t?this.array():this.clear().attr("d","string"==typeof t?t:this._array=new b.PathArray(t))},clear:function(){return delete this._array,this},move:function(t,e){return this.attr("d",this.array().move(t,e))},x:function(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)},y:function(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)},size:function(t,e){var i=l(this,t,e);return this.attr("d",this.array().size(i.width,i.height))},width:function(t){return null==t?this.bbox().width:this.size(t,this.bbox().height)},height:function(t){return null==t?this.bbox().height:this.size(this.bbox().width,t)}},construct:{path:function(t){return this.put(new b.Path).plot(t||new b.PathArray)}}}),b.Image=b.invent({create:"image",inherit:b.Shape,extend:{load:function(e){if(!e)return this;var i=this,n=new t.Image;return b.on(n,"load",function(){b.off(n);var t=i.parent(b.Pattern);null!==t&&(0==i.width()&&0==i.height()&&i.size(n.width,n.height),t&&0==t.width()&&0==t.height()&&t.size(i.width(),i.height()),"function"==typeof i._loaded&&i._loaded.call(i,{width:n.width,height:n.height,ratio:n.width/n.height,url:e}))}),b.on(n,"error",function(t){b.off(n),"function"==typeof i._error&&i._error.call(i,t)}),this.attr("href",n.src=this.src=e,b.xlink)},loaded:function(t){return this._loaded=t,this},error:function(t){return this._error=t,this}},construct:{image:function(t,e,i){return this.put(new b.Image).load(t).size(e||0,i||e||0)}}}),b.Text=b.invent({create:function(){this.constructor.call(this,b.create("text")),this.dom.leading=new b.Number(1.3),this._rebuild=!0,this._build=!1,this.attr("font-family",b.defaults.attrs["font-family"])},inherit:b.Shape,extend:{x:function(t){return null==t?this.attr("x"):this.attr("x",t)},y:function(t){var e=this.attr("y"),i="number"==typeof e?e-this.bbox().y:0;return null==t?"number"==typeof e?e-i:e:this.attr("y","number"==typeof t.valueOf()?t+i:t)},cx:function(t){return null==t?this.bbox().cx:this.x(t-this.bbox().width/2)},cy:function(t){return null==t?this.bbox().cy:this.y(t-this.bbox().height/2)},text:function(t){if(void 0===t){for(var t="",e=this.node.childNodes,i=0,n=e.length;i<n;++i)0!=i&&3!=e[i].nodeType&&1==b.adopt(e[i]).dom.newLined&&(t+="\n"),t+=e[i].textContent;return t}if(this.clear().build(!0),"function"==typeof t)t.call(this,this);else{t=t.split("\n");for(var i=0,r=t.length;i<r;i++)this.tspan(t[i]).newLine()}return this.build(!1).rebuild()},size:function(t){return this.attr("font-size",t).rebuild()},leading:function(t){return null==t?this.dom.leading:(this.dom.leading=new b.Number(t),this.rebuild())},lines:function(){var t=(this.textPath&&this.textPath()||this).node,e=b.utils.map(b.utils.filterSVGElements(t.childNodes),function(t){return b.adopt(t)});return new b.Set(e)},rebuild:function(t){if("boolean"==typeof t&&(this._rebuild=t),this._rebuild){var e=this,i=0,n=this.dom.leading*new b.Number(this.attr("font-size"));this.lines().each(function(){this.dom.newLined&&(e.textPath()||this.attr("x",e.attr("x")),"\n"==this.text()?i+=n:(this.attr("dy",n+i),i=0))}),this.fire("rebuild")}return this},build:function(t){return this._build=!!t,this},setData:function(t){return this.dom=t,this.dom.leading=new b.Number(t.leading||1.3),this}},construct:{text:function(t){return this.put(new b.Text).text(t)},plain:function(t){return this.put(new b.Text).plain(t)}}}),b.Tspan=b.invent({create:"tspan",inherit:b.Shape,extend:{text:function(t){return null==t?this.node.textContent+(this.dom.newLined?"\n":""):("function"==typeof t?t.call(this,this):this.plain(t),this)},dx:function(t){return this.attr("dx",t)},dy:function(t){return this.attr("dy",t)},newLine:function(){var t=this.parent(b.Text);return this.dom.newLined=!0,this.dy(t.dom.leading*t.attr("font-size")).attr("x",t.x())}}}),b.extend(b.Text,b.Tspan,{plain:function(t){return!1===this._build&&this.clear(),this.node.appendChild(e.createTextNode(t)),this},tspan:function(t){var e=(this.textPath&&this.textPath()||this).node,i=new b.Tspan;return!1===this._build&&this.clear(),e.appendChild(i.node),i.text(t)},clear:function(){for(var t=(this.textPath&&this.textPath()||this).node;t.hasChildNodes();)t.removeChild(t.lastChild);return this},length:function(){return this.node.getComputedTextLength()}}),b.TextPath=b.invent({create:"textPath",inherit:b.Parent,parent:b.Text,construct:{morphArray:b.PathArray,path:function(t){for(var e=new b.TextPath,i=this.doc().defs().path(t);this.node.hasChildNodes();)e.node.appendChild(this.node.firstChild);return this.node.appendChild(e.node),e.attr("href","#"+i,b.xlink),this},array:function(){var t=this.track();return t?t.array():null},plot:function(t){var e=this.track(),i=null;return e&&(i=e.plot(t)),null==t?i:this},track:function(){var t=this.textPath();if(t)return t.reference("href")},textPath:function(){if(this.node.firstChild&&"textPath"==this.node.firstChild.nodeName)return b.adopt(this.node.firstChild)}}}),b.Nested=b.invent({create:function(){this.constructor.call(this,b.create("svg")),this.style("overflow","visible")},inherit:b.Container,construct:{nested:function(){return this.put(new b.Nested)}}}),b.A=b.invent({create:"a",inherit:b.Container,extend:{to:function(t){return this.attr("href",t,b.xlink)},show:function(t){return this.attr("show",t,b.xlink)},target:function(t){return this.attr("target",t)}},construct:{link:function(t){return this.put(new b.A).to(t)}}}),b.extend(b.Element,{linkTo:function(t){var e=new b.A;return"function"==typeof t?t.call(e,e):e.to(t),this.parent().put(e).put(this)}}),b.Marker=b.invent({create:"marker",inherit:b.Container,extend:{width:function(t){return this.attr("markerWidth",t)},height:function(t){return this.attr("markerHeight",t)},ref:function(t,e){return this.attr("refX",t).attr("refY",e)},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},toString:function(){return"url(#"+this.id()+")"}},construct:{marker:function(t,e,i){return this.defs().marker(t,e,i)}}}),b.extend(b.Defs,{marker:function(t,e,i){return this.put(new b.Marker).size(t,e).ref(t/2,e/2).viewbox(0,0,t,e).attr("orient","auto").update(i)}}),b.extend(b.Line,b.Polyline,b.Polygon,b.Path,{marker:function(t,e,i,n){var r=["marker"];return"all"!=t&&r.push(t),r=r.join("-"),t=arguments[1]instanceof b.Marker?arguments[1]:this.doc().marker(e,i,n),this.attr(r,t)}});var M={stroke:["color","width","opacity","linecap","linejoin","miterlimit","dasharray","dashoffset"],fill:["color","opacity","rule"],prefix:function(t,e){return"color"==e?t:t+"-"+e}};["fill","stroke"].forEach(function(t){var e,i={};i[t]=function(i){if(void 0===i)return this;if("string"==typeof i||b.Color.isRgb(i)||i&&"function"==typeof i.fill)this.attr(t,i);else for(e=M[t].length-1;e>=0;e--)null!=i[M[t][e]]&&this.attr(M.prefix(t,M[t][e]),i[M[t][e]]);return this},b.extend(b.Element,b.FX,i)}),b.extend(b.Element,b.FX,{rotate:function(t,e,i){return this.transform({rotation:t,cx:e,cy:i})},skew:function(t,e,i,n){return 1==arguments.length||3==arguments.length?this.transform({skew:t,cx:e,cy:i}):this.transform({skewX:t,skewY:e,cx:i,cy:n})},scale:function(t,e,i,n){return 1==arguments.length||3==arguments.length?this.transform({scale:t,cx:e,cy:i}):this.transform({scaleX:t,scaleY:e,cx:i,cy:n})},translate:function(t,e){return this.transform({x:t,y:e})},flip:function(t,e){return e="number"==typeof t?t:e,this.transform({flip:t||"both",offset:e})},matrix:function(t){return this.attr("transform",new b.Matrix(6==arguments.length?[].slice.call(arguments):t))},opacity:function(t){return this.attr("opacity",t)},dx:function(t){return this.x(new b.Number(t).plus(this instanceof b.FX?0:this.x()),!0)},dy:function(t){return this.y(new b.Number(t).plus(this instanceof b.FX?0:this.y()),!0)},dmove:function(t,e){return this.dx(t).dy(e)}}),b.extend(b.Rect,b.Ellipse,b.Circle,b.Gradient,b.FX,{radius:function(t,e){var i=(this._target||this).type;return"radial"==i||"circle"==i?this.attr("r",new b.Number(t)):this.rx(t).ry(null==e?t:e)}}),b.extend(b.Path,{length:function(){return this.node.getTotalLength()},pointAt:function(t){return this.node.getPointAtLength(t)}}),b.extend(b.Parent,b.Text,b.Tspan,b.FX,{font:function(t,e){if("object"==typeof t)for(e in t)this.font(e,t[e]);return"leading"==t?this.leading(e):"anchor"==t?this.attr("text-anchor",e):"size"==t||"family"==t||"weight"==t||"stretch"==t||"variant"==t||"style"==t?this.attr("font-"+t,e):this.attr(t,e)}}),b.Set=b.invent({create:function(t){t instanceof b.Set?this.members=t.members.slice():Array.isArray(t)?this.members=t:this.clear()},extend:{add:function(){var t,e,i=[].slice.call(arguments);for(t=0,e=i.length;t<e;t++)this.members.push(i[t]);return this},remove:function(t){var e=this.index(t);return e>-1&&this.members.splice(e,1),this},each:function(t){for(var e=0,i=this.members.length;e<i;e++)t.apply(this.members[e],[e,this.members]);return this},clear:function(){return this.members=[],this},length:function(){return this.members.length},has:function(t){return this.index(t)>=0},index:function(t){return this.members.indexOf(t)},get:function(t){return this.members[t]},first:function(){return this.get(0)},last:function(){return this.get(this.members.length-1)},valueOf:function(){return this.members},bbox:function(){if(0==this.members.length)return new b.RBox;var t=this.members[0].rbox(this.members[0].doc());return this.each(function(){t=t.merge(this.rbox(this.doc()))}),t}},construct:{set:function(t){
return new b.Set(t)}}}),b.FX.Set=b.invent({create:function(t){this.set=t}}),b.Set.inherit=function(){var t,e=[];for(var t in b.Shape.prototype)"function"==typeof b.Shape.prototype[t]&&"function"!=typeof b.Set.prototype[t]&&e.push(t);e.forEach(function(t){b.Set.prototype[t]=function(){for(var e=0,i=this.members.length;e<i;e++)this.members[e]&&"function"==typeof this.members[e][t]&&this.members[e][t].apply(this.members[e],arguments);return"animate"==t?this.fx||(this.fx=new b.FX.Set(this)):this}}),e=[];for(var t in b.FX.prototype)"function"==typeof b.FX.prototype[t]&&"function"!=typeof b.FX.Set.prototype[t]&&e.push(t);e.forEach(function(t){b.FX.Set.prototype[t]=function(){for(var e=0,i=this.set.members.length;e<i;e++)this.set.members[e].fx[t].apply(this.set.members[e].fx,arguments);return this}})},b.extend(b.Element,{data:function(t,e,i){if("object"==typeof t)for(e in t)this.data(e,t[e]);else if(arguments.length<2)try{return JSON.parse(this.attr("data-"+t))}catch(e){return this.attr("data-"+t)}else this.attr("data-"+t,null===e?null:!0===i||"string"==typeof e||"number"==typeof e?e:JSON.stringify(e));return this}}),b.extend(b.Element,{remember:function(t,e){if("object"==typeof arguments[0])for(var e in t)this.remember(e,t[e]);else{if(1==arguments.length)return this.memory()[t];this.memory()[t]=e}return this},forget:function(){if(0==arguments.length)this._memory={};else for(var t=arguments.length-1;t>=0;t--)delete this.memory()[arguments[t]];return this},memory:function(){return this._memory||(this._memory={})}}),b.get=function(t){var i=e.getElementById(v(t)||t);return b.adopt(i)},b.select=function(t,i){return new b.Set(b.utils.map((i||e).querySelectorAll(t),function(t){return b.adopt(t)}))},b.extend(b.Parent,{select:function(t){return b.select(t,this.node)}});var k="abcdef".split("");if("function"!=typeof t.CustomEvent){var S=function(t,i){i=i||{bubbles:!1,cancelable:!1,detail:void 0};var n=e.createEvent("CustomEvent");return n.initCustomEvent(t,i.bubbles,i.cancelable,i.detail),n};S.prototype=t.Event.prototype,b.CustomEvent=S}else b.CustomEvent=t.CustomEvent;return function(e){for(var i=0,n=["moz","webkit"],r=0;r<n.length&&!t.requestAnimationFrame;++r)e.requestAnimationFrame=e[n[r]+"RequestAnimationFrame"],e.cancelAnimationFrame=e[n[r]+"CancelAnimationFrame"]||e[n[r]+"CancelRequestAnimationFrame"];e.requestAnimationFrame=e.requestAnimationFrame||function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-i)),s=e.setTimeout(function(){t(n+r)},r);return i=n+r,s},e.cancelAnimationFrame=e.cancelAnimationFrame||e.clearTimeout}(t),b});
;/*!
* svg.select.js - An extension of svg.js which allows to select elements with mouse
* @version 2.1.2
* https://github.com/svgdotjs/svg.select.js
*
* @copyright Ulrich-Matthias Schäfer
* @license MIT
*/;
;(function() {
"use strict";

function SelectHandler(el) {

    this.el = el;
    el.remember('_selectHandler', this);
    this.pointSelection = {isSelected: false};
    this.rectSelection = {isSelected: false};

}

SelectHandler.prototype.init = function (value, options) {

    var bbox = this.el.bbox();
    this.options = {};

    // Merging the defaults and the options-object together
    for (var i in this.el.selectize.defaults) {
        this.options[i] = this.el.selectize.defaults[i];
        if (options[i] !== undefined) {
            this.options[i] = options[i];
        }
    }

    this.parent = this.el.parent();
    this.nested = (this.nested || this.parent.group());
    this.nested.matrix(new SVG.Matrix(this.el).translate(bbox.x, bbox.y));

    // When deepSelect is enabled and the element is a line/polyline/polygon, draw only points for moving
    if (this.options.deepSelect && ['line', 'polyline', 'polygon'].indexOf(this.el.type) !== -1) {
        this.selectPoints(value);
    } else {
        this.selectRect(value);
    }

    this.observe();
    this.cleanup();

};

SelectHandler.prototype.selectPoints = function (value) {

    this.pointSelection.isSelected = value;

    // When set is already there we dont have to create one
    if (this.pointSelection.set) {
        return this;
    }

    // Create our set of elements
    this.pointSelection.set = this.parent.set();
    // draw the circles and mark the element as selected
    this.drawCircles();

    return this;

};

// create the point-array which contains the 2 points of a line or simply the points-array of polyline/polygon
SelectHandler.prototype.getPointArray = function () {
    var bbox = this.el.bbox();

    return this.el.array().valueOf().map(function (el) {
        return [el[0] - bbox.x, el[1] - bbox.y];
    });
};

// The function to draw the circles
SelectHandler.prototype.drawCircles = function () {

    var _this = this, array = this.getPointArray();

    // go through the array of points
    for (var i = 0, len = array.length; i < len; ++i) {

        var curriedEvent = (function (k) {
            return function (ev) {
                ev = ev || window.event;
                ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                ev.stopPropagation();

                var x = ev.pageX || ev.touches[0].pageX;
                var y = ev.pageY || ev.touches[0].pageY;
                _this.el.fire('point', {x: x, y: y, i: k, event: ev});
            };
        })(i);

        // add every point to the set
        this.pointSelection.set.add(
            // a circle with our css-classes and a touchstart-event which fires our event for moving points
            this.nested.circle(this.options.radius)
                .center(array[i][0], array[i][1])
                .addClass(this.options.classPoints)
                .addClass(this.options.classPoints + '_point')
                .on('touchstart', curriedEvent)
                .on('mousedown', curriedEvent)
        );
    }

};

// every time a circle is moved, we have to update the positions of our circle
SelectHandler.prototype.updatePointSelection = function () {
    var array = this.getPointArray();

    this.pointSelection.set.each(function (i) {
        if (this.cx() === array[i][0] && this.cy() === array[i][1]) {
            return;
        }
        this.center(array[i][0], array[i][1]);
    });
};

SelectHandler.prototype.updateRectSelection = function () {
    var bbox = this.el.bbox();

    this.rectSelection.set.get(0).attr({
        width: bbox.width,
        height: bbox.height
    });

    // set.get(1) is always in the upper left corner. no need to move it
    if (this.options.points) {
        this.rectSelection.set.get(2).center(bbox.width, 0);
        this.rectSelection.set.get(3).center(bbox.width, bbox.height);
        this.rectSelection.set.get(4).center(0, bbox.height);

        this.rectSelection.set.get(5).center(bbox.width / 2, 0);
        this.rectSelection.set.get(6).center(bbox.width, bbox.height / 2);
        this.rectSelection.set.get(7).center(bbox.width / 2, bbox.height);
        this.rectSelection.set.get(8).center(0, bbox.height / 2);
    }

    if (this.options.rotationPoint) {
        if (this.options.points) {
            this.rectSelection.set.get(9).center(bbox.width / 2, 20);
        } else {
            this.rectSelection.set.get(1).center(bbox.width / 2, 20);
        }
    }
};

SelectHandler.prototype.selectRect = function (value) {

    var _this = this, bbox = this.el.bbox();

    this.rectSelection.isSelected = value;

    // when set is already p
    this.rectSelection.set = this.rectSelection.set || this.parent.set();

    // helperFunction to create a mouse-down function which triggers the event specified in `eventName`
    function getMoseDownFunc(eventName) {
        return function (ev) {
            ev = ev || window.event;
            ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
            ev.stopPropagation();

            var x = ev.pageX || ev.touches[0].pageX;
            var y = ev.pageY || ev.touches[0].pageY;
            _this.el.fire(eventName, {x: x, y: y, event: ev});
        };
    }

    // create the selection-rectangle and add the css-class
    if (!this.rectSelection.set.get(0)) {
        this.rectSelection.set.add(this.nested.rect(bbox.width, bbox.height).addClass(this.options.classRect));
    }

    // Draw Points at the edges, if enabled
    if (this.options.points && !this.rectSelection.set.get(1)) {
        var ename ="touchstart", mname = "mousedown";
        this.rectSelection.set.add(this.nested.circle(this.options.radius).center(0, 0).attr('class', this.options.classPoints + '_lt').on(mname, getMoseDownFunc('lt')).on(ename, getMoseDownFunc('lt')));
        this.rectSelection.set.add(this.nested.circle(this.options.radius).center(bbox.width, 0).attr('class', this.options.classPoints + '_rt').on(mname, getMoseDownFunc('rt')).on(ename, getMoseDownFunc('rt')));
        this.rectSelection.set.add(this.nested.circle(this.options.radius).center(bbox.width, bbox.height).attr('class', this.options.classPoints + '_rb').on(mname, getMoseDownFunc('rb')).on(ename, getMoseDownFunc('rb')));
        this.rectSelection.set.add(this.nested.circle(this.options.radius).center(0, bbox.height).attr('class', this.options.classPoints + '_lb').on(mname, getMoseDownFunc('lb')).on(ename, getMoseDownFunc('lb')));

        this.rectSelection.set.add(this.nested.circle(this.options.radius).center(bbox.width / 2, 0).attr('class', this.options.classPoints + '_t').on(mname, getMoseDownFunc('t')).on(ename, getMoseDownFunc('t')));
        this.rectSelection.set.add(this.nested.circle(this.options.radius).center(bbox.width, bbox.height / 2).attr('class', this.options.classPoints + '_r').on(mname, getMoseDownFunc('r')).on(ename, getMoseDownFunc('r')));
        this.rectSelection.set.add(this.nested.circle(this.options.radius).center(bbox.width / 2, bbox.height).attr('class', this.options.classPoints + '_b').on(mname, getMoseDownFunc('b')).on(ename, getMoseDownFunc('b')));
        this.rectSelection.set.add(this.nested.circle(this.options.radius).center(0, bbox.height / 2).attr('class', this.options.classPoints + '_l').on(mname, getMoseDownFunc('l')).on(ename, getMoseDownFunc('l')));

        this.rectSelection.set.each(function () {
            this.addClass(_this.options.classPoints);
        });
    }

    // draw rotationPint, if enabled
    if (this.options.rotationPoint && ((this.options.points && !this.rectSelection.set.get(9)) || (!this.options.points && !this.rectSelection.set.get(1)))) {

        var curriedEvent = function (ev) {
            ev = ev || window.event;
            ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
            ev.stopPropagation();

            var x = ev.pageX || ev.touches[0].pageX;
            var y = ev.pageY || ev.touches[0].pageY;
            _this.el.fire('rot', {x: x, y: y, event: ev});
        };
        this.rectSelection.set.add(this.nested.circle(this.options.radius).center(bbox.width / 2, 20).attr('class', this.options.classPoints + '_rot')
            .on("touchstart", curriedEvent).on("mousedown", curriedEvent));

    }

};

SelectHandler.prototype.handler = function () {

    var bbox = this.el.bbox();
    this.nested.matrix(new SVG.Matrix(this.el).translate(bbox.x, bbox.y));

    if (this.rectSelection.isSelected) {
        this.updateRectSelection();
    }

    if (this.pointSelection.isSelected) {
        this.updatePointSelection();
    }

};

SelectHandler.prototype.observe = function () {
    var _this = this;

    if (MutationObserver) {
        if (this.rectSelection.isSelected || this.pointSelection.isSelected) {
            this.observerInst = this.observerInst || new MutationObserver(function () {
                _this.handler();
            });
            this.observerInst.observe(this.el.node, {attributes: true});
        } else {
            try {
                this.observerInst.disconnect();
                delete this.observerInst;
            } catch (e) {
            }
        }
    } else {
        this.el.off('DOMAttrModified.select');

        if (this.rectSelection.isSelected || this.pointSelection.isSelected) {
            this.el.on('DOMAttrModified.select', function () {
                _this.handler();
            });
        }
    }
};

SelectHandler.prototype.cleanup = function () {

    //var _this = this;

    if (!this.rectSelection.isSelected && this.rectSelection.set) {
        // stop watching the element, remove the selection
        this.rectSelection.set.each(function () {
            this.remove();
        });

        this.rectSelection.set.clear();
        delete this.rectSelection.set;
    }

    if (!this.pointSelection.isSelected && this.pointSelection.set) {
        // Remove all points, clear the set, stop watching the element
        this.pointSelection.set.each(function () {
            this.remove();
        });

        this.pointSelection.set.clear();
        delete this.pointSelection.set;
    }

    if (!this.pointSelection.isSelected && !this.rectSelection.isSelected) {
        this.nested.remove();
        delete this.nested;

    }
};


SVG.extend(SVG.Element, {
    // Select element with mouse
    selectize: function (value, options) {

        // Check the parameters and reassign if needed
        if (typeof value === 'object') {
            options = value;
            value = true;
        }

        var selectHandler = this.remember('_selectHandler') || new SelectHandler(this);

        selectHandler.init(value === undefined ? true : value, options || {});

        return this;

    }
});

SVG.Element.prototype.selectize.defaults = {
    points: true,                            // If true, points at the edges are drawn. Needed for resize!
    classRect: 'svg_select_boundingRect',    // Css-class added to the rect
    classPoints: 'svg_select_points',        // Css-class added to the points
    radius: 7,                               // radius of the points
    rotationPoint: true,                     // If true, rotation point is drawn. Needed for rotation!
    deepSelect: false                        // If true, moving of single points is possible (only line, polyline, polyon)
};
}());

;/*!
* svg.resize.js - An extension for svg.js which allows to resize elements which are selected
* @version 1.4.3
* https://github.com/svgdotjs/svg.resize.js
*
* @copyright [object Object]
* @license MIT
*/;
;(function() {
"use strict";

;(function () {

    function ResizeHandler(el) {

        el.remember('_resizeHandler', this);

        this.el = el;
        this.parameters = {};
        this.lastUpdateCall = null;
        this.p = el.doc().node.createSVGPoint();
    }

    ResizeHandler.prototype.transformPoint = function(x, y, m){

        this.p.x = x - (this.offset.x - window.pageXOffset);
        this.p.y = y - (this.offset.y - window.pageYOffset);

        return this.p.matrixTransform(m || this.m);

    };

    ResizeHandler.prototype._extractPosition = function(event) {
        // Extract a position from a mouse/touch event.
        // Returns { x: .., y: .. }
        return {
            x: event.clientX != null ? event.clientX : event.touches[0].clientX,
            y: event.clientY != null ? event.clientY : event.touches[0].clientY
        }
    };

    ResizeHandler.prototype.init = function (options) {

        var _this = this;

        this.stop();

        if (options === 'stop') {
            return;
        }

        this.options = {};

        // Merge options and defaults
        for (var i in this.el.resize.defaults) {
            this.options[i] = this.el.resize.defaults[i];
            if (typeof options[i] !== 'undefined') {
                this.options[i] = options[i];
            }
        }

        // We listen to all these events which are specifying different edges
        this.el.on('lt.resize', function(e){ _this.resize(e || window.event); });  // Left-Top
        this.el.on('rt.resize', function(e){ _this.resize(e || window.event); });  // Right-Top
        this.el.on('rb.resize', function(e){ _this.resize(e || window.event); });  // Right-Bottom
        this.el.on('lb.resize', function(e){ _this.resize(e || window.event); });  // Left-Bottom

        this.el.on('t.resize', function(e){ _this.resize(e || window.event); });   // Top
        this.el.on('r.resize', function(e){ _this.resize(e || window.event); });   // Right
        this.el.on('b.resize', function(e){ _this.resize(e || window.event); });   // Bottom
        this.el.on('l.resize', function(e){ _this.resize(e || window.event); });   // Left

        this.el.on('rot.resize', function(e){ _this.resize(e || window.event); }); // Rotation

        this.el.on('point.resize', function(e){ _this.resize(e || window.event); }); // Point-Moving

        // This call ensures, that the plugin reacts to a change of snapToGrid immediately
        this.update();

    };

    ResizeHandler.prototype.stop = function(){
        this.el.off('lt.resize');
        this.el.off('rt.resize');
        this.el.off('rb.resize');
        this.el.off('lb.resize');

        this.el.off('t.resize');
        this.el.off('r.resize');
        this.el.off('b.resize');
        this.el.off('l.resize');

        this.el.off('rot.resize');

        this.el.off('point.resize');

        return this;
    };

    ResizeHandler.prototype.resize = function (event) {

        var _this = this;

        this.m = this.el.node.getScreenCTM().inverse();
        this.offset = { x: window.pageXOffset, y: window.pageYOffset };

        var txPt = this._extractPosition(event.detail.event);
        this.parameters = {
            type: this.el.type, // the type of element
            p: this.transformPoint(txPt.x, txPt.y),
            x: event.detail.x,      // x-position of the mouse when resizing started
            y: event.detail.y,      // y-position of the mouse when resizing started
            box: this.el.bbox(),    // The bounding-box of the element
            rotation: this.el.transform().rotation  // The current rotation of the element
        };

        // Add font-size parameter if the element type is text
        if (this.el.type === "text") {
            this.parameters.fontSize = this.el.attr()["font-size"];
        }

        // the i-param in the event holds the index of the point which is moved, when using `deepSelect`
        if (event.detail.i !== undefined) {

            // get the point array
            var array = this.el.array().valueOf();

            // Save the index and the point which is moved
            this.parameters.i = event.detail.i;
            this.parameters.pointCoords = [array[event.detail.i][0], array[event.detail.i][1]];
        }

        // Lets check which edge of the bounding-box was clicked and resize the this.el according to this
        switch (event.type) {

            // Left-Top-Edge
            case 'lt':
                // We build a calculating function for every case which gives us the new position of the this.el
                this.calc = function (diffX, diffY) {
                    // The procedure is always the same
                    // First we snap the edge to the given grid (snapping to 1px grid is normal resizing)
                    var snap = this.snapToGrid(diffX, diffY);

                    // Now we check if the new height and width still valid (> 0)
                    if (this.parameters.box.width - snap[0] > 0 && this.parameters.box.height - snap[1] > 0) {
                        // ...if valid, we resize the this.el (which can include moving because the coord-system starts at the left-top and this edge is moving sometimes when resized)

                        /*
                         * but first check if the element is text box, so we can change the font size instead of
                         * the width and height
                         */

                        if (this.parameters.type === "text") {
                            this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y);
                            this.el.attr("font-size", this.parameters.fontSize - snap[0]);
                            return;
                        }

                        snap = this.checkAspectRatio(snap);

                        this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y + snap[1]).size(this.parameters.box.width - snap[0], this.parameters.box.height - snap[1]);
                    }
                };
                break;

            // Right-Top
            case 'rt':
                // s.a.
                this.calc = function (diffX, diffY) {
                    var snap = this.snapToGrid(diffX, diffY, 1 << 1);
                    if (this.parameters.box.width + snap[0] > 0 && this.parameters.box.height - snap[1] > 0) {
                        if (this.parameters.type === "text") {
                            this.el.move(this.parameters.box.x - snap[0], this.parameters.box.y);
                            this.el.attr("font-size", this.parameters.fontSize + snap[0]);
                            return;
                        }

                        snap = this.checkAspectRatio(snap, true);

                        this.el.move(this.parameters.box.x, this.parameters.box.y + snap[1]).size(this.parameters.box.width + snap[0], this.parameters.box.height - snap[1]);
                    }
                };
                break;

            // Right-Bottom
            case 'rb':
                // s.a.
                this.calc = function (diffX, diffY) {
                    var snap = this.snapToGrid(diffX, diffY, 0);
                    if (this.parameters.box.width + snap[0] > 0 && this.parameters.box.height + snap[1] > 0) {
                        if (this.parameters.type === "text") {
                            this.el.move(this.parameters.box.x - snap[0], this.parameters.box.y);
                            this.el.attr("font-size", this.parameters.fontSize + snap[0]);
                            return;
                        }

                        snap = this.checkAspectRatio(snap);

                        this.el.move(this.parameters.box.x, this.parameters.box.y).size(this.parameters.box.width + snap[0], this.parameters.box.height + snap[1]);
                    }
                };
                break;

            // Left-Bottom
            case 'lb':
                // s.a.
                this.calc = function (diffX, diffY) {
                    var snap = this.snapToGrid(diffX, diffY, 1);
                    if (this.parameters.box.width - snap[0] > 0 && this.parameters.box.height + snap[1] > 0) {
                        if (this.parameters.type === "text") {
                            this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y);
                            this.el.attr("font-size", this.parameters.fontSize - snap[0]);
                            return;
                        }

                        snap = this.checkAspectRatio(snap, true);

                        this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y).size(this.parameters.box.width - snap[0], this.parameters.box.height + snap[1]);
                    }
                };
                break;

            // Top
            case 't':
                // s.a.
                this.calc = function (diffX, diffY) {
                    var snap = this.snapToGrid(diffX, diffY, 1 << 1);
                    if (this.parameters.box.height - snap[1] > 0) {
                        // Disable the font-resizing if it is not from the corner of bounding-box
                        if (this.parameters.type === "text") {
                            return;
                        }

                        this.el.move(this.parameters.box.x, this.parameters.box.y + snap[1]).height(this.parameters.box.height - snap[1]);
                    }
                };
                break;

            // Right
            case 'r':
                // s.a.
                this.calc = function (diffX, diffY) {
                    var snap = this.snapToGrid(diffX, diffY, 0);
                    if (this.parameters.box.width + snap[0] > 0) {
                        if (this.parameters.type === "text") {
                            return;
                        }

                        this.el.move(this.parameters.box.x, this.parameters.box.y).width(this.parameters.box.width + snap[0]);
                    }
                };
                break;

            // Bottom
            case 'b':
                // s.a.
                this.calc = function (diffX, diffY) {
                    var snap = this.snapToGrid(diffX, diffY, 0);
                    if (this.parameters.box.height + snap[1] > 0) {
                        if (this.parameters.type === "text") {
                            return;
                        }

                        this.el.move(this.parameters.box.x, this.parameters.box.y).height(this.parameters.box.height + snap[1]);
                    }
                };
                break;

            // Left
            case 'l':
                // s.a.
                this.calc = function (diffX, diffY) {
                    var snap = this.snapToGrid(diffX, diffY, 1);
                    if (this.parameters.box.width - snap[0] > 0) {
                        if (this.parameters.type === "text") {
                            return;
                        }

                        this.el.move(this.parameters.box.x + snap[0], this.parameters.box.y).width(this.parameters.box.width - snap[0]);
                    }
                };
                break;

            // Rotation
            case 'rot':
                // s.a.
                this.calc = function (diffX, diffY) {

                    // yes this is kinda stupid but we need the mouse coords back...
                    var current = {x: diffX + this.parameters.p.x, y: diffY + this.parameters.p.y};

                    // start minus middle
                    var sAngle = Math.atan2((this.parameters.p.y - this.parameters.box.y - this.parameters.box.height / 2), (this.parameters.p.x - this.parameters.box.x - this.parameters.box.width / 2));

                    // end minus middle
                    var pAngle = Math.atan2((current.y - this.parameters.box.y - this.parameters.box.height / 2), (current.x - this.parameters.box.x - this.parameters.box.width / 2));

                    var angle = this.parameters.rotation + (pAngle - sAngle) * 180 / Math.PI + this.options.snapToAngle / 2;

                    // We have to move the element to the center of the box first and change the rotation afterwards
                    // because rotation always works around a rotation-center, which is changed when moving the element
                    // We also set the new rotation center to the center of the box.
                    this.el.center(this.parameters.box.cx, this.parameters.box.cy).rotate(angle - (angle % this.options.snapToAngle), this.parameters.box.cx, this.parameters.box.cy);
                };
                break;

            // Moving one single Point (needed when an element is deepSelected which means you can move every single point of the object)
            case 'point':
                this.calc = function (diffX, diffY) {

                    // Snapping the point to the grid
                    var snap = this.snapToGrid(diffX, diffY, this.parameters.pointCoords[0], this.parameters.pointCoords[1]);

                    // Get the point array
                    var array = this.el.array().valueOf();

                    // Changing the moved point in the array
                    array[this.parameters.i][0] = this.parameters.pointCoords[0] + snap[0];
                    array[this.parameters.i][1] = this.parameters.pointCoords[1] + snap[1];

                    // And plot the new this.el
                    this.el.plot(array);
                };
        }

        this.el.fire('resizestart', {dx: this.parameters.x, dy: this.parameters.y, event: event});
        // When resizing started, we have to register events for...
        // Touches.
        SVG.on(window, 'touchmove.resize', function(e) {
            _this.update(e || window.event);
        });
        SVG.on(window, 'touchend.resize', function() {
            _this.done();
        });
        // Mouse.
        SVG.on(window, 'mousemove.resize', function (e) {
            _this.update(e || window.event);
        });
        SVG.on(window, 'mouseup.resize', function () {
            _this.done();
        });

    };

    // The update-function redraws the element every time the mouse is moving
    ResizeHandler.prototype.update = function (event) {

        if (!event) {
            if (this.lastUpdateCall) {
                this.calc(this.lastUpdateCall[0], this.lastUpdateCall[1]);
            }
            return;
        }

        // Calculate the difference between the mouseposition at start and now
        var txPt = this._extractPosition(event);
        var p = this.transformPoint(txPt.x, txPt.y);

        var diffX = p.x - this.parameters.p.x,
            diffY = p.y - this.parameters.p.y;

        this.lastUpdateCall = [diffX, diffY];

        // Calculate the new position and height / width of the element
        this.calc(diffX, diffY);

       // Emit an event to say we have changed.
        this.el.fire('resizing', {dx: diffX, dy: diffY, event: event});
    };

    // Is called on mouseup.
    // Removes the update-function from the mousemove event
    ResizeHandler.prototype.done = function () {
        this.lastUpdateCall = null;
        SVG.off(window, 'mousemove.resize');
        SVG.off(window, 'mouseup.resize');
        SVG.off(window, 'touchmove.resize');
        SVG.off(window, 'touchend.resize');
        this.el.fire('resizedone');
    };

    // The flag is used to determine whether the resizing is used with a left-Point (first bit) and top-point (second bit)
    // In this cases the temp-values are calculated differently
    ResizeHandler.prototype.snapToGrid = function (diffX, diffY, flag, pointCoordsY) {

        var temp;

        // If `pointCoordsY` is given, a single Point has to be snapped (deepSelect). That's why we need a different temp-value
        if (typeof pointCoordsY !== 'undefined') {
            // Note that flag = pointCoordsX in this case
            temp = [(flag + diffX) % this.options.snapToGrid, (pointCoordsY + diffY) % this.options.snapToGrid];
        } else {
            // We check if the flag is set and if not we set a default-value (both bits set - which means upper-left-edge)
            flag = flag == null ? 1 | 1 << 1 : flag;
            temp = [(this.parameters.box.x + diffX + (flag & 1 ? 0 : this.parameters.box.width)) % this.options.snapToGrid, (this.parameters.box.y + diffY + (flag & (1 << 1) ? 0 : this.parameters.box.height)) % this.options.snapToGrid];
        }

        if(diffX < 0) {
            temp[0] -= this.options.snapToGrid;
        }
        if(diffY < 0) {
            temp[1] -= this.options.snapToGrid;
        }

        diffX -= (Math.abs(temp[0]) < this.options.snapToGrid / 2 ?
                  temp[0] :
                  temp[0] - (diffX < 0 ? -this.options.snapToGrid : this.options.snapToGrid));
        diffY -= (Math.abs(temp[1]) < this.options.snapToGrid / 2 ?
                  temp[1] :
                  temp[1] - (diffY < 0 ? -this.options.snapToGrid : this.options.snapToGrid));

        return this.constraintToBox(diffX, diffY, flag, pointCoordsY);

    };

    // keep element within constrained box
    ResizeHandler.prototype.constraintToBox = function (diffX, diffY, flag, pointCoordsY) {
        //return [diffX, diffY]
        var c = this.options.constraint || {};
        var orgX, orgY;

        if (typeof pointCoordsY !== 'undefined') {
          orgX = flag;
          orgY = pointCoordsY;
        } else {
          orgX = this.parameters.box.x + (flag & 1 ? 0 : this.parameters.box.width);
          orgY = this.parameters.box.y + (flag & (1<<1) ? 0 : this.parameters.box.height);
        }

        if (typeof c.minX !== 'undefined' && orgX + diffX < c.minX) {
          diffX = c.minX - orgX;
        }

        if (typeof c.maxX !== 'undefined' && orgX + diffX > c.maxX) {
          diffX = c.maxX - orgX;
        }

        if (typeof c.minY !== 'undefined' && orgY + diffY < c.minY) {
          diffY = c.minY - orgY;
        }

        if (typeof c.maxY !== 'undefined' && orgY + diffY > c.maxY) {
          diffY = c.maxY - orgY;
        }

        return [diffX, diffY];
    };

    ResizeHandler.prototype.checkAspectRatio = function (snap, isReverse) {
        if (!this.options.saveAspectRatio) {
            return snap;
        }

        var updatedSnap = snap.slice();
        var aspectRatio = this.parameters.box.width / this.parameters.box.height;
        var newW = this.parameters.box.width + snap[0];
        var newH = this.parameters.box.height - snap[1];
        var newAspectRatio = newW / newH;

        if (newAspectRatio < aspectRatio) {
            // Height is too big. Adapt it
            updatedSnap[1] = newW / aspectRatio - this.parameters.box.height;
            isReverse && (updatedSnap[1] = -updatedSnap[1]);
        } else if (newAspectRatio > aspectRatio) {
            // Width is too big. Adapt it
            updatedSnap[0] = this.parameters.box.width - newH * aspectRatio;
            isReverse && (updatedSnap[0] = -updatedSnap[0]);
        }

        return updatedSnap;
    };

    SVG.extend(SVG.Element, {
        // Resize element with mouse
        resize: function (options) {

            (this.remember('_resizeHandler') || new ResizeHandler(this)).init(options || {});

            return this;

        }

    });

    SVG.Element.prototype.resize.defaults = {
        snapToAngle: 0.1,       // Specifies the speed the rotation is happening when moving the mouse
        snapToGrid: 1,          // Snaps to a grid of `snapToGrid` Pixels
        constraint: {},         // keep element within constrained box
        saveAspectRatio: false  // Save aspect ratio when resizing using lt, rt, rb or lb points
    };

}).call(this);
}());

;/*! svg.draggable.js - v2.2.2 - 2019-01-08
* https://github.com/svgdotjs/svg.draggable.js
* Copyright (c) 2019 Wout Fierens; Licensed MIT */
(function(){function a(a){a.remember("_draggable",this),this.el=a}a.prototype.init=function(a,b){var c=this;this.constraint=a,this.value=b,this.el.on("mousedown.drag",function(a){c.start(a)}),this.el.on("touchstart.drag",function(a){c.start(a)})},a.prototype.transformPoint=function(a,b){a=a||window.event;var c=a.changedTouches&&a.changedTouches[0]||a;return this.p.x=c.clientX-(b||0),this.p.y=c.clientY,this.p.matrixTransform(this.m)},a.prototype.getBBox=function(){var a=this.el.bbox();return this.el instanceof SVG.Nested&&(a=this.el.rbox()),(this.el instanceof SVG.G||this.el instanceof SVG.Use||this.el instanceof SVG.Nested)&&(a.x=this.el.x(),a.y=this.el.y()),a},a.prototype.start=function(a){if("click"!=a.type&&"mousedown"!=a.type&&"mousemove"!=a.type||1==(a.which||a.buttons)){var b=this;if(this.el.fire("beforedrag",{event:a,handler:this}),!this.el.event().defaultPrevented){a.preventDefault(),a.stopPropagation(),this.parent=this.parent||this.el.parent(SVG.Nested)||this.el.parent(SVG.Doc),this.p=this.parent.node.createSVGPoint(),this.m=this.el.node.getScreenCTM().inverse();var c,d=this.getBBox();if(this.el instanceof SVG.Text)switch(c=this.el.node.getComputedTextLength(),this.el.attr("text-anchor")){case"middle":c/=2;break;case"start":c=0}this.startPoints={point:this.transformPoint(a,c),box:d,transform:this.el.transform()},SVG.on(window,"mousemove.drag",function(a){b.drag(a)}),SVG.on(window,"touchmove.drag",function(a){b.drag(a)}),SVG.on(window,"mouseup.drag",function(a){b.end(a)}),SVG.on(window,"touchend.drag",function(a){b.end(a)}),this.el.fire("dragstart",{event:a,p:this.startPoints.point,m:this.m,handler:this})}}},a.prototype.drag=function(a){var b=this.getBBox(),c=this.transformPoint(a),d=this.startPoints.box.x+c.x-this.startPoints.point.x,e=this.startPoints.box.y+c.y-this.startPoints.point.y,f=this.constraint,g=c.x-this.startPoints.point.x,h=c.y-this.startPoints.point.y;if(this.el.fire("dragmove",{event:a,p:c,m:this.m,handler:this}),this.el.event().defaultPrevented)return c;if("function"==typeof f){var i=f.call(this.el,d,e,this.m);"boolean"==typeof i&&(i={x:i,y:i}),i.x===!0?this.el.x(d):i.x!==!1&&this.el.x(i.x),i.y===!0?this.el.y(e):i.y!==!1&&this.el.y(i.y)}else"object"==typeof f&&(null!=f.minX&&d<f.minX?(d=f.minX,g=d-this.startPoints.box.x):null!=f.maxX&&d>f.maxX-b.width&&(d=f.maxX-b.width,g=d-this.startPoints.box.x),null!=f.minY&&e<f.minY?(e=f.minY,h=e-this.startPoints.box.y):null!=f.maxY&&e>f.maxY-b.height&&(e=f.maxY-b.height,h=e-this.startPoints.box.y),null!=f.snapToGrid&&(d-=d%f.snapToGrid,e-=e%f.snapToGrid,g-=g%f.snapToGrid,h-=h%f.snapToGrid),this.el instanceof SVG.G?this.el.matrix(this.startPoints.transform).transform({x:g,y:h},!0):this.el.move(d,e));return c},a.prototype.end=function(a){var b=this.drag(a);this.el.fire("dragend",{event:a,p:b,m:this.m,handler:this}),SVG.off(window,"mousemove.drag"),SVG.off(window,"touchmove.drag"),SVG.off(window,"mouseup.drag"),SVG.off(window,"touchend.drag")},SVG.extend(SVG.Element,{draggable:function(b,c){("function"==typeof b||"object"==typeof b)&&(c=b,b=!0);var d=this.remember("_draggable")||new a(this);return b="undefined"==typeof b?!0:b,b?d.init(c||{},b):(this.off("mousedown.drag"),this.off("touchstart.drag")),this}})}).call(this);
;/**
 * określenie granic przenoszenia elementu w obszarze modelowania - svgArea
 * @param  {} element
 * @param  {} lx - położenie elementu w poziomie obszaru modelowania
 * @param  {} ly - położenie elementu w pionie obszaru modelowania
 */
function insideContainer(element, lx, ly) {
  var thisGroup = element.bbox()

  if (lx < 0) {
    lx = 0
  }
  if (ly < 0) {
    ly = 0
  }
  if (lx > ($('#svgArea').width() - thisGroup.width)) {
    lx = ($('#svgArea').width() - thisGroup.width)
  }
  if (ly > ($('#svgArea').height() - thisGroup.height)) {
    ly = ($('#svgArea').height() - thisGroup.height)
  }

  return {
    x: lx,
    y: ly
  }
}

/**
 * określenie granic przenoszenia kołka w obszarze modelowania - svgArea
 * @param  {} circle - przenoszone koło
 * @param  {} lx - położenie względem poziomej osi x
 * @param  {} ly - położenie względem pionowej osi y
 */
function circleInsideContainer(circle, lx, ly) {
  //  var thisGroup = element.bbox()

  if (lx < 0) {
    lx = 0
  }
  if (ly < 0) {
    ly = 0
  }
  if (lx > ($('#svgArea').width() - 2 * circle.attr('r'))) {
    lx = ($('#svgArea').width() - 2 * circle.attr('r'))
  }
  if (ly > ($('#svgArea').height() - 2 * circle.attr('r'))) {
    ly = ($('#svgArea').height() - 2 * circle.attr('r'))
  }

  return {
    x: lx,
    y: ly
  }
}

// zmiana węzła  przy najechaniu myszką
function nodeAnimate(input) {

  // powiększanie przy najechaniu myszką
  var radius = input.attr('r')
  input.mouseover(function () {
    if (this.attr('class') == 'free') {
      this.animate({
        duration: '0.1s',
        ease: '>',
        delay: '0.1s'
      }).attr({
        fill: 'green',
        stroke: 'green',
        //  r: radius * 2
      })
    } else {
      this.animate({
        duration: '0.1s',
        ease: '>',
        delay: '0.1s'
      }

      ).attr({
        fill: 'red',
        stroke: 'red',
        // r: radius * 2     
      })
    }
  }).mouseout(function () {
    this.animate({
      duration: '0.1s',
      ease: '>',
      delay: '0.1s'
    }).attr({
      fill: 'black',
      stroke: 'black',
      r: radius
    })
  })
}

// ustalenie położenia węzła względem svgArea
function nodePosition(node) {
  var nestedParent = node.parent() // rodzicem jest obiekt nested

  var zz1 = node.bbox(); // zz1.cx = 10; zz1.cy = 20,

  var rotation = Math.round(nestedParent.transform('rotation'))

  // console.log('matrixSplit.dx' + matrixSplit.dx + 'matrixSplit.dy' + matrixSplit.dy + 'zz1.x' + zz1.cx + 'zz1.y' + zz1.cy)
  if (rotation == 90) {
    centerX = nestedParent.attr('x')
    centerY = nestedParent.attr('y') + zz1.cy / 2 + node.attr('r') / 2
  }
  if (rotation == -180) {
    console.log('radius: ' + node.attr('r'))
    centerX = nestedParent.attr('x') + zz1.cx + node.attr('r') / 2
    centerY = nestedParent.attr('y') // + zz1.cy//nestedParent.bbox().height/2
  }
  if (rotation == -90) {
    console.log('obrot do -90')

    centerX = nestedParent.attr('x') + zz1.cx + node.attr('r') / 2 + nestedParent.bbox().width / 2
    centerY = nestedParent.attr('y') + zz1.cy
  }
  if (rotation == 0) {
    centerX = nestedParent.attr('x') + zz1.cx // add the new change in x to the drag origin
    centerY = nestedParent.attr('y') + zz1.cy + node.attr('r') // add the new change in y to the drag origin
  }

  return {
    x: centerX,
    y: centerY
  }
}

// ustalenie położenia węzła względem svgArea
function nodePositionInGroup(node) {
  var gParent = node.parent() // rodzicem jest grupa exGrid

  var zz1 = node.bbox(); // zz1.cx = 16; zz1.cy = 30,

  var matrixSplit = gParent.transform()
  // console.log('matrixSplit.dx' + matrixSplit.dx + 'matrixSplit.dy' + matrixSplit.dy + 'zz1.x' + zz1.cx + 'zz1.y' + zz1.cy)
  if (matrixSplit.rotation == 0) {
    centerX = matrixSplit.x + zz1.cx // add the new change in x to the drag origin
    centerY = matrixSplit.y + zz1.cy // add the new change in y to the drag origin
  }
  if (matrixSplit.rotation == 90) {
    centerX = matrixSplit.x - zz1.cy
    centerY = matrixSplit.y + zz1.cx
  }
  if (matrixSplit.rotation == 180) {
    centerX = matrixSplit.x - zz1.cx
    centerY = matrixSplit.y - zz1.cy
  }
  if (matrixSplit.rotation == -90) {
    centerX = matrixSplit.x + zz1.cy
    centerY = matrixSplit.y - zz1.cx
  }

  return {
    x: centerX,
    y: centerY
  }
}

// rysowanie prostopadlej linii
function drawOrthoLine(lastPositionX, lastPositionY, startX, startY, endX, endY) {
  //   console.log('startX: ' + startX + 'startY: ' + startY + 'endX: ' + endX + 'endY: ' + endY )
  var gridSize = 10
  var start = {
    x: startX - startX % gridSize,
    y: startY - startY % gridSize
  }
  var end = {
    x: endX - endX % gridSize,
    y: endY - endY % gridSize
  }

  var getLine = function () {
    return {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y
    }
  }

  var redraw = function () {
    lineNode.attr(getLine())
  }
  var paper = SVG.get('svgArea')
  // var lineNode = paper.line([getLine().x1, getLine().y1], [getLine().x2, getLine().y2])
  var lineNode = paper.line([
    [getLine().x1, getLine().y1],
    [getLine().x2, getLine().y2]
  ]).attr({
    stroke: 'blue'
  }).back() // dzieki funkcji back lepiej sie klika w wezel

  return {
    updateStart: function (x, y) {
      start.x = x
      start.y = y
      redraw()
      return this
    },
    updateEnd: function (lastX, lastY, x, y) {
      if (typeof (lastX) != 'undefined') {
        // get the change from last position to this position
        var deltaX = lastX - x,
          deltaY = lastY - y

        // check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
          // left
          console.log('lewo')

          end.x = x - x % gridSize
          end.y = lastY - lastY % gridSize // - lastY % gridSize
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
          // right
          console.log('prawo')

          end.x = x - x % gridSize
          end.y = lastY - lastY % gridSize // - lastY % gridSize
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
          // up
          console.log('gora')
          end.x = lastX - lastX % gridSize // - lastX % gridSize
          end.y = y - y % gridSize
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
          // down
          console.log('dol')

          end.x = lastX - lastX % gridSize // - lastX % gridSize
          end.y = y - y % gridSize
        }
      }

      redraw()
      return this
    },

    returnLine: function () {
      return lineNode
    }

  }
}



// rysowanie linii
function drawLine(startX, startY, endX, endY) {
  var start = {
    x: startX,
    y: startY
  }
  var end = {
    x: endX,
    y: endY
  }
  var getLine = function () {
    return {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y

    }
  }

  var redraw = function () {
    lineNode.attr(getLine())
  }
  var paper = SVG.get('svgArea')
  // var lineNode = paper.line([getLine().x1, getLine().y1], [getLine().x2, getLine().y2])

  var lineNode = paper.line([
    [getLine().x1, getLine().y1],
    [getLine().x2, getLine().y2]
  ]).attr({
    stroke: 'red'
  }).back() // dzieki funkcji back lepiej sie klika w wezel

  return {
    updateStart: function (x, y) {
      start.x = x
      start.y = y
      redraw()
      return this
    },
    updateEnd: function (x, y) {
      end.x = x
      end.y = y
      redraw()
      return this
    },

    returnLine: function () {
      return lineNode
    }

  }
}


// obserwuj zmiane elementu selected <-> unselected
function mutationObserver(object) {

  // Options for the observer (which mutations to observe)
  var config = {
    attributes: true
  }

  // Callback function to execute when mutations are observed    
  var callback = function (mutationsList) {
    for (var mutation of mutationsList) {

      if (mutation.attributeName == 'attr') {
        var draggableNested = SVG.get('draggableNested')

        // jesli po zmianie attr obiekt jest wybrany...
        if (object.attr('attr') == 'selected') {

          /* ODZNACZYŁEM ŻEBY MI ZNIEKIŁA POLILINIA - NIE WIEM DLACZEGO
          //...oraz jesli grupa przenoszonych elementow miała co najmniej jeden element
          if (draggableNested.children().length >= 1) {
            draggableNested.each(function () {

              // jesli to nie jest zmieniony element
              if (this.attr('id') != object.attr('id')) {

                // przesun ten element aby dostosowal sie do nowych wspolrzednych  
                this.dmove(draggableNested.attr('x'), draggableNested.attr('y'))
              }
            })
          } */

          draggableNested.attr('x', 0)
          draggableNested.attr('y', 0)


          //dodaj mozliwosc usuwania elementow 
          object.on('contextmenu', function (e) {
            // e.preventDefault()
            $('.custom-menu-draggablenested').hide();
            $('.custom-menu-draggablenested').show();
            $('.custom-menu-draggablenested').css({
              left: e.offsetX, //SVG.get(object).attr('x') + object.bbox().width - $('.draggableDIV').parent().width(),    
              top: e.offsetY //SVG.get(object).attr('y') - $('.draggableDIV').parent().height(),
            })
          })

          // dodaj element do grupowego przenoszenia
          draggableNested.add(object)

          // pozbaw dany element pierwotnego przenoszenia
          object.draggable(false)

          draggableNested.draggable(false)

          // przenos dany element w okreslonym obszarze
          /*
          draggableNested.draggable({
            minX: -draggableNested.bbox().x,
            minY: -draggableNested.bbox().y,
            maxX: $('#svgArea').width() - draggableNested.bbox().x, //- draggableNested.bbox().width
            maxY: $('#svgArea').height() - draggableNested.bbox().y //- draggableNested.bbox().height
            , snapToGrid: 50 
          }) */

          var gridSize = 10
          //specyficzne działanie jeśli jest zaznaczony externalgrid oraz polilinia, która jest połączona z busbar
          //localName określa typ obiektu (svg czy polyline)
          if(draggableNested.node.childElementCount == 3 && draggableNested.node.childNodes[0].localName == 'svg' &&  draggableNested.node.childNodes[1].localName == 'polyline'){ // &&draggableNested.node.childNodes[0].includes(this.type == 'svg') ){
                       
            //przesuwaj węzeł który znajduje się na polilinii
            poliliniaPolaczonaId = SVG.get(draggableNested.node.childNodes[1].id)
            circlePoliliniiId = poliliniaPolaczonaId.attr('nodeId')
            circlePolilinii = SVG.get(circlePoliliniiId)
            console.log(circlePolilinii)
            busbar = SVG.get(circlePolilinii.node.parentNode.id)
          // draggableNested.add(SVG.get(circleIdPolilinii))
          console.log(busbar)

          wartoscPoczatkowaCircleX =  circlePolilinii.attr('cx')
          lewyKraniecBusbarX = busbar.node.attributes.x.value
          lewyKraniecPrzenoszeniaX = -(wartoscPoczatkowaCircleX - lewyKraniecBusbarX)

          //określ szerokość busbar z obiektu path, który jest dzieckiem busbar
          //console.log(busbar.first())

          busbarPath = busbar.first()
          
          prawyKraniecPrzenoszeniaX = (busbarPath.width() + parseInt(lewyKraniecBusbarX)) - wartoscPoczatkowaCircleX 
          console.log('busbarPath.width(): ' + busbarPath.width())
          console.log('parseInt(lewyKraniecBusbarX): '+ parseInt(lewyKraniecBusbarX))
          console.log('wartoscPoczatkowaCircleX: '+ wartoscPoczatkowaCircleX)

          console.log(prawyKraniecPrzenoszeniaX)
           // granicaBusbarPrawa =  
            //przesuwanie tylko w osi x, wzdłuż polilinii
            draggableNested.draggable(function (x, y) {
              
              //x = początkowe_położenie - przesunięcie_w_osi_x
              //początkowe położenie = 0 px
              //przesunięcie_w_osi_x jest dodatnie przy przesuwaniu w prawo oraz ujemne w lewo
              
              if( x > 0 ) 
              {
                ustawioneCx =  (x + busbar.attr('x') + wartoscPoczatkowaCircleX + circlePolilinii.transform('e')) - (x + busbar.attr('x') + wartoscPoczatkowaCircleX + circlePolilinii.transform('e')) % gridSize
                circlePolilinii.attr('cx', ustawioneCx) 
              }
           
              if(x <= 0 )//&&  x > lewyKraniecPrzenoszeniaX)
              {                
                ustawioneCx =  (x + busbar.attr('x') + wartoscPoczatkowaCircleX + circlePolilinii.transform('e')) + 10 - (x + busbar.attr('x') + wartoscPoczatkowaCircleX + circlePolilinii.transform('e')) % gridSize
                circlePolilinii.attr('cx', ustawioneCx)
              }
              if(x <= lewyKraniecPrzenoszeniaX )
              {                
                x = lewyKraniecPrzenoszeniaX
                circlePolilinii.attr('cx', lewyKraniecPrzenoszeniaX)
              }

              if(x >= prawyKraniecPrzenoszeniaX )
              {                
                
                x = prawyKraniecPrzenoszeniaX - prawyKraniecPrzenoszeniaX % gridSize 
        
                
                
                console.log(x)
                circlePolilinii.attr('cx', prawyKraniecPrzenoszeniaX - prawyKraniecPrzenoszeniaX % gridSize  + wartoscPoczatkowaCircleX)
              }

        
              
           
          
              return {
                x: nestedInsideContainer(this, x, y).x - x % gridSize
                //y: y
              }
            })

          } 
          else{           
            //ogólne działanie
            draggableNested.draggable(function (x, y) {
              return {
                x: nestedInsideContainer(this, x, y).x - x % gridSize,
                y: nestedInsideContainer(this, x, y).y - y % gridSize
              }
            })

          }

          

          // przy przenoszeniu aktualizuj polilinie 
          updatePolylinePoints(draggableNested)


        }

        // //jesli po zmianie attr obiekt jest niewybrany
        if (object.attr('attr') == 'unselected') {

          // usun z grupowego przenoszenia poprzez dodanie elementu do svgArea
          SVG.get('svgArea').add(object)
          // draggableNested.remove(object)

          // dany element musi miec wylaczone wlasne przenoszenie
          object.draggable(false)

          //przypisz ponownie działanie przy nacisnieciu prawego przycisku
          if (object.type == 'svg') {
            object.off('contextmenu')
            object.on('contextmenu', rightClick)
            // object.contextMenu()
          }
          if (object.type == 'polyline') {
            object.off('contextmenu')
            object.contextMenu()
          }

          // polilinia nie moze byc przenoszona przy zmianie danego obiektu
          if (object.type == 'polyline') {
            points.length = 0

            // aktualizuj polilinie
            points = object.attr('points')

            // utworz macierz z punktow
            pointArray = points.split(' ')

            var array = []
            array.length = 0
            var punkt = {}
            punkt.length = 0

            for (i = 0; i < pointArray.length; i++) {
              punkt = pointArray[i].split(',')
              array[i] = punkt
            }


            for (p = 0; p < array.length; p++) {
              // przesun dany punkt
              // x              
              array[p][0] = parseInt(array[p][0]) + parseInt(draggableNested.attr('x'))
              // y
              array[p][1] = parseInt(array[p][1]) + parseInt(draggableNested.attr('y'))
            }
            object.plot(array)

            // object.dmove(draggableNested.attr('x'), draggableNested.attr('y'))
            // object.translate(draggableNested.attr('x'), draggableNested.attr('y'))
          }

          if (object.type == 'svg') {
            // przenos pojedynczy element wewnatrz okreslonego obszaru
            object.dmove(draggableNested.attr('x'), draggableNested.attr('y'))
            var gridSize = 10
            object.draggable(function (x, y) {
              return {
                x: insideContainer(this, x, y).x - x % gridSize,
                y: insideContainer(this, x, y).y - y % gridSize
              }
            })

            // object.dragInsideContainer()
          }
        }
      }
    }
  }
  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback)

  // Start observing the target node for configured mutations
  observer.observe(document.getElementById(object.attr('id')), config)

  /*
  //obserwuj polilinie takze
  var polylines = SVG.get('svgArea').select('polyline')
  polylines.each(function () {
    observer.observe(document.getElementById(this.attr('id')), config)
  })
  */

}

// aktualizuj krancowe wspolrzedne polilinii polaczone z obiektami przy przenoszeniu grupy
function updatePolylinePoints(draggableNested) {

  // kolumna odpowiada obiektom a druga kolumna zmienianemu punktowi polilinii
  var arrayObject = [],
    arrayPolyline = [],
    arrayString = []

  // przy rozpoczeciu przenoszenia okresl jakie elementy sa w grupie przenoszonych
  draggableNested.on('dragstart', function (e) {
    arrayObject.length = 0
    arrayPolyline.length = 0
    arrayString.length = 0

    // wszyskie elementy w draggableNested
    var childrenSet = SVG.get('draggableNested').select('svg')

    // określ aktualizowany kraniec polilinii
    var polylineSet = SVG.get('svgArea').select('polyline')

    // dla kazdego elementu w draggableNested
    childrenSet.each(function () {
      var object = this

      // sprawdz czy jakas polilinia laczy sie z danym elementem
      polylineSet.each(function () {

        // jesli polilinia jest polaczona z danym elementem i nie jest zaznaczona
        if (this.attr('id').includes(object.attr('id')) == true && this.attr('attr') != 'selected') {
          // zmieniaj wspolrzedne polilinii
          var polyline = this

          // wpisz do macierzy gdzie kolumna odpowiada obiektow a druga kolumna zmienianemu punktowi polilinii
          // sprawdz ktore wspolrzedne zmieniac
          if (polyline.attr('id').endsWith(object.attr('id'))) {
            // second object

            arrayObject.push(object)
            arrayPolyline.push(polyline)
            arrayString.push('second')
          } else {
            // first object
            arrayObject.push(object)
            arrayPolyline.push(polyline)
            arrayString.push('first')
          }
        }
      })
    })
  })

  draggableNested.on('dragmove', function (e) {
    var rotationCorrectionX = 0,
      rotationCorrectionY = 0,
      nodeX = 0,
      nodeY = 0,
      nodeR = 0

    // aktualizuj dane polilinii kazdego elementu w macierzy
    for (var i = 0; i < arrayObject.length; i++) {

      // wez aktualne koordynaty polilinii
      var points = arrayPolyline[i].attr('points')

      // utworz macierz z punktow
      var pointArray = points.split(' ')

      var polylineArray = []
      var punkt = {}

      for (var z = 0; z < pointArray.length; z++) {
        punkt = pointArray[z].split(',')
        polylineArray[z] = punkt
      }

      // okresl pozycje wezla wewnatrz grupy
      arrayObject[i].each(function () {
        if (this.type == 'circle') {
          nodeX = this.attr('cx')
          nodeY = this.attr('cy')
          nodeR = this.attr('r')
        }
      })

      if (Math.round(arrayObject[i].transform('rotation')) == 90) {
        rotationCorrectionX = nodeR - arrayObject[i].bbox().width / 2
        rotationCorrectionY = -arrayObject[i].bbox().height / 2
      }
      if (Math.round(arrayObject[i].transform('rotation')) == -180) {
        rotationCorrectionX = 0
        rotationCorrectionY = -arrayObject[i].bbox().height + nodeR
      }
      if (Math.round(arrayObject[i].transform('rotation')) == -90) {
        rotationCorrectionX = arrayObject[i].bbox().width / 2 - nodeR
        rotationCorrectionY = arrayObject[i].nodeR / 2 - arrayObject[i].bbox().height / 2
      }
      if (Math.round(arrayObject[i].transform('rotation')) == 0) {
        rotationCorrectionX = 0
        rotationCorrectionY = 0
      }

      if (arrayString[i] == 'first') {
        // zmien wspolrzedna x z pierwszego punktu polilinii
        // dla grupy: array[0][0] = matrix.extract().x + nodeX
        polylineArray[0][0] = arrayObject[i].attr('x') + nodeX + rotationCorrectionX + draggableNested.attr('x') // + this.nodeX + 

        // zmien wspolrzedna y z pierwszego punktu polilinii
        // dla grupy: array[0][0] = matrix.extract().y + nodeY
        polylineArray[0][1] = arrayObject[i].attr('y') + nodeY + rotationCorrectionY + draggableNested.attr('y') // + this.nodeY 
      } else {
        // zmien wspolrzedna x z pierwszego punktu polilinii
        // dla grupy: array[0][0] = matrix.extract().x + nodeX
        polylineArray[polylineArray.length - 1][0] = arrayObject[i].attr('x') + nodeX + rotationCorrectionX + draggableNested.attr('x') // + this.nodeX + 

        // zmien wspolrzedna y z pierwszego punktu polilinii
        // dla grupy: array[0][0] = matrix.extract().y + nodeY
        polylineArray[polylineArray.length - 1][1] = arrayObject[i].attr('y') + nodeY + rotationCorrectionY + draggableNested.attr('y') // + this.nodeY + 
      }

      // aktualizuj polilinie
      arrayPolyline[i].plot(polylineArray)
    }
  })
}

// przenoszenie obiektu nested w obszarze modelowania
function nestedInsideContainer(element, lx, ly) {
  var thisNested = element.bbox()

  if (lx < -thisNested.x) {
    lx = -thisNested.x
  }
  if (ly < -thisNested.y) {
    ly = -thisNested.y
  }
  if (lx > ($('#svgArea').width() - thisNested.width - thisNested.x)) {
    lx = $('#svgArea').width() - thisNested.width - thisNested.x
  }
  if (ly > ($('#svgArea').height() - thisNested.height - thisNested.y)) {
    ly = $('#svgArea').height() - thisNested.height - thisNested.y
  }

  return {
    x: lx,
    y: ly
  }
}


//przenoś kółko w obszarze modelowania 
function dragCircleInsideContainer(circle) {
  var gridSize = 10
  circle.draggable(function (x, y) {
    return {
      x: circleInsideContainer(this, x, y).x - x % gridSize - this.attr('r'),
      y: circleInsideContainer(this, x, y).y - y % gridSize - this.attr('r')
    }
  })
}

//usun wezly do przenoszenia polilinii
function removePolylineDragCircles() {

  SVG.get('svgArea').select('circle').each(function () {
    if (this.attr('class') == 'draggable') {
      this.remove()
    }
  })
}


//****** Z EXTERNAL GRID ***** */
var mouseoverNode = function (ev) {
  if (this.attr('class') == 'free') {
    this.animate({
      duration: '0.1s',
      ease: '>',
      delay: '0.1s'
    }).attr({
      fill: 'green',
      stroke: 'green',
      //  r: radius * 2
    })
  } else {
    this.animate({
      duration: '0.1s',
      ease: '>',
      delay: '0.1s'
    }

    ).attr({
      fill: 'red',
      stroke: 'red',
      // r: radius * 2     
    })
  }
}

var mouseoutNode = function (ev) {
  this.animate({
    duration: '0.1s',
    ease: '>',
    delay: '0.1s'
  }).attr({
    fill: 'black',
    stroke: 'black',
    // r: radius 
  })
}

// wraz z przenoszeniem elementu przenos polilinie
function makeDraggableConnection(firstObject, secondObject, polyline, polylineBackground) {

  // w przypadku rotacji zmieniaj polozenie polilinii
  firstObject.on('rotated', function () {
    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx') // nodeX = 10
        nodeY = this.attr('cy') // nodeY = 18
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR / 2 - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[0][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[0][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })

  // w przypadku rotacji zmieniaj polozenie polilinii
  secondObject.on('rotated', function () {
    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx')
        nodeY = this.attr('cy')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + 2 * nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[array.length - 1][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[array.length - 1][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })

  // przenos pierwszy element z polilinia
  firstObject.on('dragmove', function (e) {

    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx')
        nodeY = this.attr('cy')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = -this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR / 2 - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[0][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[0][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })

  // przenos drugi element z polilinia
  secondObject.on('dragmove', function (e) {

    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx')
        nodeY = this.attr('cy')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY
    console.log('nodeR: ' + nodeR)

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + 2 * nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z ostatniego punktu polilinii
    // dla grupy: array[array.length-1][0] = matrix.extract().x + nodeX
    array[array.length - 1][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z ostatniego punktu polilinii
    // dla grupy: array[array.length-1][0] = matrix.extract().x + nodeX
    array[array.length - 1][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })
}

// utworz JSONA do wyswietlania w konsoli. Zapobieganie bledowi 'Converting circular structure to JSON at JSON.stringify (<anonymous>)'
function simpleStringify(object) {
  var simpleObject = {}
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue
    }
    if (typeof (object[prop]) == 'object') {
      continue
    }
    if (typeof (object[prop]) == 'function') {
      continue
    }
    simpleObject[prop] = object[prop]
  }
  return JSON.stringify(simpleObject) // returns cleaned up JSON
}

function showCustomMenuExtGrid(object, offsetX, offsetY) {

  //schowaj poprzednio używane menu
  $('.custom-menu').hide()

  //jesli element jest w grupie przenoszonych 
  if (object.parent().attr('id') == 'draggableNested') {

    // nic nie rob

  } else {
    $('.custom-menu').show().css({
      left: offsetX,
      top: offsetY
    })

    // ustawiam abym wiedzial ktory element mam wykorzystywac w funkcjach rotate, delete itd.
    $('.custom-menu').attr('data', object)
  }
}

var doubleClickExternalGrid = function (ev) {

  // formularz do wpisywania danych
  element = document.getElementById('externalgridform')
  element.style.display = 'block' // show
  element.style.left = ev.offsetX + 'px'
  element.style.top = ev.offsetY + 'px'

  // ustawiam abym wiedzial ktory element mam wykorzystywac w zapisywaniu danych formularza
  $('#externalgridform').attr('data', SVG.get(ev.target.id).parent().attr('id'))

  // jesli nie jest nacisniety shift
  if (this.attr('class') == 'noshift') {
    var elements = SVG.get('svgArea').select('svg')
    // wszystkie inne elementy odznacz jesli sa zaznaczone
    elements.each(function () {
      if (this.attr('attr') == 'selected') {
        console.log('zmiana na unselected')
        this.attr({
          attr: 'unselected',
          opacity: 1
        })
      }
    })
  }

  console.log('zmiana na selected')
  // zaznacz klikniety element 
  this.attr({
    attr: 'selected',
    opacity: 0.5
  })
}

drawAction = false
var clickNodeInExternalGrid = function (ev) {
  var gridSize = 10

  thisNode = this


  // nacisnelismy pierwszy wezel i rysujemy
  if (this.attr('class') == 'free' && drawAction == false) {

    firstObject = this.parent()

    //ustawienie parametru aby konczyć przy drugim nacisnieciu
    drawAction = true

    // ustaw wezel jako zajety
    this.attr('class', 'busy')

    // rozpocznij polilinie          
    polyline = SVG.get('svgArea').polyline([nodePosition(this).x - nodePosition(this).x % gridSize, nodePosition(this).y - nodePosition(this).y % gridSize]).fill('none').stroke({
      width: 1,
    })

    // w nazwie polilinii bedzie znajdowac sie nazwa elementu
    polyline.attr('id', firstObject.attr('id'))

    polylineId = polyline.attr('id')

    polyline.stylePolyline()

    // setup a variable to store our last position
    var last_position = {}
    console.log('ev.offsetX' + ev.offsetX)
    // set the new last position to the current for next time        
    last_position = {
      x: nodePosition(this).x, // ev.offsetX - ev.offsetX % gridSize,
      y: nodePosition(this).y // ev.offsetY - ev.offsetY % gridSize
    }

    // okresl poczatkowy punkt
    line = drawOrthoLine((last_position.x - last_position.x % gridSize), (last_position.y - last_position.y % gridSize), nodePosition(this).x, nodePosition(this).y, nodePosition(this).x, nodePosition(this).y)

    $('#svgArea').on('mousemove', function (e) {
      line.updateEnd(last_position.x, last_position.y, e.offsetX, e.offsetY)
    })

    $('#svgArea').on('mousedown', function (e) {

      // aktualizuj polilinie
      points = polyline.attr('points')

      if (typeof (last_position.x) != 'undefined') {
        // get the change from last position to this position
        var deltaX = last_position.x - e.offsetX,
          deltaY = last_position.y - e.offsetY

        // check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
          // left              
          endX = e.offsetX - e.offsetX % gridSize
          endY = last_position.y - last_position.y % gridSize // - last_position.y % gridSize 
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
          // right              
          endX = e.offsetX - e.offsetX % gridSize
          endY = last_position.y - last_position.y % gridSize // - last_position.y % gridSize 
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
          // up              
          endX = last_position.x - last_position.x % gridSize // - last_position.x  % gridSize 
          endY = e.offsetY - e.offsetY % gridSize
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
          // down          
          endX = last_position.x - last_position.x % gridSize // - last_position.x  % gridSize 
          endY = e.offsetY - e.offsetY % gridSize
        }
      }

      // points += ' ' + e.offsetX + ',' + e.offsetY
      points += ' ' + endX + ',' + endY
      polyline.attr('points', points)

      // aktualizuj linie
      line = drawOrthoLine((last_position.x - last_position.x % gridSize), (last_position.y - last_position.y % gridSize), endX, endY, endX, endY)

      last_position = {
        x: endX,
        y: endY
      }
    })

    document.addEventListener('keydown', function (e) {

      // jesli jestesmy podczas rysowania
      if (drawAction == true) {


        // ESCAPE key pressed
        if (e.keyCode == 27) {
          $('#svgArea').off('mousemove')
          $('#svgArea').off('mousedown')

          // SVG.get(polylineID).remove()            

          // okresl jako usuniety zeby nie reagowal w mutationObserver
          polyline.attr('attr', 'removed')

          // usun rysowana polilinie
          polyline.remove()

          // usun linie
          lineSet = SVG.get('svgArea').select('line')
          // usun wszystkie linie
          lineSet.each(function (i, children) {
            this.remove()
          })

          // zmien klase wezla
          thisNode.attr('class', 'free') //było thisNode
          drawAction = false
        }
      }
    })
  }

  // nacisnelismy drugi raz - na węzeł
  if (this.attr('class') == 'free' && drawAction == true) {
    console.log('nacisnelismy drugi wezel')
    secondObject = this.parent()
    // do wezla dochodzi linia ustaw wezel jako zajety
    this.attr('class', 'busy')

    // w nazwie polilinii bedzie znajdowac sie nazwa elementu
    firstObjectId = polyline.attr('id')
    secondObjectId = secondObject.attr('id')
    polylineId = firstObjectId + '_' + secondObjectId
    polyline.attr('id', polylineId)


    // skoncz rysowanie
    drawAction = false

    // aktualizuj polilinie
    points = polyline.attr('points')
    points += ' ' + nodePosition(this).x + ',' + nodePosition(this).y
    polyline.attr('points', points)

    // utworz tło polilinii żeby łatwo sie klikalo
    var polylineBackground = polyline.clone()

    polyline.attr({
      //'pointer-events': 'none'
    })



    polylineBackground.attr({
      'id': polyline.attr('id') + '_background',
      'data': 'background',
      'background': 'background',
      // 'pointer-events': 'all', 
      // 'stroke': 'yellow',
      'stroke-width': 8,
      // 'fill': 'red',
      'opacity': 0
      //'visibility': 'hidden'
    })


    // przypisz do tła polilinii prawy przycisk          
    polylineBackground.contextMenu()

    //polylineBackground.off('click')
    polylineBackground.on('click', clickPolylineBackground)


    /*
    polylineBackground.click(function () {
      alert('kliknalem')
      
      //okresl polilinie zgodnie z id 
      SVG.get(polyline.attr('id')).stylePolyline()
       
    }) */


    // wykasuj wszystkie pomocnicze linie ktore zostaly narysowane
    lineSet = SVG.get('svgArea').select('line')
    lineSet.each(function () {
      this.remove()
    })

    // przestajemy rysować polilinię
    $('#svgArea').off('mousemove')
    $('#svgArea').off('mousedown')

    mutationObserver(polyline)
    mutationObserver(polylineBackground)

    // przy przenoszeniu polaczonych elementow polilinia powinna sie zmieniac
    makeDraggableConnection(firstObject, secondObject, polyline, polylineBackground)
  }


}

var rightClick = function (ev) {
  ev.preventDefault()
  showCustomMenuExtGrid(this, ev.offsetX, ev.offsetY)
}

//kliknięcie tła polilinii
var clickPolylineBackground = function (ev) {
  ev.preventDefault()

  removePolylineDragCircles()

  //jesli linia jest odznaczona wtedy mozesz umiescic punkty
  if (this.attr('attr') == 'unselected') {
    //przy kliknięciu w tło polilinii umieszczaj kółka do zmieniania polilinii  
    var pointArray
    var polylineBackgroundId = this.attr('id')
    var regex = /\d+_\d+/g //wychwytuj Id o budowie liczba_liczba
    var polylineId = polylineBackgroundId.match(regex)

    polylineBackground = this
    polyline = SVG.get(polylineId)

    points = this.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    var paper = SVG.get('svgArea')
    var kolkoSet = paper.set()

    var kolko
    // umiesc kolka w punktach polilinii oprocz  pierwszego i ostatniego punktu
    for (z = 1; z < (array.length - 1); z++) {
      // kolko = 
      console.log('x: ' + array[z][0] + 'y: ' + array[z][1])
      kolko = paper.circle().attr({
        class: 'draggable',
        data: z,
        r: 2,
        cx: array[z][0],
        cy: array[z][1],
        fill: 'black',
        stroke: 'black',
        'stroke-width': 1
      })

      // przenos element wewnatrz obszaru
      dragCircleInsideContainer(kolko)

      kolkoSet.add(kolko)
    }

    // przy zmianie polozenia kolka zmieniaj polilinie oraz jej tło

    kolkoSet.each(function () {
      //if (this.attr('class') == 'draggable') {
      //okresl najpierw ktory punkt polilinii powinien byc zmieniany

      this.on('dragstart', function (e) {

        //okresl poczatkowe punkty polilinii
        polyline = SVG.get(polyline.attr('id'))
        points = polyline.attr('points')

        pointArray = points.split(' ')
        for (i = 0; i < pointArray.length; i++) {
          punkt = pointArray[i].split(',')
          array[i] = punkt
        }
        //polyline.plot(array)
      })

      this.on('dragmove', function (e) {

        array[this.attr('data')][0] = this.attr('cx')
        array[this.attr('data')][1] = this.attr('cy')

        //aktualizuj przesuwany punkt
        polyline.plot(array)
        polylineBackground.plot(array)
      })
    })
  }
}

// funkcja okreslajaca prawy przycisk
var contextMenuExternalGrid = function (ev) {
  //ev.preventDefault()
  console.log('jestem w contextMenuExternalGrid ')
  showCustomMenuExtGrid(this, ev.offsetX, ev.offsetY)

}

//****** KONIEC - Z EXTERNAL GRID ***** */

var clickBusbar = function (ev) {
  var gridSize = 10  

  //rodzic w postaci svg
  busbarParentId = this.attr('id')
  busbarParent = SVG.get(busbarParentId)
  busbarPaths = SVG.get(busbarParentId).select('path')

  busbarPaths.each(function () {
    if (this.attr('data') != 'background') {
      pathId = this.attr('id')
    }
    if (this.attr('data') == 'background') {
      pathBackgroundId = this.attr('id')
    }
  })

  busbarPath = SVG.get(pathId)
  busbarPathBackground = SVG.get(pathBackgroundId)

  busbarPathArray = busbarPath.array()

  //nacisnelismy szynę, ale nie rysowaliśmy
  if (drawAction == false) {

    
    //zmieniamy kolor szyny
    $('#' + pathId).css({
      stroke: 'green'
    })

    busbarElements = this.children()
  
    //jeśli busbar nie ma żadnego prostokąta to dodaj prostokąt
    jestRect = false
    circleCx = 0
    
    
    //sprawdź czy busbar zawiera jakiś prostokąt i kółko
    busbarElements.forEach(element => {
      if (element.type == 'rect') {
        
        jestRect = true
      }
      if (element.type == 'circle') {

        //położenie kółka na osi x
        circleCx =  element.attr('cx') - this.attr('x') 
        
      }
    });

    //jeśli nie ma prostokąta   
    if (!jestRect) {

      //określ położenie w osi x prostokąta na busbarze
      //borderXforRect = this.attr('x') - circleCx  
    
      //ustaw dwa prostokąty na krańcach linii
      rightRect = this.rect(4, 4).fill('green').move(busbarPathArray.value[1][1], 18)
      //leftRect = this.rect(4, 4).fill('green').move(busbarPathArray.value[0][1], 18)
     
      rightRect.attr('id', 'rightBusbarRect')
      //leftRect.attr('id', 'leftBusbarRect')
      //ustaw prostokąt przed busbarpath
      rightRect.before(busbarPath)
      //leftRect.after(busbarPath)

      //przesuń do przodu
      rightRect.front()
      //leftRect.front() 

      //prostokąty będą mogły być przenoszone (ruch jedynie w osi x)
      rightRect.draggable(function (x, y) {

        //busbar nie przejdzie przez kółko
        if(x < circleCx) {
           x = circleCx          
        }
           
        return {
          x: x - x % gridSize, //insideContainer(this, x, y).x, - x % gridSize,
          y: 18// insideContainer(this, x, y).y // - y % gridSize
        }
      })

      /*
      leftRect.draggable(function (x, y) {
        return {
          x: x,//insideContainer(this, x, y).x - x % gridSize,
          y: 18//insideContainer(this, x, y).y - y % gridSize
        }
      })*/

      //dodaj mozliwosc usuwania elementow 
      rightRect.on('dragmove', function (e) {

        //array pokazuje to co jest w 'd' ["M", 0, 20] ["L", 22, 20]
        busbarPathArray = busbarPath.array()
        
        // busbarPathArray.value[1][1] jest to wartość x prawej krawędzi polilinii
        busbarPathArray.value[1][1] = e.detail.event.offsetX - busbarParent.attr('x')
        busbarPathArray.value[1][1] = busbarPathArray.value[1][1] - busbarPathArray.value[1][1] % gridSize
        if(busbarPathArray.value[1][1] < circleCx) {
          console.log('circleCx: '+circleCx)
          busbarPathArray.value[1][1] = circleCx          
        }

        //aktualizuj polilinie
        busbarPath.plot(busbarPathArray)

        //aktualizuj także tło
        busbarPathBackground.plot(busbarPathArray)
      })
    }
  }

  //przy rysowaniu linii nacisnelismy drugi raz - na szynę
  if (drawAction == true) {

    busbar = this

    //utworz wezel aby był wycentrowany w szynie
    var node = SVG.get('svgArea').circle(6).attr({
      // 'stroke-width': 0.5,
      'class': 'free'
    }).center(ev.offsetX, busbar.attr('y') + busbarPathArray.value[0][2]) //busbarPathArray.value[0][2] to jest wspolrzedna y
      

    nodeCx = node.attr('cx')
    nodeCy = node.attr('cy')   
    node.attr('cx', nodeCx - nodeCx % gridSize)
   
    //Moves an element to a different parent (similar to addTo), but without changing its visual representation. All transformations are merged and applied to the element.
    node.toParent(this)

    // w nazwie polilinii bedzie znajdowac sie nazwa elementu
    firstObjectId = polyline.attr('id')
    busbarId = busbar.attr('id')
    polylineId = firstObjectId + '_' + busbarId
    polyline.attr('id', polylineId)

    //przypisz do polilinii numer węzła aby mógł być usunięty przy usunięciu linii
    polyline.attr('nodeId', node.attr('id'))


    // skoncz rysowanie
    drawAction = false

    // aktualizuj polilinie
    points = polyline.attr('points')

    //points += ' ' + nodePosition(node).x + ',' + nodePosition(node).y
      // points += ' ' + ev.offsetX + ',' + ev.offsetY

      //zmiana formuły aby polilinia kończyła się tam gdzie węzeł na osi Y
      offsetY = busbar.attr('y') + busbarPathArray.value[0][2]
      points += ' ' + node.attr('cx') + ',' + offsetY


    polyline.attr('points', points)

    // utworz tło polilinii żeby łatwo sie klikalo
    var polylineBackground = polyline.clone()

    polylineBackground.attr({
      'id': polyline.attr('id') + '_background',
      'data': 'background',
      'background': 'background',
      'stroke-width': 8,
      'opacity': 0
    })


    // przypisz do tła polilinii prawy przycisk          
    polylineBackground.contextMenu()

    //polylineBackground.off('click')
    polylineBackground.on('click', clickPolylineBackground)


    // wykasuj wszystkie pomocnicze linie ktore zostaly narysowane
    lineSet = SVG.get('svgArea').select('line')
    lineSet.each(function () {
      this.remove()
    })

    // przestajemy rysować polilinię
    $('#svgArea').off('mousemove')
    $('#svgArea').off('mousedown')

    mutationObserver(polyline)
    mutationObserver(polylineBackground)

    //określ początkowe miejsce zaczepienia polilinii
    busbarNodeX = node.attr('cx') - busbar.attr('x')
    busbarNodeY = node.attr('cy') - busbar.attr('y')

    console.log('busbarNodeX' + busbarNodeX)
    console.log('busbarNodeY' + busbarNodeY)

    // przy przenoszeniu polaczonych elementow polilinia powinna sie zmieniac
    makeDraggableConnectionWithBusbar(firstObject, busbar, busbarNodeX, busbarNodeY, polyline, polylineBackground)
  }
}

// wraz z przenoszeniem elementu przenos polilinie
function makeDraggableConnectionWithBusbar(firstObject, busbar, busbarNodeX, busbarNodeY, polyline, polylineBackground) {
  var gridSize = 10
  console.info('makeDraggableConnectionWithBusbar')
  // w przypadku rotacji zmieniaj polozenie polilinii
  firstObject.on('rotated', function () {
    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx') // nodeX = 10
        nodeY = this.attr('cy') // nodeY = 18
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR / 2 - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[0][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[0][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })

  // w przypadku rotacji zmieniaj polozenie polilinii
  busbar.on('rotated', function () {
    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx')
        nodeY = this.attr('cy')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + 2 * nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[array.length - 1][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[array.length - 1][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })

  // przenos pierwszy element z polilinia
  firstObject.on('dragmove', function (e) {

    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx')
        nodeY = this.attr('cy')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = -this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR / 2 - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[0][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[0][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })

  // przenos drugi element z polilinia
  busbar.on('dragmove', function (e) {

    var gridSize = 10

    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    //ustal pozycję węzła bazując na ostatnim punkcie polilinii
    /*
    nodePosX = array[array.length - 1][0] 
    nodePosY = array[array.length - 1][1] 
    console.log('nodePosX' + nodePosX )
    console.log('movementX' + (event.detail.event.movementX % gridSize))
    */

    //console.log(e.detail.p.x)

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {


        /*
        console.log('bbox')
        console.log(this.bbox())

        console.log('rbox')
        console.log(this.rbox()) */
        nodeX = -this.transform('x') //this.attr('cx')
        nodeY = -this.transform('y')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }
    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + 2 * nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }

    // zmien wspolrzedna x z ostatniego punktu polilinii
    // dla grupy: array[array.length-1][0] = matrix.extract().x + nodeX
    //array[array.length - 1][0] =  Number(array[array.length - 1][0]) + (event.detail.event.movementX % gridSize)  // Number(nodePosX) this.attr('x')// + nodeX + rotationCorrectionX
    //array[array.length - 1][0] = this.attr('x')
    // zmien wspolrzedna y z ostatniego punktu polilinii
    // dla grupy: array[array.length-1][0] = matrix.extract().x + nodeX

    /*
    console.log('attrX' + this.attr('x'))
    console.log('numberX'  + Number(array[array.length - 1][0]))*/


    array[array.length - 1][0] = this.attr('x') + busbarNodeX
    array[array.length - 1][1] = this.attr('y') + busbarNodeY

    polyline.plot(array)

    //aktualizuj tło polilinii
    polylineBackground.plot(array)
  })
}


function showCustomMenuBusbar(object, offsetX, offsetY) {

  $('.custom-menu-busbar').hide();
  $('.custom-menu-busbar').show();

  //ustawiam abym wiedzial ktory element mam wykorzystywac w funkcjach rotate, delete itd.
  $('.custom-menu-busbar').attr('data', object);

  $('.custom-menu-busbar').css({
    left: offsetX, //SVG.get(object).attr('x') + object.bbox().width - $('.draggableDIV').parent().width(),    
    top: offsetY //SVG.get(object).attr('y') - $('.draggableDIV').parent().height(),
  })

}
;
SVG.Busbar = SVG.invent({
  // Define the type of element that should be created
  create: function () {
    SVG.Nested.call(this) // call super constructor

    busbar = this
    temp = this.attr('id')
    
    this.attr({
      'id': 'busbar' + temp,
      'attr': 'unselected', // element moze by zaznaczany
      'class': 'noshift', // nie jest wcisniety shift na poczatku
      'data' : 'busbar'      
    })   

    // this.path('M2,16,30,16').style('stroke-width: 1;cursor:pointer;fill: #ffffff; stroke:#000000')
    this.path('M0,20,20,20').style('stroke-width: 2;cursor:pointer;fill: #ffffff; stroke:#000000')
        
    //utworz wezły
    /*    
    var node = this.circle(4).attr({
      'cx': 0,
      'cy': 20,
      'stroke-width': 0.5,
      'class': 'free'
    })
    var node1 = this.circle(4).attr({
      'cx': 10,
      'cy': 20,
      'stroke-width': 0.5,
      'class': 'free'
    })
    var node2 = this.circle(4).attr({
      'cx': 20,
      'cy': 20,
      'stroke-width': 0.5,
      'class': 'free'
    })*/


    //tworzymy tło szyny
    //clonedBusbar = this.path('M2,16,30,16').back()
    clonedBusbar = this.path('M0,20,20,20')
    clonedBusbar.attr({      
      'id': busbar.attr('id') + 'background',
      'data': 'background',     
      'stroke-width': 8,
      'cursor': 'pointer',     
      'opacity': 0

    })

    //przypisanie wezlom odpowiedniej metody  
    //this.select('circle').on('mouseover', mouseoverNode)
    //this.select('circle').on('mouseout', mouseoutNode)  
    //this.select('circle').on('click', clickNodeInExternalGrid)
   
    //DOBRZE DZIAŁA
    /*
    this.on('contextmenu', function (event) {  
      showCustomMenuBusbar(this, event.offsetX, event.offsetY)
    }) 
    */

    //przypisanie elementowi odpowiednich metod
    //this.on('dblclick', doubleClickBusbar)
    this.on('click', clickBusbar)

    // przenos element w obszarze modelowania - svgArea
    var gridSize = 10
    this.draggable(function (x, y) {
      return {
        x: insideContainer(this, x, y).x - x % gridSize,
        y: insideContainer(this, x, y).y - y % gridSize
      }
    })
  }, // Specify from which existing class this shape inherits
  inherit: SVG.Nested, // Add custom methods to invented shape
  extend: {
    //zaznacz element

    /*
    selectBusbar: function () {

      //ostatni element w svg busbar  
      this.last()
      pathId = this.last().attr('id')
      busbarPath = SVG.get(pathId)
            
      $('#'+ pathId).css({
        stroke: 'green',
        opacity: 0.5
      })

      rightRect = this.rect(4,4).fill('green').move(18, 18)
      rightRect.front()
      busbarPath.before(rightRect)
      leftRect = this.rect(4,4).fill('green').move(0, 18)
      leftRect.front()
      busbarPath.before(leftRect)

      rightRect.draggable()
      leftRect.draggable()

      //dodaj mozliwosc usuwania elementow 
      rightRect.on('dragmove', function (e) {
        busbarPathArray = busbarPath.array()         
        
        //wychwyć współrzędną x ostatniego elementu ścieżki
        busbarPathArray.value[1][1] += e.detail.event.movementX
        
        busbarPath.plot(busbarPathArray)
        
     //   var regex = /\d+_\d+/g //wychwytuj Id o budowie liczba_liczba
     //   var polylineId = busbarPathPoints.match(regex)
      })
    }, */

    selectParameters: {      
        points: ['lt', 'rt', 'rb', 'lb', 't', 'r', 'b', 'l'],    // which points to draw, default all
        pointsExclude: [],                       // easier option if to exclude few than rewrite all
        classRect: 'svg_select_boundingRect',    // Css-class added to the rect
        classPoints: 'svg_select_points',        // Css-class added to the points
        pointSize: 7,                            // size of point
        rotationPoint: true,                     // If true, rotation point is drawn. Needed for rotation!
        deepSelect: false,                       // If true, moving of single points is possible (only line, polyline, polyon)
        pointType: 'circle'                    // Point type: circle or rect, default circle
      
    }
  },
  construct: {
    // Create a rounded element   
    busbar: function () {
      return this.put(new SVG.Busbar)
    }

  }
})





;SVG.ExternalGrid = SVG.invent({
  // Define the type of element that should be created
  create: function () {
    SVG.Nested.call(this) // call super constructor 

    temp = this.attr('id')
    this.attr({
      'id': 'extgrid' + temp,
      'attr': 'unselected', // element moze by zaznaczany
      'class': 'noshift' // nie jest wcisniety shift na poczatku      
    })   

    this.path('M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0').style('stroke-width: 0.5;cursor:pointer;fill: #ffffff; stroke:#000000')
    var node = this.circle(4).attr({
      'cx': 10,
      'cy': 18,
      'stroke-width': 0.5,
      'class': 'free'
    })

    //przypisanie elementowi odpowiedniej metody
    this.on('dblclick', doubleClickExternalGrid)
    this.on('contextmenu', contextMenuExternalGrid)

    //przypisanie wezlom odpowiednich metod  
    this.select('circle').on('mouseover', mouseoverNode)
    this.select('circle').on('mouseout', mouseoutNode)
    this.select('circle').on('click', clickNodeInExternalGrid)

    // przenos element w obszarze modelowania - svgArea
    var gridSize = 10
    this.draggable(function (x, y) {
      return {
        x: insideContainer(this, x, y).x - x % gridSize,
        y: insideContainer(this, x, y).y - y % gridSize
      }
    })
  }, // Specify from which existing class this shape inherits
  inherit: SVG.Nested, // Add custom methods to invented shape
  construct: {
    // Create an element   
    externalgrid: function () {
      return this.put(new SVG.ExternalGrid)
    }
  }
})

;SVG.extend(SVG.Polyline, {

  // funkcja okreslajaca prawy przycisk
  contextMenu: function () {
    this.on('contextmenu', function (event) {
      event.preventDefault()
      showCustomMenuPolyline(this, event.offsetX, event.offsetY)
    })
  },
  stylePolyline: function () {
    this.attr('attr', 'unselected') // element moze by zaznaczany
    this.attr('class', 'noshift') // nie jest wcisniety shift na poczatku
    this.style('cursor:pointer; pointer-events=none')
 
   // mutationObserver(this) //obserwuj zmiany selected <-> unselected
   // polylineAnimate(this)  
  }
})

function showCustomMenuPolyline(object, offsetX, offsetY) {

  $('.custom-menu-polyline').hide();
  $('.custom-menu-polyline').show();

  //ustawiam abym wiedzial ktory element mam wykorzystywac w funkcjach rotate, delete itd.
  $('.custom-menu-polyline').attr('data', object);

  $('.custom-menu-polyline').css({
    left: offsetX, //SVG.get(object).attr('x') + object.bbox().width - $('.draggableDIV').parent().width(),    
    top: offsetY //SVG.get(object).attr('y') - $('.draggableDIV').parent().height(),
  })

}
;// import { first } from "rxjs/operators"

/*
SVG.ExternalGrid = SVG.invent({
  // Define the type of element that should be created
  create: function () {
    SVG.Nested.call(this) // call super constructor

    temp = this.attr('id')
    this.attr('id', 'extgrid' + temp)
    this.attr('attr', 'unselected') // element moze by zaznaczany
    this.attr('class', 'noshift') // nie jest wcisniety shift na poczatku

    this.path('M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0').style('stroke-width: 0.5;cursor:pointer;fill: #ffffff; stroke:#000000')
    var node = this.circle(4).attr({
      'cx': 10,
      'cy': 18,
      'stroke-width': 0.5,
      'class': 'free'
    })

    // nodeAnimate(node) 

    this.select('circle').on('mouseover', mouseoverNode)
    this.select('circle').on('mouseout', mouseoutNode)
    this.select('circle').on('click', clickNodeInExternalGrid)
    this.on('dblclick', doubleClickExternalGrid)
  }, // Specify from which existing class this shape inherits
  inherit: SVG.Nested, // Add custom methods to invented shape
  extend: {
    // przenos element wewnatrz obszaru
    dragInsideContainer: function () {
      var gridSize = 10
      this.draggable(function (x, y) {
        return {
          x: insideContainer(this, x, y).x - x % gridSize,
          y: insideContainer(this, x, y).y - y % gridSize

        }
      })
    },
    // funkcja okreslajaca prawy przycisk
    contextMenu: function () {
      this.on('contextmenu', function (e) {
        event.preventDefault()
        showCustomMenuExtGrid(this, e.offsetX, e.offsetY)
      })
    }

  }, // Add method to parent elements
  construct: {
    // Create a rounded element   
    externalgrid: function () {
      return this.put(new SVG.ExternalGrid)
    }

  }
})

// wraz z przenoszeniem elementu przenos polilinie
function makeDraggableConnection (firstObject, secondObject, polyline) {

  // w przypadku rotacji zmieniaj polozenie polilinii
  firstObject.on('rotated', function () {
    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx') // nodeX = 10
        nodeY = this.attr('cy') // nodeY = 18
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR / 2 - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[0][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[0][1] = this.attr('y') + nodeY + rotationCorrectionY


    // aktualizuj polilinie
    polyline.plot(array)
  })

  // w przypadku rotacji zmieniaj polozenie polilinii
  secondObject.on('rotated', function () {
    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx')
        nodeY = this.attr('cy')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + 2 * nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[array.length - 1][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[array.length - 1][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)
  })

  // przenos pierwszy element z polilinia
  firstObject.on('dragmove', function (e) {

    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx')
        nodeY = this.attr('cy')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = -this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR / 2 - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().x + nodeX
    array[0][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z pierwszego punktu polilinii
    // dla grupy: array[0][0] = matrix.extract().y + nodeY
    array[0][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)
  })

  // przenos drugi element z polilinia
  secondObject.on('dragmove', function (e) {

    // wez aktualne koordynaty polilinii
    points = polyline.attr('points')

    // utworz macierz z punktow
    pointArray = points.split(' ')

    var array = []
    var punkt = {}

    for (i = 0; i < pointArray.length; i++) {
      punkt = pointArray[i].split(',')
      array[i] = punkt
    }

    // okresl pozycje wezla wewnatrz grupy
    this.each(function (i, children) {
      if (this.type == 'circle') {
        nodeX = this.attr('cx')
        nodeY = this.attr('cy')
        nodeR = this.attr('r')
      }
    })

    var rotationCorrectionX,
      rotationCorrectionY
    console.log('nodeR: ' + nodeR)

    if (Math.round(this.transform('rotation')) == 90) {
      rotationCorrectionX = nodeR - this.bbox().width / 2
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == -180) {
      rotationCorrectionX = 0
      rotationCorrectionY = -this.bbox().height + 2 * nodeR
    }
    if (Math.round(this.transform('rotation')) == -90) {
      rotationCorrectionX = this.bbox().width / 2 - nodeR
      rotationCorrectionY = nodeR - this.bbox().height / 2
    }
    if (Math.round(this.transform('rotation')) == 0) {
      rotationCorrectionX = 0
      rotationCorrectionY = 0
    }

    // zmien wspolrzedna x z ostatniego punktu polilinii
    // dla grupy: array[array.length-1][0] = matrix.extract().x + nodeX
    array[array.length - 1][0] = this.attr('x') + nodeX + rotationCorrectionX

    // zmien wspolrzedna y z ostatniego punktu polilinii
    // dla grupy: array[array.length-1][0] = matrix.extract().x + nodeX
    array[array.length - 1][1] = this.attr('y') + nodeY + rotationCorrectionY

    // aktualizuj polilinie
    polyline.plot(array)
  })
}

// utworz JSONA do wyswietlania w konsoli
function simpleStringify (object) {
  var simpleObject = {}
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue
    }
    if (typeof (object[prop]) == 'object') {
      continue
    }
    if (typeof (object[prop]) == 'function') {
      continue
    }
    simpleObject[prop] = object[prop]
  }
  return JSON.stringify(simpleObject) // returns cleaned up JSON
}

function showCustomMenuExtGrid (object, offsetX, offsetY) {
  $('.custom-menu').hide()

  // jesli element jest w grupie przenoszonych 
  if (object.parent().attr('id') == 'draggableNested') {

    // nic nie rob

  }else {
    $('.custom-menu').show().css({
      left: offsetX,
      top: offsetY
    })

    // ustawiam abym wiedzial ktory element mam wykorzystywac w funkcjach rotate, delete itd.
    $('.custom-menu').attr('data', object)
  }
}

var doubleClickExternalGrid = function (ev) {

  // formularz do wpisywania danych
  element = document.getElementById('externalgridform')
  element.style.display = 'block' // show
  element.style.left = ev.offsetX + 'px'
  element.style.top = ev.offsetY + 'px'

  // ustawiam abym wiedzial ktory element mam wykorzystywac w zapisywaniu danych formularza
  $('#externalgridform').attr('data', SVG.get(ev.target.id).parent().attr('id'))

  // jesli nie jest nacisniety shift
  if (this.attr('class') == 'noshift') {
    var elements = SVG.get('svgArea').select('svg')
    // wszystkie inne elementy odznacz jesli sa zaznaczone
    elements.each(function () {
      if (this.attr('attr') == 'selected') {
        console.log('zmiana na unselected')
        this.attr({
          attr: 'unselected',
          opacity: 1
        })
      }
    })
  }

  console.log('zmiana na selected')
  // zaznacz klikniety element 
  this.attr({
    attr: 'selected',
    opacity: 0.5
  })
}

var mouseoverNode = function (ev) {
  if (this.attr('class') == 'free') {
    this.animate({
      duration: '0.1s',
      ease: '>',
      delay: '0.1s'
    }).attr({
      fill: 'green',
      stroke: 'green',
    //  r: radius * 2
    })
  }else {
    this.animate({
      duration: '0.1s',
      ease: '>',
      delay: '0.1s'
    }

    ).attr({
      fill: 'red',
      stroke: 'red',
    // r: radius * 2     
    })
  }
}

var mouseoutNode = function (ev) {
  this.animate({
    duration: '0.1s',
    ease: '>',
    delay: '0.1s'
  }).attr({
    fill: 'black',
    stroke: 'black',
  // r: radius 
  })
}

drawAction = false
var clickNodeInExternalGrid = function (ev) {
  var gridSize = 10


  // console.log('ev.target.parent():')
  // console.log(ev.target.parent())


  // console.log(ev.target)
  var thisNode = this // bylo this

  // nacisnelismy pierwszy wezel i rysujemy
  if (this.attr('class') == 'free' && drawAction == false) {
    firstObject = thisNode.parent()

    drawAction = true

    // ustaw wezel jako zajety
    this.attr('class', 'busy')

    // rozpocznij polilinie          
    polyline = SVG.get('svgArea').polyline([nodePosition(thisNode).x - nodePosition(thisNode).x % gridSize , nodePosition(thisNode).y - nodePosition(thisNode).y % gridSize]).fill('none').stroke({
      width: 1,
    // fill: 'red'
    })

    // w nazwie polilinii bedzie znajdowac sie nazwa elementu
    polyline.attr('id', firstObject.attr('id'))

    polylineId = polyline.attr('id')

 
    polyline.stylePolyline()

    // setup a variable to store our last position
    var last_position = {}
    console.log('ev.offsetX' + ev.offsetX)
    // set the new last position to the current for next time        
    last_position = {
      x: nodePosition(thisNode).x, // ev.offsetX - ev.offsetX % gridSize,
      y: nodePosition(thisNode).y // ev.offsetY - ev.offsetY % gridSize
    }

    // okresl poczatkowy punk

    line = drawOrthoLine((last_position.x - last_position.x % gridSize) , (last_position.y - last_position.y % gridSize) , nodePosition(thisNode).x , nodePosition(thisNode).y, nodePosition(thisNode).x , nodePosition(thisNode).y)

    $('#svgArea').on('mousemove', function (e) {
      line.updateEnd(last_position.x , last_position.y, e.offsetX, e.offsetY)
    })

    $('#svgArea').on('mousedown', function (e) {


      // aktualizuj polilinie
      points = polyline.attr('points')



      if (typeof (last_position.x) != 'undefined') {
        // get the change from last position to this position
        var deltaX = last_position.x - e.offsetX,
          deltaY = last_position.y - e.offsetY

        // check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
          // left              
          endX = e.offsetX - e.offsetX % gridSize
          endY = last_position.y - last_position.y % gridSize // - last_position.y % gridSize 
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
          // right              
          endX = e.offsetX - e.offsetX % gridSize
          endY = last_position.y - last_position.y % gridSize // - last_position.y % gridSize 
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
          // up              
          endX = last_position.x - last_position.x % gridSize // - last_position.x  % gridSize 
          endY = e.offsetY - e.offsetY % gridSize
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
          // down          
          endX = last_position.x - last_position.x % gridSize // - last_position.x  % gridSize 
          endY = e.offsetY - e.offsetY % gridSize
        }
      }

      // points += ' ' + e.offsetX + ',' + e.offsetY
      points += ' ' + endX + ',' + endY
      polyline.attr('points', points)

      // aktualizuj linie
      line = drawOrthoLine((last_position.x - last_position.x % gridSize)  , (last_position.y - last_position.y % gridSize), endX, endY, endX, endY)

      last_position = {
        x: endX,
        y: endY
      }
    })

    document.addEventListener('keydown', function (e) {

      // jesli jestesmy podczas rysowania
      if (drawAction == true) {


        // ESCAPE key pressed
        if (e.keyCode == 27) {
          $('#svgArea').off('mousemove')
          $('#svgArea').off('mousedown')

          // SVG.get(polylineID).remove()            

          // okresl jako usuniety zeby nie reagowal w mutationObserver
          polyline.attr('attr', 'removed')

          // usun rysowana polilinie
          polyline.remove()

          // usun linie
          lineSet = SVG.get('svgArea').select('line')
          // usun wszystkie linie
          lineSet.each(function (i, children) {
            this.remove()
          })

          // zmien klase wezla
          thisNode.attr('class', 'free')
          drawAction = false
        }
      }
    })
  }

  // nacisnelismy drugi wezel
  if (this.attr('class') == 'free' && drawAction == true) {
    secondObject = thisNode.parent()
    // do wezla dochodzi linia ustaw wezel jako zajety
    this.attr('class', 'busy')

    // w nazwie polilinii bedzie znajdowac sie nazwa elementu
    firstObjectId = polyline.attr('id')
    secondObjectId = secondObject.attr('id')
    polylineId = firstObjectId + '_' + secondObjectId
    polyline.attr('id', polylineId)


    // skoncz rysowanie
    drawAction = false

    // aktualizuj polilinie
    points = polyline.attr('points')
    points += ' ' + nodePosition(thisNode).x + ',' + nodePosition(thisNode).y
    polyline.attr('points', points)

    // utworz tło polilinii żeby łatwo sie klikalo
    var clonedPolyline = polyline.clone()

    // przypisz do tła polilinii prawy przycisk          
    clonedPolyline.contextMenu()

    clonedPolyline.attr({
      'id': polyline.attr('id'),
     // 'pointer-events': 'all',
     // 'stroke': 'yellow',
      'stroke-width': 8,
     // 'fill': 'black',
      'opacity': 0

    })

    
    clonedPolyline.click(function () {
      alert('kliknalem')
    }) 

    // wykasuj wszystkie pomocnicze linie ktore zostaly narysowane
    lineSet = SVG.get('svgArea').select('line')
    lineSet.each(function () {
      this.remove()
    })

    // przestajemy rysować polilinię
    $('#svgArea').off('mousemove')
    $('#svgArea').off('mousedown')




    // przy przenoszeniu polaczonych elementow polilinia powinna sie zmieniac
    makeDraggableConnection(firstObject, secondObject, polyline)
  }
}

var rightClick = function (ev) {
  ev.preventDefault()
  showCustomMenuExtGrid(this, ev.offsetX, ev.offsetY)
}

*/
;
//# sourceMappingURL=scripts.bundle.js.map