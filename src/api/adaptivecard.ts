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
}

export const createAdaptiveCard = (patient: IPatient) => {
  return {
      "type": "AdaptiveCard",
      "body": [
          {
              "type": "Container",
              "items": [
                  {
                      "type": "TextBlock",
                      "size": "Medium",
                      "weight": "Bolder",
                      "text": `Patient #${patient.patientNumber}`
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
                                      "url": `https://robohash.org/${patient.firstName}.png?set=set5`,
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
                                      "text": `${patient.firstName} ${patient.lastName}`,
                                      "wrap": true
                                  },
                                  {
                                      "type": "TextBlock",
                                      "spacing": "None",
                                      "text": `Admitted {{DATE(${patient.admissionDate}T00:00:00Z,SHORT)}}`,
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
                      "text": patient.diagnosis,
                      "wrap": true
                  },
                  {
                      "type": "FactSet",
                      "facts": [
                          {
                              "title": "Doctor:",
                              "value": patient.doctor
                          },
                          {
                              "title": "Emergency Contact:",
                              "value": patient.emergencyContact
                          },
                          {
                              "title": "Blood Type:",
                              "value": patient.bloodType
                          }
                      ]
                  }
              ]
          }
      ],
      "actions": [
          {
              "type": "Action.OpenUrl",
              "title": "Set Appointment",
              "url": "github.com"
          },
          {
              "type": "Action.OpenUrl",
              "title": "Clinical History",
              "url": "http://adaptivecards.io"
          }
      ],
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.0"
  }
}