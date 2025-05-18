"use client";

import { fetchUser } from "@/lib/fetchUser";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);
      setLoading(false);
    };

    loadUser();
  }, []);

  return { user, setUser, loading };
};
