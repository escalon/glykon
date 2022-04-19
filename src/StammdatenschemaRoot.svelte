<script>
    import {createEventDispatcher} from 'svelte';
    import {v4 as uuidv4} from "uuid";

    export let stammdatenschema;

    let open = false;
    const dispatch = createEventDispatcher();

    function setCurrent(object) {
        dispatch('currentItemSelected', {current: object, fimIdPath: null});
    }

    function addChildGroup() {
        const newGroup = {
            "TYPE_NAME": "xdf.Struktur",
            "anzahl": "1:1",
            "bezug": "",
            "enthaelt": {
                "TYPE_NAME": "xdf.Enthaelt",
                "datenfeldgruppe": {
                    "TYPE_NAME": "xdf.Datenfeldgruppe",
                    "identifikation": {
                        "TYPE_NAME": "xdf.ElementIdentifikation",
                        "id": "G-" + uuidv4(),
                        "version": "1.0"
                    },
                    "name": "",
                    "bezeichnungEingabe": "Neue Datenfeldgruppe",
                    "bezeichnungAusgabe": "",
                    "beschreibung": "",
                    "definition": "",
                    "bezug": "",
                    "status": {
                        "TYPE_NAME": "xdf.CodeStatus",
                        "listURI": "urn:xoev-de:fim:codeliste:xdatenfelder.status",
                        "listVersionID": "1.0",
                        "code": "aktiv"
                    },
                    "fachlicherErsteller": "TODO",
                    "schemaelementart": {
                        "TYPE_NAME": "xdf.CodeSchemaelementart",
                        "listURI": "urn:xoev-de:fim:codeliste:xdatenfelder.schemaelementart",
                        "listVersionID": "1.0",
                        "code": "RNG"
                    },
                    "hilfetextEingabe": "",
                    "hilfetextAusgabe": "",
                    "struktur": []
                }
            }
        };
        stammdatenschema.struktur.splice(0, 0, newGroup)
        dispatch('structuresChanged')
        dispatch('currentItemSelected', {current: newGroup});
        open = true;
    }

    function addChildField() {
        const newField = {
            "TYPE_NAME": "xdf.Struktur",
            "anzahl": "1:1",
            "bezug": "",
            "enthaelt": {
                "TYPE_NAME": "xdf.Enthaelt",
                "datenfeld": {
                    "TYPE_NAME": "xdf.Datenfeld",
                    "identifikation": {
                        "TYPE_NAME": "xdf.ElementIdentifikation",
                        "id": "F-" + uuidv4(),
                        "version": "1.0"
                    },
                    "name": "",
                    "bezeichnungEingabe": "Neues Datenfeld",
                    "bezeichnungAusgabe": "",
                    "beschreibung": "",
                    "definition": "",
                    "bezug": "",
                    "status": {
                        "TYPE_NAME": "xdf.CodeStatus",
                        "listURI": "urn:xoev-de:fim:codeliste:xdatenfelder.status",
                        "listVersionID": "1.0",
                        "code": "aktiv"
                    },
                    "fachlicherErsteller": "TODO aktueller User",
                    "schemaelementart": {
                        "TYPE_NAME": "xdf.CodeSchemaelementart",
                        "listURI": "urn:xoev-de:fim:codeliste:xdatenfelder.schemaelementart",
                        "listVersionID": "1.0",
                        "code": "RNG"
                    },
                    "hilfetextEingabe": "",
                    "hilfetextAusgabe": "",
                    "feldart": {
                        "TYPE_NAME": "xdf.CodeFeldart",
                        "listURI": "urn:xoev-de:fim:codeliste:xdatenfelder.feldart",
                        "listVersionID": "1.0",
                        "code": "input"
                    },
                    "datentyp": {
                        "TYPE_NAME": "xdf.CodeDatentyp",
                        "listURI": "urn:xoev-de:fim:codeliste:xdatenfelder.datentyp",
                        "listVersionID": "1.0",
                        "code": "text"
                    },
                    "praezisierung": "",
                    "inhalt": "",
                    "codelisteReferenz": {
                        "TYPE_NAME": "xdf.CodelisteReferenz",
                        "identifikation": {
                            "TYPE_NAME": "xdf.ElementIdentifikation",
                            "id": "TODO C05000073"
                        },
                        "genericodeIdentification": {
                            "TYPE_NAME": "xdf.GenericodeIdentification",
                            "canonicalIdentification": "urn:de:fim:codeliste:zustimmung",
                            "version": "2021-01-11",
                            "canonicalVersionUri": "urn:de:fim:codeliste:zustimmung_2021-01-11"
                        }
                    }
                }
            }
        };
        stammdatenschema.struktur.splice(0, 0, newField)
        dispatch('structuresChanged')
        dispatch('currentItemSelected', {current:newField});
        open = true;
    }

    $: arrowDown = open
</script>

<p>
    <span>
        <span class="arrow arrowDown" class:arrowDown>&#x25b6</span>
    </span>
    <strong class="clickable"
          on:click={setCurrent(stammdatenschema)}>{stammdatenschema.bezeichnungEingabe}</strong>
    <i class="bi-node-plus clickable w3-text-grey" title="Feld zu diesem Stammdatenschema hinzufügen"
       on:click={addChildField}></i>
    <i class="bi-node-plus-fill clickable w3-text-grey" title="Feldgruppe zu diesem Stammdatenschema hinzufügen"
       on:click={addChildGroup}></i>
    <!--    <i class="bi-x-circle clickable w3-text-red" title="Entfernen" on:click={deleteItem(index, struktur.enthaelt.datenfeldgruppe.bezeichnungEingabe)}></i>-->
</p>

<style>
    .clickable {
        cursor: pointer;
        user-select: none;
    }

    /*.arrow {*/
    /*    cursor: pointer;*/
    /*    display: inline-block;*/
    /*    user-select: none;*/
    /*    transition: transform 200ms;*/
    /*}*/

    .arrowDown {
        transform: rotate(90deg);
    }
</style>