public with sharing class ContactController {
    public ContactController() {

    }

    @AuraEnabled
    public static Id createContact(String firstName, String lastName, Id accountId){

        Contact newCont = new Contact(FirstName=firstName, LastName=lastName, 
            AccountId=accountId);

        try {
            insert newCont;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return newCont.Id;
    }
}