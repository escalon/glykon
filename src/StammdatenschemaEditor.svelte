<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let currentItem;

    function bezeichnungEingabeChanged() {
        dispatch("structuresChanged")
    }
</script>

{#if currentItem}
    <h4>Stammdatenschema {currentItem.identifikation.id} V{currentItem.identifikation.version}</h4>
    <div class="w3-row">
        <label>Bezeichnung Eingabe
            <input class="w3-input" bind:value="{currentItem.bezeichnungEingabe}" on:change={bezeichnungEingabeChanged}/>
        </label>
    </div>
{/if}
