import { useParams } from "react-router-dom";

function useConversationInfo() {
  const { username } = useParams<{ username?: string }>();
  return { username };
}

export default useConversationInfo;
