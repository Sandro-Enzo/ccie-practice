import { IRoot } from './Interfaces';

export default function convert(csv: string): IRoot {
    let questions = csv.split(/\r?\n/);

    questions = questions.slice(1, questions.length);

    if (questions[questions.length - 1] === '') {
        questions = questions.slice(0, -1);
    }

    let questionsJson: IRoot = { questions: [] };

    for (const question of questions) {
        if (question === undefined) alert('question is undefined');

        const entries = question.split(';');
        const format = entries[3].split(',');
        const tempAnswers = entries[4].split(',');

        let answers: string[][] = [];

        for (let i = 0; i < tempAnswers.length; i += format.length) {
            answers.push([]);
            for (let j = 0; j < format.length; j++) {
                answers[i / format.length].push(tempAnswers[i + j]);
            }
        }

        questionsJson.questions.push({
            meta: {
                title: entries[0],
                type: entries[1],
                instruction: entries[2],
            },
            format: format,
            answers: answers,
        });
    }

    return questionsJson;
}
