#!/usr/bin/env node
import fs from "node:fs";
import yaml from "js-yaml";

import { getProductionWorkspaceID, getEventCollections } from "./api.js";
import { builder } from "./builder.js";

const FILENAME = "spec.yaml";

const run = async () => {
  console.log("Fetching latest event schemas from Inngest API...");
  const workspaceID = await getProductionWorkspaceID();
  const eventCollections = await getEventCollections(workspaceID);
  const spec = builder(eventCollections);
  fs.writeFileSync(`./${FILENAME}`, yaml.dump(spec));
  console.log(`🎉 Successfully generated AsyncAPI spec!

Spec includes ${eventCollections.length} event schemas from your account.

File created at ./${FILENAME}`);
};

run();
