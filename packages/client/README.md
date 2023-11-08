# Командный зачет за 5-6 спринты

### Видео с презентацией игры

Доступно по [ссылке](https://youtu.be/GqNfWZfd21Y)

### Как запустить

Нужно склонировать репозиторий и установить зависимости
```
git clone https://github.com/cupOfTea321/chapecker.git
npm install
```
Затем нужно перейти в папку с клиентом и запустить проект
```
cd packages/client
npm run dev
```
Проект будет доступен по адресу `http://localhost:3000/`

### Сделано:
- Создан [репозиторий с проектом](https://github.com/cupOfTea321/chapecker)
- Создан [документ](https://github.com/cupOfTea321/chapecker/blob/main/docs/README.md) с описанием механик игры (шашки Чапаева)
- Настроено отображение страниц с использованием react-router. Доступные адреса описаны в файле [`src/router/router.txt`](/packages/client/src/router/router.tsx)
- Сверстана [страница форума](https://github.com/cupOfTea321/chapecker/tree/main/packages/client/src/pages/Forum)
- Сверстана [страница начала игры](https://github.com/cupOfTea321/chapecker/tree/main/packages/client/src/pages/StartScreen)
- Сверстаны [страницы ошибок](https://github.com/cupOfTea321/chapecker/tree/main/packages/client/src/pages/errors)
- Сделан [компонент](https://github.com/cupOfTea321/chapecker/tree/main/packages/client/src/components/ErrorBoundary) для обработки ошибок внутри компонентов-потомков
- Сверстана [страница регистрации](https://github.com/cupOfTea321/chapecker/tree/main/packages/client/src/pages/SignUp)
- Сверстана [страница авторизации](https://github.com/cupOfTea321/chapecker/tree/main/packages/client/src/pages/Login)
- Сверстана [страница профиля](https://github.com/cupOfTea321/chapecker/tree/main/packages/client/src/pages/Profile)
- Сверстана [главная страница](https://github.com/cupOfTea321/chapecker/tree/main/packages/client/src/pages/Main)
- Сверстана страница завершения игры (доступна из приложения по адресу `/end`)
- Для всех форм добавлена валидация
- Реализован [движок игры](https://github.com/cupOfTea321/chapecker/tree/main/packages/client/src/pages/Game/Engine) и сверстана [страница с игрой](https://github.com/cupOfTea321/chapecker/tree/main/packages/client/src/pages/Game). Следует заметить, что в игре реализованы состояния начала игры и состояние завершения игры
- Проработана визуальная часть игры
- Добавлены [Service Workers](https://github.com/cupOfTea321/chapecker/blob/main/packages/client/sw.ts)
- Создано [redux-хранилище](https://github.com/cupOfTea321/chapecker/tree/main/packages/client/src/redux)
- Добавлено [Web API](https://github.com/cupOfTea321/chapecker/blob/main/packages/client/src/utils/fullscreenHook.ts) (fullscreen)


