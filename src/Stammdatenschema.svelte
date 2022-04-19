<script>
    import Struktur from "./Struktur.svelte";
    import StrukturEditor from "./StrukturEditor.svelte"
    import StammdatenschemaRoot from "./StammdatenschemaRoot.svelte";
    import StammdatenschemaEditor from "./StammdatenschemaEditor.svelte";

    export let stammdatenschema;
    // export let structures = [];
    export let maskInformation;

    let structures = [];
    let currentItem;
    let currentFimIdPath;
    let currentMaskInformation = {};
    let currentItemJson = "";
    let indent = 18

    $: if (stammdatenschema) {
        structures = stammdatenschema.struktur;
    }

    function selectCurrentItem(event) {
        currentFimIdPath = event.detail.fimIdPath;
        if (!maskInformation.profile['seitenbau'][currentFimIdPath]) {
            maskInformation.profile['seitenbau'][currentFimIdPath] = {};
        }
        currentMaskInformation = maskInformation.profile['seitenbau'][currentFimIdPath];
        const structure = event.detail.current;
        console.log(`structure: ${JSON.stringify(structure)}`);
        currentItem = structure;
        const currentItemClone = Object.assign({}, structure); // clone structure to delete struktur from it for json display
        delete currentItemClone.struktur;
        currentItemJson = JSON.stringify(currentItemClone, null, 2);
    }

    function updateStructures() {
        structures = structures;
    }

    function updateStammdatenschema() {
        stammdatenschema = stammdatenschema;
    }

    function updateMaskInformation() {
        console.log("updateMaskInformations")
        maskInformation = maskInformation;
    }


</script>

<style>
</style>

<div class="stammdatenschema w3-cell-row">

    <div class="structures w3-container w3-cell" style="width:45%">
        <!--{JSON.stringify(maskInformation)}-->
        <StammdatenschemaRoot {stammdatenschema} on:currentItemSelected={selectCurrentItem}/>
        {#each structures as structure, i}
            <Struktur struktur={structure} parentStructures={structures} indent="{indent}" index="{i}"
                      fimIdPath="{structure.enthaelt.datenfeld ? structure.enthaelt.datenfeld.identifikation.id : structure.enthaelt.datenfeldgruppe.identifikation.id}"
                      on:currentItemSelected={selectCurrentItem} on:structuresChanged={updateStructures}/>
        {/each}
    </div>

    <form class="editor w3-container w3-light-grey w3-cell" style="margin-left:46%">
        {#if currentItem && currentItem.enthaelt}
            <StrukturEditor {currentItem} {currentItemJson} {currentMaskInformation}
                            on:structuresChanged="{updateStructures}"
                            on:maskInformationChanged={updateMaskInformation}/>
        {:else}
            <StammdatenschemaEditor {currentItem} on:structuresChanged={updateStammdatenschema}/>
        {/if}
    </form>

</div>