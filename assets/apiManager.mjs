class ApiManager {
    /**
     * @return {ApiManager}
     */
    static getSingleton () {
        if(!ApiManager.singleton) ApiManager.singleton = new ApiManager();
        return ApiManager.singleton;
    }

    constructor() {
        this.baseURL = "http://192.168.1.50:31830";
    }

    async getAll() {
        try {
            const answer = await fetch(`${this.baseURL}`, {method: "get"});
            if(answer.ok) {
                return await answer.json();
            }

            return false;
        }catch (e) {
            console.error(e);
            return false;
        }
    }
}
export default ApiManager.getSingleton();
