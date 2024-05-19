/**
 * Redimensiona automaticamente a coluna quando o conteúdo da célula muda.
 * 
 * Este script monitora as alterações nas células de uma coluna e, se necessário,
 * redimensiona a coluna para ajustar o conteúdo. Quando a célula editada estiver vazia,
 * a coluna será redimensionada para o padrão de 100 pixels.
 * 
 * @param {Object} e Evento do Google Sheets.
 */
function onEdit(e) {
  // Obtém a planilha atual.
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Obtém a planilha atual.
  var sheet = spreadsheet.getActiveSheet();

  // Obtém a coluna da célula editada.
  var column = e.range.getColumn();

  // Define a coluna a ser redimensionada (ajuste este valor conforme necessário).
  var colunaParaRedimensionar = column; // Redimensiona a coluna da célula editada

  // Verifica se a célula editada está vazia.
  var isCellEmpty = e.range.getValue() === ''; 

  // Se a célula estiver em branco, redimensiona para 100 pixels.
  if (isCellEmpty) {
    sheet.setColumnWidth(colunaParaRedimensionar, 100);
  } else {
    // Obtém o tamanho máximo do conteúdo na coluna.
    var maxSize = sheet.getRange(1, colunaParaRedimensionar, sheet.getLastRow(), 1).getValues().reduce(function(max, row) {
      return Math.max(max, row[0].toString().length);
    }, 0);

    // Redimensiona a coluna para o tamanho máximo do conteúdo.
    sheet.setColumnWidth(colunaParaRedimensionar, maxSize * 8); // 8 pixels por caractere (ajustar se necessário)
  }
}
