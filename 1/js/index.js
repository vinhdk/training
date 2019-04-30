const list = {
    KEY: "abc",
    listAdidas: [],
    get() {

        let check = localStorage.getItem(list.KEY);// lấy giá trị vs KEY là abcdef trên localStorage
        if (check) {// nếu có giá trị
            list.listAdidas = JSON.parse(check);//gán listAdidas bằng cách parse JSON giá trị lấy đc
        } else {
            list.listAdidas = [
                {
                    id: 1,
                    title: "SAMBA OG SHOES",
                    description: "Men Originals",
                    img: "img/1.jpg"
                }, {
                    id: 2,
                    title: "NITE JOGGER SHOES",
                    description: "Originals",
                    img: "img/2.jpg"
                }, {
                    id: 3,
                    title: "YUNG-96 SHOES",
                    description: "Originals",
                    img: "img/3.jpg"
                }, {
                    id: 4,
                    title: "DAKARI BB TEE",
                    description: "Men Originals",
                    img: "img/4.jpg"
                }, {
                    id: 5,
                    title: "ADIDAS NMD",
                    description: "Originals",
                    img: "img/5.jpg"
                }, {
                    id: 6,
                    title: "SABALO SLIP-ON SHOES",
                    description: "Originals",
                    img: "img/6.jpg"
                }, {
                    id: 7,
                    title: "FOREST GROVE SHOES",
                    description: "Men Originals",
                    img: "img/7.jpg"
                }, {
                    id: 8,
                    title: "ADIEASE SHOES",
                    description: "Originals",
                    img: "img/8.jpg"
                }, {
                    id: 9,
                    title: "SHOP BACKPACK",
                    description: "Originals",
                    img: "img/9.jpg"
                }, {
                    id: 10,
                    title: "HIP PACKABLE JACKER",
                    description: "Men Originals",
                    img: "img/10.jpg"
                }
            ];
            list.sync();
        }
    },
    sync() {
        let newList = JSON.stringify(list.listAdidas);
        localStorage.setItem(list.KEY, newList);
    },
    find(id) {
        let get = list.listAdidas.filter(item => {
            if (item.id == id) {
                return true;
            }
        });
        if (get && get[0]) {
            return get[0];
        }
    },
    add(_id, _title) {
        var a = {
            id: _id,
            title: _title
        }
        list.listAdidas.push(a);
        list.sync();
    },
    remove(id) {
        console.log(id);
        list.listAdidas = list.listAdidas.filter(item => {
            if (item.id !== id)
                return true;
        });
        list.sync()
    },
    search(name) {
        let _list = list.listAdidas.filter(item => {
            if (item.title.toUpperCase().includes(name.toUpperCase())) {
                return true;
            }
        });
        return _list;
    }
}
const cart = {
    KEY: 'Cart',
    listCart: [],
    count: 0,
    get() {
        let check = localStorage.getItem(cart.KEY);
        if (check) {
            cart.listCart = JSON.parse(check);
            cart.updateCount();
        }
    },
    updateCount() {
        cart.count = cart.listCart.length;
        document.getElementById('countCart').innerHTML = cart.count;
    },
    sync() {
        let newList = JSON.stringify(cart.listCart);
        localStorage.setItem(cart.KEY, newList);
    },
    addtocart(_item) {
        var item = cart.listCart.filter(item => {
            if (item.id == _item.id) {
                return true;
            }

        })
        if (item.length > 0) {
            item[0].quantity++;
        }
        else {
            cart.listCart.push({
                id: _item.id,
                title: _item.title,
                quantity: 1
            })
        }
        cart.updateCount();

        cart.sync();
    },

    removetocart(_id) {
        cart.listCart = cart.listCart.filter(item => {
            if (item.id !== _id)
                return true;
        });
        cart.updateCount();
        cart.sync();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    list.get();
    showList(list.listAdidas);
    cart.get();


});
function showList(_list) {
    let listSection = document.getElementById('list');
    listSection.innerHTML = '';

    _list.forEach(item => {
        let listitem = document.createElement('div');
        listitem.className = 'abc';

        let title = document.createElement('h5');
        title.textContent = item.title;
        listitem.appendChild(title);

        let description = document.createElement('p');
        description.textContent = item.description;
        listitem.appendChild(description);

        let img = document.createElement('img');
        img.src = item.img;
        listitem.appendChild(img);

        let removeBtn = document.createElement('input');
        removeBtn.className = 'btn btn-danger';
        removeBtn.value = 'Remove';
        removeBtn.type = 'button';
        listitem.appendChild(removeBtn);
        removeBtn.addEventListener('click', () => {
            list.remove(item.id);
            showList(list.listAdidas);

        });


        let addBtn = document.createElement('input');
        addBtn.className = 'btn btn-success';
        addBtn.value = 'Add';
        addBtn.type = 'button';
        listitem.appendChild(addBtn);
        addBtn.addEventListener('click', () => {
            cart.addtocart(item);
        });
        listSection.append(listitem);

    });
}
function showCart() {
    cart.get();
    let listSection = document.getElementById('list');
    listSection.innerHTML = '';
    let table = document.createElement('table');
    table.className = 'table';
    let row = document.createElement('tr');
    let name = document.createElement('th');
    name.innerHTML = 'Title';
    row.appendChild(name);
    let quantity = document.createElement('th');
    quantity.innerHTML = 'Quantity';
    row.appendChild(quantity);
    // let price = document.createElement('th');
    // price.innerHTML = 'Price';
    // row.appendChild(price);
    // let total = document.createElement('th');
    // total.innerHTML = 'Total';
    // row.appendChild(total);
    let deleteBtn = document.createElement('th');
    deleteBtn.innerHTML = 'Action';
    row.appendChild(deleteBtn);
    table.appendChild(row);
    cart.listCart.forEach(item => {
        let row = document.createElement('tr');
        let name = document.createElement('td');
        name.innerHTML = item.title;
        row.appendChild(name);
        let quantity = document.createElement('td');
        quantity.innerHTML = item.quantity;
        row.appendChild(quantity);
        // let price = document.createElement('td');
        // price.innerHTML = item.price;
        // row.appendChild(price);
        // let total = document.createElement('td');
        // total.innerHTML = item.price*item.quantity;
        // row.appendChild(total);
        let removeBtn = document.createElement('input');
        removeBtn.className = 'btn btn-danger';
        removeBtn.value = 'Remove';
        removeBtn.type = 'button';
        removeBtn.addEventListener('click', () => {
            cart.removetocart(item.id);
            showCart();

        });
        row.appendChild(removeBtn);
        table.appendChild(row);
    });
    listSection.append(table);
}

function search(name) {
    showList(list.search(name));
}



