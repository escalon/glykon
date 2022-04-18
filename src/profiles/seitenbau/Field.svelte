<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let feldart = "input"; // input, select, label
    export let anzahl = "";
    export let datentyp = "";
    export let currentMaskInformation = {};
    /*
    text Text
    date Datum
    bool Wahrheitswert
    num Nummer
    num_int Ganzzahl
    num_currency Geldbetrag
    file Anlage (Datei)
    obj Objekt (Blob)
    */
    export let id = "";
    export let label = "";
    export let type = "";
    export let required = false;
    export let disabled = false;
    export let consent = false;
    export let placeholder = "";
    export let helptext = "";
    export let possibleValues = []; // checkbox, radio, dropdown, two-list only
    export let displayConditions = [];
    export let value;
    export let width;
    export let validationRules = [];
    export let layout = "vertical" // or horizontal, not supported yet
    export let source; // {service:"", variableName:""}
    export let target; // {service:"", variableName:""}
    export let externalDataSourceProperties;
    export let externalValue;
    export let requiredValidationFailedMessage;
    export let typeValidationFailedMessage;
    export let thousandsSeparatorValidationFailedMessage;
    export let digitsAfterDecimalPointValidationFailedMessage;
    export let filterable;
    export let additonalConfig;
    export let helpDialog;

    $: {
        currentMaskInformation.id = undefined;
        currentMaskInformation.label = undefined;
        currentMaskInformation.type = "";
        currentMaskInformation.width = undefined;
        // currentMaskInformation.required = anzahl.startsWith("0") ? true : false
    }

    /*
    text Text
    date Datum
    bool Wahrheitswert
    num Nummer
    num_int Ganzzahl
    num_currency Geldbetrag
    file Anlage (Datei)
    obj Objekt (Blob)
    */
    let typeOptions = [
        {
            id: "STRING",
            text: "Input-Feld",
            feldart: "input",
            supportedMultiplicities: ["1", "*"],
            supportedDataTypes: ["text", "num", "num_int"]
        },
        {
            id: "EURO_BETRAG",
            text: "Input Feld für Euro Geldbeträge",
            feldart: "input",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["num_currency"]
        },
        {
            id: "STRING_AJAX_AUTOCOMPLETE",
            text: "Input-Feld mit Vorschlagsliste, die aus AJAX-Aufruf befüllt wird",
            feldart: "input",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["text"]
        },
        {
            id: "DROPDOWN_SINGLE_SELECT_AJAX",
            text: "Auswahlfeld für Werte aus AJAX-Aufruf",
            feldart: "select",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["text", "num", "num_int"]
        },
        {
            id: "TEXTAREA",
            text: "Mehrzeiliges Input-Feld",
            feldart: "input",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["text"]
        },
        {
            id: "FILE",
            text: "Dateiupload-Feld",
            feldart: "input",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["file"]
        },
        {
            id: "BOOLEAN",
            text: "Radiobutton mit Werten 'ja' und 'nein'",
            feldart: "input",
            supportedMultiplicities: ["1"], supportedDataTypes: ["bool"]
        },
        {
            id: "TEXT",
            text: "Anzeigetext",
            feldart: "label",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["text"]
        },
        {
            id: "PLACEHOLDER",
            text: "Horizontaler Leerraum",
            feldart: "label",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["text"]
        },
        {
            id: "SINGLE_CHECKBOX",
            text: "Einzelne Checkbox",
            feldart: "input",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["bool"]
        },
        {
            id: "CHECKBOX",
            text: "Liste von Checkboxen",
            feldart: "select",
            supportedMultiplicities: ["*"],
            supportedDataTypes: ["text", "num", "num_int"]
        },
        {
            id: "RADIO_BUTTONS",
            text: "Liste aus Radiobuttons",
            feldart: "select",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["text", "num", "num_int"]
        },
        {
            id: "DROPDOWN_SINGLE_SELECT",
            text: "Auswahlfeld für genau einen wählbaren Wert",
            feldart: "select",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["text", "num", "num_int"]
        },
        {
            id: "DROPDOWN_MULTIPLE_SELECT",
            text: "Auswahlfeld mit mehreren wählbaren Werten",
            feldart: "select",
            supportedMultiplicities: ["*"],
            supportedDataTypes: ["text", "num", "num_int"]
        },
        {
            id: "TWO_LIST_SELECT",
            text: "Zwei verbundene Auswahlfelder mit selektierten und unselektierten Werten",
            feldart: "select",
            supportedMultiplicities: ["*"],
            supportedDataTypes: ["text", "num", "num_int"]
        },
        {
            id: "DATE",
            text: "Datumseingabe",
            feldart: "input",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["date"]
        },
        {
            id: "TIME",
            text: "Uhrzeiteingabe",
            feldart: "input",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["date"]
        },
        {
            id: "H1",
            text: "Überschrift ohne Eingabemöglichkeit",
            feldart: "label",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["text"]
        },
        {
            id: "H2",
            text: "Zwischenüberschrift ohne Eingabemöglichkeit",
            feldart: "label",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["text"]
        },
        {
            id: "SUBMITTED_WITH_NPA_INFO",
            text: "Status Anmeldung Online-Ausweis, unsichtbar",
            feldart: "input",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["bool"]
        },
        {
            id: "VIDEO",
            text: "Anzeige eines externen Videos",
            feldart: "label",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["blob"]
        },
        {
            id: "IMAGE",
            text: "Anzeige eines externen Bildes",
            feldart: "label",
            supportedMultiplicities: ["1"],
            supportedDataTypes: ["blob"]
        }
    ];
    let typeOptionsFiltered;
    $: typeOptionsFiltered = typeOptions
        .sort((a, b) => {
                if (a.text < b.text) {
                    return -1;
                } else if (a.text > b.text) {
                    return 1;
                } else {
                    return 0;
                }
            }
        )
        .filter((element) => {
            return element.feldart === feldart &&
                element.supportedMultiplicities.find(
                    supportedMultiplicity => anzahl.endsWith(supportedMultiplicity)) &&
                element.supportedDataTypes.find(
                    supportedDataType => datentyp === supportedDataType
                );
            // TODO: 1:* Inputfelder wie bei Vorname in Bewohnerparken, eventuell spezielle Bedingung für feldart input, datentyp text und anzahl _:*
        });

    function fieldChanged(event) {
        dispatch('maskInformationChanged')
    }

</script>

<label>Feld-Id
    <input class="w3-input" bind:value="{currentMaskInformation.id}" on:change={fieldChanged}/>
</label>
<label>Beschriftung
    <input class="w3-input" bind:value="{currentMaskInformation.label}" on:change={fieldChanged}/>
</label>
<label>Typ
    <select class="w3-input" bind:value={currentMaskInformation.type} on:change={fieldChanged}>
        {#each typeOptionsFiltered as typeOption}
            <option value={typeOption.id}>
                {typeOption.text}
            </option>
        {/each}
    </select>
</label>
<label>Breite
    <input class="w3-input" bind:value="{currentMaskInformation.width}" on:change={fieldChanged}/>
</label>