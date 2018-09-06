import {observable} from 'mobx';

class Store {
  @observable data = [];

  constructor(ref) {
    this.loadRoutes(ref);
  }

  loadRoutes(ref) {
    ref.on('value', snapshot => {
      var items = [];
      // this.setState({data: snapshot.val()}) is also possible, but thanks to forEach is possible to arrange Object as we want and add key
      snapshot.forEach(child => {
        let childItem = child.val();
        childItem.key = child.key;
        items.push(childItem);
      });
      this.data = items;
    });
  }

  removeItem = (key, ref) => {
    ref.child(key).remove();
  };
}


export {Store};
