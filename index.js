// Include or require PO.js so that PO variable is available
// For instance, in node.js:
var xdf = require('./mappings/xdf').xdf;
var Jsonix = require('jsonix').Jsonix
 
// First we construct a Jsonix context - a factory for unmarshaller (parser)
// and marshaller (serializer)
var context = new Jsonix.Context([xdf]);
 
// Then we create a unmarshaller
var unmarshaller = context.createUnmarshaller();
 
// Unmarshal an object from the XML retrieved from the URL
unmarshaller.unmarshalFile('bewohnerparken/S05000058V1.0_xdf2.xml',
    // This callback function will be provided
    // with the result of the unmarshalling
    function (unmarshalled) {
        // Alice Smith
        console.log(JSON.stringify(unmarshalled.value, null, 2));
        // Baby Monitor
        // console.log(unmarshalled.value.items.item[1].productName);
    });