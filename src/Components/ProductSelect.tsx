import { Items } from "../Interfaces/Interfaces";
import "../Styles/ProductSelect.scss";

interface ProductSelectProps {
    items: Items[];
    selectedProduct: (selectedItem: Items | null) => void;
}

export function ProductSelect(props: ProductSelectProps) {
    const { items, selectedProduct } = props;

    const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = e.target.value;
        const selected = items.find((item) => item.code === selectedCode) || null;
        selectedProduct(selected);
    };

    return (
        <div className="product-select">
            <h1>Produkti</h1>
            <div className="product-select_list">
                <select onChange={handleProductSelect}>
                    <option value="">Izvēlieties produktu</option>
                    {items.map((item) => (
                        <option key={item.code} value={item.code}>
                            {item.description}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
