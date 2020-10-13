import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

/**
 * 匹配 ./components 中任意資料夾 的 js(vuex state)
 * @see https://webpack.js.org/guides/dependency-management/#requirecontext
 */
const files = require.context("./components", true, /\.js$/)
const modules = {}
files.keys().forEach(key => {
    if(/State\.js$/.test(key)){
        modules[key.replace(/^\.\/.*\//,"").replace(/State\.js/,"")] = files(key).default
    }
})
console.log("%c match modules", 'background:#bada55;color:#000', modules)

/** @see https://vuex.vuejs.org/zh/guide/plugins.html#%E5%86%85%E7%BD%AE-logger-%E6%8F%92%E4%BB%B6 */
const debug = process.env.NODE_ENV !== 'production'
const logger = createLogger({
    filter(mutation) {
        const filters = [
            "UPDATE_WINDOW_SIZE"
        ]
        return filters.indexOf(mutation.type) === -1
    }
})
Vue.use(Vuex)

const store = new Vuex.Store({
    strict: debug,
    plugins: debug ? [logger] : [],
    modules: modules,
    state: {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        layerCardVisible: false,
        resultCardVisible: false,
        currentTag: {
            label: '',
            value: ''
        },
        windyOption: {
            visible: false,
            location: ''
        },
        GACount: {
            pageviews: 0,
            users: 0
        }
    },
    actions: {},
    mutations: {
        /** 更新 視窗寬度 */
        UPDATE_WINDOW_SIZE: (state, payload) => {
            Object.keys(payload).forEach(k => {
                if (k.match(/width/ig)) {
                    state.screenWidth = payload[k]
                }
                if (k.match(/height/ig)) {
                    state.screenHeight = payload[k]
                }
            })
        },
        /** 側邊欄狀態變更 */
        SET_CARD_VISIBLE: (state, { key, bool }) => state[`${key}CardVisible`] = bool,
        /** windy 氣象資料是否使用 */
        SET_WINDY_OPTION: (state, { visible, location = '' }) => {
            if (visible !== undefined) {
                state.windyOption.visible = visible
            }
            state.windyOption.location = location || state.windyOption.location
        },
        /** 主題標籤變更 */
        SET_CURRENT_TAG: (state, { label, value }) => {
            state.currentTag.label = label
            state.currentTag.value = value
        },
        /** 統計人次 */
        SET_GA_COUNT: (state, payload) => state.GACount = payload
    },
    getters: {
        isMobile: state => state.screenWidth < 576,
        isAndroid: state => {
            const u = navigator.userAgent
            return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
        },
        isIOS: state => !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        windyOption: state => state.windyOption
    }
})

export default store;