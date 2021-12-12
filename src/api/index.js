import { Router } from "express";
import servicesApi from "./service.api";
import userApi from "./user.api";

const api = Router();

api.use('/users', userApi);
api.use('/services', servicesApi);

export default api;
