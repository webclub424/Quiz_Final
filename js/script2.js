const SUPABASE_URL = 'https://kkzlhgsnizzpnfjwhhim.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_k5orycO4a8oQrDVJ-cIzhg_EUp-LvHA'; 

// 🚨 변수 이름 충돌을 해결하기 위해 'supabase' 대신 'quizAppSupabase'를 사용합니다.
const quizAppSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 💡 퀴즈 데이터 (이전에 넣으신 약 80~100개의 문제 배열 전체를 유지합니다.)
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
    {
        question: "재활용품은 깨끗이 씻지 않아도 재활용 공정에서 자동 세척되므로 그냥 버려도 된다.",
        answer: "X",
        explanation: "오염된 재활용품은 선별장에서 폐기 처리된다. 간단히 헹궈 배출해야 한다."
    },
    {
    question: "가정용 LED 조명은 형광등보다 전력 소비가 약 30~40% 적다.",
    answer: "O",
    explanation: "LED는 전기 에너지를 빛으로 직접 전환하기 때문에 효율이 높고 수명도 길다."
    },
    {
    question: "전자레인지에 금속 재질의 그릇을 넣으면 화재 위험이 있다.",
    answer: "O",
    explanation: "금속이 전자파를 반사해 불꽃이 발생할 수 있다. 내열유리나 도자기 용기를 사용해야 한다."
    },
    {
    question: "쓰레기봉투에 넣을 수 있는 종이는 신문지, 책, 박스 모두 해당된다.",
    answer: "X",
    explanation: "신문·책·박스는 재활용품이다. 단, 코팅지·영수증은 재활용 불가로 종량제봉투에 넣는다."
    },
    {
    question: "수도꼭지에서 물이 한 방울씩 새면 1년에 1톤 이상의 물이 낭비될 수 있다.",
    answer: "O",
    explanation: "초당 1방울 누수로 하루 약 300리터가 낭비된다. 고무 패킹 교체로 쉽게 방지할 수 있다."
    },
    {
    question: "비닐봉지는 종량제봉투로 버리면 재활용된다.",
    answer: "X",
    explanation: "종량제봉투에 버리면 일반 폐기물로 소각된다. 깨끗한 비닐만 따로 분리배출해야 한다."
    },
    {
    question: "냉장고 문을 여닫는 횟수를 줄이면 전력 소비를 줄일 수 있다.",
    answer: "O",
    explanation: "문을 열 때 냉기가 빠져나가며 압축기가 더 자주 작동한다. 문 여닫는 습관이 전력 절약에 효과적이다."
    },
    {
    question: "음식물 쓰레기 중에서 닭뼈, 조개껍질은 포함되지 않는다.",
    answer: "O",
    explanation: "단단한 뼈·껍질류는 분해되지 않아 음식물쓰레기로 분류하지 않는다. 일반 쓰레기로 처리해야 한다."
    },
    {
    question: "유리병은 색깔과 관계없이 한곳에 모아 배출해도 된다.",
    answer: "X",
    explanation: "갈색·녹색·투명 유리는 용융 시 색이 섞이면 품질이 떨어지므로 반드시 색상별로 분리해야 한다."
    },
    {
    question: "재활용 쓰레기를 비닐봉투에 담아 묶으면 선별장에서 처리하기 더 쉽다.",
    answer: "X",
    explanation: "비닐로 묶으면 자동 선별기에 걸려 회수율이 떨어진다. 묶지 말고 그대로 배출하는 게 좋다."
    },
    {
    question: "의류는 섬유 종류에 따라 재활용 가능 여부가 다르다.",
    answer: "O",
    explanation: "면·폴리에스터는 재활용이 가능하지만, 신축성 섬유(스판덱스)는 재활용이 어렵다."
    },
    {
    question: "전기밥솥의 보온 기능은 한 달 내내 켜져 있으면 냉장고보다 더 많은 전기를 쓴다.",
    answer: "O",
    explanation: "보온 상태 유지에 꾸준히 전력이 소모된다. 장기 보관은 냉장 보관이 더 효율적이다."
    },
    {
    question: "종이팩(우유팩)은 일반 종이와 함께 버리면 자동으로 분리된다.",
    answer: "X",
    explanation: "종이팩은 고급 펄프로 재활용되므로 따로 모아 종이팩 전용 수거함에 버려야 한다."
    },
    {
    question: "스마트폰 충전기를 꽂아둔 상태는 전력이 거의 소모되지 않는다.",
    answer: "X",
    explanation: "기기를 연결하지 않아도 소량의 대기전력이 계속 흐른다. 완전히 빼는 것이 좋다."
    },
    {
    question: "가전제품의 ‘대기전력 차단 콘센트’는 실제 전력 절감에 도움이 된다.",
    answer: "O",
    explanation: "전자기기의 대기전력을 자동으로 차단해 연간 약 5~10% 전기 절약이 가능하다."
    },
    {
    question: "가정용 전기난로를 사용할 때 창문을 조금 열어두는 것이 더 효율적이다.",
    answer: "X",
    explanation: "전기난로는 대류식 난방이 아니므로 창문을 닫아야 열 손실이 줄어든다."
    },
    {
    question: "에어컨 필터를 주기적으로 청소하면 냉방 효율이 높아진다.",
    answer: "O",
    explanation: "먼지가 쌓이면 열교환 효율이 떨어지고 전력소비가 증가한다. 한 달 1회 청소가 이상적이다."
    },
    {
    question: "기후변화는 인류 역사상 처음으로 발생한 자연현상이다.",
    answer: "X",
    explanation: "기후 변화는 지질학적으로 반복되어 왔지만, 현재 변화는 인간 활동이 주요 원인이다."
    },
    {
    question: "온실가스는 지구를 따뜻하게 유지시켜 생명체가 살 수 있도록 한다.",
    answer: "O",
    explanation: "적정 농도의 온실가스는 지구의 평균기온을 15℃ 정도로 유지시켜 생명 유지에 필수적이다."
    },
    {
    question: "탄소중립은 배출되는 온실가스를 0으로 만드는 것을 의미한다.",
    answer: "X",
    explanation: "실제로는 배출량과 흡수량을 같게 만들어 ‘실질적 0’을 만드는 개념이다."
    },
    {
    question: "대기 중 이산화탄소 농도는 2024년 기준 약 420ppm을 넘었다.",
    answer: "O",
    explanation: "NOAA 관측 결과 2024년 평균 CO₂ 농도는 420ppm 이상으로 사상 최고치를 기록했다."
    },
    {
    question: "전기자동차는 운행 시 탄소를 배출하지 않는다.",
    answer: "O",
    explanation: "주행 중 배출은 없지만, 배터리 생산 및 전력 생산 과정에서 탄소가 발생한다."
    },
    {
    question: "온실가스는 오직 이산화탄소만 해당된다.",
    answer: "X",
    explanation: "메탄, 아산화질소, 수소불화탄소 등도 모두 온실가스에 포함된다."
    },
    {
    question: "숲은 탄소를 흡수하여 지구 온난화를 늦추는 역할을 한다.",
    answer: "O",
    explanation: "광합성을 통해 이산화탄소를 흡수하고 산소를 배출하는 대표적 탄소 흡수원이다."
    },
    {
    question: "북극 해빙이 녹으면 해수면이 급격히 상승한다.",
    answer: "X",
    explanation: "해빙은 이미 물 위에 떠 있기 때문에 직접적인 해수면 상승은 적다. 하지만 빙상 해빙은 영향을 준다."
    },
    {
    question: "지구 평균기온이 산업화 이전보다 1.5℃ 이상 오르면 대부분의 산호초가 소멸할 위험이 있다.",
    answer: "O",
    explanation: "IPCC 보고서에 따르면 1.5℃ 상승 시 산호의 70~90%가 소멸한다."
    },
    {
    question: "탄소발자국은 개인이나 기업이 배출한 모든 온실가스의 양을 이산화탄소 환산으로 표시한 것이다.",
    answer: "O",
    explanation: "단위는 CO₂-eq(이산화탄소 환산톤)으로, 전력 사용·교통·식습관 등이 포함된다."
    },
    {
    question: "해수 온도 상승은 해양 산성화를 완화시킨다.",
    answer: "X",
    explanation: "해수 온도가 높을수록 CO₂ 용해도가 감소해 해양 산성화는 오히려 악화된다."
    },
    {
    question: "‘2050 탄소중립’은 국제적으로 합의된 장기 온실가스 감축 목표다.",
    answer: "O",
    explanation: "파리협정 이후 다수 국가가 2050년까지 넷제로(Net-Zero)를 선언했다."
    },
    {
    question: "화석연료 사용량을 줄이는 것은 기후변화 대응의 가장 직접적인 방법이다.",
    answer: "O",
    explanation: "석탄·석유 연소는 온실가스의 주요 원인이며, 감축 효과가 즉각적이다."
    },
    {
    question: "메탄가스는 이산화탄소보다 온난화 영향이 약하다.",
    answer: "X",
    explanation: "100년 기준 온난화지수(GWP)는 메탄이 CO₂의 약 28배로 훨씬 강력하다."
    },
    {
    question: "지구 평균기온 상승은 폭우·폭염 같은 극단적 기상현상과 무관하다.",
    answer: "X",
    explanation: "온도 상승은 대기 순환을 불안정하게 만들어 극단적 날씨의 빈도와 강도를 높인다."
    },
    {
    question: "탄소흡수원에는 산림 외에도 토양과 해양이 포함된다.",
    answer: "O",
    explanation: "토양 유기물과 해양 플랑크톤도 이산화탄소를 흡수한다."
    },
    {
    question: "전 세계 온실가스 배출량의 약 70%는 도시 지역에서 발생한다.",
    answer: "O",
    explanation: "인구와 산업이 집중된 도시가 주요 배출원이다."
    },
    {
    question: "탄소세는 온실가스 배출을 장려하기 위한 경제적 제도다.",
    answer: "X",
    explanation: "탄소세는 배출에 비용을 부과해 감축을 유도하는 정책이다."
    },
    {
    question: "풍력·태양광 등 재생에너지는 발전 시 온실가스를 배출하지 않는다.",
    answer: "O",
    explanation: "운전 중에는 배출이 없고, 설치와 제조 단계에서의 배출이 상대적으로 매우 적다."
    },
    {
    question: "기후변화 문제는 과학적 요인보다 정치적 요인이 더 크다.",
    answer: "X",
    explanation: "원인은 과학적·물리적 현상에서 비롯되지만, 대응 방식이 정치적으로 달라질 뿐이다."
    },
    {
    question: "지구 평균기온이 산업화 이전보다 1.5℃ 이상 상승하면 기후위기가 불가피해진다.",
    answer: "O",
    explanation: "IPCC는 1.5℃를 기후변화 ‘돌이킬 수 없는 피해’의 임계선으로 제시하고 있다."
    },
    {
    question: "온실가스는 모두 인위적인 물질이다.",
    answer: "X",
    explanation: "이산화탄소, 메탄, 아산화질소 등은 자연적으로도 발생하지만, 인간 활동이 농도를 급격히 높였다."
    },
    {
    question: "일회용 종이컵은 재활용이 쉽다.",
    answer: "X",
    explanation: "내부 코팅 때문에 일반 종이처럼 분리되지 않아 대부분 소각된다."
    },
    {
    question: "‘탄소중립’은 배출된 탄소를 완전히 없앤다는 뜻이다.",
    answer: "X",
    explanation: "탄소중립은 배출량과 흡수·저감량을 같게 만들어 실질적으로 ‘0’으로 만드는 개념이다."
    },
    {
    question: "음식물 쓰레기 감량은 온실가스 감축에도 도움이 된다.",
    answer: "O",
    explanation: "음식물이 썩을 때 발생하는 메탄가스는 CO₂보다 25배 이상 강력한 온실가스다."
    },
    {
    question: "재활용품은 종류별로 세척하지 않아도 분리배출하면 된다.",
    answer: "X",
    explanation: "음식물이나 오염물이 묻으면 재활용 불가로 분류되어 소각 처리된다."
    },
    {
    question: "재생에너지는 한 번 쓰면 고갈되는 에너지다.",
    answer: "X",
    explanation: "태양광, 풍력, 수력 등은 지속적으로 사용할 수 있는 ‘무한자원’이다."
    },
    {
    question: "기후변화로 인한 이상기후는 농업 생산에도 영향을 준다.",
    answer: "O",
    explanation: "폭염, 가뭄, 홍수로 농작물 생육이 어려워지고 식량가격 상승으로 이어진다."
    },
    {
    question: "자전거 이용은 탄소발자국을 줄이는 생활습관 중 하나이다.",
    answer: "O",
    explanation: "자동차 대신 자전거를 타면 온실가스 배출이 거의 없고, 에너지 절약 효과도 크다."
    },
    {
    question: "재활용 플라스틱은 품질이 나빠 재사용할 수 없다.",
    answer: "X",
    explanation: "선별·세척·압축 과정을 거치면 섬유, 건축 자재, 플라스틱 용기 등으로 재활용된다."
    },
    {
    question: "기후변화는 단지 온도가 오르는 문제에 그친다.",
    answer: "X",
    explanation: "폭염·폭우·산불·해수면 상승 등 다양한 기상이변과 생태계 붕괴를 초래한다."
    },
    {
    question: "지구의 탄소흡수원에는 산림, 토양, 바다가 포함된다.",
    answer: "O",
    explanation: "특히 바다는 인류가 배출한 CO₂의 약 30%를 흡수하는 가장 큰 탄소 저장소다."
    },
    {
    question: "전자제품의 ‘대기전력’을 차단하면 에너지 절약에 도움이 된다.",
    answer: "O",
    explanation: "플러그를 뽑거나 멀티탭 스위치를 끄면 가정 전력 사용량을 5~10% 줄일 수 있다."
    },
    {
    question: "‘업사이클링’은 쓰레기를 단순히 재활용하는 것을 말한다.",
    answer: "X",
    explanation: "업사이클링은 버려진 자원을 창의적으로 재가공해 더 높은 가치의 제품으로 만드는 것이다."
    },
    {
    question: "기후변화 대응은 정부만의 책임이다.",
    answer: "X",
    explanation: "개인, 기업, 지역사회 모두의 행동 변화가 필요하며, 생활 속 실천이 핵심이다."
    },
    {
    question: "해양 쓰레기의 대부분은 육상에서 유입된다.",
    answer: "O",
    explanation: "약 80% 이상이 하천이나 하수구를 통해 바다로 흘러간다."
    },
    {
    question: "플라스틱을 태워 에너지를 얻는 것은 완전한 재활용이다.",
    answer: "X",
    explanation: "소각은 에너지 회수에 불과하며, 이산화탄소 배출로 기후문제를 악화시킨다."
    },
    {
    question: "비행기 대신 기차나 버스를 이용하면 탄소배출을 줄일 수 있다.",
    answer: "O",
    explanation: "단거리 항공편은 이산화탄소 배출량이 높기 때문에 대중교통 이용이 친환경적이다."
    },
    {
    question: "종이 사용을 줄이는 것은 산림보호와 직결된다.",
    answer: "O",
    explanation: "종이는 목재를 원료로 하기 때문에 불필요한 인쇄를 줄이면 벌목량을 줄일 수 있다."
    },
    {
    question: "‘제로웨이스트(Zero Waste)’는 쓰레기를 전혀 만들지 않는 생활을 목표로 한다.",
    answer: "O",
    explanation: "재사용·수리·리필·비포장 구매 등을 통해 폐기물 발생을 최소화하는 실천운동이다."
    },
    {
    question: "미세먼지는 주로 자동차 배출가스와 공장 매연 등에서 발생한다.",
    answer: "O",
    explanation: "미세먼지는 연소 과정에서 발생하는 인공적 오염물질이 주원인이며, 자연적 요인도 일부 존재한다."
    },
    {
    question: "플라스틱은 자연적으로 완전히 분해되기까지 수년이 걸린다.",
    answer: "X",
    explanation: "대부분의 플라스틱은 수백 년 이상 분해되지 않으며, 미세플라스틱 형태로 남아 생태계를 오염시킨다."
    },
    {
    question: "향수, 방향제, 섬유유연제의 향은 모두 천연 성분이므로 인체에 해롭지 않다.",
    answer: "X",
    explanation: "인공 합성 향료에는 알레르기나 호흡기 질환을 유발할 수 있는 화학물질이 포함되기도 한다."
    },
    {
    question: "환경호르몬은 내분비계를 교란하여 생식 기능에도 영향을 줄 수 있다.",
    answer: "O",
    explanation: "대표적으로 비스페놀A, 프탈레이트 등이 있으며, 체내 호르몬 작용을 방해한다."
    },
    {
    question: "일회용품을 재활용통에 버리면 모두 재활용된다.",
    answer: "X",
    explanation: "오염된 플라스틱이나 복합재질 제품은 재활용되지 못하고 대부분 소각되거나 매립된다."
    },
    {
    question: "세제를 많이 사용할수록 세탁이 더 깨끗해진다.",
    answer: "X",
    explanation: "과도한 세제는 수질오염의 원인이 되며, 헹굼이 충분하지 않으면 피부 자극을 일으킬 수 있다."
    },
    {
    question: "실내 식물은 공기 중의 유해물질을 흡수하여 공기 정화에 도움을 준다.",
    answer: "O",
    explanation: "스파티필름, 고무나무, 산세베리아 등은 포름알데히드, 벤젠 등의 제거에 효과적이다."
    },
    {
    question: "미세플라스틱은 5mm 이하의 작은 플라스틱 조각을 뜻한다.",
    answer: "O",
    explanation: "치약, 스크럽제, 합성섬유, 플라스틱 제품의 마모 등에서 발생한다."
    },
    {
    question: "음식물 쓰레기는 일반 쓰레기와 함께 버려도 무방하다.",
    answer: "X",
    explanation: "음식물 쓰레기는 별도로 처리해야 하며, 일반 쓰레기와 섞이면 악취와 침출수를 유발한다."
    },
    {
    question: "가습기 살균제 사고는 인체 유해화학물질 관리의 중요성을 일깨운 사례이다.",
    answer: "O",
    explanation: "2011년 발생한 사고로 인해 수백 명의 사망자가 발생했고, 이후 화학물질 등록제도가 강화되었다."
    },
    {
    question: "플라스틱 빨대는 재활용이 가능하므로 버려도 큰 문제가 없다.",
    answer: "X",
    explanation: "빨대는 작고 가벼워 재활용 공정에서 분리되지 않으며, 해양 쓰레기의 주요 원인 중 하나이다."
    },
    {
    question: "제습제(실리카겔)는 음식과 함께 섭취해도 무해하다.",
    answer: "X",
    explanation: "식용 가능한 성분이 아니며, 섭취 시 소화기 자극이나 기도 막힘 위험이 있다."
    },
    {
    question: "폐건전지는 일반 쓰레기로 버려도 된다.",
    answer: "X",
    explanation: "납, 카드뮴 등 중금속이 포함되어 있어 반드시 전용 수거함에 배출해야 한다."
    },
    {
    question: "드라이클리닝은 물세탁보다 환경에 미치는 영향이 적다.",
    answer: "X",
    explanation: "드라이클리닝은 퍼클로로에틸렌 같은 휘발성 유기화합물을 사용해 대기오염을 유발할 수 있다."
    },
    {
    question: "프라이팬의 코팅제가 벗겨져도 계속 사용해도 된다.",
    answer: "X",
    explanation: "코팅제 성분(PTFE 등)이 고온에서 분해되면 인체에 유해한 가스를 발생시킬 수 있다."
    },
    {
    question: "친환경 세제는 일반 세제보다 생분해성이 높아 수질오염을 줄인다.",
    answer: "O",
    explanation: "천연 유래 성분을 사용해 하천으로 흘러가도 쉽게 분해되어 환경 부담이 적다."
    },
    {
    question: "페인트, 접착제, 매니큐어 등에는 휘발성 유기화합물(VOCs)이 포함될 수 있다.",
    answer: "O",
    explanation: "이런 물질은 두통, 어지럼증, 천식 등의 증상을 유발할 수 있어 환기가 필요하다."
    },
    {
    question: "실내 공기질은 외부보다 항상 깨끗하다.",
    answer: "X",
    explanation: "밀폐된 실내에서는 포름알데히드, 이산화탄소, 먼지 등이 쌓여 오히려 오염도가 높아질 수 있다."
    },
    {
    question: "라돈은 무색무취의 천연 방사성 기체로, 장기 노출 시 폐암 위험이 있다.",
    answer: "O",
    explanation: "지하실이나 오래된 건물에서 주로 발생하며, 환기를 통해 농도를 낮출 수 있다."
    },
    {
    question: "휴대폰, 컴퓨터 등 전자기기는 폐기 시 유해금속을 배출할 수 있다.",
    answer: "O",
    explanation: "납, 카드뮴, 수은 등이 포함되어 있어 전용 전자폐기물 수거함에 버려야 한다."
    },
    {
    question: "생물다양성이란 지구상에 존재하는 모든 생물의 개체 수를 뜻한다.",
    answer: "X",
    explanation: "단순한 개체 수가 아니라, 종의 다양성·유전적 다양성·생태계 다양성을 모두 포함하는 개념이다."
    },
    {
    question: "한 지역의 생물 종이 많을수록 그 생태계는 일반적으로 더 안정적이다.",
    answer: "O",
    explanation: "다양한 종이 존재하면 특정 종이 사라져도 다른 종이 역할을 대신해 생태계 균형이 유지된다."
    },
    {
    question: "외래종은 모두 생태계에 해로운 존재이다.",
    answer: "X",
    explanation: "모든 외래종이 해로운 것은 아니다. 다만 ‘생태계 교란종’은 토착 생물을 위협할 수 있다."
    },
    {
    question: "산호는 식물에 가까운 생물이다.",
    answer: "X",
    explanation: "산호는 동물이다. 공생 조류와 함께 살아 빛을 이용하지만 스스로 광합성을 하지 않는다."
    },
    {
    question: "도시 속 공원이나 가로수도 생물다양성 보전에 기여할 수 있다.",
    answer: "O",
    explanation: "도심의 녹지는 곤충·조류의 서식지 역할을 하며, 미세 생태계의 연결통로가 된다."
    },
    {
    question: "생물다양성 감소는 인류의 식량 안보에도 영향을 준다.",
    answer: "O",
    explanation: "수분 매개 곤충, 토양 미생물 등 생태계 서비스가 줄면 농작물 생산성이 저하된다."
    },
    {
    question: "멸종위기종은 단 한 개체만 남은 종을 뜻한다.",
    answer: "X",
    explanation: "멸종위기종은 개체 수가 급감해 자연 상태에서 멸종 가능성이 높은 종을 의미한다."
    },
    {
    question: "생물다양성이 높은 지역일수록 천적 관계가 복잡하다.",
    answer: "O",
    explanation: "다양한 먹이망이 형성되어 한 종의 급격한 번식을 막고 생태계 균형을 유지한다."
    },
    {
    question: "습지는 생물다양성 보전에서 큰 의미가 없다.",
    answer: "X",
    explanation: "습지는 새, 양서류, 곤충 등 다양한 생물의 서식지이며, 자연 정화 기능도 뛰어나다."
    },
    {
    question: "지구 생물종의 대부분은 아직 발견되지 않았다.",
    answer: "O",
    explanation: "약 180만 종이 발견되었지만, 실제 존재하는 종은 800만 종 이상으로 추정된다."
    },
    {
    question: "단일 작물 재배(단작)는 생물다양성 보전에 유리하다.",
    answer: "X",
    explanation: "단작은 토양 영양 고갈과 병충해 확산으로 생태적 다양성을 크게 줄인다."
    },
    {
    question: "생태통로는 도로로 단절된 서식지를 연결하기 위한 시설이다.",
    answer: "O",
    explanation: "동물의 이동 경로를 보장하여 유전자 다양성 유지를 돕는다. 대표적으로 ‘녹색교량’이 있다."
    },
    {
    question: "인간의 쓰레기 문제는 해양 생물다양성과는 관련이 없다.",
    answer: "X",
    explanation: "해양 쓰레기, 특히 미세플라스틱은 어류·조류·포유류까지 피해를 준다."
    },
    {
    question: "생물다양성 감소는 기후변화보다 인류에 미치는 영향이 작다.",
    answer: "X",
    explanation: "UNEP는 생물다양성 붕괴를 인류 생존 위협 요인 중 하나로 본다."
    },
    {
    question: "멸종위기 야생생물은 1급과 2급으로 구분된다.",
    answer: "O",
    explanation: "1급은 멸종 위험이 매우 높고, 2급은 그보다 낮지만 보호가 필요한 종이다."
    },
    {
    question: "생물다양성 협약(CBD)은 1992년 리우환경회의에서 채택되었다.",
    answer: "O",
    explanation: "리우회의에서 기후변화협약, 사막화방지협약과 함께 채택된 3대 환경협약 중 하나이다."
    },
    {
    question: "꿀벌 개체 수의 감소는 생태계에 큰 영향을 주지 않는다.",
    answer: "X",
    explanation: "꿀벌은 주요 수분 매개자로, 감소하면 작물 생산량이 급감하고 식물 다양성도 줄어든다."
    },
    {
    question: "외래 반려동물을 자연에 방사하는 것은 생태계에 영향을 줄 수 있다.",
    answer: "O",
    explanation: "토착 생물을 잡아먹거나 경쟁을 유발해 생태계를 교란시킬 수 있다."
    },
    {
    question: "해양보호구역(MPA)은 해양 생물의 번식과 개체 회복을 위한 구역이다.",
    answer: "O",
    explanation: "어획과 개발을 제한해 생태계의 회복력을 높이는 역할을 한다."
    },
    {
    question: "사막은 생물다양성이 거의 존재하지 않는 지역이다.",
    answer: "X",
    explanation: "극한 환경에도 적응한 파충류, 선인장, 곤충 등 다양한 생물이 존재한다."
    }
];

