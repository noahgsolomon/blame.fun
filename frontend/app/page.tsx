import UserEnvironments from "./user-environments";
import CreateEnvironment from "./create-environment";
import { ServerDataFetcher } from "./server-data-fetcher";

export default async function Page() {
  const { data } = await ServerDataFetcher();
  return (
    <div className="flex h-[75%] items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <CreateEnvironment />
        <UserEnvironments environments={data.environments} />
      </div>
    </div>
  );
}
