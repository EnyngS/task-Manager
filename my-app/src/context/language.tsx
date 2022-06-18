import { Context } from './type';

const language: Context = {
  ru: {
    header: {
      btn: [
        'Войти',
        'Регистрация',
        'Вернуться в приложение',
        'Выйти',
        'Новый борд',
        'Создать задачу',
        'Назад',
      ],
    },
    welcomePage: {
      promo1: [
        'Project Management App',
        'помогает командам эффективно решать рабочие задачи.',
        'Работайте в команде, управляйте проектами и выводите продуктивность на новый уровень собственным уникальным способом вместе с Rs PMApp.',
      ],
      promo2: [
        'Это не просто работа. Это координация действий в команде.',
        'Начните с досок, колонок и карточек, а затем переходите к более сложным функциям. Управляйте проектами, упорядочивайте задачи и поддерживайте командный дух.',
      ],
      developers: [
        {
          name: 'Федор Микулич',
          description:
            'Реализовал: роутинг, дизайн главная страница, страница входа, страница регистрации, структура проекта, смена языка, анимация header. ',
        },
        {
          name: 'Владислав Сусиков',
          description:
            'Реализовал: главная страница, страница задач, модальные окна, функционал бордов, колонок, тасков',
        },
      ],
    },
    LoginAuthPage: {
      btn: ['Войти', 'Регистрация'],
    },
    mainPage: {
      modalBoard: {
        name: 'Название',
        description: 'Описание',
        btn: 'Создать',
      },
    },
    taskPage: {
      board: {
        btnColumn: 'Создать колонку',
        btnTask: 'Создать задание',
      },
      modalColumn: {
        nameColumn: 'Название колонки',
        btnColumn: 'Создать колонку',
      },
      modalTask: {
        nameTask: 'Название задания',
        descriptionTask: 'Описание задания',
        selectColumn: 'Выберите колонку',
        btnTask: 'Создать задания',
      },
    },
    confirmModal: ['Вы уверены ?', 'Да', 'Нет'],
  },
  en: {
    header: {
      btn: ['login', 'singup', 'Go to Main Page', 'Log out', 'New board', 'Create task', 'Back'],
    },
    welcomePage: {
      promo1: [
        'Project Management App',
        'helps teams to solve work tasks effectively.',
        'Team up, manage projects, and take productivity to the next level in your own unique way with Rs PMApp.',
      ],
      promo2: [
        "It's not just a job. This is team coordination.",
        'Start with boards, columns and cards and then move on to more advanced features. Manage projects, organize tasks and maintain team spirit.',
      ],
      developers: [
        {
          name: 'Fiodar Mikulich',
          description:
            'Implemented: routing, main page design, login page, registration page, project structure, language change, header animation. ',
        },
        {
          name: 'Vladislav Susikov',
          description:
            'Implemented: main page, task page, modal windows, functionality of boards, columns, tasks',
        },
      ],
    },
    LoginAuthPage: {
      btn: ['Login', 'Singup'],
    },
    mainPage: {
      modalBoard: {
        name: 'Name',
        description: 'Description',
        btn: 'Create',
      },
    },
    taskPage: {
      board: {
        btnColumn: 'Create column',
        btnTask: 'Create task',
      },
      modalColumn: {
        nameColumn: 'Name column',
        btnColumn: 'Create column',
      },
      modalTask: {
        nameTask: 'Name Task',
        descriptionTask: 'Description Task',
        selectColumn: 'Select column',
        btnTask: 'Create Task',
      },
    },
    confirmModal: ['Are you sure?', 'Yes', 'No'],
  },
};

export default language;
