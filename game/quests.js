/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

// Game.Quests is our master list of all quests
// Each quest is an collection journal entries
// Each entry has a unique identifier for ease of use
// within dialog and collecting items,
// a string of text for te visual journal
// and an optional collection (array) of quest items

Game.Quests = {
    'main': {
        'title': 'Find yourself',
        'initial': {
            text: 'What happened to me? I can\'t remember anything. I have this sense of urgency. I have to found out more. I gotta find help.'
        },
        'kid': {
            text: 'I found out there is someone called THE KID that I used to associate with. Maybe if I can find him, he can help me remember who I am.'
        },
        'map': {
            text: 'Now that I have my MAP, I need to find this KID and see what he knows.',
            items: [ Game.Entity.Interactable.Map ]
        },
        'discs': {
            text: 'Talked to THE KID. He says I have to find some lost DISCS in order to be able to defeat GRUNGOR - the other shape shifter.'
        },
        'man': {
            text: 'Got my first SHAPE! It\'s called MAN. Gotta try it out.'
        }
    },
    'axe': {
        'title': 'Family cuts deep',
        'floyd': {
            text: 'Talked to FLOYD in Coppertown. He says his brother LLOYD (IRONTOWN) stole an axe of his. If I get it back for him, he promised a reward'
        }
    }
};

})( Game, Settings, window, document );
