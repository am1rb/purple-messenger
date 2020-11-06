import { useParams } from "react-router-dom";

function useConversation() {
  const { username } = useParams<{ username?: string }>();
  return { username };
}

export default useConversation;
