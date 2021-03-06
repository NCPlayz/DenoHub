import { Value } from "https://deno.land/x/deno_uri_template/mod.ts";

export function filterParameters(
  payload?: Record<string, any>
): Record<string, Value> {
  let object: Record<string, Value> = {};

  if (payload) {
    for (let k in payload) {
      let v = payload[k];
      if (v) {
        object[k] = v;
      }
    }
  }
  return object;
}

export interface ListUsersParameters {
  accept?: string;
  since?: number;
  per_page?: number;
}
