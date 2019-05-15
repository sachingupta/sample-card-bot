# Steps to run locally
## Prerequisites

* Install Git for windows: https://git-for-windows.github.io/

* Clone this repo:<br>
    ```
    git clone 
    ```

* Install VSCode: https://code.visualstudio.com/  
    * NOTE: When installing, setting "open with" for the file and directory contexts can be helpful

* Install Node: https://nodejs.org/en/download/    

* Download the npm modules - in the microsoft-teams-bot-template directory run:<br>
    ```
    npm install
    ```
* Run bot locally
    1. `npm i`
    2. `npm dev`
    or
    1. `npm i`
    2. `npm build`
    3. `npm start`

* (Only needed if wanting to run in Microsoft Teams)<br>
Install some sort of tunnelling service. These instructions assume you are using ngrok: https://ngrok.com/

* (Only needed if wanting to run in the Bot Emulator)<br>
Install the Bot Framework V4 Emulator for your platform from the [GitHub releases](https://github.com/Microsoft/BotFramework-Emulator/releases/latest) page.

## Steps to see the bot running in the Bot Emulator<br> 
NOTE: Teams does not work nor render things exactly like the Bot Emulator - this method is meant as just a slightly easier way to see the project's bot running

* [Hack]: set botType=echoBot in .env file to run it as echoBot locally

* Download the Bot Framework V4 Emulator for your platform from the [GitHub releases](https://github.com/Microsoft/BotFramework-Emulator/releases/latest) page.

* Once the code is running (bar at the bottom will be orange), connect with the Bot Emulator to the default endpoint, "http://localhost:3978/api/messages", leaving "Microsoft App ID" and "Microsoft App Password" blank

Congratulations!!! You can now chat with the bot in the Bot Emulator!

## Steps to see the full app in Microsoft Teams

1. Begin your tunnelling service to get an https endpoint. For this example ngrok is used. Start an ngrok tunnel with the following command (you'll need the https endpoint for the bot registration):<br>
    ```
    ngrok http 3978 --host-header=localhost
    ```
    
2. Register a new bot (or update an existing one) with Bot Framework by using the https endpoint started by ngrok and the extension "/api/messages" as the full endpoint for the bot's "Messaging endpoint". e.g. "https://####abcd.ngrok.io/api/messages" - Bot registration is here (open in a new browser tab): https://dev.botframework.com/bots

    > **NOTE**: When you create your bot you will create an App ID and App password - make sure you keep these for later.

3. **Use bot in Teams as sideloaded app**: to use the bot as a sideloaded app in Microsoft Teams, please follow the steps:
    1. Modify `manifest.json` inside teams-app-manifest to assign a random GUID for `id` as Microsoft Teams App ID
    2. Assign `bots.botId` and `composeExtensions.botId` where the bot ID should be the one assigned in step 2
    3. Zip `manifest.json`, `icon-color.png` and `icon-outline.png` as an archived file. 
    4. Follow [instructions](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/apps/apps-upload) to sideload your bot into Teams.
    5. More instruction can be found [here](https://docs.microsoft.com/en-us/microsoftteams/platform/get-started/get-started-nodejs-app-studio) 

**Bot Builder SDK4 - Microsoft Teams Extensions**
https://github.com/OfficeDev/BotBuilder-MicrosoftTeams-node
