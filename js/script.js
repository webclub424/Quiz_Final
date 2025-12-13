// =======================================================
// Supabase 백엔드 연결 설정 및 변수 정의
// =======================================================

// ⚠️ 여기에 복사하신 Project URL과 PUBLIC KEY를 넣어주세요! 
const SUPABASE_URL = 'https://kkzlhgsnizzpnfjwhhim.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_k5orycO4a8oQrDVJ-cIzhg_EUp-LvHA'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// HTML 요소 정의 (닉네임 입력 및 랭킹 영역)
const startAuthScreen = document.getElementById('start-auth-screen');
const mainQuizContainer = document.getElementById('main-quiz-container');
const nicknameInput = document.getElementById('nickname-input');
const startButtonWithNickname = document.getElementById('start-button-with-nickname');
const rankingList = document.getElementById('ranking-list');
const authMessage = document.getElementById('auth-message');
let currentNickname = ''; // 현재 사용자의 닉네임을 저장할 변수

// =======================================================
// 랭킹 기록 저장 및 불러오기 함수
// =======================================================

// 퀴즈 결과를 Supabase에 저장하는 함수
async function saveQuizResult(nickname, score) {
    const { data, error } = await supabase
        .from('quiz_results') // 사용자님이 만드신 테이블 이름
        .insert([
            { nickname: nickname, score: score },
        ]);

    if (error) {
        console.error('결과 저장 실패:', error.message);
        document.getElementById('final-score').textContent += ` (기록 저장 실패: ${error.message})`;
    } else {
        console.log('결과 저장 성공:', data);
        loadRanking(); 
    }
}

// 랭킹 불러오기 함수
async function loadRanking() {
    rankingList.innerHTML = '<li>랭킹을 불러오는 중...</li>';

    // Supabase에서 점수(score) 내림차순으로 상위 10개 데이터를 가져옵니다.
    const { data, error } = await supabase
        .from('quiz_results')
        .select('nickname, score')
        .order('score', { ascending: false })
        .limit(10);

    if (error) {
        console.error('랭킹 로드 오류:', error.message);
        rankingList.innerHTML = '<li>랭킹 로드에 실패했습니다. (RLS 설정을 다시 확인해주세요.)</li>';
        return;
    }

    if (data.length === 0) {
        rankingList.innerHTML = '<li>아직 등록된 기록이 없습니다. 첫 참가자가 되어보세요!</li>';
        return;
    }

    rankingList.innerHTML = data.map((result, index) => {
        return `<li>#${index + 1} &nbsp; <strong>${result.nickname}</strong>: ${result.score}점</li>`;
    }).join('');
}


// 💡 퀴즈 데이터 (총 80문제)
const allQuestions = [
    {
        question: "플라스틱 빨대보다 종이 빨대가 항상 더 친환경적이다.",
        answer: "X",
        explanation: "종이 빨대는 제조 시 에너지와 화학약품이 더 들 수 있다. 사용 후 처리까지 고려해야 진정한 친환경이다."
    },
    {
        question: "배달 음식 용기의 뚜껑과 본체는 같은 재질이므로 함께 버려도 된다.",
        answer: "X",
        explanation: "대부분 PP와 PET 등 서로 다른 재질이다. 뚜껑을 분리해야 올바른 재활용이 가능하다."
    },
    {
        question: "음식물 쓰레기는 수분 함량이 많을수록 처리 과정에서 온실가스를 더 많이 배출한다.",
        answer: "O",
        explanation: "수분이 많으면 부패 과정에서 메탄(CH₄) 발생량이 증가한다. 탈수 후 배출이 바람직하다."
    },
    // 여기에 나머지 77개 퀴즈 문항을 같은 형식으로 추가해 주세요!
];

// --- 퀴즈 로직 코드 ---
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false; // 🌟 새로 추가: 정답 체크 여부 플래그

// DOM 요소 가져오기 (HTML 요소들을 JavaScript에서 사용하기 위해 연결)
const quizArea = document.getElementById('quiz-area');
const resultScreen = document.getElementById('result-screen');
const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const resultMessageElement = document.getElementById('result-message');
const explanationTextElement = document.getElementById('explanation-text');
const nextButton = document.getElementById('next-button');
const currentScoreElement = document.getElementById('current-score');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// 1. 80문제 중 20문제 랜덤 선택 함수
function selectRandomQuestions() {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    currentQuestions = shuffled.slice(0, 20);
    currentQuestionIndex = 0;
    score = 0;
    isAnswered = false; // 시작 시 초기화
}

// 2. 현재 문제 화면에 표시 함수
function displayQuestion() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    questionNumberElement.textContent = `Q. ${currentQuestionIndex + 1} / 20`;
    questionTextElement.textContent = currentQuestion.question;
    currentScoreElement.textContent = score;
    
    feedbackElement.style.display = 'none';
    feedbackElement.classList.remove('correct', 'incorrect');
    optionsContainer.style.display = 'block';

    isAnswered = false; // 새로운 문제 표시 시 초기화
}

