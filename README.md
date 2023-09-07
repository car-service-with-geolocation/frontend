# Frontend

## Установка и запуск

```bash
  git clone https://github.com/car-service-with-geolocation/frontend.git
  npm i
  npm run dev
```

---

...

---

## Конфигурация проекта

### Типизация

- В проекте настроен TypeScript, но на этапе MVP используем `js`/`jsx`, после 1-го релиза рефакторим на `ts`/`tsx`.
- Используем [prop-types](https://www.npmjs.com/package/prop-types)
- Местами используем [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

### EsLint

Конфиг от [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) + некоторые свои правила.

### Git

**Оформление коммитов**

В репозитории используется пакет [commitizen](https://github.com/commitizen) для генерации осмысленных коммитов по спецификации [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0). В проекте он вызывается командой `npm run commit`.

С помощью `npm install -g commitizen` его можно установить глабально, тогда простая команда `git cz` будет вызывать интерфейс генерации и проверки коммита.

Для кастомизации полей `type`, `scope` и других, к нему подключен настраиваемый адаптер [cz-git](https://github.com/Zhengqbbb/cz-git) c интерактивными промптами. У его предшественника [cz-customizable](https://github.com/leoforfree/cz-customizable) по состоянию на август 2023 года есть неисправленные баги, например [нельзя задать свой scope)](https://github.com/leoforfree/cz-customizable/issues/210) и [пустое описание выдает ошибку](https://github.com/leoforfree/cz-customizable/issues/208).

**Валидация коммитов**

Перед коммитом, каждое сообщение будет проходить валидацию, с помощью [commitlint](https://commitlint.js.org/#/), согласно правилам, описанным в `commitlint.config.cjs`.

Если сообщение сгенерировано через commitizen, nто валидацию оно скорее всего пройдет.

В случае стандарного `git commit -m "..."` сообщение должно быть оформлено вручную в виде:

```plaintext
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

иначе валидацию оно не пройдет.

**Соглашения по коммитам**

- _Нужно утвердить стандартные варианты поля `scope`, которые будем использовать (не больше 5-7). На первое время заданы базовые: `config`, `components`, `api`._
- Утвердить создание и нейминг веток

**[Husky](https://typicode.github.io/husky/)**

После успешной валидации коммита, выполняется проверка ошибок и форматирование. В случае неудачной проверки коммит отменяется.

**[Storybook](https://storybook.js.org/docs/react/get-started/install/)**

_Настроен_

### Примечания

Проект инициализирован c помошью `create-react-app`, но так как он уже не поддерживается, то устанавливает устаревшие пакеты, и `npm` на свежей установке предупреждает о шести критических уязвимостях в зависимостях библиотек `react-scripts`.

`npm audit fix --force` почему-то устанавливает еще более старые версии пакетов, и уведомлений об неподдерживаемых и уязвимых пакетах становится еще больше.

Было нагуглено решение использовать [npm-force-resolution](https://www.npmjs.com/package/npm-force-resolutions). Для этого добавить в package.json строки:

```json
{
  "scripts": {
    "preinstall": "npx --yes force-resolutions"
  },
  "resolutions": {
    "package-name": "^version"
  },
  "overrides": {
    "package-name": "^version"
  }
}
```