// ✅ 전역 변수 설정 (모드 추가 및 초기화)
let currentQuestionIndex = 0; 
let score = 0;
let nickname = '';
let currentQuizMode = 'ox'; // 현재 퀴즈 모드 ('ox', 'speed', 'card' 중 하나)

// ✅ 스피드 퀴즈 타이머 관련 변수
let timer; 
let timeLeft = 60; 
let finalTime = 0; 
let isTimerRunning = false;

// ✅ 카드 퀴즈 관련 변수 추가
let cardModeQuestions = [];
let cardsFlippedCount = 0;
let cardQuizScore = 0; // 카드 퀴즈는 점수 계산 방식이 다르므로 별도 변수 사용

// HTML 요소 정의
const homeScreen = document.getElementById('home-screen');
const mainQuizContainer = document.getElementById('main-quiz-container');
const nicknameInput = document.getElementById('nickname-input');
const authMessage = document.getElementById('auth-message');
const restartButton = document.getElementById('restart-button');

// 퀴즈 모드 선택 버튼
const modeButtons = document.querySelectorAll('.mode-button');

// 랭킹 리스트 요소
const rankingListOx = document.getElementById('ranking-list-ox');
const rankingListSpeed = document.getElementById('ranking-list-speed');
const rankingListCard = document.getElementById('ranking-list-card'); // 카드 랭킹