// 3. 정답 확인 및 피드백 처리 함수 (수정됨)
function checkAnswer(selectedAnswer) {
    if (isAnswered) return; // 이미 정답을 체크했다면 무시

    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    optionsContainer.style.display = 'none';

    if (selectedAnswer === currentQuestion.answer) {
        score++;
        feedbackElement.classList.add('correct');
        resultMessageElement.textContent = "✅ 정답입니다! (1점 획득)";
    } else {
        feedbackElement.classList.add('incorrect');
        resultMessageElement.textContent = `❌ 오답입니다. 정답은 (${currentQuestion.answer})입니다.`;
    }
    
    explanationTextElement.textContent = currentQuestion.explanation;
    feedbackElement.style.display = 'block';
    currentScoreElement.textContent = score;
    
    isAnswered = true; // 🌟 정답 체크 완료!
}

// 4. 다음 문제 또는 결과 화면으로 이동 함수 (수정됨)
function nextQuestion() {
    if (!isAnswered) {
        // 정답을 체크하지 않았다면 버튼이나 키보드로 넘어갈 수 없음
        return; 
    }

    currentQuestionIndex++;
    isAnswered = false; // 다음 문제로 넘어가기 전에 플래그 초기화

    if (currentQuestionIndex < currentQuestions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

// 5. 결과 화면 표시 함수 (기록 저장 로직 포함)
function showResult() {
    quizArea.style.display = 'none';
    resultScreen.style.display = 'block';
    finalScoreElement.textContent = `당신의 점수는 20점 만점에 ${score}점 입니다! (닉네임: ${currentNickname})`;
    
    // ⭐ 최종 점수를 Supabase에 저장합니다.
    saveQuizResult(currentNickname, score); 
    
    restartButton.textContent = '다시 시작 / 랭킹 보기';
}

// 6. 게임 시작 함수 (초기화)
function startGame() {
    selectRandomQuestions();
    
    resultScreen.style.display = 'none';
    quizArea.style.display = 'block';

    displayQuestion();
}

// --- 이벤트 리스너 (사용자 동작 감지) ---

// 닉네임 입력 후 퀴즈 시작 버튼 이벤트
startButtonWithNickname.addEventListener('click', () => {
    const nickname = nicknameInput.value.trim();
    if (nickname.length < 2 || nickname.length > 10) {
        authMessage.textContent = '닉네임은 2자 이상 10자 이하로 입력해주세요.';
        return;
    }
    
    currentNickname = nickname; // 닉네임 저장
    startAuthScreen.style.display = 'none'; // 닉네임 입력 화면 숨김
    if (mainQuizContainer) mainQuizContainer.style.display = 'block'; // 퀴즈 화면 표시

    startGame(); // 퀴즈 시작 함수 호출
});


// 퀴즈 화면 내 '다시 시작' 버튼 이벤트 (닉네임 입력/랭킹 화면으로 돌아감)
restartButton.addEventListener('click', () => {
    if (mainQuizContainer) mainQuizContainer.style.display = 'none';
    startAuthScreen.style.display = 'block';
    loadRanking(); // 랭킹을 다시 불러옵니다.
});


nextButton.addEventListener('click', nextQuestion);

optionsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('answer-button')) {
        const selectedAnswer = event.target.getAttribute('data-answer');
        checkAnswer(selectedAnswer);
    }
});

// 🌟 키보드 이벤트 리스너 (새로 추가됨)
document.addEventListener('keydown', (event) => {
    // 퀴즈 영역이 화면에 보일 때만 작동
    if (quizArea.style.display === 'block') {
        
        // 1. O/X 버튼 선택 (O/X 키 또는 숫자 1/2 키)
        if (optionsContainer.style.display === 'block') {
            const answerButtons = optionsContainer.querySelectorAll('.answer-button');
            
            if (event.key === 'o' || event.key === 'O' || event.key === '1') {
                answerButtons[0].click(); // 'O' 버튼 클릭 효과
            } else if (event.key === 'x' || event.key === 'X' || event.key === '2') {
                answerButtons[1].click(); // 'X' 버튼 클릭 효과
            }
        }
        
        // 2. 다음 문제로 이동 (오른쪽 방향키 또는 스페이스바)
        if (isAnswered) {
            if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter') {
                nextQuestion();
                event.preventDefault(); // 스페이스바나 엔터키가 다른 기본 동작을 하는 것을 방지
            }
        }
    }
    
    // 3. 결과 화면에서 랭킹 화면으로 돌아가기 (엔터키)
    if (resultScreen.style.display === 'block') {
        if (event.key === 'Enter' || event.key === ' ') {
            restartButton.click(); // '다시 시작 / 랭킹 보기' 버튼 클릭과 동일
            event.preventDefault();
        }
    }
});


// 🌟 페이지 로드 시 초기 화면 설정 및 랭킹 로드
document.addEventListener('DOMContentLoaded', () => {
    startAuthScreen.style.display = 'block';
    if (mainQuizContainer) mainQuizContainer.style.display = 'none';
    
    // 랭킹을 불러와 화면에 표시합니다.
    loadRanking();
});