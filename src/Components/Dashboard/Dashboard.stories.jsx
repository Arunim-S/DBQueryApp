import React from "react";
import Dashboard from "./Dashboard";
import { PublicClientApplication } from "@azure/msal-browser";
const msalConfig = {
    auth: {
      clientId: "c5a73855-31a7-4bfa-a0db-4f7ddef05b49",
      authority:
        "https://login.microsoftonline.com/4d4343c6-067a-4794-91f3-5cb10073e5b4",
      redirectUri: "http://localhost:6006/?path=/story/components-dashboard--primary",
    },
  };
const pca = new PublicClientApplication(msalConfig);
const scopes = ["user.read"];
export default {
    title: 'components/Dashboard',
    component: Dashboard
}

export const Primary = ()=><Dashboard pca={pca} scopes={scopes}></Dashboard>