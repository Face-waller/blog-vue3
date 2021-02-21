<template>
    <loading :show="Loading"></loading>
    <RouterView></RouterView>
</template>
<script>
import loading from "@/components/loading/loading.vue";

import {useStore} from "vuex";

import {
    computed,
    defineComponent,
    ref,
    provide,
    nextTick,
} from 'vue';

export default defineComponent({
    components: {
        loading,
    },
    setup() {
        const isRouterAlive = ref(true)

        const nextFn = async (before, after)=>{
            before()
            await nextTick()
            after()
        }

        const reload = ()=> {
            nextFn(()=>{
                isRouterAlive.value = false;   // 先关闭
            },()=>{
                isRouterAlive.value = true   // 再打开
            })
        }

        provide('reload', reload)
        provide('nextFn',nextFn)

        // 遮罩层
        const store = useStore()
        const Loading = computed(()=>{
            return store.state.Loading
        })

        return {
            Loading,
            isRouterAlive,
            reload
        }
    },

})

</script>

