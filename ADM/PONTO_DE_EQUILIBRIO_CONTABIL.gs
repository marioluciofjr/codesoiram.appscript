/** 
 * Função Ponto de Equilíbrio Contábil
 * @param preco_de_venda_unitario É o preço colocado para vender o produto/serviço
 * @param custos_e_despesas_fixas Corresponde aos custos e despesas totais que não se alteram no período
 * @param custos_e_despesas_variaveis_unitarias Diz respeito aos custos e despesas unitárias que podem se alterar no período
 * @return A função serve para demonstrar o ponto de equilíbrio contábil. É a forma mais simples e mais utilizadas, cujo valor dos custos e das despesas fixas é dividido pela margem de contribuição. O resultado dessa é o valor necessário para igualar os gastos.
 * @customFunction
 
*/
function PONTO_DE_EQUILIBRIO_CONTABIL(preco_de_venda_unitario, custos_e_despesas_fixas, custos_e_despesas_variaveis_unitarias) {
  var resultado = preco_de_venda_unitario * (custos_e_despesas_fixas / (preco_de_venda_unitario - custos_e_despesas_variaveis_unitarias));
  return resultado
  
}
