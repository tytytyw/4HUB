import {PERSONAL_SETTINGS, PERSONAL_SETTINGS_THEME, PREVIEW_THEME, RESET_PERSONAL_SETTINGS} from '../types'

const INITIAL_STATE = {
    personalSettings: {
        theme: 'blue',
        lang: 'ru',
        notify: false
    },
    previewTheme: null
}

export default function main(state = INITIAL_STATE, action) {
    switch(action.type) {
        case PERSONAL_SETTINGS:
            return {...state, personalSettings: action.payload}
        case PREVIEW_THEME:
            return {...state, previewTheme: action.payload}
        case PERSONAL_SETTINGS_THEME:
            return {...state, personalSettings: {...state.personalSettings, theme: action.payload}}
        case RESET_PERSONAL_SETTINGS:
            return {...state, personalSettings: INITIAL_STATE.personalSettings}
        default:
            return state;
    }
}