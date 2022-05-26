/** 
 * Função TMB_Homens
 * @param peso É o valor que representa o peso da pessoa em kg
 * @param altura É o valor que representa a altura da pessoa em centímetros
 * @param idade É o valor da idade da pessoa em anos
 * @return A função serve para indicar a Taxa de Metabolismo Basal
 * @customFunction
 
*/
function TMB_Homens(peso, altura, idade) {
  var resultado = 66 + (13.7 * peso) + ( 5 * altura) - (6.8 * idade)
return resultado
  
}
