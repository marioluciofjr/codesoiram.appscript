function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Cores')
    .addItem('Informar hexadecimal', 'getBackgroundColorsHex')
    .addItem('Apagar tudo', 'clearHexColors')
    .addToUi();
}

function getBackgroundColorsHex() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("COLOQUE AQUI O INTERVALO QUE FICARÃO AS CORES"); // Altere este intervalo conforme necessário
  const backgrounds = range.getBackgrounds();

  backgrounds.forEach((row, index) => {
    const color = row[0];
    if (color !== "#ffffff" && color !== "#FFFFFF") { // Verifica se a cor não é branco padrão
      sheet.getRange(index + 1, 2).setValue(color); // Depois do 1, coloque o número da coluna que vai aparecer o hexadecimal. Exemplo, se for na coluna G, você coloca 7
    } else {
      sheet.getRange(index + 1, 2).clearContent(); // Depois do 1, coloque o número da coluna que vai aparecer o hexadecimal. Exemplo, se for na coluna G, você coloca 7
    }
  });
}

function clearHexColors() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("COLOQUE AQUI O INTERVALO DE INFORMAÇÃO DOS CÓDIGOS HEXADECIMAIS"); // Altere este intervalo conforme necessário
  range.clearContent();
}
