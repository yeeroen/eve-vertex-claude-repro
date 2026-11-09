import { createVertex } from "@ai-sdk/google-vertex";
import { createVertexAnthropic } from "@ai-sdk/google-vertex/anthropic";
import { defineAgent } from "eve";

// Claude on Vertex fails to compile; Gemini on Vertex compiles. No GCP credentials are
// needed to reproduce: `eve build` fails before any model call.
const modelId = process.env.REPRO_MODEL ?? "claude-opus-5";
const project = "repro-project";

export default defineAgent({
  model: modelId.startsWith("claude-")
    ? createVertexAnthropic({ project, location: "eu" })(modelId)
    : createVertex({ project, location: "europe-west4" })(modelId),
});
