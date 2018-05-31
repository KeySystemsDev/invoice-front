import Vuex from 'vuex'
import axios from 'axios';


const store = () => {
  return new Vuex.Store({
    state: {
      auth: false,
      menuStore: [],
      permissionsStore: null,
    },
    mutations: {
      globalMutation(state, item){
        state[item.atribute] = item.value;
        console.warn(`${item.atribute}`);
        console.log(state[item.atribute]);
      },
      setPermissions(state, item){

        switch (item) {
          case 'admin':
            state.permissionsStore = 'admin';
            state.menuStore = [
              { path: '/', title: 'inicio', icon: 'whatshot' },
              { path: '/find', title: 'Buscar', icon: 'search' },
              { path: '/order', title: 'orders', icon: 'alarm_add' },
              { path: '/dispatcher', title: 'Pendientes', icon: 'alarm' },
              { path: '/dispatched', title: 'Despachado', icon: 'alarm_on' },
              { path: '/category', title: 'Categorias', icon: 'view_list' },
              { path: '/products', title: 'Productos', icon: 'shopping_basket' },
            ]
            break;

          case 'pharmacy':
            state.permissionsStore = 'pharmacy';
            state.menuStore = [
              { path: '/', title: 'inicio', icon: 'whatshot' },
              { path: '/order', title: 'orders', icon: 'alarm_add' },
              { path: '/products', title: 'Productos', icon: 'shopping_basket' },
            ]
            break;

          case 'dispatcher':
            state.permissionsStore = 'dispatcher';
            state.menuStore = [
              { path: '/', title: 'inicio', icon: 'whatshot' },
              { path: '/dispatcher', title: 'Pendientes', icon: 'alarm' },
              { path: '/dispatched', title: 'Despachado', icon: 'alarm_on' },
            ]
            break;

          case 'marketing':
            state.permissionsStore = 'marketing';
            state.menuStore = [
              { path: '/', title: 'inicio', icon: 'whatshot' },
              { path: '/category', title: 'Categorias', icon: 'view_list' },
              { path: '/products', title: 'Productos', icon: 'shopping_basket' },
            ]
            break;

          default:
            state.menuStore = [
              { path: '/', title: 'inicio', icon: 'whatshot' },
            ]
        }
      }
    },
    getters: {

    },
  })
}

export default store
