// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName:"BufferApps",
  serverApiURL : "http://localhost:5400/backend/api",
  // serverApiURL : "https://buffer-apps-backend.herokuapp.com/api", //"https://api.bufferapps.com/api",
  googleClientId: '336338936276-6ci8odb1a9i60g0qliramee0n7bv6u6s.apps.googleusercontent.com',
  // googleClientId: '1064039299039-hojke0hj2qci9v68qinuddj3e21esppa.apps.googleusercontent.com',// Abhijit
  facebookAppId: '1821078651565949',
  sendinblueApiUrl:"https://api.sendinblue.com",
  sendinblueListId:4, 
  sendinblueAllusersListId:7, 
  sendinblueVendorsListId:6, 
  sendinblueApiKey:"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",  
  cryptoJsSecretKey : '12345678901234567890',
  cacheTimeInMinutes:30,
  betaBaseUrl:'/beta-listing',
  dealsBaseUrl:'/lifetime-deals',
  appCurSign: "$",
  domainURL:'http://localhost:4200',
  stripeClientKey:'pk_test_51Lh9ANSHqi2PyKk3I9Gzf1m63teaL6VmhFkj7tzgjcZtiyCHfTqYaqCNNBYt4wOBLINO5kxhE0ocFG9FnsBRAwQ100UeJjOg9V'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
