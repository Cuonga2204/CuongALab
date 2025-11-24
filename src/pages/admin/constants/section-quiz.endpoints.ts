export enum SectionQuizEndpointsEnum {
  GET_BY_SECTION = "/section-quiz/section/:sectionId",

  CREATE_QUIZ = "/section-quiz/create",
  UPDATE_QUIZ = "/section-quiz/update/:id",
  DELETE_QUIZ = "/section-quiz/delete/:id",
  GET_BY_ID = "/section-quiz/quiz/:id",

  CREATE_QUESTION = "/section-quiz/question/create",
  DELETE_QUESTION = "/section-quiz/question/delete/:id",
  UPDATE_QUESTION = "/section-quiz/question/update/:id",

  SUBMIT_QUIZ = "/section-quiz/submit",

  GET_USER_RESULT = "/section-quiz/result/:userId/:sectionId",
}
