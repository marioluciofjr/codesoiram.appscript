/** 
 * Função TMB_Mulheres
 * @param peso É o valor que representa o peso da pessoa em kg
 * @param altura É o valor que representa a altura da pessoa em centímetros
 * @param idade É o valor da idade da pessoa em anos
 * @return A função serve para indicar a Taxa de Metabolismo Basal
 * @customFunction
 
*/
function TMB_Mulheres(peso, altura, idade) {
  var resultado = 655 + (9.6 * peso) + ( 1.8 * altura) - (4.7 * idade)
return resultado
  
}
