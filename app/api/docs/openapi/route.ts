import { getOpenApiSpec } from "@/lib/docs/openapi/spec";

export async function GET(request: Request) {
  const baseUrlFromRequest = (() => {
    try {
      return new URL(request.url).origin;
    } catch {
      return undefined;
    }
  })();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || baseUrlFromRequest || "http://localhost:3000";
  const spec = getOpenApiSpec(baseUrl);
  return Response.json(spec, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
