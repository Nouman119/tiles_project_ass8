import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

const db = (await clientPromise).db("tiles_database");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  
  baseURL: "https://tiles-project-ass8.vercel.app",
  
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://tiles-project-ass8.vercel.app"
  ],
  cors: {
    origin: [
      "http://localhost:3000",
      "https://tiles-project-ass8.vercel.app"
    ],
    credentials: true,
  },
});