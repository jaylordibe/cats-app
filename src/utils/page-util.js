export default class PageUtil {

    static getParam(key) {
        let params = new URLSearchParams(window.location.search);
        return params.get(key);
    }
}
