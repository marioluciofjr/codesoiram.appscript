function enviarPDF() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var dados = planilha.getSheetByName("COLOQUE AQUI O NOME DA GUIA COM OS DADOS PARA O ENVIO DO E-MAIL");
  var destino = dados.getRange("COLOQUE AQUI A CÉLULA QUE RECEBERÁ O E-MAIL PARA ENVIO").getValue();
  var assunto = dados.getRange("COLOQUE AQUI A CÉLULA QUE RECEBERÁ O ASSUNTO DO E-MAIL").getValue();
  var remetente = dados.getRange("COLOQUE AQUI A CÉLULA QUE RECEBERÁ O NOME DE QUEM ESTÁ ENVIANDO O E-MAIL").getValue();
  var texto = dados.getRange("COLOQUE AQUI A CÉLULA QUE RECEBERÁ O TEXTO PERSONALIZADO DA MENSAGEM").getValue();
  var nome_pdf = dados.getRange("COLOQUE AQUI O NOME QUE VOCÊ BATIZARÁ O SEU PDF").getValue();
  
  planilha.getSheetByName("COLOQUE AQUI O NOME DA GUIA QUE VOCÊ QUER OCULTAR NA HORA DE GERAR O PDF").hideSheet();
  
   
    var mensagem = {
      to: destino,
      subject: assunto,
      body: texto,
      name: remetente,
      attachments: [planilha.getAs(MimeType.PDF).setName(nome_pdf + ".pdf")]}
  


  MailApp.sendEmail(mensagem);

  planilha.getSheetByName("COLOQUE AQUI O NOME DA GUIA QUE VOCÊ QUIS OCULTAR NA HORA DE GERAR O PDF").showSheet();
  
}

# Se a sua planilha tiver mais de duas guias, repita esse comando embaixo do original (a fim de ocultar todas as guias que não participarão do PDF): 
#    planilha.getSheetByName("COLOQUE AQUI O NOME DA GUIA QUE VOCÊ QUER OCULTAR NA HORA DE GERAR O PDF").hideSheet();

# O mesmo serve para o final do código: planilha.getSheetByName("COLOQUE AQUI O NOME DA GUIA QUE VOCÊ QUIS OCULTAR NA HORA DE GERAR O PDF").showSheet();

# Apague esses comentários feitos com # na hora de inserir o script no apps script