// 퀴즈 화면 요소 (Quiz Area Elements)
const quizArea = document.getElementById('quiz-area'); // O/X, Speed 퀴즈 영역
const resultScreen = document.getElementById('result-screen');
const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const feedbackElement = document.getElementById('feedback');
const resultMessageElement = document.getElementById('result-message');
const explanationTextElement = document.getElementById('explanation-text');
const currentScoreElement = document.getElementById('current-score');
const finalScoreElement = document.getElementById('final-score');

// O/X 및 스피드 퀴즈 전용
const nextButton = document.getElementById('next-button');
const optionsContainer = document.getElementById('options');

// 스피드 퀴즈 전용 DOM 요소
const timerDisplay = document.getElementById('timer-display');
const timeLeftElement = document.getElementById('time-left');

// ✅ 카드 퀴즈 전용 DOM 요소 추가
const cardQuizArea = document.getElementById('card-quiz-area');
const cardContainer = document.getElementById('card-container');
const cardCorrectButton = document.getElementById('card-correct-button');
const cardNextButton = document.getElementById('card-next-button');


// =======================================================
// 랭킹 기록 저장 및 불러오기 함수 (모드별 분리 로직 유지)
// =======================================================

/**
 * 최종 점수를 Supabase에 저장합니다. (모드별 점수 저장 로직 분기)
 */
