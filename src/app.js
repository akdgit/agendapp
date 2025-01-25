import express from "express";
import session from "express-session";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//Routes
import activitiesRoute from "./routes/activities-routes";
import userRoutes from "./routes/users-routes";
import userActivitiesRoutes from "./routes/activitiesQueriesRoutes";
import cors from "cors";
import sendRecoveryCode from "./routes/sendEmail-routes";

const app = express();

app.use(session({
    secret: 'Areasverdes55',  // Cambia esto por un secreto más seguro en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Usa `true` si estás utilizando HTTPS
}));

//setting
app.set("port", 4000);

//middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true})); //new
app.use(cookieParser() );

//routes
app.use("/api/activities", activitiesRoute);
app.use("/api/activities/actuser", activitiesRoute);
app.use("/api/act-user", userActivitiesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", sendRecoveryCode);

export default app;
