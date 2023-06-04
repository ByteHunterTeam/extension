<template>
    <div>
        <div>
            <a-alert type="error">
                {{ chrome.i18n.getMessage("warning") }}{{
                chrome.i18n.getMessage("extensionID")
                }}「{{ props.params.data.id.join("、") }}」{{
                chrome.i18n.getMessage("riskExtension")
                }}
            </a-alert>
        </div>
    </div>
</template>

<script setup>

const chrome = window.chrome

const props = defineProps({
    params: {
        type: Object
    }
})

</script>

<style scoped>

</style>