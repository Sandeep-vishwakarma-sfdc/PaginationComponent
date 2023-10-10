import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/GetAccounts.getAccounts'

const col = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Account Number', fieldName: 'AccountNumber' },
    { label: 'Phone', fieldName: 'Phone' },
];
export default class TestPaginationCmp extends LightningElement {
    accounts = []; // Actual Data from Apex
    paginatedAccounts = []; // chunk of data after pagination
    columns = col;
    connectedCallback(){
        getAccounts().then(accounts => {
            this.accounts = accounts;
        })
    }

    handlePaginationAction(event){
        setTimeout(() => {
            this.paginatedAccounts = event.detail.values;
        }, 200);
    }

}