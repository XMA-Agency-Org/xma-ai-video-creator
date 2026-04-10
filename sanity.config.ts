import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaMarkup } from "@operationnation/sanity-plugin-schema-markup";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemas";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "xma-ai-video",
  title: "XMA AI Video Creator",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: "/",
    }),
    schemaMarkup(),
  ],
  document: {
    productionUrl: async (prev, context) => {
      return prev;
    },
  },
});
