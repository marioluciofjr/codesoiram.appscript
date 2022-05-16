function duplica_renomeia() {
  if (Browser.msgBox('Atenção', 'Confirma a criação de uma nova guia?', Browser.Buttons.YES_NO) == 'yes') {
    var nome = SpreadsheetApp.getUi().prompt("Qual será o nome da nova guia?").getResponseText();
    var spreadsheet = SpreadsheetApp.getActive();
    spreadsheet.getRange('COLOQUE AQUI A CÉLULA QUE FICARÁ ATIVADA AO FINAL DO SCRIPT').activate();
    spreadsheet.duplicateActiveSheet().setName(nome);
  }

  
}
