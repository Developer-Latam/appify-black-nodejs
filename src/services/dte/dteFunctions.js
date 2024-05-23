import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import dteReal from "./dteReal.js";
import dteTemporal from "./dteTemporal.js";
class DTE {
    constructor() {
        this.dteTemporal = dteTemporal;
        this.dteReal = dteReal;
    }
    async LALA(  ) {
        try {
            
        } catch (error) {
            throw new CustomError(500, "Error fetching data from API",  error.message);
        }
    }
}

export default new DTE();
