/** 
 * A função serve para determinar o número de domingos dentro de um mês específico
 * @param {7} mes É o nº referente ao mês 
 * @param {2022} ano É o ano
 * @return 
 * @customFunction 
*/

function DOMINGOS(mes, ano) {
  const days = new Date(ano,mes,0).getDate();
  const sundays = [(8-(new Date(mes +'/01/'+ ano).getDay())) % 7];
  for (let i = sundays[0] + 7; i <= days; i+= 7){
    sundays.push(i);
  }
  const sundayTotal = sundays.length;
  return sundayTotal   
}
