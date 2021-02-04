import HttpUtil from '../utils/http.util';

export default class CatService {

    static searchImages(params = {}) {
        return HttpUtil.get('/images/search', params);
    }

    static getBreeds() {
        return HttpUtil.get('/breeds');
    }

    static getCatInfoById(catId) {
        return HttpUtil.get(`/images/${catId}`);
    }
}
