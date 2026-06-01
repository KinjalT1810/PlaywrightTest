import {test} from"@playwright/test";
import { request } from "node:http";
import testData from "../data/test-data.json";

let baseurl = testData.baseurl;

//let requestContext;
//test.beforeAll(async ({request})=>{
//    requestContext = await request.newContext({
//        extraHTTPHeaders: {
//            "Accept": "application/json"
//        }
//    });
//})

test.skip("Get user api1", async ({request})=>{
    const res1 = await request.get("https://restful-booker.herokuapp.com/booking")
    console.log(await res1.json());
})

test.skip("Get user api second method", async ({request})=>{
    const requestContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com"
    });
    const res1 = await requestContext.get("/booking");
    console.log(await res1.json());
})

test("Get user api3", async ({request})=>{
    const res1 = await request.get(`${baseurl}/booking/128`);
    console.log(await res1.json());
})