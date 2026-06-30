import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    fileParallelism: false,
    exclude: ["dist/**", "node_modules/**"],
    coverage: {
      reporter: ["text", "html"]
    }
  }
});
