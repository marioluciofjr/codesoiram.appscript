/** 
 * Função GastoCal_Homens
 * @param peso É o valor que representa o peso da pessoa em kg
 * @param altura É o valor que representa a altura da pessoa em centímetros
 * @param idade É o valor da idade da pessoa em anos
 * @param atividade É o grau de atividade física da pessoa, cuja tabela é:
Sedentários (pouco ou nenhum exercício) | 
Levemente ativo (exercício leve 1 a 3 dias por semana) | 
Moderadamente ativo (exercício moderado, faz esportes 3 a 5 dias por semana | 
Altamente ativo (exercício pesado de 5 a 6 dias por semana) | 
Extremamente ativo (exercício pesado diariamente e até 2 vezes por dia)						
 * @return A função serve para indicar o Nível Ideal de Calorias Diárias pelo método do Gasto Energético, a partir da Taxa de Metabolismo Basal
 * @customFunction
 
*/
function GastoCal_Homens(peso, altura, idade, atividade) {
  if(atividade == "Sedentário(a)"){
    atividade = 1.2  
    
  }else if(atividade == "Levemente Ativo(a)") {
    atividade = 1.375

  }else if(atividade == "Moderadamente Ativo(a)") {
    atividade = 1.55

  }else if(atividade == "Altamente Ativo(a)") {
    atividade = 1.725
  
  }else if(atividade == "Extremamente Ativo(a)") {
    atividade = 1.9
  
  }
  
  var resultado = atividade * (66 + (13.7 * peso) + ( 5 * altura) - (6.8 * idade))
  return resultado
  
}
