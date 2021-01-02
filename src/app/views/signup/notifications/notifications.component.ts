import { Component } from "@angular/core";

@Component({
  selector: 'app-signup-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsSignupComponent {
  notifications = [
    {
      title: 'Act Notifications',
      controls: [
        {
          label: 'Once the act is uploaded',
          value: true
        },
        {
          label: 'Once the act is approved',
          value: false
        },
        {
          label: 'Once the act is published',
          value: true
        },
      ]
    },
    {
      title: 'Order Paper Notifications',
      controls: [
        {
          label: 'Once the order paper is generated',
          value: true
        },
        {
          label: 'Once the order paper is approved',
          value: false
        },
        {
          label: 'Once the order paper is published',
          value: true
        },
      ]
    },
    {
      title: 'Bill Notifications',
      controls: [
        {
          label: 'Once the bill is uploaded',
          value: true
        },
        {
          label: 'Once the bill is approved',
          value: false
        },
        {
          label: 'Once the bill is published',
          value: true
        },
      ]
    },
    {
      title: 'Vote Book Notifications',
      controls: [
        {
          label: 'Once the vote book is generated',
          value: true
        },
        {
          label: 'Once the vote book is approved',
          value: false
        },
        {
          label: 'Once the vote book is published',
          value: true
        },
      ]
    },
    {
      title: 'Report Notifications',
      controls: [
        {
          label: 'Once the report is generated',
          value: true
        },
        {
          label: 'Once the report is approved',
          value: false
        },
        {
          label: 'Once the report is published',
          value: true
        },
      ]
    },
    {
      title: 'Motion Notifications',
      controls: [
        {
          label: 'Once the motion is generated',
          value: true
        },
        {
          label: 'Once the motion is approved',
          value: false
        },
        {
          label: 'Once the motion is published',
          value: true
        },
      ]
    },
    {
      title: 'Petition Notifications',
      controls: [
        {
          label: 'Once the petition is received',
          value: true
        },
        {
          label: 'Once the petition is approved',
          value: false
        },
        {
          label: 'Once the petition is uploaded',
          value: true
        },
      ]
    },
    {
      title: 'Statement Notifications',
      controls: [
        {
          label: 'Once the statement is uploaded',
          value: true
        },
        {
          label: 'Once the statement is approved',
          value: false
        },
        {
          label: 'Once the statement is published',
          value: true
        },
      ]
    },
    {
      title: 'Committee Notifications',
      controls: [
        {
          label: 'Once committees have been created',
          value: true
        },
        {
          label: 'Once committees have been deleted',
          value: false
        },
      ]
    },
    {
      title: 'Assembly Personnel Notifications',
      controls: [
        {
          label: 'Once assembly personnel is created',
          value: true
        },
        {
          label: 'Once assembly personnel is deleted',
          value: false
        },
      ]
    },
    {
      title: 'Assembly Member Notifications',
      controls: [
        {
          label: 'Once member profile is created',
          value: true
        },
        {
          label: 'Once member profile is deleted',
          value: false
        },
      ]
    },
    {
      title: 'Correspondent Letter Notifications',
      controls: [
        {
          label: 'Once letter is generated',
          value: true
        },
        {
          label: 'Once letter is approved',
          value: false
        },
      ]
    },
  ]

  onSwitchChange(title: string, label: string, value: boolean) {
    this.notifications.forEach(noti => {
      if (noti.title === title) {
        noti.controls.forEach((control) => {
          if (control.label === label) {
            control.value = value;
          }
        })
      }
    })
  }
}
