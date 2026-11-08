const RATINGS = [1, 2, 3, 4, 5];

interface RatingSelectProps {
    value: number | null;
    onChange: (rating: number | null) => void;
}

export default function RatingSelect({ value, onChange }: RatingSelectProps) {
    return (
        <label className="form__field">
            Rating
            <select
                value={value ?? ''}
                onChange={(e) =>
                    onChange(
                        e.target.value === '' ? null : Number(e.target.value),
                    )
                }
            >
                <option value="">No rating</option>
                {RATINGS.map((rating) => (
                    <option key={rating} value={rating}>
                        {rating}
                    </option>
                ))}
            </select>
        </label>
    );
}
