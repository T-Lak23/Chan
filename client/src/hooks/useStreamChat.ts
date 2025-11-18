import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { getStreamToken } from "../lib/api";

export const useStreamChat = async () => {
  const [chatClient, setChatClient] = useState<StreamChat>();
  const [token, setToken] = useState();
  const [tokenError, setTokenError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  let mounted = true;
  const fetchToken = async () => {
    if (!user?.id) return;
    setLoading(true);
    setTokenError(null);
    try {
      if (mounted) {
        const { tok } = await getStreamToken();
        setToken(tok);
      }
    } catch (error) {
      if (mounted) setTokenError(error);
    } finally {
      if (mounted) setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
    return () => {
      mounted = false;
    };
  }, [user?.id]);

  useEffect(() => {
    if (!token || !user?.id || !import.meta.env.VITE_STREAM_API_KEY) return;
    const client = StreamChat.getInstance(import.meta.env.VITE_STREAM_API_KEY);
    let cancelled = false;
    const initChat = async () => {
      try {
        await client.connectUser(
          {
            id: user?.id,
            name:
              user.fullName ??
              user.username ??
              user.primaryEmailAddress?.emailAddress ??
              user.id,
            image: user.imageUrl,
          },
          token
        );
        if (!cancelled) setChatClient(client);
      } catch (error) {
        console.log("Error connecting to stream", error);
      }
    };
    initChat();

    return () => {
      cancelled = true;
      if (chatClient) chatClient.disconnectUser();
    };
  }, [token, user?.id]);

  return { chatClient, loading, tokenError };
};
