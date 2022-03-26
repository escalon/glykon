var xdf_Module_Factory = function () {
  var xdf = {
    name: 'xdf',
    defaultElementNamespaceURI: 'urn:xoev-de:fim:standard:xdatenfelder_2',
    typeInfos: [{
        localName: 'Datenfeldgruppe',
        baseTypeInfo: '.Schemaelementangaben',
        propertyInfos: [{
            name: 'regel',
            minOccurs: 0,
            collection: true,
            typeInfo: '.Regel'
          }, {
            name: 'struktur',
            minOccurs: 0,
            collection: true,
            typeInfo: '.Struktur'
          }]
      }, {
        localName: 'Datenfeld',
        baseTypeInfo: '.Schemaelementangaben',
        propertyInfos: [{
            name: 'feldart',
            required: true,
            typeInfo: '.CodeFeldart'
          }, {
            name: 'datentyp',
            required: true,
            typeInfo: '.CodeDatentyp'
          }, {
            name: 'praezisierung',
            required: true
          }, {
            name: 'inhalt',
            required: true
          }, {
            name: 'codelisteReferenz',
            typeInfo: '.CodelisteReferenz'
          }, {
            name: 'regel',
            minOccurs: 0,
            collection: true,
            typeInfo: '.Regel'
          }]
      }, {
        localName: 'Struktur',
        propertyInfos: [{
            name: 'anzahl',
            required: true
          }, {
            name: 'bezug',
            required: true
          }, {
            name: 'enthaelt',
            required: true,
            typeInfo: '.Enthaelt'
          }]
      }, {
        localName: 'Suchanfrage',
        propertyInfos: [{
            name: 'elementTyp',
            required: true,
            maxOccurs: 5,
            collection: true,
            typeInfo: '.CodeElementTyp'
          }, {
            name: 'begriff',
            required: true
          }, {
            name: 'felder',
            required: true,
            collection: true,
            typeInfo: '.CodeSuchfeld'
          }, {
            name: 'status',
            typeInfo: '.CodeStatus'
          }, {
            name: 'ableitungsmodifikationenStruktur',
            typeInfo: '.CodeAbleitungsmodifikationenStruktur'
          }, {
            name: 'ableitungsmodifikationenRepraesentation',
            typeInfo: '.CodeAbleitungsmodifikationenRepraesentation'
          }, {
            name: 'schemaelementart',
            typeInfo: '.CodeSchemaelementart'
          }, {
            name: 'feldart',
            typeInfo: '.CodeFeldart'
          }, {
            name: 'datentyp',
            typeInfo: '.CodeDatentyp'
          }, {
            name: 'gueltigAbNach',
            typeInfo: 'Date'
          }, {
            name: 'gueltigAbVor',
            typeInfo: 'Date'
          }, {
            name: 'gueltigBisNach',
            typeInfo: 'Date'
          }, {
            name: 'gueltigBisVor',
            typeInfo: 'Date'
          }, {
            name: 'freigabedatumNach',
            typeInfo: 'Date'
          }, {
            name: 'freigabedatumVor',
            typeInfo: 'Date'
          }, {
            name: 'veroeffentlichungsdatumNach',
            typeInfo: 'Date'
          }, {
            name: 'veroeffentlichungsdatumVor',
            typeInfo: 'Date'
          }]
      }, {
        localName: 'ElementIdentifikation',
        propertyInfos: [{
            name: 'id',
            required: true,
            typeInfo: 'Token'
          }, {
            name: 'version'
          }]
      }, {
        localName: 'Dokumentsteckbrief',
        baseTypeInfo: '.AllgemeineAngaben',
        propertyInfos: [{
            name: 'isReferenz',
            required: true,
            typeInfo: 'Boolean'
          }, {
            name: 'dokumentart',
            required: true
          }, {
            name: 'hilfetext'
          }]
      }, {
        localName: 'Nachricht',
        propertyInfos: [{
            name: 'header',
            required: true,
            typeInfo: '.Header'
          }]
      }, {
        localName: 'GenericodeIdentification',
        propertyInfos: [{
            name: 'canonicalIdentification',
            required: true,
            typeInfo: 'Token'
          }, {
            name: 'version',
            required: true,
            typeInfo: 'Token'
          }, {
            name: 'canonicalVersionUri',
            required: true,
            typeInfo: 'Token'
          }]
      }, {
        localName: 'CodeSuchfeld',
        typeName: 'Code.Suchfeld',
        baseTypeInfo: '.Code'
      }, {
        localName: 'CodeAbleitungsmodifikationenStruktur',
        typeName: 'Code.AbleitungsmodifikationenStruktur',
        baseTypeInfo: '.Code'
      }, {
        localName: 'Header',
        propertyInfos: [{
            name: 'nachrichtID',
            required: true,
            typeInfo: 'Token'
          }, {
            name: 'erstellungszeitpunkt',
            required: true,
            typeInfo: 'DateTime'
          }, {
            name: 'referenzID',
            typeInfo: 'Token'
          }]
      }, {
        localName: 'CodeAbleitungsmodifikationenRepraesentation',
        typeName: 'Code.AbleitungsmodifikationenRepraesentation',
        baseTypeInfo: '.Code'
      }, {
        localName: 'CodeSchemaelementart',
        typeName: 'Code.Schemaelementart',
        baseTypeInfo: '.Code'
      }, {
        localName: 'Enthaelt',
        propertyInfos: [{
            name: 'datenfeld',
            required: true,
            typeInfo: '.Datenfeld'
          }, {
            name: 'datenfeldgruppe',
            required: true,
            typeInfo: '.Datenfeldgruppe'
          }]
      }, {
        localName: 'Schemaelementangaben',
        baseTypeInfo: '.AllgemeineAngaben',
        propertyInfos: [{
            name: 'schemaelementart',
            required: true,
            typeInfo: '.CodeSchemaelementart'
          }, {
            name: 'hilfetextEingabe',
            required: true
          }, {
            name: 'hilfetextAusgabe',
            required: true
          }]
      }, {
        localName: 'Stammdatenschema',
        baseTypeInfo: '.AllgemeineAngaben',
        propertyInfos: [{
            name: 'hilfetext'
          }, {
            name: 'ableitungsmodifikationenStruktur',
            required: true,
            typeInfo: '.CodeAbleitungsmodifikationenStruktur'
          }, {
            name: 'ableitungsmodifikationenRepraesentation',
            required: true,
            typeInfo: '.CodeAbleitungsmodifikationenRepraesentation'
          }, {
            name: 'regel',
            minOccurs: 0,
            collection: true,
            typeInfo: '.Regel'
          }, {
            name: 'struktur',
            minOccurs: 0,
            collection: true,
            typeInfo: '.Struktur'
          }]
      }, {
        localName: 'CodeStatus',
        typeName: 'Code.Status',
        baseTypeInfo: '.Code'
      }, {
        localName: 'CodeFeldart',
        typeName: 'Code.Feldart',
        baseTypeInfo: '.Code'
      }, {
        localName: 'CodeDatentyp',
        typeName: 'Code.Datentyp',
        baseTypeInfo: '.Code'
      }, {
        localName: 'Genericode',
        propertyInfos: [{
            name: 'any',
            minOccurs: 0,
            collection: true,
            allowDom: false,
            mixed: false,
            type: 'anyElement'
          }]
      }, {
        localName: 'CodeElementTyp',
        typeName: 'Code.ElementTyp',
        baseTypeInfo: '.Code'
      }, {
        localName: 'XdatenfelderCodeliste0105',
        typeName: null,
        baseTypeInfo: '.Nachricht',
        propertyInfos: [{
            name: 'codeliste',
            required: true,
            typeInfo: '.Codeliste'
          }]
      }, {
        localName: 'XdatenfelderDatenfeld0104',
        typeName: null,
        baseTypeInfo: '.Nachricht',
        propertyInfos: [{
            name: 'datenfeld',
            required: true,
            typeInfo: '.Datenfeld'
          }]
      }, {
        localName: 'Code',
        typeName: {
          namespaceURI: 'http:\/\/xoev.de\/schemata\/code\/1_0',
          localPart: 'Code'
        },
        propertyInfos: [{
            name: 'code',
            required: true,
            elementName: {
              localPart: 'code'
            },
            typeInfo: 'Token'
          }, {
            name: 'name',
            elementName: {
              localPart: 'name'
            },
            typeInfo: 'NormalizedString'
          }, {
            name: 'listURI',
            attributeName: {
              localPart: 'listURI'
            },
            type: 'attribute'
          }, {
            name: 'listVersionID',
            typeInfo: 'NormalizedString',
            attributeName: {
              localPart: 'listVersionID'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'XdatenfelderStammdatenschema0102',
        typeName: null,
        baseTypeInfo: '.Nachricht',
        propertyInfos: [{
            name: 'stammdatenschema',
            required: true,
            typeInfo: '.Stammdatenschema'
          }]
      }, {
        localName: 'Suchergebnis',
        propertyInfos: [{
            name: 'dokumentsteckbrief',
            required: true,
            typeInfo: '.Dokumentsteckbrief'
          }, {
            name: 'stammdatenschema',
            required: true,
            typeInfo: '.Stammdatenschema'
          }, {
            name: 'datenfeldgruppe',
            required: true,
            typeInfo: '.Datenfeldgruppe'
          }, {
            name: 'datenfeld',
            required: true,
            typeInfo: '.Datenfeld'
          }, {
            name: 'codeliste',
            required: true,
            typeInfo: '.Codeliste'
          }]
      }, {
        localName: 'XdatenfelderDokumentsteckbrief0101',
        typeName: null,
        baseTypeInfo: '.Nachricht',
        propertyInfos: [{
            name: 'dokumentensteckbrief',
            required: true,
            typeInfo: '.Dokumentsteckbrief'
          }]
      }, {
        localName: 'Regel',
        baseTypeInfo: '.AllgemeineAngaben',
        propertyInfos: [{
            name: 'script',
            required: true
          }]
      }, {
        localName: 'Codeliste',
        baseTypeInfo: '.AllgemeineAngaben',
        propertyInfos: [{
            name: 'genericodeIdentification',
            required: true,
            typeInfo: '.GenericodeIdentification'
          }, {
            name: 'langname',
            required: true
          }, {
            name: 'genericode',
            required: true,
            typeInfo: '.Genericode'
          }]
      }, {
        localName: 'AllgemeineAngaben',
        propertyInfos: [{
            name: 'identifikation',
            required: true,
            typeInfo: '.ElementIdentifikation'
          }, {
            name: 'name',
            required: true
          }, {
            name: 'bezeichnungEingabe',
            required: true
          }, {
            name: 'bezeichnungAusgabe'
          }, {
            name: 'beschreibung',
            required: true
          }, {
            name: 'definition',
            required: true
          }, {
            name: 'bezug',
            required: true
          }, {
            name: 'status',
            required: true,
            typeInfo: '.CodeStatus'
          }, {
            name: 'gueltigAb',
            typeInfo: 'Date'
          }, {
            name: 'gueltigBis',
            typeInfo: 'Date'
          }, {
            name: 'fachlicherErsteller'
          }, {
            name: 'versionshinweis'
          }, {
            name: 'freigabedatum',
            typeInfo: 'Date'
          }, {
            name: 'veroeffentlichungsdatum',
            typeInfo: 'Date'
          }]
      }, {
        localName: 'CodelisteReferenz',
        propertyInfos: [{
            name: 'identifikation',
            required: true,
            typeInfo: '.ElementIdentifikation'
          }, {
            name: 'genericodeIdentification',
            required: true,
            typeInfo: '.GenericodeIdentification'
          }]
      }, {
        localName: 'XdatenfelderDatenfeldgruppe0103',
        typeName: null,
        baseTypeInfo: '.Nachricht',
        propertyInfos: [{
            name: 'datenfeldgruppe',
            required: true,
            typeInfo: '.Datenfeldgruppe'
          }]
      }, {
        type: 'enumInfo',
        localName: 'Schemaelementart',
        baseTypeInfo: 'Token',
        values: ['ABS', 'HAR', 'RNG']
      }, {
        type: 'enumInfo',
        localName: 'Datentyp',
        baseTypeInfo: 'Token',
        values: ['bool', 'date', 'file', 'num', 'num_currency', 'num_int', 'obj', 'text']
      }, {
        type: 'enumInfo',
        localName: 'Suchfeld',
        baseTypeInfo: 'Token',
        values: ['beschreibung', 'bezeichnungAusgabe', 'bezeichnungEingabe', 'bezug', 'codelistenWerte', 'definition', 'hilfetext', 'hilfetextAusgabe', 'hilfetextEingabe', 'id', 'inhalt', 'name']
      }, {
        type: 'enumInfo',
        localName: 'ElementTyp',
        baseTypeInfo: 'Token',
        values: ['C', 'D', 'F', 'G', 'S']
      }, {
        type: 'enumInfo',
        localName: 'Feldart',
        baseTypeInfo: 'Token',
        values: ['input', 'label', 'select']
      }],
    elementInfos: [{
        elementName: 'xdatenfelder.dokumentsteckbrief.0101',
        typeInfo: '.XdatenfelderDokumentsteckbrief0101'
      }, {
        elementName: 'xdatenfelder.datenfeldgruppe.0103',
        typeInfo: '.XdatenfelderDatenfeldgruppe0103'
      }, {
        elementName: 'xdatenfelder.codeliste.0105',
        typeInfo: '.XdatenfelderCodeliste0105'
      }, {
        elementName: 'xdatenfelder.datenfeld.0104',
        typeInfo: '.XdatenfelderDatenfeld0104'
      }, {
        elementName: 'xdatenfelder.stammdatenschema.0102',
        typeInfo: '.XdatenfelderStammdatenschema0102'
      }]
  };
  return {
    xdf: xdf
  };
};
if (typeof define === 'function' && define.amd) {
  define([], xdf_Module_Factory);
}
else {
  var xdf_Module = xdf_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.xdf = xdf_Module.xdf;
  }
  else {
    var xdf = xdf_Module.xdf;
  }
}