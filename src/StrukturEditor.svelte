<script>
    import Datenfeld from "./Datenfeld.svelte";
    import Datenfeldgruppe from "./Datenfeldgruppe.svelte";

    export let currentItem;
    export let currentItemJson;
    export let currentMaskInformation;

</script>

{#if currentItem && currentItem.enthaelt.datenfeld}
    <h4>Datenfeld {currentItem.enthaelt.datenfeld.identifikation.id} V{currentItem.enthaelt.datenfeld.identifikation.version}</h4>
{/if}
{#if currentItem && currentItem.enthaelt.datenfeldgruppe}
    <h4>Datenfeldgruppe {currentItem.enthaelt.datenfeldgruppe.identifikation.id} V{currentItem.enthaelt.datenfeldgruppe.identifikation.version}</h4>
{/if}

{#if currentItem && currentItem.anzahl}
    <div class="w3-row">
        <label>Anzahl
            <input class="w3-input" bind:value="{currentItem.anzahl}"/>
        </label>
    </div>
{/if}

{#if currentItem && currentItem.enthaelt.datenfeld}
    <Datenfeld currentItem="{currentItem.enthaelt.datenfeld}" {currentItemJson} {currentMaskInformation} anzahl="{currentItem.anzahl}" on:structuresChanged on:maskInformationChanged/>
{/if}
{#if currentItem && currentItem.enthaelt.datenfeldgruppe}
    <Datenfeldgruppe currentItem="{currentItem.enthaelt.datenfeldgruppe}" {currentItemJson} {currentMaskInformation} on:structuresChanged/>
{/if}