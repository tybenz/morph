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
    }
};

})( Game, Settings, window, document );
