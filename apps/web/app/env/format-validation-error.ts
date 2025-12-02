type ValidationIssue = readonly {
  path?: readonly unknown[];
  message: string;
}[];

export function formatValidationError(issues: ValidationIssue): string {
  const formattedIssues = issues.map((issue) => {
    const issueObj = issue as Record<string, unknown>;
    const formatted: Record<string, unknown> = {};

    if ("expected" in issueObj) {
      formatted.expected = issueObj.expected;
    }
    if ("code" in issueObj) {
      formatted.code = issueObj.code;
    }
    if ("path" in issueObj) {
      formatted.path = issueObj.path;
    }
    if ("message" in issueObj) {
      formatted.message = issueObj.message;
    }
    if ("received" in issueObj) {
      formatted.received = issueObj.received;
    }

    return formatted;
  });

  return `❌ Invalid environment variables: ${JSON.stringify(formattedIssues, null, 2)}`;
}
