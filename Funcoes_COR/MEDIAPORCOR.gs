/**
 * Função MEDIAPORCOR
 * @param ref É a referência da célula que contém o intervalo de células a serem usadas no cálculo
 * @param cor É a cor de fundo das células a serem usadas no cálculo (código hexadecimal)
 * @param dummy É um parâmetro opcional que pode ser alterado para forçar o recálculo da função
 * @return A função retorna a média dos valores das células no intervalo especificado que têm a cor de fundo especificada
 * @customFunction
 */
function MEDIAPORCOR(ref, cor, dummy) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var intervalo = sheet.getRange("INSIRA AQUI A CÉLULA COM O INTERVALO OU O PRÓPRIO INTERVALO").getValue();
  var range = sheet.getRange(intervalo);
  var values = range.getValues();
  var background = range.getBackgrounds();
  var sum = 0;
  var count = 0;
  
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {
      if (background[i][j] == cor) {
        sum += values[i][j];
        count++;
      }
    }
  }
  
  return count > 0 ? sum / count : 0;
}
