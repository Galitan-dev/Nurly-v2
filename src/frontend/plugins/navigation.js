import { createStore } from "vuex";

export default function (pages) {
    const pageArray = Object.entries(pages).map(([ name, displayName ], index) => ({ name, displayName, index }));
    const search = new URLSearchParams(window.location.search),
        currentPage = (search.has('page') ? 
            pageArray.find(p => p.name === search.get('page')) : 
            pageArray.at(0)) ||
            pageArray.at(-1);

    const store = createStore({
        state: {
            pages: pageArray,
            currentPage: pageArray[0],
            sbSelect: 0
        },
        mutations: {
            focus(state, page) {
                state.sbSelect = page.index;
            },
            unfocus(state) {
                state.sbSelect = state.currentPage.index;

                if (state.currentPage.name == "notfound")
                    state.sbSelect = -10;
            },
            go(state, page) {
                state.currentPage = page;
                this.commit("unfocus");
            }
        }
    });

    store.commit("go", currentPage);

    const plugin = {
        install (app) {
            app.mixin({
                methods: {
                    $focusPage(pageName) {
                        const page = this.$getPage(pageName); 
                        store.commit("focus", page)
                    },
                    $unfocusPage() {
                        store.commit("unfocus");
                    },
                    $goToPage(pageName) {
                        const page = this.$getPage(pageName); 
                        store.commit("go", page);
            
                        window.history.pushState(
                            { additionalInformation: 'Skipped reloading' }, 
                            "Nurly - " + page.displayName, 
                            "?page=" + page.name
                        );
                    },
                    $getPage(pageName) {
                        return store.state.pages.find(p => p.name == pageName);
                    }
                } 
            });
        }
    }

    return [ store, plugin ];

}

/**
 * @typedef page
 * @type {object}
 * @property {string} name
 * @property {string} displayName
 * @property {number} index
 */