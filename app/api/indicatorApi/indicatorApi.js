import { config } from "../config";

let instance = null;

export class IndicatorApi {
    constructor() {
        if (!instance) {
            instance = this;
            this.urlSecurities = config.links.SECURITIES;
            // this.urlTechAnalysis = 'https://dev-trading.umarkets.ai/srvgtw/techanalysis/v1/recommendations';
            // this.urlTechAnalysis = 'https://uat-trading.tradiva.com/srvgtw/techanalysis/v1/recommendations';
            this.urlTechAnalysis = config.links.TECH_ANALISIS;
        }
        return instance;
    }

    getAllAvailableMarkets = async () => {
        const parametrs = { method: 'GET' };
        const response = await this.__callFeach(config.links.SECURITIES, parametrs);
        return response;
    }

    getTechAnalysis = async (quotesArrey, timePeriodArrey) => {
        const body = { 'securities': quotesArrey, 'barTypes': timePeriodArrey };
        const parametrs = {
            method: 'POST', body: JSON.stringify(body), headers: {
                'Content-Type': 'application/json',
                'SID': 'd1d56286-e734-11e8-9f32-f2801f1b9fd1',
                'UMID': '58ea984c236c4ed89a207f23a5311db4'
            }
        };
        const response = await this.__callFeach(config.links.TECH_ANALISIS, parametrs);
        return response;
    }

    __callFeach = async (url, parametrs) => {
        try {
            const response = await fetch(url, parametrs);
            return await response.json();
        } catch (error) {
            console.warn('IndicatorApi ', error);
            return null;
        }
    }
}

