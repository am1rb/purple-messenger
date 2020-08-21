import { useParams } from "react-router";

function useConversation() {
  const { username } = useParams<{ username?: string }>();
  return { username };
}

export default useConversation;
