// --- CONFIGURAÇÕES ---
const NOME_PASTA_GEM = 'Gemini Gems'; // Nome exato da pasta no Drive
const NOME_ARQUIVO_GEM = 'COLOQUE AQUI O NOME DO SEU GEM'; // Nome exato do arquivo Gem
const EMAIL_ADMIN = 'COLOQUE AQUI O SEU E-MAIL';
const NOME_COLUNA_EMAIL = 'COLOQUE AQUI O NOME DA COLUNA QUE RECEBERÁ OS E-MAILS DO GOOGLE FORMS'; 
const NOME_ADMIN = 'COLOQUE AQUI O SEU NOME';
const SITE = 'COLOQUE AQUI O SEU SITE OU OUTRO LINK DE PORTFÓLIO';
const LINKEDIN = 'COLOQUE AQUI SEU LINKEDIN';

// Lista de e-mails bloqueados (separados por vírgula e entre aspas)
const EMAILS_BLOQUEADOS = [
  'email_bloqueado1@exemplo.com',
  'email_bloqueado2@exemplo.com'
];

function autorizarAcessoGem(e) {
  // Verifica se o evento de formulário existe
  if (!e || !e.namedValues) {
    Logger.log('Este script deve ser executado por um gatilho de envio de formulário.');
    return;
  }

  // Captura e limpa o e-mail (remove espaços extras para garantir a verificação da lista)
  const emailInput = e.namedValues[NOME_COLUNA_EMAIL] ? e.namedValues[NOME_COLUNA_EMAIL][0] : null;
  
  if (!emailInput) {
    Logger.log('E-mail não encontrado na resposta.');
    return;
  }

  const emailUsuario = emailInput.trim();

  // --- 0. VERIFICAÇÃO DE BLOQUEIO ---
  if (isEmailBloqueado(emailUsuario)) {
    enviarEmailAcessoNegado(emailUsuario);
    Logger.log(`Acesso NEGADO para o e-mail: ${emailUsuario}`);
    return; // Interrompe o script aqui, não concede acesso
  }

  try {
    // --- 1. BUSCA DA PASTA E ARQUIVO ---
    
    const pastas = DriveApp.getFoldersByName(NOME_PASTA_GEM);
    if (!pastas.hasNext()) {
      throw new Error(`Pasta "${NOME_PASTA_GEM}" não encontrada.`);
    }
    const pasta = pastas.next();

    const arquivos = pasta.getFilesByName(NOME_ARQUIVO_GEM);
    if (!arquivos.hasNext()) {
      throw new Error(`Arquivo "${NOME_ARQUIVO_GEM}" não encontrado dentro da pasta "${NOME_PASTA_GEM}".`);
    }
    const arquivo = arquivos.next(); 

    // --- 2. VERIFICAÇÃO E AUTORIZAÇÃO ---
    
    const leitores = arquivo.getViewers().map(u => u.getEmail());
    const editores = arquivo.getEditors().map(u => u.getEmail());
    
    // Verifica duplicidade ignorando maiúsculas/minúsculas
    const jaAutorizado = [...leitores, ...editores].some(email => email.toLowerCase() === emailUsuario.toLowerCase());

    if (jaAutorizado) {
      enviarEmailJaCadastrado(emailUsuario);
      Logger.log(`O usuário ${emailUsuario} já tinha acesso.`);
    } else {
      arquivo.addViewer(emailUsuario);
      
      enviarEmailSucessoUsuario(emailUsuario);
      enviarEmailNotificacaoAdmin(emailUsuario);
      Logger.log(`Acesso concedido para ${emailUsuario}.`);
    }

  } catch (erro) {
    Logger.log('Erro ao processar: ' + erro.toString());
    MailApp.sendEmail(EMAIL_ADMIN, "Erro no Script do Gem", "Ocorreu um erro: " + erro.toString());
  }
}

// --- FUNÇÃO AUXILIAR DE BLOQUEIO ---
function isEmailBloqueado(email) {
  // Converte tudo para minúsculo para garantir que o bloqueio funcione mesmo se digitarem diferente
  const emailCheck = email.toLowerCase();
  const listaBloqueio = EMAILS_BLOQUEADOS.map(e => e.toLowerCase());
  return listaBloqueio.includes(emailCheck);
}

// --- FUNÇÕES DE E-MAIL ---

function enviarEmailNotificacaoAdmin(emailUsuario) {
  const assunto = `Nova pessoa se cadastrou no Gem ${NOME_ARQUIVO_GEM}`;
  const corpo = `Olá, ${NOME_ADMIN}!

Essa mensagem é automática para informar que a pessoa com o e-mail ${emailUsuario} se cadastrou no seu Gem ${NOME_ARQUIVO_GEM}.

As instruções já foram enviadas para a pessoa.
Até a próxima :)`;

  MailApp.sendEmail(EMAIL_ADMIN, assunto, corpo);
}

function enviarEmailSucessoUsuario(emailUsuario) {
  const assunto = `Você se cadastrou no Gem ${NOME_ARQUIVO_GEM}!`;
  const corpo = `Olá, 

Parabéns por ter se cadastrado no Gem ${NOME_ARQUIVO_GEM}. Você agora pode utilizar normalmente. Além deste e-mail de confirmação, você recebeu um e-mail com o assunto 'Item compartilhado com você...'. No próprio e-mail terá um botão chamado 'Abrir', a fim de acessar o seu Gem.

Fique à vontade para entrar em contato com ${EMAIL_ADMIN} para dar feedback sobre o Gem. 

Contatos:
${LINKEDIN}
${SITE}

Até a próxima :)`;

  MailApp.sendEmail(emailUsuario, assunto, corpo);
}

function enviarEmailJaCadastrado(emailUsuario) {
  const assunto = `E-mail já cadastrado no Gem ${NOME_ARQUIVO_GEM}`;
  const corpo = `Olá, 

Este e-mail já foi autorizado no Gem. Por gentileza, cadastre outro e-mail`;

  MailApp.sendEmail(emailUsuario, assunto, corpo);
}

function enviarEmailAcessoNegado(emailUsuario) {
  const assunto = `Acesso negado ao Gem ${NOME_ARQUIVO_GEM}`;
  const corpo = `Olá, 

Este e-mail cadastrado no Google Forms não foi autorizado pelo ADMIN do Gem ${NOME_ARQUIVO_GEM}. 

Isso pode acontecer pelas seguintes situações: 
* O ADMIN identificou que o e-mail pode ser SPAM ou robô
* O ADMIN teve problemas com a pessoa desse e-mail e decidiu revogar o acesso

Espero que entenda.`;

  MailApp.sendEmail(emailUsuario, assunto, corpo);
}
