/*O script abaixo foi adaptado a partir deste script: https://gist.github.com/abfo/cb96533af64f8c861cb77e790939d827*/

/*adicione seu ID de cliente OAuth do projeto API do Google e chave secreta do cliente. 
Descubra esses dados em APIs e serviços > Credenciais do Console do Google Cloud: https://console.cloud.google.com/*/

var ClientID = '';
var ClientSecret = '';

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Google Fit')
      .addItem('Autorize o script', 'showSidebar')
      .addItem('Histórico de 90 dias', 'getHistory')
      .addItem('Limpar Histórico', 'limpar')
      .addItem('Limpar Acesso', 'clearProps')
      .addToUi();
}

function getHistory() {
  var spreadsheet = SpreadsheetApp.getActive();
  var abaHistorico = spreadsheet.getSheetByName("Histórico");
  abaHistorico.getRange('A1').activate();
  getMetricsForDays(1, 90, 'Histórico');
}

// veja exemplo de contagem de passos em: https://developers.google.com/fit/scenarios/read-daily-step-total
/* adaptado abaixo para lidar com múltiplas métricas: 
--> pontos cardio; 
--> passos;
--> gasto de energia em calorias;
--> distância em km; 
--> minutos em movimento.
Registrado apenas se estiver presente no dia*/

function getMetricsForDays(fromDaysAgo, toDaysAgo, tabName) {
  var start = new Date();
  start.setHours(0,0,0,0);
  start.setDate(start.getDate() - toDaysAgo);

  var end = new Date();
  end.setHours(23,59,59,999);
  end.setDate(end.getDate() - fromDaysAgo);
  
  var fitService = getFitService();
  
  var request = {
    "aggregateBy": [
      {
        "dataTypeName": "com.google.heart_minutes",
        "dataSourceId": "derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes"
      },
      {
        "dataTypeName": "com.google.step_count.delta",
        "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
      },
      {
        "dataTypeName": "com.google.calories.expended",
        "dataSourceId": "derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended"
      },
      {
        "dataTypeName": "com.google.distance.delta",
        "dataSourceId": "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta"
      },
      {
        "dataTypeName": "com.google.active_minutes",
        "dataSourceId": "derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes"
      }
    ],
    "bucketByTime": { "durationMillis": 86400000 },
    "startTimeMillis": start.getTime(),
    "endTimeMillis": end.getTime()
  };
  
  var response = UrlFetchApp.fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
    headers: {
      Authorization: 'Bearer ' + fitService.getAccessToken()
    },
    'method' : 'post',
    'contentType' : 'application/json',
    'payload' : JSON.stringify(request, null, 2)
  });
  
  var json = JSON.parse(response.getContentText());
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tabName);
  
  for(var b = 0; b < json.bucket.length; b++) {
    // each bucket in our response should be a day
    var bucketDate = new Date(parseInt(json.bucket[b].startTimeMillis, 10));
    
    var cardio = -1;
    var passos = -1;
    var calorias = -1;
    var distancia = -1;
    var minutos = -1;
    
    if (json.bucket[b].dataset[0].point.length > 0) {
      cardio = json.bucket[b].dataset[0].point[0].value[0].fpVal;
    }

    if (json.bucket[b].dataset[1].point.length > 0) {
      passos = json.bucket[b].dataset[1].point[0].value[0].intVal;
    }
    
    if (json.bucket[b].dataset[2].point.length > 0) {
      calorias = json.bucket[b].dataset[2].point[0].value[0].fpVal;
    }
    
    if (json.bucket[b].dataset[3].point.length > 0) {
      distancia = json.bucket[b].dataset[3].point[0].value[0].fpVal/1000;
    }

    if (json.bucket[b].dataset[4].point.length > 0) {
      minutos = json.bucket[b].dataset[4].point[0].value[0].intVal;
    }
    
    sheet.appendRow([bucketDate, 
                     cardio === -1 ? ' ' : cardio,
                     passos === -1 ? ' ' : passos, 
                     calorias === -1 ? ' ' : calorias, 
                     distancia === -1 ? ' ' : distancia,
                     minutos === -1 ?  ' ' : minutos]);
  }
}

/*funções abaixo adaptadas do exemplo do Google OAuth em: https://github.com/googlesamples/apps-script-oauth2*/

function getFitService() {
  /*Crie um novo serviço com o nome fornecido. 
  O nome será usado ao persistir o token autorizado, portanto, 
  certifique-se de que ele seja exclusivo no escopo do armazenamento de propriedades.*/

  return OAuth2.createService('fit')

      // Defina os URLs dos endpoints, que são iguais para todos os serviços do Google.
      .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
      .setTokenUrl('https://accounts.google.com/o/oauth2/token')

      // ID do cliente e a chave secreta do cliente que foram inseridos nas linhas 6 e 7 deste código.
      .setClientId(ClientID)
      .setClientSecret(ClientSecret)

      // Defina o nome da função de retorno de chamada no script mencionado acima que deve ser invocado para concluir o fluxo OAuth.
      .setCallbackFunction('authCallback')

      // Configure o armazenamento de propriedades onde os tokens autorizados devem ser persistidos.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Defina os escopos a serem solicitados (separados por espaço para serviços do Google)
      /* veja: https://developers.google.com/fit/datatypes?hl=pt-br#authorization_scopes 
      para obter uma lista de escopos do Google Fit*/
      .setScope('https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.location.read')

      // Abaixo estão os parâmetros OAuth2 específicos do Google.

      // Define a dica de login, o que impedirá que a tela do seletor de conta seja mostrada para usuários logados com múltiplas contas.
      .setParam('login_hint', Session.getActiveUser().getEmail())

      // Solicita acesso offline.
      .setParam('access_type', 'offline')

      // Força sempre o prompt de aprovação. Isto é útil para testes, mas não desejável em uma aplicação de produção.
      //.setParam('approval_prompt', 'force');
}

function showSidebar() {
  var fitService = getFitService();
  if (!fitService.hasAccess()) {
    var authorizationUrl = fitService.getAuthorizationUrl();
    var template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Permita que a API do Google Fit funcione nesta planilha ✔️/a>. ' +
        'Feche após finalizar.');
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate();
    SpreadsheetApp.getUi().showSidebar(page);
  } else {
  // ...
  }
}

function authCallback(request) {
  var fitService = getFitService();
  var isAuthorized = fitService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Sucesso ✌🏾! Você pode fechar esta aba.');
  } else {
    return HtmlService.createHtmlOutput('Negado 🫤. Feche esta aba e tente novamente');
  }
}

function limpar() {
  var spreadsheet = SpreadsheetApp.getActive();
  var abaHistorico = spreadsheet.getSheetByName("Histórico");
  abaHistorico.getRangeList(['A2:F367']).activate()
  .clear({contentsOnly: true, skipFilteredRows: true});
  abaHistorico.getRange('A1').activate();
};

function clearProps() {
  PropertiesService.getUserProperties().deleteAllProperties();
  
}
