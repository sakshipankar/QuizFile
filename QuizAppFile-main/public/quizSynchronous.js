const fs = require('fs');

let questions = []; 
//synchronous method
function loadQuizData() {
  try {
    const data = fs.readFileSync('quizData.json', 'utf-8');
    questions = JSON.parse(data); 
  } catch (err) {
    console.error("Error reading quiz data:", err);
  }
}
loadQuizData();
