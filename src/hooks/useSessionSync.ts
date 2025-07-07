import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { getUser } from "@/features/auth/auth.services";

const supabase = createClient();

export function useSessionSync() {
  const { logout, login } = useAuth();
  
  useEffect(() => {
    console.log("useSessionSync: Starting session sync");
    
    const getSession = async () => {
      try {
        console.log("useSessionSync: Getting session");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          console.log("useSessionSync: No session, logging out");
          logout();
        } else {
          console.log("useSessionSync: Session found, getting user data");
          const userData = await getUser(session.user.id);
          console.log("useSessionSync: User data retrieved, logging in");
          login(userData);
        }
      } catch (error) {
        console.error("useSessionSync: Error in getSession:", error);
        logout();
      }
    };
    
    getSession();
    

  }, [logout, login]);
}