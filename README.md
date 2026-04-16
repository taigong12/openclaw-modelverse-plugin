# @ucloud/openclaw-modelverse-plugin

[OpenClaw](https://github.com/openclaw/openclaw) plugin for [Modelverse](https://astraflow.ucloud.cn/modelverse) — UCloud's AI model gateway with 140+ models (GPT, Claude, DeepSeek, Qwen, Grok, Kimi, MiniMax, GLM, ERNIE, and more) via a unified OpenAI-compatible API.

## Requirements

- OpenClaw 2026.x or later
- A Modelverse API key — obtain one at [console.ucloud-global.com/modelverse](https://console.ucloud-global.com/modelverse/experience/api-keys)

## Installation

**From npm:**

```bash
openclaw plugins install @ucloud/openclaw-modelverse-plugin
```

**From source:**

```bash
git clone https://github.com/taigong12/openclaw-modelverse-plugin.git ~/.openclaw/extensions/openclaw-modelverse-plugin
```

## Setup

You can optionally set the API key as an environment variable before running either option below — it will be detected automatically so you only need to confirm with one keypress:

```bash
export MODELVERSE_API_KEY=<your-api-key>
```

**Option 1 — Full onboard wizard:**

```bash
openclaw onboard
```

**Option 2 — Quick auth login:**

```bash
openclaw models auth login --provider modelverse
```

## Supported Models

| Family | Example Models |
|--------|----------------|
| OpenAI | `gpt-5.4`, `gpt-5.2`, `gpt-5.1`, `gpt-4.1-mini`, `o4-mini`, `o3-mini` |
| Anthropic | `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-sonnet-4.5-thinking` |
| DeepSeek | `deepseek-ai/DeepSeek-V3.2`, `deepseek-ai/DeepSeek-R1` |
| Qwen | `Qwen/Qwen3-Max`, `Qwen/Qwen3-235B-A22B-Thinking-2507`, `Qwen/QwQ-32B` |
| Doubao | `doubao-seed-2-0-pro-260215`, `ByteDance/doubao-seed-1.6` |
| Grok | `grok-4`, `grok-4-fast-reasoning` |
| Kimi | `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2-Thinking` |
| MiniMax | `MiniMax-M2.7`, `MiniMax-M2.5-lightning` |
| GLM | `zai-org/glm-5`, `glm-5.1` |
| ERNIE | `baidu/ernie-4.5-turbo-128k`, `baidu/ernie-x1-turbo-32k` |

Use any model with the `modelverse/` prefix:

```
modelverse/claude-opus-4-6
modelverse/deepseek-ai/DeepSeek-V3.2
modelverse/gpt-5.4
```

## Links

- [Modelverse Platform](https://astraflow.ucloud.cn/modelverse)
- [API Key Console](https://console.ucloud-global.com/modelverse/experience/api-keys)
- [OpenClaw Documentation](https://docs.openclaw.ai)
- [ClawhHub Plugin Page](https://clawhub.openclaw.ai/plugins/@ucloud/openclaw-modelverse-plugin)

## License

MIT
