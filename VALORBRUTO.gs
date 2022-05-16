/** 
 * Função Valor Bruto
 * @param valor_liquido É o valor já descontado
 * @param desconto É o desconto aplicado na função
 * @return Traz o resultado inverso da fórmula =VALORLIQUIDO. Ou seja, serve para descobrir o valor bruto de uma operação de desconto
 * @customFunction
 
*/
function VALORBRUTO(valor_liquido, desconto) {
  var resultado =  valor_liquido/ (1-desconto);
  return resultado

}
