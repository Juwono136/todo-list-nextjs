import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div>
      <h1>hello world</h1>
      <Button
        variant="outline"
        className="bg-red-400 border-2 border-gray-700 hover:bg-red-200 cursor-pointer"
      >
        Button
      </Button>
    </div>
  );
}
