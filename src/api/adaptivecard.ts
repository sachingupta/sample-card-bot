import { IAdaptiveCard } from "adaptivecards";
import * as teams from 'botbuilder-teams';
import { ActionTypes } from "botbuilder";
export const adaptiveCardBody: string = `[
    {
      "type": "Container",
      "items": [
        {
          "type": "TextBlock",
          "text": "Publish Adaptive Card schema",
          "weight": "bolder",
          "size": "medium"
        },
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "width": "auto",
              "items": [
                {
                  "type": "Image",
                  "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                  "size": "small",
                  "style": "person"
                }
              ]
            },
            {
              "type": "Column",
              "width": "stretch",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Matt Hidinger",
                  "weight": "bolder",
                  "wrap": true
                },
                {
                  "type": "TextBlock",
                  "spacing": "none",
                  "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                  "isSubtle": true,
                  "wrap": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "Container",
      "items": [
        {
          "type": "TextBlock",
          "text": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
          "wrap": true
        },
        {
          "type": "FactSet",
          "facts": [
            {
              "title": "Board:",
              "value": "Adaptive Card"
            },
            {
              "title": "List:",
              "value": "Backlog"
            },
            {
              "title": "Assigned to:",
              "value": "Matt Hidinger"
            },
            {
              "title": "Due date:",
              "value": "Not set"
            }
          ]
        }
      ]
    }
  ]`;


export interface IPatient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  patientNumber: string;
  emergencyContact: string;
  doctor: string;
  bloodType: string;
  admissionDate: string;
  diagnosis: string;
  status: string;
  appointmentDate: string;
}


export const getCustomAdaptiveCardPatient = (patient: IPatient) => {
  const actions = [
    {
      "type": "Action.ShowCard",
      "title": "Page Doctor",
      "card": {
          "type": "AdaptiveCard",
          "body": [
              {
                  "type": "Input.Text",
                  "placeholder": "Add a message",
                  "id": "doctorPage"
              }
          ],
          "actions": [
              {
                "data": {
                  "done": true
                },
                  "type": "Action.Submit",
                  "title": "Send"
              }
          ]
      }
  },
  {
    "type": "Action.ShowCard",
    "title": "Set Appointment",
    "card": {
        "type": "AdaptiveCard",
        "body": [
            {
                "type": "Input.Date",
                "id": "appointmentDate"
            }
        ],
        "actions": [
            {
              "data": {
                "done": true
              },
                "type": "Action.Submit",
                "title": "Submit"
            }
        ]
    }
},
  {
      "type": "Action.ShowCard",
      "title": "Update Status",
      "card": {
          "type": "AdaptiveCard",
          "body": [
              {
                  "type": "Input.Text",
                  "id": "status"
              }
          ],
          "actions": [
              {
                "data": {
                  "done": true
                },
                  "type": "Action.Submit",
                  "title": "Submit"
              }
          ]
      }
  }
  ];

  const body = `[
    {
      "type": "Container",
      "items": [
        {
          "type": "TextBlock",
          "size": "Medium",
          "weight": "Bolder",
          "text": "Patient #${patient.patientNumber}"
        },
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "items": [
                {
                  "type": "Image",
                  "style": "Person",
                  "url": "https://robohash.org/${patient.firstName.toLowerCase()}.png?set=set5",
                  "size": "Small"
                }
              ],
              "width": "auto"
            },
            {
              "type": "Column",
              "items": [
                {
                  "type": "TextBlock",
                  "weight": "Bolder",
                  "text": "${patient.firstName} ${patient.lastName}",
                  "wrap": true
                },
                {
                  "type": "TextBlock",
                  "spacing": "None",
                  "text": "Admitted {{DATE(${patient.admissionDate}T00:00:00Z,SHORT)}}",
                  "isSubtle": true,
                  "wrap": true
                }
              ],
              "width": "stretch"
            }
          ]
        }
      ]
    },
    {
      "type": "Container",
      "items": [
        {
          "type": "TextBlock",
          "text": "${patient.diagnosis}",
          "wrap": true
        },
        {
          "type": "FactSet",
          "facts": [
            {
              "title": "Doctor:",
              "value": "${patient.doctor}"
            },
            {
              "title": "Emergency Contact:",
              "value": "${patient.emergencyContact}"
            },
            {
              "title": "Blood Type:",
              "value": "${patient.bloodType}"
            },
            {
              "title": "Status:",
              "value": "${patient.status}"
            },
            {
              "title": "Blood Type:",
              "value": "${patient.appointmentDate}"
            }
          ]
        }
      ]
    }
  ]`

  let adaptiveCard = teams.TeamsFactory.adaptiveCard({
      version: '1.0.0',
      type: 'AdaptiveCard',
      body: JSON.parse(body),
      actions: actions as any
  });
  return adaptiveCard;
}