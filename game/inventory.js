/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Inventory = {
    currency: 0,
    items: [], //array of items collected
    health: 10,
    maxHealth: 10,
    maxCurrency: 25,
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
