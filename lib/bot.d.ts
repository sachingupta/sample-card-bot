import { TurnContext, BotState } from 'botbuilder';
export declare class TeamsBot {
    private readonly countAccessor;
    private readonly conversationState;
    private readonly activityProc;
    /**
     *
     * @param {ConversationState} conversation state object
     */
    constructor(conversationState: BotState);
    /**
     * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
     *
     * @param {TurnContext} context on turn context object.
     */
    run(turnContext: TurnContext): Promise<void>;
    /**
     *  Set up all activity handlers
     */
    private setupHandlers;
    private sendCards;
}
