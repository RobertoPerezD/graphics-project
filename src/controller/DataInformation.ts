import axios from "axios";
import * as data from "@/assets/static/data.json";

export default class InformationJSON {
    async getInformationRequest() {
        try {
            const respuesta = await axios.get(
                `https://analysis-b.onrender.com/myapp/list-blobs/`
            );
            return respuesta.data;
        } catch (error) {
            console.error("Error al obtener datos:", error);
            throw error;
        }
    }

    async parseData(data: Record<string, string>) {
        const arr = {};

        for (const key in data) {
            if (key.endsWith('.csv')) {
                const csvData: string = data[key];
                const rows: string[] = csvData.trim().split('\r\n');
                const keys: string[] = rows[0].split(';');
                const result: any[] = [];
                for (let i = 1; i < rows.length; i++) {
                    const values: string[] = rows[i].split(';');
                    const obj: any = {};
                    for (let j = 0; j < keys.length; j++) {
                        obj[keys[j]] = values[j];
                    }
                    result.push(obj);
                }
                // return JSON.stringify(result, null, 2);

                arr[key] = JSON.parse(JSON.stringify(result, null, 2))
            } else if (key.endsWith('.json')) {
                const jsonData: string = data[key];
                // return JSON.parse(jsonData);

                arr[key] = JSON.parse(jsonData)
            }
        }

        return arr
    }

    async convertInformationJSON() {
        // const data = await this.getInformationRequest();

        return await this.parseData(data);
    }
}
