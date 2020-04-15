# Whats new

1. Папка source предназначена для хранения исходных файлов проекта
2. npm init - команда для создания проекта. Создает package.json, который определяет настройки проекта, зависимости и прочее 
3. Установка webpack - npm i -D webpack webpack-cli
4. C webpack можно взаимодействовать через консоль, но удобнее использовать webpack.config - инструмент для сбоки, js-файл, который будет компилироваться во время сборки ( работаент на платформе Node.js). в webpack.config экспортируем объект, который будет являться объектом конфиигурации для webpack
5. entry - точка входа, где подключаются все js-файлы. Их может быть несколько
6. output - js-файл, указывает, где вебпак должен размещать сборку созданных бандлов
7. npm i -D html-webpack-plugin - установка плагинов 
8. HTMLWebpackPlugin - инструмент для упрощения нейминга бандлов при частых сборках проекта. При каждом билде создается оьбновленная версия html в папке dist
9. npm i - D clean-webpack-plugin - пакет, позволяющий очищать папку с бандлами после каждой сборки
10. npm i -D style-loader css-loader - пакеты для импорта css в модули проекта а так же для внедрения css в DOM
11. npm i -D file-loader - пакет для импорта картинок
12. npm i -D webpack-dev-server - пакет, подключающий дев-сервер к вебпаку 
13. npm i -D copy-webpack-plugin - копирование изображений и статичных файлов из dev в build
14. npm i -D mini-css-extract-plugin - При каждом билде создается обновленная версия css в папке dist
15. npm i -D cross-env - пакет, который задает системные переменные
16. npm i -D terser-webpack-plugin - минимизация js
17. npm i -D optimize-css-assets-webpack-plugin
18. npm i -D babel-loader @babel/core
19. npm i @babel/polyfill
20. npm i -D @babel/preset-typescript
21. npm i -D @babel/preset-react
22. npm i react react-dom
23. npm i -D eslint-loader
24. npm i -D eslint
25. npm i -D babel-eslint
26. npm i -D webpack-bundle-analyzer