var xdf = require('./mappings/xdf').xdf;
var Jsonix = require('jsonix').Jsonix
var jsonata = require("jsonata");
const fs = require('fs')

var context = new Jsonix.Context([xdf], {
    // mappingStyle : 'simplified',
    // namespacePrefixes: {
    //     "urn:xoev-de:fim:standard:xdatenfelder_2": "xdf",
    //     "http://www.w3.org/2001/XMLSchema-instance": "xsi"
    // }
});
var unmarshaller = context.createUnmarshaller();
var marshaller = context.createMarshaller();

// xdatenfelder to JSON
unmarshaller.unmarshalFile('examples/2.0/bewohnerparken/S05000058V1.0_xdf2.xml',
    function (unmarshalled) {
        try {
            console.log(JSON.stringify(unmarshalled, null, 2));
            const jsonataTemplate = fs.readFileSync('jsonata/example-formtemplate.jsonata', 'utf8')
            const jsonataExpr = jsonata(jsonataTemplate);
            const formJson = jsonataExpr.evaluate(unmarshalled);
            console.log(JSON.stringify(formJson, null, 2));
            const xml = marshaller.marshalString(unmarshalled);
            console.log(xml);
        } catch (err) {
            console.error(err)
        }
    });