async function saveResult() {
    let rankCriteria = 0; // 랭킹 정렬 기준
    
    if (currentQuizMode === 'speed') {
        // ✅ [수정] 맞힌 개수(score)를 우선순위로 하고, 남은 시간(timeLeft)을 보조 지표로 사용
        // 예: 12문제 맞히고 40초 남음 -> 12040점
        // 예: 10문제 맞히고 50초 남음 -> 10050점 (12문제가 무조건 높음)
        rankCriteria = (score * 1000) + timeLeft; 
    } else if (currentQuizMode === 'ox') {
        rankCriteria = score; 
    } else if (currentQuizMode === 'card') {
        rankCriteria = cardQuizScore; 
    }
    
    try {
        const { error } = await quizAppSupabase 
            .from('quiz_results')
            .insert([
                { 
                    nickname: nickname, 
                    score: rankCriteria, // 조합된 점수 저장
                    quiz_type: currentQuizMode 
                },
            ]);
    
    try {
        // 🚨 supabase 대신 quizAppSupabase 사용
        const { error } = await quizAppSupabase 
            .from('quiz_results')
            .insert([
                { 
                    nickname: nickname, 
                    score: rankCriteria, 
                    quiz_type: currentQuizMode 
                },
            ]);

        if (error) throw error;
        
        console.log('결과가 성공적으로 저장되었습니다. (점수/시간:', rankCriteria, '모드:', currentQuizMode, ')');
        
        loadAllRankings(); 

    } catch (error) {
        console.error('결과 저장 중 오류:', error.message);
        document.getElementById('final-score').textContent += ` (기록 저장 실패: ${error.message})`;
        alert('결과 저장에 실패했습니다. (콘솔 확인)');
    }
}

/**
 * Supabase에서 특정 모드의 랭킹을 불러와 화면에 표시합니다.
 */
async function loadRanking(mode, listElement) {
    if (!listElement) return;
    listElement.innerHTML = '<li>랭킹을 불러오는 중...</li>';

    try {
        let { data, error } = await quizAppSupabase
            .from('quiz_results')
            .select('nickname, score')
            .eq('quiz_type', mode) 
            .order('score', { ascending: false }) // 무조건 내림차순
            .limit(10);

        if (error) throw error;
        listElement.innerHTML = '';

        if (data && data.length > 0) {
            listElement.innerHTML = data.map((item, index) => {
                const rank = index + 1;
                let scoreText;

                if (mode === 'speed') {
                    // ✅ [수정] 조합된 점수를 다시 분해
                    const solvedCount = Math.floor(item.score / 1000); // 12040 -> 12
                    const timeLeftVal = item.score % 1000;             // 12040 -> 40
                    const timeTaken = 60 - timeLeftVal;                // 걸린 시간 계산

                    scoreText = `${solvedCount}개 (${timeTaken}초)`;
                } else if (mode === 'card') {
                    scoreText = `${item.score}회 정답`;
                } else {
                    scoreText = `${item.score}점`;
                }

                return `<li>#${rank} &nbsp; <strong>${item.nickname}</strong>: ${scoreText}</li>`;
            }).join('');
        } else {
            listElement.innerHTML = '<li>아직 등록된 기록이 없습니다.</li>';
        }
    } catch (error) {
        console.error('랭킹 로드 중 오류:', error.message);
        listElement.innerHTML = '<li>랭킹 로드 실패.</li>';
    }
}

/**
 * 모든 퀴즈 모드의 랭킹을 한 번에 로드합니다. (홈 화면 표시용)
 */
function loadAllRankings() {
    loadRanking('ox', rankingListOx);
    loadRanking('speed', rankingListSpeed);
    loadRanking('card', rankingListCard);
} 

// --- 퀴즈 공통 로직 코드 ---
let currentQuestions = [];
let isAnswered = false; // O/X 퀴즈 정답 체크 여부 플래그

// 1. 80문제 중 20문제 랜덤 선택 함수 (공통)
function selectRandomQuestions() {
    // 🚨 allQuestions 배열이 비어 있으면 여기서 오류가 발생할 수 있습니다.
    if (allQuestions.length === 0) {
        console.error("오류: 퀴즈 데이터(allQuestions)가 비어 있습니다.");
        alert("퀴즈 데이터가 로드되지 않아 퀴즈를 시작할 수 없습니다. 파일을 확인해주세요.");
        return;
    }
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    currentQuestions = shuffled.slice(0, 20);
    currentQuestionIndex = 0;
    score = 0;
    finalTime = 0; 
    isAnswered = false;
    cardQuizScore = 0; // 카드 퀴즈 점수 초기화
    cardsFlippedCount = 0; // 카드 퀴즈 진행 횟수 초기화
}

// 2. 현재 문제 화면에 표시 함수 (O/X 및 스피드 퀴즈 전용)
function displayQuestion() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    questionNumberElement.textContent = `Q. ${currentQuestionIndex + 1} / 20`;
    currentScoreElement.textContent = score;
    
    // O/X와 스피드는 문제 텍스트 표시
    questionTextElement.textContent = currentQuestion.question;
    
    feedbackElement.style.display = 'none';
    feedbackElement.classList.remove('correct', 'incorrect');
    optionsContainer.style.display = 'block';

    isAnswered = false;
}

