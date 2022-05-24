/** 
 * Função Valor Líquido
 * @param valor_bruto É o valor que será descontado
 * @param desconto É o desconto aplicado na função
 * @return A função serve para dar o valor descontado a partir da inserção do valor bruto e do percentual de desconto
 * @customFunction
 
*/
function VALORLIQUIDO(valor_bruto, desconto) {
  var resultado = valor_bruto - (valor_bruto*desconto);
return resultado
  
}
