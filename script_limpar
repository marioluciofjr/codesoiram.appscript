function limpar() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRangeList(['COLOQUE AQUI O INTERVALO QUE VOCÊ QUER LIMPAR EX: A1:D15']).activate()
  .clear({contentsOnly: true, skipFilteredRows: true});
  spreadsheet.getRange('COLOQUE AQUI A CÉLULA QUE VOCÊ QUER RETORNAR AO FINALIZAR O SCRIPT').activate();
};
