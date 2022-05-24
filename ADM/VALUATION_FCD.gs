/** 
 * Função VALUATION_FCD
 * @param valor_ano1 É o faturamento esperado para o 1º ano
 * @param valor_ano2 É o faturamento esperado para o 2º ano
 * @param valor_ano3 É o faturamento esperado para o 3º ano
 * @param valor_ano4 É o faturamento esperado para o 4º ano
 * @param valor_ano5 É o faturamento esperado para o 5º ano
 * @param wacc É o custo de capital da empresa
 * @param ipca É o Índice de Preços ao Consumidor Amplo. Trata-se da taxa de inflação utilizada como base.
 * @param periodo_perpetuidade É um n períodos de anos para o cálculo de perpetuidade da empresa
 * @return Traz o valuation da empresa por meio do método do fluxo de caixa descontado, considerando um fluxo de 5 anos + a perpetuidade de n períodos
 * @customFunction
 
*/
function VALUATION_FCD(valor_ano1, valor_ano2, valor_ano3, valor_ano4, valor_ano5, wacc, ipca, periodo_perpetuidade) {

  var resultado = valor_ano1/(1 + wacc)**1 + 
                  valor_ano2/(1 + wacc)**2 + 
                  valor_ano3/(1 + wacc)**3 + 
                  valor_ano4/(1 + wacc)**4 + 
                  valor_ano5/(1 + wacc)**5 + 
                  valor_ano5 * (1 + ipca) / (wacc - ipca) / (1 + wacc) ** periodo_perpetuidade;
  return resultado;

}
