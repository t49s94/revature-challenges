public with sharing class AccountController {
    public AccountController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String filter){
        try {
            filter = String.escapeSingleQuotes('%' + filter + '%') ;

            List<Account> accountList = [ SELECT Name, Industry, Phone, AnnualRevenue 
            FROM Account WHERE Name LIKE :filter ];

            return accountList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}