# Fake-map-features

### Тестовое задание
Сделать одностраничное приложение со списком пользователей в колонке (sidebar) и в виде объектов на карте. В списке надо показывать аватарку, имя и почту пользователя (посмотри структуру данных в ответе сервера). На карте пользователей отображать в виде точек, цвет точки брать из данных с сервера (поле color). При клике на точку на карте показывать Pop-up, с именем и почтой пользователя. Для карты использовать [openlayers](http://openlayers.org/).
Для интерфейса - [React](https://reactjs.org/), для управления состоянием - [Redux](https://redux.js.org/).

#### Дополнительные пункты
* При клике на пользователя в кононке (sidebar), зумировать карту на этого пользователя и отображать Pop-up.
* Так же плюсом будет написание тестов.


### Сервер фэйковых данных
Сервер отдает массив рандомных geoJson features пользователей, используя [json-server](https://github.com/typicode/json-server)

#### Запуск сервера

```shell
git clone https://github.com/gostgroup/fake-map-features.git
cd fake-map-features
npm i
npm start
```
open [http://localhost:3000/](http://localhost:3000/)
