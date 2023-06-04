<template>
    <div v-if="props.params.data.spender" class="mt-2">
        <div>
            <div class="text-base text-white font-bold mt-2">{{
                chrome.i18n.getMessage("permit")
                }}
            </div>
            <a-list :bordered="false">
                <a-list-item>
                    <a-list-item-meta
                            :title="props.params.data.spender.name"
                    >
                        <template #description>
                            <div class="truncate w-10/12 hover:text-blue-100 hover:underline"
                                 @click="checkAddr(props.params.network,props.params.data.spender.address)">
                                {{ props.params.data.spender.address }}
                            </div>
                        </template>
                        <template #avatar>
                            <a-avatar shape="square">
                                <img
                                        @error.once="useDefaultImage"
                                        :src="props.params.data.spender.logo"
                                />
                            </a-avatar>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </div>
        <div class="mt-4">
            <div class="text-base text-white font-bold mt-2">{{
                chrome.i18n.getMessage("related_assets")
                }}
            </div>
            <a-list :bordered="false">
                <a-list-item v-for="(item,index) in props.params.data.permit_list" :key="index">
                    <a-list-item-meta
                            :title="item.name"
                    >
                        <template #description>
                            <div class="truncate w-10/12 hover:text-blue-100 hover:underline"
                                 @click="checkAddr(props.params.network,item.contract_address)">{{
                                item.contract_address
                                }}
                            </div>
                        </template>
                        <template #avatar>
                            <a-avatar shape="square">
                                <img
                                        @error.once="useDefaultImage"
                                        :src="item.image_url"
                                />
                            </a-avatar>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </div>
    </div>
</template>

<script setup>
import {useDefaultImage, checkAddr} from "@/view/utils/main";

const chrome = window.chrome

const props = defineProps({
    params: {
        type: Object
    }
})
</script>

<style scoped>

</style>