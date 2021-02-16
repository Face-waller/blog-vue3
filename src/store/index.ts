import {createStore,Store} from "vuex";

interface State {
    name: string,
}

const state:State = {
    name: '123',
}

export const store = createStore({
    state: state,
    mutations: {
        // mutation的载荷payload
        setName(state:State, payload:string) {
            state.name = payload
        },
    },
});