// 3. 정답 확인 및 피드백 처리 함수 (O/X 모드 전용)
function checkAnswer(selectedAnswer) {
    if (isAnswered) return;

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
    
    isAnswered = true;

    // 스피드 퀴즈 모드에서는 정답 체크 후 바로 다음 문제로 이동 (설명 생략)
    if (currentQuizMode === 'speed') {
        setTimeout(nextQuestion, 500); 
    }
}

// 4. 다음 문제 또는 결과 화면으로 이동 함수 (O/X 및 스피드 퀴즈 전용)
function nextQuestion() {
    // O/X 모드일 때 정답 체크 확인
    if (currentQuizMode === 'ox' && !isAnswered) {
        return; 
    }
    
    currentQuestionIndex++;
    isAnswered = false;

    if (currentQuestionIndex < currentQuestions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

// 5. 결과 화면 표시 함수 (기록 저장 로직 포함)
function showResult() {
    // 모드별 마무리
    if (currentQuizMode === 'speed') {
        stopTimer();
        finalTime = timeLeft; // 남은 시간 (점수 기준)
    } else if (currentQuizMode === 'card') {
        // 카드 퀴즈는 특별히 종료할 것이 없음.
    }
    
    quizArea.style.display = 'none';
    cardQuizArea.style.display = 'none'; // 카드 영역 숨김
    resultScreen.style.display = 'block';
    
    if (currentQuizMode === 'speed') {
        const timeTaken = 60 - finalTime; 
        finalScoreElement.textContent = `✅ ${nickname}님, ${currentQuestions.length}문제를 ${timeTaken}초 만에 완료했습니다!`;
    } else if (currentQuizMode === 'card') {
        finalScoreElement.textContent = `⭐ ${nickname}님, ${cardsFlippedCount}번 시도하여 총 ${cardQuizScore}회 정답을 맞혔습니다!`;
    } else {
        finalScoreElement.textContent = `당신의 점수는 ${currentQuestions.length}점 만점에 ${score}점 입니다! (닉네임: ${nickname})`;
    }
    
    saveResult();
    
    restartButton.textContent = '다시 시작 / 랭킹 보기';
}

// --- 타이머 함수 (스피드 퀴즈 전용) ---

function startTimer() {
    if (isTimerRunning) return;
    
    isTimerRunning = true;
    timeLeft = 60; // 초기 시간 설정 (60초)
    timeLeftElement.textContent = timeLeft;
    timerDisplay.style.display = 'block';

    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;

        if (timeLeft <= 10) {
            timerDisplay.style.color = '#E74C3C'; // 10초 미만은 빨간색
        } else {
             timerDisplay.style.color = '#2980b9'; // 기본 파란색
        }

        if (timeLeft <= 0) {
            // 시간 종료 시
            stopTimer();
            finalTime = 0; 
            showResult(); 
            alert("⏰ 시간이 종료되었습니다! 퀴즈를 완료하지 못했습니다.");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    timerDisplay.style.display = 'none';
    timerDisplay.style.color = '#2980b9'; // 색상 초기화
}

// --- 카드 퀴즈 함수 (새로 추가) ---

/**
 * 카드 퀴즈 화면에 카드를 동적으로 생성하고 표시합니다.
 */
function initializeCardQuiz() {
    cardContainer.innerHTML = '';
    
    // O/X 퀴즈의 'question'을 카드 앞면으로, 'explanation'을 카드 뒷면으로 사용합니다.
    cardModeQuestions = currentQuestions.map((q, index) => ({
        id: index,
        front: q.question,
        back: q.explanation,
        flipped: false,
        completed: false // 카드가 정답으로 처리되었는지 여부
    }));

    cardModeQuestions.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('flip-card');
        cardElement.setAttribute('data-index', index);
        cardElement.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h2>Q. ${index + 1}</h2>
                    <p class="card-hint">클릭해서 문제를 확인하세요</p>
                </div>
                <div class="flip-card-back">
                    <p class="card-question">${card.front}</p>
                    <div class="card-explanation-box">
                        <p class="card-answer-text">정답 및 설명:</p>
                        <p>${card.back}</p>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardElement);

        cardElement.addEventListener('click', () => flipCard(index));
    });

    // 초기 상태 설정
    cardCorrectButton.style.display = 'none';
    cardNextButton.style.display = 'none';
    
    // 점수판 업데이트
    updateCardScoreDisplay();
}

