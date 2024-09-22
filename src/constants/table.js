const authorsHeaders = [
  {
    title: 'Имя',
    sortable: false,
    key: 'name',
  },
  {
    title: 'Email',
    sortable: false,
    key: 'email',
  },
  {
    title: 'Сайт',
    sortable: false,
    key: 'website',
  },
  {
    title: '',
    sortable: false,
    key: 'actions',
  },
];

const articlesTable = [
  {
    title: 'Название',
    sortable: false,
    key: 'title',
  },
  {
    title: '',
    sortable: false,
    key: 'actions',
  },
];

const allArticlesTable = [
  {
    title: 'Автор',
    sortable: false,
    key: 'name',
  },
  {
    title: 'Статья',
    sortable: false,
    key: 'title',
  },
  {
    title: 'Просмотрено',
    sortable: false,
    key: 'viewed',
  },
  {
    title: '',
    sortable: false,
    key: 'actions',
  },
];

export {
  authorsHeaders,
  articlesTable,
  allArticlesTable,
};
