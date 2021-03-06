var App = React.createClass({
    render: function() {
        return (
            <div>
            <div className="content">
            {this.props.children}
    </div>
        </div>
    )
    }
});

var destination = document.querySelector("#container");

var products = [
    {
        id: 0,
        name: 'TC 2017 LS',
        description: 'VC FlexLight Jersey with spot sublimated Team Canada 2017 logo, from our Team Canada Collection.',
        price: 34.95,
        img: 'https://unsplash.it/200',
    }, {
        id: 1,
        name: 'TC 2017 Shorts',
        description: 'VC FlexLight Shorts with spot sublimated Team Canada 2017 logo, from our Team Canada Collection.',
        price: 25.00,
        img: 'https://unsplash.it/200',
    }, {
        id: 2,
        name: 'TC 2016 Red SS',
        description: 'VC Ultimate\'s fully sublimated performance jersey, a replica of one of the two official dark jerseys of 2016 Team Canada teams! Sublimated jerseys are made with VC\'s FlexLight performance material – soft, lightweight and moisture wicking.',
        price: 74.00,
        img: 'https://unsplash.it/200',
    }, {
        id: 3,
        name: 'TC 2016 Dark SS',
        description: 'VC Ultimate\'s fully sublimated performance jersey, a replica of one of the two official dark jerseys of 2016 Team Canada teams! Sublimated jerseys are made with VC\'s FlexLight performance material – soft, lightweight and moisture wicking.',
        price: 35.99,
        img: 'https://unsplash.it/200',
    }, {
        id: 4,
        name: 'TC 2016 Light SS',
        description: 'Official replica of the 2016 Team Canada light playing jersey. VC spot sublimated jerseys are made with VC\'s FlexLight performance material – soft, lightweight and moisture wicking.',
        price: 35.99,
        img: 'https://unsplash.it/200',
    }, {
        id: 5,
        name: 'Goat Shorts',
        description: 'This just in... VC\'s NEW signature \'GOAT\' style athletic shorts now with pockets! Made with our FlexLight material.',
        price: 29.00,
        img: 'https://unsplash.it/200',
    }, {
        id: 6,
        name: 'Friction Gloves',
        description: 'This is the glove that started it all! Friction Gloves work great in every condition: dry, hot, rain, snow, you name it. They will help you maintain a firm grip on the disc whether you\'re catching or throwing. They eliminate slippage when the disc is wet, keep your hands warm in cold weather, and ease the sting of zippy throws. Whether your goal is to throw with more accuracy, catch tough discs, or just look fly, Frictions will help.  Frictions are not bulky or stiff like other gloves. They are tight fitting and, after a while, you\'ll forget they\'re even on!',
        price: 33.95,
        img: 'https://unsplash.it/200',
    }, {
        id: 7,
        name: 'TC 2017 Trucker',
        description: 'Premium meshback cotton front trucker hat. Made by FlexFit, with the official embroidered patch of Team Canada 2017! 47% Cotton / 25% Polyester / 28% Nylon, contrast trucker mesh back, matching plastic snap, hard buckram, matching undervisor. One size fits all',
        price: 15.00,
        img: 'https://unsplash.it/200',
    }, {
        id: 8,
        name: 'VC Discraft Disc',
        description: 'Discraft 175 gram Ultrastar disc, hot stamped with the original VC logo.',
        price: 14.00,
        img: 'https://unsplash.it/200',
    },
];

var cart = [];
cart.totalcart = 0;

var { Router,
    Route,
    IndexRoute,
    IndexLink,
    hashHistory,
    Link } = ReactRouter;

var BackButton = React.createClass({
    render: function() {
        return  <Link to="#" onClick={hashHistory.goBack} className="backButton"></Link>
    }
});

var CartButton = React.createClass({
    render: function() {
        return <Link to="/cart" className="cartButton"></Link>
    }
});

