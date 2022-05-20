/** 
 * Função Ponto de Equilíbrio Financeiro
 * @param preco_de_venda_unitario É o preço colocado para vender o produto/serviço
 * @param custos_e_despesas_fixas Corresponde aos custos e despesas totais que não se alteram no período
 * @param depreciacao É a perda de valor de um bem decorrente de seu uso, do desgaste natural ou de sua obsolescência
 * @param amortizacao É o processo de extinsão de uma dívida por meio de pagamentos periódicos. Esse paramêtro pode ser encarado como as dívidas do período
 * @param custos_e_despesas_variaveis_unitarias Diz respeito aos custos e despesas unitárias que podem se alterar no período
 * @return A função serve para demonstrar o ponto de equilíbrio financeiro. É representado pelo volume de vendas necessárias para que a empresa possa cumprir com seus compromissos financeiros. Nem todos os custos de produção representam desembolsos. Desta forma, os resultados contábeis e econômicos não são iguais aos financeiros
 * @customFunction
 
*/
function PONTO_DE_EQUILIBRIO_FINANCEIRO(preco_de_venda_unitario, custos_e_despesas_fixas, depreciacao, amortizacao,  custos_e_despesas_variaveis_unitarias) {
  var resultado = preco_de_venda_unitario * ((custos_e_despesas_fixas - depreciacao + amortizacao) / (preco_de_venda_unitario - custos_e_despesas_variaveis_unitarias));
  return resultado
  
}
