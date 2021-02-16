<template>
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
    <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
    <span>test Sotre {{nameRef}}</span>
</template>

<script lang="ts">

import {store} from '/@/store/index'
import {
    onMounted,
    computed,
} from "vue";
import {useStore} from "vuex";

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            count: 0
        }
    },
    setup(){
        interface State {
            name: string,
        }

        const nameRef = computed(():string=>{
            return store.state.name
        })

        onMounted(()=>{
            setTimeout(()=>{
                store.commit('setName', '你好!')
            },2000)
        })

        return {
            nameRef,
        }
    }
}

</script>
