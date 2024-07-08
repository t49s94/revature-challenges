/*
JEST Challenge 7/1/24
 
Create a LWC that can:
Create a Contact record from a custom form (no OOB components like record-edit-form)
associate the new contact record with a pre-existing account 
Write a JEST testing suite for this component following all best practices. 
*/
import { LightningElement } from 'lwc';
import createContact from '@salesforce/apex/ContactController.createContact';

export default class CreateContact extends LightningElement {

    saveContact() {
        let firstName = this.refs.firstName.value;
        let lastName = this.refs.lastName.value;
        let account = this.refs.account.value;
        

        createContact({firstName : firstName, lastName : lastName, accountId : account})
        .then(results => {
            let resultsDiv =  this.refs.results;
            resultsDiv.innerText = 'Contact created!';
        })
        .catch(errors => {
            let resultsDiv =  this.refs.results;
            resultsDiv.innerText = 'Error occurred!';
            console.log(JSON.stringify(errors));
        });
    }
}