export const builder = (eventCollections) => {
  const spec = {
    asyncapi: "2.5.0",
    info: {
      title: "Inngest Events",
      version: new Date().toISOString(),
    },
    defaultContentType: "application/json",
    servers: {
      inngest: {
        url: "https://inn.gs/e/{apiKey}",
        protocol: "https",
        variables: {
          apiKey: {
            description: "An Inngest Source API Key",
          },
        },
      },
    },
    channels: {},
  };

  spec.channels = eventCollections.reduce((acc, eventCollection) => {
    acc[eventCollection.name] = {
      publish: {
        message: {
          name: eventCollection.name,
          schemaFormat: "application/schema+json;version=draft-07",
          payload: eventCollection.jsonSchema,
        },
      },
    };
    return acc;
  }, {});

  return spec;
};
