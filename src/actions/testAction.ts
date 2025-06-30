import {
  type Action,
  type IAgentRuntime,
  type Memory,
  type State,
  type HandlerCallback,
  type ActionExample
} from "@elizaos/core";

export const testActionAction: Action = {
  name: "testAction",
  description: "A simple test action",
  similes: [
    // Add similar phrases that might trigger this action
    "testaction",
    "a simple test"
  ],
  examples: [
    [
      {
        name: "user",
        content: {
          text: "Please testaction"
        }
      } as ActionExample,
      {
        name: "agent",
        content: {
          text: "I'll a simple test action for you."
        }
      } as ActionExample
    ]
  ],
  validate: async (
    _runtime: IAgentRuntime,
    _message: Memory,
    _state?: State
  ): Promise<boolean> => {
    // Add validation logic here
    const text = _message.content?.text || '';
    return text.length > 0;
  },
  handler: async (
    _runtime: IAgentRuntime,
    _message: Memory,
    _state?: State,
    _options?: { [key: string]: unknown },
    _callback?: HandlerCallback
  ): Promise<string> => {
    try {
      // Extract parameters from message or options
      const messageText = _message.content?.text || '';
      

      // Implement the action logic
      // For now, we'll acknowledge the request and simulate processing
      const actionDescription = "A simple test action";
      const responseText = `I'm now executing the testAction action to ${actionDescription.toLowerCase()}. This has been completed successfully.`;

      // You can access runtime services like this:
      // const myService = runtime.getService('MY_SERVICE');

      // For configuration values, use secrets manager when available:
      // const secretsManager = runtime.getService('SECRETS') as EnhancedSecretManager;
      // const apiKey = await secretsManager?.get('API_KEY', { level: 'global', agentId: runtime.agentId, requesterId: runtime.agentId });
      // Or use fallback: const apiKey = runtime.getSetting('API_KEY');

      // Update state if needed
      if (_state) {
        _state.lastAction = "testAction";
        _state.lastActionTime = new Date().toISOString();
      }

      if (_callback) {
        await _callback({
          text: responseText,
          type: "text",
          metadata: {
            action: "testAction",
            success: true,
            timestamp: new Date().toISOString()
          }
        });
      }

      return responseText;
    } catch (_error) {
      const errorMessage = _error instanceof Error
        ? `Failed to execute testAction: ${_error.message}`
        : `Failed to execute testAction: Unknown error`;

      if (_callback) {
        await _callback({
          text: errorMessage,
          type: "error",
          metadata: {
            action: "testAction",
            success: false,
            error: _error instanceof Error ? _error.message : 'Unknown error'
          }
        });
      }

      return errorMessage;
    }
  }
};
