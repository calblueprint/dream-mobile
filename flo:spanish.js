// ES6 module syntax
import LocalizedStrings from 'react-native-localization';
 
// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');
 
let strings = new LocalizedStrings({
 "en-US":{
   attendance:"attendance",
   present:"present",
   absent:"absent"
 },
 en:{
   attendance:"attendance",
   present:"present",
   absent:"absent"
 },
 sp: {
   attendance:"asistencia",
   present:"presente",
   absent:"ausente"
 }
});