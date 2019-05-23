"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const data = require("./generated.json");
const teams = require("botbuilder-teams");
const adaptivecard_1 = require("./adaptivecard");
// Function to handle query fomr bot and output a list of desired items as adaptive cards
exports.handleQuery = (searchtext) => {
    const heroCard = exports.getCustomAdaptiveCard(adaptivecard_1.adaptiveCardBody);
    // Writing 'all' in the search bar will display all cards stored
    if (!searchtext || searchtext.toLowerCase() === 'all') {
        return (exports.createPreviewList(data, heroCard));
    }
    // Writing anything else in the search bar will filter the displayed cards
    else {
        let queriedItems = [];
        data.forEach((item) => {
            if (item.title.toLowerCase().includes(searchtext.trim().toLowerCase())) {
                queriedItems.push(item);
            }
        });
        return (exports.createPreviewList(queriedItems, heroCard));
    }
};
// Function to process a list of items into a list of cards for output
exports.createPreviewList = (items, heroCard) => {
    let out = items.map((item) => {
        return (Object.assign({}, heroCard, { preview: botbuilder_1.CardFactory.thumbnailCard(item.title, item.subTitle, [item.heroImageSrc]) }));
    });
    return out;
};
exports.getCustomAdaptiveCard = (body) => {
    let adaptiveCard = teams.TeamsFactory.adaptiveCard({
        version: '1.0.0',
        type: 'AdaptiveCard',
        body: JSON.parse(body),
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