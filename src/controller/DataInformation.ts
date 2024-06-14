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
    const arr: { orders: object[]; products: object[] } = {
      orders: [],
      products: [],
    };

    for (const key in data) {
      if (key.endsWith(".csv")) {
        const csvData: string = data[key];
        const rows: string[] = csvData.trim().split("\r\n");
        const keys: string[] = rows[0].split(";");
        const result: any[] = [];
        for (let i = 1; i < rows.length; i++) {
          const values: string[] = rows[i].split(";");
          const obj: any = {};
          for (let j = 0; j < keys.length; j++) {
            obj[keys[j]] = values[j];
            obj["level"] = key;
          }
          result.push(obj);
        }
        arr.orders.push(result);
      } else if (key.endsWith(".json")) {
        const jsonData: string = data[key];
        const json = JSON.parse(jsonData);
        json[0]["level"] = key;
        arr.products.push(json);
      }
    }

    // Merge orders and products arrays into a single array
    const mergedArray1 = [...arr.orders.flat()];
    const mergedArray2 = [...arr.products.flat()];

    return { orders: mergedArray1, products: mergedArray2 };
  }

  async convertInformationJSON() {
    const data = await this.getInformationRequest();

    return await this.parseData(data);

    // return await this.parseData(data);
  }
}
