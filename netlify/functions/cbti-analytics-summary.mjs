import {
  buildPublicSummary,
  createAnalyticsStore,
  ensureSummarySnapshot,
  getErrorMessage,
  getAdminToken,
  isAuthorizedRequest,
  json
} from "./_cbti-analytics.mjs";

export default async (request) => {
  if (request.method !== "GET") {
    return json(
      { error: "Method Not Allowed" },
      { status: 405, headers: { Allow: "GET" } }
    );
  }

  if (!getAdminToken()) {
    return json(
      { error: "Analytics admin token is not configured" },
      { status: 503 }
    );
  }

  if (!isAuthorizedRequest(request)) {
    return json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const store = createAnalyticsStore();
    const snapshot = await ensureSummarySnapshot(store);
    return json(buildPublicSummary(snapshot.summary));
  } catch (error) {
    return json(
      {
        error: "Analytics summary unavailable",
        detail: getErrorMessage(error)
      },
      { status: 503 }
    );
  }
};
