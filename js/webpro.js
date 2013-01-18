/**
* wp-core.js - version 0.1 - WebPro Release 0.1
*
* Copyright (c) 2012. Adobe Systems Incorporated.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*       * Redistributions of source code must retain the above copyright notice,
*             this list of conditions and the following disclaimer.
*       * Redistributions in binary form must reproduce the above copyright notice,
*             this list of conditions and the following disclaimer in the documentation
*             and/or other materials provided with the distribution.
*       * Neither the name of Adobe Systems Incorporated nor the names of its
*             contributors may be used to endorse or promote products derived from this
*             software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

(function( $, window, document, undefined ){

var WebPro = {
    // Version of the framework.
    version: 0.1,

    // Utility method for wiring up derived class prototypes.

    inherit: function( derived, base ) {
        var anon = function(){};
        anon.prototype = base.prototype;
        derived.prototype = new anon();
        derived.prototype.constructor = derived;
        derived.prototype._super = base;
    },

    ensureArray: function() {
        var results = [],
            len = arguments.length;
        if ( len > 0 ) {
            if ( len > 1 ||      !$.isArray( arguments[ 0 ] ) ) {
                results = $.makeArray( arguments );
            } else {
                results = arguments[ 0 ];
            }
        }
        return results;
    },

    // When similar markup structures, that use the same class names,
    // are nested, it becomes very difficult to find the right set of
    // elements for the outer structures. scopedFind() allows you to search
    // for elements via a selector, within a context element, it then filters
    // the elements in the resulting collection, down to those that have the
    // specified parent, with the specified class name, as their closest ancestor.

    scopedFind: function( contextEle, selector, parentClassName, parent ) {
        // Muse used to provide this same functionality with:
        //
        //             var scopedFind = function($start, selector, scopeSelector, $scope) {
        //                         return $start.find(selector).filter(function() { return $(this).closest(scopeSelector).get(0) == $scope.get(0); })
        //             }
        //
        // It is very compact and easy to read, but unfortunately it is extremely slow. The code
        // below ends up being about 7 times faster by avoiding the use of selectors and minimizing
        // the number of function calls that could occur when trying to scope a selector that
        // ends up matching lots of elements.

        // Use spaces before and after the parentClassName so that we
        // don't accidentally match any other classes that start with the
        // same name.

        var className = ' ' + parentClassName + ' ',

            // results will hold the resulting elements after they've been filtered.

            results = [],

            // Find all the elements within the specified context element that
            // match the selector. Note that this collection may also contain
            // elements for nested structures.

            $matches = $( contextEle ).find( selector ),

            // Cache the length of the collection so we can reduce the number
            // of symbol/js-interpreter lookups during each iteration of the
            // loop below.

            numMatches = $matches.length;

        // Make sure our parent is an element and not a selector or collection.

        parent = $( parent )[ 0 ];

        // Run through all elements in the collection and find those that
        // have the specified parent as their closest ancestor.

        for ( var i = 0; i < numMatches; i++ ) {
            // Cache the current element we're going to work with.

            var m = $matches[ i ],
                p = m;

            // Loop through the parent hierarchy of the current element
            // until we find an element with the classname we were given.

            while ( p ) {
                // Does the element have the specified classname? Note
                // that we are purposely not using $.fn.hasClass() because
                // we want this function to be fast.
    
                if ( p.className && ( ' ' + p.className + ' ' ).indexOf( className ) !== -1 ) {
                    // Do we have an ancestor that matches the parent we
                    // are interested in?

                    if ( p === parent ) {
                        results.push( m );
                    }
                    // We found an ancestor that has the specified class
                    // so we are done traversing up the ancestor hierarchy.

                    break;
                }

                // We haven't found a matching ancestor, so go up
                // another level.

                p = p.parentNode;
            }
        }

        // Return a jQuery collection that contains our results.

        return $( results );
    },

      getAlignmentAdjustment: function ( align, refDim, posDim ) {
            var value = 0;
            switch( align ) {
                  case 'left':
                  case 'top':
                        value = 0;
                        break;
                  case 'right':
                  case 'bottom':
                        value = refDim - posDim;
                        break;
                  case 'center':
                  default:
                        value = ( refDim - posDim ) / 2;
                        break;
            }
            return value;
      },

      // Calculate the position of an element if it were to
      // be positioned around another reference-element.
      // Return the position in terms of the coordinate space
      // of the element's offsetParent.

      positionElementAroundAnother: function( refElement, posElement, options ) {
            
            options = $.extend({
                        // Where to position the posElement relative to the
                        // refElement. Possible values are:
                        //
                        //            'right', 'left', 'above', or 'below'
                        //
                        // The default value is 'right'.

                        position: 'right',

                        // The amount of offset to add to the calculated position
                        // of the posElement. If position is 'right' or 'left'
                        // a positive value moves the posElement away from the
                        // refElement in the horizontal direction. If position is
                        // 'above' or 'below' a positive value moves the refElement
                        // away from the refElement in the vertical direction.
                        //
                        // The default value is zero, which means the posElement
                        // will be touching the refElement.

                        positionOffset: 0,

                        // Decide how to align the side of the refElement that is
                        // closest to the refElement. The allowed value of this
                        // property depends on the value of the position property.
                        // If position is 'right' or 'left', then allowed values
                        // for the align property are 'top', 'bottom' or 'center'.
                        // If position is 'above' or 'below', then allowed values
                        // are 'left', 'right' or 'center'.

                        align: 'center',

                        // The amount of offset to apply to the calculated
                        // alignment. If the align attribute adjusts the
                        // horizontal direction, a positive value shifts
                        // the posElement to the left. If the align attribute
                        // adjusts the vertical direction, a positive value
                        // shifts the posElement down.

                        alignOffset: 0
                  }, options );

            var $ref = $( refElement ), // reference-element
                        $ele = $( posElement ), // the element to position
                        $offsetParent = $ele.offsetParent();

            $ele.removeClass( 'above below left right' );

            var rOffset = $ref.offset(),
                        rWidth = $ref.outerWidth(),
                        rHeight = $ref.outerHeight(),
                        pOffset = $offsetParent.offset(),
                        wWidth = $ele.outerWidth(),
                        wHeight = $ele.outerHeight(),

                        positionOffset = options.positionOffset,
                        align = options.align,
                        alignOffset = options.alignOffset,

                        // Calculate an initial position where the top-left corner of
                        // the posElement is the same as the refElement.

                        x = rOffset.left - pOffset.left,
                        y = rOffset.top - pOffset.top;


            // Calculate the position based on the specified
            // position value.
            
            switch( options.position ) {
                  case 'above':
                        x = x + WebPro.getAlignmentAdjustment( align, rWidth, wWidth ) + alignOffset;
                        y = y - wHeight - positionOffset;
                        break;
                  case 'below':
                        x = x + WebPro.getAlignmentAdjustment( align, rWidth, wWidth ) + alignOffset;
                        y = y + rHeight + positionOffset;
                        break;
                  case 'left':
                        x = x - wWidth - positionOffset;
                        y = y + WebPro.getAlignmentAdjustment( align, rHeight, wHeight ) + alignOffset;
                        break;
                  case 'right':
                  default:
                        x = x + rWidth + positionOffset;
                        y = y + WebPro.getAlignmentAdjustment( align, rHeight, wHeight ) + alignOffset;
                        break;
            }

            return { x: x, y: y };
      },

      // Calculate the coordinates necessary to place an element
      // at the specified x and y values which are relative to
      // the upper-left corner of a reference-element. The coordinates
      // returned are in terms of the coordinate system for the
      // offsetParent of the element.
      //
      // Possible values for x are: <number>|'left'|'center'|'right'
      //
      // Possible values for y are: <number>|'top'|'center'|'bottom'

      positionElementInsideAnother: function( refElement, posElement, x, y ) {
                  var $ref = $( refElement ),
                              $ele = $( posElement ),
                              $offsetParent = $ele.offsetParent(),
                              rOffset = $ref.offset(),
                              pOffset = $offsetParent.offset(),

                              // Calculate the coordinate of the upper-left
                              // corner of the refElement in terms of the
                              // offsetParent's coordinate system.

                              originX = rOffset.left - pOffset.left,
                              originY = rOffset.top - pOffset.top;

                  switch ( x ) {
                        case "left":
                        case "center":
                        case "right":
                              x = originX + WebPro.getAlignmentAdjustment( x, $ref.outerWidth(), $ele.outerWidth() );
                              break;
                        default:
                              x = x || 0;
                  }

                  switch ( y ) {
                        case "top":
                        case "center":
                        case "bottom":
                              y = originY + WebPro.getAlignmentAdjustment( y, $ref.outerHeight(), $ele.outerHeight() );
                              break;
                        default:
                              y = y || 0;
                  }

                  return { x: x, y: y };
      }
};


//////////////////// EventDispatcher ////////////////////


// EventDispatcher is a utility class that other classes
// that wish to dispatch events can derive from. We use
// it to hide the actual underlying mechanism used so
// we can swap it out at any time. This version simply uses
// jQuery's event mechanism.

function EventDispatcher()
{
}

$.extend(EventDispatcher.prototype, {
    bind: function( name, callback, data ) {
        return $( this ).bind( name, callback, data );
    },
    
    unbind: function( name, callback ) {
        return $( this ).unbind( name, callback );
    },

    trigger: function( name, data ) {
        // We want to give the caller access to the preventDefault and/or
        // stopPropagation status of the event they just triggered, so we
        // create a custom event, use it to dispatch the notification, then
        // return the event object itself from this method.

        var e = $.Event( name );
        $( this ).trigger( e, data );
        return e;
    }
});

WebPro.EventDispatcher = EventDispatcher;


//////////////////// Expose WebPro to the World      ////////////////////


window.WebPro = WebPro;


})( jQuery, window, document );


/**
* wp-node.js - version 0.1 - WebPro Release 0.1
*
* Copyright (c) 2012. Adobe Systems Incorporated.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*       * Redistributions of source code must retain the above copyright notice,
*             this list of conditions and the following disclaimer.
*       * Redistributions in binary form must reproduce the above copyright notice,
*             this list of conditions and the following disclaimer in the documentation
*             and/or other materials provided with the distribution.
*       * Neither the name of Adobe Systems Incorporated nor the names of its
*             contributors may be used to endorse or promote products derived from this
*             software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/


// A component class that mimics the DOM Node API for the purposes of
// maintaining object relationships as a tree.

var WebPro = WebPro || {};

(function( WebPro, window ) {

WebPro.Node = function() {
    this.parentNode = null;
    this.firstChild = null;
    this.lastChild = null;
    this.previousSibling = null;
    this.nextSibling = null;
}

var proto = WebPro.Node.prototype;

proto.removeChild = function( child ) {
    if ( child.parentNode === this ) {
        var p = child.previousSibling,
            n = child.nextSibling;

        if ( this.firstChild === child ) {
            this.firstChild = n;
        }

        if ( this.lastChild === child ) {
            this.lastChild = p;
        }

        if ( p ) {
            p.nextSibling = n;
        }

        if ( n ) {
            n.previousSibling = p;
        }

        child.parentNode = child.previousSibling = child.nextSibling = null;
    }

    return child;
};

proto.appendChild = function( child ) {
    if ( child && ( child.parentNode !== this || child !== this.lastChild ) ) {
        var lc = this.lastChild;
        if ( child.parentNode ) {
            child.parentNode.removeChild( child );
        }

        if ( !lc ) {
            this.firstChild = child;
        } else {
            lc.nextSibling = child;
            child.previousSibling = lc;
        }

        this.lastChild = child;
        child.parentNode = this;
    }

    return child;
};

proto.insertBefore = function( child, ref ) {
    if ( child && child !== ref ) {
        if ( child.parentNode ) {
            child.parentNode.removeChild( child );
        }

        if ( !ref ) {
            this.appendChild( child );
        } else {
            if ( this.firstChild === ref ) {
                this.firstChild = child;
            }

            var p = ref.previousSibling;
            child.previousSibling = p;
            child.nextSibling = ref;
            ref.previousSibling = child;
            if ( p ) {
                p.nextSibling = child;
            }
            child.parentNode = this;
        }
    }

    return child;
};

proto.insertAfter = function( child, ref ) {
    return this.insertBefore( child, ( ref && ref.nextSibling ) || null );
};

proto.childNodes = function() {
    var nodes = [], c = this.firstChild;
    while ( c ) {
        nodes.push( c );
        c = c.nextSibling;
    }
    return nodes;
};

})(WebPro, window);


/**
* wp-widgets.js - version 0.1 - WebPro Release 0.1
*
* Copyright (c) 2012. Adobe Systems Incorporated.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*       * Redistributions of source code must retain the above copyright notice,
*             this list of conditions and the following disclaimer.
*       * Redistributions in binary form must reproduce the above copyright notice,
*             this list of conditions and the following disclaimer in the documentation
*             and/or other materials provided with the distribution.
*       * Neither the name of Adobe Systems Incorporated nor the names of its
*             contributors may be used to endorse or promote products derived from this
*             software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

(function( $, WebPro, window, document, undefined ){


//////////////////// Widget ////////////////////


function Widget()
{
    WebPro.EventDispatcher.call( this );

    this._initialize.apply( this, arguments );
}

WebPro.inherit( Widget, WebPro.EventDispatcher );

$.extend(Widget.prototype, {

    defaultOptions: { },

    _widgetName: "Widget",

    _initialize: function() {
        var options;
    
        this.plugins = [];
    
        // PHASE 1 - Setup
        //
        // Execute any widget code that must run prior to plugins
        // initializing. Note that widget constructors are allowed
        // to take any number of arguments. The setUp() method is
        // the only means that any derived class has of accessing
        // the arguments passed into the constructor. Also note that
        // there is no required argument ordering enforced so it is
        // up to the _setUp() method to return any options object that
        // may have been passed into the constructor. This is an important
        // detail that derived classes with a _setUp() override
        // must implement. Failing to return an options object specified
        // at construction time will result in the defaultOptions
        // being used.
    
        var e = this.trigger( "before-setup" );
        if ( ! e.isDefaultPrevented() ) {
            options = this._setUp.apply( this, arguments );
            this.trigger( "setup" )
        }
    
        // PHASE 2 - Plugin Initialization
        //
        // First thing we do is call initializePlugins. We pass it
        // the options object we were given so that it can add or
        // remove options prior to the widget initializing itself.
    
        var e = this.trigger( "before-init-plugins" );
        if ( ! e.isDefaultPrevented() ) {
            this._initializePlugins( options );
            this.trigger( "init-plugins" )
        }
    
        // Save a copy of the options we were given. We start
        // with the default set of options specified within
        // the prototype, and then add in the options passed in
        // by the caller.
    
        this.options = $.extend( {}, this.defaultOptions, options );
    
        // PHASE 3 - Data Extraction
        //
        // Allow the widget to extract data from it's sources. This
        // includes any markup the widget might be attached to.
    
        e = this.trigger( "before-extract-data" );
        if ( ! e.isDefaultPrevented() ) {
            this._extractData();
            this.trigger( "extract-data" )
        }
    
        // PHASE 4 - Transform Markup
        //
        // Allow the widget to modify any associated markup.
        
        e = this.trigger( "before-transform-markup" );
        if ( ! e.isDefaultPrevented() ) {
            this._transformMarkup();
            this.trigger( "transform-markup" )
        }
    
        // PHASE 5 - Attach Behavior
        //
        // Attach any event handlers, etc on the newly transformed
        // widget markup.
    
        e = this.trigger( "before-attach-behavior" );
        if ( ! e.isDefaultPrevented() ) {
            this._attachBehavior();
            this.trigger( "attach-behavior" )
        }
    
        // PHASE 6 - Ready
        //
        // Allow the widget to execute any other initialization code
        // after the markup is transformed and behavior is attached.
    
        e = this.trigger( "before-ready" );
        if ( ! e.isDefaultPrevented() ) {
            this._ready();
            this.trigger( "ready" )
        }
    },

    _setUp: function( element, options ) {
        this.$element = $( element );
        return options;
    },

    _initializePlugins: function( opts ) {
        opts = opts || {};

        // Widgets can have a defaultPlugins property specified on their
        // prototypes. The user can prevent these plugins from running
        // for a specific widget instance, by passing a useDefaultPlugins:false
        // option property into the widget constructor.

        var useDefaults = typeof opts.useDefaultPlugins === "undefined" ? true : opts.useDefaultPlugins,
            defaultPlugins = ( useDefaults && this.defaultPlugins ) ? this.defaultPlugins : [],
            plugins = defaultPlugins.concat( opts.plugins || [] );

        // We sort the merged list of default and option specified plugins
        // based on priority (ascending order). Plugins with a lower-number
        // for priority execute first. If no priority is specified they are
        // given a default of 50.

        plugins = plugins.sort( function( a, b ) {
            a = typeof a.priority === "number" ? a.priority : 50;
            b = typeof b.priority === "number" ? b.priority : 50;
            return a - b;
        });

        // Now that we have a list of plugins sorted by priority,
        // execute them in the order they appear in the plugins array.

        for ( var i = 0; i < plugins.length; i++ ) {
            var p = plugins[ i ];
            if ( p && p.initialize ) {
                p.initialize( this, opts );
            }
        }

        this.plugins = plugins;
    },
    
    _extractData: function() {
        // Base class no-op.
    },

    _transformMarkup: function() {
        // Base class no-op.
    },

    _attachBehavior: function () {
        // Base class no-op.
    },

    _ready: function() {
        // Base class no-op.
    }
});

// Expose our Widget base class.

WebPro.Widget = Widget;


//////////////////// Widget Constructor Factory ////////////////////


// Expose our Widget constructor factory. We want all WebPro widgets to
// declare themselves using this factory so that they all follow the same
// Widget construction phases. This gives plugin authors a predictable
// initialization sequence they can hook into to extend functionality.

WebPro.widget = function( name, base, prototype ) {
    // The base and prototype args are optional, so make sure
    // we use default values when appropriate.

    var baseClass = ( prototype && base ) || WebPro.Widget,
        methods = prototype || base || {},

        // Declare the constructor for the widget. All widgets invoke the
        // base class constructor. Widgets muse make use of the Widget's
        // phase methods for initializing themselves.

        constructor = function() {
            baseClass.apply( this, arguments );

            this._widgetName = name;
        };

    // Simulate inheritance by setting up the class prototype chain.

    WebPro.inherit( constructor, baseClass );

    // Copy all of the methods for this widget on to its prototype object.

    $.extend( constructor.prototype, methods );

    // At this point the options object in the constructor's prototype
    // is either undefined, or pointing to one that is specified in the
    // methods dictionary. We need to create a new options object that is
    // a merged version of the options from the base class, and the one
    // that was specified in the methods dictionary.

    constructor.prototype.defaultOptions = $.extend( {}, baseClass.prototype.defaultOptions, methods.defaultOptions );

    // Now add it to our WebPro namespace.

    var nsArray = name.split( "." ),
        len = nsArray.length;
        namespace = ( len > 1 && nsArray[ 0 ] ) || "Widget",
        name = nsArray[ len - 1 ];

    WebPro[ namespace ][ name ] = constructor;
};

})( jQuery, WebPro, window, document );


/**
* wp-radio-group.js - version 0.1 - WebPro Release 0.1
*
* Copyright (c) 2012. Adobe Systems Incorporated.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*       * Redistributions of source code must retain the above copyright notice,
*             this list of conditions and the following disclaimer.
*       * Redistributions in binary form must reproduce the above copyright notice,
*             this list of conditions and the following disclaimer in the documentation
*             and/or other materials provided with the distribution.
*       * Neither the name of Adobe Systems Incorporated nor the names of its
*             contributors may be used to endorse or promote products derived from this
*             software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

(function( $, WebPro, window, document, undefined ){

// The RadioGroup widget is a class that manages the "checked" state for
// a group of buttons. The intent is to encapsulate this behavior in
// a re-useable class so that it can be used as the basis for other
// UI patterns, for example a Tab Group for tabbed panels or accordions.

WebPro.widget( "Widget.RadioGroup", WebPro.Widget, {
    _widgetName: "radio-group",

    defaultOptions: {
        defaultIndex: 0,
        hoverClass: "wp-radio-hover",
        downClass: "wp-radio-down",
        disabledClass: "wp-radio-disabled",
        checkedClass: "wp-radio-checked",
        disabled: false,
        toggleStateEnabled: false
    },

    _attachBehavior: function() {
        var self = this;

        this.buttons = [];
        this.activeElement = null;
        this.activeIndex = -1;

        // The $element property for our radio-group is actually a collection of all the
        // elements that are part of the radio-group.

        this.$element.each(function() {
            self.buttons.push( self._addButtonBehavior( this ) );
        });

        // Set up the disabled state across all buttons that are part of
        // the radio-group.

        this.disabled( this.options.disabled );

        // If a defaultIndex is specified, check the
        // corresponding button.

        var defaultIndex = this.options.defaultIndex;
        if ( typeof defaultIndex === "number" && defaultIndex >= 0 ) {
            this.checkButton( defaultIndex );
        }
    },

    _addButtonBehavior: function( ele ) {
        var self = this,
            btn = new WebPro.Widget.Button( ele, {
                hoverClass: this.options.hoverClass,
                downClass: this.options.downClass,
                disabledClass: this.options.disabledClass,
                callback: function( e ) {
                    return self._handleClick( e, btn, ele );
                }
            });

        return btn;
    },

    _handleClick: function( e, btn, ele ) {
        if ( !this.options.disabled ) {
            this.checkButton( ele );
        }
    },

    _getElementIndex: function( ele ) {
        return ele ? $.inArray( ele, this.$element.get() ) : -1;
    },

    _getElementByIndex: function( index ) {
        return this.$element.eq( index )[ 0 ];
    },
    
    _getElement: function( indexOrEle ) {
        return ( typeof indexOrEle === "number" ) ? this._getElementByIndex( indexOrEle ) : indexOrEle;
    },

    checkButton: function( indexOrEle ) {
        var ele = this._getElement( indexOrEle ),
            activeEle = this.activeElement,
            checkedClass = this.options.checkedClass;
        if ( ele ) {
            if ( ele !== activeEle ) {
                if ( activeEle ) {
                    $( activeEle ).removeClass( checkedClass );
                }
                $( ele ).addClass( checkedClass );
            } else if ( this.options.toggleStateEnabled ) {
                $( ele ).removeClass( checkedClass );
                ele = null;
            }

            this.activeElement = ele;
            this.activeIndex = this._getElementIndex( ele );
        }
    },

    disabled: function( val ) {
        if ( typeof val === "boolean" ) {
            this.options.disabled = val;
            $.each( this.buttons, function() {
                this.disabled( val );
            });
        }

        return this.options.disabled;
    }
});


// Add a convenience method to the jQuery Collection prototype,
// that applies our RadioGroup behavior to all the elements in the collection.

$.fn.wpRadioGroup = function( options ) {
    var rg = new WebPro.Widget.RadioGroup( this, options );
    return this;
};

})( jQuery, WebPro, window, document );


/**
* wp-tab-group.js - version 0.1 - WebPro Release 0.1
*
* Copyright (c) 2012. Adobe Systems Incorporated.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*       * Redistributions of source code must retain the above copyright notice,
*             this list of conditions and the following disclaimer.
*       * Redistributions in binary form must reproduce the above copyright notice,
*             this list of conditions and the following disclaimer in the documentation
*             and/or other materials provided with the distribution.
*       * Neither the name of Adobe Systems Incorporated nor the names of its
*             contributors may be used to endorse or promote products derived from this
*             software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

(function( $, WebPro, window, document, undefined ){

WebPro.widget( "Widget.TabGroup", WebPro.Widget.RadioGroup, {
    defaultOptions: {
        defaultIndex: 0,
        hoverClass: "wp-tab-hover",
        downClass: "wp-tab-down",
        disabledClass: "wp-tab-disabled",
        checkedClass: "wp-tab-active",
        disabled: false,
        toggleStateEnabled: false
    },

    selectTab: function( indexOrElement ) {
        this.checkButton( indexOrElement );
    },

    checkButton: function( indexOrElement ) {
        var ele = this._getElement( indexOrElement ),
            eleIndex = this._getElementIndex( ele ),
            data = { tab: ele, tabIndex: eleIndex };

        this.trigger( "wp-tab-before-select", data );

        WebPro.Widget.TabGroup.prototype._super.prototype.checkButton.apply( this, arguments );

        this.trigger( "wp-tab-select", data );
    }
});


// Add a convenience method to the jQuery Collection prototype,
// that applies our RadioGroup behavior to all the elements in the collection.

$.fn.wpTabGroup = function( options ) {
    var rg = new WebPro.Widget.TabGroup( this, options );
    return this;
};

})( jQuery, WebPro, window, document );


/**
* wp-panel-group.js - version 0.1 - WebPro Release 0.1
*
* Copyright (c) 2012. Adobe Systems Incorporated.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*       * Redistributions of source code must retain the above copyright notice,
*             this list of conditions and the following disclaimer.
*       * Redistributions in binary form must reproduce the above copyright notice,
*             this list of conditions and the following disclaimer in the documentation
*             and/or other materials provided with the distribution.
*       * Neither the name of Adobe Systems Incorporated nor the names of its
*             contributors may be used to endorse or promote products derived from this
*             software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

(function( $, WebPro, window, document, undefined ){

WebPro.widget( "Widget.PanelGroup", WebPro.Widget, {
    _widgetName: "panel-group",

    defaultOptions: {
        defaultIndex: 0,
        panelClass: "wp-panel",
        activeClass: "wp-panel-active",
        toggleStateEnabled: false,
        tabGroups: null
    },

    _setUp: function() {
        var self = this;

        this.tabGroups = [];
        this._tabCallback = function( e, data) {
            self._handleTabSelect( e, data );
        };

        this.showLock = 0;
        this.tabDriver = null;

        return WebPro.Widget.PanelGroup.prototype._super.prototype._setUp.apply( this, arguments );
    },

    _attachBehavior: function() {
        var self = this;

        this.activeElement = null;
        this.activeIndex = -1;

        this.$element.addClass( this.options.panelClass );

        // If a defaultIndex is specified, check the
        // corresponding button.

        var defaultIndex = this.options.defaultIndex;
        if ( typeof defaultIndex === "number" && defaultIndex >= 0 ) {
            this.showPanel( defaultIndex );
        }

        this.addTabGroup( this.options.tabGroups );
    },

    _getElementIndex: function( ele ) {
        return ele ? $.inArray( ele, this.$element.get() ) : -1;
    },

    _getElementByIndex: function( index ) {
        return this.$element.eq( index )[ 0 ];
    },
    
    _getElement: function( indexOrEle ) {
        return ( typeof indexOrEle === "number" ) ? this._getElementByIndex( indexOrEle ) : indexOrEle;
    },

    showPanel: function( indexOrEle ) {
        if ( !this.showLock ) {
            ++this.showLock;

            var ele = this._getElement( indexOrEle ),
                activeEle = this.activeElement,
                activeClass = this.options.activeClass;
            if ( ele ) {
                if ( ele !== activeEle ) {
                    var data = { panel: ele, panelIndex: this._getElementIndex( ele ) };

                    this.trigger( "wp-panel-before-show", data );

                    if ( activeEle ) {
                        this.hidePanel( activeEle );
                    }
                    $( ele ).addClass( activeClass );
                    this.activeElement = ele;
                    this.activeIndex = this._getElementIndex( ele );
    
                    var groups = this.tabGroups;
                    for ( var i = 0; i < groups.length; i++ ) {
                        var tg = groups[ i ];
                        if ( tg !== this.tabDriver ) {
                            tg.selectTab( this.activeIndex );
                        }
                    }

                    this.trigger( "wp-panel-show", data );
                } else if ( this.options.toggleStateEnabled ) {
                    this.hidePanel( ele );
                }
            }

            --this.showLock;
        }
    },

    hidePanel: function( indexOrEle ) {
        var ele = ( typeof indexOrEle === "number" ) ? this.$element.eq( indexOrEle )[ 0 ] : indexOrEle;
        if ( ele ) {
            var data = { panel: ele, panelIndex: this._getElementIndex( ele ) };

            this.trigger( "wp-panel-before-hide", data );

            $( ele ).removeClass( this.options.activeClass );
            if ( ele === this.activeElement ) {
                this.activeElement = null;
                this.activeIndex = -1;
            }

            this.trigger( "wp-panel-hide", data );
        }
    },

    _handleTabSelect: function( e, data ) {
        if ( !this.showLock ) {
            this.tabDriver = e.target;
            this.showPanel( data.tabIndex );
            this.tabDriver = null;
        }
    },

    addTabGroup: function( tabGroup ) {
        if ( tabGroup ) {
            tabGroup = WebPro.ensureArray( tabGroup );
            var len = tabGroup.length;
            for ( var i = 0; i < len; i++ ) {
                var tg = tabGroup[ i ];
                if ( $.inArray( this.tabGroups, tg ) === -1 ) {
                    this.tabGroups.push( tg );
                    tg.selectTab( this.activeIndex );
                    tg.bind( "wp-tab-select", this._tabCallback );
                }
            }
        }
    },

    removeTabGroup: function( tabGroup ) {
        tabGroup = WebPro.ensureArray( tabGroup );

        var len = tabGroup.length;

        for ( var i = 0; i < len; i++ ) {
            var tg = tabGroup[ i ]
                sets = this.tabGroups,
                loc = $.inArray( sets, tg );
            if ( loc !== -1 ) {
                sets.splice( loc, 1 );
            }
        }
    }
});


// Add a convenience method to the jQuery Collection prototype,
// that applies our RadioGroup behavior to all the elements in the collection.

$.fn.wpPanelGroup = function( options ) {
    var rg = new WebPro.Widget.PanelGroup( this, options );
    return this;
};

})( jQuery, WebPro, window, document );

