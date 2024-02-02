import PropTypes from 'prop-types'

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, onChange, value, onBlur } = props
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control mt-0 ${i_class}`}
        name={name}
        id={i_id}
        placeholder={label}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      <label htmlFor={i_id}>{label}</label>
    </div>
  )
}

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  i_id: PropTypes.string,
  i_class: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
}

export default CustomInput
