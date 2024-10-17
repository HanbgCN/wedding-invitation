import { createClient } from "@/server/supabase";
import WishForm from "./WishForm";

export default function WishFormAction() {
  const handleSubmit = async (name: string, message: string) => {
    "use server";

    const supabase = createClient();
    const { data, error } = await supabase
      .from("message")
      .insert({ owner: name, message: message, audit_status: -1 });

    if (error) {
      console.error("Error:", error);
      return false;
    } else {
      console.log("Inserted data:", data);
      return true;
    }
  };
  return <WishForm onSubmit={handleSubmit} />;
}
