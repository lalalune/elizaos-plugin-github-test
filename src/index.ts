import { IAgentRuntime, logger, Plugin } from "@elizaos/core";
import { testActionAction } from './actions/testAction';

export const PlugingithubtestPlugin: Plugin = {
  name: "@elizaos/plugin-github-test",
  description: "Test plugin for GitHub push validation",

  // Declare dependencies
  dependencies: ['@elizaos/core', 'axios'],

  actions: [
    testActionAction
  ],
};

// Export individual components for direct use
export {
  testActionAction
};

// Default export
export default PlugingithubtestPlugin;
