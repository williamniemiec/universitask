/**
 * tasks: [{
 *   id: '-1',
 *   name: '',
 *   course: '-1',
 *   dateBegin: 0,
 *   dateEnd: 0
 * }],
 */



const currentYear = new Date().getFullYear();
const semesterStart = new Date(`08/01/${currentYear}`);
const semesterFinalMonth = new Date(`12/01/${currentYear}`);

export const undoneTasks = [
  // PROJ. BANCO DADOS
  {id: '57', name: 'TRABALHO FINAL', course: '7', dateBegin: semesterStart.getTime(), dateEnd: semesterFinalMonth.getTime()},
  {id: '51', name: 'QUIZ SEMANA 10', course: '6', dateBegin: new Date(2021, 9, 1).getTime(), dateEnd: addDays(new Date(2021, 9, 1), 7).getTime()},
  {id: '19', name: 'QUIZ SEMANA 10', course: '2', dateBegin: new Date(2021, 9, 1).getTime(), dateEnd: addDays(new Date(2021, 9, 1), 7).getTime()},
  {id: '27', name: 'ETAPA 3', course: '3', dateBegin: new Date(2021, 8, 20).getTime(), dateEnd: addDays(new Date(2021, 8, 20), 14).getTime()},
  {id: '34', name: 'ATIVDADE 2', course: '4', dateBegin: new Date(2021, 8, 25).getTime(), dateEnd: addDays(new Date(2021, 8, 25), 14).getTime()},
  
]

