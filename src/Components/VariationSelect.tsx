import { Variety, Options, Items } from "../Interfaces/Interfaces";
import "../Styles/VariationSelect.scss";

interface VariationSelectProps {
    varieties: Variety[];
    selectedVariety: { [sv: string]: Options};
    selectedItem: Items | null;
    variationSelect: (varietyCode: string, selectedOption: Options) => void;
}

export function VariationSelect(props: VariationSelectProps) {
    const { varieties, variationSelect, selectedItem } = props;

    const handleSelect = (variety: Variety) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptionValue = e.target.value;
        const selectedOption = variety.options.find(option => option.code === selectedOptionValue);

        if (selectedOption) {
            variationSelect(variety.code, selectedOption);
        }
    };

    return (
        <div className="variation-select">
            <h1>Variācijas</h1>
            {varieties.map(variety => (
                <div className="variation-select_list" key={variety.code}>
                    <h3>{variety.description}</h3>
                    <select
                        key={`${selectedItem?.code || 'none'}.${variety.code}`}
                        onChange={handleSelect(variety)}
                    >
                        <option value="">Izvēlieties iespēju</option>
                        {variety.options.map(option => (
                            <option key={option.code} value={option.code}>
                                {option.description}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}

