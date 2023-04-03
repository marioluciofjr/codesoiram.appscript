/**
 * Função CONTARPORCOR
 * @param ref É a referência da célula que contém o intervalo de células a serem contadas
 * @param cor É a cor de fundo das células a serem contadas (código hexadecimal)
 * @param dummy É um parâmetro opcional que pode ser alterado para forçar o recálculo da função
 * @return A função retorna o número de células no intervalo especificado que têm a cor de fundo especificada
 * @customFunction
 */
function CONTARPORCOR(ref, cor, dummy) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var intervalo = sheet.getRange("INSIRA AQUI A CÉLULA COM O INTERVALO OU O PRÓPRIO INTERVALO").getValue();
  var range = sheet.getRange(intervalo);
  var background = range.getBackgrounds();
  var count = 0;
  
  for (var i = 0; i < background.length; i++) {
    for (var j = 0; j < background[i].length; j++) {
      if (background[i][j] == cor) {
        count++;
      }
    }
  }
  
  return count;
}
