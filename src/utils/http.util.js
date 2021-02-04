export default class HttpUtil {

    static getRequestHeaders() {
        return {
            'Content-Type': 'application/json',
            'x-api-key': process.env.CAT_API_KEY
        };
    }

    static composeUrl(urlPath) {
        return `https://api.thecatapi.com/v1${urlPath}`;
    }

    static composeUrlWithQueryParams(url, params) {
        let urlWithQueryParams = url;
        const isParamsNotEmpty = Object.keys(params).length !== 0;

        if (isParamsNotEmpty) {
            const queryParams = Object.keys(params).map(key => key + '=' + params[key]).join('&');
            urlWithQueryParams = `${url}?${queryParams}`;
        }

        return urlWithQueryParams;
    }

    static async get(urlPath, params = {}) {
        let url = this.composeUrl(urlPath);
        url = this.composeUrlWithQueryParams(url, params);

        const response = await fetch(url, {
            method: 'GET',
            headers: this.getRequestHeaders()
        });

        return response.json();
    }
}
