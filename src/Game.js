import { INVALID_MOVE } from 'boardgame.io/core';
import alertify from 'alertifyjs';
import $ from 'jquery';

var questionSource = [
  [
    'What is the advantage of having specialized muscle tissues (ex. musclar and cardiovascular)?\nA. They can be controlled by different parts of the brain\nB. They work in shifts when the other kinds need rest\nC. There is no advantage of having them specialized',
    'A',
  ],
  [
    'Which of the following lifestyle decisions might improve your cardiovascular health?\nA. To have a diet that is abundant with saturated fats\nB. To have a job that required sedentary lifestyle\nC. To be proactive in physical exercises, especially aerobics',
    'C',
  ],
  [
    'What is the major function of the circulatory system?\nA. To support your body standing on its own\nB. To bring nutrients to cells and take wastes away\nC. To fight against infections and diseases',
    'B',
  ],
  [
    'Which of the following parts of the circulatory system has the largest cross-section area?\nA. Arteries\nB. Veins\nC. Capillaries',
    'C',
  ],
  [
    'Which of the following parts of the circulatory system has the thickest cell wall?\nA. Arteries\nB. Veins\nC. Arterioles',
    'A',
  ],
  [
    'Which of the following absorptions could happen in capillaries?\nA. Lipids and gases\nB. Glucoes and lipids\nC. Glucose and gases',
    'C',
  ],
  [
    'What is the left and right side of the heart divided by?\nA. Valves\nB. Septum\nC. Sphincter muscles',
    'B',
  ],
  [
    'Which chamber of the heart has the thickest wall?\nA. Left atrium\nB. Left ventricle\nC. Right atrium',
    'B',
  ],
  [
    'Which kind of valves is present between the ventricles and the blood vessels that they are attached to?\nA. Bicuspid valves\nB. Tricuspid valves\nC. Semilunar valves',
    'C',
  ],
  [
    'Where does the dexoygenated blood enter the heart from the whole body?\nA. Right atrium\nB. Left atrium\nC. Left ventricle',
    'A',
  ],
  [
    'Where is the destination of blood pumped out of the left ventricle\nA. The whole body\nB. Lungs\nC. Rght atrium',
    'A',
  ],
  [
    'What is the contraction of heart muscle called?\nA. Diastole\nB. Systole\nC. Cardiac cycle',
    'B',
  ],
  [
    'What is the primary cause of atherosclerosis?\nA. Excessive amount of platelets in blood\nB. The arteries become too thin \nC. Hardening of arteries by cholesterol plaque deposits',
    'C',
  ],
  [
    'Which of the following readings from a sphygmomanometer is considered normal?\nA. 120/85\nB. 140/120\nC. 100/70',
    'A',
  ],
  [
    'Where does the exchange of gases and nutrients for a baby take place?\nA. Umbilical arteries\nB. Placenta\nC. Oval opening',
    'B',
  ],
  [
    'Which type of structure as a protein is common for hemoglobin in blood?\nA. Primary\nB. Secondary\nC. Quaternary',
    'C',
  ],
  [
    'Where will hemoglobin pick up oxygen molecules?\nA. Acidic tissues\nB. Neutral tissues\nC. Warmer tissues',
    'B',
  ],
  [
    'Which of the following statements about osmotic and blood pressure is wrong?\nA. Osmotic pressure forces molecules out of the blood\nB. They are opposing each other\nC. Blood pressure varies a lot compared to osmotic pressure',
    'A',
  ],
  [
    'Which of the following types of cells does not contain nuclei?\nA. Stem cells\nB. RBCs\nC. Leukocytes',
    'B',
  ],
  [
    'Where is the location for old RBCs to be destroyed?\nA. Heart and tissues\nB. Bone marrow \nC. Liver and spleen',
    'C',
  ],
  [
    'Which type of cells has to do with leukemia?\nA. White blood cells\nB. Red blood cells\nC. Killer T cells',
    'B',
  ],
  [
    'Which kind of antigens do people with type O+ blood have?\nA. No antigen\nB. Antigen O\nC. Antigen Rh',
    'C',
  ],
  [
    'Which of the following blood vessels supply oxygenated blood to the heart?\nA. Coronary arteries\nB. Coronary veins\nC. Aorta',
    'A',
  ],
  [
    'Which of the following blood vessels transport deoxygenated blood to the lungs?\nA. Pulmonary arteries\nB. Pulmonary veins\nC. Aorta',
    'A',
  ],
  [
    'Where is the heart rate center located?\nA. Pituitary glands\nB. Medulla Oblongata\nC. Hypothalamus',
    'B',
  ],
  [
    "What is the parasympathetic system's effect on the heart rate?\nA. There is no relation\nB. It slows down the rate\nC. It speeds up the rate",
    'B',
  ],
  [
    'Which of the following factors is not leading to hypertension?\nA. Smoking\nB. Excessive salt intake\nC. Excessive water intake',
    'C',
  ],
  [
    'In which situation, the blood pressure reading will be higher?\nA. After amputation\nB. During systole\nC. During diastole',
    'B',
  ],
  [
    'Which of the following is a reasonable number for the volume of blood in our body?\nA. 5.6 L\nB. 3.0 L\nC. 12.4 L',
    'A',
  ],
  [
    'What are the tiny branch of capillaries in the intestines called?\nA. Lacteal\nB. Microtubules\nC. Villi',
    'C',
  ],
];
var questionList = questionSource;

export const TicTacToe = {
  setup: () => ({ cells: Array(9).fill(null) }),

  turn: {
    moveLimit: 1,
  },

  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      if (newQuestion()) {
        G.cells[id] = ctx.currentPlayer;
        alertify.success('You got this one!');
      } else {
        alertify.alert(
          'Wrong answer',
          'Sorry, you did not get one this correct. Changing player...'
        );
      }
      $('#turn').text(ctx.turn);
      $('#player').html(
        ctx.currentPlayer == 0
          ? '<img class="icon" src="https://cdn-icons-png.flaticon.com/512/3904/3904469.png"/>'
          : '<img class="icon" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"/>'
      );
    },
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },

  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickCell', args: [i] });
        }
      }
      return moves;
    },
  },
};

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isRowComplete = (row) => {
    const symbols = row.map((i) => cells[i]);
    return symbols.every((i) => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some((i) => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter((c) => c === null).length === 0;
}

// Generate question from question list
function newQuestion() {
  // Generate random index for questions
  var index = getRandomInt(questionList.length);
  if (questionList.length < 1) {
    alert('Out of problems! Reseting...');
    questionList = questionSource;
    return false;
  }
  var answer = prompt(
    'Answer following question:\n\n' +
      questionList[index][0] +
      '\n\nEnter a letter representing your answer, then click ok.'
  );
  if (answer == null) {
    return false;
  } else {
    answer = answer.toUpperCase();
  }

  if (answer === questionList[index][1]) {
    questionList.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
