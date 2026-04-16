import { defineSingleProviderPluginEntry } from "openclaw/plugin-sdk/provider-entry";
import { applyModelverseConfig, MODELVERSE_DEFAULT_MODEL_REF } from "./onboard.js";
import { buildModelverseProvider } from "./provider-catalog.js";

const PLUGIN_ID = "openclaw-modelverse-plugin";
const PROVIDER_ID = "modelverse";

export default defineSingleProviderPluginEntry({
  id: PLUGIN_ID,
  name: "Modelverse Provider",
  description: "Modelverse (UCloud) AI model gateway — OpenAI-compatible provider plugin for OpenClaw",
  provider: {
    id: PROVIDER_ID,
    label: "Modelverse",
    docsPath: "/providers/modelverse",
    auth: [
      {
        methodId: "api-key",
        label: "Modelverse API key",
        hint: "Obtain your API key at console.ucloud-global.com/modelverse",
        optionKey: "modelverseApiKey",
        flagName: "--modelverse-api-key",
        envVar: "MODELVERSE_API_KEY",
        promptMessage: "Enter Modelverse API key",
        defaultModel: MODELVERSE_DEFAULT_MODEL_REF,
        applyConfig: (cfg) => applyModelverseConfig(cfg),
        wizard: {
          choiceId: "modelverse-api-key",
          choiceLabel: "Modelverse API key",
          groupId: "modelverse",
          groupLabel: "Modelverse",
          groupHint: "UCloud Modelverse",
        },
      },
    ],
    catalog: {
      buildProvider: buildModelverseProvider,
    },
    matchesContextOverflowError: ({ errorMessage }) =>
      /\bmodelverse\b.*(?:context.*exceed|token.*limit|too long)/i.test(errorMessage),
  },
});
