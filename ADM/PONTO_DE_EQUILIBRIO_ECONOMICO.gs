/** 
 * Função Ponto de Equilíbrio Econômico
 * @param preco_de_venda_unitario É o preço colocado para vender o produto/serviço
 * @param custos_e_despesas_fixas Corresponde aos custos e despesas totais que não se alteram no período
 * @param lucro_desejado Qual é o lucro esperado para o período apurado
 * @param custos_e_despesas_variaveis_unitarias Diz respeito aos custos e despesas unitárias que podem se alterar no período
 * @return A função serve para demonstrar o ponto de equilíbrio econômico. Ocorre quando existe lucro na empresa e esta busca comparar e demonstrar esse lucro em relação à taxa de atratividade (custo de oportunidade) que o mercado financeiro oferece ao capital investido
 * @customFunction
 
*/
function PONTO_DE_EQUILIBRIO_ECONOMICO(preco_de_venda_unitario, custos_e_despesas_fixas, lucro_desejado, custos_e_despesas_variaveis_unitarias) {
  var resultado = preco_de_venda_unitario * ((custos_e_despesas_fixas + lucro_desejado) / (preco_de_venda_unitario - custos_e_despesas_variaveis_unitarias));
  return resultado
  
}
