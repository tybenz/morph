/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var INIT_MAX_CURRENCY = Settings.initialMaxCurrency,
    INIT_MAX_HEALTH = Settings.initialMaxHealth;

Game.Inventory = {
    currency: 0,
    items: [], //array of items collected
    health: INIT_MAX_HEALTH,
    maxHealth: INIT_MAX_HEALTH,
    maxCurrency: INIT_MAX_CURRENCY,
    decrementHealth: function() {
        if ( this.health > 0 ) {
            this.health--;
        }
    },
    incrementHealth: function() {
        if ( this.health < this.maxHealth ) {
            this.health++;
        }
    },
    decrementCurrency: function() {
        if ( this.currency > 0 ) {
            this.currency--;
        }
    },
    incrementCurrency: function() {
        if ( this.currency < this.maxCurrency ) {
            this.currency++;
        }
    },
    push: function( item ) {
        var instance;

        if ( typeof item == 'function' ) {
            instance = new item;
        } else {
            instance = item;
        }

        if ( !this.inInventory( instance ) ) {
            this.items.push( instance );
        }
    },
    inInventory: function( item ) {
        var instance;

        if ( typeof item == 'function' ) {
            instance = new item;
        } else {
            instance = item;
        }

        for ( var i = 0, len = this.items.length; i < len; i++ ) {
            if ( this.items[i].type == instance.type ) {
                return true;
            }
        }

        return false;
    }
};

})( Game, Settings, window, document );
