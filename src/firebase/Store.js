import {observable, autorun} from 'mobx';

class Store {
  @observable data = [];

  constructor(ref) {
    this.loadRoutes(ref);
  }

  loadRoutes(ref) {
    ref.on('value', snapshot => {
      var items = [];
      // můžeme dát i rovnou this.setState({data: snapshot.val()}), díky forEach si ale můžeme uspořádat objekt jak chce a přidat key
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
