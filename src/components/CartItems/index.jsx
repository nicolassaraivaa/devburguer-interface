import { Table } from '../index'
import { useCart } from '../../hooks/CartContext'
import { formatPrice } from "../../utils/formatPrice"
import TrashIcon from '../../assets/trash.svg'
import { 
    ButtonGroup, 
    EmptyCart, 
    ProductImage, 
    TotalPrice,
    TrashImage 
} from './styles'

export function CartItems() {
    const { cartProducts, increaseProduct, decreaseProduct, deleteProduct } = useCart()
    return (
        <Table.Root>
            <Table.Header>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Itens</Table.Th>
                    <Table.Th>Preço</Table.Th>
                    <Table.Th>Quantidade</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Header>
            <Table.Body>
                {cartProducts?.length ? (
                    cartProducts.map((product) => (
                        <Table.Tr>
                            <Table.Td>
                                <ProductImage src={product.url} />
                            </Table.Td>
                            <Table.Td>{product.name}</Table.Td>
                            <Table.Td>{formatPrice(product.price)}</Table.Td>
                            <Table.Td>
                                <ButtonGroup>
                                    <button onClick={() => decreaseProduct(product.id)}>-</button>
                                    {product.quantity}
                                    <button onClick={() => increaseProduct(product.id)}>+</button>
                                </ButtonGroup>
                            </Table.Td>
                            <Table.Td>
                                <TotalPrice>
                                    {formatPrice(product.price * product.quantity)}
                                </TotalPrice>
                            </Table.Td>
                            <Table.Td>
                                <TrashImage
                                src={TrashIcon} 
                                onClick={() => deleteProduct(product.id)}
                                />
                            </Table.Td>
                        </Table.Tr>
                    ))
                ) : (
                    <EmptyCart>Carrinho vazio</EmptyCart>
                )}
            </Table.Body>
        </Table.Root>
    )
}