var xdf = require('./mappings/xdf').xdf;
var Jsonix = require('jsonix').Jsonix
var jsonata = require("jsonata");
const fs = require('fs')

var context = new Jsonix.Context([xdf]);
var unmarshaller = context.createUnmarshaller();

// xdatenfelder to JSON
unmarshaller.unmarshalFile('examples/2.0/bewohnerparken/S05000058V1.0_xdf2.xml',
    function (unmarshalled) {
        try {
            const jsonataTemplate = fs.readFileSync('jsonata/example-formtemplate.jsonata', 'utf8')
            const jsonataExpr = jsonata(jsonataTemplate);
            const formJson = jsonataExpr.evaluate(unmarshalled.value);
            console.log(JSON.stringify(formJson, null, 2))
        } catch (err) {
            console.error(err)
        }
    });
