// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { StatePropertyAccessor, TurnContext, CardFactory, BotState, Activity, ActionTypes, Attachment } from 'botbuilder';
import * as teams from 'botbuilder-teams';
import { handleQuery, getAdaptiveCard, taskModuleResponse, taskModuleResponseCard } from './api/api.js';
import * as unirest from 'unirest';
// Turn counter property
const TURN_COUNTER = 'turnCounterProperty';

export class TeamsBot {
    private readonly countAccessor: StatePropertyAccessor<number>;
    private readonly conversationState: BotState;
    private readonly activityProc = new teams.TeamsActivityProcessor();

    /**
     * 
     * @param {ConversationState} conversation state object
     */
    constructor (conversationState: BotState) {
        // Create a new state accessor property. See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors.        
        this.countAccessor = conversationState.createProperty(TURN_COUNTER);
        this.conversationState = conversationState;
        this.setupHandlers();
    }

    /**
     * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
     * 
     * @param {TurnContext} context on turn context object.
     */
    async run(turnContext: TurnContext) {
        await this.activityProc.processIncomingActivity(turnContext);
    }

    /**
     *  Set up all activity handlers
     */
    private setupHandlers () {
        this.activityProc.messageActivityHandler = {
            onMessage: async (ctx: TurnContext) => {
                const teamsCtx = teams.TeamsContext.from(ctx);
                const text = teamsCtx.getActivityTextWithoutMentions() || '';

                switch (text.toLowerCase()) {
                    case 'cards':
                        await this.sendCards(ctx);
                        break;
                    
                    default:
                        let count = await this.countAccessor.get(ctx);
                        count = count === undefined ? 1 : ++count;
                        await this.countAccessor.set(ctx, count);

                        let activity: Partial<Activity> = {
                            textFormat: 'xml',
                            text: `${ count }: You said "${ ctx.activity.text }"`
                        };
                        await ctx.sendActivity(activity);
                        await this.conversationState.saveChanges(ctx);
                }            
            }
        };

        this.activityProc.invokeActivityHandler = {
            onMessagingExtensionQuery: async (ctx: TurnContext, query: teams.MessagingExtensionQuery) => {
                type R = teams.InvokeResponseTypeOf<'onMessagingExtensionQuery'>;

                // Extract the search text from the query information
                let searchtext = '';
                if( query.parameters && query.parameters[0]) {
                    if(query.parameters[0].name === 'initialRun') {
                        searchtext = '';
                    }
                    else if(query.parameters[0].value) {
                        searchtext = query.parameters[0].value;
                    }
                }
                
                // Create an AdaptiveCard instance to send as response

                // Call handleQuery function to generate the list of preview cards
                let preview_list = handleQuery(searchtext);
                let response: R = {
                    status: 200,
                    body: {
                        composeExtension: {
                            type: 'result',
                            attachmentLayout: 'list',
                            attachments: preview_list
                        }
                    }
                };

                return Promise.resolve(response);
            },

            onMessagingExtensionFetchTask: async (ctx: TurnContext, query: teams.MessagingExtensionAction) => {
                type R = teams.InvokeResponseTypeOf<'onMessagingExtensionFetchTask'>;
                return Promise.resolve(<R> {
                    status: 200,
                    body: {
                        task: taskModuleResponse(query, false)
                    }
                });
            },

            onMessagingExtensionSubmitAction: async (ctx: TurnContext, query: teams.MessagingExtensionAction) => {
                type R = teams.InvokeResponseTypeOf<'onMessagingExtensionSubmitAction'>;
                let body: R['body'];
                let data = query.data;
                if (data && data.done) {
                    let sharedMessage = (query.commandId === 'shareMessage' && query.commandContext === 'message')
                        ? `Shared message: <div style="background:#F0F0F0">${JSON.stringify(query.messagePayload)}</div><br/>`
                        : '';
                    let preview = CardFactory.thumbnailCard('Created Card', `Your input: ${data.userText}`);
                    let heroCard = CardFactory.heroCard('Created Card', `${sharedMessage}Your input: <pre>${data.userText}</pre>`);
                    body = {
                        composeExtension: {
                            type: 'result',
                            attachmentLayout: 'list',
                            attachments: [
                                { ...heroCard, preview }
                            ]
                        }
                    }
                } else if (query.commandId === 'createWithPreview' || query.botMessagePreviewAction) {
                    if (!query.botMessagePreviewAction) {
                        body = {
                            composeExtension: {
                                type: 'botMessagePreview',
                                activityPreview: <Activity> {
                                    attachments: [
                                        taskModuleResponseCard(query)
                                    ]
                                }
                            }
                        }    
                    } else {
                        let userEditActivities = query.botActivityPreview;
                        let card = userEditActivities 
                                && userEditActivities[0] 
                                && userEditActivities[0].attachments 
                                && userEditActivities[0].attachments[0];
                        if (!card) {
                            body = {
                                task: <teams.TaskModuleMessageResponse> {
                                    type: 'message',
                                    value: 'Missing user edit card. Something wrong on Teams client.'
                                }
                            }
                        } else if (query.botMessagePreviewAction === 'send') {
                            body = undefined;
                            await ctx.sendActivities([
                                { attachments: [card] }
                            ]);
                        } else if (query.botMessagePreviewAction === 'edit') {
                            body = {
                                task: <teams.TaskModuleContinueResponse> {
                                    type: 'continue',
                                    value: {
                                        card: card
                                    }
                                }
                            }
                        }
                    }
                } else {
                    body = {
                        task: taskModuleResponse(query, false)
                    }
                }
                return Promise.resolve({ status: 200, body });
            },

            onTaskModuleFetch: async (ctx: TurnContext, query: teams.TaskModuleRequest) => {
                type R = teams.InvokeResponseTypeOf<'onTaskModuleFetch'>;
                const response: R = {
                    status: 200,
                    body: {
                        task: taskModuleResponse(query, false)
                    }
                };
                return Promise.resolve(response);
            },

            onTaskModuleSubmit: async (ctx: TurnContext, query: teams.TaskModuleRequest) => {
                type R = teams.InvokeResponseTypeOf<'onTaskModuleSubmit'>;
                const data = query.data;
                const response: R = {
                    status: 200,
                    body: {
                        task: taskModuleResponse(query, !!data.done)
                    }
                };
                return Promise.resolve(response);
            },

            onAppBasedLinkQuery: async (ctx: TurnContext, query: teams.AppBasedLinkQuery) => {
                type R = teams.InvokeResponseTypeOf<'onAppBasedLinkQuery'>;
                let previewImg = CardFactory.images([{
                    url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
                }]);
                let preview = CardFactory.thumbnailCard('Preview Card', `Your query URL: ${query.url}`, previewImg);
                let heroCard = CardFactory.heroCard('Preview Card', `Your query URL: <pre>${query.url}</pre>`, previewImg);
                const response: R = {
                    status: 200,
                    body: {
                        composeExtension: {
                            type: 'result',
                            attachmentLayout: 'list',
                            attachments: [
                                { ...heroCard, preview }
                            ]
                        }
                    }
                };
                return Promise.resolve(response);
            },

            onInvoke: async (ctx: TurnContext) => {
                await ctx.sendActivity({ textFormat: 'xml', text: `[General onInvoke] <pre>${JSON.stringify(ctx.activity, null, 2)}</pre>`});
                return { status: 200, body: { composeExtensions: {} } };
            }
        };
    }

    private async sendCards (ctx: TurnContext) {
        let adaptiveCard = getAdaptiveCard();

        let taskModuleCard1 = teams.TeamsFactory.adaptiveCard({
            version: '1.0.0',
            type: 'AdaptiveCard',
            body: [{
                type: 'TextBlock',
                text: 'Task Module Adaptive Card',
                size: 'large',
                weight: 'bolder'
            }],
            actions: [
                teams.TeamsFactory
                    .taskModuleAction('Launch Task Module', {hiddenKey: 'hidden value from task module launcher'})
                    .toAdaptiveCardAction()
            ]
        });

        let taskModuleCard2 = teams.TeamsFactory.heroCard('Task Moddule Hero Card', undefined, [
            teams.TeamsFactory
                .taskModuleAction('Launch Task Module', {hiddenKey: 'hidden value from task module launcher'})
                .toAction()
        ]);

        await ctx.sendActivities([
            { attachments: [adaptiveCard] },
            { attachments: [taskModuleCard1] },
            { attachments: [taskModuleCard2] }
        ]);
    } 
}
