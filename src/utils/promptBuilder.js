export function buildStructuredPrompt(query, domainConfig) {
  const timestamp = new Date().toISOString();
  return {
    id: `prompt-${Date.now()}`,
    timestamp,
    query,
    structured: `
System: Act as an expert SaaS platform generator.
Objective: Build a dashboard for "${domainConfig.domain}".
Parameters:
- Primary Color: ${domainConfig.colors.primary}
- Required Metrics: ${domainConfig.metrics.map(m => m.label).join(', ')}
- Table Columns: ${domainConfig.tableColumns.join(', ')}
    `.trim(),
  };
}
