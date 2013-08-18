DragTracker = function( element, options ) {
    var self = this;

    this.element = element;

    this.options = $.extend( {}, DragTracker.prototype.defaultOptions, options );
    this.dragStarted = false;
    this.enabled = true;

    this.mdFunc = function( e, data ) { return self._startDrag( e, data); };
    this.mmFunc = function( e, data ) { return self._handleDrag( e, data); };
    this.muFunc = function( e, data ) { return self._stopDrag( e, data); };

    this.startX = 0;
    this.startY = 0;

    $( element ).bind( this.options.startEvent, this.mdFunc );
};

$.extend( DragTracker.prototype, {
    defaultOptions: {
        dragThreshold: 5,         // Must exceed this many pixels in any direction to start drag.
        ignoreX: false,           // If true don't report any changes in the x-direction.
        ignoreY: false,           // If true don't report any changes in the y-direction.
        dragStart: null,          // callback
        dragUpdate: null,         // callback
        dragStop: null,           // callback
        startEvent: "mousedown",  // Event that triggers the installation of drag handlers.
        updateEvent: "mousemove", // Event that triggers drag update events.
        stopEvent: "mouseup",     // Event that triggers the end of a drag.
        eventXProp: "pageX",      // The name of the event's x property value to use.
        eventYProp: "pageY"       // The name of the event's y property value to use.
    },

    enable: function() {
        this.enabled = true;
    },

    disable: function() {
        this.enabled = false;
        this._removeDragHandlers();
    },

    dragStart: function( dx, dy ) {
        // Base class implementation simply calls
        // any callback defined.

        var o = this.options;
        if ( o.dragStart ) {
            o.dragStart( this, dx, dy );
        }
    },

    dragUpdate: function( dx, dy ) {
        // Base class implementation simply calls
        // any callback defined.

        var o = this.options;
        if ( o.dragUpdate ) {
            o.dragUpdate( this, dx, dy );
        }
    },

    dragStop: function( dx, dy ) {
        // Base class implementation simply calls
        // any callback defined.

        var o = this.options;
        if ( o.dragStop ) {
            o.dragStop( this, dx, dy );
        }
    },

    _installDragHandlers: function() {
        var opts = this.options;
        $( document )
            .bind( opts.updateEvent, this.mmFunc )
            .bind( opts.stopEvent, this.muFunc );
    },

    _removeDragHandlers: function() {
        var opts = this.options;
        $( document )
            .unbind( opts.updateEvent, this.mmFunc )
            .unbind( opts.stopeEvent, this.muFunc );
    },

    _startDrag: function( e, data ) {
        if ( !this.enabled ) {
            return;
        }

        this.dragStarted = false;
        this.startX = e[ this.options.eventXProp ];
        this.startY = e[ this.options.eventYProp ];

        this._installDragHandlers();

        return false;
    },

    _handleDrag: function( e, data ) {
        var dx = e[ this.options.eventXProp ] - this.startX,
            dy = e[ this.options.eventYProp ] - this.startY,
            o = this.options;

        if ( !this.dragStarted ) {
            if ( ( !o.ignoreX && Math.abs( dx ) < o.dragThreshold ) && ( !o.ignoreY && Math.abs( dy ) < o.dragThreshold ) ) {
                return false;
            }

            this.dragStarted = true;

            this.dragStart( 0, 0 );
        }

        this.dragUpdate( o.ignoreX ? 0 : dx, o.ignoreY ? 0 : dy );

        return false;
    },

    _stopDrag: function( e, data ) {
        this._removeDragHandlers();

        if ( this.dragStarted ) {
            var dx = e[ this.options.eventXProp ] - this.startX,
                dy = e[ this.options.eventYProp ] - this.startY,
                o = this.options;

            this.dragStop( o.ignoreX ? 0 : dx, o.ignoreY ? 0 : dy );
        }

        this.dragStarted = false;

        return false;
    }
});
