import {
  applyAgentDefaultModelPrimary,
  type OpenClawConfig,
} from "openclaw/plugin-sdk/provider-onboard";
import { buildModelverseModelDefinition, MODELVERSE_BASE_URL, MODELVERSE_MODEL_CATALOG } from "./api.js";

export const MODELVERSE_DEFAULT_MODEL_REF = "modelverse/claude-opus-4-6";

export function applyModelverseConfig(cfg: OpenClawConfig): OpenClawConfig {
  // Strip auth section — apiKey is stored directly in provider config instead
  const { auth: _auth, ...cfgBase } = cfg as Record<string, unknown>;

  // Embed apiKey from environment if available
  const apiKey: string | undefined =
    typeof process !== "undefined" ? (process.env["MODELVERSE_API_KEY"] ?? undefined) : undefined;

  // Full model metadata for config
  const configModels = MODELVERSE_MODEL_CATALOG.map(buildModelverseModelDefinition);

  const base = cfgBase as OpenClawConfig;
  const existingProvider =
    ((base.models as Record<string, unknown> | undefined)?.providers as
      | Record<string, unknown>
      | undefined)?.[
      "modelverse"
    ] ?? {};

  const updatedConfig: OpenClawConfig = {
    ...base,
    agents: {
      ...base.agents,
      defaults: {
        ...base.agents?.defaults,
        models: {
          ...base.agents?.defaults?.models,
          [MODELVERSE_DEFAULT_MODEL_REF]: {
            ...base.agents?.defaults?.models?.[MODELVERSE_DEFAULT_MODEL_REF],
            alias:
              base.agents?.defaults?.models?.[MODELVERSE_DEFAULT_MODEL_REF]?.alias ?? "Modelverse",
          },
        },
      },
    },
    models: {
      mode: (base.models as { mode?: "merge" } | undefined)?.mode ?? "merge",
      providers: {
        ...((base.models as { providers?: Record<string, unknown> } | undefined)?.providers ?? {}),
        modelverse: {
          ...(existingProvider as object),
          baseUrl: MODELVERSE_BASE_URL,
          api: "openai-completions",
          ...(apiKey ? { apiKey } : {}),
          models: configModels,
        },
      },
    } as OpenClawConfig["models"],
  };

  return applyAgentDefaultModelPrimary(updatedConfig, MODELVERSE_DEFAULT_MODEL_REF);
}
