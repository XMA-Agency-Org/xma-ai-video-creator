import { NextSchemaScript } from "@operationnation/sanity-plugin-schema-markup";
import { projectId, dataset } from "@/sanity/env";

type BlogSchemaScriptProps = {
  schemaMarkup?: unknown[];
};

export function BlogSchemaScript({ schemaMarkup }: BlogSchemaScriptProps) {
  if (!schemaMarkup || !projectId) return null;

  return (
    <NextSchemaScript
      schema={schemaMarkup as any[]}
      projectId={projectId}
      dataset={dataset}
    />
  );
}