export const doneTasks = [
  // OTIMIZ COMB
  {id: '1', name: 'TP1', course: '1', dateBegin: addDays(semesterStart, 7*5).getTime(), dateEnd: addDays(semesterStart, 7*5 + 1).getTime()},
  {id: '2', name: 'TP2', course: '1', dateBegin: addDays(semesterStart, 7*13).getTime(), dateEnd: addDays(semesterStart, 7*13 + 1).getTime()},

  // IA
  {id: '4', name: 'TP1', course: '2', dateBegin: addDays(semesterStart, 7*3).getTime(), dateEnd: addDays(semesterStart, 7*3 + 1).getTime()},
  {id: '5', name: 'TP2', course: '2', dateBegin: addDays(semesterStart, 7*6).getTime(), dateEnd: addDays(semesterStart, 7*6 + 1).getTime()},
  {id: '6', name: 'TP3', course: '2', dateBegin: addDays(semesterStart, 7*9).getTime(), dateEnd: addDays(semesterStart, 7*9 + 1).getTime()},
  {id: '7', name: 'TP4', course: '2', dateBegin: addDays(semesterStart, 7*12).getTime(), dateEnd: addDays(semesterStart, 7*12 + 1).getTime()},
  {id: '10', name: 'QUIZ SEMANA 1', course: '2', dateBegin: semesterStart.getTime(), dateEnd: addDays(semesterStart, 1).getTime()},
  {id: '11', name: 'QUIZ SEMANA 2', course: '2', dateBegin: addDays(semesterStart, 7).getTime(), dateEnd: addDays(semesterStart, 7 + 5).getTime()},
  {id: '12', name: 'QUIZ SEMANA 3', course: '2', dateBegin: addDays(semesterStart, 7*3).getTime(), dateEnd: addDays(semesterStart, 7*3 + 1).getTime()},
  {id: '13', name: 'QUIZ SEMANA 4', course: '2', dateBegin: addDays(semesterStart, 7*4).getTime(), dateEnd: addDays(semesterStart, 7*4 + 1).getTime()},
  {id: '14', name: 'QUIZ SEMANA 5', course: '2', dateBegin: addDays(semesterStart, 7*5).getTime(), dateEnd: addDays(semesterStart, 7*5 + 1).getTime()},
  {id: '15', name: 'QUIZ SEMANA 6', course: '2', dateBegin: addDays(semesterStart, 7*6).getTime(), dateEnd: addDays(semesterStart, 7*6 + 1).getTime()},
  {id: '16', name: 'QUIZ SEMANA 7', course: '2', dateBegin: addDays(semesterStart, 7*7).getTime(), dateEnd: addDays(semesterStart, 7*7 + 1).getTime()},
  {id: '17', name: 'QUIZ SEMANA 8', course: '2', dateBegin: addDays(semesterStart, 7*8).getTime(), dateEnd: addDays(semesterStart, 7*8 + 1).getTime()},
  {id: '18', name: 'QUIZ SEMANA 9', course: '2', dateBegin: addDays(semesterStart, 7*9).getTime(), dateEnd: addDays(semesterStart, 7*9 + 1).getTime()},
  {id: '19', name: 'QUIZ SEMANA 10', course: '2', dateBegin: addDays(semesterStart, 7*10).getTime(), dateEnd: addDays(semesterStart, 7*10 + 1).getTime()},
  {id: '20', name: 'QUIZ SEMANA 11', course: '2', dateBegin: addDays(semesterStart, 7*11).getTime(), dateEnd: addDays(semesterStart, 7*11 + 1).getTime()},
  {id: '21', name: 'QUIZ SEMANA 12', course: '2', dateBegin: addDays(semesterStart, 7*12).getTime(), dateEnd: addDays(semesterStart, 7*12 + 1).getTime()},
  {id: '22', name: 'QUIZ SEMANA 13', course: '2', dateBegin: addDays(semesterStart, 7*13).getTime(), dateEnd: addDays(semesterStart, 7*13 + 1).getTime()},
  {id: '23', name: 'QUIZ SEMANA 14', course: '2', dateBegin: addDays(semesterStart, 7*14).getTime(), dateEnd: addDays(semesterStart, 7*14 + 1).getTime()},
  {id: '24', name: 'QUIZ SEMANA 15', course: '2', dateBegin: addDays(semesterStart, 7*15).getTime(), dateEnd: addDays(semesterStart, 7*15 + 1).getTime()},
  {id: '8', name: 'TP5', course: '2', dateBegin: addDays(semesterStart, 7*15).getTime(), dateEnd: addDays(semesterStart, 7*15 + 1).getTime()},
  // COMP
  {id: '25', name: 'E1', course: '3', dateBegin: addDays(semesterStart, 7*3).getTime(), dateEnd: addDays(semesterStart, 7*3 + 1).getTime()},
  {id: '26', name: 'E2', course: '3', dateBegin: addDays(semesterStart, 7*5).getTime(), dateEnd: addDays(semesterStart, 7*5 + 1).getTime()},
  {id: '27', name: 'E3', course: '3', dateBegin: addDays(semesterStart, 7*6).getTime(), dateEnd: addDays(semesterStart, 7*6 + 1).getTime()},
  {id: '28', name: 'E4', course: '3', dateBegin: addDays(semesterStart, 7*9).getTime(), dateEnd: addDays(semesterStart, 7*9 + 1).getTime()},
  {id: '29', name: 'E5', course: '3', dateBegin: addDays(semesterStart, 7*10).getTime(), dateEnd: addDays(semesterStart, 7*10 + 1).getTime()},
  {id: '30', name: 'E6', course: '3', dateBegin: addDays(semesterStart, 7*13).getTime(), dateEnd: addDays(semesterStart, 7*13 + 1).getTime()},
  {id: '31', name: 'E7', course: '3', dateBegin: addDays(semesterStart, 7*15).getTime(), dateEnd: addDays(semesterStart, 7*15 + 1).getTime()},
  
  // CG
  {id: '33', name: 'A1', course: '4', dateBegin: addDays(semesterStart, 7*3).getTime(), dateEnd: addDays(semesterStart, 7*3 + 1).getTime()},
  {id: '34', name: 'A2', course: '4', dateBegin: addDays(semesterStart, 7*7).getTime(), dateEnd: addDays(semesterStart, 7*7 + 1).getTime()},
  {id: '35', name: 'A3', course: '4', dateBegin: addDays(semesterStart, 7*11).getTime(), dateEnd: addDays(semesterStart, 7*11 + 1).getTime()},
  {id: '36', name: 'A4', course: '4', dateBegin: addDays(semesterStart, 7*15).getTime(), dateEnd: addDays(semesterStart, 7*15 + 1).getTime()},

  // CALC NUM
  {id: '38', name: 'TP1', course: '5', dateBegin: addDays(semesterStart, 7*5).getTime(), dateEnd: addDays(semesterStart, 7*5 + 1).getTime()},
  {id: '39', name: 'TP2', course: '5', dateBegin: addDays(semesterStart, 7*13).getTime(), dateEnd: addDays(semesterStart, 7*13 + 1).getTime()},

  // MLP
  {id: '42', name: 'QUIZ SEMANA 1', course: '6', dateBegin: semesterStart.getTime(), dateEnd: addDays(semesterStart, 5).getTime()},
  {id: '43', name: 'QUIZ SEMANA 2', course: '6', dateBegin: addDays(semesterStart, 7).getTime(), dateEnd: addDays(semesterStart, 7 + 5).getTime()},
  {id: '44', name: 'QUIZ SEMANA 3', course: '6', dateBegin: addDays(semesterStart, 7*3).getTime(), dateEnd: addDays(semesterStart, 7*3 + 1).getTime()},
  {id: '45', name: 'QUIZ SEMANA 4', course: '6', dateBegin: addDays(semesterStart, 7*4).getTime(), dateEnd: addDays(semesterStart, 7*4 + 1).getTime()},
  {id: '46', name: 'QUIZ SEMANA 5', course: '6', dateBegin: addDays(semesterStart, 7*5).getTime(), dateEnd: addDays(semesterStart, 7*5 + 1).getTime()},
  {id: '47', name: 'QUIZ SEMANA 6', course: '6', dateBegin: addDays(semesterStart, 7*6).getTime(), dateEnd: addDays(semesterStart, 7*6 + 1).getTime()},
  {id: '48', name: 'QUIZ SEMANA 7', course: '6', dateBegin: addDays(semesterStart, 7*7).getTime(), dateEnd: addDays(semesterStart, 7*7 + 1).getTime()},
  {id: '49', name: 'QUIZ SEMANA 8', course: '6', dateBegin: addDays(semesterStart, 7*8).getTime(), dateEnd: addDays(semesterStart, 7*8 + 1).getTime()},
  {id: '50', name: 'QUIZ SEMANA 9', course: '6', dateBegin: addDays(semesterStart, 7*9).getTime(), dateEnd: addDays(semesterStart, 7*9 + 1).getTime()},
  {id: '51', name: 'QUIZ SEMANA 10', course: '6', dateBegin: addDays(semesterStart, 7*10).getTime(), dateEnd: addDays(semesterStart, 7*10 + 1).getTime()},
  {id: '52', name: 'QUIZ SEMANA 11', course: '6', dateBegin: addDays(semesterStart, 7*11).getTime(), dateEnd: addDays(semesterStart, 7*11 + 1).getTime()},
  {id: '53', name: 'QUIZ SEMANA 12', course: '6', dateBegin: addDays(semesterStart, 7*12).getTime(), dateEnd: addDays(semesterStart, 7*12 + 1).getTime()},
  {id: '54', name: 'QUIZ SEMANA 13', course: '6', dateBegin: addDays(semesterStart, 7*13).getTime(), dateEnd: addDays(semesterStart, 7*13 + 1).getTime()},
  {id: '55', name: 'QUIZ SEMANA 14', course: '6', dateBegin: addDays(semesterStart, 7*14).getTime(), dateEnd: addDays(semesterStart, 7*14 + 1).getTime()},
  {id: '56', name: 'QUIZ SEMANA 15', course: '6', dateBegin: addDays(semesterStart, 7*15).getTime(), dateEnd: addDays(semesterStart, 7*15 + 1).getTime()},
]

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
