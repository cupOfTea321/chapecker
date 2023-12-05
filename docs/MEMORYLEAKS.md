### Описание утечек памяти в chapecker

#### Движок игры хранился в глобальной переменной

При переходе со страницы с игрой движок не удалялся из памяти и продолжал "жить" и даже вызывать requestAnimationFrame(). Эти лишние вызовы тормозили приложение.

Для решения проблемы движок был обернут в ref. Таким образом, теперь, когда пользователь уходит со страницы с игрой, движок удаляется из памяти вместе со страницей игры

#### Больше утечек памяти в приложении обнаружено не было

Для поиска утечек использовались инструменты разработчика Google Chrome, а именно:
- Снапшоты во вкладке Memory
- Запись происходящего на странице, доступная из вкладки Performance