import callApi from '../helpers/apiHelper';

const detailsEndpoint = id => `details/fighter/${id}.json`;
class FighterService {
    #endpoint = 'fighters.json';

    #detailsEndpoint = detailsEndpoint;

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        // todo: implement this method
        // endpoint - `details/fighter/${id}.json`;
        try {
            const apiResult = await callApi(this.#detailsEndpoint(id));
            return apiResult;
        } catch (error) {
            throw error;
        }
    }
}

const fighterService = new FighterService();

export default fighterService;
