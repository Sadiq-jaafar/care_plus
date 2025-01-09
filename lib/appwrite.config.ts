import * as sdk from "node-appwrite"
export const {
    PROJECT_ID, API_KEY, DATABASE_ID, PATIENT_COLLECTION_ID,DOCTOR_COLLECTION_ID, APPOINTMENT_COLLECTION_ID, NEXT_PUBLIC_BUCKET_ID:BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT:ENDPOINT
}= process.env;

const client = new sdk.Client();

client
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);
export const database = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const messaging = new sdk.Messaging(client)
export const users = new sdk.Users(client)

// import * as sdk from "node-appwrite";

// const ENDPOINT = "https://cloud.appwrite.io/v1";
// const PROJECT_ID = "677b9b6f000b8993f8f1";
// const API_KEY = "standard_7800874f3ef5413641e67e0e175a26670b62d5ebbf389df45bdabfcc390e750c3debfad637c37f94575818c294db4b138690e39396510685ecb22389c99ded42d46f39b26a04a418c22df12a6984574650e477c9b32842bcc2cb1cfc228b8ae6d4b6174a14d6f5d311a8cae37a68f83770802d60559dacc42f770e23ad05ad12";

// const client = new sdk.Client();

// client
//   .setEndpoint(ENDPOINT)
//   .setProject(PROJECT_ID)
//   .setKey(API_KEY);

// export const users = new sdk.Users(client);