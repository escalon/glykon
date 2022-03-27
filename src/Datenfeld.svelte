<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let currentItem;
    export let currentItemJson;

    let bezeichnungEingabeInput; // TODO to focus when the item is new

    function bezeichnungEingabeChanged() {
        dispatch("structuresChanged")
    }
</script>

<style></style>

{#if currentItem && currentItem.TYPE_NAME == 'xdf.Datenfeld'}
    <div class="w3-row">
        <label>Bezeichnung Eingabe
            <input class="w3-input" bind:value="{currentItem.bezeichnungEingabe}"
                   on:change={bezeichnungEingabeChanged}
                   bind:this={bezeichnungEingabeInput}
            />
        </label>
    </div>
    <div class="w3-row">
        <label>Bezeichnung Ausgabe
            <input class="w3-input" bind:value="{currentItem.bezeichnungAusgabe}"/>
        </label>
    </div>
    <div class="w3-row">
        <label>Name
            <input class="w3-input" bind:value="{currentItem.name}"/>
        </label>
    </div>
    <div class="w3-row">
        <label>Hilfetext Eingabe
            <textarea class="w3-input" rows="3" bind:value={currentItem.hilfetextEingabe}></textarea>
        </label>
    </div>
    <div class="w3-row">
        <label>Hilfetext Ausgabe
            <textarea class="w3-input" rows="3" bind:value={currentItem.hilfetextAusgabe}></textarea>
        </label>
    </div>
    <div class="w3-row">
        <label>Feldart
            <input class="w3-input" bind:value="{currentItem.feldart.code}"/>
        </label>
    </div>
    {#if currentItem.codelisteReferenz}
        <div class="w3-row">
            <label>Codeliste Referenz
                <input class="w3-input" bind:value="{currentItem.codelisteReferenz.identifikation.id}"/>
            </label>
        </div>
    {/if}
    <div class="w3-row">
        <label>Datentyp
            <input class="w3-input" bind:value="{currentItem.datentyp.code}"/>
        </label>
<!--        <select bind:value={selected} on:change="{() => answer = ''}">-->
<!--            {#each questions as question}-->
<!--                <option value={question}>-->
<!--                    {question.text}-->
<!--                </option>-->
<!--            {/each}-->
<!--        </select>-->
    </div>
    <div class="w3-row">
        <label>Präzisierung
            <input class="w3-input" bind:value="{currentItem.praezisierung}"/>
        </label>
    </div>
    <div class="w3-row">
        <label>Inhalt
            <textarea class="w3-input" rows="3" bind:value={currentItem.inhalt}></textarea>
        </label>
    </div>
    <div class="w3-row">
        <label>Beschreibung
            <textarea class="w3-input" rows="3" bind:value={currentItem.beschreibung}></textarea>
        </label>
    </div>
    <div class="w3-row">
        <label>Definition
            <textarea class="w3-input" rows="3" bind:value={currentItem.definition}></textarea>
        </label>
    </div>
    <div class="w3-row">
        <label>Bezug
            <textarea class="w3-input" rows="3" bind:value={currentItem.bezug}></textarea>
        </label>
    </div>
    <div class="w3-row">
        <label>Fachlicher Ersteller
            <input class="w3-input" bind:value="{currentItem.fachlicherErsteller}"/>
        </label>
    </div>
    <div class="w3-row">
        <label>Schemaelementart
            <input class="w3-input" bind:value="{currentItem.schemaelementart.code}"/>
        </label>
    </div>
    <p>
        <label>Quelltext
            <textarea class="w3-input" rows="30" cols="80" disabled>{currentItemJson}</textarea>
        </label>
    </p>
{/if}
