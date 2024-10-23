import UserEnvironments from "../user-environments";
import CreateEnvironment from "../create-environment";

export default async function Page() {
  return (
    <div className="flex h-[75%] items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <CreateEnvironment />
        <UserEnvironments />
      </div>
    </div>
  );
}
