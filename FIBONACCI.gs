/** 
 * A função serve para criar uma sequência Fibonacci a partir de um número n de termos
 * 
 * @param {numero_de_termos} numero_de_termos Número n de termos que a sequência terá. 
 * EXEMPLO: =FIBONACCI(10) {1;1;2;3;5}
 * @return Sequência Fibonacci
 * @customFunction 
*/

function FIBONACCI(numero_de_termos) {
  var array = [1, 1];
  for (var i = 2; i < numero_de_termos; i++) {
    array.push(array[i - 1] + array[i - 2]);
  }
  return array.slice(0, numero_de_termos);
}
