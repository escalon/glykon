<script>
    import {xdf} from '../mappings/xdf';
    import jsonata from 'jsonata';

    // TODO: import Jsonix as module
    // TODO: reset currentItem after loading a new file
    // TODO: edit struktur, not enthaelt.datenfeld or enthaelt.datenfeldgruppe and make anzahl available
    // TODO: use stammdatenschema as root of tree to allow adding elements before first enthaelt
    // TODO: optionally use own counter in number range 00

    import example from "./bewohnerparken-datenfelder.json"
    import Stammdatenschema from "./Stammdatenschema.svelte";

    const jsonixContext = new Jsonix.Context([xdf]);

    let fileHandle;
    let jsonataHandle;
    let formHandle;
    let stammdatenschemaValue;

    // let stammdatenschemaElement = example;
    let stammdatenschemaElement;

    $: if (stammdatenschemaElement) {
        stammdatenschemaValue = stammdatenschemaElement.value;
    }

    async function loadStammdatenschema() {
        const opts = {
            types: [{
                description: 'XDatenfelder Datei',
                accept: {'text/xml': ['.xml']},
            }],
        };
        [fileHandle] = await window.showOpenFilePicker(opts);
        // get file contents
        const fileData = await fileHandle.getFile();
        const stammdatenschemaXml = await fileData.text()

        var unmarshaller = jsonixContext.createUnmarshaller();
        stammdatenschemaElement = unmarshaller.unmarshalString(stammdatenschemaXml)
    }

    async function saveStammdatenschema() {
        const marshaller = jsonixContext.createMarshaller();
        const stammdatenschemaXml = marshaller.marshalString(stammdatenschemaElement);
        if(!fileHandle) {
            fileHandle = await window.showSaveFilePicker({
                types: [{
                    description: 'XDatenfelder Datei',
                    accept: {'text/xml': ['.xml']},
                }],
            });
        }
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(stammdatenschemaXml);
        await writableStream.close();
    }

    async function saveStammdatenschemaAs() {
        fileHandle = null;
        await saveStammdatenschema();
    }

    async function saveForm() {
        if (!jsonataHandle) {
            await loadTemplate()
        }
        const jsonataFile = await jsonataHandle.getFile();
        const jsonataTemplate = await jsonataFile.text()
        const jsonataExpr = jsonata(jsonataTemplate);
        const formJson = jsonataExpr.evaluate(stammdatenschemaElement.value);
        console.log(JSON.stringify(formJson, null, 2));
        if (!formHandle) {
            formHandle = await window.showSaveFilePicker({
                types: [{
                    description: 'Formular json',
                    accept: {'application/json': ['.json']},
                }],
            });
        }
        const writableStream = await formHandle.createWritable();
        await writableStream.write(JSON.stringify(formJson, null, 2));
        await writableStream.close();
    }

    async function saveFormAs() {
        formHandle = null;
        saveForm();
    }

    async function loadTemplate() {
        [jsonataHandle] = await window.showOpenFilePicker({
            types: [{
                description: 'JSONata template',
                accept: {'text/plain': ['.jsonata', '.txt']},
            }],
        });
    }
</script>

<div class="main">
    {#if !fileHandle && !stammdatenschemaElement}
        <h1>Glykon Sculptor</h1>
        <p>Laden Sie ein FIM Stammdatenschema und speichern Sie es als neues OZG Referenzdatenschema oder laden Sie Ihr OZG Referenzdatenschema.</p>
    {/if}
    <button on:click={loadStammdatenschema}>Laden...</button>
    <button on:click={saveStammdatenschema} disabled='{!fileHandle}'>Speichern</button>
    <button on:click={saveStammdatenschemaAs} disabled='{!fileHandle}'>Speichern als...</button>
    <button on:click={saveForm} disabled='{!stammdatenschemaElement}'>Formular speichern</button>
    <button on:click={saveFormAs} disabled='{!stammdatenschemaElement}'>Formular speichern als...</button>
    <button on:click={loadTemplate} disabled='{!stammdatenschemaElement}'>Formulartemplate wählen...</button>

    {#if stammdatenschemaValue}
        <h1>{stammdatenschemaValue.stammdatenschema.name}</h1>
        <Stammdatenschema structures="{stammdatenschemaValue.stammdatenschema.struktur}"/>
    {/if}
</div>
<style>
    div.main {
        text-align: left;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #539260;
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        div.main {
            max-width: none;
        }
    }
</style>