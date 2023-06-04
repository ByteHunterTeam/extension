<template>
    <div class="bg-white rounded-lg p-4 w-full break-words">
        <div class="flex items-center">
            <div class="text-gray-700">Name:</div>
            <div class="text-black ml-1 font-bold" v-if="props.params.data.contract_info">
                {{ props.params.data.contract_info.name }}
            </div>
        </div>
        <div class="flex items-center my-2">
            <div class="text-gray-700">Contract:</div>
            <a v-if="params.data.contract_info"
               class="text-black ml-1 font-bold hover:text-blue-700 hover:underline"
               @click="checkAddr(props.params.network,props.params.data.contract_info.verifyingContract)">{{
                props.params.data.contract_info.verifyingContract.substring(0, 5) + '...' + props.params.data.contract_info.verifyingContract.substring(38, 42)
                }}</a>
        </div>
    </div>
</template>

<script setup>
import {checkAddr} from "@/view/utils/main";

const props = defineProps({
    params: {
        type: Object
    }
})
</script>

<style scoped>

</style>