<template>
    <div>
        <div class="flex w-full">
            <div
                    class="grid h-20 flex-grow card bg-white rounded-box place-items-center w-2/5 border border-gray-100">
                <div class="flex flex-col items-center">
                    <div class="text-lg text-black font-bold">${{ props.params.data.sending.symbol_id }}</div>
                    <div class="text-base text-yellow-500 truncate">
                        {{ handleBigNumber(props.params.data.sending.amount) }}
                    </div>
                </div>
            </div>
            <div class="divider divider-horizontal">
                <span class="text-2xl font-bold">➡️</span>
            </div>
            <div
                    class="grid h-20 flex-grow card bg-white rounded-box place-items-center w-2/5  border border-gray-100">
                <div class="flex flex-col items-center">
                    <div class="text-lg text-black font-bold">${{ props.params.data.receive.symbol_id }}</div>
                    <div class="text-base text-yellow-500">{{
                        handleBigNumber(props.params.data.receive.amount)
                        }}
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full">
            <div class="block flex items-center p-4 text-black">
                <div>{{ chrome.i18n.getMessage("receiver") }}</div>
                <div class="badge badge-ghost badge-md ml-2">
                    {{
                        props.params.data.recipient.substring(0, 5) + '...' + props.params.data.recipient.substring(37, 42)
                    }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import {handleBigNumber} from "../utils/main";

const props = defineProps({
    params: {type: Object}
})

const chrome = window.chrome
</script>

<style scoped>

</style>
