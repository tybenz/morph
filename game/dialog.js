/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

Game.Dialog = {
    'gary': {
        name: 'GARY',
        face: 'friend-man-closeup',
        dialog: [
            {
                prompt: 'Hey there, friend! How can I help you?',
                options: [
                    { text: 'I can\'t remember anything. Do you know what happened to me?', action: 'next' },
                    { text: 'Do you... know me?', action: 'skip' }
                ]
            },
            {
                prompt: 'Well, no I\'m not sure... Maybe try some other folks around town',
                options: [
                    { text: 'Alright, thanks.', action: 'exit' }
                ]
            },
            {
                prompt: 'Sure, I\'ve seen you around. You\'re that shape-shifter everyone loves.',
                options: [
                    { text: 'I can\'t remember anything. Do you know what happened to me?', action: 'prev' },
                ]
            }
        ]
    },
    'fred': {
        name: 'FRED',
        face: 'friend-monster-closeup',
        dialog: [
            {
                prompt: 'Howdy neighbor. What\'s the word?',
                options: [
                    { text: 'Hi there. I can\'t seem to remember anything. Can you help me?', action: 'next' },
                    { text: 'Okay. What\'s going on? I\'ve lost my memory', action: 'next' }
                ]
            },
            {
                prompt: 'Oh no! How terrible. I saw you not too long ago. You were headed to see THE KID',
                options: [
                    { text: 'Who\'s THE KID?', action: 'next' },
                    { text: 'And where can I find this KID?', action: 'next' }
                ]
            },
            {
                prompt: 'THE KID is our neighborhood\'s mad scientist. He lives EAST of town in his LAB',
                options: [
                    { text: 'You don\'t happen to have a MAP do you?', action: 'next' }
                ]
            },
            {
                prompt: 'No I don\'t. But maybe LLOYD has one. He likes to hang out by the pool here in town.',
                options: [
                    { text: 'Cool. Thanks for the info.', action: 'exit' }
                ]
            }
        ]
    },
    'lloyd': {
        name: 'LLOYD',
        face: 'friend-man-closeup',
        dialog: [
            {
                prompt: 'Why, hello there.',
                options: [
                    { text: 'Hey Lloyd. I don\'t have time to chat. I lost my memory and I need a MAP to find out how to get to THE KID\'s LAB', action: 'next' }
                ]
            },
            {
                prompt: 'Oh my! Well of course. Here\'s my MAP. Keep it. Good luck pal!',
                options: [
                    { text: 'Thanks. Bye.', action: 'exit' }
                ]
            }
        ]
    }
};

})( Game, Settings, window, document );
