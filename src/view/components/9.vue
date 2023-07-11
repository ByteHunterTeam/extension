<template>
    <div class="rounded-lg p-4 w-full">
        <a-descriptions :data="Type9Data.contract" :title="chrome.i18n.getMessage('contract')"
                        layout="inline-horizontal" size="small"/>
        <a-divider style="border-bottom: 1px solid white;"/>
        <a-descriptions :data="Type9Data.sign" :title="chrome.i18n.getMessage('signature')"
                        layout="inline-horizontal" size="small"
                        :column="1"
                        v-if="!isEmpty(props.params.data.signature_data)"/>
    </div>
</template>

<script setup>
import {forIn, isEmpty} from "lodash-es";
import {computed} from "vue";

const chrome = window.chrome

const props = defineProps({
    params: {
        type: Object
    }
})

const Type9Data = computed(() => {
    if (props.params.type === 9) {
        const signList = []
        forIn(props.params.data.signature_data, (val, key) => {
            signList.push({
                label: key,
                value: val
            })
        })
        return {
            contract: [
                {
                    label: "Name",
                    value: props.params.data.contract_info.name || 'unknown'
                },
            ],
            sign: signList
        }
    }
    return undefined
})
</script>

<style scoped>

</style>
