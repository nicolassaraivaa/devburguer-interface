import { useState, useEffect} from 'react'

import { api } from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'
import { CardProduct } from '../../components/CardProduct'
import { useNavigate, useLocation, Link} from 'react-router-dom'
import {
    Container, 
    Banner, 
    CategoryMenu, 
    ProductsContainer,
    CategoryButton,
    DivBack,
    ButtonBack
}from './styles'

export function Menu(){
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [filterproducts, setFilterproducts] = useState([])

    const navigate = useNavigate()

    const {search} = useLocation()
    const queryParams = new URLSearchParams(search)

    const [activeCategory, setActiveCategory] = useState(() =>{
        const categoryId = +queryParams.get('categorias')

        if(categoryId) {
            return categoryId
        }
        return 0
    })

    useEffect(() => {
        async function loadCategories() {
            const {data} = await api.get('/categories')

            const newCategories = [{id: 0, name: 'Todas'},...data]

            setCategories(newCategories)
        }

        async function loadProducts() {
            const {data} = await api.get('/products')

            const newProducts = data.map((product) => ({
                currencyValue: formatPrice(product.price),
                ...product
            }))
            setProducts(newProducts)

        }

        loadCategories()
        loadProducts()

    }, [])

    
    useEffect(() => {
        if(activeCategory === 0){
            setFilterproducts(products)
        }else{
            const newFilterproducts = products.filter((product) => product.category_id === activeCategory)

            setFilterproducts(newFilterproducts)
        }

    }, [products, activeCategory])
    

    return(
        <Container>
            <Banner>
                <h1>
                 O MELHOR 
                 <br />
                 HAMBURGUER 
                 <br />
                 ESTÁ AQUI!
                 <span>Esse cardápio está irresistível!</span>
                </h1>
            </Banner>


            <CategoryMenu>
                {categories.map((category) => (
                    <CategoryButton 
                    key={category.id} 
                    $isActiveCategory={category.id === activeCategory}
                    onClick={() => {
                        navigate(
                            {
                                pathname:'/cardapio',
                                search: `?categoria=${category.id}`
                            },
                            {
                                replace: true
                            },
                        )
                        setActiveCategory(category.id)
                    }}>
                        {category.name}
                    </CategoryButton>
                ))}
            </CategoryMenu>

            <ProductsContainer>
                {filterproducts.map((product) => (
                    <CardProduct product={product} key={product.id}/>
                ))}
            </ProductsContainer>
            <DivBack >
                <ButtonBack onClick={() => navigate('/')}> 
                    &lt; Voltar
                </ButtonBack>
             </DivBack>
            
        </Container>
    )
}