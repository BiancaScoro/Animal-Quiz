import { shuffleArray } from "./utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export enum Difficulty{
    EASY = "easy",
    MEDIUM = "medium",
    DIFFICULTY = "difficulty",
}

export type QuestionState = Question & { answers: string[] };
export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    try {
        const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=27&difficulty=${difficulty}&type=multiple`;
        const response = await fetch(endpoint);

    if (response.status === 429) {
        const retryAfter = Number(response.headers.get('Retry-After')) * 1000;
        await delay(retryAfter);
        return fetchQuizQuestions(amount, difficulty);  // Retry the request
    }
        const data = await response.json();
        console.log("API Response:", data);
        if (data.results) {
            return data.results.map((question: Question) => ({
                ...question,
                answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
            }));
        } else {
            throw new Error("Invalid API response format");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error fetching quiz questions: ${error.message}`);
        } else {
            throw new Error("Unknown error occurred while fetching quiz questions");
        }
    }
};