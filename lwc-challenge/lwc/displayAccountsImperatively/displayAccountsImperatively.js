import { LightningElement, api } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

const columns = [
    { label: 'Name', fieldName: NAME_FIELD.fieldApiName },
    { label: 'Phone', fieldName: PHONE_FIELD.fieldApiName, type: 'phone' },
    { label: 'Annual Revenue', fieldName: REVENUE_FIELD.fieldApiName, type: 'currency' },
    { label: 'Industry', fieldName: INDUSTRY_FIELD.fieldApiName },
];

export default class DisplayAccountsImperatively extends LightningElement {


    @api filter;
    columns = columns;
    accounts = [];
    error;

    retrieveAccounts() {
        getAccounts({filter: this.filter})
        .then(results => {
            this.accounts = results;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.accounts = undefined;
        });
    }

    handleClick() {
        this.filter = this.template.querySelector('[data-id="search-text"]').value;
        
        this.retrieveAccounts();
    }
}