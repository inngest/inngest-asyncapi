# Inngest AsyncAPI

Automatically generate an AsyncAPI spec file from your [Inngest Cloud](https://www.inngest.com) account.

To start, clone this repo and run the following commands:

_**Requirement:** You must be logged in via the Inngest CLI ([docs](https://www.inngest.com/docs/cli/login))_

```
npm install
node index.js
npm install -g @asyncapi/cli
asyncapi start studio -f ./spec.yaml
```

That's it! You should now be viewing your automatically generated API spec from your Inngest Cloud events.

## Why

**Why AsyncAPI?** AsyncAPI is awesome because it is a standard specification which can be used to document event-driven systems. It can also be used with tools that can generate code or system architecture diagrams.

**Why this works with Inngest?** Inngest Cloud parses and saves the schema of every single event that is received in multiple formats: JSONSchema, Cue, and as a TypeScript type.

Inngest Cloud can be combined with AsyncAPI to create a self-documenting event-driven system architecture.
