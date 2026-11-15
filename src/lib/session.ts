const CHAT_SESSION_KEY = "ekk_chat_session_id";

/**
 * Returns the persisted chat session ID from localStorage, or creates and stores one if missing.
 */
export function getOrCreateChatSessionId(): string | null {
  try {
    let sid = localStorage.getItem(CHAT_SESSION_KEY);
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      localStorage.setItem(CHAT_SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return null;
  }
}
