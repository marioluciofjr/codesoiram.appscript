// --- CONFIGURAÇÕES ---
const NOME_PASTA_GEM = 'Gemini Gems'; // Nome exato da pasta
const NOME_ARQUIVO_GEM = 'COLOQUE AQUI O NOME DO SEU GEM';  // Nome exato do arquivo Gem
const EMAIL_ADMIN = 'COLOQUE AQUI O SEU E-MAIL';
const NOME_COLUNA_EMAIL = 'COLOQUE AQUI O NOME DA COLUNA QUE RECEBERÁ OS E-MAILS DO GOOGLE FORMS'; 
const NOME_ADMIN = 'COLOQUE AQUI O SEU NOME';
const SITE = 'COLOQUE AQUI O SEU SITE OU OUTRO LINK DE PORTFÓLIO';
const LINKEDIN = 'COLOQUE AQUI SEU LINKEDIN';

function autorizarAcessoGem(e) {
  // Verifica se o evento de formulário existe
  if (!e || !e.namedValues) {
    Logger.log('Este script deve ser executado por um gatilho de envio de formulário.');
    return;
  }

  const emailUsuario = e.namedValues[NOME_COLUNA_EMAIL] ? e.namedValues[NOME_COLUNA_EMAIL][0].trim() : null;

  if (!emailUsuario) {
    Logger.log('E-mail não encontrado na resposta.');
    return;
  }

  try {
    // Lógica de busca por nome
    
    // 1. Procura a pasta
    const pastas = DriveApp.getFoldersByName(NOME_PASTA_GEM);
    if (!pastas.hasNext()) {
      throw new Error(`Pasta "${NOME_PASTA_GEM}" não encontrada.`);
    }
    const pasta = pastas.next();

    // 2. Procura o arquivo dentro da pasta
    const arquivos = pasta.getFilesByName(NOME_ARQUIVO_GEM);
    if (!arquivos.hasNext()) {
      throw new Error(`Arquivo "${NOME_ARQUIVO_GEM}" não encontrado dentro da pasta "${NOME_PASTA_GEM}".`);
    }
    const arquivo = arquivos.next(); // Pega o primeiro arquivo encontrado com esse nome

    // ------------------------------------------

    // 3. Verifica permissões e autoriza
    const leitores = arquivo.getViewers().map(u => u.getEmail());
    const editores = arquivo.getEditors().map(u => u.getEmail());
    const jaAutorizado = leitores.includes(emailUsuario) || editores.includes(emailUsuario);

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

// FUNÇÕES DE E-MAIL

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
