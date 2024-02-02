import { initVovk } from "vovk";
import GreetingController from "../../../modules/greeting/GreetingController";

const controllers = { GreetingController };
const workers = {};

export type Controllers = typeof controllers;
export type Workers = typeof workers;

export const { GET } = initVovk({ controllers, workers });