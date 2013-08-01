/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

Game.Dialog = {
    'gary': {
        name: 'GARY',
        face: 'friend-man-closeup',
        dialog: {
            'default': [
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
        }
    },
    'fred': {
        name: 'FRED',
        face: 'friend-monster-closeup',
        dialog: {
            'default': [
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
                    questlog: { questID: 'main', id: 'kid' },
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
        }
    },
    'lloyd': {
        name: 'LLOYD',
        face: 'friend-man-closeup',
        dialog: {
            'default': [
                {
                    prompt: 'Why, hello there.',
                    options: [
                        { text: 'Hello. I can\'t seem to remember anything. Can you help me?', action: 'next' }
                    ]
                },
                {
                    prompt: 'Oh um. Maybe go and see THE KID. I used to see you and him together a lot.',
                    options: [
                        { text: 'Who\'s THE KID?', action: 'next' },
                        { text: 'And where can I find this KID?', action: 'next' }
                    ]
                },
                {
                    prompt: 'THE KID is our neighborhood\'s mad scientist. He lives EAST of town in his LAB.',
                    options: [
                        { text: 'EAST huh? Mind giving more specific directions?', action: 'next' }
                    ]
                },
                {
                    prompt: 'Here\'s a MAP to help you find the place.',
                    questlog: { questID: 'main', id: 'map' },
                    options: [
                        { text: 'Thanks Lloyd.', action: 'exit' },
                    ]
                }
            ],
            'floyd': [
                {
                    prompt: 'Hey there. Have I told you that I have a brother named FLOYD?',
                    options: [
                        { text: 'Yeah I know. I\'ve met him. He claims you stole something from him.', action: 'next' },
                        { text: 'Cut the crap LLOYD. You stole his AXE. Give it back.', action: 'skip' },
                        { text: 'No, and I dont\' care.', action: 'exit' }
                    ]
                },
                {
                    prompt: 'Man, that guy won\'t let it go. I borrowed his AXE one time. But something went wrong.',
                    options: [
                        { text: 'What?',  action: 'skip' }
                    ]
                },
                {
                    prompt: 'Whoa! Hang on. I borrowed it! But I don\'t have it anymore.',
                    options: [
                        { text: 'What?', action: 'next' }
                    ]
                },
                {
                    prompt: 'A bunch of those monsters stole it and carried it off.',
                    options: [
                        { text: 'Why didn\'t you just tell FLOYD that\'s what happened?', action: 'next' }
                    ]
                },
                {
                    prompt: 'I tried. But he was convinced I had stolen it and hidden it. Maybe you could get it back!',
                    options: [
                        { text: 'What\'s in it for me?', action: 'next' },
                        { text: 'Ugh... sure why not?', action: 'skip' },
                        { text: 'Sorry. I\'m too busy at the moment', action: 'exit' }
                    ]
                },
                {
                    prompt: 'Helping to reunite 2 long-lost brothers isn\'t enough? Fine, I\'ll pay 100 coins.',
                    options: [
                        { text: 'Okay, I\'ll do it. Now where exactly did these monsters head off to?', action: 'next' },
                        { text: 'Sorry. I\'m too busy at the moment', action: 'exit' }
                    ]
                },
                {
                    prompt: 'Great! I followed them for a bit. Think they were headed to a fortress called GLO-GATH.',
                    options: [
                        { text: 'Sounds like a nice place... I\'ll bring back that AXE soon.', action: 'exit' }
                    ]
                }
            ],
            'kid': [
                {
                    prompt: 'Why, hello there.',
                    options: [
                        { text: 'Hey Lloyd. I don\'t have time to chat. I lost my memory and I need a MAP to find out how to get to THE KID\'s LAB. Do you have one?', action: 'next' }
                    ]
                },
                {
                    prompt: 'Oh my! Well of course. Here\'s my MAP. Keep it. Good luck pal!',
                    questlog: { questID: 'main', id: 'map' },
                    options: [
                        { text: 'Thanks. Bye.', action: 'exit' }
                    ]
                }
            ]
        }
    }
};

})( Game, Settings, window, document );
