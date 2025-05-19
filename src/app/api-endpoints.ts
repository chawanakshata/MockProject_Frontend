export const API_ENDPOINTS = {

  USERS: 'https://localhost:7085/api/Users',
  USER_FACTS: 'https://localhost:7085/api/Users/facts',
  USER_FACTS_UPDATE: (factId: number) => `https://localhost:7085/api/Users/facts/${factId}`,
  USER_FACTS_DELETE: (factId: number) => `https://localhost:7085/api/Users/facts/${factId}`,

  TRAINING_ACTIVITIES: 'https://localhost:7085/api/TrainingActivities',

  TEAM_SELFIES: 'https://localhost:7085/api/TeamSelfies',
  TEAM_SELFIES_UPLOAD: 'https://localhost:7085/api/TeamSelfies/UploadFile',
  TEAM_SELFIES_DELETE: (id: number) => `https://localhost:7085/api/TeamSelfies/${id}`,

  TRAINING_TEAM_SELFIES: 'https://localhost:7085/api/TrainingSelfies',
};