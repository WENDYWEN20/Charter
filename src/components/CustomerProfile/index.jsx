import "./style.css";
export default function CustomerProfile({ customer }) {
  const { id, name, email, phone } = customer || {};
  return (
    <div>
      <h2>Customer Profile</h2>
      <div className="customer-profile">
        <div>
          <strong>ID:</strong> {id}
        </div>
        <div>
          <strong>Name:</strong> {name}
        </div>
        <div>
          <strong>Email:</strong> {email}
        </div>
        <div>
          <strong>phone:</strong> {phone}
        </div>
      </div>
    </div>
  );
}