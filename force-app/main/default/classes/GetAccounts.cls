public with sharing class GetAccounts {
    @AuraEnabled
    public static List<Account> getAccounts(){
        try {
            List<Account> accounts = [Select Id,Name,AccountNumber,Phone  from Account];
            return accounts;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}