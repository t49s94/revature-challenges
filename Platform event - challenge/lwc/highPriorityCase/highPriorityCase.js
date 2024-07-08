/*
Platform Event Challenge 7/3/24
 
Create a platform event that will trigger when a high priority case is created. Next, 
subscribe to the platform event from within a Lightning Web Component. You should 
display the following on the component, provided from data of the platform event: 
"HIGH Priority Alert: Case Number:CASENUMBERHERE"

*/

import { LightningElement, api, track } from 'lwc';
import { subscribe, unsubscribe, onError} from 'lightning/empApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class HighPriorityCase extends LightningElement {

    @api message;
    subscription;

    handleNotificationEvent(event) {
        console.dir(event);
        this.message = 'HIGH Priority Alert: Case Number: ' + event.data.payload.Case_Number__c;
        console.log(this.message);
    }

    async connectedCallback() {
        onError((error) => {
            this.dispatchEvent(
              new ShowToastEvent({
                variant: "error",
                title: "EMP API Error",
                message: "Check your browser's developer console for mode details."
              })
            );
            console.log("EMP API error reported by server: ", JSON.stringify(error));
          });
          // Subscribe to our notification platform event with the EMP API
          // listen to all new events
          // and handle them with handleNotificationEvent
          this.subscription = await subscribe(
            "/event/High_priority_case__e",
            -1,
            (event) => this.handleNotificationEvent(event)
          );
    }

    disconnectedCallback() {
        // Unsubscribe from EMP API
        unsubscribe(this.subscription);
    }
}