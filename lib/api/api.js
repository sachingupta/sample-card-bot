"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const data = require("./MOCK_DATA.json");
const teams = require("botbuilder-teams");
const adaptivecard_1 = require("./adaptivecard");
// Function to handle query fomr bot and output a list of desired items as adaptive cards
exports.handleQuery = (searchtext) => {
    // Writing 'all' in the search bar will display all cards stored
    if (!searchtext || searchtext.toLowerCase() === 'all') {
        return (exports.createPreviewList(data));
    }
    // Writing anything else in the search bar will filter the displayed cards
    else {
        let queriedItems = [];
        data.forEach((item) => {
            if (item.firstName.toLowerCase().includes(searchtext.trim().toLowerCase()) ||
                item.lastName.toLowerCase().includes(searchtext.trim().toLowerCase())) {
                queriedItems.push(item);
            }
        });
        return (exports.createPreviewList(queriedItems));
    }
};
// Function to process a list of items into a list of cards for output
exports.createPreviewList = (items) => {
    let out = items.map((item, index) => {
        const adaptiveCard = adaptivecard_1.getCustomAdaptiveCardPatient(item);
        const heroCard = botbuilder_1.CardFactory.heroCard(`${item.firstName} ${item.lastName}`, item.diagnosis, [`https://robohash.org/${item.firstName.toLowerCase()}.png?set=set5`]);
        heroCard.content.subTitle = item.appointmentDate;
        return (Object.assign({}, adaptiveCard, { preview: heroCard }));
    });
    return out;
};
exports.getCustomAdaptiveCard = (body) => {
    const actions1 = [
        teams.TeamsFactory.adaptiveCardAction({
            type: botbuilder_1.ActionTypes.ImBack,
            title: 'imBack',
            value: 'text'
        }),
        teams.TeamsFactory.adaptiveCardAction({
            type: 'invoke',
            title: 'invoke',
            value: { key: 'value' }
        }),
        {
            "type": "Action.OpenUrl",
            "title": "OpenUrl",
            "url": "http://adaptivecards.io"
        },
        {
            "type": "Action.Submit",
            "title": "Action.Submit",
            "data": {
                "x": 13
            }
        },
        {
            "type": "Action.ShowCard",
            "title": "ShowCard (Set due date)",
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "Input.Date",
                        "id": "dueDate"
                    }
                ],
                "actions": [
                    {
                        "type": "Action.Submit",
                        "title": "OK"
                    }
                ]
            }
        },
        {
            "type": "Action.Submit",
            "title": "signin",
            "data": {
                "msteams": {
                    "type": "signin",
                    "value": "https://signin.com"
                }
            }
        }
    ];
    const action2 = [
        teams.TeamsFactory.adaptiveCardAction({
            type: botbuilder_1.ActionTypes.ImBack,
            title: 'imBack',
            value: 'text'
        }),
        teams.TeamsFactory.adaptiveCardAction({
            type: botbuilder_1.ActionTypes.MessageBack,
            title: 'message back',
            value: { key: 'value' },
            text: 'text received by bots',
            displayText: 'text display to users',
        }),
        teams.TeamsFactory.adaptiveCardAction({
            type: 'invoke',
            title: 'invoke',
            value: { key: 'value' }
        }),
        {
            "type": "Action.OpenUrl",
            "title": "OpenUrl",
            "url": "http://adaptivecards.io"
        },
        {
            "type": "Action.OpenUrl",
            "title": "JSON Tab",
            "url": 'https://teams.microsoft.com/l/task/300639bf-2c0f-41a7-aa2e-7833664c4c76?&title=First%20Page&url=https%3A%2F%2Fteams-json-tab.azurewebsites.net%2F%3Ftheme%3D%257Btheme%257D%26frameContext%3Dcontent'
        }
    ];
    let adaptiveCard = teams.TeamsFactory.adaptiveCard({
        version: '1.0.0',
        type: 'AdaptiveCard',
        body: JSON.parse(body),
        actions: actions1
    });
    return adaptiveCard;
};
exports.getCustomAdaptiveCard2 = (body) => {
    const action2 = [
        teams.TeamsFactory.adaptiveCardAction({
            type: botbuilder_1.ActionTypes.ImBack,
            title: 'imBack',
            value: 'text'
        }),
        teams.TeamsFactory.adaptiveCardAction({
            type: botbuilder_1.ActionTypes.MessageBack,
            title: 'message back',
            value: { key: 'value' },
            text: 'text received by bots',
            displayText: 'text display to users',
        }),
        teams.TeamsFactory.adaptiveCardAction({
            type: 'invoke',
            title: 'invoke',
            value: { key: 'value' }
        }),
        {
            "type": "Action.OpenUrl",
            "title": "OpenUrl",
            "url": "http://adaptivecards.io"
        },
        {
            "type": "Action.Submit",
            "title": "Action.Submit",
            "data": {
                "x": 13
            }
        },
        {
            "type": "Action.ShowCard",
            "title": "ShowCard (Set due date)",
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "Input.Date",
                        "id": "dueDate"
                    }
                ],
                "actions": [
                    {
                        "type": "Action.Submit",
                        "title": "OK"
                    }
                ]
            }
        },
        {
            "type": "Action.Submit",
            "title": "signin",
            "data": {
                "msteams": {
                    "type": "signin",
                    "value": "https://signin.com"
                }
            }
        },
        {
            "type": "Action.OpenUrl",
            "title": "JSON Tab",
            "url": 'https://teams.microsoft.com/l/task/300639bf-2c0f-41a7-aa2e-7833664c4c76?&title=First%20Page&url=https%3A%2F%2Fteams-json-tab.azurewebsites.net%2F%3Ftheme%3D%257Btheme%257D%26frameContext%3Dcontent'
        }
    ];
    let adaptiveCard = teams.TeamsFactory.adaptiveCard({
        version: '1.0.0',
        type: 'AdaptiveCard',
        body: JSON.parse(body),
        actions: action2
    });
    return adaptiveCard;
};
exports.getAdaptiveCard = () => {
    let adaptiveCard = teams.TeamsFactory.adaptiveCard({
        version: '1.0.0',
        type: 'AdaptiveCard',
        body: [{
                type: 'TextBlock',
                text: 'Bot Builder actions',
                size: 'large',
                weight: 'bolder'
            }],
        actions: [
            teams.TeamsFactory.adaptiveCardAction({
                type: botbuilder_1.ActionTypes.ImBack,
                title: 'imBack',
                value: 'text'
            }),
            teams.TeamsFactory.adaptiveCardAction({
                type: botbuilder_1.ActionTypes.MessageBack,
                title: 'message back',
                value: { key: 'value' },
                text: 'text received by bots',
                displayText: 'text display to users',
            }),
            teams.TeamsFactory.adaptiveCardAction({
                type: 'invoke',
                title: 'invoke',
                value: { key: 'value' }
            }),
            teams.TeamsFactory.adaptiveCardAction({
                type: botbuilder_1.ActionTypes.Signin,
                title: 'signin',
                value: process.env.host + '/auth/teams-test-auth-state'
            })
        ]
    });
    return adaptiveCard;
};
exports.taskModuleResponse = (query, done) => {
    if (done) {
        return {
            type: 'message',
            value: 'Thanks for your inputs!'
        };
    }
    else {
        return {
            type: 'continue',
            value: {
                title: 'More Page',
                card: this.taskModuleResponseCard(query, (query.data && query.data.userText) || undefined)
            }
        };
    }
};
exports.taskModuleResponseCard = (data, textValue) => {
    return teams.TeamsFactory.adaptiveCard({
        version: '1.0.0',
        type: 'AdaptiveCard',
        body: [
            {
                type: 'TextBlock',
                text: `Your request:`,
                size: 'large',
                weight: 'bolder'
            },
            {
                type: 'Container',
                style: 'emphasis',
                items: [
                    {
                        type: 'TextBlock',
                        text: JSON.stringify(data),
                        wrap: true
                    }
                ]
            },
            {
                type: 'Input.Text',
                id: 'userText',
                placeholder: 'Type text here...',
                value: textValue
            }
        ],
        actions: [
            {
                type: 'Action.Submit',
                title: 'Next',
                data: {
                    done: false
                }
            },
            {
                type: 'Action.Submit',
                title: 'Submit',
                data: {
                    done: true
                }
            }
        ]
    });
};
//# sourceMappingURL=api.js.map