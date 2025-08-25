export default function Input({ label, name, type = "text", props }) {
  return (
    <p className="control">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} id={name} {...props} required />
    </p>
  );
}
