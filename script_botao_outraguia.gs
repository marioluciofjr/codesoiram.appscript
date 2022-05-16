function outraguia() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("COLOQUE O NOME DA GUIA QUE VOCÊ QUER QUE O BOTÃO CONDUZA");
  SpreadsheetApp.setActiveSheet(guia);
  
}
