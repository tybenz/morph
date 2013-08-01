/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

Game.Questlog = {
    log: {},
    push: function( questID, id ) {
        if ( !this.inLog( id ) ) {

            var questTitle = Game.Quests[ questID ].title,
                questEntry = Game.Quests[ questID ][ id ];

            this.log[ questID ] = this.log[ questID ] || { entries: [] };
            this.log[ questID ].title = questTitle;
            this.log[ questID ].entries.push({
                id: id,
                text: questEntry.text,
                items: questEntry.items
            });

            if ( questEntry.items ) {
                for ( var i = 0, len = questEntry.items.length; i < len; i++ ) {
                    Game.Inventory.push( questEntry.items[i] );
                }
            }

        }
    },
    inLog: function( id ) {
        for ( var i in this.log ) {
            for ( var j = 0, len = this.log[i].entries.length; j < len; j++ ) {
                if ( this.log[i].entries[j].id == id ) {
                    return true;
                }
            }
        }

        return false;
    }
};

})( Game, Settings, window, document );
