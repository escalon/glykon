<script>
    import {createEventDispatcher} from 'svelte';
    import {v4 as uuidv4} from 'uuid';

    export let indent = 0;
    export let level = 1;
    export let struktur = {};
    export let parentStructures = [];
    export let index = 0;
    export let fimIdPath;

    let open = false;

    const dispatch = createEventDispatcher();

    // TODO: use common prototypes for new field and group
    // TODO: focus bezeichnungEingabe after creating a new item
    // TODO: highlight the current item in structures tree, build path of indexes

    const newGroupProto = {
        "TYPE_NAME": "xdf.Struktur",
        "anzahl": "1:1",
        "bezug": "",
        "enthaelt": {
            "TYPE_NAME": "xdf.Enthaelt",
            "datenfeldgruppe": {
                "TYPE_NAME": "xdf.Datenfeldgruppe",
                "identifikation": {
                    "TYPE_NAME": "xdf.ElementIdentifikation",
                    "id": "TODO G05000554",
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

    const newFieldProto = {
        "TYPE_NAME": "xdf.Struktur",
        "anzahl": "1:1",
        "bezug": "",
        "enthaelt": {
            "TYPE_NAME": "xdf.Enthaelt",
            "datenfeld": {
                "TYPE_NAME": "xdf.Datenfeld",
                "identifikation": {
                    "TYPE_NAME": "xdf.ElementIdentifikation",
                    "id": "TODO ID",
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

    function toggleOpen() {
        open = !open;
    }

    function setCurrent(object) {
        dispatch('currentItemSelected', {current:object, fimIdPath: fimIdPath});
    }

    function deleteItem(index, bezeichnungEingabe) {
        if (window.confirm(`Möchten Sie das Element '${bezeichnungEingabe}' wirklich löschen?`)) {
            parentStructures.splice(index, 1)
            dispatch('structuresChanged')
            dispatch('currentItemSelected', {enthaelt: {}});
        }
    }

    function addGroup(index) {
        console.log(`group index: ${JSON.stringify(index)}`)
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
        parentStructures.splice(index + 1, 0, newGroup)
        dispatch('structuresChanged')
        dispatch('currentItemSelected', newGroup);
    }

    function addField(index) {
        console.log(`field index: ${JSON.stringify(index)}`)
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
        console.log(`new field: ${JSON.stringify(newField)}`)
        parentStructures.splice(index + 1, 0, newField)
        dispatch('currentItemSelected', newField);
        dispatch('structuresChanged')
    }

    function addChildGroup(index) {
        console.log(`group index: ${JSON.stringify(index)}`)
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
        parentStructures[index].enthaelt.datenfeldgruppe.struktur.splice(0, 0, newGroup)
        dispatch('structuresChanged')
        dispatch('currentItemSelected', newGroup);
        open = true;
    }

    function addChildField(index) {
        console.log(`group index: ${JSON.stringify(index)}`)
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
        parentStructures[index].enthaelt.datenfeldgruppe.struktur.splice(0, 0, newField)
        dispatch('structuresChanged')
        dispatch('currentItemSelected', newField);
        open = true;
    }

    $: arrowDown = open

</script>

<div style="padding-left: {indent}px">
    {#if struktur.enthaelt.datenfeld}
        <p>
            <span class="clickable"
                  on:click={setCurrent(struktur)}>{struktur.enthaelt.datenfeld.bezeichnungEingabe}</span>
            <i class="bi-plus-circle clickable w3-text-grey" title="Feld nach diesem Feld hinzufügen" on:click={addField(index)}></i>
            <i class="bi-plus-circle-fill clickable w3-text-grey w3-tooltip" title="Feldgruppe nach diesem Feld hinzufügen" on:click={addGroup(index)}></i>
            <i class="bi-x-circle clickable w3-text-red" title="Entfernen" on:click={deleteItem(index, struktur.enthaelt.datenfeld.bezeichnungEingabe)}></i>
        </p>
    {/if}
    {#if struktur.enthaelt.datenfeldgruppe}
        <p>
            <span on:click={toggleOpen}>
                      <span class="arrow" class:arrowDown>&#x25b6</span>
			</span>
            <span class="clickable"
                  on:click={setCurrent(struktur)}>{struktur.enthaelt.datenfeldgruppe.bezeichnungEingabe}</span>
            <i class="bi-plus-circle clickable w3-text" title="Feld nach dieser Feldgruppe hinzufügen" on:click={addField(index)}></i>
            <i class="bi-plus-circle-fill clickable w3-text-grey" title="Feldgruppe nach dieser Feldgruppe hinzufügen" on:click={addGroup(index)}></i>
            <i class="bi-node-plus clickable w3-text-grey" title="Feld zu dieser Feldgruppe hinzufügen" on:click={addChildField(index)}></i>
            <i class="bi-node-plus-fill clickable w3-text-grey" title="Feldgruppe zu dieser Feldgruppe hinzufügen" on:click={addChildGroup(index)}></i>
            <i class="bi-x-circle clickable w3-text-red" title="Entfernen" on:click={deleteItem(index, struktur.enthaelt.datenfeldgruppe.bezeichnungEingabe)}></i>
        </p>
    {/if}
</div>

{#if open && struktur.enthaelt.datenfeldgruppe}
    {#each struktur.enthaelt.datenfeldgruppe.struktur as child, i}
        <svelte:self struktur="{child}" parentStructures="{struktur.enthaelt.datenfeldgruppe.struktur}"
                     fimIdPath="{fimIdPath + '.' + (child.enthaelt.datenfeld ? child.enthaelt.datenfeld.identifikation.id : child.enthaelt.datenfeldgruppe.identifikation.id)}"
                     on:currentItemSelected on:structuresChanged
                     index="{i}" indent={indent + 18} level="{level + 1}"/>
    {/each}
{/if}

<style>
    .clickable {
        cursor: pointer;
        user-select: none;
    }

    .arrow {
        cursor: pointer;
        display: inline-block;
        user-select: none;
        transition: transform 200ms;
    }

    .arrowDown {
        transform: rotate(90deg);
    }
</style>