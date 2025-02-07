import { FormGroup, Label, Input } from 'reactstrap';

export default function MalzemelerComp({
    changeFn,
    isChecked,
    fieldName,
    value,
    label,
    style,
}) {
    return (
        <FormGroup check inline style={style}>
            <Input
                type="checkbox"
                id={value}
                onChange={changeFn}
                checked={isChecked}
                name={fieldName}
                value={value}

            />
            <Label check htmlFor={value}>
                {label}
            </Label>
        </FormGroup>
    );
}