import MessageList from "@/components/widget/MessageList";
import { supabase } from "@/server/supabase";

export const dynamic = "force-dynamic";

export default async function MessagePannel() {
  const { data, error } = await supabase
    .from("message")
    .select("*")
    .eq("audit_status", -1)
    .order("created_at", { ascending: true })
    .neq("message", (100000 * Math.random()).toFixed(0));

  if (error) {
    console.error("Error:", error);
    return <div>Error: {error.message}</div>;
  }

  return <MessageList data={data} />;
}