/**
 * 특정 카드를 뒤집고 상태를 업데이트합니다.
 * @param {number} index - 뒤집을 카드의 인덱스
 */
function flipCard(index) {
    const card = cardModeQuestions[index];
    const cardElement = cardContainer.querySelector(`[data-index="${index}"]`);

    if (card.completed || card.flipped) {
        // 이미 완료되었거나 뒤집혀 있다면 아무것도 하지 않음
        return; 
    }
    
    // 이전에 뒤집힌 카드 찾아서 닫기 (선택적으로 하나만 열리게 하려면)
    // const prevFlipped = cardContainer.querySelector('.flip-card.flipped');
    // if (prevFlipped) {
    //     prevFlipped.classList.remove('flipped');
    //     cardModeQuestions[parseInt(prevFlipped.dataset.index)].flipped = false;
    // }

    // 카드를 뒤집음
    cardElement.classList.add('flipped');
    card.flipped = true;
    cardsFlippedCount++; // 시도 횟수 증가

    // 정답 확인 및 다음으로 넘어갈 수 있도록 버튼 표시
    cardCorrectButton.style.display = 'block';
    cardNextButton.style.display = 'block';
    
    updateCardScoreDisplay(); // 시도 횟수 업데이트
}

/**
 * 정답 버튼 클릭 시 점수를 부여하고 해당 카드를 완료 처리합니다.
 */
