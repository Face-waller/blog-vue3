import {createStore,Store} from "vuex";

interface State {
    Loading: boolean,
}

const state:State = {
    Loading: false,
}

export const store = createStore({
    state: state,
    mutations: {
        showLoading(state:State, payload:string) {
            state.Loading = true
        },
        closeLoading(state:State, payload:string) {
            state.Loading = false
        },
    },
});