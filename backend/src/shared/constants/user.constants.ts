export enum USER_STATUS {
  WAITING_ID,
  APPROVED_ID,
  DISAPPROVED_ID,
  BLOCKED_ID,
  LOGIN_ATTEMPTS_BLOCKED_ID,
  DELETED_ID,
}

export enum USER_STATUS_LABEL {
  'Aguardando aprovação',
  'Aprovado',
  'Reprovado',
  'Bloqueado',
  'Tentativas de login excedidas',
}

export const USER_LOGIN_RELEASED = [USER_STATUS.APPROVED_ID];