function markCardAsCorrect() {
    // 현재 뒤집힌 카드(flipped)를 찾습니다.
    const currentCardElement = cardContainer.querySelector('.flip-card.flipped');
    
    if (!currentCardElement) {
        alert("먼저 카드를 뒤집어 문제를 확인해주세요!");
        return;
    }
    
    const currentCardIndex = parseInt(currentCardElement.dataset.index);
    const card = cardModeQuestions[currentCardIndex];

    // 점수 증가 및 상태 업데이트
    cardQuizScore++; 
    card.completed = true;
    card.flipped = false; // 뒤집힌 상태 해제
    
    currentCardElement.classList.remove('flipped'); 
    currentCardElement.classList.add('completed'); // 완료 표시

    // 다음 문제로 넘어감
    goToNextCard();
}

/**
 * 다음 카드로 넘어가거나 퀴즈를 종료합니다. (정답을 맞혔거나, 그냥 넘어갔거나)
 */
function goToNextCard() {
    // 1. 현재 뒤집힌 카드의 상태를 해제 (정답 처리 없이 넘어가는 경우)
    const currentFlippedCardElement = cardContainer.querySelector('.flip-card.flipped');
    
    if (currentFlippedCardElement) {
        // 뒤집힌 카드가 있다면, 카드를 다시 닫고 상태를 초기화합니다.
        const index = parseInt(currentFlippedCardElement.dataset.index);
        cardModeQuestions[index].flipped = false;
        currentFlippedCardElement.classList.remove('flipped');
    }

    // 2. 다음 완료되지 않은 카드를 찾음
    const nextCardIndex = cardModeQuestions.findIndex(card => !card.completed);

    if (nextCardIndex !== -1) {
        // 다음 미완료 카드가 남아 있다면
        cardCorrectButton.style.display = 'none';
        cardNextButton.style.display = 'none';

        updateCardScoreDisplay(); // 점수 및 시도 횟수 업데이트
        
    } else {
        // 모든 카드를 완료했으면 결과 화면으로 이동
        showResult();
    }
}

