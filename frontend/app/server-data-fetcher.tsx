import { GetDataDocument, GetDataQuery } from "@/graphql/graphql";
import { serverClient } from "@/lib/apollo-client";
import { cookies } from "next/headers";

export async function ServerDataFetcher() {
  const cookieStore = cookies();
  const browserToken = cookieStore.get("browser_token");

  const data = await serverClient.query<GetDataQuery>({
    query: GetDataDocument,
    context: {
      headers: {
        ...(browserToken && { "Browser-Token": browserToken.value }),
      },
    },
  });

  const newBrowserToken = data.data?.currentUser?.browserToken;

  if (
    newBrowserToken &&
    newBrowserToken !== "" &&
    newBrowserToken !== browserToken?.value
  ) {
    await fetch("http://localhost:3001/api/cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newBrowserToken }),
    });
  }

  return {
    data: {
      currentUser: data.data?.currentUser,
      environments: data.data?.environments,
    },
  };
}
