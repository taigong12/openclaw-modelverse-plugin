import type { ModelProviderConfig } from "openclaw/plugin-sdk/provider-model-shared";
import {
  buildModelverseModelDefinition,
  MODELVERSE_BASE_URL,
  MODELVERSE_MODEL_CATALOG,
} from "./models.js";

export function buildModelverseProvider(): ModelProviderConfig {
  return {
    baseUrl: MODELVERSE_BASE_URL,
    api: "openai-completions",
    models: MODELVERSE_MODEL_CATALOG.map(buildModelverseModelDefinition),
  };
}
