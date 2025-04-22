export function traduzirErroAuth(mensagem: string): string {
  if (!mensagem) return "Ocorreu um erro desconhecido.";
  if (mensagem.includes("For security purposes")) return "Por segurança, aguarde alguns segundos antes de tentar novamente.";
  if (mensagem.includes("User already registered")) return "Este e-mail já está cadastrado.";
  if (mensagem.includes("Invalid login credentials")) return "E-mail ou senha inválidos.";
  if (mensagem.includes("Email not confirmed")) return "Confirme seu e-mail antes de acessar.";
  if (mensagem.includes("Aguardando aprovação do administrador")) return "Aguardando aprovação do administrador.";
  if (mensagem.includes("Permission denied")) return "Permissão negada.";
  if (mensagem.includes("Password should be at least")) return "A senha deve ter pelo menos 6 caracteres.";
  // Adicione outros casos conforme necessário
  return mensagem; // fallback
} 