export const APP_TITLE = 'Task Master' as const;
export const SEARCH = 'Search' as const;
export const CLOSE = 'Close' as const;

export const DELETE_DIALOG = {
  title: 'Delete Task',
  description: 'Are you sure you want to delete the task.',
} as const;

export const EMPTY_SEARCH_DIALOG = {
  title: 'Note',
  description: 'You haven‘t entered any value to be searched on.',
} as const;

export const ROUTES = {
  home: 'Home',
} as const;
