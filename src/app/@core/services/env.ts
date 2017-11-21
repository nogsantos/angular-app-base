/**
 * Env defaults
 */
export default {
    app: {
        event: { // publish para EventAggregator
            update: 'update',
            auxiliar: 'auxiliar'
        },
        conf: {
            token_name: btoa(`${new Date().getDate()}${new Date().getMonth()}${new Date().getFullYear()}${new Date().getDay()}`),
        },
        messages: {
            duration: { // milisec
                success: 3000,
                warn: 4000,
                error: 5000,
                info: 6000,
                help: 7000
            }
        }
    },
    media_query_screen: {
        small_up: 601,
        medium_up: 993,
        large_up: 1201,
        small: 600,
        medium: 992,
        large: 1200,
    }
};