/**
 * 카드 퀴즈 점수판을 업데이트합니다.
 */
function updateCardScoreDisplay() {
    currentScoreElement.textContent = `${cardQuizScore}회 정답 (${cardsFlippedCount}회 시도)`;
    const remaining = cardModeQuestions.filter(c => !c.completed).length;
    questionNumberElement.textContent = `남은 문제: ${remaining} / 20`;
}


// --- 퀴즈 시작 함수 (모드 분기 포함) ---

/**
 * 퀴즈를 시작하고 화면을 전환하는 함수.
 * @param {string} mode - 시작할 퀴즈의 타입 ('ox', 'speed', 'card')
 */
function startQuiz(mode) {
    nickname = nicknameInput.value.trim();

    if (nickname.length < 2 || nickname.length > 10) {
        authMessage.textContent = '닉네임은 2자 이상 10자 이하로 입력해주세요.';
        return;
    }
    
    authMessage.textContent = ''; 
    currentQuizMode = mode; 
    
    // 퀴즈 상태 초기화
    selectRandomQuestions();
    
    // 🚨 selectRandomQuestions에서 allQuestions이 비어 있으면 여기서 함수가 종료될 수 있습니다.

    // 화면 전환
    homeScreen.style.display = 'none';
    mainQuizContainer.style.display = 'block';
    resultScreen.style.display = 'none';
    
    // 모든 퀴즈 영역 초기화
    quizArea.style.display = 'none';
    cardQuizArea.style.display = 'none';
    timerDisplay.style.display = 'none';
    stopTimer(); // 타이머 확실히 중지

    // 모드별 화면 설정 분기
    if (currentQuizMode === 'speed') {
        quizArea.style.display = 'block';
        startTimer();
        explanationTextElement.textContent = "스피드 퀴즈는 정답 후 즉시 다음 문제로 넘어갑니다!";
        nextButton.style.display = 'none'; 
        optionsContainer.style.display = 'block';
        displayQuestion();
    } else if (currentQuizMode === 'card') {
        // ✅ 카드 퀴즈 설정
        cardQuizArea.style.display = 'block';
        currentScoreElement.textContent = '0점 (0회 시도)'; // 점수 초기화 텍스트
        explanationTextElement.textContent = ""; // 설명 초기화 (O/X에서 사용되던 요소)
        initializeCardQuiz();
    } else { // O/X 퀴즈 설정
        quizArea.style.display = 'block';
        explanationTextElement.textContent = ""; 
        nextButton.style.display = 'block'; 
        optionsContainer.style.display = 'block';
        displayQuestion();
    }
}


// --- 이벤트 리스너 (사용자 동작 감지) ---

// 닉네임 입력 후 퀴즈 모드 버튼 이벤트
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mode = button.getAttribute('data-mode');
        startQuiz(mode);
    });
});


// 퀴즈 화면 내 '다시 시작' 버튼 이벤트 (홈 화면으로 돌아감)
restartButton.addEventListener('click', () => {
    stopTimer(); 
    mainQuizContainer.style.display = 'none';
    homeScreen.style.display = 'block';
    loadAllRankings();
});


// O/X 및 스피드 퀴즈 이벤트
nextButton.addEventListener('click', nextQuestion);

optionsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('answer-button')) {
        const selectedAnswer = event.target.getAttribute('data-answer');
        checkAnswer(selectedAnswer);
    }
});

// ✅ 카드 퀴즈 이벤트 리스너 추가
cardCorrectButton.addEventListener('click', markCardAsCorrect);
cardNextButton.addEventListener('click', goToNextCard);


// 키보드 이벤트 리스너 (전체 로직 완성)
document.addEventListener('keydown', (event) => {
    // 1. O/X 및 스피드 퀴즈 영역
    if (quizArea && quizArea.style.display === 'block') {
        
        // O/X 버튼 선택 (1/O: O, 2/X: X)
        if (optionsContainer.style.display === 'block') {
            const answerButtons = optionsContainer.querySelectorAll('.answer-button');
            
            if (event.key === 'o' || event.key === 'O' || event.key === '1') {
                answerButtons[0].click();
            } else if (event.key === 'x' || event.key === 'X' || event.key === '2') {
                answerButtons[1].click();
            }
        }
        
        // 다음 문제로 이동 (O/X 모드에서만 수동 이동)
        if (isAnswered && currentQuizMode === 'ox') { 
            if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter') {
                nextQuestion();
                event.preventDefault();
            }
        }
    }
    
    // 2. 카드 퀴즈 키보드 이벤트
    if (cardQuizArea && cardQuizArea.style.display === 'block') {
        // '정답' 버튼 (Enter, C)
        if (event.key === 'c' || event.key === 'C' || event.key === 'Enter') {
            if (cardCorrectButton.style.display !== 'none') {
                cardCorrectButton.click(); 
                event.preventDefault();
            }
        } 
        // '다음/넘어가기' 버튼 (ArrowRight, Space)
        else if (event.key === 'ArrowRight' || event.key === ' ') {
             if (cardNextButton.style.display !== 'none') {
                 cardNextButton.click(); // '다음' 버튼 클릭 (정답이든 오답이든 넘어갈 때)
                 event.preventDefault();
             }
          }
    }
    
    // 3. 결과 화면에서 랭킹 화면으로 돌아가기
    if (resultScreen && resultScreen.style.display === 'block') {
        if (event.key === 'Enter' || event.key === ' ') {
            restartButton.click();
            event.preventDefault();
        }
    }
});


// 🌟 페이지 로드 시 초기 화면 설정 및 모든 랭킹 로드
document.addEventListener('DOMContentLoaded', () => {
    homeScreen.style.display = 'block';
    mainQuizContainer.style.display = 'none';
    
    loadAllRankings();
});
