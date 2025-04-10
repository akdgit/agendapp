import { config } from "dotenv";

config();
//railway servr backend
export default {
    database: {
        host: process.env.MYSQL_HOST || 'mysql.railway.internal',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'GsxfHYccOQErmPwUiVAJzXAxiutqzemS',
        database: process.env.MYSQL_DATABASE || 'railway'
    }
    
};

//local
/*export default {
    host: process.env.MYSQL_HOST || "",
    database: process.env.MYSQL_DATABASE || "",
    user: process.env.MYSQL_USER || "",
    password: process.env.MYSQL_PASSWORD || ""
}*/