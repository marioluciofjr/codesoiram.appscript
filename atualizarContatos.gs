function atualizarContatos() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName('COLOQUE AQUI O NOME DA ABA QUE RECEBERÁ OS DADOS');
  
  // Limpar a aba
  aba.clear();
  
  // Definir cabeçalhos
  aba.appendRow(['NOME', 'E-MAIL', 'TELEFONE', 'EMPRESA']);
  
  // Buscar contatos
  var contatos = ContactsApp.getContacts();
  
  contatos.forEach(function(contato) {
    var nome = contato.getFullName();
    var email = (contato.getEmails()[0] ? contato.getEmails()[0].getAddress() : '');
    var telefone = (contato.getPhones()[0] ? contato.getPhones()[0].getPhoneNumber() : '');
    var empresa = (contato.getCompanies()[0] ? contato.getCompanies()[0].getCompanyName() : '');
        
    // Adicionar à aba
    aba.appendRow([nome, email, telefone, empresa]);
  });
}
