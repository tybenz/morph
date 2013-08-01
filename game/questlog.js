/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

Game.Questlog = {
    log: {},
    push: function( questID, id ) {
        if ( !this.inLog( id ) ) {

            var questObj = Game.Quests[ questID ][ id ];

            this.log[ questID ] = this.log[ questID ] || [];
            this.log[ questID ].push({
                id: id,
                text: questObj.text,
                items: questObj.items
            });

            if ( questObj.items ) {
                for ( var i = 0, len = questObj.items.length; i < len; i++ ) {
                    Game.Inventory.push( questObj.items[i] );
                }
            }

        }
    },
    inLog: function( id ) {
        for ( var i in this.log ) {
            for ( var j = 0, len = this.log[i].length; j < len; j++ ) {
                if ( this.log[i][j].id == id ) {
                    return true;
                }
            }
        }

        return false;
    }
};

})( Game, Settings, window, document );
