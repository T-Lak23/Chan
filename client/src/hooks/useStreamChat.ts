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
    const initChat = async () => {
      if (!token || !user) return;
      try {
        const client = StreamChat.getInstance(
          import.meta.env.VITE_STREAM_API_KEY
        );
        await client.connectUser(
          {
            id: user?.id,
            name: user.fullName as string,
            image: user.imageUrl,
          },
          token
        );
        setChatClient(client);
      } catch (error) {
        console.log("Error connecting to stream", error);
      }
    };
    initChat();

    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
  }, [token, user, chatClient]);

  return { chatClient, loading, tokenError };
};
