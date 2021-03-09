import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductList from './ProductList';
import { Link } from "react-router-dom";
import Searchbar from '../common/Searchbar';
import { ArrowLeft, Phone, ShoppingBag, Clock, Money, BankCards } from '../../icons/icons';
import { Modal } from 'react-bootstrap';
import Button from '../common/Button';
const { db } = require('../../firebase');

function DeleteProductModal(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/*<Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>*/}
            <Modal.Body>
                <h4>Eliminar producto</h4>
                <p className='non-bold'>
                    ¿Seguro que deseas eliminar el producto <b>{props.productName}</b> de <b>{props.restaurantName}</b>?
          </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} label='Cancelar' />
            </Modal.Footer>
        </Modal>
    );
}

class RestaurantView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filteredProducts: [],
            searchInput: '',
            restaurantData: {
                name: 'Buffalo Wild Wings',
                img: 'https://www.buffalowildwings.com/globalassets/bww-logo_rgb_icon.png',
                openingTime: '09:00',
                closingTime: '19:00',
                cash: false,
                card: true,
                phone: '8111234567',
            },
            menuSections: [],
            selectedSection: '',
            addedItems: 0,
            restaurant: [],
        }

        this.addProduct = this.addProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
    }

    componentDidMount() {
        if (!this.props.routerProps.history.location.state) return this.props.routerProps.history.push('/')
        let restaurant = this.props.routerProps.history.location.state.detail;
        const locationsRef = db.collection('locations');
        locationsRef.limit(1).get().then(snapshot => {
            snapshot.forEach(locationsDoc => {
                const restaurantsRef = locationsRef.doc(locationsDoc.id).collection("restaurants")
                restaurantsRef.where('id', '==', restaurant.id).get().then(snapshot => {
                    snapshot.forEach(restaurantsDoc => {
                        const productsRef = restaurantsRef.doc(restaurantsDoc.id).collection("products");
                        productsRef.get().then(snapshot => {
                            const products = [];
                            const menuSections = [];
                            snapshot.forEach((productsDoc, index) => {
                                const data = productsDoc.data();
                                if(data.isAvailable) {
                                    products.push({
                                        id: data.id,
                                        name: data.name,
                                        img: data.img ? data.img : undefined,
                                        description: data.description,
                                        price: data.price,
                                        addedOfProduct: 0,
                                        category: data.category
                                    })
                                    if (menuSections.indexOf(data.category) === -1) menuSections.push(data.category);
                                }
                            })
                            this.setState({ restaurant, products, filteredProducts: products, menuSections, selectedSection: menuSections[0] })
                        })
                    })
                }).catch(err => {
                    console.log("Error getting sub-collection documents", err);
                })
            })
        }).catch(err => {
            console.log(err)
        });
    }

    handleSearch(e) {
        let searchInput = e.target.value;
        let products = [...this.state.products];
        products = products.filter(product => {
            return product.name.toLowerCase().includes(searchInput.toLowerCase())
        })
        this.setState({ searchInput, filteredProducts: products });
    }

    addProduct(productId) {
        let addedItems = this.state.addedItems;
        addedItems++;

        let products = this.state.products;
        let indexProductToAdd = products.map(item => item.id).indexOf(productId);
        products[indexProductToAdd].addedOfProduct++;

        this.setState({ addedItems, products });
    }

    removeProduct(productId) {
        let addedItems = this.state.addedItems;
        addedItems--;

        let products = this.state.products;
        let indexProductToRemove = products.map(item => item.id).indexOf(productId);
        if (products[indexProductToRemove].addedOfProduct === 1) {
            this.setState({ deleteProductModalShow: true });
        } else {
            products[indexProductToRemove].addedOfProduct--;
        }

        this.setState({ addedItems, products });
    }

    render() {
        let restaurant = this.state.restaurant;
        return (
            <>
                <Container className='pb-3'>
                    <Row className='py-4 header'>
                        <Col xs='auto' className='vertical-center'>
                            <Link to='/'>
                                <ArrowLeft className='header-icon mb-0' />
                            </Link>
                        </Col>
                        <Col>
                            <Searchbar placeholder='Busca un producto' onChange={this.handleSearch.bind(this)} value={this.state.searchInput}/>
                        </Col>
                        <Col xs='auto' className='vertical-center'>
                            <Link to='/carrito' className='shopping-link'>
                                <ShoppingBag className='header-icon mb-0' />
                                {this.state.addedItems > 0 &&
                                    <div className='added-items'><p className='text-smallest'>{this.state.addedItems}</p></div>
                                }
                            </Link>
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col xs='auto'>
                            <img src={restaurant.img} className='restaurant-img' loading='lazy' />
                        </Col>
                        <Col xs md={4}>
                            <Row>
                                <Col xs={12}>
                                    <h4 className='m-0'>{restaurant.name}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <p className='text-smaller'><Clock className='icon' /> {restaurant.openingTime} - {restaurant.closingTime}</p>
                                </Col>
                            </Row>
                            {restaurant.phone &&
                                <Row className='mb-2'>
                                    <Col xs={12}>
                                        <a className='text-smaller restaurant-phone' href={`tel:${restaurant.phone}`}><Phone className='icon' /> {restaurant.phone}</a>
                                    </Col>
                                </Row>
                            }
                            <Row className='no-gutters mt-auto'>
                                {restaurant.cash &&
                                    <Col xs='auto' className='pr-1'>
                                        <div className='cash-pill'>
                                            <p className='text-smallest m-0'><Money className='icon' /> Efectivo</p>
                                        </div>
                                    </Col>
                                }
                                {restaurant.card &&
                                    <Col xs='auto'>
                                        <div className='card-pill'>
                                            <p className='text-smallest m-0'><BankCards className='icon' /> Tarjeta</p>
                                        </div>
                                    </Col>
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row className='restaurant-sections pb-4 pt-2'>
                        <Col xs={12}>
                            <ul className='menu-sections-list'>
                                {this.state.menuSections.map((section, i) => (
                                    <li
                                        key={i}
                                        className={`menu-sections-item ${this.state.selectedSection === section && 'active'}`}
                                        onClick={() => this.setState({ selectedSection: section })}
                                    >
                                        <a href={`#${section}`}>{section}</a>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <ProductList
                                products={this.state.filteredProducts}
                                addProduct={this.addProduct}
                                removeProduct={this.removeProduct} />
                        </Col>
                    </Row>
                </Container>
                <DeleteProductModal
                    show={this.state.deleteProductModalShow}
                    onHide={() => this.setState({ deleteProductModalShow: false })}
                    restaurantName={restaurant.name}
                />
            </>
        );
    }
}

export default RestaurantView;
