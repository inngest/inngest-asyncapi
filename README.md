# Inngest AsyncAPI

Automatically generate an AsyncAPI spec file from your [Inngest Cloud](https://www.inngest.com) account.

After being logged in with the [Inngest CLI](https://www.inngest.com/docs/cli/installation) you can quickly generate an AsyncAPI schema from your account using the following command:

```
npx @inngest/asyncapi
```

You should now have a properly formatted AsyncAPI spec in a new `spec.yaml` file!

You can now explore your spec using the [AsyncAPI Studio](https://studio.asyncapi.com/). You can do this right on the web studio or with the Async API CLI:

```
npm install -g @asyncapi/cli
asyncapi start studio -f ./spec.yaml
```

That's it! You should now be viewing your automatically generated API spec from your Inngest Cloud events.

## Why

**Why AsyncAPI?** AsyncAPI is awesome because it is a standard specification which can be used to document event-driven systems. It can also be used with tools that can generate code or system architecture diagrams.

**Why this works with Inngest?** Inngest Cloud parses and saves the schema of every single event that is received in multiple formats: JSONSchema, Cue, and as a TypeScript type.

Inngest Cloud can be combined with AsyncAPI to create a self-documenting event-driven system architecture.
