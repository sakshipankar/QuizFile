
let Questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];



// Load quiz data asynchronously using fetch
async function loadQuizData() {
  try {
    const response = await fetch('quizData.json'); 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    Questions = await response.json();
    console.log("Questions loaded successfully:", Questions);
    renderQuestion(); 
  } catch (error) {
    console.error("Error loading quiz data:", error);
  }
}


loadQuizData();

function renderQuestion() {
  if (!Questions || Questions.length === 0) {
    console.error("No questions available to render.");
    return;
  }
  const Question = Questions[currentQuestionIndex];
  document.getElementById('question').innerText = Question.question;

  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  Question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.classList.add('btn', 'opt');
    button.innerText = option;
    button.onclick = () => selectOption(button, option);
    optionsContainer.appendChild(button);
  });
}


function selectOption(button, option) {
  userAnswers[currentQuestionIndex] = option;


  const buttons = document.querySelectorAll('.opt');
  buttons.forEach(btn => btn.classList.remove('selected'));

  
  button.classList.add('selected');
}


function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < 15 && currentQuestionIndex < Questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

// Show results
function showResults() {
  const score = userAnswers.reduce((acc, answer, index) => {
    if (answer === Questions[index].answer) {
      acc++;
    }
    return acc;
  }, 0);

  const container = document.querySelector(".card");
  container.innerHTML = `
      <h2 class="text-center">Your Score: ${score}/${Questions.length}</h2>
      <div class="text-center mt-4">
        <a href="home.html" class="btn btn-primary">Go to Home</a>
      </div>
    `;
}

