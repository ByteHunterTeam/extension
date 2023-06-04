<template>
    <div>
        <a-alert type="error">
            {{
            chrome.i18n.getMessage("warning")
            }}{{ chrome.i18n.getMessage("phishingWebsite") }}
        </a-alert>
    </div>
</template>

<script setup>

const chrome = window.chrome
</script>

<style scoped>

</style>