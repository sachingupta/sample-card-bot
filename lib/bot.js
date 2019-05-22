"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const teams = require("botbuilder-teams");
const data = require("./generated.json");
// Turn counter property
const TURN_COUNTER = 'turnCounterProperty';
class TeamsBot {
    /**
     *
     * @param {ConversationState} conversation state object
     */
    constructor(conversationState) {
        this.activityProc = new teams.TeamsActivityProcessor();
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
    run(turnContext) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.activityProc.processIncomingActivity(turnContext);
        });
    }
    /**
     *  Set up all activity handlers
     */
    setupHandlers() {
        this.activityProc.messageActivityHandler = {
            onMessage: (ctx) => __awaiter(this, void 0, void 0, function* () {
                const teamsCtx = teams.TeamsContext.from(ctx);
                const text = teamsCtx.getActivityTextWithoutMentions() || '';
                switch (text.toLowerCase()) {
                    case 'cards':
                        yield this.sendCards(ctx);
                        break;
                    default:
                        let count = yield this.countAccessor.get(ctx);
                        count = count === undefined ? 1 : ++count;
                        yield this.countAccessor.set(ctx, count);
                        let activity = {
                            textFormat: 'xml',
                            text: `${count}: You said "${ctx.activity.text}"`
                        };
                        yield ctx.sendActivity(activity);
                        yield this.conversationState.saveChanges(ctx);
                }
            })
        };
        this.activityProc.invokeActivityHandler = {
            onMessagingExtensionQuery: (ctx, query) => __awaiter(this, void 0, void 0, function* () {
                console.log("FLAG 1");
                let heroCard = this.getAdaptiveCard();
                let in_list = data.default;
                let preview_list = in_list.map((item) => {
                    return ({
                        heroCard: heroCard,
                        preview: botbuilder_1.CardFactory.thumbnailCard(item.title, item.subTitle, [item.heroImageSrc]),
                    });
                });
                let response = {
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
            }),
            onMessagingExtensionFetchTask: (ctx, query) => __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve({
                    status: 200,
                    body: {
                        task: this.taskModuleResponse(query, false)
                    }
                });
            }),
            onMessagingExtensionSubmitAction: (ctx, query) => __awaiter(this, void 0, void 0, function* () {
                let body;
                let data = query.data;
                if (data && data.done) {
                    let sharedMessage = (query.commandId === 'shareMessage' && query.commandContext === 'message')
                        ? `Shared message: <div style="background:#F0F0F0">${JSON.stringify(query.messagePayload)}</div><br/>`
                        : '';
                    let preview = botbuilder_1.CardFactory.thumbnailCard('Created Card', `Your input: ${data.userText}`);
                    let heroCard = botbuilder_1.CardFactory.heroCard('Created Card', `${sharedMessage}Your input: <pre>${data.userText}</pre>`);
                    body = {
                        composeExtension: {
                            type: 'result',
                            attachmentLayout: 'list',
                            attachments: [
                                Object.assign({}, heroCard, { preview })
                            ]
                        }
                    };
                }
                else if (query.commandId === 'createWithPreview' || query.botMessagePreviewAction) {
                    if (!query.botMessagePreviewAction) {
                        body = {
                            composeExtension: {
                                type: 'botMessagePreview',
                                activityPreview: {
                                    attachments: [
                                        this.taskModuleResponseCard(query)
                                    ]
                                }
                            }
                        };
                    }
                    else {
                        let userEditActivities = query.botActivityPreview;
                        let card = userEditActivities
                            && userEditActivities[0]
                            && userEditActivities[0].attachments
                            && userEditActivities[0].attachments[0];
                        if (!card) {
                            body = {
                                task: {
                                    type: 'message',
                                    value: 'Missing user edit card. Something wrong on Teams client.'
                                }
                            };
                        }
                        else if (query.botMessagePreviewAction === 'send') {
                            body = undefined;
                            yield ctx.sendActivities([
                                { attachments: [card] }
                            ]);
                        }
                        else if (query.botMessagePreviewAction === 'edit') {
                            body = {
                                task: {
                                    type: 'continue',
                                    value: {
                                        card: card
                                    }
                                }
                            };
                        }
                    }
                }
                else {
                    body = {
                        task: this.taskModuleResponse(query, false)
                    };
                }
                return Promise.resolve({ status: 200, body });
            }),
            onTaskModuleFetch: (ctx, query) => __awaiter(this, void 0, void 0, function* () {
                const response = {
                    status: 200,
                    body: {
                        task: this.taskModuleResponse(query, false)
                    }
                };
                return Promise.resolve(response);
            }),
            onTaskModuleSubmit: (ctx, query) => __awaiter(this, void 0, void 0, function* () {
                const data = query.data;
                const response = {
                    status: 200,
                    body: {
                        task: this.taskModuleResponse(query, !!data.done)
                    }
                };
                return Promise.resolve(response);
            }),
            onAppBasedLinkQuery: (ctx, query) => __awaiter(this, void 0, void 0, function* () {
                let previewImg = botbuilder_1.CardFactory.images([{
                        url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
                    }]);
                let preview = botbuilder_1.CardFactory.thumbnailCard('Preview Card', `Your query URL: ${query.url}`, previewImg);
                let heroCard = botbuilder_1.CardFactory.heroCard('Preview Card', `Your query URL: <pre>${query.url}</pre>`, previewImg);
                const response = {
                    status: 200,
                    body: {
                        composeExtension: {
                            type: 'result',
                            attachmentLayout: 'list',
                            attachments: [
                                Object.assign({}, heroCard, { preview })
                            ]
                        }
                    }
                };
                return Promise.resolve(response);
            }),
            onInvoke: (ctx) => __awaiter(this, void 0, void 0, function* () {
                yield ctx.sendActivity({ textFormat: 'xml', text: `[General onInvoke] <pre>${JSON.stringify(ctx.activity, null, 2)}</pre>` });
                return { status: 200, body: { composeExtensions: {} } };
            })
        };
    }
    getAdaptiveCard() {
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
    }
    sendCards(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let adaptiveCard = this.getAdaptiveCard();
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
                        .taskModuleAction('Launch Task Module', { hiddenKey: 'hidden value from task module launcher' })
                        .toAdaptiveCardAction()
                ]
            });
            let taskModuleCard2 = teams.TeamsFactory.heroCard('Task Moddule Hero Card', undefined, [
                teams.TeamsFactory
                    .taskModuleAction('Launch Task Module', { hiddenKey: 'hidden value from task module launcher' })
                    .toAction()
            ]);
            yield ctx.sendActivities([
                { attachments: [adaptiveCard] },
                { attachments: [taskModuleCard1] },
                { attachments: [taskModuleCard2] }
            ]);
        });
    }
    taskModuleResponse(query, done) {
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
    }
    taskModuleResponseCard(data, textValue) {
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
    }
}
exports.TeamsBot = TeamsBot;
//# sourceMappingURL=bot.js.map