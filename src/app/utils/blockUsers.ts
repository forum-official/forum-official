// 차단된 사용자 관리

const BLOCKED_USERS_KEY = "agora_blocked_users";

export interface BlockedUser {
  username: string;
  blockedAt: string;
}

export function getBlockedUsers(): BlockedUser[] {
  const stored = localStorage.getItem(BLOCKED_USERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function blockUser(username: string): void {
  const blockedUsers = getBlockedUsers();
  
  // 이미 차단된 사용자인지 확인
  if (blockedUsers.some(user => user.username === username)) {
    return;
  }
  
  const newBlockedUser: BlockedUser = {
    username,
    blockedAt: new Date().toISOString(),
  };
  
  blockedUsers.push(newBlockedUser);
  localStorage.setItem(BLOCKED_USERS_KEY, JSON.stringify(blockedUsers));
}

export function unblockUser(username: string): void {
  const blockedUsers = getBlockedUsers();
  const filtered = blockedUsers.filter(user => user.username !== username);
  localStorage.setItem(BLOCKED_USERS_KEY, JSON.stringify(filtered));
}

export function isUserBlocked(username: string): boolean {
  const blockedUsers = getBlockedUsers();
  return blockedUsers.some(user => user.username === username);
}
