import { ProductSelect } from './Components/ProductSelect';
import { VariationSelect } from './Components/VariationSelect';
import { Items, Variety, Options } from './Interfaces/Interfaces';
import data from './sample.json';
import './Styles/App.scss';
import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState<Items[]>([]);
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [selectedItem, setSelectedItem] = useState<Items | null>(null);
  const [selectedVariations, setSelectedVariations] = useState<{
    [key: string]: Options;
  }>({});
  const [productCode, setProductCode] = useState<string>("");

  useEffect(() => {
    setItems(data.items);
    setVarieties(data.varieties);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      let productCode = selectedItem.code;
  
      const sortedVarietyCodes = selectedItem.varieties.sort((a, b) => {
        if (a === "color") return -1;
        if (b === "color") return 1;
        return (
          selectedItem.varieties.indexOf(a) - selectedItem.varieties.indexOf(b)
        );
      });
  
      for (const varietyCode of sortedVarietyCodes) {
        const selectedOption = selectedVariations[varietyCode];
        if (selectedOption) {
          productCode = `${productCode}.${selectedOption.code}`;
        }
      }
  
      setProductCode(productCode);
    }
  }, [selectedItem, selectedVariations]);

  const handleProductSelect = (item: Items | null) => {
    setSelectedItem(item);
    setSelectedVariations({});
    setProductCode(item ? item.code : "");
  };

  const handleVariationSelect = (
    varietyCode: string,
    selectedOption: Options
  ) => {
    setSelectedVariations((prevVariations) => ({
      ...prevVariations,
      [varietyCode]: selectedOption,
    }));
  };

  return (
    <div className="form-container">
      <div className="App">
        <h1 className='title'>Produktu piedāvājums</h1>
          <ProductSelect
            items={items}
            selectedProduct={handleProductSelect}
          />
          {selectedItem?.varieties && selectedItem.varieties.length> 0 && (
            <VariationSelect
              varieties={selectedItem.varieties
                .map((varietyCode) => varieties.find(v => v.code === varietyCode))
                .filter(variety => variety !== undefined) as Variety[]}
              selectedItem={selectedItem}
              variationSelect={handleVariationSelect} 
              selectedVariety={{}}
            />
          )}
          {selectedItem && (
          <h2>
            Produkta kods: <span className="code">{productCode}</span>
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