var Home = React.createClass({
    getProducts: function() {
        return products;
    },
    getInitialState: function() {
        return {
            itens: this.getProducts(),
        }
    },
    addToCart: function(item) {
        var isInCart = false;

        cart = cart.map((cartItem) => {
            if (cartItem.id == item.id) {
            isInCart = true;
            cartItem.count++;
        }

        return cartItem;
    });

        if (!isInCart) { cart.push({id: item.id, name: item.name, price: item.price, count: 1}) }

        cart.forEach(function(item,i){
            if(i===0) cart.totalcart = 0;
            cart.totalcart += item.price * item.count;
        });
    },
    render: function() {

        var addin = this.addToCart;
        return (
            <div>
            <header>
            <h2>Livraria Flip</h2>
        <CartButton />
        </header>
        <div className="store">
            {this.state.itens.map(function(item){
                return <ProductsList produto={item} addToCart={addin} key={item.id} />
            })}
    </div>
        </div>
    );
    }
});

var ProductsList = React.createClass({
    addToCart: function(){
        this.props.addToCart(this.props.produto);
    },
    render: function() {
        var prod = this.props.produto;

        return ( <div className={'prod prod-' + prod.id}>
            <div className="name">
            {prod.name}
    </div>
        <div className="prod-content">
            <div className="photo">
            <img src={prod.img} alt={prod.name} />
        </div>

        <div className="description">
            {prod.description.substring(0,50) + '...'}
    </div>
        <div className="price">
            R$ {prod.price.toFixed(2)}
    </div>
        </div>
        <button onClick={this.addToCart}>Adicionar ao Carrinho</button>
        </div>
    )
    }
});

var Cart = React.createClass({
    removeFromCart : function(item) {
        cart = cart.filter(function (e) {
            return e.id !== item.id;
        });

        cart.forEach(function(item,i){
            if(i===0) cart.totalcart = 0;
            cart.totalcart += item.price * item.count;
        });

        var lineRemove = document.querySelector('.tableRow.prod-' + item.id);
        lineRemove.parentNode.removeChild( lineRemove );

        var totalField = document.querySelector(".tableCell.valorfinal");
        totalField.innerHTML = cart.totalcart ? "R$ "+cart.totalcart.toFixed(2) : "R$ 0,00 ";
    },
    render: function() {
        var removeItem = this.removeFromCart;
        return (
            <div>

            <header>
            <BackButton />
            <h2>Livraria Flip</h2>
        </header>
        <div className="store cart">
            <h3>Carrinho</h3>

            <div className="cartTable">
            <div className="table minimalistBlack">
            <div className="tableHeading">
            <div className="tableRow">
            <div className="tableHead descricao">Descrição</div>
            <div className="tableHead quantidade">Quantidade</div>
            <div className="tableHead subtotal">Subtotal</div>
            <div className="tableHead remover">&nbsp;</div>
        </div>
        </div>
        <div className="tableBody">
            {cart.map(function(item){
                return <CartList produto={item} removeFromCart={removeItem} key={item.id} />
            })}
    </div>
        <div className="tableFoot tableFootStyle">
            <div className="tableRow">
            <div className="tableCell total">Total</div>
            <div className="tableCell noleftborder">&nbsp;</div>
        <div className="tableCell valorfinal">R$ {cart.totalcart.toFixed(2)}</div>
        <div className="tableCell">&nbsp;</div>
        </div>
        </div>
        </div>
        </div>

        </div>
        </div>
    );
    }
});

var CartList = React.createClass({
    removeFromCart: function(){
        this.props.removeFromCart(this.props.produto);
    },
    render: function() {
        var prod = this.props.produto;

        return (
            <div className={'tableRow prod-' + prod.id}>
            <div className="tableCell">
            {prod.name}
    </div>
        <div className="tableCell">
            {prod.count}
    </div>
        <div className="tableCell">
            R$ {(prod.price * prod.count).toFixed(2)}
    </div>
        <div className="tableCell">
            <button onClick={this.removeFromCart}>X</button>
        </div>
        </div>
    );
    }
});

ReactDOM.render(
<Router history={hashHistory}>
    <Route path="/" component={App}>
    <IndexRoute component={Home}/>
<Route path="/cart" component={Cart} />
</Route>
</Router>,
destination
);
