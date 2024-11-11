"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "@/lib/queries";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;
  const repositorySlug = params.repositorySlug as string;

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: {
      username: username,
      slug: repositorySlug,
    },
  });

  if (loading) return null;

  const repository = data?.repositories[0];

  if (!repository) router.push("/404");

  return (
    <div>
      <h1>{repository?.name}</h1>
      <p>{repository?.description}</p>
    </div>
  );
}
