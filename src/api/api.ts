import { CardFactory, ActionTypes, Attachment } from 'botbuilder'
import * as data from './MOCK_DATA.json'
import * as teams from 'botbuilder-teams';
import { adaptiveCardBody, IPatient, createAdaptiveCard } from './adaptivecard';

// Function to handle query fomr bot and output a list of desired items as adaptive cards
export const handleQuery = (searchtext: string) => {
    // Writing 'all' in the search bar will display all cards stored
    if (!searchtext || searchtext.toLowerCase() === 'all') {
        return (createPreviewList(data))
    }
    // Writing anything else in the search bar will filter the displayed cards
    else {
        let queriedItems = [];
        data.forEach((item: IPatient) => {
            if (
                item.firstName.toLowerCase().includes(searchtext.trim().toLowerCase()) || 
                item.lastName.toLowerCase().includes(searchtext.trim().toLowerCase())
                ) {
                queriedItems.push(item);
            }
        })
        return (createPreviewList(queriedItems))
    }
}

// Function to process a list of items into a list of cards for output
export const createPreviewList = (items: Array<IPatient>) => {
    let out = items.map((item: IPatient, index: number) => {
        const heroCard = getCustomAdaptiveCard(adaptiveCardBody);
        return ({
            ...heroCard,
            preview: CardFactory.thumbnailCard(`${item.firstName} ${item.lastName}`, item.diagnosis, [`https://robohash.org/${item.firstName}.png?set=set5`]),
        })
    })
    return out;
}

export const getCustomAdaptiveCard = (body: string) => {
    const actions1 = [
        teams.TeamsFactory.adaptiveCardAction({
            type: ActionTypes.ImBack,
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
            type: ActionTypes.ImBack,
            title: 'imBack',
            value: 'text'
        }),
        teams.TeamsFactory.adaptiveCardAction({
            type: ActionTypes.MessageBack,
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
        actions: actions1 as any
    });
    return adaptiveCard;
}

export const getCustomAdaptiveCard2 = (body: string) => {
    const action2 = [
        teams.TeamsFactory.adaptiveCardAction({
            type: ActionTypes.ImBack,
            title: 'imBack',
            value: 'text'
        }),
        teams.TeamsFactory.adaptiveCardAction({
            type: ActionTypes.MessageBack,
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
        actions: action2 as any
    });
    return adaptiveCard;
}

export const getAdaptiveCard = () => {
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
                type: ActionTypes.ImBack,
                title: 'imBack',
                value: 'text'
            }),
            teams.TeamsFactory.adaptiveCardAction({
                type: ActionTypes.MessageBack,
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
                type: ActionTypes.Signin,
                title: 'signin',
                value: process.env.host + '/auth/teams-test-auth-state'
            })
        ]
    });
    return adaptiveCard;
}

export const taskModuleResponse = (query: any, done: boolean): teams.TaskModuleResponseBase => {
    if (done) {
        return <teams.TaskModuleMessageResponse>{
            type: 'message',
            value: 'Thanks for your inputs!'
        }
    } else {
        return <teams.TaskModuleContinueResponse>{
            type: 'continue',
            value: {
                title: 'More Page',
                card: this.taskModuleResponseCard(query, (query.data && query.data.userText) || undefined)
            }
        };
    }
}

export const taskModuleResponseCard = (data: any, textValue?: string): Attachment => {
    return teams.TeamsFactory.adaptiveCard({
        version: '1.0.0',
        type: 'AdaptiveCard',
        body: <any>[
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
            <teams.IAdaptiveCardAction>{
                type: 'Action.Submit',
                title: 'Next',
                data: {
                    done: false
                }
            },
            <teams.IAdaptiveCardAction>{
                type: 'Action.Submit',
                title: 'Submit',
                data: {
                    done: true
                }
            }
        ]
    })
}
