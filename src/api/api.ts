import { CardFactory, ActionTypes, Attachment } from 'botbuilder'
import * as data from './generated.json'
import * as teams from 'botbuilder-teams';
import { adaptiveCardBody } from './adaptivecard';

// Function to handle query fomr bot and output a list of desired items as adaptive cards
export const handleQuery = (searchtext:string) => {
    const heroCard = getCustomAdaptiveCard(adaptiveCardBody);
    // Writing 'all' in the search bar will display all cards stored
    if (!searchtext || searchtext.toLowerCase() === 'all') {
        return (createPreviewList(data, heroCard))
    }
    // Writing anything else in the search bar will filter the displayed cards
    else {
        let queriedItems = [];
        data.forEach((item:any) => {
            if(item.title.toLowerCase().includes(searchtext.trim().toLowerCase())){
                queriedItems.push(item);
            }
        })
        return (createPreviewList(queriedItems, heroCard))
    }
} 

// Function to process a list of items into a list of cards for output
export const createPreviewList = (items:Array<any>, heroCard:any) => {
    let out = items.map((item:any) => {
        return ({
            ...heroCard,
            preview: CardFactory.thumbnailCard(item.title, item.subTitle,[item.heroImageSrc]),
        })
    })
    return out;
}

export const getCustomAdaptiveCard = (body: string) => {
    let adaptiveCard = teams.TeamsFactory.adaptiveCard({
        version: '1.0.0',
        type: 'AdaptiveCard',
        body: JSON.parse(body),
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
        return <teams.TaskModuleMessageResponse> {
            type: 'message',
            value: 'Thanks for your inputs!'
        }
    } else {
        return <teams.TaskModuleContinueResponse> {
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
        body: <any> [
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
            <teams.IAdaptiveCardAction> {
                type: 'Action.Submit',
                title: 'Next',
                data: {
                    done: false
                }
            },
            <teams.IAdaptiveCardAction> {
                type: 'Action.Submit',
                title: 'Submit',
                data: {
                    done: true
                }
            }
        ]
    })
}