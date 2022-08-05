import os from "node:os";
import path from "node:path";
import fs from "node:fs";

const INNGEST_CONFIG_PATH = path.join(os.homedir(), ".config/inngest/state");
export const getCredentials = () => {
  const file = fs.readFileSync(INNGEST_CONFIG_PATH, "utf8");
  const config = JSON.parse(file);
  const buff = Buffer.from(config.credentials, "base64");
  return buff.toString("ascii");
};

const request = async (query = "", variables = {}) => {
  const credentials = getCredentials();
  const res = await fetch("https://api.inngest.com/gql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json());

  if (res.errors?.length && res.errors[0].message.match(/unauthorized/)) {
    console.log(res);
    throw new Error("Please login with `inngest login` to re-authorize");
  }
  return res.data;
};

export const getProductionWorkspaceID = async () => {
  const res = await request(
    `query GetWorkspaces() {
      workspaces {
        id
        name
        test
      }
    }
  `
  );
  return res.workspaces.find((w) => w.name === "default" && w.test === false)
    .id;
};

export const getEventCollections = async (workspaceID) => {
  const res = await request(
    `query GetEventCollections($workspaceID: ID!) {
      events(query: {
        workspaceID: $workspaceID
        schemaSource: "custom"
      }) {
        data {
          name
          versions {
            name
            version
            jsonSchema
          }
        }

      }
    }
  `,
    { workspaceID }
  );
  return res.events.data.map((e) => e.versions[0]);
};
