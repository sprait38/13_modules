import { createTodoApp } from './view.js';
import {
  getTodoListApi,
  createTodoItemApi,
  switchTodoItemDoneApi,
  deleteTodoItemApi,
} from './api.js';
import {
  getTodoListLS,
  createTodoItemLS,
  switchTodoItemDoneLS,
  deleteTodoItemLS,
} from './localStoge.js';
export async function initPage(owner, title, api) {
  const btnTransition = document.getElementById('btn-transition');
  btnTransition.textContent =
    api === 'server'
      ? 'Перейти на локальное хранилище'
      : 'Перейти на серверное хранилище';
  const todoItemList =
    api === 'server' ? await getTodoListApi(owner) : await getTodoListLS(owner);
  const options = {
    title: title,
    owner: owner,
    todoItemList: todoItemList,
    oncreateFormSubmint:
      api === 'server' ? createTodoItemApi : createTodoItemLS,
    onDoneClick:
      api === 'server' ? switchTodoItemDoneApi : switchTodoItemDoneLS,
    onDeleteClick: api === 'server' ? deleteTodoItemApi : deleteTodoItemLS,
  };
  const container = document.getElementById('list-1');
  createTodoApp(container, options);
  const peremecenie = document.getElementById('peremecenie');

  const clickFunc = () => {
    peremecenie.removeEventListener('click', clickFunc);
    container.innerHTML = '';
    if (api === 'local') {
      initPage(owner, title, 'server');
    } else {
      initPage(owner, title, 'local');
    }
  };
  peremecenie.addEventListener('click', clickFunc);
}
