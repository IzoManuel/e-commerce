export default function (store) {
    const savedState = localStorage.getItem('vuex-state');
    if(savedState) {
        store.replaceState(JSON.parse(savedState));
    }

    store.subscribe((mutation, state) => {
        localStorage.setItem('vuex-state', JSON.stringify(state));
    });
